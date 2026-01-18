
import React, { useState, useMemo, useEffect } from 'react';
import { CharacterData, AbilityScores } from '../types';
import { BACKGROUND_DB } from '../data-backgrounds';
import { FEAT_DB } from '../data-feats';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { Search, Star, Book, Wrench, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const ABILITY_LABELS: Record<keyof AbilityScores, string> = {
    strength: "力量", dexterity: "敏捷", constitution: "体质",
    intelligence: "智力", wisdom: "感知", charisma: "魅力"
};

const StepBackground: React.FC<Props> = ({ character, updateCharacter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const selectedBackground = BACKGROUND_DB.find(bg => bg.name === character.background);
    const selectedFeat = selectedBackground ? FEAT_DB.find(f => f.name === selectedBackground.feat) : undefined;

    // ASI State
    const [abilityDistribution, setAbilityDistribution] = useState<'2-1' | '1-1-1'>('2-1');
    const [selectedAbilities, setSelectedAbilities] = useState<{
        ability1: keyof AbilityScores | '';
        ability2: keyof AbilityScores | '';
        ability3: keyof AbilityScores | '';
    }>({ ability1: '', ability2: '', ability3: '' });

    const abilityOptions = Object.entries(ABILITY_LABELS).map(([k, v]) => ({ key: k as keyof AbilityScores, label: v }));

    // Filter backgrounds
    const filteredBackgrounds = useMemo(() => {
        if (!searchTerm) return BACKGROUND_DB;
        return BACKGROUND_DB.filter(bg =>
            bg.name.includes(searchTerm) ||
            bg.description?.includes(searchTerm) ||
            bg.feat?.includes(searchTerm)
        );
    }, [searchTerm]);

    // Sync ASI with character
    useEffect(() => {
        if (selectedBackground && selectedAbilities.ability1) {
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

    // Apply background data on selection
    useEffect(() => {
        if (selectedBackground) {
            const newSkills = { ...character.skillMastery };
            selectedBackground.skills.forEach(s => newSkills[s] = 1);

            if (character.originFeat !== selectedBackground.feat) {
                updateCharacter({
                    skillMastery: newSkills,
                    originFeat: selectedBackground.feat,
                    toolProficiencies: selectedBackground.tool || ''
                });
            }
            // Reset ASI selections
            setSelectedAbilities({ ability1: '', ability2: '', ability3: '' });
        }
    }, [character.background]);

    // Check completion
    const asiComplete = abilityDistribution === '2-1'
        ? !!(selectedAbilities.ability1 && selectedAbilities.ability2)
        : !!(selectedAbilities.ability1 && selectedAbilities.ability2 && selectedAbilities.ability3);

    // === LEFT PANEL: Background List ===
    const leftPanel = (
        <div className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                    type="text"
                    placeholder="搜索背景..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dndRed"
                />
            </div>

            {/* Background List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredBackgrounds.map(bg => (
                    <button
                        key={bg.id}
                        onClick={() => updateCharacter({ background: bg.name })}
                        className={`
              w-full p-3 rounded-lg border-2 text-left transition-all flex items-center justify-between
              ${character.background === bg.name
                                ? 'border-dndRed bg-red-50 shadow-md'
                                : 'border-stone-200 bg-white hover:border-stone-300'}
            `}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className={`font-bold ${character.background === bg.name ? 'text-dndRed' : 'text-stone-800'}`}>
                                    {bg.name}
                                </span>
                                <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                                    2024
                                </span>
                            </div>
                            <div className="text-xs text-stone-500 mt-1">
                                {bg.skills.join('、')} • {bg.feat}
                            </div>
                        </div>
                        {character.background === bg.name && <CheckCircle className="w-5 h-5 text-dndRed" />}
                    </button>
                ))}
            </div>
        </div>
    );

    // === RIGHT PANEL: Background Details ===
    const rightPanel = selectedBackground ? (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-black text-stone-900">{selectedBackground.name}</h2>
                <p className="text-stone-600 mt-2 leading-relaxed">{selectedBackground.description}</p>
            </div>

            {/* Pending Choices - ASI */}
            <div className="space-y-3">
                <h3 className="font-bold text-stone-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    待选择项目
                </h3>

                <FeatureAccordion
                    title="属性值提升 (Ability Score Improvement)"
                    level={1}
                    isPending={!asiComplete}
                    isComplete={asiComplete}
                    defaultOpen
                >
                    <div className="space-y-4">
                        <p className="text-sm text-stone-600">
                            此背景推荐提升：<strong className="text-amber-700">{selectedBackground.abilityScores.join(' / ')}</strong>
                        </p>

                        {/* Distribution Toggle */}
                        <div className="flex rounded-lg overflow-hidden border border-stone-300 text-sm font-bold">
                            <button
                                onClick={() => setAbilityDistribution('2-1')}
                                className={`flex-1 py-2 text-center transition-colors ${abilityDistribution === '2-1' ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'}`}
                            >
                                +2 / +1
                            </button>
                            <button
                                onClick={() => setAbilityDistribution('1-1-1')}
                                className={`flex-1 py-2 text-center transition-colors ${abilityDistribution === '1-1-1' ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 hover:bg-stone-50'}`}
                            >
                                +1 / +1 / +1
                            </button>
                        </div>

                        {/* ASI Selectors */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <label className="text-xs font-bold text-stone-500 block mb-1">
                                    属性 1 {abilityDistribution === '2-1' ? '(+2)' : '(+1)'}
                                </label>
                                <select
                                    value={selectedAbilities.ability1}
                                    onChange={e => setSelectedAbilities({ ...selectedAbilities, ability1: e.target.value as keyof AbilityScores })}
                                    className="w-full p-2 border border-stone-300 rounded-lg font-medium"
                                >
                                    <option value="">-- 选择 --</option>
                                    {abilityOptions.map(o => (
                                        <option key={o.key} value={o.key} disabled={o.key === selectedAbilities.ability2 || o.key === selectedAbilities.ability3}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-stone-500 block mb-1">属性 2 (+1)</label>
                                <select
                                    value={selectedAbilities.ability2}
                                    onChange={e => setSelectedAbilities({ ...selectedAbilities, ability2: e.target.value as keyof AbilityScores })}
                                    className="w-full p-2 border border-stone-300 rounded-lg font-medium"
                                >
                                    <option value="">-- 选择 --</option>
                                    {abilityOptions.map(o => (
                                        <option key={o.key} value={o.key} disabled={o.key === selectedAbilities.ability1 || o.key === selectedAbilities.ability3}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {abilityDistribution === '1-1-1' && (
                                <div>
                                    <label className="text-xs font-bold text-stone-500 block mb-1">属性 3 (+1)</label>
                                    <select
                                        value={selectedAbilities.ability3}
                                        onChange={e => setSelectedAbilities({ ...selectedAbilities, ability3: e.target.value as keyof AbilityScores })}
                                        className="w-full p-2 border border-stone-300 rounded-lg font-medium"
                                    >
                                        <option value="">-- 选择 --</option>
                                        {abilityOptions.map(o => (
                                            <option key={o.key} value={o.key} disabled={o.key === selectedAbilities.ability1 || o.key === selectedAbilities.ability2}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </FeatureAccordion>
            </div>

            {/* Origin Feat */}
            <FeatureAccordion title={`起源专长：${selectedBackground.feat}`} isComplete defaultOpen>
                <div className="space-y-3">
                    {selectedFeat ? (
                        <>
                            {selectedFeat.description && (
                                <p className="italic text-stone-500">{selectedFeat.description}</p>
                            )}
                            {selectedFeat.benefits && (
                                <ul className="space-y-2">
                                    {selectedFeat.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex gap-2 items-start text-sm text-stone-600">
                                            <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <span>
                                                {benefit.split('**').map((part, i) =>
                                                    i % 2 === 1 ? <strong key={i} className="text-stone-800">{part}</strong> : part
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ) : (
                        <p className="text-stone-400 italic">未找到专长详情</p>
                    )}
                </div>
            </FeatureAccordion>

            {/* Background Proficiencies */}
            <FeatureAccordion title="背景熟练项" isComplete defaultOpen>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                            <Book className="w-4 h-4 text-stone-400" />
                            <span className="text-sm text-stone-600">技能熟练</span>
                        </div>
                        <span className="font-medium text-stone-800">{selectedBackground.skills.join('、')}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-stone-400" />
                            <span className="text-sm text-stone-600">工具熟练</span>
                        </div>
                        <span className="font-medium text-stone-800">{selectedBackground.tool || '无'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-stone-400" />
                            <span className="text-sm text-stone-600">起源专长</span>
                        </div>
                        <span className="font-medium text-stone-800">{selectedBackground.feat}</span>
                    </div>
                </div>
            </FeatureAccordion>

            {/* Equipment */}
            <FeatureAccordion title="起始装备" isComplete>
                <ul className="space-y-1">
                    {selectedBackground.equipment.map((eq, idx) => (
                        <li key={idx} className="text-sm text-stone-600">{eq}</li>
                    ))}
                </ul>
            </FeatureAccordion>
        </div>
    ) : (
        <div className="p-6 flex flex-col items-center justify-center h-full text-center">
            <Book className="w-16 h-16 text-stone-300 mb-4" />
            <h3 className="text-xl font-bold text-stone-700 mb-2">选择你的背景</h3>
            <p className="text-stone-500 max-w-md">
                背景描述了角色在冒险之前的生活和训练，提供技能熟练、工具熟练以及一个起源专长。
            </p>
        </div>
    );

    return (
        <WizardLayout
            title="背景选择"
            stepId={3}
            totalSteps={9}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepBackground;
