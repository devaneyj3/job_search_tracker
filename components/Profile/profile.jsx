"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./profile.module.scss";

export default function Profile() {
	const { data: session } = useSession();

	console.log(session);

	return (
		<div className={styles.container}>
			{session?.user?.image && (
				<Image
					src={session.user.image}
					className={styles.image}
					width={400}
					height={400}
					alt={session?.user?.name || "Profile image"}
				/>
			)}

			<div>
				<p>{session?.user?.name || "Not loaded"}</p>
				<p>{session?.user?.email || "Not loaded"}</p>
			</div>
		</div>
	);
}
