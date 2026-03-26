import { Book } from 'lucide-react';
import { FeatItem } from '../../types';
import { DetailContainer, DetailFooter } from './DetailContainer';
import { RichText } from '../RichText';

export const FeatDetailView: React.FC<{ item: FeatItem }> = ({ item }) => {
    if (!item) return <div className="p-8 text-stone-400 italic">未选择专长数据</div>;

    return (
        <DetailContainer
            fluid
            title={item.name}
            subtitle={`专长 / ${item.category || '通用专长'}`}
            icon={<Book className="w-10 h-10 text-white" />}
            headerColor="bg-purple-900"
            accentColor="border-purple-900"
            bodyContent={
                <div className="space-y-12">
                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-4 uppercase tracking-tighter">
                            专长描述
                        </h3>
                        <div className="text-stone-700 leading-relaxed text-lg">
                            <RichText text={item.description || '暂无描述'} />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-black text-stone-800 border-b-2 border-stone-200 pb-2 mb-6 uppercase tracking-tighter">
                            获得利益 (Benefits)
                        </h3>
                        <div className="space-y-4">
                            {item.benefits?.length > 0 ? (
                                <ul className="space-y-4">
                                    {item.benefits.map((b, i) => (
                                        <li key={i} className="bg-stone-50 border-2 border-stone-200 rounded-xl p-4 flex gap-4 animate-fade-in group hover:border-purple-300 transition-colors">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black">{i + 1}</span>
                                            <div className="text-stone-700 font-medium leading-relaxed">
                                                <RichText text={b} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-stone-400 italic">该专长暂无具体利益记录</div>
                            )}
                        </div>
                    </section>

                    {item.tags && item.tags.length > 0 && (
                        <section className="flex flex-wrap gap-2 pt-8 border-t border-stone-100">
                            {item.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-500 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </section>
                    )}
                </div>
            }
            footer={<DetailFooter source={item.source || '原创'} />}
        />
    );
};
