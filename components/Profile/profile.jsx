"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./profile.module.scss";

export default function Profile() {
	const { data: session } = useSession();
	const [testResults, setTestResults] = useState(null);
	const [loading, setLoading] = useState(false);

	console.log(session);

	const testRLS = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/test-rls");
			const data = await response.json();
			setTestResults(data);
		} catch (error) {
			setTestResults({ error: error.message });
		}
		setLoading(false);
	};

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
