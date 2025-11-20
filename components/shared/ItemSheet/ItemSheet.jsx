"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	MapPinned,
	Building,
	Currency,
	ExternalLink,
	Linkedin,
} from "lucide-react";
import styles from "./ItemSheet.module.scss";
import { readableDate } from "@/lib/utils";
import Link from "next/link";
import DeleteItemButton from "../DeleteItemButton/DeleteItemButton";
import { Badge } from "@/components/ui/badge";
import { JobStatusSelect } from "@/components/shared/JobStatusSelect/JobStatusSelect";
import moment from "moment";

export default function ItemSheet({ item, type = "job", context }) {
	const { modalOpen, setModalOpen, sendEmail } = context;
	const isJob = type === "job";

	// Get dates based on type
	const date = isJob
		? readableDate(item.appliedDate)
		: readableDate(item.connectedDate);

	const lastContactedDate = isJob
		? readableDate(item.lastContactedDate)
		: readableDate(item.lastEmailDate);

	const initialContactDate = isJob
		? readableDate(item.initialContactDate)
		: readableDate(item.firstEmailDate);

	const secondContactDate = isJob ? readableDate(item.secondContactDate) : null;

	// Check if second contact date is today or any time before today and the second email is not sent (jobs only)
	const shouldSendSecondEmail =
		isJob &&
		secondContactDate &&
		moment(secondContactDate).isSameOrBefore(Date.now()) &&
		item.secondContactEmailSent === false;

	const sendSecondEmail = () => {
		if (sendEmail) {
			sendEmail(item, true);
		}
	};

	// Get title based on type
	const title = isJob ? item.jobTitle : item.name;
	const description = isJob ? item.jobDescription : item.notes;

	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className="w-full overflow-y-scroll max-h-screen bg-white max-w-[1000px]">
				<SheetHeader>
					<div className={styles.itemTitleContainer}>
						<SheetTitle className={styles.itemTitle}>{title}</SheetTitle>
						<DeleteItemButton
							id={item.id}
							type={type}
							companyInfoId={item.companyInfoId}
						/>
					</div>
					{isJob && item.jobUrl && (
						<p className={styles.itemPosting}>
							<ExternalLink size={15} className={styles.icon} />
							<Link href={item.jobUrl} target="_blank">
								Go to Job Posting
							</Link>
						</p>
					)}
					{!isJob && item.linkedinUrl && (
						<p className={styles.itemPosting}>
							<Linkedin size={15} className={styles.icon} />
							<Link href={item.linkedinUrl} target="_blank">
								View LinkedIn Profile
							</Link>
						</p>
					)}
					{isJob && item.salary && (
						<div className={styles.salary}>
							<Currency size={15} className={styles.icon} />
							{item.salary}
						</div>
					)}
					{(item.companyName || item.company) && (
						<p className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.companyName || item.company}
						</p>
					)}
					{isJob && item.location && (
						<p className={styles.location}>
							<MapPinned size={15} className={styles.icon} />
							{item.location}
						</p>
					)}
					{!isJob && item.position && (
						<p className={styles.position}>{item.position}</p>
					)}
					<div className={styles.badge}>
						{isJob ? (
							<Badge
								className={
									item.status === "Rejected" ? styles.red : styles.status
								}>
								{item.status} on {date}
							</Badge>
						) : (
							<Badge className={styles.status}>Connected on {date}</Badge>
						)}
					</div>
					{isJob && <JobStatusSelect jobId={item.id} />}
					<div className={styles.contactInfo}>
						<div className={styles.contact}>
							<Label htmlFor="contactName">Contact Name: </Label>
							<p id="contactName">
								{item.contactName || item.name || "Not Set"}
							</p>
						</div>
						<div className={styles.contact}>
							<Label htmlFor="contactEmail">Contact Email: </Label>
							<p id="contactEmail">
								{item.contactEmail || item.email || "Not Set"}
							</p>
						</div>
						{isJob && item.heard_back !== true && (
							<>
								<section className={styles.contactDates}>
									<div className={styles.contact}>
										<Label htmlFor="initialContactDate">
											Initial Contact Date:{" "}
										</Label>
										<p
											id="firstContactDate"
											className={`${
												item.initialContactEmailSent ? styles.sent : null
											}`}>
											{item.initialContactDate ? initialContactDate : "Not Set"}
										</p>
										{item.initialContactEmailSent && (
											<span className={styles.small}>Email sent</span>
										)}
									</div>
									<div className={styles.contact}>
										<Label htmlFor="secondContactDate">
											Second Contact Date:{" "}
										</Label>
										<p
											id="secondContactDate"
											className={`${
												item.secondContactEmailSent ? styles.sent : null
											}`}>
											{item.secondContactDate ? secondContactDate : "Not Set"}
											{shouldSendSecondEmail && (
												<Button
													className={styles.btn}
													onClick={sendSecondEmail}>
													Send Follow-Up Email
												</Button>
											)}
										</p>
										{item.secondContactEmailSent && (
											<span className={styles.small}>Email sent</span>
										)}
									</div>
								</section>
								<div className={styles.contact}>
									<Label htmlFor="lastContactedDate">
										Last Contacted Date:{" "}
									</Label>
									<p id="lastContactedDate">
										{item.lastContactedDate ? lastContactedDate : "Not Set"}
									</p>
								</div>
							</>
						)}
						{!isJob && (
							<>
								<div className={styles.contact}>
									<Label htmlFor="firstEmailDate">First Email Date: </Label>
									<p
										id="firstEmailDate"
										className={`${item.emailSent ? styles.sent : null}`}>
										{item.firstEmailDate ? initialContactDate : "Not Set"}
									</p>
									{item.emailSent && (
										<span className={styles.small}>Email sent</span>
									)}
								</div>
								{item.lastEmailDate && (
									<div className={styles.contact}>
										<Label htmlFor="lastEmailDate">Last Email Date: </Label>
										<p id="lastEmailDate">
											{item.lastEmailDate ? lastContactedDate : "Not Set"}
										</p>
									</div>
								)}
								{item.responded && (
									<div className={styles.contact}>
										<Label htmlFor="responseDate">Response Date: </Label>
										<p id="responseDate">
											{item.responseDate
												? readableDate(item.responseDate)
												: "Not Set"}
										</p>
									</div>
								)}
							</>
						)}
					</div>
					{description && (
						<SheetDescription className={styles.itemDescription}>
							{description}
						</SheetDescription>
					)}
				</SheetHeader>

				<SheetFooter>
					<Button type="submit" onClick={() => setModalOpen(false)}>
						Save changes
					</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
