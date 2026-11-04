import type { ResourceSnapshot } from '../../types';
import { EQUIPMENT_KINDS, isEquipmentKind } from '../content/resourceRegistry';
type EquipmentGroup = 'weapon' | 'armor' | 'shield' | 'ring' | 'focus' | 'wondrous' | 'gear' | 'other';
/** Read explicit type/structured fields; never infer a wearing slot from an item's name. */
export function equipmentGroup(item: ResourceSnapshot): EquipmentGroup {
    const fields = { ...item, ...item.fields };
    const code = String(item.inventoryMeta?.type || fields.itemTypeCode || '').split('|')[0];
    const armor = String(fields.armorCategory || '');
    const type = String(fields.type || '').trim();
    if (code === 'S' || /^盾牌/.test(armor) || /^(盾牌|shield)$/i.test(type))
        return 'shield';
    if (['LA', 'MA', 'HA'].includes(code) || armor || /^(护甲|盔甲|轻型护甲|中型护甲|重型护甲|armor)$/i.test(type))
        return 'armor';
    if (item.kind === 'weapons' || ['M', 'R'].includes(code) || fields.weaponCategory || /^(武器|weapon)$/i.test(type))
        return 'weapon';
    if (code === 'RG' || /^(戒指|ring)$/i.test(type))
        return 'ring';
    if (['ST', 'WD', 'RD', 'SCF'].includes(code) || /^(法杖|魔杖|权杖|施法法器|奥术法器|德鲁伊法器|圣徽|staff|wand|rod)$/i.test(type))
        return 'focus';
    if (fields.isWondrous === true || /^(奇物|wondrous item)$/i.test(type))
        return 'wondrous';
    if (['gears', 'tools'].includes(item.kind))
        return 'gear';
    return 'other';
}
export function selectionForSlot(slot: string): {
    label: string;
    kinds: readonly string[];
    accept: (item: ResourceSnapshot) => boolean;
    note: string;
} {
    let allowed: EquipmentGroup[], kinds: readonly string[], label: string, note = '';
    if (slot === 'armor') {
        allowed = ['armor'];
        kinds = ['armors', 'magicItems'];
        label = '护甲（含魔法护甲）';
    }
    else if (slot === 'main') {
        allowed = ['weapon', 'focus'];
        kinds = ['weapons', 'magicItems', 'gears'];
        label = '武器与手持法器';
    }
    else if (slot === 'off') {
        allowed = ['shield', 'weapon', 'focus'];
        kinds = ['armors', 'weapons', 'magicItems', 'gears'];
        label = '盾牌、副手武器与法器';
    }
    else if (slot === 'ring') {
        allowed = ['ring'];
        kinds = ['magicItems', 'gears'];
        label = '戒指';
    }
    else if (['head', 'cloak', 'gloves', 'boots', 'necklace', 'amulet', 'belt', 'legs', 'accessory'].includes(slot)) {
        allowed = ['wondrous', 'gear'];
        kinds = ['magicItems', 'gears'];
        label = '奇物与随身物品';
        note = '部分资料只注明“奇物”，没有具体穿戴部位。请查看原文后手动指定；需要时可放宽范围。';
    }
    else {
        allowed = ['weapon', 'armor', 'shield', 'ring', 'focus', 'wondrous', 'gear', 'other'];
        kinds = EQUIPMENT_KINDS;
        label = '全部随身物品';
    }
    return { label, kinds, note, accept: item => isEquipmentKind(item.kind) && allowed.includes(equipmentGroup(item)) };
}

/** Hard presentation positions, independent of expanding a picker to all items. */
export function canOccupySlot(item: ResourceSnapshot, slot: string) {
    if (slot.startsWith('extra-')) return true;
    if (slot.startsWith('ring-')) slot = 'ring';
    const group = equipmentGroup(item);
    if (group === 'weapon') return slot === 'main' || slot === 'off';
    if (group === 'armor') return slot === 'armor';
    if (group === 'shield') return slot === 'off';
    if (group === 'ring') return slot === 'ring';
    if (group === 'focus') return true;
    return true;
}

/** Unknown wearing position is a player decision, not an inferred rules property. */
export function isManualPlacement(item: ResourceSnapshot) {
    return !['weapon', 'armor', 'shield', 'ring'].includes(equipmentGroup(item));
}
