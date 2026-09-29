"use client"

import { FolderPlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Showcase, ShowcaseRow } from "@/components/site/showcase"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

function FeedbackDemos() {
  return (
    <>
      <Showcase
        id="confirm-dialog"
        title="ConfirmDialog"
        description="Substitui o confirm() do navegador. Confirmar mostra carregando enquanto a ação roda; se ela falhar, o diálogo continua aberto."
        registryName="confirm-dialog"
      >
        <ShowcaseRow label="Destrutivo">
          <ConfirmDialog
            trigger={<Button variant="destructive">Excluir projeto</Button>}
            title="Excluir o projeto Levelify?"
            description="O projeto, as tarefas e o histórico somem para todos os membros. Não dá para desfazer."
            confirmLabel="Excluir"
            variant="destructive"
            onConfirm={async () => {
              await wait(1200)
              toast.success("Projeto excluído")
            }}
          />
        </ShowcaseRow>
        <ShowcaseRow label="Padrão">
          <ConfirmDialog
            trigger={<Button variant="outline">Publicar versão</Button>}
            title="Publicar a versão 1.4 do MetriK?"
            description="A versão fica disponível para todos os usuários agora."
            confirmLabel="Publicar"
            onConfirm={async () => {
              await wait(800)
              toast.success("Versão 1.4 publicada")
            }}
          />
        </ShowcaseRow>
        <ShowcaseRow label="Ação que falha">
          <ConfirmDialog
            trigger={<Button variant="outline">Arquivar projeto</Button>}
            title="Arquivar o projeto Portfolio?"
            description="O projeto sai da lista, mas continua disponível em Arquivados."
            confirmLabel="Arquivar"
            onConfirm={async () => {
              await wait(800)
              toast.error("Não foi possível arquivar", {
                description: "O servidor não respondeu. Tente de novo em instantes.",
              })
              throw new Error("archive failed")
            }}
          />
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="toaster"
        title="Toaster"
        description="Aviso curto sobre o resultado de uma ação. A cor de estado fica só no ícone."
        registryName="sonner"
      >
        <ShowcaseRow label="Tipos">
          <Button variant="outline" onClick={() => toast.success("Projeto salvo")}>
            Sucesso
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Não foi possível salvar", { description: "Verifique a conexão e tente de novo." })
            }
          >
            Erro
          </Button>
          <Button variant="outline" onClick={() => toast.info("Sincronização agendada para 18h")}>
            Informação
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(wait(1500), {
                loading: "Enviando relatório",
                success: "Relatório enviado",
                error: "Falha ao enviar o relatório",
              })
            }
          >
            Promessa
          </Button>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="skeleton"
        title="Skeleton"
        description="Ocupa o lugar do conteúdo enquanto ele carrega, com a mesma forma."
        registryName="skeleton"
      >
        <ShowcaseRow label="Lista carregando">
          <div aria-busy="true" aria-label="Carregando projetos" className="flex w-full max-w-[720px] flex-col gap-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3.5 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="spinner"
        title="Spinner"
        description="Para ações curtas dentro de um controle ou de um trecho da página."
        registryName="spinner"
      >
        <ShowcaseRow label="Tamanhos">
          <Spinner />
          <Spinner className="size-5" />
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner label="Carregando dados" />
            Carregando dados
          </span>
        </ShowcaseRow>
        <ShowcaseRow label="Dentro do botão">
          <Button loading>Salvando</Button>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="empty"
        title="Empty"
        description="Diz o que aconteceu e oferece a próxima ação."
        registryName="empty"
      >
        <Empty className="max-w-[720px] border-t border-border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderPlusIcon strokeWidth={1.75} />
            </EmptyMedia>
            <EmptyTitle>Nenhum projeto ainda</EmptyTitle>
            <EmptyDescription>Crie o primeiro projeto para acompanhar entregas, prazos e responsáveis.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Criar projeto</Button>
          </EmptyContent>
        </Empty>
      </Showcase>
    </>
  )
}

export { FeedbackDemos }
