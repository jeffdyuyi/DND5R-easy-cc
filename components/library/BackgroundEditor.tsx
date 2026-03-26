import React from 'react';
import { BackgroundItem, FeatItem } from '../../types';
import { MarkdownTextarea, ATTR_OPTIONS, ALL_SKILLS } from './EditorBase';

interface BackgroundEditorProps {
    item: BackgroundItem;
    setItem: React.Dispatch<React.SetStateAction<BackgroundItem | null>>;
    feats: FeatItem[];
}

export const BackgroundEditor: React.FC<BackgroundEditorProps> = ({ item, setItem, feats }) => {
    const handleAbilityToggle = (attr: string) => {
        setItem(prev => {
            if (!prev) return null;
            const current = prev.abilityScores || [];
            if (current.includes(attr)) {
                return { ...prev, abilityScores: current.filter(a => a !== attr) };
            } else {
                if (current.length >= 3) return prev;
                return { ...prev, abilityScores: [...current, attr] };
            }
        });
    };

    const handleSkillToggle = (skill: string) => {
        setItem(prev => {
            if (!prev) return null;
            const current = prev.skills || [];
            if (current.includes(skill)) {
                return { ...prev, skills: current.filter(s => s !== skill) };
            } else {
                return { ...prev, skills: [...current, skill] };
            }
        });
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Step 1: Description */}
            <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">背景设定描述</h3>
                <MarkdownTextarea
                    value={item.description}
                    onChange={e => setItem(p => p ? { ...p, description: e.target.value } : null)}
                    placeholder="描述该背景的起源和在世界中的地位..."
                />
            </section>

            {/* Step 2: Abilities & Feat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                    <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">1. 推荐属性 (选择3个)</h3>
                    <div className="flex gap-2 flex-wrap">
                        {ATTR_OPTIONS.map(attr => (
                            <button
                                key={attr}
                                onClick={() => handleAbilityToggle(attr)}
                                className={`px-4 py-2 rounded-xl border-2 text-xs font-black transition-all ${item.abilityScores?.includes(attr)
                                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                                    : 'bg-stone-50 text-stone-500 border-stone-100 hover:border-stone-200'
                                    }`}
                            >
                                {attr}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                    <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">2. 起源专长</h3>
                    <div className="space-y-3">
                        <select
                            value={item.feat}
                            onChange={e => setItem(prev => prev ? ({ ...prev, feat: e.target.value }) : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 bg-white font-bold text-sm"
                        >
                            <option value="">-- 从库中选择 --</option>
                            {feats.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                        </select>
                        <input
                            type="text"
                            value={item.feat}
                            onChange={e => setItem(p => p ? { ...p, feat: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold text-sm"
                            placeholder="或手动输入名称..."
                        />
                    </div>
                </section>
            </div>

            {/* Step 3: Skills & Tools */}
            <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">3. 熟练项配置</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">技能熟练 (固定给予)</label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {ALL_SKILLS.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => handleSkillToggle(skill)}
                                    className={`px-2 py-2 rounded-lg border-2 text-[10px] font-black transition-all ${item.skills?.includes(skill)
                                        ? 'bg-stone-800 text-white border-stone-800'
                                        : 'bg-stone-50 text-stone-400 border-transparent hover:border-stone-100'
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">主工具熟练</label>
                            <input
                                type="text"
                                value={item.tool}
                                onChange={e => setItem(p => p ? { ...p, tool: e.target.value } : null)}
                                className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold"
                                placeholder="主工具..."
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">起始金币描述</label>
                            <input
                                type="text"
                                value={item.gold || '50 GP'}
                                onChange={e => setItem(p => p ? { ...p, gold: e.target.value } : null)}
                                className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 4: Equipment */}
            <section className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">4. 起始装备项</h3>
                <textarea
                    value={(item.equipment || []).join('\n')}
                    onChange={e => setItem(prev => prev ? ({ ...prev, equipment: e.target.value.split('\n').filter(Boolean) }) : null)}
                    className="w-full min-h-[120px] p-4 border-2 border-stone-100 rounded-2xl focus:border-red-600 outline-none font-mono text-sm leading-relaxed"
                    placeholder="每行一个物品名称..."
                />
            </section>
        </div>
    );
};
