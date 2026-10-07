#!/usr/bin/env bun
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { LOCALES, pages } from "./docs-sources"

const root = join(import.meta.dir, "..")
const errors: string[] = []

async function scan(directory: string) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await scan(path)
      continue
    }
    if (!/\.(md|astro)$/.test(entry.name)) continue
    const text = await Bun.file(path).text()
    if (/\b(?:Termius|PuTTY|Superset)\b/i.test(text))
      errors.push(`${path}: product-comparison name`)
    if (
      /editor pane is on the way|native editor pane in progress|编辑器窗格即将到来|no request on its own|contacts nothing at startup|has no analytics|本站没有分析脚本|每帧零分配|allocates nothing per frame/.test(
        text,
      )
    ) {
      errors.push(`${path}: retired availability or absolute network/performance claim`)
    }
  }
}

await scan(join(root, "src/components/pages"))
await scan(join(root, "src/content/docs"))
for (const page of pages) {
  for (const locale of LOCALES) {
    const directory = locale === "en" ? "docs" : `${locale}/docs`
    const path = join(root, "src/content/docs", directory, `${page.to}.md`)
    const text = await Bun.file(path).text()
    if (!text.includes(`*Synced from [\`${page.repo}@`))
      errors.push(`${path}: missing source provenance`)
  }
}
const schema = await Bun.file(join(root, "public/miao/config.json")).json()
for (const field of ["sandbox", "providers", "loop", "cost", "compaction"]) {
  if (!(field in schema.properties)) errors.push(`config.json: missing ${field}`)
}
if (!(await Bun.file(join(root, "public/miao/tui.json")).exists()))
  errors.push("missing TUI schema")

if (errors.length) {
  for (const error of errors) console.error(error)
  process.exit(1)
}
console.log(
  `Content check passed: ${pages.length * LOCALES.length} synced pages, bilingual marketing and configuration schemas`,
)
