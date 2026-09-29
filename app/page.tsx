import Link from "next/link"

import { PageHeader } from "@/components/ui/page-header"

const groups = [
  {
    href: "/formulario",
    title: "Formulário",
    items: "Button, Field, Input, Textarea, Select, Checkbox, Switch",
  },
  {
    href: "/feedback",
    title: "Feedback",
    items: "ConfirmDialog, Toaster, Skeleton, Spinner, Empty",
  },
  {
    href: "/dados",
    title: "Dados e layout",
    items: "Table, Badge, Tabs, PageHeader",
  },
]

const registryConfig = `{
  "registries": {
    "@kaiserinc": "https://<dominio-da-registry>/r/{name}.json"
  }
}`

export default function Page() {
  return (
    <>
      <PageHeader
        title="KaiserInc Base"
        description="Interface plana, larga e suave. Componentes prontos para copiar para qualquer projeto Next com shadcn."
      />

      <section aria-labelledby="instalar" className="flex flex-col gap-4 border-t border-border pt-8">
        <h2 id="instalar" className="text-xl leading-7 font-semibold">
          Instalar
        </h2>
        <ol className="flex max-w-prose list-decimal flex-col gap-3 pl-5 text-sm">
          <li>
            Adicione a registry no <code className="font-mono text-xs">components.json</code> do projeto:
            <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">{registryConfig}</pre>
          </li>
          <li>
            Instale a base (tokens, Geist e tema dark first):{" "}
            <code className="font-mono text-xs">pnpm dlx shadcn add @kaiserinc/base</code>
          </li>
          <li>
            Instale cada componente pelo nome, por exemplo{" "}
            <code className="font-mono text-xs">pnpm dlx shadcn add @kaiserinc/field</code>.
          </li>
        </ol>
      </section>

      <section aria-labelledby="componentes" className="flex flex-col gap-4 border-t border-border pt-8">
        <h2 id="componentes" className="text-xl leading-7 font-semibold">
          Componentes
        </h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          {groups.map((group) => (
            <li key={group.href} className="flex flex-col gap-1">
              <Link
                href={group.href}
                className="w-fit rounded-sm font-medium text-primary-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {group.title}
              </Link>
              <span className="text-sm text-muted-foreground">{group.items}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
