
import React, { useState } from 'react';
import { ClassItem, SubclassItem, ClassFeature, BackgroundItem, FeatItem, SpellItem, ItemItem } from '../types';
import { Plus, Trash2, BookOpen, AlertTriangle } from 'lucide-react';
import { CLASS_DB } from '../data';

// --- Helper for Features List Editing ---
const FeatureListEditor = ({ 
  features, 
  onChange 
}: { 
  features: ClassFeature[], 
  onChange: (features: ClassFeature[]) => void 
}) => {
  const handleUpdate = (index: number, field: keyof ClassFeature, value: any) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onChange(newFeatures);
  };

  const handleDelete = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    onChange([...features, { name: '新特性', level: 1, description: '' }]);
  };

  return (
    <div className="space-y-4 border-t-2 border-stone-200 pt-4 mt-6">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-stone-800">职业/子职特性列表</h4>
        <button onClick={handleAdd} className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
          <Plus className="w-3 h-3" /> 添加特性
        </button>
      </div>
      
      {features.sort((a,b) => a.level - b.level).map((feature, idx) => (
        <div key={idx} className="bg-stone-50 p-4 rounded border border-stone-200 shadow-sm space-y-3">
          <div className="flex gap-4">
            <div className="w-20">
              <label className="text-xs font-bold text-stone-500">等级</label>
              <input 
                type="number" 
                min="1" max="20"
                value={feature.level}
                onChange={(e) => handleUpdate(idx, 'level', parseInt(e.target.value) || 1)}
                className="w-full p-2 border rounded focus:border-dndRed outline-none font-bold text-center"
              />
            </div>
            <div className="flex-grow">
              <label className="text-xs font-bold text-stone-500">特性名称</label>
              <input 
                type="text"
                value={feature.name}
                onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                className="w-full p-2 border rounded focus:border-dndRed outline-none font-bold"
              />
            </div>
            <div className="flex items-end pb-1">
               <button onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-700 p-2">
                 <Trash2 className="w-5 h-5"/>
               </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-stone-500 block mb-1">
              特性描述 (支持Markdown: **加粗**, *斜体*, | 表格 |)
            </label>
            <textarea 
              value={feature.description}
              onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
              className="w-full min-h-[6rem] p-2 border rounded focus:border-dndRed outline-none font-mono text-sm"
              placeholder="输入描述..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Class Editor ---
const HIT_DICE_OPTIONS = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
const ATTR_OPTIONS = ['力量', '敏捷', '体质', '智力', '感知', '魅力'];

export const ClassEditor = ({ item, setItem }: { item: ClassItem, setItem: React.Dispatch<React.SetStateAction<ClassItem | null>> }) => {
  const updateCore = (field: keyof typeof item.coreTraits, value: any) => {
    setItem(prev => prev ? ({ ...prev, coreTraits: { ...prev.coreTraits, [field]: value } }) : null);
  };

  const updateEquipment = (option: 'optionA' | 'optionB', value: string) => {
    setItem(prev => prev ? ({ ...prev, coreTraits: { ...prev.coreTraits, startingEquipment: { ...prev.coreTraits.startingEquipment, [option]: value } } }) : null);
  };

  const handleHitDieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setItem(prev => {
      if (!prev) return null;
      return {
        ...prev,
        hitDie: val,
        coreTraits: {
          ...prev.coreTraits,
          hitPointDie: `每${prev.name || '职业'}等级 ${val}` // Auto-sync display text
        }
      };
    });
  };

  const handleSaveChange = (index: number, value: string) => {
    setItem(prev => {
      if (!prev) return null;
      const newSaves = [...prev.saves];
      // Ensure we have at least 2 slots
      if (newSaves.length < 2) {
         newSaves[0] = newSaves[0] || ATTR_OPTIONS[0];
         newSaves[1] = newSaves[1] || ATTR_OPTIONS[1];
      }
      newSaves[index] = value;
      return {
        ...prev,
        saves: newSaves,
        coreTraits: {
          ...prev.coreTraits,
          savingThrows: newSaves.join('与') // Auto-sync display text
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">生命骰 (Hit Die)</label>
          <select 
            value={item.hitDie} 
            onChange={handleHitDieChange}
            className="w-full p-2 border rounded focus:border-dndRed bg-white"
          >
            {HIT_DICE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">主属性 (逻辑)</label>
          <input type="text" value={item.primaryAbility} onChange={e => setItem(p => p ? {...p, primaryAbility: e.target.value} : null)} className="w-full p-2 border rounded" placeholder="力量"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">豁免熟练 (逻辑)</label>
          <div className="flex gap-2">
            <select 
              value={item.saves[0] || ATTR_OPTIONS[0]} 
              onChange={(e) => handleSaveChange(0, e.target.value)}
              className="w-1/2 p-2 border rounded focus:border-dndRed bg-white"
            >
              {ATTR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select 
              value={item.saves[1] || ATTR_OPTIONS[1]} 
              onChange={(e) => handleSaveChange(1, e.target.value)}
              className="w-1/2 p-2 border rounded focus:border-dndRed bg-white"
            >
              {ATTR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">子职解锁等级</label>
          <input type="number" value={item.subclassLevel} onChange={e => setItem(p => p ? {...p, subclassLevel: parseInt(e.target.value)||3} : null)} className="w-full p-2 border rounded"/>
        </div>
      </div>

      <div className="h-px bg-stone-300 my-4"></div>

      {/* Core Traits Table Editor (Visual matching screenshot) */}
      <div className="bg-white border border-stone-300 rounded overflow-hidden">
        <div className="bg-stone-800 text-white px-3 py-2 font-bold text-sm">核心特质 (显示用 - 自动同步)</div>
        <div className="divide-y divide-stone-200 text-sm">
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">主属性</div>
              <div className="col-span-9 p-1">
                 <input type="text" className="w-full p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                   value={item.coreTraits.primaryAbility} onChange={e => updateCore('primaryAbility', e.target.value)} />
              </div>
           </div>
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">生命值骰</div>
              <div className="col-span-9 p-1">
                 <input type="text" className="w-full p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                   value={item.coreTraits.hitPointDie} onChange={e => updateCore('hitPointDie', e.target.value)} />
              </div>
           </div>
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">豁免熟练</div>
              <div className="col-span-9 p-1">
                 <input type="text" className="w-full p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                   value={item.coreTraits.savingThrows} onChange={e => updateCore('savingThrows', e.target.value)} />
              </div>
           </div>
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">技能熟练</div>
              <div className="col-span-9 p-1">
                 <textarea className="w-full p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none resize-y" 
                   value={item.coreTraits.skillProficiencies} onChange={e => updateCore('skillProficiencies', e.target.value)} />
              </div>
           </div>
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">武器熟练</div>
              <div className="col-span-9 p-1">
                 <input type="text" className="w-full p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                   value={item.coreTraits.weaponProficiencies} onChange={e => updateCore('weaponProficiencies', e.target.value)} />
              </div>
           </div>
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">护甲受训</div>
              <div className="col-span-9 p-1">
                 <input type="text" className="w-full p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                   value={item.coreTraits.armorTraining} onChange={e => updateCore('armorTraining', e.target.value)} />
              </div>
           </div>
           <div className="grid grid-cols-12">
              <div className="col-span-3 bg-stone-100 p-2 font-bold flex items-center">起始装备</div>
              <div className="col-span-9 p-2 space-y-2">
                 <div className="flex gap-2 items-center">
                    <span className="font-bold text-xs text-stone-500">选项A:</span>
                    <input type="text" className="flex-grow p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                      value={item.coreTraits.startingEquipment.optionA} onChange={e => updateEquipment('optionA', e.target.value)} />
                 </div>
                 <div className="flex gap-2 items-center">
                    <span className="font-bold text-xs text-stone-500">选项B:</span>
                    <input type="text" className="flex-grow p-1 border-b border-dashed border-stone-300 focus:border-dndRed outline-none" 
                      value={item.coreTraits.startingEquipment.optionB} onChange={e => updateEquipment('optionB', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-2">
         <label className="block text-sm font-bold text-stone-700">完整描述 (支持Markdown)</label>
         <textarea 
            value={item.fullDescription} 
            onChange={e => setItem(p => p ? {...p, fullDescription: e.target.value} : null)} 
            className="w-full min-h-[8rem] p-2 border rounded focus:border-dndRed outline-none"
         />
      </div>

      <FeatureListEditor 
        features={item.features} 
        onChange={(newFeatures) => setItem(prev => prev ? ({ ...prev, features: newFeatures }) : null)} 
      />
    </div>
  );
};

// --- Subclass Editor ---
export const SubclassEditor = ({ item, setItem, classes }: { item: SubclassItem, setItem: React.Dispatch<React.SetStateAction<SubclassItem | null>>, classes: ClassItem[] }) => {
  return (
    <div className="space-y-6">
       <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">关联主职业 (Parent Class)</label>
          <select 
             value={item.parentClass} 
             onChange={e => setItem(prev => prev ? ({...prev, parentClass: e.target.value}) : null)}
             className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
          >
             <option value="">-- 请选择关联主职业 --</option>
             {classes.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
             ))}
          </select>
       </div>
       
       <div className="space-y-2">
         <label className="block text-sm font-bold text-stone-700">完整描述 (支持Markdown: **加粗**, *斜体*, | 表格 |)</label>
         <textarea 
            value={item.fullDescription || item.description} 
            onChange={e => setItem(prev => prev ? ({...prev, fullDescription: e.target.value}) : null)}
            className="w-full min-h-[12rem] p-3 border border-stone-300 rounded focus:border-dndRed focus:outline-none font-mono text-sm leading-relaxed"
            placeholder="支持多行文本，用于子职详情页显示..."
         />
       </div>

       <FeatureListEditor 
        features={item.features} 
        onChange={(newFeatures) => setItem(prev => prev ? ({ ...prev, features: newFeatures }) : null)} 
      />
    </div>
  );
};

// --- Background Editor (Optimized Step-by-Step) ---
export const BackgroundEditor = ({ 
  item, 
  setItem, 
  feats 
}: { 
  item: BackgroundItem, 
  setItem: React.Dispatch<React.SetStateAction<BackgroundItem | null>>, 
  feats: FeatItem[] 
}) => {
  
  const handleAbilityToggle = (attr: string) => {
    setItem(prev => {
      if (!prev) return null;
      const current = prev.abilityScores || [];
      if (current.includes(attr)) {
        return { ...prev, abilityScores: current.filter(a => a !== attr) };
      } else {
        if (current.length >= 3) return prev; // Max 3
        return { ...prev, abilityScores: [...current, attr] };
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Abilities */}
      <div className="bg-white p-4 rounded border border-stone-300">
         <h4 className="font-bold text-dndRed mb-2">1. 选择属性 (选择3个)</h4>
         <p className="text-xs text-stone-500 mb-3">根据背景的体力、耐力、脑力或社交倾向选择。</p>
         <div className="flex gap-2 flex-wrap">
            {ATTR_OPTIONS.map(attr => (
               <button 
                  key={attr} 
                  onClick={() => handleAbilityToggle(attr)}
                  className={`px-3 py-1 rounded border text-sm font-bold transition-colors ${
                     (item.abilityScores || []).includes(attr) 
                     ? 'bg-dndRed text-white border-dndRed' 
                     : 'bg-stone-50 text-stone-600 border-stone-300 hover:bg-stone-100'
                  }`}
               >
                  {attr}
               </button>
            ))}
         </div>
      </div>

      {/* Step 2: Feat */}
      <div className="bg-white p-4 rounded border border-stone-300">
         <h4 className="font-bold text-dndRed mb-2">2. 选择一个起源专长</h4>
         <select 
            value={item.feat}
            onChange={e => setItem(prev => prev ? ({...prev, feat: e.target.value}) : null)}
            className="w-full p-2 border rounded focus:border-dndRed"
         >
            <option value="">-- 选择专长 --</option>
            {feats.map(f => (
               <option key={f.name} value={f.name}>{f.name}</option>
            ))}
         </select>
      </div>

      {/* Step 3: Skills */}
      <div className="bg-white p-4 rounded border border-stone-300">
         <h4 className="font-bold text-dndRed mb-2">3. 选择技能熟练项 (2个)</h4>
         <input 
            type="text" 
            value={(item.skills || []).join('、')}
            onChange={e => setItem(prev => prev ? ({...prev, skills: e.target.value.split(/[、,]/).map(s=>s.trim())}) : null)}
            className="w-full p-2 border rounded focus:border-dndRed" 
            placeholder="例如：运动、生存 (使用顿号分隔)"
         />
      </div>

      {/* Step 4: Tool */}
      <div className="bg-white p-4 rounded border border-stone-300">
         <h4 className="font-bold text-dndRed mb-2">4. 选择一种工具熟练项</h4>
         <input 
            type="text" 
            value={item.tool}
            onChange={e => setItem(prev => prev ? ({...prev, tool: e.target.value}) : null)}
            className="w-full p-2 border rounded focus:border-dndRed" 
            placeholder="例如：木匠工具 或 盗贼工具"
         />
      </div>

      {/* Step 5: Equipment */}
      <div className="bg-white p-4 rounded border border-stone-300">
         <h4 className="font-bold text-dndRed mb-2">5. 选择装备 (价值50GP)</h4>
         <p className="text-xs text-stone-500 mb-2">不要包含军用武器和护甲。多余金币也包含在内。</p>
         <textarea 
            value={(item.equipment || []).join('\n')}
            onChange={e => setItem(prev => prev ? ({...prev, equipment: e.target.value.split('\n')}) : null)}
            className="w-full min-h-[6rem] p-2 border rounded focus:border-dndRed font-mono text-sm" 
            placeholder="A: ... (每行一个选项)"
         />
      </div>
    </div>
  );
};

// --- Spell Editor ---
export const SpellEditor = ({ item, setItem }: { item: SpellItem, setItem: React.Dispatch<React.SetStateAction<SpellItem | null>> }) => {
   const [showGuide, setShowGuide] = useState(true);

   // Official 5R Magic Schools
   const SCHOOL_OPTIONS = [
      { name: "防护", desc: "抵御或逆转有害效应" },
      { name: "咒法", desc: "转移生物或物件" },
      { name: "预言", desc: "揭露讯息" },
      { name: "惑控", desc: "影响心智" },
      { name: "塑能", desc: "引导能量创造效应" },
      { name: "幻术", desc: "欺骗感官与心灵" },
      { name: "死灵", desc: "操纵生与死" },
      { name: "变化", desc: "转变生物或物件" }
   ];
   
   const CLASS_OPTIONS = CLASS_DB.map(c => c.name);

   const toggleClass = (cls: string) => {
      setItem(prev => {
         if (!prev) return null;
         const current = prev.classes || [];
         if (current.includes(cls)) return { ...prev, classes: current.filter(c => c !== cls) };
         return { ...prev, classes: [...current, cls] };
      });
   };

   return (
      <div className="space-y-6">
         {/* Creation Guide - Collapsible */}
         <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
            <button onClick={() => setShowGuide(!showGuide)} className="w-full px-4 py-2 bg-blue-100 flex justify-between items-center text-blue-900 font-bold text-sm">
               <span className="flex items-center gap-2"><BookOpen className="w-4 h-4"/> 创作法术指南 (Creating a Spell)</span>
               <span>{showGuide ? "收起" : "展开"}</span>
            </button>
            {showGuide && (
               <div className="p-4 text-sm text-blue-800 space-y-3 leading-relaxed">
                  <p><strong>名字 (Name):</strong> 必须有一个独特的名字。</p>
                  <p><strong>属于谁 (Identity):</strong> 确保法术效能符合施法职业（例如，术士/法师通常不能治疗）。</p>
                  <p><strong>平衡性 (Balance):</strong> 避免设计出“必选”法术。若法术太强，应提升环阶。</p>
                  <p><strong>参数权衡:</strong> 持续时间漫长、射程极远或范围广大可以弥补较弱的效应。反之亦然。</p>
                  <p><strong>实用性 (Utility):</strong> 避免限制过高（如只对泥怪生效）。</p>
                  
                  <div className="mt-3 pt-3 border-t border-blue-200">
                     <h5 className="font-bold mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> 法术伤害参考表 (目标豁免/未命中通常减半)</h5>
                     <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="font-bold border-b border-blue-200 pb-1">环阶</div>
                        <div className="font-bold border-b border-blue-200 pb-1">单体伤害</div>
                        <div className="font-bold border-b border-blue-200 pb-1">多目标/范围伤害</div>
                        
                        <div>戏法</div><div>1d10 (5.5)</div><div>1d6 (3.5)</div>
                        <div>1环</div><div>2d10 (11)</div><div>2d6 (7)</div>
                        <div>2环</div><div>3d10 (16.5)</div><div>4d6 (14)</div>
                        <div>3环</div><div>5d10 (27.5)</div><div>6d6 (21)</div>
                        <div>4环</div><div>6d10 (33)</div><div>7d6 (24.5)</div>
                        <div>5环</div><div>8d10 (44)</div><div>8d6 (28)</div>
                        <div className="col-span-3 italic text-[10px] text-blue-600 mt-1">
                           * 若法术对豁免成功者无伤害，可提升 25% 伤害。
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Basic Fields Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded border border-stone-200">
            <div className="col-span-1">
               <label className="block text-xs font-bold text-stone-500 uppercase mb-1">环阶 (Level)</label>
               <select 
                  value={item.level} 
                  onChange={e => setItem(p => p ? {...p, level: parseInt(e.target.value)} : null)}
                  className="w-full p-2 border rounded focus:border-dndRed outline-none"
               >
                  {[0,1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l}>{l === 0 ? '戏法' : `${l}环`}</option>)}
               </select>
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-bold text-stone-500 uppercase mb-1">学派 (School)</label>
               <select 
                  value={item.school} 
                  onChange={e => setItem(p => p ? {...p, school: e.target.value} : null)}
                  className="w-full p-2 border rounded focus:border-dndRed outline-none"
               >
                  {SCHOOL_OPTIONS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
               </select>
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-bold text-stone-500 uppercase mb-1">施法时间 (Casting Time)</label>
               <input 
                  type="text" 
                  value={item.castingTime} 
                  onChange={e => setItem(p => p ? {...p, castingTime: e.target.value} : null)}
                  className="w-full p-2 border rounded focus:border-dndRed outline-none"
                  placeholder="例如：1 动作, 附赠动作, 10分钟..."
               />
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-bold text-stone-500 uppercase mb-1">施法距离 (Range)</label>
               <input 
                  type="text" 
                  value={item.range} 
                  onChange={e => setItem(p => p ? {...p, range: e.target.value} : null)}
                  className="w-full p-2 border rounded focus:border-dndRed outline-none"
                  placeholder="例如：60 尺, 自身 (15尺锥状)..."
               />
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-bold text-stone-500 uppercase mb-1">成分 (Components)</label>
               <input 
                  type="text" 
                  value={item.components} 
                  onChange={e => setItem(p => p ? {...p, components: e.target.value} : null)}
                  className="w-full p-2 border rounded focus:border-dndRed outline-none"
                  placeholder="V, S, M (材料...)"
               />
            </div>
            <div className="col-span-1">
               <label className="block text-xs font-bold text-stone-500 uppercase mb-1">持续时间 (Duration)</label>
               <input 
                  type="text" 
                  value={item.duration} 
                  onChange={e => setItem(p => p ? {...p, duration: e.target.value} : null)}
                  className="w-full p-2 border rounded focus:border-dndRed outline-none"
                  placeholder="立即, 专注 (至多1分钟)..."
               />
            </div>
         </div>

         {/* Class Availability */}
         <div className="bg-white p-4 rounded border border-stone-200">
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2">适用职业 (Classes)</label>
            <div className="flex flex-wrap gap-2">
               {CLASS_OPTIONS.map(cls => (
                  <button 
                     key={cls}
                     onClick={() => toggleClass(cls)}
                     className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                        (item.classes || []).includes(cls)
                        ? 'bg-stone-800 text-white border-stone-800'
                        : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                     }`}
                  >
                     {cls}
                  </button>
               ))}
            </div>
         </div>

         {/* Description */}
         <div>
            <label className="block text-sm font-bold text-stone-700 mb-1 flex items-center justify-between">
               <span>法术详情 (支持Markdown)</span>
               <span className="text-xs font-normal text-stone-400">请详细描述法术效应、伤害及升环效果</span>
            </label>
            <textarea 
               value={item.description} 
               onChange={e => setItem(p => p ? {...p, description: e.target.value} : null)}
               className="w-full min-h-[16rem] p-4 border border-stone-300 rounded focus:border-dndRed focus:outline-none font-mono text-sm leading-relaxed"
               placeholder="在此输入法术的详细描述..."
            />
         </div>
      </div>
   );
};

// --- Tool Editor ---
export const ToolEditor = ({ item, setItem }: { item: ItemItem, setItem: React.Dispatch<React.SetStateAction<ItemItem | null>> }) => {
  const updateUtilize = (index: number, field: string, value: string) => {
    setItem(prev => {
      if (!prev) return null;
      const newUtilize = [...(prev.toolUtilize || [])];
      newUtilize[index] = { ...newUtilize[index], [field]: value };
      return { ...prev, toolUtilize: newUtilize };
    });
  };

  const addUtilize = () => {
    setItem(prev => prev ? ({...prev, toolUtilize: [...(prev.toolUtilize || []), { action: "", dc: "", description: "" }]}) : null);
  };

  const removeUtilize = (index: number) => {
    setItem(prev => prev ? ({...prev, toolUtilize: (prev.toolUtilize || []).filter((_, i) => i !== index)}) : null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">价格</label>
          <input type="text" value={item.cost} onChange={e => setItem(p => p ? {...p, cost: e.target.value} : null)} className="w-full p-2 border rounded" placeholder="25 GP"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">重量</label>
          <input type="text" value={item.weight} onChange={e => setItem(p => p ? {...p, weight: e.target.value} : null)} className="w-full p-2 border rounded" placeholder="1 lb"/>
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">关键属性</label>
          <select value={item.toolAbility} onChange={e => setItem(p => p ? {...p, toolAbility: e.target.value} : null)} className="w-full p-2 border rounded bg-white">
             <option value="">-- 选择 --</option>
             {ATTR_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
             <option value="智力 或 感知">智力 或 感知</option>
             <option value="感知 或 魅力">感知 或 魅力</option>
          </select>
        </div>
      </div>

      {/* Utilize Editor */}
      <div className="bg-stone-50 p-4 rounded border border-stone-200">
         <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-stone-700">操作 (Utilize) 动作范例</label>
            <button onClick={addUtilize} className="text-xs bg-white border border-stone-300 px-2 py-1 rounded hover:bg-stone-100 flex items-center gap-1">
               <Plus className="w-3 h-3"/> 添加
            </button>
         </div>
         <div className="space-y-2">
            {(item.toolUtilize || []).map((u, i) => (
               <div key={i} className="flex gap-2">
                  <input type="text" value={u.action} onChange={e => updateUtilize(i, 'action', e.target.value)} className="w-1/3 p-1 border rounded text-sm" placeholder="动作名称" />
                  <input type="text" value={u.dc} onChange={e => updateUtilize(i, 'dc', e.target.value)} className="w-16 p-1 border rounded text-sm text-center" placeholder="DC" />
                  <input type="text" value={u.description} onChange={e => updateUtilize(i, 'description', e.target.value)} className="flex-grow p-1 border rounded text-sm" placeholder="描述" />
                  <button onClick={() => removeUtilize(i)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4"/></button>
               </div>
            ))}
         </div>
      </div>

      <div>
         <label className="block text-sm font-bold text-stone-700 mb-1">可制造物品 (用逗号分隔)</label>
         <input 
            type="text" 
            value={(item.toolCraft || []).join(', ')} 
            onChange={e => setItem(p => p ? {...p, toolCraft: e.target.value.split(/,|，/).map(s=>s.trim())} : null)} 
            className="w-full p-2 border rounded"
            placeholder="例如：治疗药水, 抗毒剂"
         />
      </div>

      <div>
         <label className="block text-sm font-bold text-stone-700 mb-1">工具变体 (用逗号分隔)</label>
         <input 
            type="text" 
            value={(item.toolVariants || []).join(', ')} 
            onChange={e => setItem(p => p ? {...p, toolVariants: e.target.value.split(/,|，/).map(s=>s.trim())} : null)} 
            className="w-full p-2 border rounded"
            placeholder="例如：笛子, 竖琴, 鼓"
         />
      </div>

      <div>
         <label className="block text-sm font-bold text-stone-700 mb-1">详细描述</label>
         <textarea 
            value={item.description} 
            onChange={e => setItem(p => p ? {...p, description: e.target.value} : null)} 
            className="w-full min-h-[8rem] p-2 border rounded focus:border-dndRed outline-none"
         />
      </div>
    </div>
  );
};

// --- Generic Rich Text Editor Field ---
export const RichDescriptionEditor = <T extends { description: string }>({ item, setItem }: { item: T, setItem: React.Dispatch<React.SetStateAction<T | null>> }) => {
   return (
      <div>
         <label className="block text-sm font-bold text-stone-700 mb-1">详细描述 (支持Markdown: **加粗**, *斜体*, | 表格 |)</label>
         <textarea 
            value={item.description} 
            onChange={e => setItem(prev => prev ? ({...prev, description: e.target.value}) : null)}
            className="w-full min-h-[12rem] p-3 border border-stone-300 rounded focus:border-dndRed focus:outline-none font-mono text-sm leading-relaxed"
            placeholder="支持多行文本..."
         />
      </div>
   );
};
