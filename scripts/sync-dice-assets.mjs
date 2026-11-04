import fs from 'node:fs';
import path from 'node:path';
const dependency='node_modules/@3d-dice/dice-box',destination='public/vendor/dice-box';
const meta=JSON.parse(fs.readFileSync(path.join(dependency,'package.json'),'utf8'));
if(meta.version!=='1.1.4')throw new Error('Review dice assets and license before updating the pinned version.');
fs.mkdirSync(destination,{recursive:true});
fs.cpSync(path.join(dependency,'dist/assets'),destination,{recursive:true});
fs.copyFileSync(path.join(dependency,'LICENSE'),path.join(destination,'LICENSE.txt'));
process.stdout.write('Copied Dice-Box 1.1.4 assets and MIT license. No application code executed.\n');
