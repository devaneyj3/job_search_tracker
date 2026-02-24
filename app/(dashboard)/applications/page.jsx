import ApplicationsDashboard from "@/features/applications/components/Applications/ApplicationsDashboard";
import React from "react";

export const metadata = {
	title: "Applications | Job Tracker",
	description: "Track applications you're interested in",
};

export default function ApplicationsPage() {
	return <ApplicationsDashboard />;
}
