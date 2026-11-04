import { instanceAttuned, clearStartingGrants, initialClass } from './inventory';
import type { CharacterData, ResourceSnapshot } from '../../types';
import { characterAllows, resourceKey } from '../content/resourceIdentity';
export function isSingleSelection(character: CharacterData, kind: string, group?: string): boolean {
    return kind === 'species' || kind === 'backgrounds' || kind === 'subclasses' && !!group || !character.multiclassEnabled && (kind === 'classes' || kind === 'subclasses');
}
export function selectResource(character: CharacterData, item: ResourceSnapshot, group?: string): Partial<CharacterData> | null {
    if (!characterAllows(character, item))
        return null;
    const single = isSingleSelection(character, item.kind, group), key = resourceKey(item);
    const snapshot = { ...structuredClone(item), ...(group ? { characterSelectionGroup: group } : {}) };
    const oldCards = character.resourceCards || [];
    const main = initialClass(character);
    const replaces = (old: ResourceSnapshot) => resourceKey(old) === key || (single && old.kind === item.kind && (!group || old.characterSelectionGroup === group) && (item.kind !== 'classes' || old === main));
    const position = oldCards.findIndex(replaces);
    const cards = oldCards.filter(old => !replaces(old));
    cards.splice(position < 0 ? cards.length : Math.min(position, cards.length), 0, snapshot);
    const removedKeys = oldCards.filter(old => replaces(old) && resourceKey(old) !== key).map(resourceKey);
    const updates: Partial<CharacterData> = { ...clearStartingGrants(character, removedKeys), resourceCards: cards };
    if (item.kind === 'classes' && (!main || character.initialClassKey === resourceKey(main) && replaces(main))) updates.initialClassKey = key;
    if (item.kind === 'species')
        updates.race = item.name;
    if (item.kind === 'backgrounds')
        updates.background = item.name;
    if (item.kind === 'classes' && (!character.multiclassEnabled || !character.className))
        updates.className = item.name;
    if (item.kind === 'subclasses' && (!character.multiclassEnabled || !character.subclass))
        updates.subclass = item.name;
    return updates;
}
export function removeResource(character: CharacterData, item: ResourceSnapshot): Partial<CharacterData> {
    const cards = (character.resourceCards || []).filter(old => resourceKey(old) !== resourceKey(item));
    const updates: Partial<CharacterData> = { ...clearStartingGrants(character, [resourceKey(item)]), resourceCards: cards };
    if (character.initialClassKey === resourceKey(item)) updates.initialClassKey = cards.find(card => card.kind === 'classes') ? resourceKey(cards.find(card => card.kind === 'classes')!) : undefined;
    if (item.kind === 'classes') {
        const previous = (character.resourceCards || []).filter(card => card.kind === 'classes');
        const levels = { ...character.resourceClassLevels };
        previous.forEach((card, index) => {
            const key = resourceKey(card);
            if (levels[key] === undefined) levels[key] = index === 0
                ? Math.max(1, character.level - previous.slice(1).reduce((sum, other) => sum + (levels[resourceKey(other)] || 0), 0)) : 1;
        });
        const remaining = cards.filter(card => card.kind === 'classes');
        const nextInitial = initialClass({ ...character, ...updates, resourceCards: cards });
        const active = character.multiclassEnabled ? remaining : remaining.filter(card => card === nextInitial);
        updates.level = active.reduce((sum, card) => sum + (levels[resourceKey(card)] || 1), 0);
        updates.resourceClassLevels = levels;
    }
    const fields: Record<string, 'race' | 'background' | 'className' | 'subclass'> = { species: 'race', backgrounds: 'background', classes: 'className', subclasses: 'subclass' };
    const field = fields[item.kind];
    if (field && character[field] === item.name)
        updates[field] = cards.find(card => card.kind === item.kind)?.name || '';
    return updates;
}
export function itemIsAttuned(character: CharacterData, item: ResourceSnapshot): boolean {
    return instanceAttuned(character, item);
}

/** Refresh every displayed copy of one identity, keeping manual settings separate. */
export function refreshCharacterSnapshot(character: CharacterData, snapshot: ResourceSnapshot): Partial<CharacterData> {
    const key = resourceKey(snapshot);
    const replace = (old: ResourceSnapshot) => resourceKey(old) === key
        ? { ...old, ...structuredClone(snapshot), characterSelectionGroup: old.characterSelectionGroup, inventoryEntryId: old.inventoryEntryId } : old;
    const updates: Partial<CharacterData> = { resourceCards: (character.resourceCards || []).map(replace) };
    if (character.inventoryEntries) updates.inventoryEntries = character.inventoryEntries.map(entry => ({ ...entry, item: replace(entry.item) }));
    if (character.equippedResourceSlots) updates.equippedResourceSlots = Object.fromEntries(Object.entries(character.equippedResourceSlots).map(([slot, item]) => [slot, replace(item)]));
    return updates;
}
