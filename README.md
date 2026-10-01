# mtty.dev

Source for **[mtty.dev](https://mtty.dev)**, the site that documents two products:

| Product | What it is | Repository |
| --- | --- | --- |
| **miao** | An open-source AI coding agent for the terminal | [oxdingzg/miao](https://github.com/oxdingzg/miao) |
| **mtty** | A fast, embeddable, cross-platform terminal emulator written in Rust | [oxdingzg/miao-term](https://github.com/oxdingzg/miao-term) |

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
| `bun run sync:docs` | Re-sync the miao documentation from its repository |
| `bun run og` | Re-render the social preview cards in `public/og/` |
