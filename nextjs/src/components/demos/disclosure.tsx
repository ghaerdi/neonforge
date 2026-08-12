"use client";

import * as React from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from "@/components/ui/button-group";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { DemoFrame, CtrlChip, CtrlRow } from "./DemoFrame";

export function AccordionDemo() {
	return (
		<DemoFrame
			demo={
				<Accordion type="single" collapsible className="w-80">
					<AccordionItem value="deploy">
						<AccordionTrigger>Deployments</AccordionTrigger>
						<AccordionContent>
							Ship presets to the mesh in one command.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="cache">
						<AccordionTrigger>Cache</AccordionTrigger>
						<AccordionContent>
							Registry resolution cached for 24 hours.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="auth">
						<AccordionTrigger>Auth</AccordionTrigger>
						<AccordionContent>
							Token-scoped keys for every node.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			}
		/>
	);
}

export function CollapsibleDemo() {
	const [open, setOpen] = React.useState(false);
	return (
		<DemoFrame
			demo={
				<div className="w-80 text-left">
					<Collapsible open={open} onOpenChange={setOpen}>
						<CollapsibleTrigger asChild>
							<button
								type="button"
								className="flex w-full items-center justify-between rounded-md border border-glass-border bg-secondary/30 px-4 py-3 text-left transition-colors hover:bg-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<span className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-foreground">
									<span className="h-1.5 w-1.5 rounded-full bg-primary" />
									Node config
								</span>
								<svg
									className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
									fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
								</svg>
							</button>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div className="mt-2 grid grid-cols-2 gap-2 rounded-md border border-glass-border bg-secondary/20 p-4 font-mono text-[0.6875rem] text-muted-foreground">
								<span className="text-muted-foreground/60">tls</span>
								<span>required</span>
								<span className="text-muted-foreground/60">timeout</span>
								<span>30s</span>
								<span className="text-muted-foreground/60">retries</span>
								<span>3</span>
							</div>
						</CollapsibleContent>
					</Collapsible>
				</div>
			}
		/>
	);
}

export function AspectRatioDemo() {
	return (
		<DemoFrame
			demo={
				<AspectRatio ratio={16 / 9} className="w-80 overflow-hidden rounded-md border border-glass-border">
				<div className="grid h-full w-full place-items-center bg-secondary/20">
					<div className="flex flex-col items-center gap-1">
						<span className="font-mono text-3xl font-bold text-primary">16:9</span>
						<span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
							aspect ratio
						</span>
					</div>
				</div>
			</AspectRatio>
			}
		/>
	);
}

export function AvatarDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex items-center gap-4">
					<Avatar className="size-10" clipCut={0.5}>
						<AvatarFallback className="bg-primary/10 font-mono text-primary">
							OP
						</AvatarFallback>
					</Avatar>
					<Avatar className="size-12" clipCut={0.55}>
						<AvatarFallback className="bg-info/10 font-mono text-info">
							NF
						</AvatarFallback>
					</Avatar>
					<Avatar className="size-14" clipCut={0.6}>
						<AvatarFallback className="bg-warning/10 font-mono text-warning">
							Z1
						</AvatarFallback>
					</Avatar>
				</div>
			}
		/>
	);
}

export function CarouselDemo() {
	return (
		<DemoFrame
			demo={
				<div className="w-full max-w-sm">
					<Carousel>
						<CarouselContent>
							{["deploy", "cache", "auth", "mesh", "preset"].map((label) => (
								<CarouselItem key={label} className="basis-full sm:basis-1/2">
									<div className="grid aspect-video place-items-center rounded-md border border-glass-border bg-secondary/30 font-mono text-sm uppercase tracking-widest text-primary">
										{label}
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="hidden" />
						<CarouselNext className="hidden" />
						<div className="mt-2 flex justify-center gap-2">
							<CarouselPrevious className="static size-8 translate-y-0" />
							<CarouselNext className="static size-8 translate-y-0" />
						</div>
					</Carousel>
				</div>
			}
		/>
	);
}

export function ResizableDemo() {
	return (
		<DemoFrame
			demo={
				<ResizablePanelGroup
					orientation="horizontal"
					className="h-40 w-96 rounded-md border border-glass-border"
				>
					<ResizablePanel defaultSize={55}>
						<div className="flex h-full min-w-0 items-center justify-center overflow-hidden bg-secondary/15 p-3 font-mono text-xs uppercase tracking-widest text-foreground">
							nodes
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={45}>
						<div className="flex h-full min-w-0 items-center justify-center overflow-hidden bg-secondary/15 p-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
							detail
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			}
		/>
	);
}

export function ScrollAreaDemo() {
	return (
		<DemoFrame
			demo={
				<ScrollArea className="h-40 w-72 rounded-md border border-glass-border">
					<div className="flex flex-col gap-2 p-4 font-mono text-xs text-muted-foreground">
						{[
							"[deploy] queued nf-01",
							"[done]   nf-01 shipped",
							"[info]   cache refreshed",
							"[warn]   node nf-04 draining",
							"[ok]     registry synced",
							"[deploy] queued nf-02",
							"[done]   nf-02 shipped",
						].map((l) => (
							<span key={l}>{l}</span>
						))}
					</div>
					<ScrollBar />
				</ScrollArea>
			}
		/>
	);
}

export function ButtonGroupDemo() {
	return (
		<DemoFrame
			demo={
				<ButtonGroup orientation="horizontal">
					<ButtonGroupText>view:</ButtonGroupText>
					<Button size="sm" variant="outline">
						list
					</Button>
					<ButtonGroupSeparator />
					<Button size="sm" variant="outline">
						grid
					</Button>
					<Button size="sm" variant="outline">
						gall
					</Button>
				</ButtonGroup>
			}
		/>
	);
}

export function ToggleDemo() {
	const [active, setActive] = React.useState(false);
	const [variant, setVariant] = React.useState<"default" | "outline">(
		"outline",
	);
	return (
		<DemoFrame
			demo={
				<Toggle
					pressed={active}
					onPressedChange={setActive}
					variant={variant}
					className="px-4 py-2 text-sm"
				>
					{active ? "On" : "Off"}
				</Toggle>
			}
			controls={
				<>
					<CtrlRow label="state">
						<CtrlChip active={active} onClick={() => setActive(true)}>
							on
						</CtrlChip>
						<CtrlChip active={!active} onClick={() => setActive(false)}>
							off
						</CtrlChip>
					</CtrlRow>
					<CtrlRow label="variant">
						<CtrlChip
							active={variant === "default"}
							onClick={() => setVariant("default")}
						>
							default
						</CtrlChip>
						<CtrlChip
							active={variant === "outline"}
							onClick={() => setVariant("outline")}
						>
							outline
						</CtrlChip>
					</CtrlRow>
				</>
			}
		/>
	);
}

export function ToggleGroupDemo() {
	const [picks, setPicks] = React.useState<string[]>(["grid"]);
	return (
		<DemoFrame
			demo={
				<ToggleGroup
					type="multiple"
					variant="outline"
					value={picks}
					onValueChange={(v) => v && setPicks(v)}
				>
					{["grid", "row", "col"].map((l) => (
						<ToggleGroupItem key={l} value={l} className="px-3">
							{l}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			}
			controls={
				<p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
					selected: {picks.join(" / ") || "none"}
				</p>
			}
		/>
	);
}
