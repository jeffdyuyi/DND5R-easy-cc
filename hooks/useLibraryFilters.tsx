import { useState } from 'react';
import { SpellItem, FeatItem, ItemItem } from '../types';
const values = (xs: unknown[]) => [...new Set(xs.filter((s): s is string => typeof s === 'string' && s.trim().length > 0))];
function Facet({ label, options, value, onChange, format = (s: string) => s }: {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    format?: (value: string) => string;
}) {
    return <div className="resource-facet" role="group" aria-label={label + '筛选'}><span className="resource-facet-label">{label}</span><div className="resource-facet-options"><button type="button" aria-pressed={value === 'all'} onClick={() => onChange('all')}>全部</button>{options.map(option => <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{format(option)}</button>)}</div></div>;
}
export function useFieldFilter<T>(items: T[], label: string, read: (item: T) => unknown, format?: (s: string) => string) {
    const [selected, setSelected] = useState('all');
    const options = values(items.map(read));
    const current = options.includes(selected) ? selected : 'all';
    return { filteredItems: current === 'all' ? items : items.filter(item => read(item) === current), FilterUI: options.length ? <div className="resource-facets"><Facet label={label} options={options} value={current} onChange={setSelected} format={format}/></div> : null };
}
// One record may belong to several upstream categories; filtering must not concatenate them.
export function useMultiFieldFilter<T>(items: T[], label: string, read: (item: T) => unknown) {
    const [selected, setSelected] = useState('all');
    const labels = (item: T) => { const value = read(item); return values(Array.isArray(value) ? value : [value]); };
    const options = values(items.flatMap(labels)).sort((a, b) => a.localeCompare(b, 'zh-CN'));
    const current = options.includes(selected) ? selected : 'all';
    return { filteredItems: current === 'all' ? items : items.filter(item => labels(item).includes(current)), FilterUI: options.length ? <div className="resource-facets"><Facet label={label} options={options} value={current} onChange={setSelected}/></div> : null };
}
export const useSpellFilter = (spells: SpellItem[]) => {
    const [level, setLevel] = useState('all'), [school, setSchool] = useState('all'), [cls, setCls] = useState('all');
    const levels = values(spells.map(s => Number.isInteger(s.level) ? String(s.level) : '')).sort((a, b) => +a - +b), schools = values(spells.map(s => s.school)), classes = values(spells.flatMap(s => s.classes || []));
    const l = levels.includes(level) ? level : 'all', s = schools.includes(school) ? school : 'all', c = classes.includes(cls) ? cls : 'all';
    return { filteredSpells: spells.filter(item => (l === 'all' || item.level === +l) && (s === 'all' || item.school === s) && (c === 'all' || item.classes?.includes(c))), FilterUI: spells.length ? <div className="resource-facets"><Facet label="环阶" options={levels} value={l} onChange={setLevel} format={v => v === '0' ? '戏法' : v + '环'}/><Facet label="学派" options={schools} value={s} onChange={setSchool}/><Facet label="职业法术列表" options={classes} value={c} onChange={setCls}/></div> : null };
};
export const useFeatFilter = (feats: FeatItem[]) => { const result = useFieldFilter(feats, '专长类别', item => (item as any).featCategory ? ((item as any).featCategory + '专长') : item.category); return { filteredFeats: result.filteredItems, FilterUI: result.FilterUI }; };
export const useItemFilter = (items: ItemItem[], legacyCategories: string[]) => {
    const read = (item: ItemItem) => (item as any).toolCategory || (item as any).gearCategory || legacyCategories.find(category => item.type === category || item.tags?.includes(category));
    return useFieldFilter(items, '类别', read);
};
export const useMagicItemFilter = (items: ItemItem[]) => {
    const [type, setType] = useState('all'), [rarity, setRarity] = useState('all');
    const types = values(items.map(item => item.type)), rarities = values(items.flatMap(item => item.rarities?.length ? item.rarities : [item.rarity]));
    const t = types.includes(type) ? type : 'all', r = rarities.includes(rarity) ? rarity : 'all';
    return { filteredItems: items.filter(item => (t === 'all' || item.type === t) && (r === 'all' || (item.rarities?.length ? item.rarities.includes(r) : item.rarity === r))), FilterUI: items.length ? <div className="resource-facets"><Facet label="物品类型" options={types} value={t} onChange={setType}/><Facet label="稀有度" options={rarities} value={r} onChange={setRarity}/></div> : null };
};
