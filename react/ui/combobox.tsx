"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
	value: string;
	label: string;
}

export interface ComboboxProps {
	options: ComboboxOption[];
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	emptyText?: string;
	className?: string;
	disabled?: boolean;
}

export function Combobox({
	options,
	value,
	onValueChange,
	placeholder = "Select option…",
	emptyText = "No results found.",
	className,
	disabled,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);

	const selected = options.find((o) => o.value === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={disabled}
					className={cn(
						"w-full justify-between font-normal",
						!selected && "text-muted-foreground",
						className,
					)}
				>
					{selected ? selected.label : placeholder}
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
				<Command>
					<CommandInput placeholder="Search…" />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.label}
									onSelect={() => {
										onValueChange?.(option.value);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 size-4 text-primary",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
