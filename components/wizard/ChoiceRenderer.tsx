import React from 'react';
import { FeatureChoice } from '../../types';
import { CheckCircle } from 'lucide-react';

interface Props {
    choices: FeatureChoice[];
    selections: Record<string, string[]>;
    onUpdate: (id: string, values: string[]) => void;
}

const ChoiceRenderer: React.FC<Props> = ({ choices, selections, onUpdate }) => {
    if (!choices || choices.length === 0) return null;

    const toggleSelection = (choiceId: string, option: string, maxCount: number) => {
        const currentSelected = selections[choiceId] || [];
        const isSelected = currentSelected.includes(option);

        let newSelected: string[];
        if (isSelected) {
            newSelected = currentSelected.filter(s => s !== option);
        } else {
            if (currentSelected.length >= maxCount) {
                // If single choice, replace. If multiple, do nothing (or replace oldest? let's block for now)
                if (maxCount === 1) {
                    newSelected = [option];
                } else {
                    return; // Max limit reached
                }
            } else {
                newSelected = [...currentSelected, option];
            }
        }
        onUpdate(choiceId, newSelected);
    };

    return (
        <div className="space-y-4 mt-3 border-t border-stone-100 pt-3">
            {choices.map(choice => {
                const currentSelected = selections[choice.id] || [];
                const isComplete = currentSelected.length === choice.count;

                return (
                    <div key={choice.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-stone-700 block">
                                {choice.label || `选择 ${choice.count} 项`}
                            </label>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${isComplete ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                {currentSelected.length} / {choice.count}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {choice.options.map(option => {
                                const isSelected = currentSelected.includes(option);
                                const isDisabled = !isSelected && currentSelected.length >= choice.count && choice.count > 1;

                                return (
                                    <button
                                        key={option}
                                        onClick={() => toggleSelection(choice.id, option, choice.count)}
                                        disabled={isDisabled}
                                        className={`
                                            flex items-center gap-2 p-2 rounded border text-sm text-left transition-all
                                            ${isSelected
                                                ? 'bg-green-50 border-green-500 text-green-800'
                                                : isDisabled
                                                    ? 'bg-stone-50 border-stone-100 text-stone-300 cursor-not-allowed'
                                                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                                            }
                                        `}
                                    >
                                        {choice.count === 1 ? (
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-green-500' : 'border-stone-300'}`}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-green-500" />}
                                            </div>
                                        ) : (
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-green-500 bg-green-500' : 'border-stone-300'}`}>
                                                {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                                            </div>
                                        )}
                                        <span className="truncate">{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChoiceRenderer;
