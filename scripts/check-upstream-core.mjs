import assert from 'node:assert/strict';
import { build } from 'vite';

async function load(entry) {
    const output = await build({ configFile: false, publicDir: false, logLevel: 'silent', build: { write: false, lib: { entry, formats: ['es'] } } });
    const code = (Array.isArray(output) ? output : [output]).flatMap(result => result.output).find(chunk => chunk.type === 'chunk' && chunk.isEntry)?.code;
    assert(code, `未生成检查模块：${entry}`);
    return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}

const { createSourceClient } = await load('src/content/fiveetools/sourceClient.ts');
const { parseDocuments } = await load('src/content/fiveetools/parser.ts');
const documents = new Map();
const client = createSourceClient({
    readDocument: async () => undefined,
    saveDocuments: async (batch, retire) => {
        assert.equal(retire?.repository, '5etools-cn');
        assert.equal(batch.length, retire.paths.length);
        for (const document of batch) documents.set(document.path, document);
        return { added: batch.length, updated: 0, unchanged: 0, retired: 0 };
    },
}, fetch);
const result = await client.loadCore(new AbortController().signal, () => {});
assert.deepEqual(result.errors, []);
assert.equal(result.documents.length, documents.size);
assert(result.documents.every(doc => doc.revision === result.revision));
const before = JSON.stringify(result.documents);
const parsed = parseDocuments(result.documents);
assert.equal(JSON.stringify(result.documents), before, '解析不得改写上游原文');
assert(parsed.entries.length > 0, '主库未生成玩家资源');
console.log(JSON.stringify({ revision: result.revision, documents: result.documents.length, cards: parsed.entries.length, diagnostics: parsed.diagnostics.reduce((counts, row) => (counts[row.code] = (counts[row.code] || 0) + 1, counts), {}) }));
