"use client";
import React from "react";
import styles from "@/styles/OutreachHeader.module.scss";
import StatsMetrics from "@/features/shared/components/StatsMetrics";
import { useCompany } from "@/features/companies/context/companyContext";
import { itemLength } from "@/features/shared/lib/utils";

export default function CompaniesStatsHeader() {
	const { companies, noCompanyMsg } = useCompany();

	const researching = itemLength("Researching", companies);
	const interested = itemLength("Interested", companies);
	const applied = itemLength("Applied", companies);
	const interviewing = itemLength("Interviewing", companies);
	const rejected = itemLength("Rejected", companies);
	const archived = companies.filter((company) => company.archived);

	const metrics = [
		{ id: "researching", label: "Researching", value: researching.length },
		{ id: "interested", label: "Interested", value: interested.length },
		{ id: "applied", label: "Applied", value: applied.length },
		{ id: "interviewing", label: "Interviewing", value: interviewing.length },
		{ id: "rejected", label: "Rejected", value: rejected.length },
		{ id: "archived", label: "Archived", value: archived.length },
	];

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Company Tracker</h1>
				<p className={styles.subtitle}>
					Track companies you're interested in or have applied to
				</p>
			</div>
			<StatsMetrics
				items={metrics}
				noItemMsg={noCompanyMsg}
				title="Companies"
			/>
		</>
	);
}
