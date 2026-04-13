"use client";
import React, { useMemo } from "react";
import styles from "@/styles/CreateForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/features/shared/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/features/shared/ui/form";
import { Input } from "@/features/shared/ui/input";
import { Textarea } from "@/features/shared/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/features/shared/ui/select";
import { connectionStatus } from "@/Constants";
import { toast } from "sonner";
import { connectionFormSchema } from "@/features/connections/lib/schema";
import { connectionKeys } from "@/features/connections/lib/keys";
import { useConnection } from "@/features/connections/context/connectionContext";
import { useCompany } from "@/features/companies/context/companyContext";
import { sortCompaniesByName } from "@/features/companies/lib/sortCompanies";

function RhfSelect({ field, placeholder, children }) {
	return (
		<Select onValueChange={field.onChange} value={field.value || ""}>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
			</FormControl>
			<SelectContent>{children}</SelectContent>
		</Select>
	);
}

function renderFieldControl(field, cfg, sortedCompanies) {
	switch (cfg.field) {
		case "status":
			return (
				<RhfSelect field={field} placeholder={cfg.placeholder}>
					{connectionStatus.map((stat) => (
						<SelectItem key={stat} value={stat}>
							{stat}
						</SelectItem>
					))}
				</RhfSelect>
			);
		case "company":
			return (
				<RhfSelect field={field} placeholder={cfg.placeholder}>
					{sortedCompanies.map((company) => (
						<SelectItem key={company.id} value={String(company.id)}>
							{company.name}
						</SelectItem>
					))}
				</RhfSelect>
			);
		case "textarea":
			return (
				<FormControl>
					<Textarea placeholder={cfg.placeholder} {...field} rows={3} />
				</FormControl>
			);
		case "email":
			return (
				<FormControl>
					<Input type="email" placeholder={cfg.placeholder} {...field} />
				</FormControl>
			);
		case "text":
			return (
				<FormControl>
					<Input
						type={cfg.inputType ?? "text"}
						placeholder={cfg.placeholder}
						{...field}
					/>
				</FormControl>
			);
		default:
			return null;
	}
}

export default function ConnectionForm({ setDialogOpen }) {
	const { createConnection } = useConnection();
	const { companies } = useCompany();

	const fieldByName = useMemo(
		() => Object.fromEntries(connectionKeys.map((c) => [c.name, c])),
		[],
	);

	const sortedCompanies = useMemo(
		() => sortCompaniesByName(companies),
		[companies],
	);

	const form = useForm({
		resolver: zodResolver(connectionFormSchema),
		defaultValues: {
			name: "",
			email: "",
			companyId: "",
			position: "",
			linkedinUrl: "",
			status: "Prospecting",
			notes: "",
		},
		mode: "onBlur",
	});

	async function onSubmit(values) {
		try {
			await createConnection({
				...values,
				companyId: Number(values.companyId),
			});
			toast("Connection has been created", {
				action: { label: "Close", onClick: () => {} },
			});
			setDialogOpen(false);
		} catch (error) {
			console.error("Error in onSubmit:", error);
			toast(error.message || "Failed to create connection. Please try again.", {
				action: { label: "Close", onClick: () => {} },
			});
		}
	}

	const RenderField = ({ name }) => {
		const cfg = fieldByName[name];
		if (!cfg)
			throw new Error(`Missing field config for "${name}" in connectionKeys`);

		return (
			<FormField
				key={name}
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem className={styles.formItem}>
						<FormLabel>{cfg.label}</FormLabel>
						{renderFieldControl(field, cfg, sortedCompanies)}
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.twoCol}>
					<RenderField name="name" />
					<RenderField name="email" />
				</div>
				<div className={styles.twoCol}>
					<RenderField name="companyId" />
					<RenderField name="position" />
				</div>
				<div className={styles.twoCol}>
					<RenderField name="linkedinUrl" />
					<RenderField name="status" />
				</div>
				<RenderField name="notes" />
				<Button className={styles.btn} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
