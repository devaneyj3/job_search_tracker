import Header from "@/components/Header";

export default function DashboardLayout({ children }) {
	return (
		<>
			<Header />
			<main style={{ backgroundColor: "#f8fafc" }}>{children}</main>
		</>
	);
}
