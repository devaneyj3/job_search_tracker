"use client";
import CreateFormButton from "@/components/shared/CreateFormButton";
import CreateApplication from "@/components/CreateApplication";

export default function CreateApplicationMenuItem() {
	return (
		<CreateFormButton
			buttonText="Create Application"
			dialogTitle="Track your application"
			formComponent={CreateApplication}
		/>
	);
}
