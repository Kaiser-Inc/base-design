# Comportamentos conhecidos

[English](../../en/explanation/known-behaviors.md)

Comportamentos das ferramentas por baixo do KaiserInc Base que falham sem mensagem de erro. Cada um custou uma sessão de depuração enquanto o sistema era construído.

## O anel de foco precisa de `outline-solid`

No Tailwind CSS v4, `outline-none` e `outline-hidden` definem os dois `--tw-outline-style: none`. O `focus-visible:outline-2` só define a largura e lê o estilo dessa variável, então não pinta nada. A lista de classes parece certa, e o anel nunca aparece.

Todo controle da registry junta as classes assim:

```
outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring
```

O `components/ui/focus.test.tsx` confere essa combinação em todos os controles. Um teste de classe não enxerga o estilo calculado, então, depois de mexer num controle, chegue nele com Tab no navegador.

## A base só troca os tokens como tema

Um item da registry do tipo `registry:item` com `cssVars` só acrescenta as variáveis que ainda não existem. Um projeto que já tem `--background` e `--primary` fica com os dele, e os componentes aparecem na paleta antiga. É por isso que o `@kaiserinc/base` é um `registry:theme`: para temas e estilos, o shadcn sobrescreve as variáveis existentes.

## O Select mostra o valor cru sem `items`

O `Select.Value` do Base UI só mostra o rótulo do item escolhido quando a raiz recebe o mapa `items`. Sem ele, o gatilho mostra `active` em vez de `Ativo`.

```tsx
<Select items={[{ value: "active", label: "Ativo" }]} defaultValue="active">
```

## O Field não liga o ARIA

O `Field` organiza rótulo, controle, descrição e erro, mas não liga um ao outro. Quem usa dá um `id` ao controle, aponta o `htmlFor` do `FieldLabel` para ele, define `aria-invalid` quando há erro e lista os ids da descrição e do erro no `aria-describedby`. Sem isso, o leitor de tela anuncia o campo sem nome e sem o erro.

## Carregando não é desabilitado

O `Button loading` mantém a cor e a largura do botão e ignora cliques com `aria-disabled` e um `onClick` protegido. Um botão com `disabled` durante o carregamento fica cinza, parece indisponível e muda de largura quando o spinner aparece. Use `loading`.

## O pnpm e a raiz do workspace

O `create-next-app` com pnpm grava um `pnpm-workspace.yaml` dentro do projeto novo. O pnpm passa a tratar o projeto como raiz de workspace e recusa `pnpm add` sem `-w`, o que faz o `shadcn init` e o `shadcn add` pararem no meio com `ERR_PNPM_ADDING_TO_ROOT`. Acrescente esta linha ao `.npmrc` do projeto e rode o comando de novo:

```
ignore-workspace-root-check=true
```

## O script de lint quebra

O `eslint-config-next` 16.3.4 traz o `eslint-plugin-react` 7.37, que chama uma API que o ESLint 10 removeu (`context.getFilename`). O `pnpm lint` falha ao carregar as regras, antes de olhar qualquer arquivo. Fixar o ESLint em `^9` resolve.
