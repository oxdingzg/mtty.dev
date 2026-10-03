#!/usr/bin/env bun
/// <reference types="bun" />
//
// Copies the published documentation from the product repositories into
// src/content/docs/. The output is committed, so the site builds without
// network access; re-run this after a product repository changes.
//
//   bun run sync:docs           write
//   bun run sync:docs --check   report drift, exit non-zero
//
// Five transformations are load-bearing. Dropping any one produces a page that
// renders wrong rather than a page that fails to build:
//
//   1. the H1 becomes frontmatter `title` and is removed from the body, or
//      Starlight renders the heading twice
//   2. the language cross-link line is removed — Starlight's own language
//      switcher replaces it and the link would be dead
//   3. relative links are rewritten: to a site route when the target is also
//      published here, to GitHub otherwise, so nothing 404s
//   4. GitHub `> [!NOTE]` alerts become Starlight `:::note` directives
//   5. a provenance line naming the source commit is appended

import { mkdir } from "node:fs/promises"
import { dirname, join, posix } from "node:path"
import { LOCALES, pages, routeFor, type DocPage, type Locale } from "./docs-sources"

const ROOT = dirname(import.meta.dir)
const RAW = "https://raw.githubusercontent.com"
const GITHUB = "https://github.com"
const REF = "main"

const check = process.argv.includes("--check")

const shas = new Map<string, string>()

async function shaFor(repo: string) {
  const cached = shas.get(repo)
  if (cached) return cached

  const response = await fetch(`https://api.github.com/repos/${repo}/commits/${REF}`)
  if (!response.ok) throw new Error(`${repo}: cannot resolve ${REF} (${response.status})`)

  const sha = ((await response.json()) as { sha: string }).sha
  shas.set(repo, sha)
  return sha
}

function outputPath(page: DocPage, locale: Locale) {
  const root = locale === "en" ? "src/content/docs/docs" : `src/content/docs/${locale}/docs`
  return join(ROOT, root, `${page.to}.md`)
}

export function transform(raw: string, page: DocPage, locale: Locale, sha: string) {
  const from = page.sources[locale]
  const lines = raw.split("\n")

  const heading = lines.findIndex((line) => line.startsWith("# "))
  if (heading === -1) throw new Error(`${page.repo}/${from}: no H1 to use as the title`)
  const title = lines[heading].slice(2).trim()

  const body = lines
    .filter((_, index) => index !== heading)
    .filter((line) => !isLanguageLink(line))
    .join("\n")

  const frontmatter = [
    "---",
    // Quoted, because titles in these documents contain colons.
    `title: ${JSON.stringify(title)}`,
    "sidebar:",
    `  order: ${page.order}`,
    "---",
  ].join("\n")

  const provenance = `*Synced from [\`${page.repo}@${sha.slice(0, 7)}\`](${GITHUB}/${page.repo}/blob/${sha}/${from}).*`

  const rewritten = rewriteLinks(body, page, locale, sha)

  return `${frontmatter}\n\n${convertAlerts(rewritten).trim()}\n\n---\n\n${provenance}\n`
}

// The line that cross-links the two language editions, in each spelling the
// repositories use:
//   <p align="center"><a href="guide.en.md">English</a> | <a href="guide.zh.md">简体中文</a></p>
//   **Language:** [English](release.en.md) | [中文](release.zh.md)
//   **语言 / Language:** [中文](release.zh.md) | [English](release.en.md)
//   [简体中文](INSTALL.zh-CN.md)          <- miao-term: one bare link, no separator
// Starlight's own language switcher replaces it, so the line would be a second,
// dead control. A line qualifies only when every link on it names a language and
// nothing else substantial sits beside them, so "[See the guide](guide.md)"
// stays put.
// Longest first, so 简体中文 is consumed before 中文. The Chinese pages prefix
// the line with both words ("**语言 / Language:**"), so this strips a run of
// them rather than matching the whole string.
const LANGUAGE = /简体中文|繁體中文|中文|语言|english|chinese|language/gi

/** Letters and CJK only, so emphasis markers and separators do not matter. */
function bareWords(text: string) {
  return text.replace(/[^A-Za-z一-鿿]/g, "")
}

/** True when nothing is left once the language words are taken out. */
function onlyLanguageWords(text: string) {
  return bareWords(text).replace(LANGUAGE, "") === ""
}

function isLanguageLink(line: string) {
  const links = [
    ...[...line.matchAll(/\[([^\]]*)\]\([^)]*\)/g)].map((match) => match[1]),
    ...[...line.matchAll(/<a[^>]*>([^<]*)<\/a>/g)].map((match) => match[1]),
  ]
  if (links.length === 0) return false
  // Every link must name a language, and nothing else may sit beside them —
  // so "[See the guide](guide.md)" and "[English](a.md) documentation" stay.
  if (!links.every(onlyLanguageWords)) return false

  return onlyLanguageWords(
    line
      .replace(/<a[^>]*>[^<]*<\/a>/g, "") // anchors, text and all
      .replace(/\[[^\]]*\]\([^)]*\)/g, "") // markdown links
      .replace(/<[^>]*>/g, ""), // whatever wrapper tags remain
  )
}

function splitAnchor(target: string) {
  const hash = target.indexOf("#")
  if (hash === -1) return [target, ""]
  return [target.slice(0, hash), target.slice(hash)]
}

function rewriteLinks(body: string, page: DocPage, locale: Locale, sha: string) {
  const sourceDir = posix.dirname(page.sources[locale])

  return body.replace(/\]\(([^)\s]+)\)/g, (match, target: string) => {
    if (/^(https?:|mailto:|#)/.test(target)) return match

    const [path, anchor] = splitAnchor(target)
    if (path === "") return match

    const resolved = posix.normalize(posix.join(sourceDir, path))
    const route = routeFor(page.repo, locale, resolved)
    if (route) return `](${route}${anchor})`

    return `](${GITHUB}/${page.repo}/blob/${sha}/${resolved}${anchor})`
  })
}

const ALERT = /^> \[!(\w+)\]\s*$/

function convertAlerts(body: string) {
  const lines = body.split("\n")
  const out: string[] = []
  let index = 0

  while (index < lines.length) {
    const match = lines[index].match(ALERT)
    if (!match) {
      out.push(lines[index])
      index += 1
      continue
    }

    const quoted: string[] = []
    index += 1
    while (index < lines.length && lines[index].startsWith(">")) {
      quoted.push(lines[index].replace(/^>\s?/, ""))
      index += 1
    }

    out.push(`:::${match[1].toLowerCase()}`, ...quoted, ":::")
  }

  return out.join("\n")
}

const drifted: string[] = []

for (const page of pages) {
  const sha = await shaFor(page.repo)

  for (const locale of LOCALES) {
    const from = page.sources[locale]
    const response = await fetch(`${RAW}/${page.repo}/${sha}/${from}`)
    if (!response.ok) throw new Error(`${page.repo}/${from}: ${response.status}`)

    const output = transform(await response.text(), page, locale, sha)
    const target = outputPath(page, locale)
    const file = Bun.file(target)
    const existing = (await file.exists()) ? await file.text() : ""

    if (existing === output) continue
    if (check) {
      drifted.push(posix.relative(ROOT, target))
      continue
    }

    await mkdir(dirname(target), { recursive: true })
    await Bun.write(target, output)
    console.log(`wrote ${posix.relative(ROOT, target)}`)
  }
}

if (drifted.length > 0) {
  console.error(`Drift: ${drifted.length} file(s) differ from upstream`)
  for (const path of drifted) console.error(`  ${path}`)
  process.exit(1)
}

if (check) console.log("Documentation is in sync with upstream")
