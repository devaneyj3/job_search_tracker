"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { MapPinned, Building, Currency } from "lucide-react";
import styles from "./JobBox.module.scss";
import { readableDate } from "@/utils";
import React, { useState } from "react";

export default function JobBox({ j }) {
	const { selectedJob, setSelectedJob } = useJob();
	const [open, setOpen] = useState(false);

	const date = readableDate(j.appliedDate);
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
			<SheetContent>
				<SheetHeader>
					<SheetTitle className={styles.jobTitle}>{j.jobTitle}</SheetTitle>
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
