
import React from 'react';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';

export interface StepInfo {
    id: number;
    name: string;
    status: 'complete' | 'current' | 'pending' | 'error';
}

interface Props {
    steps: StepInfo[];
    currentStep: number;
    onPrev: () => void;
    onNext: () => void;
    canGoNext?: boolean;
}

const WizardStepProgress: React.FC<Props> = ({ steps, currentStep, onPrev, onNext, canGoNext = true }) => {
    const getStepStyle = (status: StepInfo['status']) => {
        switch (status) {
            case 'complete':
                return 'bg-green-500 text-white border-green-500';
            case 'current':
                return 'bg-amber-500 text-white border-amber-500 ring-4 ring-amber-100';
            case 'error':
                return 'bg-red-500 text-white border-red-500';
            default:
                return 'bg-stone-200 text-stone-400 border-stone-300';
        }
    };

    const getStepIcon = (status: StepInfo['status']) => {
        switch (status) {
            case 'complete':
                return <Check className="w-3 h-3" />;
            case 'error':
                return <AlertCircle className="w-3 h-3" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border-t border-stone-200 p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                {/* Previous Button */}
                <button
                    onClick={onPrev}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all
            ${currentStep === 1
                            ? 'text-stone-300 cursor-not-allowed'
                            : 'text-stone-600 hover:bg-stone-100'}`}
                >
                    <ChevronLeft className="w-4 h-4" />
                    上一步
                </button>

                {/* Step Indicators */}
                <div className="flex items-center gap-2">
                    {steps.map((step, idx) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${getStepStyle(step.status)}`}
                                    title={step.name}
                                >
                                    {getStepIcon(step.status) || step.id}
                                </div>
                                <span className={`text-[10px] font-medium hidden md:block ${step.status === 'current' ? 'text-amber-600' : 'text-stone-400'}`}>
                                    {step.name}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`w-8 h-0.5 ${steps[idx + 1].status === 'pending' ? 'bg-stone-200' : 'bg-green-300'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={onNext}
                    disabled={!canGoNext}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow
            ${currentStep === steps.length
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : canGoNext
                                ? 'bg-dndRed text-white hover:bg-red-700'
                                : 'bg-stone-300 text-stone-500 cursor-not-allowed'}`}
                >
                    {currentStep === steps.length ? '完成创建' : '下一步'}
                    {currentStep < steps.length && <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default WizardStepProgress;
