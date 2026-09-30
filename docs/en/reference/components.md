# Components reference

[Português](../../pt-BR/reference/components.md)

Every item of the `@kaiserinc` registry: what it installs, its variants, the props it adds on top of the underlying element, and its dependencies. Components built on Base UI accept every prop of the matching Base UI part; components built on HTML elements accept every prop of that element.

Install any item with `pnpm dlx shadcn@latest add @kaiserinc/<name>`. Every item depends on `base`.

## Base

### `base`

Type `registry:theme`. Installs the color, radius, spacing and container tokens (see the [tokens reference](tokens.md)), a reduced-motion rule, and `components/theme-provider.tsx`.

- `ThemeProvider`: `next-themes` provider with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, and a `d` hotkey that toggles dark and light outside text fields.
- npm: `cn`, `next-themes`, `lucide-react`, `class-variance-authority`, `tw-animate-css`, `@base-ui/react`.

## Form

### `button`

`Button` on Base UI Button.

| Prop | Values | Default |
|---|---|---|
| `variant` | `default`, `outline`, `secondary`, `ghost`, `destructive`, `link` | `default` |
| `size` | `default` (32px), `sm` (28px, tables only), `icon` (32px square), `icon-sm` (28px square) | `default` |
| `loading` | `boolean`: shows a centered spinner, keeps color and width, sets `aria-busy` and `aria-disabled`, and ignores clicks | `false` |

`destructive` is outlined with red text, never a red fill. Icons inside take `data-icon="inline-start"` or `"inline-end"` for tighter padding. Registry deps: `spinner`.

### `spinner`

`Spinner`: Lucide loader with `role="status"`. Prop `label` (default `"Carregando"`) becomes the `aria-label`. Stops spinning with `prefers-reduced-motion`.

### `label`

`Label`: form label, `text-sm font-medium`.

### `separator`

`Separator` on Base UI. `orientation`: `horizontal` (default) or `vertical`. One pixel in `--border`.

### `field`

Parts: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldTitle`, `FieldSeparator`.

- `Field` `orientation`: `vertical` (default, 6px between label and control), `horizontal` (checkbox and switch rows), `responsive`.
- `data-invalid` on `Field` turns the label and the error red.
- `FieldError` renders with `role="alert"`.
- `FieldGroup` stacks fields 16px apart.

`Field` does not connect the control to its label, description and error by itself. See [known behaviors](../explanation/known-behaviors.md#field-does-not-wire-aria). Registry deps: `label`, `separator`.

### `input`

`Input` on Base UI Input. Filled (`bg-input/50`), no border, 32px, 16px text below 640px and 14px above. `aria-invalid` shows a red border.

### `textarea`

`Textarea`: same surface as `Input`, 88px minimum height, grows with content.

### `select`

Parts: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`.

- Pass `items` (`{ value, label }[]`) to `Select`, or the trigger shows the raw value.
- `SelectTrigger` looks like `Input` (32px, filled).
- `SelectContent` props: `side` (`"bottom"`), `sideOffset` (`4`), `align` (`"center"`), `alignOffset` (`0`), `alignItemWithTrigger` (`true`).

### `checkbox`

`Checkbox` on Base UI. 16px, `rounded-sm`, unchecked border in `--subtle-foreground` (3:1), checked fill in `--primary`.

### `switch`

`Switch` on Base UI. `size`: `default` (20×32px) or `sm` (16×24px). Off in `--input`, on in `--primary`.

## Feedback

### `confirm-dialog`

`ConfirmDialog`, the replacement for `window.confirm()`.

| Prop | Type | Default |
|---|---|---|
| `trigger` | element that opens the dialog; omit it to control with `open` | — |
| `title` | `ReactNode` | required |
| `description` | `ReactNode` | — |
| `confirmLabel` | `string` | `"Confirmar"` |
| `cancelLabel` | `string` | `"Cancelar"` |
| `variant` | `"default"` or `"destructive"` | `"default"` |
| `onConfirm` | `() => void \| Promise<void>` | required |
| `open`, `onOpenChange` | controlled state | — |

While the promise from `onConfirm` is pending, the confirm button shows loading and Cancel and Escape are blocked. The dialog closes when the promise resolves and stays open when it rejects. Registry deps: `alert-dialog`, `button`.

### `alert-dialog`

The primitives under `ConfirmDialog`: `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogMedia`, `AlertDialogOverlay`, `AlertDialogPortal`.

`AlertDialogContent` `size`: `default` (720px wide) or `sm` (480px). Below 640px it becomes a bottom sheet. The overlay is `--background` at 70%, with no blur. On desktop it fades and scales in from 0.96 over 200ms and leaves in 150ms. As a bottom sheet it slides up over 300ms with `ease-drawer` and leaves in 200ms. Both use transitions, so closing mid-animation reverses from the current frame.

### `sonner`

`Toaster` on [sonner](https://sonner.emilkowal.ski). Render it once in the layout, then call `toast.success`, `toast.error`, `toast.info`, `toast.warning` or `toast.promise` from `sonner`. The live region is labelled "Notificações"; the state color is on the icon only. npm: `sonner`.

### `skeleton`

`Skeleton`: `aria-hidden` block in `--accent`, `rounded-md`, pulsing unless reduced motion is on. Put `aria-busy="true"` and an `aria-label` on the container that is loading.

### `empty`

Parts: `Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `EmptyMedia`. `EmptyMedia` `variant`: `default` or `icon` (40px square in `--muted`).

## Data and layout

### `table`

Parts: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`. Full width, header in `--muted` with 12px text, 44px rows, 1px rules in `--border`, hover in `--accent`, no zebra.

### `badge`

`Badge` on Base UI render. `variant`: `neutral`, `primary`, `success`, `warning`, `destructive`, and `default` as an alias of `neutral`. Text and border in the state color, transparent background, 20px tall, `rounded-sm`.

### `tabs`

Parts: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, plus `tabsListVariants`. `Tabs` `orientation`: `horizontal` (default) or `vertical`. Arrow keys move between tabs. A single 2px indicator in `--primary-text` slides to the active tab (200ms, `ease-in-out`); there is no pill and no fill. The panel fades in over 150ms.

### `page-header`

`PageHeader`, the page title.

| Prop | Type | Default |
|---|---|---|
| `title` | `ReactNode` | required |
| `description` | `ReactNode` | — |
| `actions` | `ReactNode`, placed on the right | — |
| `headingLevel` | `1` or `2` | `1` |

The title is 40/44px (28/32px below 640px), weight 600, tracking −0.03em. Use `headingLevel={2}` when the header sits inside another page, so the page keeps a single `h1`.
