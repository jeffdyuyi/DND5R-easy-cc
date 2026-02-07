import React from 'react';
import { SpellItem } from '../types';
import { RichText } from './RichText';

// 法术成分图标组件 - 使用中文文字
const ComponentIcons: React.FC<{ components: string }> = ({ components }) => {
    const hasV = components.includes('声音') || components.includes('V') || components.includes('言语');
    const hasS = components.includes('姿势') || components.includes('S');
    const hasM = components.includes('材料') || components.includes('M');

    return (
        <div className="flex gap-2 text-sm flex-wrap">
            {hasV && (
                <span className="px-2 py-1 bg-blue-100 border border-blue-300 rounded font-medium text-blue-800" title="言语成分">
                    言语
                </span>
            )}
            {hasS && (
                <span className="px-2 py-1 bg-amber-100 border border-amber-300 rounded font-medium text-amber-800" title="姿势成分">
                    姿势
                </span>
            )}
            {hasM && (
                <span className="px-2 py-1 bg-purple-100 border border-purple-300 rounded font-medium text-purple-800" title="材料成分">
                    材料
                </span>
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
            {/* 顶部标题栏 - 响应式 */}
            <div
                className="p-2 sm:p-3 text-white flex items-center justify-between"
                style={{ backgroundColor: schoolColor }}
            >
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* 法术学派图标 - 移动端缩小 */}
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 flex-shrink-0">
                        <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/90">
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

                    {/* 法术名称 - 响应式字体 */}
                    <h1 className="text-lg sm:text-2xl font-black tracking-wider uppercase">{item.name}</h1>
                </div>

                {/* 环阶标识 */}
                <div className="text-right flex-shrink-0">
                    <div className="text-base sm:text-xl font-black">{levelText}</div>
                </div>
            </div>

            {/* 法术信息区域 - 响应式布局 */}
            <div className="flex flex-col sm:flex-row">
                {/* 法术属性 */}
                <div className="flex-1 p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center">
                        <span className="w-20 sm:w-28 font-bold text-stone-700 text-sm sm:text-base">射程</span>
                        <span className="font-black text-base sm:text-xl text-stone-900">{item.range}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 sm:w-28 font-bold text-stone-700 text-sm sm:text-base">持续时间</span>
                        {requiresConcentration && (
                            <span className="mr-1 sm:mr-2 text-amber-600">⏳</span>
                        )}
                        <span className="font-black text-base sm:text-xl text-stone-900">{item.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 sm:w-28 font-bold text-stone-700 text-sm sm:text-base">施法时间</span>
                        <span className="font-black text-base sm:text-xl text-stone-900">{item.castingTime}</span>
                    </div>

                    {/* 成分图标 */}
                    <div className="pt-1.5 sm:pt-2">
                        <ComponentIcons components={item.components} />
                    </div>
                </div>

                {/* 职业列表 - 移动端水平，桌面端垂直 */}
                <div className="border-t sm:border-t-0 sm:border-l border-stone-200 px-3 py-2 sm:w-24 sm:text-right sm:p-4 sm:space-y-0.5">
                    <div className="flex flex-wrap gap-1.5 sm:flex-col sm:gap-0.5">
                        {ALL_CLASSES.map(cls => {
                            const hasClass = item.classes?.includes(cls);
                            return (
                                <div
                                    key={cls}
                                    className={`text-xs sm:text-sm font-medium flex items-center sm:justify-end gap-1 ${hasClass ? 'text-stone-900' : 'text-stone-300 hidden sm:flex'}`}
                                >
                                    <span>{cls}</span>
                                    {hasClass && (
                                        <span
                                            className="w-1 h-3 sm:w-1.5 sm:h-4 rounded-sm"
                                            style={{ backgroundColor: schoolColor }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
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
