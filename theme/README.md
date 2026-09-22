# Graphite

A compact, neutral interface theme with layered button edges and green action
accents, extracted from https://trylle.com/home. Use the styling independently
of the original site's layout, branding, or application logic.

To request this theme in another project: **Use the Graphite theme from
`~/dev/themes/graphite`.** This guide, the CSS, and the screenshots are the
reference; do not infer a page layout from the examples.

## Visual Reference

| Reference | File |
| --- | --- |
| Dark components | [Dark workbench](reference/workbench-dark-desktop.png) |
| Light components | [Light workbench](reference/workbench-light-desktop.png) |
| Typography, surfaces, and controls | [Component details](reference/workbench-details.png) |
| Desktop dialog | [Dialog](reference/workbench-dialog-dark.png) |
| Mobile dialog | [Bottom sheet](reference/workbench-dialog-mobile.png) |

## Design Rules

- **Type:** Inter Variable for interface text, Geist Mono Variable for code and
  technical values. Default interface text is 13px, weight 450, line-height 1.5;
  controls use 500, selected tabs and headings use 600. Use the source type scale
  in `styles/tokens.css`, with compact headings rather than marketing heroes.
- **Color:** neutral surfaces and text, with green for positive actions. Primary
  neutral buttons invert between light and dark mode. Gold, purple, and red are
  semantic variants, not decorative accents.
- **Surfaces:** use `--background`, `--surface-*`, and `--ff-surface-*`. Preserve
  the source's inset highlights and layered `--ff-shadow-*` and button shadows;
  these edges are part of the theme, not generic ambient elevation.
- **Geometry:** buttons and inputs have 8px corners. Segmented tabs use 7px
  thumbs inside a 10px container with 2px padding and a 1px border. Menus use
  14px corners, 4px gutters, and 10px option corners with 8px/12px padding.
- **Interaction:** control transitions are 150ms. Dialogs have 16px corners,
  a 512px desktop maximum width, a 2px blurred backdrop, and a mobile bottom-sheet
  treatment. Preserve visible focus, keyboard operation, and reduced motion.

Desktop button heights are 24, 28, 32, 36, and 40px; the default is 36px.
Small-screen targets increase to 44px, and input text increases to 16px.
The CSS is authoritative for exact values and light/dark differences.

## Use the Styles

Keep `styles/` and `assets/fonts/` together and load these files in order:

```html
<link rel="stylesheet" href="./styles/fonts.css">
<link rel="stylesheet" href="./styles/tokens.css">
<link rel="stylesheet" href="./styles/components.css">

<main data-trylle-theme="dark">
  <button class="tl-button" data-variant="success" data-size="sm">
    Create project
  </button>
</main>
```

Switch to `data-trylle-theme="light"` for light mode. The extracted selector
names (`data-trylle-theme`, `tl-*`, and the CSS variable names) are intentionally
unchanged; **Graphite** is the reference name for this theme. No React or
Tailwind dependency is required.

Button variants: `primary` (default), `success`, `secondary`, `outline`,
`subtle`, `ghost`, `link`, `destructive`, `gold`, and `purple`.

Button sizes: `xxs` (24px), `xs` (28px), `sm` (32px), omitted (36px),
and `lg` (40px).

For optional tabs, menus, searchable options, sliders, and dialogs:

```js
import { initTrylle } from "./theme.js";

const cleanup = initTrylle();
// Call cleanup() when unmounting.
```

Keep your existing component logic if you only need the appearance. The
[original playground](../../experiments/2026-08-31-trylle-theme/) contains
copyable markup and interactive examples; run `npm start` there to view it at
http://localhost:4387.

## Contents and Provenance

`theme.json` provides the theme's name, entry points, and reference paths.
`styles/tokens.css` contains 272 base declarations and 83 dark overrides.
All 13 source font subsets are local, with their OFL licenses and provenance in
`assets/font-sources.json`.

`reference/` retains the source stylesheets, component recipes, measurements,
screenshots, and original verification results. See
[manifest.json](reference/manifest.json) for the distinction between live
observations, public component recipes, and token-based additions.

Dialog styling is reconstructed from the public component bundle. Radio rows,
switch geometry, toast, textarea, disclosure, and the purple button are composed
from the extracted tokens. The original experiment verified 280 active dark
tokens against the live site and passed 43 browser checks.
