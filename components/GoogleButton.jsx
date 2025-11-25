"use client";
import { useFormStatus } from "react-dom";

export default function GoogleButtonText() {
	const { pending } = useFormStatus();
	return (
		<span className="gsi-material-button-contents">
			{pending ? "Loading…" : "Sign in with Google"}
		</span>
	);
}
