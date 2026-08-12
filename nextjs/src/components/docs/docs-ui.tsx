/** Monospace inline code chip. */
export function Code({ children }: { children: React.ReactNode }) {
	return (
		<code className="rounded-sm border border-glass-border bg-secondary/20 px-1.5 py-0.5 font-mono text-[0.8125em] text-primary">
			{children}
		</code>
	);
}

/** Multi-line terminal block. */
export function Term({ title, lines }: { title: string; lines: string[] }) {
	return (
		<div className="mt-2 overflow-hidden rounded-md border border-black/20 bg-black/70">
			<div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
				<span className="size-2 rounded-full bg-destructive/80" />
				<span className="size-2 rounded-full bg-warning/80" />
				<span className="size-2 rounded-full bg-success/80" />
				<span className="ml-2 font-mono text-[0.625rem] uppercase tracking-widest text-white/60">
					{title}
				</span>
			</div>
			<div className="overflow-x-auto px-4 py-3 font-mono text-xs leading-6">
				{lines.map((l, i) => (
					<p key={i} className="whitespace-pre">
						<span className="select-none pr-2 text-primary/70">❯</span>
						<span className="text-white/85">{l}</span>
					</p>
				))}
			</div>
		</div>
	);
}

/** A bordered content card with an icon header. */
export function Card({
	icon,
	title,
	children,
}: {
	icon: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-lg border border-glass-border bg-secondary/10 p-5">
			<div className="flex items-center gap-2">
				<span className="grid size-8 shrink-0 place-items-center rounded-sm border border-glass-border bg-secondary/40 font-mono text-primary">
					{icon}
				</span>
				<h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
					{title}
				</h2>
			</div>
			<div className="mt-3 text-sm leading-6 text-muted-foreground">
				{children}
			</div>
		</div>
	);
}

/** A numbered documentation section with a title. */
export function Section({
	num,
	title,
	children,
}: {
	num: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="scroll-mt-24">
			<div className="mb-4 flex items-baseline gap-3">
				<span className="font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary/90">
					[{num}]
				</span>
				<h1 className="text-2xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
					{title}
				</h1>
			</div>
			<div className="flex flex-col gap-4">{children}</div>
		</section>
	);
}

/** Standard docs header block. */
export function DocsPageHeader({
	code,
	title,
	children,
}: {
	code: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<header className="mb-12">
			<p className="font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary/90">
				<span className="text-muted-foreground">[</span>
				{code}
				<span className="text-muted-foreground">]</span>
			</p>
			<h1 className="mt-3 text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
				{title}
			</h1>
			<p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
				{children}
			</p>
		</header>
	);
}
