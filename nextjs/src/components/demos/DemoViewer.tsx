"use client";

import { DEMOS } from "./index";

/** Renders the registered demo for a component slug, or a fallback. */
export function DemoViewer({ slug }: { slug: string }) {
	const Demo = DEMOS[slug];
	if (!Demo) {
		return (
			<div className="grid min-h-40 place-items-center rounded-md border border-dashed border-glass-border font-mono text-xs uppercase tracking-widest text-muted-foreground">
				no live demo for `{slug}`
			</div>
		);
	}
	return <Demo />;
}
