import "./tailwind.css";
import Providers from "@/features/shared/components/Providers";

export const metadata = {
	title: "Company Tracker",
	description: "Track companies you're interested in",
	icons: {
		icon: "/logo.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Providers>
				<body style={{ backgroundColor: "#f8fafc" }}>
					<main>{children}</main>
				</body>
			</Providers>
		</html>
	);
}
