
import React, { useEffect } from 'react';
import { CharacterData } from '../types';
import { SPECIES_DB } from '../data';
import { updateCharacterSpellsFromSubrace } from '../utils/characterUtils';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { User, Footprints, Eye, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepSpecies: React.FC<Props> = ({ character, updateCharacter }) => {
    const selectedSpecies = SPECIES_DB.find(sp => sp.name === character.race);

    // Auto-reset subrace if race changes  
    useEffect(() => {
        if (selectedSpecies && !selectedSpecies.subraces && character.subRace) {
            updateCharacter({ subRace: '' });
        }
    }, [character.race]);

    // Check completion
    const variantComplete = !selectedSpecies?.subraces || !!character.subRace;

    // === LEFT PANEL: Species Grid ===
    const leftPanel = (
        <div className="p-4 space-y-4">
            {/* Species Grid */}
            <div className="grid grid-cols-3 gap-3">
                {SPECIES_DB.map(sp => (
                    <button
                        key={sp.id}
                        onClick={() => updateCharacter({ race: sp.name, subRace: '' })}
                        className={`
              p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
              ${character.race === sp.name
                                ? 'border-dndRed bg-red-50 shadow-md'
                                : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'}
            `}
                    >
                        <User className={`w-8 h-8 ${character.race === sp.name ? 'text-dndRed' : 'text-stone-400'}`} />
                        <span className={`text-sm font-bold text-center ${character.race === sp.name ? 'text-dndRed' : 'text-stone-700'}`}>
                            {sp.name}
                        </span>
                        <div className="flex gap-1">
                            <span className="text-[10px] text-stone-400">{sp.size}</span>
                            <span className="text-[10px] text-stone-300">•</span>
                            <span className="text-[10px] text-stone-400">{sp.speed}尺</span>
                        </div>
                        {sp.subraces && (
                            <span className="text-[9px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-medium">
                                有子种族
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

    // === RIGHT PANEL: Species Details ===
    const rightPanel = selectedSpecies ? (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-black text-stone-900">{selectedSpecies.name}</h2>
                <p className="text-stone-600 mt-2 leading-relaxed">
                    {selectedSpecies.fullDescription || selectedSpecies.description}
                </p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
                    <Footprints className="w-5 h-5 mx-auto mb-1 text-stone-400" />
                    <div className="text-xs text-stone-500 uppercase font-bold">速度</div>
                    <div className="text-lg font-bold text-stone-800">{selectedSpecies.speed} 尺</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
                    <User className="w-5 h-5 mx-auto mb-1 text-stone-400" />
                    <div className="text-xs text-stone-500 uppercase font-bold">体型</div>
                    <div className="text-lg font-bold text-stone-800">{selectedSpecies.size}</div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
                    <Eye className="w-5 h-5 mx-auto mb-1 text-stone-400" />
                    <div className="text-xs text-stone-500 uppercase font-bold">黑暗视觉</div>
                    <div className="text-lg font-bold text-stone-800">{selectedSpecies.darkvision ? '有' : '无'}</div>
                </div>
            </div>

            {/* Pending Choices - Variant */}
            {selectedSpecies.subraces && (
                <div className="space-y-3">
                    <h3 className="font-bold text-stone-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        待选择项目
                    </h3>
                    <FeatureAccordion
                        title={selectedSpecies.subraces.label}
                        level={1}
                        isPending={!variantComplete}
                        isComplete={variantComplete}
                        defaultOpen
                    >
                        <div className="space-y-3">
                            <p className="text-sm text-stone-600 mb-3">选择你的血统变体：</p>
                            <div className="space-y-2">
                                {selectedSpecies.subraces.options.map(v => (
                                    <label
                                        key={v.name}
                                        className={`
                      flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
                      ${character.subRace === v.name
                                                ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500'
                                                : 'border-stone-200 bg-white hover:border-purple-300'}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="subrace"
                                            className="mt-1"
                                            checked={character.subRace === v.name}
                                            onChange={() => {
                                                if (selectedSpecies.subraces) {
                                                    const updates = updateCharacterSpellsFromSubrace(
                                                        character,
                                                        v.name,
                                                        selectedSpecies.subraces.options
                                                    );
                                                    updateCharacter(updates);
                                                }
                                            }}
                                        />
                                        <div className="flex-1">
                                            <div className="font-bold text-stone-800">{v.name}</div>
                                            <div className="text-sm text-stone-600 mt-1">{v.desc}</div>
                                            {v.traits && (
                                                <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">
                                                    {v.traits}
                                                </span>
                                            )}
                                        </div>
                                        {character.subRace === v.name && <CheckCircle className="w-5 h-5 text-purple-600" />}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </FeatureAccordion>
                </div>
            )}

            {/* Racial Traits */}
            <div className="space-y-3">
                <h3 className="font-bold text-stone-700">种族特性</h3>
                <div className="space-y-2">
                    {selectedSpecies.traits.map((trait: any, idx: number) => (
                        <FeatureAccordion key={idx} title={trait.name} isComplete>
                            <div className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                                {trait.description}
                            </div>
                        </FeatureAccordion>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="p-6 flex flex-col items-center justify-center h-full text-center">
            <User className="w-16 h-16 text-stone-300 mb-4" />
            <h3 className="text-xl font-bold text-stone-700 mb-2">选择你的种族</h3>
            <p className="text-stone-500 max-w-md">
                种族决定了你的角色的外貌、文化背景和先天能力。从左侧列表中选择一个种族开始。
            </p>
        </div>
    );

    return (
        <WizardLayout
            title="种族选择"
            stepId={2}
            totalSteps={9}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepSpecies;
