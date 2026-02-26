"use client";
import { memo } from "react";
import { Building, Link as LinkIcon } from "lucide-react";
import styles from "@/styles/ItemBox.module.scss";
import Link from "next/link";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
const ApplicationCard = memo(
	function ApplicationCard({ item, context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;
		const date = readableDate(item.createdAt);
		const displayName = item.company?.name || "Unknown Company";

		return (
			<div
				className={`${styles.item} ${item.id === selectedItem?.id && styles.active
					}`}
				onClick={() => {
					setSelectedItem(item);
					setModalOpen(true);
				}}>
				<div>
					<div>
						<Badge className={styles.status}>
							{item.status} on {date}
						</Badge>
					</div>
					<div className={styles.itemTitle}>{displayName}</div>
					{item.company?.name && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.company.name}
						</div>
					)}
					{item.position && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.position}
						</div>
					)}
					{item.jobType && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.jobType}
						</div>
					)}
					{item.location && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.location}
						</div>
					)}
					{item.applicationLink && (
						<div className={styles.company}>
							<LinkIcon size={15} className={styles.icon} />
							<Link href={item.applicationLink} target="_blank" onClick={(event) => event.stopPropagation()}>
								Application Link
							</Link>
						</div>
					)}
				</div>
				<ItemStatusSelect id={item.id} update={update} status={status} />
			</div>
		);
	},
	(prevProps, nextProps) =>
		prevProps.item.id === nextProps.item.id &&
		prevProps.item.status === nextProps.item.status &&
		prevProps.item.company?.name === nextProps.item.company?.name &&
		prevProps.item.position === nextProps.item.position &&
		prevProps.item.jobType === nextProps.item.jobType &&
		prevProps.item.location === nextProps.item.location &&
		prevProps.item.applicationLink === nextProps.item.applicationLink &&
		prevProps.context.selectedItem?.id === nextProps.context.selectedItem?.id &&
		prevProps.status === nextProps.status
);

export default ApplicationCard;
