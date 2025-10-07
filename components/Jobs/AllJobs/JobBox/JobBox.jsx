"use client";
import { useJob } from "@/context/jobContext";
import styles from "./JobBox.module.scss";
import { MapPinned, Building, Mail } from "lucide-react";
import { readableDate } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { JobStatusSelect } from "@/components/shared/JobStatusSelect";
import moment from "moment";

export default function JobBox({ j }) {
	const { selectedJob, setSelectedJob, setModalOpen } = useJob();
	const date = readableDate(j.appliedDate);
	const initialContactDate = readableDate(j.initialContactDate);
	const secondContactDate = readableDate(j.secondContactDate);

	//check if second contact date is today or any time before today and the second email is not sent
	const shouldSendSecondEmail = moment(secondContactDate).isSameOrBefore(
		Date.now()
	);

	// check to see if an applications email cycle was completed
	const emailCycleComplete =
		j.initialContactEmailSent && j.secondContactEmailSent;

	return (
		<div
			className={`${styles.job} ${j.id === selectedJob.id && styles.active}`}
			onClick={() => {
				setSelectedJob(j);
				setModalOpen(true);
			}}>
			<div>
				<div>
					<Badge
						className={j.status === "Rejected" ? styles.red : styles.status}>
						{j.status} on {date}
					</Badge>
				</div>
				<div className={styles.jobTitle}>{j.jobTitle}</div>
				<div className={styles.company}>
					<Building size={15} className={styles.icon} />
					{j.companyName}
				</div>
				<div className={styles.location}>
					<MapPinned size={15} className={styles.icon} />
					{j.location}
				</div>
				<p id="contactEmail" className={styles.contactEmail}>
					<Mail size={15} className={styles.icon} />
					{j.contactEmail ? j.contactName : "No Contact Email"}
				</p>
			</div>
			{/* Email info */}
			{emailCycleComplete ? (
				<p>Email cycle is complete</p>
			) : (
				<>
					{j.initialContactEmailSent && (
						<div className={styles.contactBox}>
							<span>First email sent</span>
							<p>{j.initialContactDate ? initialContactDate : "Not Set"}</p>
						</div>
					)}

					{shouldSendSecondEmail &&
						j.contactEmail &&
						j.heard_back === false && (
							<div className={styles.contactBox}>
								<span>Second email</span>
								<p>{j.secondContactDate ? secondContactDate : "Not Set"}</p>
							</div>
						)}
				</>
			)}
			<JobStatusSelect jobId={j.id} />
		</div>
	);
}
