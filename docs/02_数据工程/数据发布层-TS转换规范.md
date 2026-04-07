# 数据发布层 (Data-Builder) TS转换规范

## 1. 目标与定位

本规范定义了从 [staging-data](E:/YJF/DND2024characterbuilder-2.0/staging-data)（清洗后的 JSON 候选层）到 [data-builder](E:/YJF/DND2024characterbuilder-2.0/data-builder)（生产环境 TS 消费层）的转换逻辑。

- **核心原则**：**绝对禁止** 覆盖原始 `data/` 目录中的任何数据。
- **职责分工**：
  - `staging-data`: 结构化 JSON 格式，包含 review 信息，用于数据治理。
  - `data-builder`: 强类型 TypeScript 格式，仅包含前端逻辑所需的正式字段，用于稳定消费。
  - `data`: 遗留或原始手动维护的 TS 数据，作为存档参考。

---

## 2. 目录结构

发布目录位于 `E:/YJF/DND2024characterbuilder-2.0/data-builder/`，其内部结构严格对标 `staging-data` 的分类：

- `/species/`: 种族条目 TS 文件
- `/classes/`: 职业条目 TS 文件（待扩展）
- `/backgrounds/`: 背景条目 TS 文件（待扩展）
- ...

每个文件夹下必须包含一个 `index.ts` 用于聚合导出。

---

## 3. 转换逻辑 (以种族为例)

### 3.1 文件命名与主键
- 每个 `id` 对应的 JSON 生成一个同名 `.ts` 文件。
- 示例：`human-xphb.json` -> `human-xphb.ts`。

### 3.2 常量命名规则
- 内部常量名采用 `ID` 的大写蛇形命名。
- 示例：`human-xphb` -> `export const HUMAN_XPHB: SpeciesItem = ...`。

### 3.3 类型绑定
- 必须从当前项目的类型定义中导入对应的接口。
- 示例：`import { SpeciesItem } from '../../types';`。

### 3.4 脚本自动化
- 使用 `scripts/publish_species_ts.js` (或类似脚本) 进行自动化转换，确保数据一致性。
- 转换过程中仅保留 `SpeciesItem` 接口定义的合法字段，过滤掉 `reviewNotes` 等辅助字段（除非前端明确需要）。

---

## 4. 消费方式

前端 `CharacterWizard` 或 `LibraryManager` 在需要加载“最新清洗数据”时，应引用 `data-builder` 目录：

```typescript
import { SPECIES_BUILDER_DB } from '../data-builder/species';
```

---

## 5. 执行前提与安全
- 每次从 `staging-data` 推送到 `data-builder` 前，必须确保条目 `status` 为 `parsed`。
- 严禁手动修改 `data-builder` 中的文件，所有变更应回溯到 `中文data` 或 `staging-data` 后重新发布。
