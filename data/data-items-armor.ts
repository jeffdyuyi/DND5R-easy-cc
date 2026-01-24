
import { ItemItem } from './types';

export const ARMOR_DB: ItemItem[] = [
  // Light Armor
  {
    id: "padded-armor-2024", name: "布甲", source: "官方规则", type: "护甲",
    description: "由绗缝的布层组成的护甲。",
    cost: "5 GP", weight: "8 磅",
    ac: "11 + 敏捷修正", 
    stealthDisadvantage: true,
    tags: ["轻甲"]
  },
  {
    id: "leather-armor-2024", name: "皮甲", source: "官方规则", type: "护甲",
    description: "由硬化皮革制成的护甲。",
    cost: "10 GP", weight: "10 磅",
    ac: "11 + 敏捷修正", 
    stealthDisadvantage: false,
    tags: ["轻甲"]
  },
  {
    id: "studded-leather-2024", name: "镶钉皮甲", source: "官方规则", type: "护甲",
    description: "用铆钉加固的皮甲。",
    cost: "45 GP", weight: "13 磅",
    ac: "12 + 敏捷修正", 
    stealthDisadvantage: false,
    tags: ["轻甲"]
  },

  // Medium Armor
  {
    id: "hide-armor-2024", name: "兽皮甲", source: "官方规则", type: "护甲",
    description: "粗糙的兽皮与毛皮。",
    cost: "10 GP", weight: "12 磅",
    ac: "12 + 敏捷修正 (最大 2)", 
    stealthDisadvantage: false,
    tags: ["中甲"]
  },
  {
    id: "chain-shirt-2024", name: "链甲衫", source: "官方规则", type: "护甲",
    description: "由连锁金属环组成的衬衫，穿在衣服和皮革之间。",
    cost: "50 GP", weight: "20 磅",
    ac: "13 + 敏捷修正 (最大 2)", 
    stealthDisadvantage: false,
    tags: ["中甲"]
  },
  {
    id: "scale-mail-2024", name: "鳞甲", source: "官方规则", type: "护甲",
    description: "由重叠的金属鳞片组成。",
    cost: "50 GP", weight: "45 磅",
    ac: "14 + 敏捷修正 (最大 2)", 
    stealthDisadvantage: true,
    tags: ["中甲"]
  },
  {
    id: "breastplate-2024", name: "胸甲", source: "官方规则", type: "护甲",
    description: "由贴合身体的金属板组成，配有柔软的皮革。",
    cost: "400 GP", weight: "20 磅",
    ac: "14 + 敏捷修正 (最大 2)", 
    stealthDisadvantage: false,
    tags: ["中甲"]
  },
  {
    id: "half-plate-2024", name: "半身板甲", source: "官方规则", type: "护甲",
    description: "覆盖身体大部分重要部位的塑形金属板。",
    cost: "750 GP", weight: "40 磅",
    ac: "15 + 敏捷修正 (最大 2)", 
    stealthDisadvantage: true,
    tags: ["中甲"]
  },

  // Heavy Armor
  {
    id: "ring-mail-2024", name: "环甲", source: "官方规则", type: "护甲",
    description: "缝在皮甲上的重金属环。",
    cost: "30 GP", weight: "40 磅",
    ac: "14", 
    stealthDisadvantage: true,
    tags: ["重甲"]
  },
  {
    id: "chain-mail-2024", name: "链甲", source: "官方规则", type: "护甲",
    description: "由互锁的金属环编织而成。",
    cost: "75 GP", weight: "55 磅",
    ac: "16", 
    strengthRequirement: 13,
    stealthDisadvantage: true,
    tags: ["重甲"]
  },
  {
    id: "splint-armor-2024", name: "板条甲", source: "官方规则", type: "护甲",
    description: "铆接在皮底上的垂直金属条。",
    cost: "200 GP", weight: "60 磅",
    ac: "17", 
    strengthRequirement: 15,
    stealthDisadvantage: true,
    tags: ["重甲"]
  },
  {
    id: "plate-armor-2024", name: "板甲", source: "官方规则", type: "护甲",
    description: "由互锁的金属板组成，覆盖全身。",
    cost: "1500 GP", weight: "65 磅",
    ac: "18", 
    strengthRequirement: 15,
    stealthDisadvantage: true,
    tags: ["重甲"]
  },

  // Shield
  {
    id: "shield-2024", name: "盾牌", source: "官方规则", type: "护甲",
    description: "由木头或金属制成。利用动作穿戴或卸除。",
    cost: "10 GP", weight: "6 磅",
    ac: "+2", 
    tags: ["盾牌"]
  }
];
