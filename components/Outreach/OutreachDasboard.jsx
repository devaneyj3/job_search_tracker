"use client";
import React, { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import styles from "./OutreachDashboard.module.scss";
import { useConnection } from "@/context/connectionContext";
import OutreachHeader from "./OutreachHeader/OutreachHeader";
import Connections from "./Connections/Connections";

export default function OutreachDashboard() {
	const { connections, noConnectionMsg } = useConnection();
	const [chosenStatus, setChosenStatus] = useState("All");

	// add array for filtering with not duplicates
	const statuses = [
		"All",
		...new Set(connections.map((connection) => connection.status)),
		"Archived",
	];

	const filteredConnections = connections.filter((connection) => {
		if (chosenStatus === "All") return connection;
		if (chosenStatus === "Archived") return connection.archived;
		return connection.status === chosenStatus && connection.archived !== true;
	});

	if (connections.length < 1 && !noConnectionMsg) {
		return (
			<div className={styles.container}>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<>
			<OutreachHeader />

			<Connections
				filteredConnections={filteredConnections}
				statuses={statuses}
				setChosenStatus={setChosenStatus}
			/>
		</>
	);
}
