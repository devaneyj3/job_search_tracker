import React from "react";

import { Plus, ChartNoAxesCombined, LayoutDashboard } from "lucide-react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";

const items = [
	{ href: "/add-job", label: "Add Job", Icon: Plus },
	{ href: "/all-jobs", label: "All Jobs", Icon: ChartNoAxesCombined },
	{ href: "/stats", label: "Stats", Icon: LayoutDashboard },
];

const Sidebar = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<aside className={styles.sidebar}>
				<nav>
					<ul className={styles.list}>
						{items.map(({ href, label, Icon }) => (
							<Link key={href} href={href} className={styles.link}>
								<span className={styles.icon}>
									<Icon size={18} />
								</span>
								<span className={styles.label}>{label}</span>
							</Link>
						))}
					</ul>
				</nav>
			</aside>
			{children}
		</div>
	);
};

export default Sidebar;
