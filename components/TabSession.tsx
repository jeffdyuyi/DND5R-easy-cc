import React from 'react';
import { CharacterData } from '../types';
import {
    Heart, Plus, Minus, Skull, Zap,
    RefreshCcw, ShieldAlert, Activity, Coffee
} from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
}

const CONDITIONS = [
    "目盲", "魅惑", "耳聋", "力竭", "恐慌",
    "受擒", "失能", "隐形", "麻痹", "石化",
    "倒地", "中毒", "束缚", "震慑", "昏迷"
];

const TabSession: React.FC<Props> = ({ character, updateCharacter }) => {
    // Use session data or initialize if missing (should be there via INITIAL_CHARACTER)
    const session = character.session || {
        hp: character.currentHp,
        tempHp: character.tempHp,
        hitDice: character.hitDiceCurrent,
        deathSaves: { success: 0, failure: 0 },
        conditions: [],
        exhaustion: 0,
        customResources: {}
    };

    const updateSession = (updates: any) => {
        updateCharacter({
            session: { ...session, ...updates }
        });
    };

    const adjustHp = (amount: number) => {
        updateSession({ hp: Math.min(character.hpMax, Math.max(0, session.hp + amount)) });
    };

    const adjustTempHp = (amount: number) => {
        updateSession({ tempHp: Math.max(0, session.tempHp + amount) });
    };

    const toggleCondition = (condition: string) => {
        const newConditions = session.conditions.includes(condition)
            ? session.conditions.filter(c => c !== condition)
            : [...session.conditions, condition];
        updateSession({ conditions: newConditions });
    };

    const setDeathSave = (type: 'success' | 'failure', index: number) => {
        const current = session.deathSaves[type];
        const newValue = index + 1 === current ? index : index + 1;
        updateSession({
            deathSaves: { ...session.deathSaves, [type]: newValue }
        });
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* HP Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-red-800 font-black flex items-center gap-2">
                            <Heart className="w-5 h-5 fill-red-500 text-red-500" /> 当前生命值
                        </h3>
                        <span className="text-red-400 text-sm font-bold">上限: {character.hpMax}</span>
                    </div>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <button
                            onClick={() => adjustHp(-1)}
                            className="w-12 h-12 rounded-full bg-white border-2 border-red-300 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm"
                        >
                            <Minus className="text-red-600" />
                        </button>
                        <div className="text-center">
                            <div className="text-5xl font-black text-red-700 leading-none">{session.hp}</div>
                            <div className="text-xs text-red-400 font-bold mt-1 uppercase tracking-widest">Points</div>
                        </div>
                        <button
                            onClick={() => adjustHp(1)}
                            className="w-12 h-12 rounded-full bg-white border-2 border-red-300 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm"
                        >
                            <Plus className="text-red-600" />
                        </button>
                    </div>

                    <div className="bg-red-200/30 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-red-500 h-full transition-all duration-300"
                            style={{ width: `${(session.hp / character.hpMax) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-amber-800 font-black flex items-center gap-2">
                            <Zap className="w-5 h-5 fill-amber-500 text-amber-500" /> 临时生命值
                        </h3>
                    </div>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <button
                            onClick={() => adjustTempHp(-1)}
                            className="w-12 h-12 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center hover:bg-amber-100 transition-colors shadow-sm"
                        >
                            <Minus className="text-amber-600" />
                        </button>
                        <div className="text-center">
                            <div className="text-5xl font-black text-amber-700 leading-none">{session.tempHp}</div>
                            <div className="text-xs text-amber-400 font-bold mt-1 uppercase tracking-widest">Buffer</div>
                        </div>
                        <button
                            onClick={() => adjustTempHp(1)}
                            className="w-12 h-12 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center hover:bg-amber-100 transition-colors shadow-sm"
                        >
                            <Plus className="text-amber-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Death Saves & Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-stone-900 text-white p-6 rounded-2xl border-2 border-stone-800 shadow-xl">
                    <h3 className="text-stone-400 font-black flex items-center gap-2 mb-6 uppercase tracking-wider text-sm">
                        <Skull className="w-5 h-5 text-stone-500" /> 死亡豁免 (Death Saves)
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <div className="text-xs font-bold text-green-500 uppercase mb-2">成功 (Successes)</div>
                            <div className="flex gap-4">
                                {[0, 1, 2].map(i => (
                                    <button
                                        key={i}
                                        onClick={() => setDeathSave('success', i)}
                                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${i < session.deathSaves.success ? 'bg-green-600 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-stone-800 border-stone-700'}`}
                                    >
                                        <Activity className={`w-5 h-5 ${i < session.deathSaves.success ? 'text-white' : 'text-stone-600'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold text-red-500 uppercase mb-2">失败 (Failures)</div>
                            <div className="flex gap-4">
                                {[0, 1, 2].map(i => (
                                    <button
                                        key={i}
                                        onClick={() => setDeathSave('failure', i)}
                                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${i < session.deathSaves.failure ? 'bg-red-600 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-stone-800 border-stone-700'}`}
                                    >
                                        <Skull className={`w-5 h-5 ${i < session.deathSaves.failure ? 'text-white' : 'text-stone-600'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-800">
                        <button
                            onClick={() => updateSession({ deathSaves: { success: 0, failure: 0 } })}
                            className="text-xs text-stone-500 hover:text-white flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                        >
                            <RefreshCcw className="w-3 h-3" /> 重置豁免
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border-2 border-stone-200 shadow-sm">
                    <h3 className="text-stone-800 font-black flex items-center gap-2 mb-4">
                        <ShieldAlert className="w-5 h-5 text-purple-600" /> 状态效果 (Conditions)
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {CONDITIONS.map(c => (
                            <button
                                key={c}
                                onClick={() => toggleCondition(c)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 ${session.conditions.includes(c)
                                    ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                                    : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-purple-200'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-100">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-stone-700 flex items-center gap-2">
                                <Coffee className="w-4 h-4 text-stone-400" /> 力竭等级
                            </span>
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateSession({ exhaustion: Math.max(0, session.exhaustion - 1) })} className="p-1 hover:bg-stone-100 rounded"><Minus className="w-4 h-4" /></button>
                                <span className="font-black text-xl w-6 text-center">{session.exhaustion}</span>
                                <button onClick={() => updateSession({ exhaustion: Math.min(6, session.exhaustion + 1) })} className="p-1 hover:bg-stone-100 rounded"><Plus className="w-4 h-4" /></button>
                            </div>
                        </div>
                        {session.exhaustion > 0 && (
                            <div className="text-[10px] text-red-500 font-bold bg-red-50 p-2 rounded border border-red-100 animate-pulse">
                                {session.exhaustion === 6 ? "死亡" : `等级 ${session.exhaustion}：应用相应减益`}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TabSession;
