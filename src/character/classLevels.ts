import type { CharacterData, ResourceSnapshot } from '../../types';
import { resourceKey } from '../content/resourceIdentity';
/** One level interpretation for the editor and overview, including legacy saves. */
export function classLevel(c: CharacterData, item: ResourceSnapshot, index: number) {
    const rest = (c.resourceCards || []).filter(row => row.kind === 'classes' && resourceKey(row) !== resourceKey(item));
    const value = c.resourceClassLevels?.[resourceKey(item)] ?? (index === 0 ? Math.max(1, c.level - rest.reduce((sum, row) => sum + (c.resourceClassLevels?.[resourceKey(row)] || 0), 0)) : 1);
    return Math.max(1, Math.min(20, Math.trunc(value)));
}
