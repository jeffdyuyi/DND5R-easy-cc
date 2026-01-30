import { ClassItem, SubclassItem } from '../../types';

export const ROGUE_CLASS: ClassItem = {
    id: "rogue-2024",
    name: "游荡者",
    source: "官方规则",
    description: "偷袭背刺\n灵活跑路\n技能专家\n闪避满分\n开锁工具人",
    fullDescription: "游荡者依靠技能、隐秘和利用敌人的弱点来从任何环境中获得优势。\n\n**专精 (Expertise)**\n1级时，你获得两项技能专精（熟练加值翻倍）。6级时再获得两项。\n\n**偷袭 (Sneak Attack)**\n每个回合一次，当你用灵巧或远程武器攻击命中，且具有优势（或盟友在目标5尺内），可造成额外伤害（见职业表）。\n\n**盗贼黑话 (Thieves' Cant)**\n你学会这种秘密语言，可以隐藏信息。",
    hitDie: "d8",
    primaryAbility: "敏捷",
    saves: ["敏捷", "智力"],
    tags: ["潜行", "技能专家", "爆发"],
    coreTraits: {
        primaryAbility: "敏捷",
        hitPointDie: "每游荡者等级 d8",
        savingThrows: "敏捷与智力",
        skillProficiencies: "选择4项：杂技、运动、欺瞒、洞悉、恐吓、调查、察觉、说服、巧手、隐匿",
        weaponProficiencies: "简易武器、带有灵巧或轻型属性的军用武器",
        armorTraining: "轻甲",
        startingEquipment: {
            optionA: "皮甲，两把匕首，短剑，短弓，20 支箭，箭袋，盗贼工具，窃贼套组，以及 8GP",
            optionB: "100 GP"
        }
    },
    subclassLevel: 3,
    subclasses: [],
    features: [
        {
            level: 1,
            name: "专精 (Expertise)",
            description: "你获得两项由你选择的你已熟练的技能的专精。\n巧手和隐匿是游荡者的标志性选择，如果你有这两项技能的熟练项的话。\n专精是可以增强你某项技能熟练的使用效果的特性。当你使用具有专精的技能熟练进行一次属性检定，此次检定中加入的熟练加值加倍。如果已有其他特性使你的熟练加值加倍，专精不会有效果。\n当你获得专精特性时，你需要选择一项你具有熟练的技能来获得专精。在同一项技能熟练中，你只能应用一次专精特性"
        },
        {
            level: 1,
            name: "偷袭 (Sneak Attack)",
            description: "你知道如何利用敌人的分心并发动致命的精巧打击。\n每个回合一次，当你的攻击检定命中了一个生物时，你可以造成 1d6 的额外伤害。这次攻击必须使用一把灵巧或远程武器并具有优势。额外伤害的伤害类型与该武器的伤害类型一致。\n除此之外，若你的目标周围 5 尺内有你的盟友，并且该盟友没有陷入失能状态，你的攻击检定也没有劣势的话，则你不需要优势也造成额外伤害。\n你的额外伤害会随着你的游荡者等级提高而增长，具体如游荡者特性表中的偷袭一列所示。"
        },
        {
            level: 1,
            name: "盗贼黑话 (Thieves' Cant)",
            description: "你在施展自己游荡者才华的社区里学习了多样的语言。\n你额外习得盗贼黑话和语言表中的一项语言。"
        },
        {
            level: 1,
            name: "武器精通 (Weapon Mastery)",
            description: "你对武器的训练使你能够运用两种自选熟练武器的精通属性，比如选择匕首和短弓。\n当你完成一次长休后，你可以改变你所选择的武器类型。比如你可以改为使用弯刀和短剑。"
        },
        {
            level: 2,
            name: "灵巧动作 (Cunning Action)",
            description: "你精妙的反应与身手使你的行动无比迅速。在你的回合内，你可以以附赠动作执行疾走，撤离或躲藏动作之一。"
        },
        {
            level: 3,
            name: "游荡者子职 (Rogue Subclass)",
            description: "你选择获得一项游荡者子职：\n诡术师，刺客，魂刃或盗贼。\n子职业的内容见后文。子职是一种特化，在特定的游荡者等级给予你对应的独特能力。此后你将获得每一个你所选的子职的能力，只要其所需等级等于或低于你的游荡者等级。游荡者职业表列出了你从子职中获得新特性的游荡者等级。"
        },
        {
            level: 3,
            name: "稳定瞄准 (Steady Aim)",
            description: "作为一个附赠动作，你在当前回合为你的下一次攻击提供优势。\n你只能在你本回合还没有移动的时候使用这个附赠动作，而且在你使用这个附赠动作后，你的速度在当前回合里归 0。"
        },
        {
            level: 4,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 5,
            name: "直觉闪避 (Uncanny Dodge)",
            description: "当一个你能看见的攻击者用一次攻击检定命中你时，你可以用你的反应将这次攻击对你造成的伤害减半（向下取整）。"
        },
        {
            level: 5,
            name: "诡诈打击 (Cunning Strike)",
            description: "你学会了如何使你的偷袭更加狡诈的方法。\n当你造成偷袭伤害时，你可以选择下列一种诡诈打击的效果加入到本次偷袭中。每种效果都需要花费一定数量的偷袭伤害骰才能生效。\n你必须在投掷伤害前扣除所花费的偷袭的伤害骰，而效果会在这次攻击的伤害产生后立即发生。例如，如果你在本次偷袭中选择了“淬毒”效果，那么你在投掷偷袭伤害骰前需要先减少一颗 1d6。\n如果一种诡诈打击的效果要求目标进行豁免，其 DC 为 8+你的熟练加值+你的敏捷调整值。\n\n**淬毒 (花费：1d6)**。你为你的打击附上毒素，强迫目标进行一次体质豁免。若失败，目标将陷入一分钟的中毒状态。目标可以在每次自己的回合结束时重新进行豁免，若成功，中毒状态终止。为了使用这个效果，你必须携带一套制毒工具在身上。\n**摔绊 (花费：1d6)**。若偷袭的目标是大型及以下，它必须通过一次成功的敏捷豁免，否则陷入倒地状态。\n**撤步 (花费：1d6)**。攻击后你立刻移动至多等于你速度的一半的距离，并且不会触发借机攻击。"
        },
        {
            level: 6,
            name: "专精",
            description: "你获得两项由你选择的你已熟练的技能的专精。"
        },
        {
            level: 7,
            name: "反射闪避 (Evasion)",
            description: "你可以灵敏地躲避特定的危险。\n当你受到一个允许你进行敏捷豁免来只承受一半伤害的效应影响时，你在豁免成功时不受伤害，豁免失败时只承受一半伤害。\n你无法在失能时使用此特性。"
        },
        {
            level: 7,
            name: "可靠才能 (Reliable Talent)",
            description: "每当你进行属性检定，并且可以运用你的某项技能熟练项或工具熟练项时，你可以将 D20 投出的 9 及以下的结果视为 10。"
        },
        {
            level: 8,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 9,
            name: "游荡者子职特性",
            description: "获得你所选的游荡者子职 9 级特性。"
        },
        {
            level: 10,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 11,
            name: "进阶诡诈打击 (Improved Cunning Strike)",
            description: "你在造成偷袭伤害时可以一次性选用两种诡诈打击效果，每种效果都需要独立扣除对应的偷袭伤害骰。"
        },
        {
            level: 12,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 13,
            name: "游荡者子职特性",
            description: "获得你所选的游荡者子职 13 级特性。"
        },
        {
            level: 14,
            name: "凶狡打击 (Devious Strike)",
            description: "你习得了新的偷袭方法，使你的偷袭变得更为凶狠卑劣。下列效果现在加入你的诡诈打击选项。\n\n**恍惚 (花费：2d6)**。目标必须通过一个成功的体质豁免，否则该目标的下一回合只能选择下列行为中的一项：移动、执行一个动作或执行一个附赠动作。\n**击昏 (花费：6d6)**。目标必须通过一个成功的体质豁免，否则将陷入昏迷状态，持续一分钟或受到任何伤害。昏迷的目标每在自己的回合结束时都可以重新进行豁免，若通过，则状态结束。\n**眩目(花费：3d6)**。你对目标的眼睛发动袭击。目标必须通过一个成功的敏捷豁免，否则将陷入目盲状态，直到它的下一回合结束。"
        },
        {
            level: 15,
            name: "圆滑心智 (Slippery Mind)",
            description: "你狡猾的头脑很难被人控制。你获得感知豁免与魅力豁免的熟练项。"
        },
        {
            level: 16,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 17,
            name: "游荡者子职特性",
            description: "获得你所选的游荡者子职 17 级特性。"
        },
        {
            level: 18,
            name: "飘忽不定 (Elusive)",
            description: "你飘忽不定的身形让敌人攻击时无从下手。只要你并未失能，以你为目标的攻击检定无法具有优势。"
        },
        {
            level: 19,
            name: "传奇恩惠",
            description: "你获得一项传奇恩惠专长或其他一项你选择的适用的专长。推荐幽夜精魂之恩惠。"
        },
        {
            level: 20,
            name: "幸运一击 (Stroke of Luck)",
            description: "你留了一手非凡技巧，让你可以随时把握自己的成功之际。当你在一次 D20 检定中失败时，你可以将结果改为 20。\n一旦你使用了此特性，你在完成一次短休或长休前不能再次使用。"
        }
    ]
};

export const ROGUE_SUBCLASSES: SubclassItem[] = [
    {
        id: "rogue-thief",
        name: "盗贼",
        parentClass: "游荡者",
        source: "官方规则",
        description: "专精于入室盗窃、扒窃和翻墙的专家。",
        features: [
            {
                level: 3,
                name: "快手 (Fast Hands)",
                description: "灵巧动作的附赠动作选项中增加：进行 一次敏捷（巧手）检定，使用盗贼工具拆卸陷阱或开锁，或者执行 使用物件 动作。"
            },
            {
                level: 3,
                name: "梁上君子 (Second-Story Work)",
                description: "你获得同等于你速度的攀爬速度。此外，当你进行跳跃时，你可以用敏捷代替力量进行判定，且跳跃距离增加敏捷调整值的尺数。"
            },
            {
                level: 9,
                name: "潜行极意 (Supreme Sneak)",
                description: "若你本回合移动距离没有超过你的一半速度，你在敏捷（隐匿）检定上具有优势。"
            },
            {
                level: 13,
                name: "使用魔法装置 (Use Magic Device)",
                description: "你对魔法物品的使用了如指掌。你无视魔法物品对职业、种族和等级的要求。你可以同调至多 4 件魔法物品。"
            },
            {
                level: 17,
                name: "盗亦有道 (Thief's Reflexes)",
                description: "在战斗的第一轮，你拥有两个回合。第二个回合在第一轮所有生物都行动完毕后进行（按先攻顺序）。此回合不能使用偷袭？（注：5e特性是两回合，通常每回合都能偷袭，只要满足条件）。"
            }
        ]
    },
    {
        id: "rogue-assassin",
        name: "刺客",
        parentClass: "游荡者",
        source: "官方规则",
        description: "专注于暗杀艺术。",
        features: [
            {
                level: 3,
                name: "暗杀 (Assassinate)",
                description: "在战斗中，你对任何还没有行动过的生物攻击检定具有优势。\n此外，你对任何受惊生物的命中都视为重击。"
            },
            {
                level: 3,
                name: "刺客工具 (Bonus Proficiencies)",
                description: "获得伪装工具和制毒工具的熟练。"
            },
            {
                level: 9,
                name: "渗透专家 (Infiltration Expertise)",
                description: "你可以花费 25gp 和 7 天时间伪造一个身份。只要你不自爆，其他人就会相信你是该身份。"
            },
            {
                level: 13,
                name: "冒名顶替 (Impostor)",
                description: "你可以模仿另一个人的言行举止。若你观察对方至少 3 小时，你就能完美模仿。试图看穿你的人需要进行洞悉检定对抗你的欺瞒检定（你具有优势）。"
            },
            {
                level: 17,
                name: "致死一击 (Death Strike)",
                description: "当你攻击并命中一名受惊生物时，该生物必须进行一次体质豁免（DC 8+敏捷+熟练）。失败则此次攻击造成的伤害翻倍。"
            }
        ]
    },
    {
        id: "rogue-arcane",
        name: "诡术师",
        parentClass: "游荡者",
        source: "官方规则",
        description: "结合了幻术和惑控魔法的游荡者。",
        features: [
            {
                level: 3,
                name: "施法 (Spellcasting)",
                description: "习得法师戏法（含法师之手）和法师法术（幻术/惑控为主）。智力施法。\n**法师之手欺诈**: 你可以用附赠动作控制法师之手，并且它可以：放入/取出容器中的物体，使用盗贼工具。它可以隐形。"
            },
            {
                level: 9,
                name: "魔法埋伏 (Magical Ambush)",
                description: "当你处于隐匿状态时，若你施展法术迫使生物进行豁免，该生物在豁免检定中具有劣势。"
            },
            {
                level: 13,
                name: "多面手 (Versatile Trickster)",
                description: "你可以用附赠动作让法师之手对 5 尺内一个生物进行“干扰”。若成功，你对该生物的下一次攻击检定具有优势（赋予偷袭条件）。"
            },
            {
                level: 17,
                name: "法术窃贼 (Spell Thief)",
                description: "当目标对你施法时，你可以反应强迫其进行智力/魅力豁免。若其失败，该法术无效，且你偷取了该法术知识（你可以施展它）。持续 8 小时。对方在此时段不能施展该法术。长休恢复。"
            }
        ]
    },
    {
        id: "rogue-soulknife",
        name: "魂刃",
        parentClass: "游荡者",
        source: "官方规则",
        description: "用灵能之刃进行攻击。",
        features: [
            {
                level: 3,
                name: "灵能之力 (Psionic Power)",
                description: "获得灵能骰（d6, 随等级提升）。\n**灵能天赋**: 技能检定失败可加灵能骰。\n**心灵低语**: 建立心灵感应链接。"
            },
            {
                level: 3,
                name: "灵能之刃 (Psychic Blades)",
                description: "攻击动作可具现化灵能刃（灵巧/投掷）。造成 1d6+敏捷 心灵伤害。附赠动作可再次攻击（1d4+敏捷）。攻击后消失且不留痕迹。"
            },
            {
                level: 9,
                name: "魂刃技艺 (Soul Blades)",
                description: "• **制导打击**: 攻击失手可消耗灵能骰加到命中上。\n• **灵能传送**: 消耗灵能骰传送至多几十尺（骰值x10？不，抛出骰子到空地传送）。"
            },
            {
                level: 13,
                name: "心灵面纱 (Psychic Veil)",
                description: "获得隐形，持续 1 小时或直到攻击/施法。长休免费一次，之后消耗灵能骰。"
            },
            {
                level: 17,
                name: "撕裂思维 (Rend Mind)",
                description: "偷袭命中时，迫使目标感知豁免，失败则震慑 1 分钟（每回合结束可豁免）。消耗灵能骰或长休免费一次。"
            }
        ]
    }
];
