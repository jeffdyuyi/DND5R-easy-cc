
// DND 5e Core Rules Utilities

/**
 * Calculates the ability modifier from a score.
 * Formula: floor((score - 10) / 2)
 */
export const getModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

/**
 * Calculates the proficiency bonus based on character level.
 * Formula: ceil(level / 4) + 1
 */
export const getProficiencyBonus = (level: number): number => {
  return Math.ceil(level / 4) + 1;
};

/**
 * Formats a modifier number into a string with a sign (e.g., "+3", "-1", "0").
 */
export const formatModifier = (scoreOrMod: number, isScore: boolean = false): string => {
  const mod = isScore ? getModifier(scoreOrMod) : scoreOrMod;
  return mod >= 0 ? `+${mod}` : `${mod}`;
};

/**
 * Validates if an object loosely resembles a CharacterData structure.
 */
export const validateCharacterData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  // Check for essential fields
  const requiredFields = ['id', 'name', 'level', 'abilities', 'className', 'session'];
  for (const field of requiredFields) {
    if (!(field in data)) return false;
  }
  return true;
};

export const calculateACOptions = (character: any) => {
  const dexMod = getModifier(character.abilities?.dexterity || 10);
  const conMod = getModifier(character.abilities?.constitution || 10);
  const wisMod = getModifier(character.abilities?.wisdom || 10);
  const chaMod = getModifier(character.abilities?.charisma || 10);

  // Check Inventory for Armor & Shield
  const equippedArmor = character.inventoryArmor?.find((i: any) => i.type === '护甲' && !i.tags?.includes('盾牌'));
  const equippedShield = character.inventoryArmor?.find((i: any) => i.tags?.includes('盾牌'));
  const shieldBonus = equippedShield ? 2 : 0; // Standard 5e shield is +2

  const options: { label: string, value: number, note?: string }[] = [];

  // 1. Natural / Unarmored (Base)
  options.push({ label: "无甲 (基础)", value: 10 + dexMod + shieldBonus, note: "10 + 敏捷" });

  // 2. Class Specific Unarmored Defense
  if (character.className === '野蛮人') {
    options.push({ label: "野蛮人无甲防御", value: 10 + dexMod + conMod + shieldBonus, note: "10 + 敏捷 + 体质" });
  }
  if (character.className === '武僧' && !equippedArmor && !equippedShield) {
    // Monk Unarmored Defense doesn't work with shields
    options.push({ label: "武僧无甲防御", value: 10 + dexMod + wisMod, note: "10 + 敏捷 + 感知 (无盾)" });
  }
  if (character.subclass === '舞蹈学院' && !equippedArmor) {
    options.push({ label: "舞蹈学院无甲防御", value: 10 + dexMod + chaMod + shieldBonus, note: "10 + 敏捷 + 魅力" + (shieldBonus ? " + 盾牌" : "") });
  }
  if (character.race === '龙裔' || (character.subclass && character.subclass.includes('龙族'))) {
    if (character.className === '术士') {
      options.push({ label: "龙族强韧", value: 13 + dexMod, note: "13 + 敏捷" });
    }
  }

  // 3. Armor Calculation
  if (equippedArmor) {
    let armorAC = 10;
    let limitDex = false;
    let maxDex = 100;

    if (equippedArmor.ac) {
      const baseMatch = equippedArmor.ac.match(/^(\d+)/);
      if (baseMatch) armorAC = parseInt(baseMatch[1]);

      if (equippedArmor.ac.includes("最大 2")) {
        limitDex = true;
        maxDex = 2;
      } else if (!equippedArmor.ac.includes("敏捷")) {
        // Heavy armor usually doesn't add Dex
        limitDex = true;
        maxDex = 0;
      }
    }

    const effectiveDex = limitDex ? Math.min(dexMod, maxDex) : dexMod;
    const totalArmorAC = armorAC + effectiveDex + shieldBonus;

    options.push({
      label: `着甲 (${equippedArmor.name})`,
      value: totalArmorAC,
      note: `${armorAC} + 敏捷(${effectiveDex}) ${shieldBonus ? '+ 盾牌' : ''}`
    });
  }

  // Sort by highest AC
  return options.sort((a, b) => b.value - a.value);
};
