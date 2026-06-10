import React from "react";
import { useCompany } from "@/features/companies/context/companyContext";
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
	const { selectedItem, items, noItemMsg } = useCompany();

	return (
		<main className={styles.container}>
			<div className={styles.row}>
				<h1 className={styles.title}>
					{filteredCompanies.length} TOTAL COMPANIES
				</h1>
				<AddCompanyButton />
			</div>
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
								<CompanyTableRow key={item.id} item={item} />
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div>{noItemMsg}</div>
			)}
			{selectedItem && <CompanyDetailsSheet item={selectedItem} />}
		</main>
	);
}
