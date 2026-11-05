import { seedNativeLibrary, readNativeDocuments } from './nativeSourceStore';
import { isSourceDocument } from '../content/fiveetools/sourceDocument';
let preparing: Promise<void> | undefined;
/** Only a fresh native library is seeded. Downloads and existing original records are never overwritten. */
export function ensurePreinstalledLibrary(report?: (message: string) => void): Promise<void> {
    if (!preparing) preparing = (async () => {
        const before = await readNativeDocuments();
        if (before.documents.some(doc => doc.repository === '5etools-cn')) return;
        report?.('正在安装APK预装资料，请稍候…');
        const [metadata, response] = await Promise.all([fetch('resources/core-manifest.json'), fetch('resources/core-documents.json')]);
        if (!metadata.ok || !response.ok) throw Error('APK预装资料缺失，请重新打包。');
        const manifest = await metadata.json(), bytes = await response.arrayBuffer();
        const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(value => value.toString(16).padStart(2, '0')).join('');
        if (manifest.format !== 'easy-cc-preinstalled-library' || manifest.version !== 1 || manifest.sha256 !== hash || manifest.bytes !== bytes.byteLength) throw Error('APK预装资料校验失败，未写入。');
        const documents: unknown = JSON.parse(new TextDecoder().decode(bytes));
        if (!Array.isArray(documents) || !documents.every(isSourceDocument) || documents.length !== manifest.files) throw Error('APK预装原文结构无效。');
        // Re-read immediately before writing, so a simultaneous import takes precedence.
        if ((await readNativeDocuments()).documents.some(doc => doc.repository === '5etools-cn')) return;
        report?.('预装资料校验通过，正在保存并解析…');
        await seedNativeLibrary(documents);
    })().catch(error => { preparing = undefined; throw error; });
    return preparing;
}
