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
import styles from "@/styles/CustomSheet.module.scss";
import { readableDate } from "@/utils";
import Link from "next/link";
import DeletedataobButton from "../../DeletedJobButton/DeletedJobButton";
import { usedataob } from "@/context/jobContext";
import { Badge } from "@/components/ui/badge";
import { JobStatusSelect } from "@/components/shared/JobStatusSelect/JobStatusSelect";
import moment from "moment";

export default function CustomSheet({ data }) {
	const { modalOpen, setModalOpen, sendEmail } = usedataob();
	const date = readableDate(data.appliedDate);
	const lastContactedDate = readableDate(data.lastContactedDate);
	const initialContactDate = readableDate(data.initialContactDate);
	const secondContactDate = readableDate(data.secondContactDate);
	//check if second contact date is today or any time before today and the second email is not sent
	const shouldSendSecondEmail =
		moment(secondContactDate).isSameOrBefore(Date.now()) &&
		data.secondContactEmailSent === false;

	const sendSecondEmail = () => {
		sendEmail(data, true);
	};

	console.log(data);

	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className="w-full overflow-y-scroll max-h-screen bg-white max-w-[1000px]">
				<SheetHeader>
					<div className={styles.dataobTitleContainer}>
						<SheetTitle className={styles.dataobTitle}>
							{data.dataobTitle}
						</SheetTitle>
						<DeletedataobButton id={data.id} company={data.companyInfoId} />
					</div>
					<p className={styles.dataobPosting}>
						<ExternalLink size={15} className={styles.icon} />
						<Link href={data.dataobUrl} target="_blank">
							Go to dataob Posting
						</Link>
					</p>
					{data.salary && (
						<div className={styles.salary}>
							<Currency size={15} className={styles.icon} />
							{data.salary}
						</div>
					)}
					<p className={styles.company}>
						<Building size={15} className={styles.icon} />
						{data.companyName}
					</p>
					<p className={styles.location}>
						<MapPinned size={15} className={styles.icon} />

						{data.location}
					</p>
					<div className={styles.badge}>
						<Badge
							className={
								data.status === "Redataected" ? styles.red : styles.status
							}>
							{data.status} on {date}
						</Badge>
					</div>
					<dataobStatusSelect dataobId={data.id} />
					<div className={styles.contactInfo}>
						<div className={styles.contact}>
							<Label htmlFor="contactName">Contact Name: </Label>
							<p id="contactName">
								{data.contactName ? data.contactName : "Not Set"}
							</p>
						</div>
						<div className={styles.contact}>
							<Label htmlFor="contactEmail">Contact Email: </Label>
							<p id="contactEmail">
								{data.contactEmail ? data.contactEmail : "Not Set"}
							</p>
						</div>
						{data.heard_back !== true && (
							<>
								<section className={styles.contactDates}>
									<div className={styles.contact}>
										<Label htmlFor="initailContactDate">
											Initial Contact Date:{" "}
										</Label>
										<p
											id="firstContactDate"
											className={`${
												data.initialContactEmailSent ? styles.sent : null
											}`}>
											{data.initialContactDate ? initialContactDate : "Not Set"}
										</p>
										{data.initialContactEmailSent && (
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
												data.secondContactEmailSent ? styles.sent : null
											}`}>
											{data.secondContactDate ? secondContactDate : "Not Set"}
											{shouldSendSecondEmail && (
												<Button
													className={styles.btn}
													onClick={sendSecondEmail}>
													Send Follow-Up Email
												</Button>
											)}
										</p>
										{data.secondContactEmailSent && (
											<span className={styles.small}>Email sent</span>
										)}
									</div>
								</section>
								<div className={styles.contact}>
									<Label htmlFor="lastContactedDate">
										Last Contacted Date:{" "}
									</Label>
									<p id="lastContactedDate">
										{data.lastContactedDate ? lastContactedDate : "Not Set"}
									</p>
								</div>
							</>
						)}
					</div>
					<SheetDescription className={styles.dataobDescription}>
						{data.dataobDescription}
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
