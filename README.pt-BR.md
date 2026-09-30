# KaiserInc Base

O design system da KaiserInc como registry shadcn: componentes de interface plana, larga e suave para Next.js, instalados com um comando e de posse do seu projeto.

[English](README.md)

## Sobre

O KaiserInc Base é o padrão de frontend da [KaiserInc](https://github.com/Kaiser-Inc), um grupo de tecnologia pequeno que constrói produtos reais em times de uma a três pessoas. Ele é distribuído como uma [registry shadcn](https://ui.shadcn.com/docs/registry) chamada `@kaiserinc`, e não como pacote npm: o `shadcn add` copia cada componente para dentro do projeto, que pode ler, mudar e nunca esperar por uma versão nova.

As regras visuais são curtas: Geist, um único acento violeta sobre neutros zinc, nada de branco nem preto puro, nada de degradê, controles de 32px, raio de 6px, conteúdo direto sobre o fundo da página e o tema escuro primeiro, com um tema claro completo.

Este repositório é ao mesmo tempo a registry e a vitrine dela. A vitrine abre com uma tela real de Projetos, feita só com itens da registry, e tem uma página por grupo, com cada componente em todos os estados.

## Componentes

| Grupo | Itens |
|---|---|
| Base | `base`: tokens, fontes e o `ThemeProvider` dark first |
| Formulário | `button`, `field`, `label`, `separator`, `input`, `textarea`, `select`, `checkbox`, `switch` |
| Feedback | `confirm-dialog`, `alert-dialog`, `sonner` (toasts), `skeleton`, `spinner`, `empty` |
| Dados e layout | `table`, `badge`, `tabs`, `page-header` |

Os textos padrão estão em português ("Cancelar", "Carregando"), e todos podem ser trocados por prop.

## Começo rápido

Você precisa de um projeto Next.js com Tailwind CSS v4 e shadcn (`pnpm dlx shadcn@latest init`).

1. Aponte o `components.json` para a registry:

   ```json
   {
     "registries": {
       "@kaiserinc": "https://base-design-seven.vercel.app/r/{name}.json"
     }
   }
   ```

   Para testar mudanças ainda não publicadas, rode a registry localmente (ver [Desenvolvimento](#desenvolvimento)) e use `http://localhost:3100`.

2. Instale a base. Ela é um `registry:theme` e por isso substitui os tokens de cor, raio e espaçamento do projeto:

   ```bash
   pnpm dlx shadcn@latest add @kaiserinc/base
   ```

3. No `app/layout.tsx`, carregue Geist e Geist Mono como `--font-sans` e `--font-mono`, coloque `suppressHydrationWarning` no `<html>` e envolva o app no `ThemeProvider` de `@/components/theme-provider`.

4. Adicione o que a tela precisa. As dependências vêm junto:

   ```bash
   pnpm dlx shadcn@latest add @kaiserinc/field @kaiserinc/input @kaiserinc/confirm-dialog
   ```

## Uso

```tsx
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field data-invalid>
  <FieldLabel htmlFor="email">E-mail</FieldLabel>
  <Input id="email" aria-invalid="true" aria-describedby="email-erro" />
  <FieldError id="email-erro">Informe um e-mail completo.</FieldError>
</Field>

<ConfirmDialog
  trigger={<Button variant="destructive">Excluir projeto</Button>}
  title="Excluir o projeto Levelify?"
  confirmLabel="Excluir"
  variant="destructive"
  onConfirm={async () => {
    await excluirProjeto(id) // se a promessa falhar, o diálogo continua aberto
  }}
/>
```

## Documentação

A documentação completa está em [`docs/pt-BR`](docs/pt-BR/README.md) ([English](docs/en/README.md)):

- [Tutorial: sua primeira tela](docs/pt-BR/tutorial-first-screen.md)
- Guias práticos: [instalar num projeto existente](docs/pt-BR/how-to/install-in-existing-project.md), [criar um componente](docs/pt-BR/how-to/add-a-component.md), [publicar a registry](docs/pt-BR/how-to/deploy-the-registry.md)
- Referência: [componentes](docs/pt-BR/reference/components.md), [tokens](docs/pt-BR/reference/tokens.md)
- Explicação: [princípios de design](docs/pt-BR/explanation/design-principles.md), [comportamentos conhecidos](docs/pt-BR/explanation/known-behaviors.md)

## Desenvolvimento

```bash
pnpm install
pnpm registry:build     # gera public/r/*.json (fora do git)
pnpm dev -p 3100        # vitrine e registry em http://localhost:3100
pnpm test               # Vitest + Testing Library
pnpm typecheck
pnpm build              # gera a registry antes (prebuild)
```

O `pnpm lint` quebra hoje: o `eslint-config-next` 16.3.4 traz o `eslint-plugin-react` 7.37, que não roda no ESLint 10.

## Como contribuir

Componente novo segue sempre o mesmo caminho: puxar a versão `base-rhea` do shadcn, adaptar às regras do KaiserInc Base com teste primeiro, registrar no `registry.json` e criar a seção na vitrine. O passo a passo está em [Criar um componente](docs/pt-BR/how-to/add-a-component.md). As mensagens de commit seguem o Conventional Commits.

## Licença

[MIT](LICENSE)
