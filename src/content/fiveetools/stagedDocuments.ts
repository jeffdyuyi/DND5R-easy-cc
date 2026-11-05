import type { SourceDocument } from './model';
import { documentKey, isSourceDocument } from './sourceDocument';

/** Keep staging private; activate must atomically replace the pointer, leaving it unchanged on rejection. */
export interface DocumentVersions {
    create(): Promise<string>;
    write(version: string, document: SourceDocument): Promise<void>;
    read(version: string): Promise<SourceDocument[]>;
    activate(version: string): Promise<void>;
    discard(version: string): Promise<void>;
}

/** Validate persisted bytes and parse them before making a version visible. */
export async function stageDocuments(
    storage: DocumentVersions,
    documents: SourceDocument[],
    validate: (persisted: SourceDocument[]) => Promise<void>,
): Promise<string> {
    if (!documents.length) throw Error('资料版本不能为空。');
    const expected = new Map<string, string>();
    for (const document of documents) {
        if (!isSourceDocument(document)) throw Error('资料原文结构无效。');
        const key = documentKey(document);
        if (expected.has(key)) throw Error('资料版本包含重复文件：' + key);
        expected.set(key, JSON.stringify(document));
    }
    const version = await storage.create();
    try {
        for (const serialized of expected.values()) await storage.write(version, JSON.parse(serialized));
        const persisted = await storage.read(version);
        const seen = new Set<string>();
        for (const document of persisted) {
            if (!isSourceDocument(document)) throw Error('保存后的资料结构无效。');
            const key = documentKey(document);
            if (seen.has(key) || expected.get(key) !== JSON.stringify(document))
                throw Error('保存后的资料与下载内容不一致：' + key);
            seen.add(key);
        }
        if (seen.size !== expected.size) throw Error('保存后的资料文件不完整。');
        await validate(persisted);
        await storage.activate(version);
        return version;
    } catch (error) {
        try { await storage.discard(version); }
        catch (cleanup) { throw new AggregateError([error, cleanup], '资料未激活，暂存清理失败。'); }
        throw error;
    }
}
