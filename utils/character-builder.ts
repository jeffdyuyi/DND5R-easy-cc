// 角色构建辅助函数

import { CharacterData, ClassItem, BackgroundItem, AbilityScores } from '../types';

/**
 * 计算属性调整值
 */
export function getAbilityModifier(score: number): number {
    return Math.floor((score - 10) / 2);
}

/**
 * 计算熟练加值
 */
export function getProficiencyBonus(level: number): number {
    return Math.ceil(level / 4) + 1;
}

/**
 * 从职业数据应用默认设置到角色
 */
export function applyClassDefaults(
    _character: CharacterData,
    classData: ClassItem
): Partial<CharacterData> {
    // Note: Skill selection is handled in StepClassLevel component

    return {
        className: classData.name,
        // 保留其他字段不变
    };
}

/**
 * 从背景数据应用默认设置到角色
 */
export function applyBackgroundDefaults(
    character: CharacterData,
    background: BackgroundItem
): Partial<CharacterData> {
    // 应用技能熟练
    const updatedSkillMastery = { ...character.skillMastery };
    background.skills.forEach(skill => {
        if (!updatedSkillMastery[skill]) {
            updatedSkillMastery[skill] = 1; // 熟练
        }
    });

    // 应用工具熟练
    const toolEntry = {
        id: `bg-${background.id}`,
        name: background.tool,
        note: `来自背景: ${background.name}`
    };

    return {
        background: background.name,
        skillMastery: updatedSkillMastery,
        tools: [...character.tools, toolEntry],
        // originFeat会在专长选择时处理
    };
}

/**
 * 应用背景的属性加值
 * @param currentBonuses 当前属性加值
 * @param ability1 第一个属性 (+2 或 +1)
 * @param ability2 第二个属性 (+1)
 * @param ability3 第三个属性 (+1，可选)
 * @param distribution 分配方式: "2-1" 或 "1-1-1"
 */
export function applyBackgroundAbilityBonuses(
    currentBonuses: AbilityScores,
    ability1: keyof AbilityScores,
    ability2: keyof AbilityScores,
    ability3: keyof AbilityScores | null,
    distribution: '2-1' | '1-1-1'
): AbilityScores {
    const newBonuses = { ...currentBonuses };

    if (distribution === '2-1') {
        newBonuses[ability1] += 2;
        newBonuses[ability2] += 1;
    } else if (distribution === '1-1-1' && ability3) {
        newBonuses[ability1] += 1;
        newBonuses[ability2] += 1;
        newBonuses[ability3] += 1;
    }

    return newBonuses;
}

/**
 * 解析职业技能选项
 * @param skillProficiencies 例如："选择2项：运动、杂技、威吓"
 * @returns { count: 2, options: ["运动", "杂技", "威吓"] }
 */
export function parseSkillOptions(skillProficiencies: string): {
    count: number;
    options: string[];
} {
    const countMatch = skillProficiencies.match(/选择(\d+)项/);
    const count = countMatch ? parseInt(countMatch[1]) : 0;

    // 提取技能列表（冒号后的部分）
    const optionsMatch = skillProficiencies.match(/[:：](.+)$/);
    if (!optionsMatch) {
        return { count, options: [] };
    }

    const options = optionsMatch[1]
        .split(/[、，,]/)
        .map(s => s.trim())
        .filter(s => s.length > 0 && s !== '或');

    return { count, options };
}

/**
 * 计算最终属性值（基础 + 种族加值 + 背景加值）
 */
export function calculateFinalAbilities(
    base: AbilityScores,
    racialBonuses: AbilityScores,
    backgroundBonuses: AbilityScores
): AbilityScores {
    return {
        strength: base.strength + racialBonuses.strength + backgroundBonuses.strength,
        dexterity: base.dexterity + racialBonuses.dexterity + backgroundBonuses.dexterity,
        constitution: base.constitution + racialBonuses.constitution + backgroundBonuses.constitution,
        intelligence: base.intelligence + racialBonuses.intelligence + backgroundBonuses.intelligence,
        wisdom: base.wisdom + racialBonuses.wisdom + backgroundBonuses.wisdom,
        charisma: base.charisma + racialBonuses.charisma + backgroundBonuses.charisma
    };
}

/**
 * 计算法术豁免DC
 */
export function calculateSpellSaveDC(
    level: number,
    spellcastingAbility: string,
    abilities: AbilityScores
): number {
    let mod = 0;
    switch (spellcastingAbility) {
        case '力量': mod = getAbilityModifier(abilities.strength); break;
        case '敏捷': mod = getAbilityModifier(abilities.dexterity); break;
        case '体质': mod = getAbilityModifier(abilities.constitution); break;
        case '智力': mod = getAbilityModifier(abilities.intelligence); break;
        case '感知': mod = getAbilityModifier(abilities.wisdom); break;
        case '魅力': mod = getAbilityModifier(abilities.charisma); break;
    }
    return 8 + getProficiencyBonus(level) + mod;
}

/**
 * 计算法术攻击加值
 */
export function calculateSpellAttackBonus(
    level: number,
    spellcastingAbility: string,
    abilities: AbilityScores
): number {
    let mod = 0;
    switch (spellcastingAbility) {
        case '力量': mod = getAbilityModifier(abilities.strength); break;
        case '敏捷': mod = getAbilityModifier(abilities.dexterity); break;
        case '体质': mod = getAbilityModifier(abilities.constitution); break;
        case '智力': mod = getAbilityModifier(abilities.intelligence); break;
        case '感知': mod = getAbilityModifier(abilities.wisdom); break;
        case '魅力': mod = getAbilityModifier(abilities.charisma); break;
    }
    return getProficiencyBonus(level) + mod;
}
