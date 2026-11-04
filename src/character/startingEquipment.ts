import type { CharacterData, InventoryEntry, ResourceSnapshot } from '../../types';
import { characterAllows, resourceKey } from '../content/resourceIdentity';
import { changeCopper, buildSources } from './inventory';

export type EquipmentAtom = string | Record<string, any>;
export function equipmentGroups(source: ResourceSnapshot): Record<string, EquipmentAtom[]>[] {
    const data = source.buildData?.startingEquipment;
    const groups = Array.isArray(data) ? data : data?.defaultData;
    return Array.isArray(groups) && groups.every(group => group && typeof group === 'object' && !Array.isArray(group) && Object.keys(group).length > 0 && Object.values(group).every(values => Array.isArray(values) && values.every(atom => typeof atom === 'string' || !!atom && typeof atom === 'object' && !Array.isArray(atom)))) ? groups : [];
}
const norm = (value: unknown) => typeof value === 'string' ? value.trim().toLowerCase() : '';
export function resolveEquipment(uid: string, source: ResourceSnapshot, catalog: ResourceSnapshot[]) {
    if (typeof uid !== 'string' || !uid.trim()) return undefined;
    const [name, code = source.source] = uid.split('|');
    const hits = catalog.filter(item => item.inventoryMeta && item.sourceProvider === source.sourceProvider &&
        [item.source, ...(item.inventoryMeta.otherSources || [])].some(value => norm(value) === norm(code)) &&
        [item.name, item.englishName, item.srdEnglishName].some(value => typeof value === 'string' && norm(value) === norm(name)));
    const direct = hits.filter(item => norm(item.source) === norm(code));
    return direct.length === 1 ? direct[0] : hits.length === 1 ? hits[0] : undefined;
}
const typeRules: Record<string, (item: ResourceSnapshot) => boolean> = {
    weaponSimple: i => i.inventoryMeta?.weaponCategory === 'simple',
    weaponMartial: i => i.inventoryMeta?.weaponCategory === 'martial',
    weaponSimpleMelee: i => i.inventoryMeta?.weaponCategory === 'simple' && i.inventoryMeta?.type === 'M',
    weaponMartialMelee: i => i.inventoryMeta?.weaponCategory === 'martial' && i.inventoryMeta?.type === 'M',
    toolArtisan: i => i.inventoryMeta?.type === 'AT',
    instrumentMusical: i => i.inventoryMeta?.type === 'INS',
    setGaming: i => i.inventoryMeta?.type === 'GS',
    focusSpellcastingArcane: i => i.inventoryMeta?.type === 'SCF' && i.inventoryMeta?.focusType === 'arcane',
    focusSpellcastingDruidic: i => i.inventoryMeta?.type === 'SCF' && i.inventoryMeta?.focusType === 'druid',
    focusSpellcastingHoly: i => i.inventoryMeta?.type === 'SCF' && i.inventoryMeta?.focusType === 'holy',
};
export const equipmentTypeNames: Record<string, string> = { weaponSimple: '简易武器', weaponMartial: '军用武器', weaponSimpleMelee: '简易近战武器', weaponMartialMelee: '军用近战武器', toolArtisan: '工匠工具', instrumentMusical: '乐器', setGaming: '游戏套组', focusSpellcastingArcane: '奥术法器', focusSpellcastingDruidic: '德鲁伊法器', focusSpellcastingHoly: '圣徽' };
export function equipmentCandidates(atom: Record<string, any>, source: ResourceSnapshot, c: CharacterData, catalog: ResourceSnapshot[]) {
    const types = atom.equipmentTypes || [atom.equipmentType];
    if (!Array.isArray(types) || types.some((type: unknown) => typeof type !== 'string')) return [];
    return catalog.filter(item => item.sourceProvider === source.sourceProvider && characterAllows(c, item) && types.some((type: string) => Object.hasOwn(typeRules, type) ? typeRules[type](item) : norm(item.inventoryMeta?.typeName) === norm(type)));
}
export function resolveAtom(atom: EquipmentAtom, source: ResourceSnapshot, catalog: ResourceSnapshot[], selected?: string) {
    if (!atom || typeof atom !== 'string' && (typeof atom !== 'object' || Array.isArray(atom))) return { error: '未支持的装备结构' };
    const raw = typeof atom === 'string' ? { item: atom } : atom;
    const unknown = Object.keys(raw).filter(key => !['item', 'quantity', 'displayName', 'value', 'special', 'containsValue', 'worthValue', 'equipmentType', 'equipmentTypes'].includes(key));
    if (unknown.length) return { error: '未接入的装备字段：' + unknown.join('、') };
    const quantity = raw.quantity ?? 1;
    if (!Number.isInteger(quantity) || quantity < 1) return { error: '数量需核对：' + String(quantity) };
    if (raw.value !== undefined) return quantity === 1 && Number.isSafeInteger(raw.value) && raw.value >= 0 ? { copper: raw.value, quantity: 1 } : { error: '钱币数值需核对' };
    let item = raw.item ? resolveEquipment(raw.item, source, catalog) : selected ? catalog.find(i => resourceKey(i) === selected) : undefined;
    if (raw.special && !item) item = { id: 'equipment-note:' + raw.special, kind: 'gears', name: raw.special, source: source.source, sourceProvider: source.sourceProvider, contentOrigin: 'starting-equipment-note', fullDescription: raw.special, provenance: source.provenance };
    if (!item) return { error: raw.item ? '无法唯一定位：' + raw.item : '请选择：' + (equipmentTypeNames[raw.equipmentType] || raw.equipmentTypes?.join(' / ') || '物品') };
    if (raw.containsValue !== undefined && (!Number.isInteger(raw.containsValue) || raw.containsValue < 0)) return { error: '容器内钱币数值需核对' };
    return { item: { ...item, ...(raw.displayName ? { name: raw.displayName } : {}), ...(raw.worthValue !== undefined ? { startingWorthCopper: raw.worthValue } : {}) }, quantity, containedCopper: raw.containsValue, worthValue: raw.worthValue };
}
export function receiveEquipment(c: CharacterData, source: ResourceSnapshot, atoms: { atom: EquipmentAtom; choice?: string }[], choices: Record<string, string>, catalog: ResourceSnapshot[]): Partial<CharacterData> | null {
    const key = resourceKey(source);
    if (c.startingGrants?.[key] || !buildSources(c).some(item => resourceKey(item) === key) || !atoms.length) return null;
    if (atoms.some(({ atom, choice }) => typeof atom !== 'string' && (atom.equipmentType || atom.equipmentTypes) && !equipmentCandidates(atom, source, c, catalog).some(item => resourceKey(item) === choice))) return null;
    const rows = atoms.map(row => resolveAtom(row.atom, source, catalog, row.choice));
    if (rows.some(row => row.error)) return null;
    const copper = rows.reduce((sum, row) => sum + (row.copper || 0), 0);
    const entries: InventoryEntry[] = rows.filter(row => row.item).map(row => ({ id: crypto.randomUUID(), item: structuredClone(row.item!), quantity: row.quantity!, containedCopper: row.containedCopper, originKey: key, originName: source.name }));
    return { inventoryEntries: [...(c.inventoryEntries || []), ...entries], pocketCurrency: changeCopper(c, copper), startingGrants: { ...c.startingGrants, [key]: { sourceKey: key, sourceName: source.name, copper, choices } } };
}
