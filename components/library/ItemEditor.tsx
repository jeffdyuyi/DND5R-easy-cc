import React from 'react';
import { ItemItem } from '../../types';
import { MarkdownTextarea, Plus, Trash2 } from './EditorBase';

interface ItemEditorProps {
    item: ItemItem;
    setItem: React.Dispatch<React.SetStateAction<ItemItem | null>>;
}

export const ItemEditor: React.FC<ItemEditorProps> = ({ item, setItem }) => {
    const updateUtilize = (index: number, field: string, value: string) => {
        setItem(prev => {
            if (!prev) return null;
            const newUtilize = [...(prev.toolUtilize || [])];
            newUtilize[index] = { ...newUtilize[index], [field]: value };
            return { ...prev, toolUtilize: newUtilize };
        });
    };

    const addUtilize = () => {
        setItem(prev => prev ? ({ ...prev, toolUtilize: [...(prev.toolUtilize || []), { action: "", dc: "", description: "" }] }) : null);
    };

    const removeUtilize = (index: number) => {
        setItem(prev => prev ? ({ ...prev, toolUtilize: (prev.toolUtilize || []).filter((_, i) => i !== index) }) : null);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Basic Stats Grid */}
            <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-6 border-b border-stone-200 pb-2">物品基础参数</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">价值</label>
                        <input type="text" value={item.cost} onChange={e => setItem(p => p ? { ...p, cost: e.target.value } : null)} className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-stone-600 font-bold" placeholder="25 GP" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">重量</label>
                        <input type="text" value={item.weight} onChange={e => setItem(p => p ? { ...p, weight: e.target.value } : null)} className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-stone-600 font-bold" placeholder="1 lb" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">类型详述</label>
                        <select
                            value={item.type || ''}
                            onChange={e => setItem(p => p ? { ...p, type: e.target.value as any } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-stone-600 bg-white font-bold"
                        >
                            <option value="杂物">杂物</option>
                            <option value="武器">武器</option>
                            <option value="护甲">护甲</option>
                            <option value="药水">药水</option>
                            <option value="工具">工具</option>
                            <option value="奇物">奇物</option>
                            <option value="魔法物品">魔法物品</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">稀有度</label>
                        <select
                            value={item.rarity || ''}
                            onChange={e => setItem(p => p ? { ...p, rarity: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-stone-600 bg-white font-bold"
                        >
                            <option value="">普通 (Common)</option>
                            <option value="非普通">非普通 (Uncommon)</option>
                            <option value="珍稀">珍稀 (Rare)</option>
                            <option value="极珍稀">极珍稀 (Very Rare)</option>
                            <option value="传说">传说 (Legendary)</option>
                            <option value="神器">神器 (Artifact)</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* If Weapon/Armor Stats */}
            <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-6 border-b border-stone-100 pb-2">战斗/防御参数 (可选)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">AC (护甲等级)</label>
                        <input type="text" value={item.ac || ''} onChange={e => setItem(p => p ? { ...p, ac: e.target.value } : null)} className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold" placeholder="例如：18" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">伤害骰 (Damage)</label>
                        <input type="text" value={item.damage || ''} onChange={e => setItem(p => p ? { ...p, damage: e.target.value } : null)} className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold" placeholder="例如：1d8" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">伤害类型</label>
                        <input type="text" value={item.damageType || ''} onChange={e => setItem(p => p ? { ...p, damageType: e.target.value } : null)} className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold" placeholder="钝击, 挥砍..." />
                    </div>
                </div>
            </section>

            {/* Tool Specifics (If applicable) */}
            <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs">工具操作与范例 (Utilize)</h3>
                    <button onClick={addUtilize} className="text-xs bg-stone-800 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition-all hover:bg-stone-700 active:scale-95">
                        <Plus className="w-3.5 h-3.5" /> 添加操作
                    </button>
                </div>
                <div className="space-y-3">
                    {(item.toolUtilize || []).map((u, i) => (
                        <div key={i} className="flex gap-2 items-start group bg-stone-50/50 p-3 rounded-xl border border-transparent hover:border-stone-200 transition-all">
                            <div className="w-1/3">
                                <input type="text" value={u.action} onChange={e => updateUtilize(i, 'action', e.target.value)} className="w-full p-2 border-2 border-stone-100 rounded-lg focus:border-stone-600 outline-none font-bold text-sm" placeholder="动作名称" />
                            </div>
                            <div className="w-16 text-center">
                                <input type="text" value={u.dc} onChange={e => updateUtilize(i, 'dc', e.target.value)} className="w-full p-2 border-2 border-stone-100 rounded-lg focus:border-stone-600 outline-none font-black text-sm text-center" placeholder="DC" />
                            </div>
                            <div className="flex-grow">
                                <input type="text" value={u.description} onChange={e => updateUtilize(i, 'description', e.target.value)} className="w-full p-2 border-2 border-stone-100 rounded-lg focus:border-stone-600 outline-none font-medium text-sm" placeholder="操作效果描述..." />
                            </div>
                            <button onClick={() => removeUtilize(i)} className="p-2 text-stone-300 hover:text-red-600 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    {(!item.toolUtilize || item.toolUtilize.length === 0) && (
                        <div className="text-center p-8 text-stone-400 italic text-xs">非工具类别物品通常无需配置此项</div>
                    )}
                </div>
            </section>

            {/* Main Description */}
            <section>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 px-1">物品详细描述 (Markdown)</label>
                <MarkdownTextarea
                    value={item.description}
                    onChange={e => setItem(p => p ? { ...p, description: e.target.value } : null)}
                    className="min-h-[250px]"
                />
            </section>
        </div>
    );
};
