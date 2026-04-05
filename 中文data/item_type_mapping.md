# D&D 5e 物品类型代码映射表 (Item Type Mapping)

在 5etools 的 `items.json` 及相关资源中，`type` 字段通常使用缩写来定义物品类别。本方案将这些缩写映射为本项目统一的中文类型名称。

| 缩写 (Abbr.) | 英文类型 (English Type) | 中文类型 (Chinese Type) | 适用范围 (Usage) |
| :--- | :--- | :--- | :--- |
| **基础装备** | | | |
| `LA` | Light Armor | 轻甲 | 皮甲、镶钉皮甲等 |
| `MA` | Medium Armor | 中甲 | 链甲衫、胸甲等 |
| `HA` | Heavy Armor | 重甲 | 板甲、环甲等 |
| `S` | Shield | 盾牌 | |
| `M` | Melee Weapon | 近战武器 | 长剑、长枪、匕首等 |
| `R` | Ranged Weapon | 远程武器 | 长弓、十字弩、飞镖等 |
| `A` | Ammunition | 弹药 | 箭、箭矢、圆石等 |
| `AF` | Ammunition (Firearm) | 弹药（枪械） | 子弹、火药粉末等 |
| **魔法物品** | | | |
| `P` | Potion | 药水 | 治疗药水、隐形药水等 |
| `RD` | Rod | 权杖 | 不动权杖、警卫权杖等 |
| `RG` | Ring | 戒指 | 隐形戒指、狂暴戒指等 |
| `SC` | Scroll | 卷轴 | 法术卷轴、防护卷轴等 |
| `ST` | Staff | 法杖 | 强袭法杖、火球法杖等 |
| `WD` | Wand | 魔杖 | 有时使用 `RD` 或 `ST` 混用 |
| `W` | Wondrous Item | 奇物 | 5etools 中常以 w 属性直接标记 |
| **工具与法器** | | | |
| `T` | Tool | 工具 | 一般意义上的通用工具 |
| `AT` | Artisan's Tools | 工匠工具 | 炼金用品、铁匠工具等 |
| `GS` | Gaming Set | 游戏器具 | 龙棋、扑克牌等 |
| `INS` | Musical Instrument | 乐器 | 鲁特琴、长笛等 |
| `SCF` | Spellcasting Focus | 施法法器 | 圣徽、奥法法器等 |
| **其他生活/载具** | | | |
| `G` | Adventuring Gear | 冒险装备 | 背包、火把、绳索等 |
| `MNT` | Mount | 坐骑 | 骡、马、骆驼等 |
| `VEH` | Vehicle (Land) | 陆地载具 | 马车、战车等 |
| `SHP` | Vehicle (Water) | 水面舰船 | 划艇、帆船等 |
| `AIR` | Vehicle (Air) | 飞空艇 | |
| `TAH` | Tack and Harness | 马具 | 马鞍、缰绳等 |
| `FD` | Food & Drink | 食物与饮品 | 铁配给、麦酒等 |
| **特殊与珍宝** | | | |
| `TB` | Trade Bar | 贸易宝条 | 5 磅金条、2 磅银条等 |
| `TG` | Treasure | 珍宝 | 宝石、艺术品等 |
| `EXP` | Explosive | 爆炸物 | 炸药包、火药桶等 |
| `SPC` | Special | 特殊 | 特殊属性或无法归类的物品 |
| `OTH` | Other | 其他 | |

---

> [!NOTE]
> **复合类型说明**：在原始数据中，部分物品可能存在复合代码（如 `MA|XPHB`），解析时应优先取第一个分隔符之前的内容。
