import ConnectionsDashboard from "@/features/connections/components/Connections/ConnectionsDashboard";
import React from "react";

export const metadata = {
	title: "Connections | Connection Tracker",
	description: "Track people you reach out to",
};

export default function ConnectionsPage() {
	return <ConnectionsDashboard />;
}
