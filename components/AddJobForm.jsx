"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import styles from "@/styles/AddJobForm.module.scss";

const FormSchema = z.object({
	position: z.string().min(2, {
		message: "Position must be at least 2 characters.",
	}),
	company: z.string().min(2, {
		message: "Company must be at least 2 characters.",
	}),
	location: z.string().optional(),
});

export default function AddJobForm() {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			position: "",
			company: "",
			location: "",
		},
	});

	function onSubmit(data) {
		toast.success("Job added", {
			description: (
				<pre className={styles.toastPre}>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem className={styles.field}>
							<FormLabel className={styles.label}>Position</FormLabel>
							<FormControl>
								<Input
									className={styles.input}
									placeholder="Frontend Engineer"
									{...field}
								/>
							</FormControl>
							<FormDescription className={styles.description}>
								Job title or role.
							</FormDescription>
							<FormMessage className={styles.message} />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem className={styles.field}>
							<FormLabel className={styles.label}>Company</FormLabel>
							<FormControl>
								<Input
									className={styles.input}
									placeholder="Acme Inc."
									{...field}
								/>
							</FormControl>
							<FormDescription className={styles.description}>
								Company name.
							</FormDescription>
							<FormMessage className={styles.message} />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className={styles.field}>
							<FormLabel className={styles.label}>Location</FormLabel>
							<FormControl>
								<Input
									className={styles.input}
									placeholder="Remote / NYC"
									{...field}
								/>
							</FormControl>
							<FormDescription className={styles.description}>
								Optional location.
							</FormDescription>
							<FormMessage className={styles.message} />
						</FormItem>
					)}
				/>

				<div className={styles.actions}>
					<Button type="submit" className={styles.button}>
						Add Job
					</Button>
				</div>
			</form>
		</Form>
	);
}
