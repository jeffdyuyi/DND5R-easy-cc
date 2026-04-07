# 新建过渡库存目录的中文data -> data 转换方案

## Summary
不直接把 [中文data](E:/YJF/DND2024characterbuilder-2.0/中文data) 写入现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)。  
为避免污染现有可正常读取的数据层，新增一个独立过渡目录，专门存放“按 `data` 结构整理后的分类文本/中间产物”。现有 `data` 保持只读基准，`中文data` 作为原始库存，新增目录作为清洗与验收层。

推荐新增目录：
- [staging-data](E:/YJF/DND2024characterbuilder-2.0/staging-data)

这个目录的职责不是直接被应用消费，而是承接：
- 按 `data` 文件拆分方式整理后的候选数据
- 每类的转换说明、字段映射、人工复核记录
- 价值单位、source、术语映射等校验结果

## Directory Design
`staging-data` 目录建议按现有 `data` 的消费分层镜像，但只存“待并入”的新内容：

- `staging-data/classes/`
- `staging-data/backgrounds/`
- `staging-data/species/`
- `staging-data/spells/`
- `staging-data/items/weapons/`
- `staging-data/items/armor/`
- `staging-data/items/tools/`
- `staging-data/items/gear/`
- `staging-data/items/magic/`
- `staging-data/feats/`
- `staging-data/_guides/`
- `staging-data/_mappings/`
- `staging-data/_reviews/`

各目录职责：
- `classes/backgrounds/species/feats/`：存按目标结构整理后的分类文本或候选 TS/JSON 草案
- `spells/`：按环阶拆分，如 `level0.md`、`level1.md` 或对应候选数据文件
- `items/*`：按武器/护甲/工具/杂项/魔法物品分开整理
- `_guides/`：每个一级来源目录的转换指导
- `_mappings/`：`source`、术语、单位、属性、学派、物品类型映射字典
- `_reviews/`：人工复核记录，注明“已核对/待核对/冲突”

## Core Rule Changes
- [data](E:/YJF/DND2024characterbuilder-2.0/data) 继续作为只读参照层，不直接接受未经审查的 `中文data` 导入。
- [中文data](E:/YJF/DND2024characterbuilder-2.0/中文data) 继续作为原始库存层，不做目标结构修改。
- [staging-data](E:/YJF/DND2024characterbuilder-2.0/staging-data) 作为唯一允许写入的转换层。
- 只有当某条目在 `staging-data` 中通过字段校验、source 校验、单位校验、人工抽样复核后，才允许考虑并入 `data`。
- `source` 仍以 `中文data` 原始缩写为准，直接保留到 `staging-data` 中，不使用现有 `data` 的粗粒度 source。

## Folder-by-Folder Conversion Guidance

### `中文data/01_职业与子职业`
输出到：
- `staging-data/classes/`
- `staging-data/_guides/classes.md`

规则：
- 每个职业一个独立候选文件，结构参照现有 [data/classes](E:/YJF/DND2024characterbuilder-2.0/data/classes)
- 子职业并入对应职业候选文件，不直接碰 `data/classes/*.ts`
- `00_公共特性` 只做片段库与引用索引，存入 `staging-data/_mappings/class-features.md`
- 扩展职业先全部进 `staging-data/classes/extended/`，不默认进入主职业候选列表

### `中文data/02_背景`
输出到：
- `staging-data/backgrounds/`
- `staging-data/_guides/backgrounds.md`

规则：
- 每个背景单独整理为目标字段视图
- `00_特殊起源选项` 单独存入 `staging-data/_mappings/background-options.md`
- 背景中的选择逻辑先文本化记录，不直接压进现有 `data` 风格文件

### `中文data/03_种族`
输出到：
- `staging-data/species/`
- `staging-data/_guides/species.md`

规则：
- 每个种族一份候选文本
- 复杂子种族、可选体型、可选能力提升先在候选层保留说明
- `darkvision`、感官等字段在候选层标出“目标字段值”和“原文依据”

### `中文data/04_法术`
输出到：
- `staging-data/spells/level0` 到 `staging-data/spells/level9`
- `staging-data/_guides/spells.md`

规则：
- 每环一个目录或文件，和现有 `data-spells-level*.ts` 的拆分保持一致
- 每条法术记录原始 source、目标字段、升环说明、清洗后的 description
- 双版本法术必须分别保留，不做覆盖合并

### `中文data/05_物品`
输出到：
- `staging-data/items/weapons/`
- `staging-data/items/armor/`
- `staging-data/items/tools/`
- `staging-data/items/gear/`
- `staging-data/_guides/items.md`

规则：
- 武器、护甲、工具、冒险装备、坐骑载具分开存放
- 所有价值字段必须先过“货币单位校验”，未确认单位前不得写入候选结果
- `value` 的原值、推导单位、最终展示值三者必须同时记录

### `中文data/06_魔法物品`
输出到：
- `staging-data/items/magic/armor/`
- `staging-data/items/magic/misc/`
- `staging-data/_guides/magic-items.md`

规则：
- 魔法护甲与其他魔法物品分开
- 同调、充能、施法效果先保留在候选说明中
- 不因为现有 `data` 简化模型而丢失原始信息；缺乏承接字段时先放入注释化说明文本

### `中文data/07_专长`
输出到：
- `staging-data/feats/`
- `staging-data/_guides/feats.md`

规则：
- 2014 与 2024 分目录保存
- `category` 既记录原始分类来源，也记录目标分类落点
- 专长 benefit 分段必须和原始 entries 建立对应关系

### 当前无 data 消费面的目录
输出到：
- `staging-data/_guides/non-imported.md`
- 必要时 `staging-data/_mappings/`

包括：
- `08_恩惠`
- `09_角色状态`
- `10_属性与技能`
- `11_感官`
- `12_规则释义`
- `13_随机名称`
- `14_语言`
- `16_堡垒设施`
- `20_第三方自制内容` 中未落到六大主类的数据

规则：
- 不直接生成候选导入数据
- 只作为字典、术语库、规则库、未来模块储备

## Item Value Unit Rule
这是本轮必须新增的强制校验项。

### 目标
确认 `中文data` 物品的 `value` 单位到底是 `cp`、`sp` 还是 `gp` 基础值，避免换算误差污染候选数据。

### 当前初步判断
基于抽样：
- `backpack-xphb.json` 中 `value: 200`
- `longsword-xphb.json` 中 `value: 1500`

若对照 5e 常规定价：
- Backpack = 2 gp
- Longsword = 15 gp

则这组数据高度表明 `value` 的原始单位是 `cp`

也就是：
- `100 cp = 1 gp`
- `10 cp = 1 sp`

### 必须执行的校验步骤
在正式转换物品前，先建立：
- `staging-data/_mappings/item-value-unit.md`

并做三类抽样验证：
1. 低价物品  
例如火把、绳索、纸张、箭矢，验证是否能正确换算出 `cp/sp`
2. 中价常见物品  
例如背包、长剑、盾牌、链甲，验证是否换算成常见 `gp`
3. 高价与特殊物品  
例如载具、护甲、魔法物品，确认是否仍沿用同一单位，还是存在例外

### 换算规则
在候选层统一记录三列：
- `rawValue`
- `rawUnitAssumption`
- `normalizedCost`

默认规则先定为：
- 原始 `value` 视为 `cp`
- 若 `value % 100 == 0`，优先转 `GP`
- 若 `value % 10 == 0` 且不足 100，优先转 `SP`
- 否则保留 `CP`

示例：
- `1500 -> 15 GP`
- `200 -> 2 GP`
- `5 -> 5 CP`
- `40 -> 4 SP`

### 例外处理
以下情况不得直接自动换算，必须标记人工复核：
- 原始值缺失
- 原始值为字符串或公式
- 魔法物品常见“无定价”条目
- 明显与规则书标准价冲突的第三方内容
- 同名物品不同 source 价格不一致

## Required Mapping Files
在 `staging-data/_mappings/` 中固定准备这些文件：

- `sources.md`
  资源缩写字典，以 `中文data` 为准
- `item-value-unit.md`
  物品价值单位与换算规则
- `weapon-properties.md`
  武器属性缩写映射
- `weapon-mastery.md`
  武器精通映射
- `damage-types.md`
  伤害类型映射
- `spell-schools.md`
  法术学派映射
- `abilities-skills.md`
  属性、技能、豁免、职业中文名归一
- `status-senses.md`
  状态与感官词典

## Review Workflow
转换流程更新为：

1. 从 `中文data` 读取原始库存
2. 输出到 `staging-data` 对应类别目录
3. 记录 `source` 原值与字段映射说明
4. 对物品先执行价值单位校验
5. 完成人工抽样复核
6. 通过后才生成“可并入 data 的最终候选”
7. 是否并入 `data` 作为单独后续步骤，不属于本轮直接动作

## Test Plan
- `staging-data` 中每类至少抽样 3 条，核对字段是否对齐 `data` 真实格式
- 所有新增候选物品必须带 `rawValue -> normalizedCost` 记录
- 对 `PHB/XPHB/XGE/TCE/第三方 source` 各至少抽样 1 条，确认 `source` 未被粗化
- 验证没有任何 `中文data` 内容直接写入现有 [data](E:/YJF/DND2024characterbuilder-2.0/data)
- 验证所有“未确认单位”的物品都被拦截在 `staging-data`，未进入最终候选层

## Assumptions
- 现有 `data` 当前可正常读取，视为稳定基准，禁止直接污染。
- `staging-data` 是唯一允许承接清洗结果的新目录。
- 物品 `value` 暂按 `cp` 基础值假设处理，但在大规模转换前必须通过抽样校验确认。
- 本轮更新的是方案，不直接创建目录或写文件。
