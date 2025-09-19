"use client";
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
	SheetTrigger,
} from "@/components/ui/sheet";
import { useJob } from "@/context/jobContext";
import { MapPinned, Building, Currency, ExternalLink } from "lucide-react";
import styles from "./JobBox.module.scss";
import { readableDate } from "@/utils";
import React from "react";
import Link from "next/link";
import DeleteJobButton from "../../DeleteJobButton/DeleteJobButton";

export default function JobBox({ j, setModalOpen, modalOpen }) {
	const { selectedJob, setSelectedJob } = useJob();
	console.log(selectedJob);

	const date = readableDate(j.appliedDate);
	const lastContactedDate = readableDate(j.lastContactedDate);
	const initialContactDate = readableDate(j.initialContactDate);
	const secondContactDate = readableDate(j.secondContactDate);

	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetTrigger asChild>
				<div
					className={`${styles.job} ${
						j.id === selectedJob.id && styles.active
					}`}
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
			</SheetTrigger>
			<SheetContent className="w-full sm:w-1/2">
				<SheetHeader>
					<SheetTitle className={styles.jobTitle}>
						{selectedJob.jobTitle}
					</SheetTitle>
					<p className={styles.jobPosting}>
						<ExternalLink size={15} className={styles.icon} />
						<Link href={selectedJob.jobUrl} target="_blank">
							Go to Job Posting
						</Link>
					</p>
					<DeleteJobButton
						id={selectedJob.id}
						company={selectedJob.companyInfoId}
					/>
					<div className={styles.salary}>
						<Currency size={15} className={styles.icon} />
						{selectedJob.salary}
					</div>
					<p className={styles.company}>
						<Building size={15} className={styles.icon} />
						{selectedJob.companyName}
					</p>
					<p className={styles.location}>
						<MapPinned size={15} className={styles.icon} />

						{selectedJob.location}
					</p>
					<div className={styles.status}>
						{selectedJob.status} on {date}
					</div>
					<div className={styles.contactInfo}>
						<div className={styles.contact}>
							<Label htmlFor="contactName">Contact Name: </Label>
							<p id="contactName">
								{selectedJob.contactName ? selectedJob.contactName : "Not Set"}
							</p>
						</div>
						<div className={styles.contact}>
							<Label htmlFor="contactEmail">Contact Email: </Label>
							<p id="contactEmail">
								{selectedJob.contactEmail
									? selectedJob.contactEmail
									: "Not Set"}
							</p>
						</div>
						<section className={styles.contactDates}>
							<div className={styles.contact}>
								<Label htmlFor="initailContactDate">
									Initial Contact Date:{" "}
								</Label>
								<p
									id="firstContactDate"
									className={`${
										selectedJob.initialContactEmailSent ? styles.sent : null
									}`}>
									{selectedJob.initialContactDate
										? initialContactDate
										: "Not Set"}
								</p>
								{j.initialContactEmailSent && (
									<span className={styles.small}>Email sent</span>
								)}
							</div>
							<div className={styles.contact}>
								<Label htmlFor="secondContactDate">Second Contact Date: </Label>
								<p id="secondContactDate">
									{selectedJob.secondContactDate
										? secondContactDate
										: "Not Set"}
								</p>
							</div>
						</section>
						<div className={styles.contact}>
							<Label htmlFor="lastContactedDate">Last Contacted Date: </Label>
							<p id="lastContactedDate">
								{selectedJob.lastContactedDate ? lastContactedDate : "Not Set"}
							</p>
						</div>
					</div>
					<SheetDescription>{selectedJob.jobDescription}</SheetDescription>
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
