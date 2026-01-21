"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/features/shared/context/authContext";
import { ConnectionProvider } from "@/features/connections/context/connectionContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<ConnectionProvider>{children}</ConnectionProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
