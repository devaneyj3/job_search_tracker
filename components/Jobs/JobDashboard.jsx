"use client";
import React from "react";
import { useJob } from "@/context/jobContext";
import Stats from "./Stats/Stats";
import AllJobs from "./AllJobs/AllJobs";
import { jobsLength } from "@/utils";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import EmailContacts from "./AllJobs/EmailContacts/EmailContacts";
import styles from "./JobDashboard.module.scss";

export default function JobDashboard() {
	const { jobs, noJobMsg } = useJob();

	const appliedJobs = jobsLength("Applied", jobs);
	const interviewsJobs = jobsLength("Interview", jobs);
	const offersJobs = jobsLength("Offer", jobs);
	const rejectedJobs = jobsLength("Rejected", jobs);

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
			<Stats jobs={jobs} />
			{/* <h1 className={styles.title}>
				{jobsWithContactEmail.length} Jobs with contacts
			</h1>
			{!noJobMsg && jobs.length > 0 && (
				<EmailContacts jobs={jobsWithContactEmail} />
			)} */}

			<AllJobs />
		</>
	);
}
