"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/features/shared/context/authContext";
import { CompanyProvider } from "@/features/companies/context/companyContext";
import { ApplicationProvider } from "@/features/applications/context/applicationContext";
import { ConnectionProvider } from "@/features/connections/context/connectionContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<CompanyProvider>
					<ApplicationProvider>
						<ConnectionProvider>{children}</ConnectionProvider>
					</ApplicationProvider>
				</CompanyProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
