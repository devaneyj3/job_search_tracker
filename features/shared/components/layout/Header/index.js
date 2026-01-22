import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import styles from "@/styles/Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className="wrapper flex-between">
				<div className="flex-start">
					<Link href="/conpanies" className="flex-start">
						<Image
							src="/images/logo.png"
							width={100}
							height={100}
							alt="logo"
							priority
							className={styles.image}
						/>
					</Link>
				</div>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
