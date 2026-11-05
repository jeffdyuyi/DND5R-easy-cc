import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'vite';
async function load(entry) {
    const built = await build({ configFile:false, publicDir:false, logLevel:'silent', build:{ write:false, lib:{ entry, formats:['es'] } } });
    const code = (Array.isArray(built) ? built : [built]).flatMap(out => out.output).find(out => out.type === 'chunk' && out.isEntry).code;
    return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
const quick = await load('src/character/quickRecord.ts');
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
