import React, { useState } from 'react';
import { CharacterData, AbilityScores } from '../types';
import { User, Book, Sparkles, CheckCircle, AlertCircle, Zap, Package } from 'lucide-react';
import { BACKGROUND_DB } from '../data-backgrounds';
import { SPECIES_DB } from '../data-species';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

interface AbilitySelectRowProps {
  label: string;
  value: string;
  onChange: (value: keyof AbilityScores) => void;
  options: { key: keyof AbilityScores; label: string }[];
  filterList: string[];
  exclude: string[];
}

const AbilitySelectRow: React.FC<AbilitySelectRowProps> = ({ label, value, onChange, options, filterList, exclude }) => {
  // Parsing label for color handling is a bit specific, but kept simple here
  const labelText = label.split('(')[0];
  const labelBonus = label.includes('(') ? '(' + label.split('(')[1] : '';

  return (
    <div>
      <label className="block text-xs font-bold text-stone-600 mb-1">
        {labelText} <span className="text-amber-600">{labelBonus}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as keyof AbilityScores)}
        className="w-full p-2 border-2 border-stone-300 rounded focus:border-amber-500 focus:outline-none font-bold text-sm"
      >
        <option value="">-- 选择 --</option>
        {options
          .filter(opt => filterList.includes(opt.label.split(' ')[0]))
          .filter(opt => !exclude.includes(opt.key))
          .map(opt => (
            <option key={opt.key} value={opt.key}>{opt.label}</option>
          ))}
      </select>
    </div>
  );
};
const StepOrigin: React.FC<Props> = ({ character, updateCharacter }) => {
  const [abilityDistribution, setAbilityDistribution] = useState<'2-1' | '1-1-1'>('2-1');
  const [selectedAbilities, setSelectedAbilities] = useState<{
    ability1: keyof AbilityScores | '';
    ability2: keyof AbilityScores | '';
    ability3: keyof AbilityScores | '';
  }>({ ability1: '', ability2: '', ability3: '' });

  const selectedBackground = BACKGROUND_DB.find(bg => bg.name === character.background);
  const selectedSpecies = SPECIES_DB.find(sp => sp.name === character.race);

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCharacter({ background: e.target.value });
    // 重置属性选择
    setSelectedAbilities({ ability1: '', ability2: '', ability3: '' });
  };

  const handleApplyBackground = () => {
    if (!selectedBackground) return;

    // 应用技能熟练
    const updatedSkillMastery = { ...character.skillMastery };
    selectedBackground.skills.forEach(skill => {
      if (!updatedSkillMastery[skill]) {
        updatedSkillMastery[skill] = 1; // 熟练
      }
    });

    // 应用工具熟练
    const newTool = {
      id: `bg-${selectedBackground.id}`,
      name: selectedBackground.tool,
      note: `来自背景: ${selectedBackground.name}`
    };
    const updatedTools = character.tools.filter(t => !t.id.startsWith('bg-'));
    updatedTools.push(newTool);

    // 应用属性加值
    const updatedBackgroundBonuses = { ...character.backgroundBonuses };
    if (abilityDistribution === '2-1' && selectedAbilities.ability1 && selectedAbilities.ability2) {
      updatedBackgroundBonuses[selectedAbilities.ability1 as keyof AbilityScores] += 2;
      updatedBackgroundBonuses[selectedAbilities.ability2 as keyof AbilityScores] += 1;
    } else if (abilityDistribution === '1-1-1' && selectedAbilities.ability1 && selectedAbilities.ability2 && selectedAbilities.ability3) {
      updatedBackgroundBonuses[selectedAbilities.ability1 as keyof AbilityScores] += 1;
      updatedBackgroundBonuses[selectedAbilities.ability2 as keyof AbilityScores] += 1;
      updatedBackgroundBonuses[selectedAbilities.ability3 as keyof AbilityScores] += 1;
    }

    // 应用起源专长（记录到featSelections）
    const updatedFeatSelections = { ...character.featSelections };
    updatedFeatSelections['Origin'] = selectedBackground.feat;

    updateCharacter({
      skillMastery: updatedSkillMastery,
      tools: updatedTools,
      backgroundBonuses: updatedBackgroundBonuses,
      featSelections: updatedFeatSelections,
      originFeat: selectedBackground.feat
    });

    alert(`已成功应用背景「${selectedBackground.name}」的所有特性！`);
  };

  const canApplyBackground = () => {
    if (!selectedBackground) return false;
    if (abilityDistribution === '2-1') {
      return selectedAbilities.ability1 && selectedAbilities.ability2 &&
        selectedAbilities.ability1 !== selectedAbilities.ability2;
    } else {
      return selectedAbilities.ability1 && selectedAbilities.ability2 && selectedAbilities.ability3 &&
        selectedAbilities.ability1 !== selectedAbilities.ability2 &&
        selectedAbilities.ability2 !== selectedAbilities.ability3 &&
        selectedAbilities.ability1 !== selectedAbilities.ability3;
    }
  };

  const abilityOptions: Array<{ key: keyof AbilityScores; label: string }> = [
    { key: 'strength', label: '力量 STR' },
    { key: 'dexterity', label: '敏捷 DEX' },
    { key: 'constitution', label: '体质 CON' },
    { key: 'intelligence', label: '智力 INT' },
    { key: 'wisdom', label: '感知 WIS' },
    { key: 'charisma', label: '魅力 CHA' }
  ];

  return (
    <div className="space-y-8 pb-12">
      <h2 className="text-2xl font-bold text-dndRed flex items-center gap-2">
        第二步：种族与背景
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 种族选择 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-stone-300">
          <label className="block text-stone-800 font-bold mb-3 flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-green-600" /> 种族 (Species)
          </label>
          <select
            value={character.race}
            onChange={(e) => updateCharacter({ race: e.target.value })}
            className="w-full p-3 bg-white border-2 border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-stone-800"
          >
            <option value="">-- 选择种族 --</option>
            {SPECIES_DB.map(sp => (
              <option key={sp.id} value={sp.name}>{sp.name}</option>
            ))}
          </select>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            种族决定了角色的体型、速度以及特殊的种族特性（如黑暗视觉）。
          </p>

          {selectedSpecies && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200 animate-fade-in">
              <p className="text-sm text-stone-700 leading-relaxed">
                {selectedSpecies.description}
              </p>
            </div>
          )}
        </div>

        {/* 背景选择 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-stone-300">
          <label className="block text-stone-800 font-bold mb-3 flex items-center gap-2 text-lg">
            <Book className="w-5 h-5 text-amber-600" /> 背景 (Background)
          </label>
          <select
            value={character.background}
            onChange={handleBackgroundChange}
            className="w-full p-3 bg-white border-2 border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-800"
          >
            <option value="">-- 选择背景 --</option>
            {BACKGROUND_DB.map(bg => (
              <option key={bg.id} value={bg.name}>{bg.name}</option>
            ))}
          </select>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            背景决定了角色的过往经历、技能熟练项及起源专长。
          </p>

          {selectedBackground && (
            <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200 animate-fade-in">
              <p className="text-sm text-stone-700 leading-relaxed mb-3">
                {selectedBackground.description}
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>技能熟练:</strong> {selectedBackground.skills.join(', ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong>工具熟练:</strong> {selectedBackground.tool}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>起源专长:</strong> {selectedBackground.feat}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 背景属性加值应用 */}
      {selectedBackground && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-400 shadow-lg animate-fade-in">
          <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            属性加值分配 (Ability Score Increase)
          </h3>

          <div className="bg-white p-4 rounded border border-amber-200 mb-4">
            <p className="text-sm text-stone-700 mb-3">
              <strong>2024版规则:</strong> 你的背景允许你从以下属性中选择并分配加值：
              <span className="font-bold text-amber-800 ml-1">
                {selectedBackground.abilityScores.join(', ')}
              </span>
            </p>

            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setAbilityDistribution('2-1')}
                className={`flex-1 p-3 rounded-lg border-2 font-bold transition-all ${abilityDistribution === '2-1'
                  ? 'border-amber-600 bg-amber-100 text-amber-900'
                  : 'border-stone-300 hover:border-stone-400'
                  }`}
              >
                +2 / +1 模式
              </button>
              <button
                onClick={() => setAbilityDistribution('1-1-1')}
                className={`flex-1 p-3 rounded-lg border-2 font-bold transition-all ${abilityDistribution === '1-1-1'
                  ? 'border-amber-600 bg-amber-100 text-amber-900'
                  : 'border-stone-300 hover:border-stone-400'
                  }`}
              >
                +1 / +1 / +1 模式
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 属性1 */}
              <AbilitySelectRow
                label={`属性 1 ${abilityDistribution === '2-1' ? '(+2)' : '(+1)'}`}
                value={selectedAbilities.ability1}
                onChange={(val) => setSelectedAbilities({ ...selectedAbilities, ability1: val })}
                options={abilityOptions}
                filterList={selectedBackground.abilityScores}
                exclude={[]}
              />

              {/* 属性2 */}
              <AbilitySelectRow
                label="属性 2 (+1)"
                value={selectedAbilities.ability2}
                onChange={(val) => setSelectedAbilities({ ...selectedAbilities, ability2: val })}
                options={abilityOptions}
                filterList={selectedBackground.abilityScores}
                exclude={[selectedAbilities.ability1]}
              />

              {/* 属性3 (仅1-1-1模式) */}
              {abilityDistribution === '1-1-1' && (
                <AbilitySelectRow
                  label="属性 3 (+1)"
                  value={selectedAbilities.ability3}
                  onChange={(val) => setSelectedAbilities({ ...selectedAbilities, ability3: val })}
                  options={abilityOptions}
                  filterList={selectedBackground.abilityScores}
                  exclude={[selectedAbilities.ability1, selectedAbilities.ability2]}
                />
              )}
            </div>
          </div>

          {/* 应用按钮 */}
          <div className="flex items-start gap-4">
            <button
              onClick={handleApplyBackground}
              disabled={!canApplyBackground()}
              className={`flex-1 py-3 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${canApplyBackground()
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg'
                : 'bg-stone-400 cursor-not-allowed'
                }`}
            >
              <Zap className="w-5 h-5" />
              一键应用背景特性
            </button>
          </div>

          <div className="mt-4 bg-blue-50 p-3 rounded border border-blue-200 flex items-start gap-2 text-xs text-blue-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              <strong>说明：</strong> 点击后将自动应用技能熟练、工具熟练、起源专长和属性加值到你的角色卡。
              请先选择完整的属性分配方案。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOrigin;