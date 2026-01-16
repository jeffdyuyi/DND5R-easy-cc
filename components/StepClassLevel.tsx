
import React from 'react';
import { CLASSES } from '../data'; 
import { CharacterData, ClassItem } from '../types';
import { Sword, BookOpen, Shield, Zap, Sparkles, User, Layout } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

// NOTE: This component appears to be legacy (replaced by TabClass), 
// but is maintained for compatibility with the project structure.
const StepClassLevel: React.FC<Props> = ({ character, updateCharacter }) => {
  const selectedClass: ClassItem | undefined = CLASSES[character.className];

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCharacter({ className: e.target.value, subclass: '' });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lvl = parseInt(e.target.value);
    if (isNaN(lvl) || lvl < 1) lvl = 1;
    if (lvl > 20) lvl = 20;
    updateCharacter({ level: lvl });
  };

  const getClassIcon = (className: string) => {
    switch (className) {
      case '战士': case '野蛮人': return <Sword className="w-6 h-6" />;
      case '法师': case '术士': case '魔契师': return <Zap className="w-6 h-6" />;
      case '牧师': case '圣武士': case '德鲁伊': return <Shield className="w-6 h-6" />;
      case '吟游诗人': return <BookOpen className="w-6 h-6" />;
      case '游荡者': case '游侠': case '武僧': return <User className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 p-4 rounded-lg shadow-md border-b-4 border-dndRed text-white flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex items-center gap-4 w-full md:w-auto">
            <label className="font-bold text-lg md:text-xl whitespace-nowrap">角色等级</label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                min="1" 
                max="20"
                value={character.level}
                onChange={handleLevelChange}
                className="w-20 p-2 text-center text-xl font-bold text-stone-900 bg-white rounded shadow-inner focus:outline-none focus:ring-4 focus:ring-dndRed/50"
              />
            </div>
         </div>
      </div>

      <div className="bg-parchment p-6 rounded-lg shadow-md border border-stone-300">
        <h2 className="text-xl font-bold text-dndRed mb-4 flex items-center gap-2 border-b border-stone-300 pb-2">
          <Layout className="w-5 h-5" /> 职业选择
        </h2>
        
        <div className="mb-6">
          <label className="block text-stone-800 font-bold mb-2">选择职业</label>
          <div className="relative">
              <select 
                value={character.className}
                onChange={handleClassChange}
                className="w-full p-4 pl-12 text-lg font-bold bg-white border-2 border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-dndRed appearance-none cursor-pointer hover:border-dndRed transition-colors"
              >
                <option value="">-- 请选择职业 --</option>
                {Object.keys(CLASSES).map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dndRed">
                {character.className ? getClassIcon(character.className) : <User />}
              </div>
          </div>
        </div>

        {selectedClass && (
          <div className="animate-fade-in">
            <div className="bg-white p-4 rounded-lg border-l-4 border-dndRed shadow-sm italic text-stone-700 leading-relaxed mb-4">
               {selectedClass.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepClassLevel;
