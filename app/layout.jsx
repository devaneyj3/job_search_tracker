import { plex } from "@/lib/fonts";
import "./tailwind.css";
import Providers from "@/components/Providers";

export const metadata = {
	title: "Job Tracker",
	description: "Track your jobs",
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
