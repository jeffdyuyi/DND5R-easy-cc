import React from 'react';
import { FeatItem } from '../../types';
import { MarkdownTextarea, Plus, Trash2 } from './EditorBase';

interface FeatEditorProps {
    item: FeatItem;
    setItem: React.Dispatch<React.SetStateAction<FeatItem | null>>;
}

export const FeatEditor: React.FC<FeatEditorProps> = ({ item, setItem }) => {
    const handleAddBenefit = () => {
        setItem(prev => prev ? ({ ...prev, benefits: [...(prev.benefits || []), ""] }) : null);
    };

    const handleUpdateBenefit = (index: number, value: string) => {
        setItem(prev => {
            if (!prev) return null;
            const newBenefits = [...prev.benefits];
            newBenefits[index] = value;
            return { ...prev, benefits: newBenefits };
        });
    };

    const handleRemoveBenefit = (index: number) => {
        setItem(prev => prev ? ({ ...prev, benefits: prev.benefits.filter((_, i) => i !== index) }) : null);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-6 border-b border-stone-200 pb-2">专长逻辑参数</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">专长类别 (Category)</label>
                        <input
                            type="text"
                            value={item.category || ''}
                            onChange={e => setItem(p => p ? { ...p, category: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-purple-600 font-bold"
                            placeholder="例如：起源专长, 基础专长"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">先决条件 (Prerequisite)</label>
                        <input
                            type="text"
                            value={item.prerequisite || ''}
                            onChange={e => setItem(p => p ? { ...p, prerequisite: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-purple-600 font-bold"
                            placeholder="例如：等级 4, 力量 13+"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">核心描述 (Markdown)</label>
                    <MarkdownTextarea
                        value={item.description}
                        onChange={e => setItem(p => p ? { ...p, description: e.target.value } : null)}
                        className="min-h-[120px]"
                    />
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs">专长利益点 (Benefits)</h3>
                    <button onClick={handleAddBenefit} className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition-all hover:bg-purple-700 active:scale-95">
                        <Plus className="w-3.5 h-3.5" /> 添加利益点
                    </button>
                </div>
                <div className="space-y-3">
                    {item.benefits?.length > 0 ? (
                        item.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-3 items-start group">
                                <span className="mt-2 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black flex-shrink-0">{idx + 1}</span>
                                <textarea
                                    value={benefit}
                                    onChange={e => handleUpdateBenefit(idx, e.target.value)}
                                    className="flex-grow p-3 border-2 border-stone-100 rounded-xl focus:border-purple-600 outline-none font-medium h-20 text-sm"
                                    placeholder="描述该专长赋予的具体能力..."
                                />
                                <button onClick={() => handleRemoveBenefit(idx)} className="mt-2 text-stone-300 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 border-2 border-dashed border-stone-100 rounded-2xl text-center text-stone-400 italic text-sm">
                            尚未添加任何具体的利益点，点击上方按钮添加。
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
