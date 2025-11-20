"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";
import { JobItemProvider } from "@/context/jobContext";
import { ConnectionProvider } from "@/context/connectionContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<JobItemProvider>
					<ConnectionProvider>{children}</ConnectionProvider>
				</JobItemProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
