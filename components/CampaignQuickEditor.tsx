import React, { useState } from 'react';
import { CharacterData, ItemItem } from '../types';
import { Heart, Landmark, Plus, Minus, PackagePlus } from 'lucide-react';

interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => void;
    onComplete: () => void;
}

export const CampaignQuickEditor: React.FC<Props> = ({ character, updateCharacter, onComplete }) => {
    // Current HP State
    const [hpChange, setHpChange] = useState<number>(0);

    // Coins State
    const [cp, setCp] = useState<number>(character.copper || 0);
    const [sp, setSp] = useState<number>(character.silver || 0);
    const [gp, setGp] = useState<number>(character.gold || 0);
    const [pp, setPp] = useState<number>(character.platinum || 0);

    // Simple item form
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(1);

    const applyHpChange = (amount: number) => {
        let newHp = Math.min(character.hpMax, Math.max(0, character.currentHp + amount));
        updateCharacter({ currentHp: newHp });
    };

    const saveCoins = () => {
        updateCharacter({ copper: cp, silver: sp, gold: gp, platinum: pp });
        alert('金额已更新');
    };

    const addSimpleItem = () => {
        if (!newItemName.trim()) return;

        const newItem: ItemItem = {
            id: 'custom-' + Date.now(),
            name: newItemName.trim(),
            quantity: newItemQuantity,
            source: '第三方/原创',
            description: 'GM快速发放',
            type: '杂物',
            cost: '---',
            weight: '---'
        };

        const updatedGear = [...(character.inventoryGear || []), newItem];
        updateCharacter({ inventoryGear: updatedGear });

        setNewItemName('');
        setNewItemQuantity(1);
        alert(`已添加 ${newItemQuantity} 个 ${newItem.name}`);
    };

    const hardResetHpMax = (newMax: number) => {
        updateCharacter({ hpMax: newMax, currentHp: Math.min(character.currentHp, newMax) });
    };

    return (
        <div className="flex flex-col h-full bg-stone-100 text-stone-900 font-sans p-6 overflow-y-auto">
            {/* Health Section */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2 border-b border-stone-100 pb-3 mb-4">
                    <Heart className="w-5 h-5 text-dndRed" /> 生命值 & 状态
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Current HP Adjust */}
                    <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-sm font-bold text-red-800 mb-2">当前生命值</div>
                        <div className="text-4xl font-bold font-serif mb-4 flex items-baseline">
                            <span className="text-red-700">{character.currentHp ?? character.hpMax}</span>
                            <span className="text-red-400 text-2xl mx-1">/</span>
                            <span className="text-red-400 text-2xl">{character.hpMax}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => applyHpChange(-1)} className="p-2 bg-red-200 hover:bg-red-300 rounded text-red-900"><Minus className="w-5 h-5" /></button>
                            <input
                                type="number"
                                value={hpChange || ''}
                                onChange={e => setHpChange(parseInt(e.target.value) || 0)}
                                className="w-20 text-center font-bold p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                                placeholder="数值"
                            />
                            <button onClick={() => applyHpChange(1)} className="p-2 bg-green-200 hover:bg-green-300 rounded text-green-900"><Plus className="w-5 h-5" /></button>
                        </div>
                        <div className="flex gap-2 mt-2 w-full max-w-[200px]">
                            <button onClick={() => { applyHpChange(-hpChange); setHpChange(0); }} className="flex-1 py-1.5 bg-red-600 text-white rounded font-bold text-sm shadow hover:bg-red-700">扣除 (-)</button>
                            <button onClick={() => { applyHpChange(hpChange); setHpChange(0); }} className="flex-1 py-1.5 bg-green-600 text-white rounded font-bold text-sm shadow hover:bg-green-700">恢复 (+)</button>
                        </div>
                    </div>

                    {/* Max HP & Temp */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-stone-600 mb-1 block">生命值上限 (例如受体质流失影响)</label>
                            <input
                                type="number"
                                value={character.hpMax}
                                onChange={e => hardResetHpMax(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full p-2 border border-stone-300 rounded font-bold focus:outline-none focus:border-stone-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-stone-600 mb-1 block">临时生命值 (Temp HP)</label>
                            <input
                                type="number"
                                value={character.tempHp || 0}
                                onChange={e => updateCharacter({ tempHp: Math.max(0, parseInt(e.target.value) || 0) })}
                                className="w-full p-2 border border-stone-300 rounded font-bold focus:outline-none focus:border-stone-500 bg-blue-50 text-blue-900"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Coins Section */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2 border-b border-stone-100 pb-3 mb-4">
                    <Landmark className="w-5 h-5 text-yellow-600" /> 财务快速派发
                </h3>

                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[100px]">
                        <label className="text-xs font-bold text-stone-500 block mb-1">铂币 (PP)</label>
                        <input type="number" value={pp} onChange={e => setPp(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded font-bold bg-slate-50" />
                    </div>
                    <div className="flex-1 min-w-[100px]">
                        <label className="text-xs font-bold text-stone-500 block mb-1">金币 (GP)</label>
                        <input type="number" value={gp} onChange={e => setGp(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded font-bold bg-yellow-50 text-yellow-900 border-yellow-200" />
                    </div>
                    <div className="flex-1 min-w-[100px]">
                        <label className="text-xs font-bold text-stone-500 block mb-1">银币 (SP)</label>
                        <input type="number" value={sp} onChange={e => setSp(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded font-bold bg-stone-50" />
                    </div>
                    <div className="flex-1 min-w-[100px]">
                        <label className="text-xs font-bold text-stone-500 block mb-1">铜币 (CP)</label>
                        <input type="number" value={cp} onChange={e => setCp(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded font-bold bg-orange-50 text-orange-900" />
                    </div>

                    <button onClick={saveCoins} className="px-4 py-2 bg-stone-800 text-white rounded font-bold hover:bg-stone-900 transition-colors shadow">
                        应用金额
                    </button>
                </div>
            </div>

            {/* Inventory Section */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <PackagePlus className="w-32 h-32" />
                </div>
                <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2 border-b border-stone-100 pb-3 mb-4 relative z-10">
                    <PackagePlus className="w-5 h-5 text-stone-600" /> 物品快递 (直接塞入背包)
                </h3>

                <div className="flex gap-4 relative z-10 items-end">
                    <div className="flex-[3]">
                        <label className="text-xs font-bold text-stone-500 block mb-1">物品名称</label>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={e => setNewItemName(e.target.value)}
                            placeholder="例如：治疗药水，或一封密信..."
                            className="w-full p-2 border border-stone-300 rounded font-bold focus:outline-none focus:border-stone-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs font-bold text-stone-500 block mb-1">数量</label>
                        <input
                            type="number"
                            min="1"
                            value={newItemQuantity}
                            onChange={e => setNewItemQuantity(parseInt(e.target.value) || 1)}
                            className="w-full p-2 border border-stone-300 rounded font-bold focus:outline-none focus:border-stone-500"
                        />
                    </div>
                    <button
                        onClick={addSimpleItem}
                        disabled={!newItemName.trim()}
                        className="px-6 py-2 bg-dndRed text-white font-bold rounded shadow hover:bg-red-800 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
                    >
                        发放包裹
                    </button>
                </div>
            </div>

            <div className="mt-auto pt-6 flex justify-end">
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-stone-200 text-stone-800 font-bold rounded-lg hover:bg-stone-300 transition-colors"
                >
                    完成编辑并关闭
                </button>
            </div>
        </div>
    );
};
