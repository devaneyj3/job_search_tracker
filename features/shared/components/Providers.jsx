"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/features/shared/context/authContext";
import { JobItemProvider } from "@/features/jobs/context/jobContext";
import { ConnectionProvider } from "@/features/connections/context/connectionContext";

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
