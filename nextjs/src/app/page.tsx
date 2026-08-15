import Link from "next/link";
import { Shell } from "@/components/docs/shell";
import { COMPONENTS } from "../lib/catalog";

const FEATURES = [
  {
    to: "/components",
    title: "Components",
    sub: `${COMPONENTS.length} production-ready building blocks`,
    body:
      "Every shadcn/ui v4 component, restyled for the neonforge industrial-glass language — browse live previews, install commands and source.",
    cta: "Browse components",
  },
  {
    to: "/create",
    title: "Create",
    sub: "font + chart + theme axes",
    body:
      "Build your own theme — base surface, accent, chart palette, body font, heading font and corner shape. Generate CSS or a shareable preset key.",
    cta: "Build a preset",
  },
  {
    to: "/docs",
    title: "Docs",
    sub: "get started · manual · cli",
    body:
      "How to get started with neonforge — the install command, the manual copy-files approach for adding a component without the CLI, and the full npx CLI workflow.",
    cta: "Read the docs",
  },
];

const icons = ["▦", "◈", "⊞", "▥"];

export default function HomePage() {
  return (
    <Shell active="/">
      <div className="mx-auto max-w-4xl">
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 grid-bg-neon opacity-40" />
          <div className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-sm border border-glass-border bg-secondary/30 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary/90">
              <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[var(--nf-glow-primary)]" />
              shadcn component registry — cyberpunk edition
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-6xl">
              Industrial glass
              <span className="text-primary">components</span> for the{" "}
              <span className="font-serif lowercase italic">shadcn</span> CLI
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground">
              Neonforge is a drop-in registry for shadcn/ui — every component
              from the v4 catalog, re-skinned in a cyberpunk industrial-glass
              language: chamfered corners, hazard-yellow accents, restrained
              neon glow. Install with one command, theme it with presets.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/create"
                className="group inline-flex items-center gap-2 bg-primary px-8 py-3 text-base text-primary-foreground"
                style={{
                  clipPath:
                    "polygon(0 0.65rem, 0.65rem 0, 100% 0, 100% calc(100% - 0.65rem), calc(100% - 0.65rem) 100%, 0 100%)",
                }}
              >
                ◈ Create a theme
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center gap-2 border border-glass-border bg-glass px-8 py-3 text-base text-foreground hover:bg-glass-hover hover:border-primary/50 hover:text-primary"
              >
                Browse components
              </Link>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
                Install
              </p>
              <div className="flex items-center gap-2 rounded-md border border-input bg-foreground/5 px-4 py-3">
                <span className="shrink-0 font-mono text-primary">❯</span>
                <code className="overflow-x-auto whitespace-nowrap font-mono text-xs text-foreground">
                  npx shadcn@latest add{" "}
                  <span className="text-primary">ghaerdi/neonforge</span>
                </code>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <p className="font-mono text-2xl font-bold tracking-tight text-foreground">
                  {COMPONENTS.length}
                  <span className="text-primary">.</span>
                </p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
                  components
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold tracking-tight text-foreground">
                  60/60<span className="text-primary">.</span>
                </p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
                  v4 catalog parity
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold tracking-tight text-foreground">
                  5<span className="text-primary">.</span>
                </p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">
                  font + theme axes
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Explore
            </h2>
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
              [ 03 sections ]
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Link key={f.to} href={f.to} className="group block">
                <div className="glass-panel h-full rounded-lg p-5 transition-colors hover:border-primary/50 hover:shadow-[var(--nf-glow-primary)]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-sm border border-glass-border bg-secondary/40 font-mono text-primary">
                      {icons[i]}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground group-hover:text-primary">
                      {f.sub}
                    </span>
                  </div>
                  <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {f.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-primary/80 transition-colors group-hover:text-primary">
                    {f.cta}
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
