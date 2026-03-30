import { StatKey } from './keys';

/**
 * 修正值类型 (Modifier Type)
 * 用于定义该修正值如何与基础数值或其他修正值互动
 */
export enum ModifierType {
    ADD = 'add',              // 加算 (e.g. +2 Strength)
    SUB = 'sub',              // 减算 (e.g. -5 to hit)
    MULTIPLY = 'multiply',    // 乘算 (e.g. Speed x2)
    OVERRIDE = 'override',    // 覆盖/重写 (e.g. AC set to 18)
    MIN = 'min',              // 最小值 (e.g. Attribute cannot be below 10)
    MAX = 'max',              // 最大值 (e.g. Dex bonus to AC max 2)
    PROFICIENCY = 'proficiency', // 熟练度等级 (0=无, 1=熟练, 2=通晓/专家)
}

/**
 * 熟练度等级枚举
 */
export enum ProficiencyLevel {
    NONE = 0,
    PROFICIENT = 1,
    EXPERT = 2,
}

/**
 * 统一修正值接口 (The Universal Modifier)
 */
export interface Modifier {
    id: string;               // 唯一 ID (自增或 UUID)
    target: StatKey;          // 修改的目标 (e.g. 'ability_str')
    type: ModifierType;       // 修改类型
    value: number | string;   // 修改内容 (可能是数值，也可能是公式或特定 ID)

    // 来源信息 (Source)
    sourceId: string;         // 来源实体的 ID (e.g. 'background_acolyte')
    sourceName: string;       // 来源的可读名称 (e.g. '侍祭背景')
    sourceType: 'species' | 'background' | 'class' | 'feat' | 'item' | 'other';

    // 元数据与控制
    priority: number;         // 优先级 (主要用于 OVERRIDE，数字越大越优先)
    description?: string;     // 修正值的详细说明
    isActive: boolean;        // 是否生效 (例如：穿上护甲才生效，卸下后失效)

    // 条件判定 (可选扩展)
    // condition?: (state: any) => boolean; 
}

/**
 * 结果对象：包含最终值及其组成的修正值列表
 * 用于 UI 回显“这个数值是怎么算出来的”
 */
export interface CalculatedResult {
    baseValue: number;
    finalValue: number;
    modifiers: Modifier[];
    proficiencyLevel?: ProficiencyLevel;
}
