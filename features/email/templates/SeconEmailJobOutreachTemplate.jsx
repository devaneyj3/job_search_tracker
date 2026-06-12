import React from "react";
import styles from "@/styles/JobOutreachTemplate.module.scss";
import Link from "next/link";
import { readableDate } from "@/features/shared/lib/utils";

export default function SecondEmailJobOtreachTemplate({
	contactName,
	firstEmailDate,
	companyName,
}) {
	let firstName = contactName.split(" ")[0];
	return (
		<div className={styles.container}>
			<p className={styles.paragraph}>Hi {firstName},</p>
			<p>
				I wanted to follow up regarding my last email on {' '}
				{readableDate(firstEmailDate)}. I realize you are busy and appreciate
				you looking at my emails.
			</p>
			<p className={styles.paragraph}>
				In addition to the accomplishments highlighted in my previous email, I
				have taken the initiative to independently design, develop, and launch
				multiple revenue-generating websites for the company. These projects
				have directly supported business growth, demonstrating both technical
				expertise and a strong sense of ownership in delivering results that
				impact the bottom line.
			</p>
			<p className={styles.paragraph}>
				These websites have generated over $11,000 for a small business based
				out of Georgia for the past few months.
			</p>
			<p className={styles.paragraph}>
				If you think my background could be a fit for {companyName} now or down
				the road, I&#39;d love to grab ten minutes to introduce myself.
			</p>
			<p className={styles.signature}>Jordan Devaney</p>
			<p className={styles.signature}>
				<Link href="https://www.linkedin.com/in/jordandevaney/" target="_blank">
					LinkedIn
				</Link>
			</p>
		</div>
	);
}
