import React from 'react';
import { ClassItem } from '../../types';
import { MarkdownTextarea, FeatureListEditor, HIT_DICE_OPTIONS } from './EditorBase';

interface ClassEditorProps {
    item: ClassItem;
    setItem: React.Dispatch<React.SetStateAction<ClassItem | null>>;
}

export const ClassEditor: React.FC<ClassEditorProps> = ({ item, setItem }) => {
    const updateCore = (field: keyof typeof item.coreTraits, value: any) => {
        setItem(prev => prev ? ({ ...prev, coreTraits: { ...prev.coreTraits, [field]: value } }) : null);
    };

    const updateEquipment = (option: 'optionA' | 'optionB', value: string) => {
        setItem(prev => prev ? ({
            ...prev,
            coreTraits: {
                ...prev.coreTraits,
                startingEquipment: { ...prev.coreTraits.startingEquipment, [option]: value }
            }
        }) : null);
    };

    const handleHitDieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setItem(prev => {
            if (!prev) return null;
            return {
                ...prev,
                hitDie: val,
                coreTraits: {
                    ...prev.coreTraits,
                    hitPointDie: `每${prev.name || '职业'}等级 ${val}`
                }
            };
        });
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Logic & Meta Stats */}
            <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                <h3 className="font-black text-stone-800 uppercase tracking-widest text-xs mb-6 border-b border-stone-200 pb-2">基础逻辑参数</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">生命骰 (Hit Die)</label>
                        <select
                            value={item.hitDie}
                            onChange={handleHitDieChange}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 bg-white font-bold"
                        >
                            {HIT_DICE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">主属性 (Primary)</label>
                        <input
                            type="text"
                            value={item.primaryAbility}
                            onChange={e => setItem(p => p ? { ...p, primaryAbility: e.target.value } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold"
                            placeholder="例如：力量, 敏捷"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-stone-500 uppercase mb-2">子职解锁等级</label>
                        <input
                            type="number"
                            value={item.subclassLevel}
                            onChange={e => setItem(p => p ? { ...p, subclassLevel: parseInt(e.target.value) || 3 } : null)}
                            className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-red-600 font-bold"
                        />
                    </div>
                </div>
            </section>

            {/* Core Traits Table Editor */}
            <section className="bg-white border-2 border-stone-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-stone-800 text-white px-6 py-3 font-black text-sm uppercase tracking-widest">核心特质 (展示用数据)</div>
                <div className="divide-y divide-stone-100">
                    <TraitField label="属性熟练" value={item.coreTraits.primaryAbility} onChange={v => updateCore('primaryAbility', v)} />
                    <TraitField label="生命值骰" value={item.coreTraits.hitPointDie} onChange={v => updateCore('hitPointDie', v)} />
                    <TraitField label="豁免熟练" value={item.coreTraits.savingThrows} onChange={v => updateCore('savingThrows', v)} />
                    <TraitField label="技能熟练" value={item.coreTraits.skillProficiencies} onChange={v => updateCore('skillProficiencies', v)} isArea />
                    <TraitField label="武器熟练" value={item.coreTraits.weaponProficiencies} onChange={v => updateCore('weaponProficiencies', v)} />
                    <TraitField label="护甲受训" value={item.coreTraits.armorTraining} onChange={v => updateCore('armorTraining', v)} />
                    <div className="grid grid-cols-12 group">
                        <div className="col-span-3 bg-stone-50 p-4 font-black text-stone-500 text-xs flex items-center border-r border-stone-100 group-hover:text-red-600 transition-colors uppercase tracking-widest">起始装备</div>
                        <div className="col-span-9 p-4 space-y-3 bg-white">
                            <div className="flex gap-3 items-center">
                                <span className="font-black text-[10px] text-stone-400 uppercase tracking-widest w-12">选项 A</span>
                                <input type="text" className="flex-grow p-2 border-b-2 border-stone-50 focus:border-red-600 outline-none transition-all font-medium"
                                    value={item.coreTraits.startingEquipment.optionA} onChange={e => updateEquipment('optionA', e.target.value)} />
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="font-black text-[10px] text-stone-400 uppercase tracking-widest w-12">选项 B</span>
                                <input type="text" className="flex-grow p-2 border-b-2 border-stone-50 focus:border-red-600 outline-none transition-all font-medium"
                                    value={item.coreTraits.startingEquipment.optionB} onChange={e => updateEquipment('optionB', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Descriptions */}
            <section className="space-y-6">
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">封面简述</label>
                    <textarea
                        value={item.description}
                        onChange={e => setItem(p => p ? { ...p, description: e.target.value } : null)}
                        className="w-full p-4 border-2 border-stone-100 rounded-2xl focus:border-red-600 outline-none font-medium h-24"
                        placeholder="一句话介绍职业特色..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">完整详情 (Markdown)</label>
                    <MarkdownTextarea
                        value={item.fullDescription}
                        onChange={e => setItem(p => p ? { ...p, fullDescription: e.target.value } : null)}
                        className="min-h-[200px]"
                    />
                </div>
            </section>

            <FeatureListEditor
                features={item.features}
                onChange={newFeatures => setItem(prev => prev ? ({ ...prev, features: newFeatures }) : null)}
            />
        </div>
    );
};

const TraitField = ({ label, value, onChange, isArea = false }: { label: string; value: string; onChange: (v: string) => void; isArea?: boolean }) => (
    <div className="grid grid-cols-12 group">
        <div className="col-span-3 bg-stone-50 p-4 font-black text-stone-500 text-xs flex items-center border-r border-stone-100 group-hover:text-red-600 transition-colors uppercase tracking-widest">{label}</div>
        <div className="col-span-9 p-2 bg-white">
            {isArea ? (
                <textarea className="w-full p-2 border-b-2 border-transparent focus:border-red-600 outline-none transition-all font-medium resize-y min-h-[60px]"
                    value={value} onChange={e => onChange(e.target.value)} />
            ) : (
                <input type="text" className="w-full p-2 border-b-2 border-transparent focus:border-red-600 outline-none transition-all font-medium"
                    value={value} onChange={e => onChange(e.target.value)} />
            )}
        </div>
    </div>
);
