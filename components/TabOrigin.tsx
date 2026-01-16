
import React, { useState } from 'react';
import { CharacterData, AbilityScores, SpeciesItem, BackgroundItem, FeatItem } from '../types';
import { Dna, Flag } from 'lucide-react';
import { CardLibrary } from './CardLibrary';
import { SpeciesDetailView, BackgroundDetailView } from './LibraryDetails';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  librarySpecies: SpeciesItem[];
  libraryBackgrounds: BackgroundItem[];
  libraryFeats: FeatItem[];
}

const TabOrigin: React.FC<Props> = ({ 
  character, 
  updateCharacter,
  librarySpecies,
  libraryBackgrounds,
  libraryFeats
}) => {
  // View state: 'summary' | 'select-race' | 'select-bg'
  const [viewMode, setViewMode] = useState<'summary' | 'select-race' | 'select-bg'>('summary');

  const selectedSpecies = librarySpecies.find(r => r.name === character.race);
  const selectedBg = libraryBackgrounds.find(b => b.name === character.background);

  const handleSpeciesSelect = (item: SpeciesItem) => {
    updateCharacter({ race: item.name });
    setViewMode('summary');
  };

  const handleBackgroundSelect = (item: BackgroundItem) => {
    const newBonuses: AbilityScores = { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 };
    updateCharacter({
      background: item.name,
      originFeat: item.feat || '',
      toolProficiencies: item.tool || '',
      equipment: item.equipment ? item.equipment.join(' 或 ') : '',
      abilityBonuses: newBonuses 
    });
    setViewMode('summary');
  };

  if (viewMode === 'select-race') {
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

  if (viewMode === 'select-bg') {
     return (
        <div className="p-8">
           <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dndRed">选择背景</h2>
              <button onClick={() => setViewMode('summary')} className="text-stone-500 underline hover:text-dndRed">返回概览</button>
           </div>
           <CardLibrary 
              title="背景库"
              items={libraryBackgrounds}
              itemTypeLabel="背景"
              selectedId={character.background}
              onSelect={handleBackgroundSelect}
              allowEdit={false}
           />
        </div>
     );
  }

  // SUMMARY VIEW
  return (
    <div className="p-8 space-y-8 animate-fade-in bg-stone-100 min-h-full">
      <div className="border-b-2 border-dndRed pb-4">
         <h2 className="text-3xl font-bold text-dndRed">起源 Origin</h2>
         <p className="text-stone-500 mt-2">种族与背景共同定义了你的出身与过往。点击卡片以更改选择。</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         {/* Species Section */}
         <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 px-2">
               <h3 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                  <Dna className="w-6 h-6"/> {character.race || "未选择种族"}
               </h3>
               <button 
                  onClick={() => setViewMode('select-race')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded font-bold transition-colors shadow-sm text-sm"
               >
                  更换种族
               </button>
            </div>
            
            <div className="flex-grow">
              {selectedSpecies ? (
                 <SpeciesDetailView item={selectedSpecies} />
              ) : (
                 <div className="h-full min-h-[400px] flex items-center justify-center text-stone-400 italic bg-white rounded-lg border-2 border-dashed border-stone-300">
                    暂无种族数据
                 </div>
              )}
            </div>
         </div>

         {/* Background Section */}
         <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 px-2">
               <h3 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                  <Flag className="w-6 h-6"/> {character.background || "未选择背景"}
               </h3>
               <button 
                  onClick={() => setViewMode('select-bg')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded font-bold transition-colors shadow-sm text-sm"
               >
                  更换背景
               </button>
            </div>

            <div className="flex-grow">
              {selectedBg ? (
                 <BackgroundDetailView item={selectedBg} libraryFeats={libraryFeats} />
              ) : (
                 <div className="h-full min-h-[400px] flex items-center justify-center text-stone-400 italic bg-white rounded-lg border-2 border-dashed border-stone-300">
                    暂无背景数据
                 </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default TabOrigin;
