
import React, { useState, useMemo } from 'react';
import { CharacterData, AbilityScores } from '../types';
import WizardLayout from './wizard/WizardLayout';
import { Dices, List, Edit3, ShoppingCart, RotateCcw, Info, CheckCircle, Wand2 } from 'lucide-react';

// 职业推荐属性分配（标准数组 15,14,13,12,10,8 的推荐分配方式）
const CLASS_ABILITY_RECOMMENDATIONS: Record<string, (keyof AbilityScores)[]> = {
  "野蛮人": ["strength", "constitution", "dexterity", "wisdom", "charisma", "intelligence"],
  "吟游诗人": ["charisma", "dexterity", "constitution", "wisdom", "intelligence", "strength"],
  "牧师": ["wisdom", "constitution", "strength", "dexterity", "charisma", "intelligence"],
  "德鲁伊": ["wisdom", "constitution", "dexterity", "intelligence", "charisma", "strength"],
  "战士": ["strength", "constitution", "dexterity", "wisdom", "charisma", "intelligence"],
  "武僧": ["dexterity", "wisdom", "constitution", "strength", "charisma", "intelligence"],
  "圣武士": ["strength", "charisma", "constitution", "wisdom", "dexterity", "intelligence"],
  "游侠": ["dexterity", "wisdom", "constitution", "intelligence", "strength", "charisma"],
  "游荡者": ["dexterity", "constitution", "intelligence", "wisdom", "charisma", "strength"],
  "术士": ["charisma", "constitution", "dexterity", "wisdom", "intelligence", "strength"],
  "魔契师": ["charisma", "constitution", "dexterity", "wisdom", "intelligence", "strength"],
  "法师": ["intelligence", "constitution", "dexterity", "wisdom", "charisma", "strength"],
};

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const ABILITY_KEYS: (keyof AbilityScores)[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const ABILITY_LABELS: Record<keyof AbilityScores, { name: string; abbr: string }> = {
  strength: { name: "力量", abbr: "力量" },
  dexterity: { name: "敏捷", abbr: "敏捷" },
  constitution: { name: "体质", abbr: "体质" },
  intelligence: { name: "智力", abbr: "智力" },
  wisdom: { name: "感知", abbr: "感知" },
  charisma: { name: "魅力", abbr: "魅力" }
};

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

// Point Buy Cost Table
const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};
const POINT_BUY_TOTAL = 27;

const StepAbilities: React.FC<Props> = ({ character, updateCharacter }) => {
  const [mode, setMode] = useState<'standard' | 'pointbuy' | 'roll' | 'manual'>('standard');
  const [rolledValues, setRolledValues] = useState<number[]>([]);

  const getModifier = (score: number) => Math.floor((score - 10) / 2);

  // Roll 4d6 drop lowest
  const rollStats = () => {
    const newRolls = Array(6).fill(0).map(() => {
      const rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
      rolls.sort((a, b) => a - b);
      return rolls.slice(1).reduce((a, b) => a + b, 0);
    });
    newRolls.sort((a, b) => b - a);
    setRolledValues(newRolls);
    // Reset abilities
    updateCharacter({
      abilities: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 }
    });
  };

  // Get assigned values for standard array or roll mode
  const assignedValues = useMemo(() => {
    return ABILITY_KEYS.map(k => character.abilities[k]).filter(v => v > 0);
  }, [character.abilities]);

  // Get available values for a specific ability
  const getAvailableValues = (ability: keyof AbilityScores): number[] => {
    const pool = mode === 'standard' ? STANDARD_ARRAY : mode === 'roll' ? rolledValues : [];
    if (pool.length === 0) return [];

    const poolCounts = pool.reduce((acc, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {} as Record<number, number>);

    // Decrease counts by assigned values (excluding current ability)
    ABILITY_KEYS.forEach(k => {
      if (k !== ability && character.abilities[k] > 0) {
        const val = character.abilities[k];
        if (poolCounts[val]) poolCounts[val]--;
      }
    });

    return Object.keys(poolCounts).map(Number).filter(v => poolCounts[v] > 0).sort((a, b) => b - a);
  };

  // Set ability value
  const setAbilityValue = (ability: keyof AbilityScores, value: number) => {
    updateCharacter({
      abilities: { ...character.abilities, [ability]: value }
    });
  };

  // Point Buy calculations
  const pointBuySpent = useMemo(() => {
    if (mode !== 'pointbuy') return 0;
    return ABILITY_KEYS.reduce((sum, k) => sum + (POINT_BUY_COSTS[character.abilities[k]] || 0), 0);
  }, [character.abilities, mode]);

  const pointBuyRemaining = POINT_BUY_TOTAL - pointBuySpent;

  // Reset abilities
  const resetAbilities = () => {
    const defaultVal = mode === 'pointbuy' ? 8 : 0;
    updateCharacter({
      abilities: { strength: defaultVal, dexterity: defaultVal, constitution: defaultVal, intelligence: defaultVal, wisdom: defaultVal, charisma: defaultVal }
    });
  };

  // Left Panel: Mode selection and info
  const leftPanel = (
    <div className="p-4 space-y-4">
      {/* Mode Tabs */}
      <div className="space-y-2">
        <h3 className="font-bold text-stone-700 text-sm">生成方式</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { setMode('standard'); resetAbilities(); }}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${mode === 'standard' ? 'border-dndRed bg-red-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}
          >
            <List className={`w-5 h-5 ${mode === 'standard' ? 'text-dndRed' : 'text-stone-400'}`} />
            <div>
              <div className={`font-bold ${mode === 'standard' ? 'text-dndRed' : 'text-stone-700'}`}>标准数组</div>
              <div className="text-xs text-stone-500">使用固定值 [15, 14, 13, 12, 10, 8]</div>
            </div>
          </button>

          <button
            onClick={() => { setMode('pointbuy'); updateCharacter({ abilities: { strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8 } }); }}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${mode === 'pointbuy' ? 'border-dndRed bg-red-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}
          >
            <ShoppingCart className={`w-5 h-5 ${mode === 'pointbuy' ? 'text-dndRed' : 'text-stone-400'}`} />
            <div>
              <div className={`font-bold ${mode === 'pointbuy' ? 'text-dndRed' : 'text-stone-700'}`}>购点法</div>
              <div className="text-xs text-stone-500">27 点自由分配</div>
            </div>
          </button>

          <button
            onClick={() => { setMode('roll'); setRolledValues([]); resetAbilities(); }}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${mode === 'roll' ? 'border-dndRed bg-red-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}
          >
            <Dices className={`w-5 h-5 ${mode === 'roll' ? 'text-dndRed' : 'text-stone-400'}`} />
            <div>
              <div className={`font-bold ${mode === 'roll' ? 'text-dndRed' : 'text-stone-700'}`}>随机骰点</div>
              <div className="text-xs text-stone-500">4d6 去掉最低</div>
            </div>
          </button>

          <button
            onClick={() => { setMode('manual'); resetAbilities(); }}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${mode === 'manual' ? 'border-dndRed bg-red-50' : 'border-stone-200 bg-white hover:border-stone-300'}`}
          >
            <Edit3 className={`w-5 h-5 ${mode === 'manual' ? 'text-dndRed' : 'text-stone-400'}`} />
            <div>
              <div className={`font-bold ${mode === 'manual' ? 'text-dndRed' : 'text-stone-700'}`}>手动输入</div>
              <div className="text-xs text-stone-500">自定义数值</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mode-specific info */}
      {mode === 'standard' && (
        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-blue-800">
            <strong>标准数组</strong>：从固定数组 [15, 14, 13, 12, 10, 8] 中，为每项属性分配一个值。每个值只能使用一次。
          </div>

          {/* 职业推荐按钮 */}
          {character.className && CLASS_ABILITY_RECOMMENDATIONS[character.className] && (
            <button
              onClick={() => {
                const rec = CLASS_ABILITY_RECOMMENDATIONS[character.className];
                if (rec) {
                  const newAbilities: AbilityScores = {
                    strength: STANDARD_ARRAY[rec.indexOf('strength')],
                    dexterity: STANDARD_ARRAY[rec.indexOf('dexterity')],
                    constitution: STANDARD_ARRAY[rec.indexOf('constitution')],
                    intelligence: STANDARD_ARRAY[rec.indexOf('intelligence')],
                    wisdom: STANDARD_ARRAY[rec.indexOf('wisdom')],
                    charisma: STANDARD_ARRAY[rec.indexOf('charisma')],
                  };
                  updateCharacter({ abilities: newAbilities });
                }
              }}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-md transition-all"
            >
              <Wand2 className="w-5 h-5" />
              使用{character.className}职业推荐分配
            </button>
          )}
        </div>
      )}

      {mode === 'pointbuy' && (
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-purple-800">剩余点数</span>
            <span className={`text-xl font-black ${pointBuyRemaining < 0 ? 'text-red-600' : pointBuyRemaining === 0 ? 'text-green-600' : 'text-purple-600'}`}>
              {pointBuyRemaining}
            </span>
          </div>
          <div className="text-xs text-purple-600">
            所有属性从 8 开始。提升属性需要消耗点数：8→9 需 1点，9→10 需 1点，... 14→15 需 2点。
          </div>
        </div>
      )}

      {mode === 'roll' && (
        <div className="space-y-3">
          {rolledValues.length === 0 ? (
            <button onClick={rollStats} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
              <Dices className="w-5 h-5" /> 开始投掷
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center gap-2">
                {rolledValues.map((v, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-lg ${assignedValues.includes(v) ? 'border-green-500 bg-green-100 text-green-700' : 'border-purple-300 bg-purple-50 text-purple-800'}`}>
                    {v}
                  </div>
                ))}
              </div>
              <button onClick={rollStats} className="w-full text-purple-600 text-sm font-bold flex items-center justify-center gap-1 hover:underline">
                <RotateCcw className="w-3 h-3" /> 重新投掷
              </button>
            </div>
          )}
        </div>
      )}

      {/* Background Bonuses Reminder */}
      {Object.values(character.backgroundBonuses || {}).some(v => v > 0) && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-sm">
          <div className="font-bold text-amber-800 mb-2">背景加值</div>
          <div className="space-y-1">
            {ABILITY_KEYS.filter(k => (character.backgroundBonuses?.[k] || 0) > 0).map(k => (
              <div key={k} className="flex justify-between text-amber-700">
                <span>{ABILITY_LABELS[k].name}</span>
                <span>+{character.backgroundBonuses![k]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Right Panel: Ability Cards
  const rightPanel = (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black text-stone-900">设定属性值</h2>

      {/* Ability Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ABILITY_KEYS.map(key => {
          const baseVal = character.abilities[key];
          const bonus = (character.backgroundBonuses?.[key] || 0);
          const total = baseVal + bonus;
          const mod = getModifier(total);
          const available = getAvailableValues(key);

          return (
            <div key={key} className="bg-white border-2 border-stone-200 rounded-xl p-4 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-stone-800">{ABILITY_LABELS[key].name}</span>
                <button className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                  <Info className="w-3 h-3" />
                </button>
              </div>

              {/* Value Selection (Standard/Roll) */}
              {(mode === 'standard' || mode === 'roll') && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {(mode === 'standard' ? STANDARD_ARRAY : rolledValues).map((v, i) => {
                    const isAssigned = baseVal === v;
                    const isAvailable = available.includes(v);
                    const isUsedElsewhere = !isAssigned && !isAvailable && ABILITY_KEYS.some(k => k !== key && character.abilities[k] === v);

                    return (
                      <button
                        key={`${v}-${i}`}
                        onClick={() => setAbilityValue(key, isAssigned ? 0 : v)}
                        disabled={!isAssigned && !isAvailable}
                        className={`
                          w-8 h-8 rounded text-sm font-bold transition-all
                          ${isAssigned
                            ? 'bg-dndRed text-white shadow-md'
                            : isUsedElsewhere
                              ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                              : isAvailable
                                ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                : 'bg-stone-50 text-stone-300 cursor-not-allowed'}
                        `}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Point Buy Controls */}
              {mode === 'pointbuy' && (
                <div className="flex items-center justify-center gap-3 mb-4">
                  <button
                    onClick={() => baseVal > 8 && setAbilityValue(key, baseVal - 1)}
                    disabled={baseVal <= 8}
                    className="w-8 h-8 rounded bg-stone-200 hover:bg-stone-300 disabled:opacity-30 font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-stone-800 w-10 text-center">{baseVal}</span>
                  <button
                    onClick={() => baseVal < 15 && POINT_BUY_COSTS[baseVal + 1] - POINT_BUY_COSTS[baseVal] <= pointBuyRemaining && setAbilityValue(key, baseVal + 1)}
                    disabled={baseVal >= 15 || (POINT_BUY_COSTS[baseVal + 1] - POINT_BUY_COSTS[baseVal]) > pointBuyRemaining}
                    className="w-8 h-8 rounded bg-stone-200 hover:bg-stone-300 disabled:opacity-30 font-bold"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Manual Input */}
              {mode === 'manual' && (
                <div className="mb-4">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={baseVal || ''}
                    onChange={e => setAbilityValue(key, parseInt(e.target.value) || 0)}
                    className="w-full text-center text-2xl font-black text-stone-800 border-b-2 border-dashed border-stone-300 focus:border-dndRed outline-none py-1"
                  />
                </div>
              )}

              {/* Central Display */}
              <div className="text-center py-4 border-t border-stone-100">
                <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">{ABILITY_LABELS[key].abbr}</div>
                <div className={`text-2xl font-black ${mod >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {mod >= 0 ? '+' : ''}{mod}
                </div>
                {bonus > 0 && (
                  <div className="text-xs text-amber-600 mt-1">
                    总值: {total} (含背景 +{bonus})
                  </div>
                )}
              </div>

              {/* Assigned Indicator */}
              {baseVal > 0 && (mode === 'standard' || mode === 'roll') && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-sm text-stone-600">
        <strong>提示：</strong>属性调整值 = (属性总值 - 10) ÷ 2 (向下取整)。背景加值已自动计入最终调整值显示。
      </div>
    </div>
  );

  return (
    <WizardLayout
      title="属性值设定"
      stepId={5}
      totalSteps={9}
      leftPanel={leftPanel}
      rightPanel={rightPanel}
    />
  );
};

export default StepAbilities;