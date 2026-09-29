import { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

function SelectExample() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger aria-label="Project status">
          <SelectValue placeholder="Choose a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
        </SelectContent>
      </Select>
      <output>{value ?? "none"}</output>
    </>
  )
}

describe("Select", () => {
  it("opens and selects an item from the keyboard", async () => {
    const user = userEvent.setup()
    render(<SelectExample />)

    await user.tab()
    await user.keyboard("{Enter}")
    expect(await screen.findByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{ArrowDown}{Enter}")

    expect(
      screen.getByText("paused", { selector: "output" })
    ).toBeInTheDocument()
  })

  it("uses the filled 32px trigger without opacity or control shadows", () => {
    render(<SelectExample />)

    const trigger = screen.getByRole("combobox", { name: "Project status" })
    expect(trigger).toHaveClass(
      "h-control",
      "rounded-md",
      "bg-input/50",
      "hover:bg-input/80",
      "focus-visible:outline-2"
    )
    expect(trigger.className).not.toMatch(/opacity-|shadow-/)
    expect(trigger.querySelector("svg")).toHaveAttribute("stroke-width", "1.75")
  })
})

describe("Select value label", () => {
  it("shows the item label in the trigger when the items map is given", () => {
    render(
      <Select
        defaultValue="paused"
        items={[
          { value: "active", label: "Ativo" },
          { value: "paused", label: "Pausado" },
        ]}
      >
        <SelectTrigger aria-label="Status do projeto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="paused">Pausado</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole("combobox", { name: "Status do projeto" })).toHaveTextContent("Pausado")
    expect(screen.getByRole("combobox", { name: "Status do projeto" })).not.toHaveTextContent("paused")
  })
})
