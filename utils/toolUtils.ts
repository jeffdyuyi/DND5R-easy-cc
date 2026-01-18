// 工具分类数据

export const TOOL_CATEGORIES: Record<string, string[]> = {
    "一种赌具": ["骰子组", "纸牌组"],
    "一种乐器": ["风笛", "鼓", "扬琴", "长笛", "竖琴", "琉特琴", "里拉琴", "圆号", "芦笙", "琵琶", "二胡", "古筝"],
    "一种工匠工具": ["炼金工具", "酿造工具", "书法工具", "木工工具", "制图工具", "钴工工具", "玻璃工工具", "珠宝工具", "皮革工工具", "石匠工具", "绘画工具", "陶工工具", "铁匠工具", "补鞋匠工具", "修补工具", "织匠工具", "木工工具"],
    "一种游戏组": ["骰子组", "纸牌组", "棋子组"],
    "盗贼工具": ["盗贼工具"],
    "草药工具": ["草药工具"],
    "领航工具": ["领航工具"],
    "制毒工具": ["制毒工具"],
    "易容工具": ["易容工具"],
    "伪造工具": ["伪造工具"],
};

// 解析背景工具字符串，返回匹配的分类
export function parseToolProficiency(toolString: string): string[] | null {
    const lowerStr = toolString.toLowerCase();

    // 精确匹配
    if (TOOL_CATEGORIES[toolString]) {
        return TOOL_CATEGORIES[toolString];
    }

    // 包含匹配
    for (const [key, tools] of Object.entries(TOOL_CATEGORIES)) {
        if (lowerStr.includes(key.toLowerCase().replace("一种", "")) ||
            toolString.includes(key)) {
            return tools;
        }
    }

    // 模糊匹配关键词
    if (lowerStr.includes("赌具") || lowerStr.includes("游戏")) {
        return TOOL_CATEGORIES["一种赌具"];
    }
    if (lowerStr.includes("乐器") || lowerStr.includes("音乐")) {
        return TOOL_CATEGORIES["一种乐器"];
    }
    if (lowerStr.includes("工匠") || lowerStr.includes("制作")) {
        return TOOL_CATEGORIES["一种工匠工具"];
    }

    // 未找到分类则返回null（表示固定工具，无需选择）
    return null;
}
