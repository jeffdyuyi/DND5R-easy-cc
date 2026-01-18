
import React, { useEffect } from 'react';
import { CharacterData } from '../types';
import { SPECIES_DB } from '../data-species';
import { SPECIES_VARIANTS } from '../utils/characterUtils';
import { User, Eye, Footprints, Shield, Info, Network } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepSpecies: React.FC<Props> = ({ character, updateCharacter }) => {
    const selectedSpecies = SPECIES_DB.find(sp => sp.name === character.race);
    const variants = character.race ? SPECIES_VARIANTS[character.race] : undefined;

    // Auto-reset subrace if race changes
    useEffect(() => {
        if (selectedSpecies && !variants && character.subRace) {
            updateCharacter({ subRace: '' });
        }
    }, [character.race, selectedSpecies, variants]);

    return (
        <div className="space-y-8 pb-12">
            <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                第二步：种族 (Species)
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Species List */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="font-bold text-stone-700 mb-2 px-1">选择种族</h3>
                    <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2">
                        {SPECIES_DB.map(sp => (
                            <button
                                key={sp.id}
                                onClick={() => updateCharacter({ race: sp.name, subRace: '' })}
                                className={`
                       p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between group
                       ${character.race === sp.name
                                        ? 'border-dndRed bg-red-50 shadow-md'
                                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'}
                    `}
                            >
                                <div>
                                    <div className={`font-bold ${character.race === sp.name ? 'text-dndRed' : 'text-stone-800'}`}>{sp.name}</div>
                                    <div className="text-[10px] text-stone-400 uppercase tracking-wider">{sp.size} • {sp.speed}尺</div>
                                </div>
                                {character.race === sp.name && <div className="w-2 h-2 rounded-full bg-dndRed"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Details & Config */}
                <div className="lg:col-span-2">
                    {!selectedSpecies ? (
                        <div className="h-full flex items-center justify-center p-12 text-stone-400 border-2 border-dashed border-stone-200 rounded-lg">
                            请从左侧列表选择一个种族查看详情
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            {/* Header Info */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-dndRed"></div>
                                <h3 className="text-3xl font-black text-stone-900 mb-2">{selectedSpecies.name}</h3>
                                <p className="text-stone-600 leading-relaxed max-w-2xl">{selectedSpecies.fullDescription || selectedSpecies.description}</p>

                                <div className="flex gap-6 mt-4 pt-4 border-t border-stone-100">
                                    <div className="flex items-center gap-2">
                                        <Footprints className="w-5 h-5 text-stone-400" />
                                        <div>
                                            <div className="text-[10px] uppercase text-stone-500 font-bold">速度</div>
                                            <div className="font-bold text-stone-800">{selectedSpecies.speed} 尺</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-stone-400" />
                                        <div>
                                            <div className="text-[10px] uppercase text-stone-500 font-bold">体型</div>
                                            <div className="font-bold text-stone-800">{selectedSpecies.size}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-stone-400" />
                                        <div>
                                            <div className="text-[10px] uppercase text-stone-500 font-bold">黑暗视觉</div>
                                            <div className="font-bold text-stone-800">{selectedSpecies.darkvision ? '有 (60/120尺)' : '无'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variant Selection (If any) */}
                            {variants && (
                                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                    <h4 className="font-bold text-purple-900 text-lg mb-4 flex items-center gap-2">
                                        <Network className="w-5 h-5" />
                                        {variants.label} (必选)
                                    </h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {variants.options.map(v => (
                                            <label
                                                key={v.name}
                                                className={`
                                   flex items-start gap-4 p-4 rounded bg-white border cursor-pointer transition-all
                                   ${character.subRace === v.name ? 'border-purple-500 ring-1 ring-purple-500' : 'border-purple-100 hover:border-purple-300'}
                                `}
                                            >
                                                <input
                                                    type="radio"
                                                    name="subrace"
                                                    className="mt-1"
                                                    checked={character.subRace === v.name}
                                                    onChange={() => updateCharacter({ subRace: v.name })}
                                                />
                                                <div>
                                                    <div className="font-bold text-purple-900">{v.name}</div>
                                                    <div className="text-xs text-purple-700 mt-1">{v.desc}</div>
                                                    {v.traits && (
                                                        <div className="mt-2 inline-block bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                                            特性: {v.traits}
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Traits List */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                                <h4 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-blue-600" />
                                    种族特性 (Traits)
                                </h4>
                                <div className="space-y-4">
                                    {selectedSpecies.traits.map(trait => (
                                        <div key={trait.name} className="pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                                            <div className="font-bold text-stone-900 mb-1">{trait.name}</div>
                                            <div className="text-sm text-stone-600 leading-relaxed text-justify">
                                                {trait.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepSpecies;
