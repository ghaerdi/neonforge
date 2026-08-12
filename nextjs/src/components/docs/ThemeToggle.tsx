"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

const KEY = "nf-mode";

function readMode(): "light" | "dark" {
	if (typeof document !== "undefined") {
		const el = document.documentElement;
		if (el.dataset.nfMode === "light") return "light";
		if (el.dataset.nfMode === "dark") return "dark";
	}
	return "dark";
}

function apply(mode: "light" | "dark") {
	document.documentElement.dataset.nfMode = mode;
	try {
		localStorage.setItem(KEY, mode);
	} catch {
		/* ignore private-mode failures */
	}
}

/** Sun/Moon toggle for the light/dark mode. Defaults to dark (no data-nf-mode);
 *  a saved preference is applied on mount and by the pre-paint script. */
export function ThemeToggle() {
	// SSR + first client paint always match: dark. Flip after mount if saved.
	const [mode, setMode] = React.useState<"light" | "dark">("dark");
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMode(readMode());
		setMounted(true);
	}, []);

	const toggle = () => {
		const next: "light" | "dark" = mode === "light" ? "dark" : "light";
		apply(next);
		setMode(next);
	};

	const isLight = mounted && mode === "light";

	return (
		<Button
			size="icon"
			variant="outline"
			aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
			title={isLight ? "Switch to dark mode" : "Switch to light mode"}
			onClick={toggle}
			className="size-8 shrink-0"
		>
			{isLight ? <Sun className="size-4" /> : <Moon className="size-4" />}
		</Button>
	);
}
