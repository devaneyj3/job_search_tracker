"use client";
import React, { useState } from "react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import styles from "@/styles/OutreachDashboard.module.scss";
import { useCompany } from "@/features/companies/context/companyContext";
import CompaniesStatsHeader from "./CompaniesStatsHeader";
import CompaniesList from "./CompaniesList";

export default function CompaniesDashboard() {
	const { companies, companyFilter, noCompanyMsg } = useCompany();


	const filteredCompanies = companies.filter((company) => {
		if (companyFilter === "All") return company;
		if (companyFilter === "Archived") return company.archived;
		return company.status === companyFilter && company.archived !== true;
	});

	if (companies.length < 1 && !noCompanyMsg) {
		return (
			<div className={styles.container}>
				<LoadingIndicator />
			</div>
		);
	}

	return (
		<>
			<CompaniesStatsHeader />

			<CompaniesList
				filteredCompanies={filteredCompanies}
			/>
		</>
	);
}
