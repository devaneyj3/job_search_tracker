"use client";
import CreateItemDialog from "@/features/shared/components/CreateItemDialog";
import ConnectionForm from "../ConnectionForm";

export default function AddConnectionButton() {
	return (
		<CreateItemDialog
			buttonText="Create Connection"
			dialogTitle="Add a new connection"
			formComponent={ConnectionForm}
		/>
	);
}
