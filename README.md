# KaiserInc Base

The KaiserInc design system as a [shadcn registry](https://ui.shadcn.com/docs/registry). Flat, wide and soft interfaces: Geist, one violet accent on zinc neutrals, 32px controls, 6px radius, dark first.

This repository is two things at once:

- **The registry.** `registry.json` lists every item; `pnpm registry:build` writes them to `public/r/*.json`. Other projects install the components from there and own the copied code.
- **The showcase.** A Next app with one page per group (`/formulario`, `/feedback`, `/dados`) showing every component in every state, with its install command.

## Use it in a project

The project needs shadcn set up (`pnpm dlx shadcn@latest init`) and Tailwind v4.

1. Add the registry to `components.json`:

   ```json
   {
     "registries": {
       "@kaiserinc": "https://<registry-domain>/r/{name}.json"
     }
   }
   ```

2. Install the base first. It is a `registry:theme`, so it replaces the project's color, radius and spacing tokens, and it adds the dark-first `ThemeProvider`:

   ```bash
   pnpm dlx shadcn@latest add @kaiserinc/base
   ```

3. Wrap the app in `ThemeProvider` and load Geist in `app/layout.tsx` (the registry cannot edit the layout for you):

   ```tsx
   import { Geist, Geist_Mono } from "next/font/google"
   import { ThemeProvider } from "@/components/theme-provider"

   const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
   const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

   // <html lang="pt-BR" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
   //   <body><ThemeProvider>{children}</ThemeProvider></body>
   ```

4. Install components by name. Their dependencies come along:

   ```bash
   pnpm dlx shadcn@latest add @kaiserinc/field @kaiserinc/input @kaiserinc/confirm-dialog
   ```

## Items

| Group | Items |
|---|---|
| Base | `base` (tokens, theme provider) |
| Form | `button`, `field`, `label`, `separator`, `input`, `textarea`, `select`, `checkbox`, `switch` |
| Feedback | `confirm-dialog`, `alert-dialog`, `sonner`, `skeleton`, `spinner`, `empty` |
| Data and layout | `table`, `badge`, `tabs`, `page-header` |

`Select` shows the chosen item label only when the root gets the `items` map (`<Select items={[{ value, label }]}>`); without it the trigger shows the raw value. This is Base UI behavior.

Default component copy is Brazilian Portuguese ("Cancelar", "Carregando") and every string can be overridden through props.

## Rules the components follow

- No gradients, no pure white or black, no saturated fills. State colors appear only on text, icons and borders.
- One control height (32px); 28px only inside tables.
- Filled fields with no border; the focus ring marks the active control.
- No card, border and shadow just to separate a section. Only popovers and dialogs rise above the page.
- No native `<select>`, `alert()` or `confirm()`: use `select` and `confirm-dialog`.
- Violet as a fill uses `primary`; violet as text or icon uses `primary-text`, which is lighter in dark mode to keep 4.5:1.

## Develop

```bash
pnpm install
pnpm dev             # showcase at http://localhost:3000
pnpm test            # Vitest + Testing Library
pnpm typecheck
pnpm registry:build  # writes public/r/*.json (also runs before `pnpm build`)
```

`public/r/` is generated and ignored by git. A deploy (for example on Vercel) runs `pnpm build`, which builds the registry first and serves it at `/r/{name}.json`.

`pnpm lint` currently crashes: `eslint-config-next` 16.3.4 pulls `eslint-plugin-react` 7.37, which does not run on ESLint 10.
