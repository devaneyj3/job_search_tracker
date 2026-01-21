"use client";
import { memo } from "react";
import { Building, Mail } from "lucide-react";
import styles from "@/styles/ItemBox.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "./ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";

const ItemCard = memo(
	function ItemCard({ item, type = "connection", context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;

		// Get date field for connection
		const date = readableDate(item.connectedDate);
		const initialContactDate = readableDate(item.firstEmailDate);

		// Get title
		const title = item.name;

		// Get contact email
		const contactEmail = item.email;

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
					<div className={styles.itemTitle}>{title}</div>
					{item.company && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.company}
						</div>
					)}
					<p id="contactEmail" className={styles.contactEmail}>
						<Mail size={15} className={styles.icon} />
						{contactEmail ? item.name : "No Contact Email"}
					</p>
				</div>
				{item.emailSent && (
					<div className={styles.contactBox}>
						<span>Email sent</span>
						<p>{item.firstEmailDate ? initialContactDate : "Not Set"}</p>
					</div>
				)}
				<ItemStatusSelect id={item.id} update={update} status={status} />
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison function for memo
		return (
			prevProps.item.id === nextProps.item.id &&
			prevProps.item.status === nextProps.item.status &&
			prevProps.item.name === nextProps.item.name &&
			prevProps.item.company === nextProps.item.company &&
			prevProps.item.email === nextProps.item.email &&
			prevProps.item.emailSent === nextProps.item.emailSent &&
			prevProps.context.selectedItem?.id === nextProps.context.selectedItem?.id &&
			prevProps.type === nextProps.type &&
			prevProps.status === nextProps.status
		);
	}
);

export default ItemCard;
