---
title: License
description: What each project is licensed under, and the licences of the parts inside them.
---

Both projects here are open source, so there is no separate agreement to accept
and nothing to sign: the licence is the whole story. You can read the source,
build it, change it and redistribute it.

## mtty — Apache License 2.0

The full text is the repository's
[`LICENSE`](https://github.com/oxdingzg/miao-term/blob/main/LICENSE).

Apache-2.0 lets you use, modify and redistribute mtty, including commercially.
In return it asks that you keep the licence and any notices with the software,
state the changes you made, and not use the project's name as an endorsement.

## miao — MIT

miao is MIT licensed. It is a derivative of
[opencode](https://github.com/anomalyco/opencode), also MIT, and its
[`LICENSE`](https://github.com/oxdingzg/miao/blob/main/LICENSE) carries **both**
copyright lines — the miao authors' 2026 and opencode's 2025 — because MIT
requires the upstream notice to travel with every copy.

## What is inside them

Neither project is a single-author work, and the parts carry their own terms.
Four that are easy to miss:

- **The bundled typefaces are not covered by mtty's Apache-2.0 licence.** Each
  keeps its own file and licence: JetBrains Mono (SIL Open Font License 1.1,
  modified — Noto Sans symbols merged in for glyph coverage), Symbols Nerd Font
  (MIT) and a Tabler Icons subset (MIT). The table is in
  [`assets/fonts/README.md`](https://github.com/oxdingzg/miao-term/blob/main/assets/fonts/README.md).
- **Two crates are vendored with local patches**, each keeping its upstream
  licence: `muda` (Apache-2.0 OR MIT) and `egui_commonmark` (MIT OR Apache-2.0).
- **Syntax definitions vendored from [bat](https://github.com/sharkdp/bat)** keep
  an individual licence and source note each; the per-syntax table is
  [`docs/third-party/SYNTAXES.md`](https://github.com/oxdingzg/miao-term/blob/main/docs/third-party/SYNTAXES.md).
- **Everything else is a dependency**, listed in the workspace's `Cargo.toml`
  files, under a licence from an allow-list the project records in
  [ADR 0006](https://github.com/oxdingzg/miao-term/blob/main/docs/decisions/0006-license-policy.md):
  MIT, Apache-2.0, BSD, ISC, Zlib, 0BSD, CC0-1.0, Unicode-3.0 and OFL-1.1.

## This site

The documentation and marketing pages are built with [Astro](https://astro.build)
and [Starlight](https://starlight.astro.build), both MIT, and set in Instrument
Serif, Instrument Sans and JetBrains Mono, all SIL Open Font License 1.1.

The pages under `/docs/` that are synced from a product repository are covered by
that project's licence; each one names the commit it came from at the foot of the
page.
