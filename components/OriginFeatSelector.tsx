import React, { useMemo } from 'react';
import { CharacterData } from '../types';
import { SPELL_DB } from '../data-spells';
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

    // 魔法学徒相关
    const spellList = lockedSpellList || featConfig.spellList;

    // 获取可用戏法
    const availableCantrips = useMemo(() => {
        if (!spellList) return [];
        const className = SPELL_LIST_CLASS_MAP[spellList];
        return SPELL_DB.filter(s => s.level === 0 && s.classes?.includes(className));
    }, [spellList]);

    // 获取可用一环法术
    const availableLevel1Spells = useMemo(() => {
        if (!spellList) return [];
        const className = SPELL_LIST_CLASS_MAP[spellList];
        return SPELL_DB.filter(s => s.level === 1 && s.classes?.includes(className));
    }, [spellList]);

    // 渲染魔法学徒选择器
    if (featName === '魔法学徒') {
        const selectedCantrips = featConfig.cantrips || [];
        const selectedSpell = featConfig.level1Spell || '';
        const selectedAbility = featConfig.spellcastingAbility || '';

        const isComplete = selectedCantrips.length >= 2 && selectedSpell && selectedAbility;

        return (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 text-purple-800 font-bold">
                    <Sparkles className="w-5 h-5" />
                    魔法学徒 - {spellList}法术列表
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                </div>

                {/* 施法属性选择 */}
                <div>
                    <label className="text-sm font-bold text-stone-600 block mb-2">施法属性</label>
                    <div className="flex gap-2">
                        {(['intelligence', 'wisdom', 'charisma'] as const).map(ability => (
                            <button
                                key={ability}
                                onClick={() => updateFeatConfig({ spellcastingAbility: ability })}
                                className={`px-4 py-2 rounded-lg font-bold transition-colors ${selectedAbility === ability
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                                    }`}
                            >
                                {{ intelligence: '智力', wisdom: '感知', charisma: '魅力' }[ability]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 戏法选择 (选2个) */}
                <div>
                    <label className="text-sm font-bold text-stone-600 block mb-2">
                        选择2道戏法 ({selectedCantrips.length}/2)
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-white rounded border border-stone-200">
                        {availableCantrips.map(spell => (
                            <button
                                key={spell.id}
                                onClick={() => {
                                    if (selectedCantrips.includes(spell.name)) {
                                        updateFeatConfig({ cantrips: selectedCantrips.filter(s => s !== spell.name) });
                                    } else if (selectedCantrips.length < 2) {
                                        updateFeatConfig({ cantrips: [...selectedCantrips, spell.name] });
                                    }
                                }}
                                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${selectedCantrips.includes(spell.name)
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                {spell.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 一环法术选择 */}
                <div>
                    <label className="text-sm font-bold text-stone-600 block mb-2">选择1道一环法术</label>
                    <select
                        value={selectedSpell}
                        onChange={e => updateFeatConfig({ level1Spell: e.target.value })}
                        className="w-full p-3 border border-stone-300 rounded-lg font-medium"
                    >
                        <option value="">-- 选择法术 --</option>
                        {availableLevel1Spells.map(spell => (
                            <option key={spell.id} value={spell.name}>{spell.name}</option>
                        ))}
                    </select>
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
