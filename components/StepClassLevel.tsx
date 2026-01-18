
import React, { useState } from 'react';
import { CLASSES } from '../data';
import { CharacterData, ClassItem } from '../types';
import {
  Sword, BookOpen, Shield, Zap, Sparkles, User, Layout,
  Heart, Dices, CheckCircle, Package, Gem, Info
} from 'lucide-react';
import { parseSkillOptions, ALL_SKILLS } from '../utils/characterUtils';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

const StepClassLevel: React.FC<Props> = ({ character, updateCharacter }) => {
  const selectedClass: ClassItem | undefined = character.className ? CLASSES[character.className] : undefined;

  const [selectedEquipmentOption, setSelectedEquipmentOption] = useState<'A' | 'B'>('A');

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCharacter({ className: e.target.value, subclass: '', skillMastery: {} }); // Reset skills on class change
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lvl = parseInt(e.target.value);
    if (isNaN(lvl) || lvl < 1) lvl = 1;
    if (lvl > 20) lvl = 20;
    updateCharacter({ level: lvl });
  };

  // Skill Selection Logic
  const skillTrait = selectedClass?.coreTraits.skillProficiencies || '';
  const skillConfig = parseSkillOptions(skillTrait);

  const toggleSkill = (skill: string) => {
    const currentMastery = { ...character.skillMastery };
    if (currentMastery[skill]) {
      delete currentMastery[skill];
    } else {
      // Check limit
      const currentCount = Object.keys(currentMastery).filter(k =>
        skillConfig?.options.includes("ALL_SKILLS") || skillConfig?.options.includes(k)
      ).length;

      if (skillConfig && currentCount < skillConfig.limit) {
        currentMastery[skill] = 1;
      }
    }
    updateCharacter({ skillMastery: currentMastery });
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
    <div className="space-y-8 pb-12">
      <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
        第一步：职业与等级
      </h2>

      {/* 等级选择 */}
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
        <div className="text-sm text-stone-300">
          熟练加值: <span className="font-bold text-white">+{Math.ceil(character.level / 4) + 1}</span>
        </div>
      </div>

      {/* 职业选择 */}
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-stone-300">
        <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2 border-b-2 border-stone-200 pb-2">
          <Layout className="w-5 h-5" /> 选择职业
        </h3>

        <div className="mb-6">
          <label className="block text-stone-700 font-bold mb-2">职业 (Class)</label>
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
          <div className="animate-fade-in space-y-6">
            {/* 简短描述 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border-l-4 border-dndRed shadow-sm">
              <p className="text-stone-700 leading-relaxed whitespace-pre-line font-medium">
                {selectedClass.description}
              </p>
            </div>

            {/* 核心特质卡片 */}
            <div className="bg-stone-50 p-6 rounded-lg border-2 border-stone-300">
              <h4 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                核心特质 (Core Traits)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 生命骰 */}
                <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-bold text-stone-500 uppercase">生命骰</span>
                  </div>
                  <p className="text-stone-800 font-bold">{selectedClass.coreTraits.hitPointDie}</p>
                </div>

                {/* 关键属性 */}
                <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Dices className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-stone-500 uppercase">关键属性</span>
                  </div>
                  <p className="text-stone-800 font-bold">{selectedClass.coreTraits.primaryAbility}</p>
                </div>

                {/* 豁免熟练 */}
                <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-stone-500 uppercase">豁免熟练</span>
                  </div>
                  <p className="text-stone-800 font-bold">{selectedClass.coreTraits.savingThrows}</p>
                </div>

                {/* 武器护甲 */}
                <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sword className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-bold text-stone-500 uppercase">装备熟练</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-1"><strong>武器:</strong> {selectedClass.coreTraits.weaponProficiencies}</p>
                  <p className="text-xs text-stone-600"><strong>护甲:</strong> {selectedClass.coreTraits.armorTraining}</p>
                </div>
              </div>
            </div>

            {/* 技能选择 - NEW FEATURE */}
            {skillConfig && (
              <div className="bg-white p-6 rounded-lg border-2 border-stone-300 shadow-md">
                <h4 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  技能熟练 (可选 {skillConfig.limit} 项)
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(skillConfig.options.includes("ALL_SKILLS") ? ALL_SKILLS : skillConfig.options).map(skill => {
                    const isSelected = !!character.skillMastery[skill];

                    // Count current selections that are valid for this class
                    const currentCount = Object.keys(character.skillMastery).filter(k =>
                      skillConfig.options.includes("ALL_SKILLS") || skillConfig.options.includes(k)
                    ).length;

                    const isDisabled = !isSelected && currentCount >= skillConfig.limit;

                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        disabled={isDisabled}
                        className={`
                               px-3 py-2 rounded border text-sm font-bold flex items-center justify-between transition-all
                               ${isSelected
                            ? 'bg-green-100 border-green-500 text-green-800 shadow-sm'
                            : isDisabled
                              ? 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed'
                              : 'bg-white text-stone-600 border-stone-300 hover:border-green-400 hover:bg-green-50'}
                            `}
                      >
                        {skill}
                        {isSelected && <CheckCircle className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 text-xs text-stone-400 text-right">
                  已选: {Object.keys(character.skillMastery).filter(k => skillConfig.options.includes("ALL_SKILLS") || skillConfig.options.includes(k)).length} / {skillConfig.limit}
                </div>
              </div>
            )}

            {/* 初始装备选择 */}
            <div className="bg-white p-6 rounded-lg border-2 border-amber-300 shadow-md">
              <h4 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                初始装备 (Starting Equipment)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 选项A */}
                <button
                  onClick={() => setSelectedEquipmentOption('A')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${selectedEquipmentOption === 'A'
                    ? 'border-dndRed bg-red-50 shadow-md'
                    : 'border-stone-300 hover:border-stone-400 bg-white'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedEquipmentOption === 'A' ? 'border-dndRed bg-dndRed' : 'border-stone-300'
                      }`}>
                      {selectedEquipmentOption === 'A' && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="font-bold text-stone-800">选项 A (标准)</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-8">
                    {selectedClass.coreTraits.startingEquipment.optionA}
                  </p>
                </button>

                {/* 选项B */}
                <button
                  onClick={() => setSelectedEquipmentOption('B')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${selectedEquipmentOption === 'B'
                    ? 'border-dndRed bg-red-50 shadow-md'
                    : 'border-stone-300 hover:border-stone-400 bg-white'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedEquipmentOption === 'B' ? 'border-dndRed bg-dndRed' : 'border-stone-300'
                      }`}>
                      {selectedEquipmentOption === 'B' && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="font-bold text-stone-800 flex items-center gap-2">
                      选项 B (金币) <Gem className="w-4 h-4 text-amber-600" />
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed pl-8">
                    {selectedClass.coreTraits.startingEquipment.optionB}
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepClassLevel;
