
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    title: string;
    level?: number;
    isPending?: boolean;
    isComplete?: boolean;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const FeatureAccordion: React.FC<Props> = ({
    title,
    level,
    isPending = false,
    isComplete = false,
    defaultOpen = false,
    children
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen || isPending);

    return (
        <div className={`border rounded-lg overflow-hidden transition-all ${isPending
                ? 'border-red-300 bg-red-50'
                : isComplete
                    ? 'border-green-200 bg-green-50'
                    : 'border-stone-200 bg-white'
            }`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 text-left transition-colors ${isPending ? 'hover:bg-red-100' : 'hover:bg-stone-50'
                    }`}
            >
                <div className="flex items-center gap-3">
                    {level !== undefined && (
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${isPending
                                ? 'bg-red-500 text-white'
                                : isComplete
                                    ? 'bg-green-500 text-white'
                                    : 'bg-stone-200 text-stone-600'
                            }`}>
                            {level}
                        </span>
                    )}
                    <span className={`font-bold ${isPending ? 'text-red-800' : 'text-stone-800'}`}>
                        {title}
                    </span>
                    {isPending && (
                        <span className="text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded-full font-medium">
                            待选择
                        </span>
                    )}
                    {isComplete && (
                        <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            已完成
                        </span>
                    )}
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {isOpen && (
                <div className={`p-4 border-t ${isPending ? 'border-red-200' : 'border-stone-100'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default FeatureAccordion;
