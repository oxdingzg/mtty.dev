# mtty.dev

Source for **[mtty.dev](https://mtty.dev)**, the site that documents two products:

| Product | What it is | Repository |
| --- | --- | --- |
| **miao** | An open-source AI coding agent for the terminal | [oxdingzg/miao](https://github.com/oxdingzg/miao) |
| **mtty** | An AI-native terminal and editor for local and remote work, written in Rust | [oxdingzg/mtty](https://github.com/oxdingzg/mtty) |

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
| `bun run test` | Verify document transformations, semantic drift detection and shared shortcuts |
| `bun run check:content` | Check source provenance, published schemas and retired marketing claims |
| `bun run sync:docs` | Sync both products' bilingual user guides and marketing shortcuts |
| `bun run sync:docs --check` | Detect body/link drift; ignore unrelated commit-only changes |
| `bun run sync:schemas --miao <checkout>` | Generate config/TUI schemas from an installed miao source checkout |
| `bun run sync:models` | Build `public/models/api.json`, the catalog miao fetches |
| `bun run og` | Re-render the social preview cards in `public/og/` |

## Keeping product content current

`scripts/docs-sources.ts` lists the canonical bilingual source files. Provider,
Remote Control, editor and remote-host guides live in the product repositories;
edit those sources first. Synced pages carry immutable source links. A product
commit that does not change a page's body or link destinations leaves that
page and its provenance intact. Use `--refresh-provenance` to deliberately
re-pin unchanged pages to a newer commit.

For a reproducible local refresh, use clean source checkouts at the revisions
you want to publish:

```sh
bun run sync:docs --miao <miao-checkout> --mtty <mtty-checkout>
bun run sync:schemas --miao <miao-checkout>
bun run sync:docs --check --miao <miao-checkout> --mtty <mtty-checkout>
bun run sync:schemas --check --miao <miao-checkout>
bun run test
bun run check:content
```

Install miao's dependencies first with `bun install --frozen-lockfile --ignore-scripts`;
schema generation does not require a native build. The model schema remains
generated from the catalog by `sync:models` at deployment time.

The `product-content-sync` workflow runs daily, manually, or on a
`product-docs-updated` repository dispatch. It checks out both products, updates
guides/shortcuts/schemas, validates the result and opens or updates one pull
request. After merge, the deploy workflow publishes it. An optional
`DOCS_SYNC_TOKEN` lets the generated PR trigger its own workflows; with the
default GitHub token, validation runs in the refresh job itself.

Marketing copy, product overviews and About pages remain authored here. Keep
English and Chinese aligned, describe current user-facing behavior, and put
architecture details after getting started. Describe use cases directly rather
than framing the product against commercial competitors. Check deployed pages
when making claims about CDN behavior; repository source alone does not show
injected scripts.

## Product media

The current screenshots and nine silent demos were captured on 2026-10-04.
See [the media notes](docs/media.md) for provenance, feature coverage and capture
guidelines. `src/data/media.json` records actual dimensions and byte counts.
`ProductMedia.astro` serves responsive WebP stills and viewport-driven MP4s;
native controls allow pausing, and reduced-motion or data-saving preferences
disable automatic playback.
