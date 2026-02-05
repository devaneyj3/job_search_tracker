"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/features/shared/context/authContext";
import { CompanyProvider } from "@/features/companies/context/companyContext";
import { ConnectionProvider } from "@/features/connections/context/connectionContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<CompanyProvider>
					<ConnectionProvider>{children}</ConnectionProvider>
				</CompanyProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
