"use client";
import { useJob } from "@/context/jobContext";
import styles from "./JobBox.module.scss";
import { MapPinned, Building } from "lucide-react";
import { readableDate } from "@/utils";

export default function JobBox({ j }) {
	const { selectedJob, setSelectedJob, setModalOpen } = useJob();
	const date = readableDate(j.appliedDate);

	return (
		<div
			className={`${styles.job} ${j.id === selectedJob.id && styles.active}`}
			onClick={() => {
				setSelectedJob(j);
				setModalOpen(true);
			}}>
			<div>
				<div className={styles.jobTitle}>{j.jobTitle}</div>
				<div className={styles.company}>
					<Building size={15} className={styles.icon} />
					{j.companyName}
				</div>
				<div className={styles.location}>
					<MapPinned size={15} className={styles.icon} />
					{j.location}
				</div>
				<p id="contactEmail">
					{j.contactEmail ? j.contactEmail : "No Contact Email"}
				</p>
			</div>
			<div>
				<div className={styles.status}>{j.status}</div>
				<div className={styles.appliedDate}>{date}</div>
			</div>
		</div>
	);
}
