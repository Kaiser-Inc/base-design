import type { Metadata } from "next"

import { FormDemos } from "@/components/site/demos/formulario"
import { ShowcaseIndex } from "@/components/site/showcase"
import { PageHeader } from "@/components/ui/page-header"

export const metadata: Metadata = { title: "Formulário" }

const sections = [
  { id: "button", title: "Button" },
  { id: "label", title: "Label" },
  { id: "separator", title: "Separator" },
  { id: "field", title: "Field" },
  { id: "input", title: "Input" },
  { id: "textarea", title: "Textarea" },
  { id: "select", title: "Select" },
  { id: "checkbox", title: "Checkbox" },
  { id: "switch", title: "Switch" },
  { id: "sheet", title: "Sheet" },
]

export default function Page() {
  return (
    <>
      <PageHeader title="Formulário" description="Button, Field, Input, Textarea, Select, Checkbox, Switch e Sheet em todos os estados." />
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-col gap-12">
          <FormDemos />
        </div>
        <aside className="hidden lg:sticky lg:top-8 lg:block">
          <ShowcaseIndex items={sections} />
        </aside>
      </div>
    </>
  )
}
