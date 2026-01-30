import { ClassItem, SubclassItem } from '../../types';

export const MONK_CLASS: ClassItem = {
    id: "monk-2024",
    name: "武僧",
    source: "官方规则",
    description: "徒手拆机\n跑得飞快\n震慑控制\n空手接白刃\n气功大师",
    fullDescription: "你的武艺修行让你将徒手打击与武僧武器的使用方式烂熟于心。\n**武僧武器**\n包括简易近战武器和拥有轻型词条的军用近战武器。\n\n**武艺**\n未着装任何护甲也没持用盾牌时，如果你徒手或只持用武僧武器，则你获得下列增益：\n• **附赠徒手打击**: 你可以用附赠动作发动一次徒手打击。\n• **武艺骰**: 你使用徒手打击或武僧武器进行攻击时，可以选择用 1d6 骰代替原本的伤害骰。该骰子将随武僧职业等级的提升而增大（5-10级 1d8, 11-16级 1d10, 17-20级 1d12）。\n• **敏捷攻击**: 你使用徒手打击或武僧武器进行攻击时，可以用敏捷代替力量进行攻击检定和伤害掷骰。此外，当你使用徒手打击的擒抱或推撞选项时，你也可以使用你的敏捷代替力量决定豁免 DC。\n\n**无甲防御**\n未着装任何护甲也没持用盾牌时，你的 AC 值等于 10 + 你的敏捷调整值 + 你的感知调整值。",
    hitDie: "d8",
    primaryAbility: "敏捷和感知",
    saves: ["力量", "敏捷"],
    tags: ["机动", "近战", "徒手"],
    coreTraits: {
        primaryAbility: "敏捷与感知",
        hitPointDie: "每武僧等级 d8",
        savingThrows: "力量与敏捷",
        skillProficiencies: "选择2项：杂技、运动、历史、洞悉、宗教或隐匿",
        weaponProficiencies: "简易与具备轻型词条的军用武器",
        armorTraining: "无",
        startingEquipment: {
            optionA: "矛，5 把匕首，你在工具熟练中所选择的工匠工具或乐器，探索套组，11GP",
            optionB: "50 GP"
        }
    },
    subclassLevel: 3,
    subclasses: [],
    features: [
        { level: 1, name: "武艺 (Martial Arts)", description: "你可以使用敏捷代替力量进行徒手打击和武僧武器攻击，并造成更多伤害（武艺骰）。你可以用附赠动作发动一次徒手打击。" },
        { level: 1, name: "无甲防御 (Unarmored Defense)", description: "AC = 10 + 敏捷调整值 + 感知调整值。" },
        { level: 2, name: "武僧武功 (Monk's Discipline)", description: "通过运转玄功和习练武艺，你掌握了自身非凡的内在能量。你的武僧等级决定了你拥有多少功力点（Focus Points）。你可以消耗功力点来增强或启动特性：\n• **疾风连击**: 消耗 1 点功力，以一个附赠动作发动两次徒手打击。\n• **坚强防御**: 以附赠动作执行撤离动作。或消耗 1 点功力，以附赠动作同时执行撤离与回避动作。\n• **疾步如风**: 以附赠动作执行疾走动作。或消耗 1 点功力，以附赠动作同时执行撤离与疾走动作，且跳跃距离翻倍。\n\n每当你消耗 1 点功力时，直到你完成一次短休或者长休前其将暂时不可以再被使用。" },
        { level: 2, name: "无甲移动 (Unarmored Movement)", description: "当未穿着任何护甲也没持用盾牌时，你的移动速度增加 10 尺。该加值将随着武僧职业等级的提升而增加。" },
        { level: 2, name: "运转周天 (Uncanny Metabolism)", description: "当你投掷先攻时，你可以回复所有已消耗的功力点。若你如此做，掷你的武艺骰，并且回复其结果+你的武僧等级的生命值。使用此特性后，你必须完成一次长休才能再次使用。" },
        { level: 3, name: "拨挡攻击 (Deflect Attacks)", description: "当你被一次伤害中包含钝击，穿刺或挥砍伤害的攻击检定命中时，你可以执行反应减少此次攻击对你造成伤害的总值，减值等于 1d10 + 敏捷调整值 + 武僧等级。若伤害减少至 0，你可以消耗 1 点功力将此次攻击的部分伤害重新定向（近战5尺/远程60尺），造成 2 个武艺骰 + 敏捷调整值的伤害。" },
        { level: 3, name: "武僧子职业 (Monk Subclass)", description: "你获得一个武僧子职业，从以下选择一项：命流武者，暗影武者，四象武者或散打武者。" },
        { level: 4, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 4, name: "轻身坠 (Slow Fall)", description: "当你要承受坠落伤害时，你可以使用反应将伤害减少等同于五倍武僧职业等级的数值。" },
        { level: 5, name: "额外攻击 (Extra Attack)", description: "你在自己回合内执行攻击动作时可以发动两次攻击而非一次。" },
        { level: 5, name: "震慑拳 (Stunning Strike)", description: "每回合一次，当你使用徒手打击或武僧武器命中一个生物后，你可以消耗 1 点功力尝试发动震慑拳。目标必须进行一次体质豁免，失败则陷入震慑状态直到你下回合开始；成功则速度减半且下次受击优势。" },
        { level: 6, name: "真气注拳 (Empowered Strikes)", description: "当你使用徒手打击造成伤害时，你可以选择造成力场伤害或是其原本的伤害类型。" },
        { level: 6, name: "武僧子职特性", description: "获得你所选的武僧子职 6 级特性。" },
        { level: 7, name: "反射闪避 (Evasion)", description: "你在成为某一效应影响对象时，若该效应允许你通过成功的敏捷豁免来使伤害减半，则你在该豁免成功时不受伤害，而豁免失败时只受一半伤害。" },
        { level: 8, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 9, name: "飞檐走壁 (Acrobatic Movement)", description: "当未穿着任何护甲也没持用盾牌时，你可以在你的回合中在垂直表面和液体表面上移动而不会坠落。" },
        { level: 10, name: "出神入化 (Heightened Discipline)", description: "• **疾风连击**: 消耗功力施展时可以进行 3 次攻击而非 2 次。\n• **坚强防御**: 消耗功力使用时，获得相当于你 2 个武艺骰的临时生命值。\n• **疾步如风**: 消耗功力使用时，可携带一个体型为大型或更小的自愿生物随你移动而不触发借机攻击。" },
        { level: 10, name: "返本还元 (Self-Restoration)", description: "你能够在每次自己的回合结束时移除你身上的下列状态之一：魅惑，恐慌或中毒。此外，不吃不喝不再会使你提升力竭等级。" },
        { level: 11, name: "武僧子职特性", description: "获得你所选的武僧子职 11 级特性。" },
        { level: 12, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 13, name: "拨挡能量 (Deflect Energy)", description: "你现在可以使用你的拨挡攻击特性对抗造成任何伤害类型的攻击，而不仅限于钝击，穿刺或挥砍。" },
        { level: 14, name: "圆融自在 (Disciplined Survivor)", description: "你的身心修行已然有所成就，你获得所有豁免的熟练。此外，当你豁免失败时，你可以消耗 1 点功力重掷豁免。" },
        { level: 15, name: "明镜止水 (Perfect Focus)", description: "若你在投掷先攻，并且未使用运转周天时时的功力为 3 点或更少，则你的功力恢复至 4 点。" },
        { level: 16, name: "属性值提升", description: "获得属性值提升专长。" },
        { level: 17, name: "武僧子职特性", description: "获得你所选的武僧子职 17 级特性。" },
        { level: 18, name: "无懈可击 (Superior Defense)", description: "在你的回合开始时，你可以消耗 3 点功力提高自己抵挡伤害的能力，持续 1 分钟。持续时间内，你对力场伤害之外的所有伤害都具有抗性。" },
        { level: 19, name: "传奇恩惠", description: "获得一项传奇恩惠专长（推荐：无敌攻势之恩惠）。" },
        { level: 20, name: "身心合一 (Body and Mind)", description: "你行满功成，身心性命皆已突破超然境界。你的敏捷和感知属性提高 4 点。现在你这些属性的上限为 25。" }
    ]
};

export const MONK_SUBCLASSES: SubclassItem[] = [
    {
        id: "monk-mercy",
        name: "命流武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "操纵生命力进行治疗与伤害。",
        features: [
            { level: 3, name: "夺命之手 (Hand of Harm)", description: "每回合一次，徒手打击命中造成伤害时，消耗1点功力额外造成 1武艺骰+感知 黯蚀伤害。" },
            { level: 3, name: "予命之手 (Hand of Healing)", description: "魔法动作消耗1点功力接触治疗（1武艺骰+感知）。疾风连击时可替换其中一次攻击为治疗（无额外消耗）。" },
            { level: 3, name: "掌控命流 (Implements of Mercy)", description: "获得洞悉和医药熟练，以及草药工具熟练。" },
            { level: 6, name: "生死之触 (Physician's Touch)", description: "• **夺命之手**: 附加中毒状态直到下回合结束。\n• **予命之手**: 移除目盲、耳聋、麻痹、中毒或震慑状态之一。" },
            { level: 11, name: "活杀自在 (Flurry of Healing and Harm)", description: "使用疾风连击时，每一次攻击都可替换为予命之手（不耗功力）。\n疾风连击命中造成伤害时，可免费使用一次夺命之手（每回合仍限一次夺命）。\n此增益次数=感知调整值（最少1次，长休恢复）。" },
            { level: 17, name: "命极之手 (Hand of Ultimate Mercy)", description: "魔法动作消耗5点功力。复活死后24小时内生物。HP为 4d10+感知。移除目盲/耳聋/麻痹/中毒/震慑。长休恢复。" }
        ]
    },
    {
        id: "monk-shadow",
        name: "暗影武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "潜行于阴影之中的忍者。",
        features: [
            { level: 3, name: "暗影技艺 (Shadow Arts)", description: "获得《黑暗术》（消耗1功力，可移动，可视穿），黑暗视觉60尺（可叠加），《次级幻影》戏法。" },
            { level: 6, name: "暗影步 (Shadow Step)", description: "微光/黑暗中附赠动作传送60尺（目标也需在微光/黑暗）。之后下一次近战攻击优势。" },
            { level: 11, name: "无影步 (Improved Shadow Step)", description: "消耗1功力，暗影步无视光照条件。且传送后可立刻进行一次徒手打击（作为附赠动作一部分）。" },
            { level: 17, name: "幽影斗篷 (Cloak of Shadows)", description: "微光/黑暗中魔法动作消耗3功力。持续1分钟或直到明亮光照/失能。\n• **隐形**: 获得隐形状态。\n• **局部虚化**: 可穿过生物/物体（如困难地形）。\n• **幽影连击**: 疾风连击不消耗功力。" }
        ]
    },
    {
        id: "monk-elements",
        name: "四象武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "驾驭元素之力的武者。",
        features: [
            { level: 3, name: "元素调和 (Elemental Attunement)", description: "你的徒手打击和武僧武器攻击可造成元素伤害（火焰、寒冷、闪电、雷鸣、酸蚀、毒素）。你选择一种元素类型，你的徒手打击和武僧武器攻击的伤害类型变为该类型。你可以在长休时更改此选择。" },
            { level: 3, name: "操控元素 (Manipulate Elements)", description: "消耗1点功力，以一个附赠动作，你可以选择一个 30 尺内的生物。该生物必须进行一次体质豁免，失败则受到 1d6 元素伤害（伤害类型与你的元素调和相同），并被推离你 10 尺。成功则伤害减半且不被推离。" },
            { level: 6, name: "元素爆发 (Elemental Burst)", description: "消耗2点功力，以一个动作，你可以选择一个 30 尺内的点。该点半径 10 尺球状区域内所有生物必须进行一次敏捷豁免，失败则受到 2d6 元素伤害（伤害类型与你的元素调和相同），成功则伤害减半。" },
            { level: 11, name: "元素步法 (Elemental Stride)", description: "消耗3点功力，以一个附赠动作，你获得 30 尺的飞行速度或游泳速度，持续 1 分钟。你可以在长休时更改此选择。" },
            { level: 17, name: "元素显赫 (Elemental Epitome)", description: "你获得对你选择的元素伤害类型的抗性。此外，当你受到该类型伤害时，你可以消耗1点功力，以一个反应，对攻击者造成等量的元素伤害（伤害类型与你的元素调和相同）。" }
        ]
    },
    {
        id: "monk-openhand",
        name: "散打武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "精通纯粹武术技巧的大师。",
        features: [
            { level: 3, name: "散打技法 (Open Hand Technique)", description: "疾风连击命中时附加效应：\n• **慌神**: 下回合开始前不能借机攻击。\n• **推离**: 力量豁免失败被推15尺。\n• **失衡**: 敏捷豁免失败倒地。" },
            { level: 6, name: "混元体 (Wholeness of Body)", description: "附赠动作掷1武艺骰。恢复 骰值+感知 生命。次数=感知调整值（长休恢复）。" },
            { level: 11, name: "流星步 (Fleet Step)", description: "当你使用疾步如风以外的附赠动作时，可立即使用疾步如风（作为同一附赠动作的一部分？文档是说完成后立即使用，隐含免费）。" },
            { level: 17, name: "渗透劲 (Quivering Palm)", description: "徒手命中消耗4功力打入暗劲（持续等级天数）。动作触发。体质豁免，失败受 10d12 力场伤害，成功半伤。可无伤解除。" }
        ]
    }
];
