
import { SpeciesItem } from './types';

export const SPELL_DB: any[] = []; // Fix for implicit global issue if needed, though this file only exports SPECIES_DB

export const SPECIES_DB: SpeciesItem[] = [
  { 
    id: "human-2024", 
    name: "人类", 
    source: "官方规则", 
    description: "啥都能干\n英雄激励\n开局送专长\n适应力强\n平均主义", 
    fullDescription: "遍布整个多元宇宙，人类既多又广，他们力求在有限的生命里尽可能地实现更多的成就。在许多世界里，他们的雄心和足智多谋受到赞扬、尊敬和畏惧。",
    speed: 30, 
    size: "中型或小型", 
    darkvision: false, 
    traits: [
      { 
        name: "足智多谋 (Resourceful)", 
        description: "每当你完成 1 次长休后，你会获得英雄激励（Heroic Inspiration）。" 
      },
      { 
        name: "技艺娴熟 (Skillful)", 
        description: "你可以获得 1 项你自选的技能熟练。" 
      },
      { 
        name: "多才多艺 (Versatile)", 
        description: "你可以获得 1 个你自选的起源专长。" 
      }
    ] 
  },
  {
    id: "dwarf-2024", 
    name: "矮人", 
    source: "官方规则", 
    description: "矮墩墩\n毒素免疫\n石头亲和\n黑暗视觉\n血厚耐操",
    fullDescription: "矮人在古老时代由一位锻造之神从大地中唤醒。这位神赐予了矮人对石头和金属的亲和力，以及生活在地下的习性。矮人通常身材矮小且经常留有胡须。",
    speed: 30, 
    size: "中型", 
    darkvision: true,
    traits: [
      { 
        name: "黑暗视觉", 
        description: "你拥有 120 英尺范围的黑暗视觉。" 
      },
      { 
        name: "矮人韧性 (Dwarven Resilience)", 
        description: "你对毒素伤害具有抗性。你也对使你避免或结束中毒状态的豁免检定具有优势。" 
      },
      { 
        name: "矮人坚韧 (Dwarven Toughness)", 
        description: "你的最大生命值增加 1 点，并且每当你提升一级时，它会再次增加 1 点。" 
      },
      { 
        name: "石匠本能 (Stonecunning)", 
        description: "作为 1 个附赠动作，你可以获得 60 英尺范围的颤动感知，持续 10 分钟。你必须站在石头表面上或接触石头表面才能使用这种颤动感知。使用次数等于你的熟练加值（长休恢复）。" 
      }
    ]
  },
  {
    id: "elf-2024", 
    name: "精灵", 
    source: "官方规则", 
    description: "长得好看\n不用睡觉\n黑暗视觉\n魔法血统\n活得超久",
    fullDescription: "由神祇科瑞隆创造的第一批精灵能够随意改变形态。虽然后来失去了这种能力，但他们依然保持着超凡的优雅和长久的寿命（约750年）。",
    speed: 30, 
    size: "中型", 
    darkvision: true,
    traits: [
      { 
        name: "黑暗视觉", 
        description: "你拥有 60 英尺范围的黑暗视觉。" 
      },
      { 
        name: "精灵血统 (Elven Lineage)", 
        description: "选择以下血统之一：\n• **卓尔**: 黑暗视觉增至120尺。习得戏法【舞光术】。3级习得【妖火】，5级习得【黑暗术】。\n• **高等精灵**: 习得戏法【魔法伎俩】（每长休可更换为法师列表另一戏法）。3级习得【侦测魔法】，5级习得【迷踪步】。\n• **木精灵**: 速度增至35尺。习得戏法【德鲁伊戏法】。3级习得【大步奔行】，5级习得【行动无踪】。\n（以上法术施法关键属性为智力、感知或魅力，由你选择。）" 
      },
      { 
        name: "精类血统 (Fey Ancestry)", 
        description: "你在进行避免或结束魅惑状态的豁免检定时具有优势。" 
      },
      { 
        name: "敏锐感官 (Keen Senses)", 
        description: "你对洞悉、察觉或生存技能具有熟练（任选其一）。" 
      },
      { 
        name: "冥想 (Trance)", 
        description: "你不需要睡眠，魔法也不能使你入睡。花费 4 小时进行类似冥想的冥思即可完成长休。" 
      }
    ]
  },
  {
    id: "halfling-2024", 
    name: "半身人", 
    source: "官方规则", 
    description: "幸运女神私生子\n勇敢的心\n钻裤裆\n隐秘行动\n一日七餐",
    fullDescription: "被珍视并由重视生命、家园和炉火的神祇引导，半身人倾向于向田园诗般的避风港聚集。尽管如此，许多半身人拥有勇敢和冒险的精神。",
    speed: 30, 
    size: "小型", 
    darkvision: false,
    traits: [
      { 
        name: "勇敢 (Brave)", 
        description: "你在进行避免或结束恐惧状态的豁免检定时具有优势。" 
      },
      { 
        name: "半身人灵巧 (Halfling Nimbleness)", 
        description: "你可以移动到任何比你体型大一阶的生物的空间中，但你不能停留在同一空间。" 
      },
      { 
        name: "幸运 (Luck)", 
        description: "当你在 D20 检定中掷出 1 时，你可以重新掷骰，并且必须使用新的结果。" 
      },
      { 
        name: "天生隐匿 (Naturally Stealthy)", 
        description: "即使只有比你至少大一个体型的生物遮挡你，你也可以采取躲藏动作。" 
      }
    ]
  },
  {
    id: "dragonborn-2024", 
    name: "龙裔", 
    source: "官方规则", 
    description: "帅气龙头\n喷吐攻击\n属性抗性\n天生护甲\n龙翼飞行",
    fullDescription: "龙裔的祖先孵化自有色龙和金属龙的卵中。龙裔看起来像无翼的双足龙——鳞片覆盖、目光明亮、骨骼粗壮且头顶有角。",
    speed: 30, 
    size: "中型", 
    darkvision: true,
    traits: [
      { 
        name: "龙脉血统 (Draconic Ancestry)", 
        description: "你的血脉源自一种龙。这决定了你的喷吐武器伤害类型和抗性：\n• **酸**: 黑龙、赤铜龙\n• **电**: 蓝龙、青铜龙\n• **火**: 黄铜龙、金龙、红龙\n• **毒**: 绿龙\n• **冷**: 银龙、白龙" 
      },
      { 
        name: "吐息武器 (Breath Weapon)", 
        description: "攻击动作中，可替代一次攻击进行喷吐（15尺锥形或30尺直线）。敏捷豁免（DC 8+体质+熟练）。伤害为 1d10（5级2d10，11级3d10，17级4d10）。使用次数等于熟练加值（长休恢复）。" 
      },
      { 
        name: "伤害抗性", 
        description: "你对龙脉血统决定的伤害类型具有抗性。" 
      },
      { 
        name: "黑暗视觉", 
        description: "你拥有 60 英尺范围的黑暗视觉。" 
      },
      { 
        name: "龙翼飞行 (Draconic Flight)", 
        description: "5级解锁。附赠动作生出光能翅膀，持续10分钟。获得等于速度的飞行速度。使用后需长休恢复。" 
      }
    ]
  },
  {
    id: "gnome-2024", 
    name: "侏儒", 
    source: "官方规则", 
    description: "魔法抗性\n聪明绝顶\n个子小小\n黑暗视觉\n发明创造",
    fullDescription: "侏儒是由发明、幻术和地下生活的神祇创造的魔法生物。他们拥有大眼睛和尖耳朵，平均寿命约425年。",
    speed: 30, 
    size: "小型", 
    darkvision: true,
    traits: [
      { 
        name: "黑暗视觉", 
        description: "你拥有 60 英尺范围的黑暗视觉。" 
      },
      { 
        name: "侏儒机敏 (Gnomish Cunning)", 
        description: "你在智力、感知和魅力的豁免检定上具有优势。" 
      },
      { 
        name: "侏儒血统 (Gnomish Lineage)", 
        description: "选择以下血统之一：\n• **森林侏儒**: 习得【次级幻影】戏法。始终准备【动物交谈】（可免费施展次数=熟练加值）。\n• **岩侏儒**: 习得【修复术】和【魔法伎俩】。可花费10分钟制作微型机械装置（玩具、火种、音乐盒），同时可拥有3个。" 
      }
    ]
  },
  {
    id: "orc-2024", 
    name: "兽人", 
    source: "官方规则", 
    description: "坚韧不屈\n锁血挂\n附赠疾走\n黑暗视觉\n肌肉莽夫",
    fullDescription: "兽人将自己的起源追溯到强大的神祇格鲁姆什。他们身材高大魁梧，拥有灰色的皮肤和尖锐的耳朵。",
    speed: 30, 
    size: "中型", 
    darkvision: true,
    traits: [
      { 
        name: "肾上腺素激增 (Adrenaline Rush)", 
        description: "附赠动作进行疾走。获得等于熟练加值的临时生命值。使用次数等于熟练加值（短休/长休恢复）。" 
      },
      { 
        name: "黑暗视觉", 
        description: "你拥有 120 英尺范围的黑暗视觉。" 
      },
      { 
        name: "顽强耐力 (Relentless Endurance)", 
        description: "当你被削减至 0 生命值但没有直接死亡时，你可以改为降至 1 点生命值。每长休一次。" 
      }
    ]
  },
  {
    id: "tiefling-2024", 
    name: "提夫林", 
    source: "官方规则", 
    description: "地狱血统\n火焰抗性\n自带法术\n黑暗视觉\n魅力反派脸",
    fullDescription: "提夫林通过血脉与恶魔、魔鬼或其他邪魔相连。这种联系构成了提夫林的邪魔遗赠。",
    speed: 30, 
    size: "中型或小型", 
    darkvision: true,
    traits: [
      { 
        name: "黑暗视觉", 
        description: "你拥有 60 英尺范围的黑暗视觉。" 
      },
      { 
        name: "异界存在 (Otherworldly Presence)", 
        description: "你习得戏法【奇术】。" 
      },
      { 
        name: "邪魔遗赠 (Fiendish Legacy)", 
        description: "选择一种遗赠（施法属性为智/感/魅）：\n• **深渊**: 毒素抗性。习得【毒气喷溅】。3级【致病射线】，5级【人类定身术】。\n• **地渊**: 黯蚀抗性。习得【冻寒之触】。3级【虚假生命】，5级【衰弱射线】。\n• **地狱**: 火焰抗性。习得【火焰箭】。3级【炼狱叱喝】，5级【黑暗术】。" 
      }
    ]
  },
  {
    id: "goliath-2024", 
    name: "歌利亚", 
    source: "官方规则", 
    description: "变身巨人\n伤害减免\n搬运工\n运动健将\n巨人后裔",
    fullDescription: "歌利亚比大多数人高大，他们是远古巨人的后代。每个歌利亚都承袭了最初巨人的恩惠。",
    speed: 35, 
    size: "中型", 
    darkvision: false,
    traits: [
      { 
        name: "巨人血统 (Giant Ancestry)", 
        description: "选择一种恩惠（次数=熟练加值，长休恢复）：\n• **云巨人**: 附赠动作传送30尺。\n• **火巨人**: 攻击命中额外造成 1d10 火焰伤害。\n• **霜巨人**: 攻击命中额外造成 1d6 冷冻伤害并减速10尺。\n• **丘陵巨人**: 攻击命中可击倒大型或更小生物。\n• **石巨人**: 反应减少 1d12+体质 的伤害。\n• **风暴巨人**: 反应对攻击者造成 1d8 雷鸣伤害。" 
      },
      { 
        name: "大型形态 (Large Form)", 
        description: "5级解锁。附赠动作变身为大型体型，持续10分钟。力量检定优势，速度增加10尺。每长休一次。" 
      },
      { 
        name: "强健体魄 (Powerful Build)", 
        description: "结束擒抱的豁免优势。负重能力视为大一个体型。" 
      }
    ]
  },
  {
    id: "aasimar-2024", 
    name: "阿斯莫", 
    source: "官方规则", 
    description: "天界血统\n自带回血\n光环变身\n圣光普照\n黑暗视觉",
    fullDescription: "阿斯莫是灵魂中携带着上层位面火花的凡人。无论是源自天使般的存在还是被注入了天界的力量，他们都能激发这种火花。",
    speed: 30, 
    size: "中型或小型", 
    darkvision: true,
    traits: [
      { 
        name: "天界抗性", 
        description: "你对黯蚀伤害和光耀伤害具有抗性。" 
      },
      { 
        name: "黑暗视觉", 
        description: "你拥有 60 英尺范围的黑暗视觉。" 
      },
      { 
        name: "治疗之手 (Healing Hands)", 
        description: "魔法动作。触摸生物恢复 HP，数值为熟练加值个 d4。每长休一次。" 
      },
      { 
        name: "光明承载者 (Light Bearer)", 
        description: "你习得戏法【光亮术】。魅力是施法属性。" 
      },
      { 
        name: "天界启示 (Celestial Revelation)", 
        description: "3级解锁。附赠动作变身（1分钟，每长休一次）。变身期间每回合一次攻击或法术造成额外伤害（等于熟练加值）。\n变身选项：\n• **天国之翼**: 获得飞行速度，额外伤害为光耀。\n• **内在光辉**: 发出光亮。回合结束周围10尺生物受光耀伤害（等于熟练加值）。额外伤害为光耀。\n• **死灵斗篷**: 10尺内敌对生物需进行魅力豁免否则恐慌。额外伤害为黯蚀。" 
      }
    ]
  }
];
