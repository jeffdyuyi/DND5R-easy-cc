import { Raw } from './model';
import { itemMetadataName } from './itemMetadata';
const refs = new Set(['spell', 'item', 'creature', 'race', 'background', 'feat', 'class', 'subclass', 'classFeature', 'subclassFeature', 'optfeature', 'recipe', 'disease', 'condition', 'status', 'skill', 'sense', 'action', 'language', 'deity', 'book', 'adventure', 'variantrule', 'hazard', 'table', 'object', 'itemProperty', 'itemMastery', 'card', 'deck']);
export function inline(value: any, warn: (code: string, message: string) => void): string {
    let text = String(value ?? '');
    for (let pass = 0; pass < 24 && /\{@[^{}]+}/.test(text); pass++)
        text = text.replace(/\{@([^\s}]+)(?:\s+([^{}]*))?}/g, (all, tag, payload = '') => {
            const parts = payload.split('|'), first = parts[0];
            if (['b', 'bold'].includes(tag))
                return '**' + payload + '**';
            if (['i', 'italic'].includes(tag))
                return '*' + payload + '*';
            if (['dice', 'damage', 'd20', 'chance'].includes(tag))
                return parts[1] || first;
            if (['scaledice', 'scaledamage'].includes(tag))
                return parts[3] || first + '（' + parts.slice(1).filter(Boolean).join('；') + '）';
            if (tag === 'book' || tag === 'adventure')
                return '[[' + encodeURIComponent(JSON.stringify({ tag, name: first, source: parts[1] || 'PHB', chapter: parts[2], section: parts[3] })) + '|' + first + ']]';
            if (refs.has(tag)) {
                const defaults: Record<string, string> = { creature: 'MM', item: 'DMG', disease: 'DMG', object: 'DMG', variantrule: 'DMG', table: 'DMG', hazard: 'DMG', deck: 'DMG', card: 'DMG', itemMastery: 'XPHB', recipe: 'HF' };
                const sourceIndex = tag === 'subclass' ? 3 : tag === 'classFeature' ? 4 : tag === 'subclassFeature' ? 6 : ['card', 'deity'].includes(tag) ? 2 : 1;
                const displayIndex = tag === 'subclass' ? 4 : tag === 'classFeature' ? 5 : tag === 'subclassFeature' ? 7 : ['card', 'deity'].includes(tag) ? 3 : 2;
                return '[[' + encodeURIComponent(JSON.stringify({ tag, name: first, source: parts[sourceIndex] || defaults[tag] || 'PHB', uid: payload, parts })) + '|' + (parts[displayIndex] || first) + ']]';
            }
            if (tag === 'link') return /^https?:\/\//.test(parts[1] || '') ? '[' + first + '](' + parts[1] + ')' : first;
            if (['filter', '5etools', 'quickref'].includes(tag))
                return first;
            if (['color', 'highlight', 'tip'].includes(tag))
                return first;
            if (tag === 'dc')
                return 'DC ' + first;
            if (tag === 'hit')
                return /^[+-]/.test(first) ? first : '+' + first;
            if (tag === 'h')
                return '命中：';
            if (tag === 'atk')
                return ({ mw: '近战武器攻击', rw: '远程武器攻击', ms: '近战法术攻击', rs: '远程法术攻击', 'mw,rw': '近战或远程武器攻击' } as Raw)[first] || first;
            if (tag === 'note')
                return payload;
            warn('UNKNOWN_TAG', '未支持的标签：' + tag);
            return payload || all;
        });
    return text;
}
export function createEntryRenderer(resolve: (type: string, uid: string) => Raw | undefined, warn: (code: string, message: string) => void) {
    const txt = (x: any) => inline(x, warn);
    function render(value: any, seen = new Set<string>(), depth = 0): string {
        if (value == null)
            return '';
        if (typeof value === 'string') {
            const match = value.match(/^\{#(classFeature|subclassFeature|optionalfeature|itemEntry) ([^}]+)}$/);
            if (match)
                return reference(match[1], match[2], seen, depth);
            return txt(value);
        }
        if (typeof value === 'number' || typeof value === 'boolean')
            return String(value);
        if (Array.isArray(value))
            return value.map(v => render(v, seen, depth)).filter(Boolean).join('\n\n');
        const type = value.type || 'entries';
        if (type === 'ingredient') {
            return render(value.entry, seen, depth).replace(/\{=(amount\d+)(?:\/[^}]+)?}/g, (original, key) => typeof value[key] === 'number' ? String(value[key]) : original);
        }
        if (/^ref/.test(type)) {
            const key = type.slice(3, 4).toLowerCase() + type.slice(4);
            return reference(key, value[key] || value.uid || '', seen, depth);
        }
        if (type === 'statblock') {
            const tag = value.tag || 'creature', uid = [value.name || value.ENG_name, value.source].filter(Boolean).join('|');
            const target = resolve(tag, uid);
            if (!target) {
                warn('MISSING_STATBLOCK', '资料块未找到：' + tag + ' ' + uid);
                return '关联资料待解析：' + txt(value.name || value.ENG_name || '');
            }
            if (tag !== 'item') {
                warn('UNSUPPORTED_STATBLOCK', '尚未支持的资料块：' + tag + ' ' + uid);
                return reference(tag, uid, seen, depth);
            }
            const damage: Raw = { A: '强酸', B: '钝击', C: '冷冻', F: '火焰', O: '力场', L: '闪电', N: '暗蚀', P: '穿刺', I: '毒素', Y: '心灵', R: '光耀', S: '挥砍', T: '雷鸣' };
            const properties = (target.property || []).map((p: string) => itemMetadataName(resolve('itemProperty', p)) || p);
            const mastery = (target.mastery || []).map((m: any) => { const id = typeof m === 'string' ? m : m.uid; return txt(id.split('|')[0]) + (m.note ? '（' + txt(m.note) + '）' : ''); });
            return ['### ' + txt(target.name), target.dmg1 ? '**伤害** ' + target.dmg1 + ' ' + (damage[target.dmgType] || target.dmgType || '') : '', properties.length ? '**属性** ' + properties.join('、') : '', target.range ? '**射程** ' + target.range + '尺' : '', mastery.length ? '**精通** ' + mastery.join('、') : '', render(target.entries, seen, depth + 1)].filter(Boolean).join('\n\n');
        }
        if (type === 'cell')
            return value.entry !== undefined ? render(value.entry, seen, depth) : value.roll ? (value.roll.exact ?? (value.roll.min + '–' + value.roll.max)) + '' : render(value.entries, seen);
        if (type === 'bonus' || type === 'bonusSpeed')
            return (Number(value.value) >= 0 ? '+' : '') + value.value + (type === 'bonusSpeed' ? '尺' : '');
        if (type === 'dice')
            return value.toRoll ? value.toRoll.map((v: Raw) => String(v.number ?? 1) + 'd' + v.faces + (v.modifier ? (Number(v.modifier) > 0 ? '+' : '') + String(v.modifier) : '')).join(' + ') : txt(value.displayText || value.rollable || '');
        if (type === 'abilityDc' || type === 'abilityAttackMod' || type === 'abilityGeneric') {
            const attrs = (value.attributes || []).map((a: string) => ({ str: '力量', dex: '敏捷', con: '体质', int: '智力', wis: '感知', cha: '魅力' } as Raw)[a] || a).join('或');
            return type === 'abilityDc' ? '法术豁免DC = 8 + 熟练加值 + ' + attrs + '调整值' : type === 'abilityAttackMod' ? '法术攻击调整值 = 熟练加值 + ' + attrs + '调整值' : txt(value.text || value.name || '') + ' ' + attrs;
        }
        if (type === 'tableGroup')
            return render(value.tables, seen, depth);
        if (type === 'table') {
            const cell = (v: any) => render(v, seen, depth).replace(/\n+/g, ' ').replace(/\|/g, '\\|');
            const rows = (value.rows || []).map((r: any) => Array.isArray(r) ? r : r.row || []);
            const count = Math.max(value.colLabels?.length || 0, ...rows.map((r: any[]) => r.length));
            if (!count)
                return render(value.caption, seen, depth);
            const row = (r: any[]) => '| ' + Array.from({ length: count }, (_, i) => cell(r[i] ?? '')).join(' | ') + ' |';
            return [value.caption ? '### ' + txt(value.caption) : '', row(value.colLabels || []), row(Array(count).fill('---')), ...rows.map(row), render(value.footnotes, seen, depth)].filter(Boolean).join('\n');
        }
        if (type === 'list')
            return (value.items || []).map((item: any) => '- ' + render(item && typeof item === 'object' && item.name ? { ...item, type: 'item' } : item, seen, depth).replace(/\n+/g, '\n  ')).join('\n');
        if (type === 'image' || type === 'gallery') {
            warn('MEDIA_NOT_RENDERED', '图片或图集未在当前正文展示，见上游原始资料');
            return txt(value.title || value.alt || '') + '（图片请查阅上游资料）';
        }
        if (type === 'link') { const url = value.href?.url || value.href?.path || ''; return /^https?:\/\//.test(url) ? '[' + txt(value.text || url) + '](' + url + ')' : txt(value.text || url); }
        const name = value.name ? txt(value.name) + (value.ENG_name ? ' · ' + txt(value.ENG_name) : '') : '';
        if (['item', 'itemSub', 'itemSpell'].includes(type))
            return [name ? '**' + name + '**' : '', render(value.entries ?? value.entry, seen, depth + (name ? 1 : 0))].filter(Boolean).join(' ');
        const named = name ? '#'.repeat(Math.min(6, 3 + depth)) + ' ' + name : '';
        if (['entries', 'section', 'inset', 'insetReadaloud', 'variant', 'variantSub', 'options', 'quote', 'item', 'itemSub', 'itemSpell', 'flowchart', 'flowBlock'].includes(type)) {
            const body = render(value.entries ?? value.entry ?? value.items ?? value.blocks, seen, depth + (name ? 1 : 0));
            const prompt = type === 'options' && value.count ? '选择 ' + value.count + ' 项：' : '';
            const content = [prompt, body, value.by ? txt(value.by) : ''].filter(Boolean).join('\n\n');
            return [named, ['inset', 'insetReadaloud', 'quote'].includes(type) ? content.split('\n').map(line => '> ' + line).join('\n') : content].filter(Boolean).join('\n\n');
        }
        warn('UNKNOWN_NODE', '未支持的正文节点：' + type);
        // Preserve human-readable fields, retain the exact object separately in raw.
        return [named, ...Object.entries(value).filter(([k]) => !['name', 'ENG_name', 'type', 'style', 'source', 'page', 'id'].includes(k)).map(([, v]) => render(v, seen, depth))].filter(Boolean).join('\n\n');
    }
    function reference(type: string, uid: string, seen: Set<string>, depth: number): string {
        uid = String(uid ?? '');
        const id = type + ':' + uid;
        if (seen.has(id)) {
            warn('REFERENCE_CYCLE', id);
            return '关联内容存在循环引用：' + txt(uid.split('|')[0]);
        }
        const target = resolve(type, uid);
        if (!target) {
            warn('MISSING_REFERENCE', id);
            return '关联内容待解析：' + txt(uid.split('|')[0]);
        }
        return render({ type: 'entries', name: target.name, ENG_name: target.ENG_name, entries: target.entries || target.entriesTemplate }, new Set([...seen, id]), depth);
    }
    return render;
}


