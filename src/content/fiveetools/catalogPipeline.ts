import type { ParsedCatalog, SourceDocument } from './model';
import { RESOURCE_PROPS } from './model';
import { parseDocuments } from './parser';

export interface CatalogProjection {
    catalog: ParsedCatalog;
    documents: Omit<SourceDocument, 'body'>[];
    packages: string[];
}
export interface CatalogSnapshot extends CatalogProjection {
    fromCache: boolean;
    cacheWarning?: string;
}
/** Storage is supplied by the host; parsing never downloads or changes original documents. */
export interface CatalogStore {
    readCatalogCache(version: string): Promise<{ generation: string; snapshot: CatalogProjection | null }>;
    readCatalogDocuments(): Promise<{ generation: string; documents: SourceDocument[] }>;
    writeCatalogCache(version: string, generation: string, snapshot: CatalogProjection): Promise<boolean>;
}

function project(documents: SourceDocument[]): CatalogProjection {
    const catalog = parseDocuments(documents);
    const entries = catalog.entries.map(record => {
        const view = Object.fromEntries(Object.entries(record).filter(([key]) => key !== 'raw' && key !== 'resolvedRaw'));
        return { ...view, rawDocumentReference: { repository: record.sourceProvider, path: record.provenance?.path, revision: record.provenance?.revision, identity: record.sourceIdentity } };
    });
    const props = documents.find(doc => doc.repository === 'homebrew' && doc.path === '_generated/index-props.json');
    const packages = props ? [...new Set(RESOURCE_PROPS.flatMap(prop => Object.keys(props.body[prop] || {})))].sort() : [];
    return { catalog: { ...catalog, entries }, documents: documents.map(({ body, ...document }) => document), packages };
}

export async function buildCatalogSnapshot(store: CatalogStore, version: string, report?: (message: string) => void): Promise<CatalogSnapshot> {
    for (let attempt = 0; attempt < 3; attempt++) {
        const cached = await store.readCatalogCache(version);
        if (cached.snapshot)
            return { ...cached.snapshot, fromCache: true };
        report?.(attempt ? '原文在整理期间发生变化，正在重新读取…' : '正在整理外部资料，页面仍可使用…');
        // Documents and their generation must be read in the same storage transaction.
        const input = await store.readCatalogDocuments();
        const snapshot = project(input.documents);
        try {
            if (!await store.writeCatalogCache(version, input.generation, snapshot))
                continue;
        }
        catch (error) {
            // Distinguish a failed cache write from a concurrent original-document update.
            const current = await store.readCatalogCache(version);
            if (current.generation !== input.generation)
                continue;
            return { ...snapshot, fromCache: false, cacheWarning: '解析结果缓存未保存，下次打开仍需整理：' + String(error) };
        }
        return { ...snapshot, fromCache: false };
    }
    throw Error('原文连续发生变化，本次目录未替换；请等待其他页面的资料操作结束后重试。');
}
