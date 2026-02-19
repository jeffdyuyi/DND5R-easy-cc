import { ClassItem, SubclassItem } from '../../types';

export const BARD_CLASS: ClassItem = {
    id: "bard-2024",
    name: "吟游诗人",
    source: "官方规则",
    description: "万金油\n全能辅助\n擅长社交\n魔法奥秘\n技能专家",
    fullDescription: "吟游诗人以音乐、舞蹈和诗歌唤起魔法，他们是鼓舞同伴、减轻伤痛、挫敌士气、创造幻象的专家。吟游诗人相信多元宇宙是因言语而化虚为实的，其创生圣言的残响依旧在各个存在位面之间回荡闪烁。诗人的魔法便是尝试利用那些超越任何语言的圣言。\n\n任何事物都可能成为创作新歌曲或是新故事的灵感，因此吟游诗人几乎沉浸于一切事物。他们在各个领域都钻研至深，无论是音乐表演、研习魔法还是单纯地找乐子。\n\n吟游诗人的生活与普通艺人没什么两样，充斥着旅行各地、收集传说、讲述故事然后靠着观众的打赏生活。但渊博的知识与对魔法的运用让吟游诗人与众不同。",
    hitDie: "d8",
    primaryAbility: "魅力",
    saves: ["敏捷", "魅力"],
    tags: ["辅助", "控制", "社交"],
    spellList: "吟游诗人", // 吟游诗人使用自己的法术列表
    coreTraits: {
        primaryAbility: "魅力",
        hitPointDie: "每吟游诗人等级 d8",
        savingThrows: "敏捷与魅力",
        skillProficiencies: "选择3项：任意技能",
        weaponProficiencies: "简易武器",
        armorTraining: "轻甲",
        startingEquipment: {
            optionA: "皮甲，匕首，两把简易武器，乐器，艺人套组，以及 18GP",
            optionB: "50 GP"
        }
    },
    subclassLevel: 3,
    classTable: {
        title: "吟游诗人特性 Bard Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "诗人骰", key: "bardic_die" },
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
            { level: 1, pb: "+2", features: ["吟游诗人激励", "施法"], bardic_die: "D6", cantrips: "2", prepared_spells: "4", spell_slots_1: "2", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 2, pb: "+2", features: ["专精", "万事通"], bardic_die: "D6", cantrips: "2", prepared_spells: "5", spell_slots_1: "2", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 3, pb: "+2", features: ["吟游诗人子职"], bardic_die: "D6", cantrips: "2", prepared_spells: "6", spell_slots_1: "3", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], bardic_die: "D6", cantrips: "3", prepared_spells: "7", spell_slots_1: "3", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 5, pb: "+3", features: ["激励之源"], bardic_die: "D8", cantrips: "3", prepared_spells: "9", spell_slots_1: "3", spell_slots_2: "2", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 6, pb: "+3", features: ["子职特性"], bardic_die: "D8", cantrips: "3", prepared_spells: "10", spell_slots_1: "3", spell_slots_2: "3", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 7, pb: "+3", features: ["反迷惑"], bardic_die: "D8", cantrips: "3", prepared_spells: "11", spell_slots_1: "3", spell_slots_2: "3", spell_slots_3: "1", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], bardic_die: "D8", cantrips: "3", prepared_spells: "12", spell_slots_1: "3", spell_slots_2: "3", spell_slots_3: "2", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 9, pb: "+4", features: ["专精"], bardic_die: "D8", cantrips: "3", prepared_spells: "14", spell_slots_1: "3", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 10, pb: "+4", features: ["魔法奥秘"], bardic_die: "D10", cantrips: "4", prepared_spells: "15", spell_slots_1: "3", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "1", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 11, pb: "+4", features: ["—"], bardic_die: "D10", cantrips: "4", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], bardic_die: "D10", cantrips: "4", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 13, pb: "+5", features: ["—"], bardic_die: "D10", cantrips: "4", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 14, pb: "+5", features: ["子职特性"], bardic_die: "D10", cantrips: "4", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 15, pb: "+5", features: ["—"], bardic_die: "D12", cantrips: "4", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], bardic_die: "D12", cantrips: "4", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 17, pb: "+6", features: ["—"], bardic_die: "D12", cantrips: "4", prepared_spells: "19", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 18, pb: "+6", features: ["先发激励"], bardic_die: "D12", cantrips: "4", prepared_spells: "20", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], bardic_die: "D12", cantrips: "4", prepared_spells: "21", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 20, pb: "+6", features: ["创生圣言"], bardic_die: "D12", cantrips: "4", prepared_spells: "22", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "2", spell_slots_8: "1", spell_slots_9: "1" }
        ]
    },
    subclasses: [],
    features: [
        {
            level: 1,
            name: "施法 (Spellcasting)",
            description: "你从吟游艺术中学会了如何施展法术。施法规则见第七章。下文将详述如何将这些规则应用于吟游诗人法术，吟游诗人法术详见本章后文职业描述中的吟游诗人法术列表。\n\n**戏法 Cantrips**。你知晓两道你选择的吟游诗人戏法。推荐选择舞光术 Dancing Light 和恶言相加 Vicious Mockery。\n每当你获得一个吟游诗人等级时，你都能从你的戏法中选择其一替换为另一道你所选择的吟游诗人戏法。\n当你的吟游诗人等级到达4级和10级时，你都能另选一道吟游诗人戏法并习得，如吟游诗人特性表中戏法一列所示。\n\n**法术位 Spell Slots**。吟游诗人特性表显示了你可用于施展一环及以上法术的法术位数量。当你完成长休时，你重获所有已消耗的法术位。\n\n**一环及以上的准备法术 Prepared Spells of Level 1+**。你准备可供你以此特性施展的一环及更高环阶的法术列表。最初，选择四道吟游诗人法术。推荐选择魅惑类人 Charm Person，七彩喷射 Color Spray，不谐低语 Dissonant Whispers 和治愈真言 Healing Word。\n已准备法术数量会随你吟游诗人等级的提升而增加，如吟游诗人特性表中的准备法术一列所示。每当这一列的数字增加时，从吟游诗人法术列表中选择额外法术准备，直至已准备法术的数量与表格中的数字一致。你所选择法术的环阶必须是你所拥有法术位对应的环阶。例如，如果你是一名3级吟游诗人，则你的准备法术列表能包括六道一环或二环的吟游诗人法术，随意组合。\n如果吟游诗人的其他特性给了你始终准备着的法术，这些法术不计入你以此法准备的法术数量，但这些法术对你而言都视为吟游诗人法术。\n\n**改变你的准备法术 Changing Your Prepared Spells**。每当你获得一个吟游诗人等级时，你就可以将你准备列表上的一道法术替换为另一道吟游诗人法术，新替换的法术必须是你拥有法术位的法术。\n\n**施法属性 Spellcasting Ability**。你吟游诗人法术的施法属性是魅力。\n\n**施法法器 Spellcasting Focus**。你可以使用乐器作为你吟游诗人法术的施法法器。"
        },
        {
            level: 1,
            name: "吟游诗人激励 (Bardic Inspiration)",
            description: "你可以用语言，音乐或舞蹈的形式对他人进行超自然的激励。这种激励的表现形式为数颗D6骰，这些骰子被称为诗人激励骰。\n\n**使用诗人激励 Using Bardic Inspiration**。以一个附赠动作，你可以激励位于你60尺内的另一名能听见或看见你的生物。那名生物获得一枚你的诗人激励骰。一个生物同一时间只能拥有一枚诗人激励骰。在接下来的1小时内，当那名生物在一次D20检定中失败时，那名生物可以投掷诗人激励骰并将掷骰结果附加到该次d20中，这可能将失败变为成功。诗人激励骰将在投掷时已消耗。\n\n**使用次数 Number of Uses**。你可以授予诗人激励骰的次数等于你的魅力调整值（最少1次），当你完成长休时，你重获所有已消耗的使用次数。\n\n**更高等级 At Higher Levels**。你的诗人激励骰会在你到达特定吟游诗人等级时改变，如吟游诗人特性表中的诗人骰所示。你的诗人骰会在5级时变为d8，在10级时变为d10，在15级时变为d12。"
        },
        {
            level: 2,
            name: "专精 (Expertise)",
            description: "你获得两项由你选择的你熟练技能的专精（见术语汇编）。如果你具有表演和游说的熟练，推荐选择这两项。\n当你的吟游诗人等级到达9级时，你再额外获得两项由你选择的你熟练技能的专精。"
        },
        {
            level: 2,
            name: "万事通 (Jack of All Trades)",
            description: "若你进行的任意属性检定可以使用技能熟练但你不具备其熟练，且你也无法通过其他方式在该属性检定中应用熟练加值，你可以将你熟练加值的一半（向下取整）添加到该属性检定中。\n例如，如果你要进行力量（运动）检定，且不具有运动熟练，则你可以将熟练加值的一半添加到检定中。"
        },
        {
            level: 3,
            name: "吟游诗人子职 (Bard Subclass)",
            description: "你选择获得一项吟游诗人子职：舞蹈学院，魅心学院，逸闻学院或勇气学院。子职的内容见后文。子职是一种特化，在特定的吟游诗人等级给予你对应的独特能力。此后你将获得你所选的子职所有能力——只要其所需等级不超过你的吟游诗人等级。吟游诗人特性表列出了你从子职中获得新特性的吟游诗人等级。\n\n吟游诗人们会形成被称为\\\"学院\\\"的松散联系，用以维持他们的传承。"
        },
        {
            level: 4,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 5,
            name: "激励之源 (Font of Inspiration)",
            description: "现在，当你完成一次短休或长休时，你重获所有已消耗的诗人激励使用次数。\n此外，你可以消耗一个法术位（无需动作）来重获一次已消耗的诗人激励使用次数。"
        },
        {
            level: 6,
            name: "吟游诗人子职特性",
            description: "获得你所选的吟游诗人子职 6 级特性。"
        },
        {
            level: 7,
            name: "反迷惑 (Countercharm)",
            description: "你可以用带有力量的音符或话语来干扰影响心灵的效应。若你或位于你30尺内的一名生物在对抗施加魅惑或恐慌状态的效应的豁免检定中失败，你能够以反应令其重骰这次豁免，这次重骰具有优势。"
        },
        {
            level: 8,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 9,
            name: "专精 (Expertise)",
            description: "你额外再获得两项由你选择的你已熟练的技能的专精。"
        },
        {
            level: 10,
            name: "魔法奥秘 (Magical Secrets)",
            description: "你自各种魔法传说中习得了他们的奥秘。每当你到达一个吟游诗人特性表中准备法术数量有所增加的吟游诗人等级时（包括此等级），你可以从吟游诗人、牧师、德鲁伊和法师的法术列表中选择法术准备（这些职业的法术列表见其职业章节），这些法术对你而言都视作吟游诗人法术。此外，每当你替换本职业的准备法术时，你也可以从这些法术列表中选择替换。"
        },
        {
            level: 12,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 14,
            name: "吟游诗人子职特性",
            description: "获得你所选的吟游诗人子职 14 级特性。"
        },
        {
            level: 16,
            name: "属性值提升",
            description: "你获得属性值提升专长或其它你满足条件的专长。"
        },
        {
            level: 18,
            name: "先发激励 (Superior Inspiration)",
            description: "当你投掷先攻时，若你的诗人激励使用次数不足两次，你重获已消耗的诗人激励使用次数到两次为止。"
        },
        {
            level: 19,
            name: "传奇恩惠",
            description: "你获得一项传奇恩惠专长（见第五章）或其他一项你选择的适用的专长。推荐选择法术溯回之恩惠。"
        },
        {
            level: 20,
            name: "创生圣言 (Words of Creation)",
            description: "你掌握了创生圣言的其中两字：\"生\"与\"死\"。因此，你总是准备了法术律令医疗 Power Word Heal 和律令死亡 Power Word Kill。当你施展这两道法术时，你可以选择第二个生物作为目标，那名生物必须位于第一个目标10尺内。"
        }
    ]
};

export const BARD_SUBCLASSES: SubclassItem[] = [
    {
        id: "bard-dance",
        name: "舞蹈学院",
        parentClass: "吟游诗人",
        source: "官方规则",
        description: "灵动舞步\n闪避反击\n提升速度\n鼓舞队友\n徒手打击",
        fullDescription: "舞蹈学院的吟游诗人们明白，创生圣言不在演讲或歌唱之中，圣言自天体运动中发出，经芥子虫蠕而流淌。舞蹈学院的诗人们练习同旋转的宇宙谐频共振的手段，他们注重灵巧、速度却又不失优雅。",
        features: [
            {
                level: 3,
                name: "炫目舞步 (Dazzling Footwork)",
                description: "未着装护甲且未持用盾牌期间，你获得以下增益：\n\n**大舞蹈家 Dance Virtuoso**。你进行的任何有关舞蹈的魅力（表演）检定均具有优势。\n\n**无甲防御 Unarmored Defense**。你的基础护甲等级等于10＋你的敏捷调整值＋你的魅力调整值。\n\n**灵巧打击 Agile Strikes**。当你在一次动作、附赠动作或反应中消耗了诗人激励使用次数时，作为该动作、附赠动作或反应的一部分，你可以发动一次徒手打击。\n\n**诗人痛击 Bardic Damage**。你可以用敏捷代替力量进行徒手打击的攻击检定。当你以一次徒手打击造成伤害时，你可以造成等于诗人激励骰+敏捷调整值的钝击伤害，而非徒手打击原本的伤害。此效果并不会消耗你的诗人激励使用次数。"
            },
            {
                level: 6,
                name: "鼓舞之移 (Inspiring Movement)",
                description: "当一名你可见的敌人位于你5尺内结束它的回合时，你能够以反应消耗一次诗人激励使用次数，移动至多等于你速度一半的距离。此时，位于你30尺内的一名盟友（由你选择）也可以使用他的反应来移动至多等于他速度一半的距离。\n此特性进行的移动不会引发借机攻击。"
            },
            {
                level: 6,
                name: "协同舞步 (Tandem Footwork)",
                description: "当你投掷先攻时，若你未陷入失能状态，你可以消耗一次诗人激励使用次数，投掷诗人激励骰，令你与位于你30尺内的每个能听见或看见你的盟友进行的先攻检定获得等于该骰值的加值。"
            },
            {
                level: 14,
                name: "引导闪避 (Leading Evasion)",
                description: "当你受到一个允许你进行敏捷豁免来只承受一半伤害的效应影响时，你在豁免成功时不受伤害，豁免失败时只承受一半伤害。若位于你5尺内的其他生物同样需要进行这次敏捷豁免，你可以令他们也享受到此特性的增益。\n若你陷入失能状态，你无法使用此特性。"
            }
        ]
    },
    {
        id: "bard-glamour",
        name: "魅心学院",
        parentClass: "吟游诗人",
        source: "官方规则",
        description: "迷人容貌\n魅惑众生\n控制战场\n号令随从\n不可侵犯",
        fullDescription: "魅心学院的起源要追溯到妖精荒野中的惑心魔法。研究这些魔法的吟游诗人们将美好与恐怖化作丝线，编织到他们的歌曲和故事之中，此中大师甚至能够披上超凡脱俗的威仪。他们的表演将调动人们对被淡忘的纯真的渴望，唤醒人们潜意识中长存的恐惧，牵扯出最铁石心肠的听众的情绪。",
        features: [
            {
                level: 3,
                name: "惑心魔法 (Beguiling Magic)",
                description: "你始终准备着法术魅惑类人Charm Person和镜影术Mirror Image。\n此外，在你使用法术位施展一道惑控或幻术学派的法术后，你可以立即使一名位于你60尺内的你可见的生物进行一次感知豁免检定，对抗你的施法DC。豁免失败则目标陷入魅惑或恐慌状态（由你选择），持续1分钟。目标在其每个回合结束时，可以重新进行该豁免，成功则其身上的效应提前结束。\n此增益一经使用，直至完成长休你都无法再次使用。你也可以消耗一次诗人激励使用次数（无需动作）重置此增益的使用权。"
            },
            {
                level: 3,
                name: "灵感织衣 (Mantle of Inspiration)",
                description: "你可以将妖精魔法织入歌曲亦或是舞蹈，为他人献上满满的活力。以一个附赠动作，你可以消耗一次诗人激励使用次数，并掷诗人激励骰，从位于你60尺内的其他生物中选择任意生物，数量至多等于你魅力调整值（至少选择一名），每个被选中的生物获得等于两倍该诗人骰骰值的临时生命值，然后每名生物均可以使用自己的反应立即移动至多等于自己速度的距离，这次移动不会引发借机攻击。"
            },
            {
                level: 6,
                name: "威仪作锦 (Mantle of Majesty)",
                description: "你始终准备着法术命令术Command。\n以一个附赠动作，你无需法术位地施展命令术，然后你将获得超凡脱俗的容貌，持续1分钟或在你专注终止时提前结束。在此期间，你能够以一个附赠动作，无需法术位地施展法术命令术。\n任何因你而陷入魅惑状态的生物在进行对抗你以此特性施展的命令术时，其豁免检定自动失败。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗一个三环及以上的法术位（无需动作）来重置此特性的使用权。"
            },
            {
                level: 14,
                name: "不破威仪 (Unbreakable Majesty)",
                description: "以一个附赠动作，你可以魔法性地呈现出庄严的姿态，持续1分钟或在你陷入失能状态时结束。在此期间，任何生物在一个回合中的攻击检定首次命中你时，攻击者必须通过一次对抗你施法DC的魅力豁免检定，否则这次攻击将因畏惧你的威仪而变得畏缩并失手。\n一旦你呈现出这庄严的姿态，直至完成短休或长休你都无法再如此做。"
            }
        ]
    },
    {
        id: "bard-lore",
        name: "逸闻学院",
        parentClass: "吟游诗人",
        source: "官方规则",
        description: "学识渊博\n魔法奥秘\n切语阻碍\n额外技能\n全能辅助",
        fullDescription: "逸闻学院的吟游诗人从各种渠道——例如奥术著作、神秘仪式甚至乡野故事——收集咒语和秘密。他们聚集在图书馆或是学府之中，分享彼此之间获取的知识。他们也会出席国家事务或是参加节日活动，揭露腐败、拆穿谎言、对自以为是的权威者发起嘲笑。",
        features: [
            {
                level: 3,
                name: "附赠熟练 (Bonus Proficiencies)",
                description: "你获得三项由你选择的技能的熟练。",
                grants: {
                    skillProficiencies: ["选择3项技能"]
                }
            },
            {
                level: 3,
                name: "语出惊人 (Cutting Words)",
                description: "你学会了如何运用你的妙语连珠来超自然地打断敌人、分散注意亦或是削弱他人的自信心和行动力。当一名你可见的位于你60尺内的生物进行伤害掷骰、成功于一次属性检定或攻击检定时，你能够以反应消耗一次诗人激励使用次数，并掷诗人激励骰，然后从该生物的掷骰结果中减去诗人骰的骰值，这将降低其造成的伤害或可能使这次检定的成功变为失败。"
            },
            {
                level: 6,
                name: "魔法探秘 (Magical Discoveries)",
                description: "你习得两道自选法术。这些法术可以从牧师、德鲁伊或法师的法术列表中单独或组合选择（这些职业的法术列表见其职业章节）。你选择的法术必须是戏法或是你拥有对应环阶法术位的法术，你拥有的法术位如吟游诗人特性表中所示。\n你始终准备着你选择的这些法术。每当你获得一个吟游诗人等级时，你可以将其中一个法术替换为另一个满足上述要求的法术。"
            },
            {
                level: 14,
                name: "超凡技艺 (Peerless Skill)",
                description: "当你进行一次属性检定或攻击检定并在检定中失败时，你可以消耗一次诗人激励使用次数，投掷诗人激励骰，并将掷骰结果加到d20中，这可能使这次检定的失败变为成功。若检定仍然失败，将不会被消耗诗人激励次数。"
            }
        ]
    },
    {
        id: "bard-valor",
        name: "勇气学院",
        parentClass: "吟游诗人",
        source: "官方规则",
        description: "战斗吟游\n护甲熟练\n鼓舞打击\n多重攻击\n战地指挥",
        fullDescription: "勇气学院的吟游诗人是无畏的故事讲述者，他们的故事承载了过往伟大英雄的记忆。这些吟游诗人在穹顶之下或在篝火之侧为人群之间歌唱豪杰的功绩。他们四处旅行，亲眼见证史诗的发生，确保对其的记忆不因岁月而流逝。他们用歌曲激励新一代人勇攀高峰，达到与古老英雄同样的高度。",
        features: [
            {
                level: 3,
                name: "战斗激励 (Combat Inspiration)",
                description: "你可以运用你的巧言来改变战斗的走向。一名拥有你的诗人激励骰的生物可以从下列选项中选择一种效应来使用诗人骰。\n\n**防御 Defense**。当这名生物被一次攻击检定命中时，该生物能够以反应掷诗人激励骰并将骰值加到对抗这次攻击检定的AC中，这可能使这次攻击变为失手。\n\n**进攻 Offense**。这名生物以一次攻击检定命中一名目标后，它可以立即投掷诗人激励骰，并将骰值加到这次攻击对这名目标造成的伤害中。"
            },
            {
                level: 3,
                name: "战争训练 (Martial Training)",
                description: "你获得军用武器熟练以及中甲和盾牌的护甲受训。\n此外，你施展你的吟游诗人法术列表中的法术时，可以使用简易或军用武器作为法器。",
                grants: {
                    weaponProficiencies: ["军用武器"],
                    armorProficiencies: ["中甲", "盾牌"]
                }
            },
            {
                level: 6,
                name: "额外攻击 (Extra Attack)",
                description: "当你在自己的回合执行攻击动作时，你可以发动两次攻击而非一次。此外，你可以将额外攻击中的一次，替换为施展一道施法时间为一动作的戏法。"
            },
            {
                level: 14,
                name: "战斗魔法 (Battle Magic)",
                description: "在你施展一道施法时间为一动作的法术后，你能够以一个附赠动作，使用一把武器发动一次攻击。"
            }
        ]
    }
];
