# Instalar num projeto existente

[English](../../en/how-to/install-in-existing-project.md)

Use este guia quando o projeto já tem código, e talvez componentes próprios, e você quer trazer o KaiserInc Base sem quebrar o que existe. Para projeto novo, o [tutorial](../tutorial-first-screen.md) é mais rápido.

## Antes de começar

- O projeto roda Next.js com Tailwind CSS v4. Projeto em Tailwind v3 precisa migrar antes, porque a registry entrega tokens de v4.
- Você sabe a URL da registry: o domínio do deploy, ou `http://localhost:3100` com este repositório rodando `pnpm registry:build && pnpm dev -p 3100`.

## 1. Veja se o projeto já tem shadcn

```bash
cat components.json
```

- **Sem o arquivo**: rode `pnpm dlx shadcn@latest init`. Ele cria o `components.json`, o `lib/utils.ts` e as variáveis de CSS.
- **Com o arquivo**: mantenha. Repare nos `aliases`: os componentes importam de `@/components/ui/...`, e um projeto com outros aliases precisa ajustar os imports depois de instalar.

## 2. Decida sobre a base

O `@kaiserinc/base` é um `registry:theme`. Instalar **substitui** o `--background`, o `--primary`, o `--radius` e os outros tokens do `app/globals.css`.

- **O projeto não tem identidade visual própria**: instale.
- **O projeto já tem uma** (outro design system, a marca de um cliente): não instale a base. Adicione só os componentes e aceite que eles vão usar os tokens do projeto. Confira se os tokens que eles pedem existem, principalmente `--primary-text`, `--subtle-foreground`, `--border-strong` e `--spacing-control` (ver a [referência de tokens](../reference/tokens.md)).

Para ver exatamente o que a base muda antes de aplicar:

```bash
pnpm dlx shadcn@latest add @kaiserinc/base --dry-run
```

## 3. Registre a registry

No `components.json`:

```json
{
  "registries": {
    "@kaiserinc": "<url-da-registry>/r/{name}.json"
  }
}
```

## 4. Instale a base e monte o layout

```bash
pnpm dlx shadcn@latest add @kaiserinc/base
```

No `app/layout.tsx`: carregue Geist e Geist Mono com `next/font/google` como `--font-sans` e `--font-mono`, coloque `suppressHydrationWarning` no `<html>` e envolva o body no `ThemeProvider` de `@/components/theme-provider`. O tema padrão do provider é o escuro.

## 5. Adicione componentes sem sobrescrever os seus

Veja o que um componente mudaria antes de instalar:

```bash
pnpm dlx shadcn@latest add @kaiserinc/button --diff components/ui/button.tsx
```

- Se o seu `button.tsx` veio do shadcn e nunca foi mexido, sobrescreva.
- Se ele foi personalizado, fique com o seu, ou instale o da KaiserInc com outro nome e migre tela por tela.

Depois instale o que as telas precisam:

```bash
pnpm dlx shadcn@latest add @kaiserinc/field @kaiserinc/select @kaiserinc/confirm-dialog
```

## 6. Troque o que o sistema proíbe

Procure no projeto os padrões que o KaiserInc Base substitui:

```bash
grep -rnE "window\.confirm|[^.]confirm\(|alert\(|<select" app components --include=*.tsx
```

- `confirm()` vira `ConfirmDialog`.
- `alert()` vira toast (`toast.success`, `toast.error`) ou mensagem na própria tela.
- `<select>` nativo vira `Select` com o mapa `items`.

## 7. Confira o resultado

- Percorra cada tela migrada com Tab: todo controle mostra o anel de foco.
- Os controles têm 32px de altura; só as ações dentro de tabela usam 28px.
- Troque para o tema claro (a tecla do `ThemeProvider` é `d`) e confira que nada some.

Se o `shadcn add` parar com `ERR_PNPM_ADDING_TO_ROOT`, veja [comportamentos conhecidos](../explanation/known-behaviors.md#o-pnpm-e-a-raiz-do-workspace).
