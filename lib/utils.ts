import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/* ── corner-clip (cyberpunk diagonal carve) helpers ─────────────────────────
 * Applies a straight diagonal cut to one or more corners. Used by Button,
 * Card, Badge, Dialog and any component with a `clip` prop.
 *
 *   "diag"     carve TL + BR (default parallelogram)
 *   "diag-inv" carve TR + BL (inverse diagonal)
 *   "tl" | "tr" | "bl" | "br"   carve a single corner
 *   "none"     no clip
 */
export type Clip = "diag" | "diag-inv" | "tl" | "tr" | "bl" | "br" | "none";

type Poly = (cut: number) => string;

const DIAG_POLY: Poly = (c) =>
	`polygon(0 ${c}rem, ${c}rem 0, 100% 0, 100% calc(100% - ${c}rem), calc(100% - ${c}rem) 100%, 0 100%)`;
const DIAG_INV_POLY: Poly = (c) =>
	`polygon(0 0, calc(100% - ${c}rem) 0, 100% ${c}rem, 100% 100%, ${c}rem 100%, 0 calc(100% - ${c}rem))`;
const TL_POLY: Poly = (c) =>
	`polygon(0 ${c}rem, ${c}rem 0, 100% 0, 100% 100%, 0 100%)`;
const TR_POLY: Poly = (c) =>
	`polygon(0 0, calc(100% - ${c}rem) 0, 100% ${c}rem, 100% 100%, 0 100%)`;
const BL_POLY: Poly = (c) =>
	`polygon(0 0, 100% 0, 100% 100%, ${c}rem 100%, 0 calc(100% - ${c}rem))`;
const BR_POLY: Poly = (c) =>
	`polygon(0 0, 100% 0, 100% calc(100% - ${c}rem), calc(100% - ${c}rem) 100%, 0 100%)`;

const CLIP_POLYS: Record<Exclude<Clip, "none">, Poly> = {
	diag: DIAG_POLY,
	"diag-inv": DIAG_INV_POLY,
	tl: TL_POLY,
	tr: TR_POLY,
	bl: BL_POLY,
	br: BR_POLY,
};

/** Inline `clipPath` string for a corner-clip + cut (rem). */
export function clipPath(clip: Clip, cut: number): string | undefined {
	if (clip === "none") return undefined;
	return CLIP_POLYS[clip](cut);
}
