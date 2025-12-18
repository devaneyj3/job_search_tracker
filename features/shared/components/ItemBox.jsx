"use client";
import { memo } from "react";
import { MapPinned, Building, Mail } from "lucide-react";
import styles from "@/styles/ItemBox.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { StatusSelect } from "./StatusSelect";
import moment from "moment";
import { readableDate } from "@/features/shared/lib/utils";

const ItemBox = memo(
	function ItemBox({ item, type = "job", context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;

		// Determine if this is a job or connection
		const isJob = type === "job";

		// Get date field based on type
		const date = isJob
			? readableDate(item.appliedDate)
			: readableDate(item.connectedDate);

		const initialContactDate = isJob
			? readableDate(item.initialContactDate)
			: readableDate(item.firstEmailDate);

		const secondContactDate = isJob
			? readableDate(item.secondContactDate)
			: null;

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
							<Badge className={styles.status}>
								{item.status} on {date}
							</Badge>
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
				{!isJob && item.emailSent && (
					<div className={styles.contactBox}>
						<span>Email sent</span>
						<p>{item.firstEmailDate ? initialContactDate : "Not Set"}</p>
					</div>
				)}
				<StatusSelect id={item.id} update={update} status={status} />
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison function for memo
		// Only re-render if these specific props change
		return (
			prevProps.item.id === nextProps.item.id &&
			prevProps.item.status === nextProps.item.status &&
			prevProps.item.jobTitle === nextProps.item.jobTitle &&
			prevProps.item.name === nextProps.item.name &&
			prevProps.item.companyName === nextProps.item.companyName &&
			prevProps.item.company === nextProps.item.company &&
			prevProps.item.location === nextProps.item.location &&
			prevProps.item.contactEmail === nextProps.item.contactEmail &&
			prevProps.item.email === nextProps.item.email &&
			prevProps.item.initialContactEmailSent ===
				nextProps.item.initialContactEmailSent &&
			prevProps.item.secondContactEmailSent ===
				nextProps.item.secondContactEmailSent &&
			prevProps.item.heard_back === nextProps.item.heard_back &&
			prevProps.context.selectedItem?.id ===
				nextProps.context.selectedItem?.id &&
			prevProps.type === nextProps.type &&
			prevProps.status === nextProps.status
		);
	}
);

export default ItemBox;
