"use client";

import * as React from "react";

import {
	Bell,
	Car,
	CloudLightning,
	CloudRain,
	Flame,
	Gauge,
	Home,
	Lightbulb,
	Lock,
	Map,
	MapPin,
	ShieldAlert,
	Thermometer,
	Tornado,
	Waves,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

import { RainChance, ShowcaseCard } from "./card-ui";

export function WeatherWidget() {
	// temps kept in °C; convert to °F when toggled.
	const hourly = [
		["now", 18, "rain", 72],
		["+2h", 19, "clear", 48],
		["+4h", 16, "smog", 63],
		["+6h", 14, "rain", 81],
		["+8h", 12, "storm", 94],
		["+10h", 11, "clear", 34],
	] as [string, number, string, number][];
	const daily = [
		["mon", [14, 6], "acid rain"],
		["tue", [18, 9], "clear"],
		["wed", [12, 5], "storm"],
		["thu", [16, 8], "smog"],
	] as [string, [number, number], string][];

	const [unit, setUnit] = React.useState<"c" | "f">("c");
	const fmt = (c: number) =>
		unit === "c" ? `${Math.round(c)}°` : `${Math.round((c * 9) / 5 + 32)}°`;

	return (
		<ShowcaseCard title="Weather uplink" sub="Night City · Watson district">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<CloudRain className="size-9 text-info" />
					<div>
						<p className="font-mono text-2xl font-bold text-foreground">
							{fmt(hourly[0][1])}
							<span className="ml-1 text-sm font-normal text-muted-foreground">
								{unit === "c" ? "C" : "F"}
							</span>
						</p>
						<p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
							acid rain · UV 03
						</p>
					</div>
				</div>
				<div className="flex flex-col items-end gap-1.5">
					<div className="flex items-center gap-1 rounded-sm border border-glass-border p-0.5">
						<button
							type="button"
							onClick={() => setUnit("c")}
							className={`rounded px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase transition-colors ${
								unit === "c"
									? "bg-primary/15 text-primary"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							°C
						</button>
						<button
							type="button"
							onClick={() => setUnit("f")}
							className={`rounded px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase transition-colors ${
								unit === "f"
									? "bg-primary/15 text-primary"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							°F
						</button>
					</div>
					<Badge variant="info" className="uppercase">
						smog alert
					</Badge>
					<p className="font-mono text-[0.625rem] text-muted-foreground">
						corpo dome locked
					</p>
				</div>
			</div>
			{/* hourly forecast */}
			<div className="mt-3">
				<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					next hours
				</p>
				<div className="grid grid-cols-3 gap-2">
					{hourly.map(([t, v, cond, hum]) => (
						<div
							key={String(t)}
							className="rounded-md border border-glass-border bg-secondary/10 p-2 text-center"
						>
							<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
								{t}
							</p>
							<p className="mt-0.5 font-mono text-sm font-bold text-foreground">
								{fmt(v)}
							</p>
							<p className="font-mono text-[0.5rem] uppercase tracking-widest text-muted-foreground/60">
								{cond}
							</p>
							<p className="mt-0.5 font-mono text-[0.5rem] text-muted-foreground/50">
								<RainChance v={Number(hum)} />
							</p>
						</div>
					))}
				</div>
			</div>

			{/* daily forecast */}
			<div className="mt-3">
				<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					next days
				</p>
				<div className="flex flex-col gap-1.5">
					{daily.map(([d, [hi, lo], cond]) => (
						<div
							key={String(d)}
							className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-1.5"
						>
							<span className="font-mono text-[0.625rem] uppercase tracking-widest text-foreground">
								{d}
							</span>
							<span className="font-mono text-xs text-muted-foreground">
								{cond}
							</span>
							<span className="font-mono text-xs font-bold text-foreground">
								{fmt(hi)} / {fmt(lo)}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="mt-2 flex flex-wrap gap-1.5">
				{["air quality 62", "humidity 71%", "wind 19 km/h"].map((k) => (
					<span
						key={k}
						className="rounded-sm border border-glass-border bg-secondary/10 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground"
					>
						{k}
					</span>
				))}
			</div>
		</ShowcaseCard>
	);
}

export function SystemControls() {
	const [sandev, setSandev] = React.useState(true);
	const [optics, setOptics] = React.useState(true);
	const [adren, setAdren] = React.useState([35]);
	return (
		<ShowcaseCard title="System controls" sub="cyberware overrides">
			<div className="flex flex-col gap-3">
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/15 px-3 py-2.5">
					<div>
						<p className="text-sm font-medium text-foreground">Sandevistan</p>
						<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							time dilation · on
						</p>
					</div>
					<Switch checked={sandev} onCheckedChange={setSandev} />
				</div>
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/15 px-3 py-2.5">
					<div>
						<p className="text-sm font-medium text-foreground">
							Kiroshi optics
						</p>
						<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							HUD overlay · on
						</p>
					</div>
					<Switch checked={optics} onCheckedChange={setOptics} />
				</div>
				<div className="flex flex-col gap-1.5">
					<span className="flex justify-between font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						<span>adrenaline</span>
						<span>{adren[0]}%</span>
					</span>
					<Slider value={adren} onValueChange={setAdren} max={100} step={1} />
				</div>
			</div>
		</ShowcaseCard>
	);
}

export function ControlPanelWidget() {
	const [auto, setAuto] = React.useState(true);
	const notifs = [
		{ sev: "warn", text: "Arasaka patrol flagged sector 7" },
		{ sev: "info", text: "Fixer contract #88 accepted" },
		{ sev: "danger", text: "ICE trace detected — partial" },
	];
	return (
		<ShowcaseCard title="Control panel" sub="overrides + notifications">
			<div className="flex flex-col gap-2.5">
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/15 px-3 py-2">
					<div>
						<p className="text-sm font-medium text-foreground">Auto-jack</p>
						<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							ripper connect · on
						</p>
					</div>
					<Switch checked={auto} onCheckedChange={setAuto} />
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<p className="font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					notifications
				</p>
				{notifs.map((n, i) => (
					<div
						key={i}
						className="flex items-center gap-2.5 rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
					>
						<Bell
							className={`size-3.5 shrink-0 ${n.sev === "danger" ? "text-destructive" : n.sev === "warn" ? "text-warning" : "text-info"}`}
						/>
						<p className="text-xs text-muted-foreground">{n.text}</p>
					</div>
				))}
			</div>
		</ShowcaseCard>
	);
}

/** Home assistant — smart flat controls. */
export function HomeAssistant() {
	const [lights, setLights] = React.useState(true);
	const [door, setDoor] = React.useState(false);
	const [temp, setTemp] = React.useState([21]);
	return (
		<ShowcaseCard title="Home assistant" sub="flat 47 · megablock A">
			<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					<Home className="size-4 text-primary" /> Watson · H10
				</span>
				<Badge variant="success" className="uppercase">
					all systems
				</Badge>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/15 px-3 py-2">
					<span className="flex items-center gap-2 text-xs text-foreground">
						<Lightbulb className="size-3.5 text-warning" /> lights
					</span>
					<Switch checked={lights} onCheckedChange={setLights} />
				</div>
				<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/15 px-3 py-2">
					<span className="flex items-center gap-2 text-xs text-foreground">
						<Lock className="size-3.5 text-primary" /> front lock
					</span>
					<Switch checked={door} onCheckedChange={setDoor} />
				</div>
				<div className="flex items-center gap-3 rounded-md border border-glass-border bg-secondary/15 px-3 py-2">
					<Thermometer className="size-3.5 shrink-0 text-info" />
					<div className="flex-1">
						<span className="flex justify-between font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
							<span>climate</span>
							<span>{temp[0]}°C</span>
						</span>
						<Slider
							value={temp}
							onValueChange={setTemp}
							max={30}
							step={1}
							className="mt-1"
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 flex flex-wrap gap-1.5">
				{["brew: on", "music: off", "security: armed"].map((k) => (
					<span
						key={k}
						className="rounded-sm border border-glass-border bg-secondary/10 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground"
					>
						{k}
					</span>
				))}
			</div>
		</ShowcaseCard>
	);
}

/** Disaster alerts — natural hazard broadcasts. */
export function DisasterAlerts() {
	const alerts = [
		{
			sev: "danger",
			icon: Tornado,
			title: "Tornado watch",
			sub: "Badlands corridor · 4 km",
		},
		{
			sev: "warn",
			icon: CloudLightning,
			title: "EMP storm",
			sub: "sector 7 grid at risk",
		},
		{
			sev: "info",
			icon: Waves,
			title: "Coastal surge",
			sub: "Pacifica waterfront · low",
		},
	];
	return (
		<ShowcaseCard title="Disaster alerts" sub="natural hazard broadcast">
			<div className="flex items-center justify-between rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-widest text-destructive">
					<ShieldAlert className="size-3.5" /> response mode
				</span>
				<Badge variant="destructive" className="uppercase">
					alert
				</Badge>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				{alerts.map((a, i) => (
					<div
						key={i}
						className="flex items-start gap-2.5 rounded-md border border-glass-border bg-secondary/10 px-3 py-2"
					>
						<a.icon
							className={`mt-0.5 size-4 shrink-0 ${a.sev === "danger" ? "text-destructive" : a.sev === "warn" ? "text-warning" : "text-info"}`}
						/>
						<div className="min-w-0 flex-1">
							<p className="text-xs font-medium text-foreground">{a.title}</p>
							<p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
								{a.sub}
							</p>
						</div>
						<Flame
							className={`mt-0.5 size-3.5 shrink-0 ${a.sev === "danger" ? "text-destructive" : "text-muted-foreground/40"}`}
						/>
					</div>
				))}
			</div>
			<Button size="sm" variant="outline" clip="none" className="mt-2 w-full">
				<Map className="size-3.5" /> Shelter routes
			</Button>
		</ShowcaseCard>
	);
}

/** Vehicle — merged with garage rides. */
export function VehicleWidget() {
	const [speed, setSpeed] = React.useState([86]);
	return (
		<ShowcaseCard title="Vehicle" sub="Quadra Type-66 · garage">
			<div className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2">
				<span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
					<Car className="size-4 text-primary" /> Night City · Watson
				</span>
				<Badge variant="success" className="uppercase">
					ready
				</Badge>
			</div>
			<div className="mt-3 flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-2.5">
				<span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					<Gauge className="size-4 text-warning" /> speed
				</span>
				<span className="font-mono text-lg font-bold text-foreground">
					{speed[0]}
					<span className="text-[0.625rem] font-normal text-muted-foreground">
						{" "}
						km/h
					</span>
				</span>
			</div>
			<div className="mt-3 grid grid-cols-2 gap-2">
				{[
					["fuel", "72%"],
					["armor", "940"],
					["EMP shield", "ok"],
					["condition", "98%"],
				].map(([k, v]) => (
					<div
						key={k}
						className="rounded-md border border-glass-border bg-secondary/10 p-2 text-center"
					>
						<p className="font-mono text-[0.54rem] uppercase tracking-widest text-muted-foreground">
							{k}
						</p>
						<p className="mt-0.5 font-mono text-sm font-bold text-foreground">
							{v}
						</p>
					</div>
				))}
			</div>
			<div className="mt-3 flex items-center gap-2">
				<Slider
					value={speed}
					onValueChange={setSpeed}
					max={260}
					step={1}
					className="flex-1"
				/>
				<MapPin className="size-4 shrink-0 text-primary" />
			</div>
			<div className="mt-3 border-t border-glass-border pt-2">
				<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
					garage
				</p>
				<div className="flex flex-col gap-1.5">
					{["Arch Nazaré", "Mizutani Shion"].map((ride) => (
						<div
							key={ride}
							className="flex items-center justify-between rounded-md border border-glass-border bg-secondary/10 px-3 py-1.5"
						>
							<span className="flex items-center gap-2 text-xs text-foreground">
								<Car className="size-3.5 text-primary" />
								{ride}
							</span>
							<Badge
								variant="outline"
								className="font-mono text-[0.5625rem] uppercase"
							>
								owned
							</Badge>
						</div>
					))}
				</div>
			</div>
		</ShowcaseCard>
	);
}
