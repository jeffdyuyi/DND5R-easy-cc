
export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Alignment =
  | '守序善良' | '中立善良' | '混乱善良'
  | '守序中立' | '绝对中立' | '混乱中立'
  | '守序邪恶' | '中立邪恶' | '混乱邪恶'
  | '';

// --- Database / Library Types ---

export type ContentSource =
  | '官方规则'
  | '第三方/原创'
  // PHB versions
  | "PHB'14" | "PHB'24" | "PHB"
  // Expansion books
  | 'XGE' | 'TCE' | 'FTD' | 'SCC' | 'AAG'
  // Setting books
  | 'GGR' | 'AI' | 'EGW' | 'MOT' | 'IDR'
  // Other official sources
  | 'DMG' | 'TCoE' | 'VGM' | 'SCAG' | 'EE'
  // Free rules
  | 'Free Basic Rules (2024)'
  | string; // Allow any other source as fallback

export interface BaseLibraryItem {
  id: string;
  name: string;
  description: string; // 简短描述，用于卡牌封面
  fullDescription?: string; // 详细描述
  source: ContentSource;
  tags?: string[]; // 例如：近战、施法者、小型体型
}

export interface SubSpeciesItem {
  name: string;
  desc: string; // Description for UI list
  traits?: string; // Short summary for UI
  grantedSpells?: { level: number; name: string; unlockLevel: number }[];
}

export type ChoiceType = 'skill' | 'tool' | 'language' | 'feat' | 'spell' | 'ability_score' | 'expertise';

export interface FeatureChoice {
  id: string;           // 唯一标识符，用于存储用户的选择结果 (例如 "elf-keen-senses")
  type: ChoiceType;     // 选择类型 (例如 "skill")
  count: number;        // 可选数量 (例如 1)
  options: string[];    // 预设选项列表 (例如 ["洞悉", "察觉", "求生"])。如果为 ["ANY"] 则代表全列表 (需要具体实现支持)。
  label?: string;       // UI 显示的提示文本 (例如 "选择一项技能熟练")
}

export interface SpeciesTrait {
  name: string;
  description: string;
  choices?: FeatureChoice[]; // 该特性提供的选择项
  grants?: {                 // 该特性固定给予的项
    skills?: string[];
    spells?: string[];
    vision?: string;        // e.g. "Darkvision", "Superior Darkvision"
  };
}

export interface SpeciesItem extends BaseLibraryItem {
  speed: number;
  size: string;
  darkvision: boolean;
  traits: SpeciesTrait[];
  subraces?: { // Grouping for UI
    label: string;
    options: SubSpeciesItem[];
  };
}

export interface BackgroundItem extends BaseLibraryItem {
  abilityScores: string[]; // 推荐属性
  feat: string; // 起源专长
  featSpellList?: '牧师' | '德鲁伊' | '法师'; // 魔法学徒锁定的法术列表
  skills: string[];
  tool: string;
  equipment: string[];
  choices?: FeatureChoice[]; // New: Modular choices for Custom Backgrounds
}

export interface ClassFeature {
  name: string;
  description: string;
  fullDescription?: string;
  level: number;
  grants?: {
    weaponProficiencies?: string[];
    armorProficiencies?: string[];
    skillProficiencies?: string[];
    toolProficiencies?: string[];
    savingThrows?: string[];
    preparedSpells?: string[];
    featureOptions?: {
      name: string;
      description: string;
      prerequisites?: string;
    }[];
  };
  choices?: FeatureChoice[]; // New: Modular choices for Features
}

export interface Subclass {
  name: string;
  description: string;
  fullDescription?: string;
  features: ClassFeature[];
}

export interface CoreTraits {
  primaryAbility: string;
  hitPointDie: string;
  savingThrows: string;
  skillProficiencies: string;
  weaponProficiencies: string;
  armorTraining: string;
  startingEquipment: {
    optionA: string;
    optionB: string;
  };
}

export interface ClassItem extends BaseLibraryItem {
  hitDie: string;
  primaryAbility: string;
  saves: string[];
  coreTraits: CoreTraits;
  features: ClassFeature[];
  subclasses: Subclass[];
  subclassLevel: number;
  classTable?: ClassTableData;
  spellList?: string; // 法术列表类别，如 "吟游诗人"、"法师"、"牧师"等，用于法术过滤
  choices?: FeatureChoice[]; // New: Modular choices for Class (e.g. Starting Skills)
}

export interface ClassTableData {
  title: string;
  columns: {
    header: string;
    key: string;
  }[];
  rows: {
    level: number;
    pb: string;
    features: string[];
    [key: string]: string | number | string[];
  }[];
}

// New Types for Libraries
export interface SubclassItem extends BaseLibraryItem {
  parentClass: string; // 关联的职业名称，例如 "野蛮人"
  features: ClassFeature[];
  spellList?: string; // 子职业特定法术列表
}

export interface SpellItem extends BaseLibraryItem {
  level: number;
  school: string; // 学派
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  classes?: string[]; // 适用职业
  higherLevel?: string; // 升环施法描述
}

export interface FeatItem extends BaseLibraryItem {
  category: string; // e.g., "起源专长", "通用专长", "战斗风格专长"
  prerequisite?: string;
  repeatable?: boolean; // Can be taken multiple times?
  benefits: string[];
}

export interface ItemItem extends BaseLibraryItem {
  type: '武器' | '护甲' | '药水' | '工具' | '奇物' | '杂物' | '魔法物品' | '弹药' | '法器' | '戒指' | '权杖' | '卷轴' | '法杖' | '魔杖';
  cost: string;
  weight: string;
  rarity?: string; // 魔法物品稀有度: 普通, 非普通, 珍稀, 极珍稀, 传说, 神器

  // 武器特定
  damage?: string;      // 例如 "1d8"
  damageType?: string;  // 例如 "挥砍"
  properties?: string[]; // 例如 ["灵巧", "轻型"]
  mastery?: string;     // 2024版武器精通，例如 "推离"

  // 护甲特定
  ac?: string;          // 例如 "11 + 敏捷修正"
  stealthDisadvantage?: boolean; // 隐匿劣势
  strengthRequirement?: number; // 力量需求

  // 工具特定 (Tools)
  toolAbility?: string; // 关键属性，如 "敏捷", "智力"
  toolUtilize?: { action: string; dc: string; description?: string }[]; // 操作动作列表
  toolCraft?: string[]; // 可制造物品列表
  toolVariants?: string[]; // 变体列表

  // 实例属性 (用于背包实例)
  quantity?: number;
  isEquipped?: boolean;
  attuned?: boolean; // 是否同调
}

// --- Character Sheet State ---

export interface CharacterData {
  id: string; // Unique Identifier for multiple characters

  // Core Identity
  name: string;
  playerName: string;
  level: number; // Class Level

  // References to library IDs or raw strings if custom
  className: string; // Class Name
  subclass: string;  // Subclass

  race: string;
  subRace: string;
  background: string;
  alignment: Alignment;

  // Extended Details (New)
  pronouns: string;      // 代词
  faith: string;         // 信仰
  lifestyle: string;     // 生活方式

  // Physical Characteristics (New)
  gender: string;        // 性别
  age: string;           // 年龄
  height: string;        // 身高
  weight: string;        // 体重
  hair: string;          // 发色/发型
  skin: string;          // 肤色
  eyes: string;          // 瞳色
  appearance: string;    // 综合外貌描述

  // Origin Details
  originFeat: string;
  languages: string;
  toolProficiencies: string; // Deprecated string field, kept for compatibility if needed

  // Stats
  abilities: AbilityScores; // Base stats (from roll/array)
  abilityBonuses: AbilityScores; // Racial/Background bonuses
  backgroundBonuses: AbilityScores; // Specifically tracking +2/+1 or +1/+1/+1 from background

  // Skills: key is skill name, value is multiplier (0, 1, 2)
  skillMastery: Record<string, number>;

  // Feats Selection (Key: "Level-FeatureName" -> Value: Feat Name)
  featSelections: Record<string, string>;

  hpMax: number;
  currentHp: number;
  tempHp: number;
  hitDiceCurrent: number;

  // Personality & Bio
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;

  // Notes & Relations (New)
  organizations: string; // 组织
  allies: string;        // 盟友
  enemies: string;       // 敌人
  otherNotes: string;    // 其他笔记

  // Inventory
  copper: number;
  silver: number;
  gold: number;
  platinum: number;
  equipment: string; // Legacy string field
  treasure: string;

  // Structured Inventory (New)
  inventoryWeapons: ItemItem[];
  inventoryArmor: ItemItem[];
  inventoryGear: ItemItem[]; // Includes gear, magic items, ammo, focuses

  // Tool Proficiencies List (Structured)
  tools: {
    id: string; // Library ID if available
    name: string;
    note: string; // For variants or specific notes
  }[];

  // Adventure
  experience: number;
  notes: string;

  // Spells
  spellcastingAbility: string;
  spellSaveDC: number;
  spellAttackBonus: number;
  spells: {
    cantrips: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
    level6: string;
    level7: string;
    level8: string;
    level9: string;
  };
  spellSlots: {
    level1: { total: number, used: number };
    level2: { total: number, used: number };
    level3: { total: number, used: number };
    level4: { total: number, used: number };
    level5: { total: number, used: number };
    level6: { total: number, used: number };
    level7: { total: number, used: number };
    level8: { total: number, used: number };
    level9: { total: number, used: number };
  };

  // === NEW: Structured Proficiency Tracking ===
  proficiencySources: {
    skills: {
      class: string[];      // Skills chosen from class options
      background: string[]; // Skills from background
      species: string[];    // Skills from species traits
      feat: string[];       // Skills from origin feat
    };
    tools: {
      class: string[];      // Tools from class
      background: string[]; // Tool from background
      species: string[];    // Tools from species
      feat: string[];       // Tools from feat
    };
  };

  // === NEW: Equipment Choices ===
  equipmentChoices: {
    classChoice: 'A' | 'B' | '';
    classSubChoices: Record<string, string>; // e.g., { "martial_weapon": "Longsword" }
    backgroundChoice: 'A' | 'B' | '';
    backgroundSubChoices: Record<string, string>;
  };
  startingInventory: { name: string; quantity: number; source: string }[];

  // === NEW: Feat Configuration ===
  featConfig: {
    originFeat: {
      name: string;
      spellList?: '牧师' | '德鲁伊' | '法师';  // Magic Initiate spell list
      spellcastingAbility?: 'intelligence' | 'wisdom' | 'charisma' | '';
      cantrips?: string[];      // Selected cantrip names
      level1Spell?: string;     // Selected level 1 spell
      artisanTools?: string[];  // Crafter: 3 artisan tools
      instruments?: string[];   // Musician: 3 instruments
      skillsAndTools?: string[]; // Skilled: 3 skills or tools
    };
    otherFeats: Record<string, {
      spellcastingAbility?: string;
      cantrips?: string[];
      spells?: string[];
      choices?: Record<string, string>;
      resilientAttribute?: string; // For Resilient feat
    }>;
  };

  // === NEW: Structured Notes ===
  notesStructured: {
    organizations: { name: string; description: string }[];
    allies: { name: string; description: string }[];
    enemies: { name: string; description: string }[];
    other: { name: string; description: string }[];
  };

  // === NEW: Modular Selection State ===
  // Key: FeatureChoice.id (e.g., "elf-keen-senses")
  // Value: 用户选择的内容数组 (e.g., ["察觉"])
  selections: Record<string, string[]>;
}

