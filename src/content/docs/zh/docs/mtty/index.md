---
title: mtty
description: mtty 的文档，它是一个用 Rust 编写的终端模拟器与引擎。
---

mtty 是用 Rust 编写的终端模拟器与引擎：一个负责从 PTY 到屏幕全过程、不含任何窗口或 GPU 代码的引擎库（`miao-term-core`），加上构建其上的完整应用。应用以 **`mtty`** 的名字发布，并附带控制客户端 **`mtty-cli`**（v0.0.5 及之前二者名为 `miaotty`，首次启动会复制已有的 `~/.config/miaotty`）；源码在 [`miao-term`](https://github.com/oxdingzg/miao-term) 仓库。

:::caution[预发布]
API 尚未稳定。macOS 是主要平台；Windows 已在真实硬件上构建并测试；Linux 在 CI 中构建并通过测试。Apple 公证与 Windows MSI 签名尚未完成。
:::

## 下载

预发布安装包发布在 [GitHub Releases](https://github.com/oxdingzg/miao-term/releases/latest)：

| 平台 | 安装包 |
| --- | --- |
| macOS | 内含 `mtty.app` 的 zip，分 Apple 芯片与 Intel 两版 |
| Linux | `.deb`、AppImage 与 tar，内含 `mtty` 和 `mtty-cli` |
| Windows | MSI 与 zip，内含 `mtty.exe` 和 `mtty-cli.exe` |

每个安装包都附有 minisign `.sig` 签名，公钥随版本一同发布。

## 从源码构建

需要 Rust stable 工具链（MSRV 1.80），以及支持 Metal、Vulkan 或 DX12 的 GPU 驱动。Linux 上还需要安装常规的 `winit`/`wgpu` X11 或 Wayland 开发包。

```sh
git clone https://github.com/oxdingzg/miao-term.git
cd miao-term
cargo run --release -p mtty-app
```

首次构建需要编译 `wgpu` 与 `glyphon`，可能要几分钟。

## 配置

mtty 读取 `~/.config/mtty/config.toml`（或 `$XDG_CONFIG_HOME/mtty/config.toml`），所有键都是可选的。如果还没有 mtty 配置，会自动导入 ghostty 的 `config` 和 alacritty 的 `alacritty.toml`。

## 更多文档

其余文档仍在仓库中，提供英文与简体中文版本：

- [架构与设计](https://github.com/oxdingzg/miao-term/blob/main/docs/ARCHITECTURE.zh-CN.md)
- [安装](https://github.com/oxdingzg/miao-term/blob/main/docs/INSTALL.zh-CN.md)
- [View 规则](https://github.com/oxdingzg/miao-term/blob/main/docs/VIEW-RULES.zh-CN.md) —— 按窗格设置标题、图标与徽章
- [性能预算与 CI 门槛](https://github.com/oxdingzg/miao-term/blob/main/docs/PERFORMANCE.zh-CN.md)
- [示例配置](https://github.com/oxdingzg/miao-term/blob/main/docs/config.example.toml)
- [架构决策记录](https://github.com/oxdingzg/miao-term/blob/main/docs/decisions/README.zh-CN.md)
