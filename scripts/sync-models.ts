#!/usr/bin/env bun
/// <reference types="bun" />
//
// Builds the model catalog miao fetches at runtime and writes it to
// public/models/api.json. The output is generated, not committed (see
// .gitignore): the deploy workflow runs this before `astro build`, so the
// catalog is always fresh and a models.dev change is never a large diff in
// this repository.
//
//   bun run sync:models
//
// The catalog is the public models.dev catalog with miao's own entries merged
// on top, so a provider miao supports but models.dev does not list (currently
// Command Code) still resolves. miao also ships this merge as a fallback, so
// this file only needs to be current, not exhaustively hand-maintained.

import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"

const ROOT = dirname(import.meta.dir)
const OUTPUT = join(ROOT, "public", "models", "api.json")
const SOURCES = ["https://models.dev/api.json"]

type Provider = Record<string, unknown>
type Catalog = Record<string, Provider>

/** Merge these over the fetched catalog, letting these provider fields win. */
const OVERLAY: Catalog = {
  commandcode: {
    id: "commandcode",
    name: "Command Code",
    env: ["CMD_API_KEY", "COMMAND_CODE_API_KEY"],
    api: "https://api.commandcode.ai",
    models: {},
  },
}

async function loadCatalog(): Promise<Catalog> {
  let failure: string | undefined
  for (const source of SOURCES) {
    try {
      const response = await fetch(source)
      if (!response.ok) {
        failure = `${source} answered ${response.status}`
        continue
      }
      return (await response.json()) as Catalog
    } catch (error) {
      failure = `${source} failed: ${error instanceof Error ? error.message : String(error)}`
    }
  }
  throw new Error(`No catalog source available (${failure})`)
}

function merge(catalog: Catalog): Catalog {
  const result: Catalog = { ...catalog }
  for (const [id, provider] of Object.entries(OVERLAY)) {
    const existing = result[id] as { models?: Record<string, unknown> } | undefined
    result[id] = {
      ...existing,
      ...provider,
      models: { ...existing?.models, ...(provider.models as Record<string, unknown> | undefined) },
    }
  }
  // Stable key order, so a re-sync produces a stable file.
  return Object.fromEntries(Object.keys(result).sort().map((id) => [id, result[id]!]))
}

const serialized = `${JSON.stringify(merge(await loadCatalog()), null, 1)}\n`

await mkdir(dirname(OUTPUT), { recursive: true })
await Bun.write(OUTPUT, serialized)
console.log(`Wrote ${OUTPUT} (${serialized.length} bytes)`)
