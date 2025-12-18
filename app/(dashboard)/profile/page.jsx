import JobDashboard from "@/features/jobs/components/Jobs/JobDashboard";
import React from "react";
export const metadata = {
	title: "Profile | Job Tracker",
	description: "Track your jobs",
};

export default function ProfilePage() {
	return <JobDashboard />;
}
