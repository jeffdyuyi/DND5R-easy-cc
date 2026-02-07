import { ClassItem, SubclassItem } from '../../types';

export const CLERIC_CLASS: ClassItem = {
    id: "cleric-2024",
    name: "牧师",
    source: "官方规则",
    description: "暴力奶妈\n穿甲施法\n神灵代打\n亡灵克星\n全能辅助",
    fullDescription: "牧师从诸神的国度引动力量，用以展现奇迹。牧师蒙受一位神灵、一个神系、或是其他不朽存在的祝福——他们能从作为诸神栖身之所的众多外层位面中触及并引导神圣魔法，并驾驭此等伟力来祝福众生，击破强敌。\n\n牧师的力量是神性的赠礼，所以他们经常来往于神殿——其中往往供奉着牧师所信仰的神明，或是给予其魔法能力的其他不朽存在。尽管使用神圣魔法并不需要特定的训练，但牧师仍然需要学习祷告与仪式，并用这些知识帮助自己引导外层位面的伟力。\n\n圣殿或神庙的成员并不全是牧师。许多祭司在神殿中简朴地生活，通过祷告与仪式，而非魔法，来履行其奉献之职。很多凡人自称是宣讲神之话语的使者，而其中只有极少数人才能像真正的牧师一样，驾驭诸神的伟力。",
    hitDie: "d8",
    primaryAbility: "感知",
    saves: ["感知", "魅力"],
    tags: ["治疗", "施法者", "辅助"],
    coreTraits: {
        primaryAbility: "感知",
        hitPointDie: "每牧师等级 d8",
        savingThrows: "感知与魅力",
        skillProficiencies: "选择2项：历史，洞悉，医药，说服，或宗教",
        weaponProficiencies: "简易武器",
        armorTraining: "轻甲、中甲和盾牌",
        startingEquipment: {
            optionA: "链甲衫，盾牌，硬头锤，圣徽，祭司套组，以及 7GP",
            optionB: "110 GP"
        }
    },
    subclassLevel: 3,
    classTable: {
        title: "牧师特性 Cleric Features",
        columns: [
            { header: "等级", key: "level" },
            { header: "熟练加值(PB)", key: "pb" },
            { header: "职业特性", key: "features" },
            { header: "引导神力", key: "channel_divinity" },
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
            { level: 1, pb: "+2", features: ["施法", "圣职"], channel_divinity: "—", cantrips: "3", prepared_spells: "4", spell_slots_1: "2", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 2, pb: "+2", features: ["引导神力"], channel_divinity: "2", cantrips: "3", prepared_spells: "5", spell_slots_1: "3", spell_slots_2: "—", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 3, pb: "+2", features: ["牧师子职"], channel_divinity: "2", cantrips: "3", prepared_spells: "6", spell_slots_1: "4", spell_slots_2: "2", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 4, pb: "+2", features: ["属性值提升"], channel_divinity: "2", cantrips: "4", prepared_spells: "7", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "—", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 5, pb: "+3", features: ["灼净亡灵"], channel_divinity: "2", cantrips: "4", prepared_spells: "9", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "2", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 6, pb: "+3", features: ["子职特性"], channel_divinity: "3", cantrips: "4", prepared_spells: "10", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "—", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 7, pb: "+3", features: ["受祝击"], channel_divinity: "3", cantrips: "4", prepared_spells: "11", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "1", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 8, pb: "+3", features: ["属性值提升"], channel_divinity: "3", cantrips: "4", prepared_spells: "12", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "2", spell_slots_5: "—", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 9, pb: "+4", features: ["—"], channel_divinity: "3", cantrips: "4", prepared_spells: "14", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "1", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 10, pb: "+4", features: ["神圣干预"], channel_divinity: "3", cantrips: "5", prepared_spells: "15", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "—", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 11, pb: "+4", features: ["—"], channel_divinity: "3", cantrips: "5", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 12, pb: "+4", features: ["属性值提升"], channel_divinity: "3", cantrips: "5", prepared_spells: "16", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "—", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 13, pb: "+5", features: ["—"], channel_divinity: "3", cantrips: "5", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 14, pb: "+5", features: ["精通受祝击"], channel_divinity: "3", cantrips: "5", prepared_spells: "17", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "—", spell_slots_9: "—" },
            { level: 15, pb: "+5", features: ["—"], channel_divinity: "3", cantrips: "5", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 16, pb: "+5", features: ["属性值提升"], channel_divinity: "3", cantrips: "5", prepared_spells: "18", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "—" },
            { level: 17, pb: "+6", features: ["子职特性"], channel_divinity: "3", cantrips: "5", prepared_spells: "19", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "2", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 18, pb: "+6", features: ["—"], channel_divinity: "4", cantrips: "5", prepared_spells: "20", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "1", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 19, pb: "+6", features: ["传奇恩惠"], channel_divinity: "4", cantrips: "5", prepared_spells: "21", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "1", spell_slots_8: "1", spell_slots_9: "1" },
            { level: 20, pb: "+6", features: ["进阶神圣干预"], channel_divinity: "4", cantrips: "5", prepared_spells: "22", spell_slots_1: "4", spell_slots_2: "3", spell_slots_3: "3", spell_slots_4: "3", spell_slots_5: "3", spell_slots_6: "2", spell_slots_7: "2", spell_slots_8: "1", spell_slots_9: "1" }
        ]
    },
    subclasses: [],
    features: [
        { level: 1, name: "施法 (Spellcasting)", description: "你通过祈祷，冥想与奉献习得如何施法。施法规则见第七章。下文将详述如何将这些规则应用于牧师法术，牧师法术详见本章后文职业描述中的牧师法术列表。\n\n**戏法 Cantrips**。你知晓三道你选择的牧师戏法。推荐选择神导术 Guidance，圣火术 Sacred Flame 和奇术 Thaumaturgy。\n每当你获得一个牧师等级时，你都能从你的戏法中选择其一替换为另一道你所选择的牧师戏法。\n当你的牧师等级到达4级和10级时，你都能另选一道牧师戏法并习得，如牧师特性表中戏法一列所示。\n\n**法术位 Spell Slots**。牧师特性表显示了你可用于施展一环及以上法术的法术位数量。当你完成长休时，你重获所有已消耗的法术位。\n\n**一环及以上的准备法术 Prepared Spells of Level 1+**。你准备可供你以此特性施展的一环及更高环阶的法术列表。最初，选择四道牧师法术。推荐选择祝福术 Bless，疗伤术 Cure Wounds，光导箭 Guiding Bolt 和虔诚护盾 Shield of Faith。\n已准备法术数量会随你牧师等级的提升而增加，如牧师特性表中的准备法术一栏所示。每当这一列的数字增加时，从牧师法术列表中选择额外法术准备，直至已准备法术的数量与表格中的数字一致。你所选择法术的环阶必须是你所拥有法术位对应的环阶。例如，如果你是一名3级牧师，则你的准备法术列表能包括六道一环或二环的牧师法术，随意组合。\n如果牧师的其他特性给了你始终准备着的法术，这些法术不计入你以此法准备的法术数量，但这些法术对你而言都视为牧师法术。\n\n**改变你的准备法术 Changing Your Prepared Spells**。每当你完成一次长休时，你可以将你准备列表上的一道或更多法术替换为其他牧师法术，新替换的法术必须是你拥有法术位的法术。\n\n**施法属性 Spellcasting Ability**。你牧师法术的施法属性是感知。\n\n**施法法器 Spellcasting Focus**。你可以使用圣徽作为你牧师法术的施法法器。" },
        { level: 1, name: "圣职 (Divine Order)", description: "你让自己投身于以下一种由你自己选择的神圣职能：\n\n**保护者 Protector**。为战斗做足训练，你获得军用武器熟练与重甲受训。\n\n**奇术使 Thaumaturge**。你从牧师法术列表中额外学会一道戏法。此外，你与神性的神秘链接使你在智力（奥秘和宗教）检定中获得加值。加值等于你的感知调整值（至少加 1）。" },
        { level: 2, name: "引导神力 (Channel Divinity)", description: "你能从外层位面引导神圣能量来引动魔法效应。你起始时具有两种效应选项：神圣火花与驱散亡灵，其效果如下所示。每当你使用本职业的引导神力时，你选择要创造哪种来自本职业的效应。你会在更高的牧师等级获得更多选项。\n你可以使用本职业的引导神力两次，你在完成短休时重获一次已消耗的使用次数，并在完成长休时重获所有已消耗的使用次数。你在到达特定的牧师等级时获得额外的使用次数，见牧师特性表中引导神力一栏。\n如果某个引导神力效应要求进行豁免，则其豁免 DC 等于本职业的施法特性的法术豁免 DC。\n\n• **神圣火花 Divine Spark**: 以一个魔法动作，你将你的圣徽指向 30 尺内一个你可见的其他生物，并将神圣能量凝聚于该生物。投掷 1d8 加上你的感知调整值，你为该生物恢复该数值的生命或迫使其进行一次体质豁免，失败则受到等同该数值的暗蚀或光耀伤害（由你选择），成功则伤害减半（向下取整）。神圣火花在以下牧师等级获得额外的 d8 骰：7 级（2d8），13 级（3d8）以及 18 级（4d8）。\n• **驱散亡灵 Turn Undead**: 以一个魔法动作，你展现圣徽，斥退诸亡灵生物。你 30 尺内每个由你选择的亡灵都必须进行一次感知豁免，失败则陷入恐慌和失能状态，持续一分钟。在这一段持续时间内，被驱散的生物会尽可能远离你。此效应在其受到伤害时提前结束，你陷入失能状态或是死亡也会结束此效应。" },
        { level: 3, name: "牧师子职 (Cleric Subclass)", description: "你选择获得一项牧师子职：生命领域，光明领域，诡术领域或战争领域。子职的内容见后文。子职是一种特化，在特定的牧师等级给予你对应的独特能力。此后你将获得你所选的子职所有能力——只要其所需等级不超过你的牧师等级。牧师特性表列出了你从子职中获得新特性的牧师等级。\n牧师的每个子职都以某神明、神殿或宗教青睐的“领域”命名。" },
        { level: 4, name: "属性值提升 (Ability Score Improvement)", description: "你获得属性值提升专长或其他你满足条件的专长。如牧师特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。" },
        { level: 5, name: "灼净亡灵 (Sear Undead)", description: "每当你使用驱散亡灵时，你可以投掷等于你感知调整值枚 d8（最少 1d8)，每个豁免失败的亡灵受到等同骰值之和的光耀伤害。此伤害不会终止驱散效应。" },
        { level: 6, name: "牧师子职特性", description: "获得你所选的牧师子职 6 级特性。" },
        { level: 7, name: "受祝击 (Blessed Strikes)", description: "神圣的力量在战斗中注入你。你从以下特性中选择其一获得（如果你因旧书中的牧师子职而再次获得了下列选项之一，则你也只能使用你在此特性中所选的那个选项）：\n\n**神圣打击 Divine Strike**。每个你的回合一次，当你使用武器的攻击命中了一名生物时，你可以使该生物额外受到 1d8 点暗蚀伤害或光耀伤害（由你选择）。\n\n**强力施法 Potent Spellcasting**。你将你的感知调整值加到你用任何牧师戏法造成的伤害上。" },
        { level: 8, name: "属性值提升 (Ability Score Improvement)", description: "你获得属性值提升专长或其他你满足条件的专长。如牧师特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。" },
        { level: 10, name: "神圣干预 (Divine Intervention)", description: "你能呼唤你所信奉的神祇或神系来代你降下干预。以一个魔法动作，你选择一道五环或更低的牧师法术（施法时间不能为 1 反应），并将该法术作为执行此动作的一部分施展，无需消耗法术位也无需对应的施法材料。直到你完成一次长休前，你都无法再次使用此特性。" },
        { level: 12, name: "属性值提升 (Ability Score Improvement)", description: "你获得属性值提升专长或其他你满足条件的专长。如牧师特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。" },
        { level: 14, name: "精通受祝击 (Improved Blessed Strikes)", description: "你所选择的受祝击变得更加强大。\n\n**神圣打击 Divine Strike**。神圣打击的额外伤害提升至 2d8。\n\n**强力施法 Potent Spellcasting**。当你施展一道牧师戏法并用它对一个生物造成伤害时，你可以为你自己或你 60 尺内的另一个生物注入活力，使其获得等同于你感知调整值两倍的临时生命值。" },
        { level: 16, name: "属性值提升 (Ability Score Improvement)", description: "你获得属性值提升专长或其他你满足条件的专长。如牧师特性表所示，你在第 8，第 12，第 16 级时会再次获得本特性。" },
        { level: 17, name: "牧师子职特性", description: "获得你所选的牧师子职 17 级特性。" },
        { level: 19, name: "传奇恩惠 (Epic Boon)", description: "你获得一项传奇恩惠专长（见第五章）或其他一项你选择的适用的专长。推荐选择扭曲命运之恩惠。" },
        { level: 20, name: "进阶神圣干预 (Greater Divine Intervention)", description: "你能够呼唤更加强大的神圣干预。当你使用神圣干预时，你可以在选择法术时选择《祈愿术 Wish》。如果你这样做，你只有在完成 2d4 次长休后才能再次使用神圣干预。" },
    ]
};

export const CLERIC_SUBCLASSES: SubclassItem[] = [
    {
        id: "cleric-life",
        name: "生命领域",
        parentClass: "牧师",
        source: "PHB'24",
        description: "抚慰世界，疗愈伤痛",
        fullDescription: "生命领域专精于掌握支撑着多元宇宙众生灵的正能量。选择这个领域的牧师都是治愈大师，他们用这一生命原力治愈了无数的创伤。\n生命的存在本身即是依赖着与此领域所关联的正能量，因此几乎任何宗教文化的牧师都可能选择它。这个领域与农业之神、医疗与坚韧之神、以及家庭与社会之神的联系尤为紧密。那些致力于治愈众生的教团也十分重视这一领域的魔法。",
        features: [
            {
                level: 3,
                name: "生命领域法术 (Life Domain Spells)",
                description: "你与此神圣领域的链接使你始终准备着特定的法术。当你到达生命领域法术表中特定的牧师等级时，你就始终准备着表中对应的法术。\n3级：援助术 Aid，祝福术 Bless，疗伤术 Cure Wounds，次等复原术 Lesser Restoration\n5级：群体治愈真言 Mass Healing Word，回生术 Revivify\n7级：生命灵光 Aura of Life，防死结界 Death Ward\n9级：高等复原术 Greater Restoration，群体疗伤术 Mass Cure Wounds",
                grants: {
                    preparedSpells: ["援助术", "祝福术", "疗伤术", "次等复原术", "群体治愈真言", "回生术", "生命灵光", "防死结界", "高等复原术", "群体疗伤术"]
                }
            },
            {
                level: 3,
                name: "生命门徒 (Disciple of Life)",
                description: "你消耗法术位施展法术的回合中，当该法术恢复生物的生命值时，额外恢复 2 + 消耗法术位环阶 的生命值。"
            },
            {
                level: 3,
                name: "维持生命 (Preserve Life)",
                description: "以一个魔法动作，你展示圣徽并消耗一次引导神力来引导治疗能量恢复等于你牧师等级五倍的生命值。你选择身边30尺内处于浴血状态的生物作为此特性的目标（可以包括你），再为其分配从中获得的治疗能量。该特性至多将目标的生命值恢复至其上限的一半。"
            },
            {
                level: 6,
                name: "神祝医者 (Blessed Healer)",
                description: "你为其他人施展的治疗性法术也能治疗你自己。如果你用法术位施展的一道法术为除了你自己以外的一名或更多生物恢复了生命值，此次施法后你也将立刻恢复 2 + 该法术位环阶 的生命值。"
            },
            {
                level: 17,
                name: "极效治疗 (Supreme Healing)",
                description: "当你需要用一道法术或引导神力掷一枚或多枚骰子，以决定为一个生物恢复的生命数值时，你无需掷骰，直接为每个骰子取最高值。例如，一道法术为某一生物恢复2d6生命值，则其结果直接取12。"
            }
        ]
    },
    {
        id: "cleric-light",
        name: "光明领域",
        parentClass: "牧师",
        source: "PHB'24",
        description: "携光而来，逐尽黑暗",
        fullDescription: "光明领域的神圣力量着重于带来炽烈的火炎与启示。引动此等伟力的牧师们有着光辉的灵魂，其神明的力量助其窥破幻象，灼尽谎言，燃尽晦暗。\n光明领域与司掌真理、警觉、美丽、洞察或革新的神祇所关联。此等神祇中有些被认为是太阳本身，或是驾着战车，指引着太阳划过天穹。另一些则是洞穿阴谋诡计的哨卫。还一些则是美与才艺之神，其教义述说着艺术即是扬升灵魂的道途。",
        features: [
            {
                level: 3,
                name: "光明领域法术 (Light Domain Spells)",
                description: "你与此神圣领域的链接使你始终准备着特定的法术。当你到达光明领域法术表中特定的牧师等级时，你就始终准备着表中对应的法术。\n3级：燃烧之手 Burning Hands，妖火 Faerie Fire，灼热射线 Scorching Ray，识破隐形 See Invisibility\n5级：昼明术 Daylight，火球术 Fireball\n7级：秘法眼 Arcane Eye，火墙术 Wall of Fire\n9级：焰击术 Flame Strike，探知术 Scrying",
                grants: {
                    preparedSpells: ["燃烧之手", "妖火", "灼热射线", "识破隐形", "昼明术", "火球术", "秘法眼", "火墙术", "焰击术", "探知术"]
                }
            },
            {
                level: 3,
                name: "黎明曙光 (Radiance of the Dawn)",
                description: "以一个魔法动作，你展现圣徽，消耗一次引导神力次数来释放出一阵闪光，覆盖一处以你为源点的30尺光环区域。该区域内的任何魔法黑暗——例如法术黑暗术Darkness制造的黑暗——都将被解除。此外，区域内你选择的所有生物都必须进行一次体质豁免。豁免失败者将受2d10＋你牧师等级的光耀伤害，豁免成功则伤害减半。"
            },
            {
                level: 3,
                name: "守御之光 (Warding Flare)",
                description: "当位于你30尺内一名你可见的生物进行攻击检定时，你能够以反应在该次攻击命中或失手前在该生物面前发出闪耀之光，迫使其该次攻击检定具有劣势。\n你可以使用该特性的次数等于你的感知调整值（最少1次）。你在完成一次长休时重获所有已消耗的使用次数。"
            },
            {
                level: 6,
                name: "精通守御之光 (Improved Warding Flare)",
                description: "你在完成一次短休或长休后重新获得所有守御之光的使用次数。\n此外，每当你使用守御之光时，你可以给予触发此反应的该次攻击所指定那个目标2d6+你感知调整值点临时生命值。"
            },
            {
                level: 17,
                name: "光冕 (Corona of Light)",
                description: "以一个魔法动作，你可以让你自己散发出日光组成的灵光，持续一分钟或直至你将其解除（无需动作）。你散发出半径60尺的明亮光照以及额外30尺的微光光照。身处该明亮光照范围中的敌人，在抵抗你的黎明曙光特性以及任何造成火焰或光耀伤害的法术而进行豁免检定时具有劣势。\n你可以使用该特性的次数等同于你的感知调整值（最低为1）。你在完成一次长休时重获所有已消耗的使用次数。"
            }
        ]
    },
    {
        id: "cleric-trickery",
        name: "诡术领域",
        parentClass: "牧师",
        source: "PHB'24",
        description: "挑起闹剧，直面权威",
        fullDescription: "诡术领域提供了欺诈、幻觉与隐匿的魔法。驾驭此等魔法的牧师是世界的颠覆者，他们打击骄傲者的自尊，嘲弄暴君，释放俘虏，并且蔑视毫无意义的传统。他们对花言巧语、恶作剧、欺骗和盗窃的偏好要远甚于正面对抗。\n诡术之神们均是恶作剧者，同时也是挑拨凡人或神明去颠覆现有秩序的煽动者。祂们是变革与动荡的具现，亦是小偷、恶棍、赌徒、叛乱者和解放者的庇护人。在暗中运作的教团，尤其是反抗高压的政府或社会体系的那些，也同样利用着来自诡术领域的力量。",
        features: [
            {
                level: 3,
                name: "诡术领域法术 (Trickery Domain Spells)",
                description: "你与此神圣领域的链接使你始终准备着特定的法术。当你到达诡术领域法术表中特定的牧师等级时，你就始终准备着表中对应的法术。\n3级：魅惑类人 Charm Person，易容术 Disguise Self，隐形术 Invisibility，行动无踪术 Pass without Trace\n5级：催眠图纹 Hypnotic Pattern，回避侦测 Nondetection\n7级：困惑术 Confusion，任意门 Dimension Door\n9级：支配类人 Dominate Person，篡改记忆 Modify Memory",
                grants: {
                    preparedSpells: ["魅惑类人", "易容术", "隐形术", "行动无踪术", "催眠图纹", "回避侦测", "困惑术", "任意门", "支配类人", "篡改记忆"]
                }
            },
            {
                level: 3,
                name: "诡术祝福 (Blessing of the Trickster)",
                description: "以一个魔法动作，你可以选择自己或30尺内一个自愿生物，所选生物在进行敏捷（隐匿）检定时具有优势。此祝福持续至你完成一次长休或直至你再次使用此特性。"
            },
            {
                level: 3,
                name: "召现分身 (Invoke Duplicity)",
                description: "以一个附赠动作，你可以消耗一次引导神力次数来创造一个自己的完美视觉幻象并出现在你身边30尺内一个你能看见且未占据空间。该幻象是无实体的且不占据它所在的空间。幻象持续1分钟，或直至你将其解除（无需动作）或陷入失能状态。这个幻象栩栩如生，能模仿你的表情和姿势。当幻象存在时，你将获得以下好处：\n**施法 Cast Spells**。你可以如同你在幻象所在位置施展法术，但必须使用你自己的感官。\n**干扰 Distract**。当你和你的幻象都在同一个生物身边5尺内，且该生物可以看见幻象时，由于幻象对目标造成的干扰，你对其进行的攻击检定具有优势。\n**转移 Move**。以一个附赠动作，你可以移动幻象至多30尺到达一处空间，该空间必须是你120尺内一处可见的未占据空间。"
            },
            {
                level: 6,
                name: "诡诈换位 (Trickster's Transposition)",
                description: "每当你使用附赠动作创造或移动你来自召现分身特性的幻象时，你都可以通过传送与幻象交换位置。"
            },
            {
                level: 17,
                name: "精通分身 (Improved Duplicity)",
                description: "你召现分身特性所创造的幻象在以下方面变得更加强力。\n**共享干扰 Shared Distraction**。当你和你的盟友对位于幻象5尺内的生物进行攻击检定时具有优势。\n**治愈幻象 Healing Illusion**。当幻象消失时，你或你选择的5尺内的一名生物恢复等同于你牧师等级的生命值。"
            }
        ]
    },
    {
        id: "cleric-war",
        name: "战争领域",
        parentClass: "牧师",
        source: "官方规则",
        description: "战争领域的牧师不仅仅是随军祭司，更是战场上的勇士。",
        features: [
            { level: 3, name: "战争领域法术 (War Domain Spells)", description: "始终准备：光导箭, 魔化武器, 虔诚护盾, 灵体武器 (Lv3); 十字军披风, 灵体卫士 (Lv5); 火焰护盾, 行动自如 (Lv7); 怪物定身术, 钢风斩 (Lv9)。" },
            { level: 3, name: "战争祭司 (War Priest)", description: "附赠动作发动武器攻击或徒手打击。次数=感知调整值（短/长休恢复）。" },
            { level: 3, name: "导引打击 (Guided Strike)", description: "引导神力（反应？不，PDF说是失手时使用）：攻击失手时，消耗引导神力使结果+10。若是别人失手，用反应使其+10。" },
            { level: 6, name: "战神祝福 (War God's Blessing)", description: "可用引导神力施展《虔诚护盾》或《灵体武器》无需消耗法术位。以此法施展无需专注，持续1分钟。" },
            { level: 17, name: "战争化身 (Avatar of Battle)", description: "获得对钝击、穿刺和挥砍伤害的抗性。" }
        ]
    }
];
