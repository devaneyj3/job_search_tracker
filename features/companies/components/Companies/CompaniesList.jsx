import React, { useMemo } from "react";
import { useCompany } from "@/features/companies/context/companyContext";
import { companyStatus } from "@/Constants";
import styles from "@/styles/ItemList.module.scss";
import CompanyTableRow from "@/features/companies/components/Companies/CompanyTableRow";
import AddCompanyButton from "@/features/companies/components/Companies/AddCompanyButton";
import CompanyDetailsSheet from "@/features/companies/components/Companies/CompanyDetailsSheet";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/features/shared/ui/table";

export default function CompaniesList({ filteredCompanies }) {
	const companyContext = useCompany();

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
		],
	);
	const { selectedItem, items, noItemMsg } = context;

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>
				{filteredCompanies.length} TOTAL COMPANIES
			</h1>
			<AddCompanyButton />
			{!noItemMsg && items.length > 0 ? (
				<div className={styles.tableWrapper}>
					<Table className={styles.table}>
						<TableHeader>
							<TableRow>
								<TableHead>Company</TableHead>
								<TableHead>Industry</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Size</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Connections</TableHead>
								<TableHead>Update Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredCompanies.map((item) => (
								<CompanyTableRow
									key={item.id}
									item={item}
									context={context}
									status={companyStatus}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div>{noItemMsg}</div>
			)}
			{selectedItem && (
				<CompanyDetailsSheet
					item={selectedItem}
					context={context}
					status={companyStatus}
				/>
			)}
		</main>
	);
}
