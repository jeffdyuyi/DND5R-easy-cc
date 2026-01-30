import { ClassItem, SubclassItem } from '../../types';

export const WARLOCK_CLASS: ClassItem = {
    id: "warlock-2024",
    name: "魔契师",
    source: "官方规则",
    description: "魔能爆机关枪\n祈唤强化\n短休回蓝\n宗主打工仔\n只有俩法术位",
    fullDescription: "依靠玄秘的仪式，你与一位神秘存在缔结契约以获得魔法力量。这位存在隐于影中，身份不明——但其恩泽是切实的。参考第 7 章中的施法规则。下文为你详细说明了魔契师施展魔契师法术的规则。\n\n**契约魔法 (Pact Magic)**\n• **戏法**: 你习得两个魔契师戏法。推荐选择魔能爆和魔法伎俩。4级和10级时习得额外戏法。\n• **法术位**: 魔契师特性表中记录了你可用以施展魔契师法术的 1 环至 5 环法术位数量。你所有的法术位都属于同一环阶。已消耗的法术位可在完成短休或长休后恢复。\n• **准备法术**: 起始时，你从魔契师法术列表中选择并准备两个 1 环法术。推荐选择 魅惑人类 和 巫术箭。每当你获得一级魔契师等级，你可以改变你的准备法术。\n• **施法属性**: 魅力。\n• **法器**: 奥术法器。\n\n**魔能祈唤 (Eldritch Invocations)**\n在你的研究中，你发掘了魔能祈唤，这赋予你持久的魔法能力。你获得一个魔能祈唤（如书之魔契等）。",
    hitDie: "d8",
    primaryAbility: "魅力",
    saves: ["感知", "魅力"],
    tags: ["施法者", "契约"],
    coreTraits: {
        primaryAbility: "魅力",
        hitPointDie: "每魔契师等级 d8",
        savingThrows: "感知与魅力",
        skillProficiencies: "选择2项：奥秘、欺瞒、历史、威吓、调查、自然、或宗教",
        weaponProficiencies: "简易武器",
        armorTraining: "轻甲",
        startingEquipment: {
            optionA: "皮甲，镰刀，2 匕首，奥术法器（法球），学者套组，书（隐秘学识），以及 15GP",
            optionB: "100 GP"
        }
    },
    subclassLevel: 3,
    subclasses: [],
    features: [
        { level: 1, name: "契约魔法 (Pact Magic)", description: "你习得两个魔契师戏法（推荐魔能爆）。你拥有短休恢复的法术位，且所有法术位环阶相同（最高为5环）。你需要准备法术。" },
        { level: 1, name: "魔能祈唤 (Eldritch Invocations)", description: "你获得一个自选的魔能祈唤（如书之魔契、刃之魔契、链之魔契或其他选项）。升级时可替换。部分祈唤有先决条件。" },
        { level: 2, name: "秘法回流 (Magical Cunning)", description: "你可以举行一道耗时 1 分钟的秘传仪式，恢复一半的已消耗法术位（向上取整）。每长休一次。" },
        { level: 3, name: "魔契师子职 (Warlock Subclass)", description: "选择你的宗主：至高妖精、天界、邪魔或旧日支配者。" },
        { level: 4, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 6, name: "子职特性", description: "获得你所选的魔契师子职 6 级特性。" },
        { level: 8, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 9, name: "联络宗主 (Contact Patron)", description: "你始终准备了《异界探知》法术。你可以无需消耗法术位地施展它，并自动通过该法术的豁免。每长休一次。" },
        { level: 10, name: "子职特性", description: "获得你所选的魔契师子职 10 级特性。" },
        { level: 11, name: "玄奥秘法 (Mystic Arcanum - 6环)", description: "选择一个 6 环魔契师法术。你可以施展该秘法，无需消耗法术位。每长休恢复一次。" },
        { level: 12, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 13, name: "玄奥秘法 (Mystic Arcanum - 7环)", description: "选择一个 7 环魔契师法术作为你的玄奥秘法。每长休使用一次。" },
        { level: 14, name: "子职特性", description: "获得你所选的魔契师子职 14 级特性。" },
        { level: 15, name: "玄奥秘法 (Mystic Arcanum - 8环)", description: "选择一个 8 环魔契师法术作为你的玄奥秘法。每长休使用一次。" },
        { level: 16, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 17, name: "玄奥秘法 (Mystic Arcanum - 9环)", description: "选择一个 9 环魔契师法术作为你的玄奥秘法。每长休使用一次。" },
        { level: 19, name: "传奇恩惠", description: "获得一项传奇恩惠专长（推荐：扭曲命运之恩惠）。" },
        { level: 20, name: "魔能掌控 (Eldritch Master)", description: "当你使用秘法回流特性时，你改为恢复全部消耗的魔契师法术位。" }
    ]
};

export const WARLOCK_SUBCLASSES: SubclassItem[] = [
    {
        id: "warlock-archfey",
        name: "至高妖精",
        parentClass: "魔契师",
        source: "官方规则",
        description: "与妖精荒野的领主缔结契约。",
        features: [
            { level: 3, name: "至高妖精法术 (Archfey Spells)", description: "始终准备：安定心神, 妖火, 迷踪步, 魅影之力, 睡眠术 (Lv3); 闪现术, 植物滋长 (Lv5); 支配野兽, 高等隐形术 (Lv7); 支配人类, 伪装术 (Lv9)。" },
            { level: 3, name: "妖精步伐 (Steps of the Fey)", description: "你可以施展《迷踪步》无需消耗法术位。次数=魅力调整值，长休恢复。\n此外，施展时可选择额外效应：\n• **复苏步伐**: 传送后，10尺内一可见生物获得 1d10 临时生命。\n• **嘲弄步伐**: 传送前 5 尺内生物感知豁免，失败则对你之外的目标攻击劣势。" },
            { level: 6, name: "雾遁 (Misty Escape)", description: "受到伤害时，可用反应施展《迷踪步》。\n并且你的妖精步伐获得新选项：\n• **迷踪步伐**: 隐形直到下回合开始或攻击/施法。\n• **惊惧步伐**: 5尺内生物感知豁免，失败受 2d10 心灵伤害。" },
            { level: 10, name: "斗转星移 (Beguiling Defenses)", description: "免疫魅惑。\n反应：被看见的敌人命中时，可使伤害减半，并迫使攻击者进行感知豁免，失败则受到等量的反射心灵伤害。每长休或消耗法术位恢复。" },
            { level: 14, name: "醉心魔法 (Bewitching Magic)", description: "当你用动作消耗法术位施展幻术或惑控法术时，可作为该动作一部分施展《迷踪步》且不消耗资源。" }
        ]
    },
    {
        id: "warlock-celestial",
        name: "天界宗主",
        parentClass: "魔契师",
        source: "官方规则",
        description: "与上层位面的存在缔结契约，获得治疗能力。",
        features: [
            { level: 3, name: "天界法术 (Celestial Spells)", description: "始终准备：援助术, 疗伤术, 光导箭, 次级复原术, 光亮术, 圣火术 (Lv3); 昼明术, 回生术 (Lv5); 信仰守卫, 火墙术 (Lv7); 高等复原术, 天界召唤术 (Lv9)。" },
            { level: 3, name: "治愈之光 (Healing Light)", description: "拥有 d6 骰池（数量=1+魔契师等级）。附赠动作治疗 60 尺内生物（每次最多消耗魅力调整值个骰子）。长休恢复。" },
            { level: 6, name: "光耀之魂 (Radiant Soul)", description: "获得光耀抗性。施展光耀或火焰伤害法术时，可在一目标上增加魅力调整值的伤害。" },
            { level: 10, name: "天界韧性 (Celestial Resilience)", description: "使用秘法回流或短/长休后，获得临时HP（等级+魅力）。并可赐予5名生物临时HP（等级的一半+魅力）。" },
            { level: 14, name: "灼光复仇 (Searing Vengeance)", description: "你或60尺内盟友做死亡豁免时，反应使其恢复半血并站起。随后对30尺内敌人造成 2d8+魅力 光耀伤害并致盲。每长休一次。" }
        ]
    },
    {
        id: "warlock-fiend",
        name: "邪魔宗主",
        parentClass: "魔契师",
        source: "官方规则",
        description: "与下层位面的邪魔缔结契约。",
        features: [
            { level: 3, name: "邪魔法术 (Fiend Spells)", description: "始终准备：燃烧之手, 命令术, 灼热射线, 暗示术 (Lv3); 火球术, 臭云术 (Lv5); 火焰护盾, 火墙术 (Lv7); 指使术, 疫病虫群 (Lv9)。" },
            { level: 3, name: "黑暗赐福 (Dark One's Blessing)", description: "当你或10尺内有人将敌人生命降至0时，你获得临时HP（等级+魅力，最少1）。" },
            { level: 6, name: "黑暗强运 (Dark One's Own Luck)", description: "属性检定或豁免检定时，可投 d10 加到结果中。次数=魅力调整值。长休恢复。" },
            { level: 10, name: "邪魔体魄 (Fiendish Resilience)", description: "短/长休后，选择一种伤害类型获得抗性（力场除外）。" },
            { level: 14, name: "直坠噩梦 (Hurl Through Hell)", description: "攻击命中时，将目标放逐至下层位面（无需豁免？需魅力豁免）。目标魅力豁免失败则消失，受 8d10 心灵伤害（非邪魔），并失能至你下回合结束。长休或耗法术位恢复。" }
        ]
    },
    {
        id: "warlock-goo",
        name: "旧日支配者",
        parentClass: "魔契师",
        source: "官方规则",
        description: "与不可名状的远古存在缔结契约。",
        features: [
            { level: 3, name: "旧日支配者法术 (Great Old One Spells)", description: "始终准备：侦测思想, 不谐低语, 魅影之力, 塔莎狂笑术 (Lv3); 鹰眼术, 哈达之欲 (Lv5); 困惑术, 异怪召唤术 (Lv7); 篡改记忆, 心灵遥控 (Lv9)。" },
            { level: 3, name: "唤醒心灵 (Awakened Mind)", description: "附赠动作建立心灵感应连接（30尺内，持续至等级分钟）。此后距离只要在（魅力）英里内即可交流。" },
            { level: 3, name: "心灵法术 (Psychic Spells)", description: "魔契师法术造成的伤害可改为心灵伤害。施展惑控/幻术系法术无视声音/姿势成分。" },
            { level: 6, name: "锐眼斗士 (Clairvoyant Combatant)", description: "连结心灵时，可迫使目标过感知豁免。失败则其对你攻击劣势，你对它攻击优势。短/长休或耗法术位恢复。" },
            { level: 10, name: "骇异恶咒 (Eldritch Hex)", description: "始终准备《脆弱诅咒》(Hex?)。施展时若是针对属性，目标在该属性豁免上也获得劣势（不仅是检定）。" },
            { level: 10, name: "思维之盾 (Thought Shield)", description: "免疫读心。获得心灵抗性。反射同量的心灵伤害给反击者。" },
            { level: 14, name: "创造奴仆 (Create Thrall)", description: "施展《异怪召唤术》可无需专注（持续1分钟），异怪获得临时HP（等级+魅力）。且异怪攻击命中被诅咒目标时附带额外心灵伤害。" }
        ]
    }
];
