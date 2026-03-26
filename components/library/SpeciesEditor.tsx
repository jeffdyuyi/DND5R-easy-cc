import React from 'react';
import { SpeciesItem } from '../../types';
import { MarkdownTextarea, FeatureListEditor } from './EditorBase';

interface SpeciesEditorProps {
    item: SpeciesItem;
    setItem: React.Dispatch<React.SetStateAction<SpeciesItem | null>>;
}

export const SpeciesEditor: React.FC<SpeciesEditorProps> = ({ item, setItem }) => {
    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-6 border-b border-stone-200 pb-2">种族生理参数</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">体型 (Size)</label>
                        <select
                            value={item.size}
                            onChange={e => setItem(p => p ? { ...p, size: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-green-600 bg-white font-bold"
                        >
                            <option value="小型">小型 (Small)</option>
                            <option value="中型">中型 (Medium)</option>
                            <option value="大型">大型 (Large)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">速度 (Speed)</label>
                        <input
                            type="number"
                            value={item.speed}
                            onChange={e => setItem(p => p ? { ...p, speed: parseInt(e.target.value) || 30 } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-green-600 font-bold"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">黑暗视觉</label>
                        <input
                            type="text"
                            value={item.darkvision || ''}
                            onChange={e => setItem(p => p ? { ...p, darkvision: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-green-600 font-bold"
                            placeholder="例如：60 尺, 无"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">封面简述</label>
                    <textarea
                        value={item.description}
                        onChange={e => setItem(p => p ? { ...p, description: e.target.value } : null)}
                        className="w-full p-4 border-2 border-stone-100 rounded-2xl focus:border-green-600 outline-none font-medium h-24"
                        placeholder="一句话介绍种族特色..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">完整详情 (Markdown)</label>
                    <MarkdownTextarea
                        value={item.fullDescription || ""}
                        onChange={e => setItem(p => p ? { ...p, fullDescription: e.target.value } : null)}
                        className="min-h-[200px]"
                    />
                </div>
            </section>

            <FeatureListEditor
                title="种族性状列表"
                features={item.traits.map(t => ({ name: t.name, level: 1, description: t.description }))}
                onChange={newTraits => setItem(prev => prev ? ({ ...prev, traits: newTraits.map(nt => ({ name: nt.name, description: nt.description })) }) : null)}
            />
        </div>
    );
};
