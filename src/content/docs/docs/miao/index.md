---
title: miao
description: Documentation for miao, an AI agent for the terminal.
sidebar:
  order: 0
---

miao is an open-source AI agent for the terminal. It helps you write code, research topics, manage files and automate tasks, using the models you choose. It focuses on the engineering around the model: durable sessions, context efficiency, delegation
and a visible cost per turn.

Run it inside [mtty](https://github.com/oxdingzg/mtty) for per-pane agent status, input notifications and queued prompts.

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

## Origins and license

miao is derived from [opencode](https://github.com/anomalyco/opencode), whose
MIT-licensed code provides a substantial part of the project. Thanks to its
authors and contributors. miao has its own maintenance and releases; the source
relationship does not imply affiliation or endorsement.

See [project origins and licensing](/docs/miao/attribution/) for the preserved
copyright notices and redistribution terms.
