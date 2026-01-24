
import { ItemItem } from '../types';

export const GEAR_DB: ItemItem[] = [
  // --- Ammunition (弹药) ---
  {
    id: "arrows", name: "箭矢 (20)", source: "官方规则", type: "弹药",
    description: "用于短弓或长弓的弹药。装在箭袋中。",
    cost: "1 GP", weight: "1 磅",
    tags: ["弹药"]
  },
  {
    id: "bolts", name: "弩矢 (20)", source: "官方规则", type: "弹药",
    description: "用于弩的弹药。装在弩矢匣中。",
    cost: "1 GP", weight: "1.5 磅",
    tags: ["弹药"]
  },
  {
    id: "bullets-firearm", name: "弹丸，火器 (10)", source: "官方规则", type: "弹药",
    description: "用于火器（手铳、火铳）的弹药。装在小包中。",
    cost: "3 GP", weight: "2 磅",
    tags: ["弹药"]
  },
  {
    id: "bullets-sling", name: "弹丸，投石索 (20)", source: "官方规则", type: "弹药",
    description: "用于投石索的圆形弹丸。装在小包中。",
    cost: "4 CP", weight: "1.5 磅",
    tags: ["弹药"]
  },
  {
    id: "needles", name: "吹矢 (50)", source: "官方规则", type: "弹药",
    description: "用于吹箭筒的小型针刺。装在小包中。",
    cost: "1 GP", weight: "1 磅",
    tags: ["弹药"]
  },

  // --- Arcane Focuses (奥术法器) ---
  { id: "crystal", name: "水晶 (法器)", source: "官方规则", type: "法器", description: "奥术法器。", cost: "10 GP", weight: "1 磅", tags: ["奥术法器"] },
  { id: "orb", name: "法球 (法器)", source: "官方规则", type: "法器", description: "奥术法器。", cost: "20 GP", weight: "3 磅", tags: ["奥术法器"] },
  { id: "rod", name: "权杖 (法器)", source: "官方规则", type: "法器", description: "奥术法器。", cost: "10 GP", weight: "2 磅", tags: ["奥术法器"] },
  { id: "staff-arcane", name: "法杖 (法器)", source: "官方规则", type: "法器", description: "奥术法器。也视作长棍。", cost: "5 GP", weight: "4 磅", tags: ["奥术法器"] },
  { id: "wand", name: "魔杖 (法器)", source: "官方规则", type: "法器", description: "奥术法器。", cost: "10 GP", weight: "1 磅", tags: ["奥术法器"] },

  // --- Druidic Focuses (德鲁伊法器) ---
  { id: "sprig-mistletoe", name: "槲寄生枝条", source: "官方规则", type: "法器", description: "德鲁伊法器。", cost: "1 GP", weight: "---", tags: ["德鲁伊法器"] },
  { id: "totem", name: "图腾", source: "官方规则", type: "法器", description: "德鲁伊法器。", cost: "1 GP", weight: "---", tags: ["德鲁伊法器"] },
  { id: "wooden-staff", name: "木杖", source: "官方规则", type: "法器", description: "德鲁伊法器。也视作长棍。", cost: "5 GP", weight: "4 磅", tags: ["德鲁伊法器"] },
  { id: "yew-wand", name: "紫衫魔杖", source: "官方规则", type: "法器", description: "德鲁伊法器。", cost: "10 GP", weight: "1 磅", tags: ["德鲁伊法器"] },

  // --- Holy Symbols (圣徽) ---
  { id: "amulet", name: "护符 (圣徽)", source: "官方规则", type: "法器", description: "佩戴或手持。", cost: "5 GP", weight: "1 磅", tags: ["圣徽"] },
  { id: "emblem", name: "纹章 (圣徽)", source: "官方规则", type: "法器", description: "挂载到织物或盾牌上。", cost: "5 GP", weight: "---", tags: ["圣徽"] },
  { id: "reliquary", name: "圣物匣 (圣徽)", source: "官方规则", type: "法器", description: "手持。", cost: "5 GP", weight: "2 磅", tags: ["圣徽"] },

  // --- Adventure Packs (套组) ---
  {
    id: "pack-burglar", name: "窃贼套组", source: "官方规则", type: "杂物",
    description: "背包、滚珠(1000)、铃铛、蜡烛(5)、撬棍、锤子、岩钉(10)、附盖提灯、燃油(2)、口粮(5)、火绒盒、水袋、麻绳(50尺)。",
    cost: "16 GP", weight: "42 磅", tags: ["套组"]
  },
  {
    id: "pack-diplomat", name: "外交套组", source: "官方规则", type: "杂物",
    description: "箱子、地图或卷轴匣(2)、高档服装、墨水、墨水笔、油灯、燃油(2)、纸张(5)、香水、封蜡、肥皂。",
    cost: "39 GP", weight: "39 磅", tags: ["套组"]
  },
  {
    id: "pack-dungeoneer", name: "地城套组", source: "官方规则", type: "杂物",
    description: "背包、撬棍、锤子、岩钉(10)、火把(10)、火绒盒、口粮(10)、水袋、麻绳(50尺)。",
    cost: "12 GP", weight: "55 磅", tags: ["套组"]
  },
  {
    id: "pack-entertainer", name: "艺人套组", source: "官方规则", type: "杂物",
    description: "背包、铺盖、戏服(2)、蜡烛(5)、口粮(5)、水袋、易容工具。",
    cost: "40 GP", weight: "58.5 磅", tags: ["套组"]
  },
  {
    id: "pack-explorer", name: "探索套组", source: "官方规则", type: "杂物",
    description: "背包、铺盖、餐具、火绒盒、火把(10)、口粮(10)、水袋、麻绳(50尺)。",
    cost: "10 GP", weight: "55 磅", tags: ["套组"]
  },
  {
    id: "pack-priest", name: "祭司套组", source: "官方规则", type: "杂物",
    description: "背包、毯子、蜡烛(10)、火绒盒、施舍盒、香块(2)、香炉、法衣、口粮(2)、水袋。",
    cost: "33 GP", weight: "29 磅", tags: ["套组"]
  },
  {
    id: "pack-scholar", name: "学者套组", source: "官方规则", type: "杂物",
    description: "背包、书籍(知识)、墨水、墨水笔、羊皮纸(10)、小沙包、小刀。",
    cost: "40 GP", weight: "22 磅", tags: ["套组"]
  },

  // --- Mounts (坐骑) ---
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

  // --- Tack & Harness (鞍具、挽具 -> 冒险道具/坐骑) ---
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

  // --- Drawn Vehicles (陆运载具 -> 载具) ---
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

  // --- Large Vehicles (大型载具 - 水上与空中 -> 载具) ---
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
    id: "acid", name: "强酸 (小瓶)", source: "官方规则", type: "杂物",
    description: "作为动作，你可以泼洒瓶中的强酸。对60尺内的生物或物体进行远程攻击。命中造成2d6强酸伤害。",
    cost: "25 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "alchemists-fire", name: "炽火胶 (扁瓶)", source: "官方规则", type: "杂物",
    description: "作为动作投掷。对20尺内的生物或物体进行远程攻击。命中时，目标在每回合开始时受到1d4火焰伤害。生物可用动作进行DC 10敏捷检定来熄灭火焰。",
    cost: "50 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "antitoxin", name: "抗毒剂 (小瓶)", source: "官方规则", type: "杂物",
    description: "饮用后，在1小时内对毒素的豁免检定具有优势。",
    cost: "50 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "backpack", name: "背包", source: "官方规则", type: "杂物",
    description: "一个背包最多能装入30磅重/1立方尺大的东西。背包也能系在外面。",
    cost: "2 GP", weight: "5 磅", tags: ["容器"]
  },
  {
    id: "ball-bearings", name: "滚珠 (1000枚)", source: "官方规则", type: "杂物",
    description: "作为动作，撒在平整地面上覆盖10尺方形区域。进入区域的生物需通过DC 10敏捷豁免，否则倒地。",
    cost: "1 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "barrel", name: "木桶", source: "官方规则", type: "杂物",
    description: "能够装入40加仑的液体或4立方尺的干燥货物。",
    cost: "2 GP", weight: "70 磅", tags: ["容器"]
  },
  {
    id: "basket", name: "篮子", source: "官方规则", type: "杂物",
    description: "能够装入40磅重/2立方尺大的东西。",
    cost: "4 SP", weight: "2 磅", tags: ["容器"]
  },
  {
    id: "bedroll", name: "铺盖", source: "官方规则", type: "杂物",
    description: "一卷铺盖能睡下一个小型或中型生物。躺在铺盖中时，你自动通过抗极寒的豁免检定。",
    cost: "1 GP", weight: "7 磅", tags: ["冒险道具"]
  },
  {
    id: "bell", name: "铃铛", source: "官方规则", type: "杂物",
    description: "以一个操作动作，你可以摇响一个铃铛，铃声会发出60尺内都能听到的声音。",
    cost: "1 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "blanket", name: "毯子", source: "官方规则", type: "杂物",
    description: "包裹在毯子期间，你在抵抗极寒的豁免检定上具有优势。",
    cost: "5 SP", weight: "3 磅", tags: ["冒险道具"]
  },
  {
    id: "block-and-tackle", name: "滑轮组", source: "官方规则", type: "杂物",
    description: "滑轮组允许你提起你能正常提动的四倍重量的物品。",
    cost: "1 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "book", name: "书籍", source: "官方规则", type: "杂物",
    description: "一本书会记载虚构或非虚构的内容。如果你在某些事物上参考了一本内容准确而非虚构的书，你在相关事物上的智力（奥秘、历史、自然或宗教）检定则获得+5加值。",
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
    id: "caltrops", name: "铁蒺藜 (20枚)", source: "官方规则", type: "杂物",
    description: "以一个操作动作，你能把一包铁蒺藜撒至地面并覆盖周围5尺内的单一5尺方形区域。任何生物每回合首次进入这片区域时都必须通过一次DC15的敏捷豁免，否则受到1点穿刺伤害，并移动速度降至0，直到其下一次回合开始为止。",
    cost: "1 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "candle", name: "蜡烛", source: "官方规则", type: "杂物",
    description: "一根蜡烛可以燃烧1小时，并发出5尺范围的明亮光照，以及额外5尺的微光光照。",
    cost: "1 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "case-crossbow-bolt", name: "弩矢匣", source: "官方规则", type: "杂物",
    description: "一个弩矢匣至多能存放20枚弩矢。",
    cost: "1 GP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "case-map-scroll", name: "卷轴匣/地图匣", source: "官方规则", type: "杂物",
    description: "一个地图或卷轴匣至多能存放10张纸或5张羊皮纸。",
    cost: "1 GP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "chain", name: "链条 (10尺)", source: "官方规则", type: "杂物",
    description: "以一个操作动作，你可以进行一次DC13的力量（运动）检定。如果该检定成功，你能利用链条捆住一个位于你5尺内的非自愿生物，但该生物必须处于受擒、失能或束缚状态。如果你捆住了该生物，该生物陷入束缚状态，直至挣脱。",
    cost: "5 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "chest", name: "箱子", source: "官方规则", type: "杂物",
    description: "一个箱子至多能装入12立方尺的东西。",
    cost: "5 GP", weight: "25 磅", tags: ["容器"]
  },
  {
    id: "climbers-kit", name: "攀爬工具", source: "官方规则", type: "杂物",
    description: "一套攀爬工具包含了干鞋、手套、岩钉和系带。以一个操作动作，你可以使用攀爬工具锚定自己，此时你不会从固定处掉落超过25尺，且在使用附赠动作解除锚定前无法从锚定处向外移动超过25尺。",
    cost: "25 GP", weight: "12 磅", tags: ["冒险道具"]
  },
  {
    id: "clothes-fine", name: "高档服装", source: "官方规则", type: "杂物",
    description: "高档服装使用昂贵的材料和装饰物制作，并缝制着极其精细的细节。有些活动和场合仅允许穿着高档服装的人参与。",
    cost: "15 GP", weight: "6 磅", tags: ["冒险道具"]
  },
  {
    id: "clothes-travelers", name: "旅行服装", source: "官方规则", type: "杂物",
    description: "旅行服装是为应对在多种环境中的旅途而设计的结实服装。",
    cost: "2 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "component-pouch", name: "材料包", source: "官方规则", type: "杂物",
    description: "材料包是一种装有法术所需的一切免费材料的防水小包。",
    cost: "25 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "costume", name: "戏服", source: "官方规则", type: "杂物",
    description: "若你穿这对应的戏服，你为模仿他人或模仿某一类人所作的任何属性检定都具有优势。",
    cost: "5 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "crowbar", name: "撬棍", source: "官方规则", type: "杂物",
    description: "在使用撬棍的地方使用撬棍可以给予你在这方面的力量检定优势。",
    cost: "2 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "ink", name: "墨水 (1盎司)", source: "官方规则", type: "杂物",
    description: "装在小瓶中的墨水。",
    cost: "10 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "ink-pen", name: "墨水笔", source: "官方规则", type: "杂物",
    description: "一支木杆笔，有着特殊的笔尖。",
    cost: "2 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "jug", name: "壶", source: "官方规则", type: "杂物",
    description: "一个壶能装入1加仑液体。",
    cost: "2 CP", weight: "4 磅", tags: ["容器"]
  },
  {
    id: "ladder", name: "梯子 (10尺)", source: "官方规则", type: "杂物",
    description: "直梯，长10尺。",
    cost: "1 SP", weight: "25 磅", tags: ["冒险道具"]
  },
  {
    id: "lamp", name: "油灯", source: "官方规则", type: "杂物",
    description: "油灯能发出15尺半径的明亮光照和额外30尺的微光光照。点燃后每6小时消耗1扁瓶（1品脱）燃油。",
    cost: "5 SP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "lantern-bullseye", name: "牛眼提灯", source: "官方规则", type: "杂物",
    description: "牛眼提灯能发出一道60尺锥状的明亮光照和额外60尺的微光光照。点燃后每6小时消耗1扁瓶（1品脱）燃油。",
    cost: "10 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "lantern-hooded", name: "附盖提灯", source: "官方规则", type: "杂物",
    description: "附盖提灯能发出30尺半径的明亮光照和额外30尺的微光光照。放下盖子可将光照减少为5尺微光。点燃后每6小时消耗1扁瓶（1品脱）燃油。",
    cost: "5 GP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "lock", name: "锁", source: "官方规则", type: "杂物",
    description: "附带钥匙。没有钥匙时，用盗贼工具进行DC 15的敏捷检定可打开。",
    cost: "10 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "magnifying-glass", name: "放大镜", source: "官方规则", type: "杂物",
    description: "用来点火（需有阳光和易燃物，5分钟）或鉴定细小物体。",
    cost: "100 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "manacles", name: "镣铐", source: "官方规则", type: "杂物",
    description: "束缚小型或中型生物。挣脱需DC 20力量检定。撬开需DC 15敏捷检定。",
    cost: "2 GP", weight: "6 磅", tags: ["冒险道具"]
  },
  {
    id: "mirror-steel", name: "镜子 (钢面)", source: "官方规则", type: "杂物",
    description: "抛光的钢面镜子。",
    cost: "5 GP", weight: "0.5 磅", tags: ["冒险道具"]
  },
  {
    id: "oil", name: "燃油 (扁瓶)", source: "官方规则", type: "杂物",
    description: "1品脱燃油。可用于点灯，或作为简易武器投掷（见炽火胶规则，但造成5火焰伤害）。铺在地面（5尺见方）点燃后造成5火焰伤害。",
    cost: "1 SP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "paper", name: "纸张 (1张)", source: "官方规则", type: "杂物",
    description: "一张纸。",
    cost: "2 SP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "parchment", name: "羊皮纸 (1张)", source: "官方规则", type: "杂物",
    description: "一张羊皮纸。",
    cost: "1 SP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "perfume", name: "香水 (小瓶)", source: "官方规则", type: "杂物",
    description: "一小瓶香水。",
    cost: "5 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "pick-miner", name: "矿镐", source: "官方规则", type: "杂物",
    description: "挖掘工具。",
    cost: "2 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "piton", name: "岩钉", source: "官方规则", type: "杂物",
    description: "用于攀爬时固定。",
    cost: "5 CP", weight: "0.25 磅", tags: ["冒险道具"]
  },
  {
    id: "poison-basic", name: "基础毒药 (小瓶)", source: "官方规则", type: "杂物",
    description: "可涂抹在一把武器或三枚弹药上。命中后目标须通过DC 10体质豁免，否则受1d4毒素伤害。一旦涂抹，毒性保留1分钟。",
    cost: "100 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "pole", name: "长杆 (10尺)", source: "官方规则", type: "杂物",
    description: "10尺长的木杆。",
    cost: "5 CP", weight: "7 磅", tags: ["冒险道具"]
  },
  {
    id: "pot-iron", name: "铁壶", source: "官方规则", type: "杂物",
    description: "烹饪用的铁壶。",
    cost: "2 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "potion-healing-basic", name: "治疗药水", source: "官方规则", type: "杂物",
    description: "红色的液体。饮用（动作）后恢复 2d4 + 2 点生命值。",
    cost: "50 GP", weight: "0.5 磅", tags: ["冒险道具"]
  },
  {
    id: "pouch", name: "小包", source: "官方规则", type: "杂物",
    description: "能够装入6磅重/1/5立方尺大的东西。",
    cost: "5 SP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "quiver", name: "箭袋", source: "官方规则", type: "杂物",
    description: "可装20支箭。",
    cost: "1 GP", weight: "1 磅", tags: ["容器"]
  },
  {
    id: "ram-portable", name: "便携式攻城锤", source: "官方规则", type: "杂物",
    description: "用于撞开门。提供力量检定+4加值（需两人操作）。",
    cost: "4 GP", weight: "35 磅", tags: ["冒险道具"]
  },
  {
    id: "rations", name: "口粮 (1天)", source: "官方规则", type: "杂物",
    description: "包含各种耐储存的食物，如肉干、干果、饼干等。",
    cost: "5 SP", weight: "2 磅", tags: ["冒险道具"]
  },
  {
    id: "robes", name: "长袍", source: "官方规则", type: "杂物",
    description: "普通的长袍。",
    cost: "1 GP", weight: "4 磅", tags: ["冒险道具"]
  },
  {
    id: "rope-hempen", name: "麻绳 (50尺)", source: "官方规则", type: "杂物",
    description: "由麻制成的绳子。承重300磅。",
    cost: "1 GP", weight: "10 磅", tags: ["冒险道具"]
  },
  {
    id: "rope-silk", name: "丝绳 (50尺)", source: "官方规则", type: "杂物",
    description: "由丝制成的绳子。承重300磅。",
    cost: "10 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "sack", name: "麻袋", source: "官方规则", type: "杂物",
    description: "能够装入30磅重/1立方尺大的东西。",
    cost: "1 CP", weight: "0.5 磅", tags: ["容器"]
  },
  {
    id: "scale-merchant", name: "天平", source: "官方规则", type: "杂物",
    description: "用于称重的小天平。",
    cost: "5 GP", weight: "3 磅", tags: ["冒险道具"]
  },
  {
    id: "sealing-wax", name: "封蜡", source: "官方规则", type: "杂物",
    description: "用于密封卷轴或信件。",
    cost: "5 SP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "shovel", name: "铲子", source: "官方规则", type: "杂物",
    description: "挖掘工具。",
    cost: "2 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "signal-whistle", name: "信号笛", source: "官方规则", type: "杂物",
    description: "发出尖锐声音。",
    cost: "5 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "signet-ring", name: "图章戒指", source: "官方规则", type: "杂物",
    description: "印有家族或组织徽记的戒指。",
    cost: "5 GP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "soap", name: "肥皂", source: "官方规则", type: "杂物",
    description: "一块肥皂。",
    cost: "2 CP", weight: "---", tags: ["冒险道具"]
  },
  {
    id: "spellbook", name: "法术书", source: "官方规则", type: "杂物",
    description: "法师用于记录法术的书籍。",
    cost: "50 GP", weight: "3 磅", tags: ["冒险道具"]
  },
  {
    id: "spikes-iron", name: "铁钉 (10根)", source: "官方规则", type: "杂物",
    description: "用于卡住门或攀爬。",
    cost: "1 GP", weight: "5 磅", tags: ["冒险道具"]
  },
  {
    id: "spyglass", name: "望远镜", source: "官方规则", type: "杂物",
    description: "将远处的物体放大两倍。",
    cost: "1000 GP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "tent", name: "帐篷 (双人)", source: "官方规则", type: "杂物",
    description: "简单的帆布帐篷，可容纳两人。",
    cost: "2 GP", weight: "20 磅", tags: ["冒险道具"]
  },
  {
    id: "tinderbox", name: "火绒盒", source: "官方规则", type: "杂物",
    description: "包含打火石、火镰和易燃引火物。点燃火把需1动作。",
    cost: "5 SP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "torch", name: "火把", source: "官方规则", type: "杂物",
    description: "燃烧 1 小时，提供 20 尺明亮光照和额外 20 尺微光光照。",
    cost: "1 CP", weight: "1 磅", tags: ["冒险道具"]
  },
  {
    id: "vial", name: "小瓶", source: "官方规则", type: "杂物",
    description: "能够装入4盎司液体。",
    cost: "1 GP", weight: "---", tags: ["容器"]
  },
  {
    id: "waterskin", name: "水袋", source: "官方规则", type: "杂物",
    description: "能够装入4品脱（半加仑）液体。",
    cost: "2 SP", weight: "5 磅 (满)", tags: ["容器"]
  },
  {
    id: "whetstone", name: "磨刀石", source: "官方规则", type: "杂物",
    description: "用于磨利武器。",
    cost: "1 CP", weight: "1 磅", tags: ["冒险道具"]
  },
  // --- Special Items ---
  {
    id: "holy-water", name: "圣水 (扁瓶)", source: "官方规则", type: "杂物",
    description: "作为动作泼洒。对5尺内邪魔或亡灵进行远程攻击，命中造成2d6光耀伤害。",
    cost: "25 GP", weight: "1 磅", tags: ["冒险道具"]
  },
];
