"use client"

import { Showcase, ShowcaseRow } from "@/components/site/showcase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projects = [
  {
    name: "Levelify",
    owner: "Ana Lima",
    status: "Ativo",
    updatedAt: "Hoje, 09:42",
  },
  {
    name: "MetriK",
    owner: "Rafael Costa",
    status: "Em revisão",
    updatedAt: "Ontem, 17:10",
  },
  {
    name: "Portfolio",
    owner: "Marina Souza",
    status: "Pausado",
    updatedAt: "27 set., 14:25",
  },
  {
    name: "Ness",
    owner: "Caio Martins",
    status: "Atenção",
    updatedAt: "25 set., 11:08",
  },
] as const

function ProjectStatus({
  status,
}: {
  status: (typeof projects)[number]["status"]
}) {
  const variant =
    status === "Ativo"
      ? "success"
      : status === "Em revisão"
        ? "primary"
        : status === "Atenção"
          ? "warning"
          : "neutral"

  return <Badge variant={variant}>{status}</Badge>
}

function ProjectTable() {
  return (
    <>
      <Table className="hidden sm:table">
        <TableCaption>
          Projetos da KaiserInc ordenados pela atualização mais recente.
        </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Projeto</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Atualizado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.name}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>
                <ProjectStatus status={project.status} />
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {project.updatedAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full border-t border-border sm:hidden">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex min-h-11 items-center justify-between gap-3 border-b border-border py-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{project.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {project.owner} · {project.updatedAt}
              </p>
            </div>
            <ProjectStatus status={project.status} />
          </div>
        ))}
      </div>
    </>
  )
}

function DataDemos() {
  return (
    <>
      <Showcase
        id="table"
        title="Table"
        description="Organiza dados comparáveis em largura total e vira uma lista legível no mobile."
        registryName="table"
      >
        <ShowcaseRow label="Projetos">
          <ProjectTable />
        </ShowcaseRow>
        <ShowcaseRow label="Carregando">
          <Table aria-busy="true" aria-label="Carregando projetos">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Projeto</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 2].map((row) => (
                <TableRow key={row}>
                  <TableCell>
                    <Skeleton className="h-3.5 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3.5 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-sm" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ShowcaseRow>
        <ShowcaseRow label="Vazio">
          <Table>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-auto px-0">
                  <Empty>
                    <EmptyHeader>
                      <EmptyTitle>Nenhum projeto encontrado</EmptyTitle>
                      <EmptyDescription>
                        Ajuste os filtros ou crie o primeiro projeto da equipe.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button>Criar projeto</Button>
                    </EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Table>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-destructive">
                        Não foi possível carregar os projetos.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Verifique a conexão e tente novamente.
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Tentar de novo
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="badge"
        title="Badge"
        description="Mostra status com cor no texto e na borda, sem fundo saturado."
        registryName="badge"
      >
        <ShowcaseRow label="Variantes">
          <Badge variant="neutral">Pausado</Badge>
          <Badge variant="primary">Em revisão</Badge>
          <Badge variant="success">Ativo</Badge>
          <Badge variant="warning">Atenção</Badge>
          <Badge variant="destructive">Falhou</Badge>
        </ShowcaseRow>
        <ShowcaseRow label="Alias padrão">
          <Badge>Sem status</Badge>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="tabs"
        title="Tabs"
        description="Alterna seções relacionadas com setas, sem pills ou fundo na aba ativa."
        registryName="tabs"
      >
        <ShowcaseRow label="Padrão e desabilitado">
          <Tabs defaultValue="overview" className="w-full max-w-[720px]">
            <TabsList aria-label="Seções do projeto">
              <TabsTrigger value="overview">Visão geral</TabsTrigger>
              <TabsTrigger value="activity">Atividade</TabsTrigger>
              <TabsTrigger value="settings" disabled>
                Configurações
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="pt-3 text-muted-foreground"
            >
              O Levelify teve 18 entregas concluídas neste mês.
            </TabsContent>
            <TabsContent
              value="activity"
              className="pt-3 text-muted-foreground"
            >
              A última atualização foi publicada hoje às 09:42.
            </TabsContent>
            <TabsContent
              value="settings"
              className="pt-3 text-muted-foreground"
            >
              Configurações indisponíveis.
            </TabsContent>
          </Tabs>
        </ShowcaseRow>
        <ShowcaseRow label="Foco">
          <Tabs defaultValue="members" className="w-full max-w-[720px]">
            <TabsList aria-label="Equipe do projeto">
              <TabsTrigger
                value="members"
                className="outline-2 outline-offset-2 outline-ring"
              >
                Membros
              </TabsTrigger>
              <TabsTrigger value="guests">Convidados</TabsTrigger>
            </TabsList>
            <TabsContent value="members" className="pt-3 text-muted-foreground">
              12 membros ativos.
            </TabsContent>
            <TabsContent value="guests" className="pt-3 text-muted-foreground">
              2 convidados.
            </TabsContent>
          </Tabs>
        </ShowcaseRow>
      </Showcase>
    </>
  )
}

export { DataDemos }
