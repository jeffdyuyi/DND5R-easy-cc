# 中文data/01_职业与子职业 清洗执行技术文档

## Summary
本专项只处理 [中文data/01_职业与子职业](E:/YJF/DND2024characterbuilder-2.0/中文data/01_职业与子职业)，目标不是直接写入现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)，而是先产出一套按 `data` 结构整理、可人工验收的过渡成果，落到新的过渡目录中。  
现有 `data` 只作为目标格式参照，不允许被未验证的 `中文data` 污染。`source` 一律以 `中文data` 原始缩写为准，不沿用现有 `data` 的粗粒度来源。

建议本专项输出目录：
- [staging-data/classes](E:/YJF/DND2024characterbuilder-2.0/staging-data/classes)
- [staging-data/_guides/classes-cleaning-spec.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_guides/classes-cleaning-spec.md)
- [staging-data/_mappings/class-subclass-mapping.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_mappings/class-subclass-mapping.md)
- [staging-data/_reviews/classes-review-log.md](E:/YJF/DND2024characterbuilder-2.0/staging-data/_reviews/classes-review-log.md)

## Input Scope
处理范围分 4 类：

1. 公共特性  
来源：[中文data/01_职业与子职业/00_公共特性](E:/YJF/DND2024characterbuilder-2.0/中文data/01_职业与子职业/00_公共特性)

2. 核心职业  
来源：`01_野蛮人` 到 `12_法师`

3. 扩展职业  
来源：`13_奇械师` 及以后目录

4. 职业下属内容  
来源：
- `职业根文件`
- `01_职业特性`
- `02_子职业`
- 其他子目录如专属选项、卓越技巧、面具特性等

## External Mapping Dependencies
本专项必须显式使用这些映射文档：

- [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md)
  用于属性、技能、熟练项、豁免缩写归一。
- [book_source_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/book_source_mapping.md)
  用于 `source` 校验与来源中文说明，不改变最终存储值。
- [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md)
  用于职业特性中引用专长、前置条件文本的可读化。
- [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)
  用于起始装备、武器精通、战斗风格中的武器属性词条解释。
- [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)
  用于 `startingEquipment`、武器/护甲/工具引用的类别识别。
- [spell_terminology_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/spell_terminology_mapping.md)
  用于职业施法相关文本、法术列表、学派/成分/专注术语统一。
- [boon_reward_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/boon_reward_mapping.md)
  用于 19 级 Epic Boon、恩惠类特性的分类说明。

这些文档都属于“字典层”，只能辅助字段值归一，不替代结构清洗规则。

## Target Structure
职业与子职业过渡成果按当前 `data/classes/*.ts` 的真实形态组织，而不是按旧 md 中的理想模型。

每个职业的过渡文件建议包含 4 个区块：

1. `classMeta`
- `id`
- `name`
- `source`
- `description`
- `fullDescription`

2. `classCore`
- `hitDie`
- `primaryAbility`
- `saves`
- `tags`
- `coreTraits`
- `subclassLevel`

3. `classProgression`
- `classTable`
- `features`

4. `subclasses`
- 子职业数组
- 每个子职业包含 `id/name/source/parentClass/description/fullDescription/features`

注意：
- `source` 保留原缩写，如 `PHB`、`XPHB`、`XGE`
- `coreTraits` 以现有 `data` 的对象写法为准
- `classTable` 以现有 `title/columns/rows` 结构为准
- `features` 保持扁平数组，每项至少有 `level/name/description/source`

## Folder-to-Output Mapping

### `00_公共特性`
输出到：
- `staging-data/classes/_shared/`
- `staging-data/_mappings/class-shared-features.md`

规则：
- 不直接生成职业主条目。
- 仅提取可复用片段，如 `战斗风格`。
- 每个公共特性生成一条标准化记录：
  `name/source/featureType/description/reprintedAs`
- 若公共特性在目标 `data` 中最终表现为专长或职业内联特性，先只做“候选片段”，不决定最终归属。

### `01_野蛮人` 到 `12_法师`
输出到：
- `staging-data/classes/core/<class-slug>.md` 或 `<class-slug>.json`

规则：
- 每个职业目录对应一个主候选文件。
- `02_子职业` 中所有子职业并入该主候选文件，不拆成独立数据库。
- `修改备忘.md` 只进 review 记录，不进候选字段。

### `13_奇械师` 及以后
输出到：
- `staging-data/classes/extended/<class-slug>.md`

规则：
- 结构和核心职业相同，但状态默认标记为 `extended_candidate`
- 不视为可直接并入 `data` 的一级候选

## Parsing Rules

### A. 职业根文件解析
例如 [barbarian.json](E:/YJF/DND2024characterbuilder-2.0/中文data/01_职业与子职业/01_野蛮人/barbarian.json)

提取规则：
- 根级 `name` -> `name`
- 根级 `ENG_name` -> `id` slug 基础
- 根级 `source` -> `source`
- 根级 `edition` -> 仅作版本辅助，不单独入目标字段
- `classData.hd.faces` -> `hitDie`
- `classData.primaryAbility` 或同类结构 -> `primaryAbility`
- `classData.proficiency` -> `saves`
- `classData.startingProficiencies` -> `coreTraits`
- `classData.startingEquipment` -> `coreTraits.startingEquipment`
- `classData.classTableGroups` -> `classTable` 列和值骨架
- `classData.classFeatures` -> 等级特性索引
- `subclasses[]` -> 子职业候选索引
- `hasFluff`/`hasFluffImages`/`page`/`srd` -> 默认不入目标字段

特殊规则：
- `reprintedAs` 只作为版本链说明，写入 review，不进入主数据
- `subclassTitle` 只作为注释信息，不单独建字段
- `multiclassing` 暂不入主字段，写入 review 备注

### B. 职业特性文件解析
例如 [野蛮人特性-xphb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/01_职业与子职业/01_野蛮人/01_职业特性/野蛮人特性-xphb.json)

提取规则：
- 遍历 `classFeature[]`
- 每项提取：
  `name/source/className/classSource/level/entries`
- 输出为标准化特性对象：
  `level`
  `name`
  `source`
  `description_raw`
  `description_clean`
  `featureKind = class_feature`

清洗规则：
- `entries` 压平为 `description_clean`
- 若 `entries` 中包含多层 `type: entries`，保留子标题并并入正文
- 若出现 `type: list`，转成行内列表文本
- `{@variantrule}`、`{@condition}`、`{@skill}`、`{@feat}` 等标记去壳保留可读名称
- “子职业特性占位项”如 `Subclass Feature` 必须标记为 `placeholder_feature = true`
- 同名重复等级项允许保留，不能自动去重

### C. 子职业文件解析
例如 [狂战士道途-phb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/01_职业与子职业/01_野蛮人/02_子职业/狂战士道途-phb.json)

提取规则：
- `name` -> `name`
- `shortName` -> 仅用于辅助命名/比对
- `source` -> `source`
- `className` -> `parentClass`
- `subclassFeatures` -> 子职业等级索引
- `features[]` -> 子职业实际特性数组

输出结构：
- 子职业介绍条目：
  取 `features[0]` 中介绍性段落生成 `description/fullDescription`
- 子职业特性条目：
  从 `features[]` 中剔除纯介绍壳层后生成标准化 `features[]`

清洗规则：
- `type: refSubclassFeature` 视为引用标记，不直接落入正文
- `header: 2` 只用于判断其为正式特性标题，不入结果
- `subclassShortName`、`subclassSource` 保留在 review 中用于去冲突
- 同名子职业跨版本不得合并，必须按 `source` 分开

### D. 公共特性文件解析
例如 [箭术-phb.json](E:/YJF/DND2024characterbuilder-2.0/中文data/01_职业与子职业/00_公共特性/战斗风格/箭术-phb.json)

提取规则：
- `name/source/featureType/entries/reprintedAs`
- 输出标准片段对象：
  `name`
  `source`
  `kind = shared_feature`
  `usage_hint`
  `description_clean`

规则：
- `featureType` 先文本保留，不在本专项强制转换
- 若 `reprintedAs` 指向 2024 feat，需在 review 里标记“可能迁移到 feats 库”
- 当前不直接决定其最终进入职业、专长还是共享特性库

## Field Mapping Details

### `id`
生成规则：
- 基础格式：`<class-slug>-<source-lower>`
- 2024/2014 并行职业允许同名分条，例如：
  `barbarian-phb`
  `barbarian-xphb`
- 子职业格式：
  `<class-slug>-<subclass-slug>-<source-lower>`

### `name`
- 直接使用 `中文data` 的中文名
- 不做翻译修饰
- 仅在明显乱码/编码异常时暂停，不做主观猜改

### `source`
- 直接使用源文件中的缩写值
- 不改成“官方规则”
- 例：
  `PHB`
  `XPHB`
  `XGE`
  `TCE`
  `BGG`

### `primaryAbility`
来源优先级：
1. `classData.primaryAbility`
2. `classData.proficiency` 的主属性推断
3. 人工补录

转换规则：
- 缩写通过 [ability_skill_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/ability_skill_mapping.md) 转中文
- 多主属性时保留文本串，不强压单值

### `saves`
- 从 `classData.proficiency` 提取
- 使用属性映射文档转成中文数组

### `coreTraits`
标准子项建议：
- `primaryAbility`
- `hitPointDie`
- `savingThrows`
- `skillProficiencies`
- `weaponProficiencies`
- `armorTraining`
- `startingEquipment`

映射来源：
- `classData.primaryAbility`
- `classData.hd`
- `classData.proficiency`
- `classData.startingProficiencies`
- `classData.startingEquipment`

规则：
- `startingEquipment.defaultData` 与 `entries` 同时存在时，以 `entries` 生成人类可读文本，以 `defaultData` 做校验
- 武器/护甲/工具类别解释依赖 [item_type_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_type_mapping.md)
- 武器属性解释依赖 [item_property_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/item_property_mapping.md)

### `classTable`
构建步骤：
1. 以 `classData.classTableGroups.colLabels` 建列
2. 强制补上 `level`
3. 结合 `classFeatures` 生成 `features` 列
4. 输出为：
   `title`
   `columns`
   `rows`

规则：
- `bonus` 结构转成展示值文本
- 多组表列时按现有 `data` 表格风格合并
- `gainSubclassFeature` 只体现在 `features` 列文字上

### `features`
构建步骤：
1. 以 `01_职业特性` 下的具体文件为主
2. 根职业 JSON 中 `classFeatures` 只作顺序索引和补缺检查
3. 每个特性标准化为：
   `level`
   `name`
   `source`
   `description`

规则：
- 占位特性保留，但必须标注 `placeholder`
- 引用外部 feat/condition/skill 时，只在正文中保留可读词，不保留 5etools 标记
- 与专长的交叉引用可用 [feat_prereq_mapping.md](E:/YJF/DND2024characterbuilder-2.0/中文data/feat_prereq_mapping.md) 辅助说明

### `subclasses`
构建步骤：
1. 以 `02_子职业` 目录逐文件解析
2. 每个子职业生成单独对象
3. 并入所属职业的过渡文件中

规则：
- `parentClass` 以职业中文名为准，保持与现有 `data/classes/*.ts` 风格一致
- 若目录内同时存在 `PHB` 与 `XPHB` 版同名子职业，必须并存
- 子职业介绍与子职业特性分离，不能把全部文本揉成一个 description

## Cleaning Pipeline
对每个职业目录执行固定 8 步：

1. 读取职业根文件  
提取职业基础元数据、表格骨架、特性索引、子职业索引。

2. 读取 `01_职业特性`  
建立职业特性标准表。

3. 读取 `02_子职业`  
建立子职业标准表。

4. 对照公共特性  
识别是否引用了 `00_公共特性` 中可复用条目。

5. 富文本清洗  
去除 5etools 标记，保留结构化可读内容。

6. 术语归一  
使用 7 份映射文档统一属性、技能、书籍、专长、物品、法术术语。

7. 组装过渡结果  
输出到 `staging-data/classes/core` 或 `extended`

8. 人工复核  
写入 `staging-data/_reviews/classes-review-log.md`

## Manual Review Checklist
每个职业必须至少检查这些点：

- `source` 是否保留原始缩写
- `id` 是否和同名异版冲突
- `classTable` 的等级与特性顺序是否一致
- `primaryAbility` 是否被误推断
- `startingEquipment.entries` 与 `defaultData` 是否冲突
- `features` 是否遗漏多层 `entries`
- 子职业介绍段是否被误当作普通特性
- 公共特性是否被重复内联
- 2014 版与 2024 版是否误混
- 扩展职业是否误进入核心职业候选区

## Output Contract
每个职业过渡文件必须包含这几个段落：

- `metadata`
  `id/name/source/classFolder/status`
- `class`
  `description/fullDescription/hitDie/primaryAbility/saves/tags/coreTraits/subclassLevel`
- `progression`
  `classTable/features`
- `subclasses`
  子职业数组
- `reviewNotes`
  冲突、缺失、人工判断

每个文件状态只能是以下之一：
- `parsed`
- `parsed_with_warnings`
- `needs_manual_review`
- `extended_candidate`

## Test Plan
- 先以 `野蛮人` 做首个样板，覆盖：
  根职业 JSON
  职业特性文件
  子职业文件
  公共特性引用
- 再选一个施法职业和一个非施法职业对照验证
- 至少检查：
  `PHB`
  `XPHB`
  `XGE`
  一个第三方 source
- 验证输出中没有任何现有 `data` 被直接修改
- 验证映射文档只作为字典层，不替代结构判断

## Assumptions
- 当前工作区中的编码显示异常不影响方案设计，但实际执行前必须固定编码读取策略。
- 本专项只产出职业与子职业清洗执行规范，不直接执行批量转换。
- 扩展职业默认进入 `staging-data/classes/extended`，除非后续明确要进入主库。
