import React from "react";
import styles from "@/styles/Welcome.module.scss";
import { AnimatedRotatingText } from "../AnimatedRotatingText";
import SignInCard from "./SignInCard";
import Image from "next/image";

const benefits = [
	"Track companies you're interested in",
	"Organize companies by status and industry",
	"Keep notes and details about each company",
	"Visualize your company research progress",
	"Manage your job search pipeline",
];

export default function Welcome() {
	return (
		<div className={styles.main}>
			<div className={styles.hero}>
				<h1 className={styles.title}>Welcome to David Roberts AI </h1>
				<p className={styles.tagline}>
					Track companies you're interested in
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
						alt="Company Tracker Illustration"
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
