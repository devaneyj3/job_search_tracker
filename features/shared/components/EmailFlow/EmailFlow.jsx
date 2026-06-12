import React from "react";
import { readableDate } from "../../lib/utils";
import styles from './EmailFlow.module.scss'
import { EMAIL_LABELS } from "@/lib/emailLabels";

export default function EmailFlow({ email }) {
	return (
		<div className={styles.email}>
			<h3>{EMAIL_LABELS[email.sequence -1]} Email</h3>
			<p>{readableDate(email.sentAt)}</p>
		</div>
	);
}
