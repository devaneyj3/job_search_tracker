"use client";
import React, { useState } from "react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import styles from "@/styles/OutreachDashboard.module.scss";
import { useCompany } from "@/features/companies/context/companyContext";
import CompaniesStatsHeader from "./CompaniesStatsHeader";
import CompaniesList from "./CompaniesList";

export default function CompaniesDashboard() {
	const { companies, noCompanyMsg } = useCompany();
	const [chosenStatus, setChosenStatus] = useState("All");

	// add array for filtering with not duplicates
	const statuses = [
		"All",
		...new Set(companies.map((company) => company.status)),
		"Archived",
	];

	const filteredCompanies = companies.filter((company) => {
		if (chosenStatus === "All") return company;
		if (chosenStatus === "Archived") return company.archived;
		return company.status === chosenStatus && company.archived !== true;
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
				statuses={statuses}
				setChosenStatus={setChosenStatus}
			/>
		</>
	);
}
