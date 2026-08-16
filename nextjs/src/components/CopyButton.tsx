"use client";

import { useCopy } from "../lib/use-copy";
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
	const { copiedKey, copy } = useCopy();
	const copied = copiedKey !== null;

	// CopyButton is a single-purpose icon: reuse the hook's "copy" key.
	const onCopy = () => copy("copy", value);

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
						onClick={onCopy}
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
