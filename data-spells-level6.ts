
import { SpellItem } from './types';

export const SPELL_DB_LEVEL_6: SpellItem[] = [
  {
    id: "arcane-gate", name: "秘法门", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "500 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["术士", "魔契师", "法师"],
    description: "你创造两个相连的传送门。指定地面上你能看见的两处未被占据的大型空间，其中一点在法术距离内，另一点则在你身边 10 尺内。任何进入其中一个传送门的东西将从另一个传送门里出现。以一个附赠动作，你可以改变其开门的朝向。"
  },
  {
    id: "blade-barrier", name: "剑刃护壁", source: "官方规则",
    level: 6, school: "塑能", castingTime: "动作", range: "90 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["牧师"],
    description: "你创造出一面由旋转着的魔法能量剑刃组成的墙壁。墙提供四分之三掩护，而墙体所占据的空间则视为困难地形。\n所有处于墙所占据空间的生物（或进入/在其中结束回合）必须进行一次敏捷豁免，豁免失败者受到 6d10 力场伤害，成功则受到一半伤害。"
  },
  {
    id: "chain-lightning", name: "连锁闪电", source: "官方规则",
    level: 6, school: "塑能", castingTime: "动作", range: "150 尺", components: "V, S, M (三根银质别针)", duration: "立即",
    classes: ["术士", "法师"],
    description: "你放出一道闪电，射向施法距离内某个你能看见的指定目标。经过首个目标后，闪电分成三束跳向该目标 30 尺内至多 3 个其他目标。\n每个目标必须进行一次敏捷豁免。豁免失败者将受到 10d8 点闪电伤害，豁免成功受到半数伤害。\n**升环施法**: 使用的法术位每比六环高一环，跳跃后闪电就多分出一束射向一个不同的目标。"
  },
  {
    id: "circle-of-death", name: "死亡法阵", source: "官方规则",
    level: 6, school: "死灵", castingTime: "动作", range: "150 尺", components: "V, S, M (价值500GP+的黑珍珠粉)", duration: "立即",
    classes: ["术士", "魔契师", "法师"],
    description: "一阵负能量波从施法距离内你选择的一点放出，覆盖以该点为中心半径 60 尺球状区域。每个位于区域内的生物都进行一次体质豁免。豁免失败者受到 8d8 点暗蚀伤害，豁免成功则受到半数伤害。\n**升环施法**: 使用的法术位每比六环高一环，法术的伤害就增加 2d8。"
  },
  {
    id: "conjure-fey", name: "咒唤妖精", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "60 尺", components: "V, S", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊"],
    description: "你将来自妖精荒野的中型精魂咒唤在施法距离内。当精魂显现时，你可以对位于精魂 5 尺内的一名生物进行一次近战法术攻击。命中则目标受到 3d12+你施法属性调整值 的心灵伤害，并且直到你的下个回合开始为止，目标处于恐慌状态。\n在后续的你的回合中，以一个附赠动作，你可以将精魂传送至一处位于其原位置 30 尺内的空间，并再次进行攻击。\n**升环施法**: 使用的法术位每比六环高一环，法术造成的伤害就增加 1d12。"
  },
  {
    id: "contingency", name: "触发术", source: "官方规则",
    level: 6, school: "防护", castingTime: "10 分钟", range: "自身", components: "V, S, M (一尊价值1500+GP的自塑像)", duration: "10 日",
    classes: ["法师"],
    description: "选择一道五环或以下的你能够施展的法术（施法时间为动作且能以你为目标）作为凭依法术。凭依法术并不会立即生效，而是在满足特定触发条件时才生效。凭依法术的效应只能作用于你。"
  },
  {
    id: "create-undead", name: "唤起亡灵", source: "官方规则",
    level: 6, school: "死灵", castingTime: "1 分钟", range: "10 尺", components: "V, S, M (每具尸体一颗价值150+GP的缟玛瑙)", duration: "立即",
    classes: ["牧师", "魔契师", "法师"],
    description: "你只能在夜晚施展。选择至多三具中型或小型类人生物尸体。每具尸体都会变为一只你控制下的食尸鬼。你只能操纵生物 24 小时。再次施展此法术可延长控制时间。\n**升环施法**: 七环可唤起/维持 4 只食尸鬼。八环可唤起/维持 5 只食尸鬼或 2 只妖鬼/尸妖。九环可唤起/维持 6 只食尸鬼或 3 只妖鬼/尸妖或 2 只木乃伊。"
  },
  {
    id: "disintegrate", name: "解离术", source: "官方规则",
    level: 6, school: "变化", castingTime: "动作", range: "60 尺", components: "V, S, M (一块天然磁石和灰尘)", duration: "立即",
    classes: ["术士", "法师"],
    description: "你射出一道绿色射线。目标生物必须进行一次敏捷豁免，豁免失败则受 10d6+40 点力场伤害。若目标生命值因此降至 0，则目标化为灰尘。\n此法术会直接解离大型或更小的非魔法物件或魔法力场造物。\n**升环施法**: 使用的法术位每比六环高一环，伤害就提高 3d6。"
  },
  {
    id: "drawmijs-instant-summons", name: "卓姆吉瞬间召唤", source: "官方规则",
    level: 6, school: "咒法", castingTime: "1 分钟或仪式", range: "触碰", components: "V, S, M (一颗价值1000GP+的蓝宝石)", duration: "直至被解除",
    classes: ["法师"],
    description: "你触摸蓝宝石与一件物件（重不过 10 磅，长不过 6 尺）。法术在物件上留下隐形标记。你可以用一个魔法动作粉碎这颗蓝宝石，该物件将无视任何距离和位面的限制立即出现在你的手上。"
  },
  {
    id: "eyebite", name: "摄心目光", source: "官方规则",
    level: 6, school: "死灵", castingTime: "动作", range: "自身", components: "V, S", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "术士", "魔契师", "法师"],
    description: "你的眼睛变成漆黑虚空。一名你选择的 60 尺内可见生物必须成功于感知豁免，否则承受下列效应之一（沉睡、惊慌、患病）。在法术终止前你的每个回合内，你都可以使用一个魔法动作来指定另一个目标。"
  },
  {
    id: "find-the-path", name: "寻路术", source: "官方规则",
    level: 6, school: "预言", castingTime: "1 分钟", range: "自身", components: "V, S, M (价值100GP+的预言道具)", duration: "专注，至多 1 日",
    classes: ["吟游诗人", "牧师", "德鲁伊"],
    description: "你魔法性地感知到通往你所陈述地点的最直接的物理路径。你在法术持续时间内，只要和目的地在同一位面，就能够知晓目的地的远近和所在方向。"
  },
  {
    id: "flesh-to-stone", name: "石化术", source: "官方规则",
    level: 6, school: "变化", castingTime: "动作", range: "60 尺", components: "V, S, M (一根鸡蛇兽羽毛)", duration: "专注，至多 1 分钟",
    classes: ["德鲁伊", "术士", "法师"],
    description: "你尝试将一名生物变为石头。目标进行体质豁免，失败则束缚。后续每回合结束进行体质豁免。累计三次成功则法术终止，累计三次失败则陷入石化状态。"
  },
  {
    id: "forbiddance", name: "禁制术", source: "官方规则",
    level: 6, school: "防护", castingTime: "10 分钟或仪式", range: "触碰", components: "V, S, M (价值1000GP+的红宝石尘)", duration: "1 日",
    classes: ["牧师"],
    description: "你创造一个对抗魔法旅行的结界（至多 40000 平方尺）。生物无法传送进区域内或使用位面旅行进入。此外，法术可以对选定类别的生物（如邪魔、亡灵等）造成 5d10 点光耀或暗蚀伤害。"
  },
  {
    id: "globe-of-invulnerability", name: "法术无效结界", source: "官方规则",
    level: 6, school: "防护", castingTime: "动作", range: "自身 (10 尺光环)", components: "V, S, M (一颗玻璃珠)", duration: "专注，至多 1 分钟",
    classes: ["术士", "法师"],
    description: "一道固定的微光屏障出现在你 10 尺光环区域的边缘上。任何在屏障外施展的五环或更低环阶的法术无法影响其内的任何东西。\n**升环施法**: 使用的法术位每比六环高一环，屏障能阻挡的法术就高一环。"
  },
  {
    id: "guards-and-wards", name: "铜墙铁壁", source: "官方规则",
    level: 6, school: "防护", castingTime: "1 小时", range: "触碰", components: "V, S, M (一根10+GP的银权杖)", duration: "24 小时",
    classes: ["吟游诗人", "法师"],
    description: "你制造一个受保护区域（至多 2500 平方尺）。解除魔法无法直接解除本法术。效应包括：过道重度遮蔽且方向混淆、门被秘法锁锁住并可被幻象掩盖、楼梯布满蛛网。你还可以布置额外的魔法效应（如舞光术、魔嘴术、臭云术、造风术、暗示术）。"
  },
  {
    id: "harm", name: "重伤术", source: "官方规则",
    level: 6, school: "死灵", castingTime: "动作", range: "60 尺", components: "V, S", duration: "立即",
    classes: ["牧师"],
    description: "你对施法距离内一个你可见的生物降下恶毒致命的魔法。目标必须通过一次体质豁免，豁免失败将受到 14d6 点暗蚀伤害，并且它的生命值上限会降低等同伤害数值点。豁免成功则仅受到一半伤害。"
  },
  {
    id: "heal", name: "医疗术", source: "官方规则",
    level: 6, school: "防护", castingTime: "动作", range: "60 尺", components: "V, S", duration: "立即",
    classes: ["牧师", "德鲁伊"],
    description: "指定施法距离内一个你能看见的生物。使其恢复 70 点生命值。该法术也会终止正在影响目标的目盲、耳聋以及中毒状态。\n**升环施法**: 使用的法术位每比六环高一环，此法术的治疗量就增加 10 点。"
  },
  {
    id: "heroes-feast", name: "英雄宴", source: "官方规则",
    level: 6, school: "咒法", castingTime: "10 分钟", range: "自身", components: "V, S, M (价值1000GP+的碗)", duration: "立即",
    classes: ["吟游诗人", "牧师", "德鲁伊"],
    description: "你咒唤一场盛宴（至多十二个生物）。享用 1 小时后，所有生物获得：毒素伤害抗性、中毒与恐慌免疫、生命值上限提高 2d10 点（并获得等量生命值）。持续 24 小时。"
  },
  {
    id: "magic-jar", name: "魔魂壶", source: "官方规则",
    level: 6, school: "死灵", castingTime: "1 分钟", range: "自身", components: "V, S, M (价值500GP+的容器)", duration: "直到被解除",
    classes: ["法师"],
    description: "你的灵魂离开身体进入容器。你可以尝试附身于 100 尺内你可见的类人生物。目标进行魅力豁免，失败则被附身。附身成功后，你控制其身体。"
  },
  {
    id: "mass-suggestion", name: "群体暗示术", source: "官方规则",
    level: 6, school: "惑控", castingTime: "动作", range: "60 尺", components: "V, M (一条蛇的舌头)", duration: "24 小时",
    classes: ["吟游诗人", "术士", "法师"],
    description: "你以魔法影响施法距离内至多十二个你能看见的生物，并对其施以某种行动暗示。每个目标必须进行一次感知豁免，豁免失败者将陷入魅惑状态，并尽其所能地从事你所暗示的行为。\n**升环施法**: 七环 10 日，八环 30 日，九环 366 日。"
  },
  {
    id: "move-earth", name: "地动术", source: "官方规则",
    level: 6, school: "变化", castingTime: "动作", range: "120 尺", components: "V, S, M (微缩铲子)", duration: "专注，至多 2 小时",
    classes: ["德鲁伊", "术士", "法师"],
    description: "指定 40 尺区域，你可以重塑泥土，沙土或黏土。可以升高/降低地面、制造/填平沟渠。每 10 分钟可完成一次变换。不能影响天然岩石或石制建筑。"
  },
  {
    id: "otilukes-freezing-sphere", name: "欧提路克冰封法球", source: "官方规则",
    level: 6, school: "塑能", castingTime: "动作", range: "300 尺", components: "V, S, M (微缩水晶球)", duration: "立即",
    classes: ["术士", "法师"],
    description: "一颗冰球迸裂为半径 60 尺的球状区域。区域内的每个生物必须进行一次体质豁免。豁免失败者受到 10d6 点寒冷伤害，豁免成功则只受一半伤害。若击中水体可冻结水面。\n**升环施法**: 使用的法术位每比六环高一环，其伤害就增加 1d6。"
  },
  {
    id: "ottos-irresistible-dance", name: "奥图迷舞", source: "官方规则",
    level: 6, school: "惑控", castingTime: "动作", range: "30 尺", components: "V", duration: "专注，至多 1 分钟",
    classes: ["吟游诗人", "法师"],
    description: "一名生物必须进行一次感知豁免。豁免失败则陷入魅惑状态，必须消耗所有移动力跳舞，且攻击检定和敏捷豁免具有劣势。目标可用动作尝试重新豁免。"
  },
  {
    id: "planar-ally", name: "异界誓盟", source: "官方规则",
    level: 6, school: "咒法", castingTime: "10 分钟", range: "60 尺", components: "V, S", duration: "立即",
    classes: ["牧师"],
    description: "你祈求一名异界实体的援助。该实体将派遣一名天族、元素或邪魔来援助你。你可以用报酬为交换请求其提供服务。"
  },
  {
    id: "programmed-illusion", name: "预置幻象", source: "官方规则",
    level: 6, school: "幻术", castingTime: "动作", range: "120 尺", components: "V, S, M (价值25GP+的玉粉)", duration: "直至被解除",
    classes: ["吟游诗人", "法师"],
    description: "你创造一个幻象，此幻象在满足特定触发条件时会被激活（持续至多 5 分钟）。幻术终止后休眠 10 分钟可再次激活。"
  },
  {
    id: "summon-fiend", name: "邪魔召唤术", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "90 尺", components: "V, S, M (价值600GP+的血)", duration: "专注，至多 1 小时",
    classes: ["魔契师", "法师"],
    description: "你唤来一个邪魔灵魄（魔鬼、恶魔或尤格罗斯魔）。\n\n**邪魔灵魄 Fiendish Spirit**\n大型邪魔，绝对中立\nAC 12+法术环阶 | HP 50(恶魔)/40(魔鬼)/60(尤格罗斯魔) + 15/每升一环\n速度 40尺; 攀爬40尺(恶魔); 飞行60尺(魔鬼)\n属性: 力13 敏16 体15 智10 感10 魅16\n抗性: 火焰 | 免疫: 毒素，中毒\n**特质 - 焚身爆 (恶魔)**: 死时爆炸造成 2d10+环阶 火焰伤害。\n**动作 - 多重攻击**: 发动等于法术环阶一半次数的攻击。\n**动作 - 啃咬 (恶魔)**: 近战。命中: 1d12+3+法术环阶 暗蚀伤害。\n**动作 - 爪击 (尤格罗斯魔)**: 近战。命中: 1d8+3+法术环阶 挥砍伤害。攻击后可传送 30 尺。\n**动作 - 狂焰袭 (魔鬼)**: 远程/近战。命中: 2d6+3+法术环阶 火焰伤害。\n\n**升环施法**: 该生物的数据使用新的法术环阶。"
  },
  {
    id: "sunbeam", name: "阳炎射线", source: "官方规则",
    level: 6, school: "塑能", castingTime: "动作", range: "自身", components: "V, S, M (放大镜)", duration: "专注，至多 1 分钟",
    classes: ["牧师", "德鲁伊", "术士", "法师"],
    description: "一道阳炎射线从你手中射出（5 尺宽、60 尺长）。所有区域内的生物必须进行一次体质豁免。豁免失败者将受到 6d8 点光耀伤害并目盲。豁免成功半伤。你可以在每回合以魔法动作重新创造光线。"
  },
  {
    id: "tashas-bubbling-cauldron", name: "塔莎泡泡坩埚", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "5 尺", components: "V, S, M (价值500GP+的勺子)", duration: "10 分钟",
    classes: ["魔契师", "法师"],
    description: "你咒唤一口大锅。大锅中的液体会复制一种普通或非普通药剂。用一个附赠动作，你或盟友可以取出药水（瓶数=施法属性调整值）。"
  },
  {
    id: "transport-via-plants", name: "木遁术", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "10 尺", components: "V, S", duration: "1 分钟",
    classes: ["德鲁伊"],
    description: "在两棵同位面的大型植物间创造连接。任何生物都可以花费 5 尺移动力进入目标植物内，然后从出口植物处出来。"
  },
  {
    id: "true-seeing", name: "真知术", source: "官方规则",
    level: 6, school: "预言", castingTime: "动作", range: "触碰", components: "V, S, M (价值25GP+的蘑菇粉)", duration: "1 小时",
    classes: ["吟游诗人", "牧师", "术士", "魔契师", "法师"],
    description: "法术持续时间内，你触碰的自愿生物具有 120 尺真实视觉。"
  },
  {
    id: "wall-of-ice", name: "冰墙术", source: "官方规则",
    level: 6, school: "塑能", castingTime: "动作", range: "120 尺", components: "V, S, M (一块石英)", duration: "专注，至多 10 分钟",
    classes: ["法师"],
    description: "创造一面冰墙。冰墙形成时处于其空间的生物需敏捷豁免，失败受 10d6 寒冷伤害。冰墙被破坏后留下的寒气造成 5d6 寒冷伤害（体质豁免）。\n**升环施法**: 伤害提高。"
  },
  {
    id: "wall-of-thorns", name: "棘墙术", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "120 尺", components: "V, S, M (一把荆棘)", duration: "专注，至多 10 分钟",
    classes: ["德鲁伊"],
    description: "创造一面长满锐利棘刺的灌木之墙。棘墙出现时位于其内的生物敏捷豁免失败受 7d8 穿刺伤害。穿过棘墙每尺消耗 4 尺移动力，且需敏捷豁免，失败受 7d8 挥砍伤害。\n**升环施法**: 伤害提高 1d8。"
  },
  {
    id: "wind-walk", name: "御风而行", source: "官方规则",
    level: 6, school: "变化", castingTime: "1 分钟", range: "30 尺", components: "V, S, M (一根蜡烛)", duration: "8 小时",
    classes: ["德鲁伊"],
    description: "你和至多十个生物变为气化形态（云雾）。具有 300 尺飞行速度，抗物理伤害。变回原形需 1 分钟。"
  },
  {
    id: "word-of-recall", name: "回返真言", source: "官方规则",
    level: 6, school: "咒法", castingTime: "动作", range: "5 尺", components: "V", duration: "立即",
    classes: ["牧师"],
    description: "你和身边至多五个自愿生物瞬间传送到一个你事先设置好的圣殿。"
  }
];
