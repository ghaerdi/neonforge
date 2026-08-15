"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListTodo, Plus, Trash2, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

import { ShowcaseCard } from "./card-ui";

type Todo = {
	id: string;
	text: string;
	done: boolean;
};

type Filter = "all" | "active" | "done";

const FILTERS: { value: Filter; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "active", label: "Active" },
	{ value: "done", label: "Done" },
];

const sample: Todo[] = [
	{ id: "1", text: "Wire the neon grid", done: true },
	{ id: "2", text: "Calibrate the chamfer cutter", done: false },
	{ id: "3", text: "Ship the cyberdeck build", done: false },
];

/** Functional todo widget — the neonforge primitives, actually wired up. */
export function TodoWidget() {
	const [todos, setTodos] = useState<Todo[]>(sample);
	const [draft, setDraft] = useState("");
	const [filter, setFilter] = useState<Filter>("all");

	const doneCount = todos.filter((t) => t.done).length;
	const activeCount = todos.length - doneCount;
	const pct =
		todos.length === 0 ? 0 : Math.round((doneCount / todos.length) * 100);

	const visible = useMemo(() => {
		if (filter === "active") return todos.filter((t) => !t.done);
		if (filter === "done") return todos.filter((t) => t.done);
		return todos;
	}, [todos, filter]);

	function addTodo(text: string) {
		const trimmed = text.trim();
		if (!trimmed) return;
		setTodos((prev) => [
			{ id: crypto.randomUUID(), text: trimmed, done: false },
			...prev,
		]);
		setDraft("");
		toast.success("Task added", { description: trimmed });
	}

	function toggleTodo(id: string) {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
		);
	}

	function removeTodo(id: string) {
		const removed = todos.find((t) => t.id === id);
		setTodos((prev) => prev.filter((t) => t.id !== id));
		if (removed) toast.info("Task removed", { description: removed.text });
	}

	function clearDone() {
		const cleared = doneCount;
		setTodos((prev) => prev.filter((t) => !t.done));
		if (cleared > 0)
			toast.info(`Cleared ${cleared} completed task${cleared === 1 ? "" : "s"}`);
	}

	return (
		<ShowcaseCard title="Todo Grid" sub="tasks · memoryless">
			{/* add */}
			<form
				className="flex gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					addTodo(draft);
				}}
			>
				<Input
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					placeholder="New task…"
					className="flex-1"
					aria-label="New task"
				/>
				<Button type="submit" size="icon" aria-label="Add task" clip="br">
					<Plus />
				</Button>
			</form>

			{/* progress */}
			{todos.length > 0 && (
				<div className="mt-4 space-y-1.5">
					<div className="flex items-center justify-between">
						<span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
							progress
						</span>
						<span className="font-mono text-xs text-foreground">
							{doneCount}/{todos.length} · {pct}%
						</span>
					</div>
					<Progress value={pct} />
				</div>
			)}

			{/* filters */}
			<Tabs
				value={filter}
				onValueChange={(v) => setFilter(v as Filter)}
				className="mt-4 w-full"
			>
				<TabsList className="grid w-full grid-cols-3">
					{FILTERS.map((f) => {
						const count =
							f.value === "all"
								? todos.length
								: f.value === "active"
									? activeCount
									: doneCount;
						return (
							<TabsTrigger key={f.value} value={f.value}>
								{f.label}
								<span className="font-mono text-[0.6875rem] text-muted-foreground">
									{count}
								</span>
							</TabsTrigger>
						);
					})}
				</TabsList>
			</Tabs>

			{/* list */}
			<div className="mt-4">
				{visible.length === 0 ? (
					<Empty className="py-8">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<ListTodo />
							</EmptyMedia>
							<EmptyTitle>No tasks here</EmptyTitle>
							<EmptyDescription>
								{filter === "all"
									? "The grid is empty. Punch something in above."
									: filter === "active"
										? "Everything is done. Recalibrate or add more."
										: "Nothing completed yet. Get to work, choom."}
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				) : (
					<ul className="space-y-2">
						{visible.map((todo) => (
							<li key={todo.id}>
								<div className="group flex items-center gap-3 rounded border border-glass-border bg-glass px-3 py-2.5 transition-colors hover:bg-glass-hover">
									<Checkbox
										checked={todo.done}
										onCheckedChange={() => toggleTodo(todo.id)}
										aria-label={`Mark "${todo.text}" as ${todo.done ? "active" : "done"}`}
									/>
									<span
										className={cn(
											"flex-1 text-sm tracking-wide",
											todo.done &&
												"text-muted-foreground/70 line-through decoration-destructive/70",
										)}
									>
										{todo.text}
									</span>
									<Button
										variant="ghost"
										size="icon"
										className="size-7 text-muted-foreground opacity-60 hover:text-[color:var(--destructive)] group-hover:opacity-100"
										onClick={() => removeTodo(todo.id)}
										aria-label={`Delete "${todo.text}"`}
									>
										<Trash2 />
									</Button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* footer */}
			{todos.length > 0 && (
				<>
					<Separator className="my-4 bg-glass-border/60" />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Badge variant="success">{activeCount} active</Badge>
							<Badge variant="secondary">{doneCount} done</Badge>
						</div>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive" size="sm" disabled={doneCount === 0}>
									<Trash2 />
									Clear done
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="flex items-center gap-2">
										<TriangleAlert className="size-4 text-[color:var(--destructive)]" />
										Purge completed tasks?
									</AlertDialogTitle>
									<AlertDialogDescription>
										This wipes {doneCount} completed task
										{doneCount === 1 ? "" : "s"} from the board. It cannot be undone — not
										that anything persists.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={clearDone}>Purge</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</>
			)}
		</ShowcaseCard>
	);
}
