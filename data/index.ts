
import { ClassItem, AbilityScores } from '../types';
import { CLASS_DB } from './data-classes';
import { SUBCLASS_DB } from './data-subclasses';
import { SPECIES_DB } from './data-species';
import { BACKGROUND_DB } from './data-backgrounds';
import { SPELL_DB } from './data-spells';
import { SPELL_LISTS_DB, RANGER_SPELLS, SORCERER_SPELLS } from './spell-lists';
import { FEAT_DB } from './data-feats';
import { WEAPON_DB } from './data-items-weapons';
import { ARMOR_DB } from './data-items-armor';
import { TOOL_DB } from './data-items-tools';
import { GEAR_DB } from './data-items-gear';
import { MAGIC_MISC_DB } from './data-items-magic';
import { MAGIC_ARMOR_DB } from './data-items-magic-armor';

// Combine Magic Items
export const MAGIC_ITEM_DB = [
  ...MAGIC_MISC_DB,
  ...MAGIC_ARMOR_DB
];

// Aggregate Items for the main "Item Library" view
export const ITEM_DB = [
  ...WEAPON_DB,
  ...ARMOR_DB,
  ...TOOL_DB,
  ...GEAR_DB,
  ...MAGIC_ITEM_DB
];

// Re-export specific DBs for granular usage if needed
export {
  CLASS_DB,
  SUBCLASS_DB,
  SPECIES_DB,
  BACKGROUND_DB,
  SPELL_DB,
  FEAT_DB,
  WEAPON_DB,
  ARMOR_DB,
  TOOL_DB,
  GEAR_DB,
  MAGIC_MISC_DB,
  MAGIC_ARMOR_DB,
  SPELL_LISTS_DB,
  RANGER_SPELLS,
  SORCERER_SPELLS,
};

// Helper for look up classes by name
export const CLASSES: Record<string, ClassItem> = CLASS_DB.reduce((acc, cls) => {
  acc[cls.name] = cls;
  return acc;
}, {} as Record<string, ClassItem>);

export const CLASS_RECOMMENDATIONS: Record<string, AbilityScores> = {
  "野蛮人": { strength: 15, dexterity: 13, constitution: 14, intelligence: 8, wisdom: 12, charisma: 10 },
  "吟游诗人": { strength: 8, dexterity: 14, constitution: 12, intelligence: 10, wisdom: 13, charisma: 15 },
  "牧师": { strength: 14, dexterity: 10, constitution: 13, intelligence: 8, wisdom: 15, charisma: 12 },
  "德鲁伊": { strength: 8, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 15, charisma: 13 },
  "战士": { strength: 15, dexterity: 13, constitution: 14, intelligence: 10, wisdom: 12, charisma: 8 },
  "武僧": { strength: 10, dexterity: 15, constitution: 13, intelligence: 8, wisdom: 14, charisma: 12 },
  "圣武士": { strength: 15, dexterity: 10, constitution: 13, intelligence: 8, wisdom: 12, charisma: 14 },
  "游侠": { strength: 10, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 14, charisma: 8 },
  "游荡者": { strength: 8, dexterity: 15, constitution: 13, intelligence: 12, wisdom: 10, charisma: 14 },
  "术士": { strength: 8, dexterity: 14, constitution: 13, intelligence: 10, wisdom: 12, charisma: 15 },
  "魔契师": { strength: 8, dexterity: 14, constitution: 13, intelligence: 10, wisdom: 12, charisma: 15 },
  "法师": { strength: 8, dexterity: 14, constitution: 13, intelligence: 15, wisdom: 12, charisma: 10 }
};
