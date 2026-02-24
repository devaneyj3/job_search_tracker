"use client";
import CreateItemDialog from "@/features/shared/components/CreateItemDialog";
import ApplicationForm from "../ApplicationForm";

export default function AddApplicationButton() {
	return (
		<CreateItemDialog
			buttonText="Add Application"
			dialogTitle="Add a new application"
			formComponent={ApplicationForm}
		/>
	);
}
