
import { ItemItem } from '../types';

// Helper for repeated descriptions
const MASTERY_DESC = {
  Slow: "**缓速 (Slow)**: 当你用这把武器命中了一个生物并造成伤害时，你可以将对方的速度减少 10 尺，持续至你的下一回合开始。如果该生物被拥有缓速词条的武器多次命中，其速度削减量也不会因此超过 10 尺。",
  Nick: "**迅击 (Nick)**: 当你发动由轻型词条所提供的额外的攻击时，你可以将这次攻击作为攻击动作的一部分，而非附赠动作。你每回合只能使用一次该能力。",
  Vex: "**侵扰 (Vex)**: 攻击命中后，你对该目标进行的下一次攻击检定具有优势。",
  Push: "**推离 (Push)**: 当你用这把武器命中了一个生物时，如果该生物的体型不超过大型，则你可以将这个生物从你身边直线推离至多 10 尺。",
  Sap: "**削弱 (Sap)**: 攻击命中后，目标在它的下个回合开始前的下一次攻击检定具有劣势。",
  Cleave: "**横扫 (Cleave)**: 当你用这把武器进行近战攻击命中了一个生物时，你可以对位于该生物 5 尺内且同样位于你触及内的另一个生物发动一次攻击。你为针对第二个生物的攻击进行伤害掷骰，但除非该伤害掷骰为负数，否则不加入你的属性调整值。",
  Graze: "**擦掠 (Graze)**: 当你以这把武器对一个生物发动的攻击检定失手时，你仍可以对目标生物造成一定伤害。其数额等同于此次攻击所使用的属性调整值。该伤害类型与武器造成的伤害类型一致。",
  Topple: "**失衡 (Topple)**: 当你用这把武器命中了一个生物时，你可以迫使该生物进行一次体质豁免（DC 8 + 你的属性调整值 + 你的熟练加值）。豁免失败则该生物陷入倒地状态。",
};

export const WEAPON_DB: ItemItem[] = [
  // --- Simple Melee Weapons ---
  {
    id: "club-2024", name: "短棒", source: "官方规则", type: "武器",
    description: "简单的木棍。",
    cost: "1 SP", weight: "2 磅",
    damage: "1d4", damageType: "钝击", properties: ["轻型"],
    mastery: MASTERY_DESC.Slow,
    tags: ["简易武器", "近战"]
  },
  {
    id: "dagger-2024", name: "匕首", source: "官方规则", type: "武器",
    description: "一把短小的利刃。",
    cost: "2 GP", weight: "1 磅",
    damage: "1d4", damageType: "穿刺", properties: ["灵巧", "轻型", "投掷 (20/60)"],
    mastery: MASTERY_DESC.Nick,
    tags: ["简易武器", "近战"]
  },
  {
    id: "greatclub-2024", name: "巨棒", source: "官方规则", type: "武器",
    description: "巨大的双手木棒。",
    cost: "2 SP", weight: "10 磅",
    damage: "1d8", damageType: "钝击", properties: ["双手"],
    mastery: MASTERY_DESC.Push,
    tags: ["简易武器", "近战"]
  },
  {
    id: "handaxe-2024", name: "手斧", source: "官方规则", type: "武器",
    description: "适合投掷的小斧头。",
    cost: "5 GP", weight: "2 磅",
    damage: "1d6", damageType: "挥砍", properties: ["轻型", "投掷 (20/60)"],
    mastery: MASTERY_DESC.Vex,
    tags: ["简易武器", "近战"]
  },
  {
    id: "javelin-2024", name: "标枪", source: "官方规则", type: "武器",
    description: "轻型的投掷长矛。",
    cost: "5 SP", weight: "2 磅",
    damage: "1d6", damageType: "穿刺", properties: ["投掷 (30/120)"],
    mastery: MASTERY_DESC.Slow,
    tags: ["简易武器", "近战"]
  },
  {
    id: "light-hammer-2024", name: "轻锤", source: "官方规则", type: "武器",
    description: "轻便的钝器。",
    cost: "2 GP", weight: "2 磅",
    damage: "1d4", damageType: "钝击", properties: ["轻型", "投掷 (20/60)"],
    mastery: MASTERY_DESC.Nick,
    tags: ["简易武器", "近战"]
  },
  {
    id: "mace-2024", name: "硬头锤", source: "官方规则", type: "武器",
    description: "带有金属头的短柄锤。",
    cost: "5 GP", weight: "4 磅",
    damage: "1d6", damageType: "钝击", properties: [],
    mastery: MASTERY_DESC.Sap,
    tags: ["简易武器", "近战"]
  },
  {
    id: "quarterstaff-2024", name: "长棍", source: "官方规则", type: "武器",
    description: "简单的长木棍。",
    cost: "2 SP", weight: "4 磅",
    damage: "1d6", damageType: "钝击", properties: ["多用 (1d8)"],
    mastery: MASTERY_DESC.Topple,
    tags: ["简易武器", "近战"]
  },
  {
    id: "sickle-2024", name: "镰刀", source: "官方规则", type: "武器",
    description: "弯曲的农具刃。",
    cost: "1 GP", weight: "2 磅",
    damage: "1d4", damageType: "挥砍", properties: ["轻型"],
    mastery: MASTERY_DESC.Nick,
    tags: ["简易武器", "近战"]
  },
  {
    id: "spear-2024", name: "矛", source: "官方规则", type: "武器",
    description: "可以投掷的长柄武器。",
    cost: "1 GP", weight: "3 磅",
    damage: "1d6", damageType: "穿刺", properties: ["投掷 (20/60)", "多用 (1d8)"],
    mastery: MASTERY_DESC.Sap,
    tags: ["简易武器", "近战"]
  },

  // --- Simple Ranged Weapons ---
  {
    id: "light-crossbow-2024", name: "轻弩", source: "官方规则", type: "武器",
    description: "需双手使用的弩。",
    cost: "25 GP", weight: "5 磅",
    damage: "1d8", damageType: "穿刺", properties: ["弹药 (80/320)", "装填", "双手"],
    mastery: MASTERY_DESC.Slow,
    tags: ["简易武器", "远程"]
  },
  {
    id: "dart-2024", name: "飞镖", source: "官方规则", type: "武器",
    description: "具有配重的投掷飞镖。",
    cost: "5 CP", weight: "1/4 磅",
    damage: "1d4", damageType: "穿刺", properties: ["灵巧", "投掷 (20/60)"],
    mastery: MASTERY_DESC.Vex,
    tags: ["简易武器", "远程"]
  },
  {
    id: "shortbow-2024", name: "短弓", source: "官方规则", type: "武器",
    description: "小型弓。",
    cost: "25 GP", weight: "2 磅",
    damage: "1d6", damageType: "穿刺", properties: ["弹药 (80/320)", "双手"],
    mastery: MASTERY_DESC.Vex,
    tags: ["简易武器", "远程"]
  },
  {
    id: "sling-2024", name: "投石索", source: "官方规则", type: "武器",
    description: "简单的投掷带。",
    cost: "1 SP", weight: "---",
    damage: "1d4", damageType: "钝击", properties: ["弹药 (30/120)"],
    mastery: MASTERY_DESC.Slow,
    tags: ["简易武器", "远程"]
  },

  // --- Martial Melee Weapons ---
  {
    id: "battleaxe-2024", name: "战斧", source: "官方规则", type: "武器",
    description: "多用途的斧头。",
    cost: "10 GP", weight: "4 磅",
    damage: "1d8", damageType: "挥砍", properties: ["多用 (1d10)"],
    mastery: MASTERY_DESC.Topple,
    tags: ["军用武器", "近战"]
  },
  {
    id: "flail-2024", name: "链枷", source: "官方规则", type: "武器",
    description: "带有链条连接打击头的武器。",
    cost: "10 GP", weight: "2 磅",
    damage: "1d8", damageType: "钝击", properties: [],
    mastery: MASTERY_DESC.Sap,
    tags: ["军用武器", "近战"]
  },
  {
    id: "glaive-2024", name: "长柄刀", source: "官方规则", type: "武器",
    description: "长柄的重型挥砍武器。",
    cost: "20 GP", weight: "6 磅",
    damage: "1d10", damageType: "挥砍", properties: ["重型", "触及", "双手"],
    mastery: MASTERY_DESC.Graze,
    tags: ["军用武器", "近战"]
  },
  {
    id: "greataxe-2024", name: "巨斧", source: "官方规则", type: "武器",
    description: "巨大的战斧。",
    cost: "30 GP", weight: "7 磅",
    damage: "1d12", damageType: "挥砍", properties: ["重型", "双手"],
    mastery: MASTERY_DESC.Cleave,
    tags: ["军用武器", "近战"]
  },
  {
    id: "greatsword-2024", name: "巨剑", source: "官方规则", type: "武器",
    description: "巨大的双手剑。",
    cost: "50 GP", weight: "6 磅",
    damage: "2d6", damageType: "挥砍", properties: ["重型", "双手"],
    mastery: MASTERY_DESC.Graze,
    tags: ["军用武器", "近战"]
  },
  {
    id: "halberd-2024", name: "戟", source: "官方规则", type: "武器",
    description: "斧与矛的结合体。",
    cost: "20 GP", weight: "6 磅",
    damage: "1d10", damageType: "挥砍", properties: ["重型", "触及", "双手"],
    mastery: MASTERY_DESC.Cleave,
    tags: ["军用武器", "近战"]
  },
  {
    id: "lance-2024", name: "骑枪", source: "官方规则", type: "武器",
    description: "骑士冲锋用的长矛。",
    cost: "10 GP", weight: "6 磅",
    damage: "1d10", damageType: "穿刺", properties: ["重型", "触及", "双手 (骑乘时除外)"],
    mastery: MASTERY_DESC.Topple,
    tags: ["军用武器", "近战"]
  },
  {
    id: "longsword-2024", name: "长剑", source: "官方规则", type: "武器",
    description: "骑士常用的直剑。",
    cost: "15 GP", weight: "3 磅",
    damage: "1d8", damageType: "挥砍", properties: ["多用 (1d10)"],
    mastery: MASTERY_DESC.Sap,
    tags: ["军用武器", "近战"]
  },
  {
    id: "maul-2024", name: "巨锤", source: "官方规则", type: "武器",
    description: "巨大的双手锤。",
    cost: "10 GP", weight: "10 磅",
    damage: "2d6", damageType: "钝击", properties: ["重型", "双手"],
    mastery: MASTERY_DESC.Topple,
    tags: ["军用武器", "近战"]
  },
  {
    id: "morningstar-2024", name: "钉头锤", source: "官方规则", type: "武器",
    description: "带刺的打击头。",
    cost: "15 GP", weight: "4 磅",
    damage: "1d8", damageType: "穿刺", properties: [],
    mastery: MASTERY_DESC.Sap,
    tags: ["军用武器", "近战"]
  },
  {
    id: "pike-2024", name: "长矛", source: "官方规则", type: "武器",
    description: "极长的矛。",
    cost: "5 GP", weight: "18 磅",
    damage: "1d10", damageType: "穿刺", properties: ["重型", "触及", "双手"],
    mastery: MASTERY_DESC.Push,
    tags: ["军用武器", "近战"]
  },
  {
    id: "rapier-2024", name: "刺剑", source: "官方规则", type: "武器",
    description: "细长的决斗用剑。",
    cost: "25 GP", weight: "2 磅",
    damage: "1d8", damageType: "穿刺", properties: ["灵巧"],
    mastery: MASTERY_DESC.Vex,
    tags: ["军用武器", "近战"]
  },
  {
    id: "scimitar-2024", name: "弯刀", source: "官方规则", type: "武器",
    description: "带有弧度的轻剑。",
    cost: "25 GP", weight: "3 磅",
    damage: "1d6", damageType: "挥砍", properties: ["灵巧", "轻型"],
    mastery: MASTERY_DESC.Nick,
    tags: ["军用武器", "近战"]
  },
  {
    id: "shortsword-2024", name: "短剑", source: "官方规则", type: "武器",
    description: "常见的轻型剑。",
    cost: "10 GP", weight: "2 磅",
    damage: "1d6", damageType: "穿刺", properties: ["灵巧", "轻型"],
    mastery: MASTERY_DESC.Vex,
    tags: ["军用武器", "近战"]
  },
  {
    id: "trident-2024", name: "三叉戟", source: "官方规则", type: "武器",
    description: "三叉投掷武器。",
    cost: "5 GP", weight: "4 磅",
    damage: "1d8", damageType: "穿刺", properties: ["投掷 (20/60)", "多用 (1d10)"],
    mastery: MASTERY_DESC.Topple,
    tags: ["军用武器", "近战"]
  },
  {
    id: "war-pick-2024", name: "战镐", source: "官方规则", type: "武器",
    description: "带有尖锐镐头的武器。",
    cost: "5 GP", weight: "2 磅",
    damage: "1d8", damageType: "穿刺", properties: ["多用 (1d10)"],
    mastery: MASTERY_DESC.Sap,
    tags: ["军用武器", "近战"]
  },
  {
    id: "warhammer-2024", name: "战锤", source: "官方规则", type: "武器",
    description: "多用途的战斗锤。",
    cost: "15 GP", weight: "2 磅",
    damage: "1d8", damageType: "钝击", properties: ["多用 (1d10)"],
    mastery: MASTERY_DESC.Push,
    tags: ["军用武器", "近战"]
  },
  {
    id: "whip-2024", name: "鞭", source: "官方规则", type: "武器",
    description: "长鞭。",
    cost: "2 GP", weight: "3 磅",
    damage: "1d4", damageType: "挥砍", properties: ["灵巧", "触及"],
    mastery: MASTERY_DESC.Slow,
    tags: ["军用武器", "近战"]
  },

  // --- Martial Ranged Weapons ---
  {
    id: "blowgun-2024", name: "吹箭筒", source: "官方规则", type: "武器",
    description: "发射吹矢的管子。",
    cost: "10 GP", weight: "1 磅",
    damage: "1", damageType: "穿刺", properties: ["弹药 (25/100)", "装填"],
    mastery: MASTERY_DESC.Vex,
    tags: ["军用武器", "远程"]
  },
  {
    id: "hand-crossbow-2024", name: "手弩", source: "官方规则", type: "武器",
    description: "单手可用的轻型弩。",
    cost: "75 GP", weight: "3 磅",
    damage: "1d6", damageType: "穿刺", properties: ["弹药 (30/120)", "轻型", "装填"],
    mastery: MASTERY_DESC.Vex,
    tags: ["军用武器", "远程"]
  },
  {
    id: "heavy-crossbow-2024", name: "重弩", source: "官方规则", type: "武器",
    description: "强力的重型弩。",
    cost: "50 GP", weight: "18 磅",
    damage: "1d10", damageType: "穿刺", properties: ["弹药 (100/400)", "重型", "装填", "双手"],
    mastery: MASTERY_DESC.Push,
    tags: ["军用武器", "远程"]
  },
  {
    id: "longbow-2024", name: "长弓", source: "官方规则", type: "武器",
    description: "强力的大弓。",
    cost: "50 GP", weight: "2 磅",
    damage: "1d8", damageType: "穿刺", properties: ["弹药 (150/600)", "重型", "双手"],
    mastery: MASTERY_DESC.Slow,
    tags: ["军用武器", "远程"]
  },
  {
    id: "musket-2024", name: "火铳", source: "官方规则", type: "武器",
    description: "黑火药长枪。",
    cost: "500 GP", weight: "10 磅",
    damage: "1d12", damageType: "穿刺", properties: ["弹药 (40/120)", "装填", "双手"],
    mastery: MASTERY_DESC.Slow,
    tags: ["军用武器", "远程"]
  },
  {
    id: "pistol-2024", name: "手铳", source: "官方规则", type: "武器",
    description: "黑火药手枪。",
    cost: "250 GP", weight: "3 磅",
    damage: "1d10", damageType: "穿刺", properties: ["弹药 (30/90)", "装填"],
    mastery: MASTERY_DESC.Vex,
    tags: ["军用武器", "远程"]
  }
];
