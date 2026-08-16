"use client";

import * as React from "react";

import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ShowcaseCard } from "./card-ui";

const STORAGE_KEY = "nf-counter-presses";

/**
 * Read the stored count at the boundary. Anything non-numeric or negative is
 * treated as 0 — this will become a server/db-backed value later, so keep the
 * parse strict and the fallback dumb.
 */
function readStored(): number {
	if (typeof window === "undefined") return 0;
	try {
		const raw = window.sessionStorage.getItem(STORAGE_KEY);
		if (raw === null) return 0;
		const n = Number.parseInt(raw, 10);
		return Number.isFinite(n) && n >= 0 ? n : 0;
	} catch {
		return 0; // sessionStorage unavailable (privacy mode, denied access…)
	}
}

/**
 * Functional counter widget — one button, only ever goes up. Count persists
 * per tab via sessionStorage until the server + db land.
 */
export function CounterWidget() {
	const [count, setCount] = React.useState<number>(0);

	// Hydrate the tab's count after mount. The server can't know a per-tab
	// sessionStorage value, so reading it during first render would desync the
	// HTML — both sides render 0, then this effect swaps in the stored count.
	React.useEffect(() => {
		setCount(readStored());
	}, []);

	React.useEffect(() => {
		try {
			window.sessionStorage.setItem(STORAGE_KEY, String(count));
		} catch {
			// best-effort persistence — a failed write is not worth surfacing
		}
	}, [count]);


	const press = () => setCount((c) => c + 1);

	return (
		<ShowcaseCard title="Counter" sub="presses · session-scoped">
			<div className="flex items-baseline gap-2">
				<span className="font-mono text-4xl font-bold tabular-nums leading-none text-primary">
					{count}
				</span>
				<span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
					total presses
				</span>
			</div>

			<Separator className="my-3 bg-glass-border/60" />

			<Button
				className="w-full"
				clip="br"
				onClick={press}
				aria-label="Increment counter"
			>
				<Zap />
				Press
			</Button>

			<p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground/60">
				held in this tab · db pending
			</p>
		</ShowcaseCard>
	);
}
