import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import styles from "@/styles/Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={`wrapper flex-between ${styles.inner}`}>
				<Link href="/dashboard" className={styles.brand}>
					<Image
						src="/images/logo.png"
						width={160}
						height={48}
						alt="Job Tracker"
						priority
						className={styles.logo}
					/>
					<span className={styles.brandText}>Job Tracker</span>
				</Link>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
