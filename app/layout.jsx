import "./tailwind.css";
import Providers from "@/features/shared/components/Providers";
import { plex } from "@/lib/fonts";

export const metadata = {
	title: "Company Tracker",
	description: "Track companies you're interested in",
	icons: {
		icon: "/logo.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={plex.variable}>
			<Providers>
				<body
					className={plex.className}
					style={{ backgroundColor: "#f3efe8", margin: 0 }}>
					<main>{children}</main>
				</body>
			</Providers>
		</html>
	);
}
