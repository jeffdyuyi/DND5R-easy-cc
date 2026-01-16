import React from 'react';
import { CharacterData } from '../types';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const TabAdventure: React.FC<Props> = ({ character, updateCharacter }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-dndRed mb-6 border-b-2 border-dndRed pb-2">冒险经历</h2>
      
      <div className="bg-stone-800 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
         <div>
            <span className="font-bold text-lg mr-4">经验值 (XP)</span>
            <input 
               type="number" 
               value={character.experience}
               onChange={(e) => updateCharacter({ experience: parseInt(e.target.value) || 0 })}
               className="bg-stone-900 border border-stone-600 rounded px-3 py-1 font-mono text-lg w-32 focus:outline-none focus:border-yellow-500"
            />
         </div>
         <div className="text-stone-400 text-sm">
            下一级所需: {character.level * 1000} (估算)
         </div>
      </div>

      <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-stone-200">
         <h3 className="font-bold text-xl text-stone-800 mb-4">冒险笔记与日志</h3>
         <textarea 
            value={character.notes}
            onChange={(e) => updateCharacter({ notes: e.target.value })}
            className="w-full min-h-[500px] p-4 bg-stone-50 border border-stone-200 rounded focus:ring-2 focus:ring-dndRed focus:outline-none leading-relaxed resize-y"
            placeholder="记录你的冒险旅程、遇到的NPC、接取的任务..."
         />
      </div>
    </div>
  );
};

export default TabAdventure;