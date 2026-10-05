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
| [Guide](/docs/miao/guide/) | Install and upgrade, providers, configuration, keybindings, sessions and models, commands and skills, MCP, LSP, the sandbox, cost telemetry, the autonomous loop, FAQ and troubleshooting |
| [Providers and models](/docs/miao/providers/) | Connect providers, choose and price models, custom providers and where the catalog comes from |
| [Drive sessions from WeChat or QQ](/docs/miao/remote/) | The experimental `miao remote` bridge: login, in-chat commands, approvals and its limits |
| [Windows unsigned app warnings](/docs/miao/windows-code-signing/) | Windows security prompts you may see when downloading or running miao, what to do, and why they appear |
| [Versioning and release](/docs/miao/release/) | How versions are numbered, built and published, and how to roll back |
| [miao compared with opencode](/docs/miao/miao-vs-opencode/) | Where the fork's work has gone, with measurements and availability |
| [Contributing](/docs/miao/contributing/) | Reporting a problem and sending a change |
| [Security](/docs/miao/security/) | How to report a vulnerability |

Source, issues and releases: [oxdingzg/miao](https://github.com/oxdingzg/miao).
miao is MIT licensed, and this site is not affiliated with or endorsed by the
[opencode](https://github.com/anomalyco/opencode) project.
