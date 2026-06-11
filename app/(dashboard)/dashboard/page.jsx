import OverviewDashboard from "@/features/shared/components/dashboard/OverviewDashboard";
import React from "react";

export const metadata = {
	title: "Overview | Job Tracker",
	description: "Your job search dashboard",
};

export default function DashboardPage() {
	return <OverviewDashboard />;
}
