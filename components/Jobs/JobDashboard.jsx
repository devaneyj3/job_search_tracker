"use client";
import React, { useState } from "react";
import { useJob } from "@/context/jobContext";
import Stats from "./Stats/Stats";
import AllJobs from "./AllJobs/AllJobs";
import { jobsLength } from "@/utils";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import EmailContacts from "./AllJobs/EmailContacts/EmailContacts";
import styles from "./JobDashboard.module.scss";
import Link from "next/link";
import JobBoard from "../JobBoard/JobBoard";

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

	return (
		<>
			<JobBoard />

			<Stats jobs={jobs} />
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
