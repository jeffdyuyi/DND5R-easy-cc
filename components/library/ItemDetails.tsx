import React from 'react';
import { Zap, Backpack, Sword, Shield, Coins, Weight, Clock, MousePointer2, Settings2, ScrollText, Sparkles } from 'lucide-react';
import { ItemItem, SpellItem } from '../../types';
import { DetailContainer, DetailFooter } from './DetailContainer';
import { RichText } from '../RichText';

export const ItemDetailView: React.FC<{ item: ItemItem }> = ({ item }) => {
    if (!item) return <div className="p-8 text-stone-400 italic">未选择物品数据</div>;

    const isWeapon = item.type === '武器' || (item.tags && item.tags.includes('武器'));
    const isArmor = item.type === '护甲' || (item.tags && item.tags.includes('护甲'));

    return (
        <DetailContainer
            title={item.name}
            subtitle={`${item.type || '冒险装备'} / ${item.rarity || '普通'}`}
            icon={isWeapon ? <Sword className="w-8 h-8 text-white" /> : isArmor ? <Shield className="w-8 h-8 text-white" /> : <Backpack className="w-8 h-8 text-white" />}
            headerColor="bg-stone-800"
            accentColor="border-stone-800"
            bodyContent={
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest text-stone-500 mb-6 bg-stone-100/50 p-4 rounded-xl border border-stone-200 shadow-inner">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                            <Coins className="w-3.5 h-3.5 text-stone-400" /> 价值: <span className="text-stone-800">{item.cost || '---'}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                            <Weight className="w-3.5 h-3.5 text-stone-400" /> 重量: <span className="text-stone-800">{item.weight || '---'}</span>
                        </div>
                        {item.ac && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                <Shield className="w-3.5 h-3.5 text-stone-400" /> AC: <span className="text-stone-800">{item.ac}</span>
                            </div>
                        )}
                        {item.damage && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                <Sword className="w-3.5 h-3.5 text-stone-400" /> 伤害: <span className="text-stone-800">{item.damage} {item.damageType}</span>
                            </div>
                        )}
                    </div>

                    <div className="text-stone-700 leading-relaxed min-h-[100px] prose prose-stone max-w-none">
                        <RichText text={item.description || '暂无详细描述'} />
                    </div>

                    {item.properties && item.properties.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-4">
                            {item.properties.map(p => (
                                <span key={p} className="px-2 py-0.5 bg-stone-200 text-stone-600 rounded text-[10px] font-bold uppercase tracking-tight">
                                    {p}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};

export const SpellDetailView: React.FC<{ item: SpellItem }> = ({ item }) => {
    if (!item) return <div className="p-8 text-stone-400 italic">未选择法术数据</div>;

    const levelLabel = item.level === 0 ? '戏法' : `${item.level} 环`;
    const schoolLabel = item.school || '通用';

    return (
        <DetailContainer
            title={item.name}
            subtitle={`${levelLabel} / ${schoolLabel} 学派`}
            icon={<Zap className="w-8 h-8 text-white" />}
            headerColor="bg-blue-900"
            accentColor="border-blue-900"
            bodyContent={
                <div className="space-y-6">
                    {/* Spell Meta Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-stone-50/80 p-5 rounded-2xl border-2 border-stone-100 shadow-sm text-sm">
                        <div className="flex items-start gap-2.5 group">
                            <Clock className="w-4 h-4 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-0.5">施法时间 (Casting)</div>
                                <div className="text-stone-800 font-bold leading-tight">{item.castingTime || '1 动作'}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 group">
                            <MousePointer2 className="w-4 h-4 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-0.5">范围 (Range)</div>
                                <div className="text-stone-800 font-bold leading-tight">{item.range || '触及'}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 group">
                            <Settings2 className="w-4 h-4 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-0.5">构材 (Components)</div>
                                <div className="text-stone-800 font-bold leading-tight">{item.components || 'V, S'}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 group">
                            <ScrollText className="w-4 h-4 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-0.5">持续时间 (Duration)</div>
                                <div className="text-stone-800 font-bold leading-tight">{item.duration || '立即'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-stone-100 to-stone-50 rounded-full opacity-50"></div>
                        <div className="pl-4 py-2 text-stone-700 leading-relaxed text-sm lg:text-base">
                            <RichText text={item.description || '此法术尚无咒文描述'} />
                        </div>
                    </div>

                    {/* Tags / Classes */}
                    {item.classes && item.classes.length > 0 && (
                        <div className="pt-6 border-t border-stone-100 flex flex-wrap gap-2 items-center">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            {item.classes.map(cls => (
                                <span key={cls} className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100 shadow-sm">
                                    {cls}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};
