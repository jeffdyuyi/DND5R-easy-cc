// 常量定义文件

// 法术来源标签映射
export const SOURCE_LABELS: Record<string, { full: string; color: string }> = {
  "PHB'24": { full: "玩家手册 2024版", color: "blue" },
  "XGE": { full: "扎纳塔的万事指南", color: "green" },
  "TCE": { full: "塔莎的万事坩埚", color: "purple" },
  "FTD": { full: "费伦的龙宝鉴", color: "red" },
  "SCAG": { full: "剑湾冒险者指南", color: "amber" },
  "官方规则": { full: "官方规则", color: "blue" },
  "第三方/原创": { full: "第三方/原创", color: "orange" }
};

// 法术来源颜色类
export const SOURCE_COLORS: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-green-100 text-green-800 border-green-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  red: "bg-red-100 text-red-800 border-red-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200"
};

// 卡牌主题颜色
export const CARD_THEMES = {
  class: 'red',
  background: 'amber',
  species: 'green',
  spell: 'indigo',
  feat: 'purple',
  item: 'slate',
  subclass: 'orange'
};

// 属性名称映射
export const ABILITY_NAMES: Record<string, { short: string; full: string }> = {
  "力量": { short: "STR", full: "力量 Strength" },
  "敏捷": { short: "DEX", full: "敏捷 Dexterity" },
  "体质": { short: "CON", full: "体质 Constitution" },
  "智力": { short: "INT", full: "智力 Intelligence" },
  "感知": { short: "WIS", full: "感知 Wisdom" },
  "魅力": { short: "CHA", full: "魅力 Charisma" }
};

// 技能列表与关联属性
export const SKILL_LIST: Record<string, string> = {
  "杂技": "敏捷",
  "驯兽": "感知",
  "奥秘": "智力",
  "运动": "力量",
  "欺瞒": "魅力",
  "历史": "智力",
  "洞悉": "感知",
  "威吓": "魅力",
  "调查": "智力",
  "医药": "感知",
  "自然": "智力",
  "察觉": "感知",
  "表演": "魅力",
  "游说": "魅力",
  "宗教": "智力",
  "巧手": "敏捷",
  "隐匿": "敏捷",
  "求生": "感知"
};

// 2024版准备法术规则
export const PREPARATION_RULES: Record<string, { when: string; qty: string }> = {
  "吟游诗人": { when: "升级时", qty: "一个" },
  "牧师": { when: "完成一次长休时", qty: "任意" },
  "德鲁伊": { when: "完成一次长休时", qty: "任意" },
  "圣武士": { when: "完成一次长休时", qty: "一个" },
  "游侠": { when: "完成一次长休时", qty: "一个" },
  "术士": { when: "升级时", qty: "一个" },
  "魔契师": { when: "升级时", qty: "一个" },
  "法师": { when: "完成一次长休时", qty: "任意" }
};

// 标准语言和稀有语言
export const STANDARD_LANGUAGES = [
  "通用语", "通用手语", "矮人语", "精灵语", "巨人语", 
  "侏儒语", "地精语", "半身人语", "兽人语", "龙语"
];

export const RARE_LANGUAGES = [
  "深渊语", "天界语", "深潜语", "德鲁伊语", "炼狱语", 
  "原初语", "木族语", "盗贼黑话", "地底通用语"
];
