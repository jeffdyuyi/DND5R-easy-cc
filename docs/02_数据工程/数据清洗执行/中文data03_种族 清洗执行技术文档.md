# 中文data/03_种族 清洗执行技术文档

## Summary
本专项只处理 [中文data/03_种族](E:/YJF/DND2024characterbuilder-2.0/中文data/03_种族)，目标是产出“按现有 `data/species` 真实形态整理后的种族候选层”，先写入过渡库存目录，不直接改动 [data/species](E:/YJF/DND2024characterbuilder-2.0/data/species)。  
三层职责固定为：
- [中文data/03_种族](E:/YJF/DND2024characterbuilder-2.0/中文data/03_种族)：原始库存
- [data/species](E:/YJF/DND2024characterbuilder-2.0/data/species)：只读目标格式参照
- [staging-data/species](E:/YJF/DND2024characterbuilder-2.0/staging-data/species)：清洗后的候选层

`source` 一律保留 `中文data` 原始缩写，如 `PHB`、`XPHB`、`MPMM`、`VRGR`、`TCE`、`GrimHollowPG24`，不替换成现有 `data` 中的粗粒度来源。

## 输入结构与依赖
`03_种族` 已确认存在 4 类高频输入：
1. 单条种族文件，如 `human-xphb.json`、`aasimar-mpmm.json`
2. 含 `subraces` 的主种族文件，如 `dwarf-phb.json`
3. 含 `_versions` 的可选变体文件，如 `aasimar-mpmm.json`
4. `fluff-*` 补充说明文件，如 `fluff-common_heritages-grimhollowpg24.json`

本专项必须依赖这些映射文档：
- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)：属性、技能、熟练项归一
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)：`source` 校验与来源说明
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)：`additionalSpells`、伤害类型、施法属性、法术名清洗
- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)：种族特性里出现的武器/工具/训练项解释
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)：武器属性词条说明
- [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md)：仅在种族特性显式授予专长或专长条件时使用
- [boon_reward_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/boon_reward_mapping.md)：不是主链路，仅在第三方种族含奖励/恩惠样式能力时辅助解释

## 目标结构
现有 [data/species](E:/YJF/DND2024characterbuilder-2.0/data/species) 已确认目标字段至少包括：
- `id`
- `name`
- `source`
- `description`
- `fullDescription`
- `speed`
- `size`
- `darkvision`
- `traits`
- `subraces` 可选

且 `traits` 内允许扩展：
- `name`
- `description`
- `choices` 可选

`subraces` 当前真实形态为：
- `label`
- `options[]`
- 每个 option 可含 `name`、`desc`、`traits`、`grantedSpells`

因此过渡层必须以这个真实结构为准，不回退到抽象 md 模型。

## 输出目录与状态
建议输出：
- [staging-data/species/core](E:/YJF/DND2024characterbuilder-2.0/staging-data/species/core)
- [staging-data/species/extended](E:/YJF/DND2024characterbuilder-2.0/staging-data/species/extended)
- [staging-data/species/fluff](E:/YJF/DND2024characterbuilder-2.0/staging-data/species/fluff)
- [staging-data/_guides/species-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/species-cleaning-spec.md)
- [staging-data/_mappings/species-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/species-mapping.md)
- [staging-data/_reviews/species-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/species-review-log.md)

状态值固定为：
- `core_candidate`
- `legacy_candidate`
- `extended_candidate`
- `fluff_attachment`
- `parsed_with_warnings`
- `needs_manual_review`

## 文件分流规则
- 与现有 `data/species/index.ts` 对齐的核心种族，如 Human/Dwarf/Elf/Gnome/Halfling/Dragonborn/Orc/Tiefling/Goliath/Aasimar，进入 `core`
- 2014 老版但当前 `data` 未承接的条目，进入 `legacy_candidate`
- 第三方、合作内容、Plane Shift 等扩展种族进入 `extended`
- `fluff-*` 文件不生成主种族条目，只进入 `fluff`
- `custom_lineage-tce.json` 这类构筑规则型条目默认不进入主种族候选，单列 `needs_manual_review`

## 字段映射规则
### 基础字段
- `name` -> `name`
- `ENG_name + source` -> `id`
- `source` -> `source`
- `speed` -> `speed`
- `size` 数组 -> `size`
- `fluff.entries` 摘要 -> `fullDescription`
- `entries` 中特性名列表 -> `description`

`id` 规则固定为：
- `<slug>-<source-lower>`
- 例：`human-xphb`、`dwarf-phb`、`aasimar-mpmm`

### `size`
源里常见：
- `["M"]`
- `["S","M"]`

转换规则：
- 单值转中文单值，如 `M -> 中型`
- 双值转并列表达，如 `S/M -> 中型或小型`
- 详细体型说明保留到 trait 或 `reviewNotes`

### `darkvision`
现有 `data/species` 主字段是布尔语义，不承接具体距离。

转换规则：
- 源存在 `darkvision` 数值 -> `darkvision: true`
- 源不存在 -> `darkvision: false`
- 具体距离如 `60/120` 尺必须保留在对应 trait 描述中，不得丢失

### `description`
生成规则：
- 取 `entries` 中各核心特性标题，按现有 `data/species` 风格拼成短摘要
- 不混入 fluff 大段背景
- 不混入表格全文

### `fullDescription`
生成优先级：
1. `fluff.entries`
2. 主文件 `entries` 中背景性段落
3. `fluff-*` 附件补充文本

规则：
- 主种族背景与亚种/血统介绍可合并
- 图片、internal path、credit 不进入结果
- 若 `fluff-*` 是通用传承说明，只写入附属候选文件，不直接并进主条目

## 特性解析规则
### `entries` -> `traits`
每个 `type: entries` 且具名的段落，生成一个 `trait`：
- `name` 取中文名，必要时附英文
- `description` 为去标记后的正文

富文本清洗：
- `{@spell}` 保留法术名
- `{@skill}` 保留技能名
- `{@condition}` 保留状态名
- `{@item}` 保留物品名
- `{@sense}` 保留感官名
- table/list 在 `traits.description` 中压平成可读文本

### `choices`
当源特性本身是“从若干技能/能力/好处中选一”时，生成 `choices`，仅在现有 `data` 已有对应先例时使用。
适用场景：
- 精灵 `Keen Senses`
- 其他明确的技能三选一、能力三选一

结构固定：
- `id`
- `type`
- `count`
- `options`
- `label`

若选择逻辑复杂到超出现有 `choices` 表达能力，则不强行结构化，写入 `reviewNotes`。

## `subraces` 与 `_versions` 处理规则
### `subraces`
当源文件有稳定、长期存在的亚种/血统/传承选项时，落到 `subraces`：
- `label` 取原始选择标题，如“精灵血统”“邪魔遗赠”
- `options[].name` 取亚种名
- `options[].desc` 为简短效果摘要
- `options[].traits` 为一句能力概括
- `options[].grantedSpells` 仅在源里有明确 1/3/5 级法术授予时生成

适用样例：
- `elf-xphb`
- `tiefling-xphb`
- `goliath-xphb`

### `_versions`
`_versions` 不默认等于 `subraces`。处理分两类：
- 若只是同一主特性的不同释放模式或表现形态，如 `aasimar-mpmm` 的 Celestial Revelation 三个版本，优先并入一个主 trait 的描述，不单独转 `subraces`
- 若 `_versions` 实际代表创建角色时的永久选择，且现有 `subraces` 结构能表达，再人工转为 `subraces`

默认规则：
- `_versions` 先写入 `reviewNotes`
- 只有明确满足“长期选择、互斥、可摘要”三个条件，才升格为 `subraces`

## 不直接结构化的字段
以下字段不直接进入现有 `SpeciesItem` 主结构，但必须保留在候选层说明中：
- `ability`
- `resist`
- `languageProficiencies`
- `skillProficiencies`
- `toolProficiencies`
- `creatureTypes`
- `traitTags`

处理规则：
- 若它们已被特性正文表达，则优先并入 `traits.description`
- 若没有自然落点，则记录到 `reviewNotes`
- 不为这些字段扩展现有 `data/species` 模型

## `additionalSpells` 规则
`additionalSpells` 是种族专项的重点结构，必须结合 [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md) 处理。

转换优先级：
- 若法术授予绑定某个亚种/传承，优先写入对应 `subraces.options[].grantedSpells`
- 若法术授予属于主种族统一能力，则写入对应 `trait.description`
- 若法术授予还带施法属性选择，如 `int/wis/cha`，主结构不新增字段，写进 trait 文本并在 `reviewNotes` 记原始选择逻辑

## `fluff-*` 文件规则
`fluff-*` 文件只作为补充背景，不直接生成新种族。
处理方式：
- 识别其绑定对象，如某个亚种、某个 heritage、某个通用传承
- 进入 `staging-data/species/fluff`
- 在主候选条目的 `reviewNotes` 中挂引用
- 只有当现有 `fullDescription` 明显缺失核心背景时，才人工节选一小段并入

## 清洗流程
每个种族文件固定执行 8 步：
1. 识别文件类型：主种族、附属 fluff、规则型条目
2. 提取 `name/source/size/speed/darkvision/entries/fluff`
3. 判断是否存在 `subraces`、`_versions`、`additionalSpells`
4. 用映射文档清洗属性、技能、法术、来源、工具词
5. 组装 `description/fullDescription/traits`
6. 按规则决定是否生成 `subraces`
7. 写入 `core`、`extended` 或 `fluff`
8. 把未承接字段和人工判断写入 `species-review-log.md`

## 人工复核清单
每条候选至少检查：
- `source` 是否保留原始缩写
- `id` 是否和同名异源冲突
- `darkvision` 是否只保留布尔值，距离是否留在 trait 文本里
- `subraces` 是否真的是创建角色时的永久选择
- `_versions` 是否被误当成亚种
- `additionalSpells` 是否正确分流到主 trait 或 `subraces`
- `ability/language/resist/creatureTypes` 是否被错误丢失
- `fluff-*` 是否被误生成主条目
- 第三方或合作源是否被误放进 `core`

## Test Plan
- 先用 [human-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/03_种族/human-xphb.json) 验证最简单主种族映射
- 用 [elf-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/03_种族/elf-xphb.json) 验证 `subraces + additionalSpells + choices`
- 用 [dwarf-phb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/03_种族/dwarf-phb.json) 验证老版 `subraces` 与覆盖型特性
- 用 [aasimar-mpmm.json](E:/YJF/DND2024characterbuilder-2.0/中文data/03_种族/aasimar-mpmm.json) 验证 `_versions` 不误转为 `subraces`
- 用一个 `fluff-*` 文件验证附件不会误入主种族候选
- 确认没有任何内容直接写入 [data/species](E:/YJF/DND2024characterbuilder-2.0/data/species)

## Assumptions
- 现有 `data/species` 是稳定消费面，暂不扩展字段模型。
- `darkvision` 在主结构中按布尔处理，精确距离仅保留在文本层。
- 非核心字段如 `ability`、`languageProficiencies`、`creatureTypes` 本轮不结构化入库，只进入候选说明与 review。
- 第三方、合作源和规则实验性条目默认只进入 `staging-data/species/extended`，不直接视为正式主库候选。
