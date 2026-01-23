
import React, { useState } from 'react';
import { CharacterData, AbilityScores, ClassItem } from '../types';
import { CLASS_RECOMMENDATIONS } from '../data';
import { Dice6, RotateCcw, CheckCircle2, ArrowRightLeft, MousePointerClick, Languages } from 'lucide-react';
import { getModifier, getProficiencyBonus, formatModifier } from '../utils/rules';

interface Props {
   character: CharacterData;
   updateCharacter: (updates: Partial<CharacterData>) => void;
   setActiveTab: (tab: string) => void;
   libraryClasses: ClassItem[]; // New prop
}

const ABILITY_KEYS: (keyof AbilityScores)[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const ABILITY_LABELS: Record<string, string> = { strength: '力量', dexterity: '敏捷', constitution: '体质', intelligence: '智力', wisdom: '感知', charisma: '魅力' };
const POINT_BUY_COST: Record<number, number> = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

// Mapping Skills to their Parent Attribute
const SKILLS_BY_ABILITY: Record<string, string[]> = {
   strength: ["运动"],
   dexterity: ["杂技", "巧手", "隐匿"],
   constitution: [],
   intelligence: ["奥秘", "历史", "调查", "自然", "宗教"],
   wisdom: ["驯兽", "洞悉", "医药", "察觉", "求生"],
   charisma: ["欺瞒", "威吓", "表演", "游说"]
};

const STANDARD_LANGUAGES = [
   "通用手语", "龙语", "矮人语", "精灵语", "巨人语", "侏儒语", "地精语", "半身人语", "兽人语"
];

const RARE_LANGUAGES = [
   "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", "原初语", "木族语", "盗贼黑话", "地底通用语"
];

const TabStats: React.FC<Props> = ({ character, updateCharacter, setActiveTab, libraryClasses }) => {
   const [genMethod, setGenMethod] = useState<'standard' | 'pointbuy' | 'roll' | 'manual'>('standard');
   const [tempScores, setTempScores] = useState<AbilityScores>({ ...character.abilities });
   const [pointBuyTotal, setPointBuyTotal] = useState(0);

   // Swapping Logic State
   const [swapMode, setSwapMode] = useState(false);
   const [swapSource, setSwapSource] = useState<keyof AbilityScores | null>(null);

   // Derived Helpers
   const proficiencyBonus = getProficiencyBonus(character.level);
   const classData = libraryClasses.find(c => c.name === character.className);

   // --- Handlers ---
   const handlePointBuyChange = (key: keyof AbilityScores, delta: number) => {
      const currentVal = tempScores[key];
      const newVal = currentVal + delta;
      if (newVal < 8 || newVal > 15) return;
      let newCost = 0;
      ABILITY_KEYS.forEach(k => {
         const v = k === key ? newVal : tempScores[k];
         newCost += POINT_BUY_COST[v] || 0;
      });
      if (newCost > 27) return;
      setTempScores(prev => ({ ...prev, [key]: newVal }));
      setPointBuyTotal(newCost);
   };

   const rollStats = () => {
      const newStats: any = {};
      ABILITY_KEYS.forEach(k => {
         const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
         rolls.sort((a, b) => a - b);
         newStats[k] = rolls.slice(1).reduce((sum, val) => sum + val, 0);
      });
      setTempScores(newStats);
   };

   const handleSwapClick = (key: keyof AbilityScores) => {
      if (!swapMode) return;
      if (swapSource === null) {
         setSwapSource(key);
      } else {
         if (swapSource !== key) {
            // Swap values
            const sourceVal = tempScores[swapSource];
            const targetVal = tempScores[key];
            setTempScores({
               ...tempScores,
               [swapSource]: targetVal,
               [key]: sourceVal
            });
         }
         setSwapSource(null);
      }
   };

   const toggleSkillMastery = (skillName: string) => {
      const current = character.skillMastery[skillName] || 0;
      const next = (current + 1) % 3;
      updateCharacter({ skillMastery: { ...character.skillMastery, [skillName]: next } });
   };

   // Language Handlers
   const currentLangs = character.languages ? character.languages.split('、').map(s => s.trim()).filter(s => s) : [];
   const toggleLanguage = (lang: string) => {
      let newLangs = [...currentLangs];
      if (newLangs.includes(lang)) {
         newLangs = newLangs.filter(l => l !== lang);
      } else {
         newLangs.push(lang);
      }
      newLangs = Array.from(new Set(newLangs)).filter(l => l);
      updateCharacter({ languages: newLangs.join('、') });
   };

   // --- Render Helpers ---
   const renderAttributeBlock = (key: keyof AbilityScores) => {
      const base = character.abilities[key];
      const bonus = character.abilityBonuses[key] || 0;
      const total = base + bonus;
      const mod = getModifier(total);

      // Resilient Feat Check
      const resilientAttributes = Object.values(character.featConfig?.otherFeats || {})
         .map(f => f.resilientAttribute)
         .filter(Boolean);

      const isSaveProf = classData?.saves.includes(ABILITY_LABELS[key]) || resilientAttributes.includes(ABILITY_LABELS[key]);

      // Jack of All Trades Check (Bard Level 2+)
      const isJackOfAllTrades = character.className === '吟游诗人' && character.level >= 2;

      const saveMod = mod + (isSaveProf ? proficiencyBonus : 0);
      const skills = SKILLS_BY_ABILITY[key];

      return (
         <div className="flex flex-col h-full bg-white border border-stone-300 rounded-lg overflow-hidden shadow-sm relative">
            {/* Header: Name Left, Score/Mod Right */}
            <div className="p-3 flex items-center justify-between border-b border-stone-200 bg-white">
               <div>
                  <span className="text-lg font-black text-stone-900 tracking-wide block">{ABILITY_LABELS[key]}</span>
                  <div className="flex items-center gap-1 text-xs text-stone-500 font-mono mt-1">
                     <span className="font-bold">数值:</span> {total}
                     <span className="text-stone-300 mx-1">|</span>
                     <span>(基础:{base} + {bonus})</span>
                  </div>
               </div>

               <div className="w-12 h-12 bg-white border-2 border-stone-800 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-2xl font-black text-stone-900">{formatModifier(mod)}</span>
               </div>
            </div>

            {/* Saving Throw Row */}
            <div className="px-3 py-2 border-b border-stone-200 flex justify-between items-center bg-stone-50/30">
               <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full border border-stone-600 ${isSaveProf ? 'bg-stone-800' : 'bg-transparent'}`}></div>
                  <span className={`text-sm font-bold ${isSaveProf ? 'text-stone-900' : 'text-stone-500'}`}>豁免检定 {resilientAttributes.includes(ABILITY_LABELS[key]) && <span className="text-[10px] text-stone-400 bg-stone-200 px-1 rounded ml-1">强健身心</span>}</span>
               </div>
               <span className={`font-mono font-bold text-lg ${isSaveProf ? 'text-stone-900' : 'text-stone-400'}`}>{formatModifier(saveMod)}</span>
            </div>

            {/* Skills List */}
            <div className="flex-grow p-2 space-y-1 bg-white">
               {skills.map(skill => {
                  const level = character.skillMastery[skill] || 0;
                  let skillBonus = 0;
                  let isJack = false;

                  if (level === 1) skillBonus = proficiencyBonus;
                  else if (level === 2) skillBonus = proficiencyBonus * 2;
                  else if (isJackOfAllTrades) {
                     skillBonus = Math.floor(proficiencyBonus / 2);
                     isJack = true;
                  }

                  const skillTotal = mod + skillBonus;

                  return (
                     <div key={skill} onClick={() => toggleSkillMastery(skill)}
                        className="flex justify-between items-center p-1.5 hover:bg-stone-100 rounded cursor-pointer select-none group border-b border-stone-100 last:border-0"
                     >
                        <div className="flex items-center gap-2">
                           {/* Mastery Circle */}
                           <div className={`w-3 h-3 rounded-full border transition-colors
                          ${level === 2 ? 'bg-stone-800 border-stone-800' : level === 1 ? 'bg-stone-500 border-stone-500' : 'border-stone-400 group-hover:border-stone-600'}
                       `}></div>
                           <span className={`text-sm font-bold ${level ? 'text-stone-900' : 'text-stone-500'}`}>{skill}</span>
                           {level === 2 && <span className="text-[10px] text-stone-400">(专精)</span>}
                           {isJack && <span className="text-[10px] text-stone-400 bg-stone-100 px-1 rounded">万事通</span>}
                        </div>
                        <span className={`font-mono font-bold ${level || isJack ? 'text-stone-900' : 'text-stone-400'}`}>
                           {formatModifier(skillTotal)}
                        </span>
                     </div>
                  );
               })}
               {skills.length === 0 && (
                  <div className="text-center text-stone-300 text-xs italic py-4">无相关技能</div>
               )}
            </div>
         </div>
      );
   };

   return (
      <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">

         {/* 1. Basic Info Header */}
         <div className="bg-white pb-6 border-b border-stone-200 space-y-6">
            {/* Row 1: Name, Class, Level */}
            <div className="grid grid-cols-12 gap-6 items-end">
               <div className="col-span-12 md:col-span-4">
                  <label className="text-xs font-bold text-stone-500 uppercase block mb-1">角色姓名</label>
                  <input
                     type="text" value={character.name} onChange={(e) => updateCharacter({ name: e.target.value })}
                     className="w-full text-2xl font-bold bg-white border-b-2 border-stone-300 rounded-none px-1 py-1 focus:border-dndRed focus:outline-none placeholder-stone-300"
                     placeholder="请输入姓名"
                  />
               </div>
               <div className="col-span-8 md:col-span-6">
                  <label className="text-xs font-bold text-stone-500 uppercase block mb-1">职业详情</label>
                  <div
                     onClick={() => setActiveTab('class')}
                     className="w-full text-xl font-bold text-stone-800 border-b border-stone-300 hover:border-dndRed hover:text-dndRed hover:bg-stone-50 cursor-pointer px-1 py-1 transition-colors flex items-center gap-2 group"
                  >
                     <span className="truncate">
                        {character.className} Lv.{character.level}
                     </span>
                     <MousePointerClick className="w-4 h-4 opacity-0 group-hover:opacity-50" />
                  </div>
               </div>
               <div className="col-span-4 md:col-span-2">
                  <label className="text-xs font-bold text-stone-500 uppercase block mb-1">等级</label>
                  <div className="w-full text-2xl font-bold bg-stone-100 border-b border-stone-300 rounded-none px-1 py-1 text-center text-stone-600 cursor-default">
                     {character.level}
                  </div>
               </div>
            </div>

            {/* Row 2: Race, Background, Proficiency */}
            <div className="grid grid-cols-12 gap-6 items-end">
               <div className="col-span-12 md:col-span-4">
                  <label className="text-xs font-bold text-stone-500 uppercase block mb-1">种族</label>
                  <div
                     onClick={() => setActiveTab('origin')}
                     className="w-full text-xl font-bold text-stone-800 border-b border-stone-300 hover:border-dndRed hover:text-dndRed hover:bg-stone-50 cursor-pointer px-1 py-1 transition-colors flex items-center gap-2 group"
                  >
                     {character.race || "选择种族"}
                     <MousePointerClick className="w-4 h-4 opacity-0 group-hover:opacity-50" />
                  </div>
               </div>
               <div className="col-span-12 md:col-span-6">
                  <label className="text-xs font-bold text-stone-500 uppercase block mb-1">背景</label>
                  <div
                     onClick={() => setActiveTab('origin')}
                     className="w-full text-xl font-bold text-stone-800 border-b border-stone-300 hover:border-dndRed hover:text-dndRed hover:bg-stone-50 cursor-pointer px-1 py-1 transition-colors flex items-center gap-2 group"
                  >
                     {character.background || "选择背景"}
                     <MousePointerClick className="w-4 h-4 opacity-0 group-hover:opacity-50" />
                  </div>
               </div>
               <div className="col-span-12 md:col-span-2 flex justify-end">
                  <div className="text-xs font-bold text-stone-500 uppercase flex flex-col items-end">
                     <span>熟练加值</span>
                     <span className="text-dndRed text-2xl">+{proficiencyBonus}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* 2. Attribute Generator */}
         <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 shadow-sm relative">
            <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2 text-sm uppercase">
               <Dice6 className="w-4 h-4" /> 属性数值生成器
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
               {/* Method Selector */}
               <div className="flex gap-2">
                  {['standard', 'pointbuy', 'roll', 'manual'].map(m => (
                     <button key={m} onClick={() => { setGenMethod(m as any); setSwapMode(false); }}
                        className={`px-3 py-1.5 text-xs rounded font-bold transition-colors border ${genMethod === m ? 'bg-dndRed text-white border-dndRed' : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-100'}`}>
                        {m === 'standard' ? '标准数列' : m === 'pointbuy' ? '购点法' : m === 'roll' ? '随机掷骰' : '手动输入'}
                     </button>
                  ))}
               </div>

               {/* Action Buttons */}
               <div className="flex gap-2">
                  {/* Quick Swap Button */}
                  <button
                     onClick={() => { setSwapMode(!swapMode); setSwapSource(null); }}
                     className={`px-3 py-1.5 text-xs rounded font-bold transition-colors border flex items-center gap-1 shadow-sm
                     ${swapMode ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300' : 'bg-white text-stone-700 border-stone-300 hover:bg-blue-50'}
                  `}
                  >
                     <ArrowRightLeft className="w-3 h-3" /> {swapMode ? '退出交换' : '交换数值'}
                  </button>

                  {genMethod === 'roll' && (
                     <button onClick={rollStats} className="px-3 py-1.5 bg-stone-700 text-white text-xs rounded font-bold hover:bg-stone-600 flex items-center gap-1 shadow-sm">
                        <RotateCcw className="w-3 h-3" /> 重投
                     </button>
                  )}
                  <button onClick={() => {
                     const rec = CLASS_RECOMMENDATIONS[character.className];
                     if (rec) { setTempScores(rec); updateCharacter({ abilities: rec }); }
                  }} className="px-3 py-1.5 bg-white text-stone-700 border border-stone-300 text-xs rounded font-bold hover:bg-stone-50 shadow-sm">
                     应用{character.className}推荐值
                  </button>
               </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-6 gap-4 mt-6">
               {ABILITY_KEYS.map(key => (
                  <div key={key} className="flex flex-col items-center group">
                     <span className="text-[10px] font-bold text-stone-500 mb-1">{ABILITY_LABELS[key]}</span>

                     {/* Logic for Swap Mode vs Normal Input Mode */}
                     {swapMode ? (
                        <button
                           onClick={() => handleSwapClick(key)}
                           className={`
                           w-12 h-8 rounded font-bold text-center border-2 transition-all shadow-sm
                           ${swapSource === key
                                 ? 'bg-blue-100 border-blue-500 text-blue-700 scale-110'
                                 : 'bg-white border-stone-300 hover:border-blue-400 text-stone-800'}
                        `}
                        >
                           {tempScores[key]}
                        </button>
                     ) : (
                        <div className="flex items-center gap-1">
                           {genMethod === 'pointbuy' && <button onClick={() => handlePointBuyChange(key, -1)} className="w-6 h-6 flex items-center justify-center bg-white border border-stone-300 rounded text-xs hover:bg-stone-100">-</button>}
                           <input
                              type="number" value={tempScores[key]}
                              onChange={(e) => setTempScores({ ...tempScores, [key]: parseInt(e.target.value) || 0 })}
                              className={`w-12 text-center font-bold border border-stone-300 rounded py-1 bg-white focus:outline-none focus:ring-1 focus:ring-dndRed`}
                              readOnly={genMethod === 'pointbuy'}
                           />
                           {genMethod === 'pointbuy' && <button onClick={() => handlePointBuyChange(key, 1)} className="w-6 h-6 flex items-center justify-center bg-white border border-stone-300 rounded text-xs hover:bg-stone-100">+</button>}
                        </div>
                     )}
                  </div>
               ))}
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-stone-200 pt-4">
               {genMethod === 'pointbuy' ? (
                  <div className="text-sm font-bold text-stone-600">
                     花费点数: <span className={pointBuyTotal > 27 ? "text-red-600" : "text-green-600"}>{pointBuyTotal}</span> / 27
                  </div>
               ) : (
                  <div className="text-xs text-stone-400 italic">
                     {swapMode ? "点击两个属性以互换数值。" : "调整数值后点击确认应用。"}
                  </div>
               )}
               <button onClick={() => updateCharacter({ abilities: tempScores })} className="bg-green-600 text-white text-sm font-bold px-6 py-2 rounded shadow hover:bg-green-700 flex items-center gap-2 transition-colors">
                  <CheckCircle2 className="w-4 h-4" /> 确认并应用到角色
               </button>
            </div>
         </div>

         {/* 3. Main Stats Grid (2 Rows x 3 Cols) */}
         <div className="space-y-8">
            {/* Row 1: Physical */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
               {renderAttributeBlock('strength')}
               {renderAttributeBlock('dexterity')}
               {renderAttributeBlock('constitution')}
            </div>
            {/* Row 2: Mental */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
               {renderAttributeBlock('intelligence')}
               {renderAttributeBlock('wisdom')}
               {renderAttributeBlock('charisma')}
            </div>
            <div className="text-right text-xs text-stone-400">
               * 点击技能名称切换熟练度 (无 → 熟练 → 专精)
            </div>
         </div>

         {/* 4. Languages (Moved from TabHome) */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-300">
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

export default TabStats;
