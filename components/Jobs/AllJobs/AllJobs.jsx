import React, { useState } from "react";
import styles from "./AllJobs.module.scss";
import JobBox from "./JobBox/JobBox";
import CreateApplicationMenuItem from "@/components/Header/CreateApplicationItem";
import { useJob } from "@/context/jobContext";
import CustomSheet from "./JobBox/CustomSheet";
import { Button } from "@/components/ui/button";

export default function AllJobs({ filteredJobs, statuses, setChosenStatus }) {
	const { selectedJob, jobs, noJobMsg } = useJob();

	return (
		<main className={styles.container}>
			<section className={styles.btn_container}>
				<CreateApplicationMenuItem />
			</section>
			<h1 className={styles.title}>{filteredJobs.length} TOTAL JOBS</h1>
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
				filteredJobs.map((j, index) => {
					return <JobBox key={index} j={j} />;
				})
			) : (
				<div>{noJobMsg}</div>
			)}
			{selectedJob && <CustomSheet j={selectedJob} />}
		</main>
	);
}
