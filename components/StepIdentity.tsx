
import React from 'react';
import { CharacterData, Alignment } from '../types';
import { ALIGNMENT_DESCRIPTIONS } from '../utils/characterUtils';
import { AlertCircle, Quote } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepIdentity: React.FC<Props> = ({ character, updateCharacter }) => {
    // --- Languages Logic (Ported from Wizard) ---
    const STANDARD_LANGUAGES = [
        "通用语", "通用手语", "矮人语", "精灵语", "巨人语", "侏儒语", "地精语", "半身人语", "兽人语", "龙语"
    ];
    const RARE_LANGUAGES = [
        "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", "原初语", "木族语", "盗贼黑话", "地底通用语"
    ];

    const currentList = character.languages ? character.languages.split('、').filter(s => s && s.trim().length > 0) : [];
    const hasRare = currentList.some(l => RARE_LANGUAGES.includes(l));
    const isOverLimit = currentList.length > 3;

    const toggleLang = (lang: string) => {
        let newList = [...currentList];
        if (newList.includes(lang)) {
            newList = newList.filter(l => l !== lang);
        } else {
            newList.push(lang);
        }
        newList = Array.from(new Set(newList));
        updateCharacter({ languages: newList.join('、') });
    };

    const currentAlignment = ALIGNMENT_DESCRIPTIONS[character.alignment];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                第六步：语言与阵营
            </h2>

            {/* Alignment Section (Enhanced) */}
            <div className="bg-white p-6 rounded-lg shadow border border-stone-200">
                <h3 className="font-bold text-xl text-stone-800 mb-6 flex items-center gap-2">阵营 (Alignment)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Grid Selection */}
                    <div className="grid grid-cols-3 gap-3 h-fit">
                        {['守序善良', '中立善良', '混乱善良',
                            '守序中立', '绝对中立', '混乱中立',
                            '守序邪恶', '中立邪恶', '混乱邪恶'].map(a => (
                                <button
                                    key={a}
                                    onClick={() => updateCharacter({ alignment: a as Alignment })}
                                    className={`
                          p-3 aspect-square flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all
                          ${character.alignment === a
                                            ? 'bg-stone-800 text-white border-stone-800 shadow-lg scale-105 z-10'
                                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-50'}
                       `}
                                >
                                    {a.replace(/(.{2})(.{2})/, "$1\n$2")}
                                </button>
                            ))}
                    </div>

                    {/* Description Panel */}
                    <div className={`rounded-xl p-6 border-2 transition-all ${currentAlignment ? 'bg-stone-50 border-stone-300' : 'bg-stone-100 border-stone-200 border-dashed flex items-center justify-center text-stone-400'}`}>
                        {currentAlignment ? (
                            <div className="space-y-4 animate-fade-in">
                                <div>
                                    <h4 className="text-2xl font-black text-stone-800 tracking-tight">{character.alignment}</h4>
                                    <div className="text-stone-500 font-serif italic text-lg opacity-75">
                                        “{currentAlignment.title}”
                                    </div>
                                </div>

                                <div className="relative pl-4 border-l-4 border-dndRed py-2">
                                    <Quote className="absolute -top-2 -left-2 w-4 h-4 text-dndRed fill-current opacity-20" />
                                    <p className="font-serif text-stone-700 italic leading-relaxed">
                                        {currentAlignment.quote}
                                    </p>
                                </div>

                                <div className="text-xs leading-relaxed text-justify text-stone-600 space-y-2">
                                    <p>{currentAlignment.desc}</p>
                                    <p className="font-bold text-stone-800 bg-white p-2 rounded border border-stone-200 shadow-sm">
                                        {currentAlignment.advantage}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm">请选择一个阵营查看详情</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white p-6 rounded-lg shadow border border-stone-200">
                <div className="flex justify-between items-start mb-6 border-b border-stone-100 pb-4">
                    <div>
                        <h3 className="font-bold text-xl text-stone-800 flex items-center gap-2">
                            语言能力
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${currentList.length === 3 ? 'bg-green-100 text-green-700 border-green-200' : isOverLimit ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                                已选: {currentList.length}
                            </span>
                        </h3>
                        <div className="text-xs text-stone-500 mt-2 space-y-1">
                            <p>通常配置：<span className="font-bold text-stone-700">通用语</span> + 1门标准 + (1门标准 或 1门稀有)。</p>
                        </div>
                    </div>
                </div>

                {/* Standard Languages */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold text-stone-600 uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-stone-600"></span>
                        标准语言
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {STANDARD_LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                onClick={() => toggleLang(lang)}
                                className={`
                        px-3 py-2 rounded text-xs font-bold border transition-all
                        ${currentList.includes(lang)
                                        ? 'bg-stone-800 text-white border-stone-800 shadow-sm transform scale-105'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300'}
                     `}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rare Languages */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold text-purple-700 uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                        稀有语言
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {RARE_LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                onClick={() => toggleLang(lang)}
                                className={`
                        px-3 py-2 rounded text-xs font-bold border transition-all
                        ${currentList.includes(lang)
                                        ? 'bg-purple-700 text-white border-purple-700 shadow-sm transform scale-105'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700'}
                     `}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Warnings & Custom Input */}
                <div className="bg-stone-50 p-4 rounded border border-stone-200 space-y-3">
                    {hasRare && (
                        <div className="flex gap-2 items-start text-xs text-purple-800 bg-purple-50 border border-purple-100 p-2 rounded">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div>
                                <strong>稀有语言提示：</strong> 你选择了稀有语言。请确保你的角色背景能合理解释为何掌握此语言。
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-stone-500 block mb-1">自定义/备注</label>
                        <textarea
                            value={character.languages}
                            onChange={e => updateCharacter({ languages: e.target.value })}
                            className="w-full p-2 border rounded text-sm focus:outline-none focus:border-dndRed"
                            placeholder="在此处手动修正语言列表..."
                            rows={2}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepIdentity;
