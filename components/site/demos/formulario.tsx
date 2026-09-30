"use client"

import { PlusIcon } from "lucide-react"

import { Showcase, ShowcaseRow } from "@/components/site/showcase"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Static preview of the focus ring for the "Foco" rows. outline-solid is
// required: the controls use outline-hidden, which zeroes the outline style.
const forcedFocus = "outline-2 outline-solid outline-offset-2 outline-ring"

// Base UI renders the item label in SelectValue only when it gets the items map.
const statusItems = [
  { value: "active", label: "Ativo" },
  { value: "paused", label: "Pausado" },
  { value: "archived", label: "Arquivado" },
]

function FormDemos() {
  return (
    <>
      <Showcase
        id="button"
        title="Button"
        description="Uma ação principal por tela. Todas as variantes têm 32px; a densa, de 28px, fica só dentro de tabela."
        registryName="button"
      >
        <ShowcaseRow label="Variantes">
          <Button>Criar projeto</Button>
          <Button variant="outline">Cancelar</Button>
          <Button variant="secondary">Duplicar</Button>
          <Button variant="ghost">Ver detalhes</Button>
          <Button variant="destructive">Excluir</Button>
          <Button variant="link">Abrir documentação</Button>
        </ShowcaseRow>
        <ShowcaseRow label="Com ícone">
          <Button>
            <PlusIcon data-icon="inline-start" strokeWidth={1.75} />
            Novo projeto
          </Button>
          <Button variant="outline" size="icon" aria-label="Adicionar projeto">
            <PlusIcon strokeWidth={1.75} />
          </Button>
        </ShowcaseRow>
        <ShowcaseRow label="Carregando e desabilitado">
          <Button loading>Salvando</Button>
          <Button variant="destructive" loading>
            Excluindo
          </Button>
          <Button disabled>Publicar</Button>
        </ShowcaseRow>
        <ShowcaseRow label="Denso (só em tabela)">
          <Button size="sm" variant="outline">
            Abrir
          </Button>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="label"
        title="Label"
        description="Identifica o campo com texto curto e visível."
        registryName="label"
      >
        <ShowcaseRow label="Padrão">
          <div className="flex w-full max-w-[720px] flex-col gap-1.5">
            <Label htmlFor="label-project">Nome do projeto</Label>
            <Input id="label-project" placeholder="Ex.: Levelify" />
          </div>
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <div
            className="group flex w-full max-w-[720px] flex-col gap-1.5"
            data-disabled="true"
          >
            <Label htmlFor="label-disabled">E-mail do responsável</Label>
            <Input
              id="label-disabled"
              value="ana@kaiserinc.com"
              disabled
              readOnly
            />
          </div>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="separator"
        title="Separator"
        description="Divide conteúdos relacionados com uma linha discreta."
        registryName="separator"
      >
        <ShowcaseRow label="Horizontal">
          <Separator />
        </ShowcaseRow>
        <ShowcaseRow label="Vertical">
          <div className="flex h-control items-center gap-3 text-sm">
            <span>Levelify</span>
            <Separator orientation="vertical" />
            <span className="text-muted-foreground">Produto ativo</span>
          </div>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="field"
        title="Field"
        description="Agrupa label, controle, ajuda e erro com relações acessíveis."
        registryName="field"
      >
        <ShowcaseRow label="Formulário de projeto">
          <form className="flex w-full max-w-[720px] flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="field-name">Nome do projeto</FieldLabel>
                <Input id="field-name" placeholder="Ex.: MetriK" />
                <FieldDescription>
                  Este nome aparece para toda a equipe.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="field-email">
                  E-mail do responsável
                </FieldLabel>
                <Input
                  id="field-email"
                  type="email"
                  placeholder="nome@kaiserinc.com"
                />
              </Field>
            </FieldGroup>
            <Button className="self-start" type="button">
              Criar projeto
            </Button>
          </form>
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Field data-invalid className="max-w-[720px]">
            <FieldLabel htmlFor="field-invalid">
              E-mail do responsável
            </FieldLabel>
            <Input
              id="field-invalid"
              value="ana@"
              aria-invalid="true"
              aria-describedby="field-invalid-description field-invalid-error"
              readOnly
            />
            <FieldDescription id="field-invalid-description">
              Use um endereço que receba notificações do projeto.
            </FieldDescription>
            <FieldError id="field-invalid-error">
              Informe um e-mail válido.
            </FieldError>
          </Field>
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <Field data-disabled className="max-w-[720px]">
            <FieldLabel htmlFor="field-disabled">Organização</FieldLabel>
            <Input id="field-disabled" value="KaiserInc" disabled readOnly />
          </Field>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="input"
        title="Input"
        description="Campo preenchido de uma linha, com texto legível também no mobile."
        registryName="input"
      >
        <ShowcaseRow label="Padrão">
          <Input
            className="max-w-[720px]"
            aria-label="Nome do projeto"
            placeholder="Ex.: Portfolio"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Foco">
          <Input
            className={`max-w-[720px] ${forcedFocus}`}
            aria-label="E-mail em foco"
            value="contato@kaiserinc.com"
            readOnly
          />
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Input
            className="max-w-[720px]"
            aria-label="E-mail inválido"
            value="contato@"
            aria-invalid="true"
            readOnly
          />
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <Input
            className="max-w-[720px]"
            aria-label="Slug do projeto"
            value="levelify"
            disabled
            readOnly
          />
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="textarea"
        title="Textarea"
        description="Texto de várias linhas com altura inicial confortável e crescimento livre."
        registryName="textarea"
      >
        <ShowcaseRow label="Padrão">
          <Textarea
            className="max-w-[720px]"
            aria-label="Descrição"
            placeholder="Descreva o objetivo do projeto"
          />
        </ShowcaseRow>
        <ShowcaseRow label="Foco">
          <Textarea
            className={`max-w-[720px] ${forcedFocus}`}
            aria-label="Descrição em foco"
            value="Acompanhar métricas de produto em um só lugar."
            readOnly
          />
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Textarea
            className="max-w-[720px]"
            aria-label="Descrição inválida"
            value="Curta"
            aria-invalid="true"
            readOnly
          />
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <Textarea
            className="max-w-[720px]"
            aria-label="Notas arquivadas"
            value="Projeto arquivado em setembro."
            disabled
            readOnly
          />
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="select"
        title="Select"
        description="Escolha uma opção em um menu operável por teclado."
        registryName="select"
      >
        <ShowcaseRow label="Padrão">
          <Select items={statusItems} defaultValue="active">
            <SelectTrigger aria-label="Status do projeto" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="paused">Pausado</SelectItem>
              <SelectItem value="archived">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </ShowcaseRow>
        <ShowcaseRow label="Foco">
          <Select items={statusItems} defaultValue="paused">
            <SelectTrigger
              aria-label="Status em foco"
              className={`w-56 ${forcedFocus}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="paused">Pausado</SelectItem>
            </SelectContent>
          </Select>
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Select items={statusItems}>
            <SelectTrigger
              aria-label="Status inválido"
              aria-invalid="true"
              className="w-56"
            >
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="paused">Pausado</SelectItem>
            </SelectContent>
          </Select>
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <Select items={statusItems} defaultValue="archived" disabled>
            <SelectTrigger aria-label="Status desabilitado" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="archived">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="checkbox"
        title="Checkbox"
        description="Ativa uma escolha independente e expõe o estado a tecnologias assistivas."
        registryName="checkbox"
      >
        <ShowcaseRow label="Desmarcado e marcado">
          <Field orientation="horizontal" className="w-auto">
            <Checkbox id="checkbox-backup" />
            <FieldLabel htmlFor="checkbox-backup">
              Criar backup semanal
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-auto">
            <Checkbox id="checkbox-report" defaultChecked />
            <FieldLabel htmlFor="checkbox-report">
              Enviar relatório mensal
            </FieldLabel>
          </Field>
        </ShowcaseRow>
        <ShowcaseRow label="Foco">
          <Checkbox aria-label="Checkbox em foco" className={forcedFocus} />
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Field data-invalid orientation="horizontal" className="w-auto">
            <Checkbox
              id="checkbox-terms"
              aria-invalid="true"
              aria-describedby="checkbox-terms-error"
            />
            <div className="flex flex-col gap-1">
              <FieldLabel htmlFor="checkbox-terms">
                Aceitar termos do projeto
              </FieldLabel>
              <FieldError id="checkbox-terms-error">
                Confirme para continuar.
              </FieldError>
            </div>
          </Field>
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <Field data-disabled orientation="horizontal" className="w-auto">
            <Checkbox id="checkbox-disabled" disabled />
            <FieldLabel htmlFor="checkbox-disabled">
              Sincronizar com o cliente
            </FieldLabel>
          </Field>
        </ShowcaseRow>
      </Showcase>

      <Showcase
        id="switch"
        title="Switch"
        description="Liga ou desliga uma configuração com efeito imediato."
        registryName="switch"
      >
        <ShowcaseRow label="Desligado e ligado">
          <Field orientation="horizontal" className="w-auto">
            <Switch id="switch-email" />
            <FieldLabel htmlFor="switch-email">
              Notificações por e-mail
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-auto">
            <Switch id="switch-deploy" defaultChecked />
            <FieldLabel htmlFor="switch-deploy">
              Avisar sobre novos deploys
            </FieldLabel>
          </Field>
        </ShowcaseRow>
        <ShowcaseRow label="Foco">
          <Switch aria-label="Switch em foco" className={forcedFocus} />
        </ShowcaseRow>
        <ShowcaseRow label="Erro">
          <Field data-invalid orientation="horizontal" className="w-auto">
            <Switch
              id="switch-required"
              aria-invalid="true"
              aria-describedby="switch-required-error"
            />
            <div className="flex flex-col gap-1">
              <FieldLabel htmlFor="switch-required">
                Permitir acesso da equipe
              </FieldLabel>
              <FieldError id="switch-required-error">
                Ative o acesso para publicar.
              </FieldError>
            </div>
          </Field>
        </ShowcaseRow>
        <ShowcaseRow label="Desabilitado">
          <Field data-disabled orientation="horizontal" className="w-auto">
            <Switch id="switch-disabled" disabled />
            <FieldLabel htmlFor="switch-disabled">
              Sincronização automática
            </FieldLabel>
          </Field>
        </ShowcaseRow>
      </Showcase>
    </>
  )
}

export { FormDemos }
