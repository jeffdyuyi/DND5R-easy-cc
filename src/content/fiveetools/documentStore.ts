import type { SourceDocument } from './model';
import type { CatalogProjection } from './catalogPipeline';
import { documentKey, emptyCounts, isSourceDocument } from './sourceDocument';
import type { DocumentRetirement, SyncCounts } from './sourceDocument';
const DB = 'easy-cc-external-resources-v1';
export async function database() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB, 2);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('documents'))
                db.createObjectStore('documents', { keyPath: 'key' });
            if (!db.objectStoreNames.contains('catalogs'))
                db.createObjectStore('catalogs', { keyPath: 'key' });
            if (!db.objectStoreNames.contains('metadata'))
                db.createObjectStore('metadata', { keyPath: 'key' });
        };
        request.onsuccess = () => { request.result.onversionchange = () => request.result.close(); resolve(request.result); };
        request.onerror = () => reject(request.error);
        request.onblocked = () => reject(Error('资料缓存升级等待其他页面关闭，请关闭其他easy-cc页面后重试。'));
    });
}
export async function readDocuments(): Promise<SourceDocument[]> {
    return (await readCatalogDocuments()).documents;
}
export async function readCatalogDocuments(): Promise<{ generation: string; documents: SourceDocument[] }> {
    const db = await database();
    try {
        return await new Promise<{ generation: string; documents: SourceDocument[] }>((resolve, reject) => {
            const tx = db.transaction(['documents', 'metadata']);
            const records = tx.objectStore('documents').getAll(), generation = tx.objectStore('metadata').get('generation');
            tx.oncomplete = () => {
                const documents: unknown[] = records.result.map((v: any) => v?.document);
                if (!documents.every(isSourceDocument)) { reject(Error('本地原文含无效记录，原始存储保留；本次目录未替换。')); return; }
                resolve({ generation: generation.result?.value || 'legacy', documents: documents.filter(document => document.active !== false) });
            };
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error || Error('原文读取事务已取消。'));
        });
    }
    finally {
        db.close();
    }
}
export async function saveDocuments(documents: SourceDocument[], retire?: DocumentRetirement): Promise<SyncCounts> {
    const keys = new Set<string>();
    for (const document of documents) {
        if (!isSourceDocument(document) || document.active === false)
            throw Error('包含无效原文，未写入资料。');
        const key = documentKey(document);
        if (keys.has(key)) throw Error('包含重复原文路径，未写入资料：' + key);
        keys.add(key);
    }
    const db = await database(), counts = emptyCounts();
    try {
        await new Promise<void>((resolve, reject) => {
            const tx = db.transaction(['documents', 'metadata'], 'readwrite');
            let changed = false;
            for (const document of documents) {
                const key = documentKey(document);
                const request = tx.objectStore('documents').get(key);
                request.onsuccess = () => {
                    const previous = request.result?.document;
                    const different = !previous || previous.revision !== document.revision || previous.active === false || JSON.stringify(previous.body) !== JSON.stringify(document.body);
                    if (!previous)
                        counts.added++;
                    else if (different)
                        counts.updated++;
                    else
                        counts.unchanged++;
                    if (!previous || different)
                        tx.objectStore('documents').put({ key, document: { ...document, active: true } });
                    // Imported original documents also invalidate projections when their bodies change.
                    if (different && !changed) {
                        changed = true;
                        tx.objectStore('metadata').put({ key: 'generation', value: crypto.randomUUID() });
                    }
                };
            }
            if (retire) {
                const keep = new Set(retire.paths), prefix = retire.repository + ':';
                const request = tx.objectStore('documents').openCursor(IDBKeyRange.bound(prefix, prefix + '\uffff'));
                request.onsuccess = () => {
                    const cursor = request.result;
                    if (!cursor) return;
                    const document = cursor.value.document as SourceDocument;
                    if (document.repository === retire.repository && document.active !== false && !keep.has(document.path)) {
                        cursor.update({ ...cursor.value, document: { ...document, active: false } });
                        if (!changed) {
                            changed = true;
                            tx.objectStore('metadata').put({ key: 'generation', value: crypto.randomUUID() });
                        }
                        counts.retired++;
                    }
                    cursor.continue();
                };
            }
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        });
        return counts;
    }
    finally {
        db.close();
    }
}
export async function readDocument(repository: SourceDocument['repository'], path: string): Promise<SourceDocument | undefined> {
    const db = await database();
    try {
        return await new Promise<SourceDocument | undefined>((resolve, reject) => {
            const tx = db.transaction('documents'), request = tx.objectStore('documents').get(documentKey({ repository, path }));
            tx.oncomplete = () => resolve(request.result?.document);
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error || Error('原文读取事务已取消。'));
        });
    }
    finally { db.close(); }
}
export async function readCatalogCache(parserVersion: string): Promise<{
    generation: string;
    snapshot: CatalogProjection | null;
}> {
    const db = await database();
    try {
        return await new Promise<{
            generation: string;
            snapshot: CatalogProjection | null;
        }>((resolve, reject) => {
            const tx = db.transaction(['metadata', 'catalogs']);
            const g = tx.objectStore('metadata').get('generation'), c = tx.objectStore('catalogs').get('current');
            tx.oncomplete = () => { const generation = g.result?.value || 'legacy'; const cached = c.result; resolve({ generation, snapshot: cached?.generation === generation && cached?.parserVersion === parserVersion ? cached.snapshot : null }); };
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error || Error('目录缓存读取事务已取消。'));
        });
    }
    finally {
        db.close();
    }
}
export async function writeCatalogCache(parserVersion: string, generation: string, snapshot: CatalogProjection): Promise<boolean> {
    const db = await database();
    try {
        return await new Promise<boolean>((resolve, reject) => {
            const tx = db.transaction(['metadata', 'catalogs'], 'readwrite');
            let accepted = false;
            const request = tx.objectStore('metadata').get('generation');
            request.onsuccess = () => {
                if ((request.result?.value || 'legacy') === generation) {
                    accepted = true;
                    tx.objectStore('catalogs').put({ key: 'current', parserVersion, generation, snapshot });
                }
            };
            tx.oncomplete = () => resolve(accepted);
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        });
    }
    finally {
        db.close();
    }
}
