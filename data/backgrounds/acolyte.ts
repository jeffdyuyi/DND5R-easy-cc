import { BackgroundItem } from '../../types';

export const ACOLYTE: BackgroundItem = {
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
};
