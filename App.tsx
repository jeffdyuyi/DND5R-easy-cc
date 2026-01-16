
import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { CharacterSheet } from './components/CharacterSheet';
import { LibraryManager } from './components/LibraryManager';
import { CardLibrary } from './components/CardLibrary'; 
import CharacterWizard from './components/CharacterWizard'; // Import Wizard
import { CharacterData, ClassItem, SpeciesItem, BackgroundItem, SpellItem, FeatItem, ItemItem, SubclassItem, BaseLibraryItem } from './types';
import { 
  CLASS_DB, SPECIES_DB, BACKGROUND_DB, SPELL_DB, FEAT_DB, SUBCLASS_DB,
  WEAPON_DB, ARMOR_DB, TOOL_DB, GEAR_DB, MAGIC_ITEM_DB 
} from './data';
import { 
  ClassDetailView, SpeciesDetailView, BackgroundDetailView, 
  SubclassDetailView, SpellDetailView, FeatDetailView, ItemDetailView 
} from './components/LibraryDetails';
import { ClassEditor, SubclassEditor, RichDescriptionEditor, BackgroundEditor, SpellEditor, ToolEditor } from './components/LibraryEditors';
import SpellbookManager from './components/TabSpells';
import { FileUp, FileDown, Shield, Users, Feather, Menu } from 'lucide-react';
import { validateCharacterData } from './utils/rules';

// Default Character State
const INITIAL_CHARACTER: CharacterData = {
  id: 'char-1',
  name: '未命名角色',
  playerName: '',
  level: 1,
  className: '',
  subclass: '',
  race: '',
  subRace: '',
  background: '',
  alignment: '绝对中立',
  
  // Extended Details
  pronouns: '',
  faith: '',
  lifestyle: '',
  
  // Physical Characteristics
  gender: '',
  age: '',
  height: '',
  weight: '',
  hair: '',
  skin: '',
  eyes: '',
  appearance: '',

  originFeat: '',
  languages: '通用语',
  toolProficiencies: '',
  abilities: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
  abilityBonuses: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
  backgroundBonuses: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
  skillMastery: {},
  featSelections: {}, 
  hpMax: 10,
  currentHp: 10,
  tempHp: 0,
  hitDiceCurrent: 1,
  personalityTraits: '',
  ideals: '',
  bonds: '',
  flaws: '',
  backstory: '',
  
  // Notes & Relations
  organizations: '',
  allies: '',
  enemies: '',
  otherNotes: '',

  copper: 0, silver: 0, gold: 0, platinum: 0,
  equipment: '',
  treasure: '',
  inventoryWeapons: [],
  inventoryArmor: [],
  inventoryGear: [],
  tools: [], 
  experience: 0,
  notes: '',
  spellcastingAbility: '智力',
  spellSaveDC: 10,
  spellAttackBonus: 2,
  spells: {
    cantrips: '', level1: '', level2: '', level3: '', level4: '', level5: '', level6: '', level7: '', level8: '', level9: ''
  },
  spellSlots: {
    level1: { total: 0, used: 0 },
    level2: { total: 0, used: 0 },
    level3: { total: 0, used: 0 },
    level4: { total: 0, used: 0 },
    level5: { total: 0, used: 0 },
    level6: { total: 0, used: 0 },
    level7: { total: 0, used: 0 },
    level8: { total: 0, used: 0 },
    level9: { total: 0, used: 0 },
  }
};

const MAGIC_SCHOOLS = [
  { name: 'all', label: '所有学派' },
  { name: '防护', label: '防护 (Abjuration)' },
  { name: '咒法', label: '咒法 (Conjuration)' },
  { name: '预言', label: '预言 (Divination)' },
  { name: '惑控', label: '惑控 (Enchantment)' },
  { name: '塑能', label: '塑能 (Evocation)' },
  { name: '幻术', label: '幻术 (Illusion)' },
  { name: '死灵', label: '死灵 (Necromancy)' },
  { name: '变化', label: '变化 (Transmutation)' },
];

// --- Shared Compact Card Component ---
const CompactCard = ({ 
  title, 
  subtitle, 
  tags, 
  meta, 
  actions,
  isSelected, 
  onClick,
  titleColor = "text-stone-800",
  bgColor = "bg-white"
}: any) => (
  <div 
    onClick={onClick}
    className={`
      flex flex-col justify-between h-full min-h-[140px] p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md relative group
      ${isSelected ? 'border-dndRed ring-1 ring-dndRed bg-red-50/30' : `border-stone-200 hover:border-dndRed/50 ${bgColor}`}
    `}
  >
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
       {actions}
    </div>
    
    <div>
      <div className="flex flex-col gap-0.5 mb-2 pr-6">
         <h4 className={`font-black text-base leading-tight ${titleColor} line-clamp-2`}>{title}</h4>
         {subtitle && <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">{subtitle}</div>}
      </div>
      
      {meta && (
         <div className="text-xs text-stone-600 space-y-1 my-2 font-mono">
            {meta}
         </div>
      )}
    </div>
    
    {tags && tags.length > 0 && (
       <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap gap-1">
          {tags.map((t: string) => (
             <span key={t} className="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded font-bold border border-stone-200 truncate max-w-full">
                {t}
             </span>
          ))}
       </div>
    )}
  </div>
);

// --- Welcome/Disclaimer Screen ---
const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4 font-serif">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl overflow-hidden border-4 border-stone-600 relative">
        {/* Decorative Header */}
        <div className="bg-dndRed p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm">
              <Feather className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-wide">不咕鸟 DND5R</h1>
            <p className="text-red-100 text-sm font-bold uppercase tracking-widest mt-1">角色构建工具</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-4 text-stone-700">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-dndRed flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-stone-900 mb-1">免责声明</h3>
                <p className="text-sm leading-relaxed text-justify">
                  本工具由 <strong>不咕鸟（基德）</strong> 开发。内容基于 <strong>DND不全书 (5echm)</strong> 及 D&D 5E (2024) 规则，辅以 AI 技术制作。
                  <br/><br/>
                  本工具仅供 <strong>个人及亲友团</strong> 快速建卡与跑团交流使用，<span className="text-dndRed font-bold">严禁用于任何商业用途</span>。
                  本工具与威世智（Wizards of the Coast）无官方关联，所有官方规则版权归原作者所有。
                </p>
              </div>
            </div>

            <div className="h-px bg-stone-200 w-full"></div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-stone-900 mb-1">寻找组织</h3>
                <p className="text-sm text-stone-600">
                  欢迎加入成都本地线下面团企业群，寻找你的冒险伙伴！
                </p>
                <div className="mt-2 bg-stone-100 p-2 rounded text-center border border-stone-200 font-mono font-bold text-stone-800 select-all">
                  QQ群: 691707475
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={onEnter}
              className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-4 rounded-lg shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>我已了解，开始建卡</span>
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-3">
              点击上方按钮即代表您同意本工具仅用于非商业学习用途。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeModule, setActiveModule] = useState('sheet');
  const [isWizardActive, setIsWizardActive] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  
  // --- Multi-Character State (With Persistence) ---
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [activeCharId, setActiveCharId] = useState<string | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedChars = localStorage.getItem('dnd_characters_v1');
      if (savedChars) {
        const parsed = JSON.parse(savedChars);
        if (Array.isArray(parsed)) {
          setCharacters(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load characters from local storage", e);
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem('dnd_characters_v1', JSON.stringify(characters));
    }
  }, [characters]);

  // --- Spell Filtering State ---
  const [spellFilterLevel, setSpellFilterLevel] = useState<string>('all');
  const [spellFilterSchool, setSpellFilterSchool] = useState<string>('all');
  const [spellFilterClass, setSpellFilterClass] = useState<string>('all');

  // --- Feat Filtering State ---
  const [featCategoryFilter, setFeatCategoryFilter] = useState<string>('all');

  // --- Tool Filtering State ---
  const [toolCategoryFilter, setToolCategoryFilter] = useState<string>('all');

  // --- Gear Filtering State ---
  const [gearCategoryFilter, setGearCategoryFilter] = useState<string>('all');

  // --- Magic Item Filtering State ---
  const [magicTypeFilter, setMagicTypeFilter] = useState<string>('all');
  const [magicRarityFilter, setMagicRarityFilter] = useState<string>('all');

  // --- Global Library State ---
  const [classes, setClasses] = useState<ClassItem[]>(CLASS_DB);
  const [subclasses, setSubclasses] = useState<SubclassItem[]>(SUBCLASS_DB);
  const [species, setSpecies] = useState<SpeciesItem[]>(SPECIES_DB);
  const [backgrounds, setBackgrounds] = useState<BackgroundItem[]>(BACKGROUND_DB);
  const [spells, setSpells] = useState<SpellItem[]>(SPELL_DB);
  const [feats, setFeats] = useState<FeatItem[]>(FEAT_DB);
  
  // Item States
  const [weapons, setWeapons] = useState<ItemItem[]>(WEAPON_DB);
  const [armors, setArmors] = useState<ItemItem[]>(ARMOR_DB);
  const [tools, setTools] = useState<ItemItem[]>(TOOL_DB);
  const [gears, setGears] = useState<ItemItem[]>(GEAR_DB);
  const [magicItems, setMagicItems] = useState<ItemItem[]>(MAGIC_ITEM_DB);

  // --- CRUD Helpers for Libraries ---
  const createLibraryHandler = <T extends { id: string }>(
    _state: T[], // Prefix with _ to unused variable
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => ({
    onAdd: (item: T) => setState(prev => [...prev, item]),
    onUpdate: (item: T) => setState(prev => prev.map(i => i.id === item.id ? item : i)),
    onDelete: (id: string) => setState(prev => prev.filter(i => i.id !== id)),
    onImport: (newItems: T[]) => setState(prev => {
        const existingIds = new Set(prev.map(i => i.id));
        const toAdd = newItems.filter(i => !existingIds.has(i.id));
        return [...prev, ...toAdd];
    })
  });

  const classHandler = createLibraryHandler(classes, setClasses);
  const subclassHandler = createLibraryHandler(subclasses, setSubclasses);
  const speciesHandler = createLibraryHandler(species, setSpecies);
  const bgHandler = createLibraryHandler(backgrounds, setBackgrounds);
  const spellHandler = createLibraryHandler(spells, setSpells);
  const featHandler = createLibraryHandler(feats, setFeats);
  
  const weaponHandler = createLibraryHandler(weapons, setWeapons);
  const armorHandler = createLibraryHandler(armors, setArmors);
  const toolHandler = createLibraryHandler(tools, setTools);
  const gearHandler = createLibraryHandler(gears, setGears);
  const magicHandler = createLibraryHandler(magicItems, setMagicItems);

  // --- Character CRUD Helpers ---
  const updateCharacter = (id: string, updates: Partial<CharacterData>) => {
    setCharacters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const createCharacter = () => {
    const newId = `char-${Date.now()}`;
    const newChar: CharacterData = { ...INITIAL_CHARACTER, id: newId, name: '新角色' };
    setCharacters(prev => [...prev, newChar]);
    setActiveCharId(newId);
    setIsWizardActive(true); // Launch Wizard immediately
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
           // Import multiple characters
           const newChars = json.filter(c => validateCharacterData(c)); 
           if (newChars.length === 0) {
             alert("文件中没有有效的角色数据");
             return;
           }
           // Avoid dupes by ID
           setCharacters(prev => {
              const ids = new Set(prev.map(c => c.id));
              return [...prev, ...newChars.filter(c => !ids.has(c.id))];
           });
           alert(`已导入 ${newChars.length} 个角色`);
        } else if (validateCharacterData(json)) {
           // Import single character
           const newChar = { ...json, id: `char-${Date.now()}` };
           setCharacters(prev => [...prev, newChar]);
           setActiveCharId(newChar.id);
        } else {
           alert("无效的角色数据文件，或数据结构已损坏");
        }
      } catch (err) {
        alert("导入失败：文件格式错误");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCharacters = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characters, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `dnd_characters_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const deleteCharacter = (id: string) => {
    if(window.confirm("确定要删除这个角色吗？")) {
      setCharacters(prev => prev.filter(c => c.id !== id));
      if (activeCharId === id) setActiveCharId(null);
    }
  };

  // Convert CharacterData to BaseLibraryItem for CardLibrary display
  const characterListItems: BaseLibraryItem[] = useMemo(() => characters.map(c => ({
    id: c.id,
    name: c.name || "未命名角色",
    description: `Lv.${c.level} ${c.race} ${c.className}`,
    source: '第三方/原创',
    tags: [c.className, c.race]
  })), [characters]);

  // --- Spell Filtering Logic (Memoized) ---
  const filteredSpells = useMemo(() => spells.filter(s => {
    const matchLevel = spellFilterLevel === 'all' ? true : s.level === parseInt(spellFilterLevel);
    const matchSchool = spellFilterSchool === 'all' ? true : s.school === spellFilterSchool;
    const matchClass = spellFilterClass === 'all' ? true : (s.classes && s.classes.includes(spellFilterClass));
    return matchLevel && matchSchool && matchClass;
  }), [spells, spellFilterLevel, spellFilterSchool, spellFilterClass]);

  // --- Feat Filtering Logic (Memoized) ---
  const filteredFeats = useMemo(() => feats.filter(f => {
    if (featCategoryFilter === 'all') return true;
    return f.category === featCategoryFilter;
  }), [feats, featCategoryFilter]);

  // --- Tool Filtering Logic (Memoized) ---
  const filteredTools = useMemo(() => tools.filter(t => {
    if (toolCategoryFilter === 'all') return true;
    return t.tags?.includes(toolCategoryFilter);
  }), [tools, toolCategoryFilter]);

  // --- Gear Filtering Logic (Memoized) ---
  const filteredGears = useMemo(() => gears.filter(g => {
    if (gearCategoryFilter === 'all') return true;
    return g.tags?.includes(gearCategoryFilter);
  }), [gears, gearCategoryFilter]);

  // --- Magic Item Filtering Logic (Memoized) ---
  const filteredMagicItems = useMemo(() => magicItems.filter(m => {
    const matchType = magicTypeFilter === 'all' ? true : m.type === magicTypeFilter;
    const matchRarity = magicRarityFilter === 'all' ? true : m.rarity === magicRarityFilter;
    return matchType && matchRarity;
  }), [magicItems, magicTypeFilter, magicRarityFilter]);

  // --- Spell Filter UI ---
  const SpellFilters = (
    <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
      <select 
        value={spellFilterLevel} 
        onChange={e => setSpellFilterLevel(e.target.value)}
        className="p-2 border border-stone-300 rounded text-sm bg-white"
      >
        <option value="all">所有环阶</option>
        <option value="0">0环 (戏法)</option>
        {[1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l}>{l}环</option>)}
      </select>

      <select 
        value={spellFilterSchool} 
        onChange={e => setSpellFilterSchool(e.target.value)}
        className="p-2 border border-stone-300 rounded text-sm bg-white"
      >
        {MAGIC_SCHOOLS.map(s => <option key={s.name} value={s.name}>{s.label}</option>)}
      </select>

      <select 
        value={spellFilterClass} 
        onChange={e => setSpellFilterClass(e.target.value)}
        className="p-2 border border-stone-300 rounded text-sm bg-white"
      >
        <option value="all">所有职业</option>
        {CLASS_DB.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
      </select>
    </div>
  );

  // --- Feat Filter UI ---
  const FeatFilters = (
    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
      {['all', '起源专长', '通用专长', '战斗风格专长', '传奇恩惠专长'].map(cat => (
        <button
          key={cat}
          onClick={() => setFeatCategoryFilter(cat)}
          className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
            featCategoryFilter === cat 
            ? 'bg-dndRed text-white border-dndRed' 
            : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
          }`}
        >
          {cat === 'all' ? '全部' : cat.replace('专长', '')}
        </button>
      ))}
    </div>
  );

  // --- Tool Filter UI ---
  const ToolFilters = (
    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
      {['all', '工匠工具', '其他工具'].map(cat => (
        <button
          key={cat}
          onClick={() => setToolCategoryFilter(cat)}
          className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
            toolCategoryFilter === cat 
            ? 'bg-dndRed text-white border-dndRed' 
            : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
          }`}
        >
          {cat === 'all' ? '全部' : cat}
        </button>
      ))}
    </div>
  );

  // --- Gear Filter UI ---
  const GearFilters = (
    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
      {['all', '冒险道具', '容器', '弹药', '套组', '坐骑', '载具', '奥术法器', '德鲁伊法器', '圣徽'].map(cat => (
        <button
          key={cat}
          onClick={() => setGearCategoryFilter(cat)}
          className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
            gearCategoryFilter === cat 
            ? 'bg-dndRed text-white border-dndRed' 
            : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
          }`}
        >
          {cat === 'all' ? '全部' : cat}
        </button>
      ))}
    </div>
  );

  // --- Magic Item Filter UI ---
  const MagicFilters = (
    <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
      <select 
        value={magicTypeFilter} 
        onChange={e => setMagicTypeFilter(e.target.value)}
        className="p-2 border border-stone-300 rounded text-sm bg-white"
      >
        <option value="all">所有类别</option>
        {['护甲', '药水', '戒指', '权杖', '卷轴', '法杖', '魔杖', '武器', '奇物'].map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select 
        value={magicRarityFilter} 
        onChange={e => setMagicRarityFilter(e.target.value)}
        className="p-2 border border-stone-300 rounded text-sm bg-white"
      >
        <option value="all">所有稀有度</option>
        {['普通', '非普通', '珍稀', '极珍稀', '传说', '神器'].map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );

  // --- RENDER BLOCK ---

  if (!hasEntered) {
    return <WelcomeScreen onEnter={() => setHasEntered(true)} />;
  }

  // --- Wizard Logic ---
  if (isWizardActive && activeCharId) {
    const char = characters.find(c => c.id === activeCharId);
    if (char) {
      return (
        <CharacterWizard 
          character={char} 
          updateCharacter={(updates) => updateCharacter(char.id, updates)} 
          onComplete={() => setIsWizardActive(false)} 
        />
      );
    }
  }

  // --- Render Router ---
  const renderContent = () => {
    switch (activeModule) {
      case 'sheet':
        if (activeCharId) {
          const char = characters.find(c => c.id === activeCharId);
          if (char) {
            return (
              <CharacterSheet 
                character={char} 
                updateCharacter={(updates) => updateCharacter(char.id, updates)}
                onBack={() => setActiveCharId(null)}
                libraryClasses={classes}
                librarySubclasses={subclasses}
                librarySpecies={species}
                libraryBackgrounds={backgrounds}
                libraryFeats={feats}
                libraryTools={[...tools, ...weapons, ...armors, ...gears, ...magicItems]}
              />
            );
          } else {
            setActiveCharId(null); // Fallback if ID invalid
          }
        }
        return (
          <div className="p-8 pb-20 max-w-7xl mx-auto">
            <div className="mb-8 border-b-2 border-stone-300 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-4xl font-bold text-stone-800 mb-2">角色卡库</h2>
                <p className="text-stone-500">创建新角色或点击卡片管理已有角色。</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={handleExportCharacters} className="bg-stone-100 text-stone-700 px-4 py-3 rounded-lg font-bold shadow-sm border border-stone-300 hover:bg-stone-200 transition-colors flex items-center gap-2 text-sm">
                  <FileDown className="w-5 h-5"/>
                  全部导出
                </button>
                <label className="bg-stone-200 text-stone-700 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-stone-300 transition-colors cursor-pointer flex items-center gap-2 text-sm">
                  <FileUp className="w-5 h-5"/>
                  导入离线存档
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
              </div>
            </div>
            <CardLibrary<BaseLibraryItem>
              title="我的角色"
              items={characterListItems}
              itemTypeLabel="角色"
              onSelect={(item) => setActiveCharId(item.id)}
              onCreateAction={createCharacter} // Using direct action for Wizard
              onDelete={deleteCharacter}
              allowEdit={true}
              onEdit={(item) => setActiveCharId(item.id)}
              cardColorTheme="stone"
            />
          </div>
        );

      case 'spellbook':
        // If no char selected, try to pick first or none
        const currentSpellCharId = activeCharId || (characters.length > 0 ? characters[0].id : null);
        
        return (
          <SpellbookManager 
            characters={characters}
            activeCharId={currentSpellCharId}
            setActiveCharId={setActiveCharId}
            updateCharacter={updateCharacter}
          />
        );

      case 'lib-class':
        return (
          <LibraryManager<ClassItem> 
            key="lib-class"
            title="职业库" itemLabel="职业" items={classes} {...classHandler}
            cardColorTheme="red"
            renderDetail={(item) => <ClassDetailView item={item} />}
            renderEditFields={(item, setItem) => <ClassEditor item={item} setItem={setItem} />}
            emptyTemplate={{ 
               id: '', name: '', source: '第三方/原创', description: '', 
               hitDie: 'd8', primaryAbility: '力量', saves: [], tags: [], 
               coreTraits: {
                 primaryAbility: '待定', hitPointDie: 'd8', savingThrows: '待定',
                 skillProficiencies: '待定', weaponProficiencies: '待定', armorTraining: '待定',
                 startingEquipment: { optionA: '', optionB: '' }
               }, 
               features: [], subclasses: [], subclassLevel: 3 
            }}
          />
        );
      case 'lib-subclass':
        return (
          <LibraryManager<SubclassItem> 
            key="lib-subclass"
            title="子职业库" itemLabel="子职业" items={subclasses} {...subclassHandler}
            cardColorTheme="orange"
            renderDetail={(item) => <SubclassDetailView item={item} />}
            renderEditFields={(item, setItem) => <SubclassEditor item={item} setItem={setItem} classes={classes} />}
            emptyTemplate={{ 
               id: '', name: '', source: '第三方/原创', description: '', 
               parentClass: classes[0]?.name || '', features: []
            }}
          />
        );
      case 'lib-species':
        return (
          <LibraryManager<SpeciesItem> 
            key="lib-species"
            title="种族库" itemLabel="种族" items={species} {...speciesHandler}
            cardColorTheme="green"
            renderDetail={(item) => <SpeciesDetailView item={item} />}
            renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
            emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', speed: 30, size: '中型', darkvision: false, traits: [] }}
          />
        );
      case 'lib-bg':
        return (
          <LibraryManager<BackgroundItem> 
            key="lib-bg"
            title="背景库" itemLabel="背景" items={backgrounds} {...bgHandler}
            cardColorTheme="yellow"
            renderDetail={(item) => <BackgroundDetailView item={item} libraryFeats={feats} />}
            renderEditFields={(item, setItem) => <BackgroundEditor item={item} setItem={setItem} feats={feats} />}
            emptyTemplate={{ 
              id: '', name: '', source: '第三方/原创', 
              description: '在此描述角色的过往经历...', 
              abilityScores: [], 
              feat: '', 
              skills: [], 
              tool: '', 
              equipment: ["价值50GP的装备组合"] 
            }}
          />
        );
      case 'lib-spell':
        return (
           <LibraryManager<SpellItem>
             key="lib-spell"
             title="法术库" itemLabel="法术" items={filteredSpells} {...spellHandler}
             extraTools={SpellFilters}
             layout="grid"
             renderItem={(item, isSelected, onClick, actions) => (
                <CompactCard 
                   title={item.name}
                   subtitle={`${item.level === 0 ? '戏法' : item.level+'环'} ${item.school}`}
                   tags={item.classes}
                   isSelected={isSelected}
                   onClick={onClick}
                   actions={actions}
                />
             )}
             renderDetail={(item) => <SpellDetailView item={item} />}
             renderEditFields={(item, setItem) => <SpellEditor item={item} setItem={setItem} />}
             emptyTemplate={{ 
                id: '', name: '', source: '第三方/原创', 
                description: '法术描述...', 
                level: 1, school: '塑能', castingTime: '1 动作', 
                range: '60 尺', components: 'V, S', duration: '立即', 
                tags: [], classes: []
             }}
           />
        );
      case 'lib-feat':
        return (
           <LibraryManager<FeatItem>
             key="lib-feat"
             title="专长库" itemLabel="专长" items={filteredFeats} {...featHandler}
             extraTools={FeatFilters}
             cardColorTheme="purple"
             renderDetail={(item) => <FeatDetailView item={item} />}
             renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
             emptyTemplate={{ id: '', name: '', source: '第三方/原创', category: '通用专长', description: '', benefits: [], tags: [] }}
           />
        );
      case 'lib-weapon':
        return (
           <LibraryManager<ItemItem>
             key="lib-weapon"
             title="武器库" itemLabel="武器" items={weapons} {...weaponHandler}
             layout="grid"
             renderItem={(item, isSelected, onClick, actions) => (
                <CompactCard 
                   title={item.name}
                   subtitle={item.type}
                   meta={
                      <div className="flex gap-2">
                         <span>{item.damage} {item.damageType}</span>
                         <span className="text-stone-400">|</span>
                         <span>{item.cost}</span>
                      </div>
                   }
                   tags={item.properties}
                   isSelected={isSelected}
                   onClick={onClick}
                   actions={actions}
                />
             )}
             renderDetail={(item) => <ItemDetailView item={item} />}
             renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
             emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '武器', cost: '10 GP', weight: '2 lb', tags: [] }}
           />
        );
      case 'lib-armor':
        return (
           <LibraryManager<ItemItem>
             key="lib-armor"
             title="护甲库" itemLabel="护甲" items={armors} {...armorHandler}
             layout="grid"
             renderItem={(item, isSelected, onClick, actions) => (
                <CompactCard 
                   title={item.name}
                   titleColor="text-stone-900" // Darker title as requested
                   subtitle={item.tags?.find(t => t.includes('甲') || t === '盾牌') || item.type}
                   meta={
                      <div className="flex justify-between items-center mt-2">
                         <div className="font-bold text-dndRed bg-stone-100 px-2 py-0.5 rounded">AC {item.ac?.split('+')[0].trim()}</div>
                         <div className="text-stone-500 font-normal">{item.cost}</div>
                      </div>
                   }
                   tags={[]} // No tags needed for armor preview usually, keeps it clean
                   isSelected={isSelected}
                   onClick={onClick}
                   actions={actions}
                   bgColor="bg-stone-50"
                />
             )}
             renderDetail={(item) => <ItemDetailView item={item} />}
             renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
             emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '护甲', cost: '50 GP', weight: '20 lb', tags: [] }}
           />
        );
      case 'lib-tool':
        return (
           <LibraryManager<ItemItem>
             key="lib-tool"
             title="工具库" itemLabel="工具" items={filteredTools} {...toolHandler}
             extraTools={ToolFilters}
             layout="grid"
             renderItem={(item, isSelected, onClick, actions) => (
                <CompactCard 
                   title={item.name}
                   subtitle={item.type}
                   meta={
                      <div className="flex gap-2 text-stone-500">
                         <span>{item.cost}</span>
                         <span>|</span>
                         <span>{item.weight}</span>
                      </div>
                   }
                   tags={item.tags?.filter(t => t!=='工匠工具' && t!=='其他工具')}
                   isSelected={isSelected}
                   onClick={onClick}
                   actions={actions}
                />
             )}
             renderDetail={(item) => <ItemDetailView item={item} />}
             renderEditFields={(item, setItem) => <ToolEditor item={item} setItem={setItem} />}
             emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '工具', cost: '1 GP', weight: '1 lb', tags: [] }}
           />
        );
      case 'lib-gear':
        return (
           <LibraryManager<ItemItem>
             key="lib-gear"
             title="冒险物品库" itemLabel="冒险物品" items={filteredGears} {...gearHandler}
             extraTools={GearFilters}
             layout="grid"
             renderItem={(item, isSelected, onClick, actions) => (
                <CompactCard 
                   title={item.name}
                   subtitle={item.type}
                   meta={
                      <div className="flex gap-2 text-stone-500">
                         <span>{item.cost}</span>
                         <span>|</span>
                         <span>{item.weight}</span>
                      </div>
                   }
                   tags={[]}
                   isSelected={isSelected}
                   onClick={onClick}
                   actions={actions}
                />
             )}
             renderDetail={(item) => <ItemDetailView item={item} />}
             renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
             emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '杂物', cost: '1 SP', weight: '1 lb', tags: [] }}
           />
        );
      case 'lib-magic':
        return (
           <LibraryManager<ItemItem>
             key="lib-magic"
             title="魔法物品库" itemLabel="魔法物品" items={filteredMagicItems} {...magicHandler}
             extraTools={MagicFilters}
             layout="grid"
             renderItem={(item, isSelected, onClick, actions) => {
                const rarityColor = {
                   '普通': 'text-stone-500', '非普通': 'text-green-600', '珍稀': 'text-blue-600', 
                   '极珍稀': 'text-purple-600', '传说': 'text-orange-500', '神器': 'text-yellow-600'
                }[item.rarity || '普通'];
                
                const requiresAttunement = item.attuned || item.description.includes('需同调');

                return (
                   <CompactCard 
                      title={item.name}
                      subtitle={item.type}
                      meta={
                         <div className={`font-bold ${rarityColor} mt-1`}>
                            {item.rarity}
                         </div>
                      }
                      tags={requiresAttunement ? ['需同调'] : []}
                      isSelected={isSelected}
                      onClick={onClick}
                      actions={actions}
                   />
                );
             }}
             renderDetail={(item) => <ItemDetailView item={item} />}
             renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
             emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '奇物', cost: '---', weight: '1 lb', tags: [], rarity: '普通' }}
           />
        );
      default:
        return <div className="p-8">开发中...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-100 font-serif">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-stone-900 text-white z-50 p-4 flex justify-between items-center shadow-md">
         <div className="flex items-center gap-2 font-bold">
            <Feather className="w-5 h-5 text-dndRed" />
            <span>不咕鸟DND5R</span>
         </div>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-6 h-6" />
         </button>
      </div>

      <Sidebar 
         activeModule={activeModule} 
         setActiveModule={(m) => { setActiveModule(m); setIsSidebarOpen(false); }} 
         isOpen={isSidebarOpen}
         onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-grow md:ml-64 pt-16 md:pt-0 overflow-y-auto min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
