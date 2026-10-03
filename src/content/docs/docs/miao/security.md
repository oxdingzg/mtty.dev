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

### There is no sandbox

miao does **not** sandbox the agent. The permission system is a UX feature: it
helps you stay aware of what the agent is doing, by prompting for confirmation
before it runs a command or writes a file. It is **not** designed to provide
security isolation.

If you need true isolation, run miao inside a Docker container or a VM.

### Server mode

Server mode is opt-in. When you enable it, set `MIAO_SERVER_PASSWORD` to require
HTTP Basic Auth; without it the server runs unauthenticated, with a warning.
Securing the server is the end user's responsibility, and any functionality it
provides is not a vulnerability.

## Out of scope

| Category | Rationale |
|---|---|
| Server access when opted in | If you enable server mode, API access is expected behaviour |
| Sandbox escapes | The permission system is not a sandbox |
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
