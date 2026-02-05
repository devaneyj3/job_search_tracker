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
import { connectionFormSchema } from "@/features/connections/lib/schema";
import { connectionKeys } from "@/features/connections/lib/keys";
import { useConnection } from "@/features/connections/context/connectionContext";

function getCfg(name) {
	const cfg = connectionKeys.find((f) => f.name === name);
	if (!cfg)
		throw new Error(`Missing field config for "${name}" in connectionKeys`);
	return cfg;
}

export default function ConnectionForm({ setDialogOpen }) {
	const { createConnection } = useConnection();
	const form = useForm({
		resolver: zodResolver(connectionFormSchema),
		defaultValues: {
			name: "",
			email: "",
			company: "",
			position: "",
			linkedinUrl: "",
			status: "Prospecting",
			notes: "",
		},
		mode: "onBlur",
	});

	async function onSubmit(values) {
		try {
			await createConnection(values);
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
						) : name === "notes" ? (
							<FormControl>
								<Textarea placeholder={placeholder} {...field} rows={3} />
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
					<RenderField name="email" />
				</div>
				<div className={styles.twoCol}>
					<RenderField name="company" />
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
