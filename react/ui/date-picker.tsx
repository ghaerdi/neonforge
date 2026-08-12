"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

/**
 * NEONFORGE date picker — Calendar + Popover composition.
 * Trigger is an outline HUD button showing the formatted selection.
 */
function DatePicker({
	value,
	onSelect,
	placeholder = "Pick a date",
	disabled,
	className,
	align = "start",
}: {
	value?: Date;
	onSelect?: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	align?: "start" | "center" | "end";
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					disabled={disabled}
					className={cn(
						"w-fit justify-start gap-2 font-mono text-sm font-normal",
						!value && "text-muted-foreground",
						className,
					)}
				>
					<CalendarIcon className="size-4 shrink-0 text-primary" />
					{value ? (
						format(value, "PPP")
					) : (
						<span className="opacity-80">{placeholder}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align={align}
				className="w-auto border-glass-border bg-popover/95 p-0 backdrop-blur-2xl"
			>
				<Calendar
					mode="single"
					selected={value}
					onSelect={onSelect}
					autoFocus
					className="border-0 bg-transparent shadow-none"
				/>
			</PopoverContent>
		</Popover>
	);
}

export { DatePicker };
