import React from "react";
import styles from "./welcome.module.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Briefcase, TrendingUp, Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function Welcome() {
	return (
		<div className={styles.container}>
			{/* Hero Section */}
			<section className={styles.hero}>
				<div className={styles.heroContent}>
					<div className={styles.heroText}>
						<h1 className={styles.title}>
							Track Your Career Journey
							<span className={styles.highlight}> with Confidence</span>
						</h1>
						<p className={styles.subtitle}>
							Organize job applications, track interview progress, and never miss a follow-up. 
							Your professional success starts with better organization.
						</p>
						<div className={styles.ctaButtons}>
							<Link href="/sign-in" className={styles.primaryButton}>
								<Button size="lg" className={styles.button}>
									<Briefcase className={styles.buttonIcon} />
									Get Started
									<ArrowRight className={styles.arrowIcon} />
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.heroVisual}>
						<div className={styles.visualContainer}>
							<div className={styles.mockupCard}>
								<div className={styles.mockupHeader}>
									<div className={styles.mockupDots}>
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
								<div className={styles.mockupContent}>
									<div className={styles.mockupItem}>
										<CheckCircle className={styles.mockupIcon} />
										<span>Senior Developer - Tech Corp</span>
										<span className={styles.status}>Applied</span>
									</div>
									<div className={styles.mockupItem}>
										<Calendar className={styles.mockupIcon} />
										<span>Product Manager - Startup Inc</span>
										<span className={styles.status}>Interview</span>
									</div>
									<div className={styles.mockupItem}>
										<TrendingUp className={styles.mockupIcon} />
										<span>UX Designer - Design Studio</span>
										<span className={styles.status}>Offer</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className={styles.features}>
				<div className={styles.featuresContent}>
					<h2 className={styles.featuresTitle}>Why Choose Job Tracker?</h2>
					<div className={styles.featuresGrid}>
						<div className={styles.featureCard}>
							<div className={styles.featureIcon}>
								<Search />
							</div>
							<h3>Smart Organization</h3>
							<p>Keep all your job applications in one place with detailed tracking and status updates.</p>
						</div>
						<div className={styles.featureCard}>
							<div className={styles.featureIcon}>
								<Calendar />
							</div>
							<h3>Follow-up Reminders</h3>
							<p>Never miss important follow-ups with automated reminders and calendar integration.</p>
						</div>
						<div className={styles.featureCard}>
							<div className={styles.featureIcon}>
								<TrendingUp />
							</div>
							<h3>Progress Analytics</h3>
							<p>Track your application success rates and identify areas for improvement.</p>
						</div>
						<div className={styles.featureCard}>
							<div className={styles.featureIcon}>
								<Briefcase />
							</div>
							<h3>Company Insights</h3>
							<p>Store company information, interview notes, and contact details for future reference.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className={styles.stats}>
				<div className={styles.statsContent}>
					<div className={styles.statItem}>
						<div className={styles.statNumber}>500+</div>
						<div className={styles.statLabel}>Active Users</div>
					</div>
					<div className={styles.statItem}>
						<div className={styles.statNumber}>10K+</div>
						<div className={styles.statLabel}>Applications Tracked</div>
					</div>
					<div className={styles.statItem}>
						<div className={styles.statNumber}>95%</div>
						<div className={styles.statLabel}>Success Rate</div>
					</div>
				</div>
			</section>
		</div>
	);
}
