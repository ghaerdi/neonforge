"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 6, ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"z-50 w-72 rounded-md border border-glass-border bg-popover/95 p-4 text-popover-foreground shadow-[0_16px_48px_oklch(0_0_0/0.55),0_0_24px_color-mix(in_srgb,var(--color-primary)_6%,transparent),inset_0_1px_0_oklch(1_0_0/0.12)] backdrop-blur-2xl outline-none animate-nf-fade-in data-[state=closed]:animate-nf-fade-out",
				"data-[side=top]:animate-nf-slide-in-from-bottom data-[side=bottom]:animate-nf-slide-in-from-top data-[side=left]:animate-nf-slide-in-from-right data-[side=right]:animate-nf-slide-in-from-left",
				className,
			)}
			{...props}
		/>
	</PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
