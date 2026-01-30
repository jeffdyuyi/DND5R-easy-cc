import { ClassItem, SubclassItem } from '../../types';

export const PALADIN_CLASS: ClassItem = {
    id: "paladin-2024",
    name: "圣武士",
    source: "官方规则",
    description: "至圣斩警告\n灵光护体\n圣疗摸摸\n誓言约束\n爆发真神",
    hitDie: "d10",
    primaryAbility: "力量和魅力",
    saves: ["智慧", "魅力"],
    tags: ["坦克", "爆发", "治疗"],
    coreTraits: {
        primaryAbility: "力量与魅力",
        hitPointDie: "每圣武士等级 d10",
        savingThrows: "感知与魅力",
        skillProficiencies: "选择2项：运动、洞悉、威吓、医疗、说服或宗教",
        weaponProficiencies: "简易武器、军用武器",
        armorTraining: "轻甲、中甲、重甲与盾牌",
        startingEquipment: {
            optionA: "链甲，盾牌，长剑，6 根标枪，圣徽，祭司套组，以及 9GP",
            optionB: "150 GP"
        }
    },
    subclassLevel: 3,
    subclasses: [],
    features: [
        { level: 1, name: "圣疗 (Lay on Hands)", description: "拥有治疗池，可以接触生物恢复其生命值。" },
        { level: 1, name: "施法", description: "你可以施展圣武士法术。" },
        { level: 1, name: "武器精通", description: "掌握武器的精通特性。" },
        { level: 2, name: "战斗风格", description: "选择一种战斗风格。" },
        { level: 2, name: "圣武斩 (Divine Smite)", description: "现在是一个法术，消耗法术位造成光耀伤害。" },
        { level: 3, name: "引导神力", description: "引导神圣能量产生效应。" },
        { level: 3, name: "圣武士子职", description: "立下神圣誓言。" },
        { level: 4, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 5, name: "额外攻击", description: "攻击动作可进行两次攻击。" },
        { level: 5, name: "信实坐骑", description: "获得召唤坐骑法术，且施展时不消耗法术位（每日一次）。" },
        { level: 6, name: "守护灵光", description: "你和周围盟友的豁免检定获得你的魅力调整值加值。" },
        { level: 7, name: "子职特性", description: "获得誓言特性。" },
        { level: 8, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 9, name: "弃绝众敌", description: "引导神力选项：惊吓敌人。" },
        { level: 10, name: "勇气灵光", description: "你和周围盟友免疫恐慌。" },
        { level: 11, name: "光耀打击", description: "你的所有近战武器攻击都造成额外光耀伤害。" },
        { level: 12, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 14, name: "复原之触", description: "你可以使用圣疗移除某些状态。" },
        { level: 15, name: "子职特性", description: "获得誓言特性。" },
        { level: 16, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 18, name: "灵光增效", description: "灵光范围增加。" },
        { level: 19, name: "传奇恩惠", description: "获得一项传奇恩惠专长。" },
        { level: 20, name: "子职特性", description: "获得誓言的最终化身特性。" }
    ]
};

export const PALADIN_SUBCLASSES: SubclassItem[] = [
    {
        id: "paladin-devotion",
        name: "奉献之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "传统的正义圣骑士，代表荣耀、责任和怜悯。",
        features: [
            { level: 3, name: "奉献之誓法术 (Oath of Devotion Spells)", description: "始终准备：防护善恶, 虔诚护盾 (Lv3); 援助术, 诚实之域 (Lv5); 希望信标, 解除魔法 (Lv9); 行动自如, 信实守卫 (Lv13); 通神术, 焰击术 (Lv17)。" },
            { level: 3, name: "圣洁武器 (Sacred Weapon)", description: "攻击动作时消耗引导神力。武器攻击检定+魅力调整值（至少+1）。可造成光耀伤害。发出明亮光照。持续10分钟或放下武器。" },
            { level: 7, name: "奉献灵光 (Aura of Devotion)", description: "你与守护灵光内盟友获得魅惑免疫。陷入魅惑的盟友进入灵光时，该状态暂时无效。" },
            { level: 15, name: "卫护斩 (Smite of Protection)", description: "施展至圣斩时，直到你下回合开始，你和守护灵光内的盟友获得半掩护。" },
            { level: 20, name: "至圣光轮 (Holy Nimbus)", description: "附赠动作。10分钟。对抗邪魔/不死生物的豁免优势。灵光内敌人回合开始受光耀伤害（魅力+熟练）。灵光内视为阳光。长休或耗5环法术位恢复。" }
        ]
    },
    {
        id: "paladin-glory",
        name: "荣耀之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "追求英雄事迹和荣耀。",
        features: [
            { level: 3, name: "荣耀之誓法术 (Oath of Glory Spells)", description: "始终准备：光导箭, 英雄气概 (Lv3); 强化属性, 魔化武器 (Lv5); 加速术, 防护能量伤害 (Lv9); 强迫术, 行动自如 (Lv13); 通晓传奇, 悠兰德的王者威仪 (Lv17)。" },
            { level: 3, name: "鼓舞斩 (Inspiring Smite)", description: "施展至圣斩后，消耗引导神力。分配 2d8+圣武士等级 的临时HP给30尺内生物（含自己）。" },
            { level: 3, name: "绝伦健将 (Peerless Athlete)", description: "附赠动作消耗引导神力。1小时内：运动/体操优势，跳跃距离增加10尺。" },
            { level: 7, name: "迅捷灵光 (Aura of Alacrity)", description: "自身速度+10尺。盟友在灵光内开始回合或首次进入时，该回合速度+10尺。" },
            { level: 15, name: "辉煌防御 (Glorious Defense)", description: "被攻击命中时，反应使目标AC增加魅力调整值（可能导致失手）。若导致失手且攻击者在射程内，对其发动一次武器攻击（作为反应一部分）。次数=魅力调整值。长休恢复。" },
            { level: 20, name: "现世传说 (Living Legend)", description: "附赠动作。10分钟。魅力检定优势。豁免失败可用反应重投。每回合一次攻击失手可改为命中。长休或耗5环法术位恢复。" }
        ]
    },
    {
        id: "paladin-ancients",
        name: "古贤之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "守护光与自然，对抗黑暗。",
        features: [
            { level: 3, name: "古贤之誓法术 (Oath of the Ancients Spells)", description: "始终准备：捕获打击, 动物交谈术 (Lv3); 迷踪步, 月华之光 (Lv5); 植物滋长, 防护能量伤害 (Lv9); 冰风暴, 石肤术 (Lv13); 问道自然, 树跃术 (Lv17)。" },
            { level: 3, name: "自然之怒 (Nature's Wrath)", description: "魔法动作消耗引导神力。15尺内可见生物力量豁免，失败则束缚1分钟。回合结束可重豁免。" },
            { level: 7, name: "守御灵光 (Aura of Warding)", description: "你和灵光内盟友获得对黯蚀、心灵及光耀伤害的抗性。" },
            { level: 15, name: "不灭哨卫 (Undying Sentinel)", description: "生命降至0时可改为1（长休一次）。不因魔法衰老，外表不老。" },
            { level: 20, name: "上古斗士 (Elder Champion)", description: "附赠动作。10分钟。灵光内敌人对自己法术/引导神力豁免劣势。每回合开始回10HP。施法时间1动作的法术可改为附赠动作。长休或耗5环法术位恢复。" }
        ]
    },
    {
        id: "paladin-vengeance",
        name: "复仇之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "为了惩恶扬善不择手段。",
        features: [
            { level: 3, name: "复仇之誓法术 (Oath of Vengeance Spells)", description: "始终准备：灾祸术, 猎人印记 (Lv3); 人类定身术, 迷踪步 (Lv5); 加速术, 防护能量伤害 (Lv9); 放逐术, 任意门 (Lv13); 怪物定身术, 探知 (Lv17)。" },
            { level: 3, name: "仇敌誓言 (Vow of Enmity)", description: "攻击动作时消耗引导神力。30尺内一可见生物。1分钟内对其攻击优势。若目标归0，可转移誓言（无需动作）。" },
            { level: 7, name: "坚韧复仇 (Relentless Avenger)", description: "借机攻击命中后，目标速度降为0（本回合）。你可移动半速（不引发借机）。" },
            { level: 15, name: "复仇之魂 (Soul of Vengeance)", description: "誓言目标攻击时，反应对其发动近战攻击。" },
            { level: 20, name: "复仇天使 (Avenging Angel)", description: "附赠动作。10分钟。飞行速度60尺（悬浮）。灵光内敌人开始回合需感知豁免，否则恐慌1分钟。对恐慌目标攻击优势。长休或耗5环法术位恢复。" }
        ]
    }
];
