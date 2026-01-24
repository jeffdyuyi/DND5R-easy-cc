
import { ItemItem } from '../types';

export const TOOL_DB: ItemItem[] = [
  // --- Artisan's Tools (工匠工具) ---
  {
    id: "alchemists-supplies-2024", name: "炼金工具", source: "官方规则", type: "工具",
    description: "炼金工具包括两只玻璃烧杯、一个铁架台、一根玻璃搅拌棒、一个小研钵和药杵，以及一袋常用炼金术材料，包括盐、铁粉、纯净水。",
    cost: "50 GP", weight: "8 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "辨析物质", dc: "15", description: "辨析一种物质的成分或性质。" },
      { action: "生火", dc: "15", description: "使用化学反应生起一场火。" }
    ],
    toolCraft: ["强酸", "炽火胶", "材料包", "燃油", "纸张", "香水"],
    tags: ["工匠工具", "炼金"]
  },
  {
    id: "brewers-supplies-2024", name: "酿酒工具", source: "官方规则", type: "工具",
    description: "酿酒工具包含一个大玻璃壶、一定数量的啤酒花、一个虹吸管和几尺长的导管。",
    cost: "20 GP", weight: "9 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "检测毒素", dc: "15", description: "检测饮品中是否被下毒。" },
      { action: "辨识酒精", dc: "10", description: "辨识酒精饮料的种类或成分。" }
    ],
    toolCraft: ["抗毒剂"],
    tags: ["工匠工具", "饮食"]
  },
  {
    id: "calligraphers-supplies-2024", name: "书法工具", source: "官方规则", type: "工具",
    description: "书法工具包含墨水、一打羊皮纸和三支羽毛笔。",
    cost: "10 GP", weight: "5 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "防伪撰写", dc: "15", description: "以华丽且独特的字迹撰写文字以防止被他人造假。" }
    ],
    toolCraft: ["墨水", "法术卷轴"],
    tags: ["工匠工具", "文书"]
  },
  {
    id: "carpenters-tools-2024", name: "木匠工具", source: "官方规则", type: "工具",
    description: "木匠工具包含锯子、锤子、钉子、斧子、方尺、尺子、扁斧、刨子和一把凿子。",
    cost: "8 GP", weight: "6 lb",
    toolAbility: "力量",
    toolUtilize: [
      { action: "封死/撬开", dc: "20", description: "封死或强行撬开一扇门或一个容器。" }
    ],
    toolCraft: ["短棒", "巨棒", "长棍", "木桶", "箱子", "梯子", "长杆", "便携式攻城锤", "火把"],
    tags: ["工匠工具", "建筑"]
  },
  {
    id: "cartographers-tools-2024", name: "制图工具", source: "官方规则", type: "工具",
    description: "制图工具包含一支羽毛笔、墨水、羊皮纸、一对圆规、卡尺和一把尺子。",
    cost: "15 GP", weight: "6 lb",
    toolAbility: "感知",
    toolUtilize: [
      { action: "绘制地图", dc: "15", description: "为你当前所在的一小片区域绘制地图。" }
    ],
    toolCraft: ["地图"],
    tags: ["工匠工具", "探索"]
  },
  {
    id: "cobblers-tools-2024", name: "鞋匠工具", source: "官方规则", type: "工具",
    description: "鞋匠工具包含一把锤子、一把锥子、一把小刀、一个修鞋座、切刀、备用皮革和线。",
    cost: "5 GP", weight: "5 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "改造足具", dc: "10", description: "改造足具来为穿戴者的下一次敏捷（杂技）检定提供优势。" }
    ],
    toolCraft: ["攀爬工具"],
    tags: ["工匠工具", "衣物"]
  },
  {
    id: "cooks-utensils-2024", name: "厨师工具", source: "官方规则", type: "工具",
    description: "厨师工具包含一个铁锅、平底锅、刀具、叉子、勺子和以此类推的物品。",
    cost: "1 GP", weight: "8 lb",
    toolAbility: "感知",
    toolUtilize: [
      { action: "改善风味", dc: "10", description: "改善普通食物的风味。" },
      { action: "检查食物", dc: "15", description: "检查食物是否腐坏或有毒。" }
    ],
    toolCraft: ["口粮"],
    tags: ["工匠工具", "饮食"]
  },
  {
    id: "glassblowers-tools-2024", name: "玻璃匠工具", source: "官方规则", type: "工具",
    description: "玻璃匠工具包含一根吹管、一把小型马赛克切割刀、几块用来做模具的泥块和用来夹玻璃的钳子。",
    cost: "30 GP", weight: "5 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "内容物判断", dc: "15", description: "判断一个玻璃物件在过去24小时内盛过什么内容物。" }
    ],
    toolCraft: ["玻璃瓶", "放大镜", "望远镜", "小瓶"],
    tags: ["工匠工具", "工艺"]
  },
  {
    id: "jewelers-tools-2024", name: "珠宝匠工具", source: "官方规则", type: "工具",
    description: "珠宝匠工具包含一把小锯子、一把小锤子、几把锉刀、钳子和镊子。",
    cost: "25 GP", weight: "2 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "估价", dc: "15", description: "判断珠宝的价值。" }
    ],
    toolCraft: ["奥术法器", "圣徽"],
    tags: ["工匠工具", "工艺", "魔法"]
  },
  {
    id: "leatherworkers-tools-2024", name: "皮匠工具", source: "官方规则", type: "工具",
    description: "皮匠工具包含一把刀、一把小木槌、一把裁边刀、打孔器、线和碎皮革。",
    cost: "5 GP", weight: "5 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "图案设计", dc: "10", description: "对一个皮制品进行图案设计或装饰。" }
    ],
    toolCraft: ["投石索", "鞭子", "兽皮甲", "皮甲", "镶钉皮甲", "背包", "弩矢匣", "地图或卷轴匣", "羊皮纸", "小包", "箭袋", "水袋"],
    tags: ["工匠工具", "护甲"]
  },
  {
    id: "masons-tools-2024", name: "石匠工具", source: "官方规则", type: "工具",
    description: "石匠工具包含一把抹子、一把锤子、一把凿子、刷子和一把方尺。",
    cost: "10 GP", weight: "8 lb",
    toolAbility: "力量",
    toolUtilize: [
      { action: "凿刻", dc: "10", description: "在石头上凿出一个符号标志或一个洞。" }
    ],
    toolCraft: ["滑轮组"],
    tags: ["工匠工具", "建筑"]
  },
  {
    id: "painters-supplies-2024", name: "画家工具", source: "官方规则", type: "工具",
    description: "画家工具包含一个画架、油画颜料、炭笔、画笔、不同大小的画布和调色盘。",
    cost: "10 GP", weight: "5 lb",
    toolAbility: "感知",
    toolUtilize: [
      { action: "绘画", dc: "10", description: "画出你所见过的某个事物的可辨图像。" }
    ],
    toolCraft: ["德鲁伊法器", "圣徽"],
    tags: ["工匠工具", "艺术"]
  },
  {
    id: "potters-tools-2024", name: "陶匠工具", source: "官方规则", type: "工具",
    description: "陶匠工具包含陶艺用针、条带、刮刀、一把切线刀和一个陶轮。",
    cost: "10 GP", weight: "3 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "内容物判断", dc: "15", description: "判断一个陶瓷物件在过去24小时内盛过什么内容物。" }
    ],
    toolCraft: ["壶", "灯"],
    tags: ["工匠工具", "工艺"]
  },
  {
    id: "smiths-tools-2024", name: "铁匠工具", source: "官方规则", type: "工具",
    description: "铁匠工具包含锤子、钳子、炭火、抹布和磨刀石。",
    cost: "20 GP", weight: "8 lb",
    toolAbility: "力量",
    toolUtilize: [
      { action: "撬开", dc: "20", description: "撬开一扇门或容器。" }
    ],
    toolCraft: ["任意近战武器（除木制）", "中甲（除兽皮）", "重甲", "滚珠", "吊桶", "铁蒺藜", "链条", "撬棍", "枪械子弹", "爪钩", "铁壶", "铁钉", "投石索子弹"],
    tags: ["工匠工具", "武器", "护甲"]
  },
  {
    id: "tinkers-tools-2024", name: "修补工具", source: "官方规则", type: "工具",
    description: "修补工具包含各种各样的手工具、线、针、磨刀石、布片和油壶，以及一小罐胶水。",
    cost: "50 GP", weight: "10 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "快速组装", dc: "20", description: "用废料组装出一个微型物品，这个物品会在一分钟后散架。" }
    ],
    toolCraft: ["火铳", "手铳", "铃铛", "牛眼提灯", "扁瓶", "附盖提灯", "捕猎陷阱", "锁", "镣铐", "镜子", "铲子", "信号笛", "火绒盒"],
    tags: ["工匠工具", "机械"]
  },
  {
    id: "weavers-tools-2024", name: "织布工具", source: "官方规则", type: "工具",
    description: "织布工具包含线、针和布片。",
    cost: "1 GP", weight: "5 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "修补/缝制", dc: "10", description: "修补衣服上的破口，或是缝制一个微型图案。" }
    ],
    toolCraft: ["布甲", "篮子", "铺盖", "毯子", "高档服装", "捕网", "长袍", "绳索", "麻袋", "细绳", "帐篷", "旅行服装"],
    tags: ["工匠工具", "衣物"]
  },
  {
    id: "woodcarvers-tools-2024", name: "木雕工具", source: "官方规则", type: "工具",
    description: "木雕工具包含一把小刀、一把凿子和一把小锯子。",
    cost: "1 GP", weight: "5 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "雕刻", dc: "10", description: "在木头上雕刻图案。" }
    ],
    toolCraft: ["短棒", "巨棒", "长棍", "远程武器（木制）", "奥术法器", "箭矢", "弩矢", "德鲁伊法器", "墨水笔", "吹管"],
    tags: ["工匠工具", "武器", "艺术"]
  },

  // --- Other Tools (其他工具) ---
  {
    id: "disguise-kit-2024", name: "易容工具", source: "官方规则", type: "工具",
    description: "包含化妆品、染发剂、小道具和少量衣物。",
    cost: "25 GP", weight: "3 lb",
    toolAbility: "魅力",
    toolUtilize: [
      { action: "化妆", dc: "10", description: "改变容貌以掩人耳目。" }
    ],
    toolCraft: ["戏服"],
    tags: ["其他工具", "社交"]
  },
  {
    id: "forgery-kit-2024", name: "文书伪造工具", source: "官方规则", type: "工具",
    description: "包含不同种类的墨水、羊皮纸、火漆、印章和伪造笔迹所需的其他工具。",
    cost: "15 GP", weight: "5 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "模仿笔迹", dc: "15", description: "模仿其他人的笔迹，至多10个单词。" },
      { action: "伪造火漆", dc: "20", description: "伪造一份火漆印章。" }
    ],
    tags: ["其他工具", "文书"]
  },
  {
    id: "gaming-set-2024", name: "赌具", source: "官方规则", type: "工具",
    description: "用于博弈游戏的道具。每种赌具都是独立的工具熟练项。",
    cost: "变动", weight: "—",
    toolAbility: "感知",
    toolUtilize: [
      { action: "判断作弊", dc: "10", description: "判断某人是否在游戏中作弊。" },
      { action: "赢取游戏", dc: "20", description: "在技巧类游戏中获胜。" }
    ],
    toolVariants: ["骰子 (1SP)", "龙棋 (1GP)", "纸牌 (5SP)", "三龙牌 (1GP)"],
    tags: ["其他工具", "游戏"]
  },
  {
    id: "herbalism-kit-2024", name: "草药工具", source: "官方规则", type: "工具",
    description: "包含各种用来采集、研磨草药的工具，以及用来制作药水的容器。",
    cost: "5 GP", weight: "3 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "辨认植物", dc: "10", description: "辨识植物的种类和特性。" }
    ],
    toolCraft: ["抗毒剂", "蜡烛", "医疗包", "治疗药水"],
    tags: ["其他工具", "消耗品"]
  },
  {
    id: "musical-instrument-2024", name: "乐器", source: "官方规则", type: "工具",
    description: "各种用于演奏音乐的器具。每种乐器都是独立的工具熟练项。",
    cost: "多类", weight: "多类",
    toolAbility: "魅力",
    toolUtilize: [
      { action: "演奏曲调", dc: "10", description: "演奏一个熟知的曲调。" },
      { action: "即兴演奏", dc: "15", description: "演奏一首即兴的乐曲。" }
    ],
    toolVariants: [
      "风笛 (30GP, 6lb)", "鼓 (6GP, 3lb)", "扬琴 (25GP, 10lb)", "长笛 (2GP, 1lb)",
      "号角 (3GP, 2lb)", "鲁特琴 (35GP, 2lb)", "里拉琴 (30GP, 2lb)", "排箫 (12GP, 2lb)",
      "芦笛 (2GP, 1lb)", "提琴 (30GP, 1lb)"
    ],
    tags: ["其他工具", "乐器"]
  },
  {
    id: "navigators-tools-2024", name: "领航工具", source: "官方规则", type: "工具",
    description: "包含六分仪、指南针、卡尺、尺子、羊皮纸、墨水和笔。",
    cost: "25 GP", weight: "2 lb",
    toolAbility: "感知",
    toolUtilize: [
      { action: "计划路线", dc: "10", description: "规划航行路线。" },
      { action: "观星定位", dc: "15", description: "通过观星判断当前位置。" }
    ],
    tags: ["其他工具", "探索"]
  },
  {
    id: "poisoners-kit-2024", name: "毒药工具", source: "官方规则", type: "工具",
    description: "包含玻璃瓶、化学品和其他制作或处理毒药所需的工具。",
    cost: "50 GP", weight: "2 lb",
    toolAbility: "智力",
    toolUtilize: [
      { action: "侦测毒物", dc: "10", description: "侦测有毒物件。" }
    ],
    toolCraft: ["基础毒药"],
    tags: ["其他工具", "毒素"]
  },
  {
    id: "thieves-tools-2024", name: "盗贼工具", source: "官方规则", type: "工具",
    description: "这套工具包含小锉刀、开锁器、小镜子、剪刀和镊子，是处理机关和锁具的必备品。",
    cost: "25 GP", weight: "1 lb",
    toolAbility: "敏捷",
    toolUtilize: [
      { action: "撬锁", dc: "15", description: "开启一把普通的锁。" },
      { action: "解除陷阱", dc: "15", description: "解除一个普通的陷阱。" }
    ],
    tags: ["其他工具", "盗贼"]
  }
];
