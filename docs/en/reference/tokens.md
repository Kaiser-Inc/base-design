# Tokens reference

[Português](../../pt-BR/reference/tokens.md)

The tokens that `@kaiserinc/base` installs in `app/globals.css`. Colors are in OKLCH: neutrals use hue 286 (zinc), the accent uses hue 293 (violet), and charts use hue 274 to 277 (indigo). Dark is the default theme.

Every color is available as a Tailwind utility: `--primary-text` becomes `text-primary-text`, `--border-strong` becomes `border-border-strong`, and so on.

## Surfaces and text

| Token | Dark | Light | Use |
|---|---|---|---|
| `--background` | `oklch(0.19 0.006 286)` | `oklch(0.978 0.004 286)` | Page and card background; content sits directly on it |
| `--foreground` | `oklch(0.93 0.004 286)` | `oklch(0.21 0.006 285.885)` | Main text |
| `--card` | same as background | same as background | Cards do not separate content |
| `--popover` | `oklch(0.23 0.007 286)` | `oklch(0.99 0.002 286)` | Menus, dialogs, toasts: the only raised surface |
| `--muted` | `oklch(0.23 0.007 286)` | `oklch(0.955 0.005 286)` | Table header, disabled fields, code blocks |
| `--muted-foreground` | `oklch(0.72 0.012 286)` | `oklch(0.5 0.016 286)` | Secondary text and placeholders |
| `--subtle-foreground` | `oklch(0.65 0.012 286)` | `oklch(0.53 0.016 286)` | Metadata, disabled text, the checkbox border |
| `--accent` | `oklch(0.26 0.008 286)` | `oklch(0.94 0.006 286)` | Hover of rows and menu items; skeleton |
| `--secondary` | `oklch(0.26 0.008 286)` | `oklch(0.94 0.006 286)` | Secondary button fill |

## Lines and fields

| Token | Dark | Light | Use |
|---|---|---|---|
| `--border` | `oklch(0.28 0.007 286)` | `oklch(0.915 0.005 286)` | Thin rules and dividers |
| `--border-strong` | `oklch(0.35 0.009 286)` | `oklch(0.86 0.008 286)` | Outline button border |
| `--input` | `oklch(0.35 0.009 286)` | `oklch(0.86 0.008 286)` | Filled field background, used at 50% (`bg-input/50`) |
| `--ring` | `oklch(0.74 0.12 293)` | `oklch(0.5 0.17 293)` | Focus ring (2px, 2px offset) |

## Accent and states

| Token | Dark | Light | Use |
|---|---|---|---|
| `--primary` | `oklch(0.5 0.17 293)` | `oklch(0.5 0.17 293)` | The one accent, as a fill: main button, checked controls |
| `--primary-hover` | `oklch(0.55 0.17 293)` | `oklch(0.45 0.16 293)` | Hover of the main button |
| `--primary-foreground` | `oklch(0.975 0.01 293)` | `oklch(0.975 0.01 293)` | Text on `--primary` (6.0:1) |
| `--primary-text` | `oklch(0.74 0.12 293)` | `oklch(0.5 0.17 293)` | Violet as text or icon: links, active tab |
| `--destructive` | `oklch(0.72 0.12 25)` | `oklch(0.53 0.15 25)` | Errors: text, icon and border only |
| `--success` | `oklch(0.75 0.1 150)` | `oklch(0.5 0.1 150)` | Success: text and icon only |
| `--warning` | `oklch(0.78 0.1 80)` | `oklch(0.53 0.11 75)` | Warning: text and icon only |

## Charts

The same in both themes.

| Token | Value |
|---|---|
| `--chart-1` | `oklch(0.785 0.1 274.713)` |
| `--chart-2` | `oklch(0.585 0.16 277.117)` |
| `--chart-3` | `oklch(0.511 0.17 276.966)` |
| `--chart-4` | `oklch(0.457 0.16 277.023)` |
| `--chart-5` | `oklch(0.398 0.13 277.366)` |

## Size, radius and elevation

| Token | Value | Use |
|---|---|---|
| `--spacing-control` | `32px` | Height of every control (`h-control`) |
| `--spacing-control-sm` | `28px` | Dense controls inside tables (`h-control-sm`) |
| `--container-page` | `1600px` | Page width (`max-w-page`) |
| `--radius` | `0.375rem` (6px) | Controls (`rounded-md`) |
| `--radius-sm` | `4px` | Badges (`rounded-sm`) |
| `--radius-lg` | `8px` | Dialogs and popovers (`rounded-lg`) |
| `--shadow-overlay` | light: `0 8px 24px rgb(0 0 0 / 0.08)`; dark: `none` | Raised surfaces; dark mode uses a border instead |

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entering and exiting UI (`ease-out`). Replaces Tailwind's default curve |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Elements moving on screen, such as the tab indicator (`ease-in-out`). Replaces Tailwind's default curve |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Sheets and the mobile bottom sheet (`ease-drawer`) |

Durations stay in the classes: 120 to 200ms for controls and popups, 300ms for sheets. Exits are faster than entrances. Under `prefers-reduced-motion`, components keep fades and color changes and drop scale and position changes.

## Contrast

Measured with the WCAG formula on the OKLCH values above:

- Text on the background and on `--muted` is at least 4.5:1 in both themes.
- Placeholder (`--muted-foreground`) on a filled field is 4.7:1 in light mode.
- `--primary-text` on the dark background is 7.7:1; `--primary` as text on it would be only 2.9:1, which is why both exist.
