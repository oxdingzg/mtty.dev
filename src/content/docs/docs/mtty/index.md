---
title: mtty
description: Documentation for mtty, a terminal emulator and engine written in Rust.
---

mtty is a terminal emulator and engine written in Rust: an engine library (`miao-term-core`) that owns the path from the PTY to the screen with no windowing or GPU code, plus a full application built on top of it. The application ships as **`mtty`**, alongside the **`mtty-cli`** control client (both were called `miaotty` up to v0.0.5, and an existing `~/.config/miaotty` is copied on first start); the source lives in the [`miao-term`](https://github.com/oxdingzg/miao-term) repository.

:::caution[Pre-release]
The API is not stable yet. macOS is the primary platform; Windows is built and tested on real hardware; Linux builds and passes tests in CI. Apple notarization and Windows MSI signing are still pending.
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
