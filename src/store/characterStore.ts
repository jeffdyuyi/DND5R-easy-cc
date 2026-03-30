import { AbilityKey } from '../rules/keys';

/**
 * 核心状态树 (The Raw Selection State)
 * 此对象只保存玩家的“原始选择”，没有任何计算后的中间值。
 * 这也是持久化到数据库/本地存储的唯一对象。
 */
export interface CharacterState {
    id: string;
    name: string;

    // 1. 基础实体 (ID References)
    speciesId: string;       // 种族 (Elf, Dwarf, etc.)
    backgroundId: string;    // 背景 (Acolyte, Soldier, etc.)
    classId: string;         // 职业 (Fighter, Wizard, etc.)
    subclassId?: string;     // 子职业
    level: number;           // 等级

    // 2. 属性分配 (Core Attributes Selection)
    // 这是未经过修正的初始值 (如 Point Buy / Standard Array / Rolled)
    baseAbilities: Record<AbilityKey, number>;

    // 3. 背景属性加值 (Background ASI - 2024 规则)
    // 记录选择了哪两项属性进行 +2/+1 或 三项 +1
    backgroundAsi: {
        target1: AbilityKey;
        value1: number;
        target2: AbilityKey;
        value2: number;
        target3?: AbilityKey;
        value3?: number;
    };

    // 4. 定向选择 (Modular Selections)
    // 针对职业/种族/背景提供的 Choice 项 (例如：选择两项技能)
    // Key: 选项 ID (如 'class_fighter_skill_choice')
    // Value: 选中的结果数组 (如 ['skill_athletics', 'skill_acrobatics'])
    selections: Record<string, string[]>;

    // 5. 专长选择 (Feat Selections)
    // 包括起源专长 (Origin Feats) 和 等级专长
    featIds: string[];

    // 6. 装备列表 (Inventory)
    // 只记录物品 ID 和 数量
    inventory: {
        itemId: string;
        quantity: number;
        isEquipped: boolean;
        isAttuned: boolean;
    }[];

    // 7. 手动修正 (Manual Overrides / Homebrew)
    // 允许 DM 或玩家手动强行修改数值，也作为一种 Modifier 参与计算
    customModifiers: any[];
}

/**
 * 计算后的渲染视图 (The Derived View)
 * 用于 UI 显示，不进行持久化存储。
 */
export interface CharacterView {
    abilities: Record<AbilityKey, { base: number; total: number; modifier: number }>;
    skills: Record<string, { total: number; isProficient: boolean; isExpert: boolean }>;
    hp: { max: number; current: number; temp: number };
    ac: number;
    pb: number;
    speed: number;
    // ... 其他所有基于 Keys 的派生数值
}
