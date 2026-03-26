import React from 'react';
import { Scroll, Zap, Briefcase, FileText, Info } from 'lucide-react';
import { BackgroundItem, FeatItem } from '../../types';
import { DetailContainer, MiniStatCard, DetailFooter } from './DetailContainer';
import { RichText } from '../RichText';

const renderProficiency = (data: any) => {
    if (!data) return '无';
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) {
        return data.map(item => typeof item === 'object' ? (item.name || JSON.stringify(item)) : item).join(' / ');
    }
    if (typeof data === 'object') return data.name || JSON.stringify(data);
    return String(data);
};

export const BackgroundDetailView: React.FC<{ item: BackgroundItem; libraryFeats?: FeatItem[] }> = ({ item, libraryFeats = [] }) => {
    if (!item) return <div className="p-8 text-stone-400 italic">未选择背景数据</div>;

    const backgroundFeat = libraryFeats.find(f => f.name === item.feat);

    return (
        <DetailContainer
            fluid
            title={item.name}
            subtitle={`背景 / 起源故事 / ${item.abilityScores?.join(' / ') || '属性加成'}`}
            icon={<Scroll className="w-10 h-10 text-white" />}
            headerColor="bg-yellow-800"
            accentColor="border-yellow-800"
            bodyContent={
                <div className="space-y-12">
                    {/* Summary */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MiniStatCard label="属性加成" value={renderProficiency(item.abilityScores)} icon={<Zap className="w-4 h-4 text-stone-400" />} />
                        <MiniStatCard label="起源专长" value={item.feat || '无'} icon={<FileText className="w-4 h-4 text-stone-400" />} />
                        <MiniStatCard label="技能熟练" value={renderProficiency(item.skills)} icon={<Briefcase className="w-4 h-4 text-stone-400" />} />
                        <MiniStatCard label="工具熟练" value={renderProficiency(item.tool)} icon={<Briefcase className="w-4 h-4 text-stone-400" />} />
                    </section>

                    {/* Description */}
                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-4 uppercase tracking-tighter">
                            背景经历
                        </h3>
                        <div className="text-stone-700 leading-relaxed text-lg italic">
                            <RichText text={item.description || '在此描述您的角色背景...'} />
                        </div>
                    </section>

                    {/* Feat & Equipment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                            <h4 className="font-black text-stone-800 mb-3 flex items-center gap-2">
                                <Info className="w-5 h-5 text-yellow-600" /> 起源专长详情
                            </h4>
                            {backgroundFeat ? (
                                <div>
                                    <div className="font-bold text-stone-900 border-b border-stone-200 pb-1 mb-2">{backgroundFeat.name}</div>
                                    <div className="text-xs text-stone-600">
                                        <RichText text={backgroundFeat.description || '暂无详细描述'} />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-stone-400">选择该背景将获得【{item.feat}】专长。</div>
                            )}
                        </section>

                        <section className="bg-stone-50 p-6 rounded-2xl border-2 border-stone-200">
                            <h4 className="font-black text-stone-800 mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-yellow-600" /> 起始装备
                            </h4>
                            <ul className="text-sm space-y-2 text-stone-700 font-medium">
                                {item.equipment?.length > 0 ? (
                                    item.equipment.map((eq, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-yellow-600">•</span>
                                            {eq}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-stone-400">暂无装备记录</li>
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};
