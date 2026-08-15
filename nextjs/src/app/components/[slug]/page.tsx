import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DemoViewer } from "@/components/demos/DemoViewer";
import { CopyButton } from "@/components/CopyButton";
import { CATALOG_ORDER, COMPONENTS, groupOf, INSTALL_CMD } from "../../../lib/catalog";
import { match, Result } from "@ghaerdi/rustify";

function loadSource(name: string): Result<string, { kind: "unavailable" }> {
  return Result.from(
    () => fs.readFileSync(path.join(process.cwd(), "../react/ui", `${name}.tsx`), "utf8"),
    () => ({ kind: "unavailable" }),
  );
}

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.name }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = COMPONENTS.find((c) => c.name === slug);
  if (!item) return null;
  const group = groupOf(item.name);
  const install = INSTALL_CMD(item.name);
  const index = CATALOG_ORDER.indexOf(item.name);
  const prevName = CATALOG_ORDER[index - 1];
  const nextName = CATALOG_ORDER[index + 1];
  const prev = prevName ? COMPONENTS.find((c) => c.name === prevName) : undefined;
  const next = nextName ? COMPONENTS.find((c) => c.name === nextName) : undefined;
  const source = loadSource(item.name);
  const sourceLabel = match(source)
    .with(Result.ok, (s) => `${s.split("\n").length} lines`)
    .with(Result.err, () => "unavailable")
    .exhaustive();
  const sourceText = match(source)
    .with(Result.ok, (s) => s)
    .with(Result.err, () => `// no source found for ${item.name}`)
    .exhaustive();
  const sourceAvailable = source.isOk();
  const brPoly =
    "polygon(0 0, 100% 0, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0 100%)";

  return (
    <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="text-primary">{group}</span>
            <span className="mx-2 text-glass-border">/</span>
            {item.name}
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-input bg-foreground/5 px-4 py-2.5 font-mono text-xs text-foreground backdrop-blur-md">
              {install}
            </code>
            <CopyButton value={install} label="copy" />
          </div>
          {item.dependencies?.length
            ? (
              <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                deps: {item.dependencies.join(" · ")}
              </p>
            )
            : null}
        </header>

        <hr className="mb-8 border-glass-border" />

        <section className="mb-10">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Preview
            </h2>
            <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
              live demo
            </span>
          </div>
          <DemoViewer slug={slug} />
        </section>

        <section className="mb-10">
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Source
            </h2>
            <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
              ui/{item.name}.tsx
            </span>
          </div>
          <div className="overflow-hidden rounded-md border border-input bg-foreground/5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 border-b border-input px-4 py-2">
              <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                component source
              </span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground/60">
                  {sourceLabel}
                </span>
                {sourceAvailable ? <CopyButton value={sourceText} label="copy" /> : null}
              </span>
            </div>
            <pre className="max-h-96 overflow-auto p-4 font-mono text-[0.6875rem] leading-relaxed text-foreground/90">
              {sourceText}
            </pre>
          </div>
        </section>

        <nav className="mt-12 flex items-center justify-between gap-4">
          {prev
            ? (
              <Link
                href={`/components/${prev.name}`}
                className="group flex-1"
                style={{
                  clipPath: brPoly,
                  background: "var(--nf-glass-border)",
                  padding: "1px",
                }}
              >
                <div
                  className="bg-card p-4 transition-colors group-hover:bg-secondary/20"
                  style={{ clipPath: brPoly }}
                >
                  <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                    ← previous
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold uppercase tracking-[0.15em]">
                    {prev.name}
                  </p>
                </div>
              </Link>
            )
            : <div className="flex-1" />}
          {next
            ? (
              <Link
                href={`/components/${next.name}`}
                className="group flex-1"
                style={{
                  clipPath: brPoly,
                  background: "var(--nf-glass-border)",
                  padding: "1px",
                }}
              >
                <div
                  className="bg-card p-4 text-right transition-colors group-hover:bg-secondary/20"
                  style={{ clipPath: brPoly }}
                >
                  <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                    next →
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold uppercase tracking-[0.15em]">
                    {next.name}
                  </p>
                </div>
              </Link>
            )
            : null}
        </nav>
    </div>
  );
}
