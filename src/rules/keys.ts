/**
 * D&D 2024 规则层核心字典 (Standardized Keys)
 * 所有的计算、数据存储、修正值 (Modifiers) 都必须映射到这些 Key 上。
 */

// 1. 六围属性 (Ability Scores)
export enum AbilityKey {
    STR = 'ability_str',
    DEX = 'ability_dex',
    CON = 'ability_con',
    INT = 'ability_int',
    WIS = 'ability_wis',
    CHA = 'ability_cha',
}

// 2. 18 项标准技能 (Skills - 基于 2024 核心手册)
export enum SkillKey {
    ACROBATICS = 'skill_acrobatics',       // 体操 (DEX)
    ANIMAL_HANDLING = 'skill_animal',      // 驯兽 (WIS)
    ARCANA = 'skill_arcana',               // 奥法 (INT)
    ATHLETICS = 'skill_athletics',         // 运动 (STR)
    DECEPTION = 'skill_deception',         // 欺瞒 (CHA)
    HISTORY = 'skill_history',             // 历史 (INT)
    INSIGHT = 'skill_insight',             // 洞悉 (WIS)
    INTIMIDATION = 'skill_intimidation',   // 威吓 (CHA)
    INVESTIGATION = 'skill_investigation', // 调查 (INT)
    MEDICINE = 'skill_medicine',           // 医药 (WIS)
    NATURE = 'skill_nature',               // 自然 (INT)
    PERCEPTION = 'skill_perception',       // 察觉 (WIS)
    PERFORMANCE = 'skill_performance',     // 表演 (CHA)
    PERSUASION = 'skill_persuasion',       // 说服 (CHA)
    RELIGION = 'skill_religion',           // 宗教 (INT)
    SLEIGHT_OF_HAND = 'skill_sleight',     // 手法 (DEX)
    STEALTH = 'skill_stealth',             // 隐匿 (DEX)
    SURVIVAL = 'skill_survival',           // 求生 (WIS)
}

// 3. 通用衍生数值 (Derived Stats)
export enum DerivedKey {
    HP_MAX = 'stat_hp_max',                // 最大生命值
    AC = 'stat_ac',                        // 护甲等级
    PB = 'stat_proficiency_bonus',         // 熟练加值
    INITIATIVE = 'stat_initiative',        // 先攻
    HIT_DIE_TOTAL = 'stat_hit_die_total',  // 生命骰总数
    HIT_DIE_CURRENT = 'stat_hit_die_current', // 当前生命骰
    SPEED_WALK = 'stat_speed_walk',        // 步行速度
    SPEED_FLY = 'stat_speed_fly',          // 飞行速度
    SPEED_SWIM = 'stat_speed_swim',        // 游泳速度
    SPEED_CLIMB = 'stat_speed_climb',      // 攀爬速度
    PASSIVE_PERCEPTION = 'stat_passive_perception',
    PASSIVE_INSIGHT = 'stat_passive_insight',
    PASSIVE_INVESTIGATION = 'stat_passive_investigation',
}

// 4. 感知模式 (Senses)
export enum SenseKey {
    DARKVISION = 'sense_darkvision',
    BLINDSIGHT = 'sense_blindsight',
    TREMORSENSE = 'sense_tremorsense',
    TRUESIGHT = 'sense_truesight',
}

// 5. 受训类别 (Proficiency Categories)
// 用于判断武器、护甲的熟练情况
export enum ProfCategoryKey {
    ARMOR_LIGHT = 'prof_armor_light',
    ARMOR_MEDIUM = 'prof_armor_medium',
    ARMOR_HEAVY = 'prof_armor_heavy',
    ARMOR_SHIELD = 'prof_armor_shield',
    WEAPON_SIMPLE = 'prof_weapon_simple',
    WEAPON_MARTIAL = 'prof_weapon_martial',
    WEAPON_MASTERY = 'prof_weapon_mastery', // 武器精通 (2024 新增)
    SAVING_THROW_STR = 'prof_save_str',
    SAVING_THROW_DEX = 'prof_save_dex',
    SAVING_THROW_CON = 'prof_save_con',
    SAVING_THROW_INT = 'prof_save_int',
    SAVING_THROW_WIS = 'prof_save_wis',
    SAVING_THROW_CHA = 'prof_save_cha',
}

// 6. 法术相关数值 (Spellcasting)
export enum SpellKey {
    SPELL_DC = 'spell_save_dc',
    SPELL_ATTACK = 'spell_attack_bonus',
    SPELL_PREPARED_MAX = 'spell_prepared_max',
    SLOT_CANTRIP = 'spell_slot_cantrip', // 戏法已知数量
    SLOT_L1 = 'spell_slot_l1',
    SLOT_L2 = 'spell_slot_l2',
    SLOT_L3 = 'spell_slot_l3',
    SLOT_L4 = 'spell_slot_l4',
    SLOT_L5 = 'spell_slot_l5',
    SLOT_L6 = 'spell_slot_l6',
    SLOT_L7 = 'spell_slot_l7',
    SLOT_L8 = 'spell_slot_l8',
    SLOT_L9 = 'spell_slot_l9',
}

// 7. 联合导出类型 (用于 Modifier 的 Target)
export type StatKey =
    | AbilityKey
    | SkillKey
    | DerivedKey
    | SenseKey
    | ProfCategoryKey
    | SpellKey
    | string; // 允许字符串形式以兼容工具熟练度等自定义 ID
