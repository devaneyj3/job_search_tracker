import React, { useMemo } from "react";
import { useCompany } from "@/features/companies/context/companyContext";
import ItemsListView from "@/features/shared/components/ItemsListView";
import { companyStatus } from "@/Constants";

export default function CompaniesList({
	filteredCompanies,
	statuses,
	setChosenStatus,
}) {
	const companyContext = useCompany();

	// Map company context to generic context format
	const context = useMemo(
		() => ({
			selectedItem: companyContext.selectedCompany,
			setSelectedItem: companyContext.setSelectedCompany,
			setModalOpen: companyContext.setModalOpen,
			items: companyContext.companies,
			noItemMsg: companyContext.noCompanyMsg,
			update: companyContext.updateCompanyStatus,
			updateCompanyFields: companyContext.updateCompanyFields,
			modalOpen: companyContext.modalOpen,
		}),
		[
			companyContext.selectedCompany,
			companyContext.setSelectedCompany,
			companyContext.setModalOpen,
			companyContext.companies,
			companyContext.noCompanyMsg,
			companyContext.updateCompanyStatus,
			companyContext.updateCompanyFields,
			companyContext.modalOpen,
		]
	);

	return (
		<ItemsListView
			filteredItems={filteredCompanies}
			statuses={statuses}
			setChosenStatus={setChosenStatus}
			type="company"
			context={context}
			title="TOTAL COMPANIES"
			status={companyStatus}
		/>
	);
}
