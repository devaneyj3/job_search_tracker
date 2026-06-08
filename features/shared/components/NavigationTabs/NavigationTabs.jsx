"use client";
import styles from "@/styles/NavigationTabs.module.scss";

export function NavigationTabs({ selectedTab, setSelectedTab }) {
	const tabs = [
		{
			title: "Initial",
		},
		{
			title: "Follow-Up",
		},
		{
			title: "Third",
		},
	];
	return (
		<div className={styles.navigation_container}>
			{tabs.map((tab, index) => {
				return (
					<div
						key={tab.title}
						className={`${styles.navigationTabItem} ${tabs[index].title === selectedTab && styles.active}`}
						onClick={() => setSelectedTab(tab.title)}>
						{tab.title} Email
					</div>
				);
			})}
		</div>
	);
}
