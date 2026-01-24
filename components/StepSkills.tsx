
import React, { useMemo } from 'react';
import { CharacterData, AbilityScores } from '../types';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { CLASSES } from '../data';
import { BACKGROUND_DB } from '../data';
import { CheckCircle, BookOpen, Wrench } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

// All skills in Chinese
const ALL_SKILLS: { name: string; ability: keyof AbilityScores; abbr: string }[] = [
    { name: '杂技', ability: 'dexterity', abbr: '敏捷' },
    { name: '驯兽', ability: 'wisdom', abbr: '感知' },
    { name: '奥秘', ability: 'intelligence', abbr: '智力' },
    { name: '运动', ability: 'strength', abbr: '力量' },
    { name: '欺瞒', ability: 'charisma', abbr: '魅力' },
    { name: '历史', ability: 'intelligence', abbr: '智力' },
    { name: '洞悉', ability: 'wisdom', abbr: '感知' },
    { name: '威吓', ability: 'charisma', abbr: '魅力' },
    { name: '调查', ability: 'intelligence', abbr: '智力' },
    { name: '医药', ability: 'wisdom', abbr: '感知' },
    { name: '自然', ability: 'intelligence', abbr: '智力' },
    { name: '察觉', ability: 'wisdom', abbr: '感知' },
    { name: '表演', ability: 'charisma', abbr: '魅力' },
    { name: '游说', ability: 'charisma', abbr: '魅力' },
    { name: '宗教', ability: 'intelligence', abbr: '智力' },
    { name: '巧手', ability: 'dexterity', abbr: '敏捷' },
    { name: '隐匿', ability: 'dexterity', abbr: '敏捷' },
    { name: '求生', ability: 'wisdom', abbr: '感知' },
];

// Note: Skill abbr is already included in ALL_SKILLS array

const StepSkills: React.FC<Props> = ({ character }) => {
    const proficiencyBonus = Math.ceil(character.level / 4) + 1;

    // Get proficiency sources
    const proficiencySources = useMemo(() => {
        const sources: { type: 'class' | 'background' | 'species' | 'feat'; label: string; skills: string[]; tools: string[] }[] = [];

        // Class skills
        const selectedClass = character.className ? CLASSES[character.className] : null;
        if (selectedClass && character.proficiencySources?.skills?.class?.length) {
            sources.push({
                type: 'class',
                label: `${character.className} 技能熟练`,
                skills: character.proficiencySources.skills.class,
                tools: character.proficiencySources?.tools?.class || [],
            });
        }

        // Background skills
        const selectedBackground = BACKGROUND_DB.find(b => b.name === character.background);
        if (selectedBackground) {
            sources.push({
                type: 'background',
                label: `${character.background} 熟练`,
                skills: selectedBackground.skills,
                tools: selectedBackground.tool ? [selectedBackground.tool] : [],
            });
        }

        // Species skills (if any from species traits)
        if (character.proficiencySources?.skills?.species?.length) {
            sources.push({
                type: 'species',
                label: `${character.race} 熟练`,
                skills: character.proficiencySources.skills.species,
                tools: character.proficiencySources?.tools?.species || [],
            });
        }

        // Feat skills (if any from origin feat)
        if (character.proficiencySources?.skills?.feat?.length || character.proficiencySources?.tools?.feat?.length) {
            sources.push({
                type: 'feat',
                label: `${character.originFeat} 熟练`,
                skills: character.proficiencySources?.skills?.feat || [],
                tools: character.proficiencySources?.tools?.feat || [],
            });
        }

        return sources;
    }, [character]);

    // Get all proficient skills
    const proficientSkills = useMemo(() => {
        const skills = new Set<string>();
        proficiencySources.forEach(source => {
            source.skills.forEach(s => skills.add(s));
        });
        // Also add from legacy skillMastery
        Object.keys(character.skillMastery || {}).forEach(s => {
            if (character.skillMastery[s] > 0) skills.add(s);
        });
        return skills;
    }, [proficiencySources, character.skillMastery]);

    // Get all tool proficiencies
    const toolProficiencies = useMemo(() => {
        const tools: { name: string; source: string }[] = [];
        proficiencySources.forEach(source => {
            source.tools.forEach(t => tools.push({ name: t, source: source.label }));
        });
        return tools;
    }, [proficiencySources]);

    // Calculate modifier
    const getModifier = (ability: keyof AbilityScores) => {
        const base = character.abilities[ability] || 10;
        const bonus = (character.backgroundBonuses?.[ability] || 0);
        return Math.floor((base + bonus - 10) / 2);
    };

    // === LEFT PANEL: Proficiency Sources ===
    const leftPanel = (
        <div className="p-4 space-y-4">
            {/* Skills Section */}
            <div className="space-y-3">
                <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> 技能熟练来源
                </h3>

                {proficiencySources.filter(s => s.skills.length > 0).map((source, idx) => (
                    <FeatureAccordion key={idx} title={source.label} isComplete defaultOpen>
                        <div className="flex flex-wrap gap-2">
                            {source.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </FeatureAccordion>
                ))}

                {proficiencySources.filter(s => s.skills.length > 0).length === 0 && (
                    <div className="text-stone-400 text-sm italic p-3 bg-stone-50 rounded">
                        尚未选择任何技能熟练
                    </div>
                )}
            </div>

            {/* Tools Section */}
            <div className="space-y-3 mt-6">
                <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                    <Wrench className="w-4 h-4" /> 工具熟练
                </h3>

                {proficiencySources.filter(s => s.tools.length > 0).map((source, idx) => (
                    <FeatureAccordion key={idx} title={source.label} isComplete defaultOpen>
                        <div className="flex flex-wrap gap-2">
                            {source.tools.map(tool => (
                                <span key={tool} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </FeatureAccordion>
                ))}

                {toolProficiencies.length === 0 && (
                    <div className="text-stone-400 text-sm italic p-3 bg-stone-50 rounded">
                        尚未获得任何工具熟练
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="text-xs font-bold text-amber-800 uppercase mb-2">熟练加值</div>
                <div className="text-2xl font-black text-amber-600">+{proficiencyBonus}</div>
            </div>
        </div>
    );

    // === RIGHT PANEL: Full Skill Table ===
    const rightPanel = (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-black text-stone-900">技能列表</h2>

            {/* Skill Table */}
            <div className="overflow-hidden rounded-lg border border-stone-200">
                {/* Header */}
                <div className="grid grid-cols-[1fr_80px_60px_80px_60px] bg-stone-100 px-4 py-2 text-xs font-bold text-stone-500 uppercase">
                    <span>技能</span>
                    <span className="text-center">属性</span>
                    <span className="text-center">调整</span>
                    <span className="text-center">熟练</span>
                    <span className="text-center">总值</span>
                </div>

                {/* Skill Rows */}
                {ALL_SKILLS.map(skill => {
                    const isProficient = proficientSkills.has(skill.name);
                    const expertiseLevel = character.skillMastery?.[skill.name] || (isProficient ? 1 : 0);
                    const modifier = getModifier(skill.ability);
                    const profBonus = expertiseLevel * proficiencyBonus;
                    const total = modifier + profBonus;

                    return (
                        <div
                            key={skill.name}
                            className={`
                grid grid-cols-[1fr_80px_60px_80px_60px] px-4 py-3 border-t border-stone-100 items-center
                ${isProficient ? 'bg-green-50' : 'bg-white'}
              `}
                        >
                            <div className="flex items-center gap-2">
                                {isProficient && <CheckCircle className="w-4 h-4 text-green-500" />}
                                <span className={`font-medium ${isProficient ? 'text-green-800' : 'text-stone-700'}`}>
                                    {skill.name}
                                </span>
                            </div>
                            <div className="text-center">
                                <span className={`text-xs px-2 py-0.5 rounded ${skill.ability === 'strength' ? 'bg-red-100 text-red-700' :
                                    skill.ability === 'dexterity' ? 'bg-green-100 text-green-700' :
                                        skill.ability === 'constitution' ? 'bg-orange-100 text-orange-700' :
                                            skill.ability === 'intelligence' ? 'bg-blue-100 text-blue-700' :
                                                skill.ability === 'wisdom' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-pink-100 text-pink-700'
                                    }`}>
                                    {skill.abbr}
                                </span>
                            </div>
                            <div className="text-center text-stone-600">
                                {modifier >= 0 ? '+' : ''}{modifier}
                            </div>
                            <div className="text-center">
                                {profBonus > 0 ? (
                                    <span className="text-green-600 font-bold">+{profBonus}</span>
                                ) : (
                                    <span className="text-stone-300">—</span>
                                )}
                            </div>
                            <div className="text-center">
                                <span className={`
                  inline-flex items-center justify-center w-8 h-8 rounded font-bold text-sm
                  ${isProficient
                                        ? 'bg-green-600 text-white'
                                        : 'bg-stone-100 text-stone-600'}
                `}>
                                    {total >= 0 ? '+' : ''}{total}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tool Proficiencies Summary */}
            {toolProficiencies.length > 0 && (
                <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                        <Wrench className="w-4 h-4" /> 工具熟练汇总
                    </h3>
                    <div className="space-y-2">
                        {toolProficiencies.map((tool, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="font-medium text-purple-700">{tool.name}</span>
                                <span className="text-purple-500 text-xs">{tool.source}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <WizardLayout
            title="技能与工具"
            stepId={5}
            totalSteps={8}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepSkills;
