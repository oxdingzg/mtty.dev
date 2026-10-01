#!/usr/bin/env bun
/// <reference types="bun" />
//
// Renders the social preview cards into public/og/. The PNGs are committed, so
// this only needs to run when the copy or the brand changes:
//
//   bun run og
//
// Chromium does the rendering because the cards mix Chinese and English in the
// site's own font stack, and a browser is the only tool here that already knows
// how to lay that out. The palette and the marks are read from the files the
// pages use, so a card cannot drift from the site.

import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { chromium } from "playwright"

const ROOT = dirname(import.meta.dir)
const OUT = join(ROOT, "public/og")

const WIDTH = 1200
const HEIGHT = 630
const MARK = 56

interface Card {
  file: string
  lang: "en" | "zh"
  /** Paints the corner bloom. One screen of the product's own colour. */
  glow: string
  mark: string
  /** Empty on the home cards, which carry the site cat instead. */
  name: string
  headline: string
  /** Second line of the headline, set in italic in the product's colour. */
  accent: string
  /** Colour of the accent line. */
  ink: string
  sub: string
}

// The component templates size the svg from a prop, which does not exist
// outside Astro.
async function markFrom(path: string, size: number) {
  const source = await Bun.file(join(ROOT, path)).text()
  const svg = source.match(/<svg[\s\S]*?<\/svg>/)?.[0]
  if (!svg) throw new Error(`${path}: expected an inline <svg>`)
  return svg.replaceAll("{size}", String(size))
}

const tokens = await Bun.file(join(ROOT, "src/styles/tokens.css")).text()

// The pages load their faces through @fontsource; a card is rendered from a
// string with no bundler, so the same files are inlined as data URLs.
async function face(family: string, file: string, style = "normal", weight = "400") {
  const bytes = await Bun.file(join(ROOT, "node_modules", file)).arrayBuffer()
  const url = `data:font/woff2;base64,${Buffer.from(bytes).toString("base64")}`
  return `@font-face { font-family: "${family}"; font-style: ${style}; font-weight: ${weight}; src: url(${url}) format("woff2"); }`
}

const faces = (
  await Promise.all([
    face("Instrument Serif", "@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2"),
    face("Instrument Serif", "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", "italic"),
    face(
      "Instrument Sans Variable",
      "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
      "normal",
      "400 700",
    ),
    face(
      "JetBrains Mono Variable",
      "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
      "normal",
      "100 800",
    ),
  ])
).join("\n")
const miaoMark = await markFrom("src/components/site/MiaoMark.astro", MARK)
const mttyMark = await markFrom("src/components/site/MttyMark.astro", MARK)
const siteMark = (await Bun.file(join(ROOT, "public/favicon.svg")).text()).replace(
  "<svg ",
  `<svg width="${MARK}" height="${MARK}" `,
)

const cards: Card[] = [
  {
    file: "home-en.png",
    lang: "en",
    glow: "var(--miao-1)",
    mark: siteMark,
    name: "",
    headline: "An agent that does the work.",
    accent: "A terminal that keeps watch.",
    ink: "var(--miao-2)",
    sub: "miao, an open-source AI coding agent. mtty, a terminal written in Rust.",
  },
  {
    file: "home-zh.png",
    lang: "zh",
    glow: "var(--miao-1)",
    mark: siteMark,
    name: "",
    headline: "一个替你干活的代理，",
    accent: "一个替你盯着的终端。",
    ink: "var(--miao-2)",
    sub: "miao，开源 AI 编程代理。mtty，用 Rust 编写、GPU 渲染的终端。",
  },
  {
    file: "miao-en.png",
    lang: "en",
    glow: "var(--miao-1)",
    mark: miaoMark,
    name: "miao",
    headline: "Your models. Your workflow.",
    accent: "Less wasted context.",
    ink: "var(--miao-2)",
    sub: "An open-source AI coding agent that runs in your terminal.",
  },
  {
    file: "miao-zh.png",
    lang: "zh",
    glow: "var(--miao-1)",
    mark: miaoMark,
    name: "miao",
    headline: "模型由你选，工作持续推进，",
    accent: "少浪费上下文。",
    ink: "var(--miao-2)",
    sub: "在终端里运行的开源 AI 编程代理。",
  },
  {
    file: "mtty-en.png",
    lang: "en",
    glow: "var(--mtty-accent)",
    mark: mttyMark,
    name: "mtty",
    headline: "A fast, embeddable terminal,",
    accent: "written in Rust.",
    ink: "var(--mtty-accent)",
    sub: "A terminal emulator and engine, rendered on the GPU.",
  },
  {
    file: "mtty-zh.png",
    lang: "zh",
    glow: "var(--mtty-accent)",
    mark: mttyMark,
    name: "mtty",
    headline: "快速、可嵌入的终端，",
    accent: "用 Rust 编写。",
    ink: "var(--mtty-accent)",
    sub: "GPU 渲染的终端模拟器与引擎。",
  },
]

// Dark only. The pages follow the reader's preference, but a card is rendered
// once and has to look right against both light and dark timelines, and the
// dark ground is what both products look like.
function cardHtml(card: Card) {
  return `<!doctype html>
<html lang="${card.lang}">
<head><meta charset="utf-8"><style>
${faces}
${tokens}

* { box-sizing: border-box; margin: 0; }

body {
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
}

.glow {
  position: absolute;
  left: -240px;
  top: -440px;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: ${card.glow};
  filter: blur(150px);
  opacity: 0.2;
}

.card {
  position: relative;
  height: 100%;
  padding: 78px 84px;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  align-items: center;
  gap: 20px;
}

.name {
  font-family: var(--font-mono);
  font-size: 38px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

/* Eats the gap so the headline sits low and the foot stays pinned. */
.spacer { flex: 1; }

.headline {
  font-family: var(--font-display);
  font-size: ${card.lang === "zh" ? 66 : 80}px;
  font-weight: 400;
  line-height: ${card.lang === "zh" ? 1.2 : 1.02};
  letter-spacing: ${card.lang === "zh" ? "0" : "-0.015em"};
}

.headline em {
  display: block;
  color: ${card.ink};
  font-style: ${card.lang === "zh" ? "normal" : "italic"};
}

.sub {
  margin-top: 22px;
  max-width: 900px;
  color: var(--fg-muted);
  font-size: 26px;
  line-height: 1.45;
}

.foot {
  margin-top: 66px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--fg-faint);
  font-family: var(--font-mono);
  font-size: 22px;
}

.rule {
  width: 44px;
  height: 2px;
  background: var(--border-strong);
}
</style></head>
<body>
  <div class="glow"></div>
  <div class="card">
    <div class="top">${card.mark}${card.name ? `<span class="name">${card.name}</span>` : ""}</div>
    <div class="spacer"></div>
    <h1 class="headline">${card.headline}<em>${card.accent}</em></h1>
    <p class="sub">${card.sub}</p>
    <div class="foot"><span class="rule"></span><span>mtty.dev</span></div>
  </div>
</body></html>`
}

await mkdir(OUT, { recursive: true })

// The installed Chrome rather than a bundled Chromium: the cards are rendered
// once and committed, so there is no reason to pull a second browser down for
// it. Drop the channel and run `bunx playwright install chromium-headless-shell`
// if this ever has to run somewhere Chrome is absent.
const browser = await chromium.launch({ channel: "chrome" })
const tab = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })

for (const card of cards) {
  await tab.setContent(cardHtml(card), { waitUntil: "load" })
  // Without this the screenshot can land before the CJK fallback resolves and
  // the Chinese cards come out in a substitute face.
  await tab.evaluate(() => document.fonts.ready)
  await tab.screenshot({ path: join(OUT, card.file) })
  console.log(`wrote public/og/${card.file}`)
}

await browser.close()
