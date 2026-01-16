
import { SpellItem } from './types';

export const SPELL_DB_LEVEL_7: SpellItem[] = [
  {
    id: "conjure-celestial", name: "咒唤圣光", source: "官方规则",
    level: 7, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["牧师"],
    description: "你将来自上层位面的精魂咒唤，表现为半径 10 尺、高 40 尺的光之立柱。对位于区域内的生物，分别选择下列哪种光芒照耀于它：\n• **治愈之光**: 目标恢复等于 4d12+你的施法属性调整值 的生命值。\n• **惩戒之光**: 目标进行一次敏捷豁免，失败受 6d12 光耀伤害，成功半伤。\n**升环施法**: 使用的法术位每比七环高一环，治疗和伤害就增加 1d12。"
  },
  {
    id: "delayed-blast-fireball", name: "延迟爆裂火球", source: "官方规则",
    level: 7, school: "塑能", castingTime: "动作", range: "150 尺", components: "V, S, M (蝙蝠粪和硫磺小球)", duration: "专注，至多 1 分钟",
    classes: ["术士", "法师"],
    description: "一束黄光凝结成一颗珠子。法术终止时炸裂，半径 20 尺球状区域内的生物进行敏捷豁免。失败者承受累积的火焰伤害，成功半伤。\n基础伤害为 12d6，若在你回合结束时法术尚未终止，则伤害增加 1d6。珠子可被捡起并抛出（需敏捷豁免）。\n**升环施法**: 基础伤害提高 1d6。"
  },
  {
    id: "divine-word", name: "圣言术", source: "官方规则",
    level: 7, school: "塑能", castingTime: "附赠动作", range: "30 尺", components: "V", duration: "立即",
    classes: ["牧师"],
    description: "你吟诵一句充盈上层位面力量的箴言。施法距离内指定生物进行魅力豁免。失败者若生命值低于 50，则承受以下效应。无论生命值如何，失败的天族、元素、妖精、邪魔均会被遣送回起源位面。\n\n| 生命值 | 效应 |\n|---|---|\n| 0~20 | 目标死亡 |\n| 21~30 | 目盲、耳聋、震慑 (1小时) |\n| 31~40 | 目盲、耳聋 (10分钟) |\n| 41~50 | 耳聋 (1分钟) |"
  },
  {
    id: "etherealness", name: "以太化", source: "官方规则",
    level: 7, school: "咒法", castingTime: "动作", range: "自身", components: "V, S", duration: "至多 8 小时",
    classes: ["吟游诗人", "牧师", "术士", "魔契师", "法师"],
    description: "你进入以太边界。你可以向任意方向移动（上下移动每尺消耗额外一尺移动力）。你可以观察原位面（60 尺，灰度）。不在以太位面的生物无法察觉你。\n**升环施法**: 八环可指定至多 3 名生物；九环至多 6 名。"
  },
  {
    id: "finger-of-death", name: "死亡一指", source: "官方规则",
    level: 7, school: "死灵", castingTime: "动作", range: "60 尺", components: "V, S", duration: "立即",
    classes: ["术士", "魔契师", "法师"],
    description: "你释放负能量。目标进行体质豁免，失败受 7d8+30 点暗蚀伤害，成功半伤。被杀死的类人生物在下一回合开始时被唤起为受你操控的丧尸。"
  },
  {
    id: "fire-storm", name: "火焰风暴", source: "官方规则",
    level: 7, school: "塑能", castingTime: "动作", range: "150 尺", components: "V, S", duration: "立即",
    classes: ["牧师", "德鲁伊", "术士"],
    description: "风暴由至多十个 10 尺立方区域组成（需相连）。区域内生物进行敏捷豁免，失败受 7d10 火焰伤害，成功半伤。未被着装或携带的可燃物件会燃烧。"
  },
  {
    id: "forcecage", name: "力场监牢", source: "官方规则",
    level: 7, school: "塑能", castingTime: "动作", range: "100 尺", components: "V, S, M (价值1500GP+的红宝石尘)", duration: "专注，至多 1 小时",
    classes: ["吟游诗人", "魔契师", "法师"],
    description: "你构筑一个固定的立方状隐形监牢（20 尺笼状或 10 尺盒状）。牢笼内的生物不能以非魔法手段离开。传送或跨位面旅行需先进行魅力豁免。法术无法被解除魔法解除。"
  },
  {
    id: "mirage-arcane", name: "海市蜃楼", source: "官方规则",
    level: 7, school: "幻术", castingTime: "10 分钟", range: "视野", components: "V, S", duration: "10 日",
    classes: ["吟游诗人", "德鲁伊", "法师"],
    description: "你使至多 1 里方形区域内的地形在感官（视/听/嗅/触）上都像是另一种地形。你可以改变建筑物外观，甚至改变地形的通畅程度（如变为空难地形）。拥有真实视觉的生物可看穿幻术，但仍可与幻象进行物理互动。"
  },
  {
    id: "mordenkainens-magnificent-mansion", name: "魔邓肯豪宅术", source: "官方规则",
    level: 7, school: "咒法", castingTime: "1 分钟", range: "300 尺", components: "V, S, M (价值15GP+的微缩模型门)", duration: "24 小时",
    classes: ["吟游诗人", "法师"],
    description: "你召唤一扇通往异次元居所的门。居所内有至多 50 个房间，食物充足，且有一组 100 名隐形仆从服侍。法术终止时，所有生物和物件被移出。"
  },
  {
    id: "mordenkainens-sword", name: "魔邓肯之剑", source: "官方规则",
    level: 7, school: "塑能", castingTime: "动作", range: "90 尺", components: "V, S, M (价值250GP+的微缩模型剑)", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "法师"],
    description: "你创造出一个悬浮的灵体剑刃。你可以对 5 尺内的目标进行近战法术攻击，造成 4d12+施法属性调整值 点力场伤害。后续回合可以附赠动作移动剑并再次攻击。"
  },
  {
    id: "plane-shift", name: "位面转移", source: "官方规则",
    level: 7, school: "咒法", castingTime: "动作", range: "触碰", components: "V, S, M (价值250GP+的调谐金属棒)", duration: "立即",
    classes: ["牧师", "德鲁伊", "术士", "魔契师", "法师"],
    description: "你和至多八名自愿生物被转移到一个不同的存在位面。你可以指定概括的目的地或特定的传送法阵。"
  },
  {
    id: "power-word-fortify", name: "律令巩固", source: "官方规则",
    level: 7, school: "惑控", castingTime: "动作", range: "60 尺", components: "V", duration: "立即",
    classes: ["吟游诗人", "牧师"],
    description: "你增强至多六名生物的防御。赋予受术者共计 120 点临时生命值，由你在受术者中任意分配。"
  },
  {
    id: "prismatic-spray", name: "虹光喷射", source: "官方规则",
    level: 7, school: "塑能", castingTime: "动作", range: "自身 (60 尺锥形)", components: "V, S", duration: "立即",
    classes: ["吟游诗人", "术士", "法师"],
    description: "八条光线作用于 60 尺锥形范围。每名生物进行敏捷豁免。掷 1d8 决定射线种类：\n1. **红**: 12d6 火焰\n2. **橙**: 12d6 强酸\n3. **黄**: 12d6 闪电\n4. **绿**: 12d6 毒素\n5. **蓝**: 12d6 寒冷\n6. **靛**: 束缚，三次体质豁免失败则石化\n7. **紫**: 目盲，感知豁免失败则位面传送\n8. **特殊**: 被两道射线击中 (重掷两次)"
  },
  {
    id: "project-image", name: "投影术", source: "官方规则",
    level: 7, school: "幻术", castingTime: "动作", range: "500 里", components: "V, S, M (价值5GP+的自塑像)", duration: "专注，至多 1 日",
    classes: ["吟游诗人", "法师"],
    description: "你创造一个自己的幻象分身。你可以通过分身视物和聆听。用一个魔法动作，你能使分身移动至多 60 尺并模仿你的举止。幻象受伤害时消失。"
  },
  {
    id: "regenerate", name: "再生术", source: "官方规则",
    level: 7, school: "变化", castingTime: "1 分钟", range: "触碰", components: "V, S, M (一个转经筒)", duration: "1 小时",
    classes: ["吟游诗人", "牧师", "德鲁伊"],
    description: "一名生物恢复 4d8+15 点生命值。在持续时间内，每回合开始恢复 1 点生命值，且失去的身体部位将在 2 分钟后重新长出。"
  },
  {
    id: "resurrection", name: "复生术", source: "官方规则",
    level: 7, school: "死灵", castingTime: "1 小时", range: "触碰", components: "V, S, M (价值1000GP+的钻石)", duration: "立即",
    classes: ["吟游诗人", "牧师"],
    description: "触碰一名已死（不超过 100 年，非老死，非亡灵）的生物使其回生。生物生命值全满，治愈致命伤和恢复身体部位。目标受 -4 检定减值（每长休减 1）。复活死于 1 年前的生物会使你力竭。"
  },
  {
    id: "reverse-gravity", name: "反转重力", source: "官方规则",
    level: 7, school: "变化", castingTime: "动作", range: "100 尺", components: "V, S, M (磁石和铁屑)", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "术士", "法师"],
    description: "创造半径 50 尺、高 100 尺的重力反转柱状区域。未固定生物和物件向上坠落。生物可进行敏捷豁免抓住固定物。撞到顶端受跌落伤害并悬浮。"
  },
  {
    id: "sequester", name: "隔离术", source: "官方规则",
    level: 7, school: "变化", castingTime: "动作", range: "触碰", components: "V, S, M (价值5000GP+宝石粉尘)", duration: "直至被解除",
    classes: ["法师"],
    description: "目标具有隐形状态，不会被预言系法术发现。若为生物，则进入静滞（失能、不衰老）。你可以设置一个触发条件来结束法术。"
  },
  {
    id: "simulacrum", name: "拟像术", source: "官方规则",
    level: 7, school: "幻术", castingTime: "12 小时", range: "触碰", components: "V, S, M (价值1500GP+的红宝石粉)", duration: "直至被解除",
    classes: ["法师"],
    description: "你创造一个野兽或类人生物的冰雪拟像。拟像拥有本体数据（HP为一半），无法学习或升级，不能施展拟像术。拟像受损需在实验室修理（100GP/1HP）。"
  },
  {
    id: "symbol", name: "徽记术", source: "官方规则",
    level: 7, school: "防护", castingTime: "1 分钟", range: "触碰", components: "V, S, M (价值1000GP+的钻石粉)", duration: "直至被解除或触发",
    classes: ["吟游诗人", "牧师", "德鲁伊", "法师"],
    description: "刻下一个伤害性符纹（可设定触发条件）。触发后影响 60 尺球状区域 10 分钟。选择一种效应：\n• **死亡**: 10d10 暗蚀伤害 (体质豁免半伤)\n• **争斗**: 争吵，攻击/检定劣势 (感知豁免)\n• **恐惧**: 恐慌 1 分钟 (感知豁免)\n• **痛苦**: 失能 1 分钟 (体质豁免)\n• **睡眠**: 昏迷 10 分钟 (感知豁免)\n• **震慑**: 震慑 1 分钟 (感知豁免)"
  },
  {
    id: "teleport", name: "传送术", source: "官方规则",
    level: 7, school: "咒法", castingTime: "动作", range: "10 尺", components: "V", duration: "立即",
    classes: ["吟游诗人", "术士", "法师"],
    description: "将你和至多 8 名生物转移至同位面的目的地。成功率取决于熟悉程度：\n\n| 熟悉程度 | 遇难 | 相似 | 偏离 | 抵达 |\n|---|---|---|---|---|\n| 永久法阵/物件 | - | - | - | 100% |\n| 非常熟悉 | 01-05 | 06-13 | 14-24 | 25-00 |\n| 偶尔见过 | 01-33 | 34-43 | 44-53 | 54-00 |\n| 看过一次 | 01-43 | 44-53 | 54-73 | 74-00 |\n| 查无此地 | 01-50 | 51-00 | - | - |"
  }
];
