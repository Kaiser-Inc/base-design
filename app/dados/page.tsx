import type { Metadata } from "next"

import { DataDemos } from "@/components/site/demos/dados"
import { ShowcaseIndex } from "@/components/site/showcase"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = { title: "Dados e layout" }

const sections = [
  { id: "table", title: "Table" },
  { id: "badge", title: "Badge" },
  { id: "tabs", title: "Tabs" },
  { id: "page-header", title: "PageHeader" },
]

export default function Page() {
  return (
    <>
      <PageHeader title="Dados e layout" description="Table, Badge, Tabs e PageHeader." />
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-col gap-12">
          <DataDemos />
        </div>
        <aside className="hidden lg:sticky lg:top-8 lg:block">
          <ShowcaseIndex items={sections} />
        </aside>
      </div>
    </>
  )
}
