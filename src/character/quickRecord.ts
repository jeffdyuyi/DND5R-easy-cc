import { classLevel } from './classLevels';
import type { CharacterData, ResourceSnapshot } from '../../types';
import { initialClass } from './inventory';
import { resourceKey } from '../content/resourceIdentity';

export const abilities = [
    ['str', 'strength', '力量'], ['dex', 'dexterity', '敏捷'], ['con', 'constitution', '体质'],
    ['int', 'intelligence', '智力'], ['wis', 'wisdom', '感知'], ['cha', 'charisma', '魅力'],
] as const;
export const skills = [
    ['athletics', '运动', 'str'], ['acrobatics', '杂技', 'dex'], ['sleight of hand', '巧手', 'dex'], ['stealth', '隐匿', 'dex'],
    ['arcana', '奥秘', 'int'], ['history', '历史', 'int'], ['investigation', '调查', 'int'], ['nature', '自然', 'int'], ['religion', '宗教', 'int'],
    ['animal handling', '驯兽', 'wis'], ['insight', '洞悉', 'wis'], ['medicine', '医药', 'wis'], ['perception', '察觉', 'wis'], ['survival', '生存', 'wis'],
    ['deception', '欺瞒', 'cha'], ['intimidation', '威吓', 'cha'], ['performance', '表演', 'cha'], ['persuasion', '游说', 'cha'],
] as const;
export const skillLabel = (key: string) => skills.find(row => row[0] === key)?.[1] || key;
export function buildData(item: ResourceSnapshot, catalog: ResourceSnapshot[]) {
    const live = catalog.find(row => resourceKey(row) === resourceKey(item));
    // Fill fields absent from old snapshots. Existing snapshot values remain authoritative.
    return { ...live?.buildData, ...item.buildData } as Record<string, any>;
}
export function activeClasses(c: CharacterData) {
    const main = initialClass(c);
    const all = (c.resourceCards || []).filter(item => item.kind === 'classes');
    return c.multiclassEnabled ? all : all.filter(item => item === main);
}
export function levels(c: CharacterData) {
    const all = (c.resourceCards || []).filter(item => item.kind === 'classes');
    return activeClasses(c).map(item => ({ item, level: classLevel(c, item, all.indexOf(item)) }));
}
export function proficiencyBonus(c: CharacterData) {
    const total = levels(c).reduce((sum, row) => sum + row.level, 0);
    return { total, calculated: total >= 1 && total <= 20 ? 2 + Math.floor((total - 1) / 4) : undefined };
}
export interface AbilityChoice { id: string; from: string[]; amount: number }
export function abilityPlan(raw: any, id: string): { fixed: Record<string, number>; choices: AbilityChoice[]; supported: boolean } {
    const fixed: Record<string, number> = {}, choices: AbilityChoice[] = [];
    let supported = !!raw && typeof raw === 'object';
    if (!supported) return { fixed, choices, supported };
    for (const [key, value] of Object.entries(raw)) {
        if (abilities.some(row => row[0] === key) && typeof value === 'number' && Number.isFinite(value)) fixed[key] = value;
        else if (key !== 'choose') supported = false;
    }
    if (raw.choose) {
        const choice = raw.choose, weighted = choice.weighted;
        const from = weighted?.from || choice.from;
        const count = choice.count ?? 1;
        const weights = weighted?.weights || (Number.isSafeInteger(count) && count >= 1 && count <= 6 ? Array.from({ length: count }, () => choice.amount ?? 1) : []);
        if (!Array.isArray(from) || !from.length || !from.every(key => abilities.some(row => row[0] === key)) || !Array.isArray(weights) || !weights.length || weights.length > 6 || !weights.every(v => typeof v === 'number' && Number.isFinite(v))) supported = false;
        else weights.forEach((amount, index) => choices.push({ id: id + ':' + index, from, amount }));
    }
    return { fixed, choices, supported };
}
export function abilitySources(c: CharacterData, catalog: ResourceSnapshot[]) {
    return (c.resourceCards || []).filter(item => ['species', 'backgrounds'].includes(item.kind)).flatMap(item => {
        const data = buildData(item, catalog);
        return [data.inheritedStructuredFields?.ability, data.ability].filter(Array.isArray).map((options, index) => {
            const id = resourceKey(item) + ':ability:' + index;
            const option = Math.max(0, Math.min(options.length - 1, c.quickRecord?.abilityOptions?.[id] || 0));
            const plan = abilityPlan(options[option], id + ':' + option);
            const enabled = item.kind === 'species' ? c.quickRecord?.raceAbilityEnabled !== false : c.quickRecord?.backgroundAbilityEnabled !== false;
            const values = { ...plan.fixed }, used = new Set<string>();
            for (const choice of plan.choices) {
                const value = c.quickRecord?.abilitySelections?.[choice.id];
                if (value && choice.from.includes(value) && !used.has(value)) { values[value] = (values[value] || 0) + choice.amount; used.add(value); }
            }
            return { id, item, options, option, plan, enabled, values, pending: plan.choices.length - used.size };
        });
    });
}
export function abilityScores(c: CharacterData, catalog: ResourceSnapshot[]) {
    const sources = abilitySources(c, catalog);
    return abilities.map(([key, field, label]) => {
        const base = c.abilities[field] ?? 10;
        const granted = sources.filter(s => s.enabled && s.plan.supported).reduce((sum, source) => sum + (source.values[key] || 0), 0);
        const adjustment = c.quickRecord?.abilityAdjustments?.[key] || 0;
        const total = base + granted + adjustment;
        const calculated = Math.floor((total - 10) / 2);
        return { key, field, label, base, granted, adjustment, total, calculated, modifier: c.quickRecord?.modifierOverrides?.[key] ?? calculated };
    });
}
export interface SkillGrant { id: string; item: ResourceSnapshot; label: string; options: any[]; option: number; fixed: string[]; choices: { id: string; from: string[]; count: number; selected: string[] }[]; supported: boolean }
export function skillGrants(c: CharacterData, catalog: ResourceSnapshot[]): SkillGrant[] {
    const main = initialClass(c), rows: SkillGrant[] = [];
    const cards = (c.resourceCards || []).filter(item => ['species', 'backgrounds'].includes(item.kind) || activeClasses(c).includes(item));
    for (const item of cards) {
        const data = buildData(item, catalog), isMain = item === main;
        const raws = item.kind === 'classes' ? [isMain ? data.startingProficiencies?.skills : data.multiclassing?.proficienciesGained?.skills || data.multiclassing?.proficienciesGained?.skillProficiencies] : [data.inheritedStructuredFields?.skillProficiencies, data.skillProficiencies];
        raws.filter(Array.isArray).forEach((options, group) => {
            if (!options.length) return;
            const id = resourceKey(item) + ':skills:' + group;
            const option = Math.max(0, Math.min(options.length - 1, c.quickRecord?.skillOptions?.[id] || 0));
            const raw = options[option], fixed: string[] = [], choices: SkillGrant['choices'] = [];
            let supported = !!raw && typeof raw === 'object';
            for (const [key, value] of Object.entries(raw || {})) {
                if (value === true && skills.some(s => s[0] === key)) fixed.push(key);
                else if (key === 'choose' || key === 'any') {
                    const from = key === 'any' ? skills.map(s => s[0]) : (value as any)?.from;
                    const count = key === 'any' ? value : (value as any)?.count ?? 1;
                    if (!Array.isArray(from) || !from.every(k => skills.some(s => s[0] === k)) || !Number.isSafeInteger(count) || Number(count) < 1) { supported = false; continue; }
                    const choiceId = id + ':' + option + ':' + key;
                    const selected = [...new Set(c.quickRecord?.skillSelections?.[choiceId] || [])].filter(k => from.includes(k)).slice(0, Number(count));
                    choices.push({ id: choiceId, from, count: Number(count), selected });
                } else supported = false;
            }
            rows.push({ id, item, label: item.name + (item.kind === 'classes' ? isMain ? ' · 初始职业' : ' · 兼职' : ''), options, option, fixed, choices, supported });
        });
    }
    return rows;
}
export function grantedSkills(c: CharacterData, catalog: ResourceSnapshot[]) {
    const result: Record<string, string[]> = {};
    for (const grant of skillGrants(c, catalog).filter(row => row.supported)) for (const key of [...grant.fixed, ...grant.choices.flatMap(ch => ch.selected)]) result[key] = [...new Set([...(result[key] || []), grant.label])];
    return result;
}
export function slotTable(data: Record<string, any>, level: number) {
    const groups = Array.isArray(data.classTableGroups) ? data.classTableGroups : [];
    // Ordinary spellcasting has an explicit numeric matrix. Pact rows are not added to it.
    const group = groups.find(g => Array.isArray(g.rowsSpellProgression));
    const row = group?.rowsSpellProgression?.[level - 1];
    if (Array.isArray(row) && row.length <= 9 && row.every(n => Number.isSafeInteger(n) && n >= 0)) return row as number[];
    return undefined;
}
