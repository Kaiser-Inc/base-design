import type { Metadata } from "next"

import { DataDemos } from "@/components/site/demos/dados"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = { title: "Dados e layout" }

export default function Page() {
  return (
    <>
      <PageHeader title="Dados e layout" description="Table, Badge, Tabs e PageHeader." />
      <DataDemos />
    </>
  )
}
