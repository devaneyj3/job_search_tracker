import React, { useMemo } from "react";
import { useConnection } from "@/features/connections/context/connectionContext";
import { connectionStatus } from "@/Constants";
import AddConnectionButton from "./AddConnectionButton";
import styles from "@/styles/ItemList.module.scss";
import { Button } from "@/features/shared/ui/button";
import ConnectionCard from "./ConnectionCard";
import ConnectionDetailsSheet from "./ConnectionDetailsSheet";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/features/shared/ui/table";

export default function ConnectionsList({
	filteredConnections,
	statuses,
	setChosenStatus,
}) {
	const connectionContext = useConnection();

	const context = useMemo(
		() => ({
			selectedItem: connectionContext.selectedConnection,
			setSelectedItem: connectionContext.setSelectedConnection,
			setModalOpen: connectionContext.setModalOpen,
			items: connectionContext.connections,
			noItemMsg: connectionContext.noConnectionMsg,
			update: connectionContext.updateConnectionStatus,
			updateConnectionFields: connectionContext.updateConnectionFields,
			modalOpen: connectionContext.modalOpen,
		}),
		[
			connectionContext.selectedConnection,
			connectionContext.setSelectedConnection,
			connectionContext.setModalOpen,
			connectionContext.connections,
			connectionContext.noConnectionMsg,
			connectionContext.updateConnectionStatus,
			connectionContext.updateConnectionFields,
			connectionContext.modalOpen,
		],
	);

	const { selectedItem, items, noItemMsg } = context;

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>
				{filteredConnections.length} TOTAL CONNECTIONS
			</h1>
			{statuses && statuses.length > 0 && (
				<div className={styles.filter_container}>
					{statuses.map((status, index) => (
						<>
							<div key={index}>
								<Button
									onClick={() => setChosenStatus(status)}
									className={styles.filter_btn}
									variant="outline">
									{status}
								</Button>
							</div>
						</>
					))}
				</div>
			)}
			<section className={styles.btn_container}>
				<AddConnectionButton />
			</section>
			{!noItemMsg && items.length > 0 ? (
				<div className={styles.tableWrapper}>
					<Table className={styles.table}>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Company</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Update Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredConnections.map((item) => (
								<ConnectionCard
									key={item.id}
									item={item}
									context={context}
									status={connectionStatus}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div>{noItemMsg}</div>
			)}
			{selectedItem && (
				<ConnectionDetailsSheet
					item={selectedItem}
					context={context}
					status={connectionStatus}
				/>
			)}
		</main>
	);
}
