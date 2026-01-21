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
import { Building, Linkedin, Pencil } from "lucide-react";
import styles from "@/styles/ItemSheet.module.scss";
import { readableDate } from "@/features/shared/lib/utils";
import Link from "next/link";
import DeleteItemDialog from "./DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "./ItemStatusSelect";
import { toast } from "sonner";

export default function ItemDetailsSheet({
	item,
	type = "connection",
	context,
	status,
}) {
	const {
		modalOpen,
		setModalOpen,
		sendEmail,
		update,
		updateConnectionFields,
		createCalendarEvent,
	} = context;
	const [isEditing, setIsEditing] = useState(false);

	// Form state for editing
	const [formData, setFormData] = useState({
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
			if (!updateConnectionFields) {
				toast.error("Update function not available");
				return;
			}

			const id = item.id;

			// Prepare data for connection
			const dataToUpdate = {
				name: formData.name,
				email: formData.email,
				company: formData.company,
				position: formData.position,
				linkedinUrl: formData.linkedinUrl,
				notes: formData.notes,
			};

			const updatedData = await updateConnectionFields(
				id,
				dataToUpdate,
				item.email
			);

			// Ensure that calendar is created and email is sent with data from api
			if (updatedData.email) {
				await Promise.allSettled([
					sendEmail(updatedData),
					createCalendarEvent(updatedData),
				]);
				toast("Connection has been updated and new email sent!", {
					action: { label: "Close", onClick: () => {} },
				});
			}
			toast.success("Connection updated successfully");
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating:", error);
			toast.error("Failed to update. Please try again.");
		}
	};

	const handleCancel = () => {
		// Reset form data to original item values
		setFormData({
			name: item.name || "",
			email: item.email || "",
			company: item.company || "",
			position: item.position || "",
			linkedinUrl: item.linkedinUrl || "",
			notes: item.notes || "",
		});
		setIsEditing(false);
	};

	// Get dates for connection
	const date = readableDate(item.connectedDate);
	const lastContactedDate = readableDate(item.lastEmailDate);
	const initialContactDate = readableDate(item.firstEmailDate);

	// Get title and description
	const title = item.name;
	const description = item.notes;

	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className="w-full overflow-y-scroll max-h-screen bg-white max-w-[1000px]">
				<SheetHeader>
					<div className={styles.itemTitleContainer}>
						<SheetTitle className={styles.itemTitle}>
							{isEditing ? (
								<Input
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									placeholder={item.name || "Name"}
									className="text-lg font-semibold"
								/>
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
							<DeleteItemDialog id={item.id} type={type} />
						</div>
					</div>
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
					<div className={styles.company}>
						<Building size={15} className={styles.icon} />
						{isEditing ? (
							<Input
								value={formData.company}
								onChange={(e) => handleInputChange("company", e.target.value)}
								placeholder={item.company || "Company"}
							/>
						) : (
							item.company
						)}
					</div>
					<div className={styles.position}>
						{isEditing ? (
							<Input
								value={formData.position}
								onChange={(e) => handleInputChange("position", e.target.value)}
								placeholder={item.position || "Position"}
							/>
						) : (
							item.position
						)}
					</div>
					<div className={styles.badge}>
						<Badge className={styles.status}>
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
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									placeholder={item.name || "Name"}
								/>
							) : (
								<p id="contactName">{item.name || "Not Set"}</p>
							)}
						</div>
						<div className={styles.contact}>
							<Label htmlFor="contactEmail">Contact Email: </Label>
							{isEditing ? (
								<div className={styles.inputWrapper}>
									<Input
										id="contactEmail"
										type="email"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										placeholder={item.email || "Email"}
									/>
									<p className={styles.contactWarning}>
										Changing this will make a new contact date
									</p>
								</div>
							) : (
								<p id="contactEmail">{item.email || "Not Set"}</p>
							)}
						</div>
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
					</div>
					{isEditing ? (
						<div className={styles.contact}>
							<Label htmlFor="description">Notes: </Label>
							<Textarea
								id="description"
								value={formData.notes}
								onChange={(e) => handleInputChange("notes", e.target.value)}
								placeholder={item.notes || "Notes"}
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
