# 项目文档索引

本目录用于集中整理本项目的技术参考文档，作为后续产品设计、数据治理和程序开发的统一入口。

当前仓库中原始文档仍保留在旧位置，避免影响既有查阅路径；从现在开始，建议优先阅读和维护 `docs/` 下的归档版本。

---

## 目录结构

### 1. 产品与流程

- [项目技术总览](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/项目技术总览.md)
- [角色创建流程参考 / design flow](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/角色创建流程参考/character_builder_design_flow-xphb.md)
- [角色创建流程参考 / logic](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/角色创建流程参考/character_creation_logic-xphb.md)
- [缺失参考文档清单](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/缺失参考文档清单.md)
- [项目落地路线图](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/项目落地路线图.md)

### 2. 数据工程

- [数据库梳理与转化技术方案](E:/YJF/DND2024characterbuilder-2.0/docs/02_数据工程/数据库梳理与转化技术方案.md)
- [staging-data统一约束规范](E:/YJF/DND2024characterbuilder-2.0/docs/02_数据工程/staging-data统一约束规范.md)
- [数据清洗执行文档目录](E:/YJF/DND2024characterbuilder-2.0/docs/02_数据工程/数据清洗执行)

### 3. 规则与状态

- [角色构建计算口径规范](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/角色构建计算口径规范.md)
- [最终角色状态结构](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/最终角色状态结构.md)
- [编辑态与计算态角色对象规范](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/编辑态与计算态角色对象规范.md)
- [领域模型与类型契约](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/领域模型与类型契约.md)
- [规则计算引擎设计](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/规则计算引擎设计.md)
- [测试策略](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/测试策略.md)

### 4. 资料索引与映射

- [资料映射与完整性报告目录](E:/YJF/DND2024characterbuilder-2.0/docs/04_资料索引与映射)

### 5. 数据专题概览

- [职业与子职业概览](E:/YJF/DND2024characterbuilder-2.0/docs/05_数据专题概览/职业与子职业概览.md)
- [背景概览](E:/YJF/DND2024characterbuilder-2.0/docs/05_数据专题概览/背景概览.md)
- [种族概览](E:/YJF/DND2024characterbuilder-2.0/docs/05_数据专题概览/种族概览.md)

---

## 建议阅读顺序

如果你是产品经理：

1. [项目技术总览](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/项目技术总览.md)
2. [缺失参考文档清单](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/缺失参考文档清单.md)
3. [项目落地路线图](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/项目落地路线图.md)
4. [角色创建流程参考 / design flow](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/角色创建流程参考/character_builder_design_flow-xphb.md)

如果你是程序员：

1. [项目技术总览](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/项目技术总览.md)
2. [staging-data统一约束规范](E:/YJF/DND2024characterbuilder-2.0/docs/02_数据工程/staging-data统一约束规范.md)
3. [角色构建计算口径规范](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/角色构建计算口径规范.md)
4. [最终角色状态结构](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/最终角色状态结构.md)
5. [编辑态与计算态角色对象规范](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/编辑态与计算态角色对象规范.md)
6. [领域模型与类型契约](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/领域模型与类型契约.md)
7. [规则计算引擎设计](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/规则计算引擎设计.md)
8. [测试策略](E:/YJF/DND2024characterbuilder-2.0/docs/03_规则与状态/测试策略.md)
9. [项目落地路线图](E:/YJF/DND2024characterbuilder-2.0/docs/01_产品与流程/项目落地路线图.md)

---

## 当前结论

- 现有文档已经能覆盖数据清洗、规则口径、角色状态三个核心底座。
- 面向落地开发的 5 份桥梁文档已经补齐：PRD、分步验收、类型契约、引擎设计、测试策略。
- 仍缺少真正的前端工程骨架，以及少量非阻断的补充文档，例如信息架构、主持人资源管理需求说明、工程初始化与目录约定。
- 当前仓库主要是数据与规范资料，尚未看到 `package.json`、`App.tsx`、`vite.config.ts` 等前端工程文件，因此“工具创建”仍处于方案和数据准备阶段。
