"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, clipPath, type Clip } from "@/lib/utils";

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
		/** Corner carve. Default "br" (bottom-right). "none" = plain rounded. */
		clip?: Clip;
		/** Carve size in rem (default 0.25). */
		clipCut?: number;
	}
>(({ className, clip = "br", clipCut = 0.25, style, ...props }, ref) => {
	const polygon = clip === "none" ? undefined : clipPath(clip, clipCut);
	return (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex size-10 shrink-0 overflow-hidden border border-glass-border bg-glass shadow-[inset_0_1px_0_oklch(1_0_0/0.1)]",
				clip === "none" && "rounded-sm",
				className,
			)}
			style={polygon ? { clipPath: polygon, ...style } : style}
			{...props}
		/>
	);
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square size-full", className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex size-full items-center justify-center bg-gradient-to-br from-primary/25 to-info/25 font-mono text-sm uppercase tracking-widest text-primary",
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
