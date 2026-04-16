"use client";

import React from "react";
import { Button } from "@/features/shared/ui/button";
import { UserIcon, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
} from "@/features/shared/ui/dropdown-menu";
import styles from "@/styles/Header.module.scss";

const UserButton = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div
				className={`${styles.avatar} animate-pulse opacity-70`}
				aria-hidden
			/>
		);
	}

	if (!session) {
		return (
			<Link href="/" className={styles.signInLink}>
				<UserIcon size={18} strokeWidth={2} aria-hidden />
				Sign in
			</Link>
		);
	}

	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "?";

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={styles.avatar}
					aria-label={`Account menu for ${session.user?.name ?? "user"}`}>
					{firstInitial}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<div className="text-sm font-medium leading-none">
							{session.user?.name}
						</div>
						<div className="text-sm text-muted-foreground leading-none">
							{session.user?.email}
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuItem className="p-0 mb-1">
					<Button
						className="w-full py-4 px-2 h-2 justify-start"
						variant="ghost"
						asChild>
						<Link href="/profile">
							<UserIcon />
							Profile
						</Link>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0 mb-1">
					<Button
						className="w-full py-4 px-2 h-2 justify-start"
						variant="ghost"
						onClick={handleSignOut}>
						<LogOut />
						Sign out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
