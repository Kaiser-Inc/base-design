import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { Select, SelectTrigger, SelectValue } from "./select"
import { Switch } from "./switch"
import { Tabs, TabsList, TabsTrigger } from "./tabs"
import { Textarea } from "./textarea"

// In Tailwind v4 `outline-none`/`outline-hidden` set --tw-outline-style: none,
// and `focus-visible:outline-2` inherits it, so the ring never paints. Controls
// keep a solid, zero-width, transparent outline at rest and grow it on
// focus-visible, so the ring can transition in.
const controls: [string, React.ReactElement][] = [
  ["Button", <Button key="b">Salvar</Button>],
  ["Input", <Input key="i" aria-label="Nome" />],
  ["Textarea", <Textarea key="t" aria-label="Notas" />],
  ["Checkbox", <Checkbox key="c" aria-label="Aceito" />],
  ["Switch", <Switch key="s" aria-label="Ativo" />],
  ["Badge", <Badge key="g">Ativo</Badge>],
  [
    "SelectTrigger",
    <Select key="se">
      <SelectTrigger aria-label="Status">
        <SelectValue />
      </SelectTrigger>
    </Select>,
  ],
  [
    "TabsTrigger",
    <Tabs key="ta" defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
      </TabsList>
    </Tabs>,
  ],
]

describe("focus ring", () => {
  it.each(controls)("%s grows a paintable focus-visible outline", (_, element) => {
    const { container } = render(element)
    const html = container.innerHTML
    expect(html).not.toMatch(/(^|[\s"])outline-(none|hidden)([\s"]|$)/)
    for (const rest of ["outline-0", "outline-solid", "outline-transparent", "outline-offset-0"]) {
      expect(html).toMatch(new RegExp(`(^|[\\s"])${rest}([\\s"]|$)`))
    }
    for (const focus of ["focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-ring"]) {
      expect(html).toContain(focus)
    }
    expect(html).toMatch(/transition-\[[^\]]*outline-width[^\]]*outline-offset[^\]]*\]/)
  })
})
