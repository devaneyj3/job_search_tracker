import React from "react";
import styles from "@/styles/ItemList.module.scss";
import ItemBox from "./ItemBox";
import CreateApplicationButton from "@/components/Header/CreateApplicationButton";
import CreateConnectionButton from "@/components/Outreach/CreateConnectionButton";
import ItemSheet from "./ItemSheet";
import { Button } from "@/components/ui/button";

export default function ItemList({
	filteredItems,
	statuses,
	setChosenStatus,
	type = "job",
	context,
	title,
}) {
	const { selectedItem, items, noItemMsg } = context;
	const displayTitle =
		title || (type === "job" ? "TOTAL JOBS" : "TOTAL CONNECTIONS");

	return (
		<main className={styles.container}>
			<section className={styles.btn_container}>
				{type === "job" ? (
					<CreateApplicationButton />
				) : (
					<CreateConnectionButton />
				)}
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
				filteredItems.map((item, index) => {
					return (
						<ItemBox key={index} item={item} type={type} context={context} />
					);
				})
			) : (
				<div>{noItemMsg}</div>
			)}
			{selectedItem && (
				<ItemSheet item={selectedItem} type={type} context={context} />
			)}
		</main>
	);
}
