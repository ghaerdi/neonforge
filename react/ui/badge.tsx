"use client";
import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors",
	{
		variants: {
			variant: {
				default: "border-primary/40 bg-primary/10 text-primary",
				destructive:
					"border-[color:var(--destructive)]/55 bg-[color:var(--destructive)]/25 text-[color:var(--destructive)]",
				success:
					"border-[color:var(--success)]/55 bg-[color:var(--success)]/25 text-[color:var(--success)]",
				warning:
					"border-[color:var(--warning)]/55 bg-[color:var(--warning)]/25 text-[color:var(--warning)]",
				info: "border-[color:var(--info)]/55 bg-[color:var(--info)]/25 text-[color:var(--info)]",
				outline:
					"border-glass-border bg-glass text-muted-foreground backdrop-blur-md",
				secondary: "border-glass-border bg-secondary text-secondary-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
