import type { CharacterData, InventoryEntry, ResourceSnapshot } from '../../types';
import { resourceKey } from '../content/resourceIdentity';
import { canOccupySlot, isManualPlacement } from './equipmentSelection';
import { EQUIPMENT_KINDS } from '../content/resourceRegistry';

export function initialClass(c: CharacterData) {
    const classes = (c.resourceCards || []).filter(item => item.kind === 'classes');
    return classes.find(item => resourceKey(item) === c.initialClassKey) || classes[0];
}
export function buildSources(c: CharacterData) {
    const main = initialClass(c);
    return (c.resourceCards || []).filter(item => item.kind === 'backgrounds' || item === main);
}
export function isConsumable(item: ResourceSnapshot, c?: CharacterData) {
    const override = c?.manualConsumables?.[resourceKey(item)];
    return override ?? item.inventoryMeta?.consumable === true;
}
export function inventoryCategory(item: ResourceSnapshot) {
    const type = item.inventoryMeta?.type || item.itemTypeCode || item.fields?.itemTypeCode;
    if (['M', 'R'].includes(type) || item.kind === 'weapons') return 'weapons';
    if (['LA', 'MA', 'HA', 'S'].includes(type) || item.kind === 'armors') return 'armors';
    if (['AT', 'T', 'GS', 'INS'].includes(type) || item.kind === 'tools') return 'tools';
    return item.kind === 'magicItems' ? 'magicItems' : 'gears';
}
/** Display one row per identity, with separate provenance lots underneath. */
export function inventoryLots(c: CharacterData): InventoryEntry[] {
    return [...(c.resourceCards || []).filter(item => EQUIPMENT_KINDS.includes(item.kind)).map(item => ({
        id: 'manual:' + resourceKey(item), item,
        quantity: c.resourceCardSettings?.[resourceKey(item)]?.quantity ?? 1,
    })), ...(c.inventoryEntries || [])];
}
const units: Record<string, number> = { cp: 1, sp: 10, ep: 50, gp: 100, pp: 1000 };
export function currency(c: CharacterData) {
    return { cp: c.pocketCurrency?.cp ?? c.copper ?? 0, sp: c.pocketCurrency?.sp ?? c.silver ?? 0, ep: c.pocketCurrency?.ep ?? 0, gp: c.pocketCurrency?.gp ?? c.gold ?? 0, pp: c.pocketCurrency?.pp ?? c.platinum ?? 0 };
}
export function changeCopper(c: CharacterData, amount: number) {
    const coins = currency(c);
    let left = Math.max(0, Object.entries(coins).reduce((n, [key, value]) => n + value * units[key], 0) + amount);
    // Preserve current denominations where possible, adding/removing through copper.
    if (amount >= 0) return { ...coins, gp: coins.gp + Math.floor(amount / 100), cp: coins.cp + amount % 100 };
    const result = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
    for (const key of ['pp', 'gp', 'ep', 'sp', 'cp'] as const) { result[key] = Math.floor(left / units[key]); left %= units[key]; }
    return result;
}
export function clearStartingGrants(c: CharacterData, keys: string[]): Partial<CharacterData> {
    const selected = new Set(keys), grants = { ...c.startingGrants };


    keys.forEach(key => delete grants[key]);
    return {
        startingGrants: grants,
        inventoryEntries: (c.inventoryEntries || []).filter(entry => !entry.originKey || !selected.has(entry.originKey)),

        ...pruneItemState(c, (c.inventoryEntries || []).filter(entry => !entry.originKey || !selected.has(entry.originKey))),
    };
}
export function grantRemovalMessage(c: CharacterData, keys: string[]) {
    const grants = Object.values(c.startingGrants || {}).filter(grant => keys.includes(grant.sourceKey));
    return grants.length ? '此操作将清除“' + grants.map(grant => grant.sourceName).join('、') + '”已领取的起始装备（含已展开的包内物品）。钱币余额不自动调整，请按实际情况手动核对。手动添加的物品保留。继续后需重新选择装备。' : '';
}

/** Remove this inventory identity, leaving grant receipts intact to prevent duplicate claims. */
export function deleteInventoryItem(c: CharacterData, item: ResourceSnapshot): Partial<CharacterData> {
    const key = resourceKey(item);
    const settings = { ...c.resourceCardSettings }; delete settings[key];
    const consumables = { ...c.manualConsumables }; delete consumables[key];
    return {
        resourceCards: (c.resourceCards || []).filter(card => resourceKey(card) !== key),
        inventoryEntries: (c.inventoryEntries || []).filter(entry => resourceKey(entry.item) !== key),
        equippedResourceSlots: Object.fromEntries(Object.entries(c.equippedResourceSlots || {}).filter(([, worn]) => resourceKey(worn) !== key)),
        attunedResourceSlots: Object.fromEntries(Object.entries(c.attunedResourceSlots || {}).filter(([, worn]) => !worn || resourceKey(worn) !== key)),
        resourceAttunement: { ...c.resourceAttunement, [key]: false },
        resourceCardSettings: settings, manualConsumables: consumables,
        itemAttunement: Object.fromEntries(Object.entries(c.itemAttunement || {}).filter(([id]) => !itemInstances(c, item).some(i => i.inventoryInstanceId === id))),
    };
}

/** Stable virtual instances preserve lot provenance without duplicating resource snapshots. */
export function itemInstances(c: CharacterData, item?: ResourceSnapshot) {
    return inventoryLots(c).filter(lot => !item || resourceKey(lot.item) === resourceKey(item)).flatMap(lot =>
        Array.from({ length: Math.max(0, Math.min(10000, Math.trunc(lot.quantity))) }, (_, index) => ({
            ...lot.item, inventoryEntryId: lot.id, inventoryInstanceId: lot.id + ':' + index,
        })));
}
export function instanceAttuned(c: CharacterData, item: ResourceSnapshot) {
    if (item.inventoryInstanceId && c.itemAttunement?.[item.inventoryInstanceId] !== undefined) return c.itemAttunement[item.inventoryInstanceId];
    const first = itemInstances(c, item)[0];
    const legacy = c.resourceAttunement?.[resourceKey(item)] ?? Object.values(c.attunedResourceSlots || {}).some(old => old && resourceKey(old) === resourceKey(item));
    if (!item.inventoryInstanceId) return itemInstances(c, item).some(instance => instanceAttuned(c, instance));
    return !!legacy && first?.inventoryInstanceId === item.inventoryInstanceId;
}
export function pruneItemState(c: CharacterData, entries = c.inventoryEntries || [], cards = c.resourceCards || []) {
    const priorKeys = new Set(inventoryLots(c).map(lot => resourceKey(lot.item)));
    const available = itemInstances({ ...c, inventoryEntries: entries, resourceCards: cards });
    const ids = new Set(available.map(item => item.inventoryInstanceId));
    const used = new Set<string>();
    const equippedResourceSlots: Record<string, ResourceSnapshot> = {};
    for (const [slot, worn] of Object.entries(c.equippedResourceSlots || {})) {
        if (!priorKeys.has(resourceKey(worn))) { equippedResourceSlots[slot] = worn; continue; }
        const instance = worn.inventoryInstanceId ? available.find(i => i.inventoryInstanceId === worn.inventoryInstanceId) : available.find(i => resourceKey(i) === resourceKey(worn) && (!worn.inventoryEntryId || i.inventoryEntryId === worn.inventoryEntryId) && !used.has(i.inventoryInstanceId));
        if (instance && !used.has(instance.inventoryInstanceId)) { used.add(instance.inventoryInstanceId); equippedResourceSlots[slot] = { ...worn, inventoryEntryId: instance.inventoryEntryId, inventoryInstanceId: instance.inventoryInstanceId }; }
    }
    const itemAttunement = { ...Object.fromEntries(itemInstances(c).filter(item => instanceAttuned(c, item)).map(item => [item.inventoryInstanceId, true])), ...c.itemAttunement };
    const resourceAttunement = { ...c.resourceAttunement };
    for (const item of itemInstances(c)) resourceAttunement[resourceKey(item)] = false;
    return { equippedResourceSlots, resourceAttunement, itemAttunement: Object.fromEntries(Object.entries(itemAttunement).filter(([id]) => ids.has(id))) };
}
export function setInventoryQuantity(c: CharacterData, lot: InventoryEntry, quantity: number): Partial<CharacterData> {
    const value = Math.max(0, Math.min(10000, Math.trunc(quantity)));
    const changes = lot.id.startsWith('manual:') ? { resourceCardSettings: { ...c.resourceCardSettings, [resourceKey(lot.item)]: { ...c.resourceCardSettings?.[resourceKey(lot.item)], quantity: value } } } : { inventoryEntries: (c.inventoryEntries || []).map(entry => entry.id === lot.id ? { ...entry, quantity: value } : entry) };
    const next = { ...c, ...changes };
    return { ...changes, ...pruneItemState(next) };
}
export function equipInventoryItem(c: CharacterData, item: ResourceSnapshot, position: string): Partial<CharacterData> | null {
    if (!canOccupySlot(item, position)) return null;
    const next = { ...pruneItemState(c).equippedResourceSlots };
    const slot = position === 'ring' ? (!next.ring ? 'ring' : 'ring-' + crypto.randomUUID()) : position;
    const instances = itemInstances(c, item);
    const used = new Set(Object.values(pruneItemState(c).equippedResourceSlots).map(worn => worn.inventoryInstanceId));
    const instance = instances.find(i => i.inventoryInstanceId === item.inventoryInstanceId) || instances.find(i => i.inventoryEntryId === item.inventoryEntryId && !used.has(i.inventoryInstanceId)) || instances.find(i => !used.has(i.inventoryInstanceId)) || instances[0];
    if (!instance) return null;
    for (const [id, worn] of Object.entries(next)) if (worn.inventoryInstanceId === instance.inventoryInstanceId || !worn.inventoryInstanceId && worn.inventoryEntryId === instance.inventoryEntryId && instances.length === 1) delete next[id];
    next[slot] = { ...instance, equipmentPlacement: isManualPlacement(item) ? 'manual' : 'typed' };
    return { equippedResourceSlots: next };
}
export function isCurrencyItem(item: ResourceSnapshot) {
    return String(item.inventoryMeta?.type || item.itemTypeCode || item.fields?.itemTypeCode || '').split('|')[0] === '$C';
}
