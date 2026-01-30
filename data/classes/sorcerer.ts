import { ClassItem, SubclassItem } from '../../types';

export const SORCERER_CLASS: ClassItem = {
    id: "sorcerer-2024",
    name: "术士",
    source: "官方规则",
    description: "法术机关枪\n魅力施法\n超魔构筑\n天生施法者\n需要长休",
    fullDescription: "你从你的天生魔法汲取魔力用于施展法术。参见第 7 章有关施法的规则。下述信息将详述如何将这些规则应用于术士法术。\n\n**施法**\n戏法。你已知 4 个你选择的术士戏法。推荐选择光亮术、魔法伎俩、电爪和术法爆发。每当你获得一个术士等级时，你都能将通过此特性已知的其中一个戏法替换为另一个你所选择的术士戏法。\n\n**法术位**\n术士特性表显示了你可用于施放 1 环及以上法术的法术位数量。你在完成一次长休时恢复所有已消耗的法术位。\n\n**1 环及以上的准备法术**\n你准备可供你以此特性施展的 1 环及更高环阶的法术列表。已准备法术数量会随你术士等级的提升而增加，如术士特性表中的准备法术一列所示。你必须拥有与准备法术的环阶相对应环阶的法术位。\n\n**施法属性**\n你术士法术的施法属性是魅力。\n\n**施法法器**\n你可以使用奥术法器作为你术士法术的施法法器。",
    hitDie: "d6",
    primaryAbility: "魅力",
    saves: ["体制", "魅力"],
    tags: ["施法者", "输出", "社交"],
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
    subclasses: [],
    features: [
        { level: 1, name: "施法 (Spellcasting)", description: "你已知 4 个戏法。你需要准备法术（数量见表）。魅力是你的施法属性。你可以使用奥术法器。" },
        { level: 1, name: "先天术法 (Innate Sorcery)", description: "以一个附赠动作，你可以将魔力释放而出，持续 1 分钟。获得增益：术士法术豁免 DC+1；术士法术攻击检定优势。每长休2次。" },
        { level: 2, name: "魔力泉涌 (Font of Magic)", description: "你拥有术法点（数量=等级）。你可以把法术位转化为术法点（无需动作），或用附赠动作把术法点转化为法术位（最高5环）。长休恢复。" },
        { level: 2, name: "超魔法 (Metamagic)", description: "获得 2 个超魔法选项。施法时可消耗术法点调整法术。升级时可替换。10级和17级各再获得 2 个。" },
        { level: 3, name: "术士子职 (Sorcerer Subclass)", description: "选择你的术法起源：畸变术法、时械术法、龙族术法或狂野术法。" },
        { level: 4, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 5, name: "术法复苏 (Sorcerous Restoration)", description: "短休时，可恢复已消耗的术法点（数量最多为术士等级的一半）。长休重置。" },
        { level: 6, name: "子职特性", description: "获得你所选的术士子职 6 级特性。" },
        { level: 7, name: "术法化身 (Sorcery Incarnate)", description: "先天术法次数耗尽时，可消耗 2 术法点再次开启。开启期间，每道法术可应用最多两个超魔法。" },
        { level: 8, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 10, name: "超魔法", description: "再获得 2 个超魔法选项。" },
        { level: 12, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 14, name: "子职特性", description: "获得你所选的术士子职 14 级特性。" },
        { level: 16, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 17, name: "超魔法", description: "再获得 2 个超魔法选项。" },
        { level: 18, name: "子职特性", description: "获得你所选的术士子职 18 级特性。" },
        { level: 19, name: "传奇恩惠", description: "获得一项传奇恩惠专长（推荐：次元旅行之恩惠）。" },
        { level: 20, name: "奥术登神 (Arcane Apotheosis)", description: "先天术法激活期间，每回合一次，你可以免费（无需术法点）使用一次超魔法。" }
    ]
};

export const SORCERER_SUBCLASSES: SubclassItem[] = [
    {
        id: "sorcerer-aberrant",
        name: "畸变术法",
        parentClass: "术士",
        source: "官方规则",
        description: "异界存在触碰了你的灵魂。获得心灵感应能力。",
        features: [
            { level: 3, name: "灵能法术 (Psionic Spells)", description: "始终准备：哈达之臂, 安定心神, 侦测思想, 不谐低语, 心灵之楔 (Lv3); 哈达之欲, 短讯术 (Lv5); 艾伐黑触手, 异怪召唤术 (Lv7); 拉瑞心灵连接, 心灵遥控 (Lv9)。" },
            { level: 3, name: "传心谈话 (Telepathic Speech)", description: "附赠动作。30尺内可见生物建立心灵感应链接（距离限制魅力里数）。持续至术士等级分钟。" },
            { level: 6, name: "灵能术法 (Psionic Sorcery)", description: "施展灵能法术时，可消耗等同环阶的术法点代替法术位。以此法施展时，无视语言、姿势和无价值材料成分。" },
            { level: 6, name: "心灵防御 (Psychic Defenses)", description: "获得心灵伤害抗性。对魅惑/恐慌豁免优势。" },
            { level: 14, name: "血肉启示 (Revelation in Flesh)", description: "附赠动作消耗1+术法点变身10分钟。每点选一项：水下呼吸+游泳速度；飞行速度+悬浮；识破隐形；穿过狭窄空间+脱逃。" },
            { level: 18, name: "扭曲内爆 (Warping Implosion)", description: "魔法动作。传送至120尺内。原位置30尺内生物力量豁免，失败受3d10力场伤害并被拉向中心。长休或耗5点术法点恢复。" }
        ]
    },
    {
        id: "sorcerer-clockwork",
        name: "时械术法",
        parentClass: "术士",
        source: "官方规则",
        description: "来自机械境的秩序之力。",
        features: [
            { level: 3, name: "时械法术 (Clockwork Spells)", description: "始终准备：援助术, 警报术, 次级复原术, 防护善恶 (Lv3); 解除魔法, 防护能量伤害 (Lv5); 行动自如, 构装召唤术 (Lv7); 高等复原术, 力场墙 (Lv9)。\n此外，施法时可展现秩序显迹。" },
            { level: 3, name: "归复平衡 (Restore Balance)", description: "反应。60尺内生物即将具有优势/劣势时，使其均无效。次数=魅力调整值。长休恢复。" },
            { level: 6, name: "律令之壁 (Bastion of Law)", description: "魔法动作消耗 1-5 术法点。创造护盾（点数个d8）。受伤害时可消耗骰子减伤。持续至长休。" },
            { level: 14, name: "序列意识 (Trance of Order)", description: "附赠动作。1分钟内，对你的攻击无法具有优势，你的d20检定9或以下视为10。长休或耗5术法点恢复。" },
            { level: 18, name: "时械矩阵 (Clockwork Cavalcade)", description: "魔法动作。30尺立方。修复物品，结束6环及以下法术，治疗100点生命（随意分配）。长休或耗7术法点恢复。" }
        ]
    },
    {
        id: "sorcerer-draconic",
        name: "龙族术法",
        parentClass: "术士",
        source: "官方规则",
        description: "主要特征是龙族血统。",
        features: [
            { level: 3, name: "龙族法术 (Draconic Spells)", description: "始终准备：变身术, 繁彩球, 命令术, 龙息术 (Lv3); 恐惧术, 飞行术 (Lv5); 秘法眼, 魅惑怪物 (Lv7); 通晓传奇, 龙类召唤术 (Lv9)。" },
            { level: 3, name: "龙族体魄 (Draconic Resilience)", description: "HP上限+3，之后每级+1。未穿甲AC = 10+敏捷+魅力。" },
            { level: 6, name: "元素亲和 (Elemental Affinity)", description: "选择一种龙族伤害类型（酸/冷/火/电/毒）。该类型抗性。施展该类型法术时伤害+魅力调整值。" },
            { level: 14, name: "龙翼 (Dragon Wings)", description: "附赠动作长出翅膀。飞行速度60尺。持续1小时。长休或耗3术法点恢复。" },
            { level: 18, name: "龙族伙伴 (Draconic Companion)", description: "无需材料/专注/法术位施展《龙类召唤术》（持续1分钟）。长休恢复。" }
        ]
    },
    {
        id: "sorcerer-wild",
        name: "狂野术法",
        parentClass: "术士",
        source: "官方规则",
        description: "混乱的魔法源泉。",
        features: [
            { level: 3, name: "狂野魔法浪涌 (Wild Magic Surge)", description: "每回合一次，施展1环+法术后，可投d20。若为20，触发狂野魔法浪涌效应。" },
            { level: 3, name: "混乱之潮 (Tides of Chaos)", description: "获得一次优势（d20检定前声明）。使用后，下次施展术士法术将自动触发狂野魔法浪涌，然后恢复此特性。长休恢复。" },
            { level: 6, name: "扭曲幸运 (Bend Luck)", description: "反应消耗1术法点。可见生物d20检定后，加/减 1d4。" },
            { level: 14, name: "受控混沌 (Controlled Chaos)", description: "触发浪涌时，投两次，自选其一。" },
            { level: 18, name: "驯服浪涌 (Tamed Surge)", description: "施法后，可直接选择浪涌表中的一个效应（除重掷外），若有掷骰则必须掷骰。长休恢复。" }
        ]
    }
];
