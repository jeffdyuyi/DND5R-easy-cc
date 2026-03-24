
import React from 'react';
import { BaseLibraryItem, ClassItem, SubclassItem, SpeciesItem, BackgroundItem, FeatItem } from '../../types';
import {
    Sword, Wand2, Shield, Cross, Music, Leaf, Moon,
    Sparkles, Axe, Zap, Eye, Target, Footprints,
    CheckCircle, Zap as SpeedIcon, Scale, Star, Info
} from 'lucide-react';

interface Props {
    item: BaseLibraryItem;
    type: 'class' | 'subclass' | 'species' | 'background' | 'feat' | 'default';
    isSelected?: boolean;
    onClick: () => void;
    actions?: React.ReactNode;
}

// Reuse icon mapping logic
const CLASS_ICONS: Record<string, JSX.Element> = {
    '野蛮人': <Axe />,
    '吟游诗人': <Music />,
    '牧师': <Cross />,
    '德鲁伊': <Leaf />,
    '战士': <Sword />,
    '武僧': <Moon />,
    '圣武士': <Shield />,
    '游侠': <Target />,
    '游荡者': <Footprints />,
    '术士': <Zap />,
    '魔契师': <Eye />,
    '法师': <Wand2 />,
};

const TYPE_COLORS: Record<string, string> = {
    class: 'bg-red-600',
    subclass: 'bg-orange-500',
    species: 'bg-green-600',
    background: 'bg-yellow-600',
    feat: 'bg-purple-600',
    default: 'bg-stone-600'
};

export const ModernListRow: React.FC<Props> = ({ item, type, isSelected, onClick, actions }) => {
    const isOfficial = ['官方规则', "PHB'14", "PHB'24", "PHB", 'XGE', 'TCE', 'FTD', 'DMG', 'Free Basic Rules (2024)'].includes(item.source) || (!item.source.includes('自制') && !item.source.includes('第三方'));

    const getIcon = () => {
        if (type === 'class') return CLASS_ICONS[(item as ClassItem).name] || <Sparkles />;
        if (type === 'subclass') return CLASS_ICONS[(item as SubclassItem).parentClass] || <Sparkles />;
        if (type === 'species') return <Footprints />;
        if (type === 'background') return <Leaf />;
        if (type === 'feat') return <Star />;
        return <Info />;
    };

    const renderMetadata = () => {
        switch (type) {
            case 'class': {
                const c = item as ClassItem;
                return (
                    <div className="flex gap-3 text-[11px] font-bold">
                        <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-100 uppercase">HD: {c.hitDie}</span>
                        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">{c.primaryAbility}</span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">豁免: {c.saves.join('/')}</span>
                    </div>
                );
            }
            case 'subclass': {
                const sc = item as SubclassItem;
                return (
                    <div className="flex gap-3 text-[11px] font-bold">
                        <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100 uppercase">{sc.parentClass} 子职</span>
                    </div>
                );
            }
            case 'species': {
                const s = item as SpeciesItem;
                return (
                    <div className="flex gap-3 text-[11px] font-bold">
                        <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100"><SpeedIcon className="w-3 h-3" /> {s.speed} 尺</span>
                        <span className="flex items-center gap-1 bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200"><Scale className="w-3 h-3" /> {s.size}</span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">黑暗视觉: {s.darkvision}</span>
                    </div>
                );
            }
            case 'background': {
                const b = item as BackgroundItem;
                return (
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                        <div className="flex gap-1">
                            {b.abilityScores.map(score => (
                                <span key={score} className="bg-yellow-50 text-yellow-800 px-1.5 py-0.5 rounded border border-yellow-200 uppercase">{score}</span>
                            ))}
                        </div>
                        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">专长: {b.feat || '无'}</span>
                        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200 truncate max-w-[200px]">技能: {b.skills.join(', ')}</span>
                    </div>
                );
            }
            case 'feat': {
                const f = item as FeatItem;
                return (
                    <div className="flex gap-3 text-[11px] font-bold">
                        <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">{f.category}</span>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div
            onClick={onClick}
            className={`
        group relative flex items-center gap-4 p-3 bg-white border-b border-stone-200 hover:bg-stone-50 transition-all cursor-pointer
        ${isSelected ? 'bg-stone-100 ring-2 ring-inset ring-stone-400 z-10' : ''}
      `}
        >
            {/* Type Indicator Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${TYPE_COLORS[type] || TYPE_COLORS.default}`} />

            {/* Icon */}
            <div className={`
        flex-none w-10 h-10 rounded-lg flex items-center justify-center 
        ${isSelected ? 'bg-stone-200 text-stone-800' : 'bg-stone-50 text-stone-400 group-hover:bg-white group-hover:text-stone-600'} 
        transition-colors p-2.5
      `}>
                {React.cloneElement(getIcon() as React.ReactElement, { className: 'w-full h-full' })}
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-stone-800 truncate text-base leading-tight">
                        {item.name}
                    </h3>
                    <span className={`
            text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded 
            ${isOfficial ? 'bg-stone-800 text-white' : 'bg-purple-100 text-purple-700 border border-purple-200'}
          `}>
                        {isOfficial ? '官方' : '自制'}
                    </span>
                    {isSelected && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-none">
                        {renderMetadata()}
                    </div>
                    <div className="flex-grow border-l border-stone-200 pl-4 min-w-0">
                        <p className="text-[11px] text-stone-500 italic truncate leading-relaxed">
                            {item.description || '无简短描述'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                {actions}
            </div>
        </div>
    );
};
