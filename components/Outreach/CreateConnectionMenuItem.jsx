"use client";
import CreateFormButton from "@/components/shared/CreateFormButton";
import CreateConnection from "./CreateConnection";

export default function CreateConnectionMenuItem() {
	return (
		<CreateFormButton
			buttonText="Create Connection"
			dialogTitle="Add a new connection"
			formComponent={CreateConnection}
		/>
	);
}
