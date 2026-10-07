---
title: mtty
description: mtty 的文档，它是一个用 Rust 编写的 AI 原生终端与编辑器。
sidebar:
  order: 0
---

mtty 是用 Rust 编写的 AI 原生终端与编辑器，面向本地与远程工作。终端提供标签与分屏、主机库、
文件传输和端口转发；原生编辑器窗格支持高亮、LSP、多光标和实时预览；代理工作台提供状态
徽章、通知、提示队列、ACP 与行内编辑提案。三者共用同一个窗口。

应用以 **`mtty`** 的名字发布，同时提供 **`mtty-cli`** 控制客户端(v0.0.5 及之前两者都叫
`miaotty`，首次启动时会复制已有的 `~/.config/miaotty`);源码在
[`mtty`](https://github.com/oxdingzg/mtty) 仓库。

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
| [远程主机与 SSH](/zh/docs/mtty/remote/) | 基于系统 OpenSSH 的主机库、SFTP、端口转发、跳板机、片段与广播 |
| [编辑器](/zh/docs/mtty/editor/) | 打开文件、语法与超大文件、多光标、vim、折叠、Markdown 预览与 LSP |
| [快捷键](/zh/docs/mtty/shortcuts/) | 窗口、终端与编辑器窗格 |
| [`mtty-cli` 控制面](/zh/docs/mtty/cli/) | 用脚本或另一个程序驱动正在运行的宿主 |
| [视图规则](/zh/docs/mtty/view-rules/) | 由 `views.json` 决定窗格标题、图标与徽章 |
| [排障](/zh/docs/mtty/troubleshooting/) | 构建失败、配置路径、shell 集成、`mtty-cli` 连不上 |
| [安全](/zh/docs/mtty/security/) | 这里什么算漏洞 —— 控制面、令牌与私钥 —— 以及如何报告 |

## 获取

预发布包发布在
[GitHub Releases](https://github.com/oxdingzg/mtty/releases/latest):macOS 是一个含
`mtty.app` 的 zip，Linux 是 `.deb`/AppImage/tar，Windows 是 MSI/zip。每个包都带 minisign
`.sig` 签名，公钥随版本一同发布。

下载后打开 mtty，在终端窗格中运行已安装的代理 CLI，例如 `miao`，再用命令面板在旁边打开文件。
[安装与第一个工作区](/zh/docs/mtty/install/) 按平台介绍操作，也包含源码构建步骤。

环境要求与各平台的细节见[安装](/zh/docs/mtty/install/)。

## 它是怎么构建的

仓库是一个由多个引擎组成的工作区，应用是它们的第一个使用者，而不是它们的主人:

| crate | 负责什么 |
|---|---|
| `mtty-widget` | winit + wgpu 宿主:渲染循环，以及在同一帧里合成的 egui 界面 |
| `mtty-render` | wgpu + glyphon 字形网格，四边形与图像管线 |
| `mtty-core` | PTY、VT 解析、网格与回滚、选择、搜索、OSC、输入编码 |

`mtty-editor` 是编辑内核，`graphics`、`config`、`mtp` 与 `ui` 与之并列。内核不含任何窗口或
GPU 代码，因此可以嵌入别的程序。

## 其余部分在哪里

内部工程记录留在仓库里，刻意不在这里发布:

- [架构与设计](https://github.com/oxdingzg/mtty/blob/main/docs/ARCHITECTURE.zh-CN.md)
- [性能预算与 CI 门](https://github.com/oxdingzg/mtty/blob/main/docs/PERFORMANCE.zh-CN.md)
- [发布流水线、签名与更新清单](https://github.com/oxdingzg/mtty/blob/main/docs/RELEASE.zh-CN.md)
- [产品需求与路线图](https://github.com/oxdingzg/mtty/blob/main/docs/PRODUCT.zh-CN.md)
- [架构决策记录](https://github.com/oxdingzg/mtty/tree/main/docs/decisions)
