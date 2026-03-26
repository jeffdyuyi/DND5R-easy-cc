import React from 'react';
import { Shield, Star, Heart, Swords, FileText } from 'lucide-react';
import { ClassItem, SubclassItem } from '../../types';
import { DetailContainer, MiniStatCard, FeatureCard, DetailFooter } from './DetailContainer';
import { RichText } from '../RichText';

import { ClassFeatureTable } from '../ClassFeatureTable';

export const ClassDetailView: React.FC<{ item: ClassItem; level?: number }> = ({ item, level }) => {
    // Defensive check
    if (!item) return <div className="p-8 text-stone-400 italic">未选择职业数据</div>;

    const visibleFeatures = level
        ? item.features.filter(f => f.level <= level).sort((a, b) => a.level - b.level)
        : item.features.sort((a, b) => a.level - b.level);

    return (
        <DetailContainer
            fluid
            title={item.name}
            subtitle={`职业 / ${item.hitDie} 生命骰 / ${item.primaryAbility} 主属性`}
            icon={<Shield className="w-10 h-10 text-white" />}
            headerColor="bg-red-900"
            accentColor="border-red-900"
            bodyContent={
                <div className="space-y-12 animate-fade-in">
                    {/* Summary / Stats Grid */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MiniStatCard label="生命骰" value={item.hitDie || 'd8'} icon={<Heart className="w-4 h-4" />} />
                        <MiniStatCard label="主属性" value={item.primaryAbility || '待定'} icon={<Star className="w-4 h-4" />} />
                        <MiniStatCard label="豁免项" value={item.saves?.join(' / ') || '无'} icon={<Shield className="w-4 h-4" />} />
                        <MiniStatCard label="熟练数" value={item.coreTraits?.skillProficiencies?.split('，')?.length.toString() || '0'} icon={<FileText className="w-4 h-4" />} />
                    </section>

                    {/* Progress Table */}
                    {item.classTable && (
                        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-1">
                            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2 px-3 pt-2">职业进度表</h3>
                            <ClassFeatureTable data={item.classTable} />
                        </section>
                    )}

                    {/* Description */}
                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-4 uppercase tracking-tighter">
                            职业概述
                        </h3>
                        <div className="text-stone-700 leading-relaxed text-lg">
                            <RichText text={item.description || '暂无描述'} />
                        </div>
                    </section>

                    {/* Proficiencies Table */}
                    <section className="bg-stone-50 rounded-2xl p-6 border-2 border-stone-200">
                        <h3 className="text-xl font-black text-stone-800 mb-6 flex items-center gap-2">
                            <Swords className="w-6 h-6 text-red-700" /> 职业熟练项
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                <span className="font-bold text-stone-500">护甲</span>
                                <span className="text-stone-800 font-medium">{item.coreTraits?.armorTraining || '无'}</span>
                            </div>
                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                <span className="font-bold text-stone-500">武器</span>
                                <span className="text-stone-800 font-medium">{item.coreTraits?.weaponProficiencies || '无'}</span>
                            </div>
                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                <span className="font-bold text-stone-500">技能</span>
                                <span className="text-stone-800 font-medium">{item.coreTraits?.skillProficiencies || '无'}</span>
                            </div>
                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                <span className="font-bold text-stone-500">工具</span>
                                <span className="text-stone-800 font-medium">无</span>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-6 uppercase tracking-tighter">
                            职业特性 {level ? `(至等级 ${level})` : ''}
                        </h3>
                        <div className="space-y-4">
                            {visibleFeatures?.length > 0 ? (
                                visibleFeatures.map((f, i) => (
                                    <FeatureCard key={i} title={f.name} level={f.level} description={f.description} themeColor="red" />
                                ))
                            ) : (
                                <div className="text-stone-400 italic">该等级下暂无特性记录</div>
                            )}
                        </div>
                    </section>
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};

export const SubclassDetailView: React.FC<{ item: SubclassItem }> = ({ item }) => {
    if (!item) return <div className="p-8 text-stone-400 italic">未选择子职业数据</div>;

    return (
        <DetailContainer
            fluid
            title={item.name}
            subtitle={`子职业 / ${item.parentClass || '未知职业'} 范型`}
            icon={<Star className="w-10 h-10 text-white" />}
            headerColor="bg-orange-800"
            accentColor="border-orange-800"
            bodyContent={
                <div className="space-y-12">
                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-4 uppercase tracking-tighter">
                            范型简介
                        </h3>
                        <div className="text-stone-700 leading-relaxed text-lg">
                            <RichText text={item.description || '暂无描述'} />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-6 uppercase tracking-tighter">
                            范型特性
                        </h3>
                        <div className="space-y-4">
                            {item.features?.length > 0 ? (
                                item.features.map((f, i) => (
                                    <FeatureCard key={i} title={f.name} level={f.level} description={f.description} themeColor="orange" />
                                ))
                            ) : (
                                <div className="text-stone-400 italic">该子职业暂无特性记录</div>
                            )}
                        </div>
                    </section>
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};
