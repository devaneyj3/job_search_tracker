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
import React, { useState } from "react";
import Link from "next/link";

export default function JobBox({ j }) {
	const { selectedJob, setSelectedJob, deleteJob } = useJob();
	const [open, setOpen] = useState(false);
	console.log(j);

	const date = readableDate(j.appliedDate);
	const lastContactedDate = readableDate(j.lastContactedDate);
	const firstContactDate = readableDate(j.firstContactDate);
	const secondContactDate = readableDate(j.secondContactDate);
	const thirdContactDate = readableDate(j.thirdContactDate);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<div
					className={`${styles.job} ${
						j.id === selectedJob.id && styles.active
					}`}
					onClick={() => {
						setSelectedJob(j);
						setOpen(!open);
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
					</div>
					<div>
						<div className={styles.status}>{j.status}</div>
						<div className={styles.appliedDate}>{date}</div>
					</div>
				</div>
			</SheetTrigger>
			<SheetContent className="w-full sm:w-1/2">
				<SheetHeader>
					<SheetTitle className={styles.jobTitle}>{j.jobTitle}</SheetTitle>
					<p className={styles.jobPosting}>
						<ExternalLink size={15} className={styles.icon} />
						<Link href={j.jobUrl} target="_blank">
							Go to Job Posting
						</Link>
					</p>
					<Button variant="destructive" onClick={() => deleteJob(j.id)}>
						Delete
					</Button>
					<div className={styles.salary}>
						<Currency size={15} className={styles.icon} />
						{j.salary}
					</div>
					<p className={styles.company}>
						<Building size={15} className={styles.icon} />
						{j.companyName}
					</p>
					<p className={styles.location}>
						<MapPinned size={15} className={styles.icon} />

						{j.location}
					</p>
					<div className={styles.status}>
						{j.status} on {date}
					</div>
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
						<section className={styles.contactDates}>
							<div className={styles.contact}>
								<Label htmlFor="firstContactDate">First Contact Date: </Label>
								<p id="firstContactDate">
									{j.firstContactDate ? firstContactDate : "Not Set"}
								</p>
							</div>
							<div className={styles.contact}>
								<Label htmlFor="secondContactDate">Second Contact Date: </Label>
								<p id="secondContactDate">
									{j.secondContactDate ? secondContactDate : "Not Set"}
								</p>
							</div>
							<div className={styles.contact}>
								<Label htmlFor="thirdContactDate">Third Contact Date: </Label>
								<p id="thirdContactDate">
									{j.thirdContactDate ? thirdContactDate : "Not Set"}
								</p>
							</div>
						</section>
						<div className={styles.contact}>
							<Label htmlFor="lastContactedDate">Last Contacted Date: </Label>
							<p id="lastContactedDate">
								{j.lastContactedDate ? lastContactedDate : "Not Set"}
							</p>
						</div>
					</div>
					<SheetDescription>{j.jobDescription}</SheetDescription>
				</SheetHeader>

				<SheetFooter>
					<Button type="submit">Save changes</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
