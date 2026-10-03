# Product screenshots and demos

Refreshed **2026-10-04**. The website uses 18 responsive stills and nine silent
H.264 demos. All full-size assets and 640 px variants together are **2.52 MB**;
legacy GIF URLs add about 0.29 MB but are not embedded in website pages.

## Capture provenance

- **miao terminal and browser:** released v0.1.0, in an isolated example project.
  The example review session was imported through `miao import` and displayed
  through the real terminal and browser UIs. It is illustrative, not a record of
  a paid model run; the session itself and its captions say so.
- **miao mini:** v0.1.1 development checkout, using the application's built-in
  `--mini --demo` mode. This covers task rows, edit diffs, multi-select questions
  and edit permission prompts. The gallery and READMEs label it a development
  preview.
- **mtty:** v0.1.3 development checkout. Build compilation was offloaded; a
  separate capture executable used the application's existing GPU capture path
  to write frames, including the real terminal, native editor and chrome.
  The application source and installed daily binary were not changed for media.
- **Fixtures:** a temporary Git repository, Markdown/Mermaid source, Rust code,
  local HTTP server and example SSH hosts. Agent states and edit proposals were
  driven through the real MTP control plane. No actual host addresses or keys
  appear in the published assets.
- **Details-panel tour:** a timed sequence of seven fresh still captures, not a
  continuous mouse recording. Its captions describe it as a capture sequence.
- **Browser tour:** three screenshots from the real browser interface while
  expanding the diff and opening review. Its captions describe those actions.

## Feature coverage

| Product | Shown |
| --- | --- |
| miao | Start screen; provider selection; model selection within a session; inline edit diff; context telemetry; browser session and file review; mini task progress, questions and permission review |
| mtty | Session sidebar and agent badges; four live states; Markdown/Mermaid preview; editable code and inline proposal acceptance; grouped SSH hosts and forwarding; recursive splits with a running server; command palette; vim and folds; command history; Info, Agent, Git, Files, Ports and prompt Queue |

## Formats and budgets

- Hero stills: maximum **1600 px** wide; other stills: **1280 px**; responsive
  variants: **640 px**. WebP uses lossless encoding after resizing so terminal
  glyphs remain crisp.
- Demos: maximum **1280 px**, **8 fps**, under **20 seconds**, H.264/yuv420p,
  silent, `moov` before `mdat` for progressive playback. Current clips are
  **48–125 KB** each.
- GitHub READMEs: PNG stills and **960 px / 2 fps** short GIFs, encoded with a
  bounded palette. The current GIFs are **76–176 KB** each.
- `bun run check:media` checks actual still dimensions, mobile variants, MP4
  dimensions/durations, progressive layout, poster references and byte counts.
  It enforces 300 KB per still, 250 KB per demo and 3 MB for website media plus
  responsive variants. It also runs before deployment.

`src/data/media.json` is the website's media inventory. Update it with the real
file dimensions and byte counts when replacing captures. All references go
through `ProductMedia.astro`, including the homepage carousel. Videos acquire
sources only when visible, pause offscreen or in a hidden document, and respect
reduced-motion/data-saving preferences. Native controls remain available for
manual playback. Old PNG URLs redirect to their refreshed WebP equivalents.

## Next refresh

1. Use released builds or clearly label development captures. Inspect current
   feature availability before writing captions.
2. Create a disposable project with useful, readable content. Isolate `HOME`,
   `ZDOTDIR`, `XDG_CONFIG_HOME`, `XDG_DATA_HOME` and `XDG_RUNTIME_DIR`; do not load
   personal shell startup files or credentials. Use example host destinations.
3. For mtty stills, use `MTTY_SHOT_AFTER=<seconds>` with the current binary.
   It writes `/tmp/mtty_shot.ppm` and exits. MTP can drive shell commands and
   edit proposals before capture; `MTTY_QA_COMMAND` can open palette actions.
   For the browser, capture with Playwright at a fixed viewport after fonts and
   the target session load.
4. Capture interactions through the real application. For terminal recordings,
   retain the native GPU capture path; do not redraw a marketing mockup of the
   UI. Review every transition for stale frames, dialogs, errors and paths.
5. Crop the enclosing terminal chrome from miao captures, resize once, export
   WebP stills plus 640 px variants, and encode MP4/GIF derivatives within the
   budgets above. Do not enlarge small source frames.
6. Update English and Chinese captions in all three repositories. Run media
   validation, Astro checking and a production build; review desktop/mobile,
   reduced-motion playback, lazy requests and media links before publishing.
