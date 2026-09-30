# Criar um componente na registry

[English](../../en/how-to/add-a-component.md)

Use este guia para trazer um componente novo para a registry `@kaiserinc`, por exemplo um Tooltip. O caminho é sempre o mesmo: partir da versão `base-rhea` do shadcn, adaptar às regras do KaiserInc Base com teste primeiro, registrar e mostrar na vitrine.

## 1. Puxe o componente original

Na raiz do repositório, numa branch de feature:

```bash
pnpm dlx shadcn@latest add tooltip
```

Faça o commit do arquivo do jeito que ele veio, antes de mudar qualquer coisa, para a adaptação aparecer num diff próprio:

```bash
git add components/ui/tooltip.tsx && git commit -m "chore: add upstream shadcn tooltip"
```

## 2. Escreva o teste primeiro

Crie `components/ui/tooltip.test.tsx`. Cubra o comportamento e as regras que uma classe consegue provar:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

describe("Tooltip", () => {
  it("uses the overlay surface without a fill in the accent color", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipContent>Detalhe</TooltipContent>
      </Tooltip>
    )
    const content = screen.getByText("Detalhe")
    expect(content.className).toMatch(/bg-popover/)
    expect(content.className).not.toMatch(/bg-primary|opacity-50/)
  })
})
```

Rode `pnpm test` e veja o teste falhar pelo motivo certo.

## 3. Adapte o componente

Aplique a tabela de tradução do design system. As mudanças mais comuns:

| Original (Rhea) | KaiserInc Base |
|---|---|
| `h-8` num controle | `h-control` (32px) |
| `h-7` | `h-control-sm` (28px), só dentro de tabela |
| `rounded-2xl`, `rounded-xl`, `rounded-4xl` num controle | `rounded-md` (6px) |
| raio de popover, menu ou diálogo | `rounded-lg` (8px) |
| `outline-none` e `focus-visible:ring-3 ring-ring/30` | `outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring` |
| `disabled:opacity-50` | `disabled:bg-muted disabled:text-subtle-foreground` |
| `shadow-*` em controle ou card | nenhuma; superfícies flutuantes usam `shadow-[var(--shadow-overlay)]` e `dark:border dark:border-border` |
| `bg-black/*`, `backdrop-blur*` | proibidos |
| `transition-all duration-200` | `transition-colors duration-[120ms] ease-out` |

Textos padrão ficam em português e sempre por prop. Ícones são Lucide com `strokeWidth={1.75}`.

Rode `pnpm test` até passar, depois `pnpm typecheck`.

## 4. Registre

Acrescente o item no `registry.json`, junto dos outros:

```json
{
  "name": "tooltip",
  "type": "registry:ui",
  "title": "Tooltip",
  "description": "Short hint on hover and focus, on the popover surface.",
  "dependencies": ["cn", "@base-ui/react"],
  "registryDependencies": ["@kaiserinc/base"],
  "files": [{ "path": "components/ui/tooltip.tsx", "type": "registry:ui" }]
}
```

Liste em `dependencies` todo pacote npm que o arquivo importa, e em `registryDependencies` todo outro item `@kaiserinc` que ele importa. Depois confira o build:

```bash
pnpm registry:build
```

## 5. Mostre na vitrine

Crie uma seção `Showcase` na página certa em `components/site/demos/`, com um `ShowcaseRow` por estado e um trecho em `code`. Depois acrescente a seção na lista `sections` da página em `app/<grupo>/page.tsx`, para ela aparecer no índice.

```tsx
<Showcase id="tooltip" title="Tooltip" registryName="tooltip" code={`<Tooltip>…</Tooltip>`}>
  <ShowcaseRow label="Padrão">…</ShowcaseRow>
</Showcase>
```

## 6. Confira e abra o PR

- Screenshots em 390px e 1440px, primeiro no escuro, depois no claro.
- Chegue ao componente com Tab: o anel de foco aparece.
- `pnpm test`, `pnpm typecheck` e `pnpm build` passam.

Faça o commit com mensagem no padrão Conventional Commits (`feat(tooltip): adapt tooltip to KaiserInc Base`) e abra um PR para a `main`.
