---
title: mtty
description: Documentation for mtty, an AI-native terminal and editor written in Rust.
sidebar:
  order: 0
---

mtty is an AI-native terminal and editor for local and remote work, written in
Rust. It stands on three pillars: a GPU-rendered terminal with remote operations
(host library, SFTP, port forwarding, jump hosts, snippets), an editor (a
built-in viewer and editor today, a native editor pane in progress), and an
agent workspace that shows what each AI coding agent is doing and queues work
for it. Underneath are UI-free engines: `miao-term-core` owns the path from the
PTY to the screen, and `miao-term-editor` is the editing core.

The application ships as **`mtty`**, alongside the **`mtty-cli`** control client
(both were called `miaotty` up to v0.0.5, and an existing `~/.config/miaotty` is
copied on first start); the source lives in the
[`miao-term`](https://github.com/oxdingzg/miao-term) repository.

:::caution[Pre-release]
The API is not stable yet. macOS is the primary platform; Windows and Linux are
built, tested and checked on real desktops. Apple notarization and Windows MSI
signing are still pending.
:::

## Where to start

| | |
|---|---|
| [Install](/docs/mtty/install/) | Packages for macOS, Linux and Windows, building from source, and the URL schemes it registers |
| [Configuration](/docs/mtty/config/) | `config.toml` — every key, themes, colors, language servers, ACP agents, shell integration |
| [Keyboard shortcuts](/docs/mtty/shortcuts/) | The window, the terminal and the editor pane |
| [The `mtty-cli` control plane](/docs/mtty/cli/) | Drive a running host from a script or another program |
| [View rules](/docs/mtty/view-rules/) | Pane titles, icons and badges, from `views.json` |
| [Troubleshooting](/docs/mtty/troubleshooting/) | Build failures, config paths, shell integration, connecting `mtty-cli` |

## Getting it

Pre-release packages are published on
[GitHub Releases](https://github.com/oxdingzg/miao-term/releases/latest): a zip
containing `mtty.app` for macOS, `.deb`/AppImage/tar for Linux, and MSI/zip for
Windows. Each package has a minisign `.sig` signature, and the public key is
published with the release.

```sh
git clone https://github.com/oxdingzg/miao-term.git
cd miao-term
cargo run --release -p mtty-app
```

[Install](/docs/mtty/install/) has the requirements and the per-platform detail.

## How it is built

The repository is a workspace of engines, with the application as their first
consumer rather than their owner:

| Crate | What it owns |
|---|---|
| `miao-term-widget` | The winit + wgpu host: the render loop, and the egui chrome composited in the same frame |
| `miao-term-render` | The wgpu + glyphon glyph grid, the quad and image pipelines |
| `miao-term-core` | The PTY, VT parsing, the grid and scrollback, selection, search, OSC and input encoding |

`miao-term-editor` is the editing core, and `graphics`, `config`, `mtp` and `ui`
sit alongside. The core carries no windowing or GPU code, so it can be embedded
in something else.

## Where the rest of it lives

The internal engineering records stay in the repository and are deliberately not
published here:

- [Architecture and design](https://github.com/oxdingzg/miao-term/blob/main/docs/ARCHITECTURE.md)
- [Performance budgets and the CI gate](https://github.com/oxdingzg/miao-term/blob/main/docs/PERFORMANCE.md)
- [Release pipeline, signing and the update manifest](https://github.com/oxdingzg/miao-term/blob/main/docs/RELEASE.md)
- [Product requirements and the roadmap](https://github.com/oxdingzg/miao-term/blob/main/docs/PRODUCT.md)
- [Architecture decision records](https://github.com/oxdingzg/miao-term/tree/main/docs/decisions)
