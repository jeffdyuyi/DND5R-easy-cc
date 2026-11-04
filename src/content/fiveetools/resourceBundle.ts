import type { SourceDocument } from './model';
export interface ResourceBundle {
    format: 'easy-cc-source-bundle';
    version: 1;
    createdAt: string;
    files: {
        document: SourceDocument;
        bytes: number;
        sha256: string;
    }[];
}
const bytes = (document: SourceDocument) => new TextEncoder().encode(JSON.stringify(document));
async function digest(value: Uint8Array) {
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', value)), byte => byte.toString(16).padStart(2, '0')).join('');
}
export async function createResourceBundle(documents: SourceDocument[]): Promise<ResourceBundle> {
    const files: ResourceBundle['files'] = [];
    for (const document of documents) {
        const data = bytes(document);
        files.push({ document, bytes: data.byteLength, sha256: await digest(data) });
    }
    return { format: 'easy-cc-source-bundle', version: 1, createdAt: new Date().toISOString(), files };
}
export async function readResourceBundle(text: string): Promise<ResourceBundle> {
    const bundle = JSON.parse(text);
    if (bundle?.format !== 'easy-cc-source-bundle' || bundle.version !== 1 || !Array.isArray(bundle.files) || !bundle.files.length)
        throw Error('请选择版本1的easy-cc原文资料包。');
    const identities = new Set<string>();
    for (const file of bundle.files) {
        const doc = file?.document;
        if (!doc || !['5etools-cn', 'homebrew'].includes(doc.repository) || typeof doc.path !== 'string' || !doc.path || doc.path.includes('\\') || doc.path.startsWith('/') || doc.path.includes(':') || doc.path.split('/').some((part: string) => !part || part === '.' || part === '..') || !doc.path.endsWith('.json') || typeof doc.revision !== 'string' || !doc.revision || typeof doc.fetchedAt !== 'string' || typeof doc.url !== 'string' || !doc.body || typeof doc.body !== 'object' || Array.isArray(doc.body) || doc.active === false)
            throw Error('资料包包含无效原文记录。');
        const key = doc.repository + ':' + doc.path;
        if (identities.has(key))
            throw Error('资料包包含重复文件：' + key);
        identities.add(key);
        const data = bytes(doc);
        if (data.byteLength !== file.bytes || await digest(data) !== file.sha256)
            throw Error('文件校验失败：' + doc.path);
    }
    return bundle;
}
