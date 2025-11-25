"use client";
import React from "react";
import styles from "../styles/CreateForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { jobKeys } from "@/lib/formKeys";
import { formSchema } from "@/lib/formSchema";
import { jobStatus, contactPosition } from "@/Constants";
import { toast } from "sonner";
import { useJob } from "@/context/jobContext";

// helper: fetch field config by name from jobKeys
function getCfg(name) {
	const cfg = jobKeys.find((f) => f.name === name);
	if (!cfg) throw new Error(`Missing field config for "${name}" in jobKeys`);
	return cfg;
}

export default function CreateApplication({ setInvoiceDialogOpen }) {
	const { createJob, createCalendarEvent, sendEmail } = useJob();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			jobTitle: "",
			companyName: "",
			jobUrl: "",
			status: "Applied",
			salary: "",
			location: "",
			contactName: "",
			contactEmail: "",
			jobDescription: "",
			skill1: "",
			skill2: "",
			contactPosition: "",
		},
		mode: "onBlur",
	});

	//create job,calendar event, pdf, toast
	async function onSubmit(values) {
		const hasContact = Boolean(values.contactEmail?.trim());

		// Choose one format and stick with it:
		// If your DB uses Prisma DateTime, pass a Date object.
		const lastContacted = hasContact ? new Date() : null;

		// Build one payload
		const jobPayload = {
			...values,
			lastContactedDate: lastContacted, // Date (preferred for Prisma)
			initialContactEmailSent: hasContact, // boolean
		};
		try {
			const job = await createJob(jobPayload);

			// 2) Optional side effects if contact email exists
			if (hasContact) {
				// If these don't depend on each other, do them in parallel:
				await Promise.allSettled([
					sendEmail(values), // or sendEmail({ ...values, jobId: job.id })
					createCalendarEvent(job), // needs the created job
				]);
				toast("Application has been created and email sent!", {
					action: { label: "Close", onClick: () => {} },
				});
			}

			toast("Application has been created", {
				action: { label: "Close", onClick: () => {} },
			});
			setInvoiceDialogOpen(false);
		} catch (error) {
			console.error("Error in onSubmit:", error);
			toast(
				"Application created, but failed to send email. Please try again.",
				{
					action: { label: "Close", onClick: () => {} },
				}
			);
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
									{jobStatus.map((stat) => (
										<SelectItem key={stat} value={stat}>
											{stat}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "contactPosition" ? (
							<Select onValueChange={field.onChange} value={field.value || ""}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{contactPosition.map((pos) => (
										<SelectItem key={pos} value={pos}>
											{pos}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : name === "jobDescription" ? (
							<FormControl>
								<Textarea placeholder={placeholder} {...field} />
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
				{/* Row 1: Title + Company */}
				<div className={styles.twoCol}>
					<RenderField name="jobTitle" />
					<RenderField name="companyName" />
				</div>

				{/* Row 2: Job URL + Status */}
				<div className={styles.twoCol}>
					<RenderField name="jobUrl" />
					<RenderField name="status" />
				</div>

				{/* Row 3: Location + Salary */}
				<div className={styles.twoCol}>
					<RenderField name="location" />
					<RenderField name="salary" />
				</div>
				{/* Row 4: Skill + Company's Goal */}
				<div className={styles.twoCol}>
					<RenderField name="skill1" />
					<RenderField name="skill2" />
				</div>

				{/* Row 5: Contact Name + Contact Email */}
				<div className={styles.twoCol}>
					<RenderField name="contactName" />
					<RenderField name="contactEmail" />
				</div>

				{/* Row 6: Contact Position */}
				<RenderField name="contactPosition" />

				{/* Full-width: Job Description */}
				<RenderField name="jobDescription" />

				<Button className={styles.btn} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
