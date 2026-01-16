
import React, { useState } from 'react';
import { CharacterData } from '../types';
import { AlertCircle, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import StepClassLevel from './StepClassLevel';
import StepOrigin from './StepOrigin';
import StepAbilities from './StepAbilities';
import StepDetails from './StepDetails';
import { ALIGNMENT_DETAILS } from './TabBio';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  onComplete: () => void;
}

const CharacterWizard: React.FC<Props> = ({ character, updateCharacter, onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // --- Identity Step Logic (formerly snippet provided as file content) ---
  const renderStep5_Identity = () => {
    // 5E 2024 / 5E Standard Language Lists
    const STANDARD_LANGUAGES = [
      "通用语", "通用手语", "矮人语", "精灵语", "巨人语", "侏儒语", "地精语", "半身人语", "兽人语", "龙语"
    ];
    const RARE_LANGUAGES = [
      "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", "原初语", "木族语", "盗贼黑话", "地底通用语"
    ];

    // Parse current selection
    const currentList = character.languages ? character.languages.split('、').filter(s => s && s.trim().length > 0) : [];
    const hasRare = currentList.some(l => RARE_LANGUAGES.includes(l));
    const isOverLimit = currentList.length > 3;

    // Toggle logic
    const toggleLang = (lang: string) => {
        let newList = [...currentList];
        if (newList.includes(lang)) {
            newList = newList.filter(l => l !== lang);
        } else {
            newList.push(lang);
        }
        // Remove duplicates and join
        newList = Array.from(new Set(newList));
        updateCharacter({ languages: newList.join('、') });
    };

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
           第五步：语言与阵营
        </h2>

        {/* Languages Section */}
        <div className="bg-white p-6 rounded-lg shadow border border-stone-200">
           <div className="flex justify-between items-start mb-6 border-b border-stone-100 pb-4">
              <div>
                  <h3 className="font-bold text-xl text-stone-800 flex items-center gap-2">
                    语言能力
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${currentList.length === 3 ? 'bg-green-100 text-green-700 border-green-200' : isOverLimit ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                        已选: {currentList.length}
                    </span>
                  </h3>
                  <div className="text-xs text-stone-500 mt-2 space-y-1">
                     <p>通常配置：<span className="font-bold text-stone-700">通用语</span> + 1门标准 + (1门标准 或 1门稀有)。</p>
                     <p>总计通常为 3 门（部分种族或背景可能给予更多）。</p>
                  </div>
              </div>
           </div>

           {/* Standard Languages */}
           <div className="mb-6">
              <h4 className="text-xs font-bold text-stone-600 uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stone-600"></span>
                  标准语言 (Standard)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                 {STANDARD_LANGUAGES.map(lang => (
                    <button 
                       key={lang}
                       onClick={() => toggleLang(lang)}
                       className={`
                          px-3 py-2 rounded text-xs font-bold border transition-all
                          ${currentList.includes(lang) 
                             ? 'bg-stone-800 text-white border-stone-800 shadow-sm transform scale-105' 
                             : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300'}
                       `}
                    >
                       {lang}
                    </button>
                 ))}
              </div>
           </div>

           {/* Rare Languages */}
           <div className="mb-6">
              <h4 className="text-xs font-bold text-purple-700 uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  稀有语言 (Rare)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                 {RARE_LANGUAGES.map(lang => (
                    <button 
                       key={lang}
                       onClick={() => toggleLang(lang)}
                       className={`
                          px-3 py-2 rounded text-xs font-bold border transition-all
                          ${currentList.includes(lang) 
                             ? 'bg-purple-700 text-white border-purple-700 shadow-sm transform scale-105' 
                             : 'bg-white text-stone-600 border-stone-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700'}
                       `}
                    >
                       {lang}
                    </button>
                 ))}
              </div>
           </div>

           {/* Warnings & Custom Input */}
           <div className="bg-stone-50 p-4 rounded border border-stone-200 space-y-3">
               {hasRare && (
                   <div className="flex gap-2 items-start text-xs text-purple-800 bg-purple-50 border border-purple-100 p-2 rounded">
                       <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                       <div>
                           <strong>稀有语言提示：</strong> 你选择了稀有语言。请确保你的角色背景（如：曾被俘虏、学术研究、异界血统）能合理解释为何掌握此语言。
                       </div>
                   </div>
               )}
               
               <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">自定义/备注</label>
                    <textarea 
                        value={character.languages}
                        onChange={e => updateCharacter({ languages: e.target.value })}
                        className="w-full p-2 border rounded text-sm focus:outline-none focus:border-dndRed"
                        placeholder="在此处手动修正语言列表，或记录稀有语言的习得理由..."
                        rows={2}
                    />
               </div>
           </div>
        </div>

        {/* Alignment */}
        <div className="bg-white p-6 rounded-lg shadow border border-stone-200">
           <h3 className="font-bold text-xl text-stone-800 mb-4">阵营 (Alignment)</h3>
           <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
              {['守序善良', '中立善良', '混乱善良', '守序中立', '绝对中立', '混乱中立', '守序邪恶', '中立邪恶', '混乱邪恶'].map(a => (
                 <button 
                    key={a}
                    onClick={() => updateCharacter({ alignment: a as any })}
                    className={`p-3 text-xs font-bold rounded border transition-all ${character.alignment === a ? 'bg-dndRed text-white border-dndRed shadow-md scale-105' : 'bg-white text-stone-600 hover:bg-stone-50'}`}
                 >
                    {a}
                 </button>
              ))}
           </div>
           {character.alignment && (
              <div className="mt-4 bg-stone-50 p-3 rounded border border-stone-200 text-sm text-stone-600 italic leading-relaxed animate-fade-in">
                 <strong>{character.alignment}:</strong> {ALIGNMENT_DETAILS[character.alignment]?.desc || ""}
              </div>
           )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (step) {
      case 1: return <StepClassLevel character={character} updateCharacter={updateCharacter} />;
      case 2: return <StepOrigin character={character} updateCharacter={updateCharacter} />;
      case 3: return <StepAbilities character={character} updateCharacter={updateCharacter} />;
      case 4: return <StepDetails character={character} updateCharacter={updateCharacter} />;
      case 5: return renderStep5_Identity();
      default: return <div>未知步骤</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-100 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 text-white p-4 shadow-md flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-dndRed text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{step}/{totalSteps}</span>
          角色创建向导
        </h2>
        <button onClick={onComplete} className="text-stone-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-stone-300 p-4 flex justify-between items-center shrink-0">
        <button 
          onClick={prevStep} 
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${step === 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}
        >
          <ChevronLeft className="w-5 h-5" /> 上一步
        </button>

        {step < totalSteps ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 bg-stone-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-stone-700 transition-colors shadow-lg"
          >
            下一步 <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="flex items-center gap-2 bg-dndRed text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg animate-pulse"
          >
            完成创建 <Check className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterWizard;
