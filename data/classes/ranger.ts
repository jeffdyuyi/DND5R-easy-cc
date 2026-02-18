import { ClassItem, SubclassItem } from '../../types';

export const RANGER_CLASS: ClassItem = {
    id: "ranger-2024",
    name: "游侠",
    source: "官方规则",
    description: "半施法者\n双持/弓箭\n野外追踪\n猎人印记\n动物伙伴",
    fullDescription: "无论身处人迹罕至的森林，亦或是广袤无垠的平原，游侠们远离着城市的喧嚣，日复一日地守望着荒野。他们如猎食猛兽般追踪猎物，隐匿于灌木乱石之间，悄步于荒野之上。\n凭借自己与自然的深厚联系，游侠们也能自由地驾驭荒野中的原初伟力。他们磨炼着自己的魔法与技艺，只为保护这个世界免受怪物与暴君的肆虐\n\n**施法**\n戏法。你已知 2 个你选择的德鲁伊戏法。推荐选择 德鲁伊伎俩 和 刺鞭。4级和10级时习得额外戏法。\n**法术位**。游侠特性表显示了你可用于施放 1 环及以上法术的法术位数量。长休恢复。\n**准备法术**。初始准备 2 个 一环法术。推荐选择 疗伤术 和 荆棘之击。此外你总是准备 猎人印记。\n**施法属性**。感知。",
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
    classTable: {
        title: "游侠职业特性表",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "宿敌", key: "favored_enemy" },
            { header: "准备法术", key: "prepared_spells" },
            { header: "一环", key: "slot1" },
            { header: "二环", key: "slot2" },
            { header: "三环", key: "slot3" },
            { header: "四环", key: "slot4" },
            { header: "五环", key: "slot5" }
        ],
        rows: [
            { level: 1, pb: "+2", features: ["施法", "宿敌", "武器精通"], favored_enemy: "2", prepared_spells: "2", slot1: "2", slot2: "—", slot3: "—", slot4: "—", slot5: "—" },
            { level: 2, pb: "+2", features: ["熟练探险家", "战斗风格"], favored_enemy: "2", prepared_spells: "3", slot1: "2", slot2: "—", slot3: "—", slot4: "—", slot5: "—" },
            { level: 3, pb: "+2", features: ["游侠子职业"], favored_enemy: "2", prepared_spells: "4", slot1: "3", slot2: "—", slot3: "—", slot4: "—", slot5: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], favored_enemy: "2", prepared_spells: "5", slot1: "3", slot2: "—", slot3: "—", slot4: "—", slot5: "—" },
            { level: 5, pb: "+3", features: ["额外攻击"], favored_enemy: "3", prepared_spells: "6", slot1: "4", slot2: "2", slot3: "—", slot4: "—", slot5: "—" },
            { level: 6, pb: "+3", features: ["越野"], favored_enemy: "3", prepared_spells: "6", slot1: "4", slot2: "2", slot3: "—", slot4: "—", slot5: "—" },
            { level: 7, pb: "+3", features: ["子职特性"], favored_enemy: "3", prepared_spells: "7", slot1: "4", slot2: "3", slot3: "—", slot4: "—", slot5: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], favored_enemy: "3", prepared_spells: "7", slot1: "4", slot2: "3", slot3: "—", slot4: "—", slot5: "—" },
            { level: 9, pb: "+4", features: ["专精"], favored_enemy: "4", prepared_spells: "9", slot1: "4", slot2: "3", slot3: "2", slot4: "—", slot5: "—" },
            { level: 10, pb: "+4", features: ["不知疲倦"], favored_enemy: "4", prepared_spells: "9", slot1: "4", slot2: "3", slot3: "2", slot4: "—", slot5: "—" },
            { level: 11, pb: "+4", features: ["子职特性"], favored_enemy: "4", prepared_spells: "10", slot1: "4", slot2: "3", slot3: "3", slot4: "—", slot5: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], favored_enemy: "4", prepared_spells: "10", slot1: "4", slot2: "3", slot3: "3", slot4: "—", slot5: "—" },
            { level: 13, pb: "+5", features: ["永恒追猎"], favored_enemy: "5", prepared_spells: "11", slot1: "4", slot2: "3", slot3: "3", slot4: "1", slot5: "—" },
            { level: 14, pb: "+5", features: ["自然面纱"], favored_enemy: "5", prepared_spells: "11", slot1: "4", slot2: "3", slot3: "3", slot4: "1", slot5: "—" },
            { level: 15, pb: "+5", features: ["子职特性"], favored_enemy: "5", prepared_spells: "12", slot1: "4", slot2: "3", slot3: "3", slot4: "2", slot5: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], favored_enemy: "5", prepared_spells: "12", slot1: "4", slot2: "3", slot3: "3", slot4: "2", slot5: "—" },
            { level: 17, pb: "+6", features: ["致命猎杀"], favored_enemy: "6", prepared_spells: "14", slot1: "4", slot2: "3", slot3: "3", slot4: "3", slot5: "1" },
            { level: 18, pb: "+6", features: ["野性感官"], favored_enemy: "6", prepared_spells: "14", slot1: "4", slot2: "3", slot3: "3", slot4: "3", slot5: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], favored_enemy: "6", prepared_spells: "15", slot1: "4", slot2: "3", slot3: "3", slot4: "3", slot5: "2" },
            { level: 20, pb: "+6", features: ["屠灭众敌"], favored_enemy: "6", prepared_spells: "15", slot1: "4", slot2: "3", slot3: "3", slot4: "3", slot5: "2" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "施法 (Spellcasting)",
            description: "你学会运用自然世界的魔法本源进行施法。施法规则见第七章。下文将详述如何将这些规则应用于游侠法术，游侠法术详见本章后文职业描述中的游侠法术表。\n\n**法术位 Spell Slots**\n游侠特性表显示了你可用于施展一环及以上法术的法术位数量。当你完成长休时，你重获所有已消耗的法术位。\n\n**一环及以上的准备法术 Prepared Spells of 1st+ Level**\n你准备可供你以此特性施展的一环及更高环阶的法术列表。最初，选择两道游侠法术。推荐选择**捕获打击 Ensnaring Strike**和**疗伤术 Cure Wounds**。\n已准备法术数量会随你游侠等级的提升而增加，如游侠特性表中的准备法术一列所示。每当这一列的数字增加时，从游侠法术列表中选择额外法术准备，直至已准备法术的数量与表格中的数字一致。你所选择法术的环阶必须是你所拥有法术位对应的环阶。例如，如果你是一名5级游侠，则你的准备法术列表能包括六道一环或二环的游侠法术，随意组合。\n如果游侠的其他特性给了你始终准备着的法术，这些法术不计入你以此法准备的法术数量，但这些法术对你而言都视为游侠法术。\n**改变你的准备法术 Changing Your Prepared Spells**。每当你完成一次长休时，你可以将你准备列表上的一道法术替换为其他游侠法术，新替换的法术必须是你拥有法术位的法术。\n\n**施法属性 Spellcasting Ability**\n你游侠法术的施法属性是感知。\n\n**施法法器 Spellcasting Focus**\n你可以使用德鲁伊法器作为你游侠法术的施法法器。"
        },
        {
            level: 1,
            name: "宿敌 (Favored Enemy)",
            description: "你始终准备着法术**猎人印记 Hunter's Mark**。你可以无需法术位地施展此法术共计**两次**，并在完成一次长休后恢复此能力的所有使用次数。\n你能无需法术位施展该法术的次数会在你获得特定游侠等级时提升，见游侠特性表中的**宿敌**一栏。"
        },
        {
            level: 1,
            name: "武器精通 (Weapon Mastery)",
            description: "你对武器的训练使你能够自选并使用**2种**已熟练武器的精通词条，例如长弓和短剑。\n当你完成一次长休时，你可以改变你所选择的武器类型。比如你可以将其改为弯刀和长剑。"
        },
        {
            level: 2,
            name: "熟练探险家 (Deft Explorer)",
            description: "得益于你的旅途，你获得以下增益：\n- **专精 Expertise**：选择一项你熟练但不具备专精的技能。你在那个技能上获得专精。\n- **语言 Languages**：你习得第二章的语言表中的两门语言。"
        },
        {
            level: 2,
            name: "战斗风格 (Fighting Style)",
            description: "你获得一项**战斗风格专长**（见第五章），你也可以选择以下选项：\n\n**德鲁伊教战士 Druidic Warrior**\n你习得两道你选择的德鲁伊戏法（德鲁伊法术列表见德鲁伊职业部分），推荐选取**神导术 Guidance**和**点点星芒 Starry Wisp**。它们对你视作游侠法术，且这些法术的施法属性是感知。每当你获得一个游侠等级时，你都能从这些戏法中选择其一替换为另一道你所选择的德鲁伊戏法。"
        },
        {
            level: 3,
            name: "游侠子职 (Ranger Subclass)",
            description: "你选择获得一项游侠子职：**驯兽师**，**妖精漫游者**，**幽域追猎者**或**猎人**。子职的内容见后文。\n子职是一种特化，在特定的游侠等级给予你对应的独特能力。此后你将获得你所选的子职所有能力——只要其所需等级不超过你的游侠等级。游侠特性表列出了你从子职中获得新特性的游侠等级。"
        },
        {
            level: 4,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得**属性值提升专长**（见第五章）或其他你满足条件的专长。你还会在你的游侠等级达到第8、第12和第16级时再次获得本特性。"
        },
        {
            level: 5,
            name: "额外攻击 (Extra Attack)",
            description: "你在自己回合内执行攻击动作时，可以发动两次攻击而非一次。"
        },
        {
            level: 6,
            name: "越野 (Roving)",
            description: "只要你未着装重甲，你的速度提升**10尺**。你也获得等于你速度的攀爬速度和游泳速度。"
        },
        {
            level: 7,
            name: "游侠子职特性",
            description: "获得你所选的游侠子职 7 级特性。"
        },
        {
            level: 8,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得属性值提升专长。"
        },
        {
            level: 9,
            name: "专精 (Expertise)",
            description: "选择两项你熟练但不具备专精的技能，你获得这些技能的专精。"
        },
        {
            level: 10,
            name: "不知疲倦 (Tireless)",
            description: "原初的力量现在会帮你重整旗鼓，重新踏上旅途。你因它获得以下增益：\n\n**临时生命值 Temporary Hit Points**\n以一个魔法动作，你能够给予自己 `1d8 + 感知调整值`（最低为1） 的临时生命值。你能够使用此特性的次数等于你的**感知调整值**次（最低一次），当你完成一次长休时，你重获全部已消耗的使用次数。\n\n**减少力竭 Decrease Exhaustion**\n当你完成一次短休时，你的力竭等级减少1级（若有）。"
        },
        {
            level: 11,
            name: "游侠子职特性",
            description: "获得你所选的游侠子职 11 级特性。"
        },
        {
            level: 12,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得属性值提升专长。"
        },
        {
            level: 13,
            name: "永恒追猎 (Relentless Hunter)",
            description: "受到伤害不会打断你对**猎人印记 Hunter's Mark** 的专注。"
        },
        {
            level: 14,
            name: "自然面纱 (Nature's Veil)",
            description: "你祈唤自然精魂，魔法性地将身形遮蔽隐蔽。以一个附赠动作，你可以让自己进入**隐形状态**，持续到你的下一回合结束。\n你可以使用该特性的次数同等于你的**感知调整值**次（最少1次），完成一次长休时，你重获全部已消耗的使用次数。"
        },
        {
            level: 15,
            name: "游侠子职特性",
            description: "获得你所选的游侠子职 15 级特性。"
        },
        {
            level: 16,
            name: "属性值提升 (Ability Score Improvement)",
            description: "获得属性值提升专长。"
        },
        {
            level: 17,
            name: "致命猎杀 (Precise Hunter)",
            description: "你在对你的**猎人印记 Hunter's Mark** 当前指定的目标的攻击检定中具有优势。"
        },
        {
            level: 18,
            name: "野性感官 (Feral Senses)",
            description: "你与自然的链接给予了你 **30尺盲视**。"
        },
        {
            level: 19,
            name: "传奇恩惠 (Epic Boon)",
            description: "你获得一项**传奇恩惠专长**（见第五章）或其他一项你选择的适用的专长。推荐选择**次元旅行之恩惠**。"
        },
        {
            level: 20,
            name: "屠灭众敌 (Foe Slayer)",
            description: "你的**猎人印记 Hunter's Mark** 的额外伤害骰从 **d6** 变为 **d10**。"
        }
    ]
};

export const RANGER_SUBCLASSES: SubclassItem[] = [
    {
        id: "ranger-hunter",
        name: "猎人",
        parentClass: "游侠",
        source: "官方规则",
        description: "保护自然与人民免于毁灭。你追逐猎物直到天涯海角，运用你的猎人的本领去保护自然与人民，使其不受灾祸的毁灭。",
        features: [
            {
                level: 3,
                name: "猎人学识 (Hunter's Lore)",
                description: "你可以呼唤自然的力量以揭晓猎物的强弱。\n在一个生物被你的**猎人印记**标记的期间，你知道那个生物是否拥有任何免疫、抗性或易伤，并且能够得知其具体的项目是什么。"
            },
            {
                level: 3,
                name: "猎杀技艺 (Hunter's Prey)",
                description: "你选择并获得以下特性选项之一。当你完成一次短休或长休时，你可以将所选的选项替换为另一个。\n\n**巨像屠夫 Colossus Slayer**\n你强而有力的攻击可以击倒最强壮的对手。当你用武器命中生物时，如果该敌人生命值不满，则该武器额外对目标造成 **1d8** 点伤害。你每回合只能造成一次这种额外伤害。\n\n**灭族者 Horde Breaker**\n每个你的回合一次，当你用武器进行攻击时，你可以用该武器对位于目标5尺内的另一生物发动另一次攻击。额外攻击的目标必须处于你武器射程或范围内，且是你这回合没有攻击过的目标。"
            },
            {
                level: 7,
                name: "防御战术 (Defensive Tactics)",
                description: "你选择并获得以下特性选项之一。当你完成一次短休或长休时，你可以将所选的选项替换为另一个。\n\n**冲出重围 Escape the Horde**\n对你发动的借机攻击具有**劣势**。\n\n**多重防御 Multiattack Defense**\n当一个生物的攻击检定命中你时，该生物在本回合内对你进行的其他攻击检定具有**劣势**。"
            },
            {
                level: 11,
                name: "高阶猎杀技艺 (Superior Hunter's Prey)",
                description: "每回合一次，当你对被你的**猎人印记**所标记的生物造成伤害时，你可以对位于这个生物 **30尺** 范围内的一个你能看见的另一名生物，同样施加由猎人印记造成的额外伤害。"
            },
            {
                level: 15,
                name: "高阶防守战术 (Superior Hunter's Defense)",
                description: "当你受到伤害时，你可以用你的**反应**使你获得对该伤害以及相同伤害类型的**抗性**，直至当前回合结束。"
            }
        ]
    },
    {
        id: "ranger-beastmaster",
        name: "驯兽师",
        parentClass: "游侠",
        source: "官方规则",
        description: "与原始野兽结缘，挥舞着原初魔法与超自然野兽形成神秘联系。",
        features: [
            {
                level: 3,
                name: "原初行侣 (Primal Companion)",
                description: "你魔法性的召唤出一只原初野兽，其力量来自于与你与自然的联系。你从大地野兽、海洋野兽和天空野兽中选择其一项作为它的数据卡。你决定原初野兽是何种动物，选择适合其数据卡的外形。无论你选择什么样的动物，这只野兽都带有原初之力的印痕，暗示着其超凡起源。\n这只野兽对你和你的伙伴态度友善，并会听从你的命令。野兽会在你死亡时消失。\n\n**战斗中的野兽 The Beast in Combat**\n战斗中，原初野兽会在你的回合中行动。它能自主地移动或使用反应，但除非你在你的回合中以一个附赠动作命令它执行其他动作，它只会执行回避动作。命令的动作可以是其数据卡中列出的动作或是之外的其他动作。作为另一种命令方式，你也能在使用自己的攻击动作时，牺牲一次自己的攻击来命令野兽执行野兽打击动作。如果你陷入失能，野兽将会自主行动，而非仅使用回避动作。\n\n**复活或替换野兽 Restoring or Replacing the Beast**\n如果野兽死亡不超过一小时，你能够以一个魔法动作，并消耗一个法术位使它复活。它会在一分钟后死而复生并恢复所有生命值。\n每当你完成长休时，你都能召唤一只不同的原初野兽。这只新的野兽出现在位于你5尺内的一处未占据空间内，并由你选择其数据卡和外表。如果你已经通过此特性获得了一只原初野兽，它会在新的原初野兽出现时消失。\n\n---\n\n#### 大地野兽 Beast of the Land\n*中型野兽，绝对中立*\n\n**AC**: 13 + 你的感知调整值\n**HP**: 5 + 你游侠等级的五倍（5d8）\n**速度**: 40尺，攀爬 40尺\n\n| 力量 | 敏捷 | 体质 | 智力 | 感知 | 魅力 |\n|---|---|---|---|---|---|\n| 14 (+2) | 14 (+2) | 15 (+2) | 8 (-1) | 14 (+2) | 11 (+0) |\n\n**感官**: 黑暗视觉 60尺，被动察觉 12\n**语言**: 理解你说的语言\n\n**特质**\n*   **原初联结 (Primal Bond)**: 将你的熟练加值加到野兽进行的任意属性检定和豁免检定中。\n\n**动作**\n*   **野兽打击 (Beast's Strike)**: 近战攻击检定，加值等于你的法术攻击加值，触及5尺。命中：`1d8 + 2 + 感知调整值` 的穿刺、挥砍或钝击伤害（于召唤时选择）。若野兽在此次攻击前立即向着该目标直线移动了至少20尺，则目标额外受到 `1d6` 与攻击伤害类型相同的伤害，若目标体型不超过巨型，则其还会陷入**倒地**状态。\n\n---\n\n#### 海洋野兽 Beast of the Sea\n*中型野兽，绝对中立*\n\n**AC**: 13 + 你的感知调整值\n**HP**: 5 + 你游侠等级的五倍（5d8）\n**速度**: 5尺，游泳 60尺\n\n| 力量 | 敏捷 | 体质 | 智力 | 感知 | 魅力 |\n|---|---|---|---|---|---|\n| 14 (+2) | 14 (+2) | 15 (+2) | 8 (-1) | 14 (+2) | 11 (+0) |\n\n**感官**: 黑暗视觉 90尺，被动察觉 12\n**语言**: 理解你说的语言\n\n**特质**\n*   **水陆两栖 (Amphibious)**: 野兽可以在空气和水中呼吸。\n*   **原初联结 (Primal Bond)**: 将你的熟练加值加到野兽进行的任意属性检定和豁免检定中。\n\n**动作**\n*   **野兽打击 (Beast's Strike)**: 近战攻击检定，加值等于你的法术攻击加值，触及5尺。命中：`1d6 + 2 + 感知调整值` 的钝击或穿刺伤害（于召唤时选择），且目标陷入**受擒**状态（逃脱DC等于你的法术豁免DC）。\n\n---\n\n#### 天空野兽 Beast of the Sky\n*小型野兽，绝对中立*\n\n**AC**: 13 + 你的感知调整值\n**HP**: 4 + 你游侠等级的四倍（4d6）\n**速度**: 10尺，飞行 60尺\n\n| 力量 | 敏捷 | 体质 | 智力 | 感知 | 魅力 |\n|---|---|---|---|---|---|\n| 6 (-2) | 16 (+3) | 13 (+1) | 8 (-1) | 14 (+2) | 11 (+0) |\n\n**感官**: 黑暗视觉 60尺，被动察觉 12\n**语言**: 理解你说的语言\n\n**特质**\n*   **飞掠 (Flyby)**: 野兽飞行离开敌人的触及时不会引发借机攻击。\n*   **原初联结 (Primal Bond)**: 将你的熟练加值加到野兽进行的任意属性检定和豁免检定中。\n\n**动作**\n*   **野兽打击 (Beast's Strike)**: 近战攻击检定，加值等于你的法术攻击加值，触及5尺。命中：`1d4 + 3 + 感知调整值` 的挥砍伤害。"
            },
            {
                level: 7,
                name: "特效训练 (Exceptional Training)",
                description: "当你以附赠动作命令你的原初行侣野兽执行动作时，你还可以令它以它自己的附赠动作执行疾走、撤离、回避或协助动作。\n此外，每当你的野兽的攻击检定命中并造成伤害时，其伤害类型可以是力场伤害或其原本的伤害类型（由你选择）。"
            },
            {
                level: 11,
                name: "兽性狂怒 (Bestial Fury)",
                description: "当你命令原初行侣执行野兽打击动作时，它能使用该动作两次。\n此外，每个回合中，当它首次击中一个受到你的法术**猎人印记 Hunter's Mark**影响的生物时，它可以额外造成一定的力场伤害，其数值等同于那个法术的额外伤害。"
            },
            {
                level: 15,
                name: "法术共享 (Share Spells)",
                description: "当你施展的法术指定了你自己作为目标，并且你的原初行侣正位于你30尺范围内时，你可以让该法术效应同时作用于你的原初行侣。"
            }
        ]
    },
    {
        id: "ranger-feywanderer",
        name: "妖精漫游者",
        parentClass: "游侠",
        source: "官方规则",
        description: "驾驭妖精的哀与乐。或来自一位至高妖精的恩惠，或是在妖精荒野中的一次奇遇，你的身侧因那次奇遇而有妖精的魔力缠绕。无论你是怎么得到你来自妖精的魔法的，你现在是一名妖精漫游者。你轻快的笑声为受压迫者们带来欣喜的希望，你英勇的技艺直击你敌人的恐惧，你所就的伟绩乃是妖精的喜悦，你散布的恐惧乃是妖精的愤怒。",
        features: [
            {
                level: 3,
                name: "哀惧灵袭 (Dreadful Strikes)",
                description: "你能够使用来自妖精荒野中黑暗空洞的摄心魔法以强化你的武器攻击。当你用一把武器击中一个生物时，你可以对目标造成额外的 **1d4** 点心灵伤害。每个生物在每个回合只能够受到这一额外伤害一次。\n你的游侠等级达到11级时，这一额外伤害变为 **1d6**。"
            },
            {
                level: 3,
                name: "妖精漫游者魔法 (Fey Wanderer Magic)",
                description: "当你到达妖精漫游者法术表中特定的游侠等级时，你就始终准备着表中对应的法术。\n\n**妖精漫游者法术 Fey Wanderer Spells**\n\n| 游侠等级 | 法术 |\n|---|---|\n| 3 | **魅惑类人 Charm Person** |\n| 5 | **迷踪步 Misty Step** |\n| 9 | **妖精召唤术 Summon Fey** |\n| 13 | **任意门 Dimension Door** |\n| 17 | **假象术 Mislead** |\n\n你还获得了一种妖精祝福。你可以在下方精野之赐表中选择你的祝福或者随机决定它。\n\n**精野之赐 Feywild Gifts**\n\n| d6 | 祝福 |\n|---|---|\n| 1 | 在你进行长休或短休时，缥缈的蝴蝶在你周身振翅。 |\n| 2 | 每天黎明，花朵将在你的头发中生长。 |\n| 3 | 你身上有淡淡的肉桂、薰衣草或肉豆蔻，或另一种令人舒适的药草或香料的香味。 |\n| 4 | 你的影子会在没人直视它时起舞。 |\n| 5 | 你的头发中长出纤细的触角或鹿角。 |\n| 6 | 你的肤色和发色会在每个黎明时改变。 |"
            },
            {
                level: 3,
                name: "妖冶娴都 (Otherworldly Glamour)",
                description: "每当你进行一次魅力检定时，你都可以在那次检定中获得等于你的**感知调整值**的加值（至少+1）。\n另外，你选择获得下列技能之一的熟练：**欺瞒**、**表演**或**游说**。"
            },
            {
                level: 7,
                name: "妖思魅缕 (Beguiling Twist)",
                description: "妖精荒原的魔法护卫着你的心灵。你在对抗或终止**魅惑**或**恐慌**状态的豁免检定上具有优势。\n此外，当你或位于你120尺内的一个你可见的生物，通过了一次对抗或终止魅惑或恐慌状态的豁免检定时，你可以用你的反应迫使位于你120尺内的另一个你可见的不同生物，进行一次对抗你法术豁免DC的感知豁免。豁免失败，目标则陷入**魅惑**或**恐慌**状态（由你选择）1分钟。目标在其每回合结束时重复此豁免，豁免成功则结束此效应。"
            },
            {
                level: 11,
                name: "精宸所与 (Fey Reinforcements)",
                description: "你可以无需材料成分地施展**妖精召唤术 Summon Fey**。同时，你可以免费施展这个法术一次而不需要消耗法术位，在你完成一次长休后，你重获免费施展该法术的能力。\n每当你施展此法术时，你都可以微调这一法术使其**无需专注**。以无需专注的方式施法时，该法术的持续时间将变为一分钟。"
            },
            {
                level: 15,
                name: "雾行漫游 (Misty Wanderer)",
                description: "你可以免费施展**迷踪步 Misty Step**而不需要消耗法术位，次数等同于你的**感知调整值**次（至少一次），在完成一次长休后，你重获所有的已消耗的次数。\n另外，每当你施展**迷踪步 Misty Step**时，你可以携带一个位于你5尺内你可见的自愿生物与你一同传送。那个生物会被传送到由你选择的，位于你的目标位置5尺内的一处未占据空间内。"
            }
        ]
    },
    {
        id: "ranger-gloomstalker",
        name: "幽域追猎者",
        parentClass: "游侠",
        source: "官方规则",
        description: "利用阴影魔法制敌。幽域追猎者们以至暗之地为家，驾驭着来自堕影冥界的魔法与潜伏在黑暗中的敌人作战。",
        features: [
            {
                level: 3,
                name: "恐惧伏击 (Dread Ambusher)",
                description: "你精通于伏击的恐怖技艺，并获得了以下增益：\n\n**伏击者之跃 Ambusher's Leap**\n在每一场战斗的你的第一个回合的开始，你的移动速度增加 **10尺**，直到那个回合结束。\n\n**恐惧打击 Dreadful Strike**\n当你用武器对生物攻击并命中时，你可以额外对目标造成 **2d6** 点心灵伤害。你在每回合中只能使用一次这个增益。\n你可以使用这一增益的次数等同于你的**感知调整值**（最低一次），并在完成一次长休后重获全部已消耗的使用次数。\n\n**先攻加值 Initiative Bonus**\n当你投掷先攻时，你可以在那次掷骰中加入你的**感知调整值**。"
            },
            {
                level: 3,
                name: "幽域追猎者魔法 (Gloom Stalker Magic)",
                description: "当你到达幽域追猎者法术表中特定的游侠等级时，你就始终准备着表中对应的法术。\n\n**幽域追猎者法术 Gloom Stalker Spells**\n\n| 游侠等级 | 法术 |\n|---|---|\n| 3 | **易容术 Disguise Self** |\n| 5 | **魔绳术 Rope Trick** |\n| 9 | **恐惧术 Fear** |\n| 13 | **高等隐形术 Greater Invisibility** |\n| 17 | **伪装术 Seeming** |"
            },
            {
                level: 3,
                name: "阴影视野 (Umbral Sight)",
                description: "你获得 **60尺** 黑暗视觉。如果你获得本特性时已拥有了黑暗视觉，那个黑暗视觉的范围增加60尺。\n你还擅长避开依赖黑暗视觉的角色。完全身处黑暗期间，对于任何依靠黑暗视觉观察黑暗中的你的生物而言，你具有**隐形**状态。"
            },
            {
                level: 7,
                name: "钢铁意志 (Iron Mind)",
                description: "你已经磨炼出了抵御精神影响的能力。你获得**感知豁免**熟练。如果你已经有这项熟练，你可以获得**智力**或者**魅力**豁免熟练（由你选择）来代替。"
            },
            {
                level: 11,
                name: "追猎如风 (Stalker's Flurry)",
                description: "你的**恐惧打击 Dreadful Strike** 造成的心灵伤害变为 **2d8**。\n另外，当你使用恐惧伏击的恐惧打击特性时，你可以创造出以下的额外效应之一：\n\n**瞬杀 Sudden Strike**\n你可以用同一把武器，对位于原目标 **5尺** 范围内的另一生物再发动一次攻击，新目标必须处于你武器的触及或射程内。\n\n**群慌 Mass Fear**\n目标与位于目标 10 尺范围内的每个生物都必须通过一次对抗你法术豁免DC的感知豁免。若豁免失败，生物将会陷入**恐慌**状态，持续至你的下一回合开始。"
            },
            {
                level: 15,
                name: "如影随行 (Shadowy Dodge)",
                description: "当一个生物对你发动了一次攻击检定时，你能用反应对这次检定施加**劣势**。不管那次攻击命中或失手，你都能在那之后传送至你 **30尺** 范围内的一处未被占据的、你可见的空间。"
            }
        ]
    }
];
