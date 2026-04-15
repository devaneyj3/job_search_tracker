"use client";
import React from "react";
import StatsMetrics from "@/features/shared/components/StatsMetrics";
import { useConnection } from "@/features/connections/context/connectionContext";
import { itemLength } from "@/features/shared/lib/utils";
import { connectionStatus } from "@/Constants";

export default function ConnectionsStatsHeader() {
	const { connections, noConnectionMsg } = useConnection();

	const metrics = connectionStatus
		.filter((status) => status !== "Archived")
		.map((status) => ({
			id: status.toLowerCase().replace(/\s+/g, "-"),
			label: status,
			value: itemLength(status, connections).length,
		}));

	const archived = connections.filter((connection) => connection.archived);
	metrics.push({
		id: "archived",
		label: "Archived",
		value: archived.length,
	});

	return (
		<>
			<StatsMetrics items={metrics} noItemMsg={noConnectionMsg} title="Connections" />
		</>
	);
}
