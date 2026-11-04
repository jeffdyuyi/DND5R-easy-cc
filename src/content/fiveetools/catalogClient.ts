import { ParsedCatalog, SourceDocument } from './model';
export interface CatalogSnapshot {
    catalog: ParsedCatalog;
    documents: Omit<SourceDocument, 'body'>[];
    packages: string[];
    fromCache: boolean;
    cacheWarning?: string;
}
let worker: Worker | null = null, pending: Promise<CatalogSnapshot> | null = null, sequence = 0;
function requestSnapshot(report?: (message: string) => void): Promise<CatalogSnapshot> {
    return new Promise((resolve, reject) => {
        try {
            if (!worker)
                worker = new Worker(new URL('./catalog.worker.ts', import.meta.url), { type: 'module' });
            const current = worker, id = ++sequence;
            const cleanup = () => { current.removeEventListener('message', message); current.removeEventListener('error', failed); current.removeEventListener('messageerror', failed); };
            const failed = () => {
                cleanup();
                current.terminate();
                if (worker === current)
                    worker = null;
                reject(Error('资料解析线程未能完成，原文缓存保留，请重试。'));
            };
            const message = (event: MessageEvent) => {
                if (event.data.id !== id)
                    return;
                if (event.data.phase) {
                    report?.(event.data.phase);
                    return;
                }
                cleanup();
                if (event.data.ok)
                    resolve(event.data.snapshot);
                else
                    reject(Error(event.data.error || '资料解析未完成'));
            };
            current.addEventListener('message', message);
            current.addEventListener('error', failed);
            current.addEventListener('messageerror', failed);
            current.postMessage({ id });
        }
        catch (error) {
            reject(error);
        }
    });
}
export async function loadCatalogSnapshot(force = false, report?: (message: string) => void): Promise<CatalogSnapshot> {
    if (pending) {
        if (!force)
            return pending;
        try {
            await pending;
        }
        catch { }
    }
    if (!pending) {
        const job = requestSnapshot(report);
        const shared = job.finally(() => {
            if (pending === shared)
                pending = null;
        });
        pending = shared;
    }
    return pending;
}
