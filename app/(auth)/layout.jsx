import styles from "./layout.module.scss";
export const metadata = {
	title: "Sign In | Job Tracker",
	description: "Track your jobs",
};
export default function AuthLayout({ children }) {
	return <div>{children}</div>;
}
