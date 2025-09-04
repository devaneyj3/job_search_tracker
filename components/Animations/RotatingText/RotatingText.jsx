import { RotatingText } from "@/components/animate-ui/text/rotating";
import styles from "./text.module.scss";

export const Rotating = ({ text }) => {
	return <RotatingText className={styles.text} text={text} />;
};
