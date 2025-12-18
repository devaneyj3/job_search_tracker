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
import { connectionStatus } from "@/Constants";
import { toast } from "sonner";
import { outreachFormSchema } from "@/features/connections/lib/schema";
import { outreachKeys } from "@/features/connections/lib/keys";
import { useConnection } from "@/features/connections/context/connectionContext";
import { processSubmission } from "@/features/shared/lib/processSubmission";

// helper: fetch field config by name from connectionKeys
function getCfg(name) {
	const cfg = outreachKeys.find((f) => f.name === name);
	if (!cfg)
		throw new Error(`Missing field config for "${name}" in outreachkeys`);
	return cfg;
}

export default function CreateConnection({ setDialogOpen }) {
	const { createConnection, createCalendarEvent, sendEmail } = useConnection();
	const form = useForm({
		resolver: zodResolver(outreachFormSchema),
		defaultValues: {
			contactName: "",
			contactEmail: "",
			companyName: "",
			contactPosition: "",
			linkedinUrl: "",
			status: "Connected",
			notes: "",
		},
		mode: "onBlur",
	});

	//create job,calendar event, pdf, toast
	async function onSubmit(values) {
		const ConnectionObj = {
			customFn: createConnection,
			sendEmail,
			createCalendarEvent,
			values,
			setDialogOpen,
		};
		await processSubmission(ConnectionObj);
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
									{connectionStatus.map((stat) => (
										<SelectItem key={stat} value={stat}>
											{stat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
				{/* Row 1: Title + Company */}
				<div className={styles.twoCol}>
					<RenderField name="contactName" />
					<RenderField name="contactEmail" />
				</div>
				{/* Row 2: Job URL + Status */}
				<div className={styles.twoCol}>
					<RenderField name="companyName" />
					<RenderField name="contactPosition" />
				</div>
				{/* Row 3: Location + Salary */}
				<div className={styles.twoCol}>
					<RenderField name="linkedinUrl" />
					<RenderField name="notes" />
				</div>
				<Button className={styles.btn} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
