
import { SpellItem } from './types';

export const SPELL_DB_LEVEL_9: SpellItem[] = [
  {
    id: "astral-projection", name: "星界投影", source: "官方规则",
    level: 9, school: "死灵", castingTime: "1 小时", range: "10 尺", components: "V, S, M (每人1000GP红锆石+100GP银棒)", duration: "直到被解除",
    classes: ["牧师", "魔契师", "法师"],
    description: "你和至多八名自愿生物将星界躯体投影到星光位面。本体留在原地静止（不需饮食、不衰老）。星界躯体通过银线与本体连接。若银线切断，两者皆死。离开星光位面时，本体会被传送过去。"
  },
  {
    id: "foresight", name: "预见术", source: "官方规则",
    level: 9, school: "预言", castingTime: "1 分钟", range: "触碰", components: "V, S, M (蜂鸟羽毛)", duration: "8 小时",
    classes: ["吟游诗人", "德鲁伊", "魔契师", "法师"],
    description: "触碰一名自愿生物，授予其预见能力。目标进行的所有 D20 检定均具有优势，其他生物对其进行的攻击检定具有劣势。"
  },
  {
    id: "gate", name: "异界之门", source: "官方规则",
    level: 9, school: "咒法", castingTime: "动作", range: "60 尺", components: "V, S, M (5000GP 钻石)", duration: "专注，至多 1 分钟",
    classes: ["牧师", "术士", "魔契师", "法师"],
    description: "召唤一扇连接不同位面准确地点的传送门（直径 5-20 尺）。可透过传送门看见目的地。穿过正面可进行旅行。\n施法时可呼唤特定生物名字，将其拉至你这一侧（无控制权）。神祇可阻止传送门在其领域开启。"
  },
  {
    id: "imprisonment", name: "禁锢术", source: "官方规则",
    level: 9, school: "防护", castingTime: "1 分钟", range: "30 尺", components: "V, S, M (5000GP 相关雕像)", duration: "直至解除",
    classes: ["魔契师", "法师"],
    description: "禁锢一个生物（感知豁免）。成功则免疫 24 小时。失败则被永久监禁（不衰老/不需饮食/防预言）。\n选择一种形式：**埋葬**（地底力场）、**锁链**（束缚）、**避世监牢**（半位面）、**微缩牢笼**（宝石中）、**沉睡**（昏迷）。\n需设定一个解除条件。"
  },
  {
    id: "mass-heal", name: "群体医疗术", source: "官方规则",
    level: 9, school: "防护", castingTime: "动作", range: "60 尺", components: "V, S", duration: "立即",
    classes: ["牧师"],
    description: "恢复总计 700 点生命值，分配给任意数量的生物。同时移除目盲、耳聋、中毒状态。"
  },
  {
    id: "meteor-swarm", name: "流星爆", source: "官方规则",
    level: 9, school: "塑能", castingTime: "动作", range: "1 里", components: "V, S", duration: "立即",
    classes: ["术士", "法师"],
    description: "四个炽热焰球坠落（40 尺半径）。生物进行敏捷豁免，失败受 20d6 火焰 + 20d6 钝击伤害，成功半伤。点燃物品。"
  },
  {
    id: "power-word-heal", name: "律令医疗", source: "官方规则",
    level: 9, school: "惑控", castingTime: "动作", range: "60 尺", components: "V", duration: "立即",
    classes: ["吟游诗人", "牧师"],
    description: "目标恢复所有生命值。移除魅惑、恐慌、麻痹、中毒、震慑状态。若倒地可起身。"
  },
  {
    id: "power-word-kill", name: "律令死亡", source: "官方规则",
    level: 9, school: "惑控", castingTime: "动作", range: "60 尺", components: "V", duration: "立即",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "若目标生命值 <= 100，立即死亡。否则受到 12d12 心灵伤害。"
  },
  {
    id: "prismatic-wall", name: "虹光法墙", source: "官方规则",
    level: 9, school: "防护", castingTime: "动作", range: "60 尺", components: "V, S", duration: "10 分钟",
    classes: ["吟游诗人", "法师"],
    description: "创造一道多层光墙（90x30尺 或 30尺球体）。发出强光。靠近者体质豁免失败则目盲。\n穿过墙壁需逐层豁免（红橙黄绿蓝靛紫），造成大量伤害或特殊状态（石化/传送）。各层需特定方式摧毁。"
  },
  {
    id: "shapechange", name: "形体变化", source: "官方规则",
    level: 9, school: "变化", castingTime: "动作", range: "自身", components: "V, S, M (1500GP 玉环)", duration: "专注，至多 1 小时",
    classes: ["德鲁伊", "法师"],
    description: "变形为 CR 不高于你等级的生物（非构装/亡灵）。保留心智属性、职业特性等。获得新形态生命值的临时生命值。每回合可用魔法动作改变形态。"
  },
  {
    id: "storm-of-vengeance", name: "复仇风暴", source: "官方规则",
    level: 9, school: "咒法", castingTime: "动作", range: "1 里", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊"],
    description: "300 尺半径风暴。初次体质豁免失败受 2d6 雷鸣并耳聋。\n每回合产生不同效应：\n2. 酸雨 (4d6 强酸)\n3. 闪电 (10d6, 敏捷豁免半伤)\n4. 冰雹 (2d6 钝击)\n5-10. 冰雨狂风 (1d6 寒冷, 困难地形, 遮蔽, 禁远程)"
  },
  {
    id: "time-stop", name: "时间停止", source: "官方规则",
    level: 9, school: "变化", castingTime: "动作", range: "自身", components: "V", duration: "立即",
    classes: ["术士", "法师"],
    description: "你获得额外 1d4+1 个回合。期间对他人时间静止。若你影响其他生物或其物品，或移动超过 1000 尺，法术提前结束。"
  },
  {
    id: "true-polymorph", name: "完全变形术", source: "官方规则",
    level: 9, school: "变化", castingTime: "动作", range: "30 尺", components: "V, S, M (一滴汞等)", duration: "专注，至多 1 小时",
    classes: ["吟游诗人", "魔契师", "法师"],
    description: "将生物变生物、物件变生物、或生物变物件。若专注满 1 小时则永久生效（直至解除）。\n• **生物变生物**: CR 不高于原身。获得新形态 HP 的临时生命。\n• **物件变生物**: CR <= 9。\n• **生物变物件**: 失去记忆和感知。"
  },
  {
    id: "true-resurrection", name: "完全复生术", source: "官方规则",
    level: 9, school: "死灵", castingTime: "1 小时", range: "触碰", components: "V, S, M (25000GP 钻石)", duration: "立即",
    classes: ["牧师", "德鲁伊"],
    description: "复活死亡不超过 200 年的生物（非老死）。生命值全满，治愈所有伤病诅咒，修复身体部位。甚至可以在无遗体情况下重塑身体（需知真名）。"
  },
  {
    id: "weird", name: "怪影杀手", source: "官方规则",
    level: 9, school: "幻术", castingTime: "动作", range: "120 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["魔契师", "法师"],
    description: "30 尺半径球状区域。生物进行感知豁免，失败受 10d10 心灵伤害并恐慌。每回合结束重试豁免，再次失败受 5d10 心灵伤害。"
  },
  {
    id: "wish", name: "祈愿术", source: "官方规则",
    level: 9, school: "咒法", castingTime: "动作", range: "自身", components: "V", duration: "立即",
    classes: ["术士", "法师"],
    description: "凡人最强法术。\n• **模仿法术**: 无需成分施展任意 8 环或以下法术。\n• **其它效应**: 创造 25000GP 物品、群体全回复、永久抗性、法术免疫、替换专长、重掷现实等。\n除了模仿法术外，施展此法术会使你极其虚弱（力量降为 3，施法受伤害），且有 33% 概率永远失去施展祈愿术的能力。"
  }
];
