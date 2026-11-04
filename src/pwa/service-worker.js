/* Build replaces these constants. This worker never opens player IndexedDB/localStorage. */
const FILES = __SHELL_FILES__;
const VERSION = __SHELL_VERSION__;
const SCOPE = new URL(self.registration.scope);
const PREFIX = 'easy-cc-shell:' + SCOPE.pathname + ':';
const CACHE = PREFIX + VERSION;
const INDEX = new URL('index.html', SCOPE).href;
const ALLOWED = new Set(FILES.map(path => new URL(path, SCOPE.origin).href));
async function fillShell(cache) {
    for (let i = 0; i < FILES.length; i += 6) await Promise.all(FILES.slice(i, i + 6).map(async path => {
        const response = await fetch(new Request(path, { cache: 'reload', credentials: 'same-origin' }));
        if (!response.ok || response.type === 'opaque') throw Error('Shell download failed: ' + path);
        await cache.put(path, response);
    }));
}
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        try {
            await fillShell(cache);
        } catch (error) { await caches.delete(CACHE); throw error; }
        // Wait for an explicit update request. First installation activates normally.
    })());
});
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        // Keep the previous shell too, for tabs still finishing an old lazy import.
        const old = (await caches.keys()).filter(key => key.startsWith(PREFIX) && key !== CACHE);
        await Promise.all(old.slice(0, Math.max(0, old.length - 1)).map(key => caches.delete(key)));
        await self.clients.claim();
    })());
});
self.addEventListener('message', event => {
    if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting();
    if (event.data?.type === 'REPAIR_SHELL') event.waitUntil((async () => {
        try { await fillShell(await caches.open(CACHE)); event.ports[0]?.postMessage({ ok: true }); }
        catch { event.ports[0]?.postMessage({ ok: false }); }
    })());
    if (event.data?.type === 'SHELL_STATUS') event.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        const ready = (await Promise.all(FILES.map(path => cache.match(path)))).every(Boolean);
        event.ports[0]?.postMessage({ version: VERSION, ready });
    })());
});
self.addEventListener('fetch', event => {
    const request = event.request, url = new URL(request.url);
    if (request.method !== 'GET' || url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
    if (request.mode === 'navigate') {
        event.respondWith((async () => (await (await caches.open(CACHE)).match(INDEX)) || fetch(request))());
        return;
    }
    url.search = ''; url.hash = '';
    if (!ALLOWED.has(url.href)) return; // External rule downloads remain explicitly managed by the app.
    event.respondWith((async () => {
        const cache = await caches.open(CACHE), saved = await cache.match(url.href);
        if (saved) return saved;
        // Older tabs can finish loading assets from the previous complete shell.
        const fallback = await caches.match(url.href);
        return fallback || fetch(request);
    })());
});
