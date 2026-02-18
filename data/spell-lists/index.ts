import { RANGER_SPELLS } from './ranger';
import { SORCERER_SPELLS } from './sorcerer';

// Mapping of class name (Chinese) to their spell list
export const SPELL_LISTS_DB: Record<string, string[]> = {
    "游侠": RANGER_SPELLS,
    "术士": SORCERER_SPELLS,
    // Add other classes here as their lists are created
};

export {
    RANGER_SPELLS,
    SORCERER_SPELLS
};
