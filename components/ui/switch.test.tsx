import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Switch } from "./switch"

describe("Switch", () => {
  it("toggles by click and Space while exposing its checked state", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Email notifications" />)

    const toggle = screen.getByRole("switch", { name: "Email notifications" })
    expect(toggle).toHaveAttribute("aria-checked", "false")

    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-checked", "true")
    expect(toggle).toHaveAttribute("data-checked")

    await user.keyboard(" ")
    expect(toggle).toHaveAttribute("aria-checked", "false")
  })

  it("uses token colors and a flat background thumb", () => {
    render(<Switch aria-label="Email notifications" />)

    const toggle = screen.getByRole("switch")
    expect(toggle).toHaveClass(
      "rounded-full",
      "data-unchecked:bg-input",
      "data-checked:bg-primary",
      "focus-visible:outline-2"
    )
    expect(toggle.className).not.toMatch(/opacity-|shadow-/)

    const thumb = toggle.querySelector('[data-slot="switch-thumb"]')
    expect(thumb).toHaveClass("rounded-full", "bg-background")
    expect(thumb?.className).not.toMatch(/shadow-/)
  })
})
