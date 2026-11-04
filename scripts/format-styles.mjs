import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),postcss=require('postcss');
for(const file of ['index.css','resource-cards.css','styles/character.css','styles/handbook-theme.css','styles/app-shell.css','styles/dice-studio.css','styles/library-workspace.css']){
 const sheet=postcss.parse(fs.readFileSync(file,'utf8'));
 const format=(container,depth=0)=>{for(const node of container.nodes||[]){node.raws.before='\n'+'  '.repeat(depth);if(node.type==='decl')node.raws.between=': ';else if(node.nodes){node.raws.between=' ';node.raws.after='\n'+'  '.repeat(depth);node.raws.semicolon=true;format(node,depth+1);}}};
 format(sheet);fs.writeFileSync(file,sheet.toString().trim()+'\n');
}
