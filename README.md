<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 不咕鸟 DND 5R 制卡器 (Boogu Bird DND 5R Character Creator)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwindcss)](https://tailwindcss.com/)

**不咕鸟 DND 5R 制卡器** 是一款基于 D&D 5e 2024 (5R) 规则的现代化网页端角色卡制作与管理工具。旨在为玩家提供流畅、直观且规则严谨的跑团辅助体验。

</div>

## ✨ 核心功能 (Core Features)

- **🧙‍♂️ 角色创建向导 (Character Wizard)**
  - 分步骤引导式创建流程，涵盖种族、职业、属性、背景、阵营、装备等核心要素。
  - 自动处理种族特性、职业能力、背景加成等规则细节。

- **📝 交互式角色卡 (Interactive Character Sheet)**
  - **总览 (Bio)**: 角色基本信息、外观、背景故事。
  - **战斗 (Combat)**: 实时计算 AC、先攻、速度，管理生命值与豁免。
  - **属性 (Stats)**: 六大属性与技能检定速查。
  - **法术 (Spells)**: 完整的法术位管理与已知法术列表。
  - **物品栏 (Inventory)**: 装备、道具、负重管理，支持魔法物品详情查看。
  - **特性与专长 (Features & Feats)**: 职业特性、种族能力与专长的一站式查询。

- **📚 规则数据库 (Rule Library)**
  - 内置基于 D&D 5e 2024 新版规则的完整数据。
  - 包括：职业 (Classes)、种族 (Species)、背景 (Backgrounds)、专长 (Feats)、法术 (Spells 0-9环)、物品 (Items) 等。
  - 支持全文搜索与快速筛选。

- **🎨 现代化 UI 设计**
  - 使用 Tailwind CSS 打造的精美界面。
  - 响应式设计，适配桌面端与平板操作。
  - 羊皮纸风格配色，沉浸式跑团体验。

## 🛠️ 技术栈 (Tech Stack)

本项目完全使用现代前端技术栈构建：

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: GitHub Pages

## 🚀 快速开始 (Get Started)

### 环境要求
确保您的开发环境中已安装 [Node.js](https://nodejs.org/) (推荐 v18+)。

### 1. 安装依赖
克隆项目后，在根目录下运行：

```bash
npm install
```

> **注意**: 如果遇到依赖冲突，可以尝试删除 `node_modules` 和 `package-lock.json` 后重新安装。

### 2. 启动开发服务器
启动本地开发环境，支持热更新：

```bash
npm run dev
```
访问终端显示的地址 (通常是 `http://localhost:5173`) 即可看到应用。

### 3. 构建生产版本
编译并打包用于生产环境的代码：

```bash
npm run build
```
构建产物将生成在 `dist` 目录下。

### 4. 预览生产版本
在本地预览构建后的应用：

```bash
npm run preview
```

## 📂 项目结构 (Project Structure)

```
/
├── components/         # React UI 组件
│   ├── wizard/         # 角色创建向导相关组件
│   └── ...             # 通用组件 (CharacterSheet, Library, etc.)
├── data/               # 游戏规则静态数据 (TypeScript)
│   ├── data-classes.ts     # 职业数据
│   ├── data-spells-*.ts    # 法术数据 (分等级)
│   ├── data-items-*.ts     # 物品数据
│   └── ...
├── utils/              # 工具函数
│   ├── characterUtils.ts   # 角色数据处理逻辑
│   ├── rules.ts            # 规则计算逻辑
│   └── ...
├── App.tsx             # 应用入口与路由
├── index.css           # Tailwind 入口与全局样式
└── vite.config.ts      # Vite 配置文件
```

## 🤝 贡献 (Contribution)

欢迎提交 Issue 或 Pull Request 来改进本项目！无论是修复 Bug、补充数据还是优化 UI，您的贡献都将帮助更多跑团玩家。

---
<div align="center">
Made with ❤️ for D&D Players
</div>
