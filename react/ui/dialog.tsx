"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn, clipPath, type Clip } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-background/70 backdrop-blur-[6px] animate-nf-fade-in data-[state=closed]:animate-nf-fade-out",
			className,
		)}
		{...props}
	/>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	/** Corner(s) to clip diagonally. Default "br" (bottom-right). "none" = plain. */
	clip?: Clip;
	/** Diagonal carve size in rem (default 0.75). */
	clipCut?: number;
}

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
	function DialogContent({
		className,
		children,
		clip = "br",
		clipCut = 0.75,
		style,
		...props
	}, ref) {
		const polygon = clip === "none" ? undefined : clipPath(clip, clipCut);
		return (
			<DialogPortal>
				<DialogOverlay />
				{polygon ? (
					<div
						className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
						style={{
							clipPath: polygon,
							background: "var(--nf-glass-border)",
							padding: "1px",
						}}
						data-slot="dialog-ring"
					>
						<DialogPrimitive.Content
							ref={ref}
							className={cn(
								"grid w-full max-w-lg gap-4 border-0 bg-popover p-6 shadow-[0_24px_80px_oklch(0_0_0/0.6),0_0_40px_color-mix(in_srgb,var(--color-primary)_8%,transparent),inset_0_1px_0_oklch(1_0_0/0.14)] animate-nf-zoom-in data-[state=closed]:animate-nf-zoom-out",
								className,
							)}
							style={{ clipPath: polygon, ...style }}
							{...props}
						>
							{children}
							<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:text-primary hover:shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
								<X className="size-4" />
								<span className="sr-only">Close</span>
							</DialogPrimitive.Close>
						</DialogPrimitive.Content>
					</div>
				) : (
					<DialogPrimitive.Content
						ref={ref}
						className={cn(
							"fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-glass-border bg-popover/85 p-6 shadow-[0_24px_80px_oklch(0_0_0/0.6),0_0_40px_color-mix(in_srgb,var(--color-primary)_8%,transparent),inset_0_1px_0_oklch(1_0_0/0.14)] backdrop-blur-2xl animate-nf-zoom-in data-[state=closed]:animate-nf-zoom-out",
							className,
						)}
						style={style}
						{...props}
					>
						{children}
						<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:text-primary hover:shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
							<X className="size-4" />
							<span className="sr-only">Close</span>
						</DialogPrimitive.Close>
					</DialogPrimitive.Content>
				)}
			</DialogPortal>
		);
	},
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex flex-col space-y-1.5 text-left", className)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold tracking-wide text-foreground",
			className,
		)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
