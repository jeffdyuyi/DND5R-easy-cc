import type { SourceDocument } from './model';

export interface SyncCounts {
    added: number;
    updated: number;
    unchanged: number;
    retired: number;
}
export const emptyCounts = (): SyncCounts => ({ added: 0, updated: 0, unchanged: 0, retired: 0 });
export interface DocumentRetirement {
    repository: SourceDocument['repository'];
    paths: string[];
}
/** A batch and its retirement list must commit together or leave the original store unchanged. */
export interface SourceStore {
    readDocument(repository: SourceDocument['repository'], path: string): Promise<SourceDocument | undefined>;
    saveDocuments(documents: SourceDocument[], retire?: DocumentRetirement): Promise<SyncCounts>;
}

/** Relative JSON paths only, shared by downloads, imports and future native file storage. */
export function isSourcePath(path: unknown): path is string {
    return typeof path === 'string' && path.endsWith('.json') && !/[\\:\u0000-\u001f\u007f]/.test(path)
        && path.split('/').every(part => !!part && part !== '.' && part !== '..');
}
export function isSourceDocument(value: unknown): value is SourceDocument {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    const doc = value as Record<string, unknown>;
    return (doc.repository === '5etools-cn' || doc.repository === 'homebrew') && isSourcePath(doc.path)
        && typeof doc.revision === 'string' && !!doc.revision && typeof doc.url === 'string'
        && typeof doc.fetchedAt === 'string' && (doc.active === undefined || typeof doc.active === 'boolean')
        && !!doc.body && typeof doc.body === 'object' && !Array.isArray(doc.body);
}
/** Keep this identity stable: existing IndexedDB keys and bundles use it. */
export function documentKey(doc: Pick<SourceDocument, 'repository' | 'path'>): string {
    return doc.repository + ':' + doc.path;
}
