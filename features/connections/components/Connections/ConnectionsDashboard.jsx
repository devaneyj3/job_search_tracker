"use client";
import React from "react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import styles from "@/styles/OutreachDashboard.module.scss";
import { useConnection } from "@/features/connections/context/connectionContext";
import ConnectionsStatsHeader from "./ConnectionsStatsHeader";
import ConnectionsList from "./ConnectionsList";

export default function ConnectionsDashboard() {
	const { connections, connectionFilter, noConnectionMsg } = useConnection();


	const filteredConnections = connections.filter((connection) => {
		if (connectionFilter === "All") return connection;
		if (connectionFilter === "Archived") return connection.archived;
		return connection.status === connectionFilter && connection.archived !== true;
	});

	if (connections.length < 1 && !noConnectionMsg) {
		return (
			<div className={styles.container}>
				<LoadingIndicator />
			</div>
		);
	}

	return (
		<>
			<ConnectionsStatsHeader />
			<ConnectionsList
				filteredConnections={filteredConnections}
			/>
		</>
	);
}
