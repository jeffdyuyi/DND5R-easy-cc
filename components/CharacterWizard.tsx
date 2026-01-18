
import React, { useState, useMemo } from 'react';
import { CharacterData } from '../types';
import StepClassLevel from './StepClassLevel';
import StepSpecies from './StepSpecies';
import StepBackground from './StepBackground';
import StepSpells from './StepSpells';
import StepAbilities from './StepAbilities';
import StepSkills from './StepSkills';
import StepEquipment from './StepEquipment';
import StepDetails from './StepDetails';
import StepIdentity from './StepIdentity';
import WizardStepProgress, { StepInfo } from './wizard/WizardStepProgress';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  onComplete: () => void;
}

const CharacterWizard: React.FC<Props> = ({ character, updateCharacter, onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  // Calculate step statuses
  const stepStatuses = useMemo((): StepInfo[] => {
    const getClassStatus = (): StepInfo['status'] => {
      if (!character.className) return 'pending';
      return 'complete';
    };

    const getSpeciesStatus = (): StepInfo['status'] => {
      if (!character.race) return 'pending';
      return 'complete';
    };

    const getBackgroundStatus = (): StepInfo['status'] => {
      if (!character.background) return 'pending';
      return 'complete';
    };

    const getSpellsStatus = (): StepInfo['status'] => {
      // Check if origin feat requires spells
      const spellFeats = ['法术入门', '魔法学徒', '学徒仪祭士'];
      const needsSpells = spellFeats.some(f => character.originFeat?.includes(f));
      if (!needsSpells) return 'complete'; // Skip if no spell feat

      const config = character.featConfig?.originFeat;
      if (!config?.spellcastingAbility || (config.cantrips?.length || 0) < 2 || !config.level1Spell) {
        return 'pending';
      }
      return 'complete';
    };

    const getAbilitiesStatus = (): StepInfo['status'] => {
      const hasAllAbilities = Object.values(character.abilities).every(v => v > 0);
      return hasAllAbilities ? 'complete' : 'pending';
    };

    const getSkillsStatus = (): StepInfo['status'] => {
      // Skills are auto-populated from class/background, always complete
      return 'complete';
    };

    const getEquipmentStatus = (): StepInfo['status'] => {
      const choices = character.equipmentChoices;
      if (!choices?.classChoice || !choices?.backgroundChoice) return 'pending';
      return 'complete';
    };

    const getDetailsStatus = (): StepInfo['status'] => {
      return 'complete';
    };

    const getIdentityStatus = (): StepInfo['status'] => {
      if (!character.alignment) return 'pending';
      return 'complete';
    };

    const steps: StepInfo[] = [
      { id: 1, name: '职业', status: step === 1 ? 'current' : getClassStatus() },
      { id: 2, name: '种族', status: step === 2 ? 'current' : getSpeciesStatus() },
      { id: 3, name: '背景', status: step === 3 ? 'current' : getBackgroundStatus() },
      { id: 4, name: '法术', status: step === 4 ? 'current' : getSpellsStatus() },
      { id: 5, name: '属性', status: step === 5 ? 'current' : getAbilitiesStatus() },
      { id: 6, name: '技能', status: step === 6 ? 'current' : getSkillsStatus() },
      { id: 7, name: '装备', status: step === 7 ? 'current' : getEquipmentStatus() },
      { id: 8, name: '细节', status: step === 8 ? 'current' : getDetailsStatus() },
      { id: 9, name: '阵营', status: step === 9 ? 'current' : getIdentityStatus() },
    ];

    return steps;
  }, [step, character]);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderContent = () => {
    switch (step) {
      case 1: return <StepClassLevel character={character} updateCharacter={updateCharacter} />;
      case 2: return <StepSpecies character={character} updateCharacter={updateCharacter} />;
      case 3: return <StepBackground character={character} updateCharacter={updateCharacter} />;
      case 4: return <StepSpells character={character} updateCharacter={updateCharacter} />;
      case 5: return <StepAbilities character={character} updateCharacter={updateCharacter} />;
      case 6: return <StepSkills character={character} updateCharacter={updateCharacter} />;
      case 7: return <StepEquipment character={character} updateCharacter={updateCharacter} />;
      case 8: return <StepDetails character={character} updateCharacter={updateCharacter} />;
      case 9: return <StepIdentity character={character} updateCharacter={updateCharacter} />;
      default: return <div>未知步骤</div>;
    }
  };

  // Check if can proceed to next step
  const canGoNext = useMemo(() => {
    switch (step) {
      case 1: return !!character.className;
      case 2: return !!character.race;
      case 3: return !!character.background;
      case 4: return true; // Spells step can be skipped
      case 5: return Object.values(character.abilities).every(v => v > 0);
      case 6: return true; // Skills are auto-populated
      case 7: return true; // Equipment can be skipped
      case 8: return true; // Details are optional
      case 9: return !!character.alignment;
      default: return true;
    }
  }, [step, character]);

  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Step Progress Footer */}
      <WizardStepProgress
        steps={stepStatuses}
        currentStep={step}
        onPrev={prevStep}
        onNext={nextStep}
        canGoNext={canGoNext}
      />
    </div>
  );
};

export default CharacterWizard;
