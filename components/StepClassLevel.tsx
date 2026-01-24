
import React, { useMemo } from 'react';
import { CLASSES, CLASS_DB } from '../data';
import { CharacterData, ClassItem } from '../types';
import { SUBCLASS_DB } from '../data';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { parseSkillOptions, ALL_SKILLS } from '../utils/characterUtils';
import {
  Plus, Minus, Sword, Wand2, Shield, Cross,
  Music, Leaf, Flame, Moon, Skull, Sparkles, CheckCircle, AlertCircle
} from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

// Icon map for classes
const CLASS_ICONS: Record<string, React.ReactNode> = {
  '野蛮人': <Flame className="w-8 h-8" />,
  '吟游诗人': <Music className="w-8 h-8" />,
  '牧师': <Cross className="w-8 h-8" />,
  '德鲁伊': <Leaf className="w-8 h-8" />,
  '战士': <Sword className="w-8 h-8" />,
  '武僧': <Moon className="w-8 h-8" />,
  '圣武士': <Shield className="w-8 h-8" />,
  '游侠': <Sparkles className="w-8 h-8" />,
  '游荡者': <Skull className="w-8 h-8" />,
  '术士': <Flame className="w-8 h-8" />,
  '魔契师': <Skull className="w-8 h-8" />,
  '法师': <Wand2 className="w-8 h-8" />,
};

const StepClassLevel: React.FC<Props> = ({ character, updateCharacter }) => {
  const selectedClass: ClassItem | undefined = character.className ? CLASSES[character.className] : undefined;



  // Get subclasses for selected class
  const availableSubclasses = useMemo(() => {
    if (!selectedClass) return [];
    return SUBCLASS_DB.filter(sc => sc.parentClass === selectedClass.name);
  }, [selectedClass]);

  // Skill parsing
  const skillConfig = selectedClass ? parseSkillOptions(selectedClass.coreTraits.skillProficiencies) : null;
  const selectedSkillCount = Object.keys(character.skillMastery || {}).filter(
    k => skillConfig?.options.includes("ALL_SKILLS") || skillConfig?.options.includes(k)
  ).length;
  const skillsComplete = skillConfig ? selectedSkillCount >= skillConfig.limit : true;

  // Subclass requirement (usually level 3, but some at level 1)
  const subclassLevel = selectedClass?.name === '牧师' || selectedClass?.name === '术士' || selectedClass?.name === '魔契师' ? 1 : 3;
  const needsSubclass = character.level >= subclassLevel && availableSubclasses.length > 0;
  const subclassComplete = !needsSubclass || !!character.subclass;

  // Level change handlers
  const incrementLevel = () => {
    if (character.level < 20) updateCharacter({ level: character.level + 1 });
  };
  const decrementLevel = () => {
    if (character.level > 1) updateCharacter({ level: character.level - 1 });
  };

  // Toggle skill
  const toggleSkill = (skill: string) => {
    const current = { ...character.skillMastery };
    if (current[skill]) {
      delete current[skill];
    } else if (skillConfig && selectedSkillCount < skillConfig.limit) {
      current[skill] = 1;
    }
    updateCharacter({ skillMastery: current });
  };

  // Get features for current level
  const currentFeatures = useMemo(() => {
    if (!selectedClass) return [];
    return selectedClass.features.filter(f => f.level <= character.level);
  }, [selectedClass, character.level]);

  // Calculate proficiency bonus
  const proficiencyBonus = Math.ceil(character.level / 4) + 1;

  // === LEFT PANEL: Class Selection ===
  const leftPanel = (
    <div className="p-4 space-y-4">
      {/* Level Control - 移到顶部 */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-stone-700">角色等级</span>
          <div className="flex items-center gap-3">
            <button onClick={decrementLevel} disabled={character.level <= 1} className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-50 flex items-center justify-center shadow-sm">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-black text-2xl text-amber-700">{character.level}</span>
            <button onClick={incrementLevel} disabled={character.level >= 20} className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-50 flex items-center justify-center shadow-sm">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-stone-500">熟练加值: +{proficiencyBonus}</div>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-3 gap-3">
        {CLASS_DB.map(cls => (
          <button
            key={cls.id}
            onClick={() => updateCharacter({ className: cls.name, subclass: '', skillMastery: {} })}
            className={`
              p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
              ${character.className === cls.name
                ? 'border-dndRed bg-red-50 shadow-md'
                : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'}
            `}
          >
            <div className={`${character.className === cls.name ? 'text-dndRed' : 'text-stone-500'}`}>
              {CLASS_ICONS[cls.name] || <Sparkles className="w-8 h-8" />}
            </div>
            <span className={`text-sm font-bold ${character.className === cls.name ? 'text-dndRed' : 'text-stone-700'}`}>
              {cls.name}
            </span>
            <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
              2024
            </span>
          </button>
        ))}
      </div>

      {/* Selected Class Summary (if any) */}
      {selectedClass && (
        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-dndRed shadow-md">
          <div className="flex items-center gap-4">
            <div className="text-dndRed">
              {CLASS_ICONS[selectedClass.name] || <Sparkles className="w-12 h-12" />}
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg text-stone-800">{selectedClass.name}</div>
              <div className="text-xs text-stone-500">已选择</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-stone-50 p-2 rounded">
              <div className="text-[10px] text-stone-400 uppercase">熟练加值</div>
              <div className="font-bold text-stone-800">+{proficiencyBonus}</div>
            </div>
            <div className="bg-stone-50 p-2 rounded">
              <div className="text-[10px] text-stone-400 uppercase">生命骰</div>
              <div className="font-bold text-stone-800">{selectedClass.coreTraits.hitPointDie}</div>
            </div>
            <div className="bg-stone-50 p-2 rounded">
              <div className="text-[10px] text-stone-400 uppercase">生命值</div>
              <div className="font-bold text-stone-800">
                {(() => {
                  const hitDie = parseInt(selectedClass.coreTraits.hitPointDie.match(/d(\d+)/)?.[1] || '8');
                  const conMod = Math.floor((character.abilities.constitution - 10) / 2);
                  const level1HP = hitDie + conMod;
                  const higherLevelHP = (character.level - 1) * (Math.floor(hitDie / 2) + 1 + conMod);
                  return Math.max(1, level1HP + higherLevelHP);
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // === RIGHT PANEL: Class Configuration ===
  const rightPanel = selectedClass ? (
    <div className="p-6 space-y-6">
      {/* Class Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-stone-900">{selectedClass.name}</h2>
          <p className="text-stone-600 mt-2 leading-relaxed">{selectedClass.description}</p>
        </div>
      </div>

      {/* Pending Choices */}
      <div className="space-y-3">
        <h3 className="font-bold text-stone-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          待选择项目
        </h3>

        {/* Subclass Selection */}
        {needsSubclass && (
          <FeatureAccordion
            title={`${selectedClass.name}子职业选择`}
            level={subclassLevel}
            isPending={!subclassComplete}
            isComplete={subclassComplete}
            defaultOpen={!subclassComplete}
          >
            <div className="space-y-2">
              <p className="text-sm text-stone-600 mb-3">选择你的专精道途：</p>
              <select
                value={character.subclass}
                onChange={e => updateCharacter({ subclass: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-lg font-medium"
              >
                <option value="">-- 请选择子职业 --</option>
                {availableSubclasses.map(sc => (
                  <option key={sc.id} value={sc.name}>{sc.name}</option>
                ))}
              </select>
              {character.subclass && (
                <div className="mt-3 p-3 bg-stone-50 rounded-lg text-sm text-stone-600">
                  {availableSubclasses.find(sc => sc.name === character.subclass)?.description}
                </div>
              )}
            </div>
          </FeatureAccordion>
        )}

        {/* Skill Proficiency Selection */}
        {skillConfig && (
          <FeatureAccordion
            title={`技能熟练选择 (${selectedSkillCount}/${skillConfig.limit})`}
            level={1}
            isPending={!skillsComplete}
            isComplete={skillsComplete}
            defaultOpen={!skillsComplete}
          >
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                从以下技能中选择 <strong>{skillConfig.limit}</strong> 项：
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(skillConfig.options.includes("ALL_SKILLS") ? ALL_SKILLS : skillConfig.options).map(skill => {
                  const isSelected = !!character.skillMastery?.[skill];
                  const isDisabled = !isSelected && selectedSkillCount >= skillConfig.limit;
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      disabled={isDisabled}
                      className={`
                        px-3 py-2 rounded border text-sm font-medium flex items-center justify-between transition-all
                        ${isSelected
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : isDisabled
                            ? 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed'
                            : 'bg-white text-stone-600 border-stone-300 hover:border-green-400'}
                      `}
                    >
                      {skill}
                      {isSelected && <CheckCircle className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </FeatureAccordion>
        )}
      </div>

      {/* Core Traits */}
      <div className="space-y-3">
        <h3 className="font-bold text-stone-700">核心特质</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-xs text-stone-500 uppercase font-bold mb-1">关键属性</div>
            <div className="text-stone-800 font-medium">{selectedClass.coreTraits.primaryAbility}</div>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-xs text-stone-500 uppercase font-bold mb-1">豁免熟练</div>
            <div className="text-stone-800 font-medium">{selectedClass.coreTraits.savingThrows}</div>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-xs text-stone-500 uppercase font-bold mb-1">武器熟练</div>
            <div className="text-stone-800 text-sm">{selectedClass.coreTraits.weaponProficiencies}</div>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-xs text-stone-500 uppercase font-bold mb-1">护甲熟练</div>
            <div className="text-stone-800 text-sm">{selectedClass.coreTraits.armorTraining}</div>
          </div>
        </div>
      </div>

      {/* Class Features by Level */}
      <div className="space-y-3">
        <h3 className="font-bold text-stone-700">职业特性 (等级 1-{character.level})</h3>
        <div className="space-y-2">
          {currentFeatures.map((feature, idx) => (
            <FeatureAccordion
              key={idx}
              title={feature.name}
              level={feature.level}
              isComplete
            >
              <div className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {feature.description}
              </div>
            </FeatureAccordion>
          ))}
          {currentFeatures.length === 0 && (
            <div className="text-stone-400 text-sm italic">无可用特性</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="p-6 flex flex-col items-center justify-center h-full text-center">
      <Sparkles className="w-16 h-16 text-stone-300 mb-4" />
      <h3 className="text-xl font-bold text-stone-700 mb-2">选择你的职业</h3>
      <p className="text-stone-500 max-w-md">
        职业决定了你的角色的核心能力、战斗风格和角色扮演方向。从左侧列表中选择一个职业开始。
      </p>
    </div>
  );

  return (
    <WizardLayout
      title="职业选择"
      stepId={1}
      totalSteps={9}
      leftPanel={leftPanel}
      rightPanel={rightPanel}
    />
  );
};

export default StepClassLevel;
