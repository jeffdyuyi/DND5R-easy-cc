
import React, { useState } from 'react';
import { CharacterData } from '../types';
import StepClassLevel from './StepClassLevel';
import StepSpecies from './StepSpecies';
import StepBackground from './StepBackground';
import StepAbilities from './StepAbilities';
import StepDetails from './StepDetails';
import StepIdentity from './StepIdentity'; // New Import
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  onComplete: () => void;
}

const CharacterWizard: React.FC<Props> = ({ character, updateCharacter, onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6; // Updated from 5

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderContent = () => {
    switch (step) {
      case 1: return <StepClassLevel character={character} updateCharacter={updateCharacter} />;
      case 2: return <StepSpecies character={character} updateCharacter={updateCharacter} />; // Separated
      case 3: return <StepBackground character={character} updateCharacter={updateCharacter} />; // Separated
      case 4: return <StepAbilities character={character} updateCharacter={updateCharacter} />;
      case 5: return <StepDetails character={character} updateCharacter={updateCharacter} />;
      case 6: return <StepIdentity character={character} updateCharacter={updateCharacter} />; // New Component
      default: return <div>未知步骤</div>;
    }
  };

  const getStepTitle = (s: number) => {
    switch (s) {
      case 1: return "职业等级";
      case 2: return "种族血统";
      case 3: return "背景身世";
      case 4: return "核心属性";
      case 5: return "细节特征";
      case 6: return "阵营语言";
      default: return "";
    }
  };



  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 px-4 pt-4">
        <div className="flex items-center justify-between mb-4 relative">
          {/* Connector Line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-stone-200 -z-10" />

          {Array.from({ length: totalSteps }).map((_, i) => {
            const s = i + 1;
            const isActive = s === step;
            const isCompleted = s < step;

            return (
              <div key={s} className="flex flex-col items-center gap-2 bg-stone-50 px-2 group">
                <div
                  className={`
                             w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                             ${isActive
                      ? 'bg-dndRed text-white scale-110 shadow-lg ring-4 ring-red-100'
                      : isCompleted
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-200 text-stone-400'}
                           `}
                >
                  {isCompleted ? "✓" : s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider hidden md:block ${isActive ? 'text-dndRed' : 'text-stone-400'}`}>
                  {getStepTitle(s)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide">
        {renderContent()}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all
                  ${step === 1
                ? 'text-stone-300 cursor-not-allowed bg-stone-50'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}
               `}
          >
            <ChevronLeft className="w-5 h-5" />
            上一步
          </button>

          <div className="text-stone-400 text-xs font-mono hidden md:block">
            Step {step} of {totalSteps}
          </div>

          <button
            onClick={nextStep}
            className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-95
                  ${step === totalSteps
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-dndRed text-white hover:bg-red-700'}
               `}
          >
            {step === totalSteps ? (
              <>
                <Save className="w-5 h-5" />
                完成创建
              </>
            ) : (
              <>
                下一步
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterWizard;
