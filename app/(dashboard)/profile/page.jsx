import React from "react";
import Stats from "@/components/Stats/Stats";
import AllJobs from "@/components/AllJobs/AllJobs";
import { jobs } from "@/APPLICATIONS";

export const metadata = {
	title: "Profile | Job Tracker",
	description: "Track your jobs",
};

export default function ProfilePage() {
	return (
		<>
			<Stats jobs={jobs} />
			<AllJobs jobs={jobs} />
		</>
	);
}
