
import { SpellItem } from './types';

export const SPELL_DB_LEVEL_8: SpellItem[] = [
  {
    id: "animal-shapes", name: "动物形态", source: "官方规则",
    level: 8, school: "变化", castingTime: "动作", range: "30 尺", components: "V, S", duration: "24 小时",
    classes: ["德鲁伊"],
    description: "选择施法距离内任意数量的自愿生物。将每个目标变形为 CR 4 或以下的大型或更小野兽（可以不同）。保留心智属性。获得等于野兽生命值的临时生命值。之后的回合可用魔法动作再次变形。"
  },
  {
    id: "antimagic-field", name: "反魔法场", source: "官方规则",
    level: 8, school: "防护", castingTime: "动作", range: "自身 (10 尺)", components: "V, S, M (铁粉)", duration: "专注，至多 1 小时",
    classes: ["牧师", "法师"],
    description: "10 尺光环内压制魔法。无法施法，魔法物品失效，持续中的法术被压制。传送和位面旅行无法进出。解除魔法对灵光无效。"
  },
  {
    id: "antipathy-sympathy", name: "嫌恶术/关怀术", source: "官方规则",
    level: 8, school: "惑控", castingTime: "1 小时", range: "60 尺", components: "V, S, M (醋和蜂蜜)", duration: "10 天",
    classes: ["吟游诗人", "德鲁伊", "法师"],
    description: "使目标吸引或排斥特定类型的生物。进入 120 尺内的指定类型生物需进行感知豁免。\n• **嫌恶术**: 失败则恐慌，必须远离。\n• **关怀术**: 失败则魅惑，必须靠近。\n受影响生物离开 120 尺后可尝试豁免。"
  },
  {
    id: "befuddlement", name: "摧心术", source: "官方规则",
    level: 8, school: "惑控", castingTime: "动作", range: "150 尺", components: "V, S, M (钥匙圈)", duration: "立即",
    classes: ["吟游诗人", "德鲁伊", "魔契师", "法师"],
    description: "爆破目标心灵。进行智力豁免，失败受 10d12 心灵伤害，且无法施法或执行魔法动作。成功受半伤。\n受术生物每 30 日可重试豁免。"
  },
  {
    id: "clone", name: "克隆术", source: "官方规则",
    level: 8, school: "死灵", castingTime: "1 小时", range: "触碰", components: "V, S, M (1000GP 钻石, 2000GP 容器)", duration: "立即",
    classes: ["法师"],
    description: "培养一个躯体的克隆，120 天成熟。本体死亡时，若灵魂自由且愿意，则转移至克隆体复活（拥有相同记忆和能力）。"
  },
  {
    id: "control-weather", name: "操控天气", source: "官方规则",
    level: 8, school: "变化", castingTime: "10 分钟", range: "自身 (5 里)", components: "V, S, M (熏香)", duration: "专注，至多 8 小时",
    classes: ["牧师", "德鲁伊", "法师"],
    description: "必须在户外。改变天气状况（降水、气温、风势）。改变需要 1d4x10 分钟生效。"
  },
  {
    id: "demiplane", name: "半位面", source: "官方规则",
    level: 8, school: "咒法", castingTime: "动作", range: "60 尺", components: "S", duration: "1 小时",
    classes: ["术士", "魔契师", "法师"],
    description: "创造一扇通往 30 尺立方半位面的门。可以是新位面或连接到已知旧位面。法术结束时门消失。"
  },
  {
    id: "dominate-monster", name: "支配怪物", source: "官方规则",
    level: 8, school: "惑控", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 1 小时",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "支配一个生物。目标进行感知豁免，失败则被魅惑并服从精神命令。\n**升环施法**: 九环持续 8 小时。"
  },
  {
    id: "earthquake", name: "地震术", source: "官方规则",
    level: 8, school: "变化", castingTime: "动作", range: "500 尺", components: "V, S, M (碎岩)", duration: "专注，至多 1 分钟",
    classes: ["牧师", "德鲁伊", "术士"],
    description: "100 尺半径区域地震，视为困难地形。生物需体质豁免否则倒地且专注中断。\n**裂缝**: 1d6 条，坠入需敏捷豁免。\n**建筑**: 每回合受 50 钝击伤害，崩塌时附近生物需敏捷豁免（12d6 钝击+倒地+掩埋）。"
  },
  {
    id: "glibness", name: "花言巧语", source: "官方规则",
    level: 8, school: "惑控", castingTime: "动作", range: "自身", components: "V", duration: "1 小时",
    classes: ["吟游诗人", "魔契师"],
    description: "魅力检定掷骰结果若低于 15 则视为 15。魔法测谎总是显示为真话。"
  },
  {
    id: "holy-aura", name: "圣洁灵光", source: "官方规则",
    level: 8, school: "防护", castingTime: "动作", range: "自身 (30 尺)", components: "V, S, M (1000GP 圣物箱)", duration: "专注，至多 1 分钟",
    classes: ["牧师"],
    description: "30 尺光环。盟友豁免优势，对盟友攻击劣势。邪魔/亡灵近战击中盟友需体质豁免，失败则目盲。"
  },
  {
    id: "incendiary-cloud", name: "焚云术", source: "官方规则",
    level: 8, school: "咒法", castingTime: "动作", range: "150 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "术士", "法师"],
    description: "20 尺半径烟云，重度遮蔽。进入或开始回合受 10d8 火焰伤害（敏捷豁免半伤）。云体每回合远离你移动 10 尺。"
  },
  {
    id: "maze", name: "迷宫术", source: "官方规则",
    level: 8, school: "咒法", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["法师"],
    description: "将生物放逐到半位面迷宫。无豁免。目标可用动作进行 DC 20 智力（调查）检定，成功则逃脱。"
  },
  {
    id: "mind-blank", name: "心灵屏障", source: "官方规则",
    level: 8, school: "防护", castingTime: "动作", range: "触碰", components: "V, S", duration: "24 小时",
    classes: ["吟游诗人", "法师"],
    description: "目标免疫心灵伤害、魅惑、情绪感知、读心、预言定位。甚至能阻挡祈愿术的侦测。"
  },
  {
    id: "power-word-stun", name: "律令震慑", source: "官方规则",
    level: 8, school: "惑控", castingTime: "动作", range: "60 尺", components: "V", duration: "立即",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "压垮心灵。若目标生命值不超过 150 点，则陷入震慑。每回合结束可进行体质豁免解除。"
  },
  {
    id: "sunburst", name: "阳炎爆", source: "官方规则",
    level: 8, school: "塑能", castingTime: "动作", range: "150 尺", components: "V, S, M (太阳石)", duration: "立即",
    classes: ["牧师", "德鲁伊", "术士", "法师"],
    description: "60 尺半径爆发。体质豁免，失败受 12d6 光耀伤害并目盲 1 分钟。成功半伤不目盲。驱散黑暗。"
  },
  {
    id: "telepathy", name: "心灵感应", source: "官方规则",
    level: 8, school: "预言", castingTime: "动作", range: "无限", components: "V, S, M (银连环)", duration: "24 小时",
    classes: ["法师"],
    description: "与同一位面的熟识生物建立心灵连接。可无视距离即时共享感官信息和交流。"
  },
  {
    id: "tsunami", name: "海啸术", source: "官方规则",
    level: 8, school: "咒法", castingTime: "1 分钟", range: "1 里", components: "V, S", duration: "专注，至多 6 轮",
    classes: ["德鲁伊"],
    description: "召唤巨大的水墙（300x300x50 尺）。触及需力量豁免，失败受 6d10 钝击伤害并被卷走。每回合伤害递减 1d10。"
  }
];
