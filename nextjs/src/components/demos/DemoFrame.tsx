"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Control button — small mono toggle chip used under previews. */
export function CtrlChip({
	active,
	onClick,
	children,
}: {
	active?: boolean;
	onClick?: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"inline-flex h-6 items-center rounded-sm border px-2 font-mono text-[0.625rem] uppercase tracking-[0.15em] transition-colors",
				active
					? "border-primary/50 bg-primary/10 text-primary shadow-[var(--nf-glow-primary)]"
					: "border-glass-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground",
			)}
		>
			{children}
		</button>
	);
}

/** Labelled control group row. */
export function CtrlRow({
	label,
	children,
}: {
	label?: string;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-wrap items-center gap-2">
			{label ? (
				<span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground/60 mr-1">
					{label}
				</span>
			) : null}
			{children}
		</div>
	);
}

/**
 * Standard demo document: themed panel holding the live component,
 * plus an optional interactive control strip below it.
 */
export function DemoFrame({
	demo,
	controls,
}: {
	demo: ReactNode;
	controls?: ReactNode;
}) {
	return (
		<div className="glass-panel overflow-hidden rounded-lg">
			<div className="flex min-h-40 items-center justify-center gap-4 p-6">
				<div className="flex flex-wrap items-center justify-center gap-4">
					{demo}
				</div>
			</div>
			{controls ? (
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-input bg-muted/50 px-4 py-3">
					{controls}
				</div>
			) : null}
		</div>
	);
}
