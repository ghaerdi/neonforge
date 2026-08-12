"use client";

import * as React from "react";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import { type DayButton, DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * NEONFORGE calendar — explicit grid layout, no react-day-picker default CSS.
 * Tokens: hazard-yellow selection with glow, cyan today ring, mono HUD labels.
 */
function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	formatters,
	components,
	...props
}: React.ComponentProps<typeof DayPicker> & {
	buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"group/calendar w-fit rounded-md border border-glass-border bg-card p-4 [--cell-size:3.5rem] [[data-slot=card-content]_&]:border-transparent [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:border-transparent [[data-slot=popover-content]_&]:bg-transparent",
				className,
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString("default", { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("w-fit"),
				months: cn("relative flex flex-col gap-3 md:flex-row"),
				month: cn("flex w-full flex-col gap-2"),
				nav: cn(
					"absolute inset-x-0 top-0 flex items-center justify-between gap-1",
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"h-[var(--cell-size)] w-[var(--cell-size)] select-none rounded-md border border-glass-border bg-secondary/40 p-0 text-muted-foreground hover:bg-glass hover:text-foreground aria-disabled:opacity-40",
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"h-[var(--cell-size)] w-[var(--cell-size)] select-none rounded-md border border-glass-border bg-secondary/40 p-0 text-muted-foreground hover:bg-glass hover:text-foreground aria-disabled:opacity-40",
				),
				month_caption: cn(
					"flex h-[var(--cell-size)] items-center justify-center px-[var(--cell-size)]",
				),
				dropdowns: cn(
					"flex h-[var(--cell-size)] items-center justify-center gap-1.5 text-sm font-medium",
				),
				dropdown_root: cn(
					"has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
				),
				dropdown: cn("bg-popover absolute inset-0 opacity-0"),
				caption_label: cn(
					"select-none font-mono text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-foreground",
					captionLayout === "dropdown"
						? "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5"
						: "",
				),
				month_grid: cn("w-full border-collapse"),
				weekdays: cn(""),
				weekday: cn(
					"text-muted-foreground h-10 w-[var(--cell-size)] select-none text-center font-mono text-[0.6875rem] uppercase tracking-[0.25em]",
				),
				week: cn(""),
				week_number_header: cn("w-[var(--cell-size)] select-none"),
				week_number: cn("text-muted-foreground select-none text-[0.8rem]"),
				day: cn(
					"group/day relative h-auto w-[var(--cell-size)] select-none p-0 text-center",
				),
				range_start: cn(
					"rounded-l-md rounded-r-none data-[selected=true]:rounded-l-md",
				),
				range_middle: cn("rounded-none"),
				range_end: cn(
					"rounded-r-md rounded-l-none data-[selected=true]:rounded-r-md",
				),
				today: cn(
					"ring-1 ring-inset ring-primary/70 data-[selected=true]:ring-0",
				),
				outside: cn("opacity-35 aria-selected:opacity-35"),
				disabled: cn("text-muted-foreground opacity-40"),
				hidden: cn("invisible"),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cn(className)}
							{...props}
						/>
					);
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<ChevronLeftIcon className={cn("size-4", className)} {...props} />
						);
					}

					if (orientation === "right") {
						return (
							<ChevronRightIcon
								className={cn("size-4", className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon className={cn("size-4", className)} {...props} />
					);
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-[var(--cell-size)] items-center justify-center text-center">
								{children}
							</div>
						</td>
					);
				},
				...components,
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>) {
	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				"flex size-[var(--cell-size)] flex-col items-center justify-center rounded-md font-mono text-[0.8125rem] leading-none transition-colors hover:bg-glass data-[selected-single=true]:rounded-md data-[selected-single=true]:bg-primary data-[selected-single=true]:font-semibold data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:shadow-[var(--nf-glow-primary)] data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-primary/15 data-[range-middle=true]:text-primary data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground [&>span]:text-xs [&>span]:opacity-70",
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
