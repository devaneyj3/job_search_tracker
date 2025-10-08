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
import { MapPinned, Building, Currency, ExternalLink } from "lucide-react";
import styles from "./CustomSheet.module.scss";
import { readableDate } from "@/utils";
import Link from "next/link";
import DeleteJobButton from "../../DeleteJobButton/DeleteJobButton";
import { useJob } from "@/context/jobContext";
import { Badge } from "@/components/ui/badge";
import { JobStatusSelect } from "@/components/shared/JobStatusSelect/JobStatusSelect";
import moment from "moment";

export default function CustomSheet({ j }) {
	const { modalOpen, setModalOpen, sendEmail } = useJob();
	const date = readableDate(j.appliedDate);
	const lastContactedDate = readableDate(j.lastContactedDate);
	const initialContactDate = readableDate(j.initialContactDate);
	const secondContactDate = readableDate(j.secondContactDate);
	//check if second contact date is today or any time before today and the second email is not sent
	const shouldSendSecondEmail =
		moment(secondContactDate).isSameOrBefore(Date.now()) &&
		j.secondContactEmailSent === false;

	const sendSecondEmail = () => {
		sendEmail(j, true);
	};

	console.log(j);

	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className="w-full overflow-y-scroll max-h-screen bg-white max-w-[1000px]">
				<SheetHeader>
					<div className={styles.jobTitleContainer}>
						<SheetTitle className={styles.jobTitle}>{j.jobTitle}</SheetTitle>
						<DeleteJobButton id={j.id} company={j.companyInfoId} />
					</div>
					<p className={styles.jobPosting}>
						<ExternalLink size={15} className={styles.icon} />
						<Link href={j.jobUrl} target="_blank">
							Go to Job Posting
						</Link>
					</p>
					{j.salary && (
						<div className={styles.salary}>
							<Currency size={15} className={styles.icon} />
							{j.salary}
						</div>
					)}
					<p className={styles.company}>
						<Building size={15} className={styles.icon} />
						{j.companyName}
					</p>
					<p className={styles.location}>
						<MapPinned size={15} className={styles.icon} />

						{j.location}
					</p>
					<div className={styles.badge}>
						<Badge
							className={j.status === "Rejected" ? styles.red : styles.status}>
							{j.status} on {date}
						</Badge>
					</div>
					<JobStatusSelect jobId={j.id} />
					<div className={styles.contactInfo}>
						<div className={styles.contact}>
							<Label htmlFor="contactName">Contact Name: </Label>
							<p id="contactName">
								{j.contactName ? j.contactName : "Not Set"}
							</p>
						</div>
						<div className={styles.contact}>
							<Label htmlFor="contactEmail">Contact Email: </Label>
							<p id="contactEmail">
								{j.contactEmail ? j.contactEmail : "Not Set"}
							</p>
						</div>
						{j.heard_back !== true && (
							<>
								<section className={styles.contactDates}>
									<div className={styles.contact}>
										<Label htmlFor="initailContactDate">
											Initial Contact Date:{" "}
										</Label>
										<p
											id="firstContactDate"
											className={`${
												j.initialContactEmailSent ? styles.sent : null
											}`}>
											{j.initialContactDate ? initialContactDate : "Not Set"}
										</p>
										{j.initialContactEmailSent && (
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
												j.secondContactEmailSent ? styles.sent : null
											}`}>
											{j.secondContactDate ? secondContactDate : "Not Set"}
											{shouldSendSecondEmail && (
												<Button
													className={styles.btn}
													onClick={sendSecondEmail}>
													Send Follow-Up Email
												</Button>
											)}
										</p>
										{j.secondContactEmailSent && (
											<span className={styles.small}>Email sent</span>
										)}
									</div>
								</section>
								<div className={styles.contact}>
									<Label htmlFor="lastContactedDate">
										Last Contacted Date:{" "}
									</Label>
									<p id="lastContactedDate">
										{j.lastContactedDate ? lastContactedDate : "Not Set"}
									</p>
								</div>
							</>
						)}
					</div>
					<SheetDescription className={styles.jobDescription}>
						{j.jobDescription}
					</SheetDescription>
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
