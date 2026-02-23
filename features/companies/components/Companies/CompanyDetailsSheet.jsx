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
import { Building, Pencil, Globe, UserSearch } from "lucide-react";
import styles from "@/styles/ItemSheet.module.scss";
import { readableDate } from "@/features/shared/lib/utils";
import Link from "next/link";
import DeleteItemDialog from "@/features/shared/components/DeleteItemDialog";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { toast } from "sonner";
import CompanySheetTextDropdown from "./CompanySheetTextDropdown";


export default function CompanyDetailsSheet({ item, context, status }) {
	const { modalOpen, setModalOpen, update, updateCompanyFields } = context;
	const [isEditing, setIsEditing] = useState(false);


	//toggle text dropdown

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
		name: item.name || "",
		website: item.website || "",
		industry: item.industry || "",
		size: item.size || "",
		location: item.location || "",
		description: item.description || "",
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
			if (!updateCompanyFields) {
				toast.error("Update function not available");
				return;
			}

			const dataToUpdate = {
				name: formData.name,
				website: formData.website,
				industry: formData.industry,
				size: formData.size,
				location: formData.location,
				description: formData.description,
				linkedinUrl: formData.linkedinUrl,
				notes: formData.notes,
			};

			await updateCompanyFields(item.id, dataToUpdate);
			toast.success("Company updated successfully");
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating company:", error);
			toast.error("Failed to update. Please try again.");
		}
	};

	const handleCancel = () => {
		setFormData(getInitialFormData());
		setIsEditing(false);
	};

	const date = readableDate(item.createdAt);
	const LinkedInPeopleSearchURL = item.linkedinUrl
		? item.linkedinUrl.replace(/\/*\/?$/, "/people/?keywords=software")
		: "";
	const connections = item.connections ?? [];

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
							<DeleteItemDialog id={item.id} type="company" />
						</div>
					</div>
					{(isEditing || item.website) && (
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
					{(isEditing || item.linkedinUrl) && (
						<>
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
									<Link href={item.linkedinUrl} target="_blank">
										View LinkedIn
									</Link>
								) : null}
							</div>
							{item.linkedinUrl && !isEditing && (
								<div className={styles.itemPosting}>
									<UserSearch size={15} className={styles.icon} />
									<Link href={LinkedInPeopleSearchURL} target="_blank">
										Find People that work at {item.name}
									</Link>
								</div>
							)}
						</>
					)}
					{(isEditing || item.industry) && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.industry}
									onChange={(e) => handleInputChange("industry", e.target.value)}
									placeholder={item.industry || "Industry"}
								/>
							) : (
								item.industry
							)}
						</div>
					)}
					{(isEditing || item.size) && (
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
					{(isEditing || item.location) && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{isEditing ? (
								<Input
									value={formData.location}
									onChange={(e) => handleInputChange("location", e.target.value)}
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
								onChange={(e) => handleInputChange("description", e.target.value)}
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
							<CompanySheetTextDropdown item={item} label="Notes" field='notes' activeSection={activeSection}
								toggleSection={toggleSection} index={0} />
							<CompanySheetTextDropdown item={item} label="Description" field='description' activeSection={activeSection}
								toggleSection={toggleSection} index={1} />
						</>
					)}
				</SheetHeader>
				{connections.length > 0 ? (
					<div className={styles.contact}>
						<Label>Connections ({connections.length})</Label>
						<div>
							{connections.map((connection) => (
								<p key={connection.id}>
									{connection.name} - {connection.position}
								</p>
							))}
						</div>
					</div>
				) : <div className={styles.contact}>No Connections</div>}

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
