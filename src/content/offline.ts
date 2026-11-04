import { srdOptionalFeatures } from './srdOptionalFeatures';
// Compatibility entry point. Built-in content is project-native, never 5etools AST.
// Local-only payloads are optional. Public checkout includes no unreviewed translations.
const localPacks = import.meta.glob('../../data/builtin/srd-*.json', { eager: true, import: 'default' }) as Record<string, any>;
const emptyPack = { libraries: Object.fromEntries(['classes', 'subclasses', 'species', 'backgrounds', 'feats', 'spells', 'weapons', 'armors', 'tools', 'gears', 'magicItems'].map(kind => [kind, []])) };
const classic = localPacks['../../data/builtin/srd-5.1.json'] || emptyPack;
const modern = localPacks['../../data/builtin/srd-5.2.1.json'] || emptyPack;
export type OfflineVersion = '5.1' | '5.2.1';
function readOfflineVersion(): OfflineVersion {
    try {
        return localStorage.getItem('easy_cc_offline_version') === '5.1' ? '5.1' : '5.2.1';
    }
    catch {
        return '5.2.1';
    }
}
export const OFFLINE_VERSION = readOfflineVersion();
const OFFLINE_PACKS = { '5.1': classic, '5.2.1': modern };
const defaults = { features: [], subclasses: [], saves: [], hitDie: '', primaryAbility: '', coreTraits: { primaryAbility: '', hitPointDie: '', savingThrows: '', skillProficiencies: '', weaponProficiencies: '', armorTraining: '', startingEquipment: { optionA: '', optionB: '' } }, speed: 0, size: '', darkvision: '', traits: [], abilityScores: [], feat: '', skills: [], tool: '', equipment: [], level: 0, school: '', castingTime: '', range: '', components: '', duration: '', classes: [], higherLevel: '', category: '', prerequisite: '', repeatable: false, benefits: [], type: '杂物', cost: '', weight: '', toolAbility: '', toolUtilize: [], toolCraft: [], toolVariants: [], properties: [] };
function spellFields(e: any) {
    if (e.kind !== 'spells')
        return {};
    if (Number.isInteger(e.fields?.level) && e.fields?.school)
        return { level: e.fields.level, school: e.fields.school };
    const body = e.fullDescription as string;
    const tier = body.match(/([0-9一二三四五六七八九])\s*环/);
    const chinese = '零一二三四五六七八九';
    const level = /戏法/.test(body.split('\n').slice(0, 6).join(' ')) ? 0 : tier ? (/[0-9]/.test(tier[1]) ? Number(tier[1]) : chinese.indexOf(tier[1])) : undefined;
    const school = body.match(/防护|咒法|预言|惑控|塑能|幻术|死灵|变化/)?.[0] || '';
    return { level, school };
}
export function getOfflineLibraries(version: OfflineVersion = OFFLINE_VERSION): any {
    const libraries = Object.fromEntries(Object.entries(OFFLINE_PACKS[version].libraries).map(([kind, items]) => [kind, (items as any[]).map(e => ({ ...defaults, ...e, ...e.fields, ...spellFields(e), toolUtilize: e.fields?.toolUtilize ? [e.fields.toolUtilize] : [], toolCraft: e.fields?.toolCraft ? [e.fields.toolCraft] : [], toolVariants: e.fields?.toolVariants ? [e.fields.toolVariants] : [], type: ({ weapons: '武器', armors: '护甲', tools: '工具' } as any)[kind] || e.fields?.type || '杂物', source: e.source, category: kind === 'feats' ? (e.fields?.featCategory ? e.fields.featCategory + '专长' : '') : '', contentAttribution: e.provenance.provider }))]));
    return { ...libraries, charOptions: [], rewards: [], psionics: [], optionalFeatures: srdOptionalFeatures(libraries.classes) };
}
