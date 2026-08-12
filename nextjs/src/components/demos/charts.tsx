"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { DemoFrame } from "./DemoFrame";

const DATA = [
	{ month: "JAN", forge: 42, drift: 18 },
	{ month: "FEB", forge: 55, drift: 24 },
	{ month: "MAR", forge: 38, drift: 12 },
	{ month: "APR", forge: 61, drift: 30 },
	{ month: "MAY", forge: 47, drift: 15 },
	{ month: "JUN", forge: 52, drift: 26 },
];

const CONFIG = {
	forge: { label: "Forge", color: "var(--color-chart-1)" },
	drift: { label: "Drift", color: "var(--color-chart-2)" },
} as const;

export function ChartDemo() {
	return (
		<DemoFrame
			demo={
				<div className="h-52 w-full max-w-sm">
					<ChartContainer config={CONFIG} className="h-full w-full">
						<BarChart data={DATA}>
							<CartesianGrid vertical={false} strokeDasharray="3 3" />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								fontSize={10}
								tickMargin={8}
							/>
							<YAxis
								width={24}
								tickLine={false}
								axisLine={false}
								fontSize={10}
							/>
							<ChartTooltip
								content={<ChartTooltipContent />}
								cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
							/>
							<Bar dataKey="forge" fill="var(--color-chart-1)" radius={3} />
							<Bar dataKey="drift" fill="var(--color-chart-2)" radius={3} />
						</BarChart>
					</ChartContainer>
				</div>
			}
		/>
	);
}
