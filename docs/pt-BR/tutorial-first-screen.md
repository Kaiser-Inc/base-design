# Tutorial: sua primeira tela

[English](../en/tutorial-first-screen.md)

Neste tutorial você constrói uma tela de Projetos num app Next.js novo: título da página com a ação principal, campo de busca, filtro de status, tabela, estado vazio e confirmação de exclusão. No fim, você terá usado a registry do jeito que todo projeto da KaiserInc usa.

Leva uns 20 minutos. Você precisa de Node.js 20 ou mais, pnpm e um clone deste repositório.

## 1. Suba a registry

A registry é servida por este repositório. Num terminal:

```bash
cd kaiserInc-base-design
pnpm install
pnpm registry:build
pnpm dev -p 3100
```

Abra `http://localhost:3100/r/base.json`. Deve aparecer um arquivo JSON: é um item da registry. Deixe esse terminal rodando.

## 2. Crie o app

Num segundo terminal, fora deste repositório:

```bash
pnpm dlx create-next-app@latest projects-demo --ts --tailwind --app --no-src-dir --eslint --use-pnpm --import-alias "@/*" --yes
cd projects-demo
pnpm dlx shadcn@latest init --defaults --yes
```

Se o `shadcn init` parar com `ERR_PNPM_ADDING_TO_ROOT`, o template criou um `pnpm-workspace.yaml` no projeto. Rode `echo "ignore-workspace-root-check=true" > .npmrc` e rode o `init` de novo.

## 3. Conecte a registry

Abra o `components.json` e acrescente a chave `registries`:

```json
{
  "registries": {
    "@kaiserinc": "http://localhost:3100/r/{name}.json"
  }
}
```

## 4. Instale a base

```bash
pnpm dlx shadcn@latest add @kaiserinc/base
```

Abra o `app/globals.css`. O `--primary` agora é `oklch(0.5 0.17 293)`, o violeta da KaiserInc, e o `--background` deixou de ser branco puro. A base também criou o `components/theme-provider.tsx`.

## 5. Monte o layout

Troque o `app/layout.tsx` por:

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

O layout importa o Toaster, que você instala no próximo passo.

## 6. Instale os componentes

```bash
pnpm dlx shadcn@latest add @kaiserinc/page-header @kaiserinc/input @kaiserinc/select @kaiserinc/table @kaiserinc/badge @kaiserinc/empty @kaiserinc/confirm-dialog @kaiserinc/sonner
```

Quando o shadcn perguntar se pode sobrescrever o `button.tsx`, responda que sim: o que veio do `init` padrão não é o botão da KaiserInc.

## 7. Construa a tela

Troque o `app/page.tsx` por:

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

## 8. Rode

```bash
pnpm dev
```

Abra `http://localhost:3000` e teste a tela:

- Digite `met` na busca: só o MetriK fica.
- Digite `zzz`: aparece o estado vazio, e "Limpar busca" traz a lista de volta.
- Escolha "Pausado" no filtro: o Select mostra o rótulo, e não o valor cru, porque recebeu `items`.
- Clique em "Excluir" e confirme: o botão mostra carregando, a linha some e um toast confirma.
- Percorra a página com Tab: todo controle mostra o anel de foco violeta.

## O que você fez

Você conectou um projeto à registry `@kaiserinc`, instalou a base que transforma o projeto em KaiserInc Base e construiu uma tela em que carregando, vazio e confirmação fazem parte do layout. Daqui:

- para levar o sistema a um projeto que já tem código, leia [Instalar num projeto existente](how-to/install-in-existing-project.md);
- para consultar cada componente, leia a [Referência de componentes](reference/components.md).
