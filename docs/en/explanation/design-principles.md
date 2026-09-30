# Design principles

[Português](../../pt-BR/explanation/design-principles.md)

KaiserInc Base aims for interfaces that are flat, wide, soft and consistent, and that look like a real product. This page explains the choices behind that and what each one costs.

## Quality from structure, not effects

Spacing, typography, hierarchy and proportion carry the visual quality. Gradients, glow, heavy blur and glassmorphism are out, because they age fast and make screens look like templates. The system gives up some immediate "wow" in exchange for screens that stay readable after the tenth visit.

## Content on the page, not in windows

A section is not wrapped in a box with its own background, border and shadow just to separate it from the page. Sections are separated by space, a heading and at most a thin rule. The only surfaces that rise above the page are the ones that float: menus, dialogs and toasts.

This keeps the page calm and wide. The cost appears in documentation pages, where a demo can blend into the text; the showcase answers that with an "Exemplo" label and a thin rule beside each demo instead of a card.

## Wide by default

Pages go up to 1600px and tables take the full width. Width is limited only where reading needs it: a single-column form stays within 720px, and descriptions within about 60 characters per line. Centering everything in a narrow column wastes the screen on the tools where KaiserInc people spend their day.

## One accent, soft colors

There is one accent, violet at hue 293, taken from the shadcn preset the system started from. Its chroma is lowered from 0.27 to 0.17, and the page never uses pure white or pure black. Success, warning and error colors appear on text, icons and borders only, never as saturated fills.

The accent has two tokens. `--primary` is the same violet in both themes, so the brand does not change color when the theme changes. That violet reads as a fill but not as text on the dark background (2.9:1), so violet text and icons use `--primary-text`, lighter in dark mode (7.7:1).

## One control height

Buttons, inputs, selects and every other control are 32px tall, the `h-8` of the shadcn Rhea style. Tables may use 28px for row actions; nothing else gets a third size. A screen where every control lines up needs no extra decoration to look deliberate.

Fields are filled with a neutral tone and have no border, as in the Rhea style. The focus ring marks the active field instead.

## Dark first, both themes complete

KaiserInc works in dark mode, so the dark theme is the default and every screen is designed and reviewed in it first. The light theme is not an afterthought: every token has its own light value with contrast measured, and every screen is checked in both before it ships.

## Brazilian Portuguese by default

KaiserInc builds for Brazilian users and teams, so default component copy is in Portuguese: "Cancelar", "Confirmar", "Carregando". Every string is a prop, so an English product passes its own copy.

## A registry, not a package

Components ship as a shadcn registry. `shadcn add` copies the source into the project, which then owns it. A project can adjust a component without forking a package or waiting for a release. The cost is that improvements do not arrive by themselves: to get a newer version of a component, a project runs `shadcn add` again and reviews the diff. For a small group with a handful of products, readable and editable code is worth more than automatic updates.
