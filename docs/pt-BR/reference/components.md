# Referência de componentes

[English](../../en/reference/components.md)

Cada item da registry `@kaiserinc`: o que ele instala, as variantes, as props que acrescenta ao elemento de base e as dependências. Componentes feitos sobre o Base UI aceitam todas as props da parte correspondente do Base UI; componentes feitos sobre elementos HTML aceitam todas as props do elemento.

Instale qualquer item com `pnpm dlx shadcn@latest add @kaiserinc/<nome>`. Todo item depende da `base`.

## Base

### `base`

Tipo `registry:theme`. Instala os tokens de cor, raio, espaçamento e largura (ver a [referência de tokens](tokens.md)), uma regra para movimento reduzido e o `components/theme-provider.tsx`.

- `ThemeProvider`: provider do `next-themes` com `attribute="class"`, `defaultTheme="dark"` e `enableSystem`, mais a tecla `d`, que alterna entre escuro e claro fora de campos de texto.
- npm: `cn`, `next-themes`, `lucide-react`, `class-variance-authority`, `tw-animate-css`, `@base-ui/react`.

## Formulário

### `button`

`Button` sobre o Button do Base UI.

| Prop | Valores | Padrão |
|---|---|---|
| `variant` | `default`, `outline`, `secondary`, `ghost`, `destructive`, `link` | `default` |
| `size` | `default` (32px), `sm` (28px, só em tabela), `icon` (quadrado de 32px), `icon-sm` (quadrado de 28px) | `default` |
| `loading` | `boolean`: mostra um spinner centralizado, mantém cor e largura, define `aria-busy` e `aria-disabled` e ignora cliques | `false` |

O `destructive` tem contorno e texto vermelho, nunca fundo vermelho. Ícones dentro do botão levam `data-icon="inline-start"` ou `"inline-end"` para ajustar o espaçamento. Dependência na registry: `spinner`.

### `spinner`

`Spinner`: o loader do Lucide com `role="status"`. A prop `label` (padrão `"Carregando"`) vira o `aria-label`. Para de girar com `prefers-reduced-motion`.

### `label`

`Label`: rótulo de formulário, `text-sm font-medium`.

### `separator`

`Separator` sobre o Base UI. `orientation`: `horizontal` (padrão) ou `vertical`. Um pixel em `--border`.

### `field`

Partes: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldTitle`, `FieldSeparator`.

- `orientation` do `Field`: `vertical` (padrão, 6px entre rótulo e controle), `horizontal` (linhas de checkbox e switch), `responsive`.
- `data-invalid` no `Field` deixa o rótulo e o erro vermelhos.
- `FieldError` tem `role="alert"`.
- `FieldGroup` empilha os campos com 16px entre eles.

O `Field` não liga sozinho o controle ao rótulo, à descrição e ao erro. Ver [comportamentos conhecidos](../explanation/known-behaviors.md#o-field-não-liga-o-aria). Dependências na registry: `label`, `separator`.

### `input`

`Input` sobre o Input do Base UI. Preenchido (`bg-input/50`), sem borda, 32px, texto de 16px abaixo de 640px e de 14px acima. `aria-invalid` mostra a borda vermelha.

### `textarea`

`Textarea`: a mesma superfície do `Input`, altura mínima de 88px, cresce com o conteúdo.

### `select`

Partes: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`.

- Passe `items` (`{ value, label }[]`) para o `Select`, senão o gatilho mostra o valor cru.
- O `SelectTrigger` tem a cara do `Input` (32px, preenchido).
- Props do `SelectContent`: `side` (`"bottom"`), `sideOffset` (`4`), `align` (`"center"`), `alignOffset` (`0`), `alignItemWithTrigger` (`false`).
- A lista abre 4px abaixo do gatilho, com a largura dele, e o texto dos itens e o check alinhados com o texto e o chevron do gatilho. Entra com fade e escala a partir do gatilho em 150ms. O `alignItemWithTrigger` põe o item escolhido sobre o gatilho, como no macOS, com fade de 120ms.

### `checkbox`

`Checkbox` sobre o Base UI. 16px, `rounded-sm`, borda desmarcada em `--subtle-foreground` (3:1), marcado com fundo `--primary`.

### `switch`

`Switch` sobre o Base UI. `size`: `default` (20×32px) ou `sm` (16×24px). Desligado em `--input`, ligado em `--primary`. O thumb desliza em 250ms com `ease-drawer`, e a cor do trilho acompanha em 250ms. Ao pressionar, o thumb se alarga em direção ao centro, como no iOS; o Switch desabilitado e o reduced motion não alargam.

## Feedback

### `confirm-dialog`

`ConfirmDialog`, o substituto do `window.confirm()`.

| Prop | Tipo | Padrão |
|---|---|---|
| `trigger` | elemento que abre o diálogo; sem ele, controle com `open` | — |
| `title` | `ReactNode` | obrigatório |
| `description` | `ReactNode` | — |
| `confirmLabel` | `string` | `"Confirmar"` |
| `cancelLabel` | `string` | `"Cancelar"` |
| `variant` | `"default"` ou `"destructive"` | `"default"` |
| `onConfirm` | `() => void \| Promise<void>` | obrigatório |
| `open`, `onOpenChange` | estado controlado | — |

Enquanto a promessa do `onConfirm` está pendente, o botão de confirmar mostra carregando, e Cancelar e Esc ficam bloqueados. O diálogo fecha quando a promessa resolve e fica aberto quando ela falha. Dependências na registry: `alert-dialog`, `button`.

### `alert-dialog`

As peças por trás do `ConfirmDialog`: `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogMedia`, `AlertDialogOverlay`, `AlertDialogPortal`.

`size` do `AlertDialogContent`: `default` (720px de largura) ou `sm` (480px). Abaixo de 640px ele vira uma folha que sobe da base. O fundo atrás dele é o `--background` a 70%, sem blur. No desktop, entra com fade e escala a partir de 0,96 em 200ms e sai em 150ms. Como folha, sobe em 300ms com `ease-drawer` e sai em 200ms. As duas formas usam transição, então fechar no meio da animação volta do quadro atual.

### `sheet`

Partes: `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`. Construído sobre o Drawer do Base UI.

`side` do `Sheet`: `right` (padrão, 400px de largura, no máximo a tela menos 3rem) ou `bottom` (até 80vh, com alça de arraste). Fecha com um arraste em direção à borda, e um gesto rápido basta; com Esc; com clique fora; e pelo botão X, com o rótulo "Fechar" (`closeLabel` troca o texto, `showCloseButton={false}` esconde). Entra em 300ms com `ease-drawer`, e a saída acompanha a velocidade do gesto. Campos de formulário num bottom sheet ficam acima do teclado virtual. Dependências na registry: `base`, `button`.

### `sonner`

`Toaster` sobre o [sonner](https://sonner.emilkowal.ski). Coloque uma vez no layout e chame `toast.success`, `toast.error`, `toast.info`, `toast.warning` ou `toast.promise`, importados de `sonner`. A região ao vivo se chama "Notificações"; a cor de estado fica só no ícone. npm: `sonner`.

### `skeleton`

`Skeleton`: bloco `aria-hidden` em `--accent`, `rounded-md`, pulsando, a menos que o movimento reduzido esteja ligado. Coloque `aria-busy="true"` e um `aria-label` no contêiner que está carregando.

### `empty`

Partes: `Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `EmptyMedia`. `variant` do `EmptyMedia`: `default` ou `icon` (quadrado de 40px em `--muted`).

## Dados e layout

### `table`

Partes: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`. Largura total, cabeçalho em `--muted` com texto de 12px, linhas de 44px, divisórias de 1px em `--border`, hover em `--accent`, sem zebra.

### `badge`

`Badge` sobre o render do Base UI. `variant`: `neutral`, `primary`, `success`, `warning`, `destructive`, e `default` como apelido de `neutral`. Texto e borda na cor do estado, fundo transparente, 20px de altura, `rounded-sm`.

### `tabs`

Partes: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, mais `tabsListVariants`. `orientation` do `Tabs`: `horizontal` (padrão) ou `vertical`. As setas do teclado trocam de aba. Um único indicador de 2px em `--primary-text` desliza até a aba ativa (200ms, `ease-in-out`); não tem pill nem fundo. O painel entra com fade de 150ms.

### `page-header`

`PageHeader`, o título da página.

| Prop | Tipo | Padrão |
|---|---|---|
| `title` | `ReactNode` | obrigatório |
| `description` | `ReactNode` | — |
| `actions` | `ReactNode`, à direita | — |
| `headingLevel` | `1` ou `2` | `1` |

O título tem 40/44px (28/32px abaixo de 640px), peso 600 e espaçamento de −0,03em. Use `headingLevel={2}` quando o cabeçalho estiver dentro de outra página, para a página manter um único `h1`.
