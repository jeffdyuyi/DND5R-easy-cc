import type { Plugin, ResolvedConfig } from 'vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
/** Generate the shell list from actual output, including lazy chunks, workers and dice WASM. */
export function pwaBuild(): Plugin {
    let config: ResolvedConfig;
    return { name: 'easy-cc-pwa', apply: 'build', configResolved(value) { config = value; }, async closeBundle() {
        const out = resolve(config.root, config.build.outDir);
        const walk = async (dir: string): Promise<string[]> => (await Promise.all((await readdir(dir, { withFileTypes: true })).map(entry => entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)]))).flat();
        const files = (await walk(out)).filter(path => !path.endsWith('.map') && relative(out, path) !== 'sw.js').sort();
        const template = await readFile(resolve(config.root, 'src/pwa/service-worker.js'), 'utf8');
        const hash = createHash('sha256').update(template);
        for (const file of files) { hash.update(relative(out, file)); hash.update(await readFile(file)); }
        const base = config.base;
        const urls = files.map(file => base + relative(out, file).replaceAll('\\', '/'));
        await writeFile(resolve(out, 'sw.js'), template.replace('__SHELL_FILES__', JSON.stringify(urls)).replace('__SHELL_VERSION__', JSON.stringify(hash.digest('hex').slice(0, 20))));
    } };
}
