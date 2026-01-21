import React, { memo } from "react";
import styles from "@/styles/ItemList.module.scss";
import ItemCard from "./ItemCard";
import AddConnectionButton from "@/features/connections/components/Outreach/AddConnectionButton";
import ItemDetailsSheet from "./ItemDetailsSheet";
import { Button } from "@/features/shared/ui/button";

const ItemsListView = memo(function ItemsListView({
	filteredItems,
	statuses,
	setChosenStatus,
	type = "connection",
	context,
	title,
	status,
}) {
	const { selectedItem, items, noItemMsg, update } = context;
	const displayTitle = title || "TOTAL CONNECTIONS";
	return (
		<main className={styles.container}>
			<section className={styles.btn_container}>
				<AddConnectionButton />
			</section>
			<h1 className={styles.title}>
				{filteredItems.length} {displayTitle}
			</h1>
			{statuses && statuses.length > 0 && (
				<div className={styles.filter_container}>
					{statuses.map((status) => (
						<div key={status}>
							<Button
								onClick={() => setChosenStatus(status)}
								className={styles.filter_btn}
								variant="outline">
								{status}
							</Button>
						</div>
					))}
				</div>
			)}
			{!noItemMsg && items.length > 0 ? (
				filteredItems.map((item) => {
					return (
						<ItemCard
							key={item.id}
							item={item}
							type={type}
							context={context}
							status={status}
							update={update}
						/>
					);
				})
			) : (
				<div>{noItemMsg}</div>
			)}
			{selectedItem && (
				<ItemDetailsSheet
					item={selectedItem}
					type={type}
					context={context}
					status={status}
					update={update}
				/>
			)}
		</main>
	);
});

export default ItemsListView;
