
import { ItemItem } from '../types';

export const GEAR_DB: ItemItem[] = [
  // --- Ammunition (弹药) ---
  {
    id: "arrows", name: "箭矢 (20)", source: "官方规则", type: "弹药",
    description: "用于短弓或长弓的弹药。装在 **箭袋** 中。",
    cost: "1 GP", weight: "1 磅",
    tags: ["弹药"]
  },
  {
    id: "bolts", name: "弩矢 (20)", source: "官方规则", type: "弹药",
    description: "用于弩的弹药。装在 **弩矢匣** 中。",
    cost: "1 GP", weight: "1.5 磅",
    tags: ["弹药"]
  },
  {
    id: "bullets-firearm", name: "枪械子弹 (10)", source: "官方规则", type: "弹药",
    description: "用于火器的弹药。装在 **小包** 中。",
    cost: "3 GP", weight: "2 磅",
    tags: ["弹药"]
  },
  {
    id: "bullets-sling", name: "投石索子弹 (20)", source: "官方规则", type: "弹药",
    description: "用于投石索的圆形弹丸。装在 **小包** 中。",
    cost: "4 CP", weight: "1.5 磅",
    tags: ["弹药"]
  },
  {
    id: "needles", name: "吹矢 (50)", source: "官方规则", type: "弹药",
    description: "用于吹箭筒的小型针刺。装在 **小包** 中。",
    cost: "1 GP", weight: "1 磅",
    tags: ["弹药"]
  },

  // --- Arcane Focuses (奥术法器) ---
  { id: "crystal", name: "水晶 (法器)", source: "官方规则", type: "法器", description: "奥术法器。术士、魔契师和法师可以使用。", cost: "10 GP", weight: "1 磅", tags: ["奥术法器"] },
  { id: "orb", name: "法球 (法器)", source: "官方规则", type: "法器", description: "奥术法器。术士、魔契师和法师可以使用。", cost: "20 GP", weight: "3 磅", tags: ["奥术法器"] },
  { id: "rod", name: "权杖 (法器)", source: "官方规则", type: "法器", description: "奥术法器。术士、魔契师和法师可以使用。", cost: "10 GP", weight: "2 磅", tags: ["奥术法器"] },
  { id: "staff-arcane", name: "法杖 (法器)", source: "官方规则", type: "法器", description: "奥术法器。术士、魔契师和法师可以使用。也视作长棍。", cost: "5 GP", weight: "4 磅", tags: ["奥术法器"] },
  { id: "wand", name: "魔杖 (法器)", source: "官方规则", type: "法器", description: "奥术法器。术士、魔契师和法师可以使用。", cost: "10 GP", weight: "1 磅", tags: ["奥术法器"] },

  // --- Druidic Focuses (德鲁伊法器) ---
  { id: "sprig-mistletoe", name: "槲寄生枝条", source: "官方规则", type: "法器", description: "德鲁伊法器。德鲁伊和游侠可以使用。", cost: "1 GP", weight: "---", tags: ["德鲁伊法器"] },
  { id: "totem", name: "图腾", source: "官方规则", type: "法器", description: "德鲁伊法器。德鲁伊和游侠可以使用。", cost: "1 GP", weight: "---", tags: ["德鲁伊法器"] },
  { id: "wooden-staff", name: "木质法杖", source: "官方规则", type: "法器", description: "德鲁伊法器。德鲁伊和游侠可以使用。也视作长棍。", cost: "5 GP", weight: "4 磅", tags: ["德鲁伊法器"] },
  { id: "yew-wand", name: "紫衫魔杖", source: "官方规则", type: "法器", description: "德鲁伊法器。德鲁伊和游侠可以使用。", cost: "10 GP", weight: "1 磅", tags: ["德鲁伊法器"] },

  // --- Holy Symbols (圣徽) ---
  { id: "amulet", name: "护符 (圣徽)", source: "官方规则", type: "法器", description: "佩戴或手持。牧师和圣武士可以用圣徽作为法器。", cost: "5 GP", weight: "1 磅", tags: ["圣徽"] },
  { id: "emblem", name: "纹章 (圣徽)", source: "官方规则", type: "法器", description: "挂载到织物或盾牌上。牧师和圣武士可以用圣徽作为法器。", cost: "5 GP", weight: "---", tags: ["圣徽"] },
  { id: "reliquary", name: "圣物匣 (圣徽)", source: "官方规则", type: "法器", description: "手持。牧师和圣武士可以用圣徽作为法器。", cost: "5 GP", weight: "2 磅", tags: ["圣徽"] },

  // --- Adventure Packs (套组) ---
  {
    id: "pack-burglar", name: "窃贼套组", source: "官方规则", type: "杂物",
    description: "背包、滚珠、铃铛、10根蜡烛、撬棍、附盖提灯、7扁瓶燃油、五天份的口粮、绳索、火绒盒和水袋。",
    cost: "16 GP", weight: "---", tags: ["套组"]
  },
  {
    id: "pack-diplomat", name: "外交套组", source: "官方规则", type: "杂物",
    description: "箱子、高档服装、墨水、5支墨水笔、油灯、2个地图或卷轴匣、4扁瓶燃油、5张纸张、5张羊皮纸、香水和火绒盒。",
    cost: "39 GP", weight: "---", tags: ["套组"]
  },
  {
    id: "pack-dungeoneer", name: "地城套组", source: "官方规则", type: "杂物",
    description: "背包、铁蒺藜、撬棍、2扁瓶燃油、10天份的口粮、绳索、火绒盒、10根火把和水袋。",
    cost: "12 GP", weight: "---", tags: ["套组"]
  },
  {
    id: "pack-entertainer", name: "艺人套组", source: "官方规则", type: "杂物",
    description: "背包、铺盖、铃铛、牛眼提灯、3套戏服、镜子、8扁瓶燃油、9天份的口粮、火绒盒和水袋。",
    cost: "40 GP", weight: "---", tags: ["套组"]
  },
  {
    id: "pack-explorer", name: "探索套组", source: "官方规则", type: "杂物",
    description: "背包、铺盖、2扁瓶燃油、10天份的口粮、绳索、火绒盒、10根火把和水袋。",
    cost: "10 GP", weight: "---", tags: ["套组"]
  },
  {
    id: "pack-priest", name: "祭司套组", source: "官方规则", type: "杂物",
    description: "背包、毯子、圣水、油灯、7天份的口粮、长袍和火绒盒。",
    cost: "33 GP", weight: "---", tags: ["套组"]
  },
  {
    id: "pack-scholar", name: "学者套组", source: "官方规则", type: "杂物",
    description: "背包、书、墨水、墨水笔、油灯、10扁瓶燃油、10张羊皮纸和火绒盒。",
    cost: "40 GP", weight: "---", tags: ["套组"]
  },

  // --- Mounts (坐骑 - 保持原样) ---
  {
    id: "elephant", name: "大象", source: "官方规则", type: "杂物",
    description: "巨型野兽。载重: 1320 磅。",
    cost: "200 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "warhorse", name: "战马", source: "官方规则", type: "杂物",
    description: "大型野兽。载重: 540 磅。",
    cost: "400 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "horse-draft", name: "驮用马", source: "官方规则", type: "杂物",
    description: "大型野兽。载重: 540 磅。",
    cost: "50 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "horse-riding", name: "乘用马", source: "官方规则", type: "杂物",
    description: "大型野兽。载重: 480 磅。",
    cost: "75 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "camel", name: "骆驼", source: "官方规则", type: "杂物",
    description: "大型野兽。载重: 450 磅。",
    cost: "50 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "mule", name: "骡子", source: "官方规则", type: "杂物",
    description: "中型野兽。载重: 420 磅。",
    cost: "8 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "pony", name: "矮种马", source: "官方规则", type: "杂物",
    description: "中型野兽。载重: 225 磅。",
    cost: "30 GP", weight: "---", tags: ["坐骑"]
  },
  {
    id: "mastiff", name: "獒犬", source: "官方规则", type: "杂物",
    description: "中型野兽。载重: 195 磅。",
    cost: "25 GP", weight: "---", tags: ["坐骑"]
  },

  // --- Tack & Harness (鞍具、挽具 - 保持原样) ---
  {
    id: "saddle-riding", name: "鞍座 (乘用)", source: "官方规则", type: "杂物",
    description: "标准的骑乘用鞍座。含笼头、缰绳、挽具等。",
    cost: "10 GP", weight: "25 磅", tags: ["冒险道具", "坐骑"]
  },
  {
    id: "saddle-military", name: "鞍座 (军用)", source: "官方规则", type: "杂物",
    description: "带有支撑的设计。你在为维持骑乘所作的一切属性检定上具有优势。",
    cost: "20 GP", weight: "30 磅", tags: ["冒险道具", "坐骑"]
  },
  {
    id: "saddle-exotic", name: "鞍座 (特种)", source: "官方规则", type: "杂物",
    description: "为非常规解剖结构的生物（如狮鹫、飞马）设计的鞍座。水生或飞行坐骑通常需要此类鞍座。",
    cost: "60 GP", weight: "40 磅", tags: ["冒险道具", "坐骑"]
  },
  {
    id: "feed-day", name: "饲料 (每日)", source: "官方规则", type: "杂物",
    description: "坐骑的一日口粮。",
    cost: "5 CP", weight: "10 磅", tags: ["冒险道具", "坐骑"]
  },
  {
    id: "stabling-day", name: "马厩 (每日)", source: "官方规则", type: "杂物",
    description: "城镇中安置坐骑的费用。",
    cost: "5 SP", weight: "---", tags: ["冒险道具", "坐骑"]
  },
  {
    id: "barding", name: "具装 (Barding)", source: "官方规则", type: "杂物",
    description: "专为坐骑设计的护甲。任何一种护甲都可以买到对应的具装版本。其价格是正常护甲的四倍，重量是正常护甲的两倍。",
    cost: "x4", weight: "x2", tags: ["冒险道具", "坐骑"]
  },

  // --- Drawn Vehicles (陆运载具 - 保持原样) ---
  {
    id: "carriage", name: "客车 (四轮)", source: "官方规则", type: "杂物",
    description: "舒适的封闭式马车，可载客。",
    cost: "100 GP", weight: "600 磅", tags: ["载具"]
  },
  {
    id: "wagon", name: "货车 (四轮)", source: "官方规则", type: "杂物",
    description: "用于运输重物的四轮车。",
    cost: "35 GP", weight: "400 磅", tags: ["载具"]
  },
  {
    id: "sled", name: "雪橇", source: "官方规则", type: "杂物",
    description: "在雪地或冰面上滑行的载具。",
    cost: "20 GP", weight: "300 磅", tags: ["载具"]
  },
  {
    id: "cart", name: "货车 (二轮)", source: "官方规则", type: "杂物",
    description: "简单的两轮拉车。",
    cost: "15 GP", weight: "200 磅", tags: ["载具"]
  },
  {
    id: "chariot", name: "战车 (二轮)", source: "官方规则", type: "杂物",
    description: "用于战斗的快速两轮车，前方有护板。",
    cost: "250 GP", weight: "100 磅", tags: ["载具"]
  },

  // --- Large Vehicles (大型载具 - 保持原样) ---
  {
    id: "airship", name: "飞艇", source: "官方规则", type: "杂物",
    description: "速度: 8 mph | 船员: 10 | 乘客: 20 | 货物: 1 吨 | AC: 13 | HP: 300\n依靠气囊或魔法悬浮在空中的巨大载具。",
    cost: "40000 GP", weight: "---", tags: ["载具"]
  },
  {
    id: "galley", name: "桨帆船", source: "官方规则", type: "杂物",
    description: "速度: 4 mph | 船员: 80 | 货物: 150 吨 | AC: 15 | HP: 500 | 伤害阈值: 20\n主要依靠桨手划动的大型船只。",
    cost: "30000 GP", weight: "---", tags: ["载具"]
  },
  {
    id: "longship", name: "单其长船", source: "官方规则", type: "杂物",
    description: "速度: 3 mph | 船员: 40 | 乘客: 150 | 货物: 10 吨 | AC: 15 | HP: 300 | 伤害阈值: 15\n坚固的远洋船只，可在强风和波涛中航行。",
    cost: "10000 GP", weight: "---", tags: ["载具"]
  },
  {
    id: "warship", name: "战舰", source: "官方规则", type: "杂物",
    description: "速度: 2.5 mph | 船员: 60 | 乘客: 60 | 货物: 200 吨 | AC: 15 | HP: 500 | 伤害阈值: 20\n为海战设计的重型船只。",
    cost: "25000 GP", weight: "---", tags: ["载具"]
  },
  {
    id: "sailing-ship", name: "帆船", source: "官方规则", type: "杂物",
    description: "速度: 2 mph | 船员: 20 | 乘客: 20 | 货物: 100 吨 | AC: 15 | HP: 300 | 伤害阈值: 15\n依靠风力航行的通用商船。",
    cost: "10000 GP", weight: "---", tags: ["载具"]
  },
  {
    id: "rowboat", name: "划艇", source: "官方规则", type: "杂物",
    description: "速度: 1.5 mph | 船员: 1 | 乘客: 3 | AC: 11 | HP: 50\n简单的小船，用于短距离水上移动。",
    cost: "50 GP", weight: "100 磅", tags: ["载具"]
  },
  {
    id: "keelboat", name: "龙骨船", source: "官方规则", type: "杂物",
    description: "速度: 1 mph | 船员: 1 | 乘客: 6 | 货物: 1/2 吨 | AC: 15 | HP: 100 | 伤害阈值: 10\n平底船，常用于内河航运。",
    cost: "3000 GP", weight: "---", tags: ["载具"]
  },

  // --- General Adventuring Gear (冒险道具) ---
  {
    id: "acid", name: "强酸", source: "官方规则", type: "杂物",
    description: "当你执行攻击动作时，你可以将你的一次攻击替换为丢出一小瓶强酸。你可以选择位于你20尺内可见的一个生物或物件作为目标。该目标必须通过一次 **敏捷豁免**（DC等于8+你的敏捷调整值+你的熟练加值），否则承受 **2d6** 点强酸伤害。",
    cost: "25 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "alchemists-fire", name: "炽火胶", source: "官方规则", type: "杂物",
    description: "当你执行攻击动作时，你可以将你的一次攻击替换为丢出一扁瓶炽火胶。你可以选择位于你20尺内可见的一个生物或物件作为目标。该目标必须通过一次 **敏捷豁免**（DC等于8+你的敏捷调整值+你的熟练加值），否则承受 **1d4** 点火焰伤害并开始燃烧（见术语汇编）。",
    cost: "50 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "antitoxin", name: "抗毒剂", source: "官方规则", type: "杂物",
    description: "以一个 **附赠动作**，你可以喝下一小瓶抗毒剂来使你在避免或结束中毒状态的豁免中具有优势，持续一小时。",
    cost: "50 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "backpack", name: "背包", source: "官方规则", type: "杂物",
    description: "一个背包最多能装入30磅重1立方尺大的东西。背包也能当作鞍囊使用。",
    cost: "2 GP", weight: "5 磅", tags: ["容器"]
  },
  {
    id: "ball-bearings", name: "滚珠", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你能把一小包滚珠撒至地面，并覆盖你周围10尺内的一处10尺方形区域。任何生物每回合首次进入这片区域时都必须通过一次DC 10的 **敏捷豁免**，否则陷入 **倒地** 状态。重新收集这些滚珠需要花费10分钟时间。",
    cost: "1 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "barrel", name: "木桶", source: "官方规则", type: "杂物",
    description: "一个木桶能够至多装入40加仑的液体或4立方尺的干燥货物。",
    cost: "2 GP", weight: "70 磅", tags: ["容器"]
  },
  {
    id: "basket", name: "篮子", source: "官方规则", type: "杂物",
    description: "一个篮子能够至多装入40磅重2立方尺大的东西。",
    cost: "4 SP", weight: "2 磅", tags: ["容器"]
  },
  {
    id: "bedroll", name: "铺盖", source: "官方规则", type: "杂物",
    description: "一卷铺盖能睡下一个小型或中型生物。躺在铺盖中时，你自动通过抵抗极寒的豁免检定（详见城主指南）。",
    cost: "1 GP", weight: "7 磅", tags: ["冒险道具"]
  },
  {
    id: "bell", name: "铃铛", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你可以摇响一个铃铛，铃铛会发出60尺内都能够听到的声音。",
    cost: "1 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "blanket", name: "毯子", source: "官方规则", type: "杂物",
    description: "包裹在毯子中期间，你在抵抗极寒的豁免检定上具有优势（详见城主指南）。",
    cost: "5 SP", weight: "3 磅", tags: ["冒险道具"]
  },
  {
    id: "block-and-tackle", name: "滑轮组", source: "官方规则", type: "杂物",
    description: "滑轮组允许你提起你正常能提动的四倍重量的物品。",
    cost: "1 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "book", name: "书籍", source: "官方规则", type: "杂物",
    description: "一本书会记载虚构或非虚构的内容。如果你在某些事物上参考了一本内容准确而非虚构的书，你在相关事物上的智力（奥秘、历史、自然或宗教）检定则获得+5的加值。",
    cost: "25 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "bottle-glass", name: "玻璃瓶", source: "官方规则", type: "杂物",
    description: "一个玻璃瓶至多能装入1.5品脱的东西。",
    cost: "2 GP", weight: "2 磅", tags: ["容器"]
  },
  {
    id: "bucket", name: "吊桶", source: "官方规则", type: "杂物",
    description: "一个吊桶能装入至多半立方尺的东西。",
    cost: "5 CP", weight: "2 磅", tags: ["容器"]
  },
  {
    id: "caltrops", name: "铁蒺藜", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你能把一包铁蒺撒至地面并覆盖你周围5尺内的一处5尺方形区域。任何生物每回合首次进入这片区域时都必须通过一次DC 15的 **敏捷豁免**，否则受到 **1** 点穿刺伤害，并且移速降至0，直到其下一回合开始为止。重新收集这些铁蒺藜需要花费10分钟时间。",
    cost: "1 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "candle", name: "蜡烛", source: "官方规则", type: "杂物",
    description: "一根蜡烛可以燃烧1小时，并发出5尺范围的明亮光照，以及额外5尺的微光光照。",
    cost: "1 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "case-crossbow-bolt", name: "弩矢匣", source: "官方规则", type: "杂物",
    description: "一个弩矢匣至多能存放20根弩矢。",
    cost: "1 GP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "case-map-scroll", name: "卷轴匣/地图匣", source: "官方规则", type: "杂物",
    description: "一个地图或卷轴匣至多能存放10张纸张或5张羊皮纸。",
    cost: "1 GP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "chain", name: "链条", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你可以进行一次DC 13的力量（运动）检定。如果该检定成功，你能利用链条捆住一个位于你5尺内的非自愿生物，但该生物必须处于受擒、失能或束缚状态。如果你绑住了该生物的腿，该生物陷入 **束缚** 状态，直至挣脱。挣脱链条需要该生物使用动作来通过一次DC 18的敏捷（特技）检定。扯坏链条需要该生物使用动作来通过一次DC 20的力量（运动）检定。",
    cost: "5 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "chest", name: "箱子", source: "官方规则", type: "杂物",
    description: "一个箱子至多能装入12立方尺的东西。",
    cost: "5 GP", weight: "25 磅", tags: ["容器"]
  },
  {
    id: "climbers-kit", name: "攀爬工具", source: "官方规则", type: "杂物",
    description: "一套攀爬工具包含鞋子包头、手套、岩钉和系带。以一个 **操作动作**，你可以使用攀爬工具锚定自己，此时你不会从锚定处摔落超过25尺，且在使用附赠动作解除锚定前无法从锚定处向外移动超过25尺。",
    cost: "25 GP", weight: "12 磅", tags: ["冒险道具"]
  },
  {
    id: "clothes-fine", name: "高档服装", source: "官方规则", type: "杂物",
    description: "高档服装使用昂贵的材料和装饰物制成，并缝制着极其精密的细节。有些活动和场合仅允许穿着高档服装的人参与。",
    cost: "15 GP", weight: "6 磅", tags: ["冒险道具"]
  },
  {
    id: "clothes-travelers", name: "旅行服装", source: "官方规则", type: "杂物",
    description: "旅行服装是为应对在多种环境中的旅途而设计的结实服装。",
    cost: "2 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "component-pouch", name: "材料包", source: "官方规则", type: "杂物",
    description: "材料包是一种装有你法术所需的一切免费材料的防水小包。",
    cost: "25 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "costume", name: "戏服", source: "官方规则", type: "杂物",
    description: "若你穿着对应的戏服，你为模仿他人或模仿某一类人所作的任何属性检定都具有优势。",
    cost: "5 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "crowbar", name: "撬棍", source: "官方规则", type: "杂物",
    description: "在能够撬动的地方使用撬棍可以给予你在这方面的力量检定优势。",
    cost: "2 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "flask", name: "扁瓶", source: "官方规则", type: "杂物",
    description: "一个扁瓶具有1品脱容量。",
    cost: "2 CP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "grappling-hook", name: "爪钩", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你能将爪钩朝着位于自身50尺内的一处栏杆、突起的边缘或是一处能够挂住的位置扔出，并进行一次DC 13的敏捷（特技）检定。如果检定成功，爪钩则成功钩在上面。如果爪钩上还连了绳子，你则可以爬上去。",
    cost: "2 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "healers-kit", name: "医疗包", source: "官方规则", type: "杂物",
    description: "一个医疗包有十次使用次数。以一个 **操作动作**，你可以花费一次使用次数用来稳定一名生命值为0的陷入昏迷的生物的伤势。你这么做时无需进行感知（医疗）检定。",
    cost: "5 GP", weight: "3 磅", tags: ["冒险道具"]
  },
  {
    id: "holy-water", name: "圣水", source: "官方规则", type: "杂物",
    description: "当你执行攻击动作时，你可以将你的一次攻击替换为丢出一扁瓶圣水。你可以选择位于你20尺内可见的一个生物作为目标。该目标必须通过一次 **敏捷豁免**（DC等于8+你的敏捷调整值+你的熟练加值），并且如果这个目标是邪魔或亡灵生物，失败时承受 **2d8** 点光耀伤害。",
    cost: "25 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "hunting-trap", name: "捕猎陷阱", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，设下陷阱。踩中者需通过DC 13 **敏捷豁免**，否则受 **1d4** 点穿刺伤害并停止移动。被困生物受链条长度限制。可以动作进行DC 13力量（运动）检定脱困。失败则受1点穿刺伤害。",
    cost: "5 GP", weight: "25 磅", tags: ["冒险道具"]
  },
  {
    id: "ink", name: "墨水", source: "官方规则", type: "杂物",
    description: "墨水一般装在1盎司的瓶子里，足够撰写500页的内容。",
    cost: "10 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "ink-pen", name: "墨水笔", source: "官方规则", type: "杂物",
    description: "墨水笔可以使用墨水来写字或绘画。",
    cost: "2 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "jug", name: "壶", source: "官方规则", type: "杂物",
    description: "壶具有一加仑的容量。",
    cost: "2 CP", weight: "4 磅", tags: ["容器"]
  },
  {
    id: "ladder", name: "梯子", source: "官方规则", type: "杂物",
    description: "一把梯子有10尺高。你只能在梯子上爬上或是爬下。",
    cost: "1 SP", weight: "25 磅", tags: ["冒险道具"]
  },
  {
    id: "lamp", name: "油灯", source: "官方规则", type: "杂物",
    description: "一盏油灯使用燃油作为燃料，点着时能够发出半径15尺的明亮光照以及额外30尺的微光光照。",
    cost: "5 SP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "lantern-bullseye", name: "牛眼提灯", source: "官方规则", type: "杂物",
    description: "一盏牛眼提灯使用燃油作为燃料，点着时能够发出60尺锥状区域的明亮光照以及额外60尺的微光光照。",
    cost: "10 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "lantern-hooded", name: "附盖提灯", source: "官方规则", type: "杂物",
    description: "一盏附盖提灯使用燃油作为燃料，点着时能够发出半径30尺的明亮光照以及额外30尺的微光光照。以一个 **附赠动作**，你可以盖上或掀开提灯的盖子。盖上盖子时，提灯的光亮降至半径5尺的微光光照。",
    cost: "5 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "lock", name: "锁", source: "官方规则", type: "杂物",
    description: "每套锁都有对应的钥匙。如果没有对应的钥匙，一个生物还可以使用盗贼工具来通过一次DC 15的敏捷（巧手）检定开锁。",
    cost: "10 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "magnifying-glass", name: "放大镜", source: "官方规则", type: "杂物",
    description: "使用放大镜时，你为鉴定或检查精密物品所作的任何属性检定都会具有优势。想要使用放大镜点火，需要一束如同阳光般明亮的强光用于聚焦，还需要用于点燃的火绒，随后需要大约5分钟的时间来生火。",
    cost: "100 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "manacles", name: "镣铐", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你可以进行一次DC 13的敏捷（巧手）检定。如果该检定成功，你能利用镣铐捆住一个位于你5尺内的非自愿的小型或中型生物，但该生物必须处于受擒、失能或束缚状态。如果你铐住了该生物，该生物进行的攻击检定会具有劣势。如果镣铐还被锁链或钩子固定在了某处，该生物还会陷入 **束缚** 状态。挣脱镣铐需要DC 20敏捷（巧手）检定。扯坏需DC 25力量（运动）检定。开锁需DC 15敏捷（巧手）检定。",
    cost: "2 GP", weight: "6 磅", tags: ["冒险道具"]
  },
  {
    id: "map", name: "地图", source: "官方规则", type: "杂物",
    description: "如果你在地图所绘制的地点参考了一张准确的地图，你为辨认位置所进行的感知（求生）检定获得+5的加值。",
    cost: "1 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "mirror-steel", name: "镜子", source: "官方规则", type: "杂物",
    description: "一面手持的钢镜不光可以用来化妆打扮，也可以用来窥视拐角或利用反光打信号。",
    cost: "5 GP", weight: "0.5 磅", tags: ["冒险道具"]
  },
  {
    id: "net", name: "捕网", source: "官方规则", type: "杂物",
    description: "当你执行攻击动作，你可以将你的一次攻击替换为丢出一张捕网。你可以选择位于你15尺内可见的一个生物作为目标。该目标必须通过一次 **敏捷豁免**（DC等于8+你的敏捷调整值+你的熟练加值），否则陷入 **束缚** 状态，直至挣脱。体型是巨型及以上的目标自动通过。被束缚者或5尺内生物可以动作DC 10力量（运动）检定挣脱。捕网（AC 10；5 HP；免疫钝击/毒素/心灵）被摧毁也能解放目标。",
    cost: "1 GP", weight: "3 磅", tags: ["冒险道具"]
  },
  {
    id: "oil", name: "燃油", source: "官方规则", type: "杂物",
    description: "泼洒生物/物件（替换攻击，20尺，敏捷豁免）：命中后若1分钟内受火焰伤害，额外受5点火焰伤害。泼洒空间（动作，5尺区域）：点燃后燃烧两轮，进入或结束回合受5点火焰伤害。燃料：供油灯/提灯燃烧6小时。",
    cost: "1 SP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "paper", name: "纸张", source: "官方规则", type: "杂物",
    description: "一页纸张能够写满250个手写单词。",
    cost: "2 SP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "parchment", name: "羊皮纸", source: "官方规则", type: "杂物",
    description: "一页羊皮纸能够写满250个手写单词。",
    cost: "1 SP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "perfume", name: "香水", source: "官方规则", type: "杂物",
    description: "香水通常装在4盎司的小瓶里。为自己拍上香水后的一小时里，你为影响对你态度冷漠的类人生物所作的魅力（游说）检定都具有优势，但这个生物必须位于你的5尺内。",
    cost: "5 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "poison-basic", name: "基础毒药", source: "官方规则", type: "杂物",
    description: "以一个 **附赠动作**，你可以将一小瓶基础毒药涂抹在一把武器或至多三枚弹药上。当一个生物受到由涂过毒的武器或弹药所造成的穿刺或挥砍伤害时，该生物将受到额外 **1d4** 点毒素伤害。毒药一旦被涂抹，毒效只会持续1分钟或直至造成了额外伤害。",
    cost: "100 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "pole", name: "长杆", source: "官方规则", type: "杂物",
    description: "一柄长杆有10尺长。你可以用它去触碰10尺外的东西。如果你必须为一次跳高或跳远进行力量（运动）检定的话，你可以使用长杆进行撑杆跳，来使这次检定具有优势。",
    cost: "5 CP", weight: "7 磅", tags: ["冒险道具"]
  },
  {
    id: "pot-iron", name: "铁壶", source: "官方规则", type: "杂物",
    description: "铁壶具有一加仑的容量。",
    cost: "2 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "potion-healing-basic", name: "治疗药水", source: "官方规则", type: "杂物",
    description: "这瓶药水是一种魔法物品。以一个 **附赠动作**，你可以喝掉它或将它喂给位于你5尺内的其他生物。喝掉这小瓶魔法红色液体的生物能够恢复 **2d4+2** 点生命值。",
    cost: "50 GP", weight: "0.5 磅", tags: ["冒险道具"]
  },
  {
    id: "pouch", name: "小包", source: "官方规则", type: "杂物",
    description: "一个小包能够至多装入6磅重、五分之一立方尺大的东西。",
    cost: "5 SP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "quiver", name: "箭袋", source: "官方规则", type: "杂物",
    description: "箭袋至多能装入20根箭矢。",
    cost: "1 GP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "ram-portable", name: "便携式攻城锤", source: "官方规则", type: "杂物",
    description: "你可以使用便携式攻城锤撞破一扇门。当你这么做时，你在力量检定上获得+4加值。其他一名角色可以协助你使用攻城锤，并使你这次检定具有优势。",
    cost: "4 GP", weight: "35 磅", tags: ["冒险道具"]
  },
  {
    id: "rations", name: "口粮", source: "官方规则", type: "杂物",
    description: "口粮由适合长途旅行携带的食物组成，包含肉干、风干水果、饼干和坚果等。不进食的危害详见术语汇编中的“饥饿”部分。",
    cost: "5 SP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "robes", name: "长袍", source: "官方规则", type: "杂物",
    description: "长袍通常具有特别的职业或仪式意义。有些活动和场合仅允许穿着带有特定颜色或符号的长袍的人参与。",
    cost: "1 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "rope-hempen", name: "绳索", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你可以进行一次DC 10的敏捷（巧手）检定打一个结。扯坏需DC 20力量（运动）检定。捆绑非自愿生物（需受擒/失能/束缚）可使其束缚。挣脱需DC 15敏捷（特技）检定。",
    cost: "1 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "sack", name: "麻袋", source: "官方规则", type: "杂物",
    description: "麻袋至多能够装入30磅1立方尺的东西。",
    cost: "1 CP", weight: "0.5 磅", tags: ["容器"]
  },
  {
    id: "shovel", name: "铲子", source: "官方规则", type: "杂物",
    description: "你可以使用铲子来花费一小时时间在土壤或类似材质的地方挖出一个5尺边长的洞。",
    cost: "2 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "signal-whistle", name: "信号笛", source: "官方规则", type: "杂物",
    description: "以一个 **操作动作**，你可以吹响一支信号笛，并使信号笛发出600尺外都可以听见的响声。",
    cost: "5 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "spell-scroll-cantrip", name: "法术卷轴 (戏法)", source: "官方规则", type: "杂物",
    description: "如果该戏法在你的法术列表中，你可以阅读并无需材料施展它。豁免DC 13，攻击加值+5。施展后消失。",
    cost: "30 GP", weight: "---", tags: ["魔法物品"]
  },
  {
    id: "spell-scroll-level1", name: "法术卷轴 (一环)", source: "官方规则", type: "杂物",
    description: "如果该法术在你的法术列表中，你可以阅读并无需材料施展它。豁免DC 13，攻击加值+5。施展后消失。",
    cost: "50 GP", weight: "---", tags: ["魔法物品"]
  },
  {
    id: "spikes-iron", name: "铁钉 (10根)", source: "官方规则", type: "杂物",
    description: "一组铁钉包含十支。以一个 **操作动作**，使用钝器把铁钉锤入材质。亦可堵死门或固定绳索。",
    cost: "1 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "spyglass", name: "望远镜", source: "官方规则", type: "杂物",
    description: "通过望远镜看到的物件要比原先的尺寸大上两倍。",
    cost: "1000 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "string", name: "细线", source: "官方规则", type: "杂物",
    description: "细线有10尺长。你能够以一个 **操作动作** 为它打一个结。",
    cost: "1 SP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "tent", name: "帐篷", source: "官方规则", type: "杂物",
    description: "帐篷可以睡下两个小型或中型的生物。",
    cost: "2 GP", weight: "20 磅", tags: ["冒险道具"]
  },
  {
    id: "tinderbox", name: "火绒盒", source: "官方规则", type: "杂物",
    description: "装有打火石、火镰和火绒。使用 **附赠动作** 来点燃具有燃料的东西。无燃料生火需1分钟。",
    cost: "5 SP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "torch", name: "火把", source: "官方规则", type: "杂物",
    description: "燃烧1小时，提供20尺明亮光照及额外20尺微光光照。可作为简易近战武器攻击，命中造成1点火焰伤害。",
    cost: "1 CP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "vial", name: "小瓶", source: "官方规则", type: "杂物",
    description: "小瓶具有4盎司容量。",
    cost: "1 GP", weight: "---", tags: ["容器"]
  },
  {
    id: "waterskin", name: "水袋", source: "官方规则", type: "杂物",
    description: "水袋具有4品脱容量。如果你喝水不足，你会遭受脱水的危害（见规则详述）。",
    cost: "2 SP", weight: "5 磅 (满)", tags: ["容器"]
  },
];
