import React, { useState, useEffect, useRef } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { Dices, X } from 'lucide-react';

export const DiceRoller: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { role, hostRollDice, clientRollDice, diceHistory, clientRemoteCharacter } = useRoom();
    const [diceType, setDiceType] = useState<'d4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'>('d20');
    const [count, setCount] = useState(1);
    const [isRolling, setIsRolling] = useState(false);

    const historyEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [diceHistory]);

    const handleRoll = () => {
        setIsRolling(true);
        setTimeout(() => {
            const results = [];
            let total = 0;
            const max = parseInt(diceType.substring(1));

            for (let i = 0; i < count; i++) {
                const res = Math.floor(Math.random() * max) + 1;
                results.push(res);
                total += res;
            }

            const rollerName = role === 'host' ? 'GM (主持人)' : (clientRemoteCharacter?.name || '玩家');

            const payload = {
                diceType,
                count,
                results,
                total,
                rollerName
            };

            if (role === 'host') {
                hostRollDice(payload);
            } else {
                clientRollDice(payload);
            }
            setIsRolling(false);
        }, 600); // UI fake animation delay
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50 rounded-t-xl">
                    <h3 className="font-bold text-stone-800 flex items-center gap-2">
                        <Dices className="w-5 h-5" />
                        掷骰器
                    </h3>
                    <button onClick={onClose} className="text-stone-500 hover:text-stone-800">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 flex-1 overflow-y-auto bg-stone-100 min-h-[50vh]">
                    {diceHistory.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-stone-400 text-sm">
                            暂无掷骰历史
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {/* We show history chronologically reversed or normal? The state stores latest at index 0. Let's reverse it to show old to new if we scroll down. */}
                            {[...diceHistory].reverse().map((roll, idx) => (
                                <div key={idx} className="bg-white p-3 rounded shadow-sm border border-stone-200">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="font-bold text-stone-700 text-sm">{roll.rollerName}</span>
                                        <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                                            {roll.count}{roll.diceType}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 items-center flex-wrap">
                                        {roll.results.map((res, i) => (
                                            <div key={i} className="w-8 h-8 flex items-center justify-center bg-stone-800 text-white font-bold rounded shadow-inner">
                                                {res}
                                            </div>
                                        ))}
                                        <div className="ml-auto font-bold text-lg text-dndRed">
                                            = {roll.total}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={historyEndRef} />
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-stone-200 rounded-b-xl">
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
                        {['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map(d => (
                            <button
                                key={d}
                                onClick={() => setDiceType(d as any)}
                                className={`px-4 py-2 rounded font-bold border flex-shrink-0 transition-colors ${diceType === d
                                    ? 'bg-dndRed text-white border-red-800'
                                    : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-stone-500 mb-1 tracking-wider uppercase">数量</label>
                            <input
                                type="number"
                                min="1" max="20"
                                value={count}
                                onChange={e => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                                className="w-full p-2 border border-stone-300 rounded font-bold text-center focus:outline-none focus:border-stone-500 bg-stone-50"
                            />
                        </div>
                        <button
                            onClick={handleRoll}
                            disabled={isRolling}
                            className={`flex-[3] py-2 rounded-lg font-bold text-white shadow flex justify-center items-center gap-2 transition-all border border-stone-800
                                ${isRolling ? 'bg-stone-600 scale-95' : 'bg-stone-800 hover:bg-stone-900 active:scale-95'}`}
                        >
                            {isRolling ? '🎲 投掷中...' : `🎲 掷 ${count}${diceType}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
