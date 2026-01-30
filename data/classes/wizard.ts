import { ClassItem, SubclassItem } from '../../types';

export const WIZARD_CLASS: ClassItem = {
    id: "wizard-2024",
    name: "法师",
    source: "官方规则",
    description: "法术书是本体\n仪式施法\n玻璃大炮\n智力巅峰\n抄书破产",
    fullDescription: "你已经入门了奥术魔法，学会了如何施展法术。参见第 7 章有关施法的规则。\n\n**施法 (Spellcasting)**\n• **戏法**: 你已知 3 个法师戏法。推荐选择光亮术、法师之手和冷冻射线。4级和10级时各习得一个额外戏法。\n• **法术位**: 长休恢复。参考法师特性表。\n• **准备法术**: 你准备 1 环及更高环阶的法术列表。从你的法术书中选择。数量随等级提升（例如1级时4道）。\n• **法术书**: 包含你已知的所有法术。初始记录 6 道 1 环法术。每升一级免费增加 2 道法术。\n• **施法属性**: 智力。\n• **法器**: 奥术法器或法术书。\n\n**奥术回想 (Arcane Recovery)**\n短休后恢复已消耗的法术位。总环阶不得超过法师等级的一半（向上取整），且均小于 6 环。每长休一次。",
    hitDie: "d6",
    primaryAbility: "智力",
    saves: ["智力", "感知"],
    tags: ["施法者", "控制", "万能"],
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
    subclasses: [],
    features: [
        { level: 1, name: "施法 (Spellcasting)", description: "你使用智力作为施法属性。你需要法术书来准备和施展法术。通过升级或抄录卷轴来扩展你的法术书。" },
        { level: 1, name: "仪式学家 (Ritual Caster)", description: "你能以仪式施展你法术书中任何带有“仪式”标签的法术。你不需要准备这些法术，但必须阅读法术书。" },
        { level: 1, name: "奥术回想 (Arcane Recovery)", description: "你完成一次短休后，可以选择恢复已消耗的法术位。所恢复的法术位环阶总和不得大于你法师等级的一半（向上取整），且任何一个法术位的环阶都必须小于六环。每长休一次。" },
        { level: 2, name: "学者 (Scholar)", description: "从下列技能中选择一项你具有熟练的技能：奥秘、历史、自然或宗教。你获得所选技能的专精（熟练加值翻倍）。" },
        { level: 3, name: "法师子职 (Wizard Subclass)", description: "选择一个法师学派：防护学派、预言学派、塑能学派或幻术学派。" },
        { level: 4, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 5, name: "记忆法术 (Memorize Spell)", description: "每当你完成一次短休时，你可以研究你的法术书，并将其中一道你已准备的法术，替换为你法术书中的另一道法术。" },
        { level: 6, name: "子职特性", description: "获得所选法师子职的 6 级特性。" },
        { level: 8, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 10, name: "子职特性", description: "获得所选法师子职的 10 级特性。" },
        { level: 12, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 14, name: "子职特性", description: "获得所选法师子职的 14 级特性。" },
        { level: 16, name: "属性值提升", description: "获得属性值提升专长或其他你满足条件的专长。" },
        { level: 18, name: "法术精通 (Spell Mastery)", description: "选择你法术书中的一个 1 环法术和一个 2 环法术（施法时间须为动作）。你总是准备这些法术，且能不消耗法术位地以最低环施展它们。长休可更换。" },
        { level: 19, name: "传奇恩惠", description: "获得一项传奇恩惠专长（推荐：法术召返之恩惠）。" },
        { level: 20, name: "招牌法术 (Signature Spells)", description: "从你的法术书中选择 2 道 3 环法术。你总是准备这些法术，且能不消耗法术位地以 3 环施展每道法术各 1 次。短休/长休恢复免费次数。" }
    ]
};

export const WIZARD_SUBCLASSES: SubclassItem[] = [
    {
        id: "wizard-abjuration",
        name: "防护学派",
        parentClass: "法师",
        source: "官方规则",
        description: "专注于保护与封印。",
        features: [
            { level: 3, name: "防护学者 (Abjuration Savant)", description: "获选 2 道不高于 2 环的防护学派法术加入法术书。每当你获得新法术环阶时，可免费获得 1 道防护法术加入法术书。" },
            { level: 3, name: "奥术守御 (Arcane Ward)", description: "施展防护法术时获得魔法护盾。HP = 2×法师等级 + 智力调整值。替你承受伤害。施展防护法术可恢复两倍环阶的 HP。附赠动作可消耗法术位恢复两倍环阶的 HP。" },
            { level: 6, name: "投射守御 (Projected Ward)", description: "反应动作。当 30 尺内可见生物受伤害时，让奥术守御代其承受当次伤害。" },
            { level: 10, name: "破法者 (Spellbreaker)", description: "总是准备《法术反制》和《解除魔法》。附赠动作施展《解除魔法》。施展这两道法术时属性检定增加熟练加值。若施展失败，不消耗法术位。" },
            { level: 14, name: "法术抗力 (Spell Resistance)", description: "你对抗法术的豁免具有优势。你对法术伤害具有抗性。" }
        ]
    },
    {
        id: "wizard-divination",
        name: "预言学派",
        parentClass: "法师",
        source: "官方规则",
        description: "窥视过去、现在与未来。",
        features: [
            { level: 3, name: "预言学者 (Divination Savant)", description: "获选 2 道不高于 2 环的预言学派法术加入法术书。每当你获得新法术环阶时，可免费获得 1 道预言法术加入法术书。" },
            { level: 3, name: "预兆 (Portent)", description: "长休后投 2 个 d20 记录结果。可用预言骰替换你或可见生物的 d20 检定（攻击/属性/豁免）。每回合限一次。长休作废。" },
            { level: 6, name: "专业预言 (Expert Divination)", description: "消耗法术位施展 2 环或更高预言法术时，恢复一个已消耗法术位（环阶须更低且不高于 5 环）。" },
            { level: 10, name: "天眼通 (The Third Eye)", description: "附赠动作获得一项增益（持续至短/长休）：120尺黑暗视觉、读懂任何语言、或不消耗法术位施展《识破隐形》。每短/长休一次。" },
            { level: 14, name: "高等预兆 (Greater Portent)", description: "预兆骰数量增加至 3 个。" }
        ]
    },
    {
        id: "wizard-evocation",
        name: "塑能学派",
        parentClass: "法师",
        source: "官方规则",
        description: "掌控元素能量与毁灭。",
        features: [
            { level: 3, name: "塑能学者 (Evocation Savant)", description: "获选 2 道不高于 2 环的塑能学派法术加入法术书。每当你获得新法术环阶时，可免费获得 1 道塑能法术加入法术书。" },
            { level: 3, name: "强力戏法 (Potent Cantrip)", description: "你的伤害类戏法即使未命中或目标豁免成功，仍能造成一半伤害（若有）。" },
            { level: 6, name: "塑形法术 (Sculpt Spells)", description: "施展塑能法术时，可指定 1+法术环阶 数量的可见生物。它们自动通过豁免，且若豁免成功减半伤害则完全不受伤害。" },
            { level: 10, name: "强效塑能 (Empowered Evocation)", description: "施展法师列表中的塑能法术时，伤害掷骰可加入智力调整值（单次）。" },
            { level: 14, name: "超限导能 (Overchannel)", description: "施展 1-5 环造成伤害的法术时，可使伤害取最大值。首次免费。之后每次受 2d12×环阶 的黯蚀伤害（无视抗性/免疫），且每次使用伤害增加 1d12。长休重置。" }
        ]
    },
    {
        id: "wizard-illusion",
        name: "幻术学派",
        parentClass: "法师",
        source: "官方规则",
        description: "编织虚假的现实。",
        features: [
            { level: 3, name: "幻术学者 (Illusion Savant)", description: "获选 2 道不高于 2 环的幻术学派法术加入法术书。每当你获得新法术环阶时，可免费获得 1 道幻术法术加入法术书。" },
            { level: 3, name: "强化幻术 (Improved Illusions)", description: "幻术无需语言成分。10 尺以上射程的幻术距离增加 60 尺。习得《次级幻影》，若已知则选其他。次级幻影可同时造声光，且可附赠动作施展。" },
            { level: 6, name: "魅影生灵 (Phantasmal Creatures)", description: "总是准备《野兽召唤术》和《妖精召唤术》。施展时可改为幻术学派（生物变虚幻）。可免费施展各一次（生物半血），长休恢复。" },
            { level: 10, name: "幻影化形 (Illusory Self)", description: "被攻击命中时，反应制造替身使攻击失手。短/长休恢复。也可消耗 2 环或更高法术位恢复使用次数。" },
            { level: 14, name: "亦真亦幻 (Illusory Reality)", description: "施展一环及以上幻术时，附赠动作使其中一个非魔法物体（无伤害/状态）变为真实，持续 1 分钟。" }
        ]
    }
];
