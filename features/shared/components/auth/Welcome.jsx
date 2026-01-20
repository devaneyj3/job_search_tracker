import React from "react";
import styles from "@/styles/Welcome.module.scss";
import { AnimatedRotatingText } from "../AnimatedRotatingText";
import SignInCard from "./SignInCard";
import Image from "next/image";

const benefits = [
	"Automate calendar events for follow-up emails",
	"Get email templates for your follow-up emails",
	"Track applications, interviews, and offers in one place",
	"Visualize your job search progress with insightful stats",
	"Gain insights to optimize your job search strategy",
];

export default function Welcome() {
	return (
		<div className={styles.main}>
			<div className={styles.hero}>
				<h1 className={styles.title}>Welcome to David Roberts AI </h1>
				<p className={styles.tagline}>
					If you don't listen to me your an asshole
				</p>
				<div className={styles.benefitsContainer}>
					<AnimatedRotatingText text={benefits} />
				</div>
			</div>

			<div className={styles.content}>
				<div className={styles.imageSection}>
					<Image
						src="/images/sign-in.png"
						width={500}
						height={500}
						alt="Job Tracker Illustration"
						className={styles.image}
						priority
					/>
				</div>
				<div className={styles.signInSection}>
					<SignInCard />
				</div>
			</div>
		</div>
	);
}
