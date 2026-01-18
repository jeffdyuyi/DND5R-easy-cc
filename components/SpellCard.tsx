import React from 'react';
import { SpellItem } from '../types';
import { RichText } from './RichText';

// 法术成分图标组件
const ComponentIcons: React.FC<{ components: string }> = ({ components }) => {
    const hasV = components.includes('V') || components.includes('言语');
    const hasS = components.includes('S') || components.includes('姿势');
    const hasM = components.includes('M') || components.includes('材料');

    return (
        <div className="flex gap-2">
            {hasV && (
                <div className="w-8 h-8 flex items-center justify-center" title="言语成分">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-stone-700">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
                        <path d="M16 6c0 0 2 1 3 3s1 3 1 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M17 3c0 0 3 2 4 5s1 5 1 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </div>
            )}
            {hasS && (
                <div className="w-8 h-8 flex items-center justify-center" title="姿势成分">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-stone-700">
                        <path d="M21 10c-1 1-2.5 1.5-4 1.5s-3-1-3-1l-2-2-3 3c0 0 .5 1 1 3s0 4-1 5l-2 2h12V10z" />
                        <circle cx="7" cy="6" r="2" />
                        <path d="M4 12c0-2 1-4 3-4" />
                    </svg>
                </div>
            )}
            {hasM && (
                <div className="w-8 h-8 flex items-center justify-center" title="材料成分">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-stone-700">
                        <path d="M12 2L4 7v3c0 5 3.5 10 8 11 4.5-1 8-6 8-11V7l-8-5z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

// 获取法术学派颜色
const getSchoolColor = (school: string): string => {
    const colors: Record<string, string> = {
        '防护': '#2d5016', // 深绿
        '咒法': '#1a365d', // 深蓝
        '预言': '#553c9a', // 紫色
        '附魔': '#7c2d12', // 棕红
        '塑能': '#991b1b', // 红色
        '幻术': '#0f766e', // 青色
        '死灵': '#1f2937', // 深灰
        '变化': '#166534', // 绿色
    };
    return colors[school] || '#4a5568';
};

// 职业列表
const ALL_CLASSES = ['法师', '吟游诗人', '牧师', '德鲁伊', '术士', '邪术师', '游侠', '圣武士'];

interface SpellCardProps {
    item: SpellItem;
}

const SpellCard: React.FC<SpellCardProps> = ({ item }) => {
    const schoolColor = getSchoolColor(item.school);
    const levelText = item.level === 0 ? '戏法' : `Lv ${item.level}`;

    // 检查需要专注
    const requiresConcentration = item.duration.includes('专注') || item.duration.includes('Concentration');

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-lg border-2 font-serif"
            style={{ borderColor: schoolColor }}
        >
            {/* 顶部标题栏 */}
            <div
                className="p-3 text-white flex items-center justify-between"
                style={{ backgroundColor: schoolColor }}
            >
                <div className="flex items-center gap-3">
                    {/* 法术学派图标 */}
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/90">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                                <path d="M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80"
                                    fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                                <polygon points="50,15 35,45 50,40 65,45" fill="currentColor" opacity="0.5" />
                                <polygon points="50,85 35,55 50,60 65,55" fill="currentColor" opacity="0.5" />
                            </svg>
                        </div>
                    </div>

                    {/* 法术名称 */}
                    <h1 className="text-2xl font-black tracking-wider uppercase">{item.name}</h1>
                </div>

                {/* 环阶标识 */}
                <div className="text-right">
                    <div className="text-xl font-black">{levelText}</div>
                </div>
            </div>

            {/* 法术信息区域 */}
            <div className="flex">
                {/* 左侧：法术属性 */}
                <div className="flex-1 p-4 space-y-2">
                    <div className="flex items-center">
                        <span className="w-28 font-bold text-stone-700">Range</span>
                        <span className="font-black text-xl text-stone-900">{item.range}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-28 font-bold text-stone-700">Duration</span>
                        {requiresConcentration && (
                            <span className="mr-2 text-amber-600">⏳</span>
                        )}
                        <span className="font-black text-xl text-stone-900">{item.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-28 font-bold text-stone-700">Casting Time</span>
                        <span className="font-black text-xl text-stone-900">{item.castingTime}</span>
                    </div>

                    {/* 成分图标 */}
                    <div className="pt-2">
                        <ComponentIcons components={item.components} />
                    </div>
                </div>

                {/* 右侧：职业列表 */}
                <div className="w-24 text-right p-4 space-y-0.5">
                    {ALL_CLASSES.map(cls => {
                        const hasClass = item.classes?.includes(cls);
                        return (
                            <div
                                key={cls}
                                className={`text-sm font-medium flex items-center justify-end gap-1 ${hasClass ? 'text-stone-900' : 'text-stone-300'
                                    }`}
                            >
                                <span>{cls}</span>
                                {hasClass && (
                                    <span
                                        className="w-1.5 h-4 rounded-sm"
                                        style={{ backgroundColor: schoolColor }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 描述分隔条 */}
            <div
                className="px-4 py-2 text-white italic text-sm"
                style={{ backgroundColor: schoolColor }}
            >
                {item.school} - {item.level === 0 ? '戏法' : `${item.level}环法术`}
            </div>

            {/* 法术描述 - 无高度限制 */}
            <div className="p-4 bg-stone-50 text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                <RichText text={item.description} />

                {/* 升环描述 */}
                {item.higherLevel && (
                    <div className="mt-4 pt-3 border-t border-stone-300">
                        <strong className="text-stone-900">升环施法。</strong> {item.higherLevel}
                    </div>
                )}
            </div>

            {/* 页脚 */}
            <div
                className="px-4 py-2 text-white/80 text-xs flex justify-between"
                style={{ backgroundColor: schoolColor }}
            >
                <span>{item.source}</span>
                <span>不咕鸟制卡</span>
            </div>
        </div>
    );
};

export default SpellCard;
