
import React, { useState } from 'react';
import { CharacterData, AbilityScores, SpeciesItem, BackgroundItem, FeatItem } from '../types';
import { Dna, Flag, Languages } from 'lucide-react';
import { CardLibrary } from './CardLibrary';
import { SpeciesDetailView, BackgroundDetailView } from './LibraryDetails';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  librarySpecies: SpeciesItem[];
  libraryBackgrounds: BackgroundItem[];
  libraryFeats: FeatItem[];
}

const STANDARD_LANGUAGES = [
  "通用手语", "龙语", "矮人语", "精灵语", "巨人语", "侏儒语", "地精语", "半身人语", "兽人语"
];

const RARE_LANGUAGES = [
  "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", "原初语", "木族语", "盗贼黑话", "地底通用语"
];

const TabIdentity: React.FC<Props> = ({ 
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

  // Parse current languages
  const currentLangs = character.languages.split('、').map(s => s.trim()).filter(s => s);
  
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

  const toggleLanguage = (lang: string) => {
    let newLangs = [...currentLangs];
    
    // Always keep Common if it's there, but user selects +2. 
    // Assuming "通用语" is base.
    if (newLangs.includes(lang)) {
      newLangs = newLangs.filter(l => l !== lang);
    } else {
      newLangs.push(lang);
    }
    
    // Clean up duplicates and empty strings
    newLangs = Array.from(new Set(newLangs)).filter(l => l);
    updateCharacter({ languages: newLangs.join('、') });
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
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="border-b-2 border-dndRed pb-4">
         <h2 className="text-3xl font-bold text-dndRed">种族、背景与语言</h2>
         <p className="text-stone-500 mt-2">点击卡片以更改或选择你的出身。语言通常选择：通用语 + 2种自选语言。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Species Section */}
         <div className="bg-white/80 p-6 rounded-lg shadow-md border border-stone-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-stone-200 text-stone-600 px-3 py-1 text-xs font-bold rounded-bl-lg z-10">种族</div>
            
            <div className="flex justify-between items-center mb-4 border-b border-stone-200 pb-2">
               <h3 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                  <Dna className="w-6 h-6"/> {character.race || "未选择"}
               </h3>
               <button 
                  onClick={() => setViewMode('select-race')}
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

         {/* Background Section */}
         <div className="bg-white/80 p-6 rounded-lg shadow-md border border-stone-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-stone-200 text-stone-600 px-3 py-1 text-xs font-bold rounded-bl-lg z-10">背景</div>
            
            <div className="flex justify-between items-center mb-4 border-b border-stone-200 pb-2">
               <h3 className="text-2xl font-bold text-dndRed flex items-center gap-2">
                  <Flag className="w-6 h-6"/> {character.background || "未选择"}
               </h3>
               <button 
                  onClick={() => setViewMode('select-bg')}
                  className="px-3 py-1 bg-stone-100 hover:bg-dndRed hover:text-white text-stone-600 rounded text-sm font-bold border border-stone-300 transition-colors"
               >
                  更换背景
               </button>
            </div>

            {selectedBg ? (
               <BackgroundDetailView item={selectedBg} libraryFeats={libraryFeats} />
            ) : (
               <div className="text-center py-12 text-stone-400 italic bg-stone-50 rounded border border-dashed border-stone-200">
                  点击“更换背景”从卡牌库中选择
               </div>
            )}
         </div>
      </div>

      {/* Language Section */}
      <div className="bg-white/80 p-6 rounded-lg shadow-md border border-stone-300">
         <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-2">
            <Languages className="w-6 h-6 text-dndRed" />
            <h3 className="text-xl font-bold text-stone-800">语言选择</h3>
         </div>
         <p className="text-sm text-stone-500 mb-4">你的角色至少掌握三种语言：通用语，加上 2 种自选语言（标准或稀有）。某些特性可能赋予额外语言。</p>
         
         <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-stone-800 text-white px-3 py-1 rounded-full text-sm font-bold">已选: {character.languages || "无"}</div>
            {!character.languages.includes("通用语") && (
               <button onClick={() => toggleLanguage("通用语")} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm border border-green-200 hover:bg-green-200">
                  + 添加通用语
               </button>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <h4 className="text-sm font-bold text-stone-600 mb-2 uppercase">标准语言</h4>
               <div className="flex flex-wrap gap-2">
                  {STANDARD_LANGUAGES.map(lang => (
                     <button 
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1 text-sm rounded border transition-colors ${currentLangs.includes(lang) ? 'bg-dndRed text-white border-dndRed' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                     >
                        {lang}
                     </button>
                  ))}
               </div>
            </div>
            <div>
               <h4 className="text-sm font-bold text-stone-600 mb-2 uppercase">稀有语言</h4>
               <div className="flex flex-wrap gap-2">
                  {RARE_LANGUAGES.map(lang => (
                     <button 
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-3 py-1 text-sm rounded border transition-colors ${currentLangs.includes(lang) ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                     >
                        {lang}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TabIdentity;
