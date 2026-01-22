"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/features/shared/context/authContext";
import { CompanyProvider } from "@/features/companies/context/companyContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<AuthProvider>
				<CompanyProvider>{children}</CompanyProvider>
			</AuthProvider>
		</SessionProvider>
	);
}
