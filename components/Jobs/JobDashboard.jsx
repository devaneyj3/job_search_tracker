"use client";
import React from "react";
import { useJob } from "@/context/jobContext";
import Stats from "./Stats/Stats";
import AllJobs from "./AllJobs/AllJobs";

export default function JobDashboard() {
	const { jobs, selectedJob, setSelectedJob, noJobMsg } = useJob();
	return (
		<>
			<Stats jobs={jobs} />

			<AllJobs
				jobs={jobs}
				selectedJob={selectedJob}
				setSelectedJob={setSelectedJob}
				noJobMsg={noJobMsg}
			/>
		</>
	);
}
