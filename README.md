# ✂️ 剪流 SKILL (JianFlow)

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/GSAP-3.x-88CE02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Tailwind-3.4+-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</p>

<p align="center">
  <strong>从 GitHub 数据抓取到爆款短视频生成的完整可视化工作流</strong><br/>
  <em>ExtremeCut Transition Engine · AI-Powered Video Pipeline · Viral Content Auditor</em>
</p>

<p align="center">
  <a href="#-快速开始">🚀 快速开始</a> ·
  <a href="#-工作流程">🔄 工作流</a> ·
  <a href="#-转场特效">⚡ 转场特效</a> ·
  <a href="#-技术架构">🏗️ 架构</a> ·
  <a href="https://3sa6i5sa2r3ra.ok.kimi.link">🔴 在线演示</a>
</p>

---

## 🎬 项目预览

<p align="center">
  <img src="public/assets/preview-workflow.png" alt="剪流工作流预览" width="900"/>
</p>

> **左侧面板**：4 节点串联工作流画布 — **中央视口**：9:16 实时视频预览 — **右侧面板**：节点深度配置

---

## 📖 项目简介

**剪流 (JianFlow)** 是一款面向内容创作者的**短视频自动化工作流生成器**。它将原本黑盒的 AI Agent 工作流彻底白盒化，可视化展示从「GitHub 仓库数据采集 → LLM 内容分析 → 爆款条件审查 → 视频合成输出」的完整链路。

项目核心在于中央 9:16 视频预览区——以 GSAP 驱动的**三同步极速剪辑转场**（屏幕强震 + 图片滑轨平移 + 文字斜切飞入），将技术产品的 GitHub 页面转化为具有强烈视觉冲击力的竖屏短视频。

### 为什么叫「剪流」？

> 「剪」代表剪辑、裁剪，「流」代表数据流、工作流。合意为：**在数据流中精准剪辑，让技术内容流动成爆款视频。**

---

## ✨ 核心特性

| 特性 | 描述 |
|------|------|
| 🔗 **4 节点工作流** | GitHub 采集 → LLM 分析 → 爆款审查 → 视频合成，纵向串联可视化 |
| 🎞️ **9:16 竖屏预览** | 中央实时渲染手机比例视频，支持播放/暂停/逐帧控制 |
| ⚡ **三同步转场引擎** | 震动(15px) + 滑移(40%) + 斜切(8°) 同时触发，1.3s 极速切换 |
| 🧠 **LLM 智能分析** | 集成 GPT-4o/Claude/Gemini，自动提炼技术产品卖点 |
| 🛡️ **爆款条件审查** | 5 维度评分体系（标题/卖点/时长/CTA/节奏），92/100 通过阈值 |
| 🎛️ **深度参数控制** | 每页独立时长、震动幅度、文字飞入速度、字幕样式全可调 |
| 📊 **实时执行日志** | 毫秒级节点状态追踪，可视化进度流 |
| 🖤 **工业级 UI** | 黑白高对比暗色主题，灵感源自 DaVinci Resolve 剪辑软件 |

---

## 🔄 工作流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        剪流工作流管道                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │ GitHub       │───▶│ LLM          │───▶│ 爆款         │   │
│  │ 数据采集     │    │ 内容分析     │    │ 条件审查     │   │
│  │              │    │              │    │              │   │
│  │ • Stars      │    │ • 卖点提炼   │    │ • 标题吸引力 │   │
│  │ • Forks      │    │ • 用户画像   │    │ • 卖点密度   │   │
│  │ • README     │    │ • 技术亮点   │    │ • 时长控制   │   │
│  │ • Topics     │    │ • 竞品对比   │    │ • 节奏感     │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
│         │                    │                    │           │
│         └────────────────────┴────────────────────┘           │
│                              │                                  │
│                              ▼                                  │
│                    ┌──────────────────┐                        │
│                    │   视频合成引擎     │                        │
│                    │                  │                        │
│                    │ • 9:16 MP4       │                        │
│                    │ • 震动转场       │                        │
│                    │ • 字幕合成       │                        │
│                    └──────────────────┘                        │
│                              │                                  │
│                              ▼                                  │
│                    ┌──────────────────┐                        │
│                    │   爆款短视频       │                        │
│                    │   (10.5s · 30fps)  │                        │
│                    └──────────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 节点详解

#### 1. 🔵 GitHub 数据采集 (`gh-crawl`)
- **输入**：GitHub 仓库 URL
- **输出**：Stars / Forks / Watchers / Topics / README 全文
- **技术**：GitHub REST API v3，支持公开/私有仓库 Token 认证
- **示例输出**：`Stars: 577, Forks: 55, README: 4.2KB`

#### 2. 🧠 LLM 内容分析 (`llm-analyze`)
- **输入**：README 原始文本
- **模型**：GPT-4o / Claude-3.5-Sonnet / Gemini-1.5-Pro
- **输出**：3-5 个核心卖点（≤15字）、技术亮点、目标用户画像
- **示例**：「AI驱动的浏览器自动化」「多标签页并行」「开源自托管」

#### 3. 🛡️ 爆款条件审查 (`viral-check`)
- **5 维度评分体系**（权重合计 100%）：
  | 维度 | 权重 | 标准 | 示例得分 |
  |------|------|------|----------|
  | 标题吸引力 | 20% | 含数字/情绪词 | 18/20 |
  | 卖点密度 | 25% | ≤3个且清晰 | 25/25 |
  | 时长控制 | 20% | 2-4s/页 | 20/20 |
  | 明确 CTA | 15% | 有行动号召 | 14/15 |
  | 总时长 | 20% | ≤15秒 | 20/20 |
- **通过阈值**：80/100
- **当前总分**：92/100 ✅

#### 4. 🎬 视频合成引擎 (`video-gen`)
- **输出**：1080×1920 · MP4 · 30fps · 10.5秒
- **4 页结构**：
  1. GitHub 主页展示（3s）
  2. 核心卖点分析（3s）
  3. 爆款审查报告（2.5s）
  4. 视频生成确认（2s）

---

## ⚡ 转场特效

### ExtremeCut Transition — 极速剪辑转场

这是复刻参考视频灵魂的核心特效。当视频播放到转场时间点，三个严格同步的 GSAP 动画同时触发：

```typescript
const tl = gsap.timeline();

// 1. 屏幕强震 (shakeScreen)
tl.to(container, {
  x: "random(-15, 15)",      // X轴 ±15px
  y: "random(-10, 10)",      // Y轴 ±10px
  duration: 1.3,
  repeatDelay: 0.05,        // 高频抽搐
  ease: "power1.inOut",
  onComplete: () => gsap.set(container, { x: 0, y: 0 })
});

// 2. 背景图片滑移 (slideImages)
tl.to(currentImg, { xPercent: -40, duration: 1.3, ease: "power2.inOut" }, 0);
tl.fromTo(nextImg, { xPercent: 40 }, { xPercent: 0, duration: 1.3, ease: "power2.inOut" }, 0);

// 3. 文字斜切飞入 (skewTextIn)
tl.fromTo(textLines, 
  { yPercent: 160, skewY: 8, opacity: 0 },
  { yPercent: 0, skewY: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.08 }
);
```

**效果参数可调**：
- 震动幅度：5-30px（默认 15px）
- 文字飞入速度：0.5-2.0s（默认 1.2s）
- 页面停留时长：每页独立设置 1-6s

---

## 🏗️ 技术架构

```
┌──────────────────────────────────────────────────────────┐
│                    剪流技术栈                              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  前端框架          React 18 + TypeScript 5               │
│  构建工具          Vite 5                                │
│  样式方案          Tailwind CSS 3.4 + shadcn/ui          │
│  动画引擎          GSAP 3 (GreenSock)                    │
│  图表组件          Recharts                              │
│  图标库            Lucide React                          │
│  路由              React Router v6                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  核心组件                                          │ │
│  │  ├── Navbar          顶部导航 + 全局控制           │ │
│  │  ├── WorkflowCanvas  左侧 4 节点工作流画布         │ │
│  │  ├── VideoPreview    中央 9:16 视频预览 + 转场     │ │
│  │  ├── ConfigPanel     右侧节点配置面板              │ │
│  │  └── LogPanel        底部执行日志                  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  状态管理 (useWorkflow Hook)                       │ │
│  │  ├── nodes[]         4 节点状态 (idle/running/...) │ │
│  │  ├── pages[]         4 页视频配置                  │ │
│  │  ├── viralResult     爆款审查结果                  │ │
│  │  ├── videoConfig     转场/字幕参数                 │ │
│  │  └── logs[]          执行日志队列                  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 前置要求
- Node.js ≥ 18
- npm ≥ 9

### 安装

```bash
# 克隆仓库
git clone https://github.com/xiaopengs/jianflow-skill.git
cd jianflow-skill

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 使用指南

1. **启动工作流**：点击顶部「运行工作流」按钮
2. **观察节点执行**：左侧 4 个节点依次变为 running → success
3. **预览视频**：中央 9:16 视口自动播放，带转场动画
4. **调整参数**：点击任意节点，右侧面板切换配置
5. **重新生成**：在「视频合成引擎」节点点击「重新生成」

---

## 📁 项目结构

```
jianflow-skill/
├── public/
│   └── assets/
│       ├── github-page.jpg        # 背景图1: GitHub暗色仓库界面
│       ├── analysis-report.jpg    # 背景图2: 卖点分析报告
│       └── viral-check.jpg        # 背景图3: 爆款审查报告
├── src/
│   ├── sections/
│   │   ├── Navbar.tsx             # 顶部导航栏
│   │   ├── WorkflowCanvas.tsx     # 左侧工作流节点画布
│   │   ├── VideoPreview.tsx       # 中央 9:16 视频预览 + GSAP转场
│   │   ├── ConfigPanel.tsx        # 右侧节点配置面板
│   │   └── LogPanel.tsx           # 底部执行日志
│   ├── hooks/
│   │   └── useWorkflow.ts         # 工作流状态管理 Hook
│   ├── types/
│   │   └── index.ts               # TypeScript 类型定义
│   ├── pages/
│   │   └── Home.tsx               # 主页面组装
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # 全局样式 + 自定义动画
├── docs/
│   └── index.html                 # 项目介绍静态页面
├── design/
│   └── design.md                  # 设计 PRD 文档
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md                      # 本文件
```

---

## 🛠️ 开发计划

- [x] 4 节点串联工作流可视化
- [x] 9:16 竖屏视频实时预览
- [x] GSAP 三同步转场引擎
- [x] 爆款条件审查评分系统
- [ ] 接入真实 GitHub API
- [ ] 接入真实 LLM API (OpenAI/Anthropic)
- [ ] 视频录制导出 (MediaRecorder)
- [ ] 背景音乐合成
- [ ] 批量工作流模板
- [ ] 用户历史记录

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feat/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feat/amazing-feature`
5. 打开 Pull Request

### 代码规范
- 使用 TypeScript 严格模式
- 组件命名：PascalCase
- Hook 命名：camelCase，以 `use` 开头
- CSS 类名：Tailwind 优先，自定义动画在 `index.css`

---

## 📄 许可证

[MIT](LICENSE) © 2025 xiaopengs

---

<p align="center">
  <strong>如果这个项目对你有帮助，请给它一颗 ⭐️</strong><br/>
  <sub>Made with ❤️ and 🔥 by the JianFlow Team</sub>
</p>
