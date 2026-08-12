"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn, clipPath, type Clip } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
		/** Corner carve. Default "br" (bottom-right). "none" = plain rounded. */
		clip?: Clip;
		/** Carve size in rem (default 0.4). */
		clipCut?: number;
	}
>(
	(
		{
			className,
			align = "center",
			sideOffset = 4,
			clip = "br",
			clipCut = 0.4,
			style,
			...props
		},
		ref,
	) => {
		const polygon = clip === "none" ? undefined : clipPath(clip, clipCut);
		return (
			<HoverCardPrimitive.Content
				ref={ref}
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-64 bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
					clip === "none" && "rounded-md border border-glass-border",
					className,
				)}
				style={polygon ? { clipPath: polygon, ...style } : style}
				{...props}
			/>
		);
	},
);
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
