import { ParsedCatalog, SourceDocument, RESOURCE_PROPS } from './model';
import { parseDocuments } from './parser';
import { readDocuments, readCatalogCache, writeCatalogCache, readHomebrewPackagePaths } from './source';
import parserSource from './parser.ts?raw';
import entriesSource from './entries.ts?raw';
import expandSource from './expand.ts?raw';
import compatibilitySource from './compatibility.ts?raw';
import modelSource from './model.ts?raw';
import psionicSource from './psionicPresentation.ts?raw';
import itemMetadataSource from './itemMetadata.ts?raw';
import bookRulesSource from './bookRules.ts?raw';
// No raw rule data is deleted: only the UI projection avoids duplicating whole raw objects.
const PROJECTION_VERSION = 'lean-catalog-1';
async function fingerprint() { const bytes = new TextEncoder().encode([PROJECTION_VERSION, parserSource, entriesSource, expandSource, compatibilitySource, modelSource, psionicSource, itemMetadataSource, bookRulesSource].join('\n')); const digest = await crypto.subtle.digest('SHA-256', bytes); return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join(''); }
const version = fingerprint();
function project(catalog: ParsedCatalog, documents: SourceDocument[]) {
    const entries = catalog.entries.map(record => { const view = Object.fromEntries(Object.entries(record).filter(([key]) => key !== 'raw' && key !== 'resolvedRaw')); return { ...view, rawDocumentReference: { repository: record.sourceProvider, path: record.provenance?.path, revision: record.provenance?.revision, identity: record.sourceIdentity } }; });
    const props = documents.find(doc => doc.path === '_generated/index-props.json');
    return { catalog: { ...catalog, entries }, documents: documents.map(({ body, ...document }) => document), packages: props ? [...new Set(RESOURCE_PROPS.flatMap(prop => Object.keys(props.body[prop] || {})))].sort() : [] };
}
self.onmessage = async (event: MessageEvent) => {
    const id = event.data.id;
    try {
        const parserVersion = await version;
        const cache = await readCatalogCache(parserVersion);
        if (cache.snapshot) {
            const packages = await readHomebrewPackagePaths();
            self.postMessage({ id, ok: true, snapshot: { ...cache.snapshot, packages, fromCache: true } });
            return;
        }
        self.postMessage({ id, phase: '正在整理外部资料，页面仍可使用…' });
        const documents = await readDocuments();
        const snapshot = project(parseDocuments(documents), documents);
        let cacheWarning = '';
        try {
            await writeCatalogCache(parserVersion, cache.generation, snapshot);
        }
        catch (error) {
            cacheWarning = '解析结果缓存未保存，下次打开仍需整理：' + String(error);
        }
        self.postMessage({ id, ok: true, snapshot: { ...snapshot, fromCache: false, cacheWarning } });
    }
    catch (error) {
        self.postMessage({ id, ok: false, error: String(error) });
    }
};

