"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/features/shared/ui/button";
import { Label } from "@/features/shared/ui/label";
import { Input } from "@/features/shared/ui/input";
import { Textarea } from "@/features/shared/ui/textarea";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/features/shared/ui/sheet";
import {
	MapPinned,
	Building,
	Currency,
	ExternalLink,
	Linkedin,
	Pencil,
} from "lucide-react";
import styles from "@/styles/ItemSheet.module.scss";
import { readableDate } from "@/features/shared/lib/utils";
import Link from "next/link";
import DeleteItemDialog from "./DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "./ItemStatusSelect";
import moment from "moment";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/features/shared/ui/select";
import { contactPosition } from "@/Constants";

export default function ItemDetailsSheet({
	item,
	type = "job",
	context,
	status,
}) {
	const {
		modalOpen,
		setModalOpen,
		sendEmail,
		update,
		updateJobFields,
		updateConnectionFields,
		createCalendarEvent,
	} = context;
	const isJob = type === "job";
	const [isEditing, setIsEditing] = useState(false);

	// Form state for editing
	const [formData, setFormData] = useState({
		// Job fields
		jobTitle: item.jobTitle || "",
		companyName: item.companyName || "",
		jobUrl: item.jobUrl || "",
		salary: item.salary || "",
		location: item.location || "",
		contactName: item.contactName || "",
		contactEmail: item.contactEmail || "",
		contactPosition: item.contactPosition || "",
		jobDescription: item.jobDescription || "",
		skill1: item.skill1 || "",
		skill2: item.skill2 || "",
		// Connection fields
		name: item.name || "",
		email: item.email || "",
		company: item.company || "",
		position: item.position || "",
		linkedinUrl: item.linkedinUrl || "",
		notes: item.notes || "",
	});

	// Update form data when item changes
	useEffect(() => {
		setFormData({
			// Job fields
			jobTitle: item.jobTitle || "",
			companyName: item.companyName || "",
			jobUrl: item.jobUrl || "",
			salary: item.salary || "",
			location: item.location || "",
			contactName: item.contactName || "",
			contactEmail: item.contactEmail || "",
			contactPosition: item.contactPosition || "",
			jobDescription: item.jobDescription || "",
			skill1: item.skill1 || "",
			skill2: item.skill2 || "",
			// Connection fields
			name: item.name || "",
			email: item.email || "",
			company: item.company || "",
			position: item.position || "",
			linkedinUrl: item.linkedinUrl || "",
			notes: item.notes || "",
		});
	}, [item]);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			const updateFunction = isJob ? updateJobFields : updateConnectionFields;

			if (!updateFunction) {
				toast.error("Update function not available");
				return;
			}

			const id = item.id;

			// Prepare data based on type
			const dataToUpdate = isJob
				? {
						jobTitle: formData.jobTitle,
						companyName: formData.companyName,
						jobUrl: formData.jobUrl,
						salary: formData.salary,
						location: formData.location,
						contactName: formData.contactName,
						contactEmail: formData.contactEmail,
						contactPosition: formData.contactPosition,
						jobDescription: formData.jobDescription,
						skill1: formData.skill1,
						skill2: formData.skill2,
				  }
				: {
						name: formData.name,
						email: formData.email,
						company: formData.company,
						position: formData.position,
						linkedinUrl: formData.linkedinUrl,
						notes: formData.notes,
				  };
			const updatedData = await updateFunction(
				id,
				dataToUpdate,
				item.contactEmail
			);
			// ensure that calendar is created and email is sent with data from api
			if (updatedData.contactEmail) {
				// If these don't depend on each other, do them in parallel:
				await Promise.allSettled([
					sendEmail(updatedData), // or sendEmail({ ...values, jobId: job.id })
					createCalendarEvent(updatedData), // needs the created job
				]);
				toast("Application has been updated and new email sent!", {
					action: { label: "Close", onClick: () => {} },
				});
			}
			toast.success(`${isJob ? "Job" : "Connection"} updated successfully`);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating:", error);
			toast.error("Failed to update. Please try again.");
		}
	};

	const handleCancel = () => {
		// Reset form data to original item values
		setFormData({
			jobTitle: item.jobTitle || "",
			companyName: item.companyName || "",
			jobUrl: item.jobUrl || "",
			salary: item.salary || "",
			location: item.location || "",
			contactName: item.contactName || "",
			contactEmail: item.contactEmail || "",
			contactPosition: item.contactPosition || "",
			jobDescription: item.jobDescription || "",
			skill1: item.skill1 || "",
			skill2: item.skill2 || "",
			name: item.name || "",
			email: item.email || "",
			company: item.company || "",
			position: item.position || "",
			linkedinUrl: item.linkedinUrl || "",
			notes: item.notes || "",
		});
		setIsEditing(false);
	};

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
						<SheetTitle className={styles.itemTitle}>
							{isEditing ? (
								isJob ? (
									<Input
										value={formData.jobTitle}
										onChange={(e) =>
											handleInputChange("jobTitle", e.target.value)
										}
										placeholder={item.jobTitle || "Job Title"}
										className="text-lg font-semibold"
									/>
								) : (
									<Input
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										placeholder={item.name || "Name"}
										className="text-lg font-semibold"
									/>
								)
							) : (
								title
							)}
						</SheetTitle>
						<div style={{ display: "flex", gap: "8px" }}>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setIsEditing(!isEditing)}>
								<Pencil size={16} />
							</Button>
							<DeleteItemDialog
								id={item.id}
								type={type}
								companyInfoId={item.companyInfoId}
							/>
						</div>
					</div>
					{isJob && (
						<div className={styles.itemPosting}>
							<ExternalLink size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.jobUrl}
									onChange={(e) => handleInputChange("jobUrl", e.target.value)}
									placeholder={item.jobUrl || "Job URL"}
									type="url"
								/>
							) : item.jobUrl ? (
								<Link href={item.jobUrl} target="_blank">
									Go to Job Posting
								</Link>
							) : null}
						</div>
					)}
					{!isJob && (
						<div className={styles.itemPosting}>
							<Linkedin size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.linkedinUrl}
									onChange={(e) =>
										handleInputChange("linkedinUrl", e.target.value)
									}
									placeholder={item.linkedinUrl || "LinkedIn URL"}
									type="url"
								/>
							) : item.linkedinUrl ? (
								<Link href={item.linkedinUrl} target="_blank">
									View LinkedIn Profile
								</Link>
							) : null}
						</div>
					)}
					{isJob && (
						<div className={styles.salary}>
							<Currency size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.salary}
									onChange={(e) => handleInputChange("salary", e.target.value)}
									placeholder={item.salary || "Salary"}
								/>
							) : (
								item.salary
							)}
						</div>
					)}
					<div className={styles.company}>
						<Building size={15} className={styles.icon} />
						{isEditing ? (
							<Input
								value={isJob ? formData.companyName : formData.company}
								onChange={(e) =>
									handleInputChange(
										isJob ? "companyName" : "company",
										e.target.value
									)
								}
								placeholder={
									isJob
										? item.companyName || "Company Name"
										: item.company || "Company"
								}
							/>
						) : (
							item.companyName || item.company
						)}
					</div>
					{isJob && (
						<div className={styles.location}>
							<MapPinned size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.location}
									onChange={(e) =>
										handleInputChange("location", e.target.value)
									}
									placeholder={item.location || "Location"}
								/>
							) : (
								item.location
							)}
						</div>
					)}
					{!isJob && (
						<div className={styles.position}>
							{isEditing ? (
								<Input
									value={formData.position}
									onChange={(e) =>
										handleInputChange("position", e.target.value)
									}
									placeholder={item.position || "Position"}
								/>
							) : (
								item.position
							)}
						</div>
					)}
					<div className={styles.badge}>
						<Badge
							className={
								item.status === "Rejected" ? styles.red : styles.status
							}>
							{item.status} on {date}
						</Badge>
					</div>

					<ItemStatusSelect id={item.id} status={status} update={update} />

					<div className={styles.contactInfo}>
						<div className={styles.contact}>
							<Label htmlFor="contactName">Contact Name: </Label>
							{isEditing ? (
								<Input
									id="contactName"
									value={isJob ? formData.contactName : formData.name}
									onChange={(e) =>
										handleInputChange(
											isJob ? "contactName" : "name",
											e.target.value
										)
									}
									placeholder={
										isJob
											? item.contactName || "Contact Name"
											: item.name || "Name"
									}
								/>
							) : (
								<p id="contactName">
									{item.contactName || item.name || "Not Set"}
								</p>
							)}
						</div>
						<div className={styles.contact}>
							<Label htmlFor="contactEmail">Contact Email: </Label>
							{isEditing ? (
								<div className={styles.inputWrapper}>
									<Input
										id="contactEmail"
										type="email"
										value={isJob ? formData.contactEmail : formData.email}
										onChange={(e) =>
											handleInputChange(
												isJob ? "contactEmail" : "email",
												e.target.value
											)
										}
										placeholder={
											isJob
												? item.contactEmail || "Contact Email"
												: item.email || "Email"
										}
									/>
									<p className={styles.contactWarning}>
										Changing this will make a new contact date
									</p>
								</div>
							) : (
								<>
									<p id="contactEmail">
										{item.contactEmail || item.email || "Not Set"}
									</p>
								</>
							)}
						</div>
						{isJob && (
							<div className={styles.contact}>
								<Label htmlFor="contactPosition">Contact Position: </Label>
								{isEditing ? (
									<Select
										value={formData.contactPosition}
										onValueChange={(value) =>
											handleInputChange("contactPosition", value)
										}>
										<SelectTrigger>
											<SelectValue
												placeholder={item.contactPosition || "Select Position"}
											/>
										</SelectTrigger>
										<SelectContent>
											{contactPosition.map((pos) => (
												<SelectItem key={pos} value={pos}>
													{pos}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								) : (
									<p id="contactPosition">
										{item.contactPosition || "Not Set"}
									</p>
								)}
							</div>
						)}
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
					{isEditing && isJob && (
						<>
							<div className={styles.contact}>
								<Label htmlFor="skill1">Skill 1: </Label>
								<Input
									id="skill1"
									value={formData.skill1}
									onChange={(e) => handleInputChange("skill1", e.target.value)}
									placeholder={
										item.skill1 || "What skill can benefit the company?"
									}
								/>
							</div>
							<div className={styles.contact}>
								<Label htmlFor="skill2">Skill 2: </Label>
								<Input
									id="skill2"
									value={formData.skill2}
									onChange={(e) => handleInputChange("skill2", e.target.value)}
									placeholder={
										item.skill2 || "What skill can benefit the company?"
									}
								/>
							</div>
						</>
					)}
					{isEditing ? (
						<div className={styles.contact}>
							<Label htmlFor="description">
								{isJob ? "Job Description" : "Notes"}:{" "}
							</Label>
							<Textarea
								id="description"
								value={isJob ? formData.jobDescription : formData.notes}
								onChange={(e) =>
									handleInputChange(
										isJob ? "jobDescription" : "notes",
										e.target.value
									)
								}
								placeholder={
									isJob
										? item.jobDescription || "Job Description"
										: item.notes || "Notes"
								}
								rows={6}
							/>
						</div>
					) : (
						description && (
							<SheetDescription className={styles.itemDescription}>
								{description}
							</SheetDescription>
						)
					)}
				</SheetHeader>

				<SheetFooter>
					{isEditing ? (
						<>
							<Button type="submit" onClick={handleSave}>
								Save changes
							</Button>
							<Button variant="outline" onClick={handleCancel}>
								Cancel
							</Button>
						</>
					) : (
						<>
							<Button type="submit" onClick={() => setModalOpen(false)}>
								Close
							</Button>
							<SheetClose asChild>
								<Button variant="outline">Close</Button>
							</SheetClose>
						</>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
