"use client";
import React from "react";
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
import { companyStatus } from "@/Constants";
import { toast } from "sonner";
import { companyFormSchema } from "@/features/companies/lib/schema";
import { companyKeys } from "@/features/companies/lib/keys";
import { useCompany } from "@/features/companies/context/companyContext";

// helper: fetch field config by name from companyKeys
function getCfg(name) {
	const cfg = companyKeys.find((f) => f.name === name);
	if (!cfg)
		throw new Error(`Missing field config for "${name}" in companyKeys`);
	return cfg;
}

export default function CreateCompany({ setDialogOpen }) {
	const { createCompany } = useCompany();
	const form = useForm({
		resolver: zodResolver(companyFormSchema),
		defaultValues: {
			name: "",
			website: "",
			industry: "",
			size: "",
			location: "",
			description: "",
			linkedinUrl: "",
			status: "Researching",
			notes: "",
		},
		mode: "onBlur",
	});

	async function onSubmit(values) {
		try {
			await createCompany(values);
			toast("Company has been created", {
				action: { label: "Close", onClick: () => {} },
			});
			setDialogOpen(false);
		} catch (error) {
			console.error("Error in onSubmit:", error);
			toast("Failed to create company. Please try again.", {
				action: { label: "Close", onClick: () => {} },
			});
		}
	}

	const RenderField = ({ name }) => {
		const { label, placeholder, inputType } = getCfg(name);

		return (
			<FormField
				key={name}
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem className={styles.formItem}>
						<FormLabel>{label}</FormLabel>

						{name === "status" ? (
							<Select onValueChange={field.onChange} value={field.value || ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{companyStatus.map((stat) => (
										<SelectItem key={stat} value={stat}>
											{stat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "description" || name === "notes" ? (
							<FormControl>
								<Textarea
									placeholder={placeholder}
									{...field}
									rows={name === "description" ? 4 : 3}
								/>
							</FormControl>
						) : (
							<FormControl>
								<Input
									type={inputType ?? "text"}
									placeholder={placeholder}
									{...field}
								/>
							</FormControl>
						)}

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
					<RenderField name="website" />
				</div>
				<div className={styles.twoCol}>
					<RenderField name="industry" />
					<RenderField name="size" />
				</div>
				<div className={styles.twoCol}>
					<RenderField name="location" />
					<RenderField name="linkedinUrl" />
				</div>
				<RenderField name="status" />
				<RenderField name="description" />
				<RenderField name="notes" />
				<Button className={styles.btn} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
