"use client";

import * as React from "react";
import { Code2, Copy, Dices, Download, Import, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	AXES,
	type Axis,
	DEFAULTS,
	OPTIONS,
	type Option,
	type PresetSelection,
	STYLE_BUNDLES,
	selectionToCss,
	type StyleMode,
} from "../../lib/presets";
import { encodePreset } from "../../lib/preset-codec";
import { downloadThemeCss } from "../../lib/theme-store";
import { INSTALL_CMD } from "../../lib/catalog";


function ShapeGlyph({ mode }: { mode: "rect" | "round" }) {
	const cut = "0.28rem";
	const carve = (c: "tl" | "tr" | "bl" | "br") =>
		c === "tl" || c === "br" ? cut : "0";
	const radius = (_c: string) => (mode === "round" ? "0.2rem" : "0");
	const tl = carve("tl");
	const tr = carve("tr");
	const bl = carve("bl");
	const br = carve("br");
	return (
		<span
			className="block size-6 border border-current"
			style={{
				clipPath: `polygon(0 ${tl}, ${tl} 0, 100% 0, 100% ${tr}, calc(100% - ${tr}) 0, 100% calc(100% - ${br}), calc(100% - ${br}) 100%, 0 100%, ${bl} 100%, 0 calc(100% - ${bl}))`,
				borderRadius: `0 ${radius("tr")} ${radius("bl")} 0`,
			}}
		/>
	);
}


/** Guides the user on wiring up Neonforge components with the current preset:
 *  the install command, the shareable ?preset= code, and the generated CSS. */
function GetCodeDialog({
	open,
	onOpenChange,
	selection,
}: {
	open: boolean;
	onOpenChange: (o: boolean) => void;
	selection: PresetSelection;
}) {
	const css = React.useMemo(
		() => selectionToCss(selection),
		[selection],
	);
	const code = encodePreset(selection);
	const [copied, setCopied] = React.useState<string | null>(null);

	const copy = async (label: string, text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			/* ignore */
		}
		setCopied(label);
		setTimeout(() => setCopied((c) => (c === label ? null : c)), 1400);
	};

	const blocks: {
		step: string;
		title: string;
		body: string;
		code: string | null;
		label: string;
	}[] = [
		{
			step: "01",
			title: "Install a component",
			body:
				"Every primitive is a shadcn registry item. Pull exactly the ones you need into your project.",
			code: `# pick any component, e.g. button, input, chart\n${INSTALL_CMD("button")}\n${INSTALL_CMD("chart")}`,
			label: "install",
		},
		{
			step: "02",
			title: "Copy and paste the CSS",
			body:
				"A self-contained token block — copy it into your own stylesheet and the components adopt the preset.",
			code: css.trim(),
			label: "css",
		},
	];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
				<DialogHeader>
					<DialogTitle className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
						Get components — {code.slice(0, 8)}…
					</DialogTitle>
					<DialogDescription>
						Ship Neonforge primitives with this exact theme in two steps.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					{blocks.map((b) => (
						<div key={b.label} className="flex gap-3">
							<span className="font-mono text-sm font-bold text-primary/60">{b.step}</span>
							<div className="min-w-0 flex-1">
								<p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
									{b.title}
								</p>
								<p className="mt-1 text-xs leading-5 text-muted-foreground">{b.body}</p>
								{b.code ? (
									<div className="mt-2 flex items-start gap-2">
										<pre className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-all rounded-md border border-input bg-foreground/5 p-3 font-mono text-[0.6875rem] leading-relaxed text-foreground/90">
											{b.code}
										</pre>
										<Button
											variant="outline"
											size="sm"
											clip="none"
											onClick={() => copy(b.label, b.code!)}
											className="h-auto shrink-0 px-2 py-1 text-muted-foreground hover:text-foreground"
										>
											{copied === b.label ? (
												<span className="font-mono text-[0.625rem] text-primary">copied</span>
											) : (
												<Copy className="size-3.5" />
											)}
										</Button>
									</div>
								) : null}
							</div>
						</div>
					))}
				</div>

				<DialogFooter className="mt-2 gap-2">
					<Button
						variant="outline"
						clip="none"
						onClick={() => downloadThemeCss(selection)}
						className="gap-2"
					>
						<Download className="size-3.5" />
						Download theme.css
					</Button>
					<DialogTrigger asChild>
						<Button variant="outline" clip="none" onClick={() => onOpenChange(false)}>
							Done
						</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/** Theme styling pickers — rendered in the Create page sidebar. */
export function CreateSidebar({
	selection,
	lockedAxes,
	onSelect,
	onSelectStyle,
	onToggleLock,
	onFactory,
	onShuffle,
	importKey,
	setImportKey,
	onImport,
	importMsg,
}: {
	selection: PresetSelection;
	lockedAxes: Record<Axis, boolean>;
	onSelectStyle: (mode: StyleMode) => void;
	onSelect: (axis: Axis, value: string) => void;
	onToggleLock: (axis: Axis) => void;
	onFactory: () => void;
	onShuffle: () => void;
	importKey: string;
	setImportKey: (v: string) => void;
	onImport: (key: string) => void;
	importMsg: string | null;
}) {
	const isStreetkid = (selection.style ?? DEFAULTS.style) === "streetkid";
	const [getOpen, setGetOpen] = React.useState(false);
	return (
		<div className="flex h-full flex-col gap-5 overflow-x-hidden overflow-y-auto py-4 pr-4">

			<div>
				<p className="pl-6 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
					Styling axes
				</p>
				<p className="mt-0.5 pl-6 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/60">
					fine-tune the 7 tweakable axes
				</p>
			</div>

			<div className="flex flex-col gap-4 px-2">

				<section>
					<div className="mb-1 flex items-start justify-between gap-2">
						<div className="flex flex-col">
							<h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
								Genre
							</h2>
							<span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
								streetkid · nomad · corpo
							</span>
						</div>
						<button
							type="button"
							title={lockedAxes.style ? "Unlock (shuffle keeps it)" : "Lock (shuffle keeps it)"}
							aria-label={lockedAxes.style ? "Unlock genre" : "Lock genre"}
							onClick={() => onToggleLock("style")}
							className={cn(
								"grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm border transition-colors",
								lockedAxes.style
									? "border-primary/70 bg-primary/15 text-primary"
									: "border-glass-border text-muted-foreground/50 hover:text-foreground",
							)}
						>
							{lockedAxes.style ? <Lock className="size-3" /> : <Unlock className="size-3" />}
						</button>
					</div>
					<Select
						value={selection.style ?? DEFAULTS.style}
						onValueChange={(v) => onSelectStyle(v as StyleMode)}
					>
						<SelectTrigger className="h-8 w-full">
							<SelectValue>
								<span className="flex items-center gap-2">
									<span className="text-sm leading-none">Aa</span>
									<span>
										{(selection.style ?? DEFAULTS.style).replace(/^\w/, (c) => c.toUpperCase())}
									</span>
								</span>
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{(Object.entries(STYLE_BUNDLES) as [StyleMode, (typeof STYLE_BUNDLES)[StyleMode]][]).map(
								([mode, { tagline }]) => (
									<SelectItem key={mode} value={mode}>
										<span className="flex items-center gap-2">
											<span className="text-sm leading-none">
												{mode.charAt(0).toUpperCase() + mode.slice(1)}
											</span>
											<span className="text-muted-foreground">{tagline}</span>
										</span>
									</SelectItem>
								),
							)}
						</SelectContent>
					</Select>
				</section>

				{AXES.filter((axis) => axis.id !== "style").map((axis) => {
					const options: readonly Option[] = isStreetkid && axis.id === "shape"
						? OPTIONS[axis.id].filter((o) => o.value !== "round")
						: OPTIONS[axis.id];
					const current = isStreetkid && axis.id === "shape" && selection[axis.id] === "round"
						? "rect"
						: (selection[axis.id] ?? DEFAULTS[axis.id]);
					const currentOpt = options.find((o) => o.value === current);
					return (
						<section key={axis.id}>
							<div className="mb-1 flex items-start justify-between gap-2">
								<div className="flex flex-col">
									<h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
										{axis.title}
									</h2>
									<span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
										{axis.sub}
									</span>
								</div>
								<button
									type="button"
									title={lockedAxes[axis.id] ? "Unlock" : "Lock from shuffle"}
									aria-label={lockedAxes[axis.id] ? `Unlock ${axis.title}` : `Lock ${axis.title}`}
									onClick={() => onToggleLock(axis.id)}
									className={cn(
										"grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm border transition-colors",
										lockedAxes[axis.id]
											? "border-primary/70 bg-primary/15 text-primary"
											: "border-glass-border text-muted-foreground/50 hover:text-foreground",
									)}
								>
									{lockedAxes[axis.id] ? <Lock className="size-3" /> : <Unlock className="size-3" />}
								</button>
							</div>
							<Select value={current} onValueChange={(v) => onSelect(axis.id, v)}>
								<SelectTrigger className="h-8 w-full">
									<SelectValue>
										<span className="flex items-center gap-2">
											{currentOpt?.colors?.length ? (
												<span className="flex gap-0.5">
													{currentOpt.colors.slice(0, 3).map((c) => (
														<span key={c} className="size-2.5 rounded-sm border border-white/20" style={{ background: c }} />
													))}
												</span>
											) : (
												<span className="text-sm leading-none">Aa</span>
											)}
											<span>{currentOpt?.label ?? current}</span>
										</span>
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{options.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											<span className="flex items-center gap-2">
												{opt.colors?.length ? (
													<span className="flex gap-0.5">
														{opt.colors.slice(0, 3).map((c) => (
															<span key={c} className="size-2.5 rounded-sm border border-white/20" style={{ background: c }} />
														))}
													</span>
												) : opt.fontStack ? (
													<span
														className="text-base leading-none"
														style={{ fontFamily: opt.fontStack }}
													>
														Ag
													</span>
												) : opt.shape ? (
													<ShapeGlyph mode={opt.shape} />
												) : (
													<span className="text-sm leading-none">Aa</span>
												)}
												<span>{opt.label}</span>
											</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</section>
					);
				})}
			</div>

			<div className="mt-auto border-t border-glass-border px-2 pt-3">
				<Button
					variant="outline"
					size="sm"
					onClick={onShuffle}
					className="mb-3 h-9 w-full text-[0.6875rem]"
				>
					<Dices className="size-3.5" />
					Shuffle
				</Button>
				<Button
					variant="default"
					size="sm"
					onClick={() => setGetOpen(true)}
					className="mb-2 h-9 w-full text-[0.6875rem]"
				>
					<Code2 className="size-3.5" />
					Get code
				</Button>
				<div className="mb-1 flex items-center justify-between pl-4">
					<p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
						export preset code
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 text-muted-foreground hover:text-foreground"
						onClick={onFactory}
						title="Copy preset code"
					>
						<Copy className="size-3" />
						<span className="ml-1 font-mono text-[0.5625rem] uppercase tracking-widest">
							Copy
						</span>
					</Button>
				</div>
				<p className="max-w-full break-all rounded-sm border border-input bg-foreground/5 px-2 py-1.5 pl-4 font-mono text-[0.6875rem] leading-relaxed tracking-[0.08em] text-primary">
					{encodePreset(selection)}
				</p>

				<div className="mt-3 flex gap-2 pl-2">
					<Input
						value={importKey}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setImportKey(e.target.value);
						}}
						placeholder="paste preset code…"
						className="font-mono text-xs"
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
							if (e.key === "Enter") onImport(importKey);
						}}
            clip="none"
					/>
					<Button
						size="icon"
						onClick={() => onImport(importKey)}
						aria-label="Import preset code"
						className="shrink-0"
            clip="br"
					>
						<Import className="size-4" />
					</Button>
				</div>
				{importMsg ? (
					<p
						className={cn(
							"mt-2 pl-2 font-mono text-[0.625rem] uppercase tracking-widest",
							importMsg.startsWith("invalid")
								? "text-destructive"
								: "text-success",
						)}
					>
						{importMsg}
					</p>
				) : null}
			</div>

			<GetCodeDialog
				open={getOpen}
				onOpenChange={setGetOpen}
				selection={selection}
			/>
		</div>
	);
}
