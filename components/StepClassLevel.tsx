
import React, { useMemo } from 'react';
import { CLASSES, CLASS_DB, SUBCLASS_DB, WEAPON_DB } from '../data';
import { CharacterData, ClassItem } from '../types';
import WizardLayout from './wizard/WizardLayout';
import FeatureAccordion from './wizard/FeatureAccordion';
import { parseSkillOptions, ALL_SKILLS } from '../utils/characterUtils';
import {
  Plus, Minus, Sword, Wand2, Shield, Cross,
  Music, Leaf, Flame, Moon, Skull, Sparkles, CheckCircle, AlertCircle,
  Axe, Zap, Eye, Target, Footprints
} from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

// Icon map for classes
const CLASS_ICONS: Record<string, React.ReactNode> = {
  '野蛮人': <Axe className="w-8 h-8" />,
  '吟游诗人': <Music className="w-8 h-8" />,
  '牧师': <Cross className="w-8 h-8" />,
  '德鲁伊': <Leaf className="w-8 h-8" />,
  '战士': <Sword className="w-8 h-8" />,
  '武僧': <Moon className="w-8 h-8" />,
  '圣武士': <Shield className="w-8 h-8" />,
  '游侠': <Target className="w-8 h-8" />,
  '游荡者': <Footprints className="w-8 h-8" />,
  '术士': <Zap className="w-8 h-8" />,
  '魔契师': <Eye className="w-8 h-8" />,
  '法师': <Wand2 className="w-8 h-8" />,
};

const StepClassLevel: React.FC<Props> = ({ character, updateCharacter }) => {
  const selectedClass: ClassItem | undefined = character.className ? CLASSES[character.className] : undefined;

  // Get subclasses for selected class
  const availableSubclasses = useMemo(() => {
    if (!selectedClass) return [];
    return SUBCLASS_DB.filter(sc => sc.parentClass === selectedClass.name);
  }, [selectedClass]);

  // Subclass requirement (Standardized to Level 3 for all classes 2024)
  const subclassLevel = selectedClass?.subclassLevel || 3;
  const needsSubclass = character.level >= subclassLevel && availableSubclasses.length > 0;
  const subclassComplete = !needsSubclass || !!character.subclass;

  // Level change handlers
  const incrementLevel = () => {
    if (character.level < 20) updateCharacter({ level: character.level + 1 });
  };
  const decrementLevel = () => {
    if (character.level > 1) updateCharacter({ level: character.level - 1 });
  };

  // Get features for current level (Base Class + Subclass)
  const currentFeatures = useMemo(() => {
    if (!selectedClass) return [];

    // Base features
    const baseFeatures = selectedClass.features.filter(f => f.level <= character.level);

    // Subclass features
    let subFeatures: any[] = [];
    if (character.subclass) {
      const sc = SUBCLASS_DB.find(s => s.name === character.subclass && s.parentClass === selectedClass.name);
      if (sc) {
        subFeatures = sc.features.filter(f => f.level <= character.level);
      }
    }

    // Combine and sort
    return [...baseFeatures, ...subFeatures].sort((a, b) => {
      if (a.level === b.level) {
        // If levels are same, put base class feature first usually
        return 0;
      }
      return a.level - b.level;
    });
  }, [selectedClass, character.level, character.subclass]);

  // Calculate proficiency bonus
  const proficiencyBonus = Math.ceil(character.level / 4) + 1;

  // --- Weapon Mastery Logic ---
  const hasWeaponMastery = currentFeatures.some(f => f.name.includes('武器精通'));

  const masteryOptions = useMemo(() => {
    return WEAPON_DB.filter(w =>
      w.type === '武器' &&
      w.tags?.includes('近战') &&
      (w.tags?.includes('简易武器') || w.tags?.includes('军用武器')) &&
      w.mastery // Must have mastery property
    );
  }, []);

  const wm1 = character.equipmentChoices?.classSubChoices?.['weaponMastery1'] || '';
  const wm2 = character.equipmentChoices?.classSubChoices?.['weaponMastery2'] || '';

  const updateWeaponMastery = (key: string, value: string) => {
    updateCharacter({
      equipmentChoices: {
        ...character.equipmentChoices,
        classSubChoices: {
          ...character.equipmentChoices?.classSubChoices,
          [key]: value
        }
      }
    });
  };

  const weaponMasteryComplete = !hasWeaponMastery || (!!wm1 && !!wm2);

  // --- Skill Parsing Logic (with Primal Knowledge) ---
  const skillConfig = selectedClass ? parseSkillOptions(selectedClass.coreTraits.skillProficiencies) : null;
  const selectedSkillCount = Object.keys(character.skillMastery || {}).filter(
    k => skillConfig?.options.includes("ALL_SKILLS") || skillConfig?.options.includes(k)
  ).length;

  let skillLimit = skillConfig?.limit || 0;
  // Primal Knowledge Adjustment: Barbarian Level 3+ gets 1 extra skill
  if (selectedClass?.name === '野蛮人' && character.level >= 3) {
    skillLimit += 1;
  }

  const skillsComplete = skillConfig ? selectedSkillCount >= skillLimit : true;

  // Toggle skill
  const toggleSkill = (skill: string) => {
    const current = { ...character.skillMastery };
    if (current[skill]) {
      delete current[skill];
    } else if (skillConfig && selectedSkillCount < skillLimit) {
      current[skill] = 1;
    }
    updateCharacter({ skillMastery: current });
  };


  // === LEFT PANEL: Class Selection ===
  const leftPanel = (
    <div className="p-4 space-y-4">
      {/* Level Control */}
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

        {/* Weapon Mastery Selection */}
        {hasWeaponMastery && (
          <FeatureAccordion
            title={`武器精通选择 (${(wm1 && wm2) ? '2/2' : (wm1 || wm2) ? '1/2' : '0/2'})`}
            level={1}
            isPending={!weaponMasteryComplete}
            isComplete={weaponMasteryComplete}
            defaultOpen={!weaponMasteryComplete}
          >
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                选择两种武器以应用其精通词条。当你使用这两种武器时，你可以运用其精通特性。
              </p>

              {[1, 2].map(idx => {
                const key = `weaponMastery${idx}`;
                const val = idx === 1 ? wm1 : wm2;
                const selectedWeapon = masteryOptions.find(w => w.id === val);

                return (
                  <div key={idx} className="bg-stone-50 p-3 rounded border border-stone-200">
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">精通武器 {idx}</label>
                    <select
                      value={val}
                      onChange={e => updateWeaponMastery(key, e.target.value)}
                      className="w-full p-2 border border-stone-300 rounded text-sm mb-2"
                    >
                      <option value="">-- 选择武器 --</option>
                      {masteryOptions.map(w => (
                        <option key={w.id} value={w.id}>{w.name} ({w.mastery?.split(':')[0]?.trim()?.replace('**', '')?.replace('**', '') || '精通'})</option>
                      ))}
                    </select>

                    {selectedWeapon && selectedWeapon.mastery && (
                      <div className="text-xs text-stone-600 bg-white p-2 rounded border border-stone-100">
                        <span className="font-bold text-dndRed">{selectedWeapon.mastery.split(':')[0]}</span>:
                        {selectedWeapon.mastery.split(':')[1]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </FeatureAccordion>
        )}

        {/* Skill Proficiency Selection */}
        {skillConfig && (
          <FeatureAccordion
            title={`技能熟练选择 (${selectedSkillCount}/${skillLimit})`}
            level={1}
            isPending={!skillsComplete}
            isComplete={skillsComplete}
            defaultOpen={!skillsComplete}
          >
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                从以下技能中选择 <strong>{skillLimit}</strong> 项
                {skillLimit > skillConfig.limit && <span className="text-dndRed ml-1">(包含原初学识+1)</span>}：
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(skillConfig.options.includes("ALL_SKILLS") ? ALL_SKILLS : skillConfig.options).map(skill => {
                  const isSelected = !!character.skillMastery?.[skill];
                  const isDisabled = !isSelected && selectedSkillCount >= skillLimit;
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
