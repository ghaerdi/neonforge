"use client";

import type { ReactNode } from "react";

import { ArrowUpRight } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";

/** Shared showcase card frame — semantic heading + label + content. */
export function ShowcaseCard({
	title,
	sub,
	children,
	className = "",
}: {
	title: string;
	sub: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<Card className={className}>
			<CardHeader className="p-4 pb-2">
				<div className="flex items-center justify-between gap-2">
					<h3 className="text-xs font-bold uppercase tracking-[0.2em]">
						{title}
					</h3>
					<ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/40" />
				</div>
				<CardDescription className="text-[0.6875rem]">{sub}</CardDescription>
			</CardHeader>
			<CardContent className="p-4">{children}</CardContent>
		</Card>
	);
}

/** Reusable horizontal meter bar. `value` is 0..100 (clamped). */
export function Meter({
	value,
	color = "bg-primary",
}: {
	value: number;
	color?: string;
}) {
	return (
		<div className="h-2 flex-1 overflow-hidden rounded-sm bg-glass">
			<div
				className={`h-full rounded-sm ${color} opacity-85`}
				style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
			/>
		</div>
	);
}

/** Rain probability tag. */
export function RainChance({ v }: { v: number }) {
	return (
		<span className={v >= 60 ? "text-info" : "text-muted-foreground/50"}>
			{v}%
		</span>
	);
}

/** Pure-CSS column masonry — cards flow at natural height, no measurement JS. */
export function Masonry({ children }: { children: ReactNode }) {
	return (
		<div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
			{children}
		</div>
	);
}

/* ── shared showcase data ───────────────────────────────────────────────── */

export const TXNS = [
	["TX-8821", "Arasaka SaKatsu", "− ¥12,400", "cleared"],
	["TX-8820", "Kiroshi Optics", "− ¥8,900", "pending"],
	["TX-8819", "Merc bounty #47", "+ ¥35,000", "cleared"],
	["TX-8818", "Fixer: Wakako", "+ ¥15,200", "cleared"],
];

export const POWER = [
	["Watson", 62],
	["Westbrook", 41],
	["Heywood", 55],
	["Pacifica", 18],
];

export const SYS = [
	["cpu", 78],
	["mem", 64],
	["net", 41],
];

export const VITALS = [70, 84, 78, 88, 74];
