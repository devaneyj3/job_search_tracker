"use client";
import React from "react";
import styles from "@/styles/OutreachHeader.module.scss";
import StatsMetrics from "@/features/shared/components/StatsMetrics";
import { useApplication } from "@/features/applications/context/applicationContext";
import { itemLength } from "@/features/shared/lib/utils";
import { LINKEDIN_APPLICATION_MESSAGE } from "@/Constants";

export default function ApplicationsStatsHeader() {
	const { applications, noApplicationMsg } = useApplication();

	const researching = itemLength("Researching", applications);
	const interested = itemLength("Interested", applications);
	const applied = itemLength("Applied", applications);
	const interviewing = itemLength("Interviewing", applications);
	const rejected = itemLength("Rejected", applications);
	const contacted = itemLength("Contacted", applications);
	const archived = applications.filter((application) => application.archived);

	const metrics = [
		{ id: "researching", label: "Researching", value: researching.length },
		{ id: "interested", label: "Interested", value: interested.length },
		{ id: "applied", label: "Applied", value: applied.length },
		{ id: "interviewing", label: "Interviewing", value: interviewing.length },
		{ id: "rejected", label: "Rejected", value: rejected.length },
		{ id: "archived", label: "Archived", value: archived.length },
		{ id: "contacted", label: "Contacted", value: contacted.length },
	];

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Application Tracker</h1>
				<p className={styles.subtitle}>
					Track applications you're interested in or have applied to
				</p>
				<p className={styles.message}>{LINKEDIN_APPLICATION_MESSAGE}</p>
			</div>
			<StatsMetrics
				items={metrics}
				noItemMsg={noApplicationMsg}
				title="Applications"
			/>
		</>
	);
}
