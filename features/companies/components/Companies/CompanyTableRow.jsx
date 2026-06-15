"use client";

import styles from "@/styles/ItemList.module.scss";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { ItemCard, ItemCardField } from "@/features/shared/components/ItemCard";
import { readableDate } from "@/features/shared/lib/utils";
import { useCompany } from "../../context/companyContext";
import { companyStatus } from "@/Constants";

const CompanyTableRow = ({ item }) => {
	const { selectedCompany, setSelectedCompany, setModalOpen, updateCompany } =
		useCompany();
	const date = readableDate(item.createdAt);
	const isActive = item.id === selectedCompany?.id;
	const connectionCount = item.connections?.length ?? 0;

	const openSheet = () => {
		setSelectedCompany(item);
		setModalOpen(true);
	};

	return (
		<ItemCard
			isActive={isActive}
			onClick={openSheet}
			title={item.name || "N/A"}
			badge={
				<Badge className={styles.cardStatus}>
					{item.status} · {date}
				</Badge>
			}
			footer={
				<ItemStatusSelect
					id={item.id}
					update={updateCompany}
					status={companyStatus}
				/>
			}>
			<ItemCardField label="Industry">{item.industry || "N/A"}</ItemCardField>
			<ItemCardField label="Location">{item.location || "N/A"}</ItemCardField>
			<ItemCardField label="Size">{item.size || "N/A"}</ItemCardField>
			<ItemCardField label="Connections">
				{connectionCount > 0
					? `${connectionCount} connection(s)`
					: "No connections"}
			</ItemCardField>
		</ItemCard>
	);
};

export default CompanyTableRow;
