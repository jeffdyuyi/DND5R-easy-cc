
import React from 'react';
import { ClassItem, SubclassItem } from '../../types';
import {
    Sword, Wand2, Shield, Cross, Music, Leaf, Moon,
    Sparkles, Axe, Zap, Eye, Target, Footprints,
    CheckCircle, ChevronRight
} from 'lucide-react';

// --- Icon Mapping ---
const CLASS_ICONS: Record<string, JSX.Element> = {
    '野蛮人': <Axe className="w-full h-full" />,
    '吟游诗人': <Music className="w-full h-full" />,
    '牧师': <Cross className="w-full h-full" />,
    '德鲁伊': <Leaf className="w-full h-full" />,
    '战士': <Sword className="w-full h-full" />,
    '武僧': <Moon className="w-full h-full" />,
    '圣武士': <Shield className="w-full h-full" />,
    '游侠': <Target className="w-full h-full" />,
    '游荡者': <Footprints className="w-full h-full" />,
    '术士': <Zap className="w-full h-full" />,
    '魔契师': <Eye className="w-full h-full" />,
    '法师': <Wand2 className="w-full h-full" />,
};

// --- Color Mapping ---
const CLASS_COLORS: Record<string, string> = {
    '野蛮人': 'bg-orange-600',
    '吟游诗人': 'bg-pink-600',
    '牧师': 'bg-slate-300 text-slate-800', // Clerics often silver/white
    '德鲁伊': 'bg-green-700',
    '战士': 'bg-stone-700',
    '武僧': 'bg-sky-600',
    '圣武士': 'bg-yellow-600',
    '游侠': 'bg-emerald-700',
    '游荡者': 'bg-neutral-800',
    '术士': 'bg-red-600',
    '魔契师': 'bg-purple-700',
    '法师': 'bg-blue-700',
};

const DEFAULT_COLOR = 'bg-stone-600';
const DEFAULT_ICON = <Sparkles className="w-full h-full" />;

interface Props {
    item: ClassItem | SubclassItem;
    type: 'class' | 'subclass';
    isSelected?: boolean;
    onClick: () => void;
    actions?: React.ReactNode;
}

export const ClassCard: React.FC<Props> = ({ item, type, isSelected, onClick, actions }) => {
    // Determine Icon and Color
    let icon: JSX.Element = DEFAULT_ICON;
    let colorClass = DEFAULT_COLOR;

    if (type === 'class') {
        const cls = item as ClassItem;
        if (CLASS_ICONS[cls.name]) icon = CLASS_ICONS[cls.name];
        if (CLASS_COLORS[cls.name]) colorClass = CLASS_COLORS[cls.name];
    } else {
        const sub = item as SubclassItem;
        // Subclass uses parent class icon/color but maybe lighter/different?
        // For now use parent class
        if (CLASS_ICONS[sub.parentClass]) icon = CLASS_ICONS[sub.parentClass];
        if (CLASS_COLORS[sub.parentClass]) colorClass = CLASS_COLORS[sub.parentClass];
    }

    // Determine accent color for borders/text based on background
    // Simple heuristic: specific colors map to specific rings
    const ringClass = colorClass.replace('bg-', 'ring-').replace('700', '400').replace('600', '400').replace('800', '500');

    return (
        <div
            onClick={onClick}
            className={`
        group relative cursor-pointer rounded-xl transition-all duration-300 overflow-hidden
        flex flex-col shadow-md hover:shadow-xl hover:-translate-y-1 bg-white
        ${isSelected ? `ring-4 ${ringClass} ring-offset-2 z-10` : 'ring-1 ring-stone-200'}
        h-full
      `}
        >
            {/* Header / Banner */}
            <div className={`h-24 ${colorClass} relative p-4 flex justify-between items-start overflow-hidden`}>
                {/* Background Pattern (Abstract) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full border-8 border-white/20" />
                    <div className="absolute right-12 -top-8 w-24 h-24 rounded-full border-4 border-white/10" />
                </div>

                {/* Source Badge */}
                <span className={`
          relative z-10 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full
          ${item.source === '官方规则' ? 'bg-black/30 text-white' : 'bg-white/90 text-purple-700'}
        `}>
                    {item.source === '官方规则' ? '官方' : '自制'}
                </span>

                {/* Selected Check */}
                {isSelected && (
                    <div className="bg-white rounded-full p-0.5 text-green-600 shadow-sm relative z-10">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                )}
            </div>

            {/* Profile Icon (Overlapping) */}
            <div className="relative px-4 -mt-10 mb-2 flex justify-between items-end">
                <div className={`
          w-20 h-20 rounded-xl shadow-lg flex items-center justify-center p-4
          bg-white border-4 border-white text-stone-700
        `}>
                    {icon}
                </div>

                {/* Actions (if any) */}
                <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {actions}
                </div>
            </div>

            {/* Body Content */}
            <div className="px-4 pb-4 flex-grow flex flex-col">
                {/* Title */}
                <div className="mb-1">
                    {type === 'subclass' && (
                        <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">
                            {(item as SubclassItem).parentClass}专精
                        </div>
                    )}
                    <h3 className="text-xl font-black text-stone-800 leading-tight group-hover:text-amber-700 transition-colors">
                        {item.name}
                    </h3>
                </div>

                {/* Badges / Stats */}
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                    {type === 'class' ? (
                        <>
                            <span className="text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded border border-stone-200">
                                HP: {(item as ClassItem).hitDie}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded border border-stone-200">
                                {(item as ClassItem).primaryAbility}
                            </span>
                        </>
                    ) : (
                        <span className="text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded border border-stone-200">
                            {(item as SubclassItem).parentClass}
                        </span>
                    )}
                </div>

                {/* Description (Truncated) */}
                <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed mb-4 flex-grow">
                    {item.description || "暂无描述..."}
                </p>

                {/* Footer Link */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-stone-400 text-xs font-bold uppercase tracking-wider group-hover:text-amber-600 transition-colors">
                    <span>查看详情</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};
