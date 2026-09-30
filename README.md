# KaiserInc Base

The KaiserInc design system as a shadcn registry: flat, wide and soft interface components for Next.js, installed with one command and owned by your project.

[Português](README.pt-BR.md)

## About

KaiserInc Base is the frontend standard of [KaiserInc](https://github.com/Kaiser-Inc), a small technology group that builds real products in teams of one to three people. It ships as a [shadcn registry](https://ui.shadcn.com/docs/registry) called `@kaiserinc` instead of an npm package: `shadcn add` copies each component into your project, so you can read it, change it and never wait for a release.

The visual rules are short: Geist, one violet accent on zinc neutrals, no pure white or black, no gradients, 32px controls, a 6px radius, content straight on the page background, and the dark theme first with a complete light theme.

This repository is both the registry and its showcase. The showcase opens with a real Projects screen built only from registry items, and has one page per group with every component in every state.

## Components

| Group | Items |
|---|---|
| Base | `base`: tokens, fonts setup and the dark-first `ThemeProvider` |
| Form | `button`, `field`, `label`, `separator`, `input`, `textarea`, `select`, `checkbox`, `switch` |
| Feedback | `confirm-dialog`, `alert-dialog`, `sonner` (toasts), `skeleton`, `spinner`, `empty` |
| Data and layout | `table`, `badge`, `tabs`, `page-header` |

Default copy is Brazilian Portuguese ("Cancelar", "Carregando"); every string can be overridden through props.

## Quick start

You need a Next.js project with Tailwind CSS v4 and shadcn (`pnpm dlx shadcn@latest init`).

1. Point `components.json` at the registry:

   ```json
   {
     "registries": {
       "@kaiserinc": "<registry-url>/r/{name}.json"
     }
   }
   ```

   Until the registry is deployed, run it locally (see [Development](#development)) and use `http://localhost:3100`.

2. Install the base. It is a `registry:theme`, so it replaces the project's color, radius and spacing tokens:

   ```bash
   pnpm dlx shadcn@latest add @kaiserinc/base
   ```

3. In `app/layout.tsx`, load Geist and Geist Mono as `--font-sans` and `--font-mono`, add `suppressHydrationWarning` to `<html>`, and wrap the app in `ThemeProvider` from `@/components/theme-provider`.

4. Add what the screen needs. Dependencies come along:

   ```bash
   pnpm dlx shadcn@latest add @kaiserinc/field @kaiserinc/input @kaiserinc/confirm-dialog
   ```

## Usage

```tsx
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field data-invalid>
  <FieldLabel htmlFor="email">E-mail</FieldLabel>
  <Input id="email" aria-invalid="true" aria-describedby="email-error" />
  <FieldError id="email-error">Enter a complete e-mail.</FieldError>
</Field>

<ConfirmDialog
  trigger={<Button variant="destructive">Delete project</Button>}
  title="Delete the Levelify project?"
  confirmLabel="Delete"
  variant="destructive"
  onConfirm={async () => {
    await deleteProject(id) // a rejected promise keeps the dialog open
  }}
/>
```

## Documentation

Full documentation lives in [`docs/en`](docs/en/README.md) ([Português](docs/pt-BR/README.md)):

- [Tutorial: your first screen](docs/en/tutorial-first-screen.md)
- How-to guides: [install in an existing project](docs/en/how-to/install-in-existing-project.md), [add a component](docs/en/how-to/add-a-component.md), [deploy the registry](docs/en/how-to/deploy-the-registry.md)
- Reference: [components](docs/en/reference/components.md), [tokens](docs/en/reference/tokens.md)
- Explanation: [design principles](docs/en/explanation/design-principles.md), [known behaviors](docs/en/explanation/known-behaviors.md)

## Development

```bash
pnpm install
pnpm registry:build     # writes public/r/*.json (gitignored)
pnpm dev -p 3100        # showcase and registry at http://localhost:3100
pnpm test               # Vitest + Testing Library
pnpm typecheck
pnpm build              # builds the registry first (prebuild)
```

`pnpm lint` currently crashes: `eslint-config-next` 16.3.4 pulls `eslint-plugin-react` 7.37, which does not run on ESLint 10.

## Contributing

New components follow one path: pull the shadcn `base-rhea` version, adapt it to the KaiserInc Base rules test-first, register it in `registry.json` and add a showcase section. The steps are in [Add a component](docs/en/how-to/add-a-component.md). Commit messages follow Conventional Commits.

## License

[MIT](LICENSE)
