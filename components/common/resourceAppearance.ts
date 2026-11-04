import { resourceFacts } from './ResourceFacts';
const rarityColors: Record<string, string> = { '普通': '#51675d', '非普通': '#3b7c4e', '珍稀': '#395d7f', '极珍稀': '#5d397f', '传说': '#7f6739', '神器': '#7f4039', '未注明': '#516764' };
export function resourceAppearance(item: any) {
    const rarity = item.rarityMode === 'multiple' || item.rarities?.length > 1 ? '多种稀有度' : item.rarities?.[0] || item.rarity;
    const facts = resourceFacts(item);
    const schoolColors: Record<string, string> = { '防护': '#39657f', '咒法': '#7f6039', '预言': '#3a7e70', '惑控': '#7f395a', '塑能': '#7f5339', '幻术': '#55397f', '死灵': '#647543', '变化': '#7f7239' };
    const armorColors: Record<string, string> = { '轻甲': '#43744a', '轻型护甲': '#43744a', '中甲': '#7e7039', '中型护甲': '#7e7039', '重甲': '#3f5b78', '重型护甲': '#3f5b78', '盾牌': '#7a5c3d' };
    const featColors: Record<string, string> = { '起源': '#3d7a61', '通用': '#39487f', '战斗风格': '#7f5139', '传奇恩惠': '#7f6b39' };
    const weaponColors: Record<string, string> = { '简易近战武器': '#4b7147', '简易远程武器': '#3b717d', '军用近战武器': '#7f5439', '军用远程武器': '#553e7a' };
    let subtypeColor: string | undefined, subtypeLabel = '', cornerLabel = '';
    if (item.kind === 'languages')
        subtypeLabel = item.languageType || '';
    if (item.kind === 'charOptions')
        subtypeLabel = item.charOptionCategory || '';
    if (item.kind === 'rewards')
        subtypeLabel = item.rewardType || '';
    if (item.kind === 'psionics')
        subtypeLabel = item.psionicType || '';
    if (item.kind === 'optionalFeatures')
        subtypeLabel = item.optionCategory || '';
    if (item.kind === 'magicItems') {
        subtypeLabel = rarity || '';
        subtypeColor = rarityColors[rarity] || undefined;
    }
    if (item.kind === 'spells' && item.school && Number.isInteger(item.level)) {
        subtypeLabel = item.school;
        subtypeColor = schoolColors[item.school];
        cornerLabel = item.level === 0 ? '戏法' : item.level + '环';
    }
    if (item.kind === 'armors') {
        const category = String(item.armorCategory || '').match(/^(轻型护甲|中型护甲|重型护甲|轻甲|中甲|重甲|盾牌)/)?.[0];
        if (category) {
            subtypeLabel = category;
            subtypeColor = armorColors[category];
        }
    }
    if (item.kind === 'weapons' && item.weaponCategory) {
        subtypeLabel = item.weaponCategory;
        subtypeColor = weaponColors[subtypeLabel];
    }
    if (item.kind === 'feats' && item.featCategory) {
        subtypeLabel = item.featCategory + '专长';
        subtypeColor = featColors[item.featCategory];
    }
    if (item.kind === 'tools' && item.toolCategory) {
        subtypeLabel = item.toolCategory;
        subtypeColor = ({ '工匠工具': '#7f6639', '乐器': '#39527f', '游戏套组': '#663f78', '其他工具': '#506855' } as Record<string, string>)[subtypeLabel];
    }
    if (item.kind === 'subclasses' && item.parentClass)
        subtypeLabel = item.parentClass + (item.parentClassSource ? ' · ' + item.parentClassSource : '');
    const markers: string[] = [];
    if (item.kind === 'spells') {
        if (item.ritual === true)
            markers.push('仪式');
        if (item.concentration === true)
            markers.push('专注');
    }
    if (item.kind === 'magicItems' && item.attunementRequirement)
        markers.push('需同调');
    let keys: string[] = [];
    switch (item.kind) {
        case 'magicItems':
            keys = ['稀有度'];
            break;
        case 'spells':
            keys = ['环阶', '学派'];
            break;
        case 'armors':
            keys = ['类别', '护甲等级'];
            break;
        case 'weapons':
            keys = ['类别', '精通'];
            break;
        case 'tools':
            keys = ['属性', '关联属性', '重量', '价格'];
            break;
        case 'gears':
            keys = ['价格', '重量'];
            break;
        case 'feats':
            keys = ['类别'];
            break;
        case 'species':
            keys = ['体型', '速度'];
            break;
        case 'classes':
            keys = ['生命骰', '关键属性'];
            break;
        case 'subclasses':
            keys = ['所属职业'];
            break;
    }
    const badges = facts.filter(([label]) => keys.includes(label)).slice(0, 2);
    if (item.kind === 'magicItems' && item.type)
        badges.push(['类型', item.type]);
    return { badges, subtypeColor, subtypeLabel, cornerLabel, markers, multiple: item.kind === 'magicItems' && rarity === '多种稀有度', rarity };
}
