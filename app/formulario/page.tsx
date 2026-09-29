import type { Metadata } from "next"

import { FormDemos } from "@/components/site/demos/formulario"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = { title: "Formulário" }

export default function Page() {
  return (
    <>
      <PageHeader title="Formulário" description="Button, Field, Input, Textarea, Select, Checkbox e Switch em todos os estados." />
      <FormDemos />
    </>
  )
}
