import React from "react";
import styles from "./AllJobs.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import JobBox from "./JobBox/JobBox";
import CreateApplicationMenuItem from "@/components/Header/CreateApplicationItem";
import { useJob } from "@/context/jobContext";
import CustomSheet from "./JobBox/CustomSheet";
import EmailContacts from "./EmailContacts/EmailContacts";

export default function AllJobs({ jobs, noJobMsg }) {
	const { selectedJob } = useJob();

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
		<main className={styles.container}>
			<h1 className={styles.title}>
				{jobsWithContactEmail.length} Jobs with contact info
			</h1>
			{!noJobMsg && jobs.length > 0 && (
				<EmailContacts jobs={jobsWithContactEmail} />
			)}
			<section className={styles.btn_container}>
				<CreateApplicationMenuItem />
			</section>
			<h1 className={styles.title}>All Jobs</h1>
			{!noJobMsg && jobs.length > 0 ? (
				jobs.map((j, index) => {
					return <JobBox key={index} j={j} />;
				})
			) : (
				<div>{noJobMsg}</div>
			)}
			{selectedJob && <CustomSheet j={selectedJob} />}
		</main>
	);
}
