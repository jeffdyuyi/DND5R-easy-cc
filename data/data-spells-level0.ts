import { SpellItem } from '../types';

export const SPELL_DB_LEVEL_0: SpellItem[] = [
  // ==========================================
  // 戏法 (Cantrips) - PHB'24 Only
  // ==========================================

  {
    id: "acid-splash", name: "酸液飞溅", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "60 尺", components: "声音、姿势", duration: "立即",
    classes: ["术士", "法师"],
    description: "你在施法距离内一点创造出一颗酸液泡，以该点5尺球状范围爆发。该球状区域内的每名生物必须通过一次敏捷豁免，否则受到1d6点强酸伤害。",
    higherLevel: "*本法术*的伤害会在你达到下列等级时提升1d6：5级（2d6）、11级（3d6）以及17级（4d6）。"
  },

  {
    id: "blade-ward", name: "剑刃防护", source: "PHB'24",
    level: 0, school: "防护", castingTime: "动作", range: "自身", components: "声音、姿势", duration: "专注，至多1分钟",
    classes: ["吟游诗人", "术士", "邪术师", "法师"],
    description: "*在此法术*结束前，每当有生物对你发动攻击检定，该生物的该次攻击检定都将承受1d4减值。"
  },

  {
    id: "chill-touch", name: "颤栗之触", source: "PHB'24",
    level: 0, school: "死灵", castingTime: "动作", range: "触碰", components: "声音、姿势", duration: "立即",
    classes: ["术士", "邪术师", "法师"],
    description: "你引导出来自坟墓的刺骨阴冷，对目标进*行一次近战法术*攻击。命中时，目标将受到1d10点暗蚀伤害，并且直至你下一回合的结束前都无法恢复生命值。",
    higherLevel: "法术的伤害会在你到达下列等级时增加1d10：5级（2d10）、11级（3d10）以及17级（4d10）。"
  },

  {
    id: "dancing-lights", name: "舞光术", source: "PHB'24",
    level: 0, school: "幻术", castingTime: "动作", range: "120尺", components: "声音、姿势、材料（一点磷）", duration: "专注，至多1分钟",
    classes: ["吟游诗人", "术士", "法师"],
    description: "你在施法距离内创造至多四个火把大小的光源，*使其在法术*持续时间内看起来如同火把、灯笼或悬浮珠。或者，你可以将四个光源合并为一个发光的整体形态，使其看上去像一个模糊的中型人形。无论你选择哪种形态，每个光源都会发出10尺半径的微光光照 。\n你可以用附赠动作将光源移动至多60尺至施法距离内的一处空间。*一个由此法术*创造的光源必须始终位于任一光源周围20尺内，而超出施法距离的光源会随即熄灭。"
  },

  {
    id: "druidcraft", name: "德鲁伊伎俩", source: "PHB'24",
    level: 0, school: "变化", castingTime: "动作", range: "30尺", components: "声音、姿势", duration: "立即",
    classes: ["德鲁伊"],
    description: "你向自然精魂低语，在施法距离内创造出下述效应之一。"
  },

  {
    id: "eldritch-blast", name: "魔能爆", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "120尺", components: "声音、姿势", duration: "立即",
    classes: ["邪术师"],
    description: "你释放出一束爆裂能量射线，对施法距离内一名生物或一个物件发*动一次远程法术*攻击。命中时，目标将受1d10点力场伤害。",
    higherLevel: "到达5*级后此法术*将创造出两条射线，11级后三条，17级后四条。你可以使这些射线攻击同一个目标或分别攻击不同的目标。你需要为每条射线分别进行攻击检定。"
  },

  {
    id: "elementalism", name: "四象法门", source: "PHB'24",
    level: 0, school: "变化", castingTime: "动作", range: "30尺", components: "声音、姿势", duration: "立即",
    classes: ["德鲁伊", "术士", "法师"],
    description: "你操控元素，在施法距离内创造下述效应之一。"
  },

  {
    id: "fire-bolt", name: "火焰箭", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "120尺", components: "声音、姿势", duration: "立即",
    classes: ["术士", "法师"],
    description: "你对施法距离内一名生物或物件掷出一把火焰，对目标进*行一次远程法术*攻击。命中时，目标将受到1d10点火焰伤害。未被着装或携带的可*燃物件被该法术*命中时将开始燃烧。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d10：5级（2d10）、11级（3d10）、17级（4d10）。"
  },

  {
    id: "friends", name: "交友术", source: "PHB'24",
    level: 0, school: "惑控", castingTime: "动作", range: "10尺", components: "姿势、材料（一些化妆品）", duration: "专注，至多1分钟",
    classes: ["吟游诗人", "术士", "邪术师", "法师"],
    description: "你魔法性地向施法距离内的一名可见生物散发出友谊感。目标必须成功于一次感知豁免，*否则其在法术*持续时间内陷入*魅惑*状态。若目标并非类人生物，或者你正在与其战斗，又或者你在过去24小时内曾对其*施展过这道法术*，则其进行的此次豁免自动成功。\n若目标受到伤害，或你进行一次攻击检定、造成伤害、迫使任何人进行一次豁免，*则法术*会提早结束。法术结束时，目标会知道他曾被你*魅惑*。"
  },

  {
    id: "guidance", name: "神导术", source: "PHB'24",
    level: 0, school: "预言", castingTime: "动作", range: "触碰", components: "声音、姿势", duration: "专注，至多1分钟",
    classes: ["牧师", "德鲁伊"],
    description: "你触碰一名自愿生物并选择一项技能。*直到法术*结束为止，受术生物在进行使用到所选技能的任何属性检定时，该次检定具有1d4加值。"
  },

  {
    id: "light", name: "光亮术", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "触碰", components: "声音、材料（一只萤火虫或一片磷光苔藓）", duration: "1小时",
    classes: ["吟游诗人", "牧师", "术士", "法师"],
    description: "你触碰一个体型不超过大型，且未被他人携带/着装的物件。*在法术*终止前，物件将发出20尺半径的明亮光照以及额外20尺的微光光照。光的颜色由你决定。\n该物件被不透明的东西完全遮盖时，其光照也将被遮挡。*此法术*将在你再次施展它时提前终止。"
  },

  {
    id: "mage-hand", name: "法师之手", source: "PHB'24",
    level: 0, school: "咒法", castingTime: "动作", range: "30尺", components: "声音、姿势", duration: "1分钟",
    classes: ["吟游诗人", "术士", "邪术师", "法师"],
    description: "一只漂浮的幽灵手出现在施法距离内你指定的一点。幽灵手*持续存在至法术*终止。如果幽灵手与你之间的距离超过30尺，则幽灵手将消失不见。若你再*次施展了此法术*，现存的幽灵手也将提前消失。\n你可*以在施展该法术*时使用幽灵手实施一个行为：你可以操控一个物件、打开一扇未上锁的门或容器、将一件物品放入或取出一个打开的容器、或是将小瓶中的内容物倾倒出来。\n在后续的回合中，你可以用魔法 动作控制幽灵手再次实施上述行为之一。而作为那次动作的一部分，你还可以令幽灵手移动至多30尺。\n该幽灵手不能攻击，也不能激活魔法物品或承载超过10磅重的物质。"
  },

  {
    id: "mending", name: "修复术", source: "PHB'24",
    level: 0, school: "变化", castingTime: "1分钟", range: "触碰", components: "声音、姿势、材料（两块天然磁石）", duration: "立即",
    classes: ["吟游诗人", "牧师", "德鲁伊", "术士", "法师"],
    description: "*该法术*修复你所触碰一个物件上的一处破损或裂缝，例如修复一条断裂的链条、一把碎成两半的钥匙、一件撕裂的斗篷、一个漏了的酒袋等。只要破损或断裂处在任意方向上都不超过 1 尺，你就可以不留痕迹地修复它。\n*该法术*可以物理性地修复一件魔法物品，但无法恢复其上的魔法。"
  },

  {
    id: "message", name: "传讯术", source: "PHB'24",
    level: 0, school: "变化", castingTime: "动作", range: "120尺", components: "姿势、材料（一段铜线）", duration: "立即",
    classes: ["吟游诗人", "德鲁伊", "术士", "法师"],
    description: "你用指向施法距离内的一名生物并低声说出一段信息。该目标（且只有该目标）会听到这段信息，并且可以用只有你能听见的低语回复你。\n你可以隔着固态*物件施展此法术*，但*你必须熟悉法术*目标并知晓其就在阻挡物后方。魔法性的沉默效应，1尺厚的石头、金属或木料，或是一片薄铅都*可以阻挡此法术*。"
  },

  {
    id: "mind-sliver", name: "心灵之楔", source: "PHB'24",
    level: 0, school: "惑控", castingTime: "动作", range: "60尺", components: "声音", duration: "1轮",
    classes: ["术士", "邪术师", "法师"],
    description: "指定施法距离内一个你可见的生物，你试图暂时刺入目标的心灵。目标必须通过一次智力豁免 。豁免失败将受到1d6点心灵伤害，并且其在你的下回合结束前，进行的下一次豁免检定将获得1d4减值。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d6：5级（2d6）、11级（3d6）、17级（4d6）。"
  },

  {
    id: "minor-illusion", name: "次级幻象", source: "PHB'24",
    level: 0, school: "幻术", castingTime: "动作", range: "30尺", components: "姿势、材料（一撮羊毛）", duration: "1分钟",
    classes: ["吟游诗人", "术士", "邪术师", "法师"],
    description: "你在施法距离内创造一段声响或一个物件的影像，并*使之维持至法术*持续时间结束，详见以下对应效应的描述。你可以*再次施展该法术*来终止幻象。\n生物用研究动作调查该声响或影像时，其必须进行*一次对抗该法术*豁免 DC 的智力（调查）检定，检定成功则判断出是幻象。对于识破幻象的生物而言，幻象会变得模糊不清。"
  },

  {
    id: "poison-spray", name: "毒气喷涌", source: "PHB'24",
    level: 0, school: "死灵", castingTime: "动作", range: "30尺", components: "声音、姿势", duration: "立即",
    classes: ["德鲁伊", "术士", "邪术师", "法师"],
    description: "你向施法距离内一个你可见的生物喷出一股毒气。对目标进*行一次远程法术*攻击。命中时，目标将受1d12点毒素伤害。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d12：5级（2d12）、11级（3d12）、17级（4d12）。"
  },

  {
    id: "prestidigitation", name: "魔法伎俩", source: "PHB'24",
    level: 0, school: "变化", castingTime: "动作", range: "10尺", components: "声音、姿势", duration: "至多1小时",
    classes: ["吟游诗人", "术士", "邪术师", "法师"],
    description: "你在施法距离内创造一个魔法效应。从下述效应中选择一项。如果你*多次施展该法术*，则可以同时维持至多三个不同的非即时效应。"
  },

  {
    id: "produce-flame", name: "燃火术", source: "PHB'24",
    level: 0, school: "咒法", castingTime: "附赠动作", range: "自身", components: "声音、姿势", duration: "10分钟",
    classes: ["德鲁伊"],
    description: "一朵摇曳的火焰出现在你手中，火*焰会存在至法术*持续时间结束为止。火焰在你手中期间，不会散发任何热量也不会点燃任何东西，发出20尺半径的明亮光照，以及其外20尺范围的微光光照 。*此法术*会在你再次施展它时提前终止。\n*直到法术*结束为止，你可以用魔法动作向60尺内的一名生物或一个物件丢出火焰。进*行一次远程法术*攻击。命中时，目标将受到1d8点火焰伤害。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d8：5级（2d8）、11级（3d8）、17级（4d8）。"
  },

  {
    id: "ray-of-frost", name: "冷冻射线", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "60尺", components: "声音、姿势", duration: "立即",
    classes: ["术士", "法师"],
    description: "一道蓝白色的冰冷光束朝施法距离内的一名生物射去。对目标进*行一次远程法术*攻击。命中时，目标将受到1d8点寒冷伤害，且其速度将被减少10尺，直到你的下一回合开始为止。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d8：5级（2d8）、11级（3d8）、17级（4d8）。"
  },

  {
    id: "resistance", name: "抵抗术", source: "PHB'24",
    level: 0, school: "防护", castingTime: "动作", range: "触碰", components: "声音、姿势", duration: "专注，至多1分钟",
    classes: ["牧师", "德鲁伊"],
    description: "你触碰一名自愿生物并选择一种伤害类型：强酸、钝击、寒冷、火焰、闪电、暗蚀、穿刺、毒素、光耀、挥砍、雷鸣。*在此法术*结束之前，每当该生物受到所选类型伤害时，那名生物所受的总伤害减少1d4。一名生物一回合只能*受到一次该法术*的增益。"
  },

  {
    id: "sacred-flame", name: "圣火术", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "60 尺", components: "声音、姿势", duration: "立即",
    classes: ["牧师"],
    description: "如同烈焰般的辉光向着施法距离内你能看见的一名生物倾泻而下。目标必须要通过一次敏捷豁免，否则将受到1d8点光耀伤害。在这次豁免检定中，目标无法享受来自半身掩护和四分之三掩护 的增益。",
    higherLevel: "*该法术*的伤害会在你达到下列等级时增加1d8：5级（2d8），11 级（3d8），17 级1d8（4d8）。"
  },

  {
    id: "shillelagh", name: "橡棍术", source: "PHB'24",
    level: 0, school: "变化", castingTime: "附赠动作", range: "自身", components: "声音、姿势、材料（槲寄生）", duration: "1分钟",
    classes: ["德鲁伊"],
    description: "你将自然之力灌入手中持握的一根短棒或长棍中。*你在法术*持续时间内使用该武器进行近战攻击时，可以用你的施法属性代替力量属性来进行攻击检定和伤害掷骰，且该武器的伤害骰变为d8。此类攻击造成伤害时，你可以选择将其伤害类型改为力场伤害，或是维持武器原本的伤害类型。你*再次施展该法术*或丢掉该武器时，*该法术*也随之终止。",
    higherLevel: "到达特定等级后，受术武器的伤害骰会改变：5级（1d10），11级（1d12），17级（2d6）。"
  },

  {
    id: "shocking-grasp", name: "电爪", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "触碰", components: "声音、姿势", duration: "立即",
    classes: ["术士", "法师"],
    description: "你放出闪电，击向一名你试图触碰的生物。对目标发*动一次近战法术*攻击。若命中，则目标受到 1d8 点闪电伤害，并且在其下一回合开始前不能执行借机攻击。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d8：5级（2d8）、11级（3d8）、17级（4d8）。"
  },

  {
    id: "sorcerous-burst", name: "术法爆发", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "120尺", components: "声音、姿势", duration: "立即",
    classes: ["术士"],
    description: "你向施法距离内的一名生物或*一个物件施展术*法能量。对目标进行一次远程攻击检定，命中时，目标将受到1d8点伤害。*由你选择法术*造成何种类型的伤害：强酸，寒冷，火焰，闪电，毒素，心灵或雷鸣。\n*如果你在此法术*的任一d8骰上丢出了8，你便可以立刻再丢一枚d8，并*将其加入此法术*的伤害中。*施展此法术*时，你最多以此法造成的额外d8伤害骰数量等同于你的施法属性调整值。",
    higherLevel: "到达特定等级后，此戏法的初始伤害将增加1d8：5级（2d8）、11级（3d8）、17级（4d8）。"
  },

  {
    id: "spare-the-dying", name: "维生术", source: "PHB'24",
    level: 0, school: "死灵", castingTime: "动作", range: "15尺", components: "声音、姿势", duration: "立即",
    classes: ["牧师", "德鲁伊"],
    description: "选择一个生命值为0但还未死亡的生物，使该生物变为伤势稳定。",
    higherLevel: "到达特定等级后，*此法术*的施法距离将翻倍：5级（30尺），11级（60尺），17级（120尺）。"
  },

  {
    id: "starry-wisp", name: "点点星芒", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "60 尺", components: "声音、姿势", duration: "立即",
    classes: ["吟游诗人", "德鲁伊"],
    description: "你对施法距离内一名生物或一个物件射出一点光芒。对目标进*行一次远程法术*攻击。命中时，目标将受到1d8点光耀伤害，并且直到你的下个回合结束前，它会散发出10尺微光光照，且无法受益于隐形 状态。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d8：5级（2d8），11 级（3d8），17 级1d8（4d8）。"
  },

  {
    id: "thaumaturgy", name: "奇术", source: "PHB'24",
    level: 0, school: "变化", castingTime: "动作", range: "30尺", components: "声音", duration: "1分钟",
    classes: ["牧师"],
    description: "你在施法距离内显现一道次级奇迹。你在施法距离内创造下述效应之一。如果你多次施展该法术，则可以同时维持至多三个不同的1分钟效应。\n\n**改变眼睛 Altered Eyes**：你改变自己眼睛的外观，其效应持续1分钟。\n\n**扩音 Booming Voice**：你的语音音量变为通常情况下的三倍大，其效应持续1分钟。在此期间，你在魅力（威吓）检定上具有优势。\n\n**玩火 Fire Play**：你使一团火焰闪烁、变亮、变暗或变色，其效应持续1分钟。\n\n**看不见的手 Invisible Hand**：你使一扇没有上锁的门/窗立即打开或关上。\n\n**幻音 Phantom Sound**：指定施法距离内的一点，你使该点发出一道短暂的声音，例如雷鸣声，渡鸦叫声或不祥低语声。\n\n**震动 Tremors**：你在地面上引发无害的震动，其效应持续1分钟。"
  },

  {
    id: "thorn-whip", name: "荆棘之鞭", source: "PHB'24",
    level: 0, school: "变化", castingTime: "动作", range: "30尺", components: "声音、姿势、材料（一根带刺植物茎）", duration: "立即",
    classes: ["德鲁伊"],
    description: "你创造出一条藤蔓般的带刺长鞭，并猛抽向施法距离内一个你指定的生物。对目标进*行一次近战法术*攻击，命中时，目标将受到1d6点穿刺伤害，如果目标生物的体型不超过大型，则你还可以将其朝你所在位置拉近至多10尺。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d6：5级（2d6）、11级（3d6）、17级（4d6）。"
  },

  {
    id: "thunderclap", name: "鸣雷破", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "自身", components: "姿势", duration: "立即",
    classes: ["吟游诗人", "德鲁伊", "术士", "邪术师", "法师"],
    description: "位于以你为原点5尺光环区域内的每名生物必须成功于一次体质豁免，否则受到1d6点雷鸣伤害。*此法术*会创造出在100尺内都能听见的巨大声响。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d6：5级（2d6）、11级（3d6）、17级（4d6）。"
  },

  {
    id: "toll-the-dead", name: "亡者丧钟", source: "PHB'24",
    level: 0, school: "死灵", castingTime: "动作", range: "60尺", components: "声音、姿势", duration: "立即",
    classes: ["牧师", "邪术师", "法师"],
    description: "你对着施法距离内一名你可见的生物一指，随后目标10尺内响起一阵哀恸的钟鸣。目标必须通过一次感知豁免，否则将受到1d8点暗蚀伤害。若目标豁免失败时已损失任意数量生命值，则改为令其受到1d12点暗蚀伤害。",
    higherLevel: "到达特定等级后，此戏法的伤害骰将增加一枚：5级（2d8或2d12）、11级（3d8或3d12）、17级（4d8或4d12）。"
  },

  {
    id: "true-strike", name: "克敌先击", source: "PHB'24",
    level: 0, school: "预言", castingTime: "动作", range: "自身", components: "姿势、材料（一把价值1+CP的你熟练的武器）", duration: "立即",
    classes: ["吟游诗人", "术士", "邪术师", "法师"],
    description: "你受到一瞬魔法洞见的指引，*使用施展此法术*时使用的那把武器发动一次攻击。此次攻击使用你的施法属性（而非力量属性或敏捷属性）进行攻击检定与伤害掷骰。此次攻击造成伤害时，你可以选择将其伤害类型改为光耀伤害，或是维持武器原本的伤害类型。\n（译注：*根据术*语汇编武器攻击条目，“使用武器发动的攻击”就是“武器攻击”（与“法术攻击”并不冲突）。）",
    higherLevel: "到达特定等级后，无论你选择造成光耀伤害还是原本类型的伤害，本次攻击都会额外造成光耀伤害：5级（1d6）、11级（2d6）、17级（3d6）。"
  },

  {
    id: "vicious-mockery", name: "恶言相加", source: "PHB'24",
    level: 0, school: "惑控", castingTime: "动作", range: "60尺", components: "声音", duration: "立即",
    classes: ["吟游诗人"],
    description: "你对施法距离内一名你可见或可听的生物连珠炮式地释出一串蕴涵微妙惑控的侮辱。目标必须通过一次感知豁免，否则受到1d6点心灵伤害，且在其下一回合结束前，其进行的下一次攻击检定具有劣势。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d6：5级（2d6）、11级（3d6）、17级（4d6）。"
  },

  {
    id: "word-of-radiance", name: "光耀祷词", source: "PHB'24",
    level: 0, school: "塑能", castingTime: "动作", range: "自身", components: "声音、材料（一枚艳阳标志）", duration: "立即",
    classes: ["牧师"],
    description: "灼热的光辉喷薄而出，覆盖你周身5尺光环区域。每个区域中你可见且受你选择的生物必须通过一次体质豁免，否则受到1d6点光耀伤害。",
    higherLevel: "到达特定等级后，此戏法的伤害将增加1d6：5级（2d6）、11级（3d6）、17级（4d6）。"
  }
];
