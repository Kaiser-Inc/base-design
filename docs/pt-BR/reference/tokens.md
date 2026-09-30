# Referência de tokens

[English](../../en/reference/tokens.md)

Os tokens que o `@kaiserinc/base` instala no `app/globals.css`. As cores estão em OKLCH: os neutros usam o matiz 286 (zinc), o acento usa o 293 (violeta) e os gráficos usam de 274 a 277 (índigo). O tema padrão é o escuro.

Toda cor vira utilitário do Tailwind: `--primary-text` vira `text-primary-text`, `--border-strong` vira `border-border-strong`, e assim por diante.

## Superfícies e texto

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| `--background` | `oklch(0.19 0.006 286)` | `oklch(0.978 0.004 286)` | Fundo da página e dos cards; o conteúdo fica direto sobre ele |
| `--foreground` | `oklch(0.93 0.004 286)` | `oklch(0.21 0.006 285.885)` | Texto principal |
| `--card` | igual ao fundo | igual ao fundo | Card não separa conteúdo |
| `--popover` | `oklch(0.23 0.007 286)` | `oklch(0.99 0.002 286)` | Menus, diálogos e toasts: a única superfície elevada |
| `--muted` | `oklch(0.23 0.007 286)` | `oklch(0.955 0.005 286)` | Cabeçalho de tabela, campo desabilitado, bloco de código |
| `--muted-foreground` | `oklch(0.72 0.012 286)` | `oklch(0.5 0.016 286)` | Texto secundário e placeholder |
| `--subtle-foreground` | `oklch(0.65 0.012 286)` | `oklch(0.53 0.016 286)` | Metadado, texto desabilitado, borda do checkbox |
| `--accent` | `oklch(0.26 0.008 286)` | `oklch(0.94 0.006 286)` | Hover de linha e de item de menu; skeleton |
| `--secondary` | `oklch(0.26 0.008 286)` | `oklch(0.94 0.006 286)` | Fundo do botão secundário |

## Linhas e campos

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| `--border` | `oklch(0.28 0.007 286)` | `oklch(0.915 0.005 286)` | Linhas finas e divisórias |
| `--border-strong` | `oklch(0.35 0.009 286)` | `oklch(0.86 0.008 286)` | Borda do botão outline |
| `--input` | `oklch(0.35 0.009 286)` | `oklch(0.86 0.008 286)` | Fundo do campo preenchido, usado a 50% (`bg-input/50`) |
| `--ring` | `oklch(0.74 0.12 293)` | `oklch(0.5 0.17 293)` | Anel de foco (2px, com 2px de afastamento) |

## Acento e estados

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| `--primary` | `oklch(0.5 0.17 293)` | `oklch(0.5 0.17 293)` | O único acento, como preenchimento: botão principal, controle marcado |
| `--primary-hover` | `oklch(0.55 0.17 293)` | `oklch(0.45 0.16 293)` | Hover do botão principal |
| `--primary-foreground` | `oklch(0.975 0.01 293)` | `oklch(0.975 0.01 293)` | Texto sobre `--primary` (6,0:1) |
| `--primary-text` | `oklch(0.74 0.12 293)` | `oklch(0.5 0.17 293)` | Violeta como texto ou ícone: link, aba ativa |
| `--destructive` | `oklch(0.72 0.12 25)` | `oklch(0.53 0.15 25)` | Erro: só texto, ícone e borda |
| `--success` | `oklch(0.75 0.1 150)` | `oklch(0.5 0.1 150)` | Sucesso: só texto e ícone |
| `--warning` | `oklch(0.78 0.1 80)` | `oklch(0.53 0.11 75)` | Atenção: só texto e ícone |

## Gráficos

Iguais nos dois temas.

| Token | Valor |
|---|---|
| `--chart-1` | `oklch(0.785 0.1 274.713)` |
| `--chart-2` | `oklch(0.585 0.16 277.117)` |
| `--chart-3` | `oklch(0.511 0.17 276.966)` |
| `--chart-4` | `oklch(0.457 0.16 277.023)` |
| `--chart-5` | `oklch(0.398 0.13 277.366)` |

## Tamanho, raio e elevação

| Token | Valor | Uso |
|---|---|---|
| `--spacing-control` | `32px` | Altura de todo controle (`h-control`) |
| `--spacing-control-sm` | `28px` | Controle denso dentro de tabela (`h-control-sm`) |
| `--container-page` | `1600px` | Largura da página (`max-w-page`) |
| `--radius` | `0.375rem` (6px) | Controles (`rounded-md`) |
| `--radius-sm` | `4px` | Badges (`rounded-sm`) |
| `--radius-lg` | `8px` | Diálogos e popovers (`rounded-lg`) |
| `--shadow-overlay` | claro: `0 8px 24px rgb(0 0 0 / 0.08)`; escuro: `none` | Superfícies elevadas; no escuro, uma borda faz o papel da sombra |

## Motion

| Token | Valor | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrada e saída de elementos (`ease-out`). Substitui a curva padrão do Tailwind |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Elementos que se movem na tela, como o indicador de aba (`ease-in-out`). Substitui a curva padrão do Tailwind |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Sheets e o bottom sheet do mobile (`ease-drawer`) |

As durações ficam nas classes: de 120 a 200ms em controles e popups, 300ms em sheets. A saída é mais rápida que a entrada. Com `prefers-reduced-motion`, os componentes mantêm fades e mudanças de cor e deixam de animar escala e posição.

## Contraste

Medido com a fórmula do WCAG sobre os valores OKLCH acima:

- Texto sobre o fundo e sobre `--muted` fica em 4,5:1 ou mais nos dois temas.
- O placeholder (`--muted-foreground`) sobre o campo preenchido dá 4,7:1 no tema claro.
- O `--primary-text` sobre o fundo escuro dá 7,7:1; o `--primary` como texto ali daria só 2,9:1, e é por isso que existem os dois.
