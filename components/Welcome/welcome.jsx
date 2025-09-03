import React from "react";
import styles from "./welcome.module.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
	"Track applications, interviews, and offers in one place",
	"Visualize your job search progress with insightful stats",
	"Gain insights to optimize your job search strategy",
];
export default function Welcome() {
	return (
		<div className={styles.main}>
			<h1 className={styles.title}>The #10 Best Job Tracking App Ever </h1>
			<div className={styles.jobBox}>
				<ul className="benefits">
					{benefits.map((benefit) => (
						<li key={benefit}>{benefit}</li>
					))}
				</ul>
			</div>
			<Button className={styles.btn} asChild>
				<Link href="/sign-in">Start Tracking Now</Link>
			</Button>
		</div>
	);
}
