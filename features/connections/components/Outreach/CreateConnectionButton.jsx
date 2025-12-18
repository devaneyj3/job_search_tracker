"use client";
import FormDialog from "@/features/shared/components/FormDialog";
import CreateConnection from "../CreateConnection";

export default function CreateConnectionButton() {
	return (
		<FormDialog
			buttonText="Create Connection"
			dialogTitle="Add a new connection"
			formComponent={CreateConnection}
		/>
	);
}
