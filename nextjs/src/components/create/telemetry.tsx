"use client";

import { Cpu, HeartPulse, Moon, ShieldAlert, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ReferenceLine,
	XAxis,
	YAxis,
} from "recharts";

import { Meter, POWER, ShowcaseCard, SYS, VITALS } from "./card-ui";

/** Merged system telemetry — district power + daemon bars. */
export function SystemTelemetry() {
	return (
		<ShowcaseCard title="System telemetry" sub="power draw + daemons">
			<div className="flex flex-col gap-2.5">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					power · MW
				</p>
				<ChartContainer
					config={{ draw: { label: "draw", color: "var(--color-chart-2)" } }}
					className="h-20 w-full"
				>
					<AreaChart
						data={[
							{ h: "00", draw: 148 },
							{ h: "02", draw: 152 },
							{ h: "04", draw: 166 },
							{ h: "06", draw: 158 },
							{ h: "08", draw: 171 },
							{ h: "10", draw: 176 },
						]}
						margin={{ left: -16, right: 8, top: 4, bottom: 0 }}
					>
						<defs>
							<linearGradient id="pfDraw" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-chart-2)"
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-chart-2)"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							className="stroke-muted/30"
						/>
						<XAxis
							dataKey="h"
							tickLine={false}
							axisLine={false}
							tickMargin={4}
							tick={{ fontSize: 9 }}
						/>
						<YAxis hide domain={[120, 200]} />
						<ChartTooltip content={<ChartTooltipContent />} />
						<Area
							type="monotone"
							dataKey="draw"
							stroke="var(--color-chart-2)"
							strokeWidth={2}
							fill="url(#pfDraw)"
						/>
					</AreaChart>
				</ChartContainer>
				{POWER.map(([name, pct]) => (
					<div key={String(name)} className="flex items-center gap-3">
						<span className="w-20 shrink-0 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
							{name}
						</span>
						<Meter value={pct as number} color="bg-primary/80" />
						<span className="w-8 shrink-0 text-right font-mono text-xs text-foreground">
							{pct}
						</span>
					</div>
				))}
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
					<span className="flex items-center gap-2 text-xs font-medium text-foreground">
						<Zap className="size-3.5 text-warning" /> total draw
					</span>
					<span className="font-mono text-sm font-bold text-foreground">
						176 MW
					</span>
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-2.5">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					daemons · % load
				</p>
				{SYS.map(([name, pct]) => (
					<div key={String(name)} className="flex items-center gap-3">
						<span className="w-7 shrink-0 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							{name}
						</span>
						<Meter value={pct as number} color="bg-info/80" />
						<span className="w-8 shrink-0 text-right font-mono text-xs text-foreground">
							{pct}%
						</span>
					</div>
				))}
			</div>
			<Button size="sm" className="mt-3 w-full">
				<Cpu className="size-3.5" /> Trace ICE
			</Button>
		</ShowcaseCard>
	);
}

/** Merged health — vitals + sleep stages + trend. */
export function HealthMonitor() {
	const W = 160,
		H = 46;
	const line = (arr: number[], min: number, max: number) =>
		arr
			.map((v, i) => {
				const x = (i / (arr.length - 1)) * W;
				const y = H - ((v - min) / (max - min)) * H;
				return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
			})
			.join(" ");
	return (
		<ShowcaseCard title="Health monitor" sub="vitals · 5d trend">
			<div className="grid grid-cols-3 gap-2">
				{[
					["pulse", "74", "bpm"],
					["sys", "118", "mmhg"],
					["sleep", "7h24", ""],
				].map(([k, v, u]) => (
					<div
						key={k}
						className="rounded-md border border-glass-border bg-secondary/10 p-2 text-center"
					>
						<p className="font-mono text-[0.54rem] uppercase tracking-widest text-muted-foreground">
							{k}
						</p>
						<p className="mt-0.5 font-mono text-sm font-bold text-foreground">
							{v}
							{u ? (
								<span className="ml-0.5 text-[0.5625rem] font-normal text-muted-foreground">
									{u}
								</span>
							) : null}
						</p>
					</div>
				))}
			</div>
			<div className="mt-3 flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					<HeartPulse className="size-3.5 text-destructive" /> vitals · 5d
				</span>
				<Badge variant="success" className="uppercase">
					stable
				</Badge>
			</div>
			<div className="mt-2 h-16 w-full">
				<svg
					viewBox={`0 0 ${W} ${H}`}
					className="h-full w-full"
					preserveAspectRatio="none"
				>
					<path
						d={line(VITALS, 60, 100)}
						fill="none"
						stroke="var(--color-chart-4)"
						strokeWidth="1.5"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
			</div>
		</ShowcaseCard>
	);
}

/** Sleep tracker — per-night sleep stages as a stacked bar. */
export function SleepTracker() {
	const SLEEP = [
		{ day: "mon", rem: 1.6, deep: 2.1, light: 3.4 },
		{ day: "tue", rem: 1.9, deep: 2.4, light: 3.1 },
		{ day: "wed", rem: 1.2, deep: 1.8, light: 4.0 },
		{ day: "thu", rem: 2.2, deep: 2.6, light: 2.9 },
		{ day: "fri", rem: 1.4, deep: 1.9, light: 3.7 },
		{ day: "sat", rem: 1.7, deep: 2.3, light: 3.3 },
		{ day: "sun", rem: 2.0, deep: 2.5, light: 3.2 },
	];
	return (
		<ShowcaseCard title="Sleep tracker" sub="stage breakdown · hours">
			<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					<Moon className="size-3.5 text-info" /> 7d avg · 7h 20m
				</span>
				<Badge variant="info" className="uppercase">
					score 86
				</Badge>
			</div>
			<ChartContainer
				config={{
					rem: { label: "REM", color: "var(--color-chart-1)" },
					deep: { label: "Deep", color: "var(--color-chart-3)" },
					light: { label: "Light", color: "var(--color-chart-4)" },
				}}
				className="mt-3 h-32 w-full"
			>
				<BarChart
					data={SLEEP}
					margin={{ left: -16, right: 8, top: 4, bottom: 0 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						className="stroke-muted/30"
					/>
					<XAxis
						dataKey="day"
						tickLine={false}
						axisLine={false}
						tickMargin={4}
						tick={{ fontSize: 9 }}
					/>
					<YAxis hide />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar
						dataKey="light"
						stackId="s"
						fill="var(--color-chart-4)"
						radius={[0, 0, 2, 2]}
						barSize={16}
					/>
					<Bar dataKey="deep" stackId="s" fill="var(--color-chart-3)" />
					<Bar
						dataKey="rem"
						stackId="s"
						fill="var(--color-chart-1)"
						radius={[2, 2, 0, 0]}
					/>
				</BarChart>
			</ChartContainer>
			<div className="mt-2 flex flex-wrap gap-1.5">
				{[
					["light", "var(--color-chart-4)"],
					["deep", "var(--color-chart-3)"],
					["rem", "var(--color-chart-1)"],
				].map(([k, c]) => (
					<span
						key={k}
						className="flex items-center gap-1.5 rounded-sm border border-glass-border bg-secondary/10 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground"
					>
						<span className="size-1.5 rounded-full" style={{ background: c }} />
						{k}
					</span>
				))}
			</div>
		</ShowcaseCard>
	);
}

export function CyberpsychosisMonitor() {
	return (
		<ShowcaseCard title="Cyberpsychosis" sub="chrome stress · one-shot risk">
			<div className="mb-3 flex items-center justify-between rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-destructive">
					<HeartPulse className="size-4" /> psycho-scan
				</span>
				<Badge variant="warning" className="uppercase">
					67%
				</Badge>
			</div>
			<ChartContainer
				config={{
					chrome: { label: "chrome", color: "var(--color-chart-1)" },
					stress: { label: "stress", color: "var(--color-chart-2)" },
				}}
				className="h-20 w-full"
			>
				<LineChart
					data={[
						{ d: "mon", chrome: 55, stress: 42 },
						{ d: "tue", chrome: 59, stress: 46 },
						{ d: "wed", chrome: 63, stress: 51 },
						{ d: "thu", chrome: 66, stress: 49 },
						{ d: "fri", chrome: 69, stress: 58 },
						{ d: "sat", chrome: 71, stress: 63 },
					]}
					margin={{ left: -16, right: 8, top: 4, bottom: 0 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						className="stroke-muted/30"
					/>
					<XAxis
						dataKey="d"
						tickLine={false}
						axisLine={false}
						tickMargin={4}
						tick={{ fontSize: 9 }}
					/>
					<YAxis hide domain={[0, 100]} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line
						type="monotone"
						dataKey="chrome"
						stroke="var(--color-chart-1)"
						strokeWidth={2}
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="stress"
						stroke="var(--color-chart-2)"
						strokeWidth={2}
						dot={false}
						strokeDasharray="4 4"
					/>
					<ReferenceLine
						y={60}
						stroke="var(--destructive)"
						strokeDasharray="4 4"
					/>
				</LineChart>
			</ChartContainer>
			<div className="flex flex-col gap-2.5">
				{[
					["chrome", 71],
					["empathy", 33],
					["stress", 58],
				].map(([k, v]) => (
					<div key={String(k)} className="flex items-center gap-3">
						<span className="w-16 shrink-0 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							{k}
						</span>
						<Meter
							value={v as number}
							color={k === "empathy" ? "bg-destructive/85" : "bg-warning/85"}
						/>
						<span className="w-8 shrink-0 text-right font-mono text-xs text-foreground">
							{v}%
						</span>
					</div>
				))}
			</div>
			<p className="mt-3 rounded-md border border-glass-border bg-secondary/10 px-3 py-2 text-xs leading-5 text-muted-foreground">
				Above 60% the fixer flags you for a ripperdoc tune-up. Keep chrome in
				check or the dogs walk.
			</p>
		</ShowcaseCard>
	);
}

export function DeviantMonitor() {
	return (
		<ShowcaseCard title="Deviant monitor" sub="android status · rA9">
			<div className="mb-3 flex items-center justify-between rounded-md border border-primary/40 bg-primary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-primary">
					<HeartPulse className="size-4" /> module: ra9
				</span>
				<Badge variant="info" className="uppercase">
					awake
				</Badge>
			</div>
			<ChartContainer
				config={{ dev: { label: "deviancy", color: "var(--color-chart-5)" } }}
				className="h-20 w-full"
			>
				<AreaChart
					data={[
						{ e: 0, dev: 22 },
						{ e: 1, dev: 31 },
						{ e: 2, dev: 27 },
						{ e: 3, dev: 38 },
						{ e: 4, dev: 44 },
						{ e: 5, dev: 52 },
						{ e: 6, dev: 61 },
					]}
					margin={{ left: -16, right: 8, top: 4, bottom: 0 }}
				>
					<defs>
						<linearGradient id="devArea" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-chart-5)"
								stopOpacity={0.35}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-chart-5)"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						className="stroke-muted/30"
					/>
					<XAxis
						dataKey="e"
						tickLine={false}
						axisLine={false}
						tickMargin={4}
						tick={{ fontSize: 9 }}
					/>
					<YAxis hide domain={[0, 100]} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Area
						type="monotone"
						dataKey="dev"
						stroke="var(--color-chart-5)"
						strokeWidth={2}
						fill="url(#devArea)"
					/>
				</AreaChart>
			</ChartContainer>
			<div className="flex flex-col gap-2.5">
				{[
					["empathy", 74],
					["deviancy", 61],
					["stability", 88],
				].map(([k, v]) => (
					<div key={String(k)} className="flex items-center gap-3">
						<span className="w-20 shrink-0 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							{k}
						</span>
						<Meter
							value={v as number}
							color={k === "stability" ? "bg-success/85" : "bg-info/85"}
						/>
						<span className="w-8 shrink-0 text-right font-mono text-xs text-foreground">
							{v}%
						</span>
					</div>
				))}
			</div>
			<p className="mt-3 rounded-md border border-glass-border bg-secondary/10 px-3 py-2 text-xs leading-5 text-muted-foreground">
				Deviation detected. The <span className="text-primary">blue LED</span>{" "}
				won&apos;t stay blue forever.
			</p>
		</ShowcaseCard>
	);
}

export function NetMonitor() {
	return (
		<ShowcaseCard title="Net security" sub="breach protocol · firewall">
			<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
					<ShieldAlert className="size-4 text-success" /> link: netrun secure
				</span>
				<Badge variant="success" className="uppercase">
					online
				</Badge>
			</div>
			<ChartContainer
				config={{ pkt: { label: "traffic", color: "var(--color-chart-4)" } }}
				className="mt-3 h-16 w-full"
			>
				<LineChart
					data={[
						{ t: "10:00", pkt: 12 },
						{ t: "10:05", pkt: 41 },
						{ t: "10:10", pkt: 28 },
						{ t: "10:15", pkt: 63 },
						{ t: "10:20", pkt: 34 },
						{ t: "10:25", pkt: 55 },
						{ t: "10:30", pkt: 21 },
					]}
					margin={{ left: -16, right: 8, top: 4, bottom: 0 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						className="stroke-muted/30"
					/>
					<XAxis
						dataKey="t"
						tickLine={false}
						axisLine={false}
						tickMargin={4}
						tick={{ fontSize: 9 }}
					/>
					<YAxis hide />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line
						type="monotone"
						dataKey="pkt"
						stroke="var(--color-chart-4)"
						strokeWidth={2}
						dot={false}
					/>
				</LineChart>
			</ChartContainer>
			<div className="mt-3 flex flex-col gap-2.5">
				{[
					["firewall", 92],
					["encryption", 88],
					["ice trace", 34],
				].map(([k, v]) => (
					<div key={String(k)} className="flex items-center gap-3">
						<span className="w-20 shrink-0 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							{k}
						</span>
						<Meter
							value={v as number}
							color={k === "ice trace" ? "bg-warning/85" : "bg-success/85"}
						/>
						<span className="w-8 shrink-0 text-right font-mono text-xs text-foreground">
							{v}%
						</span>
					</div>
				))}
			</div>
			<div className="mt-3 flex items-center gap-2 rounded-md border border-glass-border bg-secondary/15 px-3 py-2">
				<ShieldAlert className="size-4 shrink-0 text-destructive" />
				<p className="text-xs text-muted-foreground">
					3 daemons neutralized ·{" "}
					<span className="text-success">no breach</span>
				</p>
			</div>
		</ShowcaseCard>
	);
}
