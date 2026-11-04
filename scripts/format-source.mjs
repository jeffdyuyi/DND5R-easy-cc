import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const root=process.cwd();
const folders=['components','contexts','hooks','src','utils','data'];
const collect=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?collect(path.join(dir,entry.name)):/\.tsx?$/.test(entry.name)?[path.join(dir,entry.name)]:[]);
const files=[...folders.flatMap(dir=>collect(path.join(root,dir))),...['App.tsx','index.tsx','types.ts','vite.config.ts'].map(file=>path.join(root,file))];
const printer=ts.createPrinter({newLine:ts.NewLineKind.LineFeed});
let count=0;
for(const filename of files){
 // Preserve third-party adaptation formatting and ambient raw-module declarations.
 if(filename.endsWith('expand.ts')||filename.endsWith('.d.ts'))continue;
 const input=fs.readFileSync(filename,'utf8');
 let source=ts.createSourceFile(filename,input,ts.ScriptTarget.Latest,true,filename.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 if(source.parseDiagnostics.length){throw Error('无法格式化源文件 '+path.relative(root,filename)+': '+source.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')).join('; '));}
 const output=printer.printFile(source).replace(/\r\n/g,'\n');
 if(output!==input){fs.writeFileSync(filename,output,'utf8');count++;}
}
process.stdout.write(`Formatted ${count} source files. No application code executed.\n`);
