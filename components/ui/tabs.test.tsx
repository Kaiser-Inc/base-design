import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

function TabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Project overview</TabsContent>
      <TabsContent value="activity">Recent activity</TabsContent>
      <TabsContent value="settings">Project settings</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("moves selection with arrow keys and keeps aria-selected in sync", async () => {
    const user = userEvent.setup()
    render(<TabsExample />)

    const overview = screen.getByRole("tab", { name: "Overview" })
    const activity = screen.getByRole("tab", { name: "Activity" })
    expect(overview).toHaveAttribute("aria-selected", "true")
    expect(activity).toHaveAttribute("aria-selected", "false")

    await user.tab()
    await user.keyboard("{ArrowRight}")

    expect(overview).toHaveAttribute("aria-selected", "false")
    expect(activity).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Recent activity")
  })

  it("uses a border indicator instead of pills or active backgrounds", () => {
    render(<TabsExample />)

    const list = screen.getByRole("tablist")
    const overview = screen.getByRole("tab", { name: "Overview" })
    const settings = screen.getByRole("tab", { name: "Settings" })
    expect(list).toHaveClass("border-b", "border-border", "bg-transparent")
    expect(overview).toHaveClass(
      "h-control",
      "text-muted-foreground",
      "data-active:text-foreground",
      "after:h-0.5",
      "after:bg-primary-text"
    )
    expect(settings).toHaveClass("disabled:text-subtle-foreground")
    expect(overview.className).not.toMatch(
      /rounded-full|rounded-2xl|data-active:bg-/
    )
  })
})
