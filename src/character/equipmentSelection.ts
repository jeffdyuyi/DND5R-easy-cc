import { coreFocusForm } from '../content/fiveetools/itemMetadata';
import type { ResourceSnapshot } from '../../types';
import { isEquipmentKind } from '../content/resourceRegistry';
import { itemTypeCode, inventoryCategory } from './itemCategories';
type EquipmentGroup = 'weapon' | 'armor' | 'shield' | 'ring' | 'focus' | 'wondrous' | 'gear' | 'other';
const wearables = ['head', 'cloak', 'gloves', 'boots', 'necklace', 'amulet'];
const labels: Record<string, string> = { head:'头部', cloak:'斗篷', gloves:'手套', boots:'鞋子', necklace:'项链', amulet:'护符' };
export function equipmentGroup(item: ResourceSnapshot): EquipmentGroup {
    const fields = { ...item, ...item.fields }, code = itemTypeCode(item);
    if (['treasure', 'vehicles', 'tools', 'consumables'].includes(inventoryCategory(item))) return 'other';
    if (code === 'S' || /^盾牌/.test(String(fields.armorCategory || ''))) return 'shield';
    if (['LA','MA','HA'].includes(code) || fields.armorCategory || item.kind === 'armors') return 'armor';
    if (['M','R'].includes(code) || item.kind === 'weapons' || fields.weaponCategory) return 'weapon';
    if (code === 'RG' || /^(戒指|ring)$/i.test(String(fields.type || ''))) return 'ring';
    if (['ST','WD','RD','SCF'].includes(code) || item.inventoryMeta?.staff || item.staff) return 'focus';
    if (fields.isWondrous === true || /^(奇物|wondrous item)$/i.test(String(fields.type || ''))) return 'wondrous';
    return item.kind === 'gears' ? 'gear' : 'other';
}
export function focusForm(item: ResourceSnapshot): 'held' | 'worn-or-held' | 'attached' | 'unknown' {
    const code = itemTypeCode(item), meta = item.inventoryMeta;
    if (['held','worn-or-held','attached'].includes(meta?.focusForm)) return meta.focusForm;
    if (['ST','WD','RD'].includes(code) || meta?.staff || item.staff) return 'held';
    if (code === 'SCF' && ['arcane','druid'].includes(meta?.focusType || item.scfType)) return 'held';
    return coreFocusForm({ source:item.source, scfType:meta?.focusType || item.scfType, ENG_name:item.englishName, name:item.name }, item.sourceProvider || '') || 'unknown';
}
/** Explicit name keywords are UI suggestions, never upstream rules or a new item type. */
export function suggestedSlots(item: ResourceSnapshot): string[] {
    const group = equipmentGroup(item);
    if (!['wondrous','gear'].includes(group)) return [];
    const name = [item.name, item.englishName].filter(Boolean).join(' ');
    const tests: [string, RegExp][] = [
        ['head', /头盔|头饰|头环|冠冕|王冠|兜帽|帽子|\b(?:helm(?:et)?|hat|crown|circlet|hood|headband)\b/i],
        ['cloak', /斗篷|披风|\b(?:cloak|cape)\b/i],
        ['gloves', /手套|\b(?:gloves?|gauntlets?)\b/i],
        ['boots', /靴|鞋子|便鞋|\b(?:boots?|shoes?|slippers?)\b/i],
        ['necklace', /项链|项圈|\b(?:necklace|choker)\b/i],
        ['amulet', /护符|吊坠|\b(?:amulet|pendant|talisman)\b/i],
    ];
    return tests.filter(([, test]) => test.test(name)).map(([slot]) => slot);
}
export function canOccupySlot(item: ResourceSnapshot, position: string) {
    if (!isEquipmentKind(item.kind)) return false;
    if (position.startsWith('extra-')) return isEquipmentKind(item.kind);
    const slot = position.startsWith('ring-') ? 'ring' : position, group = equipmentGroup(item);
    if (group === 'weapon') return slot === 'main' || slot === 'off';
    if (group === 'armor') return slot === 'armor';
    if (group === 'shield') return slot === 'off';
    if (group === 'ring') return slot === 'ring';
    if (group === 'focus') {
        const form = focusForm(item);
        return (form === 'held' || form === 'worn-or-held') && ['main','off'].includes(slot) || form === 'worn-or-held' && slot === 'amulet';
    }
    if (group === 'wondrous') return wearables.includes(slot);
    if (group === 'gear') return suggestedSlots(item).includes(slot);
    return false;
}
export function equipmentCandidate(item: ResourceSnapshot, slot: string, manual = false) {
    if (!canOccupySlot(item, slot)) return false;
    if (slot.startsWith('extra-') || !['wondrous','gear'].includes(equipmentGroup(item))) return true;
    return suggestedSlots(item).includes(slot) || manual && equipmentGroup(item) === 'wondrous';
}
export function isManualPlacement(item: ResourceSnapshot) {
    return ['wondrous','gear','other'].includes(equipmentGroup(item)) || equipmentGroup(item) === 'focus' && ['unknown','attached'].includes(focusForm(item));
}
export function placementKind(item: ResourceSnapshot, slot: string): 'typed' | 'manual' | 'name-suggestion' {
    if (suggestedSlots(item).includes(slot)) return 'name-suggestion';
    return isManualPlacement(item) ? 'manual' : 'typed';
}
export function placementHint(item: ResourceSnapshot, slot?: string) {
    if (slot && placementKind(item, slot) === 'name-suggestion') return '名称建议';
    if (equipmentGroup(item) === 'focus' && focusForm(item) === 'attached') return '附着型法器：在额外物品记录，不替换盾牌';
    const suggested = suggestedSlots(item);
    return suggested.length ? '名称建议：' + suggested.map(id => labels[id]).join(' / ') : isManualPlacement(item) ? '默认额外物品；穿戴部位需手动核对' : '';
}
