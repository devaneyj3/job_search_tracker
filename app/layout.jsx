import "./tailwind.css";
import Providers from "@/components/Providers";

export const metadata = {
	title: "Job Tracker",
	description: "Track your jobs",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Providers>
				<body>
					<main>{children}</main>
				</body>
			</Providers>
		</html>
	);
}
