import Link from "next/link";
import styles from "./page.module.scss";

const messages = {
	Configuration: "Server auth is misconfigured. Check AUTH_SECRET and AUTH_URL.",
	AccessDenied: "Access was denied. Your account may not be allowed to sign in.",
	Verification: "The sign-in link expired or was already used.",
	OAuthSignin: "Could not start Google sign-in. Try again in your browser.",
	OAuthCallback:
		"Sign-in could not finish. Clear site cookies and try again in Safari or Chrome (not an in-app browser).",
	OAuthAccountNotLinked:
		"This email is linked to another sign-in method. Use the same provider you signed up with.",
	Default:
		"Something went wrong during sign-in. Clear cookies for this site and try again.",
};

export default async function AuthErrorPage({ searchParams }) {
	const error = (await searchParams)?.error ?? "Default";
	const message = messages[error] ?? messages.Default;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Sign-in problem</h1>
			<p className={styles.message}>{message}</p>
			<p className={styles.hint}>
				On mobile, open this site in Safari or Chrome instead of an in-app
				browser, then try again.
			</p>
			<Link href="/" className={styles.link}>
				Back to sign in
			</Link>
		</div>
	);
}
