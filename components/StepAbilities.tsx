import React from 'react';
import { CharacterData, AbilityScores } from '../types';
import { Activity } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const ABILITY_NAMES: Record<keyof AbilityScores, string> = {
  strength: "力量",
  dexterity: "敏捷",
  constitution: "体质",
  intelligence: "智力",
  wisdom: "感知",
  charisma: "魅力"
};

const StepAbilities: React.FC<Props> = ({ character, updateCharacter }) => {
  const handleAbilityChange = (ability: keyof AbilityScores, value: string) => {
    const numVal = parseInt(value) || 10;
    updateCharacter({
      abilities: {
        ...character.abilities,
        [ability]: numVal
      }
    });
  };

  const getModifier = (score: number) => Math.floor((score - 10) / 2);

  return (
    <div className="bg-parchment p-6 rounded-lg shadow-md border-2 border-stone-300">
      <h2 className="text-2xl font-bold text-dndRed mb-4 flex items-center gap-2">
        <Activity /> 第三步：确定属性值
      </h2>
      <p className="text-stone-600 mb-4 text-sm">输入属性数值（3-20），调整值会自动计算。</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {(Object.keys(ABILITY_NAMES) as Array<keyof AbilityScores>).map((key) => (
          <div key={key} className="bg-white p-4 rounded border border-stone-200 text-center shadow-sm">
            <label className="block text-dndRed font-bold mb-2">{ABILITY_NAMES[key]}</label>
            <input 
              type="number"
              min="1"
              max="30"
              value={character.abilities[key]}
              onChange={(e) => handleAbilityChange(key, e.target.value)}
              className="w-16 h-12 text-center text-xl font-bold border-2 border-stone-400 rounded focus:ring-2 focus:ring-dndRed focus:outline-none mx-auto block"
            />
            <div className="mt-2 text-stone-500 font-bold">
              调整值: {getModifier(character.abilities[key]) > 0 ? '+' : ''}{getModifier(character.abilities[key])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepAbilities;