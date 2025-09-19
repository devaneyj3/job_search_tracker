import React from "react";
import styles from "./welcome.module.scss";
import { Rotating } from "../Animations/RotatingText/RotatingText";
import SignInCard from "../SignInCard/SignInCard";
import Image from "next/image";

const benefits = [
	"Automate calendar events for follow up emails",
	"Get email templates for your follow up emails",
	"Track applications, interviews, and offers in one place",
	"Visualize your job search progress with insightful stats",
	"Gain insights to optimize your job search strategy",
];
export default function Welcome() {
	return (
		<div className={styles.main}>
			<h1 className={styles.title}>Welcome to Tech Apply </h1>
			<p className={styles.tagline}>Your job hunt, organized and stress free</p>
			<div className={styles.jobBox}>
				<ul className="benefits">
					<Rotating text={benefits} />
				</ul>
			</div>
			<div className={styles.sign_in}>
				<div className={styles.info}>
					<Image
						src="/images/sign-in.png"
						width={500}
						height={500}
						alt="Sign In Logo"
					/>
				</div>
				<div className={styles.sign_in_card}>
					<SignInCard />
				</div>
			</div>
		</div>
	);
}
