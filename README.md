# mtty.dev

Source for **[mtty.dev](https://mtty.dev)**, the site that documents two products:

| Product | What it is | Repository |
| --- | --- | --- |
| **miao** | An open-source AI coding agent for the terminal | [oxdingzg/miao](https://github.com/oxdingzg/miao) |
| **mtty** | A fast, embeddable, cross-platform terminal emulator written in Rust | [oxdingzg/mtty](https://github.com/oxdingzg/mtty) |

The two are separate projects; each works without the other. Inside an mtty pane, miao
reports its state (working, waiting, done, error) to mtty, which badges the pane, notifies
when an agent needs you and sends a queued prompt when it goes idle. The home page's
"better together" section and both product pages describe this.

| Route | What |
| --- | --- |
| [`/`](https://mtty.dev/) · [`/zh/`](https://mtty.dev/zh/) | Home: both products |
| [`/miao`](https://mtty.dev/miao) · [`/mtty`](https://mtty.dev/mtty) | Product pages |
| [`/docs/miao`](https://mtty.dev/docs/miao) · [`/docs/mtty`](https://mtty.dev/docs/mtty) | Documentation |
| `/miao/install` | 302 to miao's install script (see `public/_redirects`) |
| `/models/api.json` | The model catalog miao fetches at runtime (generated, see `scripts/sync-models.ts`) |

[oxdingzg/miaotty](https://github.com/oxdingzg/miaotty) was a personal, temporary macOS
prototype of the terminal (a Ghostty fork). It is not documented here; its README points to
mtty.

## Layout

Marketing pages are hand-written Astro. Each page lives once, in both languages, in
`src/components/pages/` (`Home`, `Miao`, `Mtty`), with the English and Chinese copy side
by side; the routes in `src/pages/` and `src/pages/zh/` are one-line wrappers that pick
the language. The documentation is rendered by Starlight from `src/content/docs/`.

Brand tokens and the type stack are in `src/styles/tokens.css`, shared by the marketing
pages, the Starlight theme and the social cards. Fonts are self-hosted through
`@fontsource` (Instrument Serif, Instrument Sans, JetBrains Mono), so no page depends on
a third-party font CDN.

The documentation content lives one level deeper than usual — `src/content/docs/docs/**`
rather than `src/content/docs/**`. Starlight's `base` option is project-wide, so setting
`base: "/docs"` would move `src/pages/index.astro` to `/docs/` as well, and the marketing
home has to own `/`. The nested directory is the approach Starlight documents for
mounting at a subpath: <https://github.com/withastro/starlight/discussions/966>

| Path | Route |
| --- | --- |
| `src/pages/index.astro` | `/` |
| `src/content/docs/docs/**` | `/docs/**` |
| `src/content/docs/zh/docs/**` | `/zh/docs/**` |

## Commands

Run from the repository root:

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun dev` | Dev server at `localhost:4321` |
| `bun run build` | Production build to `./dist/` |
| `bun run preview` | Serve the built output locally |
| `bun run check` | Type-check `.astro` and content files |
| `bun run check:media` | Verify screenshot dimensions, video metadata and media size budgets |
| `bun run sync:docs` | Re-sync the miao documentation from its repository |
| `bun run sync:models` | Build `public/models/api.json`, the catalog miao fetches |
| `bun run og` | Re-render the social preview cards in `public/og/` |

## Product media

The current screenshots and nine silent demos were captured on 2026-10-04.
See [the media notes](docs/media.md) for provenance, feature coverage and capture
guidelines. `src/data/media.json` records actual dimensions and byte counts.
`ProductMedia.astro` serves responsive WebP stills and viewport-driven MP4s;
native controls allow pausing, and reduced-motion or data-saving preferences
disable automatic playback.
