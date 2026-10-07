import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { pages } from "./docs-sources"
import { parseShortcuts, sameContent, transform } from "./sync-docs"

const page = pages.find((page) => page.to === "mtty/editor")!
const a = "a".repeat(40)
const b = "b".repeat(40)
const raw =
  "# Editor: local and remote\n\n[简体中文](EDITOR.zh-CN.md)\n\n[SSH](REMOTE.md#connecting)\n[Architecture](ARCHITECTURE.md)\n\n> [!NOTE]\n> A save can fail.\n"

describe("product documentation", () => {
  test("converts titles, language links, routes and alerts together", () => {
    const output = transform(raw, page, "en", a)
    expect(output).toContain('title: "Editor: local and remote"')
    expect(output).not.toContain("[简体中文]")
    expect(output).toContain("[SSH](/docs/mtty/remote/#connecting)")
    expect(output).toContain(`/blob/${a}/docs/ARCHITECTURE.md`)
    expect(output).toContain(":::note\nA save can fail.\n:::")
  })

  test("unrelated product commits do not create document drift", () => {
    expect(sameContent(transform(raw, page, "en", a), transform(raw, page, "en", b))).toBe(true)
  })

  test("body edits and changed link targets or anchors still create drift", () => {
    const existing = transform(raw, page, "en", a)
    for (const changed of [
      raw.replace("fail", "succeed"),
      raw.replace("ARCHITECTURE.md", "PRODUCT.md"),
      raw.replace("#connecting", "#file-transfer"),
    ]) {
      expect(sameContent(existing, transform(changed, page, "en", b))).toBe(false)
    }
  })

  test("explicitly pinned source links are content, not generated provenance", () => {
    const pinned = `${raw}\n[Versioned API](https://github.com/oxdingzg/mtty/blob/${"c".repeat(40)}/README.md)`
    const changed = pinned.replace("c".repeat(40), "d".repeat(40))
    expect(sameContent(transform(pinned, page, "en", a), transform(changed, page, "en", b))).toBe(
      false,
    )
  })

  test("marketing shortcuts come from the committed shortcut guide", () => {
    const guide = readFileSync(
      new URL("../src/content/docs/docs/mtty/shortcuts.md", import.meta.url),
      "utf8",
    )
    const shortcuts = JSON.parse(
      readFileSync(new URL("../src/data/mtty-shortcuts.json", import.meta.url), "utf8"),
    )
    expect(parseShortcuts(guide)).toEqual(shortcuts)
    expect(shortcuts.palette.mac).not.toBe(shortcuts.openQuickly.mac)
    expect(shortcuts.composer.mac).toBe("⌘E")
  })
})
