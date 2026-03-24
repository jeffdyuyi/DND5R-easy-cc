import { CharacterData, ClassItem, SpeciesItem } from '../types';

const FVTT_SKILL_MAP: Record<string, string> = {
    "杂技": "acr", "驯兽": "ani", "奥秘": "arc", "运动": "ath",
    "欺瞒": "dec", "历史": "his", "洞悉": "ins", "威吓": "itm",
    "调查": "inv", "医药": "med", "自然": "nat", "察觉": "prc",
    "表演": "prf", "游说": "per", "宗教": "rel", "巧手": "slt",
    "隐匿": "ste", "求生": "sur"
};

const ABILITY_TO_FVTT: Record<string, string> = {
    "strength": "str",
    "dexterity": "dex",
    "constitution": "con",
    "intelligence": "int",
    "wisdom": "wis",
    "charisma": "cha"
};

const SPELLCASTING_MAP: Record<string, string> = {
    "力量": "str", "敏捷": "dex", "体质": "con",
    "智力": "int", "感知": "wis", "魅力": "cha"
};

/**
 * Parses existing character data into the corresponding FVTT (Foundry VTT) dnd5e actor schema
 * @param character The internal CharacterData object
 * @param classData Reference class data to resolve saving throw proficiencies
 * @param speciesData Reference species data for movement speed and senses
 */
export function convertToFVTTActor(character: CharacterData, classData?: ClassItem, speciesData?: SpeciesItem): any {
    // 1. Calculate Abilities (Base + Bonuses)
    const abilities: any = {};
    const orderedAbilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;

    orderedAbilities.forEach((key) => {
        const total = (character.abilities[key] || 10)
            + (character.abilityBonuses?.[key] || 0)
            + (character.backgroundBonuses?.[key] || 0);

        // Check saving throw proficiency
        // The Chinese name maps to FVTT abbreviation
        const cnName = {
            strength: '力量', dexterity: '敏捷', constitution: '体质',
            intelligence: '智力', wisdom: '感知', charisma: '魅力'
        }[key] || '力量';
        const isProficient = classData?.saves.includes(cnName) ? 1 : 0;

        abilities[ABILITY_TO_FVTT[key]] = {
            value: total,
            proficient: isProficient
        };
    });

    // 2. Map Skills
    const skills: any = {};
    Object.values(FVTT_SKILL_MAP).forEach(sk => {
        skills[sk] = { value: 0 }; // Default no proficiency
    });

    if (character.skillMastery) {
        Object.entries(character.skillMastery).forEach(([cnSkillName, masteryLevel]) => {
            const fvttKey = FVTT_SKILL_MAP[cnSkillName];
            if (fvttKey) {
                skills[fvttKey].value = masteryLevel; // 1 = prof, 2 = expertise
            }
        });
    }

    // 3. Combat Attributes
    // Calculate basic AC (without FVTT's complex calc, we set a flat AC based on inventory)
    const dexMod = Math.floor((abilities.dex.value - 10) / 2);
    const equippedArmor = character.inventoryArmor?.find(a => a.isEquipped);
    let flatAc = 10 + dexMod;

    if (equippedArmor && equippedArmor.ac) {
        const baseMatch = equippedArmor.ac.match(/^(\d+)/);
        const baseAC = baseMatch ? parseInt(baseMatch[1], 10) : 10;
        const hasDex = equippedArmor.ac.includes('敏捷');
        const capMatch = equippedArmor.ac.match(/至多\+?(\d+)/);
        const cap = capMatch ? parseInt(capMatch[1], 10) : undefined;

        if (!hasDex) flatAc = baseAC;
        else if (cap !== undefined) flatAc = baseAC + Math.min(dexMod, cap);
        else flatAc = baseAC + dexMod;
    }

    const speed = speciesData?.speed || 30;

    // Compile Biography HTML
    const biographyHtml = `
    <p><strong>外貌描述：</strong> ${character.appearance || '无'}</p>
    <p><strong>背景故事：</strong> ${character.backstory ? character.backstory.replace(/\\n/g, '<br/>') : '无'}</p>
    <hr/>
    <p><strong>性格特点：</strong> ${character.personalityTraits || '无'}</p>
    <p><strong>理想信念：</strong> ${character.ideals || '无'}</p>
    <p><strong>牵绊羁绊：</strong> ${character.bonds || '无'}</p>
    <p><strong>缺点弱点：</strong> ${character.flaws || '无'}</p>
    <hr/>
    <p><strong>盟友与组织：</strong> ${character.organizations || ''} ${character.allies || ''}</p>
  `;

    // Provide initial empty FVTT Items array
    const items: any[] = [];

    // Transform Inventory Weapons into Basic FVTT Items (Type "weapon")
    if (character.inventoryWeapons) {
        character.inventoryWeapons.forEach(weap => {
            items.push({
                name: weap.name,
                type: "weapon",
                system: {
                    description: { value: weap.description || '' },
                    quantity: weap.quantity || 1,
                    weight: parseInt(weap.weight?.replace(/[^0-9]/g, '') || "0", 10),
                    price: { value: parseInt(weap.cost?.replace(/[^0-9]/g, '') || "0", 10), denomination: weap.cost?.replace(/[0-9\\s]/g, '').toLowerCase() || 'gp' },
                    equipped: weap.isEquipped ?? false,
                    damage: { parts: [[weap.damage || "", weap.damageType || ""]] }
                }
            });
        });
    }

    // Transform Inventory Armor into FVTT Items (Type "equipment")
    if (character.inventoryArmor) {
        character.inventoryArmor.forEach(arm => {
            items.push({
                name: arm.name,
                type: "equipment",
                system: {
                    description: { value: arm.description || '' },
                    quantity: arm.quantity || 1,
                    weight: parseInt(arm.weight?.replace(/[^0-9]/g, '') || "0", 10),
                    price: { value: parseInt(arm.cost?.replace(/[^0-9]/g, '') || "0", 10), denomination: arm.cost?.replace(/[0-9\\s]/g, '').toLowerCase() || 'gp' },
                    equipped: arm.isEquipped ?? false,
                    armor: { value: arm.ac }
                }
            });
        });
    }

    // Compile full FVTT payload
    return {
        name: character.name || '未命名',
        type: "character",
        system: {
            abilities: abilities,
            skills: skills,
            attributes: {
                hp: {
                    value: character.hpMax,
                    max: character.hpMax,
                    temp: 0
                },
                ac: {
                    flat: flatAc,
                    calc: "flat" // Set to flat to override complex derivation and ensure correct sync from site
                },
                movement: {
                    walk: speed,
                    units: "ft" // Default dnd5e unit
                },
                spellcasting: SPELLCASTING_MAP[character.spellcastingAbility || '感知'] || "wis"
            },
            details: {
                biography: { value: biographyHtml },
                alignment: character.alignment || '',
                race: character.race || '',
                background: character.background || '',
                level: character.level,
                xp: { value: character.experience || 0 },
                height: character.height || '',
                weight: character.weight || '',
                eyes: character.eyes || '',
                skin: character.skin || '',
                hair: character.hair || '',
                gender: character.gender || '',
                faith: character.faith || ''
            },
            currency: {
                pp: character.platinum || 0,
                gp: character.gold || 0,
                sp: character.silver || 0,
                cp: character.copper || 0
            }
        },
        items: items,
        flags: {
            "dnd5r-easy-cc": {
                exportDate: new Date().toISOString(),
                version: "1.0.0"
            }
        }
    };
}
