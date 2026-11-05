import type { CharacterData } from '../../types';
export const CHARACTERS_STORAGE_KEY = 'dnd_characters_v1';
export function validateCharacterList(value: unknown): value is CharacterData[] {
    if (!Array.isArray(value) || !value.every(validateCharacterData)) return false;
    return new Set(value.map(character => character.id)).size === value.length;
}
/** Recognize the existing save format without dropping unknown fields. */
export function validateCharacterData(value: unknown): value is CharacterData {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const data = value as Record<string, unknown>;
    const object = (v: any) => !!v && typeof v === 'object' && !Array.isArray(v);
    const card = (v: any) => object(v) && typeof v.id === 'string' && typeof v.kind === 'string' && typeof v.source === 'string' && typeof v.name === 'string';
    for (const field of ['resourceCards', 'inventoryEntries', 'extraEquipmentSlots']) if (data[field] !== undefined && !Array.isArray(data[field])) return false;
    if (Array.isArray(data.resourceCards) && !data.resourceCards.every(card)) return false;
    if (Array.isArray(data.inventoryEntries) && !data.inventoryEntries.every((v: any) => object(v) && typeof v.id === 'string' && card(v.item) && Number.isSafeInteger(v.quantity) && v.quantity >= 0 && v.quantity <= 10000)) return false;
    if (Array.isArray(data.inventoryEntries) && new Set(data.inventoryEntries.map((v: any) => v.id)).size !== data.inventoryEntries.length) return false;
    if (Array.isArray(data.extraEquipmentSlots) && !data.extraEquipmentSlots.every((v: any) => object(v) && typeof v.id === 'string' && typeof v.label === 'string')) return false;
    if (data.allowedResourceSources !== undefined && (!Array.isArray(data.allowedResourceSources) || !data.allowedResourceSources.every(v => typeof v === 'string'))) return false;
    for (const field of ['equippedResourceSlots', 'resourceCardSettings', 'resourceClassLevels', 'startingGrants', 'pocketCurrency', 'itemAttunement', 'resourceAttunement', 'manualConsumables']) if (data[field] !== undefined && !object(data[field])) return false;
    for (const field of ['itemAttunement', 'resourceAttunement', 'manualConsumables']) if (object(data[field]) && !Object.values(data[field] as object).every(value => typeof value === 'boolean')) return false;
    if (object(data.equippedResourceSlots) && !Object.values(data.equippedResourceSlots as object).every(card)) return false;
    for (const field of ['resourceClassLevels', 'pocketCurrency']) if (object(data[field]) && !Object.values(data[field] as object).every(value => typeof value === 'number' && Number.isFinite(value) && value >= 0)) return false;
    if (object(data.resourceCardSettings) && !Object.values(data.resourceCardSettings as object).every((settings: any) => object(settings) && ['quantity', 'totalUses', 'usedUses'].every(key => settings[key] === undefined || typeof settings[key] === 'number' && Number.isFinite(settings[key]) && settings[key] >= 0))) return false;
    if (data.quickRecord !== undefined) {
        const q = data.quickRecord as Record<string, any>;
        if (!object(q)) return false;
        for (const key of ['raceAbilityEnabled', 'backgroundAbilityEnabled']) if (q[key] !== undefined && typeof q[key] !== 'boolean') return false;
        if (q.notes !== undefined && typeof q.notes !== 'string') return false;
        if (q.proficiencyOverride !== undefined && (typeof q.proficiencyOverride !== 'number' || !Number.isFinite(q.proficiencyOverride) || q.proficiencyOverride < 0)) return false;
        for (const key of ['abilityOptions', 'abilityAdjustments', 'modifierOverrides', 'skillOptions', 'skillRanks', 'skillOverrides', 'saveRanks', 'saveOverrides', 'slotTotals', 'slotUsed', 'diceUsed']) {
            if (q[key] !== undefined && (!object(q[key]) || !Object.values(q[key]).every(value => value === undefined || typeof value === 'number' && Number.isSafeInteger(value)))) return false;
        }
        for (const key of ['abilityOptions', 'skillOptions', 'slotTotals', 'slotUsed', 'diceUsed']) if (object(q[key]) && !Object.values(q[key]).every(value => value === undefined || typeof value === 'number' && value >= 0 && value <= 10000)) return false;
        for (const [key, limit] of [['skillRanks', 2], ['saveRanks', 1]] as const) if (object(q[key]) && !Object.values(q[key]).every(value => value === undefined || typeof value === 'number' && value >= 0 && value <= limit)) return false;
        if (q.abilitySelections !== undefined && (!object(q.abilitySelections) || !Object.values(q.abilitySelections).every(value => typeof value === 'string'))) return false;
        if (q.skillSelections !== undefined && (!object(q.skillSelections) || !Object.values(q.skillSelections).every(value => Array.isArray(value) && value.every(item => typeof item === 'string')))) return false;
    }
    return typeof data.id === 'string'  && typeof data.name === 'string' && typeof data.className === 'string' && typeof data.level === 'number' && Number.isFinite(data.level) && !!data.abilities && typeof data.abilities === 'object' && !Array.isArray(data.abilities);
}
/** Fill missing legacy fields for reading; spread retains fields this version does not know. */
export function withCharacterDefaults(defaults: CharacterData, record: CharacterData): CharacterData {
    const merge = (template: any, value: any): any => {
        if (Array.isArray(template))
            return Array.isArray(value) ? value : structuredClone(template);
        if (template && typeof template === 'object') {
            const input = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
            const result = { ...structuredClone(template), ...input };
            for (const key of Object.keys(template))
                result[key] = merge(template[key], input[key]);
            return result;
        }
        return value === undefined ? template : value;
    };
    return merge(defaults, record);
}
