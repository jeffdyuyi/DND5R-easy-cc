
import React, { useState } from 'react';
import { CharacterData, AbilityScores } from '../types';
import { Activity, Dices, List, Edit3, RotateCcw } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const ABILITY_NAMES: Record<keyof AbilityScores, string> = {
  strength: "力量", dexterity: "敏捷", constitution: "体质",
  intelligence: "智力", wisdom: "感知", charisma: "魅力"
};

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

const StepAbilities: React.FC<Props> = ({ character, updateCharacter }) => {
  const [mode, setMode] = useState<'manual' | 'standard' | 'random'>('standard');
  const [randomRolls, setRandomRolls] = useState<number[]>([]);

  const handleAbilityChange = (ability: keyof AbilityScores, value: number) => {
    updateCharacter({
      abilities: {
        ...character.abilities,
        [ability]: value
      }
    });
  };

  const getModifier = (score: number) => Math.floor((score - 10) / 2);

  // Roll 4d6 drop lowest
  const rollStats = () => {
    const newRolls = Array(6).fill(0).map(() => {
      const rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
      rolls.sort((a, b) => a - b);
      return rolls.slice(1).reduce((a, b) => a + b, 0);
    });
    newRolls.sort((a, b) => b - a);
    setRandomRolls(newRolls);
    // Reset stats to empty-ish or keeping existing? Resetting is safer to force assignment
    updateCharacter({
      abilities: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 }
    });
  };

  // Helper to get available values for a specific ability slot
  const getAvailableOptions = (currentAbility: keyof AbilityScores) => {
    const pool = mode === 'standard' ? STANDARD_ARRAY : randomRolls;
    if (pool.length === 0) return [];

    // Count occurrences in pool
    const poolCounts = pool.reduce((acc, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {} as Record<number, number>);

    // Decrease counts by currently assigned values (excluding self)
    Object.entries(character.abilities).forEach(([key, val]) => {
      if (key !== currentAbility && val > 0) { // Assuming 0 is "unassigned"
        if (poolCounts[val] > 0) {
          poolCounts[val]--;
        }
      }
    });

    // Return unique values that have count > 0, plus the current value
    const available = Object.keys(poolCounts).map(Number).filter(v => poolCounts[v] > 0);
    if (character.abilities[currentAbility] > 0 && !available.includes(character.abilities[currentAbility])) {
      available.push(character.abilities[currentAbility]);
    }
    return available.sort((a, b) => b - a);
  };

  return (
    <div className="space-y-6 pb-12">
      <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
        第四步：确定属性值 (Abilities)
      </h2>

      {/* Mode Switcher */}
      <div className="flex gap-2 bg-stone-100 p-1 rounded-lg w-fit mx-auto border border-stone-300">
        <button
          onClick={() => setMode('standard')}
          className={`px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all ${mode === 'standard' ? 'bg-white shadow text-dndRed' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <List className="w-4 h-4" /> 标准数组
        </button>
        <button
          onClick={() => setMode('random')}
          className={`px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all ${mode === 'random' ? 'bg-white shadow text-dndRed' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <Dices className="w-4 h-4" /> 随机骰点
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all ${mode === 'manual' ? 'bg-white shadow text-dndRed' : 'text-stone-500 hover:text-stone-700'}`}
        >
          <Edit3 className="w-4 h-4" /> 手动输入
        </button>
      </div>

      {/* Mode Specific Controls */}
      {mode === 'standard' && (
        <div className="bg-blue-50 p-4 rounded text-center text-sm text-blue-800 border border-blue-200">
          <strong>标准数组：</strong> 固定数值 [15, 14, 13, 12, 10, 8]。请为每一项属性分配一个数值。
        </div>
      )}

      {mode === 'random' && (
        <div className="bg-purple-50 p-6 rounded border border-purple-200 text-center">
          {randomRolls.length === 0 ? (
            <div className="text-center">
              <p className="text-purple-800 mb-4 font-bold">使用 4d6 去掉最低值规则生成 6 个数值。</p>
              <button onClick={rollStats} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 mx-auto">
                <Dices className="w-5 h-5" /> 开始投掷
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center gap-4 mb-4">
                {randomRolls.map((r, i) => (
                  <div key={i} className="text-xl font-black text-purple-900 bg-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-purple-300 shadow-sm">
                    {r}
                  </div>
                ))}
              </div>
              <button onClick={rollStats} className="text-purple-600 underline text-xs font-bold flex items-center justify-center gap-1 mx-auto hover:text-purple-800">
                <RotateCcw className="w-3 h-3" /> 重投
              </button>
              <p className="text-xs text-purple-600 mt-2">请在下方将这些数值分配给对应的属性。</p>
            </div>
          )}
        </div>
      )}

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {(Object.keys(ABILITY_NAMES) as Array<keyof AbilityScores>).map((key) => {
          const val = character.abilities[key];
          const mod = getModifier(val);
          const total = val + (character.backgroundBonuses?.[key] || 0) + (character.abilityBonuses?.[key] || 0); // Total with bonuses
          const totalMod = getModifier(total);

          return (
            <div key={key} className="bg-white p-3 rounded-lg border-2 border-stone-200 shadow-sm relative group hover:border-dndRed transition-colors">
              <label className="block text-stone-500 font-bold text-xs uppercase text-center mb-2 tracking-wider">{ABILITY_NAMES[key]}</label>

              {mode === 'manual' ? (
                <input
                  type="number"
                  value={val}
                  onChange={e => handleAbilityChange(key, parseInt(e.target.value) || 0)}
                  className="w-full text-center text-3xl font-black text-stone-800 focus:outline-none border-b-2 border-dashed border-stone-300 focus:border-dndRed bg-transparent"
                />
              ) : (
                <select
                  value={val}
                  onChange={e => handleAbilityChange(key, parseInt(e.target.value))}
                  className="w-full text-center text-2xl font-black text-stone-800 focus:outline-none bg-transparent appearance-none cursor-pointer py-1"
                  disabled={mode === 'random' && randomRolls.length === 0}
                >
                  <option value={0}>-</option>
                  {getAvailableOptions(key).map((opt, i) => (
                    <option key={`${opt}-${i}`} value={opt}>{opt}</option>
                  ))}
                </select>
              )}

              <div className="mt-3 text-center border-t border-stone-100 pt-2">
                <div className={`text-lg font-bold ${totalMod > 0 ? 'text-green-600' : totalMod < 0 ? 'text-red-500' : 'text-stone-400'}`}>
                  {totalMod >= 0 ? '+' : ''}{totalMod}
                </div>
                <div className="text-[10px] text-stone-400">总值: {total}</div>
              </div>

              {/* Bonus Indicator */}
              {(character.backgroundBonuses?.[key] || 0) > 0 && (
                <div className="absolute top-1 right-1 bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 rounded-full border border-amber-200">
                  +{character.backgroundBonuses[key]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total Summary */}
      <div className="mt-4 text-center text-xs text-stone-500">
        * 属性调整值已包含种族/背景带来的加成（右上角角标所示）
      </div>
    </div>
  );
};

export default StepAbilities;