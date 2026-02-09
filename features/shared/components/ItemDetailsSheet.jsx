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
	Building,
	Linkedin,
	Pencil,
	Globe,
	UserSearch,
	Mail,
	Briefcase,
} from "lucide-react";
import styles from "@/styles/ItemSheet.module.scss";
import { readableDate } from "@/features/shared/lib/utils";
import Link from "next/link";
import DeleteItemDialog from "./DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "./ItemStatusSelect";
import { toast } from "sonner";
import JobOtreachTemplate from "@/features/email/templates/JobOtreachTemplate";

export default function ItemDetailsSheet({
	item,
	type = "company",
	context,
	status,
}) {
	const {
		modalOpen,
		setModalOpen,
		update,
		updateCompanyFields,
		updateConnectionFields,
	} = context;
	const [isEditing, setIsEditing] = useState(false);
	const isConnection = type === "connection";
	const isCompany = type === "company";

	const getInitialFormData = () => {
		if (isConnection) {
			return {
				name: item.name || "",
				email: item.email || "",
				company: item.company || "",
				position: item.position || "",
				linkedinUrl: item.linkedinUrl || "",
				notes: item.notes || "",
			};
		}
		return {
			name: item.name || "",
			website: item.website || "",
			industry: item.industry || "",
			size: item.size || "",
			location: item.location || "",
			description: item.description || "",
			linkedinUrl: item.linkedinUrl || "",
			notes: item.notes || "",
		};
	};

	// Form state for editing
	const [formData, setFormData] = useState(getInitialFormData());

	// Update form data when item changes
	useEffect(() => {
		setFormData(getInitialFormData());
	}, [item, type]);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			const updateFields = isConnection
				? updateConnectionFields
				: updateCompanyFields;

			if (!updateFields) {
				toast.error("Update function not available");
				return;
			}

			const id = item.id;

			const dataToUpdate = isConnection
				? {
						name: formData.name,
						email: formData.email,
						company: formData.company,
						position: formData.position,
						linkedinUrl: formData.linkedinUrl,
						notes: formData.notes,
					}
				: {
						name: formData.name,
						website: formData.website,
						industry: formData.industry,
						size: formData.size,
						location: formData.location,
						description: formData.description,
						linkedinUrl: formData.linkedinUrl,
						notes: formData.notes,
					};

			await updateFields(id, dataToUpdate);
			toast.success(
				isConnection ? "Connection updated successfully" : "Company updated successfully"
			);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating:", error);
			toast.error("Failed to update. Please try again.");
		}
	};

	const handleCancel = () => {
		// Reset form data to original item values
		setFormData(getInitialFormData());
		setIsEditing(false);
	};

	// Get dates for company
	const date = readableDate(item.createdAt);

	// Get title and description
	const title = item.name;
	const description = item.description;
	const notes = item.notes;

	// Remove trailing slashes and add people search for company pages
	const LinkedInPeopleSearchURL =
		isCompany && item.linkedinUrl
			? item.linkedinUrl.replace(/\/*\/?$/, "/people/?keywords=software")
			: "";
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
									placeholder={item.name || "Company Name"}
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
					{isCompany && (isEditing || item.website) && (
						<div className={styles.itemPosting}>
							<Globe size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.website}
									onChange={(e) => handleInputChange("website", e.target.value)}
									placeholder={item.website || "Website"}
									type="url"
								/>
							) : item.website ? (
								<Link href={item.website} target="_blank">
									Visit Website
								</Link>
							) : null}
						</div>
					)}
					{isConnection && (isEditing || item.email) && (
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
					{(isCompany || isConnection) && (isEditing || item.linkedinUrl) && (
						<>
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
							{isCompany && item.linkedinUrl && !isEditing && (
								<div className={styles.itemPosting}>
									<UserSearch size={15} className={styles.icon} />
									<Link href={LinkedInPeopleSearchURL} target="_blank">
										Find People that work at {item.name}
									</Link>
								</div>
							)}
						</>
					)}
					{isCompany && (isEditing || item.industry) && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.industry}
									onChange={(e) =>
										handleInputChange("industry", e.target.value)
									}
									placeholder={item.industry || "Industry"}
								/>
							) : (
								item.industry
							)}
						</div>
					)}
					{isCompany && (isEditing || item.size) && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.size}
									onChange={(e) => handleInputChange("size", e.target.value)}
									placeholder={item.size || "Company Size"}
								/>
							) : (
								item.size
							)}
						</div>
					)}
					{item.location && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
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
					<div className={styles.badge}>
						<Badge className={styles.status}>
							{item.status} on {date}
						</Badge>
					</div>

					<ItemStatusSelect id={item.id} status={status} update={update} />

					{isEditing ? (
						<div className={styles.contact}>
							<Label htmlFor="description">Description: </Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) =>
									handleInputChange("description", e.target.value)
								}
								placeholder={item.description || "Description"}
								rows={6}
							/>
							<div className={styles.contact} style={{ marginTop: "1rem" }}>
								<Label htmlFor="notes">Notes: </Label>
								<Textarea
									id="notes"
									value={formData.notes}
									onChange={(e) => handleInputChange("notes", e.target.value)}
									placeholder={item.notes || "Notes"}
									rows={3}
								/>
							</div>
						</div>
					) : (
						<>
							{notes && (
								<SheetDescription className={styles.itemDescription}>
									<strong>Notes:</strong> {notes}
								</SheetDescription>
							)}
							{description && (
								<SheetDescription className={styles.itemDescription}>
									{description}
								</SheetDescription>
							)}
						</>
					)}
				</SheetHeader>
				{isConnection && <JobOtreachTemplate contactName={item.name} companyName={item.company} />}

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
