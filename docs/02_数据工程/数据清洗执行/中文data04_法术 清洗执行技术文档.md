# 中文data/04_法术 清洗执行技术文档

## Summary
本专项只处理 [中文data/04_法术](E:/YJF/DND2024characterbuilder-2.0/中文data/04_法术)，目标是产出“按现有 `data/data-spells-level*.ts` 真实形态整理后的法术候选层”，先进入过渡库存目录，不直接改动现有 [data/data-spells-level0.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-spells-level0.ts) 到 [data/data-spells-level9.ts](E:/YJF/DND2024characterbuilder-2.0/data/data-spells-level9.ts)。  
三层职责固定为：
- [中文data/04_法术](E:/YJF/DND2024characterbuilder-2.0/中文data/04_法术)：原始库存
- [data](E:/YJF/DND2024characterbuilder-2.0/data)：只读目标结构参照
- [staging-data/spells](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells)：清洗后的候选层

`source` 一律保留 `中文data` 原始缩写，如 `PHB`、`XPHB`、`XGE`、`TCE`、`GrimHollowPG24`、`GuidedDrakkenheim`，不改成现有 `data` 里的 `PHB'24` 一类展示写法。目标格式跟随 `data` 字段形态，但来源值跟随 `中文data`。

## 输入结构与依赖
`04_法术` 已确认按环阶分目录：
- `00_戏法`
- `01_一环`
- `02_二环`
- `03_三环`
- `04_四环`
- `05_五环`
- `06_六环`
- `07_七环`
- `08_八环`
- `09_九环`

单条源法术文件高频字段已确认包括：
- `name`
- `ENG_name`
- `source`
- `level`
- `school`
- `time`
- `range`
- `components`
- `duration`
- `entries`
- `entriesHigherLevel` 可选
- `classes`
- `meta.ritual` 可选

本专项必须显式依赖这些映射文档：
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)：学派、伤害、成分、时间、距离术语映射
- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)：豁免属性、技能术语辅助映射
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)：`source` 校验
- [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md)：仅在正文引用专长时辅助解释
- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)：材料成分里出现器具/圣徽等词时辅助解释
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)：不是主链路，仅在正文引用武器属性时辅助说明

## 目标结构
现有 `data/data-spells-level*.ts` 已确认单条目标结构为：
- `id`
- `name`
- `source`
- `level`
- `school`
- `castingTime`
- `range`
- `components`
- `duration`
- `classes`
- `description`
- `higherLevel` 可选

候选层必须严格对齐这个结构，不扩展主字段。所有源里不能稳定落入该结构的信息，都进入 `reviewNotes` 或附属记录，不直接改造 `SpellItem` 模型。

## 输出目录与分流
建议输出：
- [staging-data/spells/level0](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level0)
- [staging-data/spells/level1](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level1)
- [staging-data/spells/level2](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level2)
- [staging-data/spells/level3](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level3)
- [staging-data/spells/level4](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level4)
- [staging-data/spells/level5](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level5)
- [staging-data/spells/level6](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level6)
- [staging-data/spells/level7](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level7)
- [staging-data/spells/level8](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level8)
- [staging-data/spells/level9](E:/YJF/DND2024characterbuilder-2.0/staging-data/spells/level9)
- [staging-data/_guides/spells-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/spells-cleaning-spec.md)
- [staging-data/_mappings/spell-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/spell-mapping.md)
- [staging-data/_reviews/spells-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/spells-review-log.md)

目录映射固定为：
- `00_戏法 -> level0`
- `01_一环 -> level1`
- `02_二环 -> level2`
- 依此类推到 `09_九环 -> level9`

## 字段映射规则
### 基础字段
- `name` -> `name`
- `ENG_name + source` -> `id`
- `source` -> `source`
- `level` -> `level`

`id` 规则固定为：
- `<slug>-<source-lower>`
- 同名异源必须并存，不覆盖
- 示例：
  - `alarm-phb`
  - `alarm-xphb`
  - `acid_splash-xge`

### `school`
源里是单字母码，如 `A/C/D/E/I/N/V/T`。

转换规则：
- 必须用 [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md) 映射成当前 `data` 使用的中文学派名
- 不保留原始字母码
- 若存在版本差异，以当前源文件自身值为准，不跨版本猜测

### `castingTime`
来源：
- `time[]`
- `meta.ritual` 可选

转换规则：
- 只取首个 `time[0]`
- 组合规则：
  - `number + unit` -> 正常施法时间字符串
  - 若 `unit` 带条件，如反应法术的 `condition`，拼成完整中文句子
  - 若 `meta.ritual = true`，在文案中显式保留“或仪式”语义，跟现有 `data` 风格一致
- 示例落点：
  - `1 动作`
  - `1 分钟或仪式`
  - `1 反应，当你看见...时可用`

### `range`
来源：
- `range.type`
- `range.distance.type`
- `range.distance.amount`

转换规则：
- `point + feet` -> `X 尺`
- `point + touch` -> `触碰`
- `self` -> `自身`
- `cone/line/cube/sphere/radius` 等效果区不直接用结构化对象，压成当前 `data` 风格短文本
- 规则重点：
  - `range` 字段只表达施法距离，不复述完整区域效果
  - 锥形、立方、球形的面积细节主要保留在 `description`

### `components`
来源：
- `components.v`
- `components.s`
- `components.m`
- 少量数据可能含 `r`

转换规则：
- 按 `V/S/M/R` 顺序组装成中文短串
- 若 `m` 存在，材料内容直接括号附在后面
- 若 `meta.ritual = true`，不要把 ritual 写入 `components`，它只影响 `castingTime`
- 示例：
  - `言语、姿势`
  - `言语、姿势、材料（一枚铃铛和银线）`

### `duration`
来源：
- `duration[]`
- 常见 `instant`
- 常见 `timed + duration.type/amount`
- 部分法术带 `concentration`

转换规则：
- 只取首个 duration 结构
- `instant` -> `立即`
- `timed hour/minute` -> `X 小时`、`X 分钟`
- `concentration` -> 前缀 `专注，至多 ...`
- 不保留原始对象结构

### `classes`
源里已确认有 3 种形态：
1. 直接中文数组
2. `{ fromClassList: [...] }`
3. `{ fromClassListVariant: [...] }`

转换规则：
- 最终统一输出为中文职业名数组
- 若为直接数组，直接使用
- 若为 `fromClassList` / `fromClassListVariant`，抽取其中职业名并转为中文数组
- 若同一法术同时存在标准职业表和变体职业表，候选层必须保留 `classesSourceKind` 说明，但主字段只保留去重后的职业数组
- 不新增“变体职业列表”字段

## 正文清洗规则
### `description`
来源：
- `entries`

转换规则：
- 将 `entries` 压平成单个字符串
- 多段正文按自然顺序拼接
- `type: list` 转成顺序文本，不保留列表结构
- `type: item` 的标题可以保留为加粗或标题化短语，但最终仍是纯文本
- 富文本去壳：
  - `{@spell}` -> 保留法术名
  - `{@condition}` -> 保留状态名
  - `{@damage}` / `{@dice}` -> 保留骰值文本
  - `{@variantrule}` -> 保留显示文字
  - `{@dc}` -> 保留 DC 数值表达
  - `{@hazard}` -> 保留中文名
- 不保留 5etools 标签本体

### `higherLevel`
来源：
- `entriesHigherLevel`

转换规则：
- 若存在 `entriesHigherLevel`，压平为一个字符串写入 `higherLevel`
- 没有则省略字段
- 即使是戏法 scaling，也允许写入 `higherLevel`
- 若 `entriesHigherLevel` 内容只是另一种完整重述，而不是标准升环说明，也照样保留，但在 review 中标注

## 不结构化入主字段的信息
以下字段不直接进入 `SpellItem` 主结构，但必须进入 `reviewNotes` 或附属说明：
- `savingThrow`
- `damageInflict`
- `areaTags`
- `miscTags`
- `display_school`
- `display_damageInflict`
- `display_savingThrow`
- `referenceSources`
- `basicRules2024`
- `srd52`
- `translator`

处理原则：
- 若这些信息已经自然体现在 `description` 中，则不额外重复
- 若目标 UI 后续需要筛选维度，再从候选层补建索引，不在本轮改 `data` 模型

## 双版本与第三方来源规则
- `PHB` 与 `XPHB` 同名法术必须并存，绝不覆盖
- 第三方或合作来源如 `GrimHollowPG24`、`GuidedDrakkenheim`、`BookOfEbonTides` 仍按相同结构清洗
- `source` 保留原缩写或原始 source 值，不并入“第三方”
- 同名法术跨来源若规则明显不同，不尝试合并成一个条目

## 特殊结构处理
### 戏法 scaling
部分戏法有 `entriesHigherLevel`，本质是等级成长。

规则：
- 仍写入 `higherLevel`
- 不因为其不是“法术位升环”就丢弃
- 在 review 中标记 `cantrip_scaling = true`

### 反应法术
如 `counterspell-xphb.json` 的 `time[0].condition`

规则：
- 必须把触发条件并入 `castingTime`
- 不把触发条件塞进 `description`

### 范围与效果区分离
如 `burning_hands-xphb.json`：
- `range` 应写为 `自身`
- `15 尺锥形` 作为效果区细节保留在 `description`

### 复杂类表来源
`classes.fromClassListVariant` 代表变体来源时：
- 主字段仅保留职业数组
- review 记录 `classListVariant` 来源，避免后续筛选误判

## 清洗流程
每个法术文件固定执行 8 步：
1. 按所在目录判定目标环阶
2. 提取 `name/source/level/school/time/range/components/duration/classes`
3. 解析 `entries` 和 `entriesHigherLevel`
4. 用映射文档统一学派、成分、时间、距离、豁免、伤害术语
5. 生成标准候选条目
6. 把复杂结构和无法承接信息写入 `reviewNotes`
7. 输出到对应 `staging-data/spells/levelN`
8. 写入 `spells-review-log.md`

## 人工复核清单
每条法术候选至少检查：
- `source` 是否保留原始缩写
- `id` 是否与同名异源冲突
- `school` 是否按字典正确转中文
- `castingTime` 是否正确处理了 ritual 和 reaction condition
- `range` 是否只表达施法距离，没有误把效果区塞进来
- `components` 是否保留了材料文本
- `duration` 是否正确处理专注/立即/定时
- `classes` 是否从数组或 `fromClassList*` 正确抽出
- `description` 是否去除了 5etools 标签
- `higherLevel` 是否正确提取，尤其是戏法 scaling
- `PHB/XPHB` 是否误覆盖

## Test Plan
- 用 [alarm-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/04_法术/01_一环/alarm-xphb.json) 验证 ritual、列表项、标准数组类表
- 用 [light-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/04_法术/00_戏法/light-xphb.json) 验证戏法、`touch` 距离、无 `higherLevel`
- 用 [burning_hands-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/04_法术/01_一环/burning_hands-xphb.json) 验证锥形范围与升环说明
- 用 [counterspell-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/04_法术/03_三环/counterspell-xphb.json) 验证反应触发条件
- 额外抽样一条 `classes.fromClassList` 的第三方法术，验证类表对象写法
- 确认没有任何内容直接写入现有 `data/data-spells-level*.ts`

## Assumptions
- 现有 `SpellItem` 结构保持不变，不新增筛选字段。
- `source` 细粒度以 `中文data` 为准，和现有 `data` 的展示写法并存。
- `classes` 最终统一成中文职业名数组，变体来源只记录在 review。
- 复杂标签如 `damageInflict`、`savingThrow` 本轮不结构化入主字段，只通过正文与 review 保留。
