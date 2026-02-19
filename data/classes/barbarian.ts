import { ClassItem, SubclassItem } from '../../types';

export const BARBARIAN_CLASS: ClassItem = {
    id: "barbarian-2024",
    name: "野蛮人",
    source: "官方规则",
    description: "近战输出\n超强抗性\n狂暴无敌\n野外生存\n武器大师",
    fullDescription: "野蛮人是绝强的战士，他们与多元宇宙原力联结，以名为狂暴的方式展现力量。狂暴绝不仅仅是一种情绪——局限于肤浅的愤怒——那是掠食者凶性的具现；那是暴风雨狂怒的化身；那是汪洋间混乱的凝结。\n\n一些野蛮人将他们的狂暴拟人化，视作凶暴的精魄或是崇敬的先祖。另一些或是认为这份狂暴与世间的痛苦与苦难相联系；或是认为其来自于狂野魔法的无情纠缠；或是将其视作内心深处的真我流露。狂暴对野蛮人来说，不仅是点燃战斗狂热的伟力，更是他们与众不同反应力和超乎寻常感知力的源泉。\n\n野蛮人常常在社群中负责担当守护者或是领导者的职位。他们一头冲进危险，这样他们所保护的人们就不再需要面对危险。这份面对威胁毫不动摇的勇气令野蛮人非常适应冒险生活。",
    hitDie: "d12",
    primaryAbility: "力量",
    saves: ["力量", "体质"],
    tags: ["近战", "坦克", "输出"],
    coreTraits: {
        primaryAbility: "力量与体质",
        hitPointDie: "每野蛮人等级 d12",
        savingThrows: "力量与体质",
        skillProficiencies: "选择2项：动物驯养、运动、威吓、自然、察觉、求生",
        weaponProficiencies: "简易武器、军用武器",
        armorTraining: "轻甲、中甲、盾牌",
        startingEquipment: {
            optionA: "巨斧，4 把手斧，探索套组，以及 15GP",
            optionB: "50 GP"
        }
    },
    subclassLevel: 3,
    classTable: {
        title: "野蛮人特性 Barbarian Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "狂暴", key: "rage_uses" },
            { header: "狂暴伤害", key: "rage_damage" },
            { header: "武器精通", key: "weapon_mastery" }
        ],
        rows: [
            { level: 1, pb: "+2", features: ["狂暴", "无甲防御", "武器精通"], rage_uses: "2", rage_damage: "+2", weapon_mastery: "2" },
            { level: 2, pb: "+2", features: ["危机感应", "鲁莽攻击"], rage_uses: "2", rage_damage: "+2", weapon_mastery: "2" },
            { level: 3, pb: "+2", features: ["野蛮人子职", "原初学识"], rage_uses: "3", rage_damage: "+2", weapon_mastery: "2" },
            { level: 4, pb: "+2", features: ["属性值提升"], rage_uses: "3", rage_damage: "+2", weapon_mastery: "3" },
            { level: 5, pb: "+3", features: ["额外攻击", "快速移动"], rage_uses: "3", rage_damage: "+2", weapon_mastery: "3" },
            { level: 6, pb: "+3", features: ["子职特性"], rage_uses: "4", rage_damage: "+2", weapon_mastery: "3" },
            { level: 7, pb: "+3", features: ["野性直觉", "莽驰"], rage_uses: "4", rage_damage: "+2", weapon_mastery: "3" },
            { level: 8, pb: "+3", features: ["属性值提升"], rage_uses: "4", rage_damage: "+2", weapon_mastery: "3" },
            { level: 9, pb: "+4", features: ["凶蛮打击"], rage_uses: "4", rage_damage: "+3", weapon_mastery: "3" },
            { level: 10, pb: "+4", features: ["子职特性"], rage_uses: "4", rage_damage: "+3", weapon_mastery: "4" },
            { level: 11, pb: "+4", features: ["坚韧狂暴"], rage_uses: "4", rage_damage: "+3", weapon_mastery: "4" },
            { level: 12, pb: "+4", features: ["属性值提升"], rage_uses: "5", rage_damage: "+3", weapon_mastery: "4" },
            { level: 13, pb: "+5", features: ["强化凶蛮打击"], rage_uses: "5", rage_damage: "+3", weapon_mastery: "4" },
            { level: 14, pb: "+5", features: ["子职特性"], rage_uses: "5", rage_damage: "+3", weapon_mastery: "4" },
            { level: 15, pb: "+5", features: ["持久狂暴"], rage_uses: "5", rage_damage: "+3", weapon_mastery: "4" },
            { level: 16, pb: "+5", features: ["属性值提升"], rage_uses: "5", rage_damage: "+4", weapon_mastery: "4" },
            { level: 17, pb: "+6", features: ["强化凶蛮打击"], rage_uses: "6", rage_damage: "+4", weapon_mastery: "4" },
            { level: 18, pb: "+6", features: ["不屈勇武"], rage_uses: "6", rage_damage: "+4", weapon_mastery: "4" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], rage_uses: "6", rage_damage: "+4", weapon_mastery: "4" },
            { level: 20, pb: "+6", features: ["原初斗士"], rage_uses: "6", rage_damage: "+4", weapon_mastery: "4" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "狂暴 (Rage)",
            description: "你可以将名为狂暴的原初之力赋予己身，为你带来超越常规的伟力和韧性。未着装重甲时，你能够以一个附赠动作进入狂暴。\n你可以进入狂暴的次数见野蛮人特性表中狂暴一栏。当你完成一次短休时，你重获一次已消耗的使用次数；当你完成一次长休时，你重获所有已消耗的使用次数。\n狂暴激活期间，你将遵循以下这些规则：\n\n**伤害抗性 Damage Resistance**。你具有钝击、穿刺、挥砍伤害的抗性。\n**狂暴伤害 Rage Damage**。当你使用力量发动一次攻击（无论这是一次武器攻击还是一次徒手打击）并对目标造成伤害时，你的伤害掷骰获得额外加值，这个加值随着你的野蛮人等级提升，见野蛮人特性表中狂暴伤害一栏。\n**力量优势 Strength Advantage**。你的力量检定和力量豁免检定具有优势。\n**无法专注或施法 No Concentration or Spells**。你无法保持专注，也不能施展法术。\n**持续时间 Duration**。狂暴持续至你的下个回合结束，如果你穿戴重甲或陷入失能状态，狂暴提前结束。如果在你的下一回合狂暴仍处于激活状态，你可以通过以下的任一方式令狂暴延长一轮：\n· 对一名敌人进行一次攻击检定。\n· 迫使一名敌人进行一次豁免检定。\n· 以一个附赠动作延长你的狂暴。\n每当狂暴被延长，都会持续至你的下个回合结束。你至多可以维持狂暴10分钟。"
        },
        {
            level: 1,
            name: "无甲防御 (Unarmored Defense)",
            description: "若你未着装任何护甲，你的基础护甲等级等于 10+你的敏捷调整值+你的体质调整值。你可以使用盾牌并仍从此特性获益。"
        },
        {
            level: 1,
            name: "武器精通 (Weapon Mastery)",
            description: "你对武器的训练使你能够运用两种自选的简易或军用近战武器的精通词条，例如巨斧和手斧。每当你完成一次长休时，你可以重新演练武器技巧，来改变你所选择的其中一个武器类型。\n当你到达特定的野蛮人等级时，你还可以使用更多种类武器的精通词条，详见野蛮人特性表中武器精通一栏。"
        },
        {
            level: 2,
            name: "危机感应 (Danger Sense)",
            description: "当非常事态发生时，一种不可思议的感觉降临你的心头，指引你更好的躲避危机。只要你未陷入失能状态，你的敏捷豁免检定就具有优势。"
        },
        {
            level: 2,
            name: "鲁莽攻击 (Reckless Attack)",
            description: "你可以抛弃一切对防御的顾虑来发起更加狂乱的攻击。你在你的回合中进行第一次攻击检定时，可以不顾一切地发起攻势。若如此做，直至你的下个回合开始，你使用力量进行的攻击检定具有优势，但在此期间所有以你为目标的攻击检定也具有优势。"
        },
        {
            level: 3,
            name: "野蛮人子职 (Barbarian Subclass)",
            description: "你选择获得一项野蛮人子职：狂战士道途，兽心道途，世界树道途或狂热者道途。子职的内容见后文。子职是一种特化，在特定的野蛮人等级给予你对应的独特能力。此后你将获得你所选的子职所有能力——只要其所需等级不超过你的野蛮人等级。野蛮人特性表列出了你从子职中获得新特性的野蛮人等级。"
        },
        {
            level: 3,
            name: "原初学识 (Primal Knowledge)",
            description: "除了 1 级选择的技能以外，你可以从野蛮人技能列表中额外获得一个技能的熟练。\n此外，狂暴激活期间，你可以在尝试完成特定的事项时与原初之力相连。每当你使用以下技能进行一次属性检定时，你可以使用力量进行检定而非通常使用的其他属性：特技，威吓，察觉，隐匿或求生。当你使用这项能力时，你的力量代表着一种环绕你身的原初之力，强化了你的灵敏度、气质和感知力。"
        },
        {
            level: 4,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如野蛮人特性表所示，你还会在第 8，第 12，第 16 级时再次获得本特性。"
        },
        {
            level: 5,
            name: "额外攻击 (Extra Attack)",
            description: "当你在自己的回合执行攻击动作时，你可以发动两次攻击而非一次。"
        },
        {
            level: 5,
            name: "快速移动 (Fast Movement)",
            description: "当你未着装重甲时，你的速度提升 10 尺。"
        },
        {
            level: 6,
            name: "野蛮人子职特性 (Subclass Feature)",
            description: "你获得你所选的野蛮人子职带来的特性。"
        },
        {
            level: 7,
            name: "野性直觉 (Feral Instinct)",
            description: "你的直觉变得格外敏锐。你的先攻检定具有优势。"
        },
        {
            level: 7,
            name: "莽驰 (Instinctive Pounce)",
            description: "作为你进入狂暴的附赠动作的一部分，你可以移动至多等于你速度一半的距离。"
        },
        {
            level: 8,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。"
        },
        {
            level: 9,
            name: "凶蛮打击 (Brutal Strike)",
            description: "如果你使用了鲁莽攻击，你可以放弃本回合你选择的一次基于力量的攻击检定具有的所有优势（不可选择具有劣势的攻击检定）。被选择的攻击检定命中时，目标将受到 1d10 的额外伤害，伤害类型与此次攻击所使用的武器或徒手打击造成的伤害类型相同，并且你可以造成一种你所选的凶蛮打击效应。你具有以下效应选项：\n\n**巨力猛击 Forceful Blow**。目标被你直线推开 15 尺距离。随后你可以立刻向该目标移动至多等于你速度一半的距离，并且不会引发借机攻击。\n**断筋猛击 Hamstring Blow**。直至你的下个回合开始，目标的速度降低 15 尺。一个生物同一时间只会受到最近一次断筋猛击的影响。"
        },
        {
            level: 10,
            name: "野蛮人子职特性 (Subclass Feature)",
            description: "你获得你所选的野蛮人子职带来的特性。"
        },
        {
            level: 11,
            name: "坚韧狂暴 (Relentless Rage)",
            description: "你狂暴的力量让你即使身受重伤也能持续战斗。狂暴激活期间，如果你的生命值降至 0 且并未立即死亡，则你可以进行一次 DC10 的体质豁免检定。成功则作为替代，你的生命值将变为你野蛮人等级的两倍。\n第一次使用此特性后，每当你再次使用此特性时其体质豁免 DC 提升 5。当你完成一次短休或长休后，其 DC 重置为 10。"
        },
        {
            level: 12,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。"
        },
        {
            level: 13,
            name: "强化凶蛮打击 (Improved Brutal Strike)",
            description: "你训练出了更多种残暴的攻击方式。将以下效应加入到你的凶蛮打击选项中：\n\n**震撼猛击 Staggering Blow**。目标进行的下一次豁免检定具有劣势，并且目标直至你的下个回合开始都不能发动借机攻击。\n**破势猛击 Sundering Blow**。直至你的下个回合开始，下一次由其他生物对目标进行的攻击检定获得 +5 加值。一次攻击检定只能从一次破势猛击中获得加值。"
        },
        {
            level: 14,
            name: "野蛮人子职特性 (Subclass Feature)",
            description: "你获得你所选的野蛮人子职带来的特性。"
        },
        {
            level: 15,
            name: "持久狂暴 (Persistent Rage)",
            description: "当你投掷先攻时，你可以重获所有已消耗的狂暴使用次数。你以此法重获狂暴使用次数后，直至你完成一次长休，你都不能再这么做。\n此外，你的狂暴是如此凶悍，现在你的狂暴总是能持续 10 分钟，无需你做任何事来延长一轮狂暴。你陷入昏迷状态（而不再是陷入失能状态）或穿戴重甲时，你的狂暴提前结束。"
        },
        {
            level: 16,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。"
        },
        {
            level: 17,
            name: "强化凶蛮打击 (Improved Brutal Strike)",
            description: "你凶蛮打击的额外伤害提升至 2d10。此外，每当你使用凶蛮打击特性时，你可以同时使用两种不同的凶蛮打击效应。"
        },
        {
            level: 18,
            name: "不屈勇武 (Indomitable Might)",
            description: "如果你进行的力量检定或力量豁免检定的总值低于你的力量属性值，你可以使用你的力量属性值替代检定总值。"
        },
        {
            level: 19,
            name: "传奇恩惠 (Epic Boon)",
            description: "你获得一项传奇恩惠专长（见第五章）或其他一项你选择的适用的专长。推荐选择无敌攻势之恩惠。"
        },
        {
            level: 20,
            name: "原初斗士 (Primal Champion)",
            description: "你本身便是原初之力的象征。你的力量和体质各提升 4，你这两项属性的上限变为 25。"
        }
    ]
};

export const BARBARIAN_SUBCLASSES: SubclassItem[] = [
    {
        id: "barbarian-berserker",
        name: "狂战士道途",
        parentClass: "野蛮人",
        source: "官方规则",
        description: "极限狂怒\n连续攻势\n无我境界\n威射全场\n暴力美学",
        fullDescription: "那些踏上狂战士道途的野蛮人以暴力的方式直接诠释狂暴。狂战士之道代表着不受约束的狂怒，他们于混乱的战斗中兴奋忘我，将自身完全交托于狂暴操控。",
        features: [
            {
                level: 3,
                name: "狂怒 (Frenzy)",
                description: "狂暴激活期间，在你使用鲁莽攻击的回合中，你基于力量的攻击首次命中时，对目标造成额外伤害。投掷等于你狂暴伤害加值数量的 d6，将它们相加，即是你造成的额外伤害。额外伤害类型与此次攻击所使用的武器或徒手打击造成的伤害类型相同。"
            },
            {
                level: 6,
                name: "无我狂暴 (Mindless Rage)",
                description: "狂暴激活期间，你具有魅惑与恐慌状态的免疫。当你进入狂暴时，若你已陷入魅惑或恐慌，你陷入的这些状态立即结束。"
            },
            {
                level: 10,
                name: "报偿 (Retaliation)",
                description: "当一名位于你 5 尺内的生物对你造成伤害时，你能够以反应使用武器或徒手打击对其发动一次近战攻击。"
            },
            {
                level: 14,
                name: "威慑之姿 (Intimidating Presence)",
                description: "以一个附赠动作，你可以用你那令人魂消胆丧的面相，在原初之力的辅助下将恐惧打入他者内心。当你如此做时，每个位于以你为源点的 30 尺光环区域内你所选择的生物必须进行一次感知豁免检定（DC 等于 8＋你的力量调整值＋你的熟练加值）。豁免失败则陷入恐慌状态，持续 1 分钟。陷入恐慌的生物在其每个回合结束时重复豁免，成功则终止其身上的该效应。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗一次狂暴使用次数（无需动作）来重置此特性的使用权。"
            }
        ]
    },
    {
        id: "barbarian-wildheart",
        name: "兽心道途",
        parentClass: "野蛮人",
        source: "官方规则",
        description: "山林为伴\n异兽化身\n自然语者\n鹰熊狼三形\n荒野生存",
        fullDescription: "跟随兽心道途的野蛮人将自身视作动物们的家人。他们学习与动物交流的魔法手段，他们的狂暴赋予他们超自然的力量来增强与动物们的联系。",
        features: [
            {
                level: 3,
                name: "动物语者 (Animal Speaker)",
                description: "你可以施展法术 **野兽知觉 (Beast Sense)** 与 **动物交谈 (Speak With Animals)**，仅限仪式施展。感知是你这些法术的施法属性。"
            },
            {
                level: 3,
                name: "兽性狂暴 (Rage of the Wilds)",
                description: "你的狂暴解放来自动物的原初之力。每当你激活狂暴时，你从下列选项中选择一项。\n\n**熊 Bear**。狂暴激活期间，你具有除力场、心灵、暗蚀、光耀外所有伤害类型的抗性。\n**鹰 Eagle**。当你激活狂暴时，作为你进入狂暴的附赠动作的一部分，你可以同时执行撤离与疾走动作。狂暴激活期间，你也能够以一个附赠动作同时执行这两个动作。\n**狼 Wolf**。狂暴激活期间，你的盟友对位于你 5 尺内的敌人进行的攻击检定具有优势。"
            },
            {
                level: 6,
                name: "兽之形貌 (Aspect of the Wilds)",
                description: "你从下列选项中自选一项能力获得。当你完成一次长休时，你可以改变你的选择。\n\n**枭 Owl**。你具有 60 尺黑暗视觉。如果你已经具有黑暗视觉，你的黑暗视觉范围增加 60 尺。\n**豹 Panther**。你具有等于你速度的攀爬速度。\n**鲑 Salmon**。你具有等于你速度的游泳速度。"
            },
            {
                level: 10,
                name: "自然语者 (Nature Speaker)",
                description: "你可以施展法术 **问道自然 (Commune With Nature)**，仅限仪式施展。感知是你该法术的施法属性。"
            },
            {
                level: 14,
                name: "兽力威能 (Power of the Wilds)",
                description: "每当你激活狂暴时，你从下列选项中选择一项。\n\n**猎鹰 Falcon**。狂暴激活期间，只要你没有着装任何护甲*，你就具有等于你速度的飞行速度。\n**雄狮 Lion**。狂暴激活期间，任何位于你 5 尺内的敌人不以你（或另一个选择该项能力的野蛮人）为目标的攻击检定具有劣势。\n**角羊 Ram**。狂暴激活期间，当你的近战攻击命中一名体型不超过大型的生物时，你可以令其陷入倒地状态。\n\n*注：武僧的无甲防御中特别强调了“未持用盾牌”而该特性没有，因此根据法师护甲的 SA，你在使用盾牌时依然可以使用该飞行速度。"
            }
        ]
    },
    {
        id: "barbarian-worldtree",
        name: "世界树道途",
        parentClass: "野蛮人",
        source: "官方规则",
        description: "位面行者\n生命之源\n枝条传送\n根须打击\n世界树枝",
        fullDescription: "追随世界树道途的野蛮人以狂暴的力量与宇宙之树尤格德拉希尔连接。尤格德拉希尔在外层位面中生长，将每个外层位面与物质位面一一相连。世界树道途的野蛮人利用树的魔力来保持活力，并将其作为次元旅行的手段。",
        features: [
            {
                level: 3,
                name: "圣树活力 (Vitality of theTree)",
                description: "你的狂暴浸润着世界树的生命力。你获得以下增益：\n\n**活力之涌 Vitality Surge**。当你激活狂暴时，你获得等于你野蛮人等级的临时生命值。\n**赐命之源 Life-Giving Force**。你的狂暴激活期间，在你的每个回合开始时，你可以赋予位于你 10 尺内的另一名生物临时生命值。投掷等于你狂暴伤害加值数量的 d6，将它们相加，即是该生物获得的临时生命值。当你的狂暴结束时，剩余的临时生命值将会消失。"
            },
            {
                level: 6,
                name: "灵树枝杈 (Branches of the Tree)",
                description: "你的狂暴激活期间，每当你可见的位于你 30 尺内的生物的回合开始时，你能够以反应在其周围召唤世界树的灵体枝条。目标必须成功通过一次力量豁免（DC 等于 8+你的力量调整值+你的熟练加值），否则将被传送到位于你 5 尺内的你可见的未占据空间内或距离你最近的你可见的未占据空间内。目标被你传送后，你可以令其速度降为 0，持续至当前回合结束。"
            },
            {
                level: 10,
                name: "根击千钧 (Battering Roots)",
                description: "世界树的卷须将你的武器延长。你的回合内，你持用的任何具有重型或多用词条的近战武器的触及增加 10 尺。当你在你的回合内以该武器命中时，除了激活这把武器本身具有的其他精通词条外，你还可以激活推离或失衡精通词条。"
            },
            {
                level: 14,
                name: "世界树之奇旅 (Travel along the Tree)",
                description: "当你激活狂暴时，你可以传送至多 60 尺的距离，到一处你可见的未占据空间中。在你的狂暴激活期间，你也能够以一个附赠动作来进行传送。\n此外，每次狂暴期间仅一次，你可以使传送的距离提升至 150 尺，并可以选择带上至多 6 个位于你 10 尺内的自愿生物同你一起传送。每个其他生物都将被传送至位于你目的地 10 尺内的你选择的未占据空间中。"
            }
        ]
    },
    {
        id: "barbarian-zealot",
        name: "狂热者道途",
        parentClass: "野蛮人",
        source: "官方规则",
        description: "神力加持\n光耀伤害\n山岳不死\n神圣狂暴\n不死战士",
        fullDescription: "走上狂热者道途的野蛮人会得到某个神明或某个神系的恩惠。这些野蛮人将他们的狂暴视为神圣结合的至高愉悦，并借此获得力量。狂热者野蛮人常是他们的神明或神系座下牧师或信者的盟友。",
        features: [
            {
                level: 3,
                name: "神性之怒 (Divine Fury)",
                description: "你可以引导神性的怒火，将其注入打击之中。你的狂暴激活期间，你的每个回合中你首次以武器或徒手打击命中的生物将受到等于 1d6+你野蛮人等级的一半（向下取整）的额外伤害。额外伤害的伤害类型为光耀或暗蚀，在每次造成伤害时由你选择伤害类型。"
            },
            {
                level: 3,
                name: "神之勇者 (Warrior of the Gods)",
                description: "某个神圣实体对你施以援手以确保你总能继续战斗。你获得一个有着 4 枚 d12 的治疗池，你可以用其中的骰子治愈自身。以一个附赠动作，你可以消耗治疗池中任意枚骰子来恢复你的生命值。投掷所有你消耗的骰子，将它们相加，即是你以此恢复的生命值。\n当你完成一次长休时，你的治疗池重获所有已消耗的骰子。\n治疗池中骰子的最大数量将会在你到达特定野蛮人等级时增加，分别为 6 级时增加至 5 枚，12 级时增加至 6 枚，17 级时增加至 7 枚。"
            },
            {
                level: 6,
                name: "专心炽志 (Fanatical Focus)",
                description: "每次狂暴期间仅一次，若你失败于某次豁免检定，你可以重骰这次检定并在检定中获得等于你的狂暴伤害加值的加值，你必须使用重骰后的结果。"
            },
            {
                level: 10,
                name: "狂热威仪 (Zealous Presence)",
                description: "以一个附赠动作，你以满腔神圣能量发出战吼。选择至多十名位于你 60 尺内的生物，直至你的下个回合开始，他们的攻击检定和豁免检定具有优势。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗一次狂暴使用次数（无需动作）来重置此特性的使用权。"
            },
            {
                level: 14,
                name: "神之狂暴 (Rage of the Gods)",
                description: "当你激活狂暴时，你可以呈现出圣斗士姿态。圣斗士姿态持续 1 分钟，且在你生命值降至 0 时提前结束。此特性一经使用，直至完成长休你都无法再次使用。\n处于圣斗士姿态期间，你获得以下增益。\n\n**飞翔 Flight**。你具有等于你速度的飞行速度，并且可以悬浮。\n**抗性 Resistance**。你具有对暗蚀、心灵和光耀伤害的抗性。\n**回春 Revivification**。当位于你 30 尺内的一名生物的生命值将要降至 0 时，你能够以反应消耗一次狂暴使用次数，令目标的生命值变为等于你野蛮人等级的值。"
            }
        ]
    }
];
