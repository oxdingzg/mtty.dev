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
// Command Code) still resolves. Command Code models also carry the plan tiers
// that include them, so miao can hide a model the connected account's plan
// cannot call (the API answers 403 MODEL_NOT_IN_PLAN at request time otherwise).
//
// It also writes public/miao/model-schema.json. The config schema miao
// publishes at https://mtty.dev/miao/config.json $refs a `Model` definition for
// editor autocomplete of the `model` field, and that definition is only the set
// of provider/model IDs, so serving it from here keeps it in step with the
// catalog instead of pointing editors at models.dev.

import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"

const ROOT = dirname(import.meta.dir)
const OUTPUT = join(ROOT, "public", "models", "api.json")
const SCHEMA_OUTPUT = join(ROOT, "public", "miao", "model-schema.json")
const MODELS_DEV = "https://models.dev/api.json"
// The Command Code CLI ships a generated model reference whose `Min plan`
// column says the cheapest plan that serves each model, and every higher plan
// includes it. jsDelivr serves the file straight out of the npm package, so no
// install is needed here.
const COMMANDCODE_MODELS_MD =
  "https://cdn.jsdelivr.net/npm/command-code/dist/bundled/command-code-knowledge/reference/models.md"

type Model = Record<string, unknown>
type Provider = { models?: Record<string, Model> } & Record<string, unknown>
type Catalog = Record<string, Provider>

// Cheapest-first plan tiers. A model's `plans` lists every tier that includes
// it, so a `Min plan` of "GOAT and above" becomes ["goat", "pro", "max"].
const PLAN_TIERS = ["go", "goat", "pro", "max"] as const
type PlanTier = (typeof PLAN_TIERS)[number]

const COMMANDCODE_PROVIDER: Provider = {
  id: "commandcode",
  name: "Command Code",
  env: ["CMD_API_KEY", "COMMAND_CODE_API_KEY"],
  api: "https://api.commandcode.ai",
  models: {},
}

async function loadModelsDev(): Promise<Catalog> {
  const response = await fetch(MODELS_DEV)
  if (!response.ok) throw new Error(`${MODELS_DEV} answered ${response.status}`)
  return (await response.json()) as Catalog
}

/** Parse the Command Code reference table into id → model (with plan tiers). */
function parseCommandCodeModels(markdown: string): Record<string, Model> {
  const models: Record<string, Model> = {}
  for (const line of markdown.split("\n")) {
    // | Id | Name | Context | Efforts | $/1M in/out · cache read | Min plan | Best for |
    const cells = line.split("|").map((cell) => cell.trim())
    if (cells.length < 8) continue
    const id = cells[1]?.match(/^`(.+)`$/)?.[1]
    if (!id) continue
    const minPlan = cells[6]?.toLowerCase().split(/\s+/)[0]
    const tier = PLAN_TIERS.find((tier) => tier === minPlan)
    if (!tier) continue
    const context = parseContext(cells[3] ?? "") ?? 128_000
    models[id] = {
      id,
      name: cells[2] ?? id,
      // The models endpoint miao also reads reports capabilities; keep these
      // conservative so a catalog-only render still looks sane.
      attachment: false,
      reasoning: false,
      temperature: false,
      tool_call: true,
      release_date: "",
      limit: { context, output: 32_768 },
      plans: PLAN_TIERS.slice(PLAN_TIERS.indexOf(tier)),
    }
  }
  return models
}

function parseContext(value: string): number | undefined {
  const match = value.trim().match(/^([\d.]+)\s*([MK])$/i)
  if (!match) return undefined
  const size = Number.parseFloat(match[1]!)
  if (!Number.isFinite(size)) return undefined
  return Math.round(size * (match[2]!.toUpperCase() === "M" ? 1_000_000 : 1_000))
}

async function loadCommandCodeModels(): Promise<Record<string, Model>> {
  try {
    const response = await fetch(COMMANDCODE_MODELS_MD)
    if (!response.ok) {
      console.warn(`Command Code models reference answered ${response.status}`)
      return {}
    }
    const models = parseCommandCodeModels(await response.text())
    console.log(`Parsed ${Object.keys(models).length} Command Code models`)
    return models
  } catch (error) {
    console.warn(`Command Code models reference failed: ${error instanceof Error ? error.message : String(error)}`)
    return {}
  }
}

function merge(catalog: Catalog, commandcode: Record<string, Model>): Catalog {
  const result: Catalog = { ...catalog }
  const overlay: Catalog = {
    commandcode: { ...COMMANDCODE_PROVIDER, models: commandcode },
  }
  for (const [id, provider] of Object.entries(overlay)) {
    const existing = result[id]
    result[id] = {
      ...existing,
      ...provider,
      models: { ...existing?.models, ...(provider.models ?? {}) },
    }
  }
  // Stable key order, so a re-sync produces a stable file.
  return Object.fromEntries(Object.keys(result).sort().map((id) => [id, result[id]!]))
}

const commandcode = await loadCommandCodeModels()
const catalog = merge(await loadModelsDev(), commandcode)

const serialized = `${JSON.stringify(catalog, null, 1)}\n`
await mkdir(dirname(OUTPUT), { recursive: true })
await Bun.write(OUTPUT, serialized)
console.log(`Wrote ${OUTPUT} (${serialized.length} bytes)`)

// The `model` $ref for editors: every provider/model ID in the catalog.
const modelIds = Object.entries(catalog)
  .flatMap(([providerID, provider]) => Object.keys(provider.models ?? {}).map((id) => `${providerID}/${id}`))
  .sort()
const modelSchema = `${JSON.stringify(
  {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://mtty.dev/miao/model-schema.json",
    $defs: { Model: { type: "string", enum: modelIds } },
  },
  null,
  2,
)}\n`
await mkdir(dirname(SCHEMA_OUTPUT), { recursive: true })
await Bun.write(SCHEMA_OUTPUT, modelSchema)
console.log(`Wrote ${SCHEMA_OUTPUT} (${modelIds.length} model ids)`)
