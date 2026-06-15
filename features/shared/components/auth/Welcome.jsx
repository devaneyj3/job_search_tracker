import React from "react";
import styles from "@/styles/Welcome.module.scss";
import SignInCard from "./SignInCard";

const highlights = [
	"Companies & pipeline",
	"Applications & status",
	"Connections & notes",
];

export default function Welcome() {
	return (
		<div className={styles.main}>
			<header className={styles.hero}>
				<p className={styles.eyebrow}>
					<span className={styles.eyebrowDot} aria-hidden />
					Job search workspace
				</p>
				<h1 className={styles.title}>
					<span className={styles.titleAccent}>Everything you’re tracking,</span>
					<br />
					in one place.
				</h1>
				<p className={styles.tagline}>
					Organize companies, applications, and people you reach out to—so you
					spend less time juggling spreadsheets and more time landing the role.
				</p>
				<ul className={styles.featureList} aria-label="What this app helps you do">
					{highlights.map((label) => (
						<li key={label}>{label}</li>
					))}
				</ul>
			</header>

			<section className={styles.signInSection} aria-label="Sign in">
				<SignInCard />
			</section>
		</div>
	);
}
