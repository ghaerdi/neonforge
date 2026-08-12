"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DemoFrame } from "./DemoFrame";

export function BreadcrumbDemo() {
	return (
		<DemoFrame
			demo={
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="#">home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="#">registry</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>neonforge</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			}
		/>
	);
}

export function DropdownMenuDemo() {
	const [muted, setMuted] = React.useState(true);
	const [theme, setTheme] = React.useState("dark");
	return (
		<DemoFrame
			demo={
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Open menu</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>node controls</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Deploy
								<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>More actions</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Diagnostics</DropdownMenuItem>
										<DropdownMenuItem>Restart</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem
							checked={muted}
							onCheckedChange={setMuted}
						>
							Mute alerts
						</DropdownMenuCheckboxItem>
						<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
							<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			}
		/>
	);
}

export function MenubarDemo() {
	return (
		<DemoFrame
			demo={
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								New Node <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Import <MenubarShortcut>⌘I</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem disabled>Export</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			}
		/>
	);
}

export function NavigationMenuDemo() {
	return (
		<DemoFrame
			demo={
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Guides</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div className="grid w-64 gap-2">
									<NavigationMenuLink href="#">Installation</NavigationMenuLink>
									<NavigationMenuLink href="#">Theming</NavigationMenuLink>
									<NavigationMenuLink href="#">Charting</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="#">Docs</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="#">Changelog</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			}
		/>
	);
}

export function PaginationDemo() {
	const [page, setPage] = React.useState(2);
	const pages = [1, 2, 3];
	return (
		<DemoFrame
			demo={
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									setPage(Math.max(1, page - 1));
								}}
							/>
						</PaginationItem>
						{pages.map((p) => (
							<PaginationItem key={p}>
								<PaginationLink
									href="#"
									isActive={page === p}
									onClick={(e) => {
										e.preventDefault();
										setPage(p);
									}}
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault();
									setPage(Math.min(3, page + 1));
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			}
		/>
	);
}

export function SidebarDemo() {
	return (
		<DemoFrame
			demo={
				<SidebarProvider className="!block w-72">
					<Sidebar collapsible="none" className="relative h-72 w-72">
						<SidebarHeader className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							NeonForge
						</SidebarHeader>
						<SidebarContent>
							<SidebarGroup>
								<SidebarGroupLabel className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
									nav
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{["dashboard", "nodes", "presets", "settings"].map(
											(item) => (
												<SidebarMenuItem key={item}>
													<SidebarMenuButton asChild>
														<a href="#" className="capitalize">
															{item}
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
											),
										)}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
				</SidebarProvider>
			}
		/>
	);
}

export function TabsDemo() {
	const [tab, setTab] = React.useState("overview");
	return (
		<DemoFrame
			demo={
				<Tabs value={tab} onValueChange={setTab} className="w-80">
					<TabsList>
						<TabsTrigger value="overview">overview</TabsTrigger>
						<TabsTrigger value="logs">logs</TabsTrigger>
						<TabsTrigger value="metrics">metrics</TabsTrigger>
					</TabsList>
					<TabsContent
						value="overview"
						className="font-mono text-sm text-muted-foreground"
					>
						12 nodes online · 3 draining
					</TabsContent>
					<TabsContent
						value="logs"
						className="font-mono text-sm text-muted-foreground"
					>
						[deploy] nf-01 shipped to mesh
					</TabsContent>
					<TabsContent
						value="metrics"
						className="font-mono text-sm text-muted-foreground"
					>
						p95 latency 42ms
					</TabsContent>
				</Tabs>
			}
		/>
	);
}
