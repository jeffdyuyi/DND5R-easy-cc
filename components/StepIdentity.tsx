
import React from 'react';
import { CharacterData, Alignment } from '../types';
import { ALIGNMENT_DESCRIPTIONS } from '../utils/characterUtils';
import WizardLayout from './wizard/WizardLayout';
import { AlertCircle, Quote, Globe, MessageCircle } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepIdentity: React.FC<Props> = ({ character, updateCharacter }) => {
    // --- Languages Logic ---
    const STANDARD_LANGUAGES = [
        "通用语", "通用手语", "矮人语", "精灵语", "巨人语", "侏儒语", "地精语", "半身人语", "兽人语", "龙语"
    ];
    const RARE_LANGUAGES = [
        "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", "原初语", "木族语", "盗贼黑话", "地底通用语"
    ];

    const currentList = character.languages ? character.languages.split('、').filter(s => s && s.trim().length > 0) : [];
    const hasRare = currentList.some(l => RARE_LANGUAGES.includes(l));

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

    // === LEFT PANEL: Alignment Grid ===
    const leftPanel = (
        <div className="p-4 space-y-4">
            <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4" /> 阵营选择
            </h3>

            {/* 3x3 Alignment Grid */}
            <div className="grid grid-cols-3 gap-2">
                {['守序善良', '中立善良', '混乱善良',
                    '守序中立', '绝对中立', '混乱中立',
                    '守序邪恶', '中立邪恶', '混乱邪恶'].map(a => (
                        <button
                            key={a}
                            onClick={() => updateCharacter({ alignment: a as Alignment })}
                            className={`
              p-3 aspect-square flex items-center justify-center text-xs font-bold rounded-lg border-2 transition-all leading-tight text-center
              ${character.alignment === a
                                    ? 'bg-stone-800 text-white border-stone-800 shadow-lg scale-105 z-10'
                                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-50'}
            `}
                        >
                            {a}
                        </button>
                    ))}
            </div>

            {/* Alignment Preview Card */}
            {currentAlignment && (
                <div className="bg-white p-4 rounded-lg border-2 border-dndRed shadow-md mt-4 animate-fade-in">
                    <div className="text-lg font-black text-stone-800">{character.alignment}</div>
                    <div className="text-sm text-stone-500 italic">{currentAlignment.title}</div>
                </div>
            )}

            {/* Language Counter */}
            <div className="mt-6 bg-stone-100 p-4 rounded-lg border border-stone-200">
                <h4 className="text-xs font-bold text-stone-500 uppercase mb-2 flex items-center gap-2">
                    <MessageCircle className="w-3 h-3" /> 已选语言
                </h4>
                <div className="flex flex-wrap gap-1">
                    {currentList.length > 0 ? currentList.map(lang => (
                        <span key={lang} className={`text-xs px-2 py-1 rounded font-medium ${RARE_LANGUAGES.includes(lang) ? 'bg-purple-100 text-purple-700' : 'bg-stone-200 text-stone-700'}`}>
                            {lang}
                        </span>
                    )) : (
                        <span className="text-xs text-stone-400 italic">尚未选择语言</span>
                    )}
                </div>
            </div>
        </div>
    );

    // === RIGHT PANEL: Details ===
    const rightPanel = (
        <div className="p-6 space-y-6">
            {/* Alignment Description */}
            <div className="space-y-4">
                <h2 className="text-2xl font-black text-stone-900">阵营详解</h2>

                {currentAlignment ? (
                    <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 animate-fade-in">
                        <div>
                            <h3 className="text-xl font-black text-stone-800">{character.alignment}</h3>
                            <div className="text-stone-500 font-serif italic text-lg">"{currentAlignment.title}"</div>
                        </div>

                        <div className="relative pl-4 border-l-4 border-dndRed py-2">
                            <Quote className="absolute -top-2 -left-2 w-4 h-4 text-dndRed fill-current opacity-20" />
                            <p className="font-serif text-stone-700 italic leading-relaxed">
                                {currentAlignment.quote}
                            </p>
                        </div>

                        <div className="text-sm leading-relaxed text-stone-600 space-y-3">
                            <p>{currentAlignment.desc}</p>
                            <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                                <strong className="text-stone-800">角色倾向：</strong>
                                <span className="text-stone-600">{currentAlignment.advantage}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-stone-100 p-8 rounded-xl border-2 border-dashed border-stone-200 text-center text-stone-400">
                        请从左侧选择一个阵营查看详细说明
                    </div>
                )}
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
                <h3 className="font-bold text-stone-700">语言能力</h3>
                <p className="text-sm text-stone-500">
                    通常配置：<strong>通用语</strong> + 1门标准语言 + 1门自选（标准或稀有）。
                </p>

                {/* Standard Languages */}
                <div>
                    <h4 className="text-xs font-bold text-stone-600 uppercase mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-stone-500"></span>
                        标准语言
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {STANDARD_LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                onClick={() => toggleLang(lang)}
                                className={`
                  px-3 py-2 rounded text-xs font-bold border transition-all
                  ${currentList.includes(lang)
                                        ? 'bg-stone-800 text-white border-stone-800 shadow-sm'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300'}
                `}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rare Languages */}
                <div>
                    <h4 className="text-xs font-bold text-purple-700 uppercase mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        稀有语言
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {RARE_LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                onClick={() => toggleLang(lang)}
                                className={`
                  px-3 py-2 rounded text-xs font-bold border transition-all
                  ${currentList.includes(lang)
                                        ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700'}
                `}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Warning */}
                {hasRare && (
                    <div className="flex gap-2 items-start text-xs text-purple-800 bg-purple-50 border border-purple-100 p-3 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                            <strong>注意：</strong> 你选择了稀有语言。请确保你的角色背景能合理解释为何掌握此语言。
                        </div>
                    </div>
                )}

                {/* Manual Override */}
                <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">自定义语言列表</label>
                    <textarea
                        value={character.languages}
                        onChange={e => updateCharacter({ languages: e.target.value })}
                        className="w-full p-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dndRed"
                        placeholder="在此处手动编辑语言列表..."
                        rows={2}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <WizardLayout
            title="阵营与语言"
            stepId={9}
            totalSteps={9}
            leftPanel={leftPanel}
            rightPanel={rightPanel}
        />
    );
};

export default StepIdentity;
