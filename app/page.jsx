import Welcome from "@/components/Welcome/welcome";
import styles from "./page.module.scss";

export default function Home() {
	return (
		<div className={styles.container}>
			<Welcome />
		</div>
	);
}
