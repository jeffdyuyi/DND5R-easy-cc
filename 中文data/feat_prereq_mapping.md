# 5etools 专长前置要求映射 (Feat Prereq Mapping)

整理 D&D 5e 专长系统中的技术前置条件键位与其中文含义。

| 键位 (Key) | 中文描述 | 说明 |
| :--- | :--- | :--- |
| **基础要求** | | |
| level | 等级要求 | 通常指人物总等级。 |
| ability | 属性要求 | 对应力量、敏捷等分值要求。 |
| race | 种族要求 | 限定特定种族或亚种使用。 |
| proficiency | 熟练项要求 | 限定具有特定护甲或武器熟练。 |
| background | 背景要求 | 特定背景起源。 |
| **施法能力** | | |
| spellcasting | 施法能力 | 具有施展法术的能力。 |
| spellcasting2020 | 施法能力 (2020) | Tasha 后引入的统一施法标签。 |
| spellcastingFeature | 施法特性 | 包含特定的施法职业特性。 |
| **进阶要求** | | |
| feat | 专长要求 | 获取该专长前需先拥有其他专长。 |
| feature | 特性要求 | 拥有特定职业或背景特性。 |
| otherSummary | 其他摘要 | 无法被代码化解析的文本说明。 |
| **专长分类 (Categories)** | | |
| O | 起源专长 | Origin Feat (2024) |
| G | 一般专长 | General Feat (2024) |
| FS | 战斗风格专长 | Fighting Style Feat (2024) |
| EB | 史诗恩惠专长 | Epic Boon Feat (2024) |
| D | 龙族/特殊分类 | Dragon/Special Category |
| **职业/子职业缩写** | | |
| Wiz | 法师 | Wizard |
| Fig | 战士 | Fighter |
| Rog | 游荡者 | Rogue |
| Cle | 牧师 | Cleric |
| Pal | 圣武士 | Paladin |
| Sor | 术士 | Sorcerer |
| War | 魔契师 | Warlock |
| Dru | 德鲁伊 | Druid |
| Bar | 野蛮人 | Barbarian |
| Ran | 游侠 | Ranger |
| Mon | 武僧 | Monk |
| Bar | 吟游诗人 | Bard (注意与蛮子冲突，通常为 Brd) |

> [!CAUTION]
> 职业缩写在 5etools 数据中并不完全统一，解析时需优先匹配 `class` 对象内的 `name` 字段。
