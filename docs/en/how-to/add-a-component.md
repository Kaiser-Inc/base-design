# Add a component to the registry

[Português](../../pt-BR/how-to/add-a-component.md)

Use this guide to bring a new component into the `@kaiserinc` registry, for example a Tooltip. The path is always the same: start from the shadcn `base-rhea` version, adapt it to the KaiserInc Base rules test-first, register it and show it.

## 1. Pull the upstream component

From the repository root, on a feature branch:

```bash
pnpm dlx shadcn@latest add tooltip
```

Commit the file as it came, before changing anything, so the adaptation shows up as its own diff:

```bash
git add components/ui/tooltip.tsx && git commit -m "chore: add upstream shadcn tooltip"
```

## 2. Write the test first

Create `components/ui/tooltip.test.tsx`. Cover behavior and the rules that a class name can prove:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

describe("Tooltip", () => {
  it("uses the overlay surface without a fill in the accent color", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipContent>Detalhe</TooltipContent>
      </Tooltip>
    )
    const content = screen.getByText("Detalhe")
    expect(content.className).toMatch(/bg-popover/)
    expect(content.className).not.toMatch(/bg-primary|opacity-50/)
  })
})
```

Run `pnpm test` and watch it fail for the right reason.

## 3. Adapt the component

Apply the translation table of the design system. The most common changes:

| Upstream (Rhea) | KaiserInc Base |
|---|---|
| `h-8` on a control | `h-control` (32px) |
| `h-7` | `h-control-sm` (28px), only inside tables |
| `rounded-2xl`, `rounded-xl`, `rounded-4xl` on a control | `rounded-md` (6px) |
| popover, menu or dialog radius | `rounded-lg` (8px) |
| `outline-none` and `focus-visible:ring-3 ring-ring/30` | `outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring` |
| `disabled:opacity-50` | `disabled:bg-muted disabled:text-subtle-foreground` |
| `shadow-*` on controls or cards | none; overlays use `shadow-[var(--shadow-overlay)]` and `dark:border dark:border-border` |
| `bg-black/*`, `backdrop-blur*` | not allowed |
| `transition-all duration-200` | `transition-colors duration-[120ms] ease-out` |

Default strings are Brazilian Portuguese and must be props. Icons are Lucide with `strokeWidth={1.75}`.

Run `pnpm test` until it passes, then `pnpm typecheck`.

## 4. Register it

Add the item to `registry.json`, next to the others:

```json
{
  "name": "tooltip",
  "type": "registry:ui",
  "title": "Tooltip",
  "description": "Short hint on hover and focus, on the popover surface.",
  "dependencies": ["cn", "@base-ui/react"],
  "registryDependencies": ["@kaiserinc/base"],
  "files": [{ "path": "components/ui/tooltip.tsx", "type": "registry:ui" }]
}
```

List every npm package the file imports in `dependencies`, and every other `@kaiserinc` item it imports in `registryDependencies`. Then check the build:

```bash
pnpm registry:build
```

## 5. Show it

Add a `Showcase` section to the right page in `components/site/demos/`, with one `ShowcaseRow` per state and a `code` snippet, then add the section to the `sections` list of that page in `app/<group>/page.tsx` so it appears in the index.

```tsx
<Showcase id="tooltip" title="Tooltip" registryName="tooltip" code={`<Tooltip>…</Tooltip>`}>
  <ShowcaseRow label="Padrão">…</ShowcaseRow>
</Showcase>
```

## 6. Check it and open the PR

- Screenshots at 390px and 1440px, dark first, then light.
- Tab to the component: the focus ring shows.
- `pnpm test`, `pnpm typecheck` and `pnpm build` pass.

Commit with a Conventional Commits message (`feat(tooltip): adapt tooltip to KaiserInc Base`) and open a PR against `main`.
