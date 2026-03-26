import React, { useState } from 'react';
import { SpellItem } from '../../types';
import { MarkdownTextarea, BookOpen, AlertTriangle } from './EditorBase';
import { CLASS_DB } from '../../data';

interface SpellEditorProps {
    item: SpellItem;
    setItem: React.Dispatch<React.SetStateAction<SpellItem | null>>;
}

export const SpellEditor: React.FC<SpellEditorProps> = ({ item, setItem }) => {
    const [showGuide, setShowGuide] = useState(true);

    const SCHOOL_OPTIONS = [
        "防护", "咒法", "预言", "惑控", "塑能", "幻术", "死灵", "变化"
    ];

    const CLASS_OPTIONS = CLASS_DB.map(c => c.name);

    const toggleClass = (cls: string) => {
        setItem(prev => {
            if (!prev) return null;
            const current = prev.classes || [];
            if (current.includes(cls)) return { ...prev, classes: current.filter(c => c !== cls) };
            return { ...prev, classes: [...current, cls] };
        });
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Creation Guide */}
            <section className="bg-blue-50 border-2 border-blue-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                    onClick={() => setShowGuide(!showGuide)}
                    className="w-full px-6 py-3 bg-blue-100/50 flex justify-between items-center text-blue-900 font-black text-sm uppercase tracking-widest"
                >
                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> 法术设计指南</span>
                    <span className="text-xs font-bold">{showGuide ? "收起" : "展开"}</span>
                </button>
                {showGuide && (
                    <div className="p-6 text-sm text-blue-800 space-y-4 leading-relaxed font-medium">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p>• <strong>定位符合:</strong> 确保法术效能符合施法职业风格。</p>
                            <p>• <strong>平衡环阶:</strong> 若法术效应极强，应提升环阶而非限制数值。</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <h5 className="font-black mb-3 flex items-center gap-2 text-xs uppercase tracking-widest"><AlertTriangle className="w-4 h-4" /> 5R 期望伤害参考</h5>
                            <div className="grid grid-cols-3 gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1 px-2">
                                <div>环阶</div><div>单体伤害</div><div>范围伤害</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs bg-white/50 p-3 rounded-xl border border-blue-100">
                                <div>戏法</div><div className="text-blue-900">1d10</div><div className="text-blue-900">1d6</div>
                                <div>1 环</div><div className="text-blue-900">2d10</div><div className="text-blue-900">2d6</div>
                                <div>3 环</div><div className="text-blue-900">5d10</div><div className="text-blue-900">6d6</div>
                                <div>5 环</div><div className="text-blue-900">8d10</div><div className="text-blue-900">8d6</div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Basic Fields */}
            <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-6 border-b border-stone-100 pb-2">基础参数法术</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">环阶 (Level)</label>
                        <select
                            value={item.level}
                            onChange={e => setItem(p => p ? { ...p, level: parseInt(e.target.value) } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-blue-600 bg-white font-bold"
                        >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => <option key={l} value={l}>{l === 0 ? '戏法 (Cantrip)' : `${l} 环`}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">学派 (School)</label>
                        <select
                            value={item.school}
                            onChange={e => setItem(p => p ? { ...p, school: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-blue-600 bg-white font-bold"
                        >
                            {SCHOOL_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">施法时间</label>
                        <input
                            type="text"
                            value={item.castingTime}
                            onChange={e => setItem(p => p ? { ...p, castingTime: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-blue-600 font-bold"
                            placeholder="例如：1 动作, 10 分钟 (礼仪)..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">范围 (Range)</label>
                        <input
                            type="text"
                            value={item.range}
                            onChange={e => setItem(p => p ? { ...p, range: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-blue-600 font-bold"
                            placeholder="例如：60 尺, 自身 (15尺锥状)..."
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">成分 (Components)</label>
                        <input
                            type="text"
                            value={item.components}
                            onChange={e => setItem(p => p ? { ...p, components: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-blue-600 font-bold"
                            placeholder="V, S, M..."
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">持续时间</label>
                        <input
                            type="text"
                            value={item.duration}
                            onChange={e => setItem(p => p ? { ...p, duration: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-blue-600 font-bold"
                            placeholder="立即, 专注 (1分钟)..."
                        />
                    </div>
                </div>
            </section>

            {/* Classes */}
            <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">适用职业 (Classes)</h3>
                <div className="flex flex-wrap gap-2">
                    {CLASS_OPTIONS.map(cls => (
                        <button
                            key={cls}
                            onClick={() => toggleClass(cls)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${(item.classes || []).includes(cls)
                                ? 'bg-blue-800 text-white border-blue-800 shadow-md'
                                : 'bg-stone-50 text-stone-400 border-transparent hover:border-stone-100'
                                }`}
                        >
                            {cls}
                        </button>
                    ))}
                </div>
            </section>

            {/* Details */}
            <section className="space-y-6">
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">法术详情 (Markdown)</label>
                    <MarkdownTextarea
                        value={item.description}
                        onChange={e => setItem(p => p ? { ...p, description: e.target.value } : null)}
                        className="min-h-[250px]"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 px-1">升环施法效果 (Higher Level)</label>
                    <textarea
                        value={item.higherLevel || ''}
                        onChange={e => setItem(p => p ? { ...p, higherLevel: e.target.value } : null)}
                        className="w-full p-4 border-2 border-stone-100 rounded-2xl focus:border-blue-600 outline-none font-medium h-24"
                        placeholder="当你使用更高环阶法术位施展此法术时..."
                    />
                </div>
            </section>
        </div>
    );
};
