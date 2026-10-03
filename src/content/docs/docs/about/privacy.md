---
title: Privacy
description: What mtty and miao send, what they never send, and what this website collects.
---

Most privacy pages ask you to take the vendor's word, because there is no
alternative to taking it. These two products are open source, so there is: every
claim on this page is a claim about code you can read, and most of them can be
settled in a minute without reading any of it.

The two products answer differently about the network, so they are set out
separately below.

## In short

- **Neither product contains analytics, telemetry or usage reporting.**
- **mtty makes no request on its own.** Its update check runs only when you ask
  for it.
- **miao checks for updates by default**, one second after its interface starts.
  It can be told not to.
- Apart from those update checks, **neither project sends anything to a server
  this project runs**.
- **This website has no analytics**, loads nothing from a third party, and
  serves its own fonts.

## mtty

### Nothing is reported

There is no telemetry, analytics or crash-reporting code in the repository, and
nothing in it opens a connection on its own. The update check shells out to
`curl`; the one HTTP client in the dependency tree serves the Markdown preview's
remote images, noted below. Everything else is a connection you ask for. That
narrowness is what makes the rest of this section short enough to enumerate —
and, since the whole app is open source, short enough to check.

### The update check

mtty contacts nothing at startup. The check runs from the menu's **Check for
Updates**, and from the retry button in the update dialog after a failure. It is
one request:

```sh
curl -fsSL --max-time 8 <update-check-url>
```

The URL defaults to this project's own release manifest on GitHub, and the only
thing the request reveals is what any download of a file reveals to the host
serving it. A downloaded artifact is checked against the `sha256` the manifest
declares, and against a minisign signature too when `update-pubkey` is set. If
you point `update-check-url` at nothing, nothing is ever fetched. See
[configuration](/docs/mtty/config/).

### Connections you start yourself

Everything else that leaves the machine is a connection you asked for, to a host
you named:

| What | When |
|---|---|
| SSH, SFTP, FTP, port forwarding | When you connect to a host |
| The MTP control plane | A **per-user local socket** with owner-only permissions, or a named pipe on Windows |
| MTP over TCP | Only if you set `remote-listen`, and it **refuses to start without `MTTY_MTP_TOKEN`** |
| Host and snippet sync | Only if you set `sync-dir`; the default is unset |

One exception worth knowing, because it is not obvious: the Markdown preview is
built with remote image support, so **a document you open that references an
image by URL will fetch that image**.

## miao

### Nothing is reported

No analytics or usage-reporting SDK is present. What the interface shows you —
token counts, estimated cost, time to first token, prompt-cache hits — is
computed locally and never uploaded. That is "telemetry" in the product's own
vocabulary, and it means a panel in your terminal, not a transmission.

Two things are wired up but off:

- **OpenTelemetry export** does nothing unless you set
  `OTEL_EXPORTER_OTLP_ENDPOINT` yourself.
- **Error reporting** is compiled in only when a Sentry DSN is supplied at build
  time. The releases published here are built without one, so nothing is
  reported. If that ever changes, this page changes with it.

### The update check runs by default

This is the one thing miao does on its own. One second after the interface
starts, and not blocking it, miao checks whether a newer release exists — and by
default it then installs it in the background; the running process keeps the old
build and offers a restart to apply it. Depending on how you installed miao, the
request goes to `github.com/oxdingzg/miao`, `api.github.com`, the npm registry,
or Homebrew's formula index.

Turn it off in `miao.jsonc`:

```jsonc
{ "autoupdate": false }
```

or with `MIAO_DISABLE_AUTOUPDATE=1`. Preview and development builds never
self-upgrade.

### What else goes out

| What | Default |
|---|---|
| The models.dev catalog (model names, pricing, limits) | Fetched in the background and cached for 12 hours; a snapshot is bundled for offline use |
| Model provider APIs | Only the providers **you** configure |
| The HTTP server and browser interface | Opt-in; `miao serve` |
| Remote chat bridges (WeChat, QQ) | Opt-in, and they talk to those platforms' servers |
| Session sharing | Removed; there is no backend for it |

## What neither collects

Worth stating positively, because it is the part people assume is happening:

- **No accounts.** Neither product asks you to sign in, and neither has a
  server to sign in to.
- **No usage history leaves your machine** — not which features you use, not
  which commands you run, not which files you open.
- **No crash reports**, unless you write one yourself.
- **No advertising, tracking or fingerprinting**, in either product or on this
  site.

## This website

The documentation and marketing pages here are static. There is no analytics
script, no tracking pixel, no advertising or consent code, and no resource
loaded from a third-party origin — the typefaces are served from this domain.
The only outbound links on a page are the ones you can see.

Two things worth checking rather than assuming:

- **No cookies.** The site sets none, not even a preference cookie; the theme
  you pick is stored in your browser's `localStorage` and never sent anywhere.
- **Search runs in your browser.** The documentation index ships with the site
  as static files, so a search query is answered locally and does not leave the
  page.

One thing to be plain about: the site is served through Cloudflare, which sees
what any host or CDN sees — the IP address and user agent of the request.

## Check it yourself

These are the commands behind the claims above. The first two run in a clone of
`miao-term`; the last two need nothing but a terminal.

**Is there anything in mtty that reports on you?**

```sh
cargo tree -e normal --prefix none | awk '{print $1}' | sort -u \
  | grep -iE 'posthog|mixpanel|amplitude|sentry|datadog|telemetry|crashpad'
```

Nothing. **Is there an HTTP client at all?**

```sh
cargo tree -e normal --prefix none | awk '{print $1}' | sort -u \
  | grep -xE 'ureq|reqwest|hyper|isahc|curl|surf|minreq|attohttpc'
```

One line: `ureq`, which the Markdown preview uses for remote images — the
exception noted above, found by this command rather than left out of it. The
update check does not use it; that is a `curl` subprocess, in `check_updates` in
[`crates/term-widget/src/lib.rs`](https://github.com/oxdingzg/miao-term/blob/main/crates/term-widget/src/lib.rs).

**Does this website track you?**

```sh
curl -s https://mtty.dev/ | grep -ciE 'beacon\.min\.js|cloudflareinsights|googletagmanager|gtag\(|plausible|umami'
curl -sI https://mtty.dev/ | grep -ci set-cookie
```

Both print `0`. If you would rather read than run, this site's source is public
as well: [oxdingzg/mtty.dev](https://github.com/oxdingzg/mtty.dev).

**And the check that needs no trust at all.** The application is open source, so
you can build the binary yourself and watch what it opens. Nothing here asks to
be believed: publishing the code is what makes that unnecessary.

## Contact

Questions, or something here that does not match what you observe: write to
<contact@mtty.dev>, or open an issue on
[mtty](https://github.com/oxdingzg/miao-term/issues) or
[miao](https://github.com/oxdingzg/miao/issues).

*Last updated: 2026-10-03. This page describes code, so it changes when that
code does — the review dates for individual claims are in
[the licence and dependency policy](https://github.com/oxdingzg/miao-term/blob/main/docs/decisions/0006-license-policy.md).*
