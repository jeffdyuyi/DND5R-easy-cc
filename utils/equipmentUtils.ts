
// Equipment Data Utilities
// Structured equipment options for classes and backgrounds

// Note: These imports are available for future use when implementing item lookups
import { WEAPON_DB, ARMOR_DB, GEAR_DB, TOOL_DB } from '../data';

// === Pack Contents Definition ===
// Defines what items are contained in each equipment pack for expansion

export const PACK_CONTENTS: Record<string, { name: string; quantity: number }[]> = {
    '窃贼套组': [
        { name: '背包', quantity: 1 },
        { name: '滚珠 (1000枚)', quantity: 1 },
        { name: '铃铛', quantity: 1 },
        { name: '蜡烛', quantity: 5 },
        { name: '撬棍', quantity: 1 },
        { name: '锤子', quantity: 1 },
        { name: '岩钉', quantity: 10 },
        { name: '附盖提灯', quantity: 1 },
        { name: '燃油 (扁瓶)', quantity: 2 },
        { name: '口粮 (1天)', quantity: 5 },
        { name: '火绒盒', quantity: 1 },
        { name: '水袋', quantity: 1 },
        { name: '麻绳 (50尺)', quantity: 1 },
    ],
    '外交套组': [
        { name: '箱子', quantity: 1 },
        { name: '卷轴匣/地图匣', quantity: 2 },
        { name: '高档服装', quantity: 1 },
        { name: '墨水 (1盎司)', quantity: 1 },
        { name: '墨水笔', quantity: 1 },
        { name: '油灯', quantity: 1 },
        { name: '燃油 (扁瓶)', quantity: 2 },
        { name: '纸张 (1张)', quantity: 5 },
        { name: '香水 (小瓶)', quantity: 1 },
        { name: '封蜡', quantity: 1 },
        { name: '肥皂', quantity: 1 },
    ],
    '地城套组': [
        { name: '背包', quantity: 1 },
        { name: '撬棍', quantity: 1 },
        { name: '锤子', quantity: 1 },
        { name: '岩钉', quantity: 10 },
        { name: '火把', quantity: 10 },
        { name: '火绒盒', quantity: 1 },
        { name: '口粮 (1天)', quantity: 10 },
        { name: '水袋', quantity: 1 },
        { name: '麻绳 (50尺)', quantity: 1 },
    ],
    '地城探索者背包': [
        { name: '背包', quantity: 1 },
        { name: '撬棍', quantity: 1 },
        { name: '锤子', quantity: 1 },
        { name: '岩钉', quantity: 10 },
        { name: '火把', quantity: 10 },
        { name: '火绒盒', quantity: 1 },
        { name: '口粮 (1天)', quantity: 10 },
        { name: '水袋', quantity: 1 },
        { name: '麻绳 (50尺)', quantity: 1 },
    ],
    '艺人套组': [
        { name: '背包', quantity: 1 },
        { name: '铺盖', quantity: 1 },
        { name: '戏服', quantity: 2 },
        { name: '蜡烛', quantity: 5 },
        { name: '口粮 (1天)', quantity: 5 },
        { name: '水袋', quantity: 1 },
        { name: '易容工具', quantity: 1 },
    ],
    '娱乐者背包': [
        { name: '背包', quantity: 1 },
        { name: '铺盖', quantity: 1 },
        { name: '戏服', quantity: 2 },
        { name: '蜡烛', quantity: 5 },
        { name: '口粮 (1天)', quantity: 5 },
        { name: '水袋', quantity: 1 },
        { name: '易容工具', quantity: 1 },
    ],
    '探索套组': [
        { name: '背包', quantity: 1 },
        { name: '铺盖', quantity: 1 },
        { name: '餐具', quantity: 1 },
        { name: '火绒盒', quantity: 1 },
        { name: '火把', quantity: 10 },
        { name: '口粮 (1天)', quantity: 10 },
        { name: '水袋', quantity: 1 },
        { name: '麻绳 (50尺)', quantity: 1 },
    ],
    '探险者背包': [
        { name: '背包', quantity: 1 },
        { name: '铺盖', quantity: 1 },
        { name: '餐具', quantity: 1 },
        { name: '火绒盒', quantity: 1 },
        { name: '火把', quantity: 10 },
        { name: '口粮 (1天)', quantity: 10 },
        { name: '水袋', quantity: 1 },
        { name: '麻绳 (50尺)', quantity: 1 },
    ],
    '祭司套组': [
        { name: '背包', quantity: 1 },
        { name: '毯子', quantity: 1 },
        { name: '蜡烛', quantity: 10 },
        { name: '火绒盒', quantity: 1 },
        { name: '施舍盒', quantity: 1 },
        { name: '香块', quantity: 2 },
        { name: '香炉', quantity: 1 },
        { name: '法衣', quantity: 1 },
        { name: '口粮 (1天)', quantity: 2 },
        { name: '水袋', quantity: 1 },
    ],
    '牧师背包': [
        { name: '背包', quantity: 1 },
        { name: '毯子', quantity: 1 },
        { name: '蜡烛', quantity: 10 },
        { name: '火绒盒', quantity: 1 },
        { name: '施舍盒', quantity: 1 },
        { name: '香块', quantity: 2 },
        { name: '香炉', quantity: 1 },
        { name: '法衣', quantity: 1 },
        { name: '口粮 (1天)', quantity: 2 },
        { name: '水袋', quantity: 1 },
    ],
    '学者套组': [
        { name: '背包', quantity: 1 },
        { name: '书籍', quantity: 1 },
        { name: '墨水 (1盎司)', quantity: 1 },
        { name: '墨水笔', quantity: 1 },
        { name: '羊皮纸 (1张)', quantity: 10 },
        { name: '小沙包', quantity: 1 },
        { name: '小刀', quantity: 1 },
    ],
    '学者背包': [
        { name: '背包', quantity: 1 },
        { name: '书籍', quantity: 1 },
        { name: '墨水 (1盎司)', quantity: 1 },
        { name: '墨水笔', quantity: 1 },
        { name: '羊皮纸 (1张)', quantity: 10 },
        { name: '小沙包', quantity: 1 },
        { name: '小刀', quantity: 1 },
    ],
    '盗贼背包': [
        { name: '背包', quantity: 1 },
        { name: '滚珠 (1000枚)', quantity: 1 },
        { name: '铃铛', quantity: 1 },
        { name: '蜡烛', quantity: 5 },
        { name: '撬棍', quantity: 1 },
        { name: '锤子', quantity: 1 },
        { name: '岩钉', quantity: 10 },
        { name: '附盖提灯', quantity: 1 },
        { name: '燃油 (扁瓶)', quantity: 2 },
        { name: '口粮 (1天)', quantity: 5 },
        { name: '火绒盒', quantity: 1 },
        { name: '水袋', quantity: 1 },
        { name: '麻绳 (50尺)', quantity: 1 },
    ],
};

// === Equipment Option Types ===

export interface EquipmentItem {
    name: string;
    quantity: number;
    fromLibrary?: boolean; // Whether to look up from item DB
}

export interface EquipmentSubChoice {
    id: string;
    label: string;
    options: { value: string; label: string; items?: EquipmentItem[] }[];
}

export interface EquipmentOption {
    id: 'A' | 'B';
    label: string;
    items: EquipmentItem[];
    subChoices?: EquipmentSubChoice[];
    gold?: number; // Starting gold if this option is chosen
}

export interface EquipmentConfig {
    className?: string;
    backgroundName?: string;
    options: EquipmentOption[];
}

// === Class Equipment Data ===

export const CLASS_EQUIPMENT: Record<string, EquipmentConfig> = {
    '野蛮人': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '巨斧', quantity: 1 },
                    { name: '手斧', quantity: 4 },
                    { name: '探险者背包', quantity: 1 },
                    { name: '标枪', quantity: 6 },
                ],
                gold: 15,
            },
            {
                id: 'B',
                label: '选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '吟游诗人': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '皮甲', quantity: 1 },
                    { name: '匕首', quantity: 2 },
                    { name: '娱乐者背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'weapon',
                        label: '选择一件武器',
                        options: [
                            { value: '细剑', label: '细剑' },
                            { value: '长剑', label: '长剑' },
                            { value: '短弓', label: '短弓 (含20支箭)' },
                        ],
                    },
                    {
                        id: 'instrument',
                        label: '选择乐器',
                        options: [
                            { value: '琵琶', label: '琵琶' },
                            { value: '竖琴', label: '竖琴' },
                            { value: '长笛', label: '长笛' },
                            { value: '鲁特琴', label: '鲁特琴' },
                        ],
                    },
                ],
                gold: 19,
            },
            {
                id: 'B',
                label: '选项 B (100 GP)',
                items: [],
                gold: 100,
            },
        ],
    },
    '牧师': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '链甲', quantity: 1 },
                    { name: '盾牌', quantity: 1 },
                    { name: '牧师背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'weapon',
                        label: '选择一件武器',
                        options: [
                            { value: '硬头锤', label: '硬头锤' },
                            { value: '战锤', label: '战锤' },
                        ],
                    },
                    {
                        id: 'holy_symbol',
                        label: '选择圣徽类型',
                        options: [
                            { value: '护身符', label: '圣徽 (护身符)' },
                            { value: '徽记', label: '圣徽 (徽记)' },
                            { value: '圣物匣', label: '圣徽 (圣物匣)' },
                        ],
                    },
                ],
                gold: 7,
            },
            {
                id: 'B',
                label: '选项 B (110 GP)',
                items: [],
                gold: 110,
            },
        ],
    },
    '德鲁伊': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '皮甲', quantity: 1 },
                    { name: '盾牌', quantity: 1 },
                    { name: '镰刀', quantity: 1 },
                    { name: '德鲁伊法器', quantity: 1 },
                    { name: '探险者背包', quantity: 1 },
                    { name: '草药工具', quantity: 1 },
                ],
                gold: 9,
            },
            {
                id: 'B',
                label: '选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '战士': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '链甲', quantity: 1 },
                    { name: '轻弩', quantity: 1 },
                    { name: '弩矢', quantity: 20 },
                    { name: '地城探索者背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'weapon_set',
                        label: '选择武器组合',
                        options: [
                            { value: '巨剑', label: '巨剑' },
                            { value: '长剑+盾牌', label: '长剑 + 盾牌' },
                            { value: '双长剑', label: '两把长剑' },
                        ],
                    },
                ],
                gold: 11,
            },
            {
                id: 'B',
                label: '选项 B (175 GP)',
                items: [],
                gold: 175,
            },
        ],
    },
    '武僧': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '飞镖', quantity: 5 },
                    { name: '探险者背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'weapon',
                        label: '选择一件武器',
                        options: [
                            { value: '短剑', label: '短剑' },
                            { value: '木棍', label: '木棍' },
                        ],
                    },
                ],
                gold: 11,
            },
            {
                id: 'B',
                label: '选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '圣武士': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '链甲', quantity: 1 },
                    { name: '盾牌', quantity: 1 },
                    { name: '标枪', quantity: 6 },
                    { name: '牧师背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'weapon',
                        label: '选择武器',
                        options: [
                            { value: '长剑', label: '长剑' },
                            { value: '战锤', label: '战锤' },
                        ],
                    },
                    {
                        id: 'holy_symbol',
                        label: '选择圣徽类型',
                        options: [
                            { value: '护身符', label: '圣徽 (护身符)' },
                            { value: '徽记', label: '圣徽 (徽记)' },
                        ],
                    },
                ],
                gold: 9,
            },
            {
                id: 'B',
                label: '选项 B (150 GP)',
                items: [],
                gold: 150,
            },
        ],
    },
    '游侠': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '皮甲', quantity: 1 },
                    { name: '长弓', quantity: 1 },
                    { name: '箭', quantity: 20 },
                    { name: '弯刀', quantity: 2 },
                    { name: '德鲁伊法器', quantity: 1 },
                    { name: '探险者背包', quantity: 1 },
                ],
                gold: 7,
            },
            {
                id: 'B',
                label: '选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '游荡者': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '皮甲', quantity: 1 },
                    { name: '短剑', quantity: 2 },
                    { name: '短弓', quantity: 1 },
                    { name: '箭', quantity: 20 },
                    { name: '盗贼工具', quantity: 1 },
                    { name: '盗贼背包', quantity: 1 },
                ],
                gold: 18,
            },
            {
                id: 'B',
                label: '选项 B (100 GP)',
                items: [],
                gold: 100,
            },
        ],
    },
    '术士': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '轻弩', quantity: 1 },
                    { name: '弩矢', quantity: 20 },
                    { name: '匕首', quantity: 2 },
                    { name: '地城探索者背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'focus',
                        label: '选择法器',
                        options: [
                            { value: '法器(水晶)', label: '奥术法器 (水晶)' },
                            { value: '法器(法杖)', label: '奥术法器 (法杖)' },
                        ],
                    },
                ],
                gold: 28,
            },
            {
                id: 'B',
                label: '选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '魔契师': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '皮甲', quantity: 1 },
                    { name: '镰刀', quantity: 1 },
                    { name: '匕首', quantity: 2 },
                    { name: '学者背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'focus',
                        label: '选择法器',
                        options: [
                            { value: '奥术法器', label: '奥术法器' },
                            { value: '法术组件袋', label: '法术组件袋' },
                        ],
                    },
                ],
                gold: 15,
            },
            {
                id: 'B',
                label: '选项 B (100 GP)',
                items: [],
                gold: 100,
            },
        ],
    },
    '法师': {
        options: [
            {
                id: 'A',
                label: '选项 A',
                items: [
                    { name: '木棍', quantity: 1 },
                    { name: '匕首', quantity: 1 },
                    { name: '法术书', quantity: 1 },
                    { name: '学者背包', quantity: 1 },
                ],
                subChoices: [
                    {
                        id: 'focus',
                        label: '选择法器',
                        options: [
                            { value: '奥术法器(水晶)', label: '奥术法器 (水晶)' },
                            { value: '奥术法器(法杖)', label: '奥术法器 (法杖)' },
                            { value: '奥术法器(宝珠)', label: '奥术法器 (宝珠)' },
                        ],
                    },
                ],
                gold: 5,
            },
            {
                id: 'B',
                label: '选项 B (55 GP)',
                items: [],
                gold: 55,
            },
        ],
    },
};

// === Background Equipment Data ===

export const BACKGROUND_EQUIPMENT: Record<string, EquipmentConfig> = {
    '侍僧': {
        options: [
            {
                id: 'A',
                label: '侍僧装备选项 A',
                items: [
                    { name: '书 (祈祷书)', quantity: 1, fromLibrary: true },
                    { name: '书法工具', quantity: 1, fromLibrary: true },
                    { name: '羊皮纸', quantity: 10, fromLibrary: true },
                    { name: '袍子', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'holy_symbol',
                        label: '选择圣徽类型',
                        options: [
                            { value: '护身符', label: '圣徽 (护身符)' },
                            { value: '徽记', label: '圣徽 (徽记)' },
                            { value: '圣物匣', label: '圣徽 (圣物匣)' },
                        ],
                    },
                ],
                gold: 8,
            },
            {
                id: 'B',
                label: '侍僧装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '工匠': {
        options: [
            {
                id: 'A',
                label: '工匠装备选项 A',
                items: [
                    { name: '小包', quantity: 2, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'artisan_tool',
                        label: '选择工匠工具',
                        options: [
                            { value: '炼金工具', label: '炼金工具' },
                            { value: '酿酒工具', label: '酿酒工具' },
                            { value: '书法工具', label: '书法工具' },
                            { value: '木匠工具', label: '木匠工具' },
                            { value: '制图工具', label: '制图工具' },
                            { value: '鞋匠工具', label: '鞋匠工具' },
                            { value: '厨师工具', label: '厨师工具' },
                            { value: '玻璃吹制工具', label: '玻璃吹制工具' },
                            { value: '珠宝匠工具', label: '珠宝匠工具' },
                            { value: '制革匠工具', label: '制革匠工具' },
                            { value: '石匠工具', label: '石匠工具' },
                            { value: '绘画工具', label: '绘画工具' },
                            { value: '陶匠工具', label: '陶匠工具' },
                            { value: '锻造工具', label: '锻造工具' },
                            { value: '修补匠工具', label: '修补匠工具' },
                            { value: '织布工具', label: '织布工具' },
                            { value: '木雕工具', label: '木雕工具' },
                        ]
                    }
                ],
                gold: 32,
            },
            {
                id: 'B',
                label: '工匠装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '骗子': {
        options: [
            {
                id: 'A',
                label: '骗子装备选项 A',
                items: [
                    { name: '文书伪造工具', quantity: 1, fromLibrary: true },
                    { name: '戏服', quantity: 1, fromLibrary: true },
                    { name: '高档服装', quantity: 1, fromLibrary: true },
                ],
                gold: 15,
            },
            {
                id: 'B',
                label: '骗子装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '罪犯': {
        options: [
            {
                id: 'A',
                label: '罪犯装备选项 A',
                items: [
                    { name: '匕首', quantity: 2, fromLibrary: true },
                    { name: '盗贼工具', quantity: 1, fromLibrary: true },
                    { name: '撬棍', quantity: 1, fromLibrary: true },
                    { name: '小包', quantity: 2, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                gold: 16,
            },
            {
                id: 'B',
                label: '罪犯装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '艺人': {
        options: [
            {
                id: 'A',
                label: '艺人装备选项 A',
                items: [
                    { name: '戏服', quantity: 2, fromLibrary: true },
                    { name: '镜子 (钢面)', quantity: 1, fromLibrary: true },
                    { name: '香水', quantity: 1, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'instrument',
                        label: '选择乐器',
                        options: [
                            { value: '琵琶', label: '琵琶' },
                            { value: '竖琴', label: '竖琴' },
                            { value: '长笛', label: '长笛' },
                            { value: '鲁特琴', label: '鲁特琴' },
                            { value: '手鼓', label: '手鼓' },
                        ],
                    },
                ],
                gold: 11,
            },
            {
                id: 'B',
                label: '艺人装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '农民': {
        options: [
            {
                id: 'A',
                label: '农民装备选项 A',
                items: [
                    { name: '镰刀', quantity: 1, fromLibrary: true },
                    { name: '木匠工具', quantity: 1, fromLibrary: true },
                    { name: '医疗包', quantity: 1, fromLibrary: true },
                    { name: '铁壶', quantity: 1, fromLibrary: true },
                    { name: '铲子', quantity: 1, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                gold: 30,
            },
            {
                id: 'B',
                label: '农民装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '警卫': {
        options: [
            {
                id: 'A',
                label: '警卫装备选项 A',
                items: [
                    { name: '矛', quantity: 1, fromLibrary: true },
                    { name: '轻弩', quantity: 1, fromLibrary: true },
                    { name: '弩矢', quantity: 20, fromLibrary: true },
                    { name: '附盖提灯', quantity: 1, fromLibrary: true },
                    { name: '镣铐', quantity: 1, fromLibrary: true },
                    { name: '箭袋', quantity: 1, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'gaming_set',
                        label: '选择游戏套组',
                        options: [
                            { value: '骰子套组', label: '骰子套组' },
                            { value: '龙象棋', label: '龙象棋' },
                            { value: '扑克牌', label: '扑克牌' },
                            { value: '三龙牌', label: '三龙牌' },
                        ]
                    }
                ],
                gold: 12,
            },
            {
                id: 'B',
                label: '警卫装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '向导': {
        options: [
            {
                id: 'A',
                label: '向导装备选项 A',
                items: [
                    { name: '短弓', quantity: 1, fromLibrary: true },
                    { name: '箭', quantity: 20, fromLibrary: true },
                    { name: '制图工具', quantity: 1, fromLibrary: true },
                    { name: '铺盖', quantity: 1, fromLibrary: true },
                    { name: '箭袋', quantity: 1, fromLibrary: true },
                    { name: '帐篷', quantity: 1, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                gold: 3,
            },
            {
                id: 'B',
                label: '向导装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '隐士': {
        options: [
            {
                id: 'A',
                label: '隐士装备选项 A',
                items: [
                    { name: '长棍', quantity: 1, fromLibrary: true },
                    { name: '草药工具', quantity: 1, fromLibrary: true },
                    { name: '铺盖', quantity: 1, fromLibrary: true },
                    { name: '书籍', quantity: 1, fromLibrary: true },
                    { name: '油灯', quantity: 1, fromLibrary: true },
                    { name: '燃油', quantity: 3, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                gold: 16,
            },
            {
                id: 'B',
                label: '隐士装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '商人': {
        options: [
            {
                id: 'A',
                label: '商人装备选项 A',
                items: [
                    { name: '领航工具', quantity: 1, fromLibrary: true },
                    { name: '小包', quantity: 2, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                gold: 22,
            },
            {
                id: 'B',
                label: '商人装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '贵族': {
        options: [
            {
                id: 'A',
                label: '贵族装备选项 A',
                items: [
                    { name: '高档服装', quantity: 1, fromLibrary: true },
                    { name: '图章戒指', quantity: 1, fromLibrary: true },
                    { name: '香水', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'gaming_set',
                        label: '选择游戏套组',
                        options: [
                            { value: '骰子套组', label: '骰子套组' },
                            { value: '龙象棋', label: '龙象棋' },
                            { value: '扑克牌', label: '扑克牌' },
                            { value: '三龙牌', label: '三龙牌' },
                        ]
                    }
                ],
                gold: 29,
            },
            {
                id: 'B',
                label: '贵族装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '智者': {
        options: [
            {
                id: 'A',
                label: '智者装备选项 A',
                items: [
                    { name: '长棍', quantity: 1, fromLibrary: true },
                    { name: '书法工具', quantity: 1, fromLibrary: true },
                    { name: '书籍', quantity: 1, fromLibrary: true },
                    { name: '羊皮纸', quantity: 8, fromLibrary: true },
                    { name: '长袍', quantity: 1, fromLibrary: true },
                ],
                gold: 8,
            },
            {
                id: 'B',
                label: '智者装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '水手': {
        options: [
            {
                id: 'A',
                label: '水手装备选项 A',
                items: [
                    { name: '匕首', quantity: 1, fromLibrary: true },
                    { name: '领航工具', quantity: 1, fromLibrary: true },
                    { name: '麻绳 (50尺)', quantity: 1, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                gold: 20,
            },
            {
                id: 'B',
                label: '水手装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '抄写员': {
        options: [
            {
                id: 'A',
                label: '抄写员装备选项 A',
                items: [
                    { name: '书法工具', quantity: 1, fromLibrary: true },
                    { name: '高档服装', quantity: 1, fromLibrary: true },
                    { name: '油灯', quantity: 1, fromLibrary: true },
                    { name: '燃油', quantity: 3, fromLibrary: true },
                    { name: '羊皮纸', quantity: 12, fromLibrary: true },
                ],
                gold: 23,
            },
            {
                id: 'B',
                label: '抄写员装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '士兵': {
        options: [
            {
                id: 'A',
                label: '士兵装备选项 A',
                items: [
                    { name: '矛', quantity: 1, fromLibrary: true },
                    { name: '短弓', quantity: 1, fromLibrary: true },
                    { name: '箭', quantity: 20, fromLibrary: true },
                    { name: '医疗包', quantity: 1, fromLibrary: true },
                    { name: '箭袋', quantity: 1, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'gaming_set',
                        label: '选择游戏套组',
                        options: [
                            { value: '骰子套组', label: '骰子套组' },
                            { value: '龙象棋', label: '龙象棋' },
                            { value: '扑克牌', label: '扑克牌' },
                            { value: '三龙牌', label: '三龙牌' },
                        ]
                    }
                ],
                gold: 14,
            },
            {
                id: 'B',
                label: '士兵装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
    '流浪者': {
        options: [
            {
                id: 'A',
                label: '流浪者装备选项 A',
                items: [
                    { name: '匕首', quantity: 2, fromLibrary: true },
                    { name: '盗贼工具', quantity: 1, fromLibrary: true },
                    { name: '铺盖', quantity: 1, fromLibrary: true },
                    { name: '小包', quantity: 2, fromLibrary: true },
                    { name: '旅行者服装', quantity: 1, fromLibrary: true },
                ],
                subChoices: [
                    {
                        id: 'gaming_set',
                        label: '选择游戏套组',
                        options: [
                            { value: '骰子套组', label: '骰子套组' },
                            { value: '龙象棋', label: '龙象棋' },
                            { value: '扑克牌', label: '扑克牌' },
                            { value: '三龙牌', label: '三龙牌' },
                        ]
                    }
                ],
                gold: 16,
            },
            {
                id: 'B',
                label: '流浪者装备选项 B (50 GP)',
                items: [],
                gold: 50,
            },
        ],
    },
};

// === Helper Functions ===

/**
 * Calculate starting inventory based on equipment choices
 */
export function calculateStartingInventory(
    className: string,
    classChoice: 'A' | 'B' | '',
    classSubChoices: Record<string, string>,
    backgroundName: string,
    backgroundChoice: 'A' | 'B' | '',
    backgroundSubChoices: Record<string, string>
): { inventory: { name: string; quantity: number; source: string }[]; gold: number } {
    const inventory: { name: string; quantity: number; source: string }[] = [];
    let gold = 0;

    // Class equipment
    const classEquip = CLASS_EQUIPMENT[className];
    if (classEquip && classChoice) {
        const option = classEquip.options.find(o => o.id === classChoice);
        if (option) {
            option.items.forEach(item => {
                inventory.push({ name: item.name, quantity: item.quantity, source: `职业: ${className}` });
            });
            gold += option.gold || 0;

            // Add sub-choice items
            option.subChoices?.forEach(sc => {
                const selectedValue = classSubChoices[sc.id];
                if (selectedValue) {
                    const selectedOption = sc.options.find(o => o.value === selectedValue);
                    if (selectedOption) {
                        if (selectedOption.items) {
                            selectedOption.items.forEach(item => {
                                inventory.push({ name: item.name, quantity: item.quantity, source: `职业: ${className}` });
                            });
                        } else {
                            inventory.push({ name: selectedValue, quantity: 1, source: `职业: ${className}` });
                        }
                    }
                }
            });
        }
    }

    // Background equipment
    const bgEquip = BACKGROUND_EQUIPMENT[backgroundName];
    if (bgEquip && backgroundChoice) {
        const option = bgEquip.options.find(o => o.id === backgroundChoice);
        if (option) {
            option.items.forEach(item => {
                inventory.push({ name: item.name, quantity: item.quantity, source: `背景: ${backgroundName}` });
            });
            gold += option.gold || 0;

            option.subChoices?.forEach(sc => {
                const selectedValue = backgroundSubChoices[sc.id];
                if (selectedValue) {
                    inventory.push({ name: selectedValue, quantity: 1, source: `背景: ${backgroundName}` });
                }
            });
        }
    }

    return { inventory, gold };
}

/**
 * Get all skill proficiency sources for display
 */
export function getAllSkillSources(character: {
    className?: string;
    background?: string;
    race?: string;
    originFeat?: string;
    proficiencySources?: {
        skills: { class: string[]; background: string[]; species: string[]; feat: string[] };
    };
}): { skill: string; source: string }[] {
    const sources: { skill: string; source: string }[] = [];

    if (character.proficiencySources?.skills) {
        character.proficiencySources.skills.class.forEach(s =>
            sources.push({ skill: s, source: `职业: ${character.className}` }));
        character.proficiencySources.skills.background.forEach(s =>
            sources.push({ skill: s, source: `背景: ${character.background}` }));
        character.proficiencySources.skills.species.forEach(s =>
            sources.push({ skill: s, source: `种族: ${character.race}` }));
        character.proficiencySources.skills.feat.forEach(s =>
            sources.push({ skill: s, source: `专长: ${character.originFeat}` }));
    }

    return sources;
}

// 武器关键词列表
const WEAPON_KEYWORDS = [
    '剑', '斧', '锤', '弓', '弩', '矛', '枪', '戟', '鞭', '匕首', '飞镖',
    '标枪', '镰刀', '连枷', '棍', '杖', '叉', '刀',
    '巨斧', '手斧', '战斧', '细剑', '长剑', '短剑', '双刀', '弯刀',
    '战锤', '硬头锤', '长弓', '短弓', '轻弩', '重弩', '长矛', '三叉戟',
    '木棍', '长棍', '狼牙棒'
];

// 护甲关键词列表
const ARMOR_KEYWORDS = [
    '甲', '盾', '盾牌', '护胸', '护腕',
    '皮甲', '链甲', '板甲', '鳞甲', '锁甲', '胸甲', '半身甲',
    '镶钉皮甲', '链甲衫'
];

/**
 * 将startingInventory转换为背包分类物品
 * - 正确检测工具并分离到tools数组
 * - 展开套组物品为个别物品
 * - 优先使用物品库描述
 */
export function convertStartingInventoryToBackpack(
    startingInventory: { name: string; quantity: number; source: string }[]
): {
    weapons: { id: string; name: string; quantity: number; cost: string; weight: string; type: '武器'; source: string; description: string }[];
    armor: { id: string; name: string; quantity: number; cost: string; weight: string; type: '护甲'; source: string; description: string }[];
    gear: { id: string; name: string; quantity: number; cost: string; weight: string; type: '杂物'; source: string; description: string }[];
    tools: { id: string; name: string; note: string }[];
} {
    const weapons: { id: string; name: string; quantity: number; cost: string; weight: string; type: '武器'; source: string; description: string }[] = [];
    const armor: { id: string; name: string; quantity: number; cost: string; weight: string; type: '护甲'; source: string; description: string }[] = [];
    const gear: { id: string; name: string; quantity: number; cost: string; weight: string; type: '杂物'; source: string; description: string }[] = [];
    const tools: { id: string; name: string; note: string }[] = [];

    // Helper to find item in weapon/armor/gear DBs
    const findItemInDB = (name: string) => {
        // Try strict match first
        let item = WEAPON_DB.find(i => i.name === name) ||
            ARMOR_DB.find(i => i.name === name) ||
            GEAR_DB.find(i => i.name === name);

        if (item) return item;

        // Try fuzzy match (e.g. "Longsword" matches "Longsword (Versatile)")
        item = WEAPON_DB.find(i => i.name.includes(name)) ||
            ARMOR_DB.find(i => i.name.includes(name)) ||
            GEAR_DB.find(i => i.name.includes(name));

        return item;
    };

    // Helper to find tool in TOOL_DB
    const findToolInDB = (name: string) => {
        let tool = TOOL_DB.find(t => t.name === name);
        if (tool) return tool;
        // Fuzzy match for tools
        tool = TOOL_DB.find(t => t.name.includes(name) || name.includes(t.name));
        return tool;
    };

    // Tool name keywords for detection
    const TOOL_KEYWORDS = [
        '工具', '工匠', '炼金', '酿酒', '书法', '木匠', '制图', '鞋匠', '厨师',
        '玻璃吹制', '珠宝匠', '制革匠', '石匠', '绘画', '陶匠', '锻造', '修补匠',
        '织布', '木雕', '易容', '文书伪造', '草药', '盗贼工具', '领航', '赌具', '乐器',
        '琵琶', '竖琴', '长笛', '鲁特琴', '手鼓', '号角', '肖姆管', '维奥尔琴', '扬琴',
        '骰子套组', '龙象棋', '扑克牌', '三龙牌'
    ];

    // Process each item, potentially expanding packs
    const processItem = (item: { name: string; quantity: number; source: string }, index: number) => {
        // Check if this is a pack that should be expanded
        const packContents = PACK_CONTENTS[item.name];
        if (packContents) {
            // Expand pack into individual items
            packContents.forEach((packItem, subIndex) => {
                processItem(
                    {
                        name: packItem.name,
                        quantity: packItem.quantity * item.quantity,
                        source: item.source
                    },
                    index * 100 + subIndex
                );
            });
            return;
        }

        // Check if it's a tool first
        const toolItem = findToolInDB(item.name);
        if (toolItem || TOOL_KEYWORDS.some(kw => item.name.includes(kw))) {
            tools.push({
                id: toolItem?.id || `tool-${index}-${Date.now()}`,
                name: toolItem?.name || item.name,
                note: item.source
            });
            return;
        }

        // Look up item stats from DB
        const dbItem = findItemInDB(item.name);

        const baseItem = {
            id: dbItem ? `${dbItem.id}-${index}-${Date.now()}` : `starting-${index}-${Date.now()}`,
            name: dbItem ? dbItem.name : item.name,
            quantity: item.quantity,
            cost: dbItem?.cost || '-',
            weight: dbItem?.weight || '-',
            source: item.source,
            // Use library description, only fallback to source if not found
            description: dbItem?.description || '',
            // Copy other potential properties if they exist
            ...(dbItem || {})
        };

        // Determine Type
        let type = '杂物';
        if (dbItem) {
            if (dbItem.type === '武器') type = '武器';
            else if (dbItem.type === '护甲') type = '护甲';
            else type = '杂物';
        } else {
            if (WEAPON_KEYWORDS.some(kw => item.name.includes(kw))) type = '武器';
            else if (ARMOR_KEYWORDS.some(kw => item.name.includes(kw))) type = '护甲';
        }

        // Push to appropriate list
        if (type === '武器') {
            // @ts-ignore - Validated by logic above
            weapons.push({ ...baseItem, type: '武器' });
        } else if (type === '护甲') {
            // @ts-ignore
            armor.push({ ...baseItem, type: '护甲' });
        } else {
            // @ts-ignore
            gear.push({ ...baseItem, type: '杂物' });
        }
    };

    startingInventory.forEach((item, index) => {
        processItem(item, index);
    });

    return { weapons, armor, gear, tools };
}

