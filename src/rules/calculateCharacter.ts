import {
    CharacterData,
    ComputedCharacterState,
    ComputedMeta,
    ComputedAbilities,
    ComputedCombat,
    ComputedProficiencies,
    ComputedSpells,
    ComputedCarrying,
    CharacterSourceTrace,
    CharacterGrantTrace,
    CharacterCompletionState,
    SkillProficiencyEntry,
    AbilityScores,
    ClassItem,
    SpeciesItem
} from '../../types';

export interface CalculateCharacterOptions {
    classData?: ClassItem;
    speciesData?: SpeciesItem;
}

const SKILL_ABILITY_MAP: Record<string, keyof AbilityScores> = {
    '体操': 'dexterity',
    '驯兽': 'wisdom',
    '奥法': 'intelligence',
    '运动': 'strength',
    '欺瞒': 'charisma',
    '历史': 'intelligence',
    '洞悉': 'wisdom',
    '威吓': 'charisma',
    '调查': 'intelligence',
    '医药': 'wisdom',
    '自然': 'intelligence',
    '察觉': 'wisdom',
    '表演': 'charisma',
    '说服': 'charisma',
    '宗教': 'intelligence',
    '手法': 'dexterity',
    '隐匿': 'dexterity',
    '求生': 'wisdom',
};

const HIT_DIE_MAP: Record<string, number> = {
    '野蛮人': 12,
    '诗人': 8,
    '牧师': 8,
    '德鲁伊': 8,
    '战士': 10,
    '武僧': 10,
    '圣武士': 10,
    '游侠': 10,
    '游荡者': 8,
    '术士': 6,
    '魔契师': 8,
    '法师': 6,
    'Barbarian': 12,
    'Bard': 8,
    'Cleric': 8,
    'Druid': 8,
    'Fighter': 10,
    'Monk': 10,
    'Paladin': 10,
    'Ranger': 10,
    'Rogue': 8,
    'Sorcerer': 6,
    'Warlock': 8,
    'Wizard': 6,
};

const CLASS_SKILL_PROFICIENCIES: Record<string, string[]> = {
    '诗人': ['杂技', '奥秘', '欺瞒', '洞悉', '威吓', '表演', '说服', '社交'],
    '牧师': ['洞悉', '医药', '宗教', '说服'],
    '德鲁伊': ['奥秘', '医药', '自然', '察觉', '求生'],
    '战士': ['运动', ' Acrobatics', '察觉', '求生'],
    '武僧': ['杂技', '察觉'],
    '圣武士': ['Athletics', '察觉', '威吓', '说服'],
    '游侠': ['运动', '察觉', '求生', '隐匿'],
    '游荡者': ['Athletics', '欺瞒', '调查', '手法', '隐匿', '察觉'],
    '术士': ['奥秘', '欺瞒', '宗教', '表演'],
    '魔契师': ['奥秘', '欺瞒', '威吓', '宗教'],
    '法师': ['奥秘', '历史', '调查', '宗教'],
};

const CLASS_SAVING_THROWS: Record<string, string[]> = {
    '诗人': ['敏捷', '魅力'],
    '牧师': ['感知', '魅力'],
    '德鲁伊': ['智力', '感知'],
    '战士': ['力量', '体质'],
    '武僧': ['力量', '敏捷'],
    '圣武士': ['感知', '魅力'],
    '游侠': ['敏捷', '感知'],
    '游荡者': ['敏捷', '智力'],
    '术士': ['体质', '魅力'],
    '魔契师': ['智力', '魅力'],
    '法师': ['智力', '感知'],
};

const CLASS_ARMOR_PROFICIENCIES: Record<string, string[]> = {
    '诗人': ['轻甲', '中甲'],
    '牧师': ['轻甲', '中甲', '重甲', '盾牌'],
    '德鲁伊': ['轻甲', '中甲', '盾牌'],
    '战士': ['轻甲', '中甲', '重甲', '盾牌'],
    '武僧': [],
    '圣武士': ['轻甲', '中甲', '重甲', '盾牌'],
    '游侠': ['轻甲', '中甲', '盾牌'],
    '游荡者': ['轻甲'],
    '术士': [],
    '魔契师': ['轻甲'],
    '法师': [],
};

const CLASS_WEAPON_PROFICIENCIES: Record<string, string[]> = {
    '诗人': ['简易武器', '长弓', '短弓', '细剑', '刺剑'],
    '牧师': ['简易武器', '钉头锤'],
    '德鲁伊': ['简易武器', '木棒'],
    '战士': ['简易武器', '军用武器'],
    '武僧': ['简易武器', '短剑'],
    '圣武士': ['简易武器', '军用武器'],
    '游侠': ['简易武器', '军用武器', '长弓', '短弓'],
    '游荡者': ['简易武器', '短剑', '细剑', '短弓'],
    '术士': ['简易武器'],
    '魔契师': ['简易武器'],
    '法师': ['简易武器', '轻十字弓'],
};

const ALL_SKILLS = [
    '体操', '驯兽', '奥法', '运动', '欺瞒', '历史', '洞悉', '威吓',
    '调查', '医药', '自然', '察觉', '表演', '说服', '宗教', '手法', '隐匿', '求生'
];

function calculateAbilityModifier(score: number): number {
    return Math.floor((score - 10) / 2);
}

function calculateProficiencyBonus(level: number): number {
    if (level <= 4) return 2;
    if (level <= 8) return 3;
    if (level <= 12) return 4;
    if (level <= 16) return 5;
    if (level <= 20) return 6;
    return 2;
}

function calculateCarryCapacityLb(constitution: number): number {
    return constitution * 15;
}

function calculateHP(level: number, hitDie: number, conModifier: number): number {
    const averageHitDie = Math.ceil(hitDie / 2);
    return hitDie + conModifier + (level - 1) * (averageHitDie + conModifier);
}

function calculateSpellSlots(level: number, className: string): Record<number, number> {
    const isFullCaster = ['诗人', '牧师', '德鲁伊', '术士', '法师'].includes(className);
    const isHalfCaster = ['圣武士', '游侠'].includes(className);
    const isThirdCaster = ['游荡者', '武僧', '野蛮人'].includes(className);
    const isWarlock = className === '魔契师';

    const slots: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

    if (isWarlock) {
        if (level >= 1) slots[1] = 1;
        if (level >= 2) slots[1] = 2;
        if (level >= 3) slots[2] = 1;
        if (level >= 4) slots[2] = 2;
        if (level >= 5) slots[3] = 1;
        if (level >= 7) slots[3] = 2;
        if (level >= 9) slots[4] = 2;
        if (level >= 11) slots[4] = 3;
        if (level >= 13) slots[4] = 3;
        if (level >= 15) slots[4] = 3;
        if (level >= 18) slots[4] = 4;
    } else if (isFullCaster) {
        if (level >= 1) { slots[1] = 2; slots[2] = 0; }
        if (level >= 2) { slots[1] = 3; slots[2] = 0; }
        if (level >= 3) { slots[1] = 4; slots[2] = 2; }
        if (level >= 4) { slots[1] = 4; slots[2] = 3; }
        if (level >= 5) { slots[1] = 4; slots[2] = 3; slots[3] = 2; }
        if (level >= 6) { slots[1] = 4; slots[2] = 3; slots[3] = 3; }
        if (level >= 7) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 1; }
        if (level >= 8) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 2; }
        if (level >= 9) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 1; }
        if (level >= 10) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 2; }
        if (level >= 11) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 3; slots[6] = 1; }
        if (level >= 13) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 3; slots[6] = 2; }
        if (level >= 15) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 3; slots[6] = 2; slots[7] = 1; }
        if (level >= 17) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 3; slots[6] = 2; slots[7] = 2; }
        if (level >= 19) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 3; slots[6] = 2; slots[7] = 2; slots[8] = 1; }
        if (level >= 20) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 3; slots[6] = 3; slots[7] = 2; slots[8] = 2; slots[9] = 1; }
    } else if (isHalfCaster) {
        const effectiveLevel = Math.floor(level / 2);
        if (effectiveLevel >= 1) { slots[1] = 2; }
        if (effectiveLevel >= 2) { slots[1] = 3; }
        if (effectiveLevel >= 3) { slots[1] = 4; slots[2] = 2; }
        if (effectiveLevel >= 4) { slots[1] = 4; slots[2] = 3; }
        if (effectiveLevel >= 5) { slots[1] = 4; slots[2] = 3; slots[3] = 2; }
        if (effectiveLevel >= 6) { slots[1] = 4; slots[2] = 3; slots[3] = 3; }
        if (effectiveLevel >= 7) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 1; }
        if (effectiveLevel >= 8) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 2; }
        if (effectiveLevel >= 9) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 1; }
        if (effectiveLevel >= 10) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; slots[5] = 2; }
    } else if (isThirdCaster) {
        const effectiveLevel = Math.floor(level / 3);
        if (effectiveLevel >= 1) { slots[1] = 2; }
        if (effectiveLevel >= 2) { slots[1] = 3; }
        if (effectiveLevel >= 3) { slots[1] = 4; slots[2] = 2; }
        if (effectiveLevel >= 4) { slots[1] = 4; slots[2] = 3; }
        if (effectiveLevel >= 5) { slots[1] = 4; slots[2] = 3; slots[3] = 2; }
        if (effectiveLevel >= 6) { slots[1] = 4; slots[2] = 3; slots[3] = 3; }
        if (effectiveLevel >= 7) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 1; }
        if (effectiveLevel >= 8) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 2; }
        if (effectiveLevel >= 9) { slots[1] = 4; slots[2] = 3; slots[3] = 3; slots[4] = 3; }
    }

    return slots;
}

function parseSpells(spellStr: string | undefined): string[] {
    if (!spellStr) return [];
    return spellStr.split(/[\n,]/)
        .map(s => s.trim().replace(/^[•\-\*]\s*/, ''))
        .filter(Boolean);
}

function getSaveProficiency(skillName: string, savingThrows: string[]): boolean {
    const abilityMap: Record<string, string> = {
        '力量': 'strength', '敏捷': 'dexterity', '体质': 'constitution',
        '智力': 'intelligence', '感知': 'wisdom', '魅力': 'charisma'
    };
    const ability = abilityMap[skillName];
    return savingThrows.includes(skillName);
}

export function calculateCharacter(character: CharacterData, options?: CalculateCharacterOptions): ComputedCharacterState {
    const level = character.level || 1;
    const pb = calculateProficiencyBonus(level);
    const className = character.className || '';
    
    const hitDie = HIT_DIE_MAP[className] || 10;

    const abilities: AbilityScores = {
        strength: character.abilities?.strength || 10,
        dexterity: character.abilities?.dexterity || 10,
        constitution: character.abilities?.constitution || 10,
        intelligence: character.abilities?.intelligence || 10,
        wisdom: character.abilities?.wisdom || 10,
        charisma: character.abilities?.charisma || 10,
    };

    let abilityBonuses: AbilityScores = {
        strength: character.abilityBonuses?.strength || 0,
        dexterity: character.abilityBonuses?.dexterity || 0,
        constitution: character.abilityBonuses?.constitution || 0,
        intelligence: character.abilityBonuses?.intelligence || 0,
        wisdom: character.abilityBonuses?.wisdom || 0,
        charisma: character.abilityBonuses?.charisma || 0,
    };

    if (options?.speciesData?.traits) {
        for (const trait of options.speciesData.traits) {
            if (trait.choices) {
                for (const choice of trait.choices) {
                    if (choice.grants?.skills) {
                        for (const skill of choice.grants.skills) {
                            abilityBonuses[strength] += 1;
                        }
                    }
                }
            }
        }
    }

    const finalAbilities: AbilityScores = {
        strength: Math.min(abilities.strength + abilityBonuses.strength, 20),
        dexterity: Math.min(abilities.dexterity + abilityBonuses.dexterity, 20),
        constitution: Math.min(abilities.constitution + abilityBonuses.constitution, 20),
        intelligence: Math.min(abilities.intelligence + abilityBonuses.intelligence, 20),
        wisdom: Math.min(abilities.wisdom + abilityBonuses.wisdom, 20),
        charisma: Math.min(abilities.charisma + abilityBonuses.charisma, 20),
    };

    const abilityModifiers: AbilityScores = {
        strength: calculateAbilityModifier(finalAbilities.strength),
        dexterity: calculateAbilityModifier(finalAbilities.dexterity),
        constitution: calculateAbilityModifier(finalAbilities.constitution),
        intelligence: calculateAbilityModifier(finalAbilities.intelligence),
        wisdom: calculateAbilityModifier(finalAbilities.wisdom),
        charisma: calculateAbilityModifier(finalAbilities.charisma),
    };

    const sources: CharacterSourceTrace = {
        selectedIds: [],
        grants: [],
        appliedAdjustments: [],
    };

    if (character.speciesName || character.race) {
        const speciesId = character.speciesName || character.race || '';
        sources.grants.push({
            sourceId: speciesId,
            sourceType: 'species',
            targetType: 'ability_bonus',
            mode: 'fixed',
            notes: '种族属性加值',
        });
    }

    if (character.background) {
        sources.grants.push({
            sourceId: character.background,
            sourceType: 'background',
            targetType: 'skill',
            mode: 'choice',
            notes: '背景技能选择',
        });
        sources.grants.push({
            sourceId: character.background,
            sourceType: 'background',
            targetType: 'tool',
            mode: 'fixed',
            notes: '背景工具熟练',
        });
    }

    if (character.className) {
        sources.grants.push({
            sourceId: character.className,
            sourceType: 'class',
            targetType: 'proficiency',
            mode: 'fixed',
            notes: '职业熟练项',
        });
    }

    if (character.originFeat) {
        sources.grants.push({
            sourceId: character.originFeat,
            sourceType: 'feat',
            targetType: 'feat',
            mode: 'choice',
            notes: '起源专长选择',
        });
    }

    const completion: CharacterCompletionState = {
        hasClass: !!character.className,
        hasSpecies: !!character.race || !!character.speciesName,
        hasBackground: !!character.background,
        hasAbilities: Object.values(abilities).every(v => v > 0),
        hasIdentity: !!character.alignment,
        hasProficiencies: true,
    };

    const classSavingThrows = CLASS_SAVING_THROWS[className] || [];
    const computedAbilities: ComputedAbilities = {
        scores: finalAbilities,
        modifiers: abilityModifiers,
        saveModifiers: {
            strength: abilityModifiers.strength + (classSavingThrows.includes('力量') ? pb : 0),
            dexterity: abilityModifiers.dexterity + (classSavingThrows.includes('敏捷') ? pb : 0),
            constitution: abilityModifiers.constitution + (classSavingThrows.includes('体质') ? pb : 0),
            intelligence: abilityModifiers.intelligence + (classSavingThrows.includes('智力') ? pb : 0),
            wisdom: abilityModifiers.wisdom + (classSavingThrows.includes('感知') ? pb : 0),
            charisma: abilityModifiers.charisma + (classSavingThrows.includes('魅力') ? pb : 0),
        },
        saveProficiencies: classSavingThrows,
    };

    let armorClass = 10 + abilityModifiers.dexterity;
    let armorClassBreakdown: string[] = [`10 (基础)`];

    if (character.inventoryArmor) {
        const equippedArmor = character.inventoryArmor.find(a => a.isEquipped);
        if (equippedArmor && equippedArmor.ac) {
            const acMatch = equippedArmor.ac.match(/(\d+)/);
            if (acMatch) {
                const armorAc = parseInt(acMatch[1]);
                armorClass = armorAc + abilityModifiers.dexterity;
                armorClassBreakdown = [`${armorAc} (${equippedArmor.name})`, `+${abilityModifiers.dexterity} (敏捷)`];
            }
        }
        
        const hasShield = character.inventoryArmor.some(a => a.isEquipped && a.name?.includes('盾牌'));
        if (hasShield) {
            armorClass += 2;
            armorClassBreakdown.push('+2 (盾牌)');
        }
    }

    let speciesSpeed = 30;
    if (options?.speciesData?.speed) {
        speciesSpeed = options.speciesData.speed;
    }

    const hpMax = character.hpMax || calculateHP(level, hitDie, abilityModifiers.constitution);

    const computedCombat: ComputedCombat = {
        armorClass,
        armorClassBreakdown,
        initiative: abilityModifiers.dexterity,
        speed: speciesSpeed,
        passivePerception: 10 + abilityModifiers.wisdom + pb,
        hpMax,
        hitDiceTotal: `${level}d${hitDie}`,
        proficiencyBonus: pb,
    };

    const classSkills = CLASS_SKILL_PROFICIENCIES[className] || [];
    const classArmor = CLASS_ARMOR_PROFICIENCIES[className] || [];
    const classWeapons = CLASS_WEAPON_PROFICIENCIES[className] || [];

    const computedProficiencies: ComputedProficiencies = {
        skills: [],
        tools: character.tools?.map(t => t.name) || [],
        weapons: classWeapons,
        armors: classArmor,
        languages: character.languages ? character.languages.split(/[\n,]/).map(s => s.trim()).filter(Boolean) : [],
    };

    for (const skill of ALL_SKILLS) {
        const abilityKey = SKILL_ABILITY_MAP[skill];
        const abilityMod = abilityModifiers[abilityKey];
        const mastery = character.skillMastery?.[skill] || 0;
        
        let modifier = abilityMod;
        if (mastery >= 1 || classSkills.includes(skill)) {
            modifier += pb;
        }
        if (mastery >= 2) {
            modifier += pb;
        }

        computedProficiencies.skills.push({
            skill,
            proficient: mastery >= 1 || classSkills.includes(skill),
            expertise: mastery >= 2,
            modifier,
        });
    }

    const spellcastingAbility = character.spellcastingAbility || 'intelligence';
    const spellAbilityMod = abilityModifiers[spellcastingAbility as keyof AbilityScores] || 0;
    
    const spellSlots = calculateSpellSlots(level, className);
    
    const computedSpells: ComputedSpells = {
        spellcastingAbility,
        spellSaveDC: 8 + pb + spellAbilityMod,
        spellAttackBonus: pb + spellAbilityMod,
        cantrips: parseSpells(character.spells?.cantrips),
        preparedSpells: parseSpells(character.spells?.level1),
        spellSlots: {
            1: { total: spellSlots[1], used: character.spellSlots?.level1?.used || 0 },
            2: { total: spellSlots[2], used: character.spellSlots?.level2?.used || 0 },
            3: { total: spellSlots[3], used: character.spellSlots?.level3?.used || 0 },
            4: { total: spellSlots[4], used: character.spellSlots?.level4?.used || 0 },
            5: { total: spellSlots[5], used: character.spellSlots?.level5?.used || 0 },
            6: { total: spellSlots[6], used: character.spellSlots?.level6?.used || 0 },
            7: { total: spellSlots[7], used: character.spellSlots?.level7?.used || 0 },
            8: { total: spellSlots[8], used: character.spellSlots?.level8?.used || 0 },
            9: { total: spellSlots[9], used: character.spellSlots?.level9?.used || 0 },
        },
    };

    let currentWeight = 0;
    character.inventoryWeapons?.forEach(w => {
        currentWeight += (parseFloat(w.weight || '0') || 0) * (w.quantity || 1);
    });
    character.inventoryArmor?.forEach(a => {
        currentWeight += (parseFloat(a.weight || '0') || 0) * (a.quantity || 1);
    });
    character.inventoryGear?.forEach(g => {
        currentWeight += (parseFloat(g.weight || '0') || 0) * (g.quantity || 1);
    });

    const coinWeight = (character.copper || 0) * 0.01 +
        (character.silver || 0) * 0.01 +
        (character.gold || 0) * 0.01 +
        (character.platinum || 0) * 0.01;
    currentWeight += coinWeight;

    const carryCapacity = calculateCarryCapacityLb(finalAbilities.constitution);
    const currentTotalWeight = currentWeight;

    let encumbranceState: 'normal' | 'encumbered' | 'heavily_encumbered' | 'over_capacity' = 'normal';
    if (currentTotalWeight > carryCapacity * 2) {
        encumbranceState = 'over_capacity';
    } else if (currentTotalWeight > carryCapacity) {
        encumbranceState = 'heavily_encumbered';
    } else if (currentTotalWeight > carryCapacity / 2) {
        encumbranceState = 'encumbered';
    }

    const computedCarrying: ComputedCarrying = {
        carryCapacityLb: carryCapacity,
        pushDragLiftLb: carryCapacity * 2,
        currentWeightLb: Math.round(currentTotalWeight * 100) / 100,
        encumbranceState,
    };

    const computedMeta: ComputedMeta = {
        isValid: completion.hasClass && completion.hasSpecies && completion.hasBackground,
        version: '1.0.0',
        computedAt: new Date().toISOString(),
    };

    return {
        meta: computedMeta,
        abilities: computedAbilities,
        combat: computedCombat,
        proficiencies: computedProficiencies,
        spells: computedSpells,
        carrying: computedCarrying,
        sources,
        completion,
    };
}

export function initWizardState(): CharacterData['wizard'] {
    return {
        currentStep: 1,
        completedSteps: [],
        pendingChoiceIds: [],
    };
}
