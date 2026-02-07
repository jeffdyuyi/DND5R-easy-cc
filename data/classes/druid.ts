import { ClassItem, SubclassItem } from '../../types';

export const DRUID_CLASS: ClassItem = {
    id: "druid-2024",
    name: "德鲁伊",
    source: "官方规则",
    description: "变身野兽\n自然之怒\n召唤千军\n元素操控\n环保卫士",
    fullDescription: "德鲁伊的古老结社号令着自然的伟力。德鲁伊们驱使着动物、植物和四大元素的魔法，他们治愈伤害，化身动物，和用元素降下毁灭。\n\n特立独行的德鲁伊视自然高于一切，他们的魔力源于自然本身、自然神祇或兼而有之。他们常会和其他德鲁伊一同举行仪式，这些仪式标志着四季的变换和其他自然的轮回。\n\n德鲁伊关心精妙的生态平衡——它维系了大量动植物的生命，也关心人们和自然和谐共处的需求。德鲁伊通常守卫着圣地或看守着一片未经玷污的自然区域，但当重大的危险出现时，德鲁伊们则会扮演更积极的角色，作为冒险者直面威胁。\n\n**施法 (Spellcasting)**\n• **戏法**: 你习得两个德鲁伊法术列表中的戏法。推荐选择 德鲁伊伎俩 和 燃火术。4级和10级时习得额外戏法。\n• **法术位**: 已消耗的法术位可在完成长休后恢复。\n• **准备法术**: 起始时，你从德鲁伊法术列表中选择并准备四个一环法术。推荐选择 化兽为友、疗伤术、妖火 和 雷鸣波。每当你结束一次长休时，你可以改变你的法术准备列表。\n• **施法属性**: 感知。\n• **施法法器**: 德鲁伊法器。\n\n**德鲁伊语 (Druidic)**\n你学会德鲁伊语，一门德鲁伊之间的秘密语言。在学会这门古老语言的同时，你也解锁了和动物交谈的魔法：你始终准备 动物交谈术 法术。\n\n**荒野形态 (Wild Shape)**\n大自然的魔力使你得以化形为一只野兽。你可以使用两次荒野形态。短休后恢复一次，长休后恢复全部。",
    hitDie: "d8",
    primaryAbility: "感知",
    saves: ["智力", "感知"],
    tags: ["变形", "施法者", "自然"],
    spellList: "德鲁伊",
    coreTraits: {
        primaryAbility: "感知",
        hitPointDie: "每德鲁伊等级 d8",
        savingThrows: "智力与感知",
        skillProficiencies: "选择2项：奥秘、驯兽、洞悉、医疗、自然、察觉、宗教或生存",
        weaponProficiencies: "简易武器",
        armorTraining: "轻甲和盾牌",
        startingEquipment: {
            optionA: "皮甲、盾牌、镰刀，德鲁伊法器（长棍），探索套组，草药工具，以及 9GP",
            optionB: "50 GP"
        }
    },
    subclassLevel: 3,
    classTable: {
        title: "德鲁伊特性 Druid Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "荒野变形", key: "wild_shape" },
            { header: "戏法", key: "cantrips" },
            { header: "准备法术", key: "prepared_spells" },
            { header: "一环", key: "slots_1" },
            { header: "二环", key: "slots_2" },
            { header: "三环", key: "slots_3" },
            { header: "四环", key: "slots_4" },
            { header: "五环", key: "slots_5" },
            { header: "六环", key: "slots_6" },
            { header: "七环", key: "slots_7" },
            { header: "八环", key: "slots_8" },
            { header: "九环", key: "slots_9" }
        ],
        rows: [
            { level: 1, pb: "+2", features: ["德鲁伊语", "原初誓约", "施法"], wild_shape: "—", cantrips: "2", prepared_spells: "4", slots_1: "2", slots_2: "—", slots_3: "—", slots_4: "—", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 2, pb: "+2", features: ["荒野变形", "荒野伙伴"], wild_shape: "2", cantrips: "2", prepared_spells: "5", slots_1: "3", slots_2: "—", slots_3: "—", slots_4: "—", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 3, pb: "+2", features: ["德鲁伊子职"], wild_shape: "2", cantrips: "2", prepared_spells: "6", slots_1: "4", slots_2: "2", slots_3: "—", slots_4: "—", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], wild_shape: "2", cantrips: "3", prepared_spells: "7", slots_1: "4", slots_2: "3", slots_3: "—", slots_4: "—", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 5, pb: "+3", features: ["荒野复苏"], wild_shape: "2", cantrips: "3", prepared_spells: "9", slots_1: "4", slots_2: "3", slots_3: "2", slots_4: "—", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 6, pb: "+3", features: ["子职特性"], wild_shape: "3", cantrips: "3", prepared_spells: "10", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "—", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 7, pb: "+3", features: ["元素之怒"], wild_shape: "3", cantrips: "3", prepared_spells: "11", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "1", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], wild_shape: "3", cantrips: "3", prepared_spells: "12", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "2", slots_5: "—", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 9, pb: "+4", features: ["—"], wild_shape: "3", cantrips: "3", prepared_spells: "14", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "1", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 10, pb: "+4", features: ["子职特性"], wild_shape: "3", cantrips: "4", prepared_spells: "15", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "—", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 11, pb: "+4", features: ["—"], wild_shape: "3", cantrips: "4", prepared_spells: "16", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], wild_shape: "3", cantrips: "4", prepared_spells: "16", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "—", slots_8: "—", slots_9: "—" },
            { level: 13, pb: "+5", features: ["—"], wild_shape: "3", cantrips: "4", prepared_spells: "17", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "1", slots_8: "—", slots_9: "—" },
            { level: 14, pb: "+5", features: ["子职特性"], wild_shape: "3", cantrips: "4", prepared_spells: "17", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "1", slots_8: "—", slots_9: "—" },
            { level: 15, pb: "+5", features: ["元素神威"], wild_shape: "3", cantrips: "4", prepared_spells: "18", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "1", slots_8: "1", slots_9: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], wild_shape: "3", cantrips: "4", prepared_spells: "18", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "1", slots_8: "1", slots_9: "—" },
            { level: 17, pb: "+6", features: ["—"], wild_shape: "4", cantrips: "4", prepared_spells: "19", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "2", slots_6: "1", slots_7: "1", slots_8: "1", slots_9: "1" },
            { level: 18, pb: "+6", features: ["兽形施法"], wild_shape: "4", cantrips: "4", prepared_spells: "20", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "3", slots_6: "1", slots_7: "1", slots_8: "1", slots_9: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], wild_shape: "4", cantrips: "4", prepared_spells: "21", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "3", slots_6: "2", slots_7: "1", slots_8: "1", slots_9: "1" },
            { level: 20, pb: "+6", features: ["大德鲁伊"], wild_shape: "4", cantrips: "4", prepared_spells: "22", slots_1: "4", slots_2: "3", slots_3: "3", slots_4: "3", slots_5: "3", slots_6: "2", slots_7: "2", slots_8: "1", slots_9: "1" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "施法 (Spellcasting)",
            description: "你通过研究自然的神秘伟力学会了如何施展法术。施法规则见第七章。下文将详述如何将这些规则应用于德鲁伊法术，德鲁伊法术详见本章后文职业描述中的德鲁伊法术列表。\n\n**戏法 Cantrips**。你知晓两道你选择的德鲁伊戏法。推荐选择 **德鲁伊伎俩 Druidcraft** 和 **燃火术 Produce Flame**。\n每当你获得一个德鲁伊等级时，你都能从你的戏法中选择其一替换为另一道你所选择的德鲁伊戏法。\n当你的德鲁伊等级到达4级和10级时，你都能另选一道德鲁伊戏法并习得，如德鲁伊特性表中戏法一列所示。\n\n**法术位 Spell Slots**。德鲁伊特性表显示了你可用于施展一环及以上法术的法术位数量。当你完成长休时，你重获所有已消耗的法术位。\n\n**一环及以上的准备法术 Prepared Spells of Level 1+**。你准备可供你以此特性施展的一环及更高环阶的法术列表。最初，选择四道德鲁伊法术。推荐选择 **化兽为友 Animal Friendship**、**疗伤术 Cure Wounds**、**妖火 Faerie Fire** 和 **雷鸣波 Thunderwave**。\n已准备法术数量会随你德鲁伊等级的提升而增加，如德鲁伊特性表中的准备法术一列所示。每当这一列的数字增加时，从德鲁伊法术列表中选择额外法术准备，直至已准备法术的数量与表格中的数字一致。你所选择法术的环阶必须是你所拥有法术位对应的环阶。例如，如果你是一名3级德鲁伊，则你的准备法术列表能包括六道一环或二环的德鲁伊法术，随意组合。\n如果德鲁伊的其他特性给了你始终准备着的法术，这些法术不计入你以此法准备的法术数量，但这些法术对你而言都视为德鲁伊法术。\n\n**改变你的准备法术 Changing Your Prepared Spells**。当你完成一次长休时，你可以将你准备列表上的一道或更多法术替换为其他德鲁伊法术，新替换的法术必须是你拥有法术位的法术。\n\n**施法属性 Spellcasting Ability**。你德鲁伊法术的施法属性是感知。\n\n**施法法器 Spellcasting Focus**。你可以使用德鲁伊法器作为你德鲁伊法术的施法法器。"
        },
        {
            level: 1,
            name: "德鲁伊语 (Druidic)",
            description: "你学会了德鲁伊语，一门德鲁伊之间的秘密语言。在学会这门古老语言的同时，你也解锁了和动物交谈的魔法：你始终准备着法术 **动物交谈 Speak With Animals**。\n你可以使用德鲁伊语来传递隐藏的信息。你和其他知晓这门语言的对象能够自动辨认出信息。其他人需要通过 DC 15 的智力（调查）检定才能意识到信息的存在，但不借助魔法则无法解读。",
            grants: {
                preparedSpells: ["动物交谈"]
            }
        },
        {
            level: 1,
            name: "原初职能 (Primal Order)",
            description: "你将自己投身于所选择的以下一项神圣的角色之中：\n\n**术师 Magician**。你从德鲁伊法术列表中额外学会一道戏法。此外，你与自然的神秘连接让你在智力（**奥秘**和**自然**）检定上获得加值。加值等于你的感知调整值（最低+1）。\n\n**卫士 Warden**。你为战斗做足训练，你获得军用武器熟练和中甲受训。"
        },
        {
            level: 2,
            name: "荒野变形 (Wild Shape)",
            description: "大自然的魔力使你得以化形为一只野兽。以一个附赠动作，你变形为一只你已经通过该特性学会的野兽形态（见下文“已知形态”）。你能保持该形态长达你德鲁伊等级一半的小时数，或者直到你再次使用荒野变形，陷入失能，或死亡。你也可以使用一个附赠动作提早结束荒野变形。\n\n**使用次数 Number of Uses**。你能够使用两次荒野变形。你在完成短休后重获一次已消耗的使用次数，当你完成一次长休时，你重获全部已消耗的使用次数。\n你到达特定的德鲁伊等级时会获得额外的使用次数，如德鲁伊特性表中荒野变形一栏所示。\n\n**已知形态 Known Forms**。你一开始掌握了该特性的四种形态，从最大挑战等级 1/4 且没有飞行速度的野兽（见附录B的生物数据卡）之中选取。推荐 **鼠 Rat**、**乘用马 Riding Horse**、**蜘蛛 Spider** 和 **狼 Wolf** 四种形态。每当你完成一次长休时，你可以将一种你掌握的形态换为另一种能够选用的形态。\n当你到达特定的德鲁伊等级时，你可以掌握新的形态，形态的最大挑战等级也会随之提升，如野兽形态表所示。此外，从 8 级起，你可以使用具有飞行速度的形态。\n当选择已知形态时，如果地下城主允许，你可以查阅《怪物图鉴》或其他来源并从中选择符合条件的野兽。\n\n**野兽形态 Beast Shapes**\n| 德鲁伊等级 | 已知形态 | 最大挑战等级 | 有飞行速度 |\n| :---: | :---: | :---: | :---: |\n| 2 | 4 | 1/4 | 不可 |\n| 4 | 6 | 1/2 | 不可 |\n| 8 | 8 | 1 | 可 |\n\n**变形时的规则 Rules While Shape-Shifted**。荒野变形期间，你保持你的人格、记忆和说话的能力，并遵循以下规则：\n\n**临时生命值 Temporary Hit Points**。当你使用荒野变形时，你获得等于你德鲁伊等级的临时生命值。\n\n**游戏数据 Game Statistics**。你的游戏数据被野兽的数据卡所替换，但你保留你的生物类型；生命值；生命骰；智力，感知和魅力值；职业特性；语言；专长。你同样保留你的技能和豁免熟练，并且在这些项目中使用你自己的熟练加值。如果变形的野兽在资料卡上的技能或豁免检定的调整值高于你的，使用资料卡的调整值。\n\n**不能施法 No Spellcasting**。你无法施展法术，但变形不会打断你的专注，也不会打断你已经施展了的法术。\n\n**物件 Object**。你持握物件的能力取决于形态下的肢体，而非你自己的。此外，你可以选择将你的装备丢在所处空间，或者将其融入新形态，又或者直接着装在身上。新形态直接着装的装备可以如常起作用，但 DM 有权基于新形态的体型和身姿作出判断，并最终决定新形态使用该装备是否合理。你的装备不会改变尺寸或形状来搭配新的形态，新形态无法着装某装备时，该装备会掉落到你所处的空间或融入新形态中。融入新形态的装备失去其效应。"
        },
        {
            level: 2,
            name: "荒野伙伴 (Wild Companion)",
            description: "你可以召唤出一个动物外形的自然精魂来帮助自己。以一个魔法动作，你可以消耗一个法术位或一次荒野变形次数来施展 **寻获魔宠 Find Familiar** 法术，无需任何材料成分。\n当你以这种方式施展这一法术时，获得的魔宠为妖精，并且它会在你完成一次长休时消失。",
            grants: {
                preparedSpells: ["寻获魔宠"]
            }
        },
        {
            level: 3,
            name: "德鲁伊子职 (Druid Subclass)",
            description: "你选择获得一项德鲁伊子职：大地结社、月亮结社、海洋结社或星辰结社。子职的内容见后文。子职是一种特化，在特定的德鲁伊等级给予你对应的独特能力。此后你将获得每一个你所选的子职的能力，只要其所需等级等于或低于你的德鲁伊等级。\n德鲁伊们会形成松散的联系，他们称之为“结社”。"
        },
        {
            level: 4,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如德鲁伊特性表所示，你还会在第 8，第 12，第 16 级时再次获得本特性。"
        },
        {
            level: 5,
            name: "荒野复苏 (Wild Resurgence)",
            description: "每个你的回合内一次，如果你没有荒野变形使用次数，你可以消耗一个法术位（无需动作）让自己获得一次荒野变形次数。\n此外，你可以消耗一次荒野变形使用次数（无需动作）来令自己获得一个一环法术位，然后直至完成长休你都无法再如此做。"
        },
        {
            level: 6,
            name: "子职特性 (Subclass Feature)",
            description: "获得你所选的德鲁伊子职 6 级特性。"
        },
        {
            level: 7,
            name: "元素之怒 (Elemental Fury)",
            description: "元素之力在你的身体里流淌。你获得以下一个你选择的特性：\n\n**强力施法 Potent Spellcasting**。你以任何德鲁伊戏法造成的伤害上都可以加上你的感知调整值。\n\n**原力蛮击 Primal Strike**。每个你的回合内一次，当你以一次武器攻击或荒野变形中野兽形态的攻击命中一名生物时，你可以对目标额外造成 1d8 寒冷、火焰、闪电或雷鸣伤害（由你命中时选择）。"
        },
        {
            level: 8,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如德鲁伊特性表所示，你还会在第 8，第 12，第 16 级时再次获得本特性。"
        },
        {
            level: 10,
            name: "子职特性 (Subclass Feature)",
            description: "获得你所选的德鲁伊子职 10 级特性。"
        },
        {
            level: 12,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如德鲁伊特性表所示，你还会在第 8，第 12，第 16 级时再次获得本特性。"
        },
        {
            level: 14,
            name: "子职特性 (Subclass Feature)",
            description: "获得你所选的德鲁伊子职 14 级特性。"
        },
        {
            level: 15,
            name: "元素狂怒 (Improved Elemental Fury)",
            description: "你选择的元素之怒特性变得愈发强大，如下所述：\n\n**强力施法 Potent Spellcasting**。当你施展一道施法距离为 10 尺或更高的德鲁伊戏法时，法术施法距离提升 300 尺。\n\n**原力蛮击 Primal Strike**。原力蛮击的额外伤害提升至 2d8。"
        },
        {
            level: 16,
            name: "属性值提升 (Ability Score Improvement)",
            description: "你获得属性值提升专长（见第五章）或其他你满足条件的专长。如德鲁伊特性表所示，你还会在第 8，第 12，第 16 级时再次获得本特性。"
        },
        {
            level: 18,
            name: "兽形施法 (Beast Spells)",
            description: "你可以在任何荒野变形下施法。当一个法术需要标有价值的材料成分或需要消耗材料成分时，你无法在荒野变形下施展。"
        },
        {
            level: 19,
            name: "传奇恩惠 (Epic Boon)",
            description: "你获得一项传奇恩惠专长（见第五章）或其他一项你选择的适用的专长。推荐选择 **次元旅行之恩惠**。"
        },
        {
            level: 20,
            name: "大德鲁伊 (Archdruid)",
            description: "自然的活力在你的身上永不凋零，令你获得以下增益：\n\n**不凋化形 Evergreen Wild Shape**。当你投掷先攻时，若你没有荒野变形的使用次数，你获得一次荒野变形使用次数。\n\n**自然术使 Nature Magician**。你可以将荒野变形使用次数转化为法术位（无需任何动作）。选择一定数量的你未使用的荒野变形使用次数，将它们转化为一个法术位，每个使用次数可以转为 2 个法术环阶。比如说，如果你转化两个荒野变形使用次数，你就可以创造出一个四环法术位。此增益一经使用，直至完成长休你都无法再次使用。\n\n**青春永驻 Longevity**。你行使的原力魔法让你的衰老速度减缓。每经过 10 年的岁月，你的身体就仿佛只过了 1 年。"
        }
    ]
};

export const DRUID_SUBCLASSES: SubclassItem[] = [
    {
        id: "druid-land",
        name: "大地结社",
        parentClass: "德鲁伊",
        source: "官方规则",
        description: "大地结社的德鲁伊是古老知识的守护者。",
        features: [
            {
                level: 3,
                name: "大地之援 (Land's Aid)",
                description: "以一个魔法动作，你可以消耗一次荒野变形使用次数，选择距你 60 尺内的一点。该点半径 10 尺球状区域内迸发出能量。\n该区域内每个你选择的生物必须进行一次体质豁免。失败受到 2d6 黯蚀伤害，成功减半。此外，区域内每个你选择的生物恢复 2d6 生命值。\n伤害和治疗量随等级提升：10级变为 3d6，14级变为 4d6。"
            },
            {
                level: 3,
                name: "结社法术 (Circle Spells)",
                description: "当你结束一次长休，选择一种地形：荒漠、极地、温带或热带。你将根据选择的地形获得始终准备的结社法术（见规则书列表）。\n• **荒漠**: 朦胧术, 燃烧之手, 火焰箭 (Lv3); 火球术 (Lv5); 枯萎术 (Lv7); 石墙术 (Lv9)\n• **极地**: 云雾术, 人类定身术, 冷冻射线 (Lv3); 雪雨暴 (Lv5); 冰风暴 (Lv7); 冰寒锥 (Lv9)\n• **温带**: 迷踪步, 电爪, 睡眠术 (Lv3); 闪电束 (Lv5); 行动自如 (Lv7); 树跃术 (Lv9)\n• **热带**: 酸液飞溅, 致病射线, 蛛网术 (Lv3); 臭云术 (Lv5); 变形术 (Lv7); 疫病虫群 (Lv9)"
            },
            {
                level: 6,
                name: "自然恢复 (Natural Recovery)",
                description: "你可以无需消耗法术位施展一个你以结社法术特性准备的 1 环及以上法术。长休恢复。\n此外，当你结束一次短休后，你可以选择恢复消耗的法术位。法术环阶的总和等于你德鲁伊职业等级的一半（向上取整），且不能是 6 环或更高环阶的法术位。长休恢复。"
            },
            {
                level: 10,
                name: "自然守御 (Natural Ward)",
                description: "你免疫中毒，并且你具有和你目前在结社法术特性中选择的土地相关的伤害类型的抗性：\n• 荒漠: 火焰\n• 极地: 寒冷\n• 温带: 闪电\n• 热带: 毒素"
            },
            {
                level: 14,
                name: "自然庇护 (Nature's Sanctuary)",
                description: "以一个魔法动作，你消耗一次荒野变形次数，在你 120 尺内的地面上制造出 15 尺立方的灵体丛林和藤蔓。持续 1 分钟。\n在该区域内，你和你的盟友获得半掩护，你的盟友还会获得你自然守御特性提供的伤害抗性。\n以一个附赠动作，你可以将立方区域在你的 120 尺内移动最多 60 尺距离。"
            }
        ]
    },
    {
        id: "druid-moon",
        name: "月亮结社",
        parentClass: "德鲁伊",
        source: "官方规则",
        description: "月亮结社的德鲁伊是荒野形态的大师。",
        features: [
            {
                level: 3,
                name: "结社形态 (Circle Forms)",
                description: "你学会了如何在使用荒野变形的同时引导月之魔力，增益自身的力量：\n• **挑战等级**: 你的荒野变形形态的最大挑战等级现在等于你德鲁伊等级的三分之一（向下取整）。\n• **护甲等级**: 当你化为荒野变形形态时，如果 13+你的感知调整值 高于野兽的护甲等级，你的护甲等级等于 13+你的感知调整值。\n• **临时生命值**: 获得等于德鲁伊等级的三倍数量的临时生命值。"
            },
            {
                level: 3,
                name: "结社法术 (Circle Spells)",
                description: "你自动获得始终准备的结社法术，并且你可以在荒野形态下施展这些法术：\n• Lv3: 疗伤术，月华之光，点点星芒\n• Lv5: 兽群咒唤术\n• Lv7: 月光涌泉\n• Lv9: 群体疗伤术"
            },
            {
                level: 6,
                name: "进阶结社形态 (Improved Circle Forms)",
                description: "• **月耀辉光**: 你在荒野变形形态下的每次攻击可以造成普通的伤害或光耀伤害。由你在每次攻击命中时选择。\n• **强化韧性**: 你将你的感知调整值加到你的体质豁免结果当中。"
            },
            {
                level: 10,
                name: "月光飞步 (Moonlight Step)",
                description: "以一个附赠动作，你传送最多 30 尺到一处你能看见的未被占据的空间，并且你在这个回合结束前进行的下一次攻击具有优势。\n使用次数等于感知调整值（至少1次），长休恢复。也可消耗2环或更高法术位恢复一次。"
            },
            {
                level: 14,
                name: "月辉形态 (Lunar Form)",
                description: "• **月耀炽光**: 一回合一次，你可以对一次荒野形态下的攻击命中的目标额外造成 2d10 光耀伤害。\n• **月辉同行**: 当你使用月光飞步时，你还能传送另一个自愿的生物。该生物必须在你的 10 尺内，并且你将它传送到你出现点的 10 尺内的一个你能看见的未被占据空间中。"
            }
        ]
    },
    {
        id: "druid-sea",
        name: "海洋结社",
        parentClass: "德鲁伊",
        source: "官方规则",
        description: "与海洋建立深刻联系。",
        features: [
            {
                level: 3,
                name: "结社法术 (Circle Spells)",
                description: "你自动获得始终准备的结社法术：\n• Lv3: 云雾术, 造风术, 冷冻射线\n• Lv5: 闪电束, 水下呼吸, 粉碎音, 雷鸣波\n• Lv7: 操控水体, 冰风暴\n• Lv9: 元素咒唤术, 怪物定身术"
            },
            {
                level: 3,
                name: "瀚海之怒 (Wrath of the Sea)",
                description: "以一个附赠动作，你可以消耗一次你的荒野变形次数来在自己周围显现出海浪形态的 5 尺灵光。灵光会持续存在 10 分钟。\n当你显现出灵光时，以及在之后的回合中以一个附赠动作，你可以选择另一个在你灵光范围内可以看见的生物。该生物必须成功通过一次体质豁免，否则受到寒冷伤害（d6数量等于感知调整值，最少1颗），如果该生物是大型或更小体型，它会被从你身边推离至多 15 尺距离。"
            },
            {
                level: 6,
                name: "水生亲和 (Aquatic Affinity)",
                description: "你的瀚海之怒创造的灵光范围提升到 10 尺。此外，你获得等同于你的速度的游泳速度。"
            },
            {
                level: 10,
                name: "风暴降生 (Stormborn)",
                description: "你的瀚海之怒特性在激活时获得两项额外增益：\n• **飞行**: 你获得等于你的速度的飞行速度。\n• **抗性**: 你获得对寒冷、闪电和雷鸣伤害的抗性。"
            },
            {
                level: 14,
                name: "大洋慨赠 (Oceanic Gift)",
                description: "当你使用瀚海之怒时，你可以让 60 尺内一个自愿生物而非你自己身上显现出灵光。该生物获得灵光的所有增益，并在特性中使用你的法术豁免 DC 和感知调整值。\n此外，如果你消耗两次而非一次荒野变形使用次数，你可以同时在你自己和另一个生物身上显现出灵光。"
            }
        ]
    },
    {
        id: "druid-stars",
        name: "星辰结社",
        parentClass: "德鲁伊",
        source: "官方规则",
        description: "观测星象，获得力量。",
        features: [
            {
                level: 3,
                name: "星图 (Star Map)",
                description: "你创造了一张星图作为法器（卷轴/石板/水晶等）。\n当你持握星图时，你总是准备着 神导术 和 光导箭。并且你可以无需消耗法术位施展光导箭，次数等于感知调整值（长休恢复）。"
            },
            {
                level: 3,
                name: "星耀形态 (Starry Form)",
                description: "以一个附赠动作，你可以消耗一次荒野形态次数呈现星耀形态（持续10分钟），发出光亮。变身时选择一个星座增益：\n• **射手座**: 附赠动作发动远程法术攻击（60尺），造成 1d8+感知 光耀伤害。\n• **圣杯座**: 施展治疗法术时，你或30尺内一生物额外恢复 1d8+感知 生命值。\n• **巨龙座**: 进行智力/感知检定或维持专注的体质豁免时，d20结果若为9或更低则视为10。"
            },
            {
                level: 6,
                name: "宇宙预兆 (Cosmic Omen)",
                description: "长休后掷骰决定吉兆（偶数）或凶兆（奇数）。\n• **吉兆**: 反应使30尺内生物攻击/检定/豁免 +d6。\n• **凶兆**: 反应使30尺内生物攻击/检定/豁免 -d6。\n次数等于感知调整值（长休恢复）。"
            },
            {
                level: 10,
                name: "闪烁星座 (Twinkling Constellations)",
                description: "星耀形态增强：射手座和圣杯座的 d8 变为 2d8。巨龙座获得 20 尺飞行速度并可悬浮。\n此外，每当你回合开始时，你可以更改当前身上闪耀的星座。"
            },
            {
                level: 14,
                name: "灿若繁星 (Full of Stars)",
                description: "当你处于星耀形态时，你的身体部分无实质化，获得对钝击、穿刺和挥砍伤害的抗性。"
            }
        ]
    }
];
