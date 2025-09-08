"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";
import { JobItemProvider } from "@/context/jobContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<JobItemProvider>{children}</JobItemProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
