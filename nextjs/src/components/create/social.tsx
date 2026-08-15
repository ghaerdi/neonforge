"use client";

import * as React from "react";

import {
	Headphones,
	MessageCircle,
	Pause,
	Phone,
	Play,
	Radio,
	Send,
	Skull,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
	Bar,
	BarChart,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	XAxis,
	YAxis,
} from "recharts";

import { ShowcaseCard } from "./card-ui";

export function ProfileWidget() {
	return (
		<ShowcaseCard title="Profile" sub="operator · cyberdeck">
			<div className="flex items-center gap-3">
				<Avatar clipCut={0.7} className="size-12">
					<AvatarFallback className="bg-gradient-to-br from-primary to-info font-mono text-sm text-background">
						V
					</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-semibold text-foreground">
						Vincent · “V”
					</p>
					<p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
						merc · streetkid 47
					</p>
				</div>
				<Badge variant="success" className="uppercase">
					linked
				</Badge>
			</div>
			<div className="mt-3 grid grid-cols-3 gap-2">
				{[
					["street cred", "62"],
					["rep", "A+"],
					["heat", "2/5"],
				].map(([k, v]) => (
					<div
						key={k}
						className="rounded-md border border-glass-border bg-secondary/10 p-2 text-center"
					>
						<p className="font-mono text-[0.54rem] uppercase tracking-widest text-muted-foreground">
							{k}
						</p>
						<p
							className={`mt-0.5 font-mono text-sm font-bold ${k === "heat" ? "text-destructive" : "text-primary"}`}
						>
							{v}
						</p>
					</div>
				))}
			</div>
			<ChartContainer
				config={{ sk: { label: "skill", color: "var(--color-chart-3)" } }}
				className="mt-3 h-40 w-full"
			>
				<RadarChart
					data={[
						{ a: "stealth", v: 78 },
						{ a: "tech", v: 64 },
						{ a: "assault", v: 82 },
						{ a: "netrun", v: 55 },
						{ a: "hack", v: 70 },
						{ a: "reflex", v: 88 },
					]}
					outerRadius={62}
				>
					<PolarGrid strokeDasharray="3 3" className="stroke-muted/30" />
					<PolarAngleAxis dataKey="a" tick={{ fontSize: 9 }} />
					<PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
					<Radar
						dataKey="v"
						stroke="var(--color-chart-3)"
						fill="var(--color-chart-3)"
						fillOpacity={0.25}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
				</RadarChart>
			</ChartContainer>
			<div className="mt-3 flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					<Skull className="size-3.5 text-destructive" /> NCPD wanted
				</span>
				<Badge variant="destructive" className="uppercase">
					bounty ¥4k
				</Badge>
			</div>
		</ShowcaseCard>
	);
}

/** Discord-style profile card — banner, overlapping avatar, status, activity. */
export function DiscordProfile() {
	return (
		<ShowcaseCard title="Network profile" sub="shared server · after-life">
			{/* banner */}
			<div className="relative -mt-1 h-20 overflow-hidden rounded-md border border-glass-border bg-[repeating-linear-gradient(135deg,var(--primary)_0_14px,transparent_14px_28px)] opacity-90" />
			{/* avatar + status overlapping the banner */}
			<div className="relative mt-0 flex items-end gap-3 px-1">
				<div className="relative -mt-8">
					<Avatar
						clipCut={1.1}
						className="size-20 border-[3px] border-background shadow-[var(--nf-glow-primary)]"
					>
						<AvatarFallback className="bg-gradient-to-br from-primary to-info font-mono text-xl text-background">
							V
						</AvatarFallback>
					</Avatar>
					{/* online triangle filling the BR-clip notch with a gap to the cut edge */}
					<span
						className="pointer-events-none absolute bottom-0 right-0 size-[1.1rem] bg-success"
						aria-label="online"
						style={{ clipPath: "polygon(0.3rem 1.1rem, 1.1rem 0.3rem, 1.1rem 1.1rem)" }}
					/>
				</div>
				<div className="min-w-0 flex-1 pb-1">
					<p className="truncate text-base font-semibold text-foreground">
						Vincent
						<span className="ml-2 font-mono text-xs font-normal text-muted-foreground">
							#8842
						</span>
					</p>
					<div className="mt-0.5 flex flex-wrap items-center gap-2">
						<Badge variant="info" className="uppercase">
							netrunner
						</Badge>
						<span className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							streetkid · NC
						</span>
					</div>
				</div>
				<Button
					size="icon"
					variant="outline"
					clip="none"
					className="size-8 shrink-0"
					aria-label="Message"
				>
					<MessageCircle className="size-3.5" />
				</Button>
			</div>

			{/* about / custom status */}
			<div className="mt-3 rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					about me
				</p>
				<p className="mt-1 text-xs leading-5 text-foreground">
					Night City fixer. Don&apos;t ask about the arm.{" "}
					<span className="text-primary">Gig wages negotiable.</span>
				</p>
				<p className="mt-1.5 flex items-center gap-1.5 text-xs text-primary">
					<Headphones className="size-3.5" /> Listening to CRITICAL ROLEBOT
				</p>
			</div>

			{/* roles + activity */}
			<div className="mt-3 grid grid-cols-2 gap-2">
				<div className="rounded-md border border-glass-border bg-secondary/10 p-2.5">
					<p className="font-mono text-[0.54rem] uppercase tracking-widest text-muted-foreground">
						roles
					</p>
					<div className="mt-1.5 flex flex-wrap gap-1">
						<Badge
							variant="outline"
							className="font-mono text-[0.5625rem] uppercase"
						>
							solo
						</Badge>
						<Badge
							variant="destructive"
							className="font-mono text-[0.5625rem] uppercase"
						>
							cyberpsycho-alert
						</Badge>
					</div>
				</div>
				<div className="rounded-md border border-glass-border bg-secondary/10 p-2.5">
					<p className="font-mono text-[0.54rem] uppercase tracking-widest text-muted-foreground">
						member
					</p>
					<p className="mt-1 text-xs text-foreground">joined 2074</p>
					<p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						status · <span className="text-success">online</span>
					</p>
				</div>
			</div>
		</ShowcaseCard>
	);
}

/** Merged messenger — contact, call, thread. */
export function Messenger() {
	const [msg, setMsg] = React.useState("");
	const [onCall, setOnCall] = React.useState(false);
	const [thread, setThread] = React.useState([
		{ from: "them", text: "Package is at the drop on Kabuki." },
		{ from: "me", text: "On my way. 10 minutes." },
	]);
	const send = () => {
		if (!msg.trim()) return;
		setThread((t) => [...t, { from: "me", text: msg }]);
		setMsg("");
	};
	return (
		<ShowcaseCard title="Messenger" sub="Wakako Okada · fixer">
			<div className="flex items-center gap-3 rounded-md border border-glass-border bg-secondary/15 px-3 py-2.5">
				<Avatar className="size-10">
					<AvatarFallback className="font-mono">W</AvatarFallback>
				</Avatar>
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-semibold text-foreground">
						Wakako Okada
					</p>
					<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						{onCall ? "in call · 01:47" : "online"}
					</p>
				</div>
				<Button
					size="icon"
					variant={onCall ? "destructive" : "outline"}
					clip="none"
					onClick={() => setOnCall((c) => !c)}
					className="size-8 shrink-0"
					aria-label={onCall ? "End call" : "Call"}
				>
					<Phone className="size-3.5" />
				</Button>
			</div>
			<div className="mt-2.5 flex h-36 flex-col gap-2 overflow-y-auto rounded-md border border-glass-border bg-secondary/10 p-2.5">
				{thread.map((m, i) => (
					<div
						key={i}
						className={`max-w-[80%] rounded-md px-2.5 py-1.5 text-xs ${m.from === "me" ? "ml-auto bg-primary/15 text-foreground" : "bg-glass text-muted-foreground"}`}
					>
						{m.text}
					</div>
				))}
			</div>
			<div className="mt-2.5 flex gap-2">
				<Input
					value={msg}
					clip="none"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setMsg(e.target.value)
					}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
						e.key === "Enter" && send()
					}
					placeholder="Message…"
					className="h-8 text-xs"
				/>
				<Button size="sm" clip="br" onClick={send} className="h-8 shrink-0">
					<Send className="size-3.5" />
				</Button>
			</div>
		</ShowcaseCard>
	);
}

/** Merged radio + music player. */
export function MusicPlayer() {
	const tracks = [
		["Cannibal Queen — Mannim", "Resist & Disorder"],
		["Rite of the End — SAMURAI", "Black Dog"],
		["Night City Anthem", "Veuclid"],
	];
	const stations = [
		["Pacifica FM", "103.1"],
		["Morro Rock", "Rock 91.9"],
		["Night City Radio", "92.0"],
	];

	const [playing, setPlaying] = React.useState(false);
	const [trackIdx, setTrackIdx] = React.useState(0);
	const [station, setStation] = React.useState(0);
	const [progress, setProgress] = React.useState(0);

	// Simulate playback: advance a 0–100 progress bar while playing.
	React.useEffect(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			setProgress((p) => {
				if (p >= 100) return 0; // loop the track
				return p + 2;
			});
		}, 600);
		return () => window.clearInterval(id);
	}, [playing]);

	// Selecting a track from the queue resets progress and starts playing.
	const selectTrack = (i: number) => {
		setTrackIdx(i);
		setProgress(0);
		setPlaying(true);
	};

	const [title, album] = tracks[trackIdx];

	return (
		<ShowcaseCard title="Radio / music" sub="morro rock · pirate band">
			<div className="flex items-center gap-3 rounded-md border border-primary/40 bg-primary/10 px-3 py-2.5">
				<Button
					size="sm"
					variant="outline"
					clip="none"
					className="size-9 shrink-0 p-0"
					onClick={() => setPlaying((p) => !p)}
					aria-label={playing ? "Pause" : "Play"}
				>
					{playing ? (
						<Pause className="size-4" />
					) : (
						<Play className="size-4" />
					)}
				</Button>
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-medium text-foreground">
						Now playing
					</p>
					<p className="truncate font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
						{title} · {album}
					</p>
				</div>
				<Headphones className="size-4 shrink-0 text-primary" />
			</div>

			{/* volume/progress — animated while playing */}
			<ChartContainer
				config={{ lvl: { label: "sig", color: "var(--color-chart-3)" } }}
				className="mt-2 h-14 w-full"
			>
				<BarChart
					data={Array.from({ length: 50 }, (_, i) => ({
						b: String(i + 1),
						lvl: Math.round(
							28 +
								40 *
									Math.abs(
										Math.sin(((i + 1) * Math.PI) / 12) +
											(playing ? progress / 20 : 0),
									) +
								14 * Math.sin(((i + 1) * 3.7) / 2),
						),
					}))}
					margin={{ left: -16, right: 8, top: 4, bottom: 0 }}
				>
					<XAxis hide dataKey="b" />
					<YAxis hide />
					<Bar
						dataKey="lvl"
						fill="var(--color-chart-3)"
						radius={1}
						barSize={1}
						minPointSize={1}
					/>
				</BarChart>
			</ChartContainer>

			{/* stations */}
			<div className="mt-3 flex flex-col gap-1.5">
				{stations.map(([name, freq], i) => (
					<button
						key={name}
						type="button"
						onClick={() => setStation(i)}
						className={`flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs transition-colors ${
							i === station
								? "bg-primary/10 font-medium text-primary"
								: "text-muted-foreground hover:bg-glass"
						}`}
					>
						<Radio className="size-3.5 shrink-0" />
						<span className="truncate">{name}</span>
						<span className="ml-auto font-mono text-[0.5625rem] text-muted-foreground/60">
							{freq}
						</span>
					</button>
				))}
			</div>

			{/* queue */}
			<div className="mt-2 border-t border-glass-border pt-2">
				<p className="mb-1 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					queue
				</p>
				<div className="flex flex-col gap-1.5">
					{tracks.map(([t, a], i) => (
						<button
							key={t}
							type="button"
							onClick={() => selectTrack(i)}
							className={`flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs transition-colors ${
								i === trackIdx
									? "bg-primary/10 font-medium text-primary"
									: "text-muted-foreground hover:bg-glass"
							}`}
						>
							<Radio className="size-3.5 shrink-0" />
							<span className="truncate">{t}</span>
							<span className="ml-auto font-mono text-[0.5625rem] text-muted-foreground/60">
								{a}
							</span>
						</button>
					))}
				</div>
			</div>
		</ShowcaseCard>
	);
}

