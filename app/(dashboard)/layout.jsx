import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
	return (
		<>
			<Header />
			<Toaster />
			<main style={{ backgroundColor: "#f8fafc" }}>{children}</main>
		</>
	);
}
