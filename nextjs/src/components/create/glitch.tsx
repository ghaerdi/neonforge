"use client";

import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";

import { ShowcaseCard } from "./card-ui";

/** Glitch lab — the distortion primitives, all opt-in. */
export function GlitchWidget() {
	return (
		<ShowcaseCard title="Glitch lab" sub="opt-in distortion">
			<div className="space-y-4">
				<div>
					<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						hover · persistent text split
					</p>
					<span className="nf-glitch-hover nf-text-split-hover inline-block font-mono text-2xl font-bold uppercase tracking-[0.08em] text-primary">
						hover to fry
					</span>
				</div>

				<div>
					<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						click · sliced ghosts
					</p>
					<GlitchText
						trigger="click"
						className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-foreground"
					>
						click me
					</GlitchText>
				</div>

				<div>
					<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						auto · bursts then quiet
					</p>
					<GlitchText
						trigger="auto"
						autoBursts={2}
						className="font-mono text-2xl font-bold uppercase tracking-[0.08em] text-info"
					>
						auto burst
					</GlitchText>
				</div>

				<div>
					<p className="mb-1.5 font-mono text-[0.5625rem] uppercase tracking-widest text-muted-foreground">
						hard · nf-glitch-hard 2.5×
					</p>
					<GlitchText
						trigger="hover"
						className="nf-glitch-hard font-mono text-2xl font-bold uppercase tracking-[0.08em] text-destructive"
					>
						hard mode
					</GlitchText>
				</div>

				<Button glitch className="nf-glitch-hard w-full" clip="br">
					Glitch button
				</Button>
			</div>
		</ShowcaseCard>
	);
}
