import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
	{
		variants: {
			variant: {
				default:
				"bg-primary text-primary-foreground border border-primary/60 hover:bg-primary/90 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_50%,transparent)] active:translate-y-px",
				destructive:
					"text-[color:var(--destructive)] border border-[color:var(--destructive)]/50 bg-[color:var(--destructive)]/20 hover:bg-[color:var(--destructive)]/30 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-destructive)_45%,transparent)] active:translate-y-px",
				success:
					"text-[color:var(--success)] border border-[color:var(--success)]/50 bg-[color:var(--success)]/20 hover:bg-[color:var(--success)]/30 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-success)_45%,transparent)] active:translate-y-px",
				warning:
					"text-[color:var(--warning)] border border-[color:var(--warning)]/50 bg-[color:var(--warning)]/20 hover:bg-[color:var(--warning)]/30 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-warning)_45%,transparent)] active:translate-y-px",
				info: "text-[color:var(--info)] border border-[color:var(--info)]/50 bg-[color:var(--info)]/20 hover:bg-[color:var(--info)]/30 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-info)_45%,transparent)] active:translate-y-px",
				outline:
				"border border-glass-border bg-glass text-foreground hover:bg-glass-hover hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_25%,transparent)] backdrop-blur-md",
				secondary:
					"bg-secondary text-secondary-foreground border border-glass-border hover:bg-secondary/80 active:translate-y-px",
				ghost:
			"text-foreground hover:bg-glass hover:text-primary hover:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_15%,transparent)]",
				link: "text-primary underline-offset-4 hover:underline hover:text-glow",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-11 px-8 text-base",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ButtonClip =
	| "diag"
	| "diag-inv"
	| "tl"
	| "tr"
	| "bl"
	| "br"
	| "none";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	/** Enable a glitch burst on hover/active. Opt-in — off by default. */
	glitch?: boolean;
	/** Which corner(s) to carve diagonally. Default "diag" = TL + BR. */
	clip?: ButtonClip;
}

const DIAG_POLY = (c: number) =>
	`polygon(0 ${c}rem, ${c}rem 0, 100% 0, 100% calc(100% - ${c}rem), calc(100% - ${c}rem) 100%, 0 100%)`;
const DIAG_INV_POLY = (c: number) =>
	`polygon(0 0, calc(100% - ${c}rem) 0, 100% ${c}rem, 100% 100%, ${c}rem 100%, 0 calc(100% - ${c}rem))`;
const TL_POLY = (c: number) =>
	`polygon(0 ${c}rem, ${c}rem 0, 100% 0, 100% 100%, 0 100%)`;
const TR_POLY = (c: number) =>
	`polygon(0 0, calc(100% - ${c}rem) 0, 100% ${c}rem, 100% 100%, 0 100%)`;
const BL_POLY = (c: number) =>
	`polygon(0 0, 100% 0, 100% 100%, ${c}rem 100%, 0 calc(100% - ${c}rem))`;
const BR_POLY = (c: number) =>
	`polygon(0 0, 100% 0, 100% calc(100% - ${c}rem), calc(100% - ${c}rem) 100%, 0 100%)`;

const CLIP_POLYS: Record<Exclude<ButtonClip, "none">, (c: number) => string> = {
	diag: DIAG_POLY,
	"diag-inv": DIAG_INV_POLY,
	tl: TL_POLY,
	tr: TR_POLY,
	bl: BL_POLY,
	br: BR_POLY,
};

/** Border color shown by the outer chamfer ring, keyed by variant. */
const RING_COLOR: Record<string, string> = {
	outline: "var(--nf-glass-border)",
	secondary: "var(--nf-glass-border)",
	default: "var(--nf-glass-border)",
	destructive: "var(--nf-glass-border)",
	success: "var(--nf-glass-border)",
	warning: "var(--nf-glass-border)",
	info: "var(--nf-glass-border)",
	ghost: "transparent",
	link: "transparent",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "default",
			size = "default",
			asChild = false,
			glitch = false,
			clip = variant === "default" ? "diag" : "none",
			style,
			...props
		},
		ref,
	) => {
		/* carve scales with size so the diagonal stays proportional on small buttons */
		const btnCut = size === "sm" ? 0.4 : size === "lg" ? 0.65 : 0.55;
		const polygon = clip === "none" ? undefined : CLIP_POLYS[clip](btnCut);
		const classes = cn(buttonVariants({ variant, size }), className);
		const ringColor =
			RING_COLOR[variant ?? "default"] ?? "var(--nf-glass-border)";
		const Comp = asChild ? Slot : "button";
		const glitchClasses = glitch ? "nf-glitch-hover nf-glitch-active" : "";

		/* AsChild wraps a single child element (e.g. a placeholder). The child
		   is a plain element — render it directly with the clip. */
		if (asChild) {
			return (
				<Comp
					className={cn(classes, glitchClasses, polygon ? "border-0" : "")}
					style={{
						clipPath: polygon,
						...(polygon
							? { outline: `1px solid ${ringColor}`, outlineOffset: "-1px" }
							: {}),
						...style,
					}}
					ref={ref}
					{...props}
				/>
			);
		}

		/* No clip — normal bordered button. Radius follows the corner-shape
		   preset (round → rounded; rect/default → square). */
		if (!polygon) {
			return (
				<button
					className={cn(classes, glitchClasses, "rounded-[var(--nf-button-radius)]")}
					style={style}
					ref={ref}
					{...props}
				/>
			);
		}

		/* Clipped: single element. The border is an inset outline, drawn just
		   inside the box and clipped to the same polygon — because outline is
		   painted on the element and clipped by its own clip-path, the 1px line
		   follows the diagonal exactly, with no two-layer offset. The hover glow
		   (box-shadow) is untouched since outline lives on a separate axis. */
		return (
			<button
				className={cn(classes, glitchClasses, "border-0")}
				style={{
					clipPath: polygon,
					outline: `1px solid ${ringColor}`,
					outlineOffset: "-1px",
					...style,
				}}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
