import React from 'react';
import { CharacterData, Alignment } from '../types';
import { Scale } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const ALIGNMENTS: Alignment[][] = [
  ['守序善良', '中立善良', '混乱善良'],
  ['守序中立', '绝对中立', '混乱中立'],
  ['守序邪恶', '中立邪恶', '混乱邪恶']
];

const StepAlignment: React.FC<Props> = ({ character, updateCharacter }) => {
  return (
    <div className="bg-parchment p-6 rounded-lg shadow-md border-2 border-stone-300">
      <h2 className="text-2xl font-bold text-dndRed mb-4 flex items-center gap-2">
        <Scale /> 第四步：选择阵营
      </h2>
      
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto bg-stone-900 p-2 rounded">
        {ALIGNMENTS.flat().map((align) => (
          <button
            key={align}
            onClick={() => updateCharacter({ alignment: align })}
            className={`
              p-4 rounded font-bold text-sm transition-all duration-200
              ${character.alignment === align 
                ? 'bg-dndRed text-white ring-2 ring-yellow-400 scale-105' 
                : 'bg-parchment text-stone-800 hover:bg-stone-200'}
            `}
          >
            {align}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center text-stone-600">
        当前选择: <span className="font-bold text-dndRed">{character.alignment || "未选择"}</span>
      </div>
    </div>
  );
};

export default StepAlignment;