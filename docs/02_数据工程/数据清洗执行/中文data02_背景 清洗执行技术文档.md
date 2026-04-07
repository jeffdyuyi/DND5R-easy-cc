# 中文data/02_背景 清洗执行技术文档

## Summary
本专项只处理 [中文data/02_背景](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景)，目标是产出“按 `data/backgrounds` 结构整理后的背景候选层”，先进入过渡目录，不直接写入现有 [data/backgrounds](E:/YJF/DND2024characterbuilder-2.0/data/backgrounds)。  
现有 `data` 只作为目标格式基准，`中文data` 作为原始库存，清洗结果统一进入 `staging-data`，避免污染当前可正常读取的数据层。  
`source` 一律保留 `中文data` 原始缩写，如 `PHB`、`XPHB`、`VRGR`、`IDRotF`，不替换成“官方规则”。

建议输出目录：
- [staging-data/backgrounds](E:/YJF/DND2024characterbuilder-2.0/staging-data/backgrounds)
- [staging-data/_guides/backgrounds-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/backgrounds-cleaning-spec.md)
- [staging-data/_mappings/background-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/background-mapping.md)
- [staging-data/_reviews/backgrounds-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/backgrounds-review-log.md)

## Input Scope
本专项输入分 4 类：

1. 标准背景主文件  
来源：`中文data/02_背景/*.json`  
例如 [acolyte.json](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景/acolyte.json)、[criminal.json](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景/criminal.json)

2. 2014 / 2024 双版本背景  
同一背景文件中通常同时包含 `PHB` 版和 `XPHB` 版两个对象

3. 特殊背景选项  
来源：[中文data/02_背景/00_特殊起源选项](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景/00_特殊起源选项)

4. 角色秘密等附属内容  
来源：
- `03_角色秘密`
- `04_特殊背景选项`

这部分不直接映射到当前 `data/backgrounds` 主字段，但应纳入背景专项的附属字典层。

## External Mapping Dependencies
本专项必须显式依赖这些映射文档：

- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)
  用于 `ability`、`skillProficiencies`、技能名和属性缩写归一。
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)
  用于 `source` 校验与来源说明，不改变最终存储值。
- [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md)
  用于背景赠送 feat 的前置条件和分类说明。
- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)
  用于起始装备中的物品类型识别与清单分组。
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)
  用于起始装备中出现的武器/物品属性说明。
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)
  用于 `featSpellList`、法术引用、施法职业等术语统一。
- [boon_reward_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/boon_reward_mapping.md)
  本专项只在特殊背景选项包含恩惠/奖励时使用，不是主链路必需。

## Target Structure
背景候选层以当前 [data/backgrounds](E:/YJF/DND2024characterbuilder-2.0/data/backgrounds) 的真实格式为准。  
从 [acolyte.ts](E:/YJF/DND2024characterbuilder-2.0/data/backgrounds/acolyte.ts) 和 [criminal.ts](E:/YJF/DND2024characterbuilder-2.0/data/backgrounds/criminal.ts) 可确认，当前目标字段最少包括：

- `id`
- `name`
- `source`
- `description`
- `abilityScores`
- `feat`
- `featSpellList` 可选
- `skills`
- `tool`
- `equipment`

过渡成果中建议额外保留 review 区块，但不把这些附加字段视为最终并入 `data` 的正式字段：
- `rawSourceFile`
- `versionTag`
- `reviewNotes`
- `featureText`
- `specialOptions`
- `warnings`

## Folder-to-Output Mapping

### `中文data/02_背景/*.json`
输出到：
- `staging-data/backgrounds/core/<background-slug>.md`

规则：
- 每个源文件生成一个候选文件
- 若源文件内同时包含 2014 与 2024 两个对象，则分别生成两个背景候选条目
- 2024 版若已有目标 `data` 对应样式，优先按 2024 版整理
- 2014 版不丢弃，但默认标记为 `legacy_candidate`

### `中文data/02_背景/00_特殊起源选项`
输出到：
- `staging-data/backgrounds/_special-origin-options.md`

规则：
- 不直接进入背景主字段
- 作为背景构建时的“附加可选项库”
- 标注来源书与适用背景/模块

### `中文data/02_背景/03_角色秘密`
输出到：
- `staging-data/backgrounds/_character-secrets.md`

规则：
- 不进入主背景结构
- 视为 campaign-specific 附加内容
- 与主背景数据解耦，避免污染标准背景模型

### `中文data/02_背景/04_特殊背景选项`
输出到：
- `staging-data/backgrounds/_special-background-options.md`

规则：
- 不直接进入 `BackgroundItem`
- 先作为附加规则或背景变体说明存档
- 仅当后续 UI 明确支持时再结构化接入

## Parsing Rules

### A. 背景根文件解析
源文件通常是数组，每个数组元素代表一个版本背景。  
例如 [acolyte.json](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景/acolyte.json) 同时含 `PHB` 与 `XPHB`。

处理步骤：
1. 逐个遍历数组元素
2. 按 `source + edition` 判定版本
3. 分别生成独立候选条目
4. 2014 与 2024 绝不覆盖

输出主键建议：
- `acolyte-phb`
- `acolyte-xphb`
- `criminal-phb`
- `criminal-xphb`

### B. 2014 背景解析规则
2014 背景通常包含：
- `skillProficiencies`
- `languageProficiencies`
- `toolProficiencies`
- `startingEquipment`
- `entries`
- `fluff`
- `Feature: ...`
- `Suggested Characteristics`

映射规则：
- `name` -> `name`
- `source` -> `source`
- `entries` 中首个摘要段 -> `description`
- `skillProficiencies` -> `skills`
- `toolProficiencies` -> `tool`
- `startingEquipment` + `entries` 中 Equipment 条 -> `equipment`
- `Feature: xxx` 不进入主字段，写入 `featureText`
- `languageProficiencies` 不进主字段，写入 `reviewNotes`
- `Suggested Characteristics`、表格、fluff 不进主字段，写入 `reviewNotes`

特别说明：
- 2014 背景通常没有 `abilityScores` 和 `feat`
- 因为当前 `data/backgrounds` 明显偏向 2024 模型，2014 条目必须标注：
  `status = legacy_candidate`
- 若未来要进入 `data`，要先确认 UI 是否兼容“无 abilityScores / 无 feat”背景

### C. 2024 背景解析规则
2024 背景通常包含：
- `ability`
- `feats`
- `skillProficiencies`
- `toolProficiencies`
- `startingEquipment`
- `entries`
- `fluff`

映射规则：
- `name` -> `name`
- `source` -> `source`
- `ability` -> `abilityScores`
- `feats` -> `feat`
- `skillProficiencies` -> `skills`
- `toolProficiencies` -> `tool`
- `startingEquipment` + `entries` -> `equipment`
- `fluff.entries[0]` 或摘要条 -> `description`
- 如果 feat 带职业/法术列表限定 -> `featSpellList`

### D. `ability` 字段解析
2024 背景的 `ability` 常见结构是：
- `choose.weighted.from`
- `weights`

处理规则：
- 当前目标 `data` 不保留权重结构
- 只提取“可选能力名称集合”，生成中文数组
- 使用 [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md) 完成缩写归一

示例：
- `int/wis/cha` -> `["智力", "感知", "魅力"]`
- `dex/con/int` -> `["敏捷", "体质", "智力"]`

注意：
- 权重信息不进入 `data` 风格主字段
- 但必须在候选文件的 `reviewNotes` 中保留原始 weighted 结构摘要

### E. `feats` 字段解析
常见形式：
- `{ "警觉|xphb": true }`
- `{ "魔法学徒；牧师|xphb": true }`

处理规则：
- 提取 feat 中文名作为 `feat`
- 若 feat 值中带分号、括号或职业限定，拆成：
  `feat`
  `featSpellList` 或 `featVariantNote`

示例：
- `警觉|xphb` -> `feat = "警觉"`
- `魔法学徒；牧师|xphb` -> `feat = "魔法学徒"`，`featSpellList = "牧师"`

清洗规则：
- 去除 `|source`
- 去除 5etools 键格式
- 保留职业限定信息
- 以 [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md) 辅助处理职业/法术相关术语

### F. `skillProficiencies` 解析
来源结构示例：
- `{ "insight": true, "religion": true }`
- `{ "sleight of hand": true, "stealth": true }`

处理规则：
- 取所有 `true` 的键
- 用 [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md) 转成中文
- 输出为 `skills: string[]`

注意：
- `sleight of hand` 在现有 `data` 中表现为“巧手”
- 不要依赖 `entries` 中文本名称，优先依赖结构化键

### G. `toolProficiencies` 解析
常见结构：
- `{ "calligrapher's supplies": true }`
- `{ "thieves' tools": true }`
- `{ "anyGamingSet": 1, "thieves' tools": true }`

处理规则：
- 结构化固定工具直接转中文名
- 泛选项如 `anyGamingSet` 不强行具象化，转成可读文本：
  `一种游戏器具`
- 多项时：
  - 若只有一项固定工具，可落单字符串
  - 若有固定工具 + 泛选项，候选层建议先保留数组或文本串，最终并入 `data` 前人工统一

目标字段规则：
- 现有 `data/backgrounds` 中 `tool` 目前表现为单字符串
- 因此候选层必须记录：
  `tool_raw`
  `tool_normalized`
  `tool_requires_manual_merge`

### H. `startingEquipment` 解析
背景装备不能只信 `startingEquipment` 结构，也不能只信 `entries` 文本；两者必须交叉校验。

处理优先级：
1. `entries` 中 `Equipment:` 项  
作为最终展示文本主来源
2. `startingEquipment`  
作为结构校验来源

目标输出：
- `equipment: string[]`

格式规则：
- 当前 `data` 风格保持 A/B 文本行
- 若只有固定装备，用单条文本
- 若存在选择，写成：
  `A: ...`
  `B: ...`

金额规则：
- 背景装备中的 `value` 按 `cp` 基础值假设处理
- `1500 -> 15 GP`
- `1600 -> 16 GP`
- `800 -> 8 GP`
- `5000 -> 50 GP`

但必须同时记录：
- `rawEquipmentValue`
- `normalizedEquipmentValue`
- `valueUnitAssumption = cp`

未完成单位确认前，候选文件状态必须标记：
- `equipment_value_needs_validation = true`

### I. `description` 生成规则
当前 `data/backgrounds` 的 `description` 很短，偏摘要句。

生成优先级：
1. `fluff.entries` 首段
2. `entries` 中最概括背景身份的句子
3. 若以上都不存在，再人工提炼

规则：
- 保持一到两句
- 不引入表格内容
- 不引入 Feature、性格、理想等长文本
- 不做现代化改写

### J. `Feature: ...` 处理规则
2014 背景经常有：
- `Feature: Shelter of the Faithful`
- `Feature: Criminal Contact`

处理方式：
- 不进入当前 `BackgroundItem` 主字段
- 存入候选文件的 `featureText`
- 在 `reviewNotes` 中标注：
  `legacy background feature not represented in current data shape`

### K. `Suggested Characteristics` 与表格
处理方式：
- 不进入 `data` 主字段
- 不压缩进 `description`
- 只做“存在性记录”
- 写入 `reviewNotes`：
  `has_character_tables = true`

## Field Mapping Details

### `id`
规则：
- `<background-slug>-<source-lower>`
- 同名不同 source 分开
- 不使用 `edition` 单独做后缀，除非 source 不足以区分

示例：
- `acolyte-phb`
- `acolyte-xphb`
- `criminal-phb`
- `criminal-xphb`

### `name`
- 直接取源文件 `name`
- 不翻译
- 不简化
- 编码异常时暂停人工确认，不主观改字

### `source`
- 直接取原始缩写
- 不改成中文
- 不改成“官方规则”

### `abilityScores`
来源：
- 仅对 2024 背景从 `ability` 解析
- 2014 背景默认无此字段

规则：
- 生成中文能力名数组
- 不保留权重
- 结果必须和现有 `data/backgrounds/*.ts` 风格一致

### `feat`
来源：
- 仅对有 `feats` 的背景解析

规则：
- 提取主专长名
- 不带 source 后缀
- 不带 5etools 标记

### `featSpellList`
来源：
- feat 文本中带职业、法术表限定时生成
- 常见于 `魔法学徒（牧师）` 这类背景

规则：
- 只保留当前 `data` 风格能承接的简短文本
- 若限定复杂，写入 `reviewNotes`

### `skills`
来源：
- `skillProficiencies`

规则：
- 一律用结构化键位映射，不依赖 `entries` 文本
- 输出中文技能名数组

### `tool`
来源：
- `toolProficiencies`

规则：
- 当前目标字段为单值风格，复杂情况先在候选层保留原样说明
- 一项固定工具可直接写单字符串
- 选择型工具标记人工复核

### `equipment`
来源：
- `entries` 中 Equipment 项为主
- `startingEquipment` 为辅

规则：
- 输出 `string[]`
- 选择型装备按 `A/B` 分条
- 金额统一先按 `cp -> GP/SP/CP` 正规化

## Cleaning Pipeline
每个背景文件固定执行 9 步：

1. 读取源文件数组
2. 按对象拆分版本条目
3. 判定 `legacy_candidate` 或 `modern_candidate`
4. 清洗 `ability/feats/skills/tool/equipment`
5. 用映射文档统一术语
6. 生成摘要 `description`
7. 提取 `featureText` 与附属选项
8. 写入 `staging-data/backgrounds/core`
9. 记录 review 结果到 `backgrounds-review-log.md`

## Special Option Handling

### `00_特殊起源选项`
用途：
- 不属于主背景条目
- 作为背景构建时可附带的来源规则

记录字段建议：
- `name`
- `source`
- `appliesTo`
- `description`
- `optionKind`

### `03_角色秘密`
用途：
- campaign-specific 附件
- 与背景主体解耦

记录字段建议：
- `name`
- `source`
- `campaign`
- `description`
- `secretKind = character_secret`

### `04_特殊背景选项`
用途：
- 视为背景扩展模块
- 不进 `BackgroundItem`

记录字段建议：
- `name`
- `source`
- `description`
- `appliesToBackgrounds`
- `integrationStatus`

## Manual Review Checklist
每个背景候选条目必须至少检查：

- `source` 是否保留原始缩写
- 同一源文件内 2014 / 2024 是否被正确拆开
- `abilityScores` 是否仅在 2024 背景生成
- `feat` 是否正确去掉 source 后缀
- `featSpellList` 是否仅在确有职业限定时生成
- `skills` 是否来自结构化键，而不是从描述猜测
- `tool` 是否存在“泛选项”未落稳的问题
- `equipment` 是否与 `startingEquipment`、`entries` 一致
- 金额是否按 `cp` 假设正确换算
- 2014 Feature 是否被错误塞进 `description`
- 表格内容是否被错误混入主字段

## Output Contract
每个背景候选文件必须至少包含：

- `metadata`
  `id/name/source/status/rawSourceFile`
- `background`
  `description/abilityScores/feat/featSpellList/skills/tool/equipment`
- `legacyExtras`
  `featureText/specialOptions`
- `reviewNotes`
  冲突、缺失、人工判断
- `warnings`
  金额单位、工具选择、版本兼容等

状态值固定为：
- `modern_candidate`
- `legacy_candidate`
- `parsed_with_warnings`
- `needs_manual_review`

## Test Plan
- 先用 [acolyte.json](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景/acolyte.json) 做双版本样板
- 再用 [criminal.json](E:/YJF/DND2024characterbuilder-2.0/中文data/02_背景/criminal.json) 验证：
  技能变体
  工具泛选项
  装备金额换算
- 至少抽样 1 条带 `featSpellList` 的 2024 背景
- 至少抽样 1 条 campaign-specific 特殊背景选项，验证其不会误入主背景库
- 验证没有任何内容直接写入 [data/backgrounds](E:/YJF/DND2024characterbuilder-2.0/data/backgrounds)

## Assumptions
- 当前 `data/backgrounds` 的消费模型明显偏 2024 背景，因此 2014 背景默认只进入候选层，不直接进入正式库。
- 背景起始资金中的 `value` 暂按 `cp` 基础值假设处理，但必须在 review 中显式记录。
- 本专项只输出背景清洗执行规范，不直接执行批量转换。
