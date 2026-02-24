"use client";
import React, { useState } from "react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import styles from "@/styles/OutreachDashboard.module.scss";
import { useApplication } from "@/features/applications/context/applicationContext";
import ApplicationsStatsHeader from "./ApplicationsStatsHeader";
import ApplicationsList from "./ApplicationsList";

export default function ApplicationsDashboard() {
	const { applications, noApplicationMsg } = useApplication();
	const [chosenStatus, setChosenStatus] = useState("All");

	// add array for filtering with not duplicates
	const statuses = [
		"All",
		...new Set(applications.map((application) => application.status)),
		"Archived",
	];

	const filteredApplications = applications.filter((application) => {
		if (chosenStatus === "All") return application;
		if (chosenStatus === "Archived") return application.archived;
		return application.status === chosenStatus && application.archived !== true;
	});

	if (applications.length < 1 && !noApplicationMsg) {
		return (
			<div className={styles.container}>
				<LoadingIndicator />
			</div>
		);
	}

	return (
		<>
			<ApplicationsStatsHeader />

			<ApplicationsList
				filteredApplications={filteredApplications}
				statuses={statuses}
				setChosenStatus={setChosenStatus}
			/>
		</>
	);
}
