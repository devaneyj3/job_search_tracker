import React from "react";
import { readableDate } from "../../lib/utils";
import styles from './EmailFlow.module.scss'

export default function EmailFlow({ email }) {
	return (
		<div className={styles.email}>
			<h3>Email #{email.sequence}</h3>
			<p>{readableDate(email.sentAt)}</p>
		</div>
	);
}
