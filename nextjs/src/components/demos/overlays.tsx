"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { DemoFrame, CtrlChip, CtrlRow } from "./DemoFrame";

export function AlertDialogDemo() {
	return (
		<DemoFrame
			demo={
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Decommission node</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Remove this node?</AlertDialogTitle>
							<AlertDialogDescription>
								The forge node nf-01 will be permanently decommissioned. This
								cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Decommission</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			}
		/>
	);
}

export function CommandDemo() {
	return (
		<DemoFrame
			demo={
				<Command className="w-72 rounded-md border border-glass-border bg-card">
					<CommandInput placeholder="Search…" />
					<CommandList>
						<CommandEmpty>No results.</CommandEmpty>
						<CommandGroup heading="Actions">
							<CommandItem>Deploy node</CommandItem>
							<CommandItem>New preset</CommandItem>
							<CommandItem>Export theme</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			}
		/>
	);
}

export function ContextMenuDemo() {
	return (
		<DemoFrame
			demo={
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<div className="grid size-48 cursor-pointer place-items-center rounded-md border border-dashed border-glass-border bg-muted/20 font-mono text-xs uppercase tracking-widest text-muted-foreground">
							right-click
						</div>
					</ContextMenuTrigger>
					<ContextMenuContent className="w-48">
						<ContextMenuItem>
							Refresh
							<ContextMenuShortcut>⌘R</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuItem>Duplicate</ContextMenuItem>
						<ContextMenuSeparator />
						<ContextMenuItem className="text-destructive focus:text-destructive">
							Delete
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			}
		/>
	);
}

export function DialogDemo() {
	return (
		<DemoFrame
			demo={
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Deploy preset</DialogTitle>
							<DialogDescription>
								Ship the selected preset to all connected nodes.
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-4 font-mono text-sm text-muted-foreground">
							<code>base:carbon;accent:cyan;shape:round</code>
						</div>
						<DialogFooter>
							<Button variant="ghost">Cancel</Button>
							<Button>Deploy</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			}
		/>
	);
}

export function DrawerDemo() {
	return (
		<DemoFrame
			demo={
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant="outline">Open drawer</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Node activity</DrawerTitle>
							<DrawerDescription>
								Live telemetry for the selected forge.
							</DrawerDescription>
						</DrawerHeader>
						<div className="px-6 pb-6 font-mono text-sm text-muted-foreground">
							p95 latency 42ms · 12 nodes online
						</div>
					</DrawerContent>
				</Drawer>
			}
		/>
	);
}

export function HoverCardDemo() {
	return (
		<DemoFrame
			demo={
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant="link">@operator</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-64">
						<div className="flex flex-col gap-1">
							<span className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-foreground">
								Operator-01
							</span>
							<span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
								mesh admin · since 2087
							</span>
						</div>
					</HoverCardContent>
				</HoverCard>
			}
		/>
	);
}

export function PopoverDemo() {
	return (
		<DemoFrame
			demo={
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">Pick accent</Button>
					</PopoverTrigger>
					<PopoverContent className="w-56">
						<div className="flex flex-wrap gap-2">
							{["#fcee0a", "#00f0ff", "#ff2a4d", "#a855f7", "#ffc832"].map(
								(c) => (
									<button
										key={c}
										className="size-7 rounded-sm border border-white/20"
										style={{ background: c }}
										aria-label={c}
									/>
								),
							)}
						</div>
					</PopoverContent>
				</Popover>
			}
		/>
	);
}

export function SheetDemo() {
	return (
		<DemoFrame
			demo={
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline">Open sheet</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<SheetHeader>
							<SheetTitle>Registry settings</SheetTitle>
							<SheetDescription>
								Configure resolution and cache behavior.
							</SheetDescription>
						</SheetHeader>
						<div className="px-6 font-mono text-sm text-muted-foreground">
							cache: 24h · registry: local
						</div>
					</SheetContent>
				</Sheet>
			}
		/>
	);
}

export function TooltipDemo() {
	const [side, setSide] = React.useState<"top" | "bottom" | "left" | "right">(
		"top",
	);
	return (
		<DemoFrame
			demo={
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Hover me</Button>
						</TooltipTrigger>
						<TooltipContent side={side}>
							<span className="font-mono text-[0.6875rem]">deploy preset</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			}
			controls={
				<CtrlRow label="side">
					{(["top", "right", "bottom", "left"] as const).map((s) => (
						<CtrlChip key={s} active={side === s} onClick={() => setSide(s)}>
							{s}
						</CtrlChip>
					))}
				</CtrlRow>
			}
		/>
	);
}
