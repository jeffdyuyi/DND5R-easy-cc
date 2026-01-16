
import React, { useState } from 'react';
import { CharacterData, SpeciesItem } from '../types';
import { Dna } from 'lucide-react';
import { CardLibrary } from './CardLibrary';
import { SpeciesDetailView } from './LibraryDetails';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  librarySpecies: SpeciesItem[];
}

const TabSpecies: React.FC<Props> = ({ character, updateCharacter, librarySpecies }) => {
  const [viewMode, setViewMode] = useState<'summary' | 'select'>('summary');
  const selectedSpecies = librarySpecies.find(r => r.name === character.race);

  const handleSpeciesSelect = (item: SpeciesItem) => {
    updateCharacter({ race: item.name });
    setViewMode('summary');
  };

  if (viewMode === 'select') {
     return (
        <div className="p-8">
           <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dndRed">选择种族</h2>
              <button onClick={() => setViewMode('summary')} className="text-stone-500 underline hover:text-dndRed">返回概览</button>
           </div>
           <CardLibrary 
              title="种族库"
              items={librarySpecies}
              itemTypeLabel="种族"
              selectedId={character.race}
              onSelect={handleSpeciesSelect}
              allowEdit={false} 
           />
        </div>
     );
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in bg-parchment min-h-full">
      <div className="border-b-2 border-dndRed pb-4 flex justify-between items-end">
         <div>
            <h2 className="text-3xl font-bold text-dndRed">种族</h2>
            <p className="text-stone-500 mt-2">种族决定了角色的基本生物特征，如属性提升、视觉能力及特殊的种族天赋。</p>
         </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-stone-300 relative overflow-hidden group">
        <div className="flex justify-between items-center mb-4 border-b border-stone-200 pb-2">
            <h3 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                <Dna className="w-6 h-6"/> {character.race || "未选择"}
            </h3>
            <button 
                onClick={() => setViewMode('select')}
                className="px-3 py-1 bg-stone-100 hover:bg-dndRed hover:text-white text-stone-600 rounded text-sm font-bold border border-stone-300 transition-colors"
            >
                更换种族
            </button>
        </div>
        
        {selectedSpecies ? (
            <SpeciesDetailView item={selectedSpecies} />
        ) : (
            <div className="text-center py-12 text-stone-400 italic bg-stone-50 rounded border border-dashed border-stone-200">
                点击“更换种族”从卡牌库中选择
            </div>
        )}
      </div>
    </div>
  );
};

export default TabSpecies;
