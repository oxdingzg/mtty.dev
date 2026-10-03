---
title: Security
description: miao's threat model, what is out of scope, and how to report a vulnerability.
sidebar:
  order: 8
---

The full policy is [`SECURITY.md`](https://github.com/oxdingzg/miao/blob/main/SECURITY.md)
in the repository. This page summarises it.

:::danger[AI-generated reports are not accepted]
We do not accept AI generated security reports. We receive a large number of
these and we absolutely do not have the resources to review them all. If you
submit one that will be an automatic ban from the project.
:::

## Threat model

miao is an AI-powered coding assistant that runs locally on your machine. It
provides an agent system with access to powerful tools, including shell
execution, file operations and web access.

### Sandboxing

**By default, the agent is not sandboxed.** The permission system is a UX
feature: it helps you stay aware of what the agent is doing, by prompting for
confirmation before it runs a command or writes a file. It is **not** designed
to provide security isolation. If you need true isolation, run miao inside a
Docker container or a VM.

**There is also an opt-in kernel sandbox**, which upstream's policy predates.
The V2 `bash` tool can run each command under the operating system's sandbox —
seatbelt on macOS, Landlock on Linux; Windows has no backend. It is off unless
you enable it:

```jsonc
{ "sandbox": { "mode": "workspace-write", "network": true } }
```

Two details belong on a page about security rather than only in the guide:

- **It fails open.** If a sandbox is requested but no backend is available,
  `on_unavailable` defaults to `"warn"` and the command runs **unsandboxed**.
  Set it to `"fail"` if you would rather the command be refused.
- `workspace-write` restricts writes, not reads. Network is allowed unless you
  deny it.

See [kernel-level sandbox](/docs/miao/guide/) in the guide, and the
[availability matrix](/docs/miao/miao-vs-opencode/) for platform limits.

:::caution[The upstream policy lags the code here]
`SECURITY.md` still states that miao has no sandbox. The guide and
[`crates/miao-sandbox`](https://github.com/oxdingzg/miao/tree/main/crates/miao-sandbox)
say otherwise. This page follows the code; the policy file needs updating.
:::

### Server mode

Server mode is opt-in. When you enable it, set `MIAO_SERVER_PASSWORD` to require
HTTP Basic Auth; without it the server runs unauthenticated, with a warning.
Securing the server is the end user's responsibility, and any functionality it
provides is not a vulnerability.

## Out of scope

| Category | Rationale |
|---|---|
| Server access when opted in | If you enable server mode, API access is expected behaviour |
| Sandbox escapes from the permission system | That system is not a sandbox — see [Sandboxing](#sandboxing) above |
| LLM provider data handling | Data sent to your configured provider is governed by their policies |
| MCP server behaviour | External MCP servers you configure are outside our trust boundary |
| Malicious config files | You control your own config; modifying it is not an attack vector |

## Reporting a vulnerability

Use the GitHub Security Advisory
["Report a Vulnerability"](https://github.com/oxdingzg/miao/security/advisories/new)
tab.

The team replies with the next steps. After the first reply they keep you
informed of progress towards a fix and a full announcement, and may ask for
more information.

If you do not receive an acknowledgement within **6 business days**, follow up
on the advisory thread.
