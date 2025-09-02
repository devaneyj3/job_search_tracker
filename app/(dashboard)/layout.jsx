import Header from "@/components/Header";

import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardLayout({ children }) {
	return (
		<>
			<Header />
			<Sidebar>
				<main>{children}</main>
			</Sidebar>
		</>
	);
}
