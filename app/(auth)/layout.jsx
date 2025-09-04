import { plex } from "@/lib/fonts";

export const metadata = {
	title: "Sign In | Job Tracker",
	description: "Track your jobs",
};
export default function AuthLayout({ children }) {
	return <div className={plex.className}>{children}</div>;
}
