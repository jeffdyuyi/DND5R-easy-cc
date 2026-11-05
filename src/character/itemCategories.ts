import type { CharacterData, ResourceSnapshot } from '../../types';
import { resourceKey } from '../content/resourceIdentity';
export const itemTypeCode = (item: ResourceSnapshot) => String(item.inventoryMeta?.type || item.itemTypeCode || item.fields?.itemTypeCode || '').split('|')[0];
export const consumableTypes = ['A', 'AF', 'EXP', 'FD', 'P', 'SC'];
export function inventoryCategory(item: ResourceSnapshot) {
    const type = itemTypeCode(item);
    if (['$', '$A', '$C', '$G', 'TG', 'TB'].includes(type)) return 'treasure';
    if (['VEH', 'SHP', 'AIR', 'SPC', 'MNT', 'TAH', 'vehicle'].includes(type)) return 'vehicles';
    if (['AT', 'T', 'GS', 'INS'].includes(type) || item.kind === 'tools') return 'tools';
    if (consumableTypes.includes(type)) return 'consumables';
    if (['M', 'R'].includes(type) || item.kind === 'weapons') return 'weapons';
    if (['LA', 'MA', 'HA', 'S'].includes(type) || item.kind === 'armors') return 'armors';
    return item.kind === 'magicItems' ? 'magicItems' : 'gears';
}
export function isConsumable(item: ResourceSnapshot, c?: CharacterData) {
    const category = inventoryCategory(item);
    if (category === 'consumables') return true;
    if (['treasure', 'vehicles', 'tools'].includes(category)) return false;
    return c?.manualConsumables?.[resourceKey(item)] ?? item.inventoryMeta?.consumable === true;
}
export function inventorySection(item: ResourceSnapshot, c?: CharacterData) {
    return isConsumable(item, c) ? 'consumables' : inventoryCategory(item);
}
