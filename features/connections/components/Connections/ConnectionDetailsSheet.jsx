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
import { Mail, Linkedin, Pencil, Briefcase, Building } from "lucide-react";
import styles from "@/styles/ItemSheet.module.scss";
import { readableDate } from "@/features/shared/lib/utils";
import Link from "next/link";
import DeleteItemDialog from "@/features/shared/components/DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { toast } from "sonner";
import JobOtreachTemplate from "@/features/email/templates/JobOtreachTemplate";

export default function ConnectionDetailsSheet({ item, context, status }) {
	const { modalOpen, setModalOpen, update, updateConnectionFields } = context;
	const [isEditing, setIsEditing] = useState(false);
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
			if (!updateConnectionFields) {
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

			await updateConnectionFields(item.id, dataToUpdate);
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
									placeholder={item.name || "Connection Name"}
									className="text-lg font-semibold"
								/>
							) : (
								item.name
							)}
						</SheetTitle>
						<div style={{ display: "flex", gap: "8px" }}>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setIsEditing(!isEditing)}>
								<Pencil size={16} />
							</Button>
							<DeleteItemDialog id={item.id} type="connection" />
						</div>
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
								item.email
							)}
						</div>
					)}
					{(isEditing || item.linkedinUrl) && (
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
									onChange={(e) => handleInputChange("position", e.target.value)}
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

					<ItemStatusSelect id={item.id} status={status} update={update} />

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
				</SheetHeader>

				<JobOtreachTemplate contactName={item.name} companyName={companyName} />

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
