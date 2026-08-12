"use client";

import { useCallback, useEffect, useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipProvider,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Client-only clipboard icon button with a tooltip for the docs code blocks. */
export function CopyButton({
	value,
	label = "copy",
	className,
}: {
	value: string;
	label?: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 1800);
		return () => clearTimeout(t);
	}, [copied]);

	const copy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
		} catch {
			/* clipboard unavailable (e.g. non-secure context) — ignore */
		}
	}, [value]);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						aria-label={
							copied ? "copied to clipboard" : `copy ${label} to clipboard`
						}
						onClick={copy}
						className={cn(
							"size-6 text-muted-foreground/70 hover:text-primary",
							copied && "text-success hover:text-success",
							className,
						)}
					>
						{copied ? (
							<ClipboardCheck className="size-3.5" />
						) : (
							<Clipboard className="size-3.5" />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					{copied ? "copied" : label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
