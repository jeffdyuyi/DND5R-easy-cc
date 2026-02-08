import { ClassItem, SubclassItem } from '../../types';

export const PALADIN_CLASS: ClassItem = {
    id: "paladin-2024",
    name: "圣武士",
    source: "官方规则",
    description: "圣武士们在各自的誓言下团结一致，对抗毁灭和腐化的力量。他们也许是在神坛前由祭司见证宣誓，或在林中圣地向自然精魄许下承诺，又或是面临绝望与灾难却只有死者见证下立约，所有这些圣武士誓言都是极强的契约。而正是誓言的伟力才让一名虔诚的战士化作身负祝福的勇者。\n\n圣武士经年累月苦练战技，并精通各种武器与护甲。即便如此，其行使的魔法力量还要更甚于其武艺。他们以之治疗伤患，斩杀妄邪，守护清白者和所有为公义而战的同伴。\n\n圣武士的存在本身即决定了其为冒险而生，圣武士们在一线对抗毁灭的身影遍布多元宇宙。如果说军伍之中能够找到的战士寥寥可数，那么能够受到感召的圣武士更是凤毛麟角。而这些勇士们受到感召时，都会义无反顾地放弃所拥有的身份地位，义无反顾的加入对抗邪恶的战斗中。",
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
    classTable: {
        title: "圣武士特性 Paladin Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "引导神力", key: "channel_divinity" },
            { header: "准备法术", key: "prepared_spells" },
            { header: "一环", key: "slots_1st" },
            { header: "二环", key: "slots_2nd" },
            { header: "三环", key: "slots_3rd" },
            { header: "四环", key: "slots_4th" },
            { header: "五环", key: "slots_5th" }
        ],
        rows: [
            { level: 1, pb: "+2", features: ["圣疗", "施法", "武器精通"], channel_divinity: "—", prepared_spells: "2", slots_1st: "2", slots_2nd: "—", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 2, pb: "+2", features: ["战斗风格", "圣武斩"], channel_divinity: "—", prepared_spells: "3", slots_1st: "2", slots_2nd: "—", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 3, pb: "+2", features: ["引导神力", "圣武士子职"], channel_divinity: "2", prepared_spells: "4", slots_1st: "3", slots_2nd: "—", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], channel_divinity: "2", prepared_spells: "5", slots_1st: "3", slots_2nd: "—", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 5, pb: "+3", features: ["额外攻击", "信实坐骑"], channel_divinity: "2", prepared_spells: "6", slots_1st: "4", slots_2nd: "2", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 6, pb: "+3", features: ["守护灵光"], channel_divinity: "2", prepared_spells: "6", slots_1st: "4", slots_2nd: "2", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 7, pb: "+3", features: ["子职特性"], channel_divinity: "2", prepared_spells: "7", slots_1st: "4", slots_2nd: "3", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], channel_divinity: "2", prepared_spells: "7", slots_1st: "4", slots_2nd: "3", slots_3rd: "—", slots_4th: "—", slots_5th: "—" },
            { level: 9, pb: "+4", features: ["弃绝众敌"], channel_divinity: "2", prepared_spells: "9", slots_1st: "4", slots_2nd: "3", slots_3rd: "2", slots_4th: "—", slots_5th: "—" },
            { level: 10, pb: "+4", features: ["勇气灵光"], channel_divinity: "2", prepared_spells: "9", slots_1st: "4", slots_2nd: "3", slots_3rd: "2", slots_4th: "—", slots_5th: "—" },
            { level: 11, pb: "+4", features: ["光耀打击"], channel_divinity: "3", prepared_spells: "10", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "—", slots_5th: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], channel_divinity: "3", prepared_spells: "10", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "—", slots_5th: "—" },
            { level: 13, pb: "+5", features: ["—"], channel_divinity: "3", prepared_spells: "11", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "1", slots_5th: "—" },
            { level: 14, pb: "+5", features: ["复原之触"], channel_divinity: "3", prepared_spells: "11", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "1", slots_5th: "—" },
            { level: 15, pb: "+5", features: ["子职特性"], channel_divinity: "3", prepared_spells: "12", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "2", slots_5th: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], channel_divinity: "3", prepared_spells: "12", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "2", slots_5th: "—" },
            { level: 17, pb: "+6", features: ["—"], channel_divinity: "3", prepared_spells: "14", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "3", slots_5th: "1" },
            { level: 18, pb: "+6", features: ["灵光增效"], channel_divinity: "3", prepared_spells: "14", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "3", slots_5th: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], channel_divinity: "3", prepared_spells: "15", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "3", slots_5th: "2" },
            { level: 20, pb: "+6", features: ["子职特性"], channel_divinity: "3", prepared_spells: "15", slots_1st: "4", slots_2nd: "3", slots_3rd: "3", slots_4th: "3", slots_5th: "2" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "圣疗 (Lay on Hands)",
            description: "你拥有治疗能量池，其总值等于**圣武士等级×5**（长休恢复）。\n你可以以**附赠动作**触碰生物恢复其生命值。此外，你也可以消耗**5点**治疗量来移除目标身上的**中毒**状态，而非恢复生命值。"
        },
        {
            level: 1,
            name: "施法 (Spellcasting)",
            description: "你学会了通过祈祷与冥想施法。\n**准备法术**：长休时选择准备法术，数量见职业表（等级+魅力调整值，最少1）。\n**施法属性**：魅力。\n**法器**：圣徽。\n**施法规则**：长休重获所有法术位。可任意更改准备法术（需长休）。"
        },
        {
            level: 1,
            name: "武器精通 (Weapon Mastery)",
            description: "选择**2种**你熟练的武器，掌握其**精通特性**。每当你完成一次长休时，你可以改变你所选择的武器类型。"
        },
        {
            level: 2,
            name: "战斗风格 (Fighting Style)",
            description: "你获得一项**战斗风格专长**。\n或者选择**受祝福的勇士 (Blessed Warrior)**：习得两个牧师戏法，施法属性为魅力。每级可更换一个。"
        },
        {
            level: 2,
            name: "圣武斩 (Paladin's Smite)",
            description: "你始终准备着法术**至圣斩 (Divine Smite)**。此外，你可以**不消耗法术位**地施展该法术一次（长休恢复）。",
            grants: {
                preparedSpells: ["至圣斩"]
            }
        },
        {
            level: 3,
            name: "引导神力 (Channel Divinity)",
            description: "你能引导神圣能量产生效应。次数见职业表（3级2次，11级3次）。**短休**恢复一次，**长休**恢复所有。\n**神圣感知 (Divine Sense)**：附赠动作。10分钟。侦测60尺内的**天族、邪魔、亡灵**的位置与类型，以及圣居/亵渎之地。"
        },
        {
            level: 3,
            name: "圣武士子职 (Paladin Subclass)",
            description: "选择一个圣武士誓言（子职）：**奉献之誓、荣耀之誓、古贤之誓**或**复仇之誓**。"
        },
        {
            level: 4,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得一项**属性值提升专长**或其他你满足条件的专长。"
        },
        {
            level: 5,
            name: "额外攻击 (Extra Attack)",
            description: "当你在你的回合中执行攻击动作时，你可以发动**两次**而非一次攻击。"
        },
        {
            level: 5,
            name: "信实坐骑 (Faithful Steed)",
            description: "你始终准备着法术**寻获坐骑 (Find Steed)**。此外，你可以**不消耗法术位**地施展该法术一次（长休恢复）。",
            grants: {
                preparedSpells: ["寻获坐骑"]
            }
        },
        {
            level: 6,
            name: "守护灵光 (Aura of Protection)",
            description: "你散发出**10尺**的保护灵光（失能时失效）。\n你与灵光内盟友的**豁免检定**获得相当于你**魅力调整值**的加值（至少+1）。"
        },
        {
            level: 7,
            name: "子职特性",
            description: "获得你所选誓言的7级特性。"
        },
        {
            level: 8,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得一项**属性值提升专长**或其他你满足条件的专长。"
        },
        {
            level: 9,
            name: "弃绝众敌 (Abjure Foes)",
            description: "引导神力选项。花费**魔法动作**。选择60尺内至多**魅力调整值**（最少1）个可见生物。\n目标需进行**感知豁免**，失败则**恐慌**1分钟（受伤害结束）。恐慌期间每回合只能执行：移动、动作或附赠动作（三选一）。"
        },
        {
            level: 10,
            name: "勇气灵光 (Aura of Courage)",
            description: "你与你的盟友在**守护灵光**内具有对**恐慌**状态的免疫。"
        },
        {
            level: 11,
            name: "光耀打击 (Radiant Strikes)",
            description: "神圣之力充盈。当你使用近战武器或徒手打击命中时，目标额外受到**1d8光耀伤害**。"
        },
        {
            level: 12,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得一项**属性值提升专长**或其他你满足条件的专长。"
        },
        {
            level: 14,
            name: "复原之触 (Restoring Touch)",
            description: "当你使用**圣疗**时，可消耗**5点**治疗量移除目标身上的一种或更多状态：**目盲、魅惑、耳聋、恐慌、麻痹、震慑**。"
        },
        {
            level: 15,
            name: "子职特性",
            description: "获得你所选誓言的15级特性。"
        },
        {
            level: 16,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得一项**属性值提升专长**或其他你满足条件的专长。"
        },
        {
            level: 18,
            name: "灵光增效 (Aura Expansion)",
            description: "你的**守护灵光**范围提升至**30尺**。"
        },
        {
            level: 19,
            name: "传奇恩惠 (Epic Boon)",
            description: "获得一项**传奇恩惠专长**或其他专长。推荐：**真实视觉之恩惠**。"
        },
        {
            level: 20,
            name: "子职特性",
            description: "获得誓言的最终化身特性（20级）。"
        }
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
            {
                level: 3,
                name: "奉献之誓法术 (Oath of Devotion Spells)",
                description: "你始终准备着以下法术：\n- **3级**：防护善恶 (Protection from Evil and Good), 虔诚护盾 (Shield of Faith)\n- **5级**：援助术 (Aid), 诚实之域 (Zone of Truth)\n- **9级**：希望信标 (Beacon of Hope), 解除魔法 (Dispel Magic)\n- **13级**：行动自如 (Freedom of Movement), 信仰守卫 (Guardian of Faith)\n- **17级**：通神术 (Commune), 焰击术 (Flame Strike)",
                grants: {
                    preparedSpells: ["防护善恶", "虔诚护盾", "援助术", "诚实之域", "希望信标", "解除魔法", "行动自如", "信仰守卫", "通神术", "焰击术"]
                }
            },
            {
                level: 3,
                name: "圣洁武器 (Sacred Weapon)",
                description: "当你执行**攻击动作**时，你可以消耗一次**引导神力**，为你持握的近战武器注入正能量。\n持续10分钟（或可随时结束）。\n- **攻击检定加值**：加上你的**魅力调整值**（至少+1）。\n- **伤害类型**：每次命中可选择造成**光耀伤害**或正常伤害。\n- **光照**：武器发出**20尺明亮光照**及20尺微光光照。"
            },
            {
                level: 7,
                name: "奉献灵光 (Aura of Devotion)",
                description: "你与位于你**守护灵光**内的盟友具有**魅惑免疫**。\n陷入魅惑的盟友进入灵光时，该状态在灵光内会暂时无效。"
            },
            {
                level: 15,
                name: "卫护斩 (Smite of Protection)",
                description: "魔法斩击散发出保护性能量。每当你施展**至圣斩**时，直到你的下个回合开始为止，身处你守护灵光内的你和盟友获得**半身掩护**（Half Cover，AC+2，敏捷豁免+2）。"
            },
            {
                level: 20,
                name: "至圣光轮 (Holy Nimbus)",
                description: "以一个**附赠动作**，圣力盈满你的灵光，获得以下增益（持续10分钟，或可随时结束）：\n- **至圣守护**：你对邪魔或亡灵的豁免检定具有**优势**。\n- **光耀伤害**：敌人在灵光内开始回合受到**光耀伤害**（魅力调整值+熟练加值）。\n- **阳光**：灵光内视为**阳光**。\n**恢复**：长休一次。也可消耗**5环法术位**重置使用次数。"
            }
        ]
    },
    {
        id: "paladin-glory",
        name: "荣耀之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "追求英雄事迹和荣耀。",
        features: [
            {
                level: 3,
                name: "荣耀之誓法术 (Oath of Glory Spells)",
                description: "你始终准备着以下法术：\n- **3级**：光导箭 (Guiding Bolt), 英雄气概 (Heroism)\n- **5级**：强化属性 (Enhance Ability), 魔化武器 (Magic Weapon)\n- **9级**：加速术 (Haste), 防护能量 (Protection from Energy)\n- **13级**：强迫术 (Compulsion), 行动自如 (Freedom of Movement)\n- **17级**：通晓传奇 (Legend Lore), 悠兰德王者威仪 (Yolande's Regal Presence)",
                grants: {
                    preparedSpells: ["光导箭", "英雄气概", "强化属性", "魔化武器", "加速术", "防护能量", "强迫术", "行动自如", "通晓传奇", "悠兰德王者威仪"]
                }
            },
            {
                level: 3,
                name: "鼓舞斩 (Inspiring Smite)",
                description: "当你施展**至圣斩**后，你可以立即消耗一次**引导神力**，为30尺内自选生物（或你自己）分配临时生命值。\n总值 = **2d8 + 圣武士等级**。"
            },
            {
                level: 3,
                name: "绝伦健将 (Peerless Athlete)",
                description: "以一个**附赠动作**，你可以消耗一次**引导神力**增强运动能力（持续1小时）。\n- **检定优势**：力量（运动）和敏捷（特技）。\n- **跳跃增强**：跳远和跳高距离增加**10尺**。"
            },
            {
                level: 7,
                name: "迅捷灵光 (Aura of Alacrity)",
                description: "你的速度提升**10尺**。\n此外，**守护灵光**内的盟友在自己回合第一次进入灵光或在灵光内开始回合时，速度也提升**10尺**（直到其下个回合结束）。"
            },
            {
                level: 15,
                name: "辉煌防御 (Glorious Defense)",
                description: "当你或10尺内可见生物被击中时，可用**反应**使其AC增加**魅力调整值**（至少+1），可能导致失手。\n- **反击**：若攻击失手且攻击者在触及内，你可对其发动一次武器攻击（作为反应的一部分）。\n- **次数**：魅力调整值（至少1次），长休恢复。"
            },
            {
                level: 20,
                name: "现世传说 (Living Legend)",
                description: "以一个**附赠动作**，获得以下增益（持续10分钟，或可随时提前结束）：\n- **神眷天恩**：魅力相关检定获得**优势**。\n- **重掷豁免**：豁免失败时可用**反应**重掷（必须使用新结果）。\n- **无误打击**：每自己回合一次，攻击失手可改为**命中**。\n**恢复**：长休一次。也可消耗**5环法术位**重置使用次数。"
            }
        ]
    },
    {
        id: "paladin-ancients",
        name: "古贤之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "守护光与自然，对抗黑暗。",
        features: [
            {
                level: 3,
                name: "古贤之誓法术 (Oath of the Ancients Spells)",
                description: "你始终准备着以下法术：\n- **3级**：捕获打击 (Ensnaring Strike), 动物交谈 (Speak with Animals)\n- **5级**：迷踪步 (Misty Step), 月华之光 (Moonbeam)\n- **9级**：植物滋长 (Plant Growth), 防护能量 (Protection from Energy)\n- **13级**：冰风暴 (Ice Storm), 石肤术 (Stoneskin)\n- **17级**：问道自然 (Commune with Nature), 树跃术 (Tree Stride)",
                grants: {
                    preparedSpells: ["捕获打击", "动物交谈", "迷踪步", "月华之光", "植物滋长", "防护能量", "冰风暴", "石肤术", "问道自然", "树跃术"]
                }
            },
            {
                level: 3,
                name: "自然之怒 (Nature's Wrath)",
                description: "以一个**魔法动作**，消耗一次**引导神力**，唤出灵体藤蔓。\n选择15尺内的任意生物，目标进行**力量豁免**，失败则**束缚**1分钟（回合结束可重骰）。"
            },
            {
                level: 7,
                name: "守御灵光 (Aura of Warding)",
                description: "你和**守护灵光**内的盟友获得对**暗蚀**、**心灵**以及**光耀**伤害的**抗性**。"
            },
            {
                level: 15,
                name: "不灭哨卫 (Undying Sentinel)",
                description: "当你生命值降至0但未死时，可改为**1点**，并恢复**3倍圣武士等级**的生命值（长休一次）。\n此外，你不会因魔法衰老，外表不老。"
            },
            {
                level: 20,
                name: "上古斗士 (Elder Champion)",
                description: "以一个**附赠动作**，获得以下增益（持续1分钟，或可随时提前结束）：\n- **瓦解反抗**：灵光内敌人对抗你的法术/引导神力豁免具有**劣势**。\n- **复生**：每回合开始恢复**10点生命值**。\n- **迅捷法术**：施法时间为动作的法术可改为**附赠动作**。\n**恢复**：长休一次。也可消耗**5环法术位**重置使用次数。"
            }
        ]
    },
    {
        id: "paladin-vengeance",
        name: "复仇之誓",
        parentClass: "圣武士",
        source: "官方规则",
        description: "为了惩恶扬善不择手段。",
        features: [
            {
                level: 3,
                name: "复仇之誓法术 (Oath of Vengeance Spells)",
                description: "你始终准备着以下法术：\n- **3级**：灾祸术 (Bane), 猎人印记 (Hunter's Mark)\n- **5级**：人类定身术 (Hold Person), 迷踪步 (Misty Step)\n- **9级**：加速术 (Haste), 防护能量 (Protection from Energy)\n- **13级**：放逐术 (Banishment), 任意门 (Dimension Door)\n- **17级**：定身怪物 (Hold Monster), 探知术 (Scrying)",
                grants: {
                    preparedSpells: ["灾祸术", "猎人印记", "人类定身术", "迷踪步", "加速术", "防护能量", "放逐术", "任意门", "定身怪物", "探知术"]
                }
            },
            {
                level: 3,
                name: "仇敌誓言 (Vow of Enmity)",
                description: "当你执行**攻击动作**时，你可以消耗一次**引导神力**，对30尺内一个可见生物立誓。\n**持续1分钟**。对该生物的攻击检定具有**优势**。\n若目标在誓言结束前降至0生命值，可立即转移誓言至30尺内另一生物（无需动作）。"
            },
            {
                level: 7,
                name: "坚韧复仇 (Relentless Avenger)",
                description: "当你**借机攻击**命中生物时：\n- 目标速度降为**0**（直到回合结束）。\n- 你可立即移动**半速**（不引发借机攻击），作为反应的一部分。"
            },
            {
                level: 15,
                name: "复仇之魂 (Soul of Vengeance)",
                description: "当受你**仇敌誓言**影响的生物发动攻击时（无论是否命中），若其在触及内，你可以用**反应**对其进行一次近战攻击。"
            },
            {
                level: 20,
                name: "复仇天使 (Avenging Angel)",
                description: "以一个**附赠动作**，化身复仇天使（持续10分钟，或可随时提前结束）：\n- **飞行**：获得**60尺**飞行速度且可悬浮。\n- **恐惧灵光**：敌人在灵光内开始回合需进行**感知豁免**，失败则**恐慌**1分钟（受伤害结束）。你对恐慌目标攻击具有**优势**。\n**恢复**：长休一次。也可消耗**5环法术位**重置使用次数。"
            }
        ]
    }
];
