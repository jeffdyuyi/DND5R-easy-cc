
import { BackgroundItem } from './types';

export const BACKGROUND_DB: BackgroundItem[] = [
  {
    id: "acolyte-2024", name: "侍僧", source: "官方规则",
    description: "你侍奉于神庙，进行宗教仪式。",
    abilityScores: ["智力", "感知", "魅力"],
    feat: "魔法学徒",
    featSpellList: "牧师",
    skills: ["洞悉", "宗教"],
    tool: "书法工具",
    equipment: [
      "A: 书法工具、书籍（祈祷文）、圣徽、羊皮纸（10 张）、长袍、8 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "artisan-2024", name: "工匠", source: "官方规则",
    description: "你不仅是制造者，也是商人和艺术家。",
    abilityScores: ["力量", "敏捷", "智力"],
    feat: "巧匠",
    skills: ["调查", "游说"],
    tool: "一种工匠工具",
    equipment: [
      "A: 工匠工具（同上所选）、2 小包、旅行者服装、32 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "charlatan-2024", name: "骗子", source: "官方规则",
    description: "你擅长操纵人心，无论是为了生存还是为了利益。",
    abilityScores: ["敏捷", "体质", "魅力"],
    feat: "熟习",
    skills: ["欺瞒", "巧手"],
    tool: "文书伪造工具",
    equipment: [
      "A: 文书伪造工具、表演服装、高档服装、15 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "criminal-2024", name: "罪犯", source: "官方规则",
    description: "你有过触犯法律的过去，并在社会阴暗面求生。",
    abilityScores: ["敏捷", "体质", "智力"],
    feat: "警戒",
    skills: ["巧手", "隐匿"],
    tool: "盗贼工具",
    equipment: [
      "A: 2 匕首、盗贼工具、撬棍、2 小包、旅行者服装、16 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "entertainer-2024", name: "艺人", source: "官方规则",
    description: "你的技艺能以此取悦观众，并在世界中找到位置。",
    abilityScores: ["力量", "敏捷", "魅力"],
    feat: "音乐家",
    skills: ["杂技", "表演"],
    tool: "一种乐器",
    equipment: [
      "A: 乐器（同上所选）、2 表演服装、镜子、香水、旅行者服装、11 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "farmer-2024", name: "农民", source: "官方规则",
    description: "你耕耘土地，深知自然的循环与劳作的艰辛。",
    abilityScores: ["力量", "体质", "感知"],
    feat: "健壮",
    skills: ["驯兽", "自然"],
    tool: "木匠工具",
    equipment: [
      "A: 镰刀、木匠工具、治疗包、铁锅、铲子、旅行者衣服、30 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "guard-2024", name: "警卫", source: "官方规则",
    description: "你曾以此身份守卫法律、秩序或重要之物。",
    abilityScores: ["力量", "智力", "感知"],
    feat: "警戒",
    skills: ["运动", "察觉"],
    tool: "一种赌具",
    equipment: [
      "A: 矛、轻弩、20 弩矢、赌具（同上所选）、附盖提灯、镣铐、箭袋、旅行者服装、12 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "guide-2024", name: "向导", source: "官方规则",
    description: "你熟悉荒野，如同熟悉自己的手掌。",
    abilityScores: ["敏捷", "体质", "感知"],
    feat: "魔法学徒",
    featSpellList: "德鲁伊",
    skills: ["隐匿", "求生"],
    tool: "制图工具",
    equipment: [
      "A: 短弓、20 箭、制图工具、铺盖、箭袋、帐篷、旅行者服装、3 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "hermit-2024", name: "隐士", source: "官方规则",
    description: "你曾离群索居，寻求内心的平静或深奥的真理。",
    abilityScores: ["体质", "感知", "魅力"],
    feat: "医疗师",
    skills: ["医药", "宗教"],
    tool: "草药工具",
    equipment: [
      "A: 长棍、草药工具、铺盖、书籍（哲学）、油灯、灯油（3 扁瓶）、旅行者服装、16 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "merchant-2024", name: "商人", source: "官方规则",
    description: "你懂得交易的艺术，无论是货物还是信息。",
    abilityScores: ["体质", "智力", "魅力"],
    feat: "幸运",
    skills: ["驯兽", "游说"],
    tool: "领航工具",
    equipment: [
      "A: 领航工具、2 小包、旅行者服装、22 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "noble-2024", name: "贵族", source: "官方规则",
    description: "你出生在富裕且有特权的家庭。",
    abilityScores: ["力量", "智力", "魅力"],
    feat: "熟习",
    skills: ["历史", "游说"],
    tool: "一种赌具",
    equipment: [
      "A: 赌具（同上所选）、高档服装、香水、29 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "sage-2024", name: "智者", source: "官方规则",
    description: "你花费多年时间学习多元宇宙的知识。",
    abilityScores: ["体质", "智力", "感知"],
    feat: "魔法学徒",
    featSpellList: "法师",
    skills: ["奥秘", "历史"],
    tool: "书法工具",
    equipment: [
      "A: 长棍、书法工具、书籍（历史）、羊皮纸（8 张）、长袍、8 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "sailor-2024", name: "水手", source: "官方规则",
    description: "大海是你的家，船只就是你的世界。",
    abilityScores: ["力量", "敏捷", "感知"],
    feat: "酒馆斗殴者",
    skills: ["杂技", "察觉"],
    tool: "领航工具",
    equipment: [
      "A: 匕首、领航工具、绳索、旅行者服装、20 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "scribe-2024", name: "抄写员", source: "官方规则",
    description: "你记录历史、法律与契约，文字是你的武器。",
    abilityScores: ["敏捷", "智力", "感知"],
    feat: "熟习",
    skills: ["调查", "察觉"],
    tool: "书法工具",
    equipment: [
      "A: 书法工具、高档服装、油灯、灯油（3 瓶）、羊皮纸（12 张）、23 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "soldier-2024", name: "士兵", source: "官方规则",
    description: "你曾是一名士兵，受过正规的军事训练。",
    abilityScores: ["力量", "敏捷", "体质"],
    feat: "凶蛮打手",
    skills: ["运动", "威吓"],
    tool: "一种赌具",
    equipment: [
      "A: 矛、短弓、20 支箭、赌具（同上所选）、医疗包、箭筒、旅行者服装、14 GP",
      "B: 50 GP"
    ]
  },
  {
    id: "wayfarer-2024", name: "流浪者", source: "官方规则",
    description: "你四处流浪，不仅在地理上，也在社会边缘。",
    abilityScores: ["敏捷", "感知", "魅力"],
    feat: "幸运",
    skills: ["洞悉", "隐匿"],
    tool: "盗贼工具",
    equipment: [
      "A: 2 匕首、盗贼工具、赌具（任意）、铺盖、2 小包、旅行者服装、16 GP",
      "B: 50 GP"
    ]
  }
];
