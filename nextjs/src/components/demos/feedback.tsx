"use client";

import * as React from "react";
import { AlertCircle, Terminal } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { DemoFrame, CtrlChip, CtrlRow } from "./DemoFrame";

export function AlertDemo() {
	const [variant, setVariant] = React.useState<"default" | "destructive">(
		"default",
	);
	return (
		<DemoFrame
			demo={
				<div className="w-80 text-left">
					<Alert variant={variant}>
						{variant === "default" ? (
							<Terminal className="size-4" />
						) : (
							<AlertCircle className="size-4" />
						)}
						<AlertTitle>
							{variant === "default" ? "Deployment queued" : "Deploy failed"}
						</AlertTitle>
						<AlertDescription>
							{variant === "default"
								? "Preset nf-cyan shipped to 12 nodes."
								: "Bundle rejected — invalid token on node nf-04."}
						</AlertDescription>
					</Alert>
				</div>
			}
			controls={
				<CtrlRow label="variant">
					<CtrlChip
						active={variant === "default"}
						onClick={() => setVariant("default")}
					>
						default
					</CtrlChip>
					<CtrlChip
						active={variant === "destructive"}
						onClick={() => setVariant("destructive")}
					>
						destructive
					</CtrlChip>
				</CtrlRow>
			}
		/>
	);
}

export function ProgressDemo() {
	const [value, setValue] = React.useState(40);
	React.useEffect(() => {
		const id = setInterval(() => {
			setValue((v) => (v >= 100 ? 0 : v + 10));
		}, 900);
		return () => clearInterval(id);
	}, []);
	return (
		<DemoFrame
			demo={
				<div className="w-72 text-left">
					<div className="mb-2 flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
						<span>deploying</span>
						<span className="text-primary">{value}%</span>
					</div>
					<Progress value={value} />
				</div>
			}
		/>
	);
}

export function SonnerDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex flex-wrap gap-2">
					<Button
						size="sm"
						onClick={() =>
							toast.success("Preset deployed", {
								description: "Shipped to 12 nodes across the mesh.",
							})
						}
					>
						Success
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() =>
							toast.info("Registry synced", { description: "Cache refreshed." })
						}
					>
						Info
					</Button>
					<Button
						size="sm"
						variant="destructive"
						onClick={() =>
							toast.error("Deploy failed", {
								description: "Invalid token on nf-04.",
							})
						}
					>
						Error
					</Button>
				</div>
			}
		/>
	);
}

export function ToastDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex flex-wrap gap-2">
					<Button
						size="sm"
						onClick={() =>
							toast("Theme copied", {
								description: "Preset key copied to clipboard.",
							})
						}
					>
						Default toast
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() =>
							toast("Long-running deploy", {
								description: "Polling node health…",
								action: {
									label: "Cancel",
									onClick: () => toast.info("Cancelled"),
								},
							})
						}
					>
						With action
					</Button>
				</div>
			}
		/>
	);
}
