import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("toggles by click and Space while exposing its checked state", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Include archived projects" />)

    const checkbox = screen.getByRole("checkbox", {
      name: "Include archived projects",
    })
    expect(checkbox).toHaveAttribute("aria-checked", "false")

    await user.click(checkbox)
    expect(checkbox).toHaveAttribute("aria-checked", "true")
    expect(checkbox).toHaveAttribute("data-checked")

    await user.keyboard(" ")
    expect(checkbox).toHaveAttribute("aria-checked", "false")
  })

  it("uses a flat 16px square with KaiserInc Base state colors", () => {
    render(<Checkbox aria-label="Include archived projects" defaultChecked />)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveClass(
      "size-4",
      "rounded-sm",
      "border-subtle-foreground",
      "data-checked:bg-primary",
      "data-checked:text-primary-foreground",
      "focus-visible:outline-2"
    )
    expect(checkbox.className).not.toMatch(/opacity-|shadow-/)
    expect(checkbox.querySelector("svg")).toHaveAttribute(
      "stroke-width",
      "1.75"
    )
  })

  it("draws the unchecked box with a border that meets 3:1", () => {
    render(<Checkbox aria-label="Aceito" />)
    const box = screen.getByRole("checkbox", { name: "Aceito" })
    expect(box).toHaveClass("border-subtle-foreground")
    expect(box.className).not.toMatch(/(^|\s)border-strong(\s|$)/)
  })
})
