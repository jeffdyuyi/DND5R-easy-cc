
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
  const requiredFields = ['id', 'name', 'level', 'abilities', 'className'];
  for (const field of requiredFields) {
    if (!(field in data)) return false;
  }
  return true;
};
