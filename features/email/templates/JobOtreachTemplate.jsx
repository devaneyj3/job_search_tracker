import initialEmail from "@/features/email/lib/initialEmail";
import styles from "@/styles/JobOutreachTemplate.module.scss";

export default function JobOtreachTemplate({
	contactName,
	companyName,
	appliedPosition,
	companyMission,
}) {
	const firstName = contactName?.trim().split(/\s+/)[0] || "there";
	const company = companyName?.trim() || "your company";
	const { subject, body } = initialEmail(company, firstName, appliedPosition, companyMission);

	return (
		<div className={styles.container}>
			<p className={styles.subject}>
				<strong>Subject:</strong> {subject}
			</p>
			<div className={styles.body}>{body}</div>
		</div>
	);
}
