
import React from 'react';

interface Props {
    title: string;
    stepId: number;
    totalSteps: number;
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    headerExtra?: React.ReactNode;
}

const WizardLayout: React.FC<Props> = ({
    title,
    stepId,
    totalSteps,
    leftPanel,
    rightPanel,
    headerExtra
}) => {
    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <span className="text-stone-400 text-sm">
                        步骤 {stepId} / {totalSteps}
                    </span>
                </div>
                {headerExtra}
            </div>

            {/* Two-Column Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
                {/* Left Panel - Selection */}
                <div className="lg:w-2/5 lg:border-r border-stone-200 overflow-y-auto bg-stone-50 min-h-[50vh] lg:min-h-0">
                    {leftPanel}
                </div>

                {/* Right Panel - Details/Configuration */}
                <div className="lg:w-3/5 overflow-y-auto bg-white min-h-[50vh] lg:min-h-0">
                    {rightPanel}
                </div>
            </div>
        </div>
    );
};

export default WizardLayout;
