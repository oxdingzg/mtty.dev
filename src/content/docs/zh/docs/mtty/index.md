---
title: mtty
description: mtty 的文档，它是一个用 Rust 编写的 AI 原生终端与编辑器。
sidebar:
  order: 0
---

mtty 是用 Rust 编写的 AI 原生终端与编辑器，本地与远程同样顺手。它站在三根支柱上:带远程能力的
GPU 渲染终端(主机库、SFTP、端口转发、跳板机、命令片段)、编辑器(今天是内置的查看与编辑，原生编辑器
窗格正在开发)，以及一个代理工作台 —— 它显示每个 AI 编程代理正在做什么，并为代理排队后续工作。
底下是不含界面的引擎:`miao-term-core` 负责从 PTY 到屏幕的整条路径，`miao-term-editor` 是编辑内核。

应用以 **`mtty`** 的名字发布，同时提供 **`mtty-cli`** 控制客户端(v0.0.5 及之前两者都叫
`miaotty`，首次启动时会复制已有的 `~/.config/miaotty`);源码在
[`miao-term`](https://github.com/oxdingzg/miao-term) 仓库。

:::caution[预发布]
API 尚未稳定。macOS 是主要平台;Windows 与 Linux 已构建、测试，并在真实桌面上验收。Apple 公证与
Windows MSI 签名尚未完成。
:::

## 从哪里开始

| | |
|---|---|
| [安装](/zh/docs/mtty/install/) | macOS、Linux、Windows 的安装包，从源码构建，以及注册的 URL scheme |
| [Windows 下载提示](/zh/docs/about/windows-downloads/) | 两个产品共用的 SmartScreen 处理步骤与签名差异 |
| [配置](/zh/docs/mtty/config/) | `config.toml` —— 每个键、主题、配色、语言服务器、ACP agent、shell 集成 |
| [快捷键](/zh/docs/mtty/shortcuts/) | 窗口、终端与编辑器窗格 |
| [`mtty-cli` 控制面](/zh/docs/mtty/cli/) | 用脚本或另一个程序驱动正在运行的宿主 |
| [视图规则](/zh/docs/mtty/view-rules/) | 由 `views.json` 决定窗格标题、图标与徽章 |
| [排障](/zh/docs/mtty/troubleshooting/) | 构建失败、配置路径、shell 集成、`mtty-cli` 连不上 |
| [安全](/zh/docs/mtty/security/) | 这里什么算漏洞 —— 控制面、令牌与私钥 —— 以及如何报告 |

## 获取

预发布包发布在
[GitHub Releases](https://github.com/oxdingzg/miao-term/releases/latest):macOS 是一个含
`mtty.app` 的 zip，Linux 是 `.deb`/AppImage/tar，Windows 是 MSI/zip。每个包都带 minisign
`.sig` 签名，公钥随版本一同发布。

```sh
git clone https://github.com/oxdingzg/miao-term.git
cd miao-term
cargo run --release -p mtty-app
```

环境要求与各平台的细节见[安装](/zh/docs/mtty/install/)。

## 它是怎么构建的

仓库是一个由多个引擎组成的工作区，应用是它们的第一个使用者，而不是它们的主人:

| crate | 负责什么 |
|---|---|
| `miao-term-widget` | winit + wgpu 宿主:渲染循环，以及在同一帧里合成的 egui 界面 |
| `miao-term-render` | wgpu + glyphon 字形网格，四边形与图像管线 |
| `miao-term-core` | PTY、VT 解析、网格与回滚、选择、搜索、OSC、输入编码 |

`miao-term-editor` 是编辑内核，`graphics`、`config`、`mtp` 与 `ui` 与之并列。内核不含任何窗口或
GPU 代码，因此可以嵌入别的程序。

## 其余部分在哪里

内部工程记录留在仓库里，刻意不在这里发布:

- [架构与设计](https://github.com/oxdingzg/miao-term/blob/main/docs/ARCHITECTURE.zh-CN.md)
- [性能预算与 CI 门](https://github.com/oxdingzg/miao-term/blob/main/docs/PERFORMANCE.zh-CN.md)
- [发布流水线、签名与更新清单](https://github.com/oxdingzg/miao-term/blob/main/docs/RELEASE.zh-CN.md)
- [产品需求与路线图](https://github.com/oxdingzg/miao-term/blob/main/docs/PRODUCT.zh-CN.md)
- [架构决策记录](https://github.com/oxdingzg/miao-term/tree/main/docs/decisions)
