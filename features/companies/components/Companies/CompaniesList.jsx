import React from "react";
import { useCompany } from "@/features/companies/context/companyContext";
import styles from "@/styles/ItemList.module.scss";
import CompanyTableRow from "@/features/companies/components/Companies/CompanyTableRow";
import AddCompanyButton from "@/features/companies/components/Companies/AddCompanyButton";
import CompanyDetailsSheet from "@/features/companies/components/Companies/CompanyDetailsSheet";

export default function CompaniesList({ filteredCompanies }) {
	const { selectedCompany, companies, noCompanyMsg } = useCompany();

	return (
		<main className={styles.container}>
			<div className={styles.row}>
				<h1 className={styles.title}>
					{filteredCompanies.length} TOTAL COMPANIES
				</h1>
				<AddCompanyButton />
			</div>
			{!noCompanyMsg && companies.length > 0 ? (
				<div className={styles.cardGrid}>
					{filteredCompanies.map((item) => (
						<CompanyTableRow key={item.id} item={item} />
					))}
				</div>
			) : (
				<p className={styles.emptyMessage}>{noCompanyMsg}</p>
			)}
			{selectedCompany && <CompanyDetailsSheet item={selectedCompany} />}
		</main>
	);
}
