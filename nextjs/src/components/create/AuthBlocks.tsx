"use client";

import * as React from "react";
import { Lock, Mail, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/**
 * Compact sign-in card for the Create gallery.
 *
 * Rendered client-only: password fields are a magnet for browser extensions
 * (LastPass, etc.) that inject DOM nodes into the field wrapper before React
 * hydrates, which `suppressHydrationWarning` cannot mask (it does not cover
 * extra injected *children*). To avoid the hydration mismatch we render an
 * identical-height shell on the server, then mount the real form after
 * hydration — so there is never a password field to mismatch against.
 */
export function LoginShowcase() {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);

	return (
		<Card className="flex h-full w-full flex-col">
			<CardHeader className="text-center">
				<span className="mx-auto grid size-10 place-items-center rounded-sm border border-primary/50 bg-primary/10 shadow-[var(--nf-glow-primary)]">
					<Zap className="size-5 text-primary" />
				</span>
				<h2 className="mt-3 font-mono uppercase tracking-[0.2em]">Sign in</h2>
				<CardDescription>Access the control deck</CardDescription>
			</CardHeader>

			{mounted ? (
				<>
					<CardContent className="flex flex-1 flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="login-email">Operator ID</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									id="login-email"
									placeholder="operator@neonforge.io"
									className="pl-9"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="login-pass">Clearance code</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									id="login-pass"
									type="password"
									placeholder="••••••••"
									className="pl-9"
								/>
							</div>
						</div>
						<Button className="w-full">Authenticate</Button>
					</CardContent>
					<CardFooter className="flex flex-col items-center gap-2">
						<Separator />
						<p className="text-xs text-muted-foreground">
							No clearance?{" "}
							<a href="#" className="font-mono text-primary hover:underline">
								Request access
							</a>
						</p>
					</CardFooter>
				</>
			) : (
				<CardContent className="flex flex-1 flex-col gap-4">
					<div className="animate-pulse rounded-md border border-glass-border bg-secondary/10" aria-hidden />
					<div className="animate-pulse rounded-md border border-glass-border bg-secondary/10" aria-hidden />
					<div className="animate-pulse h-9 rounded-md bg-secondary/10" aria-hidden />
				</CardContent>
			)}
		</Card>
	);
}
