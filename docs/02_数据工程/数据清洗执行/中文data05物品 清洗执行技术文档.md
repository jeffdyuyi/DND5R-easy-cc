# 中文data/05_物品 清洗执行技术文档

## 1. 文档目标

本专项只处理 [中文data/05_物品](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品)，目标是把原始 5etools 风格物品数据清洗成“与现有 `data-items-*.ts` 兼容的候选层”，统一先输出到过渡库存目录，不直接改动现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)。

三层职责固定为：

- [中文data/05_物品](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品)：原始库存层
- [data](E:/YJF/DND2024characterbuilder-2.0/data)：只读目标格式参照层
- [staging-data/items](E:/YJF/DND2024characterbuilder-2.0/staging-data/items)：清洗后的候选层

`source` 一律保留 `中文data` 原始缩写，如 `PHB`、`XPHB`、`TCE`，不沿用现有 `data` 的粗粒度来源。

---

## 2. 输入范围

### 2.1 一级目录

- [武器](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/武器)
- [护甲](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/护甲)
- [工具](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/工具)
- [冒险装备](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/冒险装备)
- [坐骑与载具](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/坐骑与载具)

### 2.2 高频原始字段

- `name`
- `ENG_name`
- `source`
- `type`
- `rarity`
- `weight`
- `value`
- `entries`
- `property`
- `mastery`
- `weaponCategory`
- `dmg1`
- `dmg2`
- `dmgType`
- `ac`
- `strength`
- `stealth`
- `containerCapacity`
- `vehAc`
- `vehHp`
- `vehSpeed`
- `capCargo`
- `capPassenger`
- `crew`

---

## 3. 依赖映射文档

本专项必须显式依赖以下文档：

- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)
- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)

用途说明：

- `item_type_mapping.md`：决定物品落到 `weapons/armor/tools/gear` 的哪一类
- `item_property_mapping.md`：解析武器属性缩写，如 `V/F/H/R/T/L/2H/A/LD`
- `book_source_mapping.md`：校验 `source`
- `spell_terminology_mapping.md`：辅助处理法器、伤害类型、术语展示
- `ability_skill_mapping.md`：辅助处理工具用途中涉及的属性或技能名

---

## 4. 目标输出目录

建议输出：

- [staging-data/items/weapons](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/weapons)
- [staging-data/items/armor](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/armor)
- [staging-data/items/tools](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/tools)
- [staging-data/items/gear](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/gear)
- [staging-data/_guides/items-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/items-cleaning-spec.md)
- [staging-data/_mappings/item-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/item-mapping.md)
- [staging-data/_mappings/item-value-unit.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/item-value-unit.md)
- [staging-data/_reviews/items-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/items-review-log.md)

目录映射固定为：

- `武器 -> staging-data/items/weapons`
- `护甲 -> staging-data/items/armor`
- `工具 -> staging-data/items/tools`
- `冒险装备 -> staging-data/items/gear`
- `坐骑与载具 -> staging-data/items/gear`

---

## 5. 目标结构基准

本专项不使用单一统一物品模型，而是按现有 `data` 真实落点分别对齐。

### 5.1 武器目标结构

参照 [data-items-weapons.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-weapons.ts)

- `id`
- `name`
- `source`
- `type`
- `description`
- `cost`
- `weight`
- `damage`
- `damageType`
- `properties`
- `mastery`
- `tags`

### 5.2 护甲目标结构

参照 [data-items-armor.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-armor.ts)

- `id`
- `name`
- `source`
- `type`
- `description`
- `cost`
- `weight`
- `ac`
- `strengthRequirement`
- `stealthDisadvantage`
- `tags`

### 5.3 工具目标结构

参照 [data-items-tools.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-tools.ts)

- `id`
- `name`
- `source`
- `type`
- `description`
- `cost`
- `weight`
- `toolAbility`
- `toolUtilize`
- `toolCraft`
- `toolVariants`
- `tags`

### 5.4 冒险装备/坐骑/载具目标结构

参照 [data-items-gear.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-gear.ts)

- `id`
- `name`
- `source`
- `type`
- `description`
- `cost`
- `weight`
- `tags`

---

## 6. 分类落点规则

### 6.1 武器

识别条件：

- 文件位于 `武器`
- 或 `type` 主码为 `M`、`R`

落点：

- `staging-data/items/weapons`

输出规则：

- `type` 固定写 `武器`
- `tags` 细分为 `简易武器/军用武器`、`近战/远程`

### 6.2 护甲

识别条件：

- 文件位于 `护甲`
- 或 `type` 主码为 `LA`、`MA`、`HA`、`S`

落点：

- `staging-data/items/armor`

输出规则：

- `type` 固定写 `护甲`
- `tags` 细分为 `轻甲/中甲/重甲/盾牌`

### 6.3 工具

识别条件：

- 文件位于 `工具`
- 或 `type` 主码为 `AT`、`T`、`GS`、`INS`

落点：

- `staging-data/items/tools`

输出规则：

- `type` 固定写 `工具`
- `tags` 细分为 `工匠工具/乐器/其他工具/游戏器具`

### 6.4 冒险装备

识别条件：

- 文件位于 `冒险装备`
- 或 `type` 主码为 `G`、`A`、`AF`、`SCF`、`FD`

落点：

- `staging-data/items/gear`

输出规则：

- `type` 根据现有 `gear` 风格写为 `杂物/弹药/法器`
- `tags` 承接细分类

### 6.5 坐骑与载具

识别条件：

- 文件位于 `坐骑与载具`
- 或 `type` 主码为 `MNT`、`VEH`、`SHP`、`AIR`、`TAH`

落点：

- `staging-data/items/gear`

输出规则：

- 当前不新建独立载具数据库
- 参数统一压入 `description`
- `tags` 区分 `坐骑/载具/船只/飞行载具/马具`

---

## 7. 基础字段映射

### 7.1 `id`

生成规则：

- `<slug>-<source-lower>`

示例：

- `longsword-xphb`
- `backpack-xphb`
- `plate-armor-xphb`

规则：

- 同名异源必须并存
- 不覆盖旧条目

### 7.2 `name`

- 直接使用 `name`
- 不做二次翻译
- 编码异常时不主观猜改

### 7.3 `source`

- 直接使用原始 `source`
- 保留 `PHB`、`XPHB`、`TCE` 等细粒度来源
- 不替换为“官方规则”

### 7.4 `type`

源里经常是复合值：

- `M|XPHB`
- `G|XPHB`
- `HA|XPHB`

处理规则：

- 只取 `|` 之前的主码
- 通过 [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md) 决定目标落点和 `tags`
- 不直接把原始复合值写入候选层

---

## 8. 价格与重量规则

### 8.1 `cost`

来源：

- `value`

执行规则：

- 原始 `value` 默认按 `cp` 解释
- 标准化输出优先级：
  - 能整除 `100` 的优先转 `GP`
  - 能整除 `10` 且不足 `100` 的优先转 `SP`
  - 其余保留 `CP`

示例：

- `1500 -> 15 GP`
- `200 -> 2 GP`
- `40 -> 4 SP`
- `5 -> 5 CP`

候选层必须同时记录：

- `rawValue`
- `rawUnitAssumption = cp`
- `normalizedCost`

### 8.2 价格例外

以下情况不得自动换算：

- `x4`
- `x2`
- `变量`
- `---`
- 套组或变体式价格
- 明显的规则说明型价格

处理方式：

- 主字段尽量保留展示文本
- 同时写入 `reviewNotes`
- 标记 `needs_manual_review`

### 8.3 `weight`

来源：

- 数字型 `weight`
- 或缺失

处理规则：

- 最终统一为展示字符串
- 缺失写 `---`
- 跟随目标文件现有风格，不强行全局统一

当前观察结论：

- `weapons/armor/gear` 倾向本地化重量字符串
- `tools` 中较多 `lb` 风格

执行要求：

- 候选层按目标文件“就近一致”输出

---

## 9. 武器清洗规则

### 9.1 源字段

- `weaponCategory`
- `property`
- `mastery`
- `dmg1`
- `dmg2`
- `dmgType`

### 9.2 字段映射

- `damage <- dmg1`
- `damageType <- dmgType`
- `properties <- property[]`
- `mastery <- mastery`
- `tags <- weaponCategory + attackMode`

### 9.3 标签规则

- `weaponCategory = simple -> 简易武器`
- `weaponCategory = martial -> 军用武器`
- `M -> 近战`
- `R -> 远程`

### 9.4 `property` 处理

例如：

- `V|XPHB`

处理规则：

1. 取主码 `V`
2. 用 [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md) 映射中文属性
3. 输出到 `properties`

### 9.5 `dmg2` 处理

规则：

- 不另建正式字段
- 统一折算进 `properties`
- 示例：
  - `dmg1 = 1d8`
  - `dmg2 = 1d10`
  - `property = V`
  - 输出 `properties: ["多用 (1d10)"]`

### 9.6 `mastery` 处理

现状：

- 原始常见写法如 `削弱|XPHB`
- 现有 [data-items-weapons.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-weapons.ts) 使用的是完整长说明

执行规则：

- 候选层可先保留为“精通名”或“精通简述”
- 正式并入 `data` 前再渲染成现有长说明格式
- 不丢失原始精通信息

### 9.7 不进入武器主字段的内容

- `fluff.images`
- `weapon`
- `sword`
- `referenceSources`
- `basicRules2024`
- `srd52`

---

## 10. 护甲清洗规则

### 10.1 源字段

- `ac`
- `strength`
- `stealth`

### 10.2 字段映射

- `ac -> ac`
- `strength -> strengthRequirement`
- `stealth -> stealthDisadvantage`
- `tags <- armor kind`

### 10.3 标签规则

- `LA -> 轻甲`
- `MA -> 中甲`
- `HA -> 重甲`
- `S -> 盾牌`

### 10.4 `ac` 输出规则

- 原始纯整数 AC，直接写整数样式字符串
- 若需表现敏捷修正，写成现有风格：
  - `14 + 敏捷修正 (最多2)`
  - `11 + 敏捷修正`

### 10.5 `strength` 输出规则

- 转成 `strengthRequirement`
- 若缺失则省略

### 10.6 `stealth` 输出规则

- `true -> stealthDisadvantage: true`
- `false -> stealthDisadvantage: false`
- 若缺失则按该目标文件现有习惯决定是否省略

### 10.7 盾牌规则

- 盾牌固定进入 `armor`
- 不进入 `weapons`
- `ac` 可写为 `+2`

---

## 11. 工具清洗规则

### 11.1 常见结构

工具条目的 `entries` 常分为：

- `Ability:`
- `Utilize:`
- `Craft:`

例如 [alchemist_s_supplies-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/工具/alchemist_s_supplies-xphb.json)

### 11.2 字段映射

- `toolAbility <- Ability`
- `toolUtilize <- Utilize`
- `toolCraft <- Craft`
- `toolVariants <- explicit variants`
- `description <- general summary`

### 11.3 `toolAbility`

处理规则：

- 提取单个属性名
- 保持当前目标库的显示风格

### 11.4 `toolUtilize`

拆解规则：

- 若文本中带 `DC`
- 拆成对象数组：
  - `action`
  - `dc`
  - `description`

若原始文本过于自由：

- 保留为简化说明
- 写入 `reviewNotes`
- 标记 `tool_parse_needs_review = true`

### 11.5 `toolCraft`

处理规则：

- `{@item ...}` 去壳后提取物品名
- 输出为字符串数组
- 不保留富文本标签

### 11.6 `toolVariants`

适用场景：

- 游戏器具
- 乐器
- 明确的子变体工具

规则：

- 每项尽量保留为短文本
- 格式可为 `名称 (价格, 重量)`

---

## 12. 冒险装备清洗规则

### 12.1 适用范围

- 普通冒险装备
- 弹药
- 法器
- 套组
- 容器
- 消耗品

### 12.2 字段映射

- `description <- entries`
- `type` 按当前 `gear` 语义落值
- `tags` 承接细分类

### 12.3 `containerCapacity`

规则：

- 不新增正式字段
- 容量信息转进 `description`
- 同时写入 `reviewNotes`

例如 [backpack-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/冒险装备/backpack-xphb.json)
中的 `containerCapacity.weight: 30`，应变成描述文本的一部分。

### 12.4 弹药规则

- 弹药不进武器库
- 进入 `gear`
- `tags` 标注为 `弹药`

### 12.5 法器规则

- 法器不进工具库
- 进入 `gear`
- `tags` 标注为：
  - `奥术法器`
  - `德鲁伊法器`
  - `圣徽`

### 12.6 套组规则

- 套组进入 `gear`
- `description` 采用“内容清单型短描述”
- 不单独拆出子物品结构

---

## 13. 坐骑与载具清洗规则

### 13.1 源字段

- `capCargo`
- `capPassenger`
- `crew`
- `vehAc`
- `vehHp`
- `vehSpeed`

### 13.2 处理原则

当前 [data-items-gear.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-gear.ts) 对载具采用“说明文本化”模式，不新增正式结构字段。  
因此本专项固定规则为：

- 所有载具参数压入 `description`
- `type` 继续跟随 `gear`
- `tags` 区分 `坐骑/载具/船只/飞行载具/马具`

### 13.3 描述模板

建议统一格式：

- `速度: X mph | 船员: Y | 乘客: Z | 货物: N 吨 | AC: A | HP: B`

### 13.4 坐骑规则

- 生物坐骑仍归 `gear`
- 不新建 creature 模型
- 载重等信息压进 `description`

### 13.5 示例

[airship-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/坐骑与载具/airship-xphb.json)

应转为：

- `cost: 40000 GP`
- `description` 中包含：
  - `速度: 8 mph`
  - `船员: 10`
  - `乘客: 20`
  - `货物: 1 吨`
  - `AC: 13`
  - `HP: 300`

---

## 14. 正文清洗规则

### 14.1 `description`

来源：

- `entries`
- 若无 `entries`，则从结构字段拼接最小描述

处理规则：

- 压平成纯文本
- 列表转顺序文本
- 去除 5etools 标签壳：
  - `{@item}` -> 保留物品名
  - `{@spell}` -> 保留法术名
  - `{@dc}` -> 保留 DC 表达
- 不保留图片、internal path、credit

### 14.2 `tags`

来源：

- 一级目录
- 主类型码
- 目标库语义
- 特殊用途

示例：

- 武器：`简易武器`、`军用武器`、`近战`、`远程`
- 护甲：`轻甲`、`中甲`、`重甲`、`盾牌`
- gear：`弹药`、`法器`、`套组`、`坐骑`、`载具`
- tools：`工匠工具`、`乐器`、`其他工具`

---

## 15. 不结构化入主字段的信息

以下字段不进入正式候选主结构，但必须进入 `reviewNotes`：

- `rarity`
- `fluff.images`
- `referenceSources`
- `basicRules2024`
- `srd52`
- `translator`
- `containerCapacity`
- `weapon`
- `armor`
- 任意未被目标字段承接的布尔标记

处理原则：

- 能自然并入 `description` 的先并入
- 否则写入 `reviewNotes`
- 不为这些字段扩展现有 `ItemItem` 结构

---

## 16. 清洗流程

每个物品文件固定执行 8 步：

1. 读取源文件并提取 `name/source/type/value/weight`
2. 用 `type` 主码和所在一级目录确认目标落点
3. 按武器/护甲/工具/gear 分支提取专属字段
4. 用映射文档统一 `type/property/damage/mastery` 术语
5. 执行 `cp -> GP/SP/CP` 价格换算
6. 生成标准候选条目
7. 将未承接结构写入 `reviewNotes`
8. 输出到 `staging-data/items/*` 并登记到 `items-review-log.md`

---

## 17. 输出契约

每个候选文件至少包含：

### `metadata`
- `id`
- `name`
- `source`
- `sourceFile`
- `category`
- `status`

### `item`
- 对应目标库的正式字段

### `reviewNotes`
- 未承接字段
- 价格换算依据
- 特殊判断

### `warnings`
- 单位风险
- 复杂结构
- 需人工确认项

状态值固定为：

- `parsed`
- `parsed_with_warnings`
- `needs_manual_review`

---

## 18. 人工复核清单

每条物品候选至少检查：

- `source` 是否保留原始缩写
- `value` 是否按 `cp` 正确换算
- `type` 是否按主码正确分流
- `weight` 是否跟目标文件风格一致
- 武器 `property/mastery` 是否映射正确
- `dmg2` 是否正确转入 `properties`
- 护甲 `ac/strength/stealth` 是否正确转字段
- 工具 `Ability/Utilize/Craft` 是否拆解完整
- `containerCapacity`、`veh*` 是否没有误丢
- 载具/坐骑是否被错误拆成新模型
- `x4/x2/变量/---` 价格是否已拦截人工复核

---

## 19. 测试样本

应至少抽样验证以下文件：

- [longsword-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/武器/longsword-xphb.json)
- [plate_armor-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/护甲/plate_armor-xphb.json)
- [alchemist_s_supplies-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/工具/alchemist_s_supplies-xphb.json)
- [backpack-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/冒险装备/backpack-xphb.json)
- [airship-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品/坐骑与载具/airship-xphb.json)

验证目标：

- 武器属性、精通、伤害、价格换算是否正确
- 护甲 AC、力量需求、隐匿劣势是否正确
- 工具 `Ability/Utilize/Craft` 是否正确拆解
- 容量字段是否压入说明文本
- 载具参数是否压入说明文本
- 没有任何内容直接写入现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)

---

## 20. 执行前提与假设

- 本轮只覆盖 [中文data/05_物品](E:/YJF/DND2024characterbuilder-2.0/中文data/05_物品)，不含 [中文data/06_魔法物品](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品)
- `value` 默认按 `cp` 解释
- 现有 `ItemItem` 结构保持不变
- 容量、载具参数、稀有度只保留在说明层和 review 层
- `mastery` 在候选层允许先保留为精通名或简述，后续并入正式库时再对齐现有长说明格式

如果你要，我下一步可以继续按同样格式输出 [中文data/06_魔法物品](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品) 的清洗执行技术文档。