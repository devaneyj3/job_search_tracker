import React from "react";
import styles from "./welcome.module.scss";
import { Button } from "@/components/ui/button";

export default function Welcome() {
	return (
		<div className={styles.main}>
			<h1>Welcome to the Job Tracker</h1>
			<Button variant="ghost">Getting Started</Button>
		</div>
	);
}
