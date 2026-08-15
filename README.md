# NEONFORGE ⚡

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

**Cyberpunk · Industrial · Glass** — a shadcn-style copy-paste component system
with a modern-minimalist cyberpunk aesthetic. Glassmorphic transparent surfaces,
chamfered corners, neon glow accents, and hazard-grade utility classes.
Built on **Tailwind CSS v4** (CSS-first config) + **React 19** (Radix UI).

## Installation

Two ways to use Neonforge: the **shadcn CLI** (fastest, resolves deps for you)
or **manual copy-paste** (no tooling). Both require the theme — it carries the
whole cyberpunk glass language (surfaces, chamfer, glow, genre).

### Prerequisites

A project with **Tailwind CSS v4** (CSS-first config) + **React 19** and a
`components.json` file. If you don't have one yet:

```bash
npx shadcn@latest init
```

### CLI install

```bash
# 1. everything — all components + theme + utils (one command)
npx shadcn@latest add ghaerdi/neonforge/all

# 2. or install selectively
npx shadcn@latest add ghaerdi/neonforge/neonforge   # theme only
npx shadcn@latest add ghaerdi/neonforge/button      # one component
npx shadcn@latest add ghaerdi/neonforge/card ghaerdi/neonforge/dialog ghaerdi/neonforge/tabs
```

> The first install prompts to **select a component library** — choose **Radix UI**
> (Neonforge is built on Radix, so installed components match the registry
> exactly). `ghaerdi/neonforge/all` installs every component; the theme and
> `lib-utils` are pulled in transitively via `registryDependencies` for whichever
> components you add.
>
> > The bare `npx shadcn@latest add ghaerdi/neonforge` (no item) is **not** a valid
> > form in current shadcn CLI — it treats `ghaerdi/neonforge` as an item on the
> > default ui.shadcn.com registry and 404s. Always include an item:
> > `.../neonforge/all`, `.../neonforge/button`, etc.

Ensure `@import "tailwindcss"` is followed by the theme import in your global
CSS.

### Manual copy-paste (no shadcn CLI)

1. Copy the theme into your project and import it after Tailwind:

   ```bash
   cp styles/theme.css ./src/styles/theme.css
   ```

   ```css
   /* src/app/globals.css */
   @import "tailwindcss";
   @import "./styles/theme.css";
   ```

2. Copy each component's source (plus any co-located helper it imports, e.g.
   `carve-br.tsx`) into `components/ui/`:

   ```bash
   cp react/ui/tabs.tsx            ./src/components/ui/
   cp react/ui/carve-br.tsx        ./src/components/ui/
   ```

3. Install the npm dependencies listed in that component's registry entry
   (examples: `@radix-ui/react-tabs`, `@radix-ui/react-slot`,
   `class-variance-authority`).

4. Make sure `lib/utils.ts` exists (imported by all components).

### Presets

The Create page builds an 8-axis theme encoded as a compact `?preset=<code>`
share token. To render installed components with a specific preset:

- Open any page with `?preset=<code>` to apply it live — the theme is
  strictly URL-driven. No `?preset=` in the URL means the streetkid default;
  nothing is persisted in the browser.
- Copy the generated `:root { … }` token block (or download the theme file)
  from the **Get components** dialog on the Create page and drop it over your
  project theme.


## Component inventory

**React (62)** — Radix UI primitives, restyled for the industrial-glass language.
The full shadcn/ui v4 catalog is covered: button, input, card, dialog,
dropdown-menu, tabs, select, switch, checkbox, slider, avatar, table, toast,
sidebar, chart, form, calendar, date-picker, data-table, combobox, carousel,
command, … and more. Every component ships a live demo on the
`/components/<name>` page of the showcase app.
## Design system

oklch token set in `styles/theme.css` — dark by default, with a light
industrial-glass variant behind `:root[data-nf-mode="light"]`:

- **Surfaces** — industrial carbon: `--background`, `--card`, `--popover`,
  `--muted`, `--accent`
- **Neon accents** — `--primary` (cyan), `--destructive` (magenta), `--success`
  (lime), `--warning` (amber), `--info` (purple)
- **Glass** — `--nf-glass`, `--nf-glass-strong`, `--nf-glass-border`,
  `--nf-blur` + inset highlights
- **Glow** — `--nf-glow-primary` and friends, usable via `neon-glow` utilities
- **Chamfer** — `--nf-chamfer-sm/md/lg` corner cuts, usable via `chamfer-*`
  utilities
- **Type** — Chakra Petch (sans) + Share Tech Mono (mono), uppercase tracking
  culture

### Utility classes

| Utility                                                     | Effect                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `glass-panel` / `glass-panel-strong`                        | backdrop blur + saturation + inset highlight                                    |
| `neon-glow` (+ `-success -warning -destructive -info`)      | outer glow shadows                                                              |
| `text-glow` (+ variants)                                    | text glow                                                                       |
| `chamfer-sm/md/lg`                                          | clipped corners (clip-path)                                                     |
| `scanlines` / `hazard-stripes` / `grid-bg` / `grid-bg-neon` | cyberpunk textures                                                              |
| `plate`                                                     | mono uppercase letter-spaced label style                                        |
| `animate-nf-*`                                              | fade / zoom / slide / accordion / shimmer / scan / pulse-glow / flicker / blink |

## Repository layout

```
registry.json            root registry (includes nested registries)
react/registry.json      React component registry
react/ui/*.tsx           React components (source of truth)
lib/utils.ts             cn() helper
styles/theme.css         design tokens + utilities (single source of truth)
styles/registry.json     GENERATED — style item payload (theme.css → cssVars/css JSON)
scripts/build-registry.mjs  rebuild script (see below)
public/r/*.json          GENERATED — flattened shadcn build output (gitignored)
nextjs/                   showcase app (Next.js docs site)
```

## Local development

```bash
bun install

# rebuild styles/registry.json + public/r/ payloads (requires shadcn CLI)
bun run scripts/build-registry.mjs          # GitHub-form registryDependencies
bun run scripts/build-registry.mjs --local  # relative ./x.json rewrites
bun run scripts/build-registry.mjs --local --base-url=http://localhost:4173/r/
                                            # absolute-URL rewrites for local serving

# verify a registry remotely
bunx shadcn@latest registry validate ghaerdi/neonforge

# showcase app (Next.js) — run from the repo root
deno task dev        # Next.js dev server on :3000
deno task build      # production build
deno task start      # serve the production build
```

### How the style item is built

`scripts/build-registry.mjs` parses `styles/theme.css` with a small
CSS→nested-JSON parser: the `@theme inline` block becomes `cssVars.theme` and
every other top-level rule (`@layer base`, `@utility`, `@keyframes`) becomes a
nested `css` object. The full `theme.css` is also shipped as a file so the CLI
and manual installs agree.

## Tests

Vitest-based suite covering the preset codec round-trip, theme export, catalog
grouping, and registry integrity. Run from the repo root:

```bash
deno task test        # unit + integration (Vitest)
deno task test:watch  # watch mode
```

See `nextjs/src/**/*.test.ts(x)` for the live tests.

## Codemaps & agent guidance

- `AGENTS.md` — architecture, conventions, path aliases, and build/test commands
  for AI agents working in this repo.

## Publishing

1. Push this repo to GitHub as `ghaerdi/neonforge` (public).
2. Registry URLs use the GitHub shorthand form — no extra build step needed:
   `npx shadcn@latest add ghaerdi/neonforge/<component>`.
3. `npx shadcn@latest registry validate ghaerdi/neonforge` to double-check.

## License

MIT — see [LICENSE.md](./LICENSE.md). The UI components are built on
[shadcn/ui](https://github.com/shadcn-ui/ui) (MIT) and
[Lucide](https://github.com/lucide-icons/lucide) (ISC); their licenses apply to
the respective dependency code, with attribution in `THIRD_PARTY_NOTICES.md`.
