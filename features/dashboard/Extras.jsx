// File: components/followup/sections/Extras.jsx
import React from "react";
import styles from "@/styles/Extras.module.scss";

export default function Extras({ items = [], showTitle = true }) {
	return (
		<section className={styles.block}>
			{showTitle ? <h2 className={styles.h2}>Extra reading</h2> : null}
			<ul className={styles.ul}>
				{items.map((e, i) => (
					<li key={i}>
						{e.text}{" "}
						<a href={e.href} target="_blank" rel="noreferrer noopener">
							{e.source}
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
