"use client"

import { useState } from "react"
import { FolderPlusIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Status = "active" | "review" | "paused"

type Project = {
  id: string
  name: string
  owner: string
  status: Status
  updatedAt: string
}

const initialProjects: Project[] = [
  { id: "levelify", name: "Levelify", owner: "Ana Lima", status: "active", updatedAt: "Hoje, 09:42" },
  { id: "metrik", name: "MetriK", owner: "Rafael Costa", status: "review", updatedAt: "Ontem, 17:10" },
  { id: "ness", name: "Ness", owner: "Caio Martins", status: "active", updatedAt: "27 set., 14:25" },
  { id: "portfolio", name: "Portfolio", owner: "Marina Souza", status: "paused", updatedAt: "25 set., 11:08" },
]

const statusLabel: Record<Status, string> = { active: "Ativo", review: "Em revisão", paused: "Pausado" }
const statusVariant = { active: "success", review: "primary", paused: "neutral" } as const

const statusItems = [
  { value: "all", label: "Todos os status" },
  { value: "active", label: "Ativo" },
  { value: "review", label: "Em revisão" },
  { value: "paused", label: "Pausado" },
]

type ExampleState = "data" | "loading" | "empty" | "error"

// A real screen built only with @kaiserinc components: the page header, a
// filter bar, the table (a list on mobile) and every state in the layout.
function ProjectsScreen() {
  const [state, setState] = useState<ExampleState>("data")
  const [projects, setProjects] = useState(initialProjects)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<string>("all")

  const visible = projects.filter(
    (p) =>
      (status === "all" || p.status === status) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  function clearFilters() {
    setQuery("")
    setStatus("all")
  }

  function retry() {
    setState("loading")
    setTimeout(() => setState("data"), 900)
  }

  async function remove(project: Project) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    setProjects((current) => current.filter((p) => p.id !== project.id))
    toast.success(`Projeto ${project.name} excluído`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-medium text-subtle-foreground">Estado do exemplo</span>
        <Tabs value={state} onValueChange={(value) => setState(value as ExampleState)}>
          <TabsList aria-label="Estado do exemplo">
            <TabsTrigger value="data">Com dados</TabsTrigger>
            <TabsTrigger value="loading">Carregando</TabsTrigger>
            <TabsTrigger value="empty">Vazio</TabsTrigger>
            <TabsTrigger value="error">Erro</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-6 sm:border-l sm:border-border sm:pl-5">
        <PageHeader
          headingLevel={2}
          title="Projetos"
          description="Tudo o que a KaiserInc está construindo, com responsável e status."
          actions={
            <Button onClick={() => toast.info("No produto, isto abre o formulário de novo projeto.")}>
              <PlusIcon data-icon="inline-start" strokeWidth={1.75} />
              Criar projeto
            </Button>
          }
        />

        {state === "data" && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative sm:w-80">
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.75}
              />
              <Input
                type="search"
                aria-label="Buscar projeto"
                placeholder="Buscar por nome"
                className="pl-9"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Select items={statusItems} value={status} onValueChange={(value) => setStatus(value ?? "all")}>
              <SelectTrigger aria-label="Filtrar por status" className="sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {state === "loading" && (
          <div aria-busy="true" aria-label="Carregando projetos" className="flex flex-col">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex h-11 items-center gap-6 border-b border-border px-3">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="hidden h-3.5 w-28 sm:block" />
                <Skeleton className="ml-auto h-5 w-16" />
              </div>
            ))}
          </div>
        )}

        {state === "empty" && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderPlusIcon strokeWidth={1.75} />
              </EmptyMedia>
              <EmptyTitle>Nenhum projeto ainda</EmptyTitle>
              <EmptyDescription>Crie o primeiro projeto para acompanhar entregas e responsáveis.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => setState("data")}>Criar projeto</Button>
            </EmptyContent>
          </Empty>
        )}

        {state === "error" && (
          <div
            role="alert"
            className="flex flex-col gap-3 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-destructive">Não foi possível carregar os projetos.</span>
              <span className="text-sm text-muted-foreground">Verifique a conexão e tente de novo.</span>
            </div>
            <Button variant="outline" onClick={retry}>
              Tentar de novo
            </Button>
          </div>
        )}

        {state === "data" && visible.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Nenhum projeto encontrado</EmptyTitle>
              <EmptyDescription>Nenhum projeto combina com a busca e o status escolhidos.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={clearFilters}>
                Limpar busca
              </Button>
            </EmptyContent>
          </Empty>
        )}

        {state === "data" && visible.length > 0 && (
          <>
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Atualizado</TableHead>
                    <TableHead className="w-12">
                      <span className="sr-only">Ações</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell className="text-muted-foreground">{project.owner}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[project.status]}>{statusLabel[project.status]}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground tabular-nums">{project.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <DeleteProject project={project} onConfirm={remove} dense />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <ul className="flex flex-col sm:hidden" aria-label="Projetos">
              {visible.map((project) => (
                <li key={project.id} className="flex items-center gap-3 border-b border-border py-3">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">{project.name}</span>
                    <span className="truncate text-sm text-muted-foreground">
                      {project.owner} · {project.updatedAt}
                    </span>
                  </div>
                  <Badge variant={statusVariant[project.status]}>{statusLabel[project.status]}</Badge>
                  <DeleteProject project={project} onConfirm={remove} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

function DeleteProject({
  project,
  onConfirm,
  dense = false,
}: {
  project: Project
  onConfirm: (project: Project) => Promise<void>
  /** 28px only inside the table; the mobile list uses the regular size. */
  dense?: boolean
}) {
  return (
    <ConfirmDialog
      trigger={
        <Button variant="ghost" size={dense ? "icon-sm" : "icon"} aria-label={`Excluir ${project.name}`}>
          <Trash2Icon strokeWidth={1.75} />
        </Button>
      }
      title={`Excluir o projeto ${project.name}?`}
      description="O projeto e o histórico somem para todos os membros. Não dá para desfazer."
      confirmLabel="Excluir"
      variant="destructive"
      onConfirm={() => onConfirm(project)}
    />
  )
}

export { ProjectsScreen }
