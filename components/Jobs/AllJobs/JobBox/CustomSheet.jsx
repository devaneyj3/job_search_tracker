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

export default function CustomSheet({ j }) {
	const { modalOpen, setModalOpen } = useJob();
	const date = readableDate(j.appliedDate);
	const lastContactedDate = readableDate(j.lastContactedDate);
	const initialContactDate = readableDate(j.initialContactDate);
	const secondContactDate = readableDate(j.secondContactDate);

	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className="w-1/2 overflow-y-scroll max-h-screenbg-white">
				<SheetHeader>
					<SheetTitle className={styles.jobTitle}>{j.jobTitle}</SheetTitle>
					<p className={styles.jobPosting}>
						<ExternalLink size={15} className={styles.icon} />
						<Link href={j.jobUrl} target="_blank">
							Go to Job Posting
						</Link>
					</p>
					<DeleteJobButton id={j.id} company={j.companyInfoId} />
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
								<Label htmlFor="secondContactDate">Second Contact Date: </Label>
								<p id="secondContactDate">
									{j.secondContactDate ? secondContactDate : "Not Set"}
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
