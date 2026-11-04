import type { SourceDocument } from './model';
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
    const db = await database();
    try {
        return await new Promise<SourceDocument[]>((resolve, reject) => { const r = db.transaction('documents').objectStore('documents').getAll(); r.onsuccess = () => resolve(r.result.map((v: any) => v.document).filter((document: SourceDocument) => document.active !== false)); r.onerror = () => reject(r.error); });
    }
    finally {
        db.close();
    }
}
export interface SyncCounts {
    added: number;
    updated: number;
    unchanged: number;
    retired: number;
}
export const emptyCounts = (): SyncCounts => ({ added: 0, updated: 0, unchanged: 0, retired: 0 });
export async function saveDocuments(documents: SourceDocument[]): Promise<SyncCounts> {
    const db = await database(), counts = emptyCounts();
    try {
        await new Promise<void>((resolve, reject) => {
            const tx = db.transaction(['documents', 'metadata'], 'readwrite');
            let changed = false;
            for (const document of documents) {
                const key = document.repository + ':' + document.path;
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
export async function readCatalogCache(parserVersion: string): Promise<{
    generation: string;
    snapshot: any | null;
}> {
    const db = await database();
    try {
        return await new Promise<{
            generation: string;
            snapshot: any | null;
        }>((resolve, reject) => {
            const tx = db.transaction(['metadata', 'catalogs']);
            const g = tx.objectStore('metadata').get('generation'), c = tx.objectStore('catalogs').get('current');
            tx.oncomplete = () => { const generation = g.result?.value || 'legacy'; const cached = c.result; resolve({ generation, snapshot: cached?.generation === generation && cached?.parserVersion === parserVersion ? cached.snapshot : null }); };
            tx.onerror = () => reject(tx.error);
        });
    }
    finally {
        db.close();
    }
}
export async function writeCatalogCache(parserVersion: string, generation: string, snapshot: any) {
    const db = await database();
    try {
        await new Promise<void>((resolve, reject) => {
            const tx = db.transaction(['metadata', 'catalogs'], 'readwrite');
            const request = tx.objectStore('metadata').get('generation');
            request.onsuccess = () => {
                if ((request.result?.value || 'legacy') === generation)
                    tx.objectStore('catalogs').put({ key: 'current', parserVersion, generation, snapshot });
            };
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        });
    }
    finally {
        db.close();
    }
}
