import { classFeatureTableFirst } from './classFeatureTableFirst';
import { cardPresentation } from './cardPresentation';
import { resourceFacts } from './ResourceFacts';
import { resourceAppearance } from './resourceAppearance';
const plain = (s: any) => String(s || '').replace(/[#*_]/g, '').trim();
const identity = (s: any) => plain(s).toLowerCase().replace(/[\s｜|]/g, '');
// Allocate each field to one region. Original source strings remain on the record.
export function resourceLayout(input: any) {
    const item = cardPresentation(input), appearance = resourceAppearance(item);
    const lines = String(item.displayBody || '').split('\n');
    const zh = identity(item.name), en = identity(item.srdEnglishName || item.englishName);
    let displayEnglish = item.srdEnglishName || item.englishName;
    const englishNames = [item.englishName, item.srdEnglishName].filter(Boolean).map(identity);
    const identities = new Set([zh, ...englishNames, ...englishNames.flatMap(name => [zh + name, name + zh])].filter(Boolean));
    let start = lines.findIndex(s => s.trim());
    if (start >= 0) {
        const maxLength = Math.max(...[...identities].map(s => s.length));
        let candidate = '', matched = 0;
        // Consume only a complete exact alias match; line count is not a title boundary.
        for (let i = start; i < lines.length; i++) {
            if (!lines[i].trim())
                continue;
            candidate += identity(lines[i]);
            if (candidate.length > maxLength)
                break;
            if (identities.has(candidate))
                matched = i - start + 1;
        }
        if (matched)
            lines.splice(start, matched);
        start = lines.findIndex(s => s.trim());
        if (start >= 0 && englishNames.includes(identity(lines[start])))
            lines.splice(start, 1);
    }
    // Preserve a source English title with its price annotation in the identity area.
    const englishLine = lines.findIndex(s => s.trim());
    if (englishLine >= 0 && en) {
        const candidate = plain(lines[englishLine]);
        const priced = candidate.match(/^(.*?)\s*([（(]\s*[\d.,]+\s*(?:gp|sp|cp|pp)\s*[）)])$/i);
        if (priced && identity(priced[1]) === en) {
            displayEnglish = candidate;
            lines.splice(englishLine, 1);
        }
    }
    let descriptor = '';
    const first = lines.findIndex(s => s.trim());
    if (item.kind === 'magicItems' && first >= 0) {
        let candidate = plain(lines[first]);
        let descriptorCount = 1;
        if (/[，,]\s*$/.test(candidate) && lines[first + 1] && /^(?:普通|非普通|不常见|常见|罕见|珍稀|极珍稀|非常稀有|极稀有|稀有|传说|传奇|神器|多种稀有度|稀有度不定)/.test(plain(lines[first + 1]))) {
            candidate += '\n' + plain(lines[first + 1]);
            descriptorCount = 2;
        }
        if (/^(?:奇物|护甲|武器|药水|戒指|权杖|法杖|魔杖|卷轴)/.test(candidate) && /(?:普通|常见|珍稀|稀有|罕见|传说|传奇|神器)/.test(candidate)) {
            descriptor = lines.slice(first, first + descriptorCount).join('\n');
            lines.splice(first, descriptorCount); // Move the entire source line, not a shortened type.
        }
    }
    if (!descriptor && item.kind === 'magicItems' && item.userCustomization && item.typeDescription) {
        const index = lines.findIndex(s => s.trim());
        if (index < 0 || !lines.join('\n').includes(item.typeDescription)) {
            descriptor = item.typeDescription;
        }
        else if (plain(lines[index]) === plain(item.typeDescription)) {
            descriptor = lines[index];
            lines.splice(index, 1);
        }
    }
    let featPrerequisite = '';
    const featCategoryLabel = item.kind === 'feats' && ['起源', '通用', '战斗风格', '传奇恩惠'].includes(item.featCategory) ? item.featCategory + '专长' : '';
    if (featCategoryLabel) {
        const index = lines.findIndex(s => s.trim());
        if (index >= 0 && plain(lines[index]).startsWith(featCategoryLabel)) {
            const complete = plain(lines[index]);
            featPrerequisite = complete.slice(featCategoryLabel.length).trim();
            lines.splice(index, 1);
        }
    }
    // Move explicit spell parameter lines into the same rows used by DIY cards.
    const spellRows: [
        string,
        string
    ][] = [];
    if (item.kind === 'spells') {
        const aliases: Record<string, string> = { '施法时间': '施法时间', '施法時間': '施法时间', '射程': '距离', '距离': '距离', '施法距离': '距离', '成分': '成分', '法术成分': '成分', '持续时间': '持续时间', '持續時間': '持续时间', '职业法术列表': '职业法术列表' };
        let seen = 0;
        for (let i = 0; i < lines.length && seen < 8; i++) {
            if (!lines[i].trim())
                continue;
            seen++;
            const value = plain(lines[i]);
            const match = value.match(/^([^：:]+)[：:]\s*(.+)$/);
            if (match && aliases[match[1]]) {
                const label = aliases[match[1]], key: Record<string, string> = { '施法时间': 'castingTime', '距离': 'range', '成分': 'components', '持续时间': 'duration', '职业法术列表': 'classes' };
                const edited = input.userCustomization && Object.hasOwn(input.fields || {}, key[label]);
                const value = edited ? item[key[label]] : match[2];
                spellRows.push([label, Array.isArray(value) ? value.join('、') : String(value ?? '')]);
                lines.splice(i--, 1);
                continue;
            }
            if (!descriptor && /^(?:[0-9一二三四五六七八九]\s*环|.{2,4}系?戏法|戏法|(?:防护|咒法|预言|惑控|塑能|幻术|死灵|变化)(?:系)?\s*(?:[0-9一二三四五六七八九]\s*环|戏法))/.test(value) && !/[。！？]/.test(value) && /(?:防护|咒法|预言|惑控|塑能|幻术|死灵|变化)/.test(value)) {
                descriptor = lines[i];
                lines.splice(i--, 1);
            }
        }
    }
    const originalBody = lines.join('\n').trim();
    const body = item.kind === 'classes' ? classFeatureTableFirst(originalBody) : originalBody;
    const source = plain(body);
    const facts = [...spellRows, ...resourceFacts(item).filter(([label]) => !spellRows.some(([key]) => key === label))].filter(([label, value]) => {
        if (item.kind === 'spells' && descriptor && ['环阶', '学派'].includes(label))
            return false;
        if (featCategoryLabel && label === '类别')
            return false;
        if (item.kind === 'spells' && label === '职业法术列表') {
            const classes = Array.isArray(item.classes) ? item.classes.filter((s: any) => typeof s === 'string' && s.trim()) : [];
            // Compare membership rather than string order; source names may be listed differently.
            const sourceLists = [plain(descriptor), ...source.split('\n').filter(Boolean).slice(0, 4)].filter(Boolean).flatMap(line => {
                if (!/(?:戏法|[一二三四五六七八九0-9]\s*环|职业法术列表[：:])/.test(line))
                    return [];
                const groups = [...line.matchAll(/[（(]([^）)]+)[）)]/g)].map(m => m[1]);
                if (/^职业法术列表[：:]/.test(line))
                    groups.push(line.replace(/^职业法术列表[：:]\s*/, ''));
                return groups.map(group => group.split(/[、,，;；/]/).map(s => s.trim()));
            });
            return !classes.length ? false : !sourceLists.some(list => classes.every((name: string) => list.includes(name.trim())));
        }
        if (descriptor && ['稀有度', '类型'].includes(label))
            return false;
        if (descriptor && label === '同调条件' && plain(descriptor).includes(String(value)))
            return false;
        // A detailed source value takes priority over an extra synthetic summary.
        const v = plain(value);
        // Match labeled source rows, not incidental occurrences inside explanatory prose.
        if (body.split('\n').some(line => {
            if (!line.trim().startsWith('|'))
                return false;
            const cells = line.split('|').slice(1, -1).map(plain);
            return cells.length === 2 && cells[1] === v && (cells[0] === label || cells[0].startsWith(label + ' '));
        }))
            return false;
        const aliases: Record<string, string[]> = { '距离': ['射程', '施法距离'], '成分': ['法术成分'], '类别': ['类别'], '关键属性': ['主要属性'] };
        const labels = [label, ...(aliases[label] || [])];
        if (body.split('\n').some(line => { const m = plain(line).match(/^([^：:]+)[：:]\s*(.*)$/); return m && labels.includes(m[1]) && plain(m[2]) === v; }))
            return false;
        if (item.kind === 'spells' && ['环阶', '学派'].includes(label)) {
            const lead = source.split('\n').filter(Boolean).slice(0, 2).join(' ');
            if (item.school && lead.includes(item.school) && /(?:戏法|[一二三四五六七八九0-9]\s*环)/.test(lead))
                return false;
        }
        return true;
    });
    let headerFacts = appearance.badges.filter(([label, value]) => facts.some(([l, v]) => label === l && value === v));
    if (!descriptor && item.kind === 'magicItems' && item.type && !source.startsWith(item.type) && !headerFacts.some(([label]) => label === '类型'))
        headerFacts.push(['类型', item.type]);
    headerFacts = headerFacts.filter(([label, value], index, all) => all.findIndex(([l, v]) => l === label && v === value) === index);
    const subtype = appearance.subtypeLabel;
    const detailedCategory = facts.some(([label, value]) => ['类别', '所属职业'].includes(label) && value !== subtype && value.startsWith(subtype));
    const sourceHasClassification = body.split('\n').filter(Boolean).slice(0, 3).some(line => { const s = plain(line); return s === subtype || s.startsWith(subtype + '（') || s.startsWith(subtype + '('); });
    const detailSubtype = item.kind !== 'magicItems' && !descriptor && subtype && !sourceHasClassification && !detailedCategory ? subtype : '';
    if (detailSubtype)
        headerFacts = headerFacts.filter(([, value]) => value !== detailSubtype);
    const bodyFacts = facts.filter(([label, value]) => value !== detailSubtype && !headerFacts.some(([l, v]) => l === label && v === value));
    return { item, appearance, body, descriptor, headerFacts, bodyFacts, displayEnglish, featPrerequisite, detailSubtype };
}
