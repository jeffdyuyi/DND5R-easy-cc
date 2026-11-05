import { SOURCE_CONFIG, RESOURCE_PROPS } from './model';
import type { SourceDocument } from './model';
import { emptyCounts, isSourceDocument, isSourcePath } from './sourceDocument';
import type { SourceStore } from './sourceDocument';

type SourceConfig = typeof SOURCE_CONFIG.core | typeof SOURCE_CONFIG.brew;
export type PackageReadState = 'queued' | 'reading' | 'downloaded' | 'cached' | 'failed' | 'cancelled';
export interface PackageReadRecord {
    state: PackageReadState;
    at: string;
    error?: string;
}

/** Host adapters provide storage and HTTP; synchronization has no IndexedDB dependency. */
export function createSourceClient(store: SourceStore, request: typeof fetch) {
    async function latestConfig(config: SourceConfig, signal: AbortSignal): Promise<SourceConfig> {
        const controller = new AbortController(), relay = () => controller.abort();
        if (signal.aborted)
            throw new DOMException('已取消', 'AbortError');
        signal.addEventListener('abort', relay, { once: true });
        const timer = setTimeout(() => controller.abort(), 30000);
        try {
            const response = await request('https://api.github.com/repos/' + config.repo + '/branches/' + encodeURIComponent(config.branch), { signal: controller.signal, cache: 'no-store', headers: { Accept: 'application/vnd.github+json' } });
            if (!response.ok)
                throw Error('上游修订检查失败：HTTP ' + response.status);
            const body = await response.json(), revision = body.commit?.sha;
            if (!/^[0-9a-f]{40}$/i.test(revision || ''))
                throw Error('上游没有返回有效提交修订');
            return { ...config, revision };
        }
        finally {
            clearTimeout(timer);
            signal.removeEventListener('abort', relay);
        }
    }
    // Metadata-only check. Downloading remains an explicit separate action.
    async function checkCoreRevision(signal: AbortSignal): Promise<string> {
        return (await latestConfig(SOURCE_CONFIG.core, signal)).revision;
    }
    async function fetchDocument(config: typeof SOURCE_CONFIG.core | typeof SOURCE_CONFIG.brew, path: string, signal: AbortSignal): Promise<SourceDocument> {
        if (signal.aborted)
            throw new DOMException('已取消', 'AbortError');
        if (!isSourcePath(path))
            throw Error('非法资料路径：' + path);
        const existing = await store.readDocument(config.repository, path);
        if (signal.aborted)
            throw new DOMException('已取消', 'AbortError');
        if (isSourceDocument(existing) && existing.repository === config.repository && existing.path === path && existing.revision === config.revision)
            return { ...existing, active: true };
        const url = 'https://raw.githubusercontent.com/' + config.repo + '/' + config.revision + '/' + path.split('/').map(encodeURIComponent).join('/');
        const timeout = new AbortController();
        const relay = () => timeout.abort();
        if (signal.aborted)
            throw new DOMException('已取消', 'AbortError');
        signal.addEventListener('abort', relay, { once: true });
        const timer = setTimeout(() => timeout.abort(new Error('读取超时：' + path)), 30000);
        try {
            const response = await request(url, { signal: timeout.signal });
            if (!response.ok)
                throw Error(path + '：HTTP ' + response.status);
            const body = await response.json();
            if (!body || typeof body !== 'object' || Array.isArray(body))
                throw Error(path + '：不是JSON资料对象');
            return { repository: config.repository, revision: config.revision, path, url, fetchedAt: new Date().toISOString(), body };
        }
        finally {
            clearTimeout(timer);
            signal.removeEventListener('abort', relay);
        }
    }
    async function queue(config: typeof SOURCE_CONFIG.core | typeof SOURCE_CONFIG.brew, paths: string[], signal: AbortSignal, report: (message: string) => void) {
        const documents: SourceDocument[] = [], errors: string[] = [];
        let at = 0, done = 0;
        await Promise.all(Array.from({ length: 4 }, async () => {
            while (at < paths.length && !signal.aborted) {
                const path = paths[at++];
                try {
                    documents.push(await fetchDocument(config, path, signal));
                }
                catch (error) {
                    if (signal.aborted)
                        return;
                    errors.push(String(error));
                }
                report('读取 ' + (++done) + ' / ' + paths.length + '：' + path);
            }
        }));
        if (signal.aborted)
            throw new DOMException('已取消', 'AbortError');
        return { documents, errors };
    }
    async function loadCore(signal: AbortSignal, report: (message: string) => void) {
        report('检查中文主库上游更新…');
        const config = await latestConfig(SOURCE_CONFIG.core, signal);
        report('读取中文主库分卷索引…');
        const indices = await Promise.all(['data/class/index.json', 'data/class/fluff-index.json', 'data/spells/index.json'].map(path => fetchDocument(config, path, signal)));
        const indexedPaths = indices.flatMap(doc => Object.values(doc.body).map(file => {
            if (!isSourcePath(file)) throw Error('分卷索引含无效资料路径：' + doc.path);
            return doc.path.slice(0, doc.path.lastIndexOf('/') + 1) + file;
        }));
        const paths = [...indexedPaths, ...['backgrounds', 'races', 'feats', 'optionalfeatures', 'charcreationoptions', 'rewards', 'psionics', 'languages', 'fluff-languages', 'recipes', 'fluff-recipes', 'conditionsdiseases', 'variantrules', 'actions', 'items-base', 'items', 'magicvariants', 'vehicles', 'books', 'adventures', 'fluff-backgrounds', 'fluff-races', 'fluff-feats', 'fluff-items'].map(file => 'data/' + file + '.json'), 'data/book/book-xphb.json', 'data/generated/gendata-spell-source-lookup.json'];
        const manifest = [...new Set(paths)], result = await queue(config, manifest, signal, report);
        // Publish a complete revision in one transaction. Partial downloads never mix with the old revision.
        if (result.errors.length)
            return { documents: [], errors: result.errors, counts: emptyCounts(), revision: config.revision };
        const documents = [...result.documents, ...indices];
        if (signal.aborted)
            throw new DOMException('已取消', 'AbortError');
        report('保存中文主库原文到本机…');
        const counts = await store.saveDocuments(documents, { repository: config.repository, paths: documents.map(doc => doc.path) });
        return { documents, errors: result.errors, counts, revision: config.revision };
    }
    async function discoverHomebrew(signal: AbortSignal, chosenConfig?: SourceConfig) {
        const config = chosenConfig || await latestConfig(SOURCE_CONFIG.brew, signal);
        const props = await fetchDocument(config, '_generated/index-props.json', signal);
        const sources = await fetchDocument(config, '_generated/index-sources.json', signal);
        await store.saveDocuments([props, sources]);
        const paths = [...new Set(RESOURCE_PROPS.flatMap(prop => Object.keys(props.body[prop] || {})))].sort();
        return { paths, sources: sources.body, config, revision: config.revision };
    }
    async function loadHomebrew(paths: string[], signal: AbortSignal, report: (message: string) => void, onPackage?: (path: string, state: PackageReadState, error?: string) => void) {
        report('检查Homebrew上游更新…');
        const { sources, config } = await discoverHomebrew(signal);
        const visited = new Set<string>(), documents: SourceDocument[] = [], errors: string[] = [], queue: string[] = [];
        let cursor = 0;
        const counts = emptyCounts();
        const enqueue = (path: string) => {
            if (signal.aborted)
                return;
            if (visited.has(path))
                return;
            visited.add(path);
            queue.push(path);
            onPackage?.(path, 'queued');
        };
        paths.forEach(enqueue);
        await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
            while (cursor < queue.length && !signal.aborted) {
                const path = queue[cursor++];
                report('读取Homebrew：' + path);
                onPackage?.(path, 'reading');
                try {
                    const document = await fetchDocument(config, path, signal);
                    if (signal.aborted)
                        throw new DOMException('已取消', 'AbortError');
                    onPackage?.(path, 'downloaded');
                    const saved = await store.saveDocuments([document]);
                    counts.added += saved.added;
                    counts.updated += saved.updated;
                    counts.unchanged += saved.unchanged;
                    documents.push(document);
                    onPackage?.(path, 'cached');
                    for (const section of ['dependencies', 'includes'])
                        for (const ids of Object.values(document.body._meta?.[section] || {}))
                            for (const id of (Array.isArray(ids) ? ids : [ids])) {
                                const target = sources[String(id)] || Object.entries(sources).find(([key]) => key.toLowerCase() === String(id).toLowerCase())?.[1];
                                if (target)
                                    enqueue(String(target));
                            }
                }
                catch (error) {
                    if (signal.aborted) {
                        onPackage?.(path, 'cancelled');
                        return;
                    }
                    const message = path + '：' + String(error);
                    errors.push(message);
                    onPackage?.(path, 'failed', String(error));
                }
            }
        }));
        if (signal.aborted) {
            for (const path of queue.slice(cursor))
                onPackage?.(path, 'cancelled');
            throw new DOMException('已取消', 'AbortError');
        }
        return { documents, errors, counts, revision: config.revision };
    }

    return { checkCoreRevision, loadCore, discoverHomebrew, loadHomebrew };
}
