"use client";

import * as React from "react";
import { cn, clipPath, type Clip } from "@/lib/utils";

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		/** Corner carve. Default "br" — bottom-right clipped. "none" = plain rounded. */
		clip?: Clip;
	}
>(({ className, clip = "br", style, ...props }, ref) => {
	const polygon = clip === "none" ? undefined : clipPath(clip, 0.75);
	if (polygon) {
		/* Clipped card: solid surface (no backdrop-filter, so the 1px border
		   ring stays crisp and follows the diagonal instead of being blurred/
		   cut). Outer ring carries the border colour. */
		return (
			<div
				className={cn(className)}
				style={{
					clipPath: polygon,
					background: "var(--nf-glass-border)",
					padding: "1px",
					display: "grid",
				}}
			>
				<div
					ref={ref}
					className="bg-card text-card-foreground"
					style={{ clipPath: polygon, ...style }}
					{...props}
				/>
			</div>
		);
	}
	return (
		<div
			ref={ref}
			className={cn("glass-panel rounded-lg text-card-foreground", className)}
			style={style}
			{...props}
		/>
	);
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-wide",
			className,
		)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
