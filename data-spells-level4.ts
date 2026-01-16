
import { SpellItem } from './types';

export const SPELL_DB_LEVEL_4: SpellItem[] = [
  {
    id: "arcane-eye", name: "秘法眼", source: "官方规则",
    level: 4, school: "预言", castingTime: "动作", range: "30 尺", components: "V, S, M (一点蝙蝠毛皮)", duration: "专注，至多 1 小时",
    classes: ["法师"],
    description: "你在施法距离内创造出一个漂浮在空中，不受伤害的隐形魔法眼。你通过精神连接接收秘法眼传来的视觉信息。秘法眼拥有 30 尺黑暗视觉且可以观察任何方向。\n以一个附赠动作，你可以让秘法眼向任意方向移动 30 尺。固体障碍物会阻挡秘法眼的移动，但它可以穿过任何直径大于 1 寸的缝隙。"
  },
  {
    id: "aura-of-life", name: "生命灵光", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "自身", components: "V", duration: "专注，至多 10 分钟",
    classes: ["牧师", "圣武士"],
    description: "一道灵光自你身上发出并形成 30 尺半径的光环。在灵光范围内时，你和你的盟友获得对暗蚀伤害的抗性，生命值上限也无法被降低。另外，生命值为 0 的盟友在灵光范围内开始其回合时，恢复 1 点生命值。"
  },
  {
    id: "aura-of-purity", name: "净化灵光", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "自身", components: "V", duration: "专注，至多 10 分钟",
    classes: ["牧师", "圣武士"],
    description: "一道灵光自你身上发出并形成 30 尺半径的光环。在灵光范围内时，你和你的盟友获得毒素伤害的抗性，并且在为抵抗和结束下列状态所做的豁免时具有优势：目盲、魅惑、耳聋、恐慌、麻痹、中毒、震慑。"
  },
  {
    id: "banishment", name: "放逐术", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "30 尺", components: "V, S, M (一颗五芒星)", duration: "专注，至多 1 分钟",
    classes: ["牧师", "圣武士", "术士", "魔契师", "法师"],
    description: "一个在你施法距离内你可见的生物必须进行一次魅力豁免，豁免失败者会在法术持续期间被转移到一个无害的半位面，身处半位面期间，目标会陷入失能状态。当法术终止时，目标将重新出现在其被放逐前的位置。\n若该目标的生物类型为异怪、天族、元素、妖精或邪魔，则在法术持续一分钟后，目标不会返回。该目标会被改为转移到与其生物类型相关的一个位面中的随机地点。\n**升环施法**: 使用的法术位每比四环高一环，你就能多指定一个生物作为此法术的目标。"
  },
  {
    id: "blight", name: "枯萎术", source: "官方规则",
    level: 4, school: "死灵", castingTime: "动作", range: "30 尺", components: "V, S", duration: "立即",
    classes: ["德鲁伊", "术士", "魔契师", "法师"],
    description: "一个在你施法距离内你可见的生物必须进行一次体质豁免，豁免失败者受到 8d8 暗蚀伤害，成功则只受到一半伤害。生物类型为植物的生物在此豁免中自动失败。\n作为此法术的另一种用法，你可以指定一个并非生物的非魔法植物为目标（如树木或灌木），该植物不进行豁免，直接凋谢死亡。\n**升环施法**: 使用的法术位每比四环高一环，此法术的伤害就提升 1d8。"
  },
  {
    id: "charm-monster", name: "魅惑怪物", source: "官方规则",
    level: 4, school: "惑控", castingTime: "动作", range: "30 尺", components: "V, S", duration: "1 小时",
    classes: ["吟游诗人", "德鲁伊", "术士", "魔契师", "法师"],
    description: "一名你可见的施法距离内的生物进行一次感知豁免，如果你或者你的盟友正在与它战斗，它在这次豁免上具有优势。豁免失败，则目标陷入魅惑状态直至法术结束，或在你或你的盟友对它造成伤害时提前结束。魅惑生物将对你友好。\n**升环施法**: 使用的法术位每比四环高一环，你就可以额外指定一名生物作为此法术的目标。"
  },
  {
    id: "compulsion", name: "强迫术", source: "官方规则",
    level: 4, school: "惑控", castingTime: "动作", range: "30 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人"],
    description: "每名你所选择的，施法距离内你可见的生物必须成功通过一次感知豁免，否则陷入魅惑状态直至法术结束。\n法术持续期间，你能够以一个附赠动作指向你的某个水平方向。随后，每个魅惑目标在其下一回合里必须使用其所有的移动力，采取最安全的路线，尽可能的向该方向移动。"
  },
  {
    id: "confusion", name: "困惑术", source: "官方规则",
    level: 4, school: "惑控", castingTime: "动作", range: "90 尺", components: "V, S, M (三颗坚果壳)", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "德鲁伊", "术士", "法师"],
    description: "你选择施法距离内一点为中心，半径 10 尺球状区域内的每名生物必须成功通过一次感知豁免，否则目标不能执行反应和附赠动作，并且必须在其每个回合开始时掷 1d10，根据下表内容来决定当前回合的行为。\n\n| 1d10 | 当前回合行为 |\n|---|---|\n| 1 | 目标不执行任何动作，并使用所有移动力来进行移动。投掷 1d4 决定其方向：1 北；2 东；3 南；4 西。 |\n| 2-6 | 目标不进行移动也不执行任何动作。 |\n| 7-8 | 该生物不进行移动，执行攻击动作来对其触及内一名随机生物发动一次近战攻击。如果没有生物在其触及内，则目标本回合不执行任何动作。 |\n| 9-10 | 该生物自行决定当前回合行为。 |\n\n**升环施法**: 使用的法术位每比四环高一环，此法术的球状区域半径就增加 5 尺。"
  },
  {
    id: "conjure-minor-elementals", name: "咒唤微元素群", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "自身", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊", "法师"],
    description: "你在持续时间内将来自元素位面的精魂咒唤在你身周 15 尺光环区域内。直到法术结束为止，你进行的任何攻击检定命中光环区域内的生物时，都会额外造成 2d8 点伤害。额外伤害的类型为强酸、寒冷、火焰或闪电的一种（在你发动攻击时选择）。\n此外，光环区域内的地面对你的敌人而言是困难地形。\n**升环施法**: 使用的法术位每比四环高一环，此法术的伤害就增加 1d8。"
  },
  {
    id: "conjure-woodland-beings", name: "咒唤林地卫士", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "自身", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊", "游侠"],
    description: "你在持续时间内将许多自然精魂咒唤在你身周 10 尺光环区域内。每当光环区域进入一名你可见生物所在的空间时、一名你可见的生物进入光环区域或是在该区域结束其回合时，你都可以迫使该生物进行一次感知豁免检定。失败则该生物受到 5d8 力场伤害，成功则只受一半伤害。一名生物一回合只需要进行一次该豁免。\n此外，在持续时间内，你能够以附赠动作执行撤离动作。\n**升环施法**: 使用的法术位每比四环高一环，此法术的伤害就增加 1d8。"
  },
  {
    id: "control-water", name: "操控水体", source: "官方规则",
    level: 4, school: "变化", castingTime: "动作", range: "300 尺", components: "V, S, M (水尘混合物)", duration: "专注，至多 10 分钟",
    classes: ["牧师", "德鲁伊", "法师"],
    description: "你控制你指定的一处边长至多 100 尺的立方区域中的任意水体。从以下效应中选择其一生效：\n• **上涨 (Flood)**: 水位上涨 20 尺，或制造波浪冲翻载具。\n• **分水 (Part Water)**: 形成沟壑和水墙。\n• **转向 (Redirect Flow)**: 改变水流方向。\n• **漩涡 (Whirlpool)**: 形成漩涡，拉扯生物并造成 2d8 钝击伤害（力量豁免减半）。"
  },
  {
    id: "death-ward", name: "防死结界", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "触碰", components: "V, S", duration: "8 小时",
    classes: ["牧师", "圣武士"],
    description: "你触摸一名生物，并给予其对死亡的防护。在法术结束前，当目标的生命值首次降至 0 时，该目标的生命值改为降至 1，随后法术终止。\n目标受到直接致死而不造成伤害的效应影响时，若该法术仍在生效，则改为目标受到的致死效应失效，随后法术终止。"
  },
  {
    id: "dimension-door", name: "任意门", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "500 尺", components: "V", duration: "立即",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "你将传送至施法距离内的一处地点。你会准确到达该目的地。你还可以带上一名自愿生物一同传送。\n如果你、你携带的生物、或两者均将被传送至一处已被一名生物占据、或被一个或更多物件填满的空间中，则你和任何与你一起传送的生物都将受到 4d6 点力场伤害，且传送失败。"
  },
  {
    id: "divination", name: "预言术", source: "官方规则",
    level: 4, school: "预言", castingTime: "动作或仪式", range: "自身", components: "V, S, M (价值25+GP的熏香)", duration: "立即",
    classes: ["牧师", "德鲁伊", "法师"],
    description: "此法术让你得以与一名神祇或其仆人取得联络。你可以就某个未来 7 日内将要发生的特定目标、事件或活动提出一个问题。DM 将给予你真实的答复。\n若你在完成一次长休前施展多于一次该法术，则法术有概率不给出任何结果。此概率从第二次施展起每次累计 25％。"
  },
  {
    id: "dominate-beast", name: "支配野兽", source: "官方规则",
    level: 4, school: "惑控", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "游侠", "术士"],
    description: "一名施法距离内你可见的野兽必须成功于一次感知豁免，否则在持续时间内陷入魅惑状态。该野兽被魅惑期间，只要你与其处于同一位面就可以与之保持心灵感应，并命令其行动（无需动作）。\n**升环施法**: 使用更高环阶法术位施展时，你的专注能持续更长时间，五环至多 10 分钟，六环至多 1 小时，七环及以上至多 8 小时。"
  },
  {
    id: "evards-black-tentacles", name: "艾伐黑触手", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (一根触手)", duration: "专注，至多 1 分钟",
    classes: ["法师"],
    description: "蠕动的乌黑触须填满了一处施法距离内你可见的 20 尺方状地面。在法术持续时间内，这些触手会将此区域地面变为困难地形。\n每名区域内的生物进行一次力量豁免。豁免失败受到 3d6 点钝击伤害，并且直到法术结束为止陷入束缚状态。一名被束缚的生物可以用一个动作进行一次力量（运动）检定对抗你的法术豁免 DC，若检定成功则结束其身上的束缚状态。"
  },
  {
    id: "fabricate", name: "鬼斧神工", source: "官方规则",
    level: 4, school: "变化", castingTime: "10 分钟", range: "120 尺", components: "V, S", duration: "立即",
    classes: ["法师"],
    description: "你将一种原材料转化成该材料制作的成品。例如，你可以将一丛树木转化为一座木桥。你只有对制作某物品的工匠工具拥有熟练时，才能使用此法术去制作相应需要高工艺水平制作的物品（如武器、护甲）。"
  },
  {
    id: "fire-shield", name: "火焰护盾", source: "官方规则",
    level: 4, school: "塑能", castingTime: "动作", range: "自身", components: "V, S, M (磷或萤火虫)", duration: "10 分钟",
    classes: ["德鲁伊", "术士", "法师"],
    description: "轻薄缥缈的火焰在法术持续期间环绕着你的身体，散发出光照。这层火焰可以为你提供一面温暖护盾（抗寒冷伤害）或冻寒护盾（抗火焰伤害）。\n此外，每当一名距你 5 尺内的生物以一次近战攻击命中你时，这个护盾将迸发出火焰，对攻击者造成 2d8 点火焰伤害（温暖护盾）或寒冷伤害（冻寒护盾）。"
  },
  {
    id: "fount-of-moonlight", name: "月光涌泉", source: "官方规则",
    level: 4, school: "塑能", castingTime: "动作", range: "自身", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["吟游诗人", "德鲁伊"],
    description: "一道冷冽光芒在法术持续时间内缭绕你身。直到法术结束，你具有光耀伤害的抗性，并且你的近战攻击在命中时额外造成 2d6 点光耀伤害。\n此外，在你受到距你 60 尺内一名你可见的生物的伤害后，你可以立即用一个反应，强迫其进行一次体质豁免。豁免失败者直到你的下个回合结束为止陷入目盲状态。"
  },
  {
    id: "freedom-of-movement", name: "行动自如", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "触碰", components: "V, S, M (一条皮带)", duration: "1 小时",
    classes: ["吟游诗人", "牧师", "德鲁伊", "游侠"],
    description: "你触碰一个自愿生物，并使目标在法术持续时间内移动时不受困难地形限制，并且任何法术或其他魔法效应都不能降低目标的速度，或者使目标陷入麻痹或束缚状态。目标还会获得等同于其速度的游泳速度。\n**升环施法**: 使用的法术位每比四环高一环，你就可以额外再指定一名生物作为此法术的目标。"
  },
  {
    id: "giant-insect", name: "巨虫术", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊"],
    description: "你召唤一只巨化的蜈蚣、蜘蛛或黄蜂。其使用下文巨虫的数据。该生物是你的盟友，遵从口头指令。\n\n**巨虫 Giant Insect**\n大型野兽，无阵营\nAC 11+法术环阶 | HP 30 + 10/每升一环\n速度 40尺，攀爬40尺，飞行40尺（仅黄蜂）\n属性: 力17 敏13 体15 智4 感14 魅3\n**特质**: 蛛行 (Spider Climb)\n**动作 - 多重攻击**: 发动等于法术环阶一半次数的攻击。\n**动作 - 猛毒刺**: 近战攻击。命中: 1d6+3+法术环阶 穿刺伤害 + 1d4 毒素伤害。\n**动作 - 蛛网箭 (蜘蛛)**: 远程攻击 (60尺)。命中: 1d10+3+法术环阶 钝击伤害，且目标速度降为 0。\n**附赠动作 - 剧毒喷涌 (蜈蚣)**: 体质豁免失败则中毒。\n\n**升环施法**: 在生物数据中使用更高的法术环阶。"
  },
  {
    id: "grasping-vine", name: "擒抱藤", source: "官方规则",
    level: 4, school: "咒法", castingTime: "附赠动作", range: "60 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "游侠"],
    description: "你召唤一条藤蔓使其从地面的空间中破土而出。对一名距藤蔓 30 尺内的生物进行一次近战法术攻击。命中时，目标受到 4d8 点钝击伤害并被往藤蔓所在方向拉近 30 尺。如果目标体型不超过巨型，则目标同时陷入受擒状态。\n**升环施法**: 使用的法术位每比四环高一环，藤蔓便可额外擒抱一名生物。"
  },
  {
    id: "greater-invisibility", name: "高等隐形术", source: "官方规则",
    level: 4, school: "幻术", castingTime: "动作", range: "触碰", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "术士", "法师"],
    description: "触碰一名生物，该生物直到法术结束之前具有隐形状态（攻击或施法不会打断隐形）。"
  },
  {
    id: "guardian-of-faith", name: "信仰守卫", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "30 尺", components: "V", duration: "8 小时",
    classes: ["牧师"],
    description: "一名大型灵体守护者出现在施法距离内一处空间。任何敌人在一回合内首次进入距守护者 10 尺内或于其 10 尺内开始其回合时，必须进行一次敏捷豁免。豁免失败受到 20 点光耀伤害，豁免成功则伤害减半。守护者在造成总计 60 点伤害后随即消失。"
  },
  {
    id: "hallucinatory-terrain", name: "幻景", source: "官方规则",
    level: 4, school: "幻术", castingTime: "10 分钟", range: "300 尺", components: "V, S, M (一颗蘑菇)", duration: "24 小时",
    classes: ["吟游诗人", "德鲁伊", "魔契师", "法师"],
    description: "你使施法距离内一处 150 尺立方区域内的自然地形在视觉、听觉、嗅觉上都像是另一种自然地形。地形的触觉特征不会改变。"
  },
  {
    id: "ice-storm", name: "冰风暴", source: "官方规则",
    level: 4, school: "塑能", castingTime: "动作", range: "300 尺", components: "V, S, M (一只连指手套)", duration: "立即",
    classes: ["德鲁伊", "术士", "法师"],
    description: "以施法距离内一点为中心的一处半径 20 尺，高 40 尺的柱状区域内降下冰雹。每个处在范围内的生物都必须进行一次敏捷豁免，豁免失败者将受到 2d10 点钝击伤害和 4d6 点寒冷伤害，豁免成功则受到一半伤害。地面变为困难地形。\n**升环施法**: 使用的法术位每比四环高一环，此法术的钝击伤害就增加 1d10。"
  },
  {
    id: "leomunds-secret-chest", name: "李欧蒙秘藏箱", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "触碰", components: "V, S, M (价值5000GP+的箱子及50GP+的模型)", duration: "直至解除",
    classes: ["法师"],
    description: "你将一个箱子及其内容物藏在以太位面。你可以使用模型召回箱子或将其送回。60 日之后，法术的效应会每日累计 5% 的概率自动结束。"
  },
  {
    id: "locate-creature", name: "生物定位术", source: "官方规则",
    level: 4, school: "预言", castingTime: "动作", range: "自身", components: "V, S, M (一块寻血猎犬的皮毛)", duration: "专注，至多 1 小时",
    classes: ["吟游诗人", "牧师", "德鲁伊", "圣武士", "游侠", "法师"],
    description: "你点名或描述一个你熟悉的生物。只要该生物与你相距不超过 1000 尺，你就会感测到该生物的方位。如果该生物正在移动，则你也将知晓其移动的方向。"
  },
  {
    id: "mordenkainens-faithful-hound", name: "魔邓肯忠犬", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "30 尺", components: "V, S, M (一支银哨)", duration: "8 小时",
    classes: ["法师"],
    description: "你在该处创造出一只幻影守护犬。只有你能看见守护犬。当一个体型不小于小型的生物进入守护犬 30 尺内时，如果该生物无法说出你在施法时设定的口令，守护犬则会开始大声吠叫。\n在你的每回合开始时，守护犬会尝试啮咬其 5 尺范围内的一个敌人。该生物进行一次敏捷豁免，失败则受到 4d8 点力场伤害。"
  },
  {
    id: "mordenkainens-private-sanctum", name: "魔邓肯私人密室", source: "官方规则",
    level: 4, school: "防护", castingTime: "10 分钟", range: "120 尺", components: "V, S, M (一片薄铅)", duration: "24 小时",
    classes: ["法师"],
    description: "你对施法距离内一片区域施以魔法防护。从下列词条中选择一种或多种生效：声音阻断、视觉阻断、预言传感器阻断、预言目标阻断、传送阻断、位面旅行阻断。\n**升环施法**: 使用的法术位每比四环高一环，此法术立方区域的边长就可以增加 100 尺。"
  },
  {
    id: "otilukes-resilient-sphere", name: "欧提路克弹力法球", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "30 尺", components: "V, S, M (一颗玻璃球)", duration: "专注，至多 1 分钟",
    classes: ["法师"],
    description: "一颗微微发光的法球将施法距离内一个大型或更小的生物或物件封在其中。非自愿的生物必须成功通过一次敏捷豁免，否则在法术持续时间内被封在球体中。任何事物都不能穿透障壁进出其内。球体免疫一切伤害。"
  },
  {
    id: "phantasmal-killer", name: "魅影杀手", source: "官方规则",
    level: 4, school: "幻术", castingTime: "动作", range: "120 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "法师"],
    description: "你创造一道只有目标能看见的幻象。目标生物进行一次感知豁免。豁免失败时，目标受到 4d10 点心灵伤害，且在法术持续时间内进行的所有属性检定与攻击检定都具有劣势。目标在其每回合结束时进行一次感知豁免，豁免失败将再次受到心灵伤害。\n**升环施法**: 使用的法术位每比四环高一环，此法术的伤害就增加 1d10。"
  },
  {
    id: "polymorph", name: "变形术", source: "官方规则",
    level: 4, school: "变化", castingTime: "动作", range: "60 尺", components: "V, S, M (一枚毛毛虫茧)", duration: "专注，至多 1 小时",
    classes: ["吟游诗人", "德鲁伊", "术士", "法师"],
    description: "你尝试将施法距离内你可见的一名生物转变为一只野兽。目标必须成功于一次感知豁免，否则在持续时间内被变形为野兽形态。目标获得等于其野兽形态生命值的临时生命值。"
  },
  {
    id: "staggering-smite", name: "惊惧斩", source: "官方规则",
    level: 4, school: "惑控", castingTime: "附赠动作", range: "自身", components: "V", duration: "立即",
    classes: ["圣武士"],
    description: "被该次攻击检定命中的目标会在此次攻击中额外受到 4d6 点心灵伤害。该目标必须进行一次感知豁免，豁免失败则目标陷入震慑状态直到你的下个回合结束。\n**升环施法**: 额外伤害增加 1d6 (每升一环)。"
  },
  {
    id: "stone-shape", name: "塑石术", source: "官方规则",
    level: 4, school: "变化", castingTime: "动作", range: "触碰", components: "V, S, M (软粘土)", duration: "立即",
    classes: ["牧师", "德鲁伊", "法师"],
    description: "你触碰一个体积为中型或更小的石质物件或某块岩石在任何方向都不超过 5 尺的一部分，并将其塑造成你想要的任意形状。"
  },
  {
    id: "stoneskin", name: "石肤术", source: "官方规则",
    level: 4, school: "防护", castingTime: "动作", range: "触碰", components: "V, S, M (价值100GP+的钻石粉末)", duration: "专注，至多 1 小时",
    classes: ["德鲁伊", "游侠", "术士", "法师"],
    description: "在法术结束前，你触碰的一个自愿生物获得对钝击、穿刺、挥砍伤害的抗性。"
  },
  {
    id: "summon-aberration", name: "异怪召唤术", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (价值400GP+的材料)", duration: "专注，至多 1 小时",
    classes: ["魔契师", "法师"],
    description: "你唤来一个异怪灵魄。当你施展法术时，从类眼魔，夺心魔和史拉蟾中选择一个类别。\n\n**异怪灵魄 Aberrant Spirit**\n中型异怪，绝对中立\nAC 11+法术环阶 | HP 40 + 10/每升一环\n速度 30尺; 飞行30尺(仅类眼魔)\n属性: 力16 敏10 体15 智16 感10 魅6\n免疫: 心灵\n**特质 - 再生 (史拉蟾)**: 回合开始回复 10 HP。\n**特质 - 低语灵光 (夺心魔)**: 5尺内生物感知豁免失败受 2d6 心灵伤害。\n**动作 - 多重攻击**: 发动等于法术环阶一半次数的攻击。\n**动作**: 爪击(史拉蟾-禁疗)/眼波射线(类眼魔-远程)/灵能猛击(夺心魔-近战)。\n\n**升环施法**: 该生物的数据使用新的法术环阶。"
  },
  {
    id: "summon-construct", name: "构装召唤术", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (价值400GP+的材料)", duration: "专注，至多 1 小时",
    classes: ["法师"],
    description: "你唤来一个构装灵魄。从粘土、金属、岩石中选择一种材料。\n\n**构装灵魄 Construct Spirit**\n中型构装，绝对中立\nAC 13+法术环阶 | HP 40 + 15/每升一环\n速度 30尺\n属性: 力18 敏10 体18 智14 感11 魅5\n抗性: 毒素 | 免疫: 魅惑/力竭/恐慌/麻痹/中毒\n**特质 - 灼热之躯 (金属)**: 接触受 1d10 火焰伤害。\n**特质 - 石迷昏眠 (岩石)**: 10尺内生物感知豁免失败则速度减半且无法借机。\n**动作 - 多重攻击**: 发动等于法术环阶一半次数的猛击。\n**动作 - 猛击**: 近战攻击。命中: 1d8+4+法术环阶 钝击伤害。\n**反应 - 狂怒乱击 (粘土)**: 受伤时反击或移动。\n\n**升环施法**: 该生物的数据使用新的法术环阶。"
  },
  {
    id: "summon-elemental", name: "元素召唤术", source: "官方规则",
    level: 4, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (价值400GP+的材料)", duration: "专注，至多 1 小时",
    classes: ["德鲁伊", "游侠", "法师"],
    description: "你唤来一个元素灵魄。从气、土、火、水中选择一种元素。\n\n**元素灵魄 Elemental Spirit**\n中型元素，绝对中立\nAC 11+法术环阶 | HP 50 + 10/每升一环\n速度 40尺; 掘穴(土); 飞行(气); 游泳(水)\n属性: 力18 敏15 体17 智4 感10 魅10\n抗性/免疫: 根据元素类型获得对应抗性与免疫。\n**特质 - 不定形态 (气/火/水)**: 穿过窄缝。\n**动作 - 多重攻击**: 发动等于法术环阶一半次数的猛击。\n**动作 - 猛击**: 近战攻击。命中: 1d10+4+法术环阶 对应属性伤害。\n\n**升环施法**: 该生物的数据使用新的法术环阶。"
  },
  {
    id: "vitriolic-sphere", name: "浓酸球", source: "官方规则",
    level: 4, school: "塑能", castingTime: "动作", range: "150 尺", components: "V, S, M (一滴胆汁)", duration: "立即",
    classes: ["术士", "法师"],
    description: "你指向施法距离内一点，随后爆炸，波及 20 尺半径球状区域。在该区域中的每名生物进行一次敏捷豁免。豁免失败的生物不仅将受到 10d4 点强酸伤害，其下个回合结束时还将再受到 5d4 点强酸伤害。若豁免成功，该生物只受到初始伤害的一半伤害。\n**升环施法**: 使用的法术位每比四环高一环，此法术的初始伤害便增加 2d4。"
  },
  {
    id: "wall-of-fire", name: "火墙术", source: "官方规则",
    level: 4, school: "塑能", castingTime: "动作", range: "120 尺", components: "V, S, M (一块木炭)", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "术士", "法师"],
    description: "你在施法距离内一块固体表面上创造出一面火墙（直线或环形）。火墙出现时，所有位于火墙所占据的区域内的生物必须进行一次敏捷豁免。豁免失败，受到 5d8 火焰伤害。豁免成功，则只受一半伤害。\n施展该法术时，你选择火墙的哪一侧会造成伤害。生物在火墙造成伤害一侧 10 尺内或火墙所占据的区域内结束其回合时将受到 5d8 火焰伤害。\n**升环施法**: 使用的法术位每比四环高一环，此法术造成的伤害就提高 1d8。"
  }
];
