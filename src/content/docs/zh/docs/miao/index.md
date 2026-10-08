---
title: miao
description: miao 的文档，它是一个面向终端的 AI 编程代理。
sidebar:
  order: 0
---

miao 是面向终端的开源 AI 编程代理。它会探索代码仓库、编辑代码、执行命令并自查结果，使用的模型由
你选择。它把重点放在模型周围的工程能力：持久化
会话、上下文效率、任务委派，以及每一轮都看得见的花费。

```sh
curl -fsSL https://mtty.dev/miao/install | bash
```

| | |
|---|---|
| [为什么选择 miao](/zh/docs/miao/why-miao/) | 适用场景、当前功能与限制、方向性 roadmap |
| [使用指南](/zh/docs/miao/guide/) | 安装与升级、供应商、配置、键位、会话与模型、命令与技能、MCP、LSP、沙箱、费用遥测、自治续跑、FAQ 与排障 |
| [供应商与模型](/zh/docs/miao/providers/) | 连接供应商、选择与计价模型、自定义供应商，以及目录来源 |
| [远程控制](/zh/docs/miao/remote/) | 连接窗口与自己的 Hub、配对设备、管理范围授权与连接生命周期 |
| [版本管理与发布](/zh/docs/miao/release/) | 版本如何编号、构建和发布，以及如何回滚 |
| [开源代理工作流对比](/zh/docs/miao/comparison/) | 八个项目的工具并行、长任务、上下文与恢复，附源码证据 |
| [原生组件基准](/zh/docs/miao/native-benchmarks/) | 内部历史测量与原生/沙箱范围，独立于产品横向对比 |
| [参与贡献](/zh/docs/miao/contributing/) | 报告问题与提交改动 |
| [安全](/zh/docs/miao/security/) | 如何报告漏洞 |

源码、问题与发布：[oxdingzg/miao](https://github.com/oxdingzg/miao)。

## 来源与许可

miao 衍生自 [opencode](https://github.com/anomalyco/opencode)，项目中相当一部分代码来自其 MIT 授权实现。
感谢其作者与贡献者。miao 有自己的维护和发布；代码来源关系不代表隶属关系或获得背书。

保留的版权声明与再分发条款见[项目来源与许可](/zh/docs/miao/attribution/)。
