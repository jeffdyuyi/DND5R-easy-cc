import { SubclassItem } from '../types';
import { BARBARIAN_SUBCLASSES } from './classes/barbarian';
import { BARD_SUBCLASSES } from './classes/bard';
import { CLERIC_SUBCLASSES } from './classes/cleric';
import { DRUID_SUBCLASSES } from './classes/druid';
import { FIGHTER_SUBCLASSES } from './classes/fighter';
import { MONK_SUBCLASSES } from './classes/monk';
import { PALADIN_SUBCLASSES } from './classes/paladin';
import { RANGER_SUBCLASSES } from './classes/ranger';
import { ROGUE_SUBCLASSES } from './classes/rogue';
import { SORCERER_SUBCLASSES } from './classes/sorcerer';
import { WARLOCK_SUBCLASSES } from './classes/warlock';
import { WIZARD_SUBCLASSES } from './classes/wizard';

export const SUBCLASS_DB: SubclassItem[] = [
  ...BARBARIAN_SUBCLASSES,
  ...BARD_SUBCLASSES,
  ...CLERIC_SUBCLASSES,
  ...DRUID_SUBCLASSES,
  ...FIGHTER_SUBCLASSES,
  ...MONK_SUBCLASSES,
  ...PALADIN_SUBCLASSES,
  ...RANGER_SUBCLASSES,
  ...ROGUE_SUBCLASSES,
  ...SORCERER_SUBCLASSES,
  ...WARLOCK_SUBCLASSES,
  ...WIZARD_SUBCLASSES
];
