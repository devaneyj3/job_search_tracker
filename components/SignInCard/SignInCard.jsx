import React from "react";
import styles from "./SignInCard.module.scss";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import GoogleSignIn from "@/components/SignInCard/GoggleSignIn/GoogleSignIn";

export default function SignInCard({ callbackUrl }) {
	return (
		<div className={styles.card}>
			<div className={styles.card_header}>
				<h2 className={styles.title}>Sign In</h2>
				<p className={styles.description}>Sign in to your account</p>
			</div>
			<div className={styles.card_content}>
				<form
					action={async () => {
						"use server";
						try {
							await signIn("google", {
								redirectTo: callbackUrl ?? "/profile",
							});
						} catch (error) {
							if (error instanceof AuthError) {
								return redirect(`/error?error=${error.type}`);
							}
							throw error;
						}
					}}>
					<GoogleSignIn />
				</form>
			</div>
		</div>
	);
}
