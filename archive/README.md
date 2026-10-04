# Archive

Design explorations that are kept for reference but are **not** part of the
published site. Nothing in this directory is built, bundled or deployed: Astro
only compiles `src/`, `public/` and `src/content/`, so an archive here is inert.

## `google-style/google-style.patch`

A re-skin of the whole site toward a Google-style palette — a neutral
light ground, black type, and four saturated accents used only in small places.

**Status:** explored, not adopted. `main` still ships the warm palette.

### What the patch changes

| Area | Change |
| --- | --- |
| `src/styles/tokens.css` | New palette: page `#f8fafb`, card `#ffffff`, border `#e3e8ea`, text `#202124`; accents miao blue `#1a73e8`, mtty green `#34a853`, red `#ea4335`, yellow `#fbbc04`. Light becomes the default theme. Radii `8 / 14`. |
| `src/styles/starlight.css` | Docs accent remapped to Google blue. |
| `src/styles/marketing.css` | Selection, status tags and the callout pip moved onto the four accents; ambient glows off in light. |
| `MiaoMark.astro`, `MttyMark.astro`, `public/favicon.svg` | Marks redrawn as flat white glyphs on solid blue / green tiles. |
| `Home.astro`, `Miao.astro`, `Mtty.astro` | Orange gradients and glows removed; agent-state dots mapped to blue / yellow / green / red. |
| `scripts/og.ts` + `public/og/*.png` | Cards regenerated on the new accents (dark ground kept). |

### Restore / inspect

The patch is a full `git diff` with binaries included, so it applies cleanly to
the commit it was cut from.

```sh
# see what it does without touching the tree
git apply --stat archive/google-style/google-style.patch

# apply it to a scratch branch
git checkout -b scratch/google-style
git apply --binary archive/google-style/google-style.patch

# undo
git checkout main && git branch -D scratch/google-style
```

`--binary` is required: the patch embeds six regenerated OG PNGs. Regenerate
them after applying with `bun run og` (needs the Google Chrome channel).
