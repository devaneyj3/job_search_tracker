"use client";
import React, { useEffect, useState } from "react";
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
import { Mail, Pencil, Briefcase, Building, ExternalLink } from "lucide-react";
import {
	daysFromNow,
	emailToSend,
	readableDate,
} from "@/features/shared/lib/utils";
import Link from "next/link";
import DeleteItemDialog from "@/features/shared/components/DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { toast } from "sonner";
import JobOtreachTemplate from "@/features/email/templates/JobOtreachTemplate";
import {
	buildGmailComposeUrl,
	buildOutreachEmailDraft,
} from "@/features/email/lib/outreachEmail";
import SecondEmailJobOtreachTemplate from "@/features/email/templates/SeconEmailJobOutreachTemplate";
import { NavigationTabs } from "@/features/shared/components/NavigationTabs/NavigationTabs";
import { useConnection } from "../../context/connectionContext";
import { connectionStatus } from "@/Constants";
import EmailFlow from "@/features/shared/components/EmailFlow/EmailFlow";

import styles from "@/styles/ItemSheet.module.scss";
import { EMAIL_LABELS } from "@/lib/emailLabels";

export default function ConnectionDetailsSheet({ item }) {
	const { modalOpen, setModalOpen, updateConnection, recordConnectionEmail } =
		useConnection();
	const [isEditing, setIsEditing] = useState(false);
	const [selectedTab, setSelectedTab] = useState("Initial");
	const companyName =
		typeof item.company === "string" ? item.company : item.company?.name || "";

	const getInitialFormData = () => ({
		name: item.name || "",
		email: item.email || "",
		position: item.position || "",
		linkedinUrl: item.linkedinUrl || "",
		notes: item.notes || "",
	});

	const [formData, setFormData] = useState(getInitialFormData());

	useEffect(() => {
		setFormData(getInitialFormData());
	}, [item]);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			if (!updateConnection) {
				toast.error("Update function not available");
				return;
			}

			const dataToUpdate = {
				name: formData.name,
				email: formData.email,
				position: formData.position,
				linkedinUrl: formData.linkedinUrl,
				notes: formData.notes,
			};

			await updateConnection(item.id, dataToUpdate);
			toast.success("Connection updated successfully");
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating connection:", error);
			toast.error("Failed to update. Please try again.");
		}
	};

	const handleCancel = () => {
		setFormData(getInitialFormData());
		setIsEditing(false);
	};

	const date = readableDate(item.createdAt);
	const recipient = (isEditing ? formData.email : item.email)?.trim();
	const { subject, body } = buildOutreachEmailDraft({
		contactName: isEditing ? formData.name : item.name,
		companyName,
		emailCount: item.emailCount,
		firstEmailDate: item.lastEmailDate,
	});
	const gmailComposeUrl = recipient
		? buildGmailComposeUrl({ to: recipient, subject, body })
		: null;

	const handleComposeClick = async () => {
		try {
			await recordConnectionEmail(item.id, {
				subject,
				body,
				sequence: item.emailCount + 1,
			});
		} catch (error) {
			console.error("Error recording email:", error);
			toast.error("Failed to record email");
		}
	};
	const todoSendString = emailToSend(item);
	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className={styles.sheetContent}>
				<div style={{ display: "flex", gap: "8px" }}>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setIsEditing(!isEditing)}>
						<Pencil size={16} />
					</Button>
					<DeleteItemDialog id={item.id} type="connection" />
				</div>
				<SheetHeader className={styles.sheetHeader}>
					<div className={styles.infoColunm}>
						<div className={styles.itemTitleContainer}>
							<SheetTitle className={styles.itemTitle}>
								{isEditing ? (
									<Input
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										placeholder={item.name || "Connection Name"}
										className="text-lg font-semibold"
									/>
								) : (
									item.name
								)}
							</SheetTitle>
						</div>
						{(isEditing || item.email) && (
							<div className={styles.itemPosting}>
								<Mail size={15} className={styles.icon} />
								{isEditing ? (
									<Input
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										placeholder={item.email || "Email"}
										type="email"
									/>
								) : (
									<a
										href={`mailto:${item.email}`}
										className={styles.composeEmailSecondary}>
										{item.email}
									</a>
								)}
							</div>
						)}
						{(isEditing || item.linkedinUrl) && (
							<div className={styles.itemPosting}>
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
									<Link
										href={item.linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.composeEmailSecondary}>
										View LinkedIn
									</Link>
								) : null}
							</div>
						)}
						{companyName && (
							<div className={styles.company}>
								<Building size={15} className={styles.icon} />
								{companyName}
							</div>
						)}
						{(isEditing || item.position) && (
							<div className={styles.company}>
								<Briefcase size={15} className={styles.icon} />
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
							<Badge className={styles.status}>
								{item.status} on {date}
							</Badge>
						</div>

						<ItemStatusSelect
							id={item.id}
							status={connectionStatus}
							update={updateConnection}
						/>

						{gmailComposeUrl ? (
							<div className={styles.composeActions}>
								<a
									href={gmailComposeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.composeEmailLink}
									onClick={handleComposeClick}>
									<Mail size={16} strokeWidth={2} aria-hidden />
									Compose in Gmail
									<ExternalLink size={14} strokeWidth={2} aria-hidden />
								</a>
							</div>
						) : (
							<p className={styles.composeEmailHint}>
								Add an email address above to compose a pre-filled outreach
								message.
							</p>
						)}
						{isEditing ? (
							<div className={styles.contact}>
								<Label htmlFor="notes">Notes: </Label>
								<Textarea
									id="notes"
									value={formData.notes}
									onChange={(e) => handleInputChange("notes", e.target.value)}
									placeholder={item.notes || "Notes"}
									rows={4}
								/>
							</div>
						) : (
							item.notes && (
								<SheetDescription className={styles.itemDescription}>
									<strong>Notes:</strong> {item.notes}
								</SheetDescription>
							)
						)}
					</div>
					<div className={styles.emailContainer}>
						<h2>Email Flow</h2>
						{item.emails &&
							item.emails.map((email) => {
								return <EmailFlow key={email.id} email={email} />;
							})}
							<p>{todoSendString}</p>
						<p>You sent {item.emailCount} emails</p>
						<p>
							Your last email was sent on {readableDate(item.lastEmailDate)}
						</p>
					</div>
				</SheetHeader>
				<NavigationTabs
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
				<section className={styles.template_container}>
					{selectedTab === "Initial" ? (
						<JobOtreachTemplate
							contactName={item.name}
							companyName={companyName}
						/>
					) : (
						<SecondEmailJobOtreachTemplate
							contactName={item.name}
							companyName={companyName}
							firstEmailDate={item.lastEmailDate}
						/>
					)}
				</section>

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
						<SheetClose asChild>
							<Button variant="outline">Close</Button>
						</SheetClose>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
