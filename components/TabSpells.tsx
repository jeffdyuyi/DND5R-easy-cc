
import React, { useState } from 'react';
import { CharacterData, SpellItem } from '../types';
import { Plus, X, BookOpen, Search, Trash2, Info, Flame, Shield, Book, ChevronDown, User } from 'lucide-react';
import { SPELL_DB } from '../data';
import { SpellDetailView } from './LibraryDetails';

interface Props {
   characters: CharacterData[];
   activeCharId: string | null;
   setActiveCharId: (id: string) => void;
   updateCharacter: (id: string, updates: Partial<CharacterData>) => void;
}

interface SpellListCardProps {
   spell: SpellItem;
   onClick?: () => void;
   actions?: React.ReactNode;
   isSelected?: boolean;
   showDelete?: () => void;
}

// 2024 (5R) Preparation Rules Data
const PREPARATION_RULES: Record<string, { when: string, qty: string }> = {
   "吟游诗人": { when: "升级时", qty: "一个" },
   "牧师": { when: "完成一次长休时", qty: "任意" },
   "德鲁伊": { when: "完成一次长休时", qty: "任意" },
   "圣武士": { when: "完成一次长休时", qty: "一个" },
   "游侠": { when: "完成一次长休时", qty: "一个" },
   "术士": { when: "升级时", qty: "一个" },
   "魔契师": { when: "升级时", qty: "一个" },
   "法师": { when: "完成一次长休时", qty: "任意" }
};

// --- Reusable Compact Spell Card ---
export const SpellListCard: React.FC<SpellListCardProps> = ({
   spell,
   onClick,
   actions,
   isSelected,
   showDelete
}) => {
   const isConcentration = spell.duration.includes('专注');
   const isRitual = spell.castingTime.includes('仪式');

   return (
      <div
         onClick={onClick}
         className={`
        group relative flex items-center gap-4 p-3 rounded-lg border-2 transition-all cursor-pointer shadow-sm
        ${isSelected ? 'border-dndRed bg-red-50 ring-1 ring-dndRed' : 'border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50'}
      `}
      >
         <div className={`
        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-2 shadow-inner
        ${spell.level === 0 ? 'bg-stone-100 border-stone-300 text-stone-500' : 'bg-white border-dndRed text-dndRed'}
      `}>
            {spell.level}
         </div>

         <div className="flex-grow min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
               <span className="font-black text-stone-800 text-lg leading-none truncate max-w-[120px] sm:max-w-none" title={spell.name}>{spell.name}</span>
               <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-bold border border-indigo-200 whitespace-nowrap" title="法术来源">
                  {spell.source}
               </span>
               {isRitual && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold border border-blue-200 whitespace-nowrap">仪式</span>}
               {isConcentration && <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded font-bold border border-stone-300 whitespace-nowrap">专注</span>}
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-2 truncate font-medium">
               <span className="text-stone-700">{spell.school}</span>
               {(spell.classes || []).length > 0 && (
                  <>
                     <span className="text-stone-300">|</span>
                     <span className="text-stone-400">{spell.classes?.join(', ')}</span>
                  </>
               )}
            </div>
         </div>

         <div className="flex items-center gap-2">
            {actions}
            {showDelete && (
               <button
                  onClick={(e) => { e.stopPropagation(); showDelete(); }}
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  title="移除法术"
               >
                  <Trash2 className="w-5 h-5" />
               </button>
            )}
         </div>
      </div>
   );
};

// --- Helper Components (Moved up to avoid TDZ issues) ---

const SpellPicker = ({ level, onSelect, characterClass, showAllToggle }: { level: number, onSelect: (spell: SpellItem) => void, characterClass?: string, showAllToggle?: boolean }) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [ignoreClassLimit, setIgnoreClassLimit] = useState(false);

   // Sorting State
   const [sortConfig, setSortConfig] = useState<{ key: keyof SpellItem, direction: 'asc' | 'desc' } | null>(null);

   // Source Filter State
   const allSources = Array.from(new Set(SPELL_DB.map(s => s.source))).sort();
   const [selectedSources, setSelectedSources] = useState<string[]>(allSources);

   // Toggle helper
   const toggleSource = (source: string) => {
      setSelectedSources(prev =>
         prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
      );
   };

   // Toggle All
   const toggleAllSources = () => {
      if (selectedSources.length === allSources.length) {
         setSelectedSources([]);
      } else {
         setSelectedSources(allSources);
      }
   };

   // Filtering
   const filteredSpells = SPELL_DB.filter(s => {
      const matchesLevel = s.level === level;
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.school.includes(searchTerm) ||
         s.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = selectedSources.includes(s.source);
      // 职业过滤：如果指定了角色职业，只显示该职业可用的法术
      // If ignoreClassLimit is true (Magical Secrets mode), we skip class check
      const matchesClass = ignoreClassLimit || !characterClass || s.classes?.includes(characterClass);
      return matchesLevel && matchesSearch && matchesSource && matchesClass;
   });

   // Sorting
   const sortedSpells = React.useMemo(() => {
      if (!sortConfig) return filteredSpells;
      return [...filteredSpells].sort((a, b) => {
         const aVal = a[sortConfig.key] || '';
         const bVal = b[sortConfig.key] || '';
         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
         return 0;
      });
   }, [filteredSpells, sortConfig]);

   const requestSort = (key: keyof SpellItem) => {
      let direction: 'asc' | 'desc' = 'asc';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
         direction = 'desc';
      }
      setSortConfig({ key, direction });
   };

   const SortIcon = ({ column }: { column: keyof SpellItem }) => {
      if (sortConfig?.key !== column) return <div className="w-4 h-4 opacity-0 group-hover:opacity-50">↓</div>;
      return <div className="w-4 h-4">{sortConfig.direction === 'asc' ? '↑' : '↓'}</div>;
   };

   return (
      <div className="flex flex-col h-full overflow-hidden bg-white text-sm text-stone-700">
         {/* Top Filter Bar */}
         <div className="p-2 border-b border-stone-300 flex items-center gap-2 bg-stone-50">
            <div className="font-bold text-stone-600 px-2 min-w-[60px]">筛选</div>

            {/* Reset / Toggle All */}
            <button
               onClick={toggleAllSources}
               className="p-1.5 hover:bg-stone-200 rounded text-stone-600"
               title="反选/全选来源"
            >
               <div className="flex items-center gap-1 font-bold text-xs">
                  {selectedSources.length === allSources.length ? '全不选' : '全选'}
               </div>
            </button>

            {/* Search */}
            <div className="relative flex-grow max-w-md">
               <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
               <input
                  type="text"
                  placeholder="搜索..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-1 border border-stone-300 rounded focus:border-blue-500 focus:outline-none"
               />
            </div>

            <div className="flex-grow"></div>

            {/* Count */}
            <div className="text-stone-500 text-xs px-2">
               {filteredSpells.length} / {SPELL_DB.filter(s => s.level === level).length}
            </div>

            {/* Magical Secrets Toggle */}
            {showAllToggle && (
               <label className="flex items-center gap-1 cursor-pointer select-none bg-purple-50 px-2 py-1 rounded border border-purple-200">
                  <input
                     type="checkbox"
                     checked={ignoreClassLimit}
                     onChange={(e) => setIgnoreClassLimit(e.target.checked)}
                     className="w-3 h-3 text-dndRed rounded focus:ring-dndRed"
                  />
                  <span className="text-xs font-bold text-purple-800">全职业 (魔法奥秘)</span>
               </label>
            )}

            <button
               onClick={() => { setSearchTerm(''); setSelectedSources(allSources); setIgnoreClassLimit(false); }}
               className="text-xs font-bold text-stone-600 hover:text-stone-900 px-2"
            >
               重置
            </button>
         </div>

         {/* Source Tags */}
         <div className="p-2 bg-stone-100 border-b border-stone-300 flex flex-wrap gap-1 max-h-[120px] overflow-y-auto">
            {allSources.map(src => (
               <button
                  key={src}
                  onClick={() => toggleSource(src)}
                  className={`
                     px-2 py-0.5 text-xs font-bold rounded border flex items-center gap-1 transition-colors
                     ${selectedSources.includes(src)
                        ? 'bg-sky-700 text-white border-sky-800 shadow-sm'
                        : 'bg-white text-stone-500 border-stone-300 hover:border-stone-400'}
                  `}
               >
                  <BookOpen className="w-3 h-3" />
                  {src}
               </button>
            ))}
         </div>

         {/* Table Header */}
         <div className="grid grid-cols-[2fr,0.5fr,1fr,0.8fr,0.5fr,1fr,0.8fr,auto] gap-2 p-2 bg-stone-50 font-bold border-b border-stone-300 select-none">
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => requestSort('name')}>
               名称 <SortIcon column="name" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => requestSort('level')}>
               环阶 <SortIcon column="level" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => requestSort('castingTime')}>
               时间 <SortIcon column="castingTime" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => requestSort('school')}>
               学派 <SortIcon column="school" />
            </div>
            <div className="text-center" title="专注">专</div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => requestSort('range')}>
               射程 <SortIcon column="range" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => requestSort('source')}>
               来源 <SortIcon column="source" />
            </div>
            <div className="w-8"></div> {/* Add Action */}
         </div>

         {/* List */}
         <div className="flex-grow overflow-y-auto">
            {sortedSpells.length === 0 ? (
               <div className="text-center text-stone-500 py-12 italic">无匹配法术</div>
            ) : (
               <div className="divide-y divide-stone-200">
                  {sortedSpells.map(spell => {
                     const isConcentration = spell.duration.includes('专注');
                     const isRitual = spell.castingTime.includes('仪式');

                     return (
                        <div key={spell.id} className="grid grid-cols-[2fr,0.5fr,1fr,0.8fr,0.5fr,1fr,0.8fr,auto] gap-2 p-2 items-center hover:bg-sky-50 transition-colors text-xs border-b border-stone-100 last:border-0 group">
                           <div className="font-bold text-stone-800 text-sm truncate" title={spell.name}>{spell.name}</div>
                           <div className="text-stone-600 text-center">{spell.level === 0 ? '戏法' : spell.level}</div>
                           <div className="truncate" title={spell.castingTime}>{spell.castingTime}</div>
                           <div className="truncate">{spell.school}</div>
                           <div className="flex justify-center gap-1">
                              {isConcentration && <span className="text-[10px] font-bold text-stone-500" title="专注">C</span>}
                              {isRitual && <span className="text-[10px] font-bold text-stone-500" title="仪式">R</span>}
                           </div>
                           <div className="truncate" title={spell.range}>{spell.range}</div>
                           <div className="truncate text-stone-500">{spell.source}</div>
                           <button
                              onClick={() => onSelect(spell)}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-200 text-stone-400 hover:text-dndRed"
                              title="添加法术"
                           >
                              <Plus className="w-5 h-5" />
                           </button>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
};

const SpellLevelSection = ({ levelConfig, character, onOpenPicker, onRemoveSpell, onViewSpell }: any) => {
   const rawText = character.spells[levelConfig.key] || "";
   const spellNames = rawText.split('\n')
      .map((s: string) => s.replace(/^[•\-\*]\s*/, '').trim())
      .filter((s: string) => s.length > 0);

   return (
      <div className="w-full">
         <div className="flex items-center gap-4 mb-6 border-b-2 border-stone-300 pb-2">
            <h3 className="text-2xl font-black text-stone-800 font-serif">{levelConfig.label}</h3>
            {levelConfig.slot && (
               <div className="flex items-center gap-2 text-sm bg-stone-200 px-3 py-1 rounded-full border border-stone-300">
                  <span className="font-bold text-stone-600">法术位:</span>
                  <input className="w-8 bg-transparent text-center font-bold border-b border-stone-400 focus:outline-none" placeholder="0" />
                  <span className="text-stone-400">/</span>
                  <input className="w-8 bg-transparent text-center font-bold border-b border-stone-400 focus:outline-none" placeholder="0" />
               </div>
            )}
         </div>

         {/* Spell List Grid - Compact Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {spellNames.map((name: string, idx: number) => {
               const spellData = SPELL_DB.find(s => s.name === name && s.level === levelConfig.levelNum);
               const displaySpell: SpellItem = spellData || {
                  id: `custom-${idx}`, name: name, level: levelConfig.levelNum, school: "自定",
                  castingTime: "-", range: "-", components: "-", duration: "-", source: "第三方/原创",
                  description: "未在数据库中找到详细信息。"
               };

               return (
                  <SpellListCard
                     key={`${levelConfig.key}-${idx}`}
                     spell={displaySpell}
                     onClick={() => onViewSpell(displaySpell)}
                     showDelete={() => onRemoveSpell(levelConfig.key, name)}
                  />
               );
            })}

            {/* Add Button - Compact */}
            <button
               onClick={() => onOpenPicker(levelConfig.key, levelConfig.levelNum, levelConfig.label)}
               className="h-[76px] border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center gap-2 hover:border-dndRed hover:bg-red-50 transition-colors group"
            >
               <Plus className="w-5 h-5 text-stone-400 group-hover:text-dndRed" />
               <span className="font-bold text-stone-400 group-hover:text-dndRed">添加法术</span>
            </button>
         </div>
      </div>
   );
};

// --- Main Spellbook Manager Component ---
const SpellbookManager: React.FC<Props> = ({ characters, activeCharId, setActiveCharId, updateCharacter }) => {
   const [pickerOpen, setPickerOpen] = useState(false);
   const [detailOpen, setDetailOpen] = useState(false);
   const [showRules, setShowRules] = useState(true);
   const [activeLevelKey, setActiveLevelKey] = useState<string | null>(null);
   const [activeLevelNum, setActiveLevelNum] = useState<number>(0);
   const [activeLevelLabel, setActiveLevelLabel] = useState<string>('');

   const [viewingSpell, setViewingSpell] = useState<SpellItem | null>(null);

   // Get active character or first one
   const character = characters.find(c => c.id === activeCharId) || null;

   // Helpers specific to current character
   const calculateDC = (char: CharacterData) => {
      let mod = 0;
      if (char.spellcastingAbility === '力量') mod = Math.floor((char.abilities.strength - 10) / 2);
      if (char.spellcastingAbility === '敏捷') mod = Math.floor((char.abilities.dexterity - 10) / 2);
      if (char.spellcastingAbility === '体质') mod = Math.floor((char.abilities.constitution - 10) / 2);
      if (char.spellcastingAbility === '智力') mod = Math.floor((char.abilities.intelligence - 10) / 2);
      if (char.spellcastingAbility === '感知') mod = Math.floor((char.abilities.wisdom - 10) / 2);
      if (char.spellcastingAbility === '魅力') mod = Math.floor((char.abilities.charisma - 10) / 2);
      const prof = Math.ceil(char.level / 4) + 1;
      return 8 + mod + prof;
   };

   const calculateAttack = (char: CharacterData) => {
      let mod = 0;
      if (char.spellcastingAbility === '力量') mod = Math.floor((char.abilities.strength - 10) / 2);
      if (char.spellcastingAbility === '敏捷') mod = Math.floor((char.abilities.dexterity - 10) / 2);
      if (char.spellcastingAbility === '体质') mod = Math.floor((char.abilities.constitution - 10) / 2);
      if (char.spellcastingAbility === '智力') mod = Math.floor((char.abilities.intelligence - 10) / 2);
      if (char.spellcastingAbility === '感知') mod = Math.floor((char.abilities.wisdom - 10) / 2);
      if (char.spellcastingAbility === '魅力') mod = Math.floor((char.abilities.charisma - 10) / 2);
      const prof = Math.ceil(char.level / 4) + 1;
      return mod + prof;
   };

   const openPicker = (levelKey: string, levelNum: number, label: string) => {
      setActiveLevelKey(levelKey);
      setActiveLevelNum(levelNum);
      setActiveLevelLabel(label);
      setPickerOpen(true);
   };

   const openDetail = (spell: SpellItem) => {
      setViewingSpell(spell);
      setDetailOpen(true);
   };

   const addSpell = (spell: SpellItem) => {
      if (!activeLevelKey || !character) return;
      const currentText = character.spells[activeLevelKey as keyof typeof character.spells] || '';
      const separator = currentText.length > 0 ? (currentText.endsWith('\n') ? '' : '\n') : '';
      const newEntry = `${separator}• ${spell.name}`;

      updateCharacter(character.id, {
         spells: { ...character.spells, [activeLevelKey]: currentText + newEntry }
      });
      setPickerOpen(false);
   };

   const removeSpell = (levelKey: string, spellName: string) => {
      if (!character) return;
      const currentText = character.spells[levelKey as keyof typeof character.spells] || '';
      const lines = currentText.split('\n');
      const newLines = lines.filter(line => !line.includes(spellName));
      updateCharacter(character.id, {
         spells: { ...character.spells, [levelKey]: newLines.join('\n') }
      });
   };



   const SPELL_LEVELS = [
      { key: 'cantrips', label: '戏法 (0环)', slot: false, levelNum: 0 },
      { key: 'level1', label: '1环法术', slot: true, levelNum: 1 },
      { key: 'level2', label: '2环法术', slot: true, levelNum: 2 },
      { key: 'level3', label: '3环法术', slot: true, levelNum: 3 },
      { key: 'level4', label: '4环法术', slot: true, levelNum: 4 },
      { key: 'level5', label: '5环法术', slot: true, levelNum: 5 },
      { key: 'level6', label: '6环法术', slot: true, levelNum: 6 },
      { key: 'level7', label: '7环法术', slot: true, levelNum: 7 },
      { key: 'level8', label: '8环法术', slot: true, levelNum: 8 },
      { key: 'level9', label: '9环法术', slot: true, levelNum: 9 },
   ];

   if (!character) {
      return (
         <div className="p-8 pb-20 bg-stone-100 min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center">
            <Book className="w-16 h-16 text-stone-300 mb-4" />
            <h2 className="text-xl font-bold text-stone-500">无法术书数据</h2>
            <p className="text-stone-400 mt-2">请先在“角色卡”中创建一名角色。</p>
         </div>
      );
   }

   return (
      <div className="p-8 pb-20 bg-stone-100 min-h-screen max-w-7xl mx-auto">
         {/* Header & Character Selector */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b-2 border-dndRed pb-4 gap-4">
            <div>
               <h2 className="text-4xl font-bold text-dndRed mb-2 flex items-center gap-3">
                  <Book className="w-10 h-10" /> 法术书
               </h2>
               <p className="text-stone-500">管理已知与准备法术。关联职业特性。</p>
            </div>

            <div className="relative group min-w-[250px]">
               <label className="block text-xs font-bold text-stone-400 uppercase mb-1">当前关联角色</label>
               <div className="relative">
                  <select
                     value={activeCharId || ""}
                     onChange={(e) => setActiveCharId(e.target.value)}
                     className="w-full p-3 pl-10 pr-10 bg-white border-2 border-stone-300 rounded-lg shadow-sm appearance-none font-bold text-stone-800 focus:outline-none focus:border-dndRed focus:ring-1 focus:ring-dndRed cursor-pointer"
                  >
                     {characters.map(c => (
                        <option key={c.id} value={c.id}>
                           {c.name || "未命名"} ({c.className} Lv.{c.level})
                        </option>
                     ))}
                  </select>
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
               </div>
            </div>
         </div>

         {/* Top Stats Bar */}
         <div className="bg-white rounded-lg shadow-sm border border-stone-300 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in" key={character.id}>
            <div className="flex flex-col items-center flex-grow">
               <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">施法关键属性</span>
               <select
                  value={character.spellcastingAbility}
                  onChange={(e) => updateCharacter(character.id, { spellcastingAbility: e.target.value })}
                  className="text-xl font-bold text-stone-800 bg-transparent border-b border-stone-300 focus:border-dndRed focus:outline-none text-center hover:bg-stone-50 cursor-pointer"
               >
                  <option value="力量">力量 (STR)</option>
                  <option value="敏捷">敏捷 (DEX)</option>
                  <option value="体质">体质 (CON)</option>
                  <option value="智力">智力 (INT)</option>
                  <option value="感知">感知 (WIS)</option>
                  <option value="魅力">魅力 (CHA)</option>
               </select>
            </div>
            <div className="h-10 w-px bg-stone-200 hidden md:block"></div>
            <div className="flex flex-col items-center flex-grow">
               <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">法术豁免 DC</span>
               <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-stone-400" />
                  <span className="text-3xl font-black text-dndRed">{calculateDC(character)}</span>
               </div>
            </div>
            <div className="h-10 w-px bg-stone-200 hidden md:block"></div>
            <div className="flex flex-col items-center flex-grow">
               <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">法术攻击加值</span>
               <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-stone-400" />
                  <span className="text-3xl font-black text-dndRed">+{calculateAttack(character)}</span>
               </div>
            </div>
         </div>

         {/* Rules Section */}
         <div className="mb-8 rounded-lg overflow-hidden border border-blue-200 shadow-sm animate-fade-in">
            <div
               onClick={() => setShowRules(!showRules)}
               className="bg-blue-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors"
            >
               <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Info className="w-5 h-5" /> 施法与准备规则 (D&D 2024)
               </div>
               <span className="text-xs text-blue-600 font-bold">{showRules ? "收起" : "展开"}</span>
            </div>

            {showRules && (
               <div className="bg-white p-6 text-sm text-stone-700 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <h4 className="font-bold text-stone-900 mb-2">获得法术 (Gaining Spells)</h4>
                        <p className="leading-relaxed text-stone-600">
                           要想施展一道法术，你必须在自己的意识里准备了它，或是使用一件能令你使出该法术的魔法物品（如法术卷轴）。
                           你的职业特性决定了你能使用哪些法术、是否始终准备着某些特定法术、以及是否可以更改你准备的法术列表。
                        </p>
                     </div>
                     <div>
                        <h4 className="font-bold text-stone-900 mb-2">着甲施法 (Casting in Armor)</h4>
                        <p className="leading-relaxed text-stone-600">
                           当你在着装护甲期间施展法术时，你必须具备该种护甲的受训，否则你将因护甲的妨碍而无法施展法术。
                        </p>
                     </div>
                  </div>

                  <div className="border-t border-stone-200 pt-4 mt-4">
                     <h4 className="font-bold text-stone-900 mb-3">准备法术规则 (Preparing Spells)</h4>
                     <div className="bg-stone-50 rounded border border-stone-200 overflow-hidden">
                        <table className="w-full text-left">
                           <thead className="bg-stone-100 text-stone-500 text-xs uppercase">
                              <tr>
                                 <th className="p-3">职业</th>
                                 <th className="p-3">何时可更改</th>
                                 <th className="p-3">单次更换数量</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-stone-200">
                              {Object.entries(PREPARATION_RULES).map(([cls, rule]) => (
                                 <tr key={cls} className={character.className === cls ? "bg-yellow-50" : ""}>
                                    <td className="p-3 font-bold flex items-center gap-2">
                                       {cls}
                                       {character.className === cls && <span className="text-[10px] bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded">当前</span>}
                                    </td>
                                    <td className="p-3">{rule.when}</td>
                                    <td className="p-3">{rule.qty}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <p className="mt-3 text-xs text-stone-500 italic">
                        * 始终准备的法术 (Always-Prepared Spells): 某些特性（如子职或种族特性）会给予你始终准备的法术，这些法术不计入你的准备法术列表数目限制。
                     </p>
                  </div>
               </div>
            )}
         </div>

         {/* Spells List */}
         <div className="space-y-10 animate-fade-in" key={character.id + '-list'}>
            {SPELL_LEVELS.map((lvl) => (
               <SpellLevelSection
                  key={lvl.key}
                  levelConfig={lvl}
                  character={character}
                  onOpenPicker={openPicker}
                  onRemoveSpell={removeSpell}
                  onViewSpell={openDetail}
               />
            ))}
         </div>

         {/* Modals */}
         {pickerOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border-2 border-stone-800">
                  <div className="p-4 border-b-2 border-stone-200 flex justify-between items-center bg-stone-100">
                     <h3 className="font-black text-2xl text-dndRed flex items-center gap-2">
                        <BookOpen className="w-6 h-6" /> 选择{activeLevelLabel}
                     </h3>
                     <button onClick={() => setPickerOpen(false)} className="p-2 hover:bg-stone-200 rounded-full text-stone-600 transition-colors">
                        <X className="w-6 h-6" />
                     </button>
                  </div>
                  <SpellPicker
                     level={activeLevelNum}
                     onSelect={addSpell}
                     characterClass={character?.className}
                     showAllToggle={
                        character?.className === '吟游诗人' && (
                           character.level >= 10 ||
                           (character.subclass === '逸闻学院' && character.level >= 6)
                        )
                     }
                  />
               </div>
            </div>
         )}

         {detailOpen && viewingSpell && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-y-auto border-2 border-stone-800">
                  <div className="sticky top-0 bg-white border-b border-stone-200 p-2 flex justify-end z-10">
                     <button onClick={() => setDetailOpen(false)} className="p-2 hover:bg-stone-200 rounded-full text-stone-500">
                        <X className="w-6 h-6" />
                     </button>
                  </div>
                  <div className="p-6 pt-0">
                     <SpellDetailView item={viewingSpell} />
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default SpellbookManager;
