import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'vite';
async function load(entry) {
    const built = await build({ configFile:false, publicDir:false, logLevel:'silent', build:{ write:false, lib:{ entry, formats:['es'] } } });
    const code = (Array.isArray(built) ? built : [built]).flatMap(out => out.output).find(out => out.type === 'chunk' && out.isEntry).code;
    return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
const quick = await load('src/character/quickRecord.ts');
const equipment = await load('src/character/equipmentSelection.ts');
const categories = await load('src/character/itemCategories.ts');
const metadata = await load('src/content/fiveetools/itemMetadata.ts');
const tracking = await load('src/character/slotTracking.ts');
const inventory = await load('src/character/inventory.ts');
const persistence = await load('src/character/persistence.ts');
const identity = await load('src/content/resourceIdentity.ts');
const card = (kind, id, buildData = {}) => ({id, name:id, source:'PHB', sourceProvider:'5etools-cn', kind, buildData});
const base = {id:'c',name:'c',className:'',level:1,abilities:{strength:10,dexterity:10,constitution:10,intelligence:10,wisdom:10,charisma:10},resourceCards:[]};
test('independent origin switches, manual adjustment and negative floor', () => {
    const race = card('species','r',{ability:[{str:2}]}), background = card('backgrounds','b',{ability:[{str:1}]});
    const c = {...base,abilities:{...base.abilities,strength:9},resourceCards:[race,background]};
    assert.equal(quick.abilityScores(c,[])[0].total,12);
    assert.equal(quick.abilityScores({...c,quickRecord:{raceAbilityEnabled:false}},[])[0].total,10);
    const result = quick.abilityScores({...c,quickRecord:{raceAbilityEnabled:false,backgroundAbilityEnabled:false}},[])[0];
    assert.equal(result.modifier,-1);
    assert.equal(quick.abilityScores({...c,quickRecord:{abilityAdjustments:{str:1},modifierOverrides:{str:7}}},[])[0].modifier,7);
});
test('ability choices ignore invalid and duplicate assignments, preserve source data', () => {
    const race = card('species','r',{ability:[{choose:{weighted:{from:['str','dex','con'],weights:[2,1]}}}]});
    const c = {...base,resourceCards:[race]};
    const source = quick.abilitySources(c,[])[0], [a,b] = source.plan.choices;
    const selected = {...c,quickRecord:{abilitySelections:{[a.id]:'str',[b.id]:'str'}}};
    const original = JSON.stringify(selected);
    assert.equal(quick.abilityScores(selected,[])[0].granted,2);
    assert.equal(quick.abilitySources(selected,[])[0].pending,1);
    assert.equal(JSON.stringify(selected),original);
    assert.equal(quick.abilityPlan({unknown:2},'x').supported,false);
    assert.equal(quick.abilityPlan({choose:{from:['str'],count:1e100}},'x').supported,false);
});
test('old snapshots fill missing projection fields without replacing existing ones', () => {
    const saved = card('classes','c',{hd:{number:1,faces:8}}), live = {...saved,buildData:{hd:{number:1,faces:10},ability:[{str:1}]}};
    assert.equal(quick.buildData(saved,[live]).hd.faces,8);
    assert.deepEqual(quick.buildData(saved,[live]).ability,[{str:1}]);
});
test('proficiency uses active total levels and no phantom level without a class', () => {
    const a = card('classes','a'), b = card('classes','b');
    const c = {...base,level:7,resourceCards:[a,b],resourceClassLevels:{[identity.resourceKey(a)]:4,[identity.resourceKey(b)]:3},multiclassEnabled:true};
    assert.deepEqual(quick.proficiencyBonus(c),{total:7,calculated:3});
    assert.equal(quick.proficiencyBonus({...c,multiclassEnabled:false}).total,4);
    assert.equal(quick.proficiencyBonus(base).total,0);
});
test('initial class and multiclass skill grants remain distinct, duplicates do not stack', () => {
    const a=card('classes','a',{startingProficiencies:{skills:[{choose:{from:['history','religion'],count:1}}]}});
    const b=card('classes','b',{startingProficiencies:{skills:[{arcana:true}]},multiclassing:{proficienciesGained:{skills:[{history:true}]}}});
    const bg=card('backgrounds','bg',{skillProficiencies:[{history:true}]});
    const c={...base,resourceCards:[a,b,bg],multiclassEnabled:true};
    const grants=quick.skillGrants(c,[]);const choice=grants.find(g=>g.item.id==='a').choices[0];
    const selected={...c,quickRecord:{skillSelections:{[choice.id]:['history','religion','unknown']}}};
    assert.equal(quick.grantedSkills(selected,[]).history.length,3);
    assert.equal(quick.grantedSkills(selected,[]).arcana,undefined);
    assert.equal(quick.grantedSkills(selected,[]).religion,undefined);
});
test('spell slots come only from explicit numeric progression, not pact rows', () => {
    assert.deepEqual(quick.slotTable({classTableGroups:[{rowsSpellProgression:[[2,0],[3,0]]}]},2),[3,0]);
    assert.equal(quick.slotTable({classTableGroups:[{rows:[[2,2,1,1]]}]},1),undefined);
    assert.equal(quick.slotTable({classTableGroups:[{rowsSpellProgression:[[2,'formula']]}]},1),undefined);
});
test('equipment cannot be conjured by placing an unowned item', () => {
    const sword=card('weapons','sword');
    assert.equal(inventory.equipInventoryItem(base,sword,'main'),null);
    const c={...base,resourceCards:[sword]};
    assert.ok(inventory.equipInventoryItem(c,sword,'main'));
    assert.equal(inventory.equipInventoryItem(c,sword,'armor'),null);
    assert.equal(inventory.equipInventoryItem({...c,resourceCardSettings:{[identity.resourceKey(sword)]:{quantity:0}}},sword,'main'),null);
});
test('quick records validate restores without dropping unknown character fields', () => {
    assert.equal(persistence.validateCharacterData({...base,quickRecord:{notes:'x',skillRanks:{history:1},abilitySelections:{x:'str'}}}),true);
    assert.equal(persistence.validateCharacterData({...base,quickRecord:{slotTotals:{x:'bad'}}}),false);
    const c={...base,futureField:{x:1},quickRecord:{notes:'x'}};
    assert.deepEqual(persistence.withCharacterDefaults(base,c).futureField,{x:1});
});

test('slot marks toggle the touched position independently and keep the input immutable', () => {
    const old={slotUsed:{one:0}};const original=JSON.stringify(old);
    const next={...old,...tracking.toggleSlot(old,'one',4,2)};
    assert.deepEqual(tracking.slotUsage(next,'one',4).marks,[false,false,true,false]);
    assert.equal(next.slotUsed.one,1);
    const restored={...next,...tracking.toggleSlot(next,'one',4,2)};
    assert.equal(tracking.slotUsage(restored,'one',4).used,0);
    assert.equal(JSON.stringify(old),original);
    assert.deepEqual(tracking.toggleSlot(old,'one',2,4),{});
});
test('legacy slot usage and reduced totals never silently restore expended slots', () => {
    const old={slotUsed:{one:4}};
    const view=tracking.slotUsage(old,'one',2);
    assert.equal(view.used,4);assert.equal(view.total,2);assert.equal(old.slotUsed.one,4);
    const changed={...old,...tracking.toggleSlot(old,'one',2,0)};
    assert.equal(tracking.slotUsage(changed,'one',2).used,3);
    const explicit={...changed,...tracking.setSlotUsage(changed,'one',1)};
    assert.deepEqual(tracking.slotUsage(explicit,'one',2).marks,[true,false]);
    assert.equal(persistence.validateCharacterData({...base,quickRecord:changed}),true);
    assert.equal(persistence.validateCharacterData({...base,quickRecord:{slotMarks:{one:['bad']}}}),false);
});

const item = (type, extra = {}) => ({...card('gears','item-'+type),inventoryMeta:{type},...extra});
test('confirmed inventory categories include consumables, tools, mounts and treasure', () => {
    for (const type of ['A','AF','FD','EXP','P','SC']) assert.equal(categories.inventorySection(item(type),base),'consumables');
    for (const type of ['AT','T','GS','INS']) assert.equal(categories.inventorySection(item(type),base),'tools');
    for (const type of ['VEH','SHP','AIR','SPC','MNT','TAH']) assert.equal(categories.inventorySection(item(type),base),'vehicles');
    for (const type of ['$','$A','$C','$G','TG','TB']) assert.equal(categories.inventorySection(item(type),base),'treasure');
    assert.equal(categories.inventorySection(item('G',{inventoryMeta:{type:'G',consumable:true}}),base),'consumables');
    assert.equal(categories.inventorySection(item('G'),base),'gears');
    assert.equal(categories.inventorySection(item('AT|XPHB'),base),'tools');
});
test('strict armor, ring and hand candidates exclude unrelated possessions', () => {
    for (const type of ['AT','T','G','P','SC','$C','TAH']) for (const slot of ['armor','ring','main','off']) assert.equal(equipment.equipmentCandidate(item(type),slot),false,type+slot);
    assert.equal(equipment.equipmentCandidate(item('HA'),'armor'),true);
    assert.equal(equipment.equipmentCandidate(item('S'),'off'),true);
    assert.equal(equipment.equipmentCandidate(item('S'),'armor'),false);
    assert.equal(equipment.equipmentCandidate(item('RG'),'ring'),true);
    assert.equal(equipment.equipmentCandidate(item('M'),'main'),true);
});
test('name suggestions stay explicit, do not rewrite records or bypass hard restrictions', () => {
    const cloak=item('',{name:'守护斗篷',kind:'magicItems',fields:{isWondrous:true}}), before=JSON.stringify(cloak);
    assert.deepEqual(equipment.suggestedSlots(cloak),['cloak']);
    assert.equal(equipment.equipmentCandidate(cloak,'cloak'),true);
    assert.equal(equipment.placementKind(cloak,'cloak'),'name-suggestion');
    assert.equal(equipment.equipmentCandidate(cloak,'armor',true),false);
    assert.equal(equipment.equipmentCandidate(cloak,'ring',true),false);
    assert.equal(equipment.equipmentCandidate(cloak,'main',true),false);
    assert.deepEqual(equipment.suggestedSlots(item('M',{name:'斗篷之剑'})),[]);
    assert.equal(JSON.stringify(cloak),before);
});
test('unplaced wondrous items default to extras, manual expansion remains restricted', () => {
    const unknown=item('',{name:'神秘石',kind:'magicItems',fields:{isWondrous:true}});
    assert.equal(equipment.equipmentCandidate(unknown,'cloak'),false);
    assert.equal(equipment.equipmentCandidate(unknown,'extra-1'),true);
    assert.equal(equipment.equipmentCandidate(unknown,'cloak',true),true);
    assert.equal(equipment.equipmentCandidate(unknown,'armor',true),false);
});
test('2024 holy focus forms preserve holding, wearing and attachment distinctions', () => {
    const holy = name => item('SCF',{source:'XPHB',englishName:name,inventoryMeta:{type:'SCF',focusType:'holy'}});
    assert.equal(equipment.canOccupySlot(holy('Amulet'),'amulet'),true);
    assert.equal(equipment.canOccupySlot(holy('Amulet'),'main'),true);
    assert.equal(equipment.canOccupySlot(holy('Emblem'),'off'),false);
    assert.equal(equipment.canOccupySlot(holy('Emblem'),'extra-1'),true);
    assert.equal(equipment.canOccupySlot(holy('Reliquary'),'off'),true);
    assert.equal(equipment.canOccupySlot(holy('Reliquary'),'amulet'),false);
    assert.equal(equipment.focusForm({...holy('Amulet'),sourceProvider:'homebrew'}),'unknown');
    assert.equal(equipment.canOccupySlot(item('WD'),'head'),false);
});
test('type labels use parent names without changing translated property labels', () => {
    assert.equal(metadata.itemMetadataName({name:'远程武器',entries:[{name:'射程'}]},'type'),'远程武器');
    assert.equal(metadata.itemMetadataName({name:'载具(水上)',entries:[{name:'船员'}]},'type'),'载具(水上)');
    assert.equal(metadata.itemMetadataName({name:'Light',entries:[{name:'轻型'}]}),'轻型');
});

test('type label fallback is source-aware and never chooses a conflicting label', () => {
    const rows=[{abbreviation:'SHP',source:'DMG',name:'载具(水上)'},{abbreviation:'SHP',source:'XPHB',name:'载具(水上)'}];
    assert.equal(metadata.itemTypeLabel(rows,'SHP','PHB','5etools-cn'),'载具(水上)');
    assert.equal(metadata.itemTypeLabel(rows,'SHP','MISSING','5etools-cn',true),undefined);
    assert.equal(metadata.itemTypeLabel([...rows,{abbreviation:'SHP',source:'OTHER',name:'别的定义'}],'SHP','PHB','5etools-cn'),undefined);
});

const management = await load('src/content/resourceManagement.ts');
test('resource management distinguishes saved, incomplete and verified latest',()=>{
    const base={ready:true,catalogAvailable:true,files:76,revisions:['abc']};
    assert.equal(management.coreManagementState(base).action,'check');
    assert.equal(management.coreManagementState({...base,upstream:{revision:'abc'}}).action,'retry');
    assert.equal(management.coreManagementState({...base,sync:{state:'success',revision:'abc'},upstream:{revision:'abc'}}).label,'已是最新');
    assert.equal(management.coreManagementState({...base,sync:{state:'success',catalogReady:false}}).action,'rebuild');
    assert.equal(management.coreManagementState({...base,sync:{state:'failed'}}).action,'retry');
    assert.equal(management.coreManagementState({...base,upstream:{error:'offline'}}).action,'check');
    assert.equal(management.coreManagementState({...base,upstream:{revision:'def'}}).action,'update');
    assert.equal(management.coreManagementState({...base,files:0}).action,'download');
    assert.equal(management.coreManagementState({...base,catalogAvailable:false}).action,'rebuild');
});
test('package state retains failed update despite old copy, waits for directory',()=>{
    assert.equal(management.packageManagementState({state:'failed'},true),'failed');
    assert.equal(management.packageManagementState({state:'downloaded'},true,false),'saved');
    assert.equal(management.packageManagementState({state:'downloaded'},true,true),'cached');
    assert.equal(management.packageManagementState(undefined,false),'unread');
    assert.equal(management.packageManagementState({state:'cached'},false,false),'saved');
    assert.equal(management.packageManagementState({state:'cached'},true,false),'saved');
    assert.deepEqual(management.packageTitle('spell/Author; Spell Pack.json'),{author:'Author',title:'Spell Pack'});
});
