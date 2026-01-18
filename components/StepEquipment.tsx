
import React, { useMemo, useEffect } from 'react';
import { CharacterData } from '../types';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { CLASS_EQUIPMENT, BACKGROUND_EQUIPMENT, calculateStartingInventory } from '../utils/equipmentUtils';
import { Package, Coins, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepEquipment: React.FC<Props> = ({ character, updateCharacter }) => {
    const classEquipment = character.className ? CLASS_EQUIPMENT[character.className] : null;
    const backgroundEquipment = character.background ? BACKGROUND_EQUIPMENT[character.background] : null;

    const classChoice = character.equipmentChoices?.classChoice || '';
    const classSubChoices = character.equipmentChoices?.classSubChoices || {};
    const backgroundChoice = character.equipmentChoices?.backgroundChoice || '';
    const backgroundSubChoices = character.equipmentChoices?.backgroundSubChoices || {};

    // Calculate inventory when choices change
    const { inventory, gold } = useMemo(() => {
        return calculateStartingInventory(
            character.className,
            classChoice,
            classSubChoices,
            character.background,
            backgroundChoice,
            backgroundSubChoices
        );
    }, [character.className, classChoice, classSubChoices, character.background, backgroundChoice, backgroundSubChoices]);

    // Sync inventory to character
    useEffect(() => {
        if (inventory.length > 0 || gold > 0) {
            updateCharacter({
                startingInventory: inventory,
                gold: gold,
            });
        }
    }, [inventory, gold]);

    // Check completion
    const classChoiceComplete = !classEquipment || !!classChoice;
    const classSubChoicesComplete = !classEquipment || !classChoice || !classEquipment.options.find(o => o.id === classChoice)?.subChoices?.some(sc => !classSubChoices[sc.id]);
    const backgroundChoiceComplete = !backgroundEquipment || !!backgroundChoice;
    const backgroundSubChoicesComplete = !backgroundEquipment || !backgroundChoice || !backgroundEquipment.options.find(o => o.id === backgroundChoice)?.subChoices?.some(sc => !backgroundSubChoices[sc.id]);

    const handleClassChoiceChange = (choice: 'A' | 'B') => {
        updateCharacter({
            equipmentChoices: {
                ...character.equipmentChoices,
                classChoice: choice,
                classSubChoices: {},
                backgroundChoice: backgroundChoice,
                backgroundSubChoices: backgroundSubChoices,
            },
        });
    };

    const handleClassSubChoice = (id: string, value: string) => {
        updateCharacter({
            equipmentChoices: {
                ...character.equipmentChoices,
                classChoice: classChoice,
                classSubChoices: { ...classSubChoices, [id]: value },
                backgroundChoice: backgroundChoice,
                backgroundSubChoices: backgroundSubChoices,
            },
        });
    };

    const handleBackgroundChoiceChange = (choice: 'A' | 'B') => {
        updateCharacter({
            equipmentChoices: {
                ...character.equipmentChoices,
                classChoice: classChoice,
                classSubChoices: classSubChoices,
                backgroundChoice: choice,
                backgroundSubChoices: {},
            },
        });
    };

    const handleBackgroundSubChoice = (id: string, value: string) => {
        updateCharacter({
            equipmentChoices: {
                ...character.equipmentChoices,
                classChoice: classChoice,
                classSubChoices: classSubChoices,
                backgroundChoice: backgroundChoice,
                backgroundSubChoices: { ...backgroundSubChoices, [id]: value },
            },
        });
    };

    // === LEFT PANEL: Equipment Choices ===
    const leftPanel = (
        <div className="p-4 space-y-4">
            {/* Class Equipment */}
            {classEquipment && (
                <div className="space-y-3">
                    <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                        <Package className="w-4 h-4" /> {character.className} 装备选项
                    </h3>

                    <FeatureAccordion
                        title={`${character.className} 装备选择`}
                        isPending={!classChoiceComplete}
                        isComplete={classChoiceComplete && classSubChoicesComplete}
                        defaultOpen
                    >
                        <div className="space-y-4">
                            {/* Main A/B Choice */}
                            <div>
                                <label className="text-xs font-bold text-stone-500 block mb-2">选择一项：</label>
                                <select
                                    value={classChoice}
                                    onChange={e => handleClassChoiceChange(e.target.value as 'A' | 'B')}
                                    className="w-full p-3 border border-stone-300 rounded-lg font-medium"
                                >
                                    <option value="">-- 请选择 --</option>
                                    {classEquipment.options.map(opt => (
                                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Selected Option Details */}
                            {classChoice && (
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-sm">
                                    <div className="font-bold text-green-800 mb-2">你将获得：</div>
                                    <ul className="space-y-1 text-green-700">
                                        {classEquipment.options.find(o => o.id === classChoice)?.items.map((item, idx) => (
                                            <li key={idx}>• {item.name} ×{item.quantity}</li>
                                        ))}
                                        {(classEquipment.options.find(o => o.id === classChoice)?.gold || 0) > 0 && (
                                            <li className="text-amber-600">• {classEquipment.options.find(o => o.id === classChoice)?.gold} GP</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Sub-choices */}
                            {classChoice && classEquipment.options.find(o => o.id === classChoice)?.subChoices?.map(sc => (
                                <div key={sc.id} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                    <label className="text-xs font-bold text-amber-700 block mb-2 flex items-center gap-2">
                                        {!classSubChoices[sc.id] && <AlertCircle className="w-3 h-3" />}
                                        {sc.label}
                                    </label>
                                    <select
                                        value={classSubChoices[sc.id] || ''}
                                        onChange={e => handleClassSubChoice(sc.id, e.target.value)}
                                        className="w-full p-2 border border-amber-300 rounded font-medium text-sm"
                                    >
                                        <option value="">-- 请选择 --</option>
                                        {sc.options.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </FeatureAccordion>
                </div>
            )}

            {/* Background Equipment */}
            {backgroundEquipment && (
                <div className="space-y-3 mt-6">
                    <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                        <Package className="w-4 h-4" /> {character.background} 装备选项
                    </h3>

                    <FeatureAccordion
                        title={`${character.background} 装备选择`}
                        isPending={!backgroundChoiceComplete}
                        isComplete={backgroundChoiceComplete && backgroundSubChoicesComplete}
                        defaultOpen
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-stone-500 block mb-2">选择一项：</label>
                                <select
                                    value={backgroundChoice}
                                    onChange={e => handleBackgroundChoiceChange(e.target.value as 'A' | 'B')}
                                    className="w-full p-3 border border-stone-300 rounded-lg font-medium"
                                >
                                    <option value="">-- 请选择 --</option>
                                    {backgroundEquipment.options.map(opt => (
                                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {backgroundChoice && (
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-sm">
                                    <div className="font-bold text-green-800 mb-2">你将获得：</div>
                                    <ul className="space-y-1 text-green-700">
                                        {backgroundEquipment.options.find(o => o.id === backgroundChoice)?.items.map((item, idx) => (
                                            <li key={idx}>• {item.name} ×{item.quantity}</li>
                                        ))}
                                        {(backgroundEquipment.options.find(o => o.id === backgroundChoice)?.gold || 0) > 0 && (
                                            <li className="text-amber-600">• {backgroundEquipment.options.find(o => o.id === backgroundChoice)?.gold} GP</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {backgroundChoice && backgroundEquipment.options.find(o => o.id === backgroundChoice)?.subChoices?.map(sc => (
                                <div key={sc.id} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                    <label className="text-xs font-bold text-amber-700 block mb-2 flex items-center gap-2">
                                        {!backgroundSubChoices[sc.id] && <AlertCircle className="w-3 h-3" />}
                                        {sc.label}
                                    </label>
                                    <select
                                        value={backgroundSubChoices[sc.id] || ''}
                                        onChange={e => handleBackgroundSubChoice(sc.id, e.target.value)}
                                        className="w-full p-2 border border-amber-300 rounded font-medium text-sm"
                                    >
                                        <option value="">-- 请选择 --</option>
                                        {sc.options.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </FeatureAccordion>
                </div>
            )}

            {/* No equipment available message */}
            {!classEquipment && !backgroundEquipment && (
                <div className="text-stone-400 text-sm italic p-4 bg-stone-50 rounded">
                    请先选择职业和背景以查看装备选项
                </div>
            )}
        </div>
    );

    // === RIGHT PANEL: Inventory Summary ===
    const rightPanel = (
        <div className="p-6 space-y-6">
            {/* Currency Display */}
            <div className="bg-stone-100 p-4 rounded-lg border border-stone-200">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-xs text-stone-400 uppercase font-bold">PP</div>
                        <div className="text-xl font-black text-stone-600">0</div>
                    </div>
                    <div>
                        <div className="text-xs text-amber-500 uppercase font-bold flex items-center justify-center gap-1">
                            <Coins className="w-3 h-3" /> GP
                        </div>
                        <div className="text-xl font-black text-amber-600">{gold}</div>
                    </div>
                    <div>
                        <div className="text-xs text-stone-400 uppercase font-bold">SP</div>
                        <div className="text-xl font-black text-stone-600">0</div>
                    </div>
                    <div>
                        <div className="text-xs text-stone-400 uppercase font-bold">CP</div>
                        <div className="text-xl font-black text-stone-600">0</div>
                    </div>
                </div>
            </div>

            {/* Starting Inventory */}
            <div>
                <h2 className="text-xl font-black text-stone-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" /> 初始物品栏
                </h2>

                {inventory.length > 0 ? (
                    <div className="space-y-2">
                        {inventory.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="font-medium text-stone-800">{item.name}</span>
                                    <span className="text-xs text-stone-400">{item.source}</span>
                                </div>
                                <span className="bg-stone-100 px-2 py-1 rounded text-sm font-bold text-stone-600">
                                    ×{item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-stone-50 p-8 rounded-lg border-2 border-dashed border-stone-200 text-center">
                        <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                        <p className="text-stone-400">选择装备选项后，物品将显示在此处</p>
                    </div>
                )}
            </div>

            {/* Equipment Tips */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-blue-800">
                <strong>提示：</strong> 选项 B 通常给予更多金币，让你可以自由购买装备。选项 A 则提供固定的装备组合。
            </div>
        </div>
    );

    return (
        <WizardLayout
            title="初始装备"
            stepId={6}
            totalSteps={8}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepEquipment;
