import React, { useState, useMemo } from 'react';
import { CharacterData } from '../types';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { useLibrary } from '../contexts/LibraryContext';
import { Sparkles, Wand2, CheckCircle, Search, Star, Shield, Sword, ArrowUp } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const SPELL_GRANTING_FEATS = [
    '魔法学徒', 'Magic Initiate',
    '仪式施法者', 'Ritual Caster',
    '妖精触碰', 'Fey Touched',
    '影界触碰', 'Shadow Touched'
];

const SKILL_GRANTING_FEATS = ['熟习', 'Skilled'];
const TOOL_GRANTING_FEATS = ['巧匠', 'Crafter', '音乐家', 'Musician'];
const ABILITY_GRANTING_FEATS = ['属性值提升', 'Ability Score Improvement'];

const SPELLCASTING_ABILITIES = [
    { key: 'intelligence', label: '智力 (法师)' },
    { key: 'wisdom', label: '感知 (牧师/德鲁伊)' },
    { key: 'charisma', label: '魅力 (术士/吟游诗人/魔契师)' },
];

const StepFeats: React.FC<Props> = ({ character, updateCharacter }) => {
    const { backgrounds, feats, spells, classes } = useLibrary();
    const [cantripSearch, setCantripSearch] = useState('');
    const [spellSearch, setSpellSearch] = useState('');

    const selectedClass = classes.items.find(c => c.name === character.className);

    const getLevelFeats = useMemo(() => {
        if (!selectedClass || !selectedClass.features) return [];
        
        const classFeats: { level: number; name: string; description: string }[] = [];
        
        selectedClass.features.forEach(feature => {
            if (feature.name?.includes('属性值提升') || feature.name?.includes('Ability Score')) {
                classFeats.push({
                    level: feature.level,
                    name: '属性值提升',
                    description: feature.description || '获得属性值提升专长或其它你满足条件的专长。'
                });
            }
        });
        
        return classFeats.sort((a, b) => a.level - b.level);
    }, [selectedClass]);

    const availableClassFeats = useMemo(() => {
        return getLevelFeats.filter(f => f.level <= character.level);
    }, [getLevelFeats, character.level]);

    const originFeat = character.originFeat ? feats.items.find(f => f.name === character.originFeat) : null;
    const originFeatGrantsSpells = originFeat && SPELL_GRANTING_FEATS.some(f => character.originFeat?.includes(f));

    const selectedBackground = backgrounds.items.find(bg => bg.name === character.background);

    const featConfig = character.featConfig || { originFeat: {}, otherFeats: {} };
    const originFeatConfig = featConfig.originFeat || {};
    const selectedAbility = originFeatConfig.spellcastingAbility || '';
    const selectedCantrips = originFeatConfig.cantrips || [];
    const selectedLevel1Spell = originFeatConfig.level1Spell || '';

    const spellListClasses = useMemo(() => {
        if (character.originFeat?.includes('魔法学徒') || character.originFeat?.includes('Magic Initiate')) {
            if (selectedBackground?.featSpellList) {
                return [selectedBackground.featSpellList];
            }
            if (originFeatConfig.spellList) {
                return [originFeatConfig.spellList];
            }
            return ['牧师', '德鲁伊', '法师'];
        }
        return [];
    }, [character.originFeat, selectedBackground?.featSpellList, originFeatConfig.spellList]);

    const availableCantrips = useMemo(() => {
        let cantripsItems = spells.items.filter(s => s.level === 0);
        if (spellListClasses.length > 0) {
            cantripsItems = cantripsItems.filter(s =>
                s.classes?.some((c: string) => spellListClasses.includes(c))
            );
        }
        if (cantripSearch) {
            cantripsItems = cantripsItems.filter(s =>
                s.name.includes(cantripSearch) || s.school?.includes(cantripSearch)
            );
        }
        return cantripsItems.slice(0, 30);
    }, [spellListClasses, cantripSearch, spells.items]);

    const availableLevel1Spells = useMemo(() => {
        let level1Spells = spells.items.filter(s => s.level === 1);
        if (spellListClasses.length > 0) {
            level1Spells = level1Spells.filter(s =>
                s.classes?.some((c: string) => spellListClasses.includes(c))
            );
        }
        if (spellSearch) {
            level1Spells = level1Spells.filter(s =>
                s.name.includes(spellSearch) || s.school?.includes(spellSearch)
            );
        }
        return level1Spells.slice(0, 30);
    }, [spellListClasses, spellSearch, spells.items]);

    const allFeats = useMemo(() => {
        return feats.items.filter(f => 
            f.category === '通用专长' || f.category === '起源专长'
        );
    }, [feats.items]);

    const parseSpellString = (str: string | undefined): string[] => {
        if (!str) return [];
        return str.split(/[\n,]/)
            .map(s => s.trim().replace(/^[•\-\*]\s*/, ''))
            .filter(Boolean);
    };

    const formatSpellString = (list: string[]): string => {
        return list.map(s => `• ${s}`).join('\n');
    };

    const updateOriginFeatConfig = (updates: Partial<typeof originFeatConfig>) => {
        updateCharacter({
            featConfig: {
                ...featConfig,
                originFeat: { ...originFeatConfig, ...updates },
                otherFeats: featConfig.otherFeats || {},
            },
        });
    };

    const toggleCantrip = (cantripName: string) => {
        const oldCantrips = [...selectedCantrips];
        const newCantrips = [...selectedCantrips];

        const idx = newCantrips.indexOf(cantripName);
        if (idx >= 0) {
            newCantrips.splice(idx, 1);
        } else if (newCantrips.length < 2) {
            newCantrips.push(cantripName);
        }

        let allCantrips = parseSpellString(character.spells?.cantrips);

        if (oldCantrips.length > 0) {
            allCantrips = allCantrips.filter(c => !oldCantrips.includes(c));
        }

        allCantrips = Array.from(new Set([...allCantrips, ...newCantrips]));

        updateCharacter({
            featConfig: {
                ...featConfig,
                originFeat: { ...originFeatConfig, cantrips: newCantrips },
                otherFeats: featConfig.otherFeats || {},
            },
            spells: {
                ...character.spells,
                cantrips: formatSpellString(allCantrips),
            },
        });
    };

    const selectLevel1Spell = (spellName: string) => {
        const oldSpell = selectedLevel1Spell;

        let allLevel1 = parseSpellString(character.spells?.level1);

        if (oldSpell) {
            allLevel1 = allLevel1.filter(s => s !== oldSpell);
        }

        if (!allLevel1.includes(spellName)) {
            allLevel1.push(spellName);
        }

        const newLevel1Str = formatSpellString(allLevel1);

        updateCharacter({
            featConfig: {
                ...featConfig,
                originFeat: { ...originFeatConfig, level1Spell: spellName },
                otherFeats: featConfig.otherFeats || {},
            },
            spells: {
                ...character.spells,
                level1: newLevel1Str,
            }
        });
    };

    const abilityComplete = !originFeatGrantsSpells || !!selectedAbility;
    const cantripsComplete = !originFeatGrantsSpells || selectedCantrips.length >= 2;
    const spellComplete = !originFeatGrantsSpells || !!selectedLevel1Spell;

    const getFeatIcon = (category: string) => {
        if (category === '起源专长') return <Star className="w-4 h-4" />;
        if (category === '战斗风格专长') return <Sword className="w-4 h-4" />;
        return <Shield className="w-4 h-4" />;
    };

    const leftPanel = (
        <div className="p-4 space-y-4">
            {originFeatGrantsSpells && (
                <div className="space-y-4">
                    <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> 起源专长: {character.originFeat}
                    </h3>

                    {originFeat && (
                        <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-sm text-stone-600">
                            {originFeat.description}
                        </div>
                    )}

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
                                onChange={e => updateOriginFeatConfig({ spellcastingAbility: e.target.value as any })}
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
                                    <button onClick={() => updateOriginFeatConfig({ level1Spell: '' })} className="text-blue-500 hover:text-blue-700">×</button>
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
            )}

            {availableClassFeats.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                        <ArrowUp className="w-4 h-4" /> 职业专长选择
                    </h3>

                    {availableClassFeats.map((feat, idx) => (
                        <div key={idx} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                            <div className="font-bold text-amber-800 mb-1">等级 {feat.level}: {feat.name}</div>
                            <div className="text-xs text-amber-700">{feat.description}</div>
                        </div>
                    ))}
                </div>
            )}

            {!originFeatGrantsSpells && availableClassFeats.length === 0 && (
                <div className="text-center py-8">
                    <Wand2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-500">当前无需选择专长</p>
                    <p className="text-stone-400 text-sm mt-2">你可以跳过此步骤</p>
                </div>
            )}
        </div>
    );

    const rightPanel = originFeatGrantsSpells ? (
        <div className="p-6 space-y-6">
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
            <h3 className="text-xl font-bold text-stone-700 mb-2">专长选择</h3>
            <p className="text-stone-500 max-w-md mb-4">
                {availableClassFeats.length > 0 
                    ? `你将在等级 ${availableClassFeats.map(f => f.level).join('、')} 获得专长选择机会。`
                    : '当前等级暂无职业专长可选择。'
                }
            </p>
            {originFeat && (
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-left max-w-md">
                    <div className="font-bold text-stone-700 mb-1">{originFeat.name}</div>
                    <div className="text-sm text-stone-600">{originFeat.description}</div>
                </div>
            )}
        </div>
    );

    return (
        <WizardLayout
            title="专长"
            stepId={4}
            totalSteps={9}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepFeats;
