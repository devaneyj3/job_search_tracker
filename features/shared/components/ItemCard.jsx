import styles from "@/styles/ItemList.module.scss";

export function ItemCardField({ label, children, className = "" }) {
	return (
		<div className={`${styles.cardField} ${className}`}>
			<span className={styles.cardLabel}>{label}</span>
			<span className={styles.cardValue}>{children}</span>
		</div>
	);
}

export function ItemCard({
	isActive,
	onClick,
	title,
	badge,
	meta,
	children,
	footer,
}) {
	return (
		<article
			className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
			onClick={onClick}>
			<header className={styles.cardHeader}>
				<div className={styles.cardTitleGroup}>
					<h2 className={styles.cardTitle}>{title}</h2>
					{meta}
				</div>
				{badge}
			</header>
			<div className={styles.cardBody}>{children}</div>
			{footer && (
				<footer
					className={styles.cardFooter}
					onClick={(event) => event.stopPropagation()}>
					{footer}
				</footer>
			)}
		</article>
	);
}
