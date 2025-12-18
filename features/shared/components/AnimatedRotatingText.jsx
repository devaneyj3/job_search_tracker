import { RotatingText } from "@/features/shared/components/animate-ui/text/rotating";
import styles from "@/styles/RotatingText.module.scss";
import { Separator } from "@/features/shared/ui/separator";

export const AnimatedRotatingText = ({ text }) => {
	return (
		<div className={styles.container}>
			<RotatingText className={styles.text} text={text} />
			<Separator className={styles.seperator} />
		</div>
	);
};
