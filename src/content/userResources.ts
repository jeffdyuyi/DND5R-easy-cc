export const userResourceFields: Record<string, [
    string,
    string,
    string?
][]> = {
    charOptions: [['charOptionCategory', '选项类别'], ['prerequisite', '完整先决条件']],
    rewards: [['rewardType', '奖励类别'], ['prerequisite', '获得条件'], ['rarity', '原有稀有度（可留空）']],
    psionics: [['psionicType', '灵能类型'], ['psionicOrder', '原有学派／体系'], ['prerequisite', '完整先决条件']],
    optionalFeatures: [['optionCategory', '选项类别'], ['associatedClasses', '关联职业', 'list'], ['prerequisite', '完整先决条件']],
    classes: [['hitDie', '生命骰'], ['primaryAbility', '关键属性']],
    subclasses: [['parentClass', '所属职业']],
    species: [['creatureType', '生物类型'], ['size', '体型'], ['speed', '速度（尺）', 'number'], ['darkvision', '黑暗视觉']],
    backgrounds: [['abilityScores', '属性选项', 'list'], ['feat', '专长'], ['skills', '技能熟练', 'list'], ['tool', '工具熟练'], ['languages', '语言', 'list'], ['equipment', '装备', 'list']],
    feats: [['featCategory', '类别（2024分类，可留空）', 'feat'], ['prerequisite', '完整先决条件']],
    spells: [['level', '环阶（0为戏法）', 'level'], ['school', '学派', 'school'], ['castingTime', '施法时间'], ['range', '距离'], ['components', '成分（含完整材料）'], ['duration', '持续时间'], ['classes', '职业法术列表', 'list'], ['ritual', '仪式', 'bool'], ['concentration', '专注', 'bool']],
    weapons: [['weaponCategory', '类别', 'weapon'], ['damage', '完整伤害表达'], ['weaponProperties', '武器属性'], ['mastery', '精通'], ['cost', '价格'], ['weight', '重量']],
    armors: [['armorCategory', '类别', 'armor'], ['armorClass', '完整AC表达'], ['strengthRequirement', '力量要求'], ['stealth', '隐匿'], ['cost', '价格'], ['weight', '重量']],
    tools: [['toolCategory', '类别', 'tool'], ['toolAbility', '关联属性'], ['toolUtilize', '操作'], ['toolCraft', '制造'], ['toolVariants', '变体'], ['cost', '价格'], ['weight', '重量']],
    gears: [['cost', '价格'], ['weight', '重量']],
    magicItems: [['typeDescription', '完整类型描述'], ['type', '物品类型'], ['rarities', '稀有度', 'list'], ['attunementRequirement', '完整同调条件']],
};
export function userResourceView(raw: any, kind = raw.kind) {
    const sections = (raw.relatedSections || []).filter((s: any) => s.group !== 'user-section');
    for (const section of raw.userSections || [])
        sections.push({ ...section, group: 'user-section' });
    if (!raw.fullDescription) {
        for (const key of ['features', 'traits', 'benefits'])
            for (const feature of Array.isArray(raw[key]) ? raw[key] : []) {
                if (typeof feature === 'string') {
                    sections.push({ title: '', body: feature });
                }
                else if (feature?.description || feature?.body) {
                    sections.push({ title: feature.name || '', body: feature.description || feature.body });
                }
            }
    }
    return { ...raw, kind, fullDescription: raw.fullDescription ?? raw.description ?? '', relatedSections: sections, provenance: raw.provenance || { provider: '用户自定义', path: '', revision: '', license: '' } };
}
/** Import as independent user records; reject malformed known structures before writing. */
export function prepareResourceImport(value: unknown, fallbackKind?: string): any[] {
    const entries: unknown[] = Array.isArray(value) ? value : [value];
    if (!entries.length)
        throw Error('文件没有资源记录。');
    return entries.map(value => {
        if (!value || typeof value !== 'object' || Array.isArray(value))
            throw Error('每项资源都需要是对象。');
        const item = value as Record<string, any>, kind = item.kind || fallbackKind;
        if (typeof item.name !== 'string' || !item.name.trim())
            throw Error('每项资源都需要名称。');
        if (typeof kind !== 'string' || !userResourceFields[kind])
            throw Error('每项资源都需要支持的类型 kind。');
        if (fallbackKind && kind !== fallbackKind)
            throw Error('请在我的资源中导入多分类文件。');
        for (const field of ['relatedSections', 'userSections'])
            if (item[field] !== undefined && !Array.isArray(item[field]))
                throw Error(field + '应为段落数组，未导入任何记录。');
        for (const field of ['fullDescription', 'description'])
            if (item[field] !== undefined && typeof item[field] !== 'string')
                throw Error(field + '应为正文字符串。');
        return { ...item, kind, id: 'custom-' + crypto.randomUUID(), originalResourceId: item.originalResourceId || item.id, contentOrigin: 'user-resource', userCustomization: true, userResourceKind: 'imported', source: typeof item.source === 'string' && item.source ? item.source : '用户导入' };
    });
}
