import { SpellItem } from './types';
import { SPELL_DB_LEVEL_0 } from './data-spells-level0';
import { SPELL_DB_LEVEL_1 } from './data-spells-level1';
import { SPELL_DB_LEVEL_2 } from './data-spells-level2';
import { SPELL_DB_LEVEL_3 } from './data-spells-level3';
import { SPELL_DB_LEVEL_4 } from './data-spells-level4';
import { SPELL_DB_LEVEL_5 } from './data-spells-level5';
import { SPELL_DB_LEVEL_6 } from './data-spells-level6';
import { SPELL_DB_LEVEL_7 } from './data-spells-level7';
import { SPELL_DB_LEVEL_8 } from './data-spells-level8';
import { SPELL_DB_LEVEL_9 } from './data-spells-level9';

export const SPELL_DB: SpellItem[] = [
  ...SPELL_DB_LEVEL_0,
  ...SPELL_DB_LEVEL_1,
  ...SPELL_DB_LEVEL_2,
  ...SPELL_DB_LEVEL_3,
  ...SPELL_DB_LEVEL_4,
  ...SPELL_DB_LEVEL_5,
  ...SPELL_DB_LEVEL_6,
  ...SPELL_DB_LEVEL_7,
  ...SPELL_DB_LEVEL_8,
  ...SPELL_DB_LEVEL_9,
];
