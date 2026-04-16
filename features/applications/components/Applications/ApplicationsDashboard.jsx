"use client";
import React, { useState } from "react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import styles from "@/styles/OutreachDashboard.module.scss";
import { useApplication } from "@/features/applications/context/applicationContext";
import ApplicationsStatsHeader from "./ApplicationsStatsHeader";
import ApplicationsList from "./ApplicationsList";

export default function ApplicationsDashboard() {
	const { applications, noApplicationMsg, applicationFilter } = useApplication()


	const filteredApplications = applications.filter((application) => {
		if (applicationFilter === "All") return application;
		if (applicationFilter === "Archived") return application.archived;
		return application.status === applicationFilter && application.archived !== true;
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
			/>
		</>
	);
}
