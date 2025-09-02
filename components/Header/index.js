import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className="wrapper flex-between">
				<div className="flex-start">
					<Link href="/" className="flex-start"></Link>
				</div>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
