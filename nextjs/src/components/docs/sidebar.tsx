import Link from "next/link";
import { COMPONENTS, GROUPS } from "../../lib/catalog";

function SidebarLink({
	href,
	active,
	children,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-[0.8125rem] transition-colors ${
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
			{children}
		</Link>
	);
}

/** Component-catalog sidebar — nav groups only (page links live in the top bar). */
export function ComponentSidebar({ active }: { active: string }) {
	return (
		<div className="flex h-full flex-col gap-6 overflow-y-auto py-6 pr-4">
			<div>
				<p className="pl-6 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
					Catalog
				</p>
				<p className="mt-0.5 pl-6 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/60">
					{COMPONENTS.length} components · {GROUPS.length} groups
				</p>
			</div>

			<nav className="flex flex-col gap-6 px-2">
				<div>
					<Link
						href="/components"
						className={`mb-1 flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-[0.8125rem] transition-colors ${
							active === "/components"
								? "bg-primary/10 text-primary shadow-[var(--nf-glow-primary)]"
								: "text-foreground hover:bg-glass"
						}`}
					>
						<span
							className={`size-1 rounded-full ${
								active === "/components" ? "bg-primary" : "bg-glass-border"
							}`}
						/>
						All components
					</Link>
				</div>

				{GROUPS.map((g) => (
					<div key={g.label}>
						<div className="flex items-baseline justify-between pl-6 pr-1">
							<p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
								{g.label}
							</p>
							<span className="font-mono text-[0.5625rem] text-muted-foreground/40">
								{g.items.length}
							</span>
						</div>
						<div className="mt-2 flex flex-col gap-0.5">
							{g.items.map((name) => (
								<SidebarLink
									key={name}
									href={`/components/${name}`}
									active={active === `/components/${name}`}
								>
									{name}
								</SidebarLink>
							))}
						</div>
					</div>
				))}
			</nav>

			<div className="mt-auto border-t border-glass-border px-2 pt-4">
				<p className="pl-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
					{COMPONENTS.length} components · v4 catalog
				</p>
				<p className="mt-1 pl-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground/70">
					local registry · ghaerdi/neonforge
				</p>
			</div>
		</div>
	);
}
