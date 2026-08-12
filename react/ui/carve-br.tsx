"use client";

import * as React from "react";
import { useStreetkid } from "./use-streetkid";

/** Bottom-right diagonal carve size (rem). */
export const BR_CUT = 0.6;

/** Bottom-right polygon for a given cut (rem). */
export function brPolygon(cut: number = BR_CUT): string {
	return `polygon(0 0, 100% 0, 100% calc(100% - ${cut}rem), calc(100% - ${cut}rem) 100%, 0 100%)`;
}

/**
 * Two-layer BR carve that keeps the border running along the diagonal (clip-path
 * alone would trim the element's own border). The outer ring carries the border
 * color, the inner clone is the surface. Only active under the streetkid genre;
 * otherwise children render unstyled.
 */
export function Carve({
	children,
	border = "var(--nf-glass-border)",
	cut = BR_CUT,
	fullWidth = false,
}: {
	children: React.ReactElement<{ style?: React.CSSProperties }>;
	border?: string;
	cut?: number;
	fullWidth?: boolean;
}) {
	const streetkid = useStreetkid();
	if (!streetkid) return children;

	const poly = brPolygon(cut);
	return (
		<span
			style={{
				clipPath: poly,
				background: border,
				padding: "1px",
				display: "inline-flex",
				...(fullWidth ? { width: "100%" } : {}),
			}}
		>
			{React.cloneElement(children, {
				style: {
					...(children.props.style ?? {}),
					clipPath: poly,
					borderWidth: 0,
					borderStyle: "solid",
					borderColor: "transparent",
				},
			})}
		</span>
	);
}
