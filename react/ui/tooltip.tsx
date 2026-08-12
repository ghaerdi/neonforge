"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-50 overflow-hidden rounded-sm border border-glass-border bg-popover/90 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-popover-foreground shadow-[0_8px_32px_oklch(0_0_0/0.5),inset_0_1px_0_oklch(1_0_0/0.12)] backdrop-blur-xl animate-nf-fade-in data-[state=closed]:animate-nf-fade-out",
				"data-[side=top]:animate-nf-slide-in-from-bottom data-[side=bottom]:animate-nf-slide-in-from-top data-[side=left]:animate-nf-slide-in-from-right data-[side=right]:animate-nf-slide-in-from-left",
				className,
			)}
			{...props}
		/>
	</TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
