import { psionicSections } from './psionicPresentation';
import { bookRuleSections } from './bookRules';
import { itemMetadataName } from './itemMetadata';
import { compatibilityParent } from './compatibility';
import { prepareBody, expandVersions, specificMagicItems } from './expand';
import { createEntryRenderer, inline } from './entries';
import { SourceDocument, Diagnostic, Raw, ParsedCatalog } from './model';
const array = (v: any): any[] => Array.isArray(v) ? v : v == null ? [] : [v];
const labels: Raw = { note: '说明', walk: '步行', fly: '飞行', swim: '游泳', climb: '攀爬', burrow: '掘穴', str: '力量', dex: '敏捷', con: '体质', int: '智力', wis: '感知', cha: '魅力', acrobatics: '杂技', 'animal handling': '驯兽', arcana: '奥秘', athletics: '运动', deception: '欺瞒', history: '历史', insight: '洞悉', intimidation: '威吓', investigation: '调查', medicine: '医药', nature: '自然', perception: '察觉', performance: '表演', persuasion: '游说', religion: '宗教', 'sleight of hand': '巧手', stealth: '隐匿', survival: '生存', any: '任选', anyStandard: '任意标准语言', level: '等级', ability: '属性', race: '种族', feat: '专长', spellcasting: '施法能力', pactMagic: '契约魔法', proficiency: '熟练', armor: '护甲', weapon: '武器', armorGroup: '护甲类别', weapons: '武器熟练', skills: '技能熟练', tools: '工具熟练', armorProficiencies: '护甲熟练', weaponProficiencies: '武器熟练', skillProficiencies: '技能熟练', toolProficiencies: '工具熟练', languageProficiencies: '语言', anyMusicalInstrument: '任选乐器', anyArtisansTool: '任选工匠工具', anyGamingSet: '任选游戏套组', all: '全部', choose: '选择', count: '数量', from: '范围', known: '已知法术', prepared: '准备法术', innate: '天生施法', expanded: '扩展法术列表', ritual: '仪式', daily: '每日', rest: '休息', will: '随意', resource: '资源', name: '名称', displayName: '名称' };
const schools: Raw = { A: '防护', C: '咒法', D: '预言', E: '惑控', V: '塑能', I: '幻术', N: '死灵', T: '变化' };
const rarities: Raw = { common: '普通', uncommon: '非普通', rare: '珍稀', 'very rare': '极珍稀', legendary: '传说', artifact: '神器', varies: '多种稀有度', unknown: '未注明', 'unknown (magic)': '未注明' };
const units: Raw = { action: '动作', bonus: '附赠动作', reaction: '反应', round: '轮', minute: '分钟', hour: '小时', day: '天', week: '周', year: '年', feet: '尺', miles: '里', self: '自身', touch: '触及', sight: '视线', unlimited: '无限', special: '特殊', instant: '立即', permanent: '永久', timed: '定时', untilDispelled: '直到被解除', dispel: '被解除', trigger: '触发', discharge: '释放', cone: '锥形', cube: '立方', cylinder: '柱形', line: '线形', radius: '半径', sphere: '球形', hemisphere: '半球形', emanation: '发散' };
export function parseDocuments(documents: SourceDocument[]): ParsedCatalog {
    const diagnostics: Diagnostic[] = [], entries: Raw[] = [], pool: Raw = {}, spellLookup: Raw = {}, sourceMeta: Raw = {}, optionalTypes: Raw = {}, additionalTypes: Raw = {};
    for (const doc of documents) {
        // Repository discovery indices map properties/sources to paths; they are not content documents.
        if (doc.path.startsWith('_generated/') || /(?:^|\/)(?:fluff-)?index\.json$/.test(doc.path))
            continue;
        if (!doc.body || typeof doc.body !== 'object' || Array.isArray(doc.body)) {
            diagnostics.push({ code: 'INVALID_DOCUMENT', identity: doc.path, message: '资料根节点不是对象，未注册此文档。' });
            continue;
        }
        if (doc.path.endsWith('gendata-spell-source-lookup.json'))
            Object.assign(spellLookup, doc.body);
        for (const namespace of ['charOption', 'psionicTypes', 'rewardTypes'])
            for (const [code, label] of Object.entries(doc.body._meta?.[namespace] || {}))
                additionalTypes[doc.repository + ':' + namespace + ':' + code] = typeof label === 'string' ? label : (label as Raw)?.full || (label as Raw)?.name;
        for (const [code, label] of Object.entries(doc.body._meta?.optionalFeatureTypes || {})) {
            const name = typeof label === 'string' ? label : (label as Raw)?.name;
            optionalTypes[doc.repository + ':' + doc.path + ':' + code] = name;
            optionalTypes[doc.repository + ':' + code] = name;
        }
        for (const source of array(doc.body._meta?.sources).filter(s => s && typeof s === 'object' && s.json))
            sourceMeta[doc.repository + ':' + source.json] = source;
        for (const source of [...array(doc.body.book), ...array(doc.body.adventure)].filter(s => s && typeof s === 'object' && s.id))
            sourceMeta[doc.repository + ':' + source.id] = source;
        for (const [key, rows] of Object.entries({ ...doc.body, bookRule: bookRuleSections(doc) }))
            if (Array.isArray(rows) && key !== 'book' && key !== 'adventure') {
                pool[key] ||= [];
                for (const raw of rows)
                    if (raw && typeof raw === 'object' && !Array.isArray(raw))
                        pool[key].push({ ...structuredClone(raw), __origin: { repository: doc.repository, revision: doc.revision, path: doc.path, url: doc.url, fetchedAt: doc.fetchedAt }, __original: structuredClone(raw) });
            }
    }
    let prepared: Raw;
    try {
        prepared = prepareBody(pool);
    }
    catch (error) {
        diagnostics.push({ code: 'EXPANSION_FAILED', identity: 'catalog', message: String(error) });
        return { entries, diagnostics, documents: documents.length };
    }
    for (const key of Object.keys(prepared))
        if (Array.isArray(prepared[key])) {
            const variants = prepared[key].flatMap((raw: Raw) => {
                try {
                    return expandVersions(raw);
                }
                catch (error) {
                    diagnostics.push({ code: 'VERSION_FAILED', identity: raw.name, message: String(error) });
                    return [];
                }
            });
            prepared[key].push(...variants);
        }
    const aliases = (r: Raw, n: string) => [r.name, r.ENG_name, r.shortName, r.abbreviation].some(s => s && String(s).toLowerCase() === String(n).toLowerCase());
    const sourceEq = (a: any, b: any) => String(a || 'PHB').toLowerCase() === String(b || 'PHB').toLowerCase();
    const parentMatch = (actual: string, requested: string, source: string) => actual === requested || (prepared.class || []).some((c: Raw) => aliases(c, actual) && aliases(c, requested) && sourceEq(c.source, source));
    const variants = specificMagicItems(prepared);
    prepared.item = [...(prepared.item || []), ...variants];
    const referenceIndex = new Map<string, Raw[]>(), referenceCache = new Map<string, Raw | undefined>();
    for (const [type, rows] of Object.entries(prepared))
        if (Array.isArray(rows))
            for (const record of rows)
                for (const name of [...new Set([record.name, record.ENG_name, record.shortName, record.abbreviation, ...(['itemProperty', 'itemType'].includes(type) ? array(record.entries).flatMap(entry => [entry?.name, entry?.ENG_name]) : [])].filter(Boolean).map(v => String(v).toLowerCase()))]) {
                    const key = type + '|' + name;
                    if (!referenceIndex.has(key))
                        referenceIndex.set(key, []);
                    referenceIndex.get(key)!.push(record);
                }
    const resolve = (type: string, uid: string): Raw | undefined => {
        const key = type + '|' + String(uid).toLowerCase();
        if (referenceCache.has(key))
            return referenceCache.get(key);
        const p = String(uid).split('|');
        let candidates = (referenceIndex.get(type + '|' + p[0].toLowerCase()) || []).filter((r: Raw) => !r._copy);
        if (type === 'classFeature')
            candidates = candidates.filter((r: Raw) => parentMatch(r.className, p[1], p[2]) && sourceEq(r.classSource, p[2]) && Number(r.level) === Number(p[3]) && sourceEq(r.source, p[4] || p[2]));
        else if (type === 'subclassFeature')
            candidates = candidates.filter((r: Raw) => parentMatch(r.className, p[1], p[2]) && sourceEq(r.classSource, p[2]) && r.subclassShortName === p[3] && sourceEq(r.subclassSource, p[4]) && Number(r.level) === Number(p[5]) && sourceEq(r.source, p[6] || p[4]));
        else
            candidates = candidates.filter((r: Raw) => sourceEq(r.source, p[1]));
        // Prefer same-provider duplicate definitions only if byte-equivalent; never choose an ambiguous identity.
        const unique = [...new Map(candidates.map((r: Raw) => [JSON.stringify(r.__original), r])).values()] as Raw[];
        const result = unique.length === 1 ? unique[0] : undefined;
        referenceCache.set(key, result);
        return result;
    };
    const compatibilityCache = new Map<Raw, Raw | null>();
    const compatible = (record: Raw) => {
        if (!compatibilityCache.has(record))
            compatibilityCache.set(record, compatibilityParent(record, prepared.subclass || []));
        return compatibilityCache.get(record)!;
    };
    const compatibilityLinks: Raw[] = [];
    for (const record of prepared.subclass || []) {
        const parent = compatible(record);
        if (parent)
            compatibilityLinks.push({ kind: 'subclass-parent-compatibility', canonical: parent, name: record.name, source: record.source, className: record.className, classSource: record.classSource, provider: record.__origin?.repository || '5etools-cn', provenance: record.__origin, raw: record.__original, subclassFeatureReferences: record.subclassFeatures });
    }
    const props: Raw = { bookRule: 'gameplayRules', recipe: 'recipes', condition: 'conditions', disease: 'diseases', status: 'statuses', variantrule: 'variantRules', action: 'actions', language: 'languages', charoption: 'charOptions', reward: 'rewards', psionic: 'psionics', optionalfeature: 'optionalFeatures', class: 'classes', subclass: 'subclasses', race: 'species', subrace: 'species', background: 'backgrounds', feat: 'feats', spell: 'spells', baseitem: 'gears', item: 'gears', itemGroup: 'gears', magicvariant: 'magicItems', vehicle: 'gears' };
    for (const [prop, kind] of Object.entries(props))
        for (const sourceRaw of prepared[prop] || []) {
            try {
                if (prop === 'subclass' && compatible(sourceRaw))
                    continue;
                let raw = sourceRaw;
                const origin = raw.__origin || raw.__original?.__origin;
                const identity = [origin?.repository || '5etools-cn', prop, raw.source || raw.inherits?.source, raw.ENG_name || raw.name, raw.className, raw.classSource, raw.subclassShortName, raw.subclassSource, raw.level, raw.raceName, raw.raceSource, raw._variantIdentity].map(v => String(v ?? '')).join('|');
                const warn = (code: string, message: string) => diagnostics.push({ code, identity, message, path: origin?.path });
                if (raw._copy || raw._unresolvedVariant || raw._expansionError) {
                    warn('UNRESOLVED_INHERITANCE', '继承或变体未完整展开，暂不注册此卡；原始数据保留在资源缓存。');
                    continue;
                }
                if (!raw.name) {
                    warn('MISSING_NAME', '条目没有名称');
                    continue;
                }
                if (raw._mod) {
                    warn('UNRESOLVED_ROOT_MOD', '顶层修改指令尚未应用，暂不注册此卡。');
                    continue;
                }
                if (prop === 'subrace') {
                    const parents = (prepared.race || []).filter((r: Raw) => aliases(r, raw.raceName) && sourceEq(r.source, raw.raceSource));
                    if (parents.length !== 1) {
                        warn('MISSING_RACE_PARENT', '亚种父项未唯一定位');
                        continue;
                    }
                    const parent = parents[0], body = structuredClone(parent.entries || []);
                    for (const entry of raw.entries || []) {
                        const overwrite = entry?.data?.overwrite, at = overwrite ? body.findIndex((e: Raw) => aliases(e, overwrite)) : -1;
                        if (at >= 0)
                            body[at] = entry;
                        else
                            body.push(entry);
                    }
                    raw = { ...parent, ...raw, name: parent.name + '（' + raw.name + '）', entries: body, parentResource: { name: parent.name, source: parent.source }, inheritedStructuredFields: Object.fromEntries(['ability', 'skillProficiencies', 'toolProficiencies', 'languageProficiencies', 'weaponProficiencies', 'armorProficiencies', 'additionalSpells', 'resist', 'immune', 'conditionImmune'].filter(key => parent[key] && raw[key] && !raw.overwrite?.[key]).map(key => [key, parent[key]])) };
                }
                const render = createEntryRenderer(resolve, warn), text = (v: any) => inline(v, warn);
                const atom = (v: string): string => {
                    // Native inline tags must be parsed before considering UID syntax.
                    if (v.includes('{@') || v.includes('{#'))
                        return text(v);
                    if (labels[v])
                        return labels[v];
                    // Untyped values have no safe resource namespace. Keep the original,
                    // including its source, instead of translating via unrelated records.
                    return text(v);
                };
                const choice = (v: any): string => {
                    if (v == null)
                        return '';
                    if (typeof v === 'string')
                        return atom(v);
                    if (typeof v !== 'object')
                        return String(v);
                    if (Array.isArray(v))
                        return [...new Set(v.map(choice).filter(Boolean))].join('、');
                    if (v.full)
                        return text(v.full);
                    if (v.choose) {
                        const c = v.choose;
                        return c.weighted ? '从 ' + choice(c.weighted.from) + ' 中分配 ' + choice(c.weighted.weights) : (c.count ?? 1) + '项任选：' + choice(c.from || c);
                    }
                    if (v.name)
                        return atom(v.name);
                    if (v.weighted)
                        return '从 ' + choice(v.weighted.from) + ' 中分配 ' + choice(v.weighted.weights);
                    if (v.class)
                        return choice(v.class) + (v.level ? ' ' + v.level + '级' : '');
                    const movement = ['walk', 'fly', 'swim', 'climb', 'burrow'];
                    if (Object.keys(v).some(k => movement.includes(k))) {
                        return Object.entries(v).map(([key, speed]) => {
                            if (movement.includes(key)) {
                                const label = labels[key];
                                if (typeof speed === 'number')
                                    return label + ' ' + speed + '尺';
                                if (speed === true)
                                    return label + '速度等同步行速度';
                                if (speed && typeof speed === 'object')
                                    return label + ' ' + (speed.number !== undefined ? speed.number + '尺' : '') + (speed.condition ? '（' + text(speed.condition) + '）' : '');
                            }
                            if (key === 'canHover')
                                return speed ? '可以悬浮' : '';
                            if (key === 'choose')
                                return choice({ choose: speed });
                            warn('UNKNOWN_PARAMETER', '尚未命名的速度字段：' + key);
                            return choice(speed);
                        }).filter(Boolean).join('；');
                    }
                    if (v.or) {
                        const orParts = array(v.or).map(part => Object.entries(part).map(([key, value]) => (labels[key] || atom(key)) + ' ' + choice(value)).join(' 或 '));
                        const rest = Object.fromEntries(Object.entries(v).filter(([key]) => key !== 'or'));
                        return [...orParts, Object.keys(rest).length ? choice(rest) : ''].filter(Boolean).join('；');
                    }
                    const preferred: Record<string, string> = { armorProficiencies: 'armor', weaponProficiencies: 'weapons', skillProficiencies: 'skills', toolProficiencies: 'tools', languageProficiencies: 'languages' };
                    return Object.entries(v).filter(([k]) => !preferred[k] || v[preferred[k]] == null).map(([k, x]) => {
                        if (x === false)
                            return '';
                        if (x === true)
                            return atom(k);
                        if (k.includes('|'))
                            return atom(k) + (typeof x === 'number' && x !== 1 ? ' ×' + x : '');
                        const label = labels[k] || (/^any\d+$/.test(k) ? '任选' + k.slice(3) + '项' : '');
                        if (!label) {
                            warn('UNKNOWN_PARAMETER', '尚未命名的结构字段：' + k);
                            return text(k) + '：' + choice(x);
                        }
                        return label + '：' + choice(x);
                    }).filter(Boolean).join('；');
                };
                const localizeProficiency = (value: any, field = ''): any => {
                    if (Array.isArray(value)) return value.map(entry => localizeProficiency(entry, field));
                    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, localizeProficiency(entry, key === 'armor' || key === 'weapons' ? key : field)]));
                    const names: Raw = field === 'armor' ? { light: '轻甲', medium: '中甲', heavy: '重甲', shield: '盾牌' } : field === 'weapons' ? { simple: '简易武器', martial: '军用武器' } : {};
                    return typeof value === 'string' ? names[value] || value : value;
                };
                const unit = (v: any) => units[v] || v || '';
                const time = (v: any) => array(v).map(t => String(t.number ?? '') + unit(t.unit) + (t.condition ? '（' + text(t.condition) + '）' : '')).join(' 或 ');
                const distance = (r: any) => !r ? '' : (r.distance?.amount !== undefined ? String(r.distance.amount) + unit(r.distance.type) : unit(r.distance?.type || r.type)) + (r.type && r.type !== 'point' ? '（' + unit(r.type) + '）' : '');
                const duration = (v: any) => array(v).map(d => (d.concentration ? '专注，' : '') + (d.type === 'timed' ? (d.duration?.upTo ? '至多' : '') + (d.duration?.amount ?? '') + unit(d.duration?.type) : d.type === 'permanent' ? '持续至' + array(d.ends).map(unit).join('或') : unit(d.type))).join(' 或 ');
                const fluffProp: Raw = { recipe: 'recipeFluff', language: 'languageFluff', class: 'classFluff', subclass: 'subclassFluff', race: 'raceFluff', subrace: 'raceFluff', background: 'backgroundFluff', feat: 'featFluff', baseitem: 'itemFluff', item: 'itemFluff' };
                const fluff = raw.fluff?.entries ? raw.fluff : (prepared[fluffProp[prop]] || []).find((f: Raw) => !f._copy && aliases(f, raw.name) && sourceEq(f.source, raw.source));
                let structuredSupplement: Raw = {};
                const fluffDescription = render(fluff?.entries).trim();
                let fields: Raw = {}, body = render(prop === 'bookRule' ? raw.bookSection : raw.entries || []), relatedSections: Raw[] = [];
                if (prop === 'bookRule') {
                    fields = { bookChapter: raw.bookChapter };
                    const findAlignment = (node: any): any => {
                        if (!node || typeof node !== 'object') return undefined;
                        if (node.ENG_name === 'Step 4: Choose an Alignment') return node;
                        for (const child of Array.isArray(node) ? node : node.entries || []) { const found = findAlignment(child); if (found) return found; }
                    };
                    const alignment = findAlignment(raw.bookSection);
                    if (alignment) fields.alignmentDescription = render(alignment);
                    structuredSupplement = { chapter: raw.bookChapter, chapterId: raw.bookChapterId, sectionIndex: raw.bookSectionIndex, page: raw.page };
                }
                if (prop === 'recipe') {
                    body = [body, raw.ingredients ? '### 原料\n\n' + render({ type: 'list', items: raw.ingredients }) : '', raw.instructions ? '### 步骤\n\n' + render(raw.instructions) : '', raw.equipment ? '### 用具\n\n' + render(raw.equipment) : ''].filter(Boolean).join('\n\n');
                    structuredSupplement = Object.fromEntries(['type', 'dishTypes', 'diet', 'serves', 'time', 'makes', 'allergenGroups'].filter(key => raw[key] !== undefined).map(key => [key, raw[key]]));
                }
                if (prop === 'action') fields = { actionTime: time(raw.time) };
                if (prop === 'variantrule') structuredSupplement = Object.fromEntries(['ruleType'].filter(key => raw[key] !== undefined).map(key => [key, raw[key]]));
                if (prop === 'language') {
                    fields = { languageType: ({ standard: '标准语言', exotic: '异域语言', secret: '秘密语言' } as Raw)[raw.type] || raw.type || '', script: raw.script || '', typicalSpeakers: raw.typicalSpeakers || [], dialects: raw.dialects || [] };
                    const rows = [fields.languageType ? '类别：' + fields.languageType : '', raw.script ? '文字：' + text(raw.script) : '', raw.typicalSpeakers ? '常见使用者：' + array(raw.typicalSpeakers).map(text).join('、') : '', raw.dialects ? '方言：' + array(raw.dialects).map(text).join('、') : ''];
                    body = [...rows, body].filter(Boolean).join('\n\n');
                }
                const push = (title: string, value: any) => {
                    const b = render(value);
                    if (b)
                        body += "\n\n### " + title + "\n\n" + b;
                };
                if (prop === 'spell') {
                    const lookup = spellLookup[String(raw.source).toLowerCase()]?.[raw.name] || spellLookup[String(raw.source).toLowerCase()]?.[raw.ENG_name];
                    const classes = [...new Set([...array(raw.classes?.fromClassList).map(c => c.name), ...Object.values(lookup?.class || {}).flatMap((x: any) => Object.keys(x))])];
                    fields = { level: raw.level, school: schools[raw.school] || raw.school, castingTime: time(raw.time) + (raw.meta?.ritual ? '（可作仪式）' : ''), range: distance(raw.range), components: Object.entries(raw.components || {}).map(([k, v]) => k === 'm' ? 'M（' + (typeof v === 'string' ? text(v) : text((v as Raw).text || choice(v))) + '）' : v ? k.toUpperCase() : '').filter(Boolean).join('、'), duration: duration(raw.duration), classes, ritual: raw.meta?.ritual === true, concentration: array(raw.duration).some(d => d.concentration) };
                    if (raw.entriesHigherLevel) {
                        const higher = array(raw.entriesHigherLevel);
                        if (higher.some(v => typeof v === 'object' && v?.name))
                            body += '\n\n' + render(higher);
                        else
                            push('升环施法', higher);
                    }
                    if (lookup?.subclass) {
                        const rows: string[] = [];
                        for (const [parentSource, classes] of Object.entries(lookup.subclass))
                            for (const [className, sources] of Object.entries(classes as Raw))
                                for (const [subSource, subclasses] of Object.entries(sources as Raw))
                                    for (const [shortName, detail] of Object.entries(subclasses as Raw)) {
                                        const name = (detail as Raw)?.name || shortName;
                                        rows.push('- **' + text(className) + ' · ' + parentSource + '**：' + text(name) + '（' + subSource + '）' + ((detail as Raw)?.subSubclasses ? ' · ' + choice((detail as Raw).subSubclasses) : ''));
                                    }
                        relatedSections.push({ title: '子职业法术列表', body: rows.join('\n') });
                    }
                }
                if (prop === 'class' || prop === 'subclass') {
                    fields = { parentClass: raw.className || '', parentClassSource: raw.classSource || 'PHB', hitDie: raw.hd ? 'd' + raw.hd.faces : '', primaryAbility: choice(raw.primaryAbility) };
                    const refs = prop === 'class' ? array(raw.classFeatures).flat() : array(raw.subclassFeatures);
                    const features = refs.map(ref => {
                        const uid = typeof ref === 'string' ? ref : ref[prop === 'class' ? 'classFeature' : 'subclassFeature'];
                        const feature = resolve(prop === 'class' ? 'classFeature' : 'subclassFeature', uid);
                        if (!feature)
                            warn('MISSING_FEATURE', uid);
                        return { uid, feature };
                    });
                    if (prop === 'class') {
                        const groups = array(raw.classTableGroups), levels = Math.max(...features.map(x => Number(x.feature?.level) || 0), ...groups.map(g => g.rows?.length || 0), 0);
                        const headings = ['等级', '职业特性', ...groups.flatMap(g => g.colLabels || [])];
                        const rows = Array.from({ length: levels }, (_, i) => [i + 1, features.filter(x => x.feature?.level === i + 1).map(x => x.feature!.name).join('、'), ...groups.flatMap(g => g.rows?.[i] || Array(g.colLabels?.length || 0).fill('—'))]);
                        push('职业特性', { type: 'table', colLabels: headings, rows });
                        const proficiency = raw.startingProficiencies || {};
                        if (raw.multiclassing?.requirements)
                            push('兼职要求', choice(raw.multiclassing.requirements));
                        if (raw.multiclassing?.proficienciesGained)
                            push('兼职获得熟练', choice(localizeProficiency(raw.multiclassing.proficienciesGained)));
                        if (raw.proficiency)
                            push('豁免熟练', choice(raw.proficiency));
                        for (const [title, data] of [['护甲熟练', proficiency.armor], ['武器熟练', proficiency.weapons], ['技能熟练', proficiency.skills], ['工具熟练', proficiency.tools], ['起始金币替代', raw.startingEquipment?.goldAlternative]])
                            if (data)
                                push(String(title), choice(localizeProficiency(data, title === '护甲熟练' ? 'armor' : title === '武器熟练' ? 'weapons' : '')));
                        if (raw.startingEquipment?.default)
                            push('起始装备', raw.startingEquipment.default);
                    }
                    fields.levelFeatures = features.filter(({ feature }) => feature).map(({ uid, feature }) => ({ uid, name: feature.name, englishName: feature.ENG_name || '', level: feature.level, description: render(feature.entries, new Set<string>(), 1) }));
                    for (const { feature } of features)
                        if (feature)
                            push(feature.level + '级：' + feature.name + (feature.ENG_name ? ' · ' + feature.ENG_name : ''), render(feature.entries, new Set<string>(), 1));
                    if (prop === 'subclass')
                        for (const group of raw.subclassTableGroups || [])
                            push(group.title || '子职业表格', { ...group, type: 'table' });
                }
                if (prop === 'charoption') {
                    const names: Raw = { SG: '超自然赠礼', OF: '可选特性', DG: '黑暗赠礼', 'RF:B': '替换特性，背景', CS: '角色秘密', PTH: '道途' };
                    const codes = array(raw.optionType), categories = codes.map(code => additionalTypes[(origin?.repository || '5etools-cn') + ':charOption:' + code] || names[code] || String(code));
                    fields = { charOptionCategory: [...new Set(categories)].join('／'), charOptionTypeLabels: [...new Set(categories)], optionTypes: codes, prerequisite: array(raw.prerequisite).map(choice).join(' 或 ') };
                }
                if (prop === 'reward') {
                    const names: Raw = { Blessing: '祝福', Boon: '恩赐', Charm: '护咒', Curse: '诅咒', 'Draconic Gift': '龙族赠礼', 'Fragment of Suffering': '痛苦碎片', Inhabitation: '附体', 'Piety Trait': '虔信特质', Other: '其他' };
                    fields = { rewardType: additionalTypes[(origin?.repository || '5etools-cn') + ':rewardTypes:' + raw.type] || names[raw.type] || raw.type || '', rewardTypeCode: raw.type, rarity: raw.rarity ? rarities[raw.rarity] || raw.rarity : '', prerequisite: array(raw.prerequisite).map(choice).join(' 或 ') };
                }
                if (prop === 'psionic') {
                    fields = { psionicType: additionalTypes[(origin?.repository || '5etools-cn') + ':psionicTypes:' + raw.type] || ({ D: '法门 Discipline', T: '天赋 Talent' } as Raw)[raw.type] || raw.type || '', psionicTypeCode: raw.type, psionicOrder: raw.order || '', prerequisite: array(raw.prerequisite).map(choice).join(' 或 ') };
                    const sections = psionicSections(raw, render, text, warn);
                    if (sections)
                        body += '\n\n' + sections;
                }
                if (['charoption', 'reward', 'psionic'].includes(prop) && raw.additionalSpells) {
                    const references = new Set<string>();
                    const collect = (value: any) => {
                        if (typeof value === 'string' && /^[^{}|\n]+\|[a-z0-9-]+$/i.test(value))
                            references.add(value);
                        else if (Array.isArray(value))
                            value.forEach(collect);
                        else if (value && typeof value === 'object')
                            Object.values(value).forEach(collect);
                    };
                    collect(raw.additionalSpells);
                    if (references.size)
                        relatedSections.push({ title: '关联法术', body: [...references].map(uid => '- ' + text('{@spell ' + uid + '}')).join('\n') });
                }
                if (prop === 'optionalfeature') {
                    // Labels follow the upstream optional-feature type vocabulary, not invented character roles.
                    const typeLabels: Raw = { AI: '奇械师注法', ED: '法门', EI: '魔能祈唤', MM: '超魔法', MV: '战技', 'MV:B': '战技，战斗大师', 'MV:C2-UA': '战技，骑兵 V2 (UA)', AS: '奥术射击', 'AS:V1-UA': '奥术射击，V1 (UA)', 'AS:V2-UA': '奥术射击，V2 (UA)', OTH: '其他', 'FS:F': '战斗风格，战士', 'FS:B': '战斗风格，吟游诗人', 'FS:P': '战斗风格，圣武士', 'FS:R': '战斗风格，游侠', PB: '魔契恩泽', OR: 'Onomancy Resonant', RN: '符文骑士符文', AF: '炼金配方', TT: '旅者技艺', RP: '声望特权' };
                    const codes = array(raw.featureType), categories = [...new Set(codes.map(code => optionalTypes[(origin?.repository || '5etools-cn') + ':' + origin?.path + ':' + code] || optionalTypes[(origin?.repository || '5etools-cn') + ':' + code] || typeLabels[code] || String(code)))];
                    const owners = (prepared.class || []).filter((c: Raw) => array(c.optionalfeatureProgression).some(progression => array(progression.featureType).some(type => codes.includes(type))));
                    const category = categories.every(label => label.startsWith('战斗风格')) && categories.length ? '战斗风格' : categories.join('／');
                    fields = { optionCategory: category, optionTypes: codes, optionTypeLabels: categories, associatedClasses: [...new Set(owners.map((owner: Raw) => owner.name))], prerequisite: array(raw.prerequisite).map(choice).join(' 或 ') };
                }
                if (prop === 'feat') {
                    const cats: Raw = { O: '起源', G: '通用', FS: '战斗风格', EB: '传奇恩惠' };
                    fields = { featCategory: cats[raw.category] || '', category: cats[raw.category] ? cats[raw.category] + '专长' : '', prerequisite: array(raw.prerequisite).map(choice).join(' 或 ') };
                }
                if (prop === 'race' || prop === 'subrace') {
                    fields = { creatureType: choice(raw.creatureTypes), size: array(raw.size).map(s => ({ T: '微型', S: '小型', M: '中型', L: '大型', H: '巨型', G: '超巨型' } as Raw)[s] || s).join('或'), speed: typeof raw.speed === 'number' ? raw.speed : undefined, darkvision: raw.darkvision ? raw.darkvision + '尺' : '' };
                    if (raw.speed && typeof raw.speed === 'object')
                        fields.speedText = choice(raw.speed);
                }
                if (['race', 'subrace', 'background', 'feat'].includes(prop)) {
                    const keys = ['darkvision', 'ability', 'skillProficiencies', 'toolProficiencies', 'languageProficiencies', 'weaponProficiencies', 'armorProficiencies', 'expertise', 'additionalSpells', 'feats', 'resist', 'immune', 'conditionImmune'];
                    structuredSupplement = Object.fromEntries(keys.filter(key => raw[key] !== undefined).map(key => [key, raw[key]]));
                    if (raw.inheritedStructuredFields)
                        structuredSupplement.inheritedStructuredFields = raw.inheritedStructuredFields;
                }
                let targetKind = prop === 'bookRule' ? raw._bookRuleKind : kind;
                if (['baseitem', 'item', 'itemGroup', 'magicvariant'].includes(prop)) {
                    const type = String(raw.type || '').split('|')[0], magic = prop === 'magicvariant' || !!raw.rarity && !['none', 'unknown'].includes(raw.rarity);
                    targetKind = magic ? 'magicItems' : ['M', 'R'].includes(type) ? 'weapons' : ['LA', 'MA', 'HA', 'S'].includes(type) ? 'armors' : ['AT', 'T', 'GS', 'INS'].includes(type) ? 'tools' : 'gears';
                    const typeSource = String(raw.type || '').split('|')[1] || 'PHB';
                    const typeMeta = resolve('itemType', type + '|' + typeSource);
                    const propertyNames = array(raw.property).map(p => itemMetadataName(resolve('itemProperty', String(p))) || String(p));
                    fields = { itemTypeCode: type, isWondrous: raw.wondrous === true, type: itemMetadataName(typeMeta) || type, cost: raw.value != null ? raw.value / 100 + ' GP' : '', weight: raw.weight != null ? raw.weight + '磅' : '', rarity: rarities[raw.rarity] || raw.rarity || '', rarities: raw.rarity ? [rarities[raw.rarity] || raw.rarity] : [], attunementRequirement: raw.reqAttuneAlt === 'optional' || raw.reqAttune === 'optional' ? '可选同调' : raw.reqAttune === true ? '需同调' + (raw.reqAttuneTags ? '（' + choice(raw.reqAttuneTags) + '）' : '') : typeof raw.reqAttune === 'string' ? text(raw.reqAttune) : '', weaponCategory: raw.weaponCategory ? (raw.weaponCategory === 'simple' ? '简易' : raw.weaponCategory === 'martial' ? '军用' : raw.weaponCategory) + (type === 'M' ? '近战武器' : type === 'R' ? '远程武器' : '') : '', damage: [raw.dmg1, ({ A: '强酸', B: '钝击', C: '冷冻', F: '火焰', O: '力场', L: '闪电', N: '暗蚀', P: '穿刺', I: '毒素', Y: '心灵', R: '光耀', S: '挥砍', T: '雷鸣' } as Raw)[raw.dmgType] || raw.dmgType].filter(Boolean).join(' '), weaponProperties: propertyNames.join('、'), mastery: choice(raw.mastery), armorCategory: ({ LA: '轻型护甲', MA: '中型护甲', HA: '重型护甲', S: '盾牌' } as Raw)[type] || '', armorClass: raw.ac != null ? (type === 'S' ? '+' : '') + raw.ac + (type === 'LA' ? ' + 敏捷调整值' : type === 'MA' ? ' + 敏捷调整值（至多+2）' : '') : '', strengthRequirement: raw.strength != null ? String(raw.strength) : '', stealth: raw.stealth ? '劣势' : '', toolCategory: ({ AT: '工匠工具', T: '其他工具', GS: '游戏套组', INS: '乐器' } as Raw)[type] || '' };
                    if (raw.dmg2)
                        fields.weaponProperties += (fields.weaponProperties ? '；' : '') + '双手伤害 ' + raw.dmg2;
                    if (raw.range)
                        fields.weaponProperties += (fields.weaponProperties ? '；' : '') + '射程 ' + raw.range;
                    if (raw.additionalEntries?.length)
                        push('补充说明', raw.additionalEntries);
                }
                if (raw.additionalEntries?.length && !['baseitem', 'item', 'itemGroup', 'magicvariant'].includes(prop))
                    push('补充说明', raw.additionalEntries);
                if (prop === 'vehicle') {
                    fields = { gearCategory: '载具', type: '载具' };
                    for (const [key, title] of [['speed', '速度'], ['pace', '行进速度'], ['capCreature', '载员'], ['capCargo', '载货'], ['hull', '船体'], ['control', '操控'], ['movement', '移动部件'], ['weapon', '武器部件'], ['other', '其他部件'], ['action', '动作']])
                        if (raw[key])
                            push(title, typeof raw[key] === 'object' && !Array.isArray(raw[key]) && !raw[key].entries ? choice(raw[key]) : raw[key]);
                }
                const clean = (r: Raw) => Object.fromEntries(Object.entries(r).filter(([k]) => !k.startsWith('__')));
                const publication = raw.source || raw.inherits?.source || '未注明来源';
                const id = 'external:' + encodeURIComponent(identity);
                // Small explicit projection survives the Worker without the full raw objects.
                const buildFields = ['size', 'speed', 'darkvision', 'languageProficiencies', 'skillProficiencies', 'toolProficiencies', 'weaponProficiencies', 'armorProficiencies', 'startingProficiencies', 'proficiency', 'multiclassing', 'startingEquipment', 'inheritedStructuredFields'];
                const buildData = ['class', 'race', 'subrace', 'background'].includes(prop) ? {
                    version: 1,
                    ...Object.fromEntries(buildFields.filter(key => raw[key] !== undefined).map(key => [key, structuredClone(raw[key])])),
                    summary: Object.fromEntries(['languageProficiencies', 'skillProficiencies', 'toolProficiencies', 'weaponProficiencies', 'armorProficiencies'].filter(key => raw[key] !== undefined).map(key => [key, choice(localizeProficiency(raw[key], key === 'armorProficiencies' ? 'armor' : key === 'weaponProficiencies' ? 'weapons' : ''))])),
                    mainSummary: prop === 'class' ? {
                        skills: choice(raw.startingProficiencies?.skills),
                        saves: choice(raw.proficiency),
                        weapons: choice(localizeProficiency(raw.startingProficiencies?.weapons, 'weapons')),
                        armor: choice(localizeProficiency(raw.startingProficiencies?.armor, 'armor')),
                        tools: choice(raw.startingProficiencies?.tools),
                    } : undefined,
                    multiclassSummary: prop === 'class' ? Object.fromEntries(Object.entries(raw.multiclassing?.proficienciesGained || {}).map(([key, value]) => [key, choice(localizeProficiency(value, key === 'armor' || key === 'armorProficiencies' ? 'armor' : key === 'weapons' || key === 'weaponProficiencies' ? 'weapons' : ''))])) : undefined,
                    inheritedSummary: Object.fromEntries(Object.entries(raw.inheritedStructuredFields || {}).map(([key, value]) => [key, choice(localizeProficiency(value, key === 'armorProficiencies' ? 'armor' : key === 'weaponProficiencies' ? 'weapons' : ''))])),
                    goldAlternativeText: raw.startingEquipment?.goldAlternative ? text(String(raw.startingEquipment.goldAlternative)) : '',
                    equipmentDescription: raw.startingEquipment ? render(raw.startingEquipment.entries || raw.startingEquipment.default || []) : '',
                } : undefined;
                const inventoryMeta = ['baseitem', 'item', 'itemGroup', 'magicvariant'].includes(prop) ? {
                    version: 1, type: String(raw.type || '').split('|')[0], typeName: fields.type, weaponCategory: raw.weaponCategory,
                    attunement: { mode: raw.reqAttuneAlt === 'optional' || raw.reqAttune === 'optional' ? 'optional' : raw.reqAttune === true || typeof raw.reqAttune === 'string' && !!raw.reqAttune ? 'required' : raw.reqAttune == null || raw.reqAttune === false ? 'none' : 'unknown', requirement: fields.attunementRequirement, rawRequirement: raw.reqAttune, tags: raw.reqAttuneTags, alternate: raw.reqAttuneAlt },
                    focusType: raw.scfType, consumable: raw.consumable === true || array(raw.miscTags).includes('CNS') || ['A', 'AF', 'P', 'SC', 'FD'].includes(String(raw.type || '').split('|')[0]),
                    packContents: raw.packContents ? structuredClone(raw.packContents) : undefined,
                    otherSources: array(raw.otherSources).map(s => s.source),
                } : undefined;
                entries.push({ buildData, inventoryMeta, id, kind: targetKind, name: raw.name, englishName: raw.ENG_name || '', source: publication, sourceName: sourceMeta[(origin?.repository || '5etools-cn') + ':' + publication]?.full || sourceMeta[(origin?.repository || '5etools-cn') + ':' + publication]?.name || publication, sourceProvider: origin?.repository || '5etools-cn', rulesEdition: ['classic', '经典'].includes(raw.edition) ? '2014' : ['one', '一'].includes(raw.edition) ? '2024' : '', contentOrigin: 'external-5etools', structuredSupplement, fluffDescription, description: body.trim(), fullDescription: body.trim(), fields, ...fields, features: [], traits: [], benefits: [], subclasses: [], relatedSections, raw: raw.__original || clean(sourceRaw), resolvedRaw: clean(raw), sourceIdentity: identity, parentResource: raw.parentResource || (prop === 'race' && raw._versionBaseName ? { name: raw._versionBaseName, source: raw._versionBaseSource || raw.source } : undefined), classFeatureReferences: prop === 'class' ? raw.classFeatures : undefined, subclassFeatureReferences: prop === 'subclass' ? raw.subclassFeatures : undefined, subclassReferences: prop === 'class' ? (prepared.subclass || []).filter((s: Raw) => aliases(raw, s.className) && sourceEq(s.classSource, raw.source)).map((s: Raw) => ({ name: s.name, source: s.source, className: s.className, classSource: s.classSource, compatibility: !!compatible(s), canonicalSubclass: compatible(s) || undefined })) : undefined, provenance: { provider: origin?.repository || '5etools-cn', path: origin?.path || '', revision: origin?.revision || '', url: origin?.url || '', license: origin?.repository === 'homebrew' ? '逐包上游声明，仓库未发现根LICENSE；见外部数据源说明' : 'CC BY-NC-SA 4.0 · Kiwee、民间汉化组及独立译者；展示结构转换，原始文档保留' }, tags: [publication], parseStatus: 'parsed' });
            }
            catch (error) {
                diagnostics.push({ code: 'ENTRY_PARSE_FAILED', identity: [prop, sourceRaw.name, sourceRaw.source, sourceRaw.classSource].filter(Boolean).join('|'), message: String(error), path: sourceRaw.__origin?.path });
            }
        }
    const byId = new Map<string, Raw>();
    for (const entry of entries) {
        if (byId.has(entry.id))
            diagnostics.push({ code: 'DUPLICATE_IDENTITY', identity: entry.sourceIdentity, message: '发现相同来源身份，保留先注册项，原始文档均保留。' });
        else
            byId.set(entry.id, entry);
    }
    const diagnosticsByIdentity = new Map<string, Diagnostic[]>();
    for (const diagnostic of diagnostics) {
        if (!diagnosticsByIdentity.has(diagnostic.identity))
            diagnosticsByIdentity.set(diagnostic.identity, []);
        diagnosticsByIdentity.get(diagnostic.identity)!.push(diagnostic);
    }
    for (const entry of byId.values()) {
        if (entry.kind === 'subclasses')
            entry.compatibilityLinks = compatibilityLinks.filter(link => link.provider === entry.sourceProvider && sourceEq(link.canonical.source, entry.source) && sourceEq(link.canonical.classSource, entry.parentClassSource) && parentMatch(link.canonical.className, entry.parentClass, entry.parentClassSource) && [entry.name, entry.englishName].some(name => aliases({ name: link.canonical.name, ENG_name: link.canonical.englishName }, name)));
        entry.parseDiagnostics = diagnosticsByIdentity.get(entry.sourceIdentity) || [];
        entry.parseStatus = entry.parseDiagnostics.length ? 'partial' : 'parsed';
    }
    return { entries: [...byId.values()], compatibilityLinks, diagnostics, documents: documents.length };
}




