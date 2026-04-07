# 中文data/06_魔法物品 清洗执行技术文档

## 1. 文档目标

本专项只处理 [中文data/06_魔法物品](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品)，目标是把原始 5etools 风格魔法物品数据清洗成“与现有 `data-items-magic.ts` 和 `data-items-magic-armor.ts` 兼容的候选层”，统一先输出到过渡库存目录，不直接改动现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)。

三层职责固定为：

- [中文data/06_魔法物品](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品)：原始库存层
- [data](E:/YJF/DND2024characterbuilder-2.0/data)：只读目标格式参照层
- [staging-data/items/magic](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/magic)：清洗后的候选层

`source` 一律保留 `中文data` 原始缩写，如 `XDMG`、`DMG`、`EFA`、`BMT`、`CM`、`GriffonsSaddlebag2`，不沿用现有 `data` 的粗粒度来源。

---

## 2. 输入范围

### 2.1 一级目录

- [01_护甲](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/01_护甲)
- [02_药水](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/02_药水)
- [03_戒指](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/03_戒指)
- [04_权杖](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/04_权杖)
- [05_卷轴](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/05_卷轴)
- [06_法杖](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/06_法杖)
- [07_魔杖](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/07_魔杖)
- [08_武器](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/08_武器)
- [09_奇物](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/09_奇物)
- [11_马具与坐骑装备](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/11_马具与坐骑装备)

### 2.2 稀有度子目录

该目录下广泛按稀有度分层：

- `01_普通`
- `02_非凡`
- `03_珍稀`
- `04_极珍稀`
- `05_传说`

稀有度目录本身不是目标文件落点，而是 `rarity` 的主要来源之一。

### 2.3 高频原始字段

已确认高频出现的字段包括：

- `name`
- `ENG_name`
- `source`
- `type`
- `rarity`
- `weight`
- `value`
- `entries`
- `reqAttune`
- `charges`
- `recharge`
- `rechargeAmount`
- `curse`
- `bonusAc`
- `ac`
- `strength`
- `stealth`
- `containerCapacity`
- `wondrous`
- `weapon`
- `armor`
- `staff`
- `spellScrollLevel`
- `otherSources`
- `valueReference`
- `lootTables`
- `fluff.images`
- `_isVariant`
- `namePrefix`

---

## 3. 依赖映射文档

本专项必须显式依赖以下文档：

- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)
- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)

用途说明：

- `item_type_mapping.md`：用于识别 `P/RG/RD/SC/ST/WD/W/LA/MA/HA/S` 等类型码
- `item_property_mapping.md`：辅助解析带武器母体的魔法武器或护甲描述
- `book_source_mapping.md`：校验 `source`
- `spell_terminology_mapping.md`：处理卷轴、施法、伤害、法术标签
- `ability_skill_mapping.md`：仅在物品描述中出现属性/技能要求时辅助解释

---

## 4. 目标输出目录

建议输出：

- [staging-data/items/magic/armor](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/magic/armor)
- [staging-data/items/magic/misc](E:/YJF/DND2024characterbuilder-2.0/staging-data/items/magic/misc)
- [staging-data/_guides/magic-items-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/magic-items-cleaning-spec.md)
- [staging-data/_mappings/magic-item-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/magic-item-mapping.md)
- [staging-data/_mappings/magic-item-value-unit.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/magic-item-value-unit.md)
- [staging-data/_reviews/magic-items-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/magic-items-review-log.md)

目录映射固定为：

- `01_护甲 -> staging-data/items/magic/armor`
- `02_药水 -> staging-data/items/magic/misc`
- `03_戒指 -> staging-data/items/magic/misc`
- `04_权杖 -> staging-data/items/magic/misc`
- `05_卷轴 -> staging-data/items/magic/misc`
- `06_法杖 -> staging-data/items/magic/misc`
- `07_魔杖 -> staging-data/items/magic/misc`
- `08_武器 -> staging-data/items/magic/misc`
- `09_奇物 -> staging-data/items/magic/misc`
- `11_马具与坐骑装备 -> staging-data/items/magic/misc`

---

## 5. 目标结构基准

### 5.1 魔法护甲目标结构

参照 [data-items-magic-armor.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-magic-armor.ts)

- `id`
- `name`
- `source`
- `type`
- `description`
- `cost`
- `weight`
- `rarity`
- `ac` 可选
- `tags`

### 5.2 其他魔法物品目标结构

参照 [data-items-magic.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-magic.ts)

- `id`
- `name`
- `source`
- `type`
- `description`
- `cost`
- `weight`
- `rarity`
- `tags`

### 5.3 本专项限制

候选层必须严格跟随这两个真实结构，不扩展正式字段。  
以下信息不直接进入主字段：

- 同调要求
- 充能
- 诅咒
- 回复机制
- 卷轴环阶
- 施法 DC / 攻击加值
- `valueReference`
- `lootTables`
- `otherSources`

这些内容统一保留在 `description` 和 `reviewNotes`。

---

## 6. 分类落点规则

### 6.1 落入 `magic/armor` 的条目

识别条件：

- 文件位于 `01_护甲`
- 或原始条目本体是护甲/盾牌，且目标消费面更接近 [data-items-magic-armor.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-items-magic-armor.ts)

包括：

- 魔法护甲
- 魔法盾牌
- 带基础护甲变体的魔法护甲
- `+1/+2/+3` 护甲与盾牌
- `armor of ...`
- `_1_plate_armor-xdmg.json` 这类“基础护甲 + 魔法模板”条目

### 6.2 落入 `magic/misc` 的条目

识别条件：

- 位于 `02_药水`、`03_戒指`、`04_权杖`、`05_卷轴`、`06_法杖`、`07_魔杖`、`08_武器`、`09_奇物`、`11_马具与坐骑装备`
- 或本体更接近普通魔法物品，而不是护甲模型

包括：

- 药水
- 戒指
- 权杖
- 卷轴
- 法杖
- 魔杖
- 魔法武器
- 奇物
- 魔法马具/坐骑装备

### 6.3 不额外新建的库

当前不新建：

- `magic-weapons.ts`
- `magic-scrolls.ts`
- `magic-rings.ts`

这些都统一进入 `magic/misc`，靠 `type + tags` 区分。

---

## 7. 基础字段映射

### 7.1 `id`

生成规则：

- `<slug>-<source-lower>`

示例：

- `potion-of-healing-xdmg`
- `bag-of-holding-xdmg`
- `_1-plate-armor-xdmg`

若文件本身是基础护甲变体，允许保留下划线或模板前缀对应的唯一 slug，但建议在候选层同时记录可读别名，避免后续并库时冲突。

### 7.2 `name`

- 直接取原始 `name`
- 不做翻译
- `namePrefix` 不单独成字段，但应合并进 `name` 或在 `reviewNotes` 中记录其构成来源

### 7.3 `source`

- 直接保留原始 source
- 例如：
  - `XDMG`
  - `DMG`
  - `EFA`
  - `BMT`
  - `CM`

### 7.4 `rarity`

来源优先级：

1. 原始条目的 `rarity`
2. 所在稀有度目录
3. 人工复核

转换规则：

- 保持当前目标库的中文稀有度展示
- 如源值是英文枚举：
  - `common -> 普通`
  - `uncommon -> 非凡`
  - `rare -> 珍稀`
  - `very rare -> 极珍稀`
  - `legendary -> 传说`
- 若条目本身写 `rarity: "varies"` 或变体依赖法术等级，则主字段允许写 `变动`，同时必须在 `reviewNotes` 解释变动依据

---

## 8. 价格与重量规则

### 8.1 `cost`

来源：

- `value`

执行规则：

- 与普通物品同样，原始 `value` 默认按 `cp` 解释
- 但魔法物品需要额外考虑“不定价”场景

已确认样本：

- [potion_of_healing-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/02_药水/01_普通/potion_of_healing-xdmg.json)
  - `value: 5000 -> 50 GP`
- [bag_of_holding-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/09_奇物/02_非凡/bag_of_holding-xdmg.json)
  - 无 `value`，但有 `valueReference: 400`
  - 当前不应用 `valueReference` 直接替代 `cost`
- 大量条目在现有 `data` 中以 `---` 表示价格不固定

执行规则固定为：

- 有明确 `value` 时，按 `cp` 转换：
  - `5000 -> 50 GP`
- 无 `value` 时，`cost = ---`
- `valueReference` 仅记录在 `reviewNotes`
- 不把 `valueReference` 当正式价格

### 8.2 `weight`

来源：

- 数字型 `weight`
- 缺失
- 变动型物品的“变量重量”

转换规则：

- 正常数字转成目标库展示字符串
- 缺失写 `---`
- 可变重量写 `变动`
- 与现有 `data-items-magic*.ts` 风格保持一致

---

## 9. 魔法护甲清洗规则

### 9.1 典型来源结构

护甲类条目常见字段：

- `type`
- `ac`
- `bonusAc`
- `strength`
- `stealth`
- `reqAttune`
- `charges`
- `recharge`
- `curse`
- `_isVariant`
- `namePrefix`

### 9.2 `type`

输出规则：

- 候选层统一写 `护甲`
- `tags` 再细分：
  - `护甲`
  - `盾牌`
  - `轻甲`
  - `中甲`
  - `重甲`
  - `魔法物品`

### 9.3 `ac`

处理规则：

- 如果原始条目给出完整 `ac`，优先用原始基础 AC 规则
- 如果是 `bonusAc` 形式：
  - 盾牌可直接折算成最终展示值，例如 `+3`、`+4`、`+5`
  - 护甲如果是 `armor +1/+2/+3` 形式，可写成：
    - `基础+1`
    - `基础+2`
    - `基础+3`
- 如果条目已经指定具体底甲，例如精灵链甲，则直接写完整 AC 字符串

### 9.4 同调、诅咒、充能

规则：

- `reqAttune` 不单独建字段
- `curse` 不单独建字段
- `charges/recharge/rechargeAmount` 不单独建字段

统一处理方式：

- 合并进 `description` 前段或中段
- 在 `reviewNotes` 保留原始结构

### 9.5 变体底甲条目

例如：
- `_1_plate_armor-xdmg.json`
- `_1_chain_mail-xdmg.json`

特点：

- 基于普通护甲
- 带 `namePrefix`
- 可能带充能、回复、同调

处理规则：

- 视为“可导入候选”
- 不单独创建“模板 + 母体护甲”双模型
- 直接生成具体魔法护甲条目
- `description` 必须包含底甲类型说明
- `ac/strength/stealth` 尽量继承基础护甲表现
- `_isVariant` 写入 `reviewNotes`

---

## 10. 其他魔法物品清洗规则

### 10.1 药水

识别条件：

- `type = P`
- 位于 `02_药水`

处理规则：

- `type` 输出为 `药水`
- `tags` 至少包含：
  - `消耗品`
  - `药水`
- `description` 保留核心效果
- 价格有明确 `value` 时按 `cp` 换算

样例：
- [potion_of_healing-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/02_药水/01_普通/potion_of_healing-xdmg.json)

### 10.2 奇物

识别条件：

- `wondrous = true`
- 或 `type = W`
- 或位于 `09_奇物`

处理规则：

- `type` 输出为 `奇物`
- `tags` 细分功能，如：
  - `容器`
  - `奇物`
  - `工具`
  - `移动`
- `containerCapacity` 不建正式字段，压进 `description`
- `classFeatures`、`optionalfeatures` 不进正式字段，只写 review

样例：
- [bag_of_holding-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/09_奇物/02_非凡/bag_of_holding-xdmg.json)

### 10.3 卷轴

识别条件：

- `type = SC`
- 位于 `05_卷轴`

处理规则：

- `type` 输出为 `卷轴`
- `spellScrollLevel` 不建正式字段
- `description` 中必须保留：
  - 卷轴施法方式
  - DC/攻击加值
  - 失败后是否消失
- `tags` 至少包含：
  - `卷轴`
  - `消耗品`
  - 若是法术卷轴则再加 `法术物品`

样例：
- [spell_scroll_cantrip_-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/05_卷轴/01_普通/spell_scroll_cantrip_-xdmg.json)

### 10.4 戒指 / 权杖 / 法杖 / 魔杖

处理规则：

- 统一进入 `magic/misc`
- `type` 分别写为：
  - `戒指`
  - `权杖`
  - `法杖`
  - `魔杖`
- 同调、充能、诅咒仍只进 `description + reviewNotes`
- 若本体具有施法次数、恢复机制，必须保留在描述文本中

### 10.5 魔法武器

处理规则：

- 当前不新建独立 `magic-weapons`
- 统一进入 `magic/misc`
- `type` 可写 `武器`
- `tags` 补充：
  - `武器`
  - `魔法物品`
- 若原始条目本质是“任意武器 +1”模板，则：
  - 不拆成全武器库展开
  - 以通用魔法武器条目保存
  - 可在 `description` 中标明适用武器范围

### 10.6 马具与坐骑装备

处理规则：

- 进入 `magic/misc`
- `type` 根据条目本体写 `奇物` 或 `坐骑装备`
- 当前不新建独立坐骑魔法装备系统
- 参数和限制压入 `description`

---

## 11. 正文清洗规则

### 11.1 `description`

来源：

- `entries`

处理规则：

- 压平成纯文本
- 列表、表格、项目符号统一转成顺序文本
- 去除 5etools 标签壳：
  - `{@spell}` -> 保留法术名
  - `{@item}` -> 保留物品名
  - `{@dc}` -> 保留 DC 表达
  - `{@dice}` -> 保留骰值
  - `{@hit}` -> 保留攻击加值文本
  - `{@filter}` -> 保留显示文本
- 不保留内部链接语法本体
- 不保留图片、credit、internal path

### 11.2 魔法物品特有说明必须保留

以下内容即便不结构化，也必须写进 `description`：

- 同调要求
- 诅咒效果
- 充能次数
- 回复时机
- 卷轴施法条件
- 基础护甲/武器类型说明
- 限定职业/限定生物/限定体型的使用条件

---

## 12. `tags` 规则

### 12.1 魔法护甲

常见标签：

- `护甲`
- `盾牌`
- `轻甲`
- `中甲`
- `重甲`
- `魔法物品`
- `防护`
- `诅咒`
- `移动`
- `治疗`

### 12.2 其他魔法物品

常见标签：

- `药水`
- `消耗品`
- `奇物`
- `卷轴`
- `戒指`
- `权杖`
- `法杖`
- `魔杖`
- `武器`
- `容器`
- `魔法物品`

规则：

- `tags` 用于细分用途，不复制整段描述
- 若条目兼具多个性质，可保留多个标签
- 若功能不清楚，保底保留主类标签和 `魔法物品`

---

## 13. 不结构化入主字段的信息

以下字段不进入正式候选主结构，但必须进入 `reviewNotes`：

- `reqAttune`
- `charges`
- `recharge`
- `rechargeAmount`
- `curse`
- `spellScrollLevel`
- `otherSources`
- `valueReference`
- `lootTables`
- `otherSources`
- `wondrous`
- `staff`
- `weapon`
- `armor`
- `_isVariant`
- `namePrefix`
- `fluff.images`
- `referenceSources`
- `basicRules2024`
- `srd52`
- `translator`

处理原则：

- 能自然并入 `description` 的优先并入
- 其余写入 `reviewNotes`
- 不扩展现有 `ItemItem` 结构

---

## 14. 清洗流程

每个魔法物品文件固定执行 8 步：

1. 读取源文件并提取 `name/source/type/rarity/value/weight`
2. 根据一级目录与原始类型判断落入 `magic/armor` 还是 `magic/misc`
3. 提取护甲专属字段或通用魔法物品字段
4. 清洗 `entries`，移除 5etools 标签
5. 处理价格与重量
6. 把同调、诅咒、充能、卷轴等级等并入 `description` 或 `reviewNotes`
7. 生成标准候选条目
8. 输出到 `staging-data/items/magic/*` 并登记到 `magic-items-review-log.md`

---

## 15. 输出契约

每个候选文件至少包含：

### `metadata`
- `id`
- `name`
- `source`
- `sourceFile`
- `category`
- `status`

### `item`
- 对应目标库正式字段

### `reviewNotes`
- 未承接字段
- 价格换算依据
- 特殊判断
- 变体底甲说明
- 同调/诅咒/充能原始结构

### `warnings`
- 不定价
- 变体项
- 复杂规则条目
- 需人工确认项

状态值固定为：

- `parsed`
- `parsed_with_warnings`
- `needs_manual_review`

---

## 16. 人工复核清单

每条魔法物品候选至少检查：

- `source` 是否保留原始缩写
- `rarity` 是否来自正确来源
- `value` 是否按 `cp` 正确换算，或被正确标记为 `---`
- `valueReference` 是否没有误写成正式价格
- 同调要求是否完整写入 `description`
- 诅咒是否没有丢失
- `charges/recharge/rechargeAmount` 是否已被保留
- 护甲类 `ac/bonusAc/strength/stealth` 是否正确折算
- 变体底甲条目是否没有误拆
- 卷轴的 `spellScrollLevel`、DC、攻击加值是否已保留
- `otherSources`、`lootTables` 是否进入 review 而不是主字段
- 图片和内部资源路径是否没有污染正式数据

---

## 17. 测试样本

建议至少抽样验证以下文件：

- [potion_of_healing-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/02_药水/01_普通/potion_of_healing-xdmg.json)
- [bag_of_holding-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/09_奇物/02_非凡/bag_of_holding-xdmg.json)
- [_1_plate_armor-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/01_护甲/02_非凡/_1_plate_armor-xdmg.json)
- [amulet_of_proof_against_detection_and_location-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/09_奇物/02_非凡/amulet_of_proof_against_detection_and_location-xdmg.json)
- [spell_scroll_cantrip_-xdmg.json](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品/05_卷轴/01_普通/spell_scroll_cantrip_-xdmg.json)

验证目标：

- 药水的价格与描述是否正确
- 奇物的容量说明、功能说明是否保留
- 护甲变体的同调、充能、底甲信息是否保留
- 奇物的同调要求是否正确保留
- 卷轴的施法规则、DC、攻击加值是否正确保留
- 没有任何内容直接写入现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)

---

## 18. 执行前提与假设

- 本轮只覆盖 [中文data/06_魔法物品](E:/YJF/DND2024characterbuilder-2.0/中文data/06_魔法物品)
- `value` 默认按 `cp` 解释
- `valueReference` 不作为正式价格
- 现有 `ItemItem` 结构保持不变
- 同调、诅咒、充能、卷轴等级只保留在描述层和 review 层
- 魔法武器暂不拆成独立库，统一落到 `magic/misc`
- 基础护甲变体条目视为可落地候选，不额外建立模板系统

如果你要，我可以继续按同样 md 文档格式输出 [中文data/07_专长](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长) 的清洗执行技术文档。