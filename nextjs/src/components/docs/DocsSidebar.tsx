import Link from "next/link";

const DOCS_SECTIONS = [
	{
		title: "Guide",
		items: [
			{ href: "/docs", label: "Overview", num: "01" },
			{ href: "/docs/cli", label: "CLI install", num: "02" },
			{ href: "/docs/manual", label: "Manual setup", num: "03" },
			{ href: "/docs/theming", label: "Theming & presets", num: "04" },
		],
	},
];

/** Docs sidebar — persistent section nav across all /docs subpages. */
export function DocsSidebar({ active }: { active: string }) {
	return (
		<div className="flex h-full flex-col gap-6 overflow-y-auto py-6 pr-4">
			<div className="px-2">
				<p className="pl-4 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
					Documentation
				</p>
				<p className="mt-0.5 pl-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/60">
					install · manual · theme
				</p>
			</div>

			<nav className="flex flex-col gap-6 px-2">
				{DOCS_SECTIONS.map((group) => (
					<div key={group.title}>
						<div className="flex items-baseline justify-between px-4">
							<p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
								{group.title}
							</p>
						</div>
						<div className="mt-2 flex flex-col gap-0.5">
							{group.items.map((item) => {
								const isActive =
									item.href === "/docs"
										? active === "/docs"
										: active.startsWith(item.href);
								return (
									<Link
										key={item.href}
										href={item.href}
										className={`flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-[0.8125rem] transition-colors ${
											isActive
												? "bg-primary/10 text-primary shadow-[var(--nf-glow-primary)]"
												: "text-muted-foreground hover:bg-glass hover:text-foreground"
										}`}
									>
										<span
											className={`size-1 rounded-full ${
												isActive ? "bg-primary" : "bg-glass-border"
											}`}
										/>
										<span className="text-primary/50">{item.num}</span>
										{item.label}
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</nav>

			<div className="mt-auto border-t border-glass-border px-2 pt-4">
				<p className="pl-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
					local registry · ghaerdi/neonforge
				</p>
			</div>
		</div>
	);
}
