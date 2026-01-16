import React from 'react';
import { CharacterData } from '../types';
import { User, Book } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const BACKGROUNDS = [
  "侍僧", "骗子", "罪犯", "艺人", "平民英雄", "公会工匠", "隐士", "贵族", "外乡人", "贤者", "水手", "士兵", "流浪儿"
];

const SPECIES = [
  "人类", "矮人", "精灵", "半身人", "龙裔", "侏儒", "半兽人", "提夫林", "歌利亚"
];

const StepOrigin: React.FC<Props> = ({ character, updateCharacter }) => {
  return (
    <div className="bg-parchment p-6 rounded-lg shadow-md border-2 border-stone-300 space-y-6">
      <h2 className="text-2xl font-bold text-dndRed mb-4 flex items-center gap-2">
        <Book /> 第二步：确定起源
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-stone-800 font-bold mb-2 flex items-center gap-2">
            <User className="w-4 h-4"/> 背景 (Background)
          </label>
          <select 
            value={character.background}
            onChange={(e) => updateCharacter({ background: e.target.value })}
            className="w-full p-3 bg-white border border-stone-400 rounded shadow-inner"
          >
            <option value="">-- 选择背景 --</option>
            {BACKGROUNDS.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
          <p className="text-xs text-stone-500 mt-2">背景决定了角色的过往经历、技能熟练项及起源专长。</p>
        </div>

        <div>
          <label className="block text-stone-800 font-bold mb-2 flex items-center gap-2">
            <User className="w-4 h-4"/> 种族 (Species)
          </label>
          <select 
            value={character.race}
            onChange={(e) => updateCharacter({ race: e.target.value })}
            className="w-full p-3 bg-white border border-stone-400 rounded shadow-inner"
          >
            <option value="">-- 选择种族 --</option>
            {SPECIES.map(sp => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>
          <p className="text-xs text-stone-500 mt-2">种族决定了角色的体型、速度以及特殊的种族特性（如黑暗视觉）。</p>
        </div>
      </div>
    </div>
  );
};

export default StepOrigin;