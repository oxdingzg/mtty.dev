#!/usr/bin/env bun
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"

const root = dirname(import.meta.dir)
const index = process.argv.indexOf("--miao")
const source = process.argv[index + 1]
if (index === -1 || !source || source.startsWith("--")) {
  throw new Error(
    "Use --miao <installed miao source checkout>; run bun install --frozen-lockfile --ignore-scripts there first",
  )
}
const check = process.argv.includes("--check")
const temporary = await mkdtemp(join(tmpdir(), "mtty-schemas-"))

try {
  const result = Bun.spawn(
    ["bun", "script/schema.ts", join(temporary, "config.json"), join(temporary, "tui.json")],
    {
      cwd: join(resolve(source), "packages/miao"),
      stdout: "inherit",
      stderr: "inherit",
    },
  )
  if ((await result.exited) !== 0) throw new Error("miao schema generation failed")

  const drifted: string[] = []
  for (const name of ["config.json", "tui.json"]) {
    const target = join(root, "public/miao", name)
    const output = await Bun.file(join(temporary, name)).text()
    const file = Bun.file(target)
    const existing = (await file.exists()) ? await file.text() : ""
    if (existing === output) continue
    if (check) {
      drifted.push(name)
      continue
    }
    await Bun.write(target, output)
    console.log(`wrote public/miao/${name}`)
  }
  if (drifted.length)
    throw new Error(`Schema drift: ${drifted.join(", ")}; run sync:schemas with the same checkout`)
  if (check) console.log("Configuration schemas match the miao source")
} finally {
  await rm(temporary, { recursive: true, force: true })
}
