import { RotatingText } from "@/components/animate-ui/text/rotating";
import styles from "@/styles/RotatingText.module.scss";
import { Separator } from "@/components/ui/separator";

export const Rotating = ({ text }) => {
	return (
		<div className={styles.container}>
			<RotatingText className={styles.text} text={text} />
			<Separator className={styles.seperator} />
		</div>
	);
};
