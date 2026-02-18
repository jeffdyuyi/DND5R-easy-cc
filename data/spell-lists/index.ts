import { RANGER_SPELLS } from './ranger';
import { SORCERER_SPELLS } from './sorcerer';
import { WARLOCK_SPELLS } from './warlock';

import { WIZARD_SPELLS } from './wizard';

// Mapping of class name (Chinese) to their spell list
export const SPELL_LISTS_DB: Record<string, string[]> = {
    "游侠": RANGER_SPELLS,
    "术士": SORCERER_SPELLS,
    "魔契师": WARLOCK_SPELLS,
    "法师": WIZARD_SPELLS,
    // Add other classes here as their lists are created
};

export {
    RANGER_SPELLS,
    SORCERER_SPELLS,
    WARLOCK_SPELLS,
    WIZARD_SPELLS
};
