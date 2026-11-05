import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { build } from 'vite';
const bytes = await readFile('local-resources/core-documents.json');
const manifest = JSON.parse(await readFile('local-resources/core-manifest.json','utf8'));
assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.sha256);
const docs = JSON.parse(bytes), original = JSON.stringify(docs);
const output = await build({configFile:false,publicDir:false,logLevel:'silent',build:{write:false,lib:{entry:'src/content/fiveetools/parser.ts',formats:['es']}}});
const code = (Array.isArray(output) ? output : [output]).flatMap(result => result.output).find(chunk=>chunk.type==='chunk' && chunk.isEntry).code;
const { parseDocuments } = await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const result = parseDocuments(docs);
assert.equal(JSON.stringify(docs),original,'解析不得改写预装原文');
for (const book of manifest.books) {
    const count = result.entries.filter(item=>item.source===book.code).length;
    assert.ok(count>0,book.code+'没有生成资源卡');
    console.log(book.code+': '+count+' cards');
}
console.log('Original documents: '+docs.length+'; parsed cards: '+result.entries.length+'; diagnostics: '+result.diagnostics.length);
