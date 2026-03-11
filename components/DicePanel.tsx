import React, { useState, useEffect, useRef } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { DiceRollPayload, ParseNode } from '../types/room';

export const DicePanel: React.FC = () => {
    const { role, hostRollDice, clientRollDice, diceHistory, clientRemoteCharacter } = useRoom();
    const [formula, setFormula] = useState('');
    const historyEndRef = useRef<HTMLDivElement>(null);
    const [isRolling, setIsRolling] = useState(false);

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [diceHistory]);

    // Parse simple formula like 2d6+1d4-3
    const parseAndRoll = (inputString: string): DiceRollPayload | null => {
        if (!inputString.trim()) return null;

        // Strip spaces
        let s = inputString.replace(/\s+/g, '');
        if (!s.match(/^[0-9dD+\-]/)) return null;

        // Make sure it starts with a sign to unify logic
        if (s[0] !== '+' && s[0] !== '-') s = '+' + s;

        // Match parts e.g. +2d6, -3
        const regex = /([+-])(?:(\d*)d(\d+)|(\d+))/gi;
        let match;
        const nodes: ParseNode[] = [];
        let grandTotal = 0;

        while ((match = regex.exec(s)) !== null) {
            const sign = match[1] as '+' | '-';
            const mult = sign === '+' ? 1 : -1;

            if (match[3]) {
                // It's a dice node (group 3 is dice size)
                const count = match[2] ? parseInt(match[2]) : 1;
                const diceType = 'd' + match[3];
                const sides = parseInt(match[3]);

                const results: number[] = [];
                let localSum = 0;
                for (let i = 0; i < count; i++) {
                    const r = Math.floor(Math.random() * sides) + 1;
                    results.push(r);
                    localSum += r;
                }
                grandTotal += (localSum * mult);

                nodes.push({
                    type: 'dice',
                    diceType,
                    count,
                    results,
                    value: localSum,
                    sign
                });
            } else if (match[4]) {
                // It's a constant
                const value = parseInt(match[4]);
                grandTotal += (value * mult);

                nodes.push({
                    type: 'constant',
                    value,
                    sign
                });
            }
        }

        if (nodes.length === 0) return null;

        const rollerName = role === 'host' ? 'GM (主持人)' : (clientRemoteCharacter?.name || '未知玩家');

        return {
            formula: inputString,
            nodes,
            total: grandTotal,
            rollerName
        };
    };

    const handleRollClick = () => {
        if (!formula.trim() || isRolling) return;
        setIsRolling(true);

        setTimeout(() => {
            const payload = parseAndRoll(formula);
            if (payload) {
                if (role === 'host') {
                    hostRollDice(payload);
                } else {
                    clientRollDice(payload);
                }
                setFormula('');
            } else {
                alert('无效的骰子公式，例如: 1d20+5, 2d6');
            }
            setIsRolling(false);
        }, 300);
    };

    const handlePredefined = (die: string) => {
        setFormula(prev => {
            if (!prev) return '1' + die;
            if (prev.endsWith('+') || prev.endsWith('-')) return prev + '1' + die;
            return prev + '+' + '1' + die;
        });
    };

    return (
        <div className="flex flex-col h-full bg-stone-100 border-l border-stone-200">
            <div className="bg-stone-800 text-stone-100 p-3 font-bold text-sm tracking-wider uppercase border-b border-stone-900 shadow text-center">
                公屏日志
            </div>

            {/* History Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {diceHistory.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-stone-400 text-sm text-center">
                        <span className="opacity-50">暂无骰子记录<br />在下方输入或点击常驻面板</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {[...diceHistory].reverse().map((roll, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-stone-200">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="font-bold text-stone-800 text-sm">{roll.rollerName}</span>
                                </div>

                                <div className="text-xl font-bold mb-1 flex items-center justify-center py-2 bg-stone-50 rounded text-stone-900 border border-stone-100">
                                    <span className="text-dndRed text-3xl mr-2">{roll.total}</span> <span className="text-stone-400 text-xs font-mono ml-auto mr-2">{roll.formula}</span>
                                </div>

                                {/* Detail Breakdown */}
                                {roll.nodes && roll.nodes.length > 0 && (
                                    <div className="flex flex-wrap gap-1 text-xs items-center justify-center text-stone-600 mt-2">
                                        {roll.nodes.map((n, i) => (
                                            <React.Fragment key={i}>
                                                {i > 0 && <span className="font-bold text-stone-400 mx-1">{n.sign}</span>}
                                                {i === 0 && n.sign === '-' && <span className="font-bold text-stone-400 mx-1">-</span>}

                                                {n.type === 'dice' ? (
                                                    <span className="bg-stone-200 px-1.5 py-0.5 rounded flex items-center gap-1 border border-stone-300">
                                                        <span className="font-bold">[{n.results?.join(', ')}]</span>{n.diceType}
                                                    </span>
                                                ) : (
                                                    <span className="font-bold bg-stone-100 px-1.5 py-0.5 rounded border border-stone-300">{n.value}</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={historyEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar">
                    {['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map(d => (
                        <button
                            key={d}
                            onClick={() => handlePredefined(d)}
                            className="bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3 py-1.5 rounded font-bold text-stone-700 text-xs transition-colors whitespace-nowrap"
                        >
                            +{d}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={formula}
                        onChange={e => setFormula(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleRollClick()}
                        placeholder="公式(如 1d20+3)"
                        className="flex-1 border border-stone-300 p-2.5 rounded focus:outline-none focus:border-stone-500 font-bold bg-stone-50 font-mono text-sm"
                    />
                    <button
                        onClick={handleRollClick}
                        disabled={isRolling || !formula.trim()}
                        className={`px-4 py-2.5 rounded font-bold transition-colors whitespace-nowrap
                            ${isRolling || !formula.trim() ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-stone-800 hover:bg-stone-900 text-white shadow'}`}
                    >
                        {isRolling ? '...' : '投掷'}
                    </button>
                </div>
            </div>
        </div>
    );
};
