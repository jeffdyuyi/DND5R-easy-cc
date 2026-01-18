import React from 'react';
import { CharacterData } from '../types';

import { Sparkles, Music, Wrench, BookOpen, CheckCircle } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
    featName: string;
    lockedSpellList?: '牧师' | '德鲁伊' | '法师';
}

// 工匠工具列表
const ARTISAN_TOOLS = [
    '木匠工具', '皮匠工具', '石匠工具', '陶匠工具', '铁匠工具',
    '修补工具', '织布工具', '木雕工具', '炼金工具', '酿造工具',
    '书法工具', '制图工具', '钴工工具', '玻璃工工具', '珠宝工具',
    '绘画工具', '鞋匠工具'
];

// 乐器列表
const INSTRUMENTS = [
    '风笛', '鼓', '扬琴', '长笛', '竖琴', '琉特琴', '里拉琴',
    '圆号', '芦笙', '琵琶', '二胡', '古筝', '手鼓', '铃鼓'
];

// 技能列表
const ALL_SKILLS = [
    '运动', '杂技', '巧手', '隐匿', '奥秘', '历史', '调查',
    '自然', '宗教', '驯兽', '洞悉', '医药', '察觉', '求生',
    '欺瞒', '威吓', '表演', '游说'
];

// 法术列表映射到职业
const SPELL_LIST_CLASS_MAP: Record<string, string> = {
    '牧师': '牧师',
    '德鲁伊': '德鲁伊',
    '法师': '法师'
};

const OriginFeatSelector: React.FC<Props> = ({
    character,
    updateCharacter,
    featName,
    lockedSpellList
}) => {
    const featConfig = character.featConfig?.originFeat || { name: '' };

    // 更新featConfig
    const updateFeatConfig = (updates: Partial<typeof featConfig>) => {
        updateCharacter({
            featConfig: {
                ...character.featConfig,
                originFeat: {
                    ...featConfig,
                    ...updates,
                    name: featName
                }
            }
        });
    };

    // 渲染魔法学徒选择器
    if (featName === '魔法学徒') {
        const spellList = lockedSpellList || featConfig.spellList;
        const isComplete = !!spellList;

        return (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 text-purple-800 font-bold">
                    <Sparkles className="w-5 h-5" />
                    魔法学徒
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                </div>

                <div className="space-y-4">
                    {/* 法术列表选择 (如果背景未锁定) */}
                    {!lockedSpellList ? (
                        <div>
                            <label className="text-sm font-bold text-stone-600 block mb-2">选择法术列表来源</label>
                            <select
                                value={featConfig.spellList || ''}
                                onChange={e => updateFeatConfig({ spellList: e.target.value as any })}
                                className="w-full p-3 border border-stone-300 rounded-lg font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">-- 请选择 --</option>
                                {Object.keys(SPELL_LIST_CLASS_MAP).map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="text-sm text-purple-700 font-medium">
                            法术列表来源: {spellList} (由背景决定)
                        </div>
                    )}

                    {/* 提示信息 */}
                    <div className="bg-white p-4 rounded border border-purple-100 flex gap-3 transform transition-all hover:scale-[1.02]">
                        <BookOpen className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-bold text-stone-700 mb-1">前往“法术”步骤配置</p>
                            <p className="text-stone-500">
                                请在后续的 <strong>法术</strong> 步骤中选择具体的戏法、一环法术以及施法关键属性。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 渲染巧匠选择器
    if (featName === '巧匠') {
        const selectedTools = featConfig.artisanTools || [];
        const isComplete = selectedTools.length >= 3;

        return (
            <div className="space-y-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800 font-bold">
                    <Wrench className="w-5 h-5" />
                    巧匠 - 选择3种工匠工具熟练
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                </div>

                <div className="flex flex-wrap gap-2">
                    {ARTISAN_TOOLS.map(tool => (
                        <button
                            key={tool}
                            onClick={() => {
                                if (selectedTools.includes(tool)) {
                                    updateFeatConfig({ artisanTools: selectedTools.filter(t => t !== tool) });
                                } else if (selectedTools.length < 3) {
                                    updateFeatConfig({ artisanTools: [...selectedTools, tool] });
                                }
                            }}
                            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${selectedTools.includes(tool)
                                ? 'bg-amber-600 text-white'
                                : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                                }`}
                        >
                            {tool}
                        </button>
                    ))}
                </div>

                {selectedTools.length > 0 && (
                    <div className="text-sm text-amber-700">
                        已选择: {selectedTools.join('、')} ({selectedTools.length}/3)
                    </div>
                )}
            </div>
        );
    }

    // 渲染音乐家选择器
    if (featName === '音乐家') {
        const selectedInstruments = featConfig.instruments || [];
        const isComplete = selectedInstruments.length >= 3;

        return (
            <div className="space-y-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="flex items-center gap-2 text-pink-800 font-bold">
                    <Music className="w-5 h-5" />
                    音乐家 - 选择3种乐器熟练
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                </div>

                <div className="flex flex-wrap gap-2">
                    {INSTRUMENTS.map(instrument => (
                        <button
                            key={instrument}
                            onClick={() => {
                                if (selectedInstruments.includes(instrument)) {
                                    updateFeatConfig({ instruments: selectedInstruments.filter(i => i !== instrument) });
                                } else if (selectedInstruments.length < 3) {
                                    updateFeatConfig({ instruments: [...selectedInstruments, instrument] });
                                }
                            }}
                            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${selectedInstruments.includes(instrument)
                                ? 'bg-pink-600 text-white'
                                : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                                }`}
                        >
                            {instrument}
                        </button>
                    ))}
                </div>

                {selectedInstruments.length > 0 && (
                    <div className="text-sm text-pink-700">
                        已选择: {selectedInstruments.join('、')} ({selectedInstruments.length}/3)
                    </div>
                )}
            </div>
        );
    }

    // 渲染熟习选择器
    if (featName === '熟习') {
        const selectedItems = featConfig.skillsAndTools || [];
        const isComplete = selectedItems.length >= 3;


        return (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 font-bold">
                    <BookOpen className="w-5 h-5" />
                    熟习 - 选择3项技能或工具熟练
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                </div>

                <div className="space-y-3">
                    <div>
                        <div className="text-xs font-bold text-stone-500 mb-2">技能</div>
                        <div className="flex flex-wrap gap-2">
                            {ALL_SKILLS.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => {
                                        if (selectedItems.includes(skill)) {
                                            updateFeatConfig({ skillsAndTools: selectedItems.filter(i => i !== skill) });
                                        } else if (selectedItems.length < 3) {
                                            updateFeatConfig({ skillsAndTools: [...selectedItems, skill] });
                                        }
                                    }}
                                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${selectedItems.includes(skill)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-xs font-bold text-stone-500 mb-2">工具</div>
                        <div className="flex flex-wrap gap-2">
                            {['盗贼工具', '草药工具', '领航工具', '文书伪造工具', '易容工具'].map(tool => (
                                <button
                                    key={tool}
                                    onClick={() => {
                                        if (selectedItems.includes(tool)) {
                                            updateFeatConfig({ skillsAndTools: selectedItems.filter(i => i !== tool) });
                                        } else if (selectedItems.length < 3) {
                                            updateFeatConfig({ skillsAndTools: [...selectedItems, tool] });
                                        }
                                    }}
                                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${selectedItems.includes(tool)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                                        }`}
                                >
                                    {tool}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {selectedItems.length > 0 && (
                    <div className="text-sm text-blue-700">
                        已选择: {selectedItems.join('、')} ({selectedItems.length}/3)
                    </div>
                )}
            </div>
        );
    }

    // 不需要选择的专长
    return null;
};

export default OriginFeatSelector;
