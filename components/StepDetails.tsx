import React from 'react';
import { CharacterData } from '../types';
import { Feather, UserCircle } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepDetails: React.FC<Props> = ({ character, updateCharacter }) => {
  return (
    <div className="bg-parchment p-6 rounded-lg shadow-md border-2 border-stone-300">
      <h2 className="text-2xl font-bold text-dndRed mb-4 flex items-center gap-2">
        <Feather /> 第五步：丰富细节
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-stone-800 font-bold mb-2 flex items-center gap-2">
            <UserCircle className="w-4 h-4" /> 角色姓名
          </label>
          <input 
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            placeholder="例如：加里安·影行者"
            className="w-full p-3 bg-white border border-stone-400 rounded shadow-inner focus:ring-2 focus:ring-dndRed focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-800 font-bold mb-2">玩家姓名</label>
          <input 
            type="text"
            value={character.playerName}
            onChange={(e) => updateCharacter({ playerName: e.target.value })}
            placeholder="你的名字"
            className="w-full p-3 bg-white border border-stone-400 rounded shadow-inner focus:ring-2 focus:ring-dndRed focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default StepDetails;