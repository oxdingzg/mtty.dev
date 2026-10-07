---
title: miao
description: Documentation for miao, an AI coding agent for the terminal.
sidebar:
  order: 0
---

miao is an open-source AI coding agent for the terminal. It explores a
repository, edits code, runs commands and checks its own work, using the models
you choose. It builds on [opencode](https://github.com/anomalyco/opencode) and
puts its work around the model: durable sessions, context efficiency, delegation
and a visible cost per turn.

```sh
curl -fsSL https://mtty.dev/miao/install | bash
```

| | |
|---|---|
| [Why choose miao?](/docs/miao/why-miao/) | Use cases, current features and limits, and development direction |
| [Guide](/docs/miao/guide/) | Install and upgrade, providers, configuration, keybindings, sessions and models, commands and skills, MCP, LSP, the sandbox, cost telemetry, the autonomous loop, FAQ and troubleshooting |
| [Providers and models](/docs/miao/providers/) | Connect providers, choose and price models, custom providers and where the catalog comes from |
| [Remote Control](/docs/miao/remote/) | Connect a window to your Hub, pair a device, manage scoped access and understand its lifecycle |
| [Versioning and release](/docs/miao/release/) | How versions are numbered, built and published, and how to roll back |
| [Agent workflow comparison](/docs/miao/comparison/) | Eight open-source agents: parallel tools, long work, context and recovery, with source evidence |
| [Native component benchmarks](/docs/miao/native-benchmarks/) | Recorded internal timings and native/sandbox scope, separate from product comparisons |
| [Contributing](/docs/miao/contributing/) | Reporting a problem and sending a change |
| [Security](/docs/miao/security/) | How to report a vulnerability |

Source, issues and releases: [oxdingzg/miao](https://github.com/oxdingzg/miao).
miao is MIT licensed, and this site is not affiliated with or endorsed by the
[opencode](https://github.com/anomalyco/opencode) project.
