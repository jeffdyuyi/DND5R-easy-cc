
import { ItemItem } from './types';

export const MAGIC_MISC_DB: ItemItem[] = [
  // --- Common (普通) ---
  {
    id: "potion-healing", name: "治疗药水", source: "官方规则", type: "药水",
    description: "红色的液体。饮用后恢复 2d4 + 2 点生命值。",
    cost: "50 GP", weight: "0.5 磅", rarity: "普通",
    tags: ["消耗品", "治疗", "药水"]
  },
  {
    id: "potion-climbing", name: "攀爬药水", source: "官方规则", type: "药水",
    description: "药水分离成类似于岩层的褐色、银色和灰色三层，即使摇晃也不会让三种颜色混合到一起。\n\n**攀爬提升**: 饮用此药水后，你将获得等于你步行速度的攀爬速度，持续1小时。\n**力量提升**: 在此期间，你攀爬时进行的 力量（运动）检定 具有优势。",
    cost: "50 GP", weight: "0.5 磅", rarity: "普通",
    tags: ["消耗品", "移动", "药水"]
  },

  // --- Uncommon (非普通) ---
  {
    id: "bag-of-holding", name: "次元袋", source: "官方规则", type: "奇物",
    description: "内部空间比外部大的袋子，大约 2 英尺宽 4 英尺深，可以容纳 500 磅物品。",
    cost: "500 GP", weight: "15 磅", rarity: "非普通",
    tags: ["容器", "奇物"]
  },
  {
    id: "weapon-plus-one", name: "+1 武器", source: "官方规则", type: "武器",
    description: "攻击检定和伤害掷骰获得 +1 加值的魔法武器。",
    cost: "---", weight: "变动", rarity: "非普通",
    tags: ["武器", "魔法物品"]
  },
  {
    id: "alchemy-jug", name: "炼金壶", source: "官方规则", type: "奇物",
    description: "一个看起来只能装1加仑的壶。无论是空还是满，都只重12磅。即使壶内空无一物，摇动时依然会发出声音。\n\n可以用一个动作产生下列液体中的一种，再用一个动作打开壶，以2加仑/分钟速度倒出液体。次日黎明前，它将无法再生成超过上限的液体或是另一种液体。\n\n| 液体名称 | 最大体积 | 液体名称 | 最大体积 |\n|---|---|---|---|\n| 强酸 | 8 盎司 | 油 | 1 夸脱 |\n| 基础毒药 | 1/2 盎司 | 醋 | 2 加仑 |\n| 啤酒 | 4 加仑 | 淡水 | 8 加仑 |\n| 蜂蜜 | 1 加仑 | 咸水 | 12 加仑 |\n| 蛋黄酱 | 2 加仑 | 葡萄酒 | 1 加仑 |",
    cost: "---", weight: "12 磅", rarity: "非普通",
    tags: ["奇物", "工具"]
  }
];
