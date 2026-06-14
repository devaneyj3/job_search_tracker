import { buildOutreachEmailPreview } from "@/features/email/lib/outreachEmail";
import styles from "@/styles/JobOutreachTemplate.module.scss";

const ThirdEmailJobOutreachTemplate = ({ item, companyName, contactName }) => {
	const { subject, body } = buildOutreachEmailPreview({
		contactName: contactName ?? item?.name,
		companyName,
		template: "Third",
	});

	return (
		<div className={styles.container}>
			<p className={styles.subject}>
				<strong>Subject:</strong> {subject}
			</p>
			<div className={styles.body}>{body}</div>
		</div>
	);
};

export default ThirdEmailJobOutreachTemplate;
