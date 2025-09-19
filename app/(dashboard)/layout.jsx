import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
	return (
		<>
			<Header />
			<Toaster />
			<main>{children}</main>
		</>
	);
}
