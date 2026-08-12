"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-sm border border-glass-border bg-glass shadow-[inset_0_1px_2px_oklch(0_0_0/0.4)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
			"data-[state=checked]:border-primary/60 data-[state=checked]:bg-primary/20 data-[state=checked]:shadow-[inset_0_0_12px_color-mix(in_srgb,var(--color-primary)_25%,transparent),0_0_12px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"pointer-events-none block size-4 rounded-[2px] bg-muted-foreground/60 shadow-lg ring-0 transition-all duration-200",
				"data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_90%,transparent)]",
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
