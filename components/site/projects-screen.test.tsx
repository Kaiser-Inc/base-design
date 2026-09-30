import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { ProjectsScreen } from "./projects-screen"

function rowsNames() {
  const table = screen.getByRole("table")
  return within(table)
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent)
}

describe("ProjectsScreen", () => {
  it("filters the table by the search text", async () => {
    render(<ProjectsScreen />)
    expect(rowsNames()).toContain("Levelify")
    await userEvent.type(screen.getByRole("searchbox", { name: "Buscar projeto" }), "met")
    expect(rowsNames()).toEqual(["MetriK"])
  })

  it("shows an empty state with a way back when nothing matches", async () => {
    render(<ProjectsScreen />)
    await userEvent.type(screen.getByRole("searchbox", { name: "Buscar projeto" }), "zzz")
    expect(screen.getByText("Nenhum projeto encontrado")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Limpar busca" }))
    expect(rowsNames().length).toBeGreaterThan(1)
  })

  it("switches the example between loading, empty and error states", async () => {
    render(<ProjectsScreen />)
    await userEvent.click(screen.getByRole("tab", { name: "Carregando" }))
    expect(screen.getByLabelText("Carregando projetos")).toHaveAttribute("aria-busy", "true")
    await userEvent.click(screen.getByRole("tab", { name: "Erro" }))
    expect(screen.getByRole("button", { name: "Tentar de novo" })).toBeInTheDocument()
    await userEvent.click(screen.getByRole("tab", { name: "Vazio" }))
    expect(screen.getByText("Nenhum projeto ainda")).toBeInTheDocument()
  })
})
