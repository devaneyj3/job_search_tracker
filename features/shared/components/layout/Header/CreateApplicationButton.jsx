"use client";
import FormDialog from "@/features/shared/components/FormDialog";
import CreateApplication from "@/features/jobs/components/CreateApplication";

export default function CreateApplicationButton() {
	return (
		<FormDialog
			buttonText="Create Application"
			dialogTitle="Track your application"
			formComponent={CreateApplication}
		/>
	);
}
