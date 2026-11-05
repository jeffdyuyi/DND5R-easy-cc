import type { SourceDocument } from '../content/fiveetools/model';
import type { DocumentVersions } from '../content/fiveetools/stagedDocuments';
import { documentKey, isSourceDocument } from '../content/fiveetools/sourceDocument';
import { nativeResourceFiles } from './resourceFiles';
import type { ResourceFiles } from './resourceFiles';

export interface NativeVersion {
    generation: string;
    documents: SourceDocument[];
    references: Record<string, string>;
}

/** Reuses unchanged document files; only the small manifest is replaced per version. */
export function nativeDocumentVersions(before: NativeVersion, files: ResourceFiles = nativeResourceFiles()): DocumentVersions {
    const pending = new Map<string, { references: Record<string, string>; created: string[] }>();
    const old = new Map(before.documents.map(doc => [documentKey(doc), doc]));
    return {
        async create() {
            const version = crypto.randomUUID();
            pending.set(version, { references: {}, created: [] });
            return version;
        },
        async write(version, document) {
            const batch = pending.get(version);
            if (!batch) throw Error('暂存版本不存在。');
            const key = documentKey(document);
            const existing = before.references[key];
            if (existing && JSON.stringify(old.get(key)) === JSON.stringify(document)) {
                batch.references[key] = existing;
                return;
            }
            const file = crypto.randomUUID() + '.json';
            batch.created.push(file);
            await files.write({ name: file, text: JSON.stringify(document) });
            batch.references[key] = file;
        },
        async read(version) {
            const batch = pending.get(version);
            if (!batch) throw Error('暂存版本不存在。');
            await files.write({ name: version + '.json', text: JSON.stringify({ references: batch.references }) });
            const text = (await files.read({ name: version + '.json' })).text;
            if (!text) throw Error('暂存清单读取失败。');
            const manifest = JSON.parse(text) as { references: Record<string, string> };
            if (!manifest.references || JSON.stringify(manifest.references) !== JSON.stringify(batch.references))
                throw Error('暂存清单不一致。');
            const documents: SourceDocument[] = [];
            for (const [key, file] of Object.entries(manifest.references)) {
                if (!/^[a-f0-9-]{36}\.json$/.test(file)) throw Error('暂存文件名无效。');
                const body = (await files.read({ name: file })).text;
                if (!body) throw Error('暂存原文缺失：' + key);
                const document: unknown = JSON.parse(body);
                if (!isSourceDocument(document) || documentKey(document) !== key)
                    throw Error('暂存原文身份不符：' + key);
                documents.push(document);
            }
            return documents;
        },
        async activate(version) {
            if (!pending.has(version)) throw Error('暂存版本不存在。');
            await files.activate({ version, expected: before.generation === 'empty' ? null : before.generation });
            pending.delete(version);
        },
        async discard(version) {
            const batch = pending.get(version);
            pending.delete(version);
            const targets = [version + '.json', ...(batch?.created || [])];
            const errors: unknown[] = [];
            for (const name of targets) {
                try { await files.discard({ name }); } catch (error) { errors.push(error); }
            }
            if (errors.length) throw new AggregateError(errors, '暂存文件清理失败。');
        },
    };
}
