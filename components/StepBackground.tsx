
import React, { useState, useEffect } from 'react';
import { CharacterData, AbilityScores, BackgroundItem } from '../types';
import { BACKGROUND_DB } from '../data-backgrounds';
import { FEAT_DB } from '../data-feats';
import { Book, Users, Star, Compass, Shield, Heart } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepBackground: React.FC<Props> = ({ character, updateCharacter }) => {
    const selectedBackground = BACKGROUND_DB.find(bg => bg.name === character.background);
    const selectedFeat = selectedBackground ? FEAT_DB.find(f => f.name === selectedBackground.feat) : undefined;

    // ASI State
    const [abilityDistribution, setAbilityDistribution] = useState<'2-1' | '1-1-1'>('2-1');
    const [selectedAbilities, setSelectedAbilities] = useState<{
        ability1: keyof AbilityScores | '';
        ability2: keyof AbilityScores | '';
        ability3: keyof AbilityScores | '';
    }>({ ability1: '', ability2: '', ability3: '' });

    // Map for Ability Labels
    const ABILITY_LABELS: Record<string, string> = {
        strength: "力量", dexterity: "敏捷", constitution: "体质",
        intelligence: "智力", wisdom: "感知", charisma: "魅力"
    };

    const abilityOptions = Object.entries(ABILITY_LABELS).map(([k, v]) => ({ key: k as keyof AbilityScores, label: v }));

    // Helper to sync selection with character data
    useEffect(() => {
        if (selectedBackground && selectedAbilities.ability1 && selectedAbilities.ability2) {
            const bonus: AbilityScores = { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 };

            if (abilityDistribution === '2-1') {
                if (selectedAbilities.ability1) bonus[selectedAbilities.ability1] += 2;
                if (selectedAbilities.ability2) bonus[selectedAbilities.ability2] += 1;
            } else {
                if (selectedAbilities.ability1) bonus[selectedAbilities.ability1] += 1;
                if (selectedAbilities.ability2) bonus[selectedAbilities.ability2] += 1;
                if (selectedAbilities.ability3) bonus[selectedAbilities.ability3] += 1;
            }
            updateCharacter({ backgroundBonuses: bonus });
        }
    }, [selectedAbilities, abilityDistribution, selectedBackground]);

    // Apply other background traits on selection
    useEffect(() => {
        if (selectedBackground) {
            // Update Skill Mastery (merge)
            const newSkills = { ...character.skillMastery };
            selectedBackground.skills.forEach(s => newSkills[s] = 1);

            // Update Origin Feat
            const newFeats = { ...character.featSelections };
            newFeats['Origin'] = selectedBackground.feat;

            let changed = false;

            // Check Skills
            if (!selectedBackground.skills.every(s => character.skillMastery[s] === 1)) {
                changed = true;
            }
            if (character.originFeat !== selectedBackground.feat) {
                changed = true;
            }

            if (changed) {
                updateCharacter({
                    skillMastery: newSkills,
                    featSelections: newFeats,
                    originFeat: selectedBackground.feat
                });
            }
        }
    }, [character.background]);


    return (
        <div className="space-y-8 pb-12">
            <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                第三步：背景 (Background)
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Background List */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="font-bold text-stone-700 mb-2 px-1">选择背景</h3>
                    <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2">
                        {BACKGROUND_DB.map(bg => (
                            <button
                                key={bg.id}
                                onClick={() => {
                                    updateCharacter({ background: bg.name });
                                    setSelectedAbilities({ ability1: '', ability2: '', ability3: '' }); // Reset ASI
                                }}
                                className={`
                       p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between group
                       ${character.background === bg.name
                                        ? 'border-dndRed bg-amber-50 shadow-md'
                                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'}
                    `}
                            >
                                <div>
                                    <div className={`font-bold ${character.background === bg.name ? 'text-dndRed' : 'text-stone-800'}`}>{bg.name}</div>
                                    <div className="text-[10px] text-stone-400 mt-1 flex gap-2">
                                        <span>+{bg.abilityScores.join('/')}</span>
                                        <span>• {bg.feat}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="lg:col-span-2">
                    {!selectedBackground ? (
                        <div className="h-full flex items-center justify-center p-12 text-stone-400 border-2 border-dashed border-stone-200 rounded-lg">
                            请从左侧列表选择一个背景查看详情
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            {/* Description */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                                <h3 className="text-3xl font-black text-stone-900 mb-2">{selectedBackground.name}</h3>
                                <p className="text-stone-600 leading-relaxed max-w-2xl text-lg">{selectedBackground.description}</p>

                                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-stone-100">
                                    <div className="bg-stone-50 px-3 py-2 rounded border border-stone-200">
                                        <div className="text-[10px] uppercase text-stone-500 font-bold mb-1">技能熟练</div>
                                        <div className="font-bold text-stone-800 text-sm">{selectedBackground.skills.join('、')}</div>
                                    </div>
                                    <div className="bg-stone-50 px-3 py-2 rounded border border-stone-200">
                                        <div className="text-[10px] uppercase text-stone-500 font-bold mb-1">工具熟练</div>
                                        <div className="font-bold text-stone-800 text-sm">{selectedBackground.tool}</div>
                                    </div>
                                    <div className="bg-stone-50 px-3 py-2 rounded border border-stone-200">
                                        <div className="text-[10px] uppercase text-stone-500 font-bold mb-1">初始装备</div>
                                        <div className="text-stone-600 text-xs max-w-xs">{selectedBackground.equipment[0].replace('A: ', '')}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Feat Display */}
                            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    起源专长：{selectedBackground.feat}
                                </h4>
                                {selectedFeat ? (
                                    <div className="text-sm text-purple-800 leading-relaxed bg-white/50 p-4 rounded border border-purple-100">
                                        <div className="font-bold mb-2 text-base">{selectedFeat.name}</div>
                                        {selectedFeat.description && (
                                            <p className="mb-3 italic opacity-80">{selectedFeat.description}</p>
                                        )}
                                        {selectedFeat.benefits && (
                                            <ul className="space-y-2">
                                                {selectedFeat.benefits.map((benefit, idx) => (
                                                    <li key={idx} className="flex gap-2 items-start">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                                                        <span>
                                                            {/* Bold formatted text naturally via Markdown-like or just render */}
                                                            {benefit.split('**').map((part, i) =>
                                                                i % 2 === 1 ? <strong key={i} className="text-purple-900">{part}</strong> : part
                                                            )}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-sm text-purple-400 italic">找不到专长数据</div>
                                )}
                            </div>

                            {/* Ability Score Bonus */}
                            <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300">
                                <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    属性加值 (Ability Score)
                                </h4>

                                <div className="bg-white p-4 rounded border border-amber-200 mb-4 text-sm text-stone-600">
                                    此背景允许你提升以下属性：
                                    <span className="font-bold text-amber-700 ml-1">{selectedBackground.abilityScores.join(' / ')}</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex rounded-lg overflow-hidden border border-amber-300 text-sm font-bold">
                                        <button
                                            onClick={() => setAbilityDistribution('2-1')}
                                            className={`flex-1 py-2 text-center transition-colors ${abilityDistribution === '2-1' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 hover:bg-amber-50'}`}
                                        >
                                            +2 / +1
                                        </button>
                                        <button
                                            onClick={() => setAbilityDistribution('1-1-1')}
                                            className={`flex-1 py-2 text-center transition-colors ${abilityDistribution === '1-1-1' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 hover:bg-amber-50'}`}
                                        >
                                            +1 / +1 / +1
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Ability 1 */}
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 block mb-1">
                                                属性 1 {abilityDistribution === '2-1' ? '(+2)' : '(+1)'}
                                            </label>
                                            <select
                                                value={selectedAbilities.ability1}
                                                onChange={e => setSelectedAbilities({ ...selectedAbilities, ability1: e.target.value as keyof AbilityScores })}
                                                className="w-full p-2 border border-stone-300 rounded font-bold text-stone-800"
                                            >
                                                <option value="">-- 选择 --</option>
                                                {abilityOptions
                                                    .filter(o => selectedBackground.abilityScores.some(s => o.label.startsWith(s)))
                                                    .map(o => <option key={o.key} value={o.key}>{o.label}</option>)
                                                }
                                            </select>
                                        </div>

                                        {/* Ability 2 */}
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 block mb-1">
                                                属性 2 (+1)
                                            </label>
                                            <select
                                                value={selectedAbilities.ability2}
                                                onChange={e => setSelectedAbilities({ ...selectedAbilities, ability2: e.target.value as keyof AbilityScores })}
                                                className="w-full p-2 border border-stone-300 rounded font-bold text-stone-800"
                                            >
                                                <option value="">-- 选择 --</option>
                                                {abilityOptions
                                                    .filter(o => selectedBackground.abilityScores.some(s => o.label.startsWith(s)))
                                                    .filter(o => o.key !== selectedAbilities.ability1)
                                                    .map(o => <option key={o.key} value={o.key}>{o.label}</option>)
                                                }
                                            </select>
                                        </div>

                                        {/* Ability 3 */}
                                        {abilityDistribution === '1-1-1' && (
                                            <div>
                                                <label className="text-xs font-bold text-stone-500 block mb-1">
                                                    属性 3 (+1)
                                                </label>
                                                <select
                                                    value={selectedAbilities.ability3}
                                                    onChange={e => setSelectedAbilities({ ...selectedAbilities, ability3: e.target.value as keyof AbilityScores })}
                                                    className="w-full p-2 border border-stone-300 rounded font-bold text-stone-800"
                                                >
                                                    <option value="">-- 选择 --</option>
                                                    {abilityOptions
                                                        .filter(o => selectedBackground.abilityScores.some(s => o.label.startsWith(s)))
                                                        .filter(o => o.key !== selectedAbilities.ability1 && o.key !== selectedAbilities.ability2)
                                                        .map(o => <option key={o.key} value={o.key}>{o.label}</option>)
                                                    }
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepBackground;
