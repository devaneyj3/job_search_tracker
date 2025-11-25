"use client";
import FormDialog from "@/components/FormDialog";
import CreateApplication from "@/components/CreateApplication";

export default function CreateApplicationButton() {
	return (
		<FormDialog
			buttonText="Create Application"
			dialogTitle="Track your application"
			formComponent={CreateApplication}
		/>
	);
}
