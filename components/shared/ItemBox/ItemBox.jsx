"use client";
import { MapPinned, Building, Mail } from "lucide-react";
import styles from "./ItemBox.module.scss";

import { Badge } from "@/components/ui/badge";
import { JobStatusSelect } from "@/components/shared/JobStatusSelect/JobStatusSelect";
import moment from "moment";
import { readableDate } from "@/lib/utils";

export default function ItemBox({ item, type = "job", context }) {
	if (!context) return null;

	const { selectedItem, setSelectedItem, setModalOpen } = context;

	// Determine if this is a job or connection
	const isJob = type === "job";

	// Get date field based on type
	const date = isJob
		? readableDate(item.appliedDate)
		: readableDate(item.connectedDate);

	const initialContactDate = isJob
		? readableDate(item.initialContactDate)
		: readableDate(item.firstEmailDate);

	const secondContactDate = isJob ? readableDate(item.secondContactDate) : null;

	// Check if second contact date is today or any time before today and the second email is not sent (jobs only)
	const shouldSendSecondEmail =
		isJob &&
		secondContactDate &&
		moment(secondContactDate).isSameOrBefore(Date.now());

	// Check to see if an applications email cycle was completed (jobs only)
	const emailCycleComplete =
		isJob && item.initialContactEmailSent && item.secondContactEmailSent;

	// Get title based on type
	const title = isJob ? item.jobTitle : item.name;

	// Get contact email
	const contactEmail = isJob ? item.contactEmail : item.email;

	return (
		<div
			className={`${styles.item} ${
				item.id === selectedItem?.id && styles.active
			}`}
			onClick={() => {
				setSelectedItem(item);
				setModalOpen(true);
			}}>
			<div>
				<div>
					{isJob && (
						<Badge
							className={
								item.status === "Rejected" ? styles.red : styles.status
							}>
							{item.status} on {date}
						</Badge>
					)}
					{!isJob && (
						<Badge className={styles.status}>Connected on {date}</Badge>
					)}
				</div>
				<div className={styles.itemTitle}>{title}</div>
				{(item.companyName || item.company) && (
					<div className={styles.company}>
						<Building size={15} className={styles.icon} />
						{item.companyName || item.company}
					</div>
				)}
				{item.location && (
					<div className={styles.location}>
						<MapPinned size={15} className={styles.icon} />
						{item.location}
					</div>
				)}
				<p id="contactEmail" className={styles.contactEmail}>
					<Mail size={15} className={styles.icon} />
					{contactEmail ? item.contactName || item.name : "No Contact Email"}
				</p>
			</div>
			{/* Email info */}
			{isJob && (
				<>
					{emailCycleComplete ? (
						<p>Email cycle is complete</p>
					) : (
						<>
							{item.initialContactEmailSent && (
								<div className={styles.contactBox}>
									<span>First email sent</span>
									<p>
										{item.initialContactDate ? initialContactDate : "Not Set"}
									</p>
								</div>
							)}

							{shouldSendSecondEmail &&
								item.contactEmail &&
								item.heard_back === false && (
									<div className={styles.contactBox}>
										<span>Second email</span>
										<p>
											{item.secondContactDate ? secondContactDate : "Not Set"}
										</p>
									</div>
								)}
						</>
					)}
					<JobStatusSelect jobId={item.id} />
				</>
			)}
			{!isJob && item.emailSent && (
				<div className={styles.contactBox}>
					<span>Email sent</span>
					<p>{item.firstEmailDate ? initialContactDate : "Not Set"}</p>
				</div>
			)}
		</div>
	);
}
