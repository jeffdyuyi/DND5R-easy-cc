
import React, { useState, useMemo } from 'react';
import { CharacterData } from '../types';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { FEAT_DB } from '../data-feats';
import { SPELL_DB } from '../data-spells';
import { BACKGROUND_DB } from '../data-backgrounds';
import { Sparkles, Wand2, CheckCircle, Search } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

// Feats that grant spells
const SPELL_GRANTING_FEATS = ['魔法学徒', '仪式施法者', '妖精触碰', '影界触碰'];

const SPELLCASTING_ABILITIES = [
    { key: 'intelligence', label: '智力 (法师)' },
    { key: 'wisdom', label: '感知 (牧师/德鲁伊)' },
    { key: 'charisma', label: '魅力 (术士/吟游诗人/魔契师)' },
];

const StepSpells: React.FC<Props> = ({ character, updateCharacter }) => {
    const [cantripSearch, setCantripSearch] = useState('');
    const [spellSearch, setSpellSearch] = useState('');

    // Check if origin feat grants spells
    const originFeat = character.originFeat ? FEAT_DB.find(f => f.name === character.originFeat) : null;
    const featGrantsSpells = originFeat && SPELL_GRANTING_FEATS.some(f => character.originFeat?.includes(f));

    // Get background data to check for locked spell list
    const selectedBackground = BACKGROUND_DB.find(bg => bg.name === character.background);

    // Get feat configuration
    const featConfig = character.featConfig?.originFeat || { name: character.originFeat || '' };
    const selectedAbility = featConfig.spellcastingAbility || '';
    const selectedCantrips = featConfig.cantrips || [];
    const selectedLevel1Spell = featConfig.level1Spell || '';

    // Determine spell list based on feat - prioritize background's featSpellList
    const spellListClasses = useMemo(() => {
        if (character.originFeat?.includes('魔法学徒')) {
            // 首先检查背景是否锁定了法术列表
            if (selectedBackground?.featSpellList) {
                return [selectedBackground.featSpellList];
            }
            // 然后检查用户选择的法术列表
            if (featConfig.spellList) {
                return [featConfig.spellList];
            }
            // 如果都没有，允许所有三个法术列表（需要用户选择）
            return ['牧师', '德鲁伊', '法师'];
        }
        return [];
    }, [character.originFeat, selectedBackground?.featSpellList, featConfig.spellList]);

    // Filter available cantrips
    const availableCantrips = useMemo(() => {
        let cantrips = SPELL_DB.filter(s => s.level === 0);
        if (spellListClasses.length > 0) {
            cantrips = cantrips.filter(s =>
                s.classes?.some(c => spellListClasses.includes(c))
            );
        }
        if (cantripSearch) {
            cantrips = cantrips.filter(s =>
                s.name.includes(cantripSearch) || s.school?.includes(cantripSearch)
            );
        }
        return cantrips.slice(0, 30); // Limit for performance
    }, [spellListClasses, cantripSearch]);

    // Filter available level 1 spells
    const availableLevel1Spells = useMemo(() => {
        let spells = SPELL_DB.filter(s => s.level === 1);
        if (spellListClasses.length > 0) {
            spells = spells.filter(s =>
                s.classes?.some(c => spellListClasses.includes(c))
            );
        }
        if (spellSearch) {
            spells = spells.filter(s =>
                s.name.includes(spellSearch) || s.school?.includes(spellSearch)
            );
        }
        return spells.slice(0, 30);
    }, [spellListClasses, spellSearch]);

    // Update feat config
    const updateFeatConfig = (updates: Partial<typeof featConfig>) => {
        updateCharacter({
            featConfig: {
                ...character.featConfig,
                originFeat: { ...featConfig, ...updates },
                otherFeats: character.featConfig?.otherFeats || {},
            },
        });
    };

    // Toggle cantrip selection
    const toggleCantrip = (cantripName: string) => {
        const current = [...selectedCantrips];
        const idx = current.indexOf(cantripName);
        if (idx >= 0) {
            current.splice(idx, 1);
        } else if (current.length < 2) {
            current.push(cantripName);
        }
        updateFeatConfig({ cantrips: current });

        // Also add to character spells
        updateCharacter({
            spells: {
                ...character.spells,
                cantrips: current.join(', '),
            },
        });
    };

    // Select level 1 spell
    const selectLevel1Spell = (spellName: string) => {
        updateFeatConfig({ level1Spell: spellName });

        // Also add to character spells
        const currentL1 = character.spells?.level1?.split(', ').filter(Boolean) || [];
        if (!currentL1.includes(spellName)) {
            currentL1.push(spellName);
            updateCharacter({
                spells: {
                    ...character.spells,
                    level1: currentL1.join(', '),
                },
            });
        }
    };

    // Completion checks
    const abilityComplete = !!selectedAbility;
    const cantripsComplete = selectedCantrips.length >= 2;
    const spellComplete = !!selectedLevel1Spell;

    // === LEFT PANEL: Feat Spell Configuration ===
    const leftPanel = featGrantsSpells ? (
        <div className="p-4 space-y-4">
            <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> {character.originFeat}
            </h3>

            {/* Feat Description */}
            {originFeat && (
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-sm text-stone-600">
                    {originFeat.description}
                </div>
            )}

            {/* Spellcasting Ability */}
            <FeatureAccordion
                title="施法关键属性选择"
                isPending={!abilityComplete}
                isComplete={abilityComplete}
                defaultOpen
            >
                <div className="space-y-3">
                    <p className="text-sm text-stone-600">选择此专长所使用的施法关键属性：</p>
                    <select
                        value={selectedAbility}
                        onChange={e => updateFeatConfig({ spellcastingAbility: e.target.value as any })}
                        className="w-full p-3 border border-stone-300 rounded-lg font-medium"
                    >
                        <option value="">-- 请选择 --</option>
                        {SPELLCASTING_ABILITIES.map(ab => (
                            <option key={ab.key} value={ab.key}>{ab.label}</option>
                        ))}
                    </select>
                    {selectedAbility && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            已选择: {SPELLCASTING_ABILITIES.find(a => a.key === selectedAbility)?.label}
                        </div>
                    )}
                </div>
            </FeatureAccordion>

            {/* Cantrip Selection */}
            <FeatureAccordion
                title={`戏法选择 (${selectedCantrips.length}/2)`}
                isPending={!cantripsComplete}
                isComplete={cantripsComplete}
                defaultOpen
            >
                <div className="space-y-3">
                    <p className="text-sm text-stone-600">选择 2 个戏法：</p>

                    {selectedCantrips.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {selectedCantrips.map(c => (
                                <span key={c} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                                    {c}
                                    <button onClick={() => toggleCantrip(c)} className="text-purple-500 hover:text-purple-700">×</button>
                                </span>
                            ))}
                        </div>
                    )}

                    <button
                        className="w-full p-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 font-medium"
                        disabled={selectedCantrips.length >= 2}
                    >
                        {selectedCantrips.length >= 2 ? '已选择完毕' : '选择戏法...'}
                    </button>
                </div>
            </FeatureAccordion>

            {/* Level 1 Spell Selection */}
            <FeatureAccordion
                title={`1环法术选择 (${selectedLevel1Spell ? 1 : 0}/1)`}
                isPending={!spellComplete}
                isComplete={spellComplete}
                defaultOpen
            >
                <div className="space-y-3">
                    <p className="text-sm text-stone-600">选择 1 个1环法术：</p>

                    {selectedLevel1Spell && (
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {selectedLevel1Spell}
                            </span>
                            <button onClick={() => updateFeatConfig({ level1Spell: '' })} className="text-blue-500 hover:text-blue-700">×</button>
                        </div>
                    )}

                    <button
                        className="w-full p-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 font-medium"
                        disabled={!!selectedLevel1Spell}
                    >
                        {selectedLevel1Spell ? '已选择完毕' : '选择法术...'}
                    </button>
                </div>
            </FeatureAccordion>
        </div>
    ) : (
        <div className="p-4">
            <div className="bg-stone-50 p-6 rounded-lg border-2 border-dashed border-stone-200 text-center">
                <Wand2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500">当前起源专长不包含法术选择</p>
                <p className="text-stone-400 text-sm mt-2">你可以跳过此步骤</p>
            </div>
        </div>
    );

    // === RIGHT PANEL: Spell Lists ===
    const rightPanel = featGrantsSpells ? (
        <div className="p-6 space-y-6">
            {/* Cantrips */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-black text-stone-900">可选戏法</h2>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder="搜索..."
                            value={cantripSearch}
                            onChange={e => setCantripSearch(e.target.value)}
                            className="pl-8 pr-3 py-1 text-sm border border-stone-300 rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {availableCantrips.map(cantrip => {
                        const isSelected = selectedCantrips.includes(cantrip.name);
                        return (
                            <button
                                key={cantrip.id}
                                onClick={() => toggleCantrip(cantrip.name)}
                                disabled={!isSelected && selectedCantrips.length >= 2}
                                className={`
                  p-2 rounded-lg border text-left text-sm transition-all
                  ${isSelected
                                        ? 'bg-purple-100 border-purple-500 text-purple-800'
                                        : selectedCantrips.length >= 2
                                            ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed'
                                            : 'bg-white border-stone-200 hover:border-purple-300'}
                `}
                            >
                                <div className="font-medium">{cantrip.name}</div>
                                <div className="text-xs text-stone-500">{cantrip.school}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Level 1 Spells */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-black text-stone-900">可选1环法术</h2>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder="搜索..."
                            value={spellSearch}
                            onChange={e => setSpellSearch(e.target.value)}
                            className="pl-8 pr-3 py-1 text-sm border border-stone-300 rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {availableLevel1Spells.map(spell => {
                        const isSelected = selectedLevel1Spell === spell.name;
                        return (
                            <button
                                key={spell.id}
                                onClick={() => selectLevel1Spell(spell.name)}
                                disabled={!!selectedLevel1Spell && !isSelected}
                                className={`
                  p-2 rounded-lg border text-left text-sm transition-all
                  ${isSelected
                                        ? 'bg-blue-100 border-blue-500 text-blue-800'
                                        : selectedLevel1Spell
                                            ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed'
                                            : 'bg-white border-stone-200 hover:border-blue-300'}
                `}
                            >
                                <div className="font-medium">{spell.name}</div>
                                <div className="text-xs text-stone-500">{spell.school}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Summary */}
            {(selectedCantrips.length > 0 || selectedLevel1Spell) && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> 已选法术
                    </h3>
                    <div className="space-y-1 text-sm text-green-700">
                        {selectedCantrips.map(c => <div key={c}>• {c} (戏法)</div>)}
                        {selectedLevel1Spell && <div>• {selectedLevel1Spell} (1环)</div>}
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="p-6 flex flex-col items-center justify-center h-full text-center">
            <Wand2 className="w-16 h-16 text-stone-300 mb-4" />
            <h3 className="text-xl font-bold text-stone-700 mb-2">无需选择法术</h3>
            <p className="text-stone-500 max-w-md">
                你的起源专长不要求选择法术。你可以直接进入下一步。
            </p>
        </div>
    );

    return (
        <WizardLayout
            title="专长法术"
            stepId={4}
            totalSteps={8}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepSpells;
