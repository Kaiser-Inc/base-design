import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "./button"

describe("Button", () => {
  it("uses the single control height by default and the dense one for sm", () => {
    render(
      <>
        <Button>Save</Button>
        <Button size="sm">Open</Button>
      </>
    )
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("h-control")
    expect(screen.getByRole("button", { name: "Open" })).toHaveClass("h-control-sm")
  })

  it("blocks clicks and announces progress while loading", async () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>
    )
    const button = screen.getByRole("button", { name: /save/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(screen.getByRole("status")).toBeInTheDocument()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("never fades the disabled state with opacity", () => {
    render(<Button disabled>Save</Button>)
    expect(screen.getByRole("button", { name: "Save" }).className).not.toMatch(/opacity-/)
  })
})
