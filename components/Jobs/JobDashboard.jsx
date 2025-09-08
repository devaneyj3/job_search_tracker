"use client";
import React from "react";
import { useJob } from "@/context/jobContext";
import Stats from "./Stats/Stats";
import AllJobs from "./AllJobs/AllJobs";

export default function JobDashboard() {
	const { jobs, noJobMsg } = useJob();
	return (
		<>
			<Stats jobs={jobs} />

			<AllJobs jobs={jobs} noJobMsg={noJobMsg} />
		</>
	);
}
