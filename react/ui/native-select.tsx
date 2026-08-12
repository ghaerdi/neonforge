import type * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
	size?: "sm" | "default";
};

function NativeSelect({
	className,
	size = "default",
	...props
}: NativeSelectProps) {
	return (
		<div
			className={cn(
				"group/native-select relative w-fit has-[select:disabled]:opacity-50",
				className,
			)}
			data-slot="native-select-wrapper"
			data-size={size}
		>
			<select
				data-slot="native-select"
				data-size={size}
				className={cn(
					"h-9 w-full appearance-none rounded-md border border-input bg-background font-mono text-sm text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.06)] transition-all duration-200 outline-none",
					"pr-9 [&>option]:bg-background [&>option]:text-foreground [&>optgroup]:bg-background [&>optgroup]:text-foreground",
					"px-3",
					"focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
					"disabled:pointer-events-none disabled:cursor-not-allowed",
					size === "sm" && "h-8 rounded-md px-3 text-xs",
					className,
				)}
				{...props}
			/>
			<ChevronDownIcon
				className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/native-select:text-primary"
				aria-hidden="true"
			/>
		</div>
	);
}

function NativeSelectOption({
	className,
	...props
}: React.ComponentProps<"option">) {
	return (
		<option
			data-slot="native-select-option"
			className={cn("bg-background text-foreground", className)}
			{...props}
		/>
	);
}

function NativeSelectOptGroup({
	className,
	...props
}: React.ComponentProps<"optgroup">) {
	return (
		<optgroup
			data-slot="native-select-optgroup"
			className={cn("bg-background text-foreground", className)}
			{...props}
		/>
	);
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
