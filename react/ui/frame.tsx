"use client";

import * as React from "react";
import { cn, clipPath, type Clip } from "@/lib/utils";

/**
 * Frame — a bordered container shell for previews, code blocks, and
 * showcase panels. Defaults to a bottom-right (br) corner clip with a
 * crisp border that follows the diagonal (two-layer ring). Pass
 * `clip="none"` for a plain rounded-rectangle frame.
 */
export interface FrameProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	/** Optional title bar label rendered at the top. */
	title?: React.ReactNode;
	/** Optional right-side element in the title bar. */
	action?: React.ReactNode;
	/** Corner carve. Default "br". "none" = plain rounded. */
	clip?: Clip;
	/** Carve size in rem (default 0.6). */
	clipCut?: number;
	/** Title-bar background variant. */
	variant?: "default" | "subtle";
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
	(
		{
			className,
			title,
			action,
			clip = "br",
			clipCut = 0.6,
			variant = "default",
			children,
			style,
			...props
		},
		ref,
	) => {
		const polygon = clip === "none" ? undefined : clipPath(clip, clipCut);
		const bar = cn(
			"flex items-center justify-between gap-2 border-b border-glass-border px-4 py-2",
			variant === "subtle"
				? "bg-secondary/20 text-muted-foreground"
				: "bg-secondary/40 text-muted-foreground",
		);

		const barMarkup =
			title !== undefined || action !== undefined ? (
				<div className={bar}>
					{title !== undefined ? (
						<span className="font-mono text-[0.625rem] uppercase tracking-[0.2em]">
							{title}
						</span>
					) : (
						<span />
					)}
					{action}
				</div>
			) : null;

		const inner = (surface: string, clippedStyle?: React.CSSProperties) => (
			<div
				className={cn("overflow-auto", surface, className)}
				style={clippedStyle}
			>
				{barMarkup}
				{children}
			</div>
		);

		if (!polygon) {
			return (
				<div ref={ref} style={style} {...props}>
				{inner(
					"rounded-md border border-glass-border bg-card text-card-foreground",
				)}
				</div>
			);
		}

		/* two-layer ring so the border follows the diagonal */
		return (
			<div
				ref={ref}
			style={{
				clipPath: polygon,
				background: "var(--nf-glass-border)",
				padding: "1px",
				display: "grid",
				...style,
			}}
			{...props}
		>
			{inner("bg-card text-card-foreground", { clipPath: polygon })}
		</div>
		);
	},
);
Frame.displayName = "Frame";

export { Frame };
