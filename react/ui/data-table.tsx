"use client";

import * as React from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	ChevronsUpDownIcon,
	SearchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	/** Column id to render a global text filter for. */
	searchKey?: string;
	pageSize?: number;
	emptyMessage?: string;
	initialSorting?: SortingState;
}

function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
	pageSize = 10,
	emptyMessage = "No results.",
	initialSorting = [],
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		initialState: {
			sorting: initialSorting,
			pagination: { pageSize },
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;
	const totalRows = table.getFilteredRowModel().rows.length;
	const pageCount = table.getPageCount();

	return (
		<div className="space-y-4">
			{(searchKey || columns.length > 0) && (
				<div className="flex items-center justify-between gap-3">
					{searchKey ? (
						<div className="relative w-full max-w-sm">
							<SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Filter…"
								value={
									(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
								}
								onChange={(event) =>
									table.getColumn(searchKey)?.setFilterValue(event.target.value)
								}
								className="pl-9 font-mono"
							/>
						</div>
					) : (
						<div />
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								Columns
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}

			<div className="relative w-full overflow-auto rounded-md border border-glass-border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="bg-glass/40">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="px-3">
											{header.isPlaceholder ? null : (
												<button
													type="button"
													className={cn(
														"flex items-center gap-1.5 select-none hover:text-foreground",
														header.column.getCanSort() && "cursor-pointer",
													)}
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													{header.column.getIsSorted() === "asc" ? (
														<ArrowUpIcon className="size-3.5 text-primary" />
													) : header.column.getIsSorted() === "desc" ? (
														<ArrowDownIcon className="size-3.5 text-primary" />
													) : header.column.getCanSort() ? (
														<ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
													) : null}
												</button>
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="px-3">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center font-mono text-sm text-muted-foreground"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
				<p className="font-mono text-xs text-muted-foreground">
					Page {pageIndex + 1} of {Math.max(pageCount, 1)} · {totalRows} row
					{totalRows === 1 ? "" : "s"} · {currentPageSize}/ page
				</p>
				<div className="flex items-center gap-1.5">
					<Button
						variant="outline"
						size="icon"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						aria-label="First page"
					>
						<ChevronsLeftIcon />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						aria-label="Previous page"
					>
						<ChevronLeftIcon />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						aria-label="Next page"
					>
						<ChevronRightIcon />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => table.setPageIndex(pageCount - 1)}
						disabled={!table.getCanNextPage()}
						aria-label="Last page"
					>
						<ChevronsRightIcon />
					</Button>
				</div>
			</div>
		</div>
	);
}

export { DataTable, type DataTableProps };
export type { ColumnDef } from "@tanstack/react-table";
