import { lstat, readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname, resolve } from 'node:path';
import { normalizePath } from 'vite';
import type { Plugin, ResolvedConfig } from 'vite';

const directories = ['dice', 'fonts', 'icons', 'sources', 'support', 'ui', 'vendor'];
const extensions = new Set(['.html', '.json', '.png', '.jpg', '.svg', '.txt', '.wasm', '.woff2']);

/** Only reviewed runtime assets enter Android; public/rules and optional local data stay local. */
export function androidAssets(): Plugin {
    let config: ResolvedConfig;
    return {
        name: 'easy-cc-android-assets',
        apply: 'build',
        enforce: 'pre',
        configResolved(value) { config = value; },
        load(id) {
            if (normalizePath(id) === normalizePath(resolve(config.root, 'src/content/localPacks.ts')))
                return 'export default {};';
        },
        transformIndexHtml(html) {
            const metadata = /<!-- pwa:start -->[\s\S]*?<!-- pwa:end -->/;
            if (!metadata.test(html)) throw Error('Android入口缺少PWA元信息边界标记。');
            return html.replace(metadata, '');
        },
        async generateBundle() {
            for (const id of this.getModuleIds()) {
                if (normalizePath(id).includes('/data/builtin/'))
                    throw Error('Android构建包含未公开的本机资料：' + id);
            }
            const payload = await readFile(resolve(config.root, 'local-resources/core-documents.json'));
            const manifestText = await readFile(resolve(config.root, 'local-resources/core-manifest.json'));
            const manifest = JSON.parse(manifestText.toString('utf8'));
            if (manifest.sha256 !== createHash('sha256').update(payload).digest('hex') || manifest.bytes !== payload.byteLength)
                throw Error('APK预装资料校验失败，请重新制作local-resources。');
            this.emitFile({ type: 'asset', fileName: 'resources/core-documents.json', source: payload });
            this.emitFile({ type: 'asset', fileName: 'resources/core-manifest.json', source: manifestText });
            const root = resolve(config.root, 'public');
            const visit = async (relative: string): Promise<void> => {
                if ((await lstat(resolve(root, relative))).isSymbolicLink())
                    throw Error('Android资源不允许链接目录：' + relative);
                const entries = await readdir(resolve(root, relative), { withFileTypes: true });
                for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
                    if (entry.name.startsWith('.')) continue;
                    const path = relative + '/' + entry.name;
                    if (entry.isSymbolicLink()) throw Error('Android资源不允许链接文件：' + path);
                    if (entry.isDirectory()) await visit(path);
                    else if (entry.isFile()) {
                        if (!extensions.has(extname(entry.name).toLowerCase()))
                            throw Error('Android资源类型未登记：' + path);
                        this.emitFile({ type: 'asset', fileName: path, source: await readFile(resolve(root, path)) });
                    }
                }
            };
            for (const directory of directories) await visit(directory);
        },
    };
}
