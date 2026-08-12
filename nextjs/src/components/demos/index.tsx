"use client";

import type { ComponentType } from "react";

import {
	BadgeDemo,
	ButtonDemo,
	CardDemo,
	DirectionDemo,
	EmptyDemo,
	FrameDemo,
	ItemDemo,
	KbdDemo,
	SeparatorDemo,
	SkeletonDemo,
	SpinnerDemo,
	TypographyDemo,
} from "./core";
import {
	CheckboxDemo,
	ComboboxDemo,
	DatePickerDemo,
	FieldDemo,
	FormDemo,
	InputDemo,
	InputGroupDemo,
	InputOTPDemo,
	LabelDemo,
	NativeSelectDemo,
	RadioGroupDemo,
	SelectDemo,
	SliderDemo,
	SwitchDemo,
	TextareaDemo,
} from "./forms";
import { CalendarDemo, DataTableDemo, TableDemo } from "./data";
import {
	BreadcrumbDemo,
	DropdownMenuDemo,
	MenubarDemo,
	NavigationMenuDemo,
	PaginationDemo,
	SidebarDemo,
	TabsDemo,
} from "./navigation";
import {
	AlertDialogDemo,
	CommandDemo,
	ContextMenuDemo,
	DialogDemo,
	DrawerDemo,
	HoverCardDemo,
	PopoverDemo,
	SheetDemo,
	TooltipDemo,
} from "./overlays";
import { AlertDemo, ProgressDemo, SonnerDemo, ToastDemo } from "./feedback";
import {
	AccordionDemo,
	AspectRatioDemo,
	AvatarDemo,
	ButtonGroupDemo,
	CarouselDemo,
	CollapsibleDemo,
	ResizableDemo,
	ScrollAreaDemo,
	ToggleDemo,
	ToggleGroupDemo,
} from "./disclosure";
import { ChartDemo } from "./charts";

export const DEMOS: Record<string, ComponentType> = {
	// Core
	badge: BadgeDemo,
	button: ButtonDemo,
	card: CardDemo,
	direction: DirectionDemo,
	empty: EmptyDemo,
	frame: FrameDemo,
	item: ItemDemo,
	kbd: KbdDemo,
	separator: SeparatorDemo,
	skeleton: SkeletonDemo,
	spinner: SpinnerDemo,
	typography: TypographyDemo,
	// Forms
	checkbox: CheckboxDemo,
	combobox: ComboboxDemo,
	"date-picker": DatePickerDemo,
	field: FieldDemo,
	form: FormDemo,
	input: InputDemo,
	"input-group": InputGroupDemo,
	"input-otp": InputOTPDemo,
	label: LabelDemo,
	"native-select": NativeSelectDemo,
	"radio-group": RadioGroupDemo,
	select: SelectDemo,
	slider: SliderDemo,
	switch: SwitchDemo,
	textarea: TextareaDemo,
	// Data
	calendar: CalendarDemo,
	"data-table": DataTableDemo,
	table: TableDemo,
	// Navigation
	breadcrumb: BreadcrumbDemo,
	"dropdown-menu": DropdownMenuDemo,
	menubar: MenubarDemo,
	"navigation-menu": NavigationMenuDemo,
	pagination: PaginationDemo,
	sidebar: SidebarDemo,
	tabs: TabsDemo,
	// Overlays
	"alert-dialog": AlertDialogDemo,
	command: CommandDemo,
	"context-menu": ContextMenuDemo,
	dialog: DialogDemo,
	drawer: DrawerDemo,
	"hover-card": HoverCardDemo,
	popover: PopoverDemo,
	sheet: SheetDemo,
	tooltip: TooltipDemo,
	// Feedback
	alert: AlertDemo,
	progress: ProgressDemo,
	sonner: SonnerDemo,
	toast: ToastDemo,
	// Disclosure
	accordion: AccordionDemo,
	collapsible: CollapsibleDemo,
	// Media & Layout
	"aspect-ratio": AspectRatioDemo,
	avatar: AvatarDemo,
	carousel: CarouselDemo,
	resizable: ResizableDemo,
	"scroll-area": ScrollAreaDemo,
	// Buttons & Actions
	"button-group": ButtonGroupDemo,
	toggle: ToggleDemo,
	"toggle-group": ToggleGroupDemo,
	// Charts
	chart: ChartDemo,
};
