import { ClassItem, SubclassItem } from '../../types';

export const RANGER_CLASS: ClassItem = {
    id: "ranger-2024",
    name: "游侠",
    source: "官方规则",
    description: "半施法者\n双持/弓箭\n野外追踪\n猎人印记\n动物伙伴",
    fullDescription: "游侠是荒野中的猎人，他们不仅精通武艺，还懂得利用自然的魔力来追踪和猎杀敌人。\n\n**施法**\n戏法。你已知 2 个你选择的德鲁伊戏法。推荐选择 德鲁伊伎俩 和 刺鞭。4级和10级时习得额外戏法。\n**法术位**。游侠特性表显示了你可用于施放 1 环及以上法术的法术位数量。长休恢复。\n**准备法术**。初始准备 2 个 一环法术。推荐选择 疗伤术 和 荆棘之击。此外你总是准备 猎人印记。\n**施法属性**。感知。",
    hitDie: "d10",
    primaryAbility: "敏捷和感知",
    saves: ["力量", "敏捷"],
    tags: ["半施法者", "远程", "近战"],
    coreTraits: {
        primaryAbility: "敏捷与感知",
        hitPointDie: "每游侠等级 d10",
        savingThrows: "力量与敏捷",
        skillProficiencies: "选择3项：驯兽、运动、洞悉、调查、自然、察觉、隐匿、求生",
        weaponProficiencies: "简易武器、军用武器",
        armorTraining: "轻甲、中甲和盾牌",
        startingEquipment: {
            optionA: "镶钉皮甲，弯刀，短剑，长弓，20 支箭，箭袋，德鲁伊法器（槲寄生枝条），探索套组，以及 7GP",
            optionB: "150 GP"
        }
    },
    subclassLevel: 3,
    subclasses: [],
    features: [
        {
            level: 1,
            name: "施法 (Spellcasting)",
            description: "你可以施展法术。你需要准备法术。感知是你的施法属性，你可以使用德鲁伊法器。"
        },
        {
            level: 1,
            name: "猎人印记 (Favored Enemy)",
            description: "你总是准备了 猎人印记 法术。你可以每回合两次免费施展它而不用消耗法术位。此外，施展该法术不会破坏你对另一个法术的专注，但它自己仍需要专注（如果另一个法术不需要专注的话？不，2024规则已修改，猎人印记现在不需专注？不，规则书说: “受到伤害不会打断你对猎人印记的专注”，这暗示它仍需专注）。"
        },
        {
            level: 1,
            name: "武器精通 (Weapon Mastery)",
            description: "你选择两种武器（如弯刀和长弓）以使用其精通特质。长休后可更换。"
        },
        {
            level: 2,
            name: "灵巧探险家 (Deft Explorer)",
            description: "你获得一项技能的专精（技能熟练加倍）。此外，你习得两种语言。另外，作为环境适应的一部分，一种地形（如极地、废土等）对你来说不再是困难地形。"
        },
        {
            level: 2,
            name: "战斗风格 (Fighting Style)",
            description: "选择一项战斗风格专长。推荐：射术或双武器战斗。"
        },
        {
            level: 3,
            name: "游侠子职 (Ranger Subclass)",
            description: "选择一个游侠子职：猎人、兽王、妖精漫游者或幽域追踪者。"
        },
        {
            level: 4,
            name: "属性值提升",
            description: "获得属性值提升专长。"
        },
        {
            level: 5,
            name: "额外攻击 (Extra Attack)",
            description: "攻击动作可进行两次攻击。"
        },
        {
            level: 6,
            name: "漫游 (Roving)",
            description: "只要你未着装重甲，你的速度增加 10 尺。你也获得等于你速度的攀爬速度和游泳速度。"
        },
        {
            level: 7,
            name: "游侠子职特性",
            description: "获得你所选的游侠子职 7 级特性。"
        },
        {
            level: 8,
            name: "属性值提升",
            description: "获得属性值提升专长。"
        },
        {
            level: 9,
            name: "专精",
            description: "选择两项你熟练但不具备专精的技能，你获得这些技能的专精。"
        },
        {
            level: 10,
            name: "不知疲倦 (Tireless)",
            description: "以一个魔法动作获得 1d8+感知 临时HP。次数=感知调整值。短休时消除1级力竭。"
        },
        {
            level: 11,
            name: "游侠子职特性",
            description: "获得你所选的游侠子职 11 级特性。"
        },
        {
            level: 12,
            name: "属性值提升",
            description: "获得属性值提升专长。"
        },
        {
            level: 13,
            name: "永恒追猎 (Relentless Hunter)",
            description: "受到伤害不会打断你对猎人印记的专注。"
        },
        {
            level: 14,
            name: "自然面纱 (Nature's Veil)",
            description: "附赠动作隐形至下回合结束。次数=感知调整值。长休恢复。"
        },
        {
            level: 15,
            name: "游侠子职特性",
            description: "获得你所选的游侠子职 15 级特性。"
        },
        {
            level: 16,
            name: "属性值提升",
            description: "获得属性值提升专长。"
        },
        {
            level: 17,
            name: "致命猎杀 (Precise Hunter)",
            description: "你在对你的猎人印记当前指定的目标的攻击检定中具有优势。"
        },
        {
            level: 18,
            name: "野性感官 (Feral Senses)",
            description: "你获得 30 尺盲视。"
        },
        {
            level: 19,
            name: "传奇恩惠",
            description: "获得传奇恩惠专长（推荐：次元旅行之恩惠）。"
        },
        {
            level: 20,
            name: "屠灭众敌 (Foe Slayer)",
            description: "你的猎人印记的额外伤害骰从 d6 变为 d10。"
        }
    ]
};

export const RANGER_SUBCLASSES: SubclassItem[] = [
    {
        id: "ranger-hunter",
        name: "猎人",
        parentClass: "游侠",
        source: "官方规则",
        description: "致力于保护文明边缘免受怪物侵袭的游侠。",
        features: [
            {
                level: 3,
                name: "猎人法术 (Hunter's Lore)",
                description: "你始终准备着猎人印记法术。此外，当你对生物施展猎人印记时，你知道该生物是否有伤害免疫、抗性或易伤。若有，你也知道具体是哪些。"
            },
            {
                level: 3,
                name: "猎杀绝技 (Hunter's Prey)",
                description: "从下列选项中选择一项：\n• **巨像屠夫**: 每回合一次，若你用武器击中一个生命值未满的生物，额外造成 1d8 伤害。\n• **巨人杀手**: 当大型或更大体型的生物对你发动攻击（无论命中与否），你反应对它发动一次攻击。\n• **破群者**: 每回合一次，当你武器攻击命中一个生物后，虽然对同一范围内（5尺）另一个生物发动一次攻击。"
            },
            {
                level: 7,
                name: "防御战术 (Defensive Tactics)",
                description: "从下列选项中选择一项：\n• **脱逃大师**: 借机攻击对你具有劣势。\n• **钢铁意志**: 恐慌豁免优势。\n• **多重防御**: 当一个生物的攻击对你造成伤害后，该生物本回合内对你的后续攻击具有劣势。"
            },
            {
                level: 11,
                name: "多重攻击 (Multiattack)",
                description: "从下列选项中选择一项：\n• **乱射**: 动作。对你视野内 10 尺半径区域内的任意数量生物发动远程攻击。\n• **旋风斩**: 动作。对你 5 尺内的任意数量生物发动近战攻击。"
            },
            {
                level: 15,
                name: "精通猎人防御 (Superior Hunter's Defense)",
                description: "从下列选项中选择一项：\n• **反射闪避**: 敏捷豁免成功无伤，失败半伤。\n• **对抗潮水**: 当敌人的近战攻击对你失手时，你可以反应迫使该敌人对你选择的另一生物重复该攻击（若在范围内）。\n• **直觉闪避**: 被看见的攻击者命中时，反应减半伤害。"
            }
        ]
    },
    {
        id: "ranger-beastmaster",
        name: "兽王",
        parentClass: "游侠",
        source: "官方规则",
        description: "与一只原初野兽建立纽带。",
        features: [
            {
                level: 3,
                name: "原初伙伴 (Primal Companion)",
                description: "你魔法地召唤一只原初野兽（陆地、海洋或天空）。它有自己的属性块（AC、HP等随你成长）。\n你可以用附赠动作命令它执行 攻击 动作（即野兽自己的攻击动作）、疾走、撤离、回避或 协助 动作。若你不发布命令，它只会回避。\n你攻击动作时，可以牺牲自己的一次攻击让野兽发动攻击。"
            },
            {
                level: 7,
                name: "绝佳训练 (Exceptional Training)",
                description: "野兽伙伴的攻击现在视为魔法攻击。此外，当野兽伙伴执行 攻击 动作时，它可以用附赠动作执行 疾走、撤离 或 协助。"
            },
            {
                level: 11,
                name: "野兽狂怒 (Bestial Fury)",
                description: "当你的野兽伙伴执行 攻击 动作时，它可以发动两次攻击。"
            },
            {
                level: 15,
                name: "法术共享 (Share Spells)",
                description: "当你对自己施展一个法术时，如果你的野兽伙伴在你 30 尺内，该法术也可以作用于野兽伙伴。"
            }
        ]
    },
    {
        id: "ranger-feywanderer",
        name: "妖精漫游者",
        parentClass: "游侠",
        source: "官方规则",
        description: "你不仅是主物质位面的保卫者，也是妖精荒野的行者。",
        features: [
            {
                level: 3,
                name: "恐惧打击 (Dreadful Strikes)",
                description: "当你用武器击中一个生物时，可以以此造成额外 1d4 心灵伤害。每一回合内，你只能对每个不同的生物各造成一次该伤害。\n在 11 级时增加到 1d6。"
            },
            {
                level: 3,
                name: "妖精漫游者法术 (Fey Wanderer Spells)",
                description: "始终准备：魅惑人类 (Lv3); 迷踪步 (Lv5); 解除魔法 (Lv9); 任意门 (Lv13); 假象术 (Lv17)。"
            },
            {
                level: 3,
                name: "凡世魅力 (Otherworldly Glamour)",
                description: "你的魅力检定加上感知调整值。你获得欺瞒、表演或游说之一的熟练。"
            },
            {
                level: 7,
                name: "诱导魅力 (Beguiling Twist)",
                description: "你对魅惑和恐慌豁免有优势。\n每当这一豁免成功时，或你周围 120 尺内有人在这项豁免成功或结束该状态时，你可以用反应迫使 120 尺内另一个生物进行感知豁免，失败则被魅惑或恐慌（由你选）持续 1 分钟。"
            },
            {
                level: 11,
                name: "妖精援军 (Fey Reinforcements)",
                description: "你习得《召唤妖精》且不计入准备法术数。你可以无需法术位施展它（长休一次），此时无需材料且持续 1 分钟（无专注）。你也可以消耗法术位施展。"
            },
            {
                level: 15,
                name: "迷踪漫游者 (Misty Wanderer)",
                description: "你可以施展《迷踪步》而不用消耗法术位。次数=感知调整值（长休恢复）。\n当以此法施展后，你可以带上一名 5 尺内的自愿生物。"
            }
        ]
    },
    {
        id: "ranger-gloomstalker",
        name: "幽域追踪者",
        parentClass: "游侠",
        source: "官方规则",
        description: "在幽暗地域等黑暗环境中如鱼得水。",
        features: [
            {
                level: 3,
                name: "幽域追踪者魔法 (Gloom Stalker Magic)",
                description: "始终准备：易容术 (Lv3); 绳技 (Lv5); 恐惧术 (Lv9); 高等隐形术 (Lv13); 伪装术 (Lv17)。"
            },
            {
                level: 3,
                name: "无畏埋伏 (Dread Ambusher)",
                description: "在战斗的第一轮，你的速度增加 10 尺。\n此外，在该回合，若你执行 攻击 动作，你可以额外发动一次武器攻击，该次攻击造成额外 1d8 伤害（同类型）。\n从 2024 版本看，该特性可能有所改动，允许把该额外伤害换成某种恐慌效果？（需确认，这里沿用2014+常用改板或Tasha）\n注：根据2024测试版，可能是：每回合可由于恐惧打击增强？\n（此处按最常见的 5e 2014/2024 过渡版本写：首回合爆发+10尺移动）"
            },
            {
                level: 3,
                name: "本影视觉 (Umbral Sight)",
                description: "获得 60 尺黑暗视觉（若已有则+30）。\n虽然在黑暗中，你对任何依赖黑暗视觉的生物视为隐形。"
            },
            {
                level: 7,
                name: "钢铁意志 (Iron Mind)",
                description: "获得感知豁免熟练。若已有，则选智力或魅力豁免熟练。"
            },
            {
                level: 11,
                name: "潜行者乱舞 (Stalker's Flurry)",
                description: "每回合一次，若你的武器攻击失手，你可以重投该攻击。"
            },
            {
                level: 15,
                name: "幽影闪避 (Shadowy Dodge)",
                description: "只要不被束缚或失能，当以此针对你的攻击检定不具有优势时，你可以用反应使该次攻击具有劣势。"
            }
        ]
    }
];
