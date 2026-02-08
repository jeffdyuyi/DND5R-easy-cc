
import React, { useState, useMemo } from 'react';
import { SpellItem } from '../types';
import { SPELL_DB, CLASS_DB } from '../data';
import { Search, ChevronRight, ChevronDown, BookOpen, X } from 'lucide-react';
import { SpellDetailView } from './LibraryDetails';

interface Props {
    className?: string; // e.g., "牧师"
    onClose?: () => void;
}

export const SpellListReference: React.FC<Props> = ({ className = "牧师", onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedLevels, setExpandedLevels] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [selectedSpell, setSelectedSpell] = useState<SpellItem | null>(null);
    const [currentClass, setCurrentClass] = useState(className);

    // Update currentClass if prop changes (e.g. switching character)
    React.useEffect(() => {
        setCurrentClass(className);
    }, [className]);

    const filteredSpells = useMemo(() => {
        return SPELL_DB.filter(s => {
            const matchesClass = s.classes?.includes(currentClass);
            const matchesSearch = s.name.includes(searchTerm) ||
                s.school.includes(searchTerm) ||
                (s.description && s.description.includes(searchTerm));
            return matchesClass && matchesSearch;
        });
    }, [currentClass, searchTerm]);

    const spellsByLevel = useMemo(() => {
        const groups: Record<number, SpellItem[]> = {};
        filteredSpells.forEach(s => {
            if (!groups[s.level]) groups[s.level] = [];
            groups[s.level].push(s);
        });
        return groups;
    }, [filteredSpells]);

    const toggleLevel = (level: number) => {
        setExpandedLevels(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
        );
    };

    return (
        <div className="flex flex-col h-full bg-stone-50 rounded-xl border-2 border-stone-800 overflow-hidden shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 bg-stone-100 border-b-2 border-stone-800 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-6 h-6 text-dndRed" />
                        <select
                            value={currentClass}
                            onChange={(e) => setCurrentClass(e.target.value)}
                            className="text-xl font-black text-stone-800 bg-transparent border-b-2 border-stone-300 focus:border-dndRed outline-none cursor-pointer hover:bg-stone-200 rounded px-1 transition-colors"
                        >
                            {CLASS_DB.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                        <span className="text-xl font-black text-stone-800">法术列表</span>
                    </div>
                    <p className="text-xs text-stone-500 font-bold">查看 {currentClass} 可选法术</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full text-stone-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            <div className="p-4 bg-white border-b border-stone-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="搜索法术名称、学派或描述..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-300 rounded-lg focus:ring-2 focus:ring-dndRed focus:border-transparent transition-all outline-none"
                    />
                </div>
            </div>

            {/* List content */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => {
                    const levelSpells = spellsByLevel[level] || [];
                    if (levelSpells.length === 0 && searchTerm) return null;

                    const isExpanded = expandedLevels.includes(level);

                    return (
                        <div key={level} className="bg-white rounded-lg border-2 border-stone-200 overflow-hidden hover:border-stone-400 transition-colors shadow-sm">
                            <button
                                onClick={() => toggleLevel(level)}
                                className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${isExpanded ? 'bg-stone-50' : 'bg-white hover:bg-stone-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2 ${level === 0 ? 'bg-stone-100 border-stone-300 text-stone-500' : 'bg-white border-dndRed text-dndRed'}`}>
                                        {level}
                                    </span>
                                    <span className="font-black text-stone-700 uppercase tracking-tight">
                                        {level === 0 ? '戏法 (Cantrips)' : `${level}环法术 (Level ${level})`}
                                    </span>
                                    <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded font-bold">
                                        {levelSpells.length}
                                    </span>
                                </div>
                                {isExpanded ? <ChevronDown className="w-5 h-5 text-stone-400" /> : <ChevronRight className="w-5 h-5 text-stone-400" />}
                            </button>

                            {isExpanded && (
                                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-stone-100 bg-stone-50/30">
                                    {levelSpells.length === 0 ? (
                                        <div className="col-span-full py-4 text-center text-stone-400 italic text-xs font-bold">暂无该等级法术</div>
                                    ) : (
                                        levelSpells.sort((a, b) => a.name.localeCompare(b.name)).map(spell => (
                                            <div
                                                key={spell.id}
                                                onClick={() => setSelectedSpell(spell)}
                                                className="p-3 rounded-lg border-2 border-stone-100 bg-white hover:border-dndRed hover:bg-red-50 cursor-pointer transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-stone-800 truncate group-hover:text-dndRed">{spell.name}</span>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{spell.school}</span>
                                                        <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                                                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{spell.castingTime}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-dndRed transition-transform group-hover:translate-x-1" />
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Spell Detail Modal */}
            {selectedSpell && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-y-auto border-2 border-stone-800 relative">
                        <div className="sticky top-0 bg-white border-b-2 border-stone-200 p-2 flex justify-end z-10">
                            <button
                                onClick={() => setSelectedSpell(null)}
                                className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 pt-0">
                            <SpellDetailView item={selectedSpell} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
