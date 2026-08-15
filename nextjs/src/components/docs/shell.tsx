import type { ReactNode } from "react";
import Link from "next/link";

import { Github, Zap } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
const PAGES = [
	{ href: "/", label: "Home" },
	{ href: "/components", label: "Components" },
	{ href: "/create", label: "Create" },
	{ href: "/docs", label: "Docs" },
];

function isActive(href: string, active: string): boolean {
	if (href === "/components") {
		return active === "/components" || active.startsWith("/components/");
	}
	return active === href;
}

function currentLabel(path: string): string {
	if (path.startsWith("/components/")) {
		return `components / ${path.split("/")[2]}`;
	}
	return path === "/"
		? "Home"
		: path === "/create"
			? "Create"
			: path === "/docs"
				? "Docs"
				: "Components";
}

function NavLink({
	href,
	label,
	active,
}: {
	href: string;
	label: string;
	active: boolean;
}) {
	return (
		<Link
			href={href}
			className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-mono text-[0.8125rem] uppercase tracking-[0.15em] transition-colors ${
				active
					? "bg-primary/10 text-primary shadow-[var(--nf-glow-primary)]"
					: "text-muted-foreground hover:bg-glass hover:text-foreground"
			}`}
		>
			<span
				className={`size-1 rounded-full ${
					active ? "bg-primary" : "bg-glass-border"
				}`}
			/>
			{label}
		</Link>
	);
}

/** Docs shell — industrial grid + optional sidebar + top-bar nav + footer. */
export function Shell({
	active,
	sidebar,
	children,
}: {
	active: string;
	sidebar?: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="relative min-h-svh overflow-x-clip">
			{/* fixed industrial grid + ambient glow */}
			<div className="pointer-events-none fixed inset-0 -z-10">
				<div className="absolute inset-0 grid-bg" />
				<div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/6 blur-[120px]" />
				<div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-info/6 blur-[120px]" />
			</div>

			{sidebar ? (
				<aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-glass-border bg-background/80 backdrop-blur-xl lg:block">
					{sidebar}
				</aside>
			) : null}

			<div className={sidebar ? "lg:pl-72" : ""}>
				<header className="sticky top-0 z-20 border-b border-glass-border bg-background/80 backdrop-blur-xl">
					<div className="flex h-14 items-center gap-2 px-4 sm:px-6">
						<Link href="/" className="group flex items-center gap-2.5">
							<span className="relative block size-9 shrink-0">
								<svg
									viewBox="0 0 36 36"
									className="absolute inset-0 size-full text-primary"
									aria-hidden="true"
								>
									{/* chamfered frame: outer = border, inner = bg fill.
											Because the border IS a chamfered polygon, clip-path
											never slices it — the edge follows the chamfer exactly. */}
									<polygon
										points="7,0 36,0 36,29 29,36 0,36 0,7"
										fill="color-mix(in srgb, var(--primary) 60%, transparent)"
									/>
									<polygon
										points="8.5,1.5 34.5,1.5 34.5,27.5 27.5,34.5 1.5,34.5 1.5,8.5"
										fill="var(--background)"
									/>
								</svg>
								<Zap
									className="absolute inset-0 m-auto size-[1.15rem] text-primary"
									strokeWidth={2.5}
									fill="currentColor"
									fillOpacity={0.25}
								/>
							</span>
							<span className="hidden font-mono text-sm font-bold uppercase tracking-[0.25em] text-foreground sm:inline">
								Neon<span className="text-primary">forge</span>
							</span>
						</Link>

						<nav className="ml-2 flex items-center gap-0.5 overflow-x-auto md:ml-6">
							{PAGES.map((p) => (
								<NavLink
									key={p.href}
									href={p.href}
									label={p.label}
									active={isActive(p.href, active)}
								/>
							))}
						</nav>

						<span className="ml-auto hidden shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground/60 lg:inline">
							{currentLabel(active)}
						</span>
						<span className="ml-auto flex items-center gap-2 lg:ml-0">
							<a
								href="https://github.com/ghaerdi/neonforge"
								target="_blank"
								rel="noreferrer"
								className="grid size-8 place-items-center rounded-sm border border-glass-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary hover:shadow-[var(--nf-glow-primary)]"
								aria-label="Neonforge on GitHub"
							>
								<Github className="size-[1.05rem]" strokeWidth={2} />
							</a>
							<ThemeToggle />
						</span>
					</div>
				</header>

				<main className="px-4 py-10 sm:px-8">{children}</main>

				<footer className="mt-16 border-t border-glass-border">
					<div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,var(--primary)_0_12px,transparent_12px_24px)] opacity-60" />
					<div className="flex flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
						<span className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-muted-foreground">
							Neonforge — cyberpunk glass registry
						</span>
						<p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground/70">
							Powered by shadcn/ui · react 19 · tailwind v4
						</p>
					</div>
				</footer>
			</div>
		</div>
	);
}
