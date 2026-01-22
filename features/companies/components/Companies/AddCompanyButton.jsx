"use client";
import CreateItemDialog from "@/features/shared/components/CreateItemDialog";
import CompanyForm from "../CompanyForm";

export default function AddCompanyButton() {
	return (
		<CreateItemDialog
			buttonText="Add Company"
			dialogTitle="Add a new company"
			formComponent={CompanyForm}
		/>
	);
}
