#!/usr/bin/env bun
//
// Copies the published documentation from the product repositories into
// src/content/docs/docs/. The output is committed, so the site builds without
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
import { sources, type DocSource } from "./docs-sources"

const ROOT = dirname(import.meta.dir)
const OUT_ROOT = join(ROOT, "src/content/docs/docs")
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

export function transform(raw: string, source: DocSource, sha: string) {
  const lines = raw.split("\n")

  const heading = lines.findIndex((line) => line.startsWith("# "))
  if (heading === -1) throw new Error(`${source.repo}/${source.from}: no H1 to use as the title`)
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
    `  order: ${source.order}`,
    "---",
  ].join("\n")

  const provenance = `*Synced from [\`${source.repo}@${sha.slice(0, 7)}\`](${GITHUB}/${source.repo}/blob/${sha}/${source.from}).*`

  return `${frontmatter}\n\n${convertAlerts(rewriteLinks(body, source, sha)).trim()}\n\n---\n\n${provenance}\n`
}

// Both spellings occur in these documents:
//   <p align="center"><a href="guide.en.md">English</a> | <a href="guide.zh.md">简体中文</a></p>
//   **Language:** [English](release.en.md) | [中文](release.zh.md)
function isLanguageLink(line: string) {
  if (!line.includes("English") || !line.includes("|")) return false
  return line.includes("中文")
}

function splitAnchor(target: string) {
  const hash = target.indexOf("#")
  if (hash === -1) return [target, ""]
  return [target.slice(0, hash), target.slice(hash)]
}

function rewriteLinks(body: string, source: DocSource, sha: string) {
  const sourceDir = posix.dirname(source.from)

  return body.replace(/\]\(([^)\s]+)\)/g, (match, target: string) => {
    if (/^(https?:|mailto:|#)/.test(target)) return match

    const [path, anchor] = splitAnchor(target)
    if (path === "") return match

    const resolved = posix.normalize(posix.join(sourceDir, path))
    const published = sources.find(
      (candidate) => candidate.repo === source.repo && candidate.from === resolved,
    )
    if (published) return `](/docs/${published.to}/${anchor})`

    return `](${GITHUB}/${source.repo}/blob/${sha}/${resolved}${anchor})`
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

for (const source of sources) {
  const sha = await shaFor(source.repo)
  const response = await fetch(`${RAW}/${source.repo}/${sha}/${source.from}`)
  if (!response.ok) throw new Error(`${source.repo}/${source.from}: ${response.status}`)

  const output = transform(await response.text(), source, sha)
  const target = join(OUT_ROOT, `${source.to}.md`)
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

if (drifted.length > 0) {
  console.error(`Drift: ${drifted.length} file(s) differ from upstream`)
  for (const path of drifted) console.error(`  ${path}`)
  process.exit(1)
}

if (check) console.log("Documentation is in sync with upstream")
