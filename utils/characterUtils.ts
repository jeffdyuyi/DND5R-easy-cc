


// --- Alignment Data ---
export const ALIGNMENT_DESCRIPTIONS: Record<string, { title: string; quote: string; desc: string; advantage: string }> = {
  "守序善良": {
    title: "十字军",
    quote: "守序善良的角色就像一个好人应该或必须的方式行事。",
    desc: "她结合了对抗邪恶的信念和严酷的战斗训练。她诚实守信，帮助需要的人，指出不公之事。一个守序善良的角色不愿看到不受惩罚的罪行。",
    advantage: "守序善良的长处在于它结合了荣誉感和同情心。"
  },
  "中立善良": {
    title: "施恩者",
    quote: "中立善良的人会尽可能做一个好人。",
    desc: "他乐意帮助别人。他可能与国王和官员合作，但不会对他们感到感激。",
    advantage: "中立善良的长处在于行善不会有偏颇或与命令抵触。"
  },
  "混乱善良": {
    title: "反抗者",
    quote: "混乱善良的人会根据他自己的内心行事，而不管他人的期望。",
    desc: "他有自己的方式，但是善良而仁慈。他相信善良和正义，但不会服从法律和规矩。他讨厌人们强迫别人或指示他怎么做。他顺从自己的道德标准，虽然本意善良，但不一定会被社会接受。",
    advantage: "混乱善良的长处在于结合了善良的心和自由的灵魂。"
  },
  "守序中立": {
    title: "审判者",
    quote: "守序中立的人以法律，传统或个人信条来引导他的行动。",
    desc: "秩序和组织对她来说及为重要。她可能有个人信条，生活则遵循某个规则或标准，她也可能希望一切都按部就班，并且支持一个强大而有组织的政府领导。",
    advantage: "守序中立的长处在于它意味着不用成为狂热者也能得到信赖和尊敬。"
  },
  "绝对中立": {
    title: "无立场者",
    quote: "绝对中立的人并没有什么主意。",
    desc: "她对善良和邪恶，秩序和混乱没有特别的倾向。大部分绝对中立的角色缺乏信念，而不是信仰中立。这样的人认为善良要比邪恶好，毕竟她宁愿有善良的邻居和统治者而不是邪恶的。但她不会在任何抽象或普遍的情况下表现对善良的支持。另一方面，一些绝对中立的角色却信仰中立的哲学。他们认为善良，邪恶，秩序和混乱都是偏见和危险的极端。",
    advantage: "绝对中立的长处在于你处事自然，没有偏见和强迫。"
  },
  "混乱中立": {
    title: "自由人",
    quote: "混乱中立的人冲动行事。",
    desc: "他自始自终都是个人主义者。他重视自己的自由，但不愿意保护别人的自由。他躲避权威，怨恨约束，以及挑战传统。一个混乱中立的人不会像无政府主义者一样有意去破坏组织。如果这样做的话，不是因为善良（为了解放他人）就是邪恶（希望不同的人受苦）。",
    advantage: "混乱中立的长处在于它从社会限制和道德劝说中提供了真正的自由。"
  },
  "守序邪恶": {
    title: "支配者",
    quote: "守序邪恶的人会依照自己的行为规则来得到他想要的东西，而不管这是否会伤害其他人。",
    desc: "他重视传统，忠诚和秩序，但不关心自由，尊严或生命。他依规则行事，但是却没有怜悯和同情。阶级制度对他来说是最合适的，因为喜欢统治，愿意服从。他不会因他人的行为而谴责他人，而是根据他人的种族，信仰，家乡或社会地位。他不愿意打破法律或许诺，依靠秩序来保护自己。",
    advantage: "守序邪恶最危险的地方在于，它是一种有系统，有计划而经常成功的邪恶。"
  },
  "中立邪恶": {
    title: "犯罪者",
    quote: "中立邪恶的人会为了自己做任何事。",
    desc: "她只为了自己，单纯而简单。她不会为她杀死的人流泪，不论是为了利益，高兴还是方便。她不喜欢法律，而且也不会幻想追随法律、传统或任何规范会让自己高贵。另一方面，她也不是像混乱邪恶的人一样焦躁和热衷于争斗。",
    advantage: "中立邪恶最危险的地方在于，它表现的是真正的邪恶，完全没有荣誉感，也完全没有变化。"
  },
  "混乱邪恶": {
    title: "毁灭者",
    quote: "混乱邪恶的角色会因他的贪婪，憎恨而做任何事，破坏欲驱使他如此行为。",
    desc: "他暴躁，充满恶意，专横暴力而且不可预测。如果只是为了得到他想要的东西，他显得无情而残忍。如果为了散播邪恶和混乱的话，情况可能更糟糕。值得庆幸的是他并没有什么计划，而且任何他参加或组织的团体都没有很好的组织起来。",
    advantage: "混乱邪恶最危险的地方在于，它不但破坏美和生命，还毁坏了美和生命所依赖的秩序。"
  }
};

// --- Subrace / Variant Data ---
// Based on 5E 2024 / Project Data Descriptions
// --- Subrace / Variant Data ---
// Migrated to data/species/*.ts

// --- Helper: Update Spells from Subrace ---
import { CharacterData, SubSpeciesItem } from '../types';

export const updateCharacterSpellsFromSubrace = (
  character: CharacterData,
  newSubraceName: string,
  subraces: SubSpeciesItem[]
): Partial<CharacterData> => {
  const updates: Partial<CharacterData> = { subRace: newSubraceName };

  // Helper to parse spell string
  const parseSpells = (str: string | undefined) => {
    if (!str) return [];
    return str.split(/[\n,]/)
      .map(s => s.trim().replace(/^[•\-\*]\s*/, ''))
      .filter(Boolean);
  };

  // Helper to format spell string
  const formatSpells = (list: string[]) => list.map(s => `• ${s}`).join('\n');

  // 1. Identify Old Spells to Remove
  const oldVariant = subraces.find(o => o.name === character.subRace);
  const spellsReq: typeof character.spells = { ...character.spells };

  if (oldVariant?.grantedSpells) {
    oldVariant.grantedSpells.forEach(spell => {
      const key = spell.level === 0 ? 'cantrips' : `level${spell.level}` as keyof typeof character.spells;
      if (spellsReq[key]) {
        let list = parseSpells(spellsReq[key]);
        list = list.filter(s => s !== spell.name);
        spellsReq[key] = formatSpells(list);
      }
    });
    updates.spells = spellsReq;
  }

  // 2. Identify New Spells to Add
  const newVariant = subraces.find(o => o.name === newSubraceName);
  if (newVariant?.grantedSpells) {
    const charLevel = character.level || 1;

    newVariant.grantedSpells.forEach(spell => {
      if (charLevel >= spell.unlockLevel) {
        const key = spell.level === 0 ? 'cantrips' : `level${spell.level}` as keyof typeof character.spells;
        const list = parseSpells(spellsReq[key]);
        if (!list.includes(spell.name)) {
          list.push(spell.name);
          spellsReq[key] = formatSpells(list);
        }
      }
    });
    updates.spells = spellsReq;
  }

  return updates;
};

// --- Skill Parser ---
// Extracts skill options from string like "选择2项：驯兽、运动、威吓..."
export const parseSkillOptions = (traitString: string): { limit: number; options: string[] } | null => {
  if (!traitString) return null;

  // 处理 "选择X项：任意技能" 格式 (吟游诗人等职业使用)
  if (traitString.includes('任意技能') || traitString.includes('任意')) {
    const match = traitString.match(/选择(\d+)项/);
    if (match) {
      return { limit: parseInt(match[1]), options: ["ALL_SKILLS"] };
    }
  }

  // Regex to find "选择X项：..." or "任择 X 项..."
  const match = traitString.match(/选择(\d+)项[：:]/);
  if (!match) {
    // Try alternate format "任择 (\d+) 项"
    const match2 = traitString.match(/任择\s*(\d+)\s*项/);
    if (!match2) return null;

    // Parse list from match2
    // Assuming format "任择 3 项技能" implies any skill? 
    // Usually Bard says "任择 3 项技能" (Any 3 skills).
    if (traitString.includes("任择 3 项技能")) {
      return { limit: 3, options: ["ALL_SKILLS"] };
    }
  }

  const limit = parseInt(match ? match[1] : (traitString.match(/任择\s*(\d+)\s*项/)![1]));

  // Split the part after the colon
  const listPart = traitString.split(/[：:]/)[1];
  if (!listPart) return null;

  // Split by '、' or ',' or '，' or '或'
  const options = listPart
    .split(/[、,，或]/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s !== '技能'); // Filter out empty or noise

  return { limit, options };
};

export const ALL_SKILLS = [
  "杂技", "驯兽", "奥秘", "运动", "欺瞒", "历史", "洞悉", "威吓",
  "调查", "医药", "自然", "察觉", "表演", "游说", "宗教", "巧手",
  "隐匿", "求生"
];
