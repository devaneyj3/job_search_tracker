"use client";
import FormDialog from "@/components/FormDialog";
import CreateConnection from "@/components/CreateConnection";

export default function CreateConnectionButton() {
	return (
		<FormDialog
			buttonText="Create Connection"
			dialogTitle="Add a new connection"
			formComponent={CreateConnection}
		/>
	);
}
