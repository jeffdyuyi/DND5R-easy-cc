import type { SourceDocument } from '../content/fiveetools/model';
import { stageDocuments } from '../content/fiveetools/stagedDocuments';
import { documentKey, emptyCounts, isSourceDocument } from '../content/fiveetools/sourceDocument';
import type { DocumentRetirement, SourceStore, SyncCounts } from '../content/fiveetools/sourceDocument';
import { nativeDocumentVersions } from './nativeDocumentVersions';
import type { NativeVersion } from './nativeDocumentVersions';
import { nativeResourceFiles } from './resourceFiles';
import { readDocuments as readLegacyDocuments } from '../content/fiveetools/documentStore';

/** Serializes app writes; the native pointer still rejects cross-window races. */
let writing: Promise<unknown> = Promise.resolve();
let migration: Promise<void> | null = null;
let cached: NativeVersion | null = null;
async function migrateLegacy(): Promise<void> {
    if (!migration) migration = (async () => {
        const files = nativeResourceFiles();
        if ((await files.active()).version) return;
        const documents = await readLegacyDocuments();
        if (documents.length) await stageDocuments(nativeDocumentVersions({ generation: 'empty', documents: [], references: {} }), documents, validateInWorker);
    })().catch(error => { migration = null; throw error; });
    await migration;
}
export async function readNativeDocuments(): Promise<NativeVersion> {
    const files = nativeResourceFiles();
    await migrateLegacy();
    const version = (await files.active()).version;
    if (!version) return { generation: 'empty', documents: [], references: {} };
    if (cached?.generation === version) return cached;
    const text = (await files.read({ name: version + '.json' })).text;
    if (!text) throw Error('活动资料文件缺失，未覆盖原文。');
    const value: unknown = JSON.parse(text);
    let documents = (value as { documents?: unknown }).documents;
    let references: Record<string, string> = {};
    if (!Array.isArray(documents)) {
        const listed = (value as { references?: unknown }).references;
        if (!listed || typeof listed !== 'object' || Array.isArray(listed)) throw Error('活动资料清单无效。');
        references = listed as Record<string, string>;
        const loaded: SourceDocument[] = [];
        for (const [key, file] of Object.entries(references)) {
            if (typeof file !== 'string' || !/^[a-f0-9-]{36}\.json$/.test(file)) throw Error('活动资料文件名无效。');
            const content = (await files.read({ name: file })).text;
            if (!content) throw Error('活动资料原文缺失：' + key);
            const document: unknown = JSON.parse(content);
            if (!isSourceDocument(document) || documentKey(document) !== key) throw Error('活动资料原文身份不符：' + key);
            loaded.push(document);
        }
        documents = loaded;
    }
    if (!Array.isArray(documents) || !documents.every(isSourceDocument))
        throw Error('活动资料文件无效，未覆盖原文。');
    if (new Set(documents.map(documentKey)).size !== documents.length)
        throw Error('活动资料存在重复身份，未覆盖原文。');
    cached = { generation: version, documents, references };
    return cached;
}

function validateInWorker(documents: SourceDocument[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('../content/fiveetools/catalog.worker.ts', import.meta.url), { type: 'module' });
        const done = () => worker.terminate();
        worker.onmessage = event => {
            done();
            if (event.data.ok) resolve();
            else reject(Error(event.data.error || '资料解析失败'));
        };
        worker.onerror = () => { done(); reject(Error('资料解析线程失败')); };
        worker.postMessage({ id: 0, validate: documents });
    });
}

async function saveBatch(documents: SourceDocument[], retire?: DocumentRetirement): Promise<SyncCounts> {
    const keys = new Set<string>();
    for (const document of documents) {
        if (!isSourceDocument(document) || document.active === false) throw Error('包含无效原文，未写入资料。');
        const key = documentKey(document);
        if (keys.has(key)) throw Error('包含重复原文路径，未写入资料：' + key);
        keys.add(key);
    }
    const before = await readNativeDocuments();
    const merged = new Map(before.documents.map(doc => [documentKey(doc), doc]));
    const counts = emptyCounts();
    for (const document of documents) {
        const key = documentKey(document), previous = merged.get(key);
        if (!previous) counts.added++;
        else if (previous.active === false || previous.revision !== document.revision || JSON.stringify(previous.body) !== JSON.stringify(document.body)) counts.updated++;
        else counts.unchanged++;
        merged.set(key, { ...document, active: true });
    }
    if (retire) {
        const keep = new Set(retire.paths);
        for (const [key, doc] of merged) {
            if (doc.repository === retire.repository && doc.active !== false && !keep.has(doc.path)) {
                merged.set(key, { ...doc, active: false });
                counts.retired++;
            }
        }
    }
    if (!counts.added && !counts.updated && !counts.retired) return counts;
    await stageDocuments(nativeDocumentVersions(before), [...merged.values()], validateInWorker);
    return counts;
}

export const nativeSourceStore: SourceStore = {
    async readDocument(repository, path) {
        return (await readNativeDocuments()).documents.find(doc => doc.repository === repository && doc.path === path);
    },
    saveDocuments(documents, retire) {
        const next = writing.then(() => saveBatch(documents, retire));
        writing = next.catch(() => {});
        return next;
    },
};

/** Share the native write queue with imports/downloads; a populated library always wins. */
export function seedNativeLibrary(documents: SourceDocument[]): Promise<void> {
    const next = writing.then(async () => {
        if ((await readNativeDocuments()).documents.some(doc => doc.repository === '5etools-cn')) return;
        await saveBatch(documents);
    });
    writing = next.catch(() => {});
    return next;
}
