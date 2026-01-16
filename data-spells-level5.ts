
import { SpellItem } from './types';

export const SPELL_DB_LEVEL_5: SpellItem[] = [
  {
    id: "animate-objects", name: "活化物件", source: "官方规则",
    level: 5, school: "变化", castingTime: "动作", range: "120 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "术士", "法师"],
    description: "在施法距离内指定一定数量的未被携带或着装、也未被固定在一处表面的非超巨型非魔法物件作为法术目标。可活化物件的最大数量等于你的施法属性调整值，中型或更小的目标计为一个物件，大型目标计为两个物件，巨型目标计为三个物件。\n被指定的目标会活化并长出腿来，变成一名构装，并使用活化物件的数据。该生物受到你的控制。直至法术结束前，你都可以使用一个附赠动作并以精神命令操纵距离你 500 尺内任何你用此法术唤起的生物。\n\n**活化物件 Animated Object**\n巨型（或更小）的构装，无阵营\nAC 15 | HP 10(中小)/20(大)/40(巨) | 速度 30尺\n属性: 力16 敏10 体10 智3 感3 魅1\n免疫: 毒素、心灵；魅惑、力竭、恐慌、麻痹、中毒\n感官: 盲视30尺\n**动作 - 猛击**: 近战攻击检定：加值等于你的法术攻击调整值，触及5尺。命中：1d4+3（中型）、2d6+3+你的施法调整值（大型）或 2d12+3+你的施法调整值（巨型）的力场伤害。\n\n**升环施法**: 使用的法术位每比五环高一环，猛击伤害提升 1d4/1d6/1d12。"
  },
  {
    id: "antilife-shell", name: "防活物护罩", source: "官方规则",
    level: 5, school: "防护", castingTime: "动作", range: "自身 (10 尺)", components: "V, S", duration: "专注，至多 1 小时",
    classes: ["德鲁伊"],
    description: "一道灵光从你身上延伸而出并在持续时间内形成 10 尺光环。这道灵光会阻绝外面除亡灵生物和构装生物之外所有类型的生物，使它们无法穿过或触及内部。若你移动迫使受影响生物进入护罩内，则法术随之终止。"
  },
  {
    id: "awaken", name: "启蒙术", source: "官方规则",
    level: 5, school: "变化", castingTime: "8 小时", range: "触碰", components: "V, S, M (价值1000GP+的玛瑙)", duration: "立即",
    classes: ["吟游诗人", "德鲁伊"],
    description: "你利用施法的时间引导一块昂贵宝石中的魔法回路，然后触碰目标。该目标必须是一个智力小于等于 3 的野兽或是一个并非生物的自然植物。\n目标的智力会变为 10，且学会说一门你所掌握的语言。如果目标是一株自然植物，则它变为一个植物生物，并且获得移动能力。被启蒙的目标在 30 日内处于魅惑状态。"
  },
  {
    id: "banishing-smite", name: "放逐斩", source: "官方规则",
    level: 5, school: "咒法", castingTime: "附赠动作", range: "自身", components: "V", duration: "专注，至多 1 分钟",
    classes: ["圣武士"],
    description: "被该次攻击检定命中的目标会在此次攻击中额外受到 5d10 力场伤害。如果此次攻击将目标的生命值削减到 50 点或更低，则目标必须进行一次魅力豁免，豁免失败则会在法术持续期间被转移到一个无害的半位面。身处半位面期间，目标会陷入失能状态。"
  },
  {
    id: "bigbys-hand", name: "毕格比之手", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "120 尺", components: "V, S, M (一个蛋壳和一只分指手套)", duration: "专注，至多 1 分钟",
    classes: ["术士", "法师"],
    description: "你创造出一只闪烁着魔法性微光的大型手掌。这只手是一个物件，AC 20，HP 等于你的生命值上限。你可以令巨手移动至多 60 尺并造成下列效应之一（附赠动作可重复）：\n• **金刚拳**: 近战法术攻击。命中受 5d8 力场伤害。\n• **飞击掌**: 尝试推撞（力量豁免），失败则推离至多 5+5×调整值 尺。\n• **擒拿掌**: 尝试擒抱（敏捷豁免），失败则受擒。可挤压造成 4d6+调整值 钝击伤害。\n• **护身掌**: 提供半身掩护。\n**升环施法**: 每升一环，金刚拳伤害+2d8，擒拿掌伤害+2d6。"
  },
  {
    id: "circle-of-power", name: "原力法阵", source: "官方规则",
    level: 5, school: "防护", castingTime: "动作", range: "自身 (30 尺)", components: "V", duration: "专注，至多 10 分钟",
    classes: ["牧师", "圣武士", "法师"],
    description: "你在 30 尺光环区域内散发灵光。位于灵光范围期间，你和你的盟友为对抗法术或其他魔法效应而进行的豁免检定具有优势。当受该法术效应影响的生物对抗豁免成功受半数伤害的法术或魔法效应时，若其豁免成功则不受伤害。"
  },
  {
    id: "cloudkill", name: "死云术", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "120 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["术士", "法师"],
    description: "你创造一片黄绿色剧毒浓雾（20 尺半径球状）。雾气存在区域视为重度遮蔽。\n每名位于球状区域内的生物都进行一次体质豁免，豁免失败者受到 5d8 点毒素伤害，豁免成功则受到一半伤害。在你的每个回合开始时，球状区域会往远离你的方向移动 10 尺。\n**升环施法**: 使用的法术位每比五环高一环，此法术的伤害就增加 1d8。"
  },
  {
    id: "commune", name: "通神术", source: "官方规则",
    level: 5, school: "预言", castingTime: "1 分钟或仪式", range: "自身", components: "V, S, M (焚香)", duration: "1 分钟",
    classes: ["牧师"],
    description: "你与一名神明或一名神明的代理人进行联系，并询问至多三个能以“是”或“否”回答的问题。若你在完成一次长休前施展两次或更多次的该法术，则法术有一定的几率（累积 25%）不给任何答复。"
  },
  {
    id: "commune-with-nature", name: "问道自然", source: "官方规则",
    level: 5, school: "预言", castingTime: "1 分钟或仪式", range: "自身", components: "V, S", duration: "立即",
    classes: ["德鲁伊", "游侠"],
    description: "你与自然的灵魂沟通并以此获得周围环境的信息（户外 3 里，地下 300 尺）。你立即获得至多与该地域三个方面主题相关的资讯（如聚居地位置、传送门位置、强力生物位置、资源分布、水体位置）。"
  },
  {
    id: "cone-of-cold", name: "寒冰锥", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "自身 (60 尺锥状)", components: "V, S, M (一个小水晶或玻璃锥体)", duration: "立即",
    classes: ["德鲁伊", "术士", "法师"],
    description: "你释放出一团寒冷的空气。以你为源点的 60 尺锥状区域内的每名生物进行一次体质豁免。豁免失败受到 8d8 寒冷伤害，豁免成功则受到一半伤害。\n**升环施法**: 使用的法术位每比五环高一环，法术伤害就增加 1d8。"
  },
  {
    id: "conjure-elemental", name: "咒唤元素", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊", "法师"],
    description: "你将来自元素位面的大型虚幻精魂咒唤在施法距离内一处未占据空间中。选择精魄的元素类别（气/土/火/水）。\n每当一名你可见的生物进入精魂所在的空间或是在精魂 5 尺内开始其回合时，若没有生物被精魂束缚，你可以迫使其进行一次敏捷豁免检定。失败则目标受到 8d8 对应精魂类型的伤害（闪电/雷鸣/火焰/寒冷）并且陷入束缚状态。\n**升环施法**: 使用的法术位每比五环高一环，法术的伤害就增加 1d8。"
  },
  {
    id: "conjure-volley", name: "万箭齐发", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "150 尺", components: "V, S, M (一把价值1+CP的武器)", duration: "立即",
    classes: ["游侠"],
    description: "你挥舞作为施法材料的武器并选择施法距离内一点。数以百计相似的幽灵武器齐射而出。以那一点为中心，半径 40 尺、高 20 尺的柱状区域内的每名由你选择且你可见的生物进行一次敏捷豁免检定，豁免失败者将受到 8d8 力场伤害，豁免成功则只受一半伤害。"
  },
  {
    id: "contact-other-plane", name: "异界探知", source: "官方规则",
    level: 5, school: "预言", castingTime: "1 分钟或仪式", range: "自身", components: "V", duration: "1 分钟",
    classes: ["魔契师", "法师"],
    description: "你与异界实体建立精神连接。施法时进行一次 DC 15 的智力豁免。成功时，你可以询问该实体最多五个问题（回答是/否/不清楚等）。失败时，你将受到 6d6 心灵伤害并且直到你完成一次长休为止，你陷入失能状态。"
  },
  {
    id: "contagion", name: "疫病术", source: "官方规则",
    level: 5, school: "死灵", castingTime: "动作", range: "触碰", components: "V, S", duration: "7 日",
    classes: ["牧师", "德鲁伊"],
    description: "你的触碰会传染一道魔法疫病。目标必须成功通过一次体质豁免，否则受到 11d8 暗蚀伤害并陷入中毒状态。目标在中毒期间进行所选属性（你施法时选择）的豁免检定具有劣势。\n目标在其每回合结束时必须重新豁免，直至其累计三次成功或失败。若累计三次失败，其身上该法术的效应持续 7 日。"
  },
  {
    id: "creation", name: "造物术", source: "官方规则",
    level: 5, school: "幻术", castingTime: "1 分钟", range: "30 尺", components: "V, S, M (一支画笔)", duration: "特殊",
    classes: ["术士", "法师"],
    description: "你从堕影冥界取来一些暗影物质，创造一个物件（不超过 5 尺立方）。持续时间取决于材质：\n• 植物: 24 小时\n• 岩石/水晶: 12 小时\n• 贵金属: 1 小时\n• 宝石: 10 分钟\n• 精金/秘银: 1 分钟\n**升环施法**: 立方区域边长增加 5 尺。"
  },
  {
    id: "destructive-wave", name: "湮灭波", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "自身 (30 尺)", components: "V", duration: "立即",
    classes: ["圣武士"],
    description: "毁灭能量从你身上扩散而出，覆盖了 30 尺光环范围。光环范围内你选择的每个生物进行一次体质豁免。豁免失败者受到 5d6 点雷鸣伤害和 5d6 点光耀或暗蚀伤害（由你选择）并且陷入倒地状态。豁免成功只受一半伤害。"
  },
  {
    id: "dispel-evil-and-good", name: "驱逐善恶", source: "官方规则",
    level: 5, school: "防护", castingTime: "动作", range: "自身", components: "V, S, M (银粉和铁粉)", duration: "专注，至多 1 分钟",
    classes: ["牧师", "圣武士"],
    description: "法术持续时间内，天族、元素、妖精、邪魔和亡灵对你的攻击检定具有劣势。你可以使用特殊特性以提前结束法术：\n• **破咒**: 触碰一名生物，解除其被上述生物附身、魅惑或恐慌的状态。\n• **驱离**: 驱逐 5 尺内一名上述类型的生物回其家园位面（需魅力豁免失败）。"
  },
  {
    id: "dominate-person", name: "支配类人", source: "官方规则",
    level: 5, school: "惑控", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "术士", "法师"],
    description: "一名施法距离内你可见的类人生物必须成功于一次感知豁免，否则在持续时间内陷入魅惑状态。该目标被魅惑期间，只要你与其处于同一位面就可以与之保持心灵感应，并命令其行动（无需动作）。\n**升环施法**: 使用更高环阶法术位施展时，专注时间增加（六环 10 分钟，七环 1 小时，八环+ 8 小时）。"
  },
  {
    id: "dream", name: "托梦术", source: "官方规则",
    level: 5, school: "幻术", castingTime: "1 分钟", range: "特殊", components: "V, S, M (一把沙子)", duration: "8 小时",
    classes: ["吟游诗人", "魔契师", "法师"],
    description: "你（或一名信使）进入出神状态，出现在一名你认识的生物的梦中并与其交流。你可以塑造梦境。如果你让信使以可怕的形象出现，目标必须进行感知豁免，失败则无法从休息中获益并受到 3d6 心灵伤害。"
  },
  {
    id: "flame-strike", name: "焰击术", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "60 尺", components: "V, S, M (一撮硫磺)", duration: "立即",
    classes: ["牧师"],
    description: "一支辉煌火焰的立柱从上方呼啸着降落（10 尺半径、40 尺高）。区域内的每个生物必须进行一次敏捷豁免。豁免失败者将受到 5d6 点火焰伤害和 5d6 点光耀伤害，豁免成功则只受到一半伤害。\n**升环施法**: 两种伤害各增加 1d6。"
  },
  {
    id: "geas", name: "指使术", source: "官方规则",
    level: 5, school: "惑控", castingTime: "1 分钟", range: "60 尺", components: "V", duration: "30 日",
    classes: ["吟游诗人", "牧师", "德鲁伊", "圣武士", "法师"],
    description: "你对一个生物下达一条魔法命令。目标必须成功通过一次感知豁免，否则陷入魅惑状态。被魅惑生物每次做出与你的命令相悖的行为时，即受到 5d10 点心灵伤害（一日一次）。\n**升环施法**: 七/八环持续 365 日，九环永久。"
  },
  {
    id: "greater-restoration", name: "高等复原术", source: "官方规则",
    level: 5, school: "防护", castingTime: "动作", range: "触碰", components: "V, S, M (价值100GP+的钻石尘)", duration: "立即",
    classes: ["吟游诗人", "牧师", "德鲁伊", "圣武士", "游侠"],
    description: "你触碰一名生物并移除下列效应之一：1级力竭、魅惑或石化状态、诅咒、属性值减损、生命值上限降低。"
  },
  {
    id: "hallow", name: "圣居", source: "官方规则",
    level: 5, school: "防护", castingTime: "24 小时", range: "触碰", components: "V, S, M (价值1000GP+的熏香)", duration: "直至解除",
    classes: ["牧师"],
    description: "你触碰一点并将神圣力量注入该点周围区域（半径至多 60 尺）。\n**神圣防护**: 异怪、天族、元素、妖精、邪魔或亡灵不能自主进入，也不能在该区域内魅惑/恐慌/附身他人。\n**额外效果**: 可绑定一种效应（如无畏、黑暗、昼明、沉默、易伤等）。"
  },
  {
    id: "hold-monster", name: "定身怪物", source: "官方规则",
    level: 5, school: "惑控", castingTime: "动作", range: "90 尺", components: "V, S, M (一片直的小铁片)", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "指定施法距离内一个你能看见的生物。该目标必须进行一次感知豁免，豁免失败则其在法术持续时间内陷入麻痹状态。目标在其每回合结束时可以重新进行这次豁免。\n**升环施法**: 使用的法术位每比五环高一环，你就可以额外指定一个生物作为此法术的目标。"
  },
  {
    id: "insect-plague", name: "疫病虫群", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "300 尺", components: "V, S, M (一只蝗虫)", duration: "专注，至多 10 分钟",
    classes: ["牧师", "德鲁伊", "术士"],
    description: "你创造出半径 20 尺球状区域的噬人蝗虫群。虫群使区域成为困难地形并处于轻度遮蔽。\n区域内的每个生物（或首次进入/结束回合时）必须进行一次体质豁免，豁免失败则受到 4d10 穿刺伤害，成功则受到半数伤害。\n**升环施法**: 伤害增加 1d10。"
  },
  {
    id: "jallarzis-storm-of-radiance", name: "贾拉兹光辉风暴", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "120 尺", components: "V, S, M (一撮磷粉)", duration: "专注，至多 1 分钟",
    classes: ["魔契师", "法师"],
    description: "创造一场闪光和雷鸣交织的风暴（10 尺半径、40 尺高）。区域内生物陷入目盲和耳聋，且不能施展含声音成分的法术。\n处于其中的生物必须进行一次体质豁免，豁免失败受到 2d10 光耀伤害与 2d10 雷鸣伤害，豁免成功半伤。\n**升环施法**: 光耀和雷鸣伤害各增加 1d10。"
  },
  {
    id: "legend-lore", name: "通晓传奇", source: "官方规则",
    level: 5, school: "预言", castingTime: "10 分钟", range: "自身", components: "V, S, M (价值250GP+的熏香, 价值200GP+的象牙板)", duration: "立即",
    classes: ["吟游诗人", "牧师", "法师"],
    description: "点名或描述一个著名的人物，地点，或物件。该法术在你脑海中形成一段关于该事物重要传闻的简单概述。如果你选的事物其实并不著名，法术失败。"
  },
  {
    id: "mass-cure-wounds", name: "群体疗伤术", source: "官方规则",
    level: 5, school: "防护", castingTime: "动作", range: "60 尺", components: "V, S", duration: "立即",
    classes: ["吟游诗人", "牧师", "德鲁伊"],
    description: "你在一点周边 30 尺半径的球状区域内指定至多六个生物，并使每个目标生物恢复 5d8+你的施法属性调整值 点生命值。\n**升环施法**: 治疗量增加 1d8。"
  },
  {
    id: "mislead", name: "假象术", source: "官方规则",
    level: 5, school: "幻术", castingTime: "动作", range: "自身", components: "S", duration: "专注，至多 1 小时",
    classes: ["吟游诗人", "魔契师", "法师"],
    description: "你获得隐形状态，同时出现一个幻象分身。你可以通过分身的眼睛视物，用分身的耳朵聆听。你可以令分身移动并说话。"
  },
  {
    id: "modify-memory", name: "篡改记忆", source: "官方规则",
    level: 5, school: "惑控", castingTime: "动作", range: "30 尺", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "法师"],
    description: "你尝试重塑另一个生物的记忆。目标进行一次感知豁免，失败则被魅惑且陷入失能。你可以改变目标关于过去 24 小时内经历的一个持续时间不超过十分钟的事件记忆。\n**升环施法**: 可改变更久远的记忆（六环 7 日，七环 30 日，八环 1 年，九环任意时刻）。"
  },
  {
    id: "passwall", name: "穿墙术", source: "官方规则",
    level: 5, school: "变化", castingTime: "动作", range: "30 尺", components: "V, S, M (一撮芝麻)", duration: "1 小时",
    classes: ["法师"],
    description: "一处通道在施法距离内木质、泥灰、或岩石表面上出现。由你选择开口的大小，其至多宽 5 尺，高 8 尺，深 20 尺。"
  },
  {
    id: "planar-binding", name: "异界誓缚", source: "官方规则",
    level: 5, school: "防护", castingTime: "1 小时", range: "60 尺", components: "V, S, M (价值1000GP+的宝石)", duration: "24 小时",
    classes: ["吟游诗人", "牧师", "德鲁伊", "魔契师", "法师"],
    description: "你试图誓缚一名天族、元素、妖精或邪魔使其为你服务。目标必须成功通过一次魅力豁免，否则在持续时间内必须为你服务。\n**升环施法**: 持续时间增加（六环 10 日，七环 30 日，八环 180 日，九环 366 日）。"
  },
  {
    id: "raise-dead", name: "死者复活", source: "官方规则",
    level: 5, school: "死灵", castingTime: "1 小时", range: "触碰", components: "V, S, M (价值500GP+的钻石)", duration: "立即",
    classes: ["吟游诗人", "牧师", "圣武士"],
    description: "你触碰一名已死（不超过 10 日）的生物，使其以 1 点生命值回生。目标受到 -4 检定减值，每长休减少 1。"
  },
  {
    id: "rarys-telepathic-bond", name: "拉瑞心灵联结", source: "官方规则",
    level: 5, school: "预言", castingTime: "动作或仪式", range: "30 尺", components: "V, S, M (两颗蛋)", duration: "1 小时",
    classes: ["吟游诗人", "法师"],
    description: "你使得施法距离内你选择的至多八名自愿生物在法术持续时间内建立心灵连线，可以进行心灵感应交流。"
  },
  {
    id: "reincarnate", name: "转生术", source: "官方规则",
    level: 5, school: "死灵", castingTime: "1 小时", range: "触碰", components: "V, S, M (价值1000GP+的珍稀油)", duration: "立即",
    classes: ["德鲁伊"],
    description: "你触碰一名类人生物的遗体（死不超过 10 日），创造出一具新的成年身体供其灵魂居住。新种族由掷骰决定（如阿斯莫、龙裔、矮人、精灵、侏儒、歌利亚、半身人、人类、兽人、提夫林）。"
  },
  {
    id: "scrying", name: "探知术", source: "官方规则",
    level: 5, school: "预言", castingTime: "10 分钟", range: "自身", components: "V, S, M (价值1000GP+的聚焦镜)", duration: "专注，至多 10 分钟",
    classes: ["吟游诗人", "牧师", "德鲁伊", "魔契师", "法师"],
    description: "你能看见和听见一个和你处于同一存在位面上的生物。目标必须进行一次感知豁免（调整值取决于了解程度）。豁免失败则你创造出一个隐形传感器跟随目标。"
  },
  {
    id: "seeming", name: "伪装术", source: "官方规则",
    level: 5, school: "幻术", castingTime: "动作", range: "30 尺", components: "V, S", duration: "8 小时",
    classes: ["吟游诗人", "术士", "法师"],
    description: "你为施法距离内任意数量生物提供一个虚假外观。法术能改变生物的身体和装备外观。非自愿目标可进行魅力豁免。"
  },
  {
    id: "steel-wind-strike", name: "钢风斩", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "30 尺", components: "S, M (一把价值1SP+的近战武器)", duration: "立即",
    classes: ["游侠", "法师"],
    description: "你向施法距离内最多 5 个你可见的生物发起突击。向每个生物分别进行一次近战法术攻击。若命中，目标将受到 6d10 点力场伤害。之后你可以传送到其中一个目标旁。"
  },
  {
    id: "summon-celestial", name: "天界召唤术", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (价值500GP+的圣物匣)", duration: "专注，至多 1 小时",
    classes: ["牧师", "圣武士"],
    description: "你唤来一个天界灵魄（复仇圣灵或守护圣灵）。\n\n**天界灵魄 Celestial Spirit**\n大型天族，绝对中立\nAC 11+法术环阶 (+2 仅守护) | HP 40 + 10/每升一环\n速度 30尺, 飞行40尺\n属性: 力16 敏14 体16 智10 感14 魅16\n抗性: 光耀 | 免疫: 魅惑，恐慌\n**动作 - 多重攻击**: 发动等于法术环阶一半次数的攻击。\n**动作 - 光耀之弓 (复仇)**: 远程攻击。命中: 2d6+2+法术环阶 光耀伤害。\n**动作 - 光耀之锤 (守护)**: 近战攻击。命中: 1d10+3+法术环阶 光耀伤害 + 1d10 临时生命。\n**动作 - 治愈之触 (1/日)**: 恢复 2d8+法术环阶 HP。\n\n**升环施法**: 该生物的数据使用新的法术环阶。"
  },
  {
    id: "summon-dragon", name: "龙类召唤术", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (价值500GP+的物品)", duration: "专注，至多 1 小时",
    classes: ["法师"],
    description: "你唤来一个龙类灵魄。\n\n**巨龙灵魄 Draconic Spirit**\n大型龙类，绝对中立\nAC 14+法术环阶 | HP 50 + 10/每升一环\n速度 30尺, 飞行60尺, 游泳30尺\n属性: 力19 敏14 体17 智10 感14 魅14\n抗性: 酸/冷/火/电/毒 | 免疫: 魅惑，恐慌，中毒\n**特质 - 分享抗性**: 你获得灵魄的一项抗性。\n**动作 - 多重攻击**: 撕裂次数 (环阶/2) + 吐息。\n**动作 - 撕裂**: 近战攻击。命中: 1d6+4+法术环阶 穿刺伤害。\n**动作 - 吐息武器**: 30尺锥状，敏捷豁免。2d6 伤害。\n\n**升环施法**: 该生物的数据使用新的法术环阶。"
  },
  {
    id: "swift-quiver", name: "迅捷箭袋", source: "官方规则",
    level: 5, school: "变化", castingTime: "附赠动作", range: "自身", components: "V, S, M (一个箭袋)", duration: "专注，至多 1 分钟",
    classes: ["游侠"],
    description: "你施展该法术时，可以用射出箭矢或弩矢的武器进行两次攻击。随后，在法术结束前你能用附赠动作再次用这种武器发动两次攻击。法术会魔法性地生成无限弹药。"
  },
  {
    id: "synaptic-static", name: "突触静止", source: "官方规则",
    level: 5, school: "惑控", castingTime: "动作", range: "120 尺", components: "V, S", duration: "立即",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "以指定点为中心，半径 20 尺球状区域内的每个生物进行一次智力豁免。豁免失败受到 8d6 心灵伤害，成功则受到一半伤害。\n豁免失败的目标还会在接下来的 1 分钟内思想混乱（攻击、属性检定、专注豁免 -1d6）。每回合结束可重新豁免。"
  },
  {
    id: "telekinesis", name: "心灵遥控", source: "官方规则",
    level: 5, school: "变化", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["术士", "法师"],
    description: "你获得以思想移动或操纵生物或物件的能力。每回合可用魔法动作。\n• **生物**: 巨型或更小。力量豁免失败则被移动至多 30 尺并被束缚。\n• **物件**: 巨型或更小。移动至多 30 尺。若被携带需对抗持有者的力量豁免。"
  },
  {
    id: "teleportation-circle", name: "传送法阵", source: "官方规则",
    level: 5, school: "咒法", castingTime: "1 分钟", range: "10 尺", components: "V, M (价值50GP+的珍稀墨水)", duration: "1 轮",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "你在地上画出一个半径 5 尺的传送法阵，连接到同一位面上另一个你已知的永久传送法阵。开启一个传送门，持续到你下回合结束。"
  },
  {
    id: "tree-stride", name: "树跃术", source: "官方规则",
    level: 5, school: "咒法", castingTime: "动作", range: "自身", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "游侠"],
    description: "你能够进入活树木中，并从距其 500 尺内的同类树木中出来。每次进入消耗 5 尺移动力。每回合一次。"
  },
  {
    id: "wall-of-force", name: "力场墙", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "120 尺", components: "V, S, M (一块玻璃碎片)", duration: "专注，至多 10 分钟",
    classes: ["法师"],
    description: "创造一面隐形、免疫伤害的力场墙。可以是平面（10x10板块 x10）或半球状/球状（半径 10 尺）。没有任何事物可以通过物理方式穿过力场墙。"
  },
  {
    id: "wall-of-stone", name: "石墙术", source: "官方规则",
    level: 5, school: "塑能", castingTime: "动作", range: "120 尺", components: "V, S, M (一块方形花岗岩)", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊", "术士", "法师"],
    description: "创造一面坚硬的非魔法石墙（6 寸厚）。若你保持专注满 10 分钟，则石墙永久存在。"
  },
  {
    id: "yolandes-regal-presence", name: "悠兰德王者威仪", source: "官方规则",
    level: 5, school: "惑控", castingTime: "动作", range: "自身", components: "V, S, M (一顶微型皇冠)", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "法师"],
    description: "你在自身周围散发出覆盖 10 尺光环区域的可怖威严。当光环进入生物空间或生物进入光环时，迫使其进行感知豁免。失败则受到 4d6 心灵伤害并倒地，且可被推离 10 尺。成功半伤。"
  }
];
