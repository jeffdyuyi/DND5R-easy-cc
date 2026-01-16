import React from 'react';
import { CharacterData } from '../types';

interface Props {
  character: CharacterData;
}

const SKILLS = [
  { name: "运动", ability: "strength" },
  { name: "杂技", ability: "dexterity" },
  { name: "巧手", ability: "dexterity" },
  { name: "隐匿", ability: "dexterity" },
  { name: "奥秘", ability: "intelligence" },
  { name: "历史", ability: "intelligence" },
  { name: "调查", ability: "intelligence" },
  { name: "自然", ability: "intelligence" },
  { name: "宗教", ability: "intelligence" },
  { name: "驯兽", ability: "wisdom" },
  { name: "洞悉", ability: "wisdom" },
  { name: "医药", ability: "wisdom" },
  { name: "察觉", ability: "wisdom" },
  { name: "求生", ability: "wisdom" },
  { name: "欺瞒", ability: "charisma" },
  { name: "威吓", ability: "charisma" },
  { name: "表演", ability: "charisma" },
  { name: "游说", ability: "charisma" },
];

const TabSkills: React.FC<Props> = ({ character }) => {
  const getModifier = (score: number) => Math.floor((score - 10) / 2);
  const proficiencyBonus = Math.ceil(character.level / 4) + 1;

  // Simple state for checkboxes just for visual toggle in this demo
  const [proficiencies, setProficiencies] = React.useState<Set<string>>(new Set());

  const toggleSkill = (skillName: string) => {
    const newSet = new Set(proficiencies);
    if (newSet.has(skillName)) {
      newSet.delete(skillName);
    } else {
      newSet.add(skillName);
    }
    setProficiencies(newSet);
  };

  return (
    <div className="p-6 bg-parchment min-h-full">
      <h2 className="text-3xl font-bold text-dndRed mb-6 border-b-2 border-dndRed pb-2">技能列表</h2>
      <p className="mb-4 text-stone-600 italic">勾选左侧圆圈以标记熟练项。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        {SKILLS.map((skill) => {
          const abilityScore = character.abilities[skill.ability as keyof typeof character.abilities];
          const rawMod = getModifier(abilityScore);
          const isProficient = proficiencies.has(skill.name);
          const total = isProficient ? rawMod + proficiencyBonus : rawMod;

          return (
            <div 
              key={skill.name} 
              className="flex items-center gap-4 p-3 bg-white rounded shadow-sm border border-stone-200 hover:bg-stone-50 cursor-pointer"
              onClick={() => toggleSkill(skill.name)}
            >
              <div className={`
                w-5 h-5 rounded-full border-2 border-stone-800 flex items-center justify-center
                ${isProficient ? 'bg-stone-800' : 'bg-transparent'}
              `}>
                {isProficient && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              
              <div className="font-bold text-xl min-w-[3rem] text-right text-stone-800">
                {total >= 0 ? `+${total}` : total}
              </div>
              
              <div className="flex-grow">
                <span className="font-bold text-stone-700">{skill.name}</span>
                <span className="text-xs text-stone-400 ml-2 uppercase">({skill.ability.substring(0,3)})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabSkills;