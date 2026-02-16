"use client";
import { memo } from "react";
import { Building, Mail, Briefcase } from "lucide-react";
import styles from "@/styles/ItemBox.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";

const ConnectionCard = memo(
	function ConnectionCard({ item, context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;
		const date = readableDate(item.createdAt);

		return (
			<div
				className={`${styles.item} ${
					item.id === selectedItem?.id && styles.active
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
					<div className={styles.itemTitle}>{item.name}</div>
					{item.company && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.company}
						</div>
					)}
					{item.position && (
						<div className={styles.company}>
							<Briefcase size={15} className={styles.icon} />
							{item.position}
						</div>
					)}
					{item.email && (
						<div className={styles.company}>
							<Mail size={15} className={styles.icon} />
							{item.email}
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
		prevProps.item.name === nextProps.item.name &&
		prevProps.item.company === nextProps.item.company &&
		prevProps.item.position === nextProps.item.position &&
		prevProps.item.email === nextProps.item.email &&
		prevProps.context.selectedItem?.id === nextProps.context.selectedItem?.id &&
		prevProps.status === nextProps.status
);

export default ConnectionCard;
