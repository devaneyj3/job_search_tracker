import React from "react";
import styles from "@/styles/SignInCard.module.scss";

import GoogleSignIn from "@/components/GoogleSignIn";

export default function SignInCard() {
	return (
		<div className={styles.card}>
			<div className={styles.card_header}>
				<h2 className={styles.title}>Sign In</h2>
				<p className={styles.description}>Sign in to your account</p>
			</div>
			<div className={styles.card_content}>
				<GoogleSignIn />
			</div>
		</div>
	);
}
