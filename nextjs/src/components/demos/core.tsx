"use client";

import * as React from "react";
import { ArrowRight, Download, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { Clip } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DirectionProvider } from "@/components/ui/direction";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Frame } from "@/components/ui/frame";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyP,
	TypographyBlockquote,
	TypographyList,
	TypographyInlineCode,
	TypographyLead,
	TypographyLarge,
	TypographySmall,
	TypographyMuted,
} from "@/components/ui/typography";

import { DemoFrame, CtrlChip, CtrlRow } from "./DemoFrame";

export function BadgeDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex flex-wrap items-center justify-center gap-2">
					<Badge>default</Badge>
					<Badge variant="outline">outline</Badge>
					<Badge variant="secondary">secondary</Badge>
					<Badge variant="success">success</Badge>
					<Badge variant="warning">warning</Badge>
					<Badge variant="destructive">destructive</Badge>
					<Badge variant="info">info</Badge>
				</div>
			}
		/>
	);
}

export function ButtonDemo() {
	const [size, setS] = React.useState<ButtonProps["size"]>("default");
	return (
		<DemoFrame
			demo={
				<div className="flex flex-wrap items-center justify-center gap-2">
					<Button size={size}>Default</Button>
					<Button size={size} variant="outline" clip="none">
						Outline
					</Button>
					<Button size={size} variant="secondary">
						Secondary
					</Button>
					<Button size={size} variant="ghost">
						Ghost
					</Button>
					<Button size={size} variant="destructive">
						Destructive
					</Button>
					<Button size={size} variant="success">
						Success
					</Button>
					<Button size={size} variant="warning">
						Warning
					</Button>
					<Button size={size} variant="info">
						Info
					</Button>
					<Button size={size} variant="link">
						Link
					</Button>
				</div>
			}
			controls={
				<CtrlRow label="size">
					{(["sm", "default", "lg"] as const).map((x) => (
						<CtrlChip key={x} active={size === x} onClick={() => setS(x)}>
							{x}
						</CtrlChip>
					))}
				</CtrlRow>
			}
		/>
	);
}

export function CardDemo() {
	const [clip, setClip] = React.useState<Clip>("br");
	return (
		<DemoFrame
			demo={
				<Card clip={clip} className="w-80">
					<CardHeader>
						<CardTitle className="font-mono text-sm font-bold uppercase tracking-[0.15em]">
							NeonForge Node
						</CardTitle>
						<CardDescription className="text-xs leading-5">
							Deploy a new neon forge node to the mesh.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Industrial-gradient surface with a chamfered corner. The clip prop
						controls which corner is carved diagonally.
					</CardContent>
					<CardFooter className="flex gap-2">
						<Button size="sm">Deploy</Button>
						<Button size="sm" variant="ghost">
							Cancel
						</Button>
					</CardFooter>
				</Card>
			}
			controls={
				<CtrlRow label="clip">
					{(["br", "tl", "tr", "bl", "diag", "none"] as const).map((x) => (
						<CtrlChip
							key={x}
							active={clip === x}
							onClick={() => setClip(x)}
						>
							{x}
						</CtrlChip>
					))}
				</CtrlRow>
			}
		/>
	);
}

export function DirectionDemo() {
	const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr");
	return (
		<DemoFrame
			demo={
				<DirectionProvider dir={dir}>
					<div className="w-72 rounded-md border border-glass-border bg-secondary/20 p-4">
						<p className="mb-3 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
							dir: {dir} — flex order mirrors
						</p>
						<div className="flex items-center gap-2" style={{ direction: dir }}>
							<span className="rounded-sm border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
								start
							</span>
							<span className="rounded-sm border border-glass-border bg-card px-2 py-1 font-mono text-xs">
								mid
							</span>
							<span className="rounded-sm border border-info/40 bg-info/10 px-2 py-1 font-mono text-xs text-info">
								end
							</span>
						</div>
					</div>
				</DirectionProvider>
			}
			controls={
				<CtrlRow label="dir">
					<CtrlChip active={dir === "ltr"} onClick={() => setDir("ltr")}>
						ltr
					</CtrlChip>
					<CtrlChip active={dir === "rtl"} onClick={() => setDir("rtl")}>
						rtl
					</CtrlChip>
				</CtrlRow>
			}
		/>
	);
}

export function EmptyDemo() {
	return (
		<DemoFrame
			demo={
				<Empty className="w-72">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Terminal className="size-6" />
						</EmptyMedia>
						<EmptyTitle>No clusters</EmptyTitle>
						<EmptyDescription>
							No neon forge nodes detected in this zone. Provision one to get
							started.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			}
		/>
	);
}

export function FrameDemo() {
	const [clip, setClip] = React.useState<Clip>("br");
	return (
		<DemoFrame
			demo={
				<Frame
					clip={clip}
					title="frame.preview"
					action={<ArrowRight className="size-3.5 text-primary" />}
					className="w-72"
				>
					<div className="flex flex-col gap-2 p-4">
						<h3 className="font-mono text-sm font-bold uppercase tracking-[0.15em]">
							Bordered shell
						</h3>
						<p className="text-xs leading-5 text-muted-foreground">
							Two-layer ring so the chamfer border stays crisp along the
							diagonal.
						</p>
					</div>
				</Frame>
			}
			controls={
				<CtrlRow label="clip">
					{(["br", "tl", "diag", "none"] as const).map((x) => (
						<CtrlChip
							key={x}
							active={clip === x}
							onClick={() => setClip(x)}
						>
							{x}
						</CtrlChip>
					))}
				</CtrlRow>
			}
		/>
	);
}

export function ItemDemo() {
	return (
		<DemoFrame
			demo={
				<ItemGroup className="w-72 divide-y divide-glass-border rounded-md border border-glass-border bg-card">
					<Item>
						<ItemMedia variant="icon">
							<Terminal className="size-4" />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>deploy</ItemTitle>
							<ItemDescription>
								Ship the current node config to the mesh.
							</ItemDescription>
						</ItemContent>
						<Button variant="ghost" size="sm">
							Run
						</Button>
					</Item>
					<Item>
						<ItemMedia variant="icon">
							<Download className="size-4" />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>export</ItemTitle>
							<ItemDescription>
								Download the generated preset bundle.
							</ItemDescription>
						</ItemContent>
					</Item>
				</ItemGroup>
			}
		/>
	);
}

export function KbdDemo() {
	return (
		<DemoFrame
			demo={
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>⇧</Kbd>
					<Kbd>P</Kbd>
				</KbdGroup>
			}
		/>
	);
}

export function SeparatorDemo() {
	const [orient, setO] = React.useState<"horizontal" | "vertical">(
		"horizontal",
	);
	return (
		<DemoFrame
			demo={
				<div className="flex flex-col items-center gap-4">
					<div className="flex items-center gap-3 text-xs text-muted-foreground">
						<span>left</span>
						<Separator
							orientation={orient}
							className={orient === "vertical" ? "h-8" : "w-28"}
						/>
						<span>right</span>
					</div>
				</div>
			}
			controls={
				<CtrlRow label="orientation">
					<CtrlChip
						active={orient === "horizontal"}
						onClick={() => setO("horizontal")}
					>
						horizontal
					</CtrlChip>
					<CtrlChip
						active={orient === "vertical"}
						onClick={() => setO("vertical")}
					>
						vertical
					</CtrlChip>
				</CtrlRow>
			}
		/>
	);
}

export function SkeletonDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex w-72 flex-col gap-3">
					<Skeleton className="size-12 rounded-sm" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
					</div>
					<Skeleton className="h-20 w-full" />
				</div>
			}
		/>
	);
}

export function SpinnerDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex flex-wrap items-center gap-6">
					<Spinner className="size-4" />
					<Spinner className="size-6 text-primary" />
					<Spinner className="size-8 text-info" />
				</div>
			}
		/>
	);
}

export function TypographyDemo() {
	return (
		<DemoFrame
			demo={
				<div className="w-full max-w-md space-y-4 text-left">
					<TypographyH1>Heading One</TypographyH1>
					<TypographyH2>Heading Two</TypographyH2>
					<TypographyH3>Heading Three</TypographyH3>
					<TypographyH4>Heading Four</TypographyH4>
					<TypographyLead>
						A lead paragraph — slightly larger, muted, sets off a section.
					</TypographyLead>
					<TypographyP>
						Body text with <TypographyInlineCode>inline code</TypographyInlineCode>.
					</TypographyP>
					<TypographyMuted>Muted highlights paragraph.</TypographyMuted>
					<TypographyBlockquote>
						"The chrome is in the chamfer."
					</TypographyBlockquote>
					<TypographyList>
						<li>first principle</li>
						<li>second principle</li>
					</TypographyList>
					<TypographySmall>small print</TypographySmall>
					<TypographyLarge>Large text</TypographyLarge>
				</div>
			}
		/>
	);
}
