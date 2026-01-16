
import React from 'react';
import { CharacterData, ClassItem } from '../types';
import { Heart, Shield, Wind, Zap, Languages } from 'lucide-react';
import { getModifier, getProficiencyBonus, formatModifier } from '../utils/rules';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  libraryClasses: ClassItem[];
}

const STANDARD_LANGUAGES = [
  "通用手语", "龙语", "矮人语", "精灵语", "巨人语", "侏儒语", "地精语", "半身人语", "兽人语"
];

const RARE_LANGUAGES = [
  "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", "原初语", "木族语", "盗贼黑话", "地底通用语"
];

const TabHome: React.FC<Props> = ({ character, updateCharacter, libraryClasses }) => {
  const proficiencyBonus = getProficiencyBonus(character.level);
  const classData = libraryClasses.find(c => c.name === character.className);
  
  // Calculate basic AC (Simplified)
  const dexMod = getModifier(character.abilities.dexterity);
  const conMod = getModifier(character.abilities.constitution);
  const wisMod = getModifier(character.abilities.wisdom);
  
  let ac = 10 + dexMod;
  if (character.className === '野蛮人') ac = 10 + dexMod + conMod;
  if (character.className === '武僧') ac = 10 + dexMod + wisMod;

  const handleAbilityChange = (key: keyof typeof character.abilities, val: string) => {
    updateCharacter({
      abilities: { ...character.abilities, [key]: parseInt(val) || 10 }
    });
  };

  // Parse current languages
  const currentLangs = character.languages ? character.languages.split('、').map(s => s.trim()).filter(s => s) : [];

  const toggleLanguage = (lang: string) => {
    let newLangs = [...currentLangs];
    
    // Toggle logic
    if (newLangs.includes(lang)) {
      newLangs = newLangs.filter(l => l !== lang);
    } else {
      newLangs.push(lang);
    }
    
    // Filter empty and unique
    newLangs = Array.from(new Set(newLangs)).filter(l => l);
    updateCharacter({ languages: newLangs.join('、') });
  };

  return (
    <div className="p-6 bg-parchment min-h-full">
      <h2 className="text-3xl font-bold text-dndRed mb-6 border-b-2 border-dndRed pb-2">角色概览</h2>

      {/* Top Combat Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-stone-300 flex flex-col items-center">
          <div className="text-stone-500 font-bold text-sm uppercase mb-1 flex items-center gap-1"><Shield className="w-4 h-4"/> 护甲等级</div>
          <div className="text-3xl font-bold text-stone-900">{ac}</div>
          <div className="text-xs text-stone-400 mt-1">无甲基础值</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-stone-300 flex flex-col items-center">
          <div className="text-stone-500 font-bold text-sm uppercase mb-1 flex items-center gap-1"><Zap className="w-4 h-4"/> 先攻加值</div>
          <div className="text-3xl font-bold text-stone-900">{formatModifier(character.abilities.dexterity, true)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-stone-300 flex flex-col items-center">
          <div className="text-stone-500 font-bold text-sm uppercase mb-1 flex items-center gap-1"><Wind className="w-4 h-4"/> 速度</div>
          <div className="text-3xl font-bold text-stone-900">30 <span className="text-sm">尺</span></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-stone-300 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-dndRed"></div>
          <div className="text-stone-500 font-bold text-sm uppercase mb-1 flex items-center gap-1"><Heart className="w-4 h-4"/> 生命值上限</div>
          <input 
            type="number" 
            value={character.hpMax}
            onChange={(e) => updateCharacter({ hpMax: parseInt(e.target.value) || 0 })}
            className="text-3xl font-bold text-stone-900 text-center w-full focus:outline-none bg-transparent"
          />
           <div className="text-xs text-stone-400 mt-1">点击修改</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Ability Scores Column */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-bold text-xl text-stone-800 mb-2">核心属性</h3>
          {[
            { k: 'strength', l: '力量' }, { k: 'dexterity', l: '敏捷' }, { k: 'constitution', l: '体质' },
            { k: 'intelligence', l: '智力' }, { k: 'wisdom', l: '感知' }, { k: 'charisma', l: '魅力' }
          ].map((stat: any) => (
            <div key={stat.k} className="flex items-center justify-between bg-white p-3 rounded shadow-sm border border-stone-200">
               <div className="font-bold text-stone-700 w-12">{stat.l}</div>
               <input 
                 type="number"
                 className="w-12 text-center border-b-2 border-stone-300 focus:border-dndRed focus:outline-none font-bold text-lg"
                 value={character.abilities[stat.k as keyof typeof character.abilities]}
                 onChange={(e) => handleAbilityChange(stat.k, e.target.value)}
               />
               <div className="bg-stone-800 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner">
                 {formatModifier(character.abilities[stat.k as keyof typeof character.abilities], true)}
               </div>
            </div>
          ))}
          <div className="bg-stone-200 p-3 rounded flex justify-between items-center border border-stone-300">
             <span className="font-bold text-stone-700">熟练加值</span>
             <span className="font-bold text-xl text-dndRed">+{proficiencyBonus}</span>
          </div>
        </div>

        {/* Quick View / Saving Throws */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-stone-200">
           <h3 className="font-bold text-xl text-stone-800 mb-4">豁免检定</h3>
           <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {[
                { k: 'strength', l: '力量' }, { k: 'dexterity', l: '敏捷' }, { k: 'constitution', l: '体质' },
                { k: 'intelligence', l: '智力' }, { k: 'wisdom', l: '感知' }, { k: 'charisma', l: '魅力' }
              ].map((stat: any) => {
                 const isProficient = classData?.saves.includes(stat.l);
                 const mod = getModifier(character.abilities[stat.k as keyof typeof character.abilities]);
                 const total = isProficient ? mod + proficiencyBonus : mod;
                 
                 return (
                   <div key={stat.k} className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded transition-colors">
                      <div className={`w-4 h-4 rounded-full border-2 border-stone-800 ${isProficient ? 'bg-stone-800' : ''}`}></div>
                      <span className="text-lg font-bold w-8 text-right">{total >= 0 ? `+${total}` : total}</span>
                      <span className="font-bold text-stone-600">{stat.l}</span>
                   </div>
                 );
              })}
           </div>

           <div className="mt-8 border-t border-stone-200 pt-4">
              <h3 className="font-bold text-xl text-stone-800 mb-2">被动感知 (察觉)</h3>
              <div className="text-stone-600">
                <span className="text-2xl font-bold text-stone-900 mr-2">
                  {10 + getModifier(character.abilities.wisdom)}
                </span>
                (假设已熟练: {10 + getModifier(character.abilities.wisdom) + proficiencyBonus})
              </div>
           </div>
        </div>
      </div>

      {/* Language Section (Moved from TabBackground/Identity) */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-stone-300">
         <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-2">
            <Languages className="w-6 h-6 text-dndRed" />
            <h3 className="text-xl font-bold text-stone-800">语言能力</h3>
         </div>
         
         <div className="mb-4">
            <div className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-bold inline-block shadow-sm">
               已掌握: {character.languages || "无"}
            </div>
            <div className="mt-2 text-xs text-stone-500">点击下方按钮添加或移除语言。通常角色起始掌握通用语及额外两门语言。</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <h4 className="text-xs font-bold text-stone-500 mb-2 uppercase">标准语言</h4>
               <div className="flex flex-wrap gap-2">
                  <button 
                     onClick={() => toggleLanguage("通用语")}
                     className={`px-3 py-1 text-sm rounded border transition-colors ${currentLangs.includes("通用语") ? 'bg-green-600 text-white border-green-600' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                  >
                     通用语
                  </button>
                  {STANDARD_LANGUAGES.filter(l => l !== "通用语").map(lang => (
                     <button 
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1 text-sm rounded border transition-colors ${currentLangs.includes(lang) ? 'bg-dndRed text-white border-dndRed' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                     >
                        {lang}
                     </button>
                  ))}
               </div>
            </div>
            <div>
               <h4 className="text-xs font-bold text-stone-500 mb-2 uppercase">稀有语言</h4>
               <div className="flex flex-wrap gap-2">
                  {RARE_LANGUAGES.map(lang => (
                     <button 
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1 text-sm rounded border transition-colors ${currentLangs.includes(lang) ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                     >
                        {lang}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TabHome;
