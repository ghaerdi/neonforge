"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Carve, BR_CUT } from "./carve-br";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	/** Corner carve for the streetkid genre. "br" = bottom-right diagonal (default);
	 *  "none" disables the carve and renders the plain bordered input. */
	clip?: "br" | "none";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, clip = "br", ...props }, ref) => {
		const field = (
			<input
				type={type}
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.06)] transition-all duration-200",
					"placeholder:text-muted-foreground/70",
					"focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
					"disabled:cursor-not-allowed disabled:opacity-50",
					clip === "none" && "rounded-[var(--nf-button-radius)]",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);

		if (clip === "none") return field;

		return (
			<Carve fullWidth cut={BR_CUT}>
				{field}
			</Carve>
		);
	},
);
Input.displayName = "Input";

export { Input };
