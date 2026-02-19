import { ClassItem, SubclassItem } from '../../types';

export const WIZARD_CLASS: ClassItem = {
    id: "wizard-2024",
    name: "法师",
    source: "官方规则",
    description: "法术书是本体\n仪式施法\n玻璃大炮\n智力巅峰\n抄书破产",
    fullDescription: "法师以他们对魔法内在运作机理的详尽研究而著称。他们施展的法术既可以化为爆焰、电弧，亦可以进行微妙的欺瞒与壮丽转化。他们的魔法可以从其他存在位面咒唤怪物、预见未来、或形成防护屏障。他们最强大的法术可以将一种物质转化为另一种，从天空召来流星，抑或打开通往其他世界的大门。\n\n大多数法师将魔法当作学术研究。他们研究魔法的理论基础，特别是诸法术学派的分类。在此基础上，像毕格比Bigby，塔莎Tasha，魔邓肯Mordenkainen和悠兰德Yolande等著名法师还发明了他们的标志性法术，这些法术至今仍在被多元宇宙各处的施法者使用。\n\n贤者或讲师可能是法师最接近平凡的生活。其他法师则充当提供有偿服务的顾问，在军队中服役，或是致力于以犯罪与支配为生。\n\n然而，即使是最不喜冒险的法师也会因知识的诱惑走出安全的实验室和图书馆，一头扎进失落的城市和遗迹。大多数法师相信他们古代文明的同行知晓失落于时间长河中的魔法之秘，而发现这些秘密则会解锁通往力量之路，当代的任何魔法都无法与之匹敌。",
    hitDie: "d6",
    primaryAbility: "智力",
    saves: ["智力", "感知"],
    tags: ["施法者", "控制", "万能"],
    spellList: "法师",
    coreTraits: {
        primaryAbility: "智力",
        hitPointDie: "每法师等级 d6",
        savingThrows: "智力与感知",
        skillProficiencies: "选择2项：奥秘、历史、洞悉、调查、医疗、自然、宗教",
        weaponProficiencies: "简易武器",
        armorTraining: "无",
        startingEquipment: {
            optionA: "2 把匕首，奥术法器（法杖，可视为长棍），长袍，法术书，学者套组，以及 5gp",
            optionB: "55 GP"
        }
    },
    subclassLevel: 3,
    classTable: {
        title: "法师特性 Wizard Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "戏法", key: "cantrips" },
            { header: "准备法术", key: "prepared_spells" },
            { header: "一环", key: "spell_slots_1" },
            { header: "二环", key: "spell_slots_2" },
            { header: "三环", key: "spell_slots_3" },
            { header: "四环", key: "spell_slots_4" },
            { header: "五环", key: "spell_slots_5" },
            { header: "六环", key: "spell_slots_6" },
            { header: "七环", key: "spell_slots_7" },
            { header: "八环", key: "spell_slots_8" },
            { header: "九环", key: "spell_slots_9" }
        ],
        rows: [
            { level: 1, pb: "+2", features: ["施法", "仪式学家", "奥术回想"], cantrips: "3", prepared_spells: "4", spell_slots_1: "2", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 2, pb: "+2", features: ["学者"], cantrips: "3", prepared_spells: "5", spell_slots_1: "3", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 3, pb: "+2", features: ["法师子职"], cantrips: "3", prepared_spells: "6", spell_slots_1: "4", spell_slots_2: "2", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], cantrips: "4", prepared_spells: "7", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 5, pb: "+3", features: ["记忆法术"], cantrips: "4", prepared_spells: "9", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "2", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 6, pb: "+3", features: ["子职特性"], cantrips: "4", prepared_spells: "10", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 7, pb: "+3", features: ["—"], cantrips: "4", prepared_spells: "11", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "1", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], cantrips: "4", prepared_spells: "12", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "2", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 9, pb: "+4", features: ["—"], cantrips: "4", prepared_spells: "14", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "1", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 10, pb: "+4", features: ["子职特性"], cantrips: "5", prepared_spells: "15", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 11, pb: "+4", features: ["—"], cantrips: "5", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], cantrips: "5", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 13, pb: "+5", features: ["—"], cantrips: "5", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 14, pb: "+5", features: ["子职特性"], cantrips: "5", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 15, pb: "+5", features: ["—"], cantrips: "5", prepared_spells: "19", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], cantrips: "5", prepared_spells: "21", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 17, pb: "+6", features: ["—"], cantrips: "5", prepared_spells: "22", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 18, pb: "+6", features: ["法术精通"], cantrips: "5", prepared_spells: "23", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], cantrips: "5", prepared_spells: "24", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 20, pb: "+6", features: ["招牌法术"], cantrips: "5", prepared_spells: "25", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "2", spell_slots_8: "1", spell_slots_9: "1" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "施法 (Spellcasting)",
            description: "你已经入门了奥术魔法，学会了如何施展法术。施法规则见第七章。下文将详述如何将这些规则应用于法师法术，法师法术详见本章后文职业描述中的法师法术表。\n\n**戏法 Cantrips**\n你知晓三道你选择的法师戏法。推荐选择**光亮术 Light**、**法师之手 Mage Hand** 和**冷冻射线 Ray of Frost**。\n每当你完成一次长休时，你都能从此特性的戏法中选择其一替换为另一道你所选择的法师戏法。\n当你的法师等级到达4级和10级时，你都能另选一道法师戏法并习得，如法师特性表中戏法一列所示。\n\n**法术书 Spellbook**\n你在法师学徒阶段获取的所有成果汇集于一本独特的书：你的法术书。它是一个重3磅的微型物件，内有100页，并且只能被你自己或者施展了**鉴定术 Identify**的人阅读。你来决定法术书的外貌和材料，比如一本镶金边的典籍或用麻绳装订的牛皮纸集。\n这本书包含所有你已知的一环及以上的法术。最初，它记录着六道法师法术。推荐选择**侦测魔法 Detect Magic**、**羽落术 Feather Fall**、**法师护甲 Mage Armor**、**魔法飞弹 Magic Missile**、**睡眠术 Sleep**和**雷鸣波 Thunderwave**。\n1级之后每当你获得一个法师等级时，你就可以往法术书中添加两道你选择的法师法术。你所选择法术的环阶必须是你所拥有法术位对应的环阶，你所拥有的法术位如法师特性表中所示。这些法术是你定期进行奥术研究的成果。\n\n**法术位 Spell Slots**\n法师特性表显示了你可用于施展一环及以上法术的法术位数量。当你完成长休时，你重获所有已消耗的法术位。\n\n**一环及以上的准备法术 Prepared Spells of Level 1+**\n你准备可供你以此特性施展的一环及更高环阶的法术列表。为此，从法术书中选择四道法师法术。你所选择法术的环阶必须是你所拥有法术位对应的环阶。\n已准备法术数量会随你法师等级的提升而增加，如法师特性表中的准备法术一列所示。每当该数字增加时，从你的法术书中选择额外法术准备，直至已准备法术的数量与表格中的数字一致。你所选择法术的环阶必须是你所拥有法术位对应的环阶。例如，如果你是一名3级法师，则你的准备法术列表能包括六道一环或二环的法师法术（从法术书中选取），随意组合。\n如果法师的其他特性给了你始终准备着的法术，这些法术不计入你以此法准备的法术数量，但这些法术对你而言都视为法师法术。\n\n**改变你的准备法术 Changing Your Prepared Spells**\n每当你完成一次长休时，你可以将你准备列表上的一道或更多法术替换为你法术书上的其他法师法术。\n\n**施法属性 Spellcasting Ability**\n你法师法术的施法属性是智力。\n\n**施法法器 Spellcasting Focus**\n你可以使用奥术法器或你的法术书作为你法师法术的施法法器。\n\n**扩展与替换法术书 Expanding and Replacing a Spellbook**\n你获得职业等级时添加到法术书中的法术反映了你自己进行的魔法研究，但你可能会在冒险过程中发现其他可以添加至法术书中的法术。例如，你可能在一张**法术卷轴 Spell Scroll** 中发现一道法师法术，然后将该法术抄到你的法术书中。\n\n**将一道法术抄写到法术书中 Copying a Spell into the Book**\n当你发现一道一环或更高环阶的法师法术时，如果它是你能进行准备的法术位环阶且你能抽出时间来抄写它，则你可以将其抄写到你的法术书中。每个法术环阶的抄录过程都需要**2小时**并花费**50GP**。在此之后，你就可以像准备法术书中的其他法术一样准备该法术了。\n\n**替换法术书 Replacing the Book**\n你可以将法术从你自己的法术书复制到另一本书中。这就像将新法术复制到你的法术书中一样，但更快也更简单，因为你已经知道如何施展这些法术。复制过程只需每个法术环阶花费**1小时**和**10GP**。\n如果你失去了你的法术书，则你可以使用相同的过程将你已准备的法师法术转录到新的法术书中。你仍需要找到新的法术来填满新书的剩余部分。出于这个原因，许多法师都会保留一本备用法术书。"
        },
        { level: 1, name: "仪式学家 (Ritual Adept)", description: "你能以仪式施展你法术书中任何带有**仪式**标签的法术。你不需要准备这些法术，但你以此法施展法术时必须阅读这本书。" },
        { level: 1, name: "奥术回想 (Arcane Recovery)", description: "你学会了通过研读法术书来恢复魔法能量的办法。你完成一次短休后，可以选择恢复已消耗的法术位。所恢复的法术位环阶总和不得大于你法师等级的一半（向上取整），且任何一个法术位的环阶都必须小于六环。例如，作为一名4级法师时，你可恢复环阶总数最多为二的法术位。你可以选择恢复一个二环法术位或两个一环法术位。\n此特性一经使用，直至完成长休你都无法再次使用。" },
        { level: 2, name: "学者 (Scholar)", description: "在学习法术之余，你还对一门学术领域有过专门的研究。从下列技能中选择一项你具有熟练的技能：**奥秘**、**历史**、**自然**或**宗教**。你获得所选技能的**专精**。" },
        { level: 3, name: "法师子职 (Wizard Subclass)", description: "你选择获得一项法师子职。防护师，预言师， 塑能师以及幻术师。子职的内容见后文。子职是一种特化，在特定的法师等级给予你对应的独特能力。此后你将获得你所选的子职所有能力——只要其所需等级不超过你的法师等级。法师职业特性表列出了你从子职中获得新特性的法师等级。" },
        { level: 4, name: "属性值提升 (Ability Score Improvement)", description: "你获得**属性值提升专长**（见第五章）或其他你满足条件的专长。如法师特性表所示，你还会在第8，第12，第16级时再次获得本特性。" },
        { level: 5, name: "记忆法术 (Memorize Spell)", description: "每当你完成一次短休时，你可以研究你的法术书并且将其中一道你以施法特性准备的一环及以上的法术替换为你法术书中的另一道一环及以上的法术。" },
        { level: 6, name: "子职特性 (Subclass Feature)", description: "获得所选法师子职的 6 级特性。" },
        { level: 8, name: "属性值提升 (Ability Score Improvement)", description: "获得属性值提升专长。" },
        { level: 10, name: "子职特性 (Subclass Feature)", description: "获得所选法师子职的 10 级特性。" },
        { level: 12, name: "属性值提升 (Ability Score Improvement)", description: "获得属性值提升专长。" },
        { level: 14, name: "子职特性 (Subclass Feature)", description: "获得所选法师子职的 14 级特性。" },
        { level: 16, name: "属性值提升 (Ability Score Improvement)", description: "获得属性值提升专长。" },
        { level: 18, name: "法术精通 (Spell Mastery)", description: "你对特定的法术精熟于心，以至于你可以将其随意施展。选择你法术书中的一道施法时间为动作的一环法术和一个二环法术，你总是准备这些法术，且能不消耗法术位地以最低环施展它们。如果你想升环施展这些法术，则你必须像平时一样消耗一个法术位。\n每当你完成一次长休时，你可以研究你的法术书并将其中一道法术更换为另一个符合条件的同环阶法术。" },
        { level: 19, name: "传奇恩惠 (Epic Boon)", description: "你获得一项**传奇恩惠专长**（见第五章）或其他一项你选择的适用的专长。推荐选择**法术溯回之恩惠**。" },
        { level: 20, name: "招牌法术 (Signature Spells)", description: "从你的法术书中选择两道三环法术作为你的招牌法术。你总是准备这些法术，且能不消耗法术位地以三环施展每道法术各一次。此特性一经使用，直到完成一次短休或长休都不能再次以此法施展这两道法术。如果你想升环施展这些法术，则你必须像平时一样消耗一个法术位。" }
    ]
};

export const WIZARD_SUBCLASSES: SubclassItem[] = [
    {
        id: "wizard-abjuration",
        name: "防护学派",
        parentClass: "法师",
        source: "官方规则",
        description: "防护学者\n奥术守御\n投射护盾\n强化反制\n法术抗性",
        fullDescription: "保卫同伴，放逐仇敌\n\n你对魔法的研究集中在阻挡、驱逐和保护的法术上——结束有害影响、消除邪恶影响和保护弱者。防护师能够驱逐恶灵、于重要地点防范魔法窥视、关闭通往其他存在位面的门扉。防护师对冒险队伍非常有价值，因为他们能够从各种敌对魔法和其他攻击中保护同伴。",
        features: [
            {
                level: 3,
                name: "防护学者 (Abjuration Savant)",
                description: "从法师法术列表中选择两道不高于二环的防护学派法术，并将其免费加入你的法术书中。\n此外，每当你在本职业中获得一个新环阶的法术位时，你都能免费将一道法师法术列表中的防护学派法术加入你的法术书中。你所选的法术都必须是你当前拥有法术位的环阶。"
            },
            {
                level: 3,
                name: "奥术守御 (Arcane Ward)",
                description: "你可以在自己周围编织魔法来保护自己。当你消耗法术位施展一道防护学派法术时，你能同时使用该法术的一缕魔力为自己创建一个魔法结界，该结界会持续至你完成一次长休。该结界的生命值上限等同于你**法师等级的两倍**加上你的**智力调整值**。\n每当你受到伤害时，结界会代替你受到此伤害，如果你具有任何抗性或易伤，则先为伤害应用抗性和易伤后再计算结界生命值减损。如果该伤害会使结界的生命值降至0，你将会受到溢出部分的伤害。当结界的生命值为0时，它无法吸收伤害，但其魔力仍然存在。\n每当你消耗法术位施展一道防护学派法术时，结界就会恢复等同于该法术位环阶**两倍**的生命值。此外，你也能够以一个附赠动作，消耗一个法术位使结界恢复等同于所消耗法术位环阶**两倍**的生命值。\n结界一经创建，直至你完成一次长休都无法再次被创建。"
            },
            {
                level: 6,
                name: "投射守御 (Projected Ward)",
                description: "当 **30尺** 内一个你可见的生物受到伤害时，你可以用你的反应让你的奥术守御吸收此次伤害。如果该伤害使结界的生命值降为0，则被保护的生物将承受所有剩余伤害。如果被保护的生物有任何抗性或易伤，则应在计算结界承伤之前先结算抗性和易伤。"
            },
            {
                level: 10,
                name: "破法者 (Spell Breaker)",
                description: "你始终准备着法术 **法术反制 Counterspell** 和 **解除魔法 Dispel Magic**。它们不计入你的准备法术数量。\n此外，你能够以一个附赠动作施展 **解除魔法 Dispel Magic**，且你能在其属性检定中加入你的熟练加值。\n你消耗法术位施展其中任意一道法术时，若该法术未能成功阻止法术施展或未能成功解除法术效应，则你用于施展 **法术反制** 或 **解除魔法** 的法术位不会被消耗。"
            },
            {
                level: 14,
                name: "法术抗性 (Spell Resistance)",
                description: "你抵抗法术时进行的豁免检定具有 **优势**，且你对法术造成的伤害具有 **抗性**。"
            }
        ]
    },
    {
        id: "wizard-divination",
        name: "预言学派",
        parentClass: "法师",
        source: "官方规则",
        description: "预言学者\n预兆改命\n回充法术\n天眼感知\n高等预兆",
        fullDescription: "探究多元宇宙之秘\n\n那些寻求对过去、现在和未来有更清晰了解的人会寻求预言师的建议。作为一位预言师，你致力于揭开空间、时间与意识的面纱。你努力掌握的法术囊括识别能力、千里眼、超自然学识和预警等内容。",
        features: [
            {
                level: 3,
                name: "预言学者 (Divination Savant)",
                description: "从法师法术列表中选择两道不高于二环的预言学派法术，并将其免费加入你的法术书中。\n此外，每当你在本职业中获得一个新环阶的法术位时，你都能免费将一道法师法术列表中的预言学派法术加入你的法术书中。你所选的法术都必须是你当前拥有法术位的环阶。"
            },
            {
                level: 3,
                name: "预兆 (Portent)",
                description: "预知未来的片段开始在你意识中闪过。每当你完成一次长休时，掷 **2次D20** 并记录其结果。你能用其中一个预言骰替换任何你或一个你能看见的生物进行的D20检定。你必须在检定进行前选择这样做，且你每回合只能以这种方式替换一次检定。\n每个预言骰只能被使用一次。当你完成一次长休时，你失去所有未消耗的预言骰。"
            },
            {
                level: 6,
                name: "专业预言 (Expert Divination)",
                description: "施展预言学派法术对你来说是如此容易，以至于其只会占用你施法努力中的一小部分。你消耗法术位施展一个环阶为 **二环或更高** 的预言学派法术时，可以恢复一个已消耗的法术位。所恢复的法术位环阶必须低于你正施展的预言学派法术，且 **不高于五环**。"
            },
            {
                level: 10,
                name: "天眼通 (The Third Eye)",
                description: "你可以增强你的察觉能力。以一个附赠动作，从以下增益中选择其一，其会持续至你开始一次短休或长休。此特性一经使用，直至完成短休或长休你都无法再次使用。\n\n**黑暗视觉 Darkvision**\n你具有120尺黑暗视觉。\n\n**高等通晓 Greater Comprehension**\n你可以读懂任何语言。\n\n**识破隐形 See Invisibility**\n你能不消耗法术位地施展法术 **识破隐形 See Invisibility**。"
            },
            {
                level: 14,
                name: "高等预兆 (Greater Portent)",
                description: "你梦中的景象更为清晰地在你意识中描绘出了将要发生的一切。为你的 **预兆** 特性掷 **3次d20**，而不是2次。"
            }
        ]
    },
    {
        id: "wizard-evocation",
        name: "塑能学派",
        parentClass: "法师",
        source: "官方规则",
        description: "塑能学者\n强力戏法\n法术塑形\n强效塑能\n超限爆发",
        fullDescription: "创造炸裂的元素特效\n\n你专注于研习以魔力创造威力惊人的元素力量，诸如苦寒、灼焰、惊雷、汲电和烈酸。一些塑能师会接受军队的雇佣，充当从远处轰炸敌人的炮兵。其他人以其惊人力量保护弱小，另一些人则作为冒险者寻求自身的利益。",
        features: [
            {
                level: 3,
                name: "塑能学者 (Evocation Savant)",
                description: "从法师法术列表中选择两道不高于二环的塑能学派法术，并将其免费加入你的法术书中。\n此外，每当你在本职业中获得一个新环阶的法术位时，你都能免费将一道法师法术列表中的塑能学派法术加入你的法术书中。你所选的法术都必须是你当前拥有法术位的环阶。"
            },
            {
                level: 3,
                name: "强力戏法 (Potent Cantrip)",
                description: "你造成伤害的戏法甚至能影响到本可免受戏法效应影响的生物。当你施展一道戏法，其 **攻击检定失手**，或目标对抗你戏法的 **豁免成功** 时，它仍会受到 **一半伤害**（若有），但不会受到该戏法的其他效应影响。"
            },
            {
                level: 6,
                name: "法术塑形 (Sculpt Spells)",
                description: "你的塑能学派法术作用范围里可以保留一小部分相对安全的区域。当你施展一个会影响你可见的其他生物的塑能学派法术时，你能从中指定数量等同于 **1+该法术环阶** 的生物。被指定的生物进行对抗该法术的 **豁免时将直接成功**，且如果法术在豁免成功后仍然造成一半的伤害，这些生物 **不会承受任何伤害**。"
            },
            {
                level: 10,
                name: "强效塑能 (Empowered Evocation)",
                description: "当你施展一道法师法术列表里的塑能学派法术时，你能将你的 **智力调整值** 加入该法术的其中一次伤害掷骰中。"
            },
            {
                level: 14,
                name: "超限导能 (Overchannel)",
                description: "你能增强你法术的力量。当你用一个 **一至五环** 的法术位施展一个会造成伤害的法师法术时，你能在施展它的回合中令其 **造成的伤害取最大值**。\n你首次这么做时不会承受任何负面效应。但如果你在完成一次长休前再次使用该特性，则你会在施展法术后立即受到每环阶 **2d12暗蚀伤害**。该伤害无视任何抗性或免疫。\n你在完成一次长休前每多使用此特性一次，每环阶造成的伤害就提升 **1d12**。"
            }
        ]
    },
    {
        id: "wizard-illusion",
        name: "幻术学派",
        parentClass: "法师",
        source: "官方规则",
        description: "幻术学者\n强化幻术\n魅影召唤\n幻影分身\n亦真亦幻",
        fullDescription: "编织精妙的欺瞒法术\n\n你专精于能扰乱感官、迷惑心灵的魔法，而你创造的幻象足够以假乱真。",
        features: [
            {
                level: 3,
                name: "幻术学者 (Illusion Savant)",
                description: "从法师法术列表中选择两道不高于二环的幻术学派法术，并将其免费加入你的法术书中。\n此外，每当你在本职业中获得一个新环阶的法术位时，你都能免费将一道法师法术列表中的幻术学派法术加入你的法术书中。你所选的法术都必须是你当前拥有法术位的环阶。"
            },
            {
                level: 3,
                name: "强化幻术 (Improved Illusions)",
                description: "你施展幻术学派法术时 **无需言语成分**，且若你施展的幻术学派法术的施法距离不小于10尺，则其施法距离增加 **60尺**。\n你同时知晓 **次级幻象 Minor Illusion** 戏法。如果你已经知晓了此戏法，则你习得另一道你选择的法师戏法。此戏法不计入你的已知戏法数。当你施展 **次级幻象** 时，可以在一次施法中 **同时创造出声音和影像**，并且你能以一个 **附赠动作** 施展它。"
            },
            {
                level: 6,
                name: "魅影生灵 (Phantasmal Creatures)",
                description: "你总是准备了 **野兽召唤术 Summon Beast** 和 **妖精召唤术 Summon Fey**。你施展其中任意一道法术时，可以选择将其学派变为 **幻术学派**，这会使召唤出的生物变得虚幻。\n你可以不消耗法术位地施展这两道法术的幻术版本各 **一次**，但无需法术位地施展这两道法术会使其召唤出的生物只有 **一半生命值**。一旦你无需法术位地施展了其中任意一道法术，直至完成长休你都无法再以此法施展那道法术。"
            },
            {
                level: 10,
                name: "幻影化形 (Illusory Self)",
                description: "当一名生物对你进行的一次攻击检定命中时，你可以使用你的反应在攻击者与你之间插入幻象分身。这次攻击对你 **自动失手**，随后幻象分身消失。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗一个 **二环或更高环阶** 的法术位（无需动作）重置此特性的使用权。"
            },
            {
                level: 14,
                name: "亦真亦幻 (Illusory Reality)",
                description: "你习得借由将暗影魔法编入你的幻术，从而使其获得半真实效果的秘密。当你用法术位施展一道幻术学派法术时，你能选择一个属于幻象一部分的非活化非魔法物件，并让该物件化作真实。你可以在法术持续过程中在自己的回合以一个 **附赠动作** 这样做。该物件将在接下来 **1分钟** 内保持真实，它在此期间无法造成伤害或赋予任何状态。例如，你可以创造一座横跨峡谷的桥梁幻象，而后将之化作真实，使你的队友能从桥上跨越峡谷。"
            }
        ]
    }
];
