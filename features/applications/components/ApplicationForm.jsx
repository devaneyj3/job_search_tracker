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
import { applicationStatus, jobLocationOptions, jobTypeOptions } from "@/Constants";
import { toast } from "sonner";
import { applicationFormSchema } from "@/features/applications/lib/schema";
import { applicationKeys } from "@/features/applications/lib/keys";
import { useApplication } from "@/features/applications/context/applicationContext";
import { useCompany } from "@/features/companies/context/companyContext";

// helper: fetch field config by name from applicationKeys
function getCfg(name) {
	const cfg = applicationKeys.find((f) => f.name === name);
	if (!cfg)
		throw new Error(`Missing field config for "${name}" in applicationKeys`);
	return cfg;
}

export default function CreateApplication({ setDialogOpen }) {
	const { createApplication } = useApplication();
	const { companies } = useCompany();
	const form = useForm({
		resolver: zodResolver(applicationFormSchema),
		defaultValues: {
			jobType: "",
			location: "",
			applicationLink: "",
			position: "",
			jobDescription: "",
			status: "Researching",
			companyId: "",
			notes: "",
		},
		mode: "onBlur",
	});

	async function onSubmit(values) {
		try {
			await createApplication({
				companyId: Number(values.companyId),
				jobType: values.jobType,
				location: values.location,
				applicationLink: values.applicationLink,
				position: values.position,
				jobDescription: values.jobDescription,
				status: values.status,
				notes: values.notes,
			});
			toast("Application has been created", {
				action: { label: "Close", onClick: () => {} },
			});
			setDialogOpen(false);
		} catch (error) {
			console.error("Error in onSubmit:", error);
			toast("Failed to create application. Please try again.", {
				action: { label: "Close", onClick: () => {} },
			});
		}
	}

	const RenderField = ({ name }) => {
		const { label, placeholder } = getCfg(name);

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
									{applicationStatus.map((stat) => (
										<SelectItem key={stat} value={stat}>
											{stat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "jobType" ? (
							<Select onValueChange={field.onChange} value={field.value || ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{jobTypeOptions.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "location" ? (
							<Select onValueChange={field.onChange} value={field.value || ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{jobLocationOptions.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "companyId" ? (
							<Select
								onValueChange={field.onChange}
								value={field.value ? String(field.value) : ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[...companies]
										.sort((a, b) =>
											String(a.name ?? "").localeCompare(
												String(b.name ?? ""),
												undefined,
												{ sensitivity: "base" },
											),
										)
										.map((company) => (
										<SelectItem key={company.id} value={String(company.id)}>
											{company.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "notes" || name === "jobDescription" ? (
							<FormControl>
								<Textarea
									placeholder={placeholder}
									{...field}
									rows={name === "jobDescription" ? 5 : 3}
								/>
							</FormControl>
						) : name === "position" || name === "applicationLink" ? (
							<FormControl>
								<Input
									type={name === "applicationLink" ? "url" : "text"}
									placeholder={placeholder}
									{...field}
								/>
							</FormControl>
						) : null}

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
					<RenderField name="companyId" />
					<RenderField name="applicationLink" />
				</div>
				<div className={styles.twoCol}>
					<RenderField name="jobType" />
					<RenderField name="location" />
				</div>
				<RenderField name="position" />
				<RenderField name="status" />
				<RenderField name="jobDescription" />
				<RenderField name="notes" />
				<Button className={styles.btn} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
