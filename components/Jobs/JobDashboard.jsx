"use client";
import React, { useState } from "react";
import { useJob } from "@/context/jobContext";
import AllJobs from "./AllJobs/AllJobs";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import EmailContacts from "./AllJobs/EmailContacts/EmailContacts";
import styles from "./JobDashboard.module.scss";
import Link from "next/link";
import JobBoard from "../JobBoard/JobBoard";
import Metrics from "../shared/Metrics/Metrics";
import { itemLength } from "@/lib/utils";

export default function JobDashboard() {
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

	//determine jobs with contact email

	const jobsWithContactEmail = jobs.filter((job) => job.contactEmail);
	if (jobs.length < 1 && !noJobMsg) {
		return (
			<div className={styles.container}>
				<LoadingSpinner />
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
			<JobBoard />

			<Metrics items={metrics} title="Stats" noItemMsg={noJobMsg} />
			{/* <h1 className={styles.title}>
				{jobsWithContactEmail.length} Jobs with contacts
			</h1>
			{!noJobMsg && jobs.length > 0 && (
				<EmailContacts jobs={jobsWithContactEmail} />
			)} */}

			<AllJobs
				filteredJobs={filteredJobs}
				statuses={statuses}
				setChosenStatus={setChosenStatus}
			/>
		</>
	);
}
