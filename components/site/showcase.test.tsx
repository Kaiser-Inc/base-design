import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Showcase, ShowcaseIndex } from "./showcase"

describe("Showcase", () => {
  it("labels the demo area as an example and keeps the code collapsed", async () => {
    render(
      <Showcase id="button" title="Button" registryName="button" code={'<Button>Salvar</Button>'}>
        <button>Salvar</button>
      </Showcase>
    )
    expect(screen.getByText("Exemplo")).toBeInTheDocument()
    const summary = screen.getByText("Código")
    const details = summary.closest("details")!
    expect(details).not.toHaveAttribute("open")
    await userEvent.click(summary)
    expect(details).toHaveAttribute("open")
    expect(screen.getByText("<Button>Salvar</Button>")).toBeInTheDocument()
  })

  it("omits the code block when no snippet is given", () => {
    render(
      <Showcase id="x" title="X" registryName="x">
        <span>demo</span>
      </Showcase>
    )
    expect(screen.queryByText("Código")).toBeNull()
  })
})

describe("ShowcaseIndex", () => {
  it("links every section of the page by anchor", () => {
    render(
      <ShowcaseIndex
        items={[
          { id: "button", title: "Button" },
          { id: "field", title: "Field" },
        ]}
      />
    )
    const nav = screen.getByRole("navigation", { name: "Nesta página" })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Button" })).toHaveAttribute("href", "#button")
    expect(screen.getByRole("link", { name: "Field" })).toHaveAttribute("href", "#field")
  })
})
