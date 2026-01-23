
import React, { useState } from 'react';
import { CharacterData, ClassItem, SubclassItem, ClassFeature, FeatItem } from '../types';
import { Shield, Info, Star, Plus, X, Search, CheckCircle, Swords, Crown } from 'lucide-react';
import { CardLibrary } from './CardLibrary';
import { RichText } from './RichText';

interface Props {
   character: CharacterData;
   updateCharacter: (updates: Partial<CharacterData>) => void;
   libraryClasses: ClassItem[];
   librarySubclasses: SubclassItem[];
   libraryFeats: FeatItem[]; // Added prop
}

const TabClass: React.FC<Props> = ({ character, updateCharacter, libraryClasses, librarySubclasses, libraryFeats }) => {
   const [isSelectingClass, setIsSelectingClass] = useState(false);

   // Selection State
   // Format: { level: number, type: 'general' | 'fighting-style' | 'epic-boon', name: string }
   const [activeSelector, setActiveSelector] = useState<{ level: number, type: 'general' | 'fighting-style' | 'epic-boon', name: string } | null>(null);

   // --- Helper: Get Full Class Data ---
   const getClassData = (className: string) => libraryClasses.find(c => c.name === className);

   // --- Helper: Get Available Subclasses ---
   const getSubclasses = (className: string) => {
      const cls = getClassData(className);
      if (!cls) return [];
      const builtIn = cls.subclasses || [];
      const external = librarySubclasses.filter(s => s.parentClass === className).map(s => ({
         name: s.name,
         description: s.description,
         fullDescription: s.fullDescription,
         features: s.features
      }));
      return [...builtIn, ...external];
   };

   // --- Handlers ---
   const handleUpdatePrimary = (field: keyof CharacterData, value: any) => {
      updateCharacter({ [field]: value });
   };

   const handleClassSelect = (item: ClassItem) => {
      // Reset subclass when changing class
      updateCharacter({ className: item.name, subclass: '' });
      setIsSelectingClass(false);
   };

   const handleFeatSelect = (feat: FeatItem) => {
      if (activeSelector) {
         // Create a unique key for this selection: e.g. "4-ASI" or "1-Fighting Style"
         const selectionKey = `${activeSelector.level}-${activeSelector.name}`;

         updateCharacter({
            featSelections: {
               ...character.featSelections,
               [selectionKey]: feat.name
            }
         });
         setActiveSelector(null);
      }
   };

   // --- Wrapper for Resilient Logic ---
   const handleResilientSelect = (selectionKey: string, attr: string) => {
      updateCharacter({
         featConfig: {
            ...character.featConfig,
            otherFeats: {
               ...character.featConfig?.otherFeats,
               [selectionKey]: {
                  ...character.featConfig?.otherFeats?.[selectionKey],
                  resilientAttribute: attr
               }
            }
         }
      });
   };

   // --- Component for Feat Picker Modal ---
   const FeatPickerModal = () => {
      const [searchTerm, setSearchTerm] = useState('');

      // Determine category based on selector type
      let targetCategory = '通用专长';
      let icon = <Star className="w-6 h-6" />;

      if (activeSelector?.type === 'fighting-style') {
         targetCategory = '战斗风格专长';
         icon = <Swords className="w-6 h-6" />;
      } else if (activeSelector?.type === 'epic-boon') {
         targetCategory = '传奇恩惠专长';
         icon = <Crown className="w-6 h-6" />;
      }

      const availableFeats = libraryFeats.filter(f =>
         f.category === targetCategory &&
         (f.name.includes(searchTerm) || f.description.includes(searchTerm))
      );

      const selectionKey = activeSelector ? `${activeSelector.level}-${activeSelector.name}` : '';

      return (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border-2 border-stone-800">
               <div className="p-4 border-b-2 border-stone-200 flex justify-between items-center bg-stone-100">
                  <h3 className="font-black text-2xl text-dndRed flex items-center gap-2">
                     {icon}
                     选择{targetCategory.replace('专长', '')} (等级 {activeSelector?.level})
                  </h3>
                  <button onClick={() => setActiveSelector(null)} className="p-2 hover:bg-stone-200 rounded-full text-stone-600 transition-colors">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="p-4 bg-white border-b border-stone-200">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                     <input
                        type="text"
                        placeholder="搜索专长名称、描述..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-3 border-2 border-stone-300 rounded-lg focus:border-dndRed focus:outline-none font-bold"
                        autoFocus
                     />
                  </div>
               </div>

               <div className="flex-grow overflow-y-auto p-4 bg-stone-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {availableFeats.map(feat => (
                        <div
                           key={feat.id}
                           onClick={() => handleFeatSelect(feat)}
                           className="bg-white p-4 rounded-lg border-2 border-stone-200 hover:border-dndRed cursor-pointer shadow-sm group transition-all"
                        >
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-lg text-stone-800 group-hover:text-dndRed">{feat.name}</h4>
                              {feat.repeatable && <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">复选</span>}
                           </div>
                           <div className="text-xs text-stone-500 mb-2 font-bold flex items-center gap-1">
                              <span className="text-dndRed">先决条件:</span> {feat.prerequisite || "无"}
                           </div>
                           <p className="text-sm text-stone-600 line-clamp-3 mb-2">{feat.description}</p>
                           <ul className="text-xs text-stone-500 list-disc pl-4 space-y-1">
                              {(feat.benefits || []).slice(0, 2).map((b, i) => (
                                 <li key={i} className="truncate">{b.replace(/\*\*/g, '')}</li>
                              ))}
                              {(feat.benefits || []).length > 2 && <li>...</li>}
                           </ul>

                           {/* Resilient Feat Configuration */}
                           {feat.name === "强健身心" && (
                              <div className="mt-2 p-2 bg-stone-100 rounded border border-stone-200" onClick={(e) => e.stopPropagation()}>
                                 <span className="text-xs font-bold text-stone-600 block mb-2">选择强健身心属性 (及豁免熟练):</span>
                                 <div className="flex flex-wrap gap-2">
                                    {['力量', '敏捷', '体质', '智力', '感知', '魅力'].map(attr => {
                                       const config = character.featConfig?.otherFeats?.[selectionKey];
                                       const isSelected = config?.resilientAttribute === attr;
                                       return (
                                          <button
                                             key={attr}
                                             onClick={() => {
                                                handleResilientSelect(selectionKey, attr);
                                                // Also trigger selection of the feat itself
                                                handleFeatSelect(feat);
                                             }}
                                             className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${isSelected ? 'bg-dndRed text-white border-dndRed' : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-200'
                                                }`}
                                          >
                                             {attr}
                                          </button>
                                       );
                                    })}
                                 </div>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   // --- Component for Feature Card ---
   const FeatureCard = ({ feature, type }: { feature: ClassFeature, type: string, key?: React.Key }) => {
      // Detect specific feature types that allow selection
      const isASI = feature.name.includes("属性值提升") || feature.name.includes("Ability Score Improvement");
      const isFightingStyle = feature.name.includes("战斗风格") || feature.name.includes("Fighting Style");
      const isEpicBoon = feature.name.includes("传奇恩惠") || feature.name.includes("Epic Boon");

      // Detect subclass placeholder feature (e.g., "野蛮人子职", "牧师子职 (Cleric Subclass)")
      const isSubclassPlaceholder = (feature.name.includes('子职') || feature.name.includes('Subclass')) && type === '职业';

      // Unique key for storage
      const selectionKey = `${feature.level}-${feature.name}`;
      const selectedFeatName = character.featSelections?.[selectionKey];
      const selectedFeatData = selectedFeatName ? libraryFeats.find(f => f.name === selectedFeatName) : null;

      const canSelect = isASI || isFightingStyle || isEpicBoon;

      let selectorType: 'general' | 'fighting-style' | 'epic-boon' = 'general';
      let buttonText = "选择专长替代";

      if (isFightingStyle) {
         selectorType = 'fighting-style';
         buttonText = "选择战斗风格";
      } else if (isEpicBoon) {
         selectorType = 'epic-boon';
         buttonText = "选择传奇恩惠";
      }

      // Get subclass data for subclass placeholder features
      const selectedSubclassData = character.subclass ? subOptions.find(s => s.name === character.subclass) : null;
      const subclassFeatureForLevel = selectedSubclassData?.features.find(f => f.level === feature.level);

      // Render subclass placeholder feature with inline selector and subclass content
      if (isSubclassPlaceholder) {
         return (
            <div className={`bg-white p-3 rounded border shadow-sm transition-all hover:shadow-md ${character.subclass ? 'border-yellow-400 ring-1 ring-yellow-400' : 'border-dndRed ring-1 ring-dndRed'}`}>
               <div className="flex justify-between items-center mb-1 gap-3">
                  <span className="text-xs font-bold text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded flex-shrink-0">Lv {feature.level}</span>
                  <span className="font-bold text-stone-900 flex-grow flex items-center gap-2">
                     {character.subclass && subclassFeatureForLevel ? (
                        <>
                           <span className="text-dndRed">{subclassFeatureForLevel.name}</span>
                           <span className="text-xs text-stone-400 font-normal">({character.subclass})</span>
                        </>
                     ) : (
                        <span className="text-dndRed">{feature.name}</span>
                     )}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${character.subclass ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                     {character.subclass ? '子职' : '待选择'}
                  </span>
               </div>

               {/* Inline Subclass Selector */}
               <div className="my-3 p-2 bg-stone-50 rounded border border-stone-200">
                  <div className="flex items-center gap-2">
                     <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                     <select
                        value={character.subclass}
                        onChange={(e) => handleUpdatePrimary('subclass', e.target.value)}
                        className={`flex-grow text-sm border rounded p-2 font-medium focus:border-dndRed focus:outline-none ${character.subclass ? 'border-stone-300 bg-white' : 'border-dndRed bg-red-50'}`}
                     >
                        <option value="">-- 请选择子职业 --</option>
                        {subOptions.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                     </select>
                  </div>
               </div>

               <div className="text-sm text-stone-600 leading-relaxed pl-2 border-l-2 border-stone-100 mt-2">
                  {character.subclass && subclassFeatureForLevel ? (
                     <div className="space-y-2">
                        <RichText text={subclassFeatureForLevel.description} />
                     </div>
                  ) : (
                     <div className="text-stone-500 italic">
                        <RichText text={feature.description} />
                     </div>
                  )}
               </div>
            </div>
         );
      }

      return (
         <div className={`bg-white p-3 rounded border shadow-sm transition-all hover:shadow-md ${selectedFeatData ? 'border-yellow-400 ring-1 ring-yellow-400' : 'border-stone-200'}`}>
            <div className="flex justify-between items-center mb-1 gap-3">
               <span className="text-xs font-bold text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded flex-shrink-0">Lv {feature.level}</span>
               <span className="font-bold text-stone-900 flex-grow flex items-center gap-2">
                  {selectedFeatData ? (
                     <>
                        <span className="text-dndRed">{selectedFeatData.name}</span>
                        <span className="text-xs text-stone-400 font-normal line-through">{feature.name}</span>
                     </>
                  ) : (
                     feature.name
                  )}
               </span>
               <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${type === '职业' ? 'bg-stone-50 text-stone-400 border-stone-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>{type}</span>
            </div>

            <div className="text-sm text-stone-600 leading-relaxed pl-2 border-l-2 border-stone-100 mt-2">
               {selectedFeatData ? (
                  <div className="space-y-2">
                     <div className="text-xs font-bold text-stone-500 bg-yellow-50 p-1 rounded inline-block">
                        {selectedFeatData.category} | 先决条件: {selectedFeatData.prerequisite || "无"}
                     </div>
                     <p className="italic">{selectedFeatData.description}</p>
                     <ul className="list-disc pl-4 space-y-1">
                        {selectedFeatData.benefits.map((b, i) => (
                           <li key={i}><RichText text={b} /></li>
                        ))}
                     </ul>
                  </div>
               ) : (
                  <RichText text={feature.description} />
               )}
            </div>

            {canSelect && (
               <div className="mt-3 flex justify-end">
                  <button
                     onClick={() => setActiveSelector({ level: feature.level, type: selectorType, name: feature.name })}
                     className={`text-xs px-3 py-1.5 rounded flex items-center gap-1 transition-colors font-bold ${selectedFeatData
                        ? "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        : "bg-dndRed text-white hover:bg-red-800"
                        }`}
                  >
                     {selectedFeatData ? (
                        <><CheckCircle className="w-3 h-3" /> 更换选择</>
                     ) : (
                        <><Plus className="w-3 h-3" /> {buttonText}</>
                     )}
                  </button>
               </div>
            )}
         </div>
      );
   };

   // --- Render Mode: Class Selection ---
   if (isSelectingClass) {
      return (
         <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
               <h2 className="text-2xl font-bold text-dndRed">选择职业</h2>
               <button onClick={() => setIsSelectingClass(false)} className="text-stone-500 underline hover:text-dndRed">取消返回</button>
            </div>
            <CardLibrary
               title="职业列表"
               items={libraryClasses}
               itemTypeLabel="职业"
               selectedId={character.className}
               onSelect={handleClassSelect}
               allowEdit={false} // Editing is handled in Library Manager
            />
         </div>
      );
   }

   // --- Render Mode: Class Details ---
   const classData = getClassData(character.className);
   const subOptions = getSubclasses(character.className);

   if (!classData) return <div className="p-8 text-red-500">数据错误：找不到职业 {character.className}</div>;

   const hitDie = classData.hitDie;
   const subclassLevel = classData.subclassLevel || 3;

   // --- Logic: Combine and Sort Features ---
   const getDisplayFeatures = () => {
      // 1. Tag base features - keep ALL base features including subclass placeholders
      let baseFeatures = classData.features.map(f => ({ ...f, sourceType: '职业' }));

      // 2. Handle Subclass Logic - add subclass features that DON'T overlap with base class placeholders
      if (character.subclass) {
         const subData = subOptions.find(s => s.name === character.subclass);
         if (subData) {
            // Get levels that have subclass placeholder features in base class
            const placeholderLevels = new Set(
               classData.features
                  .filter(f => f.name.includes('子职') || f.name.includes('Subclass'))
                  .map(f => f.level)
            );

            // Only add subclass features for levels that DON'T have a placeholder
            // (placeholder features are handled inline by FeatureCard)
            const nonOverlappingSubFeatures = subData.features
               .filter(f => !placeholderLevels.has(f.level))
               .map(f => ({ ...f, sourceType: '子职' }));

            baseFeatures = [...baseFeatures, ...nonOverlappingSubFeatures];
         }
      }

      // 3. Filter by Level and Sort
      return baseFeatures
         .filter(f => f.level <= character.level)
         .sort((a, b) => {
            // Sort by Level first
            if (a.level !== b.level) return a.level - b.level;
            return 0;
         });
   };

   const visibleFeatures = getDisplayFeatures();

   return (
      <div className="p-6 md:p-8 pb-20 bg-stone-100 min-h-full">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-dndRed pb-4 mb-8">
            <div>
               <h2 className="text-3xl font-bold text-dndRed">职业详情</h2>
               <p className="text-stone-500 mt-2">管理你的职业等级，选择子职，并查看解锁特性。</p>
            </div>
            <div className="bg-stone-800 text-white px-4 py-2 rounded-lg shadow-lg flex flex-col items-center min-w-[100px]">
               <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">当前等级</span>
               <span className="text-3xl font-black text-yellow-500">{character.level}</span>
            </div>
         </div>

         <div className="max-w-5xl mx-auto">
            {/* Main Class Card */}
            <div className="bg-white rounded-lg border-2 border-stone-300 shadow-md overflow-hidden">

               {/* Card Header Bar */}
               <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-grow flex items-center gap-3 w-full md:w-auto">
                     <div className="p-2 rounded-full bg-stone-800 text-white">
                        <Shield className="w-5 h-5" />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                           {character.className}
                        </h3>
                        <div className="text-xs text-stone-500 flex gap-2">
                           <span>生命骰: {hitDie}</span>
                           {character.subclass && <span className="text-dndRed font-bold">• {character.subclass}</span>}
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                     <button
                        onClick={() => setIsSelectingClass(true)}
                        className="text-xs font-bold text-stone-500 hover:text-dndRed underline px-2"
                     >
                        更换职业
                     </button>

                     <div className="flex items-center gap-2 bg-white rounded px-2 py-1 border border-stone-300 shadow-inner">
                        <span className="text-xs font-bold text-stone-500 uppercase">等级</span>
                        <input
                           type="number"
                           min="1" max="20"
                           value={character.level}
                           onChange={(e) => handleUpdatePrimary('level', Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                           className="w-12 text-center font-bold bg-transparent focus:outline-none text-lg text-dndRed"
                        />
                     </div>

                     {character.level >= subclassLevel && (
                        <select
                           value={character.subclass}
                           onChange={(e) => handleUpdatePrimary('subclass', e.target.value)}
                           className="text-sm border border-stone-300 rounded p-1.5 max-w-[140px] truncate focus:border-dndRed focus:outline-none bg-white"
                        >
                           <option value="">选择子职...</option>
                           {subOptions.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                     )}
                  </div>
               </div>

               {/* Card Body */}
               <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                  {/* Left Column: Info */}
                  <div className="lg:col-span-1 space-y-6">
                     <div className="bg-stone-50 p-4 rounded border border-stone-200 text-sm">
                        <h4 className="font-bold text-stone-800 border-b border-stone-200 pb-2 mb-3">核心特质</h4>
                        <div className="space-y-2">
                           <div className="flex justify-between"><span className="text-stone-500">主属性:</span> <span className="font-bold">{classData.coreTraits.primaryAbility}</span></div>
                           <div className="flex justify-between"><span className="text-stone-500">豁免熟练:</span> <span className="font-bold">{classData.coreTraits.savingThrows}</span></div>
                           <div className="flex justify-between"><span className="text-stone-500">护甲受训:</span> <span>{classData.coreTraits.armorTraining}</span></div>
                           <div className="flex justify-between"><span className="text-stone-500">武器熟练:</span> <span>{classData.coreTraits.weaponProficiencies}</span></div>
                        </div>
                     </div>

                     {character.level >= subclassLevel ? (
                        <div className="bg-stone-50 p-4 rounded border border-stone-200">
                           <h4 className="font-bold text-stone-800 border-b border-stone-200 pb-2 mb-3 flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" /> {character.subclass || "需选择子职"}
                           </h4>
                           {character.subclass ? (
                              (() => {
                                 const subData = subOptions.find(s => s.name === character.subclass);
                                 return subData ? (
                                    <div className="text-xs text-stone-600 leading-relaxed max-h-60 overflow-y-auto">
                                       <RichText text={subData.description} />
                                    </div>
                                 ) : <span className="text-xs italic text-stone-400">数据未找到</span>
                              })()
                           ) : (
                              <div className="text-xs text-red-500 italic">请在上方选择一个子职业以查看详情。</div>
                           )}
                        </div>
                     ) : (
                        <div className="p-4 rounded border border-stone-200 border-dashed text-center text-stone-400 text-xs italic">
                           子职业将在 {subclassLevel} 级解锁。
                        </div>
                     )}
                  </div>

                  {/* Right Column: Features */}
                  <div className="lg:col-span-2">
                     <h4 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-dndRed" /> 职业特性 (当前等级: {character.level})
                     </h4>

                     <div className="space-y-4">
                        {visibleFeatures.map((f, i) => (
                           <FeatureCard key={`${f.sourceType}-${f.level}-${i}`} feature={f} type={f.sourceType} />
                        ))}

                        {visibleFeatures.length === 0 && (
                           <div className="text-stone-400 italic text-center py-8">该等级暂无特性显示。</div>
                        )}
                     </div>
                  </div>

               </div>
            </div>
         </div>

         {activeSelector && <FeatPickerModal />}
      </div>
   );
};

export default TabClass;
