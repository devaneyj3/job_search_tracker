import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";

const Header = () => {
	return (
		<header className="w-full bg-gray-400">
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
