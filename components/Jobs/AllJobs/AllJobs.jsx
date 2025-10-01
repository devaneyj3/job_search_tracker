import React, { useState } from "react";
import styles from "./AllJobs.module.scss";
import JobBox from "./JobBox/JobBox";
import CreateApplicationMenuItem from "@/components/Header/CreateApplicationItem";
import { useJob } from "@/context/jobContext";
import CustomSheet from "./JobBox/CustomSheet";
import { Button } from "@/components/ui/button";

export default function AllJobs() {
	const { selectedJob, jobs, noJobMsg } = useJob();
	const [chosenStatus, setChosenStatus] = useState("All");

	// add array for filtering with not duplicates
	const statuses = ["All", ...new Set(jobs.map((job) => job.status))];

	//filter the jobs based on status

	const filteredJob = jobs.filter((job) => {
		if (chosenStatus === "All") return job;
		return job.status === chosenStatus;
	});

	return (
		<main className={styles.container}>
			<section className={styles.btn_container}>
				<CreateApplicationMenuItem />
			</section>
			<h1 className={styles.title}>All Jobs</h1>
			<div className={styles.filter_container}>
				{statuses.map((status) => (
					<div key={status}>
						<Button
							onClick={() => setChosenStatus(status)}
							className={styles.filter_btn}
							variant="outline">
							{status}
						</Button>
					</div>
				))}
			</div>
			{!noJobMsg && jobs.length > 0 ? (
				filteredJob.map((j, index) => {
					return <JobBox key={index} j={j} />;
				})
			) : (
				<div>{noJobMsg}</div>
			)}
			{selectedJob && <CustomSheet j={selectedJob} />}
		</main>
	);
}
