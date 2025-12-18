"use client";
import React, { useState } from "react";
import { useJob } from "../../context/jobContext";
import JobsList from "./JobsList";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import styles from "@/styles/JobDashboard.module.scss";
import ExternalJobBoardsLinks from "../ExternalJobBoardsLinks";
import StatsMetrics from "@/features/shared/components/StatsMetrics";
import { itemLength } from "@/features/shared/lib/utils";

export default function JobsDashboard() {
	const { jobs, noJobMsg } = useJob();
	const [chosenStatus, setChosenStatus] = useState("All");

	// add array for filtering with not duplicates
	const statuses = [
		"All",
		...new Set(jobs.map((job) => job.status)),
		"Archived",
	];

	//filter the jobs based on status and if a job is archived

	const filteredJobs = jobs.filter((job) => {
		if (chosenStatus === "All") return job;
		if (chosenStatus === "Archived") return job.archived;
		return job.status === chosenStatus && job.archived !== true;
	});

	if (jobs.length < 1 && !noJobMsg) {
		return (
			<div className={styles.container}>
				<LoadingIndicator />
			</div>
		);
	}

	const appliedJobs = itemLength("Applied", jobs);
	const interviewsJobs = itemLength("Interview", jobs);
	const offersJobs = itemLength("Offer", jobs);
	const rejectedJobs = itemLength("Rejected", jobs);
	const archivedJobs = jobs.filter((job) => job.archived);

	const metrics = [
		{ id: "applied", label: "Applied", value: appliedJobs.length },
		{ id: "interviews", label: "Interviews", value: interviewsJobs.length },
		{ id: "offers", label: "Offers", value: offersJobs.length },
		{ id: "rejected", label: "Rejected", value: rejectedJobs.length },
		{ id: "archived", label: "Archived", value: archivedJobs.length },
	];

	return (
		<>
			<ExternalJobBoardsLinks />

			<StatsMetrics items={metrics} title="Stats" noItemMsg={noJobMsg} />

			<JobsList
				filteredJobs={filteredJobs}
				statuses={statuses}
				setChosenStatus={setChosenStatus}
			/>
		</>
	);
}
