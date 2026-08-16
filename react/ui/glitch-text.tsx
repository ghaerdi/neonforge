"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type GlitchTrigger = "hover" | "click" | "auto" | "off";

export interface GlitchTextProps extends React.HTMLAttributes<HTMLElement> {
	/** Rendered tag — any element that can hold text. */
	as?: React.ElementType;
	/**
	 * What triggers a distortion burst. "off" (default) renders static text —
	 * glitch is strictly opt-in. "hover" bursts on mouse enter, "click" on
	 * press, "auto" fires a few bursts shortly after mount then settles.
	 */
	trigger?: GlitchTrigger;
	/** Number of bursts for trigger="auto". */
	autoBursts?: number;
}

/**
 * Text distortion primitive — a skew wiggle + RGB-split burst with clipped ghost
 * slices. Nothing animates unless a trigger is passed, so it's safe as a drop
 * in for plain text. SSR-safe: the burst state starts off, so server and
 * client first paint are identical.
 */
export function GlitchText({
	as: Comp = "span",
	trigger = "off",
	autoBursts = 3,
	className,
	children,
	onClick,
	...props
}: GlitchTextProps) {
	const text = typeof children === "string" ? children : "";

	const [burst, setBurst] = React.useState(false);
	const [round, setRound] = React.useState(0);
	const timers = React.useRef<number[]>([]);

	const clearTimers = () => {
		timers.current.forEach((t) => window.clearTimeout(t));
		timers.current = [];
	};

	/** Fire one burst; a fresh burst restarts the timer so rapid triggers stack. */
	const burstOnce = React.useCallback((ms = 480) => {
		setBurst(true);
		setRound((r) => r + 1); // re-key ghost layers → animation restarts
		clearTimers();
		const t = window.setTimeout(() => setBurst(false), ms);
		timers.current.push(t);
	}, []);

	// unmount: drop any pending timers
	React.useEffect(() => clearTimers, []);

	// auto: a few spaced bursts shortly after mount, then quiet
	React.useEffect(() => {
		if (trigger !== "auto") return;
		const pending: number[] = [];
		for (let i = 0; i < autoBursts; i++) {
			pending.push(window.setTimeout(() => burstOnce(480), 600 + i * 950));
		}
		return () => {
			pending.forEach((t) => window.clearTimeout(t));
			clearTimers();
		};
	}, [trigger, autoBursts, burstOnce]);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (trigger === "click") burstOnce(560);
		onClick?.(e);
	};

	const handleMouseEnter = () => {
		if (trigger === "hover") burstOnce(480);
	};

	return (
		<Comp
			className={cn(
				"relative inline-block",
				burst &&
					(trigger === "auto"
						? "animate-nf-wiggle-subtle animate-nf-rgb-split-subtle"
						: "animate-nf-wiggle animate-nf-rgb-split"),
				className,
			)}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			{...props}
		>
			{text}
			{burst && (
				<>
					<span
						key={`a-${round}`}
						aria-hidden
						className="nf-glitch-ghost nf-glitch-ghost-cyan"
					>
						{text}
					</span>
					<span
						key={`b-${round}`}
						aria-hidden
						className="nf-glitch-ghost nf-glitch-ghost-red"
					>
						{text}
					</span>
				</>
			)}
		</Comp>
	);
}
