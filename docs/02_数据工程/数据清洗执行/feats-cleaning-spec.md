# 中文data/07_专长 清洗执行技术文档

## 1. 文档目标

本专项只处理 [中文data/07_专长](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长)，目标是把原始 5etools 风格专长数据清洗成“与现有 `data/data-feats.ts` 兼容的候选层”，统一先输出到过渡库存目录，不直接改动现有 [data/data-feats.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-feats.ts)。

三层职责固定为：

- [中文data/07_专长](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长)：原始库存层
- [data/data-feats.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-feats.ts)：只读目标格式参照层
- [staging-data/feats](E:/YJF/DND2024characterbuilder-2.0/staging-data/feats)：清洗后的候选层

`source` 一律保留 `中文data` 原始缩写，如 `PHB`、`XPHB`、`TCE`、`XGE`、`FRHoF`、`GrimHollowPG24`，不沿用现有 `data` 中的粗粒度来源。

---

## 2. 输入范围

### 2.1 一级目录

- [01_2024_新规则专长](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/01_2024_新规则专长)
- [02_2014_经典专长](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/02_2014_经典专长)
- [修改备忘录.md](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/修改备忘录.md)

### 2.2 2024 专长子目录

- `01_起源专长`
- `02_一般专长`
- `03_战斗风格`
- `04_史诗恩惠`
- `05_其他分类`

### 2.3 2014 专长子目录

2014 经典专长主要按来源书缩写分组，例如：

- `PHB`
- `TCE`
- `XGE`
- `BGG`
- `DSotDQ`
- `ERLW`
- `FTD`
- 以及其他第三方或合作内容来源目录

### 2.4 高频原始字段

- `ENG_name`
- `name`
- `source`
- `category`
- `prerequisite`
- `ability`
- `repeatable`
- `entries`
- `reprintedAs`
- `page`
- `translator`

---

## 3. 依赖映射文档

本专项必须显式依赖以下文档：

- [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md)
- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)
- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)

用途说明：

- `feat_prereq_mapping.md`：专长分类码、前置条件键位、职业缩写说明，是本专项的核心字典
- `ability_skill_mapping.md`：前置条件中的属性、技能、熟练项归一
- `book_source_mapping.md`：`source` 校验
- `spell_terminology_mapping.md`：处理专长正文中的法术、施法、伤害、豁免术语
- `item_type_mapping.md`：处理正文中的武器、护甲、工具、法器类别
- `item_property_mapping.md`：处理正文中的武器属性词条

---

## 4. 目标输出目录

建议输出：

- [staging-data/feats/2024](E:/YJF/DND2024characterbuilder-2.0/staging-data/feats/2024)
- [staging-data/feats/2014](E:/YJF/DND2024characterbuilder-2.0/staging-data/feats/2014)
- [staging-data/_guides/feats-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/feats-cleaning-spec.md)
- [staging-data/_mappings/feat-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/feat-mapping.md)
- [staging-data/_reviews/feats-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/feats-review-log.md)

目录映射固定为：

- `01_2024_新规则专长 -> staging-data/feats/2024`
- `02_2014_经典专长 -> staging-data/feats/2014`

`修改备忘录.md` 不进入候选数据，只进入 review 记录。

---

## 5. 目标结构基准

本专项必须以 [data/data-feats.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-feats.ts) 的真实字段为准。当前可确认的正式字段为：

- `id`
- `name`
- `source`
- `category`
- `description`
- `benefits`
- `prerequisite` 可选
- `repeatable` 可选

候选层必须严格跟随这个结构，不新增正式字段。

以下信息不直接进入主字段：

- `ability`
- `reprintedAs`
- `page`
- `translator`
- 无法稳定结构化的复杂 prerequisite 原始对象

这些内容统一保留在 `reviewNotes`，必要时其语义转写到 `benefits` 或 `prerequisite` 文本中。

---

## 6. 分类落点规则

### 6.1 2024 专长分类

2024 专长优先依据目录名与 `category` 双重判定，分类码参照 [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md)。

- `O -> 起源专长`
- `G -> 通用专长`
- `FS -> 战斗风格专长`
- `EB -> 史诗恩惠专长`

落点规则：

- `01_起源专长` 中条目默认映射为 `起源专长`
- `02_一般专长` 中条目默认映射为 `通用专长`
- `03_战斗风格` 中条目默认映射为 `战斗风格专长`
- `04_史诗恩惠` 中条目默认映射为 `史诗恩惠专长`
- `05_其他分类` 中条目必须先看 `category`，若仍无法稳定归类，则标记 `needs_manual_review`

### 6.2 2014 经典专长分类

2014 专长目录主要按来源书分组，不直接携带 2024 风格分类层。

执行规则：

- 2014 专长默认落为 `经典专长候选`
- 在候选层中仍要给出目标 `category`，但必须基于当前 `data/data-feats.ts` 的消费模型做人类可读归类
- 推荐归类优先级：
  - 明确属于战斗风格体系的，归 `战斗风格专长`
  - 明确是 19 级恩惠或类似 Epic Boon 的，归 `史诗恩惠专长`
  - 其余默认归 `通用专长`

### 6.3 不自动入正式分类的情况

以下情况不得仅靠目录自动分类：

- `category = D` 等特殊分类
- 第三方扩展中自定义分类
- 同名专长跨来源版本含义不同

这些条目必须进入 `reviewNotes`，并标记人工确认。

---

## 7. 基础字段映射

### 7.1 `id`

生成规则：

- `<slug>-<source-lower>`

示例：

- `alert-xphb`
- `actor-phb`
- `fighting-initiate-tce`

执行要求：

- 同名异源必须并存
- 不覆盖现有 `data` 条目
- 2014 与 2024 同名版本必须分开

### 7.2 `name`

- 直接使用源文件 `name`
- 不做二次翻译
- 编码异常时不主观修正字段值，只在文档执行中按 UTF-8 读取要求处理

### 7.3 `source`

- 直接使用原始 `source`
- 保留 `PHB`、`XPHB`、`TCE`、`XGE`、`FRHoF` 等细粒度来源
- 不替换为“官方规则”或“第三方原创”

### 7.4 `category`

来源优先级：

1. 原始 `category`
2. 所在目录
3. 人工复核

转换规则：

- `O -> 起源专长`
- `G -> 通用专长`
- `FS -> 战斗风格专长`
- `EB -> 史诗恩惠专长`
- 无稳定映射时暂写 `待确认分类`，并标记 `needs_manual_review`

---

## 8. `prerequisite` 前置条件清洗规则

### 8.1 原始结构

原始 `prerequisite` 通常是对象数组，常见键位包括：

- `level`
- `ability`
- `race`
- `proficiency`
- `background`
- `spellcasting`
- `spellcasting2020`
- `spellcastingFeature`
- `feat`
- `feature`
- `otherSummary`

键位语义以 [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md) 为准。

### 8.2 输出目标

当前目标库只承接一个可读字符串：

- `prerequisite: string`

因此本专项必须把原始对象数组压平成一条稳定、可读、可筛查的前置条件文本。

### 8.3 转换规则

- `level: 4` -> `等级4+`
- `ability: [{ cha: 13 }]` -> `魅力13+`
- 多属性候选如 `str/dex` -> `力量或敏捷13+`
- `spellcasting` / `spellcasting2020` -> `施法能力`
- `spellcastingFeature` -> `特定施法特性`
- `race` -> `特定种族要求`
- `background` -> `特定背景要求`
- `feat` -> `需要先拥有某专长`
- `feature` -> `需要特定特性`
- `otherSummary` -> 直接并入可读文本

### 8.4 多条件拼接

拼接规则：

- 同一 prerequisite 对象内多条件用 `，` 连接
- 多个 prerequisite 对象若语义为“或”，在 review 中保留原始结构，并尽量用 `或` 连接
- 若无法确定是“且”还是“或”，保守写入 `reviewNotes`，主字段采用最接近源码展示的文本

### 8.5 2014 与 2024 差异

- 2024 专长前置条件通常更结构化，应优先从 `prerequisite` 对象生成
- 2014 专长往往没有 `prerequisite` 字段，或语义散落在正文中；这类条目若源码无结构化前置，则主字段可省略 `prerequisite`
- 不从 `entries` 主观推断前置，除非已在 `feat_prereq_mapping.md` 中有稳定映射依据

---

## 9. `entries` 到 `description/benefits` 的清洗规则

### 9.1 `description`

来源：

- `entries[0]`

处理规则：

- 若 `entries[0]` 是摘要句，则直接作为 `description`
- 去除 5etools 标签壳，保留可读文字
- 保持一到两句短摘要风格
- 不把长列表、表格、分段正文压进 `description`

### 9.2 `benefits`

来源：

- `entries` 中具名 `type: "entries"` 段
- 2014 数据中的 `type: "list"` 项
- 其他可稳定识别的 benefit 条目

输出目标：

- `benefits: string[]`

### 9.3 2024 专长 benefit 拆解

2024 常见结构：

- 第一段为“你获得以下增益”
- 后续多段为具名小节，如 `Impersonation`、`Mimicry`

转换规则：

- 跳过纯提示句，如“你获得以下增益”
- 每个具名小节输出一条 benefit
- 格式建议：
  - `**伪装**: ...`
  - `**拟声**: ...`

### 9.4 2014 专长 benefit 拆解

2014 常见结构：

- 首句摘要
- 后接 `type: "list"` 的条目数组

转换规则：

- 列表中的每一项单独生成一个 benefit
- 若无具名标题，则直接保留为一句 benefit 文本
- 不强行补造标题

### 9.5 富文本清洗

正文中常见标签：

- `{@skill ...}`
- `{@spell ...}`
- `{@dc ...}`
- `{@dice ...}`
- `{@variantrule ...}`
- `{@item ...}`
- `{@condition ...}`

处理规则：

- 去掉标签外壳
- 保留显示文本和规则值
- 不保留 5etools 语法本体

示例：

- `{@skill 欺瞒|XPHB}` -> `欺瞒`
- `{@dc 8}` -> `DC 8`
- `{@spell 侦测魔法|PHB}` -> `侦测魔法`

### 9.6 表格与复杂块

若 `entries` 中出现：

- `type: "table"`
- 多层嵌套 list
- 复杂 choose 结构

处理规则：

- 能压平为 benefit 文本的则压平
- 不能稳定压平的进入 `reviewNotes`
- 不为 `FeatItem` 新增结构字段

---

## 10. `ability` 与属性提升处理规则

### 10.1 原始结构

专长中常见：

- `ability: [{ cha: 1 }]`
- `ability: [{ choose: { from: [...] } }]`

### 10.2 处理原则

当前 [data/data-feats.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-feats.ts) 没有独立 `ability` 字段，因此本专项不新增正式字段。

执行规则：

- 若 `ability` 的效果已经在正文 `entries` 中明确表达，则不额外结构化
- 若正文未明确表达，但原始 `ability` 存在，需在 `reviewNotes` 中记录原始能力提升逻辑
- 不因为 `ability` 存在而改造现有 `FeatItem` 模型

### 10.3 特例

对以下条目必须重点检查：

- `Ability Score Improvement`
- `Actor`
- `Athlete`
- `Chef`
- `Crusher`
- `Resilient`

这些专长往往既有 `ability` 结构，又在 `entries` 中写出属性提升文本，必须确保两者语义一致。

---

## 11. `repeatable` 处理规则

### 11.1 目标字段

当前目标库允许：

- `repeatable: true`

### 11.2 映射规则

- 原始存在 `repeatable: true` -> 直接写入
- 原始缺失 -> 省略字段
- 不从文本中主观推断可重复获取，除非源文件明确给出结构化标记

重点样例：

- `magic-initiate-xphb.json`
- `skilled-xphb.json`
- 以及部分第三方可重复专长

---

## 12. 2014 与 2024 并行策略

### 12.1 并存原则

- `PHB` 与 `XPHB` 同名专长必须并存
- 2014 与 2024 版本绝不覆盖
- `reprintedAs` 只作为版本链参考，不作为覆盖依据

### 12.2 `reprintedAs`

处理规则：

- 不进入正式字段
- 写入 `reviewNotes`
- 用于提示该 2014 专长可能已有 2024 重印版

示例：

- `actor-phb.json` 的 `reprintedAs: ["演员|XPHB"]`

这类条目仍然要保留 `actor-phb` 候选，不自动合并进 `actor-xphb`。

---

## 13. 不结构化入主字段的信息

以下字段不进入正式候选主结构，但必须进入 `reviewNotes`：

- `ability`
- `reprintedAs`
- `page`
- `translator`
- 无法稳定压平的复杂 prerequisite 原始对象
- 无法稳定落入 `benefits` 的 table / choose / variant 结构

处理原则：

- 能自然体现在 `description` 或 `benefits` 的，优先体现在正文
- 其余写入 `reviewNotes`
- 不扩展现有 `FeatItem` 结构

---

## 14. 清洗流程

每个专长文件固定执行 8 步：

1. 读取源文件并提取 `ENG_name/name/source/category/prerequisite/ability/repeatable/entries`
2. 根据上级目录和 `category` 判定目标分类
3. 生成 `id`
4. 清洗 `prerequisite`，输出单条可读文本
5. 清洗 `entries`，生成 `description` 和 `benefits`
6. 处理 `repeatable` 与 `ability`
7. 将未承接结构写入 `reviewNotes`
8. 输出到 `staging-data/feats/*` 并登记到 `feats-review-log.md`

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

### `feat`

- 对应目标库的正式字段

### `reviewNotes`

- 未承接字段
- 前置条件原始结构摘要
- 重印关系
- 分类判断依据

### `warnings`

- 复杂 prerequisite
- 特殊分类
- 复杂富文本
- 需人工确认项

状态值固定为：

- `parsed`
- `parsed_with_warnings`
- `needs_manual_review`

---

## 16. 人工复核清单

每条专长候选至少检查：

- `source` 是否保留原始缩写
- `id` 是否与同名异源冲突
- `category` 是否按分类码和目录正确映射
- 2024 专长是否正确跳过“你获得以下增益”这类提示句
- 2014 专长的列表项是否正确拆成 `benefits`
- `prerequisite` 是否正确压平成可读文本
- `ability` 是否没有被误丢，或已在正文中体现
- `repeatable` 是否只在源码明确标记时写入
- `reprintedAs` 是否只进入 review，而未覆盖旧版条目
- 富文本标签是否已去壳
- 特殊分类和第三方条目是否正确标记人工复核

---

## 17. 测试样本

建议至少抽样验证以下文件：

- [alert-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/01_2024_新规则专长/01_起源专长/alert-xphb.json)
- [actor-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/01_2024_新规则专长/02_一般专长/actor-xphb.json)
- [magic_initiate-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/01_2024_新规则专长/01_起源专长/magic_initiate-xphb.json)
- [actor-phb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/02_2014_经典专长/PHB/actor-phb.json)
- [fighting_initiate-tce.json](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长/02_2014_经典专长/TCE/fighting_initiate-tce.json)

验证目标：

- 2024 分类码是否正确落类
- 2024 前置条件是否正确转成可读文本
- 2024 benefit 小节是否正确拆分
- 2014 列表型正文是否正确拆分
- 可重复专长是否正确写入 `repeatable`
- 同名 2014/2024 条目是否并存
- 没有任何内容直接写入现有 [data/data-feats.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-feats.ts)

---

## 18. 执行前提与假设

- 本轮只覆盖 [中文data/07_专长](E:/YJF/DND2024characterbuilder-2.0/中文data/07_专长)
- 现有 `FeatItem` 结构保持不变
- `source` 保留原始细粒度缩写
- `ability` 不单独结构化入正式字段
- 2014 与 2024 同名专长默认并存，不自动合并
- `reprintedAs` 仅作为 review 参考，不作为覆盖依据
