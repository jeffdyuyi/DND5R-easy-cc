import React, { useState, useMemo } from 'react';
import { SpellItem, FeatItem, ItemItem, ClassItem } from '../types';

const MAGIC_SCHOOLS = [
    { name: 'all', label: '所有学派' },
    { name: '防护', label: '防护 (Abjuration)' },
    { name: '咒法', label: '咒法 (Conjuration)' },
    { name: '预言', label: '预言 (Divination)' },
    { name: '惑控', label: '惑控 (Enchantment)' },
    { name: '塑能', label: '塑能 (Evocation)' },
    { name: '幻术', label: '幻术 (Illusion)' },
    { name: '死灵', label: '死灵 (Necromancy)' },
    { name: '变化', label: '变化 (Transmutation)' },
];

export const useSpellFilter = (spells: SpellItem[], classes: ClassItem[]) => {
    const [level, setLevel] = useState<string>('all');
    const [school, setSchool] = useState<string>('all');
    const [cls, setCls] = useState<string>('all');

    const filteredSpells = useMemo(() => spells.filter(s => {
        const matchLevel = level === 'all' ? true : s.level === parseInt(level);
        const matchSchool = school === 'all' ? true : s.school === school;
        const matchClass = cls === 'all' ? true : (s.classes && s.classes.includes(cls));
        return matchLevel && matchSchool && matchClass;
    }), [spells, level, school, cls]);

    const FilterUI = (
        <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
            <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="p-2 border border-stone-300 rounded text-sm bg-white"
            >
                <option value="all">所有环阶</option>
                <option value="0">0环 (戏法)</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => <option key={l} value={l}>{l}环</option>)}
            </select>

            <select
                value={school}
                onChange={e => setSchool(e.target.value)}
                className="p-2 border border-stone-300 rounded text-sm bg-white"
            >
                {MAGIC_SCHOOLS.map(s => <option key={s.name} value={s.name}>{s.label}</option>)}
            </select>

            <select
                value={cls}
                onChange={e => setCls(e.target.value)}
                className="p-2 border border-stone-300 rounded text-sm bg-white"
            >
                <option value="all">所有职业</option>
                {classes.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
        </div>
    );

    return { filteredSpells, FilterUI };
};

export const useFeatFilter = (feats: FeatItem[]) => {
    const [category, setCategory] = useState<string>('all');

    const filteredFeats = useMemo(() => feats.filter(f => {
        if (category === 'all') return true;
        return f.category === category;
    }), [feats, category]);

    const FilterUI = (
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {['all', '起源专长', '通用专长', '战斗风格专长', '传奇恩惠专长'].map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${category === cat
                        ? 'bg-dndRed text-white border-dndRed'
                        : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                        }`}
                >
                    {category === 'all' ? '全部' : cat.replace('专长', '')}
                </button>
            ))}
        </div>
    );

    return { filteredFeats, FilterUI };
};

export const useItemFilter = (items: ItemItem[], categories: string[]) => {
    const [category, setCategory] = useState<string>('all');

    const filteredItems = useMemo(() => items.filter(i => {
        if (category === 'all') return true;
        // Check tags or type? Original used tags for tools/gears, type for magic items?
        // Let's assume tags for generic item filter based on usage
        return i.tags?.includes(category) || i.type === category;
    }), [items, category]);

    const FilterUI = (
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <button
                onClick={() => setCategory('all')}
                className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${category === 'all'
                    ? 'bg-dndRed text-white border-dndRed'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                    }`}
            >
                全部
            </button>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${category === cat
                        ? 'bg-dndRed text-white border-dndRed'
                        : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );

    return { filteredItems, FilterUI };
};

export const useMagicItemFilter = (items: ItemItem[]) => {
    const [type, setType] = useState<string>('all');
    const [rarity, setRarity] = useState<string>('all');

    const filteredItems = useMemo(() => items.filter(m => {
        const matchType = type === 'all' ? true : m.type === type;
        const matchRarity = rarity === 'all' ? true : m.rarity === rarity;
        return matchType && matchRarity;
    }), [items, type, rarity]);

    const FilterUI = (
        <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
            <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="p-2 border border-stone-300 rounded text-sm bg-white"
            >
                <option value="all">所有类别</option>
                {['护甲', '药水', '戒指', '权杖', '卷轴', '法杖', '魔杖', '武器', '奇物'].map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>

            <select
                value={rarity}
                onChange={e => setRarity(e.target.value)}
                className="p-2 border border-stone-300 rounded text-sm bg-white"
            >
                <option value="all">所有稀有度</option>
                {['普通', '非普通', '珍稀', '极珍稀', '传说', '神器'].map(r => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
        </div>
    );

    return { filteredItems, FilterUI };
}
