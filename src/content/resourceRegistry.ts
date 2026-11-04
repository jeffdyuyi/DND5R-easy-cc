/** Player resource categories. Rule references have their own registry below. */
export const RESOURCE_TYPES = [
    { id: 'lib-class', kind: 'classes', label: '职业', color: '#7f4739' },
    { id: 'lib-subclass', kind: 'subclasses', label: '子职业', color: '#7f5e39' },
    { id: 'lib-species', kind: 'species', label: '种族', color: '#487052' },
    { id: 'lib-bg', kind: 'backgrounds', label: '背景', color: '#755843' },
    { id: 'lib-optional', kind: 'optionalFeatures', label: '可选特性', color: '#4a6d68' },
    { id: 'lib-char-option', kind: 'charOptions', label: '角色选项', color: '#624375' },
    { id: 'lib-reward', kind: 'rewards', label: '恩赐与奖励', color: '#7f6c39' },
    { id: 'lib-psionic', kind: 'psionics', label: '灵能', color: '#39517f' },
    { id: 'lib-feat', kind: 'feats', label: '专长', color: '#7f3953' },
    { id: 'lib-spell', kind: 'spells', label: '法术', color: '#5a3c7b' },
    { id: 'lib-weapon', kind: 'weapons', label: '武器', color: '#6d7641' },
    { id: 'lib-armor', kind: 'armors', label: '护甲', color: '#3b6a7d' },
    { id: 'lib-tool', kind: 'tools', label: '工具', color: '#7f6839' },
    { id: 'lib-gear', kind: 'gears', label: '冒险物品', color: '#6d634a' },
    { id: 'lib-magic', kind: 'magicItems', label: '魔法物品', color: '#39457f' },
] as const;
export type ResourceKind = typeof RESOURCE_TYPES[number]['kind'] | 'languages';
export const CHARACTER_RESOURCE_KINDS: readonly ResourceKind[] = [...RESOURCE_TYPES.map(type => type.kind), 'languages'];
// Reference-only categories; these do not become character creation choices.
export const RULE_TYPES = [
    { kind: 'gameplayRules', label: '游戏玩法' },
    { kind: 'creationRules', label: '创建角色' },
    { kind: 'recipes', label: '食谱' },
    { kind: 'languages', label: '语言' },
    { kind: 'conditions', label: '状态' },
    { kind: 'diseases', label: '疾病' },
    { kind: 'statuses', label: '其他状态' },
    { kind: 'variantRules', label: '术语汇编' },
    { kind: 'actions', label: '动作' },
] as const;
export const EQUIPMENT_KINDS: readonly string[] = ['weapons', 'armors', 'tools', 'gears', 'magicItems'];
export const isEquipmentKind = (kind: string) => EQUIPMENT_KINDS.includes(kind);
export const resourceLabels: Record<string, string> = Object.fromEntries([...RESOURCE_TYPES.map(type => [type.kind, type.label]), ...RULE_TYPES.map(type => [type.kind, type.label])]);
export const resourceColors: Record<string, string> = Object.fromEntries([...RESOURCE_TYPES.map(type => [type.kind, type.color]), ['languages', '#4d6a64']]);
