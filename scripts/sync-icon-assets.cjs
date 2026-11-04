const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const revisions={game:'82d948812bfe3f269ef8f731dcdb07b08160edc4',pixel:'c9ecc2da61afde85dbe539025e3d931c6152ad75'};
const game={classes:'lorc/crossed-swords',subclasses:'lorc/crown',species:'delapouite/dwarf-face',backgrounds:'lorc/scroll-unfurled',feats:'lorc/crowned-heart',spells:'lorc/wizard-staff',weapons:'lorc/crossed-swords',armors:'lorc/breastplate',tools:'lorc/anvil',gears:'delapouite/backpack',magicItems:'lorc/crystal-ball',characters:'delapouite/wizard-face',candle:'lorc/candle-flame',book:'lorc/open-book',bow:'lorc/bowman',shield:'lorc/checked-shield',potion:'lorc/potion-ball',barbarian:'lorc/battle-axe',bard:'lorc/lyre',cleric:'lorc/holy-symbol',druid:'delapouite/oak-leaf',fighter:'lorc/crossed-swords',monk:'lorc/fist',paladin:'lorc/checked-shield',ranger:'lorc/bowman',rogue:'lorc/cloak-dagger',sorcerer:'lorc/fireball',warlock:'delapouite/warlock-eye',wizard:'delapouite/spell-book'};
const pixel={home:'home',close:'close',left:'chevron-left',right:'chevron-right',search:'search',edit:'pencil',delete:'trash',add:'plus',download:'download',upload:'upload',save:'save',check:'check',back:'arrow-left',user:'user',filter:'filter',menu:'menu',external:'external-link',lightning:'zap',scale:'scale',star:'star',book:'book-open'};
async function text(url){const response=await fetch(url);if(!response.ok)throw Error(response.status+' '+url);return response.text();}
async function main(){
 const catalog={},manifest={date:'2026-11-02',revisions,entries:[]};
 const jobs=[...Object.entries(game).map(([key,file])=>({key,lib:'game',file:file+'.svg'})),...Object.entries(pixel).map(([key,file])=>({key,lib:'pixel',file:'svg/'+file+'.svg'}))];
 const cache=new Map();
 for(let i=0;i<jobs.length;i+=6)await Promise.all(jobs.slice(i,i+6).map(async job=>{
  const repo=job.lib==='game'?'game-icons/icons':'halfmage/pixelarticons';const url='https://raw.githubusercontent.com/'+repo+'/'+revisions[job.lib]+'/'+job.file;
  let promise=cache.get(url);if(!promise){promise=text(url);cache.set(url,promise);}const original=await promise;
  if(!/<svg\b/.test(original)||/<(?:script|foreignObject|image|use)\b|\bon\w+\s*=|\bhref\s*=/i.test(original))throw Error('Unsupported SVG '+job.file);
  let body=original.replace(/^[\s\S]*?<svg\b[^>]*>/,'').replace(/<\/svg>[\s\S]*$/,'').replace(/<path\b[^>]*d="M0 0h512v512H0z"[^>]*\/>/g,'').replace(/fill="#(?:fff|ffffff|000|000000)"/gi,'fill="currentColor"');
  const viewBox=original.match(/viewBox="([^"]+)"/)?.[1]||'0 0 24 24';
  const name=job.lib+'/'+job.key;catalog[name]={viewBox,body};
  const target='public/icons/'+job.lib+'/'+job.key+'.svg';fs.mkdirSync(path.dirname(path.join(root,target)),{recursive:true});fs.writeFileSync(path.join(root,target),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+viewBox+'" fill="currentColor">'+body+'</svg>');
  manifest.entries.push({key:name,author:job.lib==='game'?job.file.split('/')[0]:'Gerrit Halfmann',license:job.lib==='game'?'CC BY 3.0':'MIT',source:url,target,sha256:crypto.createHash('sha256').update(original).digest('hex'),changes:'SVG background removed where present; monochrome fills use currentColor; geometry unchanged'});
 }));
 const dir=path.join(root,'public/icons');fs.mkdirSync(path.join(root,'src/assets'),{recursive:true});
 fs.writeFileSync(path.join(root,'src/assets/icon-catalog.json'),JSON.stringify(catalog,null,2));
 manifest.entries.sort((a,b)=>a.key.localeCompare(b.key));fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2));
 fs.writeFileSync(path.join(dir,'Game-icons-LICENSE.txt'),await text('https://raw.githubusercontent.com/game-icons/icons/'+revisions.game+'/license.txt'));
 fs.writeFileSync(path.join(dir,'Pixelarticons-LICENSE.txt'),await text('https://raw.githubusercontent.com/halfmage/pixelarticons/'+revisions.pixel+'/LICENSE'));
 fs.writeFileSync(path.join(dir,'CC-BY-3.0.txt'),await text('https://creativecommons.org/licenses/by/3.0/legalcode.txt'));
 const rows=manifest.entries.map(e=>'<tr><td>'+e.key+'</td><td>'+e.author+'</td><td>'+e.license+'</td><td><a href="'+e.source+'">Original SVG</a></td></tr>').join('');
 fs.writeFileSync(path.join(dir,'ATTRIBUTION.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>easy-cc 图标来源</title><style>body{font:16px/1.7 sans-serif;max-width:1000px;margin:auto;padding:24px;background:#172b35;color:#e7ead8}a{color:#e1c78c}td,th{border:1px solid #728770;padding:8px}table{border-collapse:collapse}section{overflow:auto}</style><h1>图标来源与许可</h1><p>Resource icons made by Lorc and Delapouite, from <a href="https://game-icons.net/">Game-icons.net</a>, licensed under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Background removed and fill colors adapted; geometry unchanged.</p><p>UI icons: Pixelarticons, Copyright Gerrit Halfmann, MIT. <a href="Pixelarticons-LICENSE.txt">MIT license</a> · <a href="Game-icons-LICENSE.txt">Game-icons author list</a> · <a href="CC-BY-3.0.txt">CC BY 3.0 legal text</a></p><section><table><tr><th>Local key</th><th>Author</th><th>License</th><th>Source</th></tr>'+rows+'</table></section></html>');
 console.log('Saved '+jobs.length+' local icon mappings, '+cache.size+' unique SVG sources; licenses and attribution included.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});

