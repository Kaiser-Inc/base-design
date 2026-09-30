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

describe("registry", () => {
  it("publishes the sheet on top of base and button", () => {
    const sheet = registry.items.find((item) => item.name === "sheet") as
      | { type: string; registryDependencies: string[]; files: { path: string }[] }
      | undefined
    expect(sheet?.type).toBe("registry:ui")
    expect(sheet?.registryDependencies).toEqual(["@kaiserinc/base", "@kaiserinc/button"])
    expect(sheet?.files[0].path).toBe("components/ui/sheet.tsx")
  })
})

const reducedMotion = {
  "transition-property":
    "opacity, color, background-color, border-color, outline-color, fill, stroke, stroke-dashoffset !important",
  "--tw-enter-scale": "1 !important",
  "--tw-enter-translate-x": "0 !important",
  "--tw-enter-translate-y": "0 !important",
  "--tw-exit-scale": "1 !important",
  "--tw-exit-translate-x": "0 !important",
  "--tw-exit-translate-y": "0 !important",
}

describe("reduced motion", () => {
  it("drops movement but keeps fades, in globals.css and the base theme", () => {
    expect(css).not.toContain("transition-duration: 1ms")
    for (const [property, value] of Object.entries(reducedMotion)) {
      expect(css).toContain(`${property}: ${value};`)
    }
    const rule = base.css?.["@media (prefers-reduced-motion: reduce)"] as Record<string, Record<string, string>>
    expect(rule["*, *::before, *::after"]).toEqual(reducedMotion)
  })
})
