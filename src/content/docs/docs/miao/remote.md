---
title: "Drive sessions from WeChat or QQ"
sidebar:
  order: 3
---

:::caution[Experimental]
`miao remote` is usable end to end but still experimental. Tencent neither
permits nor forbids third-party WeChat clients; see **Limits and risks**.
:::

`miao remote` runs the miao server on `127.0.0.1` together with your IM
channels, so you can list sessions, start one, send prompts, approve tool calls
and interrupt — from your phone. The same sessions are visible on the desktop
with `miao attach`, so you can start in WeChat and finish in the terminal.

## Log in and run

```sh
miao remote login wechat   # scan the QR code with WeChat
miao remote login qq       # scan with mobile QQ, create a bot, connect it
miao remote                # run in the foreground (debugging)
miao remote install        # write a launchd agent and print how to load it
miao remote status         # channel state, push budget used today, queued results
miao remote uninstall
```

`miao remote` starts even with no account; accounts logged in later go live at
once, and `miao remote login` through a running daemon needs no restart. Open
the same sessions on the desktop with:

```sh
miao attach http://127.0.0.1:4097
```

## The TUI `/remote` dialog

`/remote` in the TUI shows the daemon and every connected account, logs in new
ones (the QR code is drawn in the dialog), sends a test message and
disconnects. The first account can be set up entirely from here, without the
CLI: with no daemon running, pressing enter on a connector logs in on this
machine, then *start daemon (launchd)* or *start once (background)* shows the
exact command and runs it only after you confirm. A running daemon can be
stopped from the same dialog, also after confirming.

## Commands in the IM app

Send `/help` for the list. Text that does not start with `/` goes to the
current session.

| Command | What it does |
|---|---|
| `/list` | Sessions: number, project, title, state, last activity (those waiting on you first) |
| `/use 2` | Make #2 the current session |
| `/new miao fix the README` | Start a session in project `miao`, optionally with a first prompt |
| `/projects` | Projects allowed for remote control, with aliases |
| `#2 message` | Send to #2 without switching the current session |
| `/queue message` | Deliver the input as a queued turn instead of steering the running one |
| `/stop` | Interrupt the current session (`#2 /stop` for a named one) |
| `/r` | Fetch results that were held past the reply window |
| `/status` | Summary of the current session's last turn: tools, changed files, cost |
| `/help` | Commands and help |

Session numbers are short local numbers mapped to real session IDs and kept
across restarts. While a session is running, new messages **steer** it at the
next safe provider-turn boundary (the same default as the TUI); `/queue` waits
until the session would otherwise become idle.

### Approvals and questions

When a remote session asks for permission, the request arrives in the chat with
short reply codes:

```
【#2 miao】requests to run bash:
  rm -rf dist && bun run build
reply y7 allow once · a7 always · n7 reject
```

`y7` / `a7` / `n7` map to *once* / *always* / *reject*; codes are valid only for
that user and expire (default 30 minutes). Question prompts list numbered
options; reply with the number.

## Configuration

```jsonc
{
  "remote": {
    "port": 4097,
    "projects": { "miao": "~/workspace/code/github/miao" },
    "wechat": { "push_budget_per_day": 4 },
    "qq": { "markdown": true },
  },
}
```

| Key | What it does |
|---|---|
| `remote.port` | Port the server listens on at `127.0.0.1` (default 4097) |
| `remote.projects` | Alias → directory; IM users can only list, create and drive sessions inside these |
| `remote.wechat.push_budget_per_day` | Proactive WeChat messages allowed per day (default 4) |
| `remote.qq` | `markdown` (default true), plus optional `api` / `portal` hosts |
| `remote.connectors` | Third-party IM connectors to load (npm package names or local paths) |
| `remote.settings` | Per-connector settings, keyed by connector id |

A third-party connector exports a connector built with `defineConnector` from
`@miao/remote`. Feishu and Telegram are planned.

## Security

- Only the account that scanned the login code is heard; everything else is
  ignored and logged.
- `/new` can only create sessions inside `remote.projects`, so the phone cannot
  drive an arbitrary repository.
- A remotely started prompt never auto-approves a tool; approvals happen in the
  chat, and there is no `--auto`.
- Credentials (the bot token and similar) go to miao's existing credential
  store with `0600`; cursors and routing state live in
  `~/.local/state/miao/remote/`.
- One `miao remote` process may poll a given bot at a time; inbound messages are
  de-duplicated.

## Limits and risks

The WeChat (iLink) channel is constrained by the platform, and miao works
within it:

- A reply must go out within about **two minutes** of your message, and a
  `context_token` allows roughly ten replies. Results that finish later are
  held until you write again or send `/r`.
- Proactive messages (not a reply) are throttled after about **5–6 per day**;
  the default budget is 4 and results beyond it wait in the queue.
- Only one-to-one chat with the person who scanned the code — no groups and no
  buttons.
- Tencent does not clearly allow or forbid third-party clients. There are
  reports of bot downlink being throttled for days to weeks; `miao remote login
  wechat` prints this warning.

QQ replies for a few minutes and then switches to proactive messages, so
results usually arrive on time unless proactive messages are off for the bot.

There is also a **single-writer** constraint: session execution is coordinated
within one process. A session driven from IM must run inside the `miao remote`
server; open it on the desktop with `miao attach`. A session started in a
separate TUI appears in `/list` but cannot be driven in this version. Fencing
across processes is on the roadmap.

## Related

- [The provider layer](/docs/miao/providers/) that these sessions use
- [Security policy](/docs/miao/security/)
- [miao Guide](/docs/miao/guide/) for configuration precedence and sessions
