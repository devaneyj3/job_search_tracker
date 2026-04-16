"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/features/shared/lib/utils";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/features/shared/ui/sheet";
import UserButton from "./UserButton";
import styles from "@/styles/Header.module.scss";

const NAV_LINKS = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/companies", label: "Companies" },
	{ href: "/applications", label: "Applications" },
	{ href: "/connections", label: "Connections" },
];

export default function NavMenu() {
	const pathname = usePathname();

	return (
		<div className={styles.navEnd}>
			<nav className={styles.navDesktop} aria-label="Main navigation">
				{NAV_LINKS.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						className={cn(
							styles.navLink,
							pathname === href && styles.navLinkActive,
						)}>
						{label}
					</Link>
				))}
				<div className={styles.userCluster}>
					<UserButton />
				</div>
			</nav>

			<div className={styles.mobileOnly}>
				<Sheet>
					<SheetTrigger
						className={styles.menuTrigger}
						aria-label="Open menu">
						<Menu size={22} strokeWidth={2} />
					</SheetTrigger>
					<SheetContent side="right" className="flex flex-col">
						<SheetHeader className="text-left space-y-1">
							<SheetTitle className={styles.sheetTitle}>Navigate</SheetTitle>
						</SheetHeader>
						<nav className={styles.sheetNav} aria-label="Mobile navigation">
							{NAV_LINKS.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className={cn(
										styles.sheetLink,
										pathname === href && styles.sheetLinkActive,
									)}>
									{label}
								</Link>
							))}
						</nav>
						<div className={styles.sheetUser}>
							<UserButton />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
