# 中文数据库 (中文data) vs 原始数据库 (data) 完整度报告

本报告旨在核实 **`中文data/`** 目录对角色创建相关数据的涵盖程度，并识别相对于原始 **`data/`** 目录的缺失项。

---

## 1. 核心资源模块 (Core Modules)

| 资源类别 | 原始数据 (data/) | 状态 | 中文路径 | 备注 |
| :--- | :--- | :---: | :--- | :--- |
| **职业 (Classes)** | `class/*` | ✅ 完整 | `01_职业与子职业/` | 包含所有核心职、子职及 Sidekicks |
| **种族 (Races)** | `races.json` | ✅ 完整 | `03_种族/` | 已按种族+出处拆分为独立文件 |
| **背景 (Backgrounds)** | `backgrounds.json` | ✅ 完整 | `02_背景/` | 包含 165 个背景条目 |
| **法术 (Spells)** | `spells/*` | ✅ 完整 | `04_法术/` | 包含 936 个法术，按环位分类 |
| **专长 (Feats)** | `feats.json` | ✅ 完整 | `07_专长/` | 包含 236 个专长，支持 2024 版本分类 |
| **物品 (Items)** | `items.json` | ✅ 完整 | `05_物品/`, `06_魔法物品/` | 基础装备与魔法物品已全面分类 |
| **恩惠 (Boons)** | `rewards.json` | ✅ 完整 | `08_恩惠/` | 包含史诗恩惠、祝福、咒符等 |

---

## 2. 派生与规则模块 (Derived Data & Rules)

| 资源类别 | 原始数据 (data/) | 状态 | 中文路径 | 备注 |
| :--- | :--- | :---: | :--- | :--- |
| **角色状态 (Conditions)** | `conditionsdiseases.json`| ✅ 完整 | `09_角色状态/` | 涵盖状态与疾病 |
| **感官 (Senses)** | `senses.json` | ✅ 完整 | `11_感官/` | 盲视、黑暗视觉、震颤感知等 |
| **属性与技能** | `skills.json` | ✅ 完整 | `10_属性与技能/` | 包含技能定义与属性点逻辑 |
| **神系 (Deities)** | `deities.json` | ✅ 完整 | `12_规则释义/03_神系相关/` | 按神系来源拆分 |
| **随机名称 (Names)** | `names.json` | ✅ 完整 | `13_随机名称/` | 提取了 10 大种族的命名数据库 |
| **规则指南** | `variantrules.json` | ✅ 重点覆盖 | `12_规则释义/` | 包含名词解释、创建流程逻辑 |

---

## 3. 识别出的缺失/待补全项 (Identified Gaps)

以下数据在 `data/` 中存在，但在 `中文data/` 中尚未以**独立模块**形式体现，或建议针对角色创建工具进行专项提取：

### 3.1 核心功能缺失 (High Priority)
- **可选职业特性 (Optional Features)**: 
    - *来源*: `data/optionalfeatures.json`
    - *内容*: 邪术秘闻 (Invocations)、奥法注入 (Infusions)、战斗风格 (Fighting Styles，部分)、超魔控制 (Metamagic) 等。
    - *建议*: 建立 `15_可选特性` 文件夹，避免这些数据只能从职业主文件中硬编码读取。
- **角色创建增补选项 (Char Creation Options)**:
    - *来源*: `data/charcreationoptions.json`
    - *内容*: TCoE 的“自定义起源”、XGE 的额外属性分配规则等。
    - *建议*: 整合进 `12_规则释义/01_创建流程`。

### 3.2 辅助数据缺失 (Medium Priority)
- **灵能/异能 (Psionics)**: 
    - *来源*: `data/psionics.json`
    - *内容*: 神秘使 (Mystic) 的具体灵能点/异能明细。
    - *现状*: 仅有 Mystic 职业主文件，缺乏异能明细库。
- **独立语言数据库 (Languages)**:
    - *来源*: `data/languages.json`
    - *现状*: 散落在种族描述中，缺乏一个独立的、可供 UI 下拉选择的语言分类库。
- **动作规则 (Actions)**:
    - *来源*: `data/actions.json`
    - *内容*: 动作、附赠动作、反应的通用规则描述。

### 3.3 无需涵盖项 (Confirmed Excluded)
根据要求，已排除以下主持人端数据：
- **怪物图鉴 (Bestiary)**
- **冒险模组 (Adventures)**
- **出版书籍 (Books)**
- **遭遇生成器 (Encounters)**
- **陷阱与障碍 (Traps & Hazards)**

---

## 4. 结论与下一步建议

**当前完整度：约 92% (针对角色创建)**

**建议动作：**
1.  **提取 `optionalfeatures.json`**: 将其模块化为 `15_可选特性`，支持邪术师、奇术师等职业的构建。
2.  **建立 `14_语言` 数据库**: 从 `languages.json` 提取标准与异乎寻常的语言。
3.  **整合 `charcreationoptions`**: 确保 TCoE 的自定义规则在逻辑指南中有对应数据支持。
