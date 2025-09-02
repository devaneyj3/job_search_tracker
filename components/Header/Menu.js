import { Button } from "../ui/button";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import UserButton from "./user-button";

const Menu = () => {
	return (
		<div className="flex justify-end gap-3">
			<nav className="md:flex hidden w-full max-w-xs gap-1">
				<Button asChild variant="ghost">
					<Link href="/">Home</Link>
				</Button>
				<UserButton />
			</nav>
			<nav className="md:hidden">
				<Sheet>
					<SheetTrigger className="align-middle">
						<EllipsisVertical />
					</SheetTrigger>
					<SheetContent className="flex flex-col items-start">
						<SheetTitle>Menu</SheetTitle>
						<Button asChild variant="ghost">
							<Link href="/">Home</Link>
						</Button>
						<UserButton />
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	);
};

export default Menu;
