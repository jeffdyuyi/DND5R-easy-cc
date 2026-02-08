import { ClassItem, SubclassItem } from '../../types';

export const MONK_CLASS: ClassItem = {
    id: "monk-2024",
    name: "武僧",
    source: "官方规则",
    description: "近战高手\n机动灵活\n徒手格斗\n气功大师\n身心合一",
    fullDescription: "武僧用严格的战斗训练与精神修行究天人之际，通己身之变。不同的武僧会给这股力量赋予不同的概念，或吐纳，或内功，或阳气，或灵明，或真我。无论是打出惊世神功，或是显于灵犀一动，这种力量都是武僧威能的来源。\n\n武僧们积蓄和引导这种力量，创造出诸般非凡乃至超自然的效应。无论是用徒手或兵刃，他们的力量和速度都是同等惊世骇俗。凭着这股奇能，无论什么器物到了他们手中，都能化作取胜的法宝。\n\n许多武僧发现，远离世俗的苦行生活有助于他们肉体与精神的修行。也同样有许多武僧认为投身红尘俗世更有助于修炼出心境与定力。\n\n因此武僧们通常会把冒险看作是一种对身心的淬炼。他们所求的是比杀死怪物与获得宝藏更崇高的道；他们的身体就是克敌制胜的最上妙法。",
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
    classTable: {
        title: "武僧特性 Monk Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "武艺骰", key: "martial_arts_die" },
            { header: "功力", key: "focus_points" },
            { header: "无甲移动", key: "unarmored_movement" }
        ],
        rows: [
            { level: 1, pb: "+2", features: ["武艺", "无甲防御"], martial_arts_die: "1d6", focus_points: "—", unarmored_movement: "—" },
            { level: 2, pb: "+2", features: ["武僧武功", "无甲移动", "运转周天"], martial_arts_die: "1d6", focus_points: "2", unarmored_movement: "+10尺" },
            { level: 3, pb: "+2", features: ["拨挡攻击", "武僧子职"], martial_arts_die: "1d6", focus_points: "3", unarmored_movement: "+10尺" },
            { level: 4, pb: "+2", features: ["属性值提升", "轻身坠"], martial_arts_die: "1d6", focus_points: "4", unarmored_movement: "+10尺" },
            { level: 5, pb: "+3", features: ["额外攻击", "震慑拳"], martial_arts_die: "1d8", focus_points: "5", unarmored_movement: "+10尺" },
            { level: 6, pb: "+3", features: ["真力注拳", "子职特性"], martial_arts_die: "1d8", focus_points: "6", unarmored_movement: "+15尺" },
            { level: 7, pb: "+3", features: ["反射闪避"], martial_arts_die: "1d8", focus_points: "7", unarmored_movement: "+15尺" },
            { level: 8, pb: "+3", features: ["属性值提升"], martial_arts_die: "1d8", focus_points: "8", unarmored_movement: "+15尺" },
            { level: 9, pb: "+4", features: ["飞檐走壁"], martial_arts_die: "1d8", focus_points: "9", unarmored_movement: "+15尺" },
            { level: 10, pb: "+4", features: ["出神入化", "返本还元"], martial_arts_die: "1d8", focus_points: "10", unarmored_movement: "+20尺" },
            { level: 11, pb: "+4", features: ["子职特性"], martial_arts_die: "1d10", focus_points: "11", unarmored_movement: "+20尺" },
            { level: 12, pb: "+4", features: ["属性值提升"], martial_arts_die: "1d10", focus_points: "12", unarmored_movement: "+20尺" },
            { level: 13, pb: "+5", features: ["拨挡能量"], martial_arts_die: "1d10", focus_points: "13", unarmored_movement: "+20尺" },
            { level: 14, pb: "+5", features: ["圆融自在"], martial_arts_die: "1d10", focus_points: "14", unarmored_movement: "+25尺" },
            { level: 15, pb: "+5", features: ["明镜止水"], martial_arts_die: "1d10", focus_points: "15", unarmored_movement: "+25尺" },
            { level: 16, pb: "+5", features: ["属性值提升"], martial_arts_die: "1d10", focus_points: "16", unarmored_movement: "+25尺" },
            { level: 17, pb: "+6", features: ["子职特性"], martial_arts_die: "1d12", focus_points: "17", unarmored_movement: "+25尺" },
            { level: 18, pb: "+6", features: ["无懈可击"], martial_arts_die: "1d12", focus_points: "18", unarmored_movement: "+30尺" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], martial_arts_die: "1d12", focus_points: "19", unarmored_movement: "+30尺" },
            { level: 20, pb: "+6", features: ["天人合一"], martial_arts_die: "1d12", focus_points: "20", unarmored_movement: "+30尺" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "武艺 (Martial Arts)",
            description: "你的武艺修行让你将徒手打击与武僧武器的使用方式烂熟于心。武僧武器包括：\n简易近战武器\n拥有轻型词条的军用近战武器\n只要你未着装任何护甲也没持用盾牌，且徒手或只持用武僧武器，则你获得下列增益：\n**附赠徒手打击 Bonus Unarmed Strike**。你可以用附赠动作发动一次徒手打击。\n**武艺骰 Martial Arts Die**。你使用徒手打击或武僧武器进行攻击时，可以选择用 1d6 骰代替原本的伤害。该骰子将随武僧职业等级的提升而增大，具体数据见武僧特性表中的武艺骰一列。\n**敏捷攻击 Dexterous Attacks**。你使用徒手打击或武僧武器进行攻击时，可以用敏捷代替力量进行攻击检定和伤害掷骰。此外，当你使用徒手打击的擒抱或推撞选项时，你也可以使用你的敏捷代替力量决定豁免 DC。"
        },
        {
            level: 1,
            name: "无甲防御 (Unarmored Defense)",
            description: "若你未着装任何护甲且未持用盾牌，你的基础护甲等级等于 10 + 你的敏捷调整值 + 你的感知调整值。"
        },
        {
            level: 2,
            name: "武僧武功 (Monk's Focus)",
            description: "通过运转玄功和习练武艺，你便得以掌握自身非凡的内在能量。功力代表着你所能使用的这份能量。你的武僧等级决定了你拥有多少点功力，具体数据见武僧特性表中的功力一列。你可以消耗功力来增强或启动特定的武僧特性。你一开始掌握三种特性：疾风连击，坚强防御，疾步如风。细节见下。\n每当你消耗 1 点功力时，直到你完成一次短休或者长休前其将暂时不可以再被使用。在完成休息时，你将重获所有已消耗的功力。\n你的某些特性会要求你的目标进行豁免以对抗该特性的效果，这些特性的豁免 DC 为 8 + 你的感知调整值 + 你的熟练加值。\n**疾风连击 Flurry of Blows**。你可以消耗 1 点功力，以一个附赠动作发动两次徒手打击。\n**坚强防御 Patient Defense**。你能以一个附赠动作执行撤离动作。此外，你可以消耗 1 点功力，以一个附赠动作同时执行撤离与回避动作。\n**疾步如风 Step of the Wind**。你能以一个附赠动作执行疾走动作。此外，你可以消耗 1 点功力，以一个附赠动作同时执行撤离与疾走动作，同时使你该回合内的跳跃距离翻倍。"
        },
        {
            level: 2,
            name: "无甲移动 (Unarmored Movement)",
            description: "若你未着装任何护甲且未持用盾牌，你的速度提升 10 尺。该加值将随着武僧职业等级的提升而增加，具体数值见武僧特性表。"
        },
        {
            level: 2,
            name: "运转周天 (Uncanny Metabolism)",
            description: "当你投掷先攻时，你可以重获所有已消耗的功力。若你如此做，掷你的武艺骰，并且恢复其结果 + 你的武僧等级的生命值。\n使用此特性后，你必须完成一次长休才能再次使用。"
        },
        {
            level: 3,
            name: "拨挡攻击 (Deflect Attacks)",
            description: "当你被一次伤害中包含钝击，穿刺或挥砍伤害的攻击检定命中时，你可以执行反应减少此次攻击对你造成伤害的总值，减值等于 1d10 + 你的敏捷调整值 + 你的武僧等级。\n若被拨挡攻击的伤害减少至 0，则你可以消耗 1 点功力将此次攻击的部分伤害重新定向。如果是近战攻击，选择你周围 5 尺内的一个你可见的生物；如果是远程攻击，选择 60 尺内一个不位于全身掩护后的你可见的生物。该生物必须成功通过一次敏捷豁免，否则受到相当于你 2 个武艺骰 + 你的敏捷调整值的伤害。其伤害类型与原先攻击的伤害类型相同。"
        },
        {
            level: 3,
            name: "武僧子职 (Monk Subclass)",
            description: "你选择获得一项武僧子职：命流武者、暗影武者、 四象武者和散打武者。子职的内容见后文。子职是一种特化，在特定的武僧等级给予你对应的独特能力。以后你将获得你所选的子职的所有能力——只要其所需等级不超过你的武僧等级。武僧特性表列出了你从子职中获得新特性的武僧等级。"
        },
        {
            level: 4,
            name: "属性值提升",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如武僧特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。"
        },
        {
            level: 4,
            name: "轻身坠 (Slow Fall)",
            description: "当你要承受坠落伤害时，你可以使用反应将伤害减少等同于五倍武僧职业等级的数值。"
        },
        {
            level: 5,
            name: "额外攻击 (Extra Attack)",
            description: "当你在自己的回合执行攻击动作时，你可以发动两次攻击而非一次。"
        },
        {
            level: 5,
            name: "震慑拳 (Stunning Strike)",
            description: "每回合一次，当你使用徒手打击或武僧武器命中一个生物后，你可以消耗 1 点功力尝试发动震慑拳。目标必须进行一次体质豁免，豁免失败则陷入震慑状态，直至你的下个回合开始。若豁免成功，则目标的速度减半，直至你的下个回合开始，并且下一次对该目标进行的攻击检定具有优势。"
        },
        {
            level: 6,
            name: "真力注拳 (Empowered Strikes)",
            description: "当你使用徒手打击造成伤害时，你可以选择造成力场伤害或是其原本的伤害类型。"
        },
        {
            level: 6,
            name: "武僧子职特性",
            description: "获得你所选的武僧子职 6 级特性。"
        },
        {
            level: 7,
            name: "反射闪避 (Evasion)",
            description: "当你受到一个允许你进行敏捷豁免来只承受一半伤害的效应影响时，你在豁免成功时不受伤害，豁免失败时只承受一半伤害。\n如果你处于失能状态，则你无法从此特性中受益。"
        },
        {
            level: 8,
            name: "属性值提升",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如武僧特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。"
        },
        {
            level: 9,
            name: "飞檐走壁 (Acrobatic Movement)",
            description: "若你未着装任何护甲也没持用盾牌，你便可以在你的回合中在垂直表面和液体表面上移动而不会坠落。"
        },
        {
            level: 10,
            name: "出神入化 (Heightened Focus)",
            description: "你的疾风连击，坚强防御和疾步如风获得以下增益：\n**疾风连击 Flurry of Blows**。你消耗 1 点功力施展疾风连击时可以进行三次徒手打击而非两次。\n**坚强防御 Patient Defense**。当你消耗功力使用坚强防御时，你获得相当于你两个武艺骰的临时生命值。\n**疾步如风 Step of the Wind**。当你消耗功力使用疾步如风时，你可以选择你周围 5 尺内一个体型为大型或更小的自愿生物。直至你的回合结束，该生物将一直随你移动。该生物如此移动不会引发借机攻击。"
        },
        {
            level: 10,
            name: "返本还元 (Self-Restoration)",
            description: "凭借纯粹的意志，你能够在每次自己的回合结束时移除你身上的下列状态之一：魅惑，恐慌或中毒。\n此外，不吃不喝不再会使你提升力竭等级。"
        },
        {
            level: 11,
            name: "武僧子职特性",
            description: "获得你所选的武僧子职 11 级特性。"
        },
        {
            level: 12,
            name: "属性值提升",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如武僧特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。"
        },
        {
            level: 13,
            name: "拨挡能量 (Deflect Energy)",
            description: "你现在可以使用你的拨挡攻击特性对抗造成任何伤害类型的攻击，而不仅限于钝击，穿刺或挥砍。"
        },
        {
            level: 14,
            name: "圆融自在 (Disciplined Survivor)",
            description: "你的身心修行已然有所成就，你获得所有豁免的熟练。\n此外，当你豁免失败时，你可以消耗 1 点功力重掷豁免，但必须使用重掷的结果。"
        },
        {
            level: 15,
            name: "明镜止水 (Perfect Focus)",
            description: "若你在投掷先攻，且选择不使用运转周天时，你的功力为 3 点或更少，则你的功力恢复至 4 点。"
        },
        {
            level: 16,
            name: "属性值提升",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如武僧特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。"
        },
        {
            level: 17,
            name: "武僧子职特性",
            description: "获得你所选的武僧子职 17 级特性。"
        },
        {
            level: 18,
            name: "无懈可击 (Superior Defense)",
            description: "在你的回合开始时，你可以消耗 3 点功力提高自己抵挡伤害的能力，持续 1 分钟或直至你陷入失能状态。\n持续时间内，你对力场伤害之外的所有伤害都具有抗性。"
        },
        {
            level: 19,
            name: "传奇恩惠",
            description: "你获得一项传奇恩惠专长（见第五章）或其他一项你选择的适用的专长。推荐选择无敌攻势之恩惠。"
        },
        {
            level: 20,
            name: "天人合一 (Body and Mind)",
            description: "你行满功成，身心性命皆已突破超然境界。你的敏捷和感知各提升 4。现在你这些属性的上限为 25。"
        }
    ]
};

export const MONK_SUBCLASSES: SubclassItem[] = [
    {
        id: "monk-mercy",
        name: "命流武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "掌执命流\n\n命流武者操弄着他人的命流之力。这些武僧既是云游的医者，但也能给敌人带去迅疾的死亡。他们总戴着面具，以无脸的生死使者之形象示人。",
        features: [
            {
                level: 3,
                name: "夺命之手 (Hand of Harm)",
                description: "每回合一次，当你用徒手打击命中一名生物并造成伤害时，你可以消耗 1 点功力额外造成等于一枚你的武艺骰 + 你的感知调整值的暗蚀伤害。"
            },
            {
                level: 3,
                name: "予命之手 (Hand of Healing)",
                description: "以一个魔法动作，你可以消耗 1 点功力并接触一名生物，为目标恢复等于一枚你的武艺骰 + 你的感知调整值的生命值。当你使用疾风连击时，你可以将其中一次徒手打击替换为使用此特性，且无需为予命之手消耗功力。"
            },
            {
                level: 3,
                name: "操命本事 (Implements of Mercy)",
                description: "你获得洞悉和医药的熟练，并且获得草药工具的熟练。"
            },
            {
                level: 6,
                name: "生死之触 (Physician's Touch)",
                description: "你的夺命之手和予命之手获得强化，具体内容见下。\n**夺命之手 Hand of Harm**。当你对一名生物使用夺命之手时，你还可以使该生物陷入中毒状态，直至你的下个回合结束。\n**予命之手 Hand of Healing**。当你使用予命之手时，你还可以结束你治疗的生物身上的以下状态之一：目盲、耳聋、麻痹、中毒或震慑。"
            },
            {
                level: 11,
                name: "生杀予夺 (Flurry of Healing and Harm)",
                description: "当你使用疾风连击时，你可以将每一次徒手打击都替换为使用予命之手，且均无需为予命之手消耗功力。\n此外，当你以疾风连击发动徒手打击并造成伤害时，你可以为那次打击使用夺命之手且无需为夺命之手消耗功力。但你每回合仍然只能使用一次夺命之手。\n你能使用这些增益的总次数等于你的感知调整值（至少一次）。在你完成长休时重获所有已消耗的次数。"
            },
            {
                level: 17,
                name: "命极之手 (Hand of Ultimate Mercy)",
                description: "你对生命能量的掌握打开了通往命流奥义的大门。以一个魔法动作，你可以消耗 5 点功力并触碰一名死亡不超过 24 小时的生物的尸体。该生物会起死回生，以等于 4d10 + 你的感知调整值的生命值复活。如果该生物死前具有任意以下状态，该生物复活时这些状态被移除：目盲、耳聋、麻痹、中毒和震慑。\n此特性一经使用，直至完成长休你都无法再次使用。"
            }
        ]
    },
    {
        id: "monk-shadow",
        name: "暗影武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "暗影藏形\n\n暗影武者习练隐匿与遁术，引导，驾驭来自堕影冥界的力量。他们居于黑暗，藏于薄暮，遁于幽影，出手亦犹如幽影一般凶险。",
        features: [
            {
                level: 3,
                name: "暗影技艺 (Shadow Arts)",
                description: "你掌握了如何唤出堕影冥界的力量，获得以下增益：\n**黑暗术 Darkness**。你可以消耗 1 点功力以施展 **黑暗术 Darkness** 法术且无需任何法术成分。你可以看穿以这个特性施展的黑暗区域。法术持续期间，你可以在你的每个回合开始时将此法术区域移动到你 60 尺范围内的任意一处空间。\n**黑暗视觉 Darkvision**。你获得 60 尺黑暗视觉。如果你已经有黑暗视觉，则其范围提升 60 尺。\n**幻影术 Shadowy Figments**。你知晓戏法 **次级幻象 Minor Illusion** ，其施法属性为感知。"
            },
            {
                level: 6,
                name: "暗影步 (Shadow Step)",
                description: "当你完全身处微光光照或黑暗下时，你能以一个附赠动作传送到 60 尺内另一处你可见的未占据的空间，目标地点需要同样位于微光光照或黑暗下。接下来，你在当前回合结束前所做的下一次近战攻击具有优势。"
            },
            {
                level: 11,
                name: "无影步 (Improved Shadow Step)",
                description: "你可以利用与堕影冥界的连结来增强自己的传送能力。当你使用暗影步特性时，你可以消耗 1 点功力，移除开始和结束时对微光光照或黑暗环境的要求。此外，作为这个附赠动作的一部分，你可以立即在传送之后进行一次徒手打击。"
            },
            {
                level: 17,
                name: "幽影斗篷 (Cloak of Shadows)",
                description: "当你完全身处微光光照或黑暗环境下时，你能够以一个魔法动作消耗 3 点功力来让你周围环绕幽影，持续 1 分钟，直至你陷入失能状态或在明亮光照中结束回合。当周身环绕幽影时，你获得以下好处：\n**隐形 Invisibility**。你获得隐形状态。\n**局部虚化 Partially Incorporeal**。你可以如同通过困难地形一般通过已占据空间。如果你回合结束时仍然处于已占据空间之中，则会被排出到之前最近一个未占据空间。\n**幽影连击 Shadow Flurry**。 你使用疾风连击时不再需要消耗功力。"
            }
        ]
    },
    {
        id: "monk-elements",
        name: "四象武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "身起四象\n\n四象武者挥洒着来自元素位面的力量。这些武僧们以超凡功力引动着元素混沌的能量，即可内强自身，又能外发制敌。",
        features: [
            {
                level: 3,
                name: "元素同调 (Elemental Attunement)",
                description: "在你回合开始时，你可以消耗 1 点功力让元素能量浸润己身。这股能量将会持续存在 10 分钟，或直至你陷入失能状态。持续时间内，你获得以下好处：\n**触及 Reach**。你可以将元素能量打出体外，当你进行徒手打击的时候，你的触及提升 10 尺。\n**元素注拳 Elemental Strikes**。当你使用徒手打击攻击命中时，你可以选择使其造成强酸、寒冷、火焰、闪电或雷鸣伤害，而非通常的伤害类型。当你以徒手打击造成以上种类的伤害时，你可以迫使目标进行一次力量豁免。若失败，你可以利用周身的元素之力将目标拉近或推离 10 尺。"
            },
            {
                level: 3,
                name: "掌控元素 (Manipulate Elements)",
                description: "你习得戏法 **四象法门 Elementalism** ，其施法属性为感知。"
            },
            {
                level: 6,
                name: "元素爆破拳 (Elemental Burst)",
                description: "以一个魔法动作，你可以消耗 2 点功力，凝聚元素能量，在你周围 120 尺内的一点产生一场半径 20 尺球状区域的能量爆发。你选择一种伤害类型：强酸、寒冷、火焰、闪电或雷鸣。\n球状区域内的每个生物必须成功通过进行一次敏捷豁免。若失败，该生物受到相当于你 3 个武艺骰的伤害，其伤害类型为你之前所选择的类型。若成功，则受到一半伤害。"
            },
            {
                level: 11,
                name: "四象遁术 (Stride of the Elements)",
                description: "当你处于元素同调特性激活期间，你获得相当于你速度的飞行速度与游泳速度。"
            },
            {
                level: 17,
                name: "四象神通 (Elemental Epitome)",
                description: "当你处于元素同调特性激活期间，你在持续时间内获得以下增益：\n**伤害抗性 Damage Resistance**。你选择一种伤害类型：强酸、寒冷、火焰、闪电或雷鸣，你获得该伤害类型的抗性。你在每个你的回合开始时可以改变所选择的伤害类型。\n**破灭奔行 Destructive Stride**。当你使用疾步如风时，你的速度提升 20 尺，直至这个回合结束。在持续时间内，当你进入到某个生物 5 尺范围内的时候，你可以对其造成相当于你武艺骰的伤害，数量不限。此伤害的类型由你选择：强酸、寒冷、火焰、闪电或雷鸣。一个生物每回合只会受到一次此伤害。\n**真力注拳 Empowered Strikes**。每个你的回合一次，当你用徒手打击命中一个目标时，你可以对其造成相当于你武艺骰的额外伤害。此伤害的类型与此次徒手打击所造成的伤害类型相同。"
            }
        ]
    },
    {
        id: "monk-openhand",
        name: "散打武者",
        parentClass: "武僧",
        source: "官方规则",
        description: "散打随心\n\n散打武者是徒手战斗的大师，他们学习了推离和绊摔的技艺妨敌，并用内力保护自己免受伤害。",
        features: [
            {
                level: 3,
                name: "散打技巧 (Open Hand Technique)",
                description: "每当你疾风连击中的一次攻击命中一个生物时，你可以迫使其承受下列效应之一：\n**慌神 Addle**。目标直至他的下个回合开始不能使用借机攻击。\n**推离 Push**。目标必须成功通过一次力量豁免，否则被你推离 15 尺。\n**失衡 Topple**。 目标必须成功通过一次敏捷豁免，否则陷入倒地状态。"
            },
            {
                level: 6,
                name: "混元体 (Wholeness of Body)",
                description: "你获得治愈己身的能力。你能够以一个附赠动作掷你的武艺骰。你恢复相当于掷骰结果 + 你的感知调整值数量的生命值（至少恢复 1 点生命值）。\n你可以使用这个特性的次数相当于你的感知调整值（至少一次），在你完成一次长休时，你重获全部已消耗使用次数。"
            },
            {
                level: 11,
                name: "流星步 (Fleet Step)",
                description: "当你执行疾步如风以外的附赠动作时，你还可以在该附赠动作完成后立即使用疾步如风。"
            },
            {
                level: 17,
                name: "渗透劲 (Quivering Palm)",
                description: "你获得了将内劲击入他人体内的能力。当你以徒手打击命中一个生物时，可以消耗 4 点功力打入暗劲，其持续相当于你武僧等级的天数。在你使用你的动作将之结束前，暗劲是无害的。此外，当你在自己的回合执行攻击动作时，你可以将其中一次攻击替换为这个动作使暗劲结束。若你如此做，你和目标必须处于同一个存在位面。\n当你结束暗劲时，目标必须进行一次体质豁免，失败则受到 10d12 力场伤害，成功则只受到一半伤害。\n在同一时间你只能用这个特性使一个生物处于此效应中。你可以结束某人身上的暗劲而不造成伤害（不需要动作）。"
            }
        ]
    }
];
