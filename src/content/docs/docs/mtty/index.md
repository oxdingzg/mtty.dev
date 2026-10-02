---
title: mtty
description: Documentation for mtty, an AI-native terminal and editor written in Rust.
---

mtty is an AI-native terminal and editor for local and remote work, written in Rust. It stands on three pillars: a GPU-rendered terminal with remote operations (host library, SFTP, port forwarding, jump hosts, snippets), an editor (a built-in viewer and editor today, a native editor pane in progress), and an agent workspace that shows what each AI coding agent is doing and queues work for it. Underneath are UI-free engines: `miao-term-core` owns the path from the PTY to the screen, and `miao-term-editor` is the editing core. The application ships as **`mtty`**, alongside the **`mtty-cli`** control client (both were called `miaotty` up to v0.0.5, and an existing `~/.config/miaotty` is copied on first start); the source lives in the [`miao-term`](https://github.com/oxdingzg/miao-term) repository.

:::caution[Pre-release]
The API is not stable yet. macOS is the primary platform; Windows and Linux are built, tested and checked on real desktops. Apple notarization and Windows MSI signing are still pending.
:::

## Download

Pre-release packages are published on [GitHub Releases](https://github.com/oxdingzg/miao-term/releases/latest):

| Platform | Packages |
| --- | --- |
| macOS | zip containing `mtty.app`, for Apple silicon and Intel |
| Linux | `.deb`, AppImage and tar, containing `mtty` and `mtty-cli` |
| Windows | MSI and zip, containing `mtty.exe` and `mtty-cli.exe` |

Each package has a minisign `.sig` signature; the public key is published with the release.

## Build from source

Requires the Rust stable toolchain (MSRV 1.80) and a GPU driver supporting Metal, Vulkan or DX12. On Linux, the usual `winit`/`wgpu` X11 or Wayland development packages must be installed.

```sh
git clone https://github.com/oxdingzg/miao-term.git
cd miao-term
cargo run --release -p mtty-app
```

The first build compiles `wgpu` and `glyphon` and may take a few minutes.

## Configuration

mtty reads `~/.config/mtty/config.toml` (or `$XDG_CONFIG_HOME/mtty/config.toml`). Every key is optional. If no mtty config exists, ghostty's `config` and alacritty's `alacritty.toml` are imported automatically.

## More documentation

The rest of the documentation is still in the repository, in English and Simplified Chinese:

- [Architecture and design](https://github.com/oxdingzg/miao-term/blob/main/docs/ARCHITECTURE.md)
- [Installation](https://github.com/oxdingzg/miao-term/blob/main/docs/INSTALL.md)
- [View rules](https://github.com/oxdingzg/miao-term/blob/main/docs/VIEW-RULES.md) — titles, icons and badges per pane
- [Performance budgets and the CI gate](https://github.com/oxdingzg/miao-term/blob/main/docs/PERFORMANCE.md)
- [Example configuration](https://github.com/oxdingzg/miao-term/blob/main/docs/config.example.toml)
- [Architecture decision records](https://github.com/oxdingzg/miao-term/tree/main/docs/decisions)
