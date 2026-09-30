# Known behaviors

[Português](../../pt-BR/explanation/known-behaviors.md)

Behaviors of the tools under KaiserInc Base that fail without an error message. Each one cost a debugging session while the system was built.

## The focus ring needs `outline-solid`

In Tailwind CSS v4, `outline-none` and `outline-hidden` both set `--tw-outline-style: none`. `focus-visible:outline-2` only sets the width and reads the style from that variable, so it paints nothing. The class list looks right and the ring never appears.

Every control in the registry keeps a solid outline at rest, with zero width, a transparent color and no offset, and grows it on `focus-visible`:

```
outline-0 outline-solid outline-transparent outline-offset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
```

Because the style never changes, the ring can transition: `outline-color`, `outline-width` and `outline-offset` are in each control's `transition` list, over 150ms. The width stays at 0 at rest so Windows high contrast mode, which paints transparent outlines, does not draw a ring on every control. Chromium rounds outline width and offset to whole pixels, so they grow in steps while the color fades smoothly.

`components/ui/focus.test.tsx` checks that pairing on every control. A class check cannot see computed styles, so after changing a control, tab to it in a browser.

## The base replaces tokens only as a theme

A registry item of type `registry:item` with `cssVars` only adds variables that do not exist yet. A project that already has `--background` and `--primary` keeps them, and the components render in the old palette. `@kaiserinc/base` is a `registry:theme` for that reason: shadcn overwrites existing variables for themes and styles.

## Select shows the raw value without `items`

Base UI's `Select.Value` renders the selected item's label only when the root receives the `items` map. Without it, the trigger shows `active` instead of `Ativo`.

```tsx
<Select items={[{ value: "active", label: "Ativo" }]} defaultValue="active">
```

## Field does not wire ARIA

`Field` lays out the label, control, description and error, but it does not connect them. The consumer gives the control an `id`, points `FieldLabel htmlFor` at it, sets `aria-invalid` on error, and lists the description and error ids in `aria-describedby`. Without that, a screen reader announces the field with no name and no error.

## Loading is not disabled

`Button loading` keeps the button's color and width and ignores clicks through `aria-disabled` and a guarded `onClick`. A button set to `disabled` during loading turns grey, looks unavailable, and changes width when the spinner appears. Use `loading`.

## pnpm and the workspace root

`create-next-app` with pnpm writes a `pnpm-workspace.yaml` into the new project. pnpm then treats the project as a workspace root and refuses `pnpm add` without `-w`, which makes `shadcn init` and `shadcn add` stop with `ERR_PNPM_ADDING_TO_ROOT` halfway through. Add this line to the project's `.npmrc` and run the command again:

```
ignore-workspace-root-check=true
```

## The lint script crashes

`eslint-config-next` 16.3.4 pulls `eslint-plugin-react` 7.37, which calls an API that ESLint 10 removed (`context.getFilename`). `pnpm lint` fails while loading rules, before checking any file. Pinning ESLint to `^9` fixes it.
