---
title: Documentation
description: User documentation for mtty, an AI-native terminal and editor, and miao, an AI coding agent.
---

Two open-source tools, documented here. The pages under each product are synced
from its repository by `bun run sync:docs` and name the commit they came from,
so a page and the code it describes can always be compared.

## mtty — an AI-native terminal and editor

A terminal, an editor and an agent workspace in one native window, written in
Rust. GPU-rendered, held to a performance gate, and aware of what the agent in
each pane is doing.

[Download the preview](https://github.com/oxdingzg/miao-term/releases/latest) ·
macOS · Linux `.deb`/AppImage · Windows MSI · pre-release

| | |
|---|---|
| [Overview](/docs/mtty/) | What it is, what ships today, and what is next |
| [Install](/docs/mtty/install/) | Packages, building from source, and URL schemes |
| [Configuration](/docs/mtty/config/) | `config.toml`: every key, themes, language servers, shell integration |
| [The `mtty-cli` control plane](/docs/mtty/cli/) | Drive a running host from a script or another program |
| [Keyboard shortcuts](/docs/mtty/shortcuts/) | The window, the terminal and the editor pane |
| [View rules](/docs/mtty/view-rules/) | Pane titles, icons and badges from `views.json` |
| [Troubleshooting](/docs/mtty/troubleshooting/) | Build failures, config paths, shell integration, `mtty-cli` |

## miao — an AI coding agent for the terminal

An open-source coding agent that explores a repository, edits code, runs
commands and checks its own work, using the models you choose — with the cost of
every turn in view.

```sh
curl -fsSL https://mtty.dev/miao/install | bash
```

| | |
|---|---|
| [Overview](/docs/miao/) | What it is and how it is put together |
| [Guide](/docs/miao/guide/) | Install, providers, permissions, MCP and LSP, sessions, long tasks, troubleshooting |
| [Versioning and release](/docs/miao/release/) | How versions are numbered, built and published |
| [miao compared with opencode](/docs/miao/miao-vs-opencode/) | Where the fork's work has gone, with measurements and availability |
| [Contributing](/docs/miao/contributing/) | Reporting a problem and sending a change |
| [Security](/docs/miao/security/) | How to report a vulnerability |

## Reporting a problem

Each project takes issues on GitHub:
[mtty](https://github.com/oxdingzg/miao-term/issues) ·
[miao](https://github.com/oxdingzg/miao/issues). For anything else, write to
<dingzg@mtty.dev>.
