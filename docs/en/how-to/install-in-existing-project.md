# Install in an existing project

[Português](../../pt-BR/how-to/install-in-existing-project.md)

Use this guide when a project already has code, and maybe its own components, and you want to bring KaiserInc Base into it without breaking what is there. For a new project, the [tutorial](../tutorial-first-screen.md) is faster.

## Before you start

- The project runs Next.js with Tailwind CSS v4. Tailwind v3 projects need an upgrade first; the registry ships v4 tokens.
- The registry URL is `https://base-design-seven.vercel.app`. For unreleased changes, use `http://localhost:3100` with this repository running `pnpm registry:build && pnpm dev -p 3100`.

## 1. Check whether the project already has shadcn

```bash
cat components.json
```

- **No file**: run `pnpm dlx shadcn@latest init`. It creates `components.json`, `lib/utils.ts` and the CSS variables.
- **File exists**: keep it. Note the `aliases`; the components import from `@/components/ui/...`, and a project with other aliases needs them adjusted after install.

## 2. Decide about the base

`@kaiserinc/base` is a `registry:theme`. Installing it **replaces** `--background`, `--primary`, `--radius` and the other tokens in `app/globals.css`.

- **The project has no visual identity of its own**: install it.
- **The project already has one** (another design system, a client brand): do not install the base. Add the components only, and accept that they will use the project's tokens. Check that the tokens they need exist, especially `--primary-text`, `--subtle-foreground`, `--border-strong` and `--spacing-control` (see the [tokens reference](../reference/tokens.md)).

To see exactly what the base changes before applying it:

```bash
pnpm dlx shadcn@latest add @kaiserinc/base --dry-run
```

## 3. Register the registry

In `components.json`:

```json
{
  "registries": {
    "@kaiserinc": "https://base-design-seven.vercel.app/r/{name}.json"
  }
}
```

## 4. Install the base and wire the layout

```bash
pnpm dlx shadcn@latest add @kaiserinc/base
```

In `app/layout.tsx`: load Geist and Geist Mono with `next/font/google` as `--font-sans` and `--font-mono`, add `suppressHydrationWarning` to `<html>`, and wrap the body in `ThemeProvider` from `@/components/theme-provider`. The provider defaults to dark.

## 5. Add components without overwriting your own

Preview what a component would change before installing it:

```bash
pnpm dlx shadcn@latest add @kaiserinc/button --diff components/ui/button.tsx
```

- If your `button.tsx` came from shadcn and was never customized, overwrite it.
- If it was customized, keep yours, or install the KaiserInc one under another name and migrate screen by screen.

Then install what the screens need:

```bash
pnpm dlx shadcn@latest add @kaiserinc/field @kaiserinc/select @kaiserinc/confirm-dialog
```

## 6. Replace what the system forbids

Search the project for the patterns KaiserInc Base replaces:

```bash
grep -rnE "window\.confirm|[^.]confirm\(|alert\(|<select" app components --include=*.tsx
```

- `confirm()` becomes `ConfirmDialog`.
- `alert()` becomes a toast (`toast.success`, `toast.error`) or an inline message.
- A native `<select>` becomes `Select` with the `items` map.

## 7. Check the result

- Tab through each migrated screen: every control shows the focus ring.
- Controls are 32px tall; only table actions use the 28px size.
- Switch to the light theme (the `ThemeProvider` hotkey is `d`) and check that nothing disappears.

If `shadcn add` stops with `ERR_PNPM_ADDING_TO_ROOT`, see [known behaviors](../explanation/known-behaviors.md#pnpm-and-the-workspace-root).
