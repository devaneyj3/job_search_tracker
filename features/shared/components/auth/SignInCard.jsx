import React from "react";
import styles from "@/styles/SignInCard.module.scss";
import { Check } from "lucide-react";

import GoogleSignIn from "@/features/shared/components/auth/GoogleSignIn";

const perks = [
	"Private to your account",
	"Continue where you left off",
	"No extra passwords to remember",
];

export default function SignInCard() {
	return (
		<div className={styles.card}>
			<div className={styles.card_header}>
				<h2 className={styles.title}>Sign in to continue</h2>
				<p className={styles.description}>
					Use Google to access your tracker. We only keep the data you save
					here.
				</p>
			</div>
			<ul className={styles.bullets} aria-label="Sign-in benefits">
				{perks.map((text) => (
					<li key={text}>
						<Check className={styles.bulletIcon} size={16} strokeWidth={2.5} aria-hidden />
						<span>{text}</span>
					</li>
				))}
			</ul>
			<div className={styles.card_content}>
				<div className={styles.oauthWrap}>
					<GoogleSignIn />
				</div>
				<p className={styles.footerNote}>
					Secured with Google. You can revoke access from your Google account
					anytime.
				</p>
			</div>
		</div>
	);
}
