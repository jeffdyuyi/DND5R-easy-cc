import { ClassItem, SubclassItem } from '../../types';

export const CLERIC_CLASS: ClassItem = {
    id: "cleric-2024",
    name: "牧师",
    source: "官方规则",
    description: "暴力奶妈\n穿甲施法\n神灵代打\n亡灵克星\n全能辅助",
    fullDescription: "你通过祈祷，冥想与奉献习得如何施法。牧师法术详见本章后文职业描述中的牧师法术表。\n\n**施法**\n戏法。你已知牧师法术列表中 3 个你选择的戏法。推荐选择神导术，圣火术和奇术。当你获得牧师等级时，你可以将一道已知戏法用另一道牧师戏法替换。\n\n**1 环及以上的准备法术**\n你准备了一系列一环或更高的法术，以供此特性施法使用。初始时，从牧师法术列表选择 4 个一环法术。推荐选择祝福术，疗伤术，光导箭和虔诚护盾。\n当你获得牧师等级时，你能准备的法术数量也会随之提升，如同牧师特性表中准备法术一栏所示。\n\n**施法关键属性**\n感知是你牧师法术的施法关键属性。\n\n**法器**\n你可以使用圣徽作为你牧师法术的法器。",
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
    subclasses: [],
    features: [
        { level: 1, name: "施法 (Spellcasting)", description: "你能够施展牧师法术。感知是你的施法关键属性。你需要准备法术。" },
        { level: 1, name: "圣职 (Divine Order)", description: "你让自己投身于以下一种由你自己选择的神圣职能：\n\n**保护者**。通过战斗训练，你获得军用武器熟练与重甲受训。\n\n**奇术使**。你从牧师法术列表中学会一道额外的戏法。此外，你与神性的神秘链接使你在智力（奥秘和宗教）检定中获得等同于你感知调整值的加值（最低为 1）。" },
        { level: 2, name: "引导神力 (Channel Divinity)", description: "你能从外层位面引导神圣能量。短休恢复1次，长休恢复全部。你使用引导神力时的 DC 等于你的法术豁免 DC。\n你起始时具有两种选项：\n• **神圣火花**: 魔法动作。治疗或伤害30尺内一生物。数值为 1d8+感知调整值。伤害类型为光耀或黯蚀。18级时达到4d8。\n• **驱散亡灵**: 魔法动作。30尺内所有亡灵进行感知豁免，失败则恐慌且失能，持续1分钟或直到受伤。" },
        { level: 3, name: "牧师子职 (Cleric Subclass)", description: "你获得你所选的一个牧师子职：生命领域，光明领域，诡术领域 或者 战争领域。" },
        { level: 4, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 5, name: "灼净亡灵 (Sear Undead)", description: "每当你使用驱散亡灵时，你可以投掷等于你感知调整值枚 d8（最少 1d8)，每个豁免失败的亡灵受到等同骰值之和的光耀伤害。此伤害不会终止驱散效应。" },
        { level: 6, name: "牧师子职特性", description: "获得你所选的牧师子职 6 级特性。" },
        { level: 7, name: "受祝击 (Blessed Strikes)", description: "神圣的力量在战斗中注入你。你从以下特性中选择其一获得：\n\n**神圣打击**: 每个你的回合一次，当你以一次使用武器的攻击命中了一个生物时，你对其造成额外 1d8 光耀或黯蚀伤害（由你选择）。\n\n**强力施法**: 你将你的感知调整值加到你用任何牧师戏法造成的伤害上。" },
        { level: 8, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 10, name: "神圣干预 (Divine Intervention)", description: "以一个魔法动作，你选择一道 5 环或更低的牧师法术（施法时间不能为 1 反应），并将该法术作为执行此动作的一部分施展，无需消耗法术位也无需对应的施法材料。每长休一次。" },
        { level: 12, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 14, name: "精通受祝击 (Improved Blessed Strikes)", description: "你所选择的受祝击变得更加强大。\n\n**神圣打击**。额外伤害提升至 2d8。\n\n**强力施法**。当你施展一道牧师戏法并用它对一个生物造成伤害时，你可以为你自己或你 60 尺内的另一个生物注入活力，使其获得等同于你感知调整值两倍的临时生命值。" },
        { level: 16, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 17, name: "牧师子职特性", description: "获得你所选的牧师子职 17 级特性。" },
        { level: 19, name: "传奇恩惠", description: "获得一项传奇恩惠专长（推荐：扭曲命运之恩惠）。" },
        { level: 20, name: "进阶神圣干预 (Greater Divine Intervention)", description: "当你使用神圣干预特性时，你可以在选择法术时选择《祈愿术》。如果你这样做，你只有在完成 2d4 次长休后才能再次使用神圣干预。" }
    ]
};

export const CLERIC_SUBCLASSES: SubclassItem[] = [
    {
        id: "cleric-life",
        name: "生命领域",
        parentClass: "牧师",
        source: "官方规则",
        description: "生命领域的牧师致力于通过正能量来安抚伤者、治疗病患。你是生命的捍卫者，也是死亡与不死生物的死敌。",
        features: [
            { level: 3, name: "生命领域法术 (Life Domain Spells)", description: "始终准备：援助术, 祝福术, 疗伤术, 次级复原术 (Lv3); 群体治愈真言, 回生术 (Lv5); 生命灵光, 防死结界 (Lv7); 高等复原术, 群体疗伤术 (Lv9)。" },
            { level: 3, name: "生命门徒 (Disciple of Life)", description: "当你消耗法术位施展恢复生命值的法术时，目标额外恢复 2 + 法术环阶 的生命值。" },
            { level: 6, name: "神祝医者 (Blessed Healer)", description: "你为他人施展的治疗法术也能治疗你自己。当你用法术位施展一道为除了你自己以外的一个或更多生物恢复生命值的法术后，你立刻恢复 2 + 法术环阶 的生命值。" },
            { level: 17, name: "极效治疗 (Supreme Healing)", description: "当你需要用一道法术或引导神力掷一枚或多枚骰子，以决定为一个生物恢复的生命数值时，你无需掷骰，直接为每个骰子取最高值。" }
        ]
    },
    {
        id: "cleric-light",
        name: "光明领域",
        parentClass: "牧师",
        source: "官方规则",
        description: "光明领域的牧师崇敬光辉的理想，如正义、真理与守望。他们驱散黑暗，在这个充满阴影的世界中燃烧成一盏明灯。",
        features: [
            { level: 3, name: "光明领域法术 (Light Domain Spells)", description: "始终准备：燃烧之手, 妖火, 灼热射线, 识破隐形 (Lv3); 昼明术, 火球术 (Lv5); 秘法眼, 火墙术 (Lv7); 焰击术, 探知 (Lv9)。" },
            { level: 3, name: "黎明曙光 (Radiance of the Dawn)", description: "引导神力：以你为中心30尺光环，解除魔法黑暗。范围内生物体质豁免，失败受 2d10+牧师等级 光耀伤害，成功减半。" },
            { level: 3, name: "守御之光 (Warding Flare)", description: "反应动作。30尺内可见生物攻击时，可在命中前使其攻击检定具有劣势。次数=感知调整值（最少1）。长休恢复。" },
            { level: 6, name: "精通守御之光 (Improved Warding Flare)", description: "短休或长休后恢复守御之光次数。此外，使用时可给予被攻击目标 2d6+感知调整值 的临时生命值。" },
            { level: 17, name: "光冕 (Corona of Light)", description: "魔法动作。发光（60尺明亮/30尺微光）持续1分钟。范围内敌人对你的黎明曙光和火焰/光耀伤害法术的豁免具有劣势。" }
        ]
    },
    {
        id: "cleric-trickery",
        name: "诡术领域",
        parentClass: "牧师",
        source: "官方规则",
        description: "诡术领域的牧师通过幻象、欺瞒与潜行来服务于神灵。",
        features: [
            { level: 3, name: "诡术领域法术 (Trickery Domain Spells)", description: "始终准备：魅惑人类, 易容术, 隐形术, 行动无踪 (Lv3); 催眠图纹, 回避侦测 (Lv5); 困惑术, 任意门 (Lv7); 支配人类, 篡改记忆 (Lv9)。" },
            { level: 3, name: "诡术祝福 (Blessing of the Trickster)", description: "魔法动作。给予自己或30尺内一生物隐匿优势，持续至长休或再次使用。" },
            { level: 3, name: "祈唤分身 (Invoke Duplicity)", description: "引导神力（附赠动作）：30尺内创造完美幻象（持续1分钟，专注？不，PDF未提专注，只说持续1分钟或解除/失能）。\n• **施法**: 可从幻象位置施法。\n• **分散注意**: 你和幻象在目标5尺内时，你对目标攻击优势。\n• **转移**: 附赠动作移动幻象30尺（至120尺内）。" },
            { level: 6, name: "诡诈换位 (Trickster's Transposition)", description: "附赠动作移动或创造幻象时，可与幻象交换位置（传送）。" },
            { level: 17, name: "精通分身 (Improved Duplicity)", description: "• **共享分散注意**: 盟友也能享受幻象带来的攻击优势。\n• **治愈幻象**: 幻象消失时，你或5尺内一生物恢复等于牧师等级的生命值。" }
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
