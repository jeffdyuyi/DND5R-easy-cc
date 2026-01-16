
import React, { useState } from 'react';
import { CharacterData, ClassItem, SpeciesItem, ItemItem, AbilityScores } from '../types';
import { Shield, Zap, Wind, Heart, Skull, Sword, Info, Calculator, Target } from 'lucide-react';
import { getModifier, getProficiencyBonus, formatModifier } from '../utils/rules';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  libraryClasses: ClassItem[];
  librarySpecies: SpeciesItem[];
}

const SPELL_ABILITY_MAP: Record<string, keyof AbilityScores> = {
  '力量': 'strength',
  '敏捷': 'dexterity',
  '体质': 'constitution',
  '智力': 'intelligence',
  '感知': 'wisdom',
  '魅力': 'charisma'
};

const TabCombat: React.FC<Props> = ({ character, updateCharacter, libraryClasses, librarySpecies }) => {
  // --- Helpers ---
  
  // Basic Data
  const classData = libraryClasses.find(c => c.name === character.className);
  const speciesData = librarySpecies.find(s => s.name === character.race);
  const profBonus = getProficiencyBonus(character.level);

  // --- AC Calculation Logic ---
  const calculateACOptions = () => {
    const dexMod = getModifier(character.abilities.dexterity);
    const conMod = getModifier(character.abilities.constitution);
    const wisMod = getModifier(character.abilities.wisdom);
    
    // Check Inventory for Armor & Shield
    // Note: In a real app, we'd check 'isEquipped' boolean. Here we assume items in InventoryArmor are carried.
    // For calculation, we check the first armor found or assume unarmored.
    const equippedArmor = character.inventoryArmor.find(i => i.type === '护甲' && !i.tags?.includes('盾牌'));
    const equippedShield = character.inventoryArmor.find(i => i.tags?.includes('盾牌'));
    const shieldBonus = equippedShield ? 2 : 0; // Standard 5e shield is +2

    const options: { label: string, value: number, note?: string }[] = [];

    // 1. Natural / Unarmored (Base)
    options.push({ label: "无甲 (基础)", value: 10 + dexMod + shieldBonus, note: "10 + 敏捷" });

    // 2. Class Specific Unarmored Defense
    if (character.className === '野蛮人') {
      options.push({ label: "野蛮人无甲防御", value: 10 + dexMod + conMod + shieldBonus, note: "10 + 敏捷 + 体质" });
    }
    if (character.className === '武僧' && !equippedArmor && !equippedShield) {
      // Monk Unarmored Defense doesn't work with shields
      options.push({ label: "武僧无甲防御", value: 10 + dexMod + wisMod, note: "10 + 敏捷 + 感知 (无盾)" });
    }
    if (character.race === '龙裔' || (character.subclass && character.subclass.includes('龙族'))) {
       // Example logic for Draconic Resilience (13+Dex) if applicable, 
       // explicitly adding generic Draconic Sorcerer logic for demo
       if(character.className === '术士') {
          options.push({ label: "龙族强韧", value: 13 + dexMod, note: "13 + 敏捷" });
       }
    }

    // 3. Armor Calculation
    if (equippedArmor) {
      let armorAC = 10;
      let limitDex = false;
      let maxDex = 100; 

      // Simple parsing of AC string from DB (e.g. "11 + 敏捷修正", "14 + 敏捷修正 (最大 2)", "16")
      // This is a heuristic parser for the Chinese string format in data-items-armor.ts
      if (equippedArmor.ac) {
         const baseMatch = equippedArmor.ac.match(/^(\d+)/);
         if (baseMatch) armorAC = parseInt(baseMatch[1]);
         
         if (equippedArmor.ac.includes("最大 2")) {
            limitDex = true;
            maxDex = 2;
         } else if (!equippedArmor.ac.includes("敏捷")) {
            // Heavy armor usually doesn't add Dex
            limitDex = true;
            maxDex = 0;
         }
      }

      const effectiveDex = limitDex ? Math.min(dexMod, maxDex) : dexMod;
      const totalArmorAC = armorAC + effectiveDex + shieldBonus;
      
      options.push({ 
         label: `着甲 (${equippedArmor.name})`, 
         value: totalArmorAC, 
         note: `${armorAC} + 敏捷(${effectiveDex}) ${shieldBonus ? '+ 盾牌' : ''}` 
      });
    }

    // Sort by highest AC
    return options.sort((a, b) => b.value - a.value);
  };

  const acOptions = calculateACOptions();
  const bestAC = acOptions.length > 0 ? acOptions[0] : { value: 10, label: "基础", note: "" };
  
  // Use state for Manual Override
  const [manualAC, setManualAC] = useState<number | null>(null);
  const displayAC = manualAC !== null ? manualAC : bestAC.value;

  // --- HP Calculation Helper ---
  const hitDieStr = classData?.hitDie || "d8";
  const hitDieMax = parseInt(hitDieStr.replace('d', ''));
  const conMod = getModifier(character.abilities.constitution);
  
  const hpLvl1 = hitDieMax + conMod;
  const hpAvgPerLevel = (hitDieMax / 2 + 1) + conMod;
  const hpAvgTotal = hpLvl1 + (hpAvgPerLevel * (character.level - 1));

  // --- Weapon Calculation Helper ---
  const getWeaponStats = (weapon: ItemItem) => {
     const isFinesse = weapon.properties?.includes('灵巧');
     const isRanged = weapon.tags?.includes('远程');
     
     // Determine Ability
     let abilityLabel = "力量";
     let abilityScore = character.abilities.strength;
     
     if (isRanged) {
        abilityLabel = "敏捷";
        abilityScore = character.abilities.dexterity;
     } else if (isFinesse) {
        if (character.abilities.dexterity > character.abilities.strength) {
           abilityLabel = "敏捷";
           abilityScore = character.abilities.dexterity;
        }
     } else if (character.className === '武僧' && (weapon.tags?.includes('简易武器') || weapon.tags?.includes('轻型'))) {
        // Monk Martial Arts logic (simplified)
        if (character.abilities.dexterity > character.abilities.strength) {
           abilityLabel = "敏捷";
           abilityScore = character.abilities.dexterity;
        }
     }

     const mod = getModifier(abilityScore);
     // Assume proficiency if it's in their inventory (or check class proficiencies string)
     const isProficient = true; // Simplified for UI
     const toHit = mod + (isProficient ? profBonus : 0);
     const dmg = mod; // Flat bonus

     return { toHit, dmg, mod, abilityLabel, isProficient };
  };

  const spellAttrKey = SPELL_ABILITY_MAP[character.spellcastingAbility];
  const spellScore = spellAttrKey ? character.abilities[spellAttrKey] : 10;
  const spellMod = getModifier(spellScore);

  return (
    <div className="p-8 space-y-8 bg-white min-h-full font-sans text-stone-900">
      
      {/* 1. Top Stats Row: AC, Init, Speed, HP */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* AC Block */}
        <div className="bg-white border-2 border-stone-800 rounded-lg shadow-sm overflow-hidden flex flex-col group relative">
           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Calculator className="w-4 h-4 text-stone-400" />
           </div>
           <div className="p-4 flex-grow flex flex-col items-center justify-center bg-stone-50">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Shield className="w-4 h-4" /> 护甲等级 (AC)
              </div>
              <div className="text-5xl font-black font-serif text-stone-900">{displayAC}</div>
           </div>
           
           {/* AC Details / Selection */}
           <div className="bg-white p-3 border-t border-stone-200 text-xs">
              <div className="mb-2 font-bold text-stone-600 flex justify-between items-center">
                 <span>计算方式:</span>
                 {manualAC !== null && <button onClick={() => setManualAC(null)} className="text-red-500 hover:underline">重置</button>}
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                 {acOptions.map((opt, idx) => (
                    <div 
                       key={idx} 
                       onClick={() => setManualAC(opt.value)}
                       className={`flex justify-between items-center p-1 rounded cursor-pointer hover:bg-stone-100 ${displayAC === opt.value && manualAC === null ? 'bg-green-50 text-green-700 font-bold' : ''}`}
                    >
                       <span className="truncate w-32" title={opt.label}>{opt.label}</span>
                       <span className="font-mono">{opt.value}</span>
                    </div>
                 ))}
                 <div className="flex items-center gap-2 pt-1 border-t mt-1">
                    <span>手动:</span>
                    <input 
                       type="number" 
                       className="w-12 border rounded text-center" 
                       placeholder="-"
                       onChange={(e) => setManualAC(parseInt(e.target.value))} 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Initiative & Speed */}
        <div className="flex flex-col gap-4">
           <div className="bg-white border border-stone-300 rounded-lg p-4 flex flex-col items-center justify-center flex-grow shadow-sm">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-yellow-600" /> 先攻
              </div>
              <div className="text-4xl font-black text-stone-900">{formatModifier(getModifier(character.abilities.dexterity))}</div>
              <div className="text-[10px] text-stone-400 mt-1">敏捷调整值</div>
           </div>
           <div className="bg-white border border-stone-300 rounded-lg p-4 flex flex-col items-center justify-center flex-grow shadow-sm">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                 <Wind className="w-4 h-4 text-blue-500" /> 速度
              </div>
              <div className="text-4xl font-black text-stone-900">{speciesData?.speed || 30} <span className="text-lg font-normal text-stone-400">尺</span></div>
           </div>
        </div>

        {/* HP Block (Wide) */}
        <div className="lg:col-span-2 bg-white border-2 border-stone-300 rounded-lg shadow-sm flex flex-col">
           <div className="bg-stone-100 p-2 flex items-center justify-between border-b border-stone-200">
              <span className="font-bold text-stone-700 flex items-center gap-2 text-sm">
                 <Heart className="w-4 h-4 text-dndRed fill-current"/> 生命值管理
              </span>
              <div className="text-[10px] text-stone-500 flex gap-3">
                 <span title={`1级: ${hitDieMax}+${conMod}`}>首级HP: <strong>{hpLvl1}</strong></span>
                 <span title={`升级: ${hitDieMax/2+1}+${conMod} (每级)`}>升级参考: <strong>+{hpAvgPerLevel}/级</strong></span>
                 <span title="按照平均值计算的总和">推荐总值: <strong>{hpAvgTotal}</strong></span>
              </div>
           </div>
           
           <div className="flex-grow p-4 flex justify-around items-center divide-x divide-stone-100">
              <div className="flex flex-col items-center px-4 w-1/3">
                 <span className="text-xs font-bold text-stone-500 uppercase mb-2">上限 (Max)</span>
                 <div className="relative group">
                    <input 
                       type="number" 
                       value={character.hpMax} 
                       onChange={(e) => updateCharacter({hpMax: parseInt(e.target.value)||0})} 
                       className="text-3xl font-black text-stone-800 text-center w-full bg-transparent border-b-2 border-stone-200 focus:border-dndRed focus:outline-none"
                    />
                    <div className="absolute -right-4 top-2 opacity-0 group-hover:opacity-100 text-stone-300"><Calculator className="w-3 h-3"/></div>
                 </div>
              </div>

              <div className="flex flex-col items-center px-4 w-1/3">
                 <span className="text-xs font-bold text-dndRed uppercase mb-2">当前 (Current)</span>
                 <input 
                    type="number" 
                    value={character.currentHp} 
                    onChange={(e) => updateCharacter({currentHp: parseInt(e.target.value)||0})} 
                    className="text-4xl font-black text-dndRed text-center w-full bg-transparent border-b-2 border-stone-200 focus:border-dndRed focus:outline-none"
                 />
              </div>

              <div className="flex flex-col items-center px-4 w-1/3">
                 <span className="text-xs font-bold text-blue-500 uppercase mb-2">临时 (Temp)</span>
                 <input 
                    type="number" 
                    value={character.tempHp} 
                    onChange={(e) => updateCharacter({tempHp: parseInt(e.target.value)||0})} 
                    className="text-2xl font-bold text-blue-500 text-center w-full bg-transparent border-b-2 border-stone-200 focus:border-blue-500 focus:outline-none"
                 />
              </div>
           </div>
           
           {/* Hit Dice & Death Saves Footer */}
           <div className="bg-stone-50 p-3 border-t border-stone-200 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                 <span className="font-bold text-stone-600">生命骰:</span>
                 <div className="flex items-center bg-white border border-stone-300 rounded px-2 py-0.5">
                    <input 
                       type="number" 
                       value={character.hitDiceCurrent} 
                       onChange={(e) => updateCharacter({hitDiceCurrent: parseInt(e.target.value)})}
                       className="w-6 text-center font-bold outline-none text-stone-800"
                    />
                    <span className="text-stone-400">/</span>
                    <span className="text-stone-600 pl-1">{character.level}{classData?.hitDie}</span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1">
                    <Skull className="w-3 h-3 text-stone-400"/>
                    <span className="text-[10px] font-bold text-stone-500">死亡豁免</span>
                 </div>
                 <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={`s-${i}`} className="w-3 h-3 rounded-full border border-stone-400 bg-white hover:bg-green-400 cursor-pointer" title="成功"></div>)}
                 </div>
                 <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={`f-${i}`} className="w-3 h-3 rounded-full border border-stone-400 bg-white hover:bg-red-400 cursor-pointer" title="失败"></div>)}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Weapons & Attacks */}
      <div>
         <h3 className="text-xl font-bold text-dndRed mb-4 flex items-center gap-2 border-b-2 border-stone-200 pb-2">
            <Sword className="w-5 h-5"/> 攻击与施法 (Attacks & Spellcasting)
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {character.inventoryWeapons.map((weapon, idx) => {
               const stats = getWeaponStats(weapon);
               const masteryText = weapon.mastery ? weapon.mastery.split(':')[0] : null;

               return (
                  <div key={idx} className="bg-white rounded-lg border border-stone-300 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                     {/* Card Header */}
                     <div className="bg-stone-100 p-3 border-b border-stone-200 flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-stone-800 text-lg">{weapon.name}</h4>
                           <div className="text-[10px] text-stone-500 uppercase tracking-wider flex gap-2">
                              <span>{weapon.damageType}</span>
                              {weapon.properties?.filter(p => !p.includes('(')).map(p => (
                                 <span key={p}>• {p}</span>
                              ))}
                           </div>
                        </div>
                        {masteryText && (
                           <div className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded border border-yellow-200">
                              精通: {masteryText}
                           </div>
                        )}
                     </div>

                     {/* Stats Body */}
                     <div className="p-4 flex items-center gap-4">
                        <div className="flex flex-col items-center">
                           <span className="text-xs font-bold text-stone-400 uppercase">命中</span>
                           <div className="text-3xl font-black text-stone-800">
                              {stats.toHit >= 0 ? `+${stats.toHit}` : stats.toHit}
                           </div>
                        </div>
                        
                        <div className="h-10 w-px bg-stone-200"></div>

                        <div className="flex-grow">
                           <span className="text-xs font-bold text-stone-400 uppercase">伤害</span>
                           <div className="text-xl font-bold text-dndRed flex items-center gap-2">
                              <span>{weapon.damage}</span>
                              <span className="text-stone-400 text-sm font-normal">
                                 {stats.dmg >= 0 ? `+ ${stats.dmg}` : `- ${Math.abs(stats.dmg)}`}
                              </span>
                           </div>
                           <div className="text-[10px] text-stone-400 italic">
                              基于{stats.abilityLabel} {stats.isProficient ? "+ 熟练" : ""}
                           </div>
                        </div>
                     </div>

                     {/* Footer: Mastery Detail */}
                     {weapon.mastery && (
                        <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 text-xs text-stone-600 italic leading-relaxed">
                           <Info className="w-3 h-3 inline-block mr-1 text-yellow-600"/>
                           {weapon.mastery}
                        </div>
                     )}
                  </div>
               );
            })}

            {/* Spell Attack Card (Dynamic) */}
            {(character.spellcastingAbility && character.spells) && (
               <div className="bg-white rounded-lg border border-purple-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="bg-purple-50 p-3 border-b border-purple-100 flex justify-between items-start">
                     <div>
                        <h4 className="font-bold text-purple-900 text-lg">法术攻击</h4>
                        <div className="text-[10px] text-purple-600 uppercase tracking-wider">
                           基于 {character.spellcastingAbility}
                        </div>
                     </div>
                     <div className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded border border-purple-200">
                        DC {8 + spellMod + profBonus}
                     </div>
                  </div>
                  <div className="p-4 flex items-center justify-center gap-4">
                     <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-stone-400 uppercase">命中加值</span>
                        <div className="text-3xl font-black text-purple-700">
                           +{spellMod + profBonus}
                        </div>
                     </div>
                  </div>
                  <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 italic text-center">
                     适用于法术攻击检定（如火焰箭）
                  </div>
               </div>
            )}

            {/* Empty State */}
            {character.inventoryWeapons.length === 0 && (
               <div className="col-span-full border-2 border-dashed border-stone-300 rounded-lg p-8 flex flex-col items-center justify-center text-stone-400">
                  <Target className="w-12 h-12 mb-2 opacity-50"/>
                  <span className="font-bold">暂无装备武器</span>
                  <span className="text-sm">请前往“行囊背包”页签添加武器。</span>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default TabCombat;
