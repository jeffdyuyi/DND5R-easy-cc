import React from 'react';
import { Crown, Eye, Move } from 'lucide-react';
import { SpeciesItem } from '../../types';
import { DetailContainer, MiniStatCard, FeatureCard, DetailFooter } from './DetailContainer';
import { RichText } from '../RichText';

export const SpeciesDetailView: React.FC<{ item: SpeciesItem }> = ({ item }) => {
    if (!item) return <div className="p-8 text-stone-400 italic">未选择种族数据</div>;

    return (
        <DetailContainer
            fluid
            title={item.name}
            subtitle={`种族 / ${item.size || '中型'} 体型 / ${item.speed || 30} 尺 速度`}
            icon={<Crown className="w-10 h-10 text-white" />}
            headerColor="bg-green-900"
            accentColor="border-green-900"
            bodyContent={
                <div className="space-y-12">
                    <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <MiniStatCard label="体型" value={item.size || '中型'} icon={<Shield className="w-4 h-4 text-stone-400" />} />
                        <MiniStatCard label="速度" value={`${item.speed || 30} 尺`} icon={<Move className="w-4 h-4 text-stone-400" />} />
                        <MiniStatCard label="黑暗视觉" value={item.darkvision || '无'} icon={<Eye className="w-4 h-4 text-stone-400" />} />
                    </section>

                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-4 uppercase tracking-tighter">
                            种族描述
                        </h3>
                        <div className="text-stone-700 leading-relaxed text-lg">
                            <RichText text={item.description || '暂无描述'} />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-6 uppercase tracking-tighter">
                            种族特质
                        </h3>
                        <div className="space-y-4">
                            {item.traits?.length > 0 ? (
                                item.traits.map((t, i) => (
                                    <FeatureCard key={i} title={t.name} description={t.description} themeColor="green" />
                                ))
                            ) : (
                                <div className="text-stone-400 italic">该种族暂无特质记录</div>
                            )}
                        </div>
                    </section>
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};

// Placeholder Shield icon from Lucide if needed, using custom imports
import { Shield } from 'lucide-react';
