# AGENTS.md

Guidance for AI agents working in this repository.

## What this is

Neonforge is a **shadcn component registry** (cyberpunk / industrial / glass
aesthetic) with a **Next.js showcase app** in `nextjs/`. Components live in
`react/ui/*.tsx` and are published to `public/r/*.json` for the shadcn CLI.

## Layout

| Path | Role |
| --- | --- |
| `registry.json` | Root registry — an `include` collection aggregating the nested registries |
| `react/registry.json` | Library of ~62 `registry:ui` component items |
| `react/ui/*.tsx` | Component source (single source of truth) |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `styles/theme.css` | Design tokens + utilities (single source of truth for the style item) |
| `styles/registry.json` | **GENERATED** — `registry:style` item parsed from `theme.css` |
| `lib/registry.json` | `registry:lib` item — `lib-utils` |
| `public/r/*.json` | **GENERATED** flattened shadcn build output (gitignored) |
| `scripts/build-registry.mjs` | Parses `theme.css` → writes `styles/registry.json` → runs `shadcn build` → `public/r/` |
| `nextjs/` | Next.js showcase app (the docs/demo site) |

## Build & test commands

```bash
bun install

bun run scripts/build-registry.mjs            # rebuild styles/registry.json + public/r/
bun run scripts/build-registry.mjs --local    # local-relative registryDependencies

deno task dev        # Next.js dev server (:3000)
deno task build      # Next.js production build
deno task test       # Vitest suite
```

## Path aliases (Next.js)

`nextjs/tsconfig.json`:

- `@/*` → `nextjs/src/*`
- `@/components/ui/*` → `react/ui/*`
- `@/lib/*` → `lib/*`

**Note for the deno linter**: `Deno`/`deno-ts` does not understand these `@/`
aliases and reports hundreds of false "import not a dependency" errors. The real
type gate is the project `tsc` (`nextjs/node_modules/.bin/tsc --noEmit`) — trust
it, not deno-lint, for import/type correctness.

## Theme system

- Applied as `data-nf-*` attributes on `<html>` (e.g. `data-nf-style`,
  `data-nf-accent`, `data-nf-mode`).
- Genres: `streetkid` (default) · `nomad` · `corpo`.
- `data-nf-mode="light"` flips the surface tokens to the light industrial-glass
  variant; default (no attribute) is dark.
- Pre-paint script in `nextjs/src/app/layout.tsx` (`THEME_PREPAINT`) applies a
  `?preset=` code or the `data-nf-mode` before first paint to avoid FOUC. **Keep
  it dependency-free and self-contained.** Its decode logic must stay in sync
  with `nextjs/src/lib/preset-codec.ts`.
- Theming is **strictly URL-driven**: `?preset=<code>` applies on any page; no
  code → the streetkid default. Nothing is persisted to localStorage. Selection
  is managed in `nextjs/src/components/CreatePage.tsx` (reads/writes the URL).

**Conventions**

- `color-mix()` must use `in srgb` — `oklch` bends hazards hues.
- No `--danger` token — use `--destructive` / `--success` / `--warning` /
  `--info`. Chart palette = `--chart-1..5`.
- Widget titles are semantic headings (`<h3>`), not raw divs.
- Maschboard gallery in `CreateShowcase.tsx` uses pure-CSS masonry (`columns-*`);
  no measurement JS.

## Registry wiring

- When editing `react/ui/*`, the co-located helpers it imports (`carve-br.tsx`,
  `use-streetkid.ts`, etc.) must be added to that item's `files[]` in
  `react/registry.json`, then run `bun run scripts/build-registry.mjs`.
- `styles/theme.css` changes require a registry rebuild too (it feeds
  `styles/registry.json`).

## Testing

Vitest suite lives in `nextjs/src/**/*.test.ts(x)`. Unit tests cover the preset
codec, theme-store logic, and registry integrity. See `package.json` / `deno.json`
for the `test` task.

## Git & cleanliness

- Delete files with `unlink`/`rmdir` (the harness `rm -rf` on watched paths can
  hang); never `rm -rf .next`.
- `nextjs/.next`, `public/r/`, `node_modules/`, `.env*` are gitignored.
- Turbopack dev occasionally serves a stale globals CSS chunk after editing
  `theme.css`; verify against a fresh `next build`, not the dev cache.
