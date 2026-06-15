import React from "react";
import { useConnection } from "@/features/connections/context/connectionContext";
import AddConnectionButton from "./AddConnectionButton";
import styles from "@/styles/ItemList.module.scss";
import ConnectionTableRow from "./ConnectionTableRow";
import ConnectionDetailsSheet from "./ConnectionDetailsSheet";

export default function ConnectionsList({ filteredConnections }) {
	const { selectedConnection, connections, noConnectionMsg } = useConnection();

	return (
		<main className={styles.container}>
			<div className={styles.row}>
				<h1 className={styles.title}>
					{filteredConnections.length} TOTAL CONNECTIONS
				</h1>
				<AddConnectionButton />
			</div>
			{!noConnectionMsg && connections.length > 0 ? (
				<div className={styles.cardGrid}>
					{filteredConnections.map((connection) => (
						<ConnectionTableRow
							key={connection.id}
							connection={connection}
						/>
					))}
				</div>
			) : (
				<p className={styles.emptyMessage}>{noConnectionMsg}</p>
			)}
			{selectedConnection && (
				<ConnectionDetailsSheet item={selectedConnection} />
			)}
		</main>
	);
}
