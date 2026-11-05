import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

// Compile the pure TypeScript modules in memory, without the app config, server or output files.
async function load(name) {
    const result = await build({
        configFile: false, publicDir: false, logLevel: 'silent',
        build: { write: false, lib: { entry: fileURLToPath(new URL(name.startsWith('platform/') ? '../src/' + name + '.ts' : '../src/content/fiveetools/' + name + '.ts', import.meta.url)), formats: ['es'] } },
    });
    const outputs = Array.isArray(result) ? result : [result];
    const entry = outputs.flatMap(output => output.output).find(chunk => chunk.type === 'chunk' && chunk.isEntry);
    assert(entry, '未生成离线模块入口');
    return import('data:text/javascript;base64,' + Buffer.from(entry.code).toString('base64'));
}
const { buildCatalogSnapshot } = await load('catalogPipeline');
const { createSourceClient } = await load('sourceClient');
const document = (text = '完整正文') => ({
    repository: '5etools-cn', path: 'data/spells/spells-phb.json', revision: 'fixture', url: '', fetchedAt: '',
    body: { spell: [{ name: '校验法术', source: 'PHB', level: 0, school: 'V', entries: [text] }], unknownField: { keep: true } },
});
const store = (overrides = {}) => ({
    readCatalogCache: async () => ({ generation: 'g', snapshot: null }),
    readCatalogDocuments: async () => ({ generation: 'g', documents: [document()] }),
    writeCatalogCache: async () => true,
    ...overrides,
});

test('已有目录缓存不会重新解析原文', async () => {
    const snapshot = { catalog: { entries: [], diagnostics: [], documents: 0 }, documents: [], packages: ['fixture.json'] };
    const result = await buildCatalogSnapshot(store({
        readCatalogCache: async () => ({ generation: 'g', snapshot }),
        readCatalogDocuments: async () => assert.fail('不应读取原文'),
    }), 'v');
    assert.equal(result.fromCache, true);
    assert.deepEqual(result.packages, snapshot.packages);
});
test('离线解析保留正文且不修改原文或未知字段', async () => {
    const original = document(), before = structuredClone(original);
    const result = await buildCatalogSnapshot(store({ readCatalogDocuments: async () => ({ generation: 'g', documents: [original] }) }), 'v');
    assert(result.catalog.entries.some(entry => entry.fullDescription.includes('完整正文')));
    assert.deepEqual(original, before);
});
test('并发更新后仅返回重新读取的版本', async () => {
    let reads = 0;
    const result = await buildCatalogSnapshot(store({
        readCatalogDocuments: async () => ({ generation: String(++reads), documents: [document(reads === 1 ? '旧正文' : '新正文')] }),
        writeCatalogCache: async (_, generation) => generation === '2',
    }), 'v');
    assert.equal(reads, 2);
    assert(result.catalog.entries.some(entry => entry.fullDescription.includes('新正文')));
    assert(!result.catalog.entries.some(entry => entry.fullDescription.includes('旧正文')));
});
test('连续冲突停止重试，不返回过期目录', async () => {
    let writes = 0;
    await assert.rejects(buildCatalogSnapshot(store({ writeCatalogCache: async () => { writes++; return false; } }), 'v'), /连续发生变化/);
    assert.equal(writes, 3);
});
test('目录缓存写入失败时保留解析结果并说明原因', async () => {
    const result = await buildCatalogSnapshot(store({ writeCatalogCache: async () => { throw Error('模拟空间不足'); } }), 'v');
    assert.equal(result.fromCache, false);
    assert.match(result.cacheWarning, /模拟空间不足/);
    assert(result.catalog.entries.length > 0);
});
test('主库任一必需文件下载失败时不写入原文', async () => {
    let writes = 0;
    const client = createSourceClient({ readDocument: async () => undefined, saveDocuments: async () => { writes++; assert.fail('不应写入不完整主库'); } }, async url => {
        if (url.includes('api.github.com')) return Response.json({ commit: { sha: 'a'.repeat(40) } });
        if (url.endsWith('/data/items.json')) return new Response(null, { status: 503 });
        return Response.json(url.endsWith('/index.json') || url.endsWith('/fluff-index.json') ? { PHB: 'fixture.json' } : {});
    });
    const result = await client.loadCore(new AbortController().signal, () => {});
    assert.equal(writes, 0);
    assert.equal(result.documents.length, 0);
    assert.equal(result.errors.length, 1);
});

test('中文主库检查 main，原文按该提交读取，失败不替换旧缓存', async () => {
    const requested = [], old = document('旧正文');
    const client = createSourceClient({
        readDocument: async () => old,
        saveDocuments: async () => assert.fail('下载失败不能替换旧缓存'),
    }, async url => {
        requested.push(String(url));
        if (String(url).includes('api.github.com')) return Response.json({ commit: { sha: 'b'.repeat(40) } });
        return new Response(null, { status: 503 });
    });
    assert.equal(await client.checkCoreRevision(new AbortController().signal), 'b'.repeat(40));
    await assert.rejects(client.loadCore(new AbortController().signal, () => {}), /HTTP 503/);
    assert(requested.some(url => url.endsWith('/branches/main')));
    assert(requested.some(url => url.includes('/' + 'b'.repeat(40) + '/data/class/index.json')));
});

const { stageDocuments } = await load('stagedDocuments');
test('暂存读回并解析成功后才激活', async () => {
    const events = []; let saved;
    const version = await stageDocuments({
        create: async () => 'v1', write: async (_, doc) => { saved = doc; },
        read: async () => [saved], activate: async () => { events.push('activate'); },
        discard: async () => assert.fail('不应丢弃有效版本'),
    }, [document()], async () => { events.push('parse'); });
    assert.equal(version, 'v1');
    assert.deepEqual(events, ['parse', 'activate']);
});
test('暂存损坏或解析失败均不激活', async () => {
    for (const corrupt of [true, false]) {
        let discarded = false;
        await assert.rejects(stageDocuments({
            create: async () => 'v1', write: async () => {},
            read: async () => corrupt ? [] : [document()],
            activate: async () => assert.fail('失败版本不得激活'),
            discard: async () => { discarded = true; },
        }, [document()], async () => { throw Error('解析失败'); }));
        assert.equal(discarded, true);
    }
});

const { nativeDocumentVersions } = await load('platform/nativeDocumentVersions');
test('原生版本复用未变原文，激活失败保留旧指针', async () => {
    const saved = new Map(), writes = [], first = document();
    const oldFile = '11111111-1111-4111-8111-111111111111.json';
    saved.set(oldFile, JSON.stringify(first));
    const files = {
        read: async ({ name }) => ({ text: saved.get(name) ?? null }),
        write: async ({ name, text }) => { saved.set(name, text); writes.push(name); },
        active: async () => ({ version: 'old-version' }),
        activate: async () => { throw Error('并发版本冲突'); },
        discard: async ({ name }) => { saved.delete(name); },
    };
    const adapter = nativeDocumentVersions({ generation: 'old-version', documents: [first], references: { '5etools-cn:data/spells/spells-phb.json': oldFile } }, files);
    await assert.rejects(stageDocuments(adapter, [first], async () => {}), /并发版本冲突/);
    assert.equal(saved.get(oldFile), JSON.stringify(first));
    assert.equal(writes.length, 1); // Only a temporary manifest; unchanged original was reused.
    assert.equal(saved.size, 1);
});
