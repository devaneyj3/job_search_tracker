"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/features/shared/context/authContext";
import { ApplicationProvider } from "@/features/applications/context/applicationContext";
import { ConnectionProvider } from "@/features/connections/context/connectionContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<ApplicationProvider>
					<ConnectionProvider>{children}</ConnectionProvider>
				</ApplicationProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
