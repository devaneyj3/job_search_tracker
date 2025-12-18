import Welcome from "@/features/shared/components/auth/Welcome";
import styles from "./page.module.scss";

export default function Home() {
	return (
		<div className={styles.container}>
			<Welcome />
		</div>
	);
}
