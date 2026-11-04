import { cardPresentation } from './cardPresentation';
export function resourceFacts(input: any): [
    string,
    string
][] {
    const item = cardPresentation(input);
    const text = (v: any) => typeof v === 'string' || typeof v === 'number' ? String(v) : Array.isArray(v) ? v.filter(x => typeof x === 'string').join('、') : '';
    let rows: any[] = [];
    switch (item.kind) {
        case 'gameplayRules':
        case 'creationRules':
            rows = [['章节', item.bookChapter]];
            break;
        case 'actions':
            rows = [['时间', item.actionTime]];
            break;
        case 'charOptions':
            rows = [['选项类别', item.charOptionCategory], ['先决条件', item.prerequisite]];
            break;
        case 'rewards':
            rows = [['奖励类别', item.rewardType], ['获得条件', item.prerequisite], ['稀有度', item.rarity]];
            break;
        case 'psionics':
            rows = [['灵能类型', item.psionicType], ['学派／体系', item.psionicOrder], ['先决条件', item.prerequisite]];
            break;
        case 'optionalFeatures':
            rows = [['选项类别', item.optionCategory], ['关联职业', item.associatedClasses], ['先决条件', item.prerequisite]];
            break;
        case 'spells':
            rows = [['环阶', item.level === 0 ? '戏法' : item.level !== undefined ? item.level + '环' : ''], ['学派', item.school], ['施法时间', item.castingTime], ['距离', item.range], ['成分', item.components], ['持续时间', item.duration], ['职业法术列表', item.classes]];
            break;
        case 'classes':
            rows = [['生命骰', item.hitDie || item.coreTraits?.hitPointDie], ['关键属性', item.primaryAbility || item.coreTraits?.primaryAbility]];
            break;
        case 'armors':
            rows = [['类别', item.armorCategory], ['护甲等级', item.armorClass], ['力量要求', item.strengthRequirement], ['隐匿', item.stealth], ['重量', item.weight], ['价格', item.cost]];
            break;
        case 'weapons':
            rows = [['类别', item.weaponCategory], ['伤害', item.damage], ['属性', item.weaponProperties], ['精通', item.mastery], ['重量', item.weight], ['价格', item.cost]];
            break;
        case 'subclasses':
            rows = [['所属职业', item.parentClass + (item.parentClassSource ? ' · ' + item.parentClassSource : '')]];
            break;
        case 'backgrounds':
            rows = [['属性选项', item.abilityScores], ['专长', item.feat], ['技能熟练', item.skills], ['工具熟练', item.tool], ['语言', item.languages], ['装备', item.equipment]];
            break;
        case 'species':
            rows = [['生物类型', item.creatureType], ['体型', item.size], ['速度', item.speedText || (item.speed ? item.speed + '尺' : '')]];
            break;
        case 'feats':
            rows = [['类别', item.category], ['先决条件', item.prerequisite]];
            break;
        case 'magicItems':
            rows = [['稀有度', item.rarities?.length ? item.rarities : item.rarity], ['同调条件', item.attunementRequirement]];
            break;
        case 'tools': {
            const original = item.extraFacts || [];
            const candidates = [['关联属性', item.toolAbility], ['重量', item.weight], ['价格', item.cost], ['操作', item.toolUtilize], ['制造', item.toolCraft], ['变体', item.toolVariants]];
            rows = [...original, ...candidates.filter(([label]) => !original.some(([existing]: [
                    string,
                    string
                ]) => existing === label || (existing === '属性' && label === '关联属性')))];
            break;
        }
        default: rows = item.extraFacts?.length ? item.extraFacts : [['价格', item.cost], ['重量', item.weight], ['属性', item.properties]];
    }
    return rows.map(([k, v]) => [k, text(v).replace(/\[\[[^|]+\|([^\]]+)\]\]/g, '$1')] as [
        string,
        string
    ]).filter(([, v]) => !!v);
}
export function ResourceFacts({ item, compact = false, rows }: {
    item: any;
    compact?: boolean;
    rows?: [
        string,
        string
    ][];
}) {
    const facts = rows || resourceFacts(item);
    if (!facts.length)
        return null;
    return <dl className={'card-facts resource-parameters ' + (compact ? 'is-compact' : '')}>{facts.map(([k, v], index) => <div key={k + ':' + index} className={k === '职业法术列表' || v.length > 45 ? 'resource-fact-wide' : undefined}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}
