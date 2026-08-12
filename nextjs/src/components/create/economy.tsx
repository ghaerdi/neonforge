"use client";

import {
	ArrowDownRight,
	ArrowUpRight,
	Bike,
	CreditCard,
	Map,
	MapPin,
	Newspaper,
	Package,
	Plane,
	RefreshCw,
	Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

import { Meter, ShowcaseCard, TXNS } from "./card-ui";

export function BankWidget() {
	return (
		<ShowcaseCard title="Bank" sub="neon-forge savings · ¥">
			<div className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2.5">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					available
				</p>
				<p className="mt-1 font-mono text-2xl font-bold text-foreground">
					¥<span className="text-primary">1,284,500</span>
				</p>
			</div>
			<ChartContainer
				config={{
					core: { label: "core", color: "var(--color-chart-1)" },
					ops: { label: "ops", color: "var(--color-chart-2)" },
					rd: { label: "r&d", color: "var(--color-chart-3)" },
					cont: { label: "contingency", color: "var(--color-chart-4)" },
				}}
				className="mx-auto mt-2 aspect-square h-36"
			>
				<PieChart>
					<Pie
						data={[
							{ name: "core", value: 40, fill: "var(--color-chart-1)" },
							{ name: "ops", value: 28, fill: "var(--color-chart-2)" },
							{ name: "r&d", value: 20, fill: "var(--color-chart-3)" },
							{ name: "cont", value: 12, fill: "var(--color-chart-4)" },
						]}
						dataKey="value"
						nameKey="name"
						innerRadius={40}
						outerRadius={62}
						strokeWidth={2}
						paddingAngle={2}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
				</PieChart>
			</ChartContainer>
			<p className="mt-1 text-center font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
				expense split · last cycle
			</p>
			<div className="mt-2 flex flex-col gap-2">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					cards
				</p>
				{[
					["Zetatech · •••• 8831", "Wallet"],
					["Trauma Team · •••• 0012", "CreditCard"],
				].map(([k, icon]) => (
					<div
						key={k}
						className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
					>
						<span className="flex items-center gap-2 text-xs text-foreground">
							{icon === "Wallet" ? (
								<Wallet className="size-3.5 text-primary" />
							) : (
								<CreditCard className="size-3.5 text-info" />
							)}
							{k}
						</span>
						<Badge
							variant="outline"
							className="font-mono text-[0.5625rem] uppercase"
						>
							active
						</Badge>
					</div>
				))}
			</div>
			<div className="mt-2 flex flex-col gap-2">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					recent
				</p>
				{TXNS.map((r) => (
					<div
						key={r[0]}
						className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
					>
						<div className="min-w-0">
							<p className="truncate text-xs text-foreground">{r[1]}</p>
							<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
								{r[0]}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<span
								className={`font-mono text-xs ${r[2].startsWith("+") ? "text-success" : "text-foreground"}`}
							>
								{r[2]}
							</span>
							<Badge
								variant={r[3] === "cleared" ? "success" : "warning"}
								className="uppercase"
							>
								{r[3]}
							</Badge>
						</div>
					</div>
				))}
			</div>
			<div className="mt-3 flex gap-2">
				<Button size="sm" className="flex-1">
					<ArrowDownRight className="size-3.5" /> Add
				</Button>
				<Button size="sm" variant="outline" clip="none" className="flex-1">
					<ArrowUpRight className="size-3.5" /> Withdraw
				</Button>
			</div>
		</ShowcaseCard>
	);
}

export function NewsWidget() {
	const items = [
		["Arasaka expands SaKatsu into Watson", "corp", "12m"],
		["Council approves netwatch sweep", "city", "38m"],
		["Cyberpsycho sighting — sector 9", "alert", "1h"],
	];
	return (
		<ShowcaseCard title="News" sub="night city · datacast">
			<div className="flex flex-col gap-2.5">
				{items.map(([head, tag, ago], i) => (
					<div
						key={i}
						className="flex items-start gap-2.5 rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
					>
						<Newspaper className="mt-0.5 size-3.5 shrink-0 text-primary" />
						<div className="min-w-0 flex-1">
							<p className="text-xs leading-5 text-foreground">{head}</p>
							<p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
								{tag} · {ago}
							</p>
						</div>
						<ArrowUpRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/40" />
					</div>
				))}
			</div>
			<Button size="sm" variant="ghost" className="mt-2 w-full">
				<RefreshCw className="size-3.5" /> Refresh feed
			</Button>
		</ShowcaseCard>
	);
}

export function TravelWidget() {
	return (
		<ShowcaseCard title="Travel" sub="fast-travel · Metro NC">
			<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
					<MapPin className="size-4 text-primary" /> auto-travel hub
				</span>
				<Badge variant="info" className="uppercase">
					12 stops
				</Badge>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				{[
					["Watson → Japantown", "4 min"],
					["Watson → City Center", "11 min"],
					["Watson → Pacifica", "24 min"],
				].map(([route, dur]) => (
					<div
						key={route}
						className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
					>
						<span className="flex items-center gap-2 text-xs text-foreground">
							<Plane className="size-3.5 text-primary" />
							{route}
						</span>
						<span className="font-mono text-xs text-muted-foreground">
							{dur}
						</span>
					</div>
				))}
			</div>
			<Button size="sm" className="mt-2 w-full">
				<Map className="size-3.5" /> Plan route
			</Button>
		</ShowcaseCard>
	);
}

export function DeliveryWidget() {
	return (
		<ShowcaseCard title="Delivery" sub="courier · pacifica pack">
			<div className="rounded-md border border-glass-border bg-secondary/10 px-3 py-2.5">
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-2 text-xs text-foreground">
						<Package className="size-3.5 text-primary" /> Burrito XL · Kabuki
					</span>
					<Badge variant="success" className="uppercase">
						en route
					</Badge>
				</div>
				<p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					ETR 12 min · order #7721
				</p>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				{[
					["picked up", "done"],
					["in transit", "active"],
					["delivery", "pending"],
				].map(([step, state]) => (
					<div key={step} className="flex items-center gap-2.5">
						<span
							className={`size-2.5 rounded-full border ${state === "done" ? "border-success bg-success" : state === "active" ? "border-primary bg-primary animate-pulse" : "border-glass-border bg-glass"}`}
						/>
						<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
							{state === "active" ? (
								<Bike className="size-3.5 text-primary" />
							) : null}
							{step}
						</span>
						{state === "active" ? (
							<span className="ml-auto text-xs text-foreground">
								out for delivery
							</span>
						) : null}
					</div>
				))}
			</div>
		</ShowcaseCard>
	);
}

/** Miscellaneous world widgets — mini-map, loadout, deals. */
export function WorldWidgets() {
	return (
		<>
			<ShowcaseCard title="Mini-map" sub="Watson · district nav">
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
					<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
						<Map className="size-4 text-primary" /> route: kabuki → jig-jig
					</span>
				</div>
				<div className="mt-3 grid grid-cols-4 gap-1.5">
					{Array.from({ length: 12 }).map((_, i) => (
						<div
							key={i}
							className={`h-8 rounded-sm border border-glass-border ${i % 5 === 0 ? "bg-primary/20" : "bg-secondary/10"}`}
						/>
					))}
				</div>
				<div className="mt-2 flex justify-between font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					<span>length 8.2 km</span>
					<span className="text-primary">paranoia ↑</span>
				</div>
			</ShowcaseCard>

			<ShowcaseCard title="Loadout" sub="chrome + gigs">
				<div className="flex flex-col gap-2">
					{[
						["Sandevistan", "tier 4", 23],
						["Kiroshi optics", "tier 5", 18],
						["Gorilla arms", "tier 3", 11],
					].map(([name, tier, cap]) => (
						<div
							key={String(name)}
							className="flex flex-col gap-1 rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
						>
							<div className="flex items-center justify-between">
								<span className="text-xs text-foreground">{name}</span>
								<Badge
									variant="outline"
									className="font-mono text-[0.5625rem] uppercase"
								>
									{tier}
								</Badge>
							</div>
							<div className="flex items-center gap-2">
								<Meter value={cap as number} color="bg-primary/70" />
								<span className="w-7 shrink-0 text-right font-mono text-[0.5625rem] text-muted-foreground">
									{cap}%
								</span>
							</div>
						</div>
					))}
				</div>
			</ShowcaseCard>

			<ShowcaseCard title="Fixer deals" sub="open gigs">
				<div className="flex flex-col gap-2">
					{[
						["The Pickup", "¥12k", "active"],
						["The Heist", "¥60k", "new"],
						["Cyberpsycho", "¥8k", "high risk"],
					].map(([gig, pay, tag]) => (
						<div
							key={String(gig)}
							className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
						>
							<span className="text-xs text-foreground">{gig}</span>
							<div className="flex items-center gap-2">
								<span className="font-mono text-xs text-success">{pay}</span>
								<Badge
									variant={
										tag === "high risk"
											? "destructive"
											: tag === "new"
												? "info"
												: "outline"
									}
									className="font-mono text-[0.5rem] uppercase"
								>
									{tag}
								</Badge>
							</div>
						</div>
					))}
				</div>
			</ShowcaseCard>
		</>
	);
}
