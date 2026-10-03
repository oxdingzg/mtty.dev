---
title: miao
description: miao 的文档，它是一个面向终端的 AI 编程代理。
sidebar:
  order: 0
---

miao 是面向终端的开源 AI 编程代理。它会探索代码仓库、编辑代码、执行命令并自查结果，使用的模型由
你选择。它基于 [opencode](https://github.com/anomalyco/opencode)，把功夫花在模型周围:持久化
会话、上下文效率、任务委派，以及每一轮都看得见的花费。

```sh
curl -fsSL https://mtty.dev/miao/install | bash
```

| | |
|---|---|
| [使用指南](/zh/docs/miao/guide/) | 安装与升级、供应商、配置、键位、会话与模型、命令与技能、MCP、LSP、沙箱、费用遥测、自治续跑、FAQ 与排障 |
| [Windows 未签名程序提示](/zh/docs/miao/windows-code-signing/) | 下载或运行时可能看到的 Windows 安全提示、处理方法与原因 |
| [版本管理与发布](/zh/docs/miao/release/) | 版本如何编号、构建和发布，以及如何回滚 |
| [miao 与 opencode 的对比](/zh/docs/miao/miao-vs-opencode/) | 这个分支的工作落在哪里，附实测数据与可用性 |
| [参与贡献](/zh/docs/miao/contributing/) | 报告问题与提交改动 |
| [安全](/zh/docs/miao/security/) | 如何报告漏洞 |

源码、问题与发布:[oxdingzg/miao](https://github.com/oxdingzg/miao)。miao 以 MIT 协议授权，
本站与该上游 [opencode](https://github.com/anomalyco/opencode) 项目无隶属关系，也未获其背书。
