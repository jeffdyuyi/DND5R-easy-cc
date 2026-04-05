# 不咕鸟 DND5R 制卡器 — 技术文档 (可复现版)

> **版本**: v1.0 | **日期**: 2026-04-04 | **项目名**: `dnd-5r-character-creator`

---

## 1. 项目总览

本工具是一个纯前端 D&D 5e (2024) 角色构建器，分为 **玩家端** 和 **主持人端** 两个独立视图。

- **玩家端**：9 步分步建卡向导 + 角色卡库管理 + 法术书
- **主持人端**：11 个数据库模块的 CRUD 管理面板
- **无房间功能**：当前版本不包含联机/房间功能

### 1.1 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | React + TypeScript | React 18.2, TS 5.2 |
| 构建 | Vite | 5.1.6 |
| CSS | TailwindCSS (CDN) | CDN 版本 `cdn.tailwindcss.com` |
| 图标 | Lucide React | 0.344.0 |
| 持久化 | `localStorage` | 浏览器原生 |
| 部署 | GitHub Pages | `base: '/DND5R-easy-cc/'` |

### 1.2 项目结构

```
DND5R-easy-cc/
├── App.tsx                    # 入口：欢迎页 → 玩家/主持人 分流
├── index.html                 # Tailwind CDN + 自定义色彩配置
├── index.tsx                  # React 根挂载
├── types.ts                   # 全局 TypeScript 类型定义
├── vite.config.ts             # Vite 配置 (chunk 分割)
├── components/
│   ├── common/                # 通用 UI 组件
│   │   ├── WelcomeScreen.tsx  # 欢迎/免责声明页
│   │   ├── CompactCard.tsx    # 紧凑网格卡片
│   │   ├── ModernListRow.tsx  # 列表行组件
│   │   └── ClassCard.tsx      # 职业卡片
│   ├── wizard/                # 建卡向导框架
│   │   ├── WizardLayout.tsx   # 双栏布局 (左选择/右详情)
│   │   ├── WizardStepProgress.tsx # 底部步骤进度条
│   │   ├── FeatureAccordion.tsx   # 特性折叠面板
│   │   └── ChoiceRenderer.tsx     # 通用选项渲染器
│   ├── Step*.tsx              # 9 个建卡步骤组件
│   ├── CharacterWizard.tsx    # 建卡主控制器
│   ├── CharacterSheet.tsx     # 角色卡详情 (Tab 系统)
│   ├── CardLibrary.tsx        # 通用卡片网格/列表库
│   ├── LibraryManager.tsx     # 资料库管理器壳
│   ├── LibraryEditors.tsx     # 8 个专用编辑器
│   ├── LibraryDetails.tsx     # 7 个详情视图
│   ├── PlayerView.tsx         # 玩家端主视图
│   ├── PlayerSidebar.tsx      # 玩家端侧边栏
│   ├── GMView.tsx             # 主持人端主视图
│   └── GMSidebar.tsx          # 主持人端侧边栏
├── contexts/
│   ├── CharacterContext.tsx   # 角色状态管理
│   ├── LibraryContext.tsx     # 数据库状态管理
│   └── AppProviders.tsx       # Context 组合
├── hooks/
│   ├── useLocalStorage.ts     # localStorage Hook
│   ├── useLibraryManager.ts   # 通用 CRUD Hook
│   └── useLibraryFilters.ts   # 筛选 Hook
├── utils/
│   ├── character-builder.ts   # 建卡计算函数
│   ├── characterUtils.ts      # 角色工具函数
│   ├── equipmentUtils.ts      # 装备转换函数
│   └── rules.ts               # 数据验证
└── data/
    ├── index.ts               # 数据聚合入口
    ├── classes/               # 12 个职业 JSON-in-TS
    ├── species/               # 11 个种族
    ├── backgrounds/           # 17 个背景
    ├── spell-lists/           # 法术列表
    ├── data-spells-level*.ts  # 0-9 环法术
    ├── data-feats.ts          # 专长
    ├── data-items-*.ts        # 武器/护甲/工具/物品/魔法物品
    └── ...
```

---

## 2. 视觉风格规范 (玩家端)

### 2.1 色彩系统

在 `index.html` 中通过 `tailwind.config` 定义：

```javascript
colors: {
  dndRed: '#8B0000',         // 主色调 - 暗红 (Dark Red)
  parchment: '#FFFFFF',      // 背景白
  parchmentDark: '#F3F4F6',  // 次级背景 (gray-100)
  slate: '#2F4F4F'           // 暗色强调
}
```

**实际使用的色彩调度方案 (基于 Tailwind stone 色阶)**：

| 用途 | Tailwind Class | 实际色值 |
|------|---------------|---------|
| **页面背景** | `bg-stone-100` | `#F5F5F4` |
| **文字主色** | `text-stone-900` | `#1C1917` |
| **文字次级** | `text-stone-500` | `#78716C` |
| **文字弱化** | `text-stone-400` | `#A8A29E` |
| **卡片背景** | `bg-white` / `bg-stone-50` | `#FFFFFF` / `#FAFAF9` |
| **边框** | `border-stone-200/300` | `#E7E5E4` / `#D6D3D1` |
| **主题强调(选中)** | `border-dndRed` / `text-dndRed` | `#8B0000` |
| **选中背景** | `bg-red-50` | `#FEF2F2` |
| **侧边栏** | `bg-stone-900` | `#1C1917` |
| **侧边栏激活** | `bg-dndRed` (玩家) / `bg-stone-700` (GM) | `#8B0000` / `#44403C` |
| **向导头部** | `from-stone-800 to-stone-700` 渐变 | 深灰渐变 |
| **步骤-完成** | `bg-green-500` | `#22C55E` |
| **步骤-当前** | `bg-amber-500` + `ring-amber-100` | `#F59E0B` |
| **步骤-待定** | `bg-stone-200` | `#E7E5E4` |
| **步骤-错误** | `bg-red-500` | `#EF4444` |
| **完成按钮** | `bg-green-600` | `#16A34A` |
| **下一步按钮** | `bg-dndRed` | `#8B0000` |

**卡片库颜色主题映射** (`CardLibrary.tsx` 的 `getColorClasses`)：

| 资料库 | `cardColorTheme` | 边框 | 头部背景 |
|--------|------------------|------|---------|
| 角色卡 | `stone` | `border-stone-600` | `bg-stone-600` |
| 职业 | `red` | `border-red-900` | `bg-red-900` |
| 子职业 | `orange` | `border-orange-800` | `bg-orange-800` |
| 种族 | `green` | `border-green-800` | `bg-green-800` |
| 背景 | `yellow` | `border-yellow-700` | `bg-yellow-700` |
| 专长 | `purple` | `border-purple-900` | `bg-purple-900` |

### 2.2 字体系统

```javascript
fontFamily: {
  serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
}
```

- **全局字体**: `font-serif` — 使用 Georgia 为首选衬线体
- **特殊场景**: `font-sans` 用于版本号、副标题等辅助信息
- **标题**: `font-bold` / `font-black` 配合 `tracking-wide` / `tracking-widest`
- `body` 标签: `class="bg-white text-gray-900 font-serif"`

### 2.3 图标来源

全部使用 **[Lucide React](https://lucide.dev/)** (`lucide-react@0.344.0`)。

**关键图标映射**:

| 场景 | 图标名 | 用途 |
|------|--------|------|
| 品牌标识 | `Feather` | 侧边栏 Logo、标题 |
| 玩家侧边栏 | `User` (角色卡), `Flame` (法术书) | 菜单项 |
| GM 侧边栏 | `Shield`, `Star`, `Crown`, `Scroll`, `Book`, `Zap`, `Sword`, `Hammer`, `Backpack`, `FlaskConical` | 11 个资料库 |
| 职业图标 | `Axe`(野蛮人), `Music`(吟游诗人), `Cross`(牧师), `Leaf`(德鲁伊), `Sword`(战士), `Moon`(武僧), `Shield`(圣武士), `Target`(游侠), `Footprints`(游荡者), `Zap`(术士), `Eye`(魔契师), `Wand2`(法师) | 建卡步骤1 |
| 步骤指示 | `Check` (完成), `AlertCircle` (错误/待选), `ChevronLeft`/`ChevronRight` | 底部进度条 |
| 操作 | `Plus`(新建), `Search`(搜索), `Edit2`(编辑), `Trash2`(删除), `FileUp`(导入), `FileDown`(导出), `ArrowLeft`(返回) | 卡片库/管理器 |
| 欢迎页 | `Shield`(免责), `Users`(社群) | 欢迎屏幕 |

### 2.4 动画与过渡

- **页面切换**: `animate-fade-in` (自定义 CSS 类)
- **卡片悬停**: `hover:shadow-xl hover:-translate-y-1` + `transition-all duration-200`
- **侧边栏滑入**: `transition-transform duration-300`
- **遮罩层**: `transition-opacity duration-300`
- **按钮点击**: `active:scale-95`
- **选中放大**: `scale-[1.02]`
- **图标放大**: `group-hover:scale-110 transition-transform`

---

## 3. 应用入口与路由逻辑

### 3.1 欢迎屏幕 → 角色分流 ([WelcomeScreen.tsx](file:///e:/YJF/DND5R-easy-cc/components/common/WelcomeScreen.tsx))

```
用户打开应用
  ↓
是否已进入过? (localStorage: 'dnd_has_entered_v1')
  ├─ 否 → 渲染 WelcomeScreen
  │       ├─ "我是玩家，创建角色" → setActiveTab('player'), setHasEntered(true)
  │       └─ "我是主持，管理数据" → setActiveTab('gm'), setHasEntered(true)
  └─ 是 → 直接渲染对应 View
         ├─ activeTab === 'player' → <PlayerView />
         └─ activeTab === 'gm'     → <GMView />
```

**状态持久化**:
- `dnd_active_tab` → `'player'` | `'gm'` (localStorage)
- `dnd_has_entered_v1` → `'true'` (localStorage)
- "返回首页"按钮清除 `dnd_has_entered_v1`

### 3.2 顶部 Header ([App.tsx](file:///e:/YJF/DND5R-easy-cc/App.tsx))

- 左侧: 当前模式标签 (🎭玩家端 indigo / 🛡️主持人端 red)
- 右侧: "返回首页"按钮 + 品牌名 "不咕鸟 DND5R v1.0" + 副标题 "TRPG CAMPAIGN TOOL"

---

## 4. 玩家端架构

### 4.1 玩家端主视图 ([PlayerView.tsx](file:///e:/YJF/DND5R-easy-cc/components/PlayerView.tsx))

**布局**: 固定左侧边栏 (w-264) + 右侧内容区 (flex-grow)

**侧边栏菜单** ([PlayerSidebar.tsx](file:///e:/YJF/DND5R-easy-cc/components/PlayerSidebar.tsx)):
1. `角色卡` (User 图标) → 角色卡库 / 角色详情
2. `法术书` (Flame 图标) → 法术书管理器

**状态管理**:
- `activeModule`: `'sheet'` | `'spellbook'`
- `isWizardActive`: 建卡向导激活标志
- `activeCharId`: 当前选中角色 ID

### 4.2 角色卡库

当无角色被选中时，显示 **角色卡库页面**:

```
┌─────────────────────────────────────────┐
│ 角色卡库                   [全部导出] [导入] │
│ 创建新角色或点击卡片管理已有角色。            │
├─────────────────────────────────────────┤
│ [搜索框] [全部][官方规则][原创/第三方]        │
│                                         │
│ ┌──────┐ ┌──────┐ ┌──────┐              │
│ │+新建  │ │角色1  │ │角色2  │              │
│ │ 角色  │ │Lv.3  │ │Lv.5  │              │
│ │      │ │人类   │ │精灵   │              │
│ └──────┘ └──────┘ └──────┘              │
└─────────────────────────────────────────┘
```

**组件**: `CardLibrary<BaseLibraryItem>`, `cardColorTheme="stone"`

**核心功能**:
- **新建角色**: 调用 `createCharacter()` → 生成 ID `char-{timestamp}` → 激活向导
- **选择角色**: `setActiveCharId(item.id)` → 渲染 `CharacterSheet`
- **删除角色**: 确认弹窗 → `deleteCharacter(id)`
- **导出**: 所有角色 JSON → 下载 `dnd_characters_backup_YYYY-MM-DD.json`
- **导入**: 读取 JSON → `validateCharacterData()` → 去重导入

### 4.3 九步建卡向导

#### 4.3.1 向导主控制器 ([CharacterWizard.tsx](file:///e:/YJF/DND5R-easy-cc/components/CharacterWizard.tsx))

**状态**: `step: 1-9`, `totalSteps: 9`

**步骤定义**:

| # | 组件 | 步骤名 | 完成条件 |
|---|------|--------|---------|
| 1 | `StepClassLevel` | 职业 | `character.className` 非空 |
| 2 | `StepSpecies` | 种族 | `character.race` 非空 |
| 3 | `StepBackground` | 背景 | `character.background` 非空 |
| 4 | `StepSpells` | 法术 | 无法术专长=自动完成; 有=需选施法属性+戏法+1环 |
| 5 | `StepAbilities` | 属性 | 所有 6 项属性值 > 0 |
| 6 | `StepSkills` | 技能 | 自动完成 (从职业/背景自动填充) |
| 7 | `StepEquipment` | 装备 | 自动完成 (装备可选) |
| 8 | `StepDetails` | 细节 | 自动完成 (角色描述可选) |
| 9 | `StepIdentity` | 阵营 | `character.alignment` 非空 |

**导航规则**: 所有步骤均可跳过 (`canGoNext = true` 始终为真)

**完成时处理**: 调用 `convertStartingInventoryToBackpack()` 将起始装备转入背包系统

#### 4.3.2 向导布局 ([WizardLayout.tsx](file:///e:/YJF/DND5R-easy-cc/components/wizard/WizardLayout.tsx))

每个步骤采用统一的 **双栏布局**:

```
┌─ Header ────────────────────────────────┐
│ {title}                    步骤 N / 9    │
├─── Left (2/5) ──┬─── Right (3/5) ───────┤
│                 │                        │
│  选择面板        │  详情/配置面板          │
│  (卡片网格)      │  (特性展示、子选项)     │
│                 │                        │
│  bg-stone-50    │  bg-white              │
│                 │                        │
├─────────────────┴────────────────────────┤
│           WizardStepProgress             │
│ [上一步]  ①②③④⑤⑥⑦⑧⑨  [下一步/完成]     │
└──────────────────────────────────────────┘
```

- 头部: `bg-gradient-to-r from-stone-800 to-stone-700` 白色文字
- 左栏: `lg:col-span-2`, `bg-stone-50`, 含选择网格
- 右栏: `lg:col-span-3`, `bg-white`, 含详情/配置
- 响应式: `grid-cols-1 lg:grid-cols-5`

#### 4.3.3 底部步骤进度条 ([WizardStepProgress.tsx](file:///e:/YJF/DND5R-easy-cc/components/wizard/WizardStepProgress.tsx))

**视觉状态**:
- 完成 (✓): 绿色圆圈 `bg-green-500`, 对勾图标
- 当前: 琥珀圆圈 `bg-amber-500` + `ring-4 ring-amber-100`, 显示数字
- 待定: 灰色圆圈 `bg-stone-200`, 显示数字
- 错误 (!): 红色圆圈 `bg-red-500`, 警告图标

步骤间有连接线: 完成段 `bg-green-300`, 未完成段 `bg-stone-200`

### 4.4 各步骤对主持人端资料库的调用

每个步骤通过 `useLibrary()` Hook 访问 `LibraryContext` 中的资料库:

| 步骤 | 调用的资料库 | 数据类型 |
|------|------------|---------|
| 1-职业 | `classes.items`, `subclasses.items` | `ClassItem[]`, `SubclassItem[]` |
| 2-种族 | `species.items` | `SpeciesItem[]` |
| 3-背景 | `backgrounds.items`, `feats.items` | `BackgroundItem[]`, `FeatItem[]` |
| 4-法术 | `spells.items` (间接通过 `OriginFeatSelector`) | `SpellItem[]` |
| 5-属性 | `classes.items` (获取推荐属性) | `ClassItem[]` |
| 6-技能 | 从步骤1/3的选择中聚合, 无直接库调用 | — |
| 7-装备 | `weapons.items`, `armors.items`, `tools.items`, `gears.items` (通过 `allTools`) | `ItemItem[]` |
| 8-细节 | 无直接库调用 | — |
| 9-阵营 | 无直接库调用 | — |

**调用链路**:
```
StepXxx 组件
  → useLibrary() Hook
    → LibraryContext
      → useLibraryManager(key, initialDB) Hook
        → useLocalStorage(key) Hook
          → localStorage.getItem(key)
          → 首次: 使用 data/*.ts 静态数据初始化
```

### 4.5 角色数据持久化

**存储键**: `dnd_characters_v1` (localStorage)

**数据结构** (`CharacterData` 接口, 约 50+ 字段):

| 字段组 | 关键字段 |
|--------|---------|
| 基础信息 | `id`, `name`, `playerName`, `level`, `className`, `subclass`, `race`, `subRace`, `background`, `alignment` |
| 扩展详情 | `pronouns`, `faith`, `lifestyle`, `gender`, `age`, `height`, `weight`, `hair`, `skin`, `eyes`, `appearance` |
| 战斗数值 | `abilities`, `abilityBonuses`, `backgroundBonuses`, `skillMastery`, `hpMax`, `currentHp`, `tempHp` |
| 装备系统 | `inventoryWeapons[]`, `inventoryArmor[]`, `inventoryGear[]`, `tools[]`, `startingInventory[]` |
| 法术系统 | `spellcastingAbility`, `spellSaveDC`, `spellAttackBonus`, `spells{}`, `spellSlots{}` |
| 专长配置 | `originFeat`, `featConfig`, `featSelections` |
| 角色扮演 | `personalityTraits`, `ideals`, `bonds`, `flaws`, `backstory` |
| 笔记 | `notesStructured`, `achievements[]` |
| 选择记录 | `selections{}`, `equipmentChoices{}`, `proficiencySources{}` |

---

## 5. 主持人端架构

### 5.1 主持人端主视图 ([GMView.tsx](file:///e:/YJF/DND5R-easy-cc/components/GMView.tsx))

**布局**: 与玩家端相同 — 固定左侧边栏 + 右侧内容区

**侧边栏菜单** ([GMSidebar.tsx](file:///e:/YJF/DND5R-easy-cc/components/GMSidebar.tsx)):

| 分组 | 模块ID | 标签 | 图标 |
|------|--------|------|------|
| 核心规则 | `lib-class` | 职业库 | Shield |
| | `lib-subclass` | 子职业库 | Star |
| | `lib-species` | 种族库 | Crown |
| | `lib-bg` | 背景库 | Scroll |
| | `lib-feat` | 专长库 | Book |
| | `lib-spell` | 法术库 | Zap |
| — | *divider* | — | — |
| 物品 | `lib-weapon` | 武器库 | Sword |
| | `lib-armor` | 护甲库 | Shield |
| | `lib-tool` | 工具库 | Hammer |
| | `lib-gear` | 冒险物品 | Backpack |
| | `lib-magic` | 魔法物品 | FlaskConical |

### 5.2 数据库管理架构

每个资料库模块由三层组件构成:

```
GMView
  └─ LibraryManager<T>          # 壳: 标题栏 + 导入/导出 + 筛选工具
       └─ CardLibrary<T>        # 核心: 搜索/筛选 + 卡片网格/列表 + CRUD
            ├─ renderItem()     # 自定义卡片渲染 (CompactCard / ModernListRow)
            ├─ renderDetail()   # 详情视图 (XxxDetailView)
            └─ renderEditFields() # 编辑表单 (XxxEditor)
```

### 5.3 通用 CRUD 功能

#### LibraryManager 层 ([LibraryManager.tsx](file:///e:/YJF/DND5R-easy-cc/components/LibraryManager.tsx))

| 功能 | 实现 |
|------|------|
| **导出** | `JSON.stringify(items)` → 下载 `{title}_YYYY-MM-DD.json` |
| **导入** | 读取 JSON → 支持数组/单对象 → 跳过重复 ID → 提示导入数量 |
| **详情查看** | 点击条目 → `setViewItem(item)` → 渲染 `renderDetail(item)` |
| **返回列表** | 点击"返回列表" → `setViewItem(null)` |

#### CardLibrary 层 ([CardLibrary.tsx](file:///e:/YJF/DND5R-easy-cc/components/CardLibrary.tsx))

| 功能 | 实现 |
|------|------|
| **搜索** | 按 `name` / `description` / `tags` 模糊匹配 |
| **来源筛选** | 三档: 全部 / 官方规则 / 原创-第三方 |
| **新建** | 基于 `emptyTemplate` 克隆 → ID `custom-{timestamp}` → 打开编辑器 |
| **编辑** | 仅限 `source === '第三方/原创'` 的条目可编辑（官方只读） |
| **删除** | 仅限自定义条目 → `window.confirm()` 确认 |
| **布局** | `layout='grid'` (法术/武器/护甲/工具/物品/魔法物品) 或 `layout='list'` (职业/子职业/种族/背景/专长) |

### 5.4 各资料库配置一览

| 库 | 布局 | 卡片组件 | 编辑器 | 筛选器 | localStorage Key |
|----|------|---------|--------|--------|-----------------|
| 职业 | list | `ModernListRow` | `ClassEditor` | — | `dnd_lib_classes` |
| 子职业 | list | `ModernListRow` | `SubclassEditor` | — | `dnd_lib_subclasses` |
| 种族 | list | `ModernListRow` | `SpeciesEditor` | — | `dnd_lib_species` |
| 背景 | list | `ModernListRow` | `BackgroundEditor` | — | `dnd_lib_backgrounds` |
| 专长 | list | `ModernListRow` | `FeatEditor` | `useFeatFilter` | `dnd_lib_feats` |
| 法术 | grid | `CompactCard` | `SpellEditor` | `useSpellFilter` | `dnd_lib_spells` |
| 武器 | grid | `CompactCard` | `RichDescriptionEditor` | — | `dnd_lib_items_weapons` |
| 护甲 | grid | `CompactCard` | `RichDescriptionEditor` | — | `dnd_lib_items_armor` |
| 工具 | grid | `CompactCard` | `ToolEditor` | `useItemFilter` | `dnd_lib_items_tools` |
| 冒险物品 | grid | `CompactCard` | `RichDescriptionEditor` | `useItemFilter` | `dnd_lib_items_gear` |
| 魔法物品 | grid | `CompactCard` | `RichDescriptionEditor` | `useMagicItemFilter` | `dnd_lib_items_magic` |

### 5.5 数据持久化机制 (useLibraryManager)

**核心 Hook**: [useLibraryManager.ts](file:///e:/YJF/DND5R-easy-cc/hooks/useLibraryManager.ts)

```typescript
function useLibraryManager<T>(key: string, initialItems: T[]): LibraryHandler<T>
```

- 使用 `useLocalStorage(key, initialItems)` 持久化
- **首次加载**: 从 `data/*.ts` 静态数据初始化到 localStorage
- **后续加载**: 直接从 localStorage 读取
- **CRUD 操作**: `onAdd` / `onUpdate` / `onDelete` / `onImport` → 自动同步到 localStorage
- **导入去重**: 基于 `id` 字段，已存在的条目自动跳过

**数据初始化链路**:
```
data/index.ts
  → 聚合 CLASS_DB, SUBCLASS_DB, SPECIES_DB, ...
    → LibraryContext 中构造 11 个 useLibraryManager 实例
      → 各实例读取 localStorage; 若为空则填充静态数据
        → 对外暴露 { items, onAdd, onUpdate, onDelete, onImport }
```

---

## 6. 数据类型定义速查

> 完整定义见 [types.ts](file:///e:/YJF/DND5R-easy-cc/types.ts) (408 行)

### 核心接口

| 接口 | 关键字段 | 用途 |
|------|---------|------|
| `BaseLibraryItem` | `id`, `name`, `description`, `source`, `tags?` | 所有资料库条目的基类 |
| `ClassItem` | extends Base + `hitDie`, `primaryAbility`, `saves`, `coreTraits`, `features[]`, `subclasses[]`, `subclassLevel`, `classTable?`, `spellList?` | 职业 |
| `SubclassItem` | extends Base + `parentClass`, `features[]`, `spellList?` | 子职业 |
| `SpeciesItem` | extends Base + `speed`, `size`, `darkvision`, `traits[]`, `subraces?` | 种族 |
| `BackgroundItem` | extends Base + `abilityScores[]`, `feat`, `skills[]`, `tool`, `equipment[]`, `choices?` | 背景 |
| `SpellItem` | extends Base + `level`, `school`, `castingTime`, `range`, `components`, `duration`, `classes?[]` | 法术 |
| `FeatItem` | extends Base + `category`, `prerequisite?`, `benefits[]` | 专长 |
| `ItemItem` | extends Base + `type`, `cost`, `weight`, `rarity?`, `damage?`, `ac?`, `properties?[]`, `mastery?` | 物品 |

### ContentSource 类型

```typescript
type ContentSource = '官方规则' | '第三方/原创' | string;
```

规则: `source === '官方规则'` 的条目 **只读**，`source === '第三方/原创'` 的条目可 CRUD。

---

## 7. 构建与部署

```bash
# 开发
npm run dev          # 启动 Vite 开发服务器

# 构建
npm run build        # node --max-old-space-size=12288 vite build
                     # 输出到 dist/ 目录

# 预览
npm run preview      # 预览构建产物
```

**Vite 配置要点**:
- `base: '/DND5R-easy-cc/'` — GitHub Pages 路径
- `manualChunks`: `vendor` (node_modules) + `dnd-data` (data/) 分包
- 源映射关闭，压缩开启

---

## 8. 复现指南

要完整复现此项目，需按以下顺序实施:

1. **初始化 Vite + React + TS 项目**
2. **配置 Tailwind CDN** 并在 `index.html` 中定义 `dndRed`, `parchment`, `font-serif` 扩展
3. **定义 `types.ts`** — 按照第 6 节的类型定义
4. **实现数据层** — `data/` 目录下的静态数据文件 + `index.ts` 聚合
5. **实现 Hooks** — `useLocalStorage`, `useLibraryManager`, `useLibraryFilters`
6. **实现 Contexts** — `CharacterContext` (角色CRUD) + `LibraryContext` (资料库)
7. **实现通用组件** — `WelcomeScreen`, `CardLibrary`, `LibraryManager`, `CompactCard`, `ModernListRow`
8. **实现向导框架** — `WizardLayout`, `WizardStepProgress`, `FeatureAccordion`, `ChoiceRenderer`
9. **实现 9 个步骤组件** — 每个使用 `WizardLayout` 双栏布局, 通过 `useLibrary()` 获取数据
10. **实现编辑器组件** — `LibraryEditors.tsx` 中的 8 个编辑器
11. **实现详情视图** — `LibraryDetails.tsx` 中的 7 个视图
12. **组装玩家端** — `PlayerView` + `PlayerSidebar` + `CharacterWizard` + `CharacterSheet`
13. **组装主持人端** — `GMView` + `GMSidebar` + 11 个 `LibraryManager` 实例
14. **组装入口** — `App.tsx` (WelcomeScreen 分流 + Header + View 切换)
