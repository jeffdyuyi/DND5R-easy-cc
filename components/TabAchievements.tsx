import React from 'react';
import { CharacterData } from '../types';
import { Trophy, Calendar } from 'lucide-react';

interface Props {
    character: CharacterData;
}

export const TabAchievements: React.FC<Props> = ({ character }) => {
    const achievements = character.achievements || [];

    if (achievements.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 p-8 pt-20">
                <Trophy className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-bold text-lg mb-2">暂未获得成就</p>
                <p className="text-sm">当您在战役中完成壮举时，主持人(GM)可能会为您颁发专属成就卡。</p>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6 bg-stone-100 min-h-full font-sans text-stone-900">
            <h2 className="text-2xl font-bold font-serif text-stone-800 flex items-center gap-2 mb-6 border-b-2 border-stone-200 pb-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                成就集 (Achievements)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {achievements.map((ach) => (
                    <div key={ach.id} className="relative group rounded-xl overflow-hidden shadow-xl border border-stone-800 bg-stone-900 aspect-[3/4] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-yellow-900/20 hover:shadow-2xl">
                        <img
                            src={ach.imageDataUrl}
                            alt="成就卡"
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-black/70 text-stone-300 text-xs px-2.5 py-1 rounded-md backdrop-blur-md border border-stone-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-yellow-500" />
                            {ach.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
