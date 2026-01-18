
// Equipment Data Utilities
// Structured equipment options for classes and backgrounds

// Note: These imports are available for future use when implementing item lookups
// import { WEAPON_DB } from '../data-items-weapons';
// import { ARMOR_DB } from '../data-items-armor';
// import { GEAR_DB } from '../data-items-gear';

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
    '侍祭': {
        options: [
            {
                id: 'A',
                label: '侍祭装备选项 A',
                items: [
                    { name: '书 (祈祷书)', quantity: 1 },
                    { name: '书法工具', quantity: 1 },
                    { name: '羊皮纸', quantity: 10 },
                    { name: '袍子', quantity: 1 },
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
                label: '侍祭装备选项 B (50 GP)',
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
                    { name: '匕首', quantity: 2 },
                    { name: '盗贼工具', quantity: 1 },
                    { name: '撬棍', quantity: 1 },
                    { name: '斗篷 (兜帽)', quantity: 1 },
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
                    { name: '华服', quantity: 1 },
                    { name: '镜子 (钢制)', quantity: 1 },
                    { name: '香水', quantity: 1 },
                    { name: '化妆工具', quantity: 1 },
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
    '农夫': {
        options: [
            {
                id: 'A',
                label: '农夫装备选项 A',
                items: [
                    { name: '镰刀', quantity: 1 },
                    { name: '铲子', quantity: 1 },
                    { name: '铁锅', quantity: 1 },
                    { name: '干草叉', quantity: 1 },
                    { name: '袍子', quantity: 1 },
                ],
                gold: 30,
            },
            {
                id: 'B',
                label: '农夫装备选项 B (50 GP)',
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
                    { name: '华服', quantity: 1 },
                    { name: '印章戒指', quantity: 1 },
                    { name: '香水', quantity: 1 },
                    { name: '卷轴 (族谱)', quantity: 1 },
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
    '贤者': {
        options: [
            {
                id: 'A',
                label: '贤者装备选项 A',
                items: [
                    { name: '书 (历史)', quantity: 1 },
                    { name: '书 (神秘学)', quantity: 1 },
                    { name: '羊皮纸', quantity: 10 },
                    { name: '墨水', quantity: 1 },
                    { name: '墨水笔', quantity: 1 },
                    { name: '袍子', quantity: 1 },
                ],
                gold: 8,
            },
            {
                id: 'B',
                label: '贤者装备选项 B (50 GP)',
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
                    { name: '长矛', quantity: 1 },
                    { name: '短弓', quantity: 1 },
                    { name: '箭', quantity: 20 },
                    { name: '被褥 (小件纪念品)', quantity: 1 },
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
                    { name: '狼牙棒', quantity: 1 },
                    { name: '地图 (羊皮纸)', quantity: 1 },
                    { name: '望远镜', quantity: 1 },
                    { name: '旅行者服装', quantity: 1 },
                    { name: '绳索 (大麻绳, 50尺)', quantity: 1 },
                ],
                gold: 5,
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
 */
export function convertStartingInventoryToBackpack(
    startingInventory: { name: string; quantity: number; source: string }[]
): {
    weapons: { id: string; name: string; quantity: number; cost: string; weight: string; type: '武器'; source: string; description: string }[];
    armor: { id: string; name: string; quantity: number; cost: string; weight: string; type: '护甲'; source: string; description: string }[];
    gear: { id: string; name: string; quantity: number; cost: string; weight: string; type: '杂物'; source: string; description: string }[];
} {
    const weapons: { id: string; name: string; quantity: number; cost: string; weight: string; type: '武器'; source: string; description: string }[] = [];
    const armor: { id: string; name: string; quantity: number; cost: string; weight: string; type: '护甲'; source: string; description: string }[] = [];
    const gear: { id: string; name: string; quantity: number; cost: string; weight: string; type: '杂物'; source: string; description: string }[] = [];

    startingInventory.forEach((item, index) => {
        const baseItem = {
            id: `starting-${index}-${Date.now()}`,
            name: item.name,
            quantity: item.quantity,
            cost: '-',
            weight: '-',
            source: item.source,
            description: `来自${item.source}`,
        };

        // 检查是否为武器
        if (WEAPON_KEYWORDS.some(kw => item.name.includes(kw))) {
            weapons.push({ ...baseItem, type: '武器' as const });
        }
        // 检查是否为护甲
        else if (ARMOR_KEYWORDS.some(kw => item.name.includes(kw))) {
            armor.push({ ...baseItem, type: '护甲' as const });
        }
        // 其他归为杂物
        else {
            gear.push({ ...baseItem, type: '杂物' as const });
        }
    });

    return { weapons, armor, gear };
}

