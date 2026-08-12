"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/ui/data-table";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { DemoFrame } from "./DemoFrame";

type Node = {
	id: string;
	zone: string;
	status: "online" | "draining" | "offline";
	load: number;
};

const nodes: Node[] = [
	{ id: "nf-01", zone: "north", status: "online", load: 42 },
	{ id: "nf-02", zone: "south", status: "draining", load: 71 },
	{ id: "nf-03", zone: "north", status: "online", load: 23 },
	{ id: "nf-04", zone: "west", status: "offline", load: 0 },
	{ id: "nf-05", zone: "east", status: "online", load: 58 },
];

export function CalendarDemo() {
	return (
		<DemoFrame
			demo={
				<div className="rounded-md border border-glass-border">
					<Calendar />
				</div>
			}
		/>
	);
}

export function TableDemo() {
	return (
		<DemoFrame
			demo={
				<Table className="w-96">
					<TableCaption className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
						active forges
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>id</TableHead>
							<TableHead>zone</TableHead>
							<TableHead>status</TableHead>
							<TableHead className="text-right">load</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[
							["nf-01", "north", "online", "42%"],
							["nf-02", "south", "draining", "71%"],
							["nf-03", "west", "offline", "0%"],
						].map((r) => (
							<TableRow key={r[0]}>
								<TableCell className="font-mono text-primary">{r[0]}</TableCell>
								<TableCell>{r[1]}</TableCell>
								<TableCell>{r[2]}</TableCell>
								<TableCell className="text-right">{r[3]}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			}
		/>
	);
}

export function DataTableDemo() {
	const columns = React.useMemo<ColumnDef<Node>[]>(
		() => [
			{ accessorKey: "id", header: "id" },
			{ accessorKey: "zone", header: "zone" },
			{ accessorKey: "status", header: "status" },
			{
				accessorKey: "load",
				header: () => <div className="text-right">load</div>,
				cell: (r) => <div className="text-right">{r.getValue<number>()}%</div>,
			},
		],
		[],
	);
	return (
		<DemoFrame
			demo={
				<div className="w-[26rem]">
					<DataTable columns={columns} data={nodes} searchKey="id" />
				</div>
			}
		/>
	);
}
