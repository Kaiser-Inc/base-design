import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const css = readFileSync("app/globals.css", "utf8")
const registry = JSON.parse(readFileSync("registry.json", "utf8")) as {
  items: { name: string; cssVars?: { theme?: Record<string, string> }; css?: Record<string, unknown> }[]
}
const base = registry.items.find((item) => item.name === "base")!

const easings = {
  "ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
  "ease-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
  "ease-drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
}

describe("motion tokens", () => {
  it.each(Object.entries(easings))("defines --%s in globals.css and the base theme", (name, value) => {
    expect(css).toContain(`--${name}: ${value};`)
    expect(base.cssVars?.theme?.[name]).toBe(value)
  })
})
