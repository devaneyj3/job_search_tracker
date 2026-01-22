import React from "react";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import "./GoogleSignIn.css";
import GoogleButtonText from "./GoogleButton";

// taken from https://developers.google.com/identity/branding-guidelines

export default async function GoogleSignIn() {
	// Check if signIn is available
	if (!signIn || typeof signIn !== "function") {
		console.error("signIn is not available:", typeof signIn);
		return (
			<div style={{ padding: "20px", color: "red" }}>
				Authentication is not available. Please check your configuration.
			</div>
		);
	}

	// Ensure GoogleButtonText is available
	if (!GoogleButtonText) {
		console.error("GoogleButtonText is not available");
		return (
			<div style={{ padding: "20px", color: "red" }}>
				Sign in button component is not available.
			</div>
		);
	}

	return (
		<form
			action={async () => {
				"use server";
				try {
					await signIn("google", {
						redirectTo: "/companies",
					});
				} catch (error) {
					if (error instanceof AuthError) {
						return redirect(`/error?error=${error.type}`);
					}
					throw error;
				}
			}}>
			<button className="gsi-material-button" type="submit">
				<div className="gsi-material-button-state"></div>
				<div className="gsi-material-button-content-wrapper">
					<div className="gsi-material-button-icon">
						<svg
							viewBox="0 0 48 48"
							style={{ display: "block" }}
							aria-hidden="true"
							focusable="false">
							<path
								fill="#EA4335"
								d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
							/>
							<path
								fill="#4285F4"
								d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
							/>
							<path
								fill="#FBBC05"
								d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
							/>
							<path
								fill="#34A853"
								d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
							/>
							<path fill="none" d="M0 0h48v48H0z" />
						</svg>
					</div>
					<GoogleButtonText />
				</div>
			</button>
		</form>
	);
}
