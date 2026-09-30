import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { FormDemos } from "./formulario"

describe("FormDemos sheet section", () => {
  it.each([
    ["Editar na lateral", "right"],
    ["Editar embaixo", "bottom"],
  ])("%s opens the project form in a %s sheet", async (label, side) => {
    const user = userEvent.setup()
    render(<FormDemos />)
    await user.click(screen.getByRole("button", { name: label }))
    const dialog = await screen.findByRole("dialog", { name: "Editar projeto" })
    expect(dialog).toHaveAttribute("data-side", side)
    expect(within(dialog).getByLabelText("Nome do projeto")).toHaveValue("Levelify")
    expect(within(dialog).getByRole("button", { name: "Salvar" })).toBeInTheDocument()
  })
})
