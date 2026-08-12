import Link from "next/link";
import { COMPONENTS, GROUPS } from "../../lib/catalog";

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary/90">
            <span className="text-muted-foreground">[</span>CATALOG
            <span className="text-muted-foreground">]</span>
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
            Components
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Full parity with the shadcn/ui v4 docs catalog — {COMPONENTS.length}
            {" "}
            building blocks. Each page ships a live preview, the install command
            and the source.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {GROUPS.map((g) => (
            <section key={g.label}>
              <div className="mb-3 flex items-baseline gap-3">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  {g.label}
                </h2>
                <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                  [{g.items.length}]
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.items.map((name) => {
                  const item = COMPONENTS.find((c) => c.name === name);
                  return (
                    <Link
                      key={name}
                      href={`/components/${name}`}
                      className="group block"
                    >
                      <div className="glass-panel h-full rounded-lg p-4 transition-colors hover:border-primary/50 hover:shadow-[var(--nf-glow-primary)]">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-mono text-sm font-bold uppercase tracking-[0.15em]">
                            {item?.name ?? name}
                          </h3>
                          <span className="size-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary">
                            →
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item?.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
    </div>
  );
}
