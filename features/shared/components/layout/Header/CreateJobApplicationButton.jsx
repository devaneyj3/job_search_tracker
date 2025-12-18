"use client";
import CreateItemDialog from "@/features/shared/components/CreateItemDialog";
import JobApplicationForm from "@/features/jobs/components/JobApplicationForm";

export default function CreateJobApplicationButton() {
	return (
		<CreateItemDialog
			buttonText="Create Application"
			dialogTitle="Track your application"
			formComponent={JobApplicationForm}
		/>
	);
}
