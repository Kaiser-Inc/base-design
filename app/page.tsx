import Link from "next/link"
import { headers } from "next/headers"

import { ProjectsScreen } from "@/components/site/projects-screen"
import { PageHeader } from "@/components/ui/page-header"

const groups = [
  {
    href: "/formulario",
    title: "Formulário",
    items: [
      ["button", "Button"],
      ["label", "Label"],
      ["separator", "Separator"],
      ["field", "Field"],
      ["input", "Input"],
      ["textarea", "Textarea"],
      ["select", "Select"],
      ["checkbox", "Checkbox"],
      ["switch", "Switch"],
    ],
  },
  {
    href: "/feedback",
    title: "Feedback",
    items: [
      ["confirm-dialog", "ConfirmDialog"],
      ["toaster", "Toaster"],
      ["skeleton", "Skeleton"],
      ["spinner", "Spinner"],
      ["empty", "Empty"],
    ],
  },
  {
    href: "/dados",
    title: "Dados e layout",
    items: [
      ["table", "Table"],
      ["badge", "Badge"],
      ["tabs", "Tabs"],
      ["page-header", "PageHeader"],
    ],
  },
]

const linkClass =
  "w-fit rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export default async function Page() {
  // The registry lives on this same deployment, so its URL is this origin.
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  const registryConfig = `{
  "registries": {
    "@kaiserinc": "${proto}://${host}/r/{name}.json"
  }
}`

  return (
    <>
      <PageHeader
        title="KaiserInc Base"
        description="Interface plana, larga e suave. Componentes prontos para copiar para qualquer projeto Next com shadcn."
      />

      <section aria-labelledby="exemplo" className="flex flex-col gap-4 border-t border-border pt-8">
        <div className="flex flex-col gap-1">
          <h2 id="exemplo" className="text-xl leading-7 font-semibold">
            Uma tela real
          </h2>
          <p className="max-w-[60ch] text-sm text-muted-foreground">
            A lista de projetos abaixo usa só componentes da registry. Troque o estado para ver carregando, vazio e erro.
          </p>
        </div>
        <ProjectsScreen />
      </section>

      <section aria-labelledby="instalar" className="flex flex-col gap-4 border-t border-border pt-8">
        <h2 id="instalar" className="text-xl leading-7 font-semibold">
          Instalar
        </h2>
        <ol className="flex max-w-[72ch] list-decimal flex-col gap-3 pl-5 text-sm">
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

      <section aria-labelledby="componentes" className="flex flex-col gap-6 border-t border-border pt-8">
        <h2 id="componentes" className="text-xl leading-7 font-semibold">
          Componentes
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.href} className="flex flex-col gap-3">
              <Link href={group.href} className={`${linkClass} font-medium text-primary-text`}>
                {group.title}
              </Link>
              <ul className="flex flex-col gap-1.5 text-sm">
                {group.items.map(([id, name]) => (
                  <li key={id}>
                    <Link href={`${group.href}#${id}`} className={`${linkClass} text-muted-foreground hover:text-foreground`}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
