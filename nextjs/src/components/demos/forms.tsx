"use client";

import * as React from "react";
import { DollarSign, Search, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
	NativeSelect,
	NativeSelectOption,
	NativeSelectOptGroup,
} from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { DemoFrame, CtrlChip, CtrlRow } from "./DemoFrame";

export function CheckboxDemo() {
	const [checked, setChecked] = React.useState(true);
	const [terms, setTerms] = React.useState(false);
	return (
		<DemoFrame
			demo={
				<div className="flex flex-col gap-4 text-sm text-foreground">
					<label className="flex items-center gap-3">
						<Checkbox
							checked={checked}
							onCheckedChange={(c) => setChecked(Boolean(c))}
						/>
					</label>
					<label className="flex items-center gap-3">
						<Checkbox
							checked={terms}
							onCheckedChange={(c) => setTerms(Boolean(c))}
						/>
						Accept terms
					</label>
				</div>
			}
		/>
	);
}

export function ComboboxDemo() {
	const options = [
		{ value: "rainy", label: "Rainy Day" },
		{ value: "glitch", label: "Glitch Mode" },
		{ value: "cyber", label: "Cyber Punk" },
		{ value: "void", label: "Void Walker" },
	];
	const [value, setValue] = React.useState("");
	return (
		<DemoFrame
			demo={
				<Combobox
					options={options}
					value={value}
					onValueChange={setValue}
					placeholder="Pick a preset…"
					className="w-60"
				/>
			}
			controls={
				<CtrlRow label="selected">
					<span className="font-mono text-[0.625rem] uppercase tracking-widest text-primary">
						{value || "none"}
					</span>
				</CtrlRow>
			}
		/>
	);
}

export function DatePickerDemo() {
	const [date, setDate] = React.useState<Date | undefined>();
	return (
		<DemoFrame
			demo={
				<div className="w-60 text-left">
					<DatePicker
						value={date}
						onSelect={setDate}
						placeholder="Pick a date"
					/>
				</div>
			}
		/>
	);
}

export function FieldDemo() {
	return (
		<DemoFrame
			demo={
				<FieldSet className="w-80 text-left">
					<FieldLegend>Network node</FieldLegend>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="field-handle">Handle</FieldLabel>
							<Input id="field-handle" defaultValue="operator-01" />
							<FieldDescription>Unique mesh identifier.</FieldDescription>
						</Field>
						<Field data-invalid={true}>
							<FieldLabel htmlFor="field-zone">Zone</FieldLabel>
							<Input id="field-zone" defaultValue="" aria-invalid="true" />
							<FieldError>Zone is required.</FieldError>
						</Field>
					</FieldGroup>
				</FieldSet>
			}
		/>
	);
}

export function FormDemo() {
	const [values, setValues] = React.useState({ handle: "", desc: "" });
	const [submitted, setSubmitted] = React.useState<string | null>(null);
	const valid = values.handle.trim().length > 0;
	return (
		<DemoFrame
			demo={
				<form
					className="w-80 text-left"
					onSubmit={(e) => {
						e.preventDefault();
						if (valid) setSubmitted(values.handle);
					}}
				>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="form-handle">Handle</FieldLabel>
							<Input
								id="form-handle"
								value={values.handle}
								placeholder="operator-01"
								onChange={(e) =>
									setValues({ ...values, handle: e.target.value })
								}
							/>
							{!valid ? <FieldError>Handle is required.</FieldError> : null}
						</Field>
						<Field>
							<FieldLabel htmlFor="form-desc">Description</FieldLabel>
							<Textarea
								id="form-desc"
								value={values.desc}
								placeholder="Short blurb…"
								onChange={(e) => setValues({ ...values, desc: e.target.value })}
							/>
							<FieldDescription>Optional one-liner.</FieldDescription>
						</Field>
						<Button type="submit" size="sm" className="w-fit">
							<Send className="size-3.5" />
							{submitted ? `Saved ${submitted}` : "Save node"}
						</Button>
					</FieldGroup>
				</form>
			}
		/>
	);
}

export function InputDemo() {
	const [disabled, setDisabled] = React.useState(false);
	return (
		<DemoFrame
			demo={
				<div className="flex w-72 flex-col gap-3">
					<Input placeholder="operator-01" disabled={disabled} />
					<Input
						placeholder="Neon hex code"
						defaultValue="#00f0ff"
						disabled={disabled}
					/>
				</div>
			}
			controls={
				<CtrlRow label="state">
					<CtrlChip active={!disabled} onClick={() => setDisabled(false)}>
						enabled
					</CtrlChip>
					<CtrlChip active={disabled} onClick={() => setDisabled(true)}>
						disabled
					</CtrlChip>
				</CtrlRow>
			}
		/>
	);
}

export function InputGroupDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex w-72 flex-col gap-4">
					<InputGroup>
						<InputGroupAddon align="inline-start" data-align="inline-start">
							<DollarSign className="size-4" />
						</InputGroupAddon>
						<InputGroupInput placeholder="Amount" />
						<InputGroupButton size="icon-xs" aria-label="Apply">
							<Send className="size-3.5" />
						</InputGroupButton>
					</InputGroup>
					<InputGroup>
						<InputGroupInput placeholder="Search the registry…" />
						<InputGroupButton size="icon-sm" aria-label="Search">
							<Search className="size-4" />
						</InputGroupButton>
					</InputGroup>
				</div>
			}
		/>
	);
}

export function InputOTPDemo() {
	return (
		<DemoFrame
			demo={
				<InputOTP maxLength={6}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			}
		/>
	);
}

export function LabelDemo() {
	return (
		<DemoFrame
			demo={
				<div className="flex w-72 flex-col gap-2 text-left">
					<Label htmlFor="label-input">Operator handle</Label>
					<Input id="label-input" defaultValue="operator-01" />
				</div>
			}
		/>
	);
}

export function NativeSelectDemo() {
	const [size, setSize] = React.useState<"sm" | "default">("default");
	return (
		<DemoFrame
			demo={
				<NativeSelect size={size} defaultValue="node">
					<NativeSelectOptGroup label="Zones">
						<NativeSelectOption value="node">Node 01</NativeSelectOption>
						<NativeSelectOption value="mesh">Mesh 07</NativeSelectOption>
					</NativeSelectOptGroup>
				</NativeSelect>
			}
			controls={
				<CtrlRow label="size">
					<CtrlChip active={size === "sm"} onClick={() => setSize("sm")}>
						sm
					</CtrlChip>
					<CtrlChip
						active={size === "default"}
						onClick={() => setSize("default")}
					>
						default
					</CtrlChip>
				</CtrlRow>
			}
		/>
	);
}

export function RadioGroupDemo() {
	return (
		<DemoFrame
			demo={
				<RadioGroup defaultValue="comfy" className="text-sm text-foreground">
					<label className="flex items-center gap-3">
						<RadioGroupItem value="comfy" />
						Comfy
					</label>
					<label className="flex items-center gap-3">
						<RadioGroupItem value="compact" />
						Compact
					</label>
					<label className="flex items-center gap-3">
						<RadioGroupItem value="ultra" disabled />
						Ultra (disabled)
					</label>
				</RadioGroup>
			}
		/>
	);
}

export function SelectDemo() {
	const [value, setValue] = React.useState("");
	const labels: Record<string, string> = {
		chakra: "Chakra Petch",
		rajdhani: "Rajdhani",
		orbitron: "Orbitron",
		inter: "Inter",
	};
	return (
		<DemoFrame
			demo={
				<div className="w-60 text-left">
					<Select value={value} onValueChange={setValue}>
						<SelectTrigger>
							<SelectValue placeholder="Pick a font" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="chakra">Chakra Petch</SelectItem>
							<SelectItem value="rajdhani">Rajdhani</SelectItem>
							<SelectItem value="orbitron">Orbitron</SelectItem>
							<SelectItem value="inter">Inter</SelectItem>
						</SelectContent>
					</Select>
				</div>
			}
			controls={
				<CtrlRow label="selected">
					<span className="font-mono text-[0.625rem] uppercase tracking-widest text-primary">
						{labels[value] ?? "none"}
					</span>
				</CtrlRow>
			}
		/>
	);
}

export function SliderDemo() {
	const [val, setVal] = React.useState([40]);
	return (
		<DemoFrame
			demo={
				<div className="w-72 text-left">
					<div className="mb-3 flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
						<span>glow intensity</span>
						<span className="text-primary">{val[0]}%</span>
					</div>
					<Slider value={val} onValueChange={setVal} max={100} />
				</div>
			}
		/>
	);
}

export function SwitchDemo() {
	const [on, setOn] = React.useState(true);
	const [enabled, setEnabled] = React.useState(true);
	return (
		<DemoFrame
			demo={
				<div className="flex flex-col gap-4 text-sm text-foreground">
					<label className="flex items-center justify-between gap-6">
						<span>Auto-deploy</span>
						<Switch checked={on} onCheckedChange={setOn} />
					</label>
					<label className="flex items-center justify-between gap-6">
						<span>Telemetry</span>
						<Switch checked={enabled} onCheckedChange={setEnabled} />
					</label>
				</div>
			}
		/>
	);
}

export function TextareaDemo() {
	return (
		<DemoFrame
			demo={
				<Textarea
					className="w-80"
					placeholder="Describe your deployment…"
					defaultValue="Deploy a neon forge node to the west satellite mesh with hardened TLS."
				/>
			}
		/>
	);
}
