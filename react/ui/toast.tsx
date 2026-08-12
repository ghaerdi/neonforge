"use client";

import { Toaster as Sonner } from "sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
	return (
		<Sonner
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: cn(
						"group toast group-[.toaster]:rounded-md group-[.toaster]:border group-[.toaster]:border-glass-border group-[.toaster]:bg-popover/90 group-[.toaster]:text-popover-foreground group-[.toaster]:shadow-[0_16px_48px_oklch(0_0_0/0.55),0_0_24px_color-mix(in_srgb,var(--color-primary)_8%,transparent),inset_0_1px_0_oklch(1_0_0/0.12)] group-[.toaster]:backdrop-blur-2xl group-[.toaster]:font-sans",
					),
					title: "group-[.toast]:font-medium group-[.toast]:tracking-wide",
					description:
						"group-[.toast]:text-muted-foreground group-[.toast]:text-sm",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-sm group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-xs group-[.toast]:font-medium",
					cancelButton:
						"group-[.toast]:bg-glass group-[.toast]:text-muted-foreground group-[.toast]:rounded-sm group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-xs",
				},
			}}
			{...props}
		/>
	);
}

export { Toaster };
