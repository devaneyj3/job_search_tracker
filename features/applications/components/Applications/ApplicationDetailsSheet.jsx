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
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/features/shared/ui/sheet";
import { Building, Link as LinkIcon, Pencil } from "lucide-react";
import styles from "@/styles/ItemSheet.module.scss";
import { readableDate } from "@/features/shared/lib/utils";
import DeleteItemDialog from "@/features/shared/components/DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { toast } from "sonner";
import ApplicationSheetTextDropdown from "./ApplicationSheetTextDropdown";
import Link from "next/link";
export default function ApplicationDetailsSheet({ item, context, status }) {
	const { modalOpen, setModalOpen, update, updateApplicationFields } = context;
	const [isEditing, setIsEditing] = useState(false);

	const [activeSection, setActiveSection] = useState(null);

	const toggleSection = (section) => {
		setActiveSection(activeSection === section ? null : section);
	};

	useEffect(() => {
		const hash = window.location.hash.substring(1);
		if (hash) {
			setActiveSection(hash);
		}
	}, []);
	
	const getInitialFormData = () => ({
		applicationLink: item.applicationLink || "",
		position: item.position || "",
		jobDescription: item.jobDescription || "",
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
			if (!updateApplicationFields) {
				toast.error("Update function not available");
				return;
			}
			if (!formData.applicationLink?.trim()) {
				toast.error("Application link is required");
				return;
			}
			if (!formData.position?.trim()) {
				toast.error("Position is required");
				return;
			}
			if (!formData.jobDescription?.trim()) {
				toast.error("Job description is required");
				return;
			}

			const dataToUpdate = {
				applicationLink: formData.applicationLink.trim(),
				position: formData.position.trim(),
				jobDescription: formData.jobDescription.trim(),
				notes: formData.notes,
			};

			await updateApplicationFields(item.id, dataToUpdate);
			toast.success("Application updated successfully");
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating application:", error);
			toast.error("Failed to update. Please try again.");
		}
	};

	const handleCancel = () => {
		setFormData(getInitialFormData());
		setIsEditing(false);
	};

	const date = readableDate(item.createdAt);
	const displayName = item.company?.name || "Unknown Company";
	return (
		<Sheet open={modalOpen} onOpenChange={setModalOpen}>
			<SheetContent className="w-full overflow-y-scroll max-h-screen bg-white max-w-[1000px]">
				<SheetHeader>
					<div className={styles.itemTitleContainer}>
						<SheetTitle className={styles.itemTitle}>{displayName}</SheetTitle>
						<div style={{ display: "flex", gap: "8px" }}>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setIsEditing(!isEditing)}>
								<Pencil size={16} />
							</Button>
							<DeleteItemDialog id={item.id} type="application" />
						</div>
					</div>
					{item.company?.name && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.company.name}
						</div>
					)}
					{(isEditing || item.applicationLink) && (
						<div className={styles.company}>
							<LinkIcon size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.applicationLink}
									onChange={(e) =>
										handleInputChange("applicationLink", e.target.value)
									}
									placeholder={item.applicationLink || "Application Link"}
								/>
							) : (
								<Link href={item.applicationLink} target="_blank">
									Application Link
								</Link>
							)}
						</div>
					)}
					{(isEditing || item.position) && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
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
							<Label htmlFor="jobDescription">Job Description: </Label>
							<Textarea
								id="jobDescription"
								value={formData.jobDescription}
								onChange={(e) =>
									handleInputChange("jobDescription", e.target.value)
								}
								placeholder={item.jobDescription || "Job Description"}
								rows={6}
							/>
							<Label htmlFor="notes">Notes: </Label>
							<Textarea
								id="notes"
								value={formData.notes}
								onChange={(e) => handleInputChange("notes", e.target.value)}
								placeholder={item.notes || "Notes"}
								rows={3}
							/>
						</div>
					) : (
						<>
							<ApplicationSheetTextDropdown
								item={item}
								label="Job Description"
								field="jobDescription"
								activeSection={activeSection}
								toggleSection={toggleSection}
								index={0}
							/>
							<ApplicationSheetTextDropdown item={item} label="Notes" field='notes' activeSection={activeSection}
								toggleSection={toggleSection} index={1} />
						</>
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
						<SheetClose asChild>
							<Button variant="outline">Close</Button>
						</SheetClose>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
