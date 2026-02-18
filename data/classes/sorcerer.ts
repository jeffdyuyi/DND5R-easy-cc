import { ClassItem, SubclassItem } from '../../types';

export const SORCERER_CLASS: ClassItem = {
    id: "sorcerer-2024",
    name: "术士",
    source: "官方规则",
    description: "法术机关枪\n魅力施法\n超魔构筑\n天生施法者\n需要长休",
    fullDescription: "术士操纵着已经深深刻入他们存在之中的天生法术。一些术士不知道自己力量的起源，另一些则将自己的力量与家族或个人遇到的奇异事件关联起来。巨龙的恩赐，婴儿出生时在场的树精，抑或晴空万里时被闪电劈中，都可能激活术士的天赋。神祇的赠礼，暴露于其他位面的奇异魔法之下，或是朝着现实原理的一瞥，亦可使术士成为术士。无论术士的起源如何，它都会在术士身上留下不可磨灭的印记——一股可传承千秋万代的汹涌魔力。\n\n术士不学习魔法，翻腾的原始魔力是他们与生俱来的一部分。术士需要掌握的必要能力就是学习如何掌控和引导自己的天生魔法，使其有机会发现全新而令人惊异的魔力放出方式。随着术士逐渐精于控制他们的天生魔法，他们自身也与其本源更加协调，发展出与其力量之源相称的独特威能。\n\n术士非常稀少。一些家族每一代只会出现正好一名术士，但更多时候，术法之才的现世只是偶然。拥有此种魔力的人会很快发现它一点都不安稳——术士的魔法在渴求着释放。",
    hitDie: "d6",
    primaryAbility: "魅力",
    saves: ["体制", "魅力"],
    tags: ["施法者", "输出", "社交"],
    spellList: "术士",
    coreTraits: {
        primaryAbility: "魅力",
        hitPointDie: "每术士等级 d6",
        savingThrows: "体质和魅力",
        skillProficiencies: "选择2项：奥秘、欺瞒、洞悉、威吓、说服、宗教",
        weaponProficiencies: "简易武器",
        armorTraining: "无",
        startingEquipment: {
            optionA: "长矛，2 匕首，奥术法器（水晶），探索套组，以及 28GP",
            optionB: "50 GP"
        }
    },
    subclassLevel: 3,
    classTable: {
        title: "术士特性 Sorcerer Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "术法点", key: "sorcery_points" },
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
            { level: 1, pb: "+2", features: ["施法", "先天术法"], sorcery_points: "—", cantrips: "4", prepared_spells: "2", spell_slots_1: "2", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 2, pb: "+2", features: ["魔力泉涌", "超魔法"], sorcery_points: "2", cantrips: "4", prepared_spells: "4", spell_slots_1: "3", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 3, pb: "+2", features: ["术士子职"], sorcery_points: "3", cantrips: "4", prepared_spells: "6", spell_slots_1: "4", spell_slots_2: "2", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], sorcery_points: "4", cantrips: "5", prepared_spells: "7", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 5, pb: "+3", features: ["术法复苏"], sorcery_points: "5", cantrips: "5", prepared_spells: "9", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "2", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 6, pb: "+3", features: ["子职特性"], sorcery_points: "6", cantrips: "5", prepared_spells: "10", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 7, pb: "+3", features: ["术法化身"], sorcery_points: "7", cantrips: "5", prepared_spells: "11", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "1", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], sorcery_points: "8", cantrips: "5", prepared_spells: "12", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "2", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 9, pb: "+4", features: ["—"], sorcery_points: "9", cantrips: "5", prepared_spells: "14", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "1", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 10, pb: "+4", features: ["超魔法"], sorcery_points: "10", cantrips: "6", prepared_spells: "15", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 11, pb: "+4", features: ["—"], sorcery_points: "11", cantrips: "6", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], sorcery_points: "12", cantrips: "6", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 13, pb: "+5", features: ["—"], sorcery_points: "13", cantrips: "6", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 14, pb: "+5", features: ["子职特性"], sorcery_points: "14", cantrips: "6", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 15, pb: "+5", features: ["—"], sorcery_points: "15", cantrips: "6", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], sorcery_points: "16", cantrips: "6", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 17, pb: "+6", features: ["超魔法"], sorcery_points: "17", cantrips: "6", prepared_spells: "19", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 18, pb: "+6", features: ["子职特性"], sorcery_points: "18", cantrips: "6", prepared_spells: "20", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], sorcery_points: "19", cantrips: "6", prepared_spells: "21", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 20, pb: "+6", features: ["奥术登神"], sorcery_points: "20", cantrips: "6", prepared_spells: "22", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "2", spell_slots_8: "1", spell_slots_9: "1" }
        ]
    },
    subclasses: [],
    features: [
        { level: 1, name: "施法 (Spellcasting)", description: "你从你的天生魔法汲取魔力用于施展法术。参见第七章有关施法的规则。下述信息将详述如何将这些规则应用于术士法术，术士法术详见本章后文职业描述中的术士法表。\n\n**戏法 Cantrips**\n你知晓四道你选择的术士戏法。推荐选择**光亮术 Light**、**魔法伎俩 Prestidigitation**、**电爪 Shocking Grasp**和**术法爆发 Sorcerous Burst**。每当你获得一个术士等级时，你都能将通过此特性知晓的其中一个戏法替换为另一个你所选择的术士戏法。\n当你的术士等级达到4级和10级时，你都能另选一道术士戏法并习得，如术士特性表中戏法一列所示。\n\n**法术位 Spell Slots**\n术士特性表显示了你可用于施展一环及以上法术的法术位数量。当你完成长休时，你重获所有已消耗的法术位。\n\n**一环及以上的准备法术 Prepared Spells of Level 1+**\n你准备可供你以此特性施展的一环及更高环阶的法术列表。最初，选择两道术士法术。推荐选择**燃烧之手 Burning Hands**和**侦测魔法 Detect Magic**。\n已准备法术数量会随你术士等级的提升而增加，如术士特性表中的准备法术一列所示。每当这一列的数字增加时，从术士法术列表中选择额外法术准备，直至已准备法术的数量与表格中的数字一致。你所选择法术的环阶必须是你所拥有法术位对应的环阶。例如，如果你是一位3级术士，则你的准备法术列表能包括六道一环或二环的术士法术，随意组合。\n如果术士的其他特性给了你始终准备着的法术，这些法术不计入你以此法准备的法术数量，但这些法术对你而言都视为术士法术。\n\n**改变你的准备法术 Changing Your Prepared Spells**\n每当你获得一个术士等级时，你就可以将你准备列表上的一道法术替换为另一道术士法术，你必须拥有替换后法术对应环阶的法术位才可以替换。\n\n**施法属性 Spellcasting Ability**\n你术士法术的施法属性是魅力。\n\n**施法法器 Spellcasting Focus**\n你可以使用奥术法器作为你术士法术的施法法器。" },
        { level: 1, name: "先天术法 (Innate Sorcery)", description: "你过去经历的某件事在你身上留下了不可磨灭的印记，为你注入了难以控制的涌动魔力。以一个附赠动作，你可以将魔力释放而出，持续1分钟。在这1分钟期间，你获得以下增益：\n\n- 你的术士法术豁免DC+1。\n- 你在你施展的术士法术的攻击检定中具有优势。\n\n你可以使用此特性两次，你在完成一次长休时重获所有已消耗的使用次数。" },
        { level: 2, name: "魔力泉涌 (Font of Magic)", description: "你汲取体内的魔力之源，从中涌现的魔力体现为你的可用术法点。你可以使用术法点创造各种魔法效应。\n你拥有2点术法点，你在到达更高等级时获得更多术法点，如同术士特性表中术法点一栏所示。你无法拥有比表格中对应数量更多的术法点。你在完成一次长休后重获所有已消耗的术法点。\n你可以消耗你的术法点来使用以下特性，例如超魔法。\n\n**法术位转化为术法点 Converting Spell Slots to Sorcery Points**\n你可以消耗一个法术位来获得等同于其环位的术法点（无需动作）。\n\n**创造法术位 Creating Spell Slots**\n以一个附赠动作，你可以将未消耗的术法点转化为一个法术位。创造法术位表格中展示了创造法术位所需的术法点以及创造它所需的最小术士等级。你无法创造高于五环的法术位。\n你以此特性创造的任何法术位都在完成一次长休时消失。\n\n**创造法术位 Creating Spell Slots**\n\n| 法术位环阶 | 术法点消耗 | 最小术士等级 |\n|---|---|---|\n| 一环 | 2 | 2 |\n| 二环 | 3 | 3 |\n| 三环 | 5 | 5 |\n| 四环 | 6 | 7 |\n| 五环 | 7 | 9 |" },
        {
            level: 2,
            name: "超魔法 (Metamagic)",
            description: "由于你的魔法直接从你体内流向外界，你可以修改你的法术来适应自己的需要。你从超魔法选项中选择并获得2个你所选的超魔法选项。你使用你所选的超魔法来临时改变你施展的法术。要使用一个超魔法选项，你必须消耗等同于其描述中需求的术法点。\n当你施展一道法术时，你只能在其上应用一次超魔法选项，除非超魔法选项中另有说明。\n每当你获得一级术士等级时，你可以将一个超魔法选项更改为另一个超魔法选项。当你到达10级和17级术士等级时，你可以分别再获得2个超魔法选项。",
            grants: {
                featureOptions: [
                    {
                        name: "谨慎法术 (Careful Spell)",
                        description: "消耗：1术法点\n当你施展一个强迫其他生物进行豁免的法术时，你可以保护某些生物免受法术的危害。你消耗1术法点并选择最多等同于你魅力调整值数量的生物（至少1个）。被选择的生物自动通过法术的豁免检定。如果法术在豁免成功后仍然造成半伤，这些生物不会承受任何伤害。"
                    },
                    {
                        name: "远程法术 (Distant Spell)",
                        description: "消耗：1术法点\n当你施展一个射程至少为5尺的法术时，你可以消耗1术法点来将法术的射程翻倍。\n当你施展一个射程为触碰的法术时，你可以消耗1术法点来将法术的射程改为30尺。"
                    },
                    {
                        name: "强效法术 (Empowered Spell)",
                        description: "消耗：1术法点\n当你为一个法术进行伤害掷骰时，你可以消耗1术法点来重掷最多等同于你魅力调整值数量的伤害骰（至少一个），你必须使用新的结果。\n即使你已经在一道法术上使用了其他超魔，你仍然可以使用强效法术。"
                    },
                    {
                        name: "延效法术 (Extended Spell)",
                        description: "消耗：1术法点\n当你施展一个持续时间为1分钟或更长的法术时，你可以消耗1术法点使其持续时间翻倍，最多变为24小时。\n如果被你延效的法术需要专注，你在为维持此法术专注所做的豁免上具有优势。"
                    },
                    {
                        name: "升阶法术 (Heightened Spell)",
                        description: "消耗：2术法点\n当你施展一道迫使生物进行豁免的法术时，你可以消耗2术法点来使法术影响的某一名生物对此法术的豁免具有劣势。"
                    },
                    {
                        name: "瞬发法术 (Quickened Spell)",
                        description: "消耗：2术法点\n当你施展一个施法时间为动作的法术时，你可以消耗2术法点来将其施法时间改为附赠动作。如果你已经在同一回合内施展了一个一环或更高环的法术，你不能进行瞬发法术，并且你在使用瞬发法术后也不能在同一回合内施展一环或更高环的法术。"
                    },
                    {
                        name: "追踪法术 (Seeking Spell)",
                        description: "消耗：1术法点\n当你为一道法术进行一次攻击检定并未命中时，你可以使用1术法点重骰那个d20。你必须使用重骰的结果。\n即使你已经在一道法术上使用了其他超魔，你仍然可以使用追踪法术。"
                    },
                    {
                        name: "精妙法术 (Subtle Spell)",
                        description: "消耗：1术法点\n当你施展一道法术时，你可以消耗1术法点令该法术不再具有言语、姿势和材料成分（那些在法术中写明会被消耗或有具体价值的材料成分除外）。"
                    },
                    {
                        name: "转化法术 (Transmuted Spell)",
                        description: "消耗：1术法点\n当你施展一道造成以下伤害类型的法术时，你可以消耗1术法点将其伤害类型变成以下伤害类型中的另一种：强酸，寒冷，火焰，闪电，毒素，雷鸣。"
                    },
                    {
                        name: "孪生法术 (Twinned Spell)",
                        description: "消耗：1术法点\n当你施展一道能因升环施法额外增加一名生物作为法术目标的法术，如魅惑类人Charm Person时，你可以消耗1术法点来将该法术的有效环阶提升一环。"
                    }
                ]
            }
        },
        { level: 3, name: "术士子职 (Sorcerer Subclass)", description: "你选择获得一项术士子职。畸变术法、时械术法、龙族术法和狂野术法。子职的内容见后文。子职是一种特化，在特定的术士等级给予你对应的独特能力。此后你将获得你所选的子职所有能力——只要其所需等级不超过你的术士等级。术士特性表列出了你从子职中获得新特性的术士等级。" },
        { level: 4, name: "属性值提升 (Ability Score Improvement)", description: "你获得**属性值提升专长**（见第五章）或其他你满足条件的专长。如术士特性表所示。你在第8，第12，第16级时会再次获得本特性。" },
        { level: 5, name: "术法复苏 (Sorcerous Restoration)", description: "当你完成一次短休时，你可以恢复不大于你术士等级一半（向下取整）的已消耗术法点。\n此特性一经使用，直到你完成一次长休为止不能再次使用。" },
        { level: 6, name: "子职特性", description: "获得你所选的术士子职 6 级特性。" },
        { level: 7, name: "术法化身 (Sorcery Incarnate)", description: "如果你的**先天术法**特性的使用次数耗尽，则你仍可以消耗2点术法点来用附赠动作继续激活该特性。\n此外，在你的**先天术法**特性处于激活状态期间，你可以在你施展的每道法术上应用最多**两次**超魔法选项。" },
        { level: 8, name: "属性值提升 (Ability Score Improvement)", description: "获得属性值提升专长。" },
        { level: 10, name: "超魔法 (Metamagic)", description: "再获得 2 个超魔法选项。" },
        { level: 12, name: "属性值提升 (Ability Score Improvement)", description: "获得属性值提升专长。" },
        { level: 14, name: "术士子职特性", description: "获得你所选的术士子职 14 级特性。" },
        { level: 16, name: "属性值提升 (Ability Score Improvement)", description: "获得属性值提升专长。" },
        { level: 17, name: "超魔法 (Metamagic)", description: "再获得 2 个超魔法选项。" },
        { level: 18, name: "术士子职特性", description: "获得你所选的术士子职 18 级特性。" },
        { level: 19, name: "传奇恩惠 (Epic Boon)", description: "你获得一项**传奇恩惠专长**（见第五章）或其他一项你选择的适用的专长。推荐选择**次元旅行之恩惠**。" },
        { level: 20, name: "奥术登神 (Arcane Apotheosis)", description: "在你的**先天术法**特性处于激活状态期间，每个你的回合一次，你可以无需消耗术法点地使用一次超魔法选项。" }
    ]
};

export const SORCERER_SUBCLASSES: SubclassItem[] = [
    {
        id: "sorcerer-aberrant",
        name: "畸变术法",
        parentClass: "术士",
        source: "官方规则",
        description: "操弄非自然的灵能力量\n\n某种异界的影响曾经用它的卷须将你的意识缠绕裹拢，给予了你灵能之力。如今，你能够使用这股力量触碰他人的内心，还能用它操控多元宇宙的魔法能量颠覆你周遭的世界。这种力量会从你身上如希望的灯塔一般照耀着旁人吗？抑或是使你成为恐惧之源，使他人得见你怪异的力量，受你的心灵所伤害呢？\n也许一股从星光位面吹来的心灵之风将灵能力量灌入你的体内，抑或是你曾暴露在遥远国度扭曲的影响之下。此外，也可能是你被植入了一只夺心魔蝌蚪，但蜕变一直没能完成。现在，其灵能力量已经被你占为已有。无论你是怎么获得这种力量的，它都在你的心灵中熊熊燃烧。",
        features: [
            {
                level: 3,
                name: "灵能法术 (Psionic Spells)",
                description: "当你到达灵能法术表中特定的术士等级时，你就始终准备着表中对应的法术。\n\n**灵能法术 Psionic Spells**\n\n| 术士等级 | 法术 |\n|---|---|\n| 3 | **心灵之楔 Mind Sliver** |\n| 3 | **哈达之臂 Arms of Hadar**，**不谐低语 Dissonant Whispers** |\n| 3 | **安定心神 Calm Emotions**，**侦测思想 Detect Thoughts** |\n| 5 | **哈达之欲 Hunger of Hadar**，**短讯术 Sending** |\n| 7 | **艾伐黑触手 Evard's Black Tentacles**，**异怪召唤术 Summon Aberration** |\n| 9 | **拉瑞心灵连接 Rary's Telepathic Bond**，**心灵遥控 Telekinesis** |"
            },
            {
                level: 3,
                name: "传心谈话 (Telepathic Speech)",
                description: "你能够在自己与他人的意识中构建一道心灵感应的链接。以一个附赠动作，你可以选择**30尺**内一个你可见的生物创造这一链接。链接能使你与其能够通过心灵感应方式进行交流，但交流时，你们之间距离的里数不超过你的**魅力调整值**里（至少1里）。你们必须使用互相知晓的语言进行心灵交流，才能使其理解你通过心灵感应传达的话语。\n心灵感应的链接持续等同于你**术士等级**的分钟数。这一链接在你与另一生物构建链接时提前结束。"
            },
            {
                level: 6,
                name: "灵能术法 (Psionic Sorcery)",
                description: "当你施展一道 **灵能法术特性**中的一环或更高环阶的法术时，你可以改为使用等同于该法术环数数量的术法点而非消耗法术位施展该法术。你消耗术法点施放法术时，你无视该法术施法需要的言语成分或姿势成分。你同时无视该法术需要的不会消耗且未给出具体价值的材料成分。"
            },
            {
                level: 6,
                name: "心灵防御 (Psychic Defenses)",
                description: "你获得**心灵**伤害的抗性。此外，你在避免和结束**魅惑**状态与**恐慌**状态的豁免检定上具有优势。"
            },
            {
                level: 14,
                name: "血肉启示 (Revelation in Flesh)",
                description: "你能够释放出潜藏在你内部扭曲的真实形态。以一个附赠动作，你使用 **1点或更多** 的术法点以魔法性地转变形态，持续 **10分钟**。你每消耗1术法点，你便可以从下述内容中选择一项，在转变形态期间你同时获得你选择的每项效应的增益：\n\n**水生适应 Aquatic Adaptation**\n你获得等同于你两倍行走速度的游泳速度，且你能在水下呼吸。不止如此，你的脖子两侧会长出鳃、或鳃在耳后呈扇状翻出、或你的手指变成蹼趾、或是有卷曲的纤毛从你的衣服底下延展出来。\n\n**闪耀飞翔 Glistening Flight**\n你获得等于你速度的飞行速度，并能悬浮。当你飞行时，你的皮肤表面流出发光的粘液、或是散发出异界的光芒。\n\n**识破隐形 See the Invisible**\n你能看见周围 **60尺** 内处于隐形状态的生物，前提是其对你来说不处于全身掩护。你的眼睛也会变成黑色、或是变成扭动的感官触须。\n\n**蠕行移动 Wormlike Movement**\n你的身体和你携带的装备都变得柔韧粘滑。你能够轻松穿过最窄 **1寸** 宽的狭窄空间而不用挤进去，且你可以消耗 **5尺** 移动力以脱离非魔法的束缚或受擒状态。"
            },
            {
                level: 18,
                name: "扭曲内爆 (Warping Implosion)",
                description: "你能够释放出扭曲空间的异常现象。以一个魔法动作，你传送到 **120尺** 内你可见的一个未被占据的位置，然后你消失位置 **30尺** 内的每个生物必须进行一次对抗你施法DC的**力量**豁免，豁免失败将受 **3d10** 力场伤害并被立即拉向你原本的位置，并停在最靠近的一处未被占据的空间内，豁免成功只受半伤。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗 **5点** 术法点（无需动作）重置此特性的使用权。"
            }
        ]
    },
    {
        id: "sorcerer-clockwork",
        name: "时械术法",
        parentClass: "术士",
        source: "官方规则",
        description: "引导寰宇的秩序之力\n\n一股源自宇宙本身的秩序力量，从机械境或其他与之类似的钟表般高效的存在位面之中产生，并扩散到你的灵魂之中，使你充满了魔力。你或你宗族中的某个人也许已经卷入到魔冢这种居住在机械境的秩序生命的谋划之中。又或许，你的先祖甚至参与过魔冢长征。无论是何种起源，秩序的力量也许对旁人来说有些奇怪，但于你而言，它是一个宏伟而璀璨的系统的一部分。",
        features: [
            {
                level: 3,
                name: "时械法术 (Clockwork Spells)",
                description: "当你到达时械法术表中特定的术士等级时，你就始终准备着表中对应的法术。\n\n**时械法术 Clockwork Spells**\n\n| 术士等级 | 法术 |\n|---|---|\n| 3 | **防护善恶 Protection from Evil and Good**，**警报术 Alarm** |\n| 3 | **次等复原术 Lesser Restoration**，**援助术 Aid** |\n| 5 | **解除魔法 Dispel Magic**，**防护能量 Protection from Energy** |\n| 7 | **行动自如 Freedom of Movement**，**构装召唤术 Summon Construct** |\n| 9 | **高等复原术 Greater Restoration**，**力场墙 Wall of Force** |\n\n此外，你可以从秩序显迹表格中选择或掷骰决定一种你在施法时显现出与秩序之联系的方式。\n\n**秩序显迹 Manifestations of Order**\n\n| d6 | 显迹 |\n|---|---|\n| 1 | 幽灵般的虚幻齿轮在你身后旋转。 |\n| 2 | 时钟的指针出现在你的眼中。 |\n| 3 | 你的皮肤发出如黄铜般的金属光泽。 |\n| 4 | 你的体表浮动着方程式和几何图形。 |\n| 5 | 你的法器短暂地变化成小巧的机械装置。 |\n| 6 | 你和那些受到你法术影响的生物都会听到齿轮的滴答声或是钟表的响铃。 |"
            },
            {
                level: 3,
                name: "归复平衡 (Restore Balance)",
                description: "你与绝对秩序之位面的联系使你能重整混沌的时刻。当你 **60尺** 内一个你可见的生物即将带着优势或是劣势进行一次检定时，你可以用反应使这次检定免受优势或劣势的影响。\n你可以使用此能力的次数等同于你的**魅力调整值**（至少1次）。当你完成一次长休时，你重获全部已消耗的使用次数。"
            },
            {
                level: 6,
                name: "律令之壁 (Bastion of Law)",
                description: "你可以利用世界的均衡之力为一个生物激发闪烁的秩序之盾。以一个魔法动作，你可以消耗 **1~5点** 术法点来创造出一个环绕你或 **30尺** 内的一个可见生物的魔法屏障。屏障具有等同于你所消耗术法点数量的 **d8** 骰。当被守护的生物受到伤害时，其可以消耗任意数量的这些d8骰，投掷它们，并使该伤害减少掷出结果合计的数值。\n此屏障将一直保持存在，直到你完成一次长休或直至你再次使用该特性。"
            },
            {
                level: 14,
                name: "序列意识 (Trance of Order)",
                description: "你获得了将你的意识和机械境无尽的计算达成同步的能力。以一个附赠动作，你可以在 **1分钟** 内进入此种状态。在此期间，对你进行的攻击免受优势的影响，且每当你进行一次d20检定时，你可以将d20掷出的 **9或以下** 的骰值视为 **10**。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗 **5点** 术法点（无需动作）重置此特性的使用权。"
            },
            {
                level: 18,
                name: "时械矩阵 (Clockwork Cavalcade)",
                description: "你召唤出秩序的精魂以抹除周遭的混乱。以一个魔法动作，你在以你为源点的 **30尺立方** 空间范围内召唤出一些精魂。这些精魂看起来像是魔冢或你选择的其他构装，其没有实体也无法被摧毁，并在消失前使立方范围内产生以下效应。此特性一经使用，直到完成一次长休前都不能再次使用。你也可以消耗 **7点** 术法点（无需动作）以恢复此特性的使用次数。\n\n- **治愈 Heal**。精魂合计提供至多恢复100生命值，由你随意分配给范围内任意数量的生物。\n- **修复 Repair**。范围内损坏的物件将被立即修复。\n- **破法 Dispel**。你选择范围内任意数量的生物或物件，其承受的任何六环或以下的法术结束。"
            }
        ]
    },
    {
        id: "sorcerer-draconic",
        name: "龙族术法",
        parentClass: "术士",
        source: "官方规则",
        description: "吐纳巨龙魔法\n\n你的天生魔法来自于巨龙的赠礼。也许一条濒死的远古龙将它的一部分魔力赐予了你或你的祖先。你也可能从满溢着巨龙魔法的某处地点吸收了魔力。又或者，你拿着一件从巨龙宝库中取得的宝藏，它吸收了部分龙族魔力。又或者，你只是有一位龙族先祖。",
        features: [
            {
                level: 3,
                name: "龙族法术 (Draconic Spells)",
                description: "当你到达龙族法术表中特定的术士等级时，你就始终准备着表中对应的法术。\n\n**龙族法术 Draconic Spells**\n\n| 术士等级 | 法术 |\n|---|---|\n| 3 | **繁彩球 Chromatic Orb**，**命令术 Command** |\n| 3 | **龙息术 Dragon's Breath**，**变身术 Alter Self** |\n| 5 | **恐惧术 Fear**，**飞行术 Fly** |\n| 7 | **秘法眼 Arcane Eye**，**魅惑怪物 Charm Monster** |\n| 9 | **通晓传奇 Legend Lore**，**龙类召唤术 Summon Dragon** |"
            },
            {
                level: 3,
                name: "龙族体魄 (Draconic Resilience)",
                description: "魔法在你的体内流动，外化为龙族赠礼体现出的生理特质。你的生命值上限 **提升3**，此后每提升一个术士等级，都将 **再次提升1**。\n你部分皮肤覆盖着龙鳞样式的柔鳞。未着装护甲时，你的基础AC等于 **10 + 你的敏捷调整值 ＋ 你的魅力调整值**。"
            },
            {
                level: 6,
                name: "元素亲和 (Elemental Affinity)",
                description: "你的龙族魔法与龙族相关的伤害类型有较强的亲和力。选择以下伤害类型之一：**强酸**、**寒冷**、**火焰**、**闪电**或**毒素**。\n你获得对所选伤害类型的**抗性**，且当你施展造成那种伤害的法术时，你可以将你的**魅力调整值**加到那个法术的其中一次伤害掷骰中。"
            },
            {
                level: 14,
                name: "龙翼 (Dragon Wings)",
                description: "以一个附赠动作，你可以在背后张开一对龙翼。龙翼持续 **1小时**，若你选择将其解散（无需动作）则会提前终止，在龙翼持续期间你获得 **60尺** 飞行速度。\n此特性一经使用，直至完成长休你都无法再次使用。你也可以消耗 **3点** 术法点（无需动作）重置此特性的使用权。"
            },
            {
                level: 18,
                name: "龙族伙伴 (Dragon Companion)",
                description: "你可以无需材料成分施展**龙类召唤术 Summon Dragon**。你可以无需法术位施展它一次，随后你在完成一次长休后重获以此法施展它的能力。\n每当你开始施展此法术时，都可以修改此法术使其**无需专注**。以此法施展时，此法术的持续时间将变为 **1分钟**。"
            }
        ]
    },
    {
        id: "sorcerer-wild",
        name: "狂野术法",
        parentClass: "术士",
        source: "官方规则",
        description: "释放混沌魔力\n\n你的天生魔法来源于创生秩序之下的混沌。你或者你的祖先可能通过一道通往其他位面，如混沌海或元素位面的传送门暴露于原生魔法之下。也许你被妖精祝福，或是被恶魔标记。又或者，你的魔法毫无征兆地偶然出现了。无论来源为何，这种魔法在你体内翻涌，等待着释放。",
        features: [
            {
                level: 3,
                name: "狂野魔法浪涌 (Wild Magic Surge)",
                description: "你施法时会释放出未经塑造的魔法浪涌。一回合一次，你每次消耗法术位施展一道术士法术后，可以立刻骰一次 **d20**。如果你骰出 **20**，则在狂野魔法浪涌表上掷骰以确定随机魔法效应。\n若掷出的魔法效应是一道法术，该法术因其过于狂野而无法受你的超魔法影响。",
                fullDescription: "**狂野魔法浪涌 Wild Magic Surge**\n\n| d100 | 效应 |\n|---|---|\n| 01-04 | 下1分钟内，你在每次自己回合开始时重骰本表，并在后续的掷骰中跳过本结果。 |\n| 05-08 | 一名对你**友善**的生物出现在位于你60尺内随机一处未占据空间中。此生物由DM控制，且会在1分钟后消失不见。投掷1d4以决定生物：1=**二元魔冢**；2=**呋噜**；3=**单元魔冢**；4=**独角兽**。 |\n| 09-12 | 下1分钟内，你在每个自己的回合开始时恢复5生命值。 |\n| 13-16 | 下1分钟内，你施展第一个需要豁免的法术时，成为该法术目标的生物进行豁免时具有**劣势**。 |\n| 17-20 | 你获得一个持续1分钟的效应。投掷1d8：1=空灵音乐；2=体型增大；3=羽毛胡须（喷嚏炸开）；4=必须大声喊叫；5=虚幻蝴蝶；6=第三只眼（察觉优势）；7=吐出粉色泡泡；8=皮肤变蓝（移除诅咒可解）。 |\n| 21-24 | 下1分钟内，你所有的施法时间为动作的法术施法时间变为附赠动作。 |\n| 25-28 | 你被转移到星光位面，直至你的下一回合结束时。你随后回到先前所占据的空间（或最近的未占据空间）。 |\n| 29-32 | 下1分钟内，你施展的下一道造成伤害的法术伤害取满。 |\n| 33-36 | 下1分钟内，你具有所有伤害类型的抗性。 |\n| 37-40 | 你变成一棵**植物盆栽**，持续至你下个回合开始时（失能，易伤，0HP时复原）。 |\n| 41-44 | 下1分钟内，你能够在每个自己回合内以一个附赠动作传送至多20尺。 |\n| 45-48 | 你和至多3名30尺内由你选择的生物获得**隐形**状态，持续1分钟（攻击/施法结束）。 |\n| 49-52 | 下1分钟内，灵体盾牌使你AC+2，并免疫**魔法飞弹**。 |\n| 53-56 | 你可以在本回合执行一个额外的动作。 |\n| 57-60 | 你施展一道随机法术（无需专注，持续至最大时间）。投掷1d10：1=**困惑术**；2=**火球术**；3=**云雾术**；4=**飞行术**（60尺内随机生物）；5=**油腻术**；6=**浮空术**（自己）；7=**魔法飞弹**（五环）；8=**镜影术**；9=**变形术**（变山羊）；10=**识破隐形**。 |\n| 61-64 | 下1分钟内，你触碰的非魔法可燃物件燃烧（1d4火焰伤害）。 |\n| 65-68 | 如果你在下1小时内死亡，则你立刻复活，如同被**转生术**所复活。 |\n| 69-72 | 你陷入**恐慌**状态，直至你的下一回合结束（源头由DM定）。 |\n| 73-76 | 你传送至多60尺，至一处你可见的未占据空间。 |\n| 77-80 | 位于你60尺内的一名随机生物陷入**中毒**状态，持续1d4小时。 |\n| 81-84 | 下1分钟内，你发出30尺强光。5尺内结束回合生物陷入**目盲**直至其下回合结束。 |\n| 85-88 | 30尺内至多3名可见生物各受1d10暗蚀伤害。你恢复等同伤害总和的生命值。 |\n| 89-92 | 30尺内至多3名可见生物各受4d10闪电伤害。 |\n| 93-96 | 下1分钟内，你和位于你30尺内所有生物具有对**穿刺**伤害的易伤。 |\n| 97-100 | 投掷1d6：1=恢复2d10 HP；2=300尺内盟友恢复2d10 HP；3=恢复最低环法术位；4=300尺内盟友恢复最低环法术位；5=重获所有术法点；6=17-20项效应同时发生。 |"
            },
            {
                level: 3,
                name: "混乱之潮 (Tides of Chaos)",
                description: "你可以驾驭机运的力量，以使一次自身的D20检定具有 **优势**。你必须在掷出d20之前决定是否使用此特性。此特性一经使用，在你完成长休后才能再次被使用。\n此特性在你使用法术位施展术士法术时也会恢复可用，但此时你会 **自动** 于狂野魔法浪涌表上掷骰。"
            },
            {
                level: 6,
                name: "扭曲幸运 (Bend Luck)",
                description: "你获得用你的狂野魔法扭曲命运的能力。当一个你能看见的生物投掷d20进行D20检定时，你可以在掷骰完成之后立即用一个反应并消耗 **1术法点** 来骰一次 **1d4**，并将掷骰结果作为 **加值或减值**（由你决定）附加到d20掷骰中。"
            },
            {
                level: 14,
                name: "受控混沌 (Controlled Chaos)",
                description: "你获得了对狂野魔法涌动的些微掌控。你每次骰狂野魔法浪涌表时，可以 **骰两次** 再自选其一生效。"
            },
            {
                level: 18,
                name: "驯服浪涌 (Tamed Surge)",
                description: "你使用法术位施展一道术士法术之后，可以立即创造一种从狂野魔法浪涌表中选择的效应而非在其上掷骰。你可以选择表中任何 **除了最后一行** 的效应，且如果你选择的效应包含掷骰，则你必须掷骰。\n此特性一经使用，直至完成长休你都无法再次使用。"
            }
        ]
    }
];
