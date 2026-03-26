import React from 'react';
import { SubclassItem, ClassItem } from '../../types';
import { MarkdownTextarea, FeatureListEditor } from './EditorBase';

interface SubclassEditorProps {
    item: SubclassItem;
    setItem: React.Dispatch<React.SetStateAction<SubclassItem | null>>;
    classes: ClassItem[];
}

export const SubclassEditor: React.FC<SubclassEditorProps> = ({ item, setItem, classes }) => {
    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-4">关联主职业</h3>
                <select
                    value={item.parentClass}
                    onChange={e => setItem(prev => prev ? ({ ...prev, parentClass: e.target.value }) : null)}
                    className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 bg-white font-bold text-sm"
                >
                    <option value="">-- 请选择主职业 --</option>
                    {classes.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
            </section>

            <section className="space-y-6">
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 px-1">封面简述</label>
                    <textarea
                        value={item.description}
                        onChange={e => setItem(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                        className="w-full p-4 border-2 border-stone-100 rounded-2xl focus:border-red-600 outline-none font-medium h-24"
                        placeholder="一句话介绍子职特色..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 px-1">完整详情 (Markdown)</label>
                    <MarkdownTextarea
                        value={item.fullDescription || ""}
                        onChange={e => setItem(prev => prev ? ({ ...prev, fullDescription: e.target.value }) : null)}
                        className="min-h-[250px]"
                    />
                </div>
            </section>

            <FeatureListEditor
                title="子职特性列表"
                features={item.features}
                onChange={newFeatures => setItem(prev => prev ? ({ ...prev, features: newFeatures }) : null)}
            />
        </div>
    );
};
