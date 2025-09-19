import React from "react";
import styles from "./AllJobs.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import JobBox from "./JobBox/JobBox";
import CreateApplicationMenuItem from "@/components/Header/CreateApplicationItem";
import { useJob } from "@/context/jobContext";

export default function AllJobs({ jobs, noJobMsg }) {
	const { setModalOpen, modalOpen } = useJob();
	if (jobs.length < 1 && !noJobMsg) {
		return (
			<div className={styles.container}>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<main className={styles.container}>
			<section className={styles.btn_container}>
				<CreateApplicationMenuItem />
			</section>
			<h1 className={styles.title}>All Jobs</h1>
			{!noJobMsg && jobs.length > 0 ? (
				jobs.map((j, index) => {
					return (
						<JobBox
							key={index}
							j={j}
							setModalOpen={setModalOpen}
							modalOpen={modalOpen}
						/>
					);
				})
			) : (
				<div>{noJobMsg}</div>
			)}
			<CustomSheet j={selectedJob} />
		</main>
	);
}
