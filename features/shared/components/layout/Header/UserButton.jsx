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

const UserButton = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<Button variant="ghost" disabled>
				<UserIcon />
			</Button>
		);
	}

	if (!session) {
		return (
			<Button asChild variant="ghost">
				<Link href="/sign-in">
					<UserIcon />
					Sign In
				</Link>
			</Button>
		);
	}

	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<div className="flex gap-2 items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="relative h-8 w-8 rounded-full ml-2 flex items-center justify-center bg-gray-200">
						{firstInitial}
					</Button>
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
							Sign Out
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserButton;
