import React from 'react';

interface CompactCardProps {
    title: string;
    subtitle?: string;
    tags?: string[];
    meta?: React.ReactNode;
    actions?: React.ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
    titleColor?: string;
    bgColor?: string;
}

export const CompactCard: React.FC<CompactCardProps> = ({
    title,
    subtitle,
    tags,
    meta,
    actions,
    isSelected,
    onClick,
    titleColor = "text-stone-800",
    bgColor = "bg-white"
}) => (
    <div
        onClick={onClick}
        className={`
      flex flex-col justify-between h-full min-h-[140px] p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md relative group
      ${isSelected ? 'border-dndRed ring-1 ring-dndRed bg-red-50/30' : `border-stone-200 hover:border-dndRed/50 ${bgColor}`}
    `}
    >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {actions}
        </div>

        <div>
            <div className="flex flex-col gap-0.5 mb-2 pr-6">
                <h4 className={`font-black text-base leading-tight ${titleColor} line-clamp-2`}>{title}</h4>
                {subtitle && <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">{subtitle}</div>}
            </div>

            {meta && (
                <div className="text-xs text-stone-600 space-y-1 my-2 font-mono">
                    {meta}
                </div>
            )}
        </div>

        {tags && tags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                {tags.map((t: string) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded font-bold border border-stone-200 truncate max-w-full">
                        {t}
                    </span>
                ))}
            </div>
        )}
    </div>
);
