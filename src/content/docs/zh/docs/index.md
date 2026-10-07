---
title: 文档
description: mtty（AI 原生终端与编辑器）与 miao（AI 编程代理）的用户文档。
---

两个开源工具，文档都在这里。使用教程由 `bun run sync:docs` 从对应产品仓库同步而来，并标注
来源提交，因此页面与它所描述的代码随时可以对照。

## mtty —— AI 原生的终端与编辑器

终端、编辑器与代理工作台，同在一个原生窗口里，用 Rust 编写。GPU 渲染，由性能门把关，并且知道每个
窗格里的代理在做什么。

[下载预览版](https://github.com/oxdingzg/mtty/releases/latest) ·
macOS · Linux `.deb`/AppImage · Windows MSI · 预发布

| | |
|---|---|
| [概览](/zh/docs/mtty/) | 它是什么、现在能做什么、接下来做什么 |
| [安装](/zh/docs/mtty/install/) | 安装包、从源码构建，以及 URL scheme |
| [配置](/zh/docs/mtty/config/) | `config.toml`:每个键、主题、语言服务器、shell 集成 |
| [`mtty-cli` 控制面](/zh/docs/mtty/cli/) | 用脚本或另一个程序驱动正在运行的宿主 |
| [编辑器](/zh/docs/mtty/editor/) | 文件、高亮、语言服务器与本地/远程保存行为 |
| [远程连接](/zh/docs/mtty/remote/) | SSH 主机、传输、端口、串口、Telnet 与 TCP |
| [快捷键](/zh/docs/mtty/shortcuts/) | 窗口、终端与编辑器窗格 |
| [视图规则](/zh/docs/mtty/view-rules/) | 由 `views.json` 决定窗格标题、图标与徽章 |
| [排障](/zh/docs/mtty/troubleshooting/) | 构建失败、配置路径、shell 集成、`mtty-cli` |
| [安全](/zh/docs/mtty/security/) | 控制面的边界，以及如何报告漏洞 |

## miao —— 面向终端的 AI 编程代理

开源编程代理:理解仓库、修改代码、执行命令并自查结果，模型由你选 —— 每一轮的花费也看得见。

```sh
curl -fsSL https://mtty.dev/miao/install | bash
```

| | |
|---|---|
| [概览](/zh/docs/miao/) | 它是什么，以及它是怎么搭起来的 |
| [使用指南](/zh/docs/miao/guide/) | 安装、供应商、权限、MCP 与 LSP、会话、长任务、排障 |
| [版本管理与发布](/zh/docs/miao/release/) | 版本如何编号、构建和发布 |
| [miao 与 opencode 的对比](/zh/docs/miao/miao-vs-opencode/) | 这个分支的工作落在哪里，附实测数据与可用性 |
| [参与贡献](/zh/docs/miao/contributing/) | 报告问题与提交改动 |
| [安全](/zh/docs/miao/security/) | 如何报告漏洞 |

## 报告问题

两个项目都在 GitHub 上接收 issue:
[mtty](https://github.com/oxdingzg/mtty/issues) ·
[miao](https://github.com/oxdingzg/miao/issues)。其他事情请写信到 <contact@mtty.dev>。
