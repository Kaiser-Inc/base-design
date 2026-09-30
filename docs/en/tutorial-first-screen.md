# Tutorial: your first screen

[Português](../pt-BR/tutorial-first-screen.md)

In this tutorial you build a Projects screen in a brand-new Next.js app: a page title with its main action, a search field, a status filter, a table, an empty state and a delete confirmation. By the end you will have used the registry the way every KaiserInc project uses it.

It takes about 20 minutes. You need Node.js 20+, pnpm, and a clone of this repository.

## 1. Start the registry

The registry is served by this repository. In one terminal:

```bash
cd kaiserInc-base-design
pnpm install
pnpm registry:build
pnpm dev -p 3100
```

Open `http://localhost:3100/r/base.json`. You should see a JSON file: that is one registry item. Leave this terminal running.

## 2. Create the app

In a second terminal, outside this repository:

```bash
pnpm dlx create-next-app@latest projects-demo --ts --tailwind --app --no-src-dir --eslint --use-pnpm --import-alias "@/*" --yes
cd projects-demo
pnpm dlx shadcn@latest init --defaults --yes
```

If `shadcn init` stops with `ERR_PNPM_ADDING_TO_ROOT`, the template created a `pnpm-workspace.yaml` in the project. Run `echo "ignore-workspace-root-check=true" > .npmrc` and run `init` again.

## 3. Connect the registry

Open `components.json` and add the `registries` key:

```json
{
  "registries": {
    "@kaiserinc": "http://localhost:3100/r/{name}.json"
  }
}
```

## 4. Install the base

```bash
pnpm dlx shadcn@latest add @kaiserinc/base
```

Open `app/globals.css`. `--primary` is now `oklch(0.5 0.17 293)`, the KaiserInc violet, and `--background` is no longer pure white. The base also created `components/theme-provider.tsx`.

## 5. Wire the layout

Replace `app/layout.tsx`:

```tsx
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
    >
      <body>
        <ThemeProvider>
          <main className="mx-auto flex max-w-page flex-col gap-8 px-4 py-10 sm:px-6">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

The layout imports the Toaster, which you install in the next step.

## 6. Install the components

```bash
pnpm dlx shadcn@latest add @kaiserinc/page-header @kaiserinc/input @kaiserinc/select @kaiserinc/table @kaiserinc/badge @kaiserinc/empty @kaiserinc/confirm-dialog @kaiserinc/sonner
```

When shadcn asks to overwrite `button.tsx`, answer yes: the one from the default init is not the KaiserInc button.

## 7. Build the screen

Replace `app/page.tsx`:

```tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const statusItems = [
  { value: "all", label: "Todos os status" },
  { value: "active", label: "Ativo" },
  { value: "paused", label: "Pausado" },
]

const initial = [
  { id: "levelify", name: "Levelify", status: "active" },
  { id: "metrik", name: "MetriK", status: "active" },
  { id: "portfolio", name: "Portfolio", status: "paused" },
]

export default function Page() {
  const [projects, setProjects] = useState(initial)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")

  const visible = projects.filter(
    (p) => (status === "all" || p.status === status) && p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <PageHeader title="Projetos" description="Tudo o que o time está construindo." actions={<Button>Criar projeto</Button>} />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="search"
          aria-label="Buscar projeto"
          placeholder="Buscar por nome"
          className="sm:w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select items={statusItems} value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger aria-label="Filtrar por status" className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusItems.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visible.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Nenhum projeto encontrado</EmptyTitle>
            <EmptyDescription>Nada combina com a busca e o status escolhidos.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={() => { setQuery(""); setStatus("all") }}>
              Limpar busca
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projeto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "active" ? "success" : "neutral"}>
                    {p.status === "active" ? "Ativo" : "Pausado"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <ConfirmDialog
                    trigger={<Button size="sm" variant="outline">Excluir</Button>}
                    title={`Excluir o projeto ${p.name}?`}
                    description="Não dá para desfazer."
                    confirmLabel="Excluir"
                    variant="destructive"
                    onConfirm={async () => {
                      await new Promise((r) => setTimeout(r, 600))
                      setProjects((all) => all.filter((x) => x.id !== p.id))
                      toast.success(`${p.name} excluído`)
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
```

## 8. Run it

```bash
pnpm dev
```

Open `http://localhost:3000` and try the screen:

- Type `met` in the search field: only MetriK stays.
- Type `zzz`: the empty state appears; "Limpar busca" brings the list back.
- Pick "Pausado" in the filter: the Select shows the label, not the raw value, because it received `items`.
- Click "Excluir" and confirm: the button shows loading, the row goes away and a toast confirms.
- Press Tab through the page: every control shows the violet focus ring.

## What you did

You connected a project to the `@kaiserinc` registry, installed the base that turns the project into KaiserInc Base, and built a screen where loading, empty and confirmation are part of the layout. From here:

- to bring the system into a project that already has code, read [Install in an existing project](how-to/install-in-existing-project.md);
- to look up every component, read the [Components reference](reference/components.md).
