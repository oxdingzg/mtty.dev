---
title: Privacy
description: Where project data is stored and which services handle it.
---

## Project data

mtty stores configuration, saved hosts and workspace state on your machine.
It hosts the agent tools you choose and does not call a model API itself.
SSH and file transfers connect to the hosts you select. Markdown previews may
fetch images referenced by the document; optional encrypted host/snippet sync
writes to your configured sync folder.

miao stores session history locally and sends the context needed for a task to
the model provider you configure. That context can include prompts, code and
tool output. Provider accounts and data handling follow that provider's terms.
Configured MCP servers, plugins and remote tools have their own data flows.

The token and cost figures shown by miao are local estimates, not billing
records. OpenTelemetry export is enabled only with
`OTEL_EXPORTER_OTLP_ENDPOINT`; desktop error reporting depends on a build-time
Sentry DSN. Official releases do not configure that DSN.

## Remote access

Remote Control is optional. You connect a particular miao window to a Hub you
deploy, sign in to that Hub, and approve scoped device access locally. The Hub
stores account and routing metadata and relays encrypted traffic; execution and
session history remain on the machine running miao. See
[Remote Control](/docs/miao/remote/).

mtty's scriptable control plane normally uses an owner-only local socket (a
named pipe on Windows). Its optional TCP listener requires a token. See the
[control-plane documentation](/docs/mtty/cli/) for its configuration.

## This website

mtty.dev serves static pages through Cloudflare, which processes access
requests and site statistics. Documentation search runs in your browser from a
static index. Theme preferences are stored in your browser's `localStorage`.

## Contact

Questions about data handling: <contact@mtty.dev>, or open an issue on
[mtty](https://github.com/oxdingzg/mtty/issues),
[miao](https://github.com/oxdingzg/miao/issues) or
[this website](https://github.com/oxdingzg/mtty.dev/issues).

*Reviewed: 2026-10-07.*
