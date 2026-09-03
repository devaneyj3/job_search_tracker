"use client";

import Link from "next/link";
import {
	ArrowRight,
	BookOpen,
	Briefcase,
	ExternalLink,
	Mail,
	Search,
	Users,
} from "lucide-react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import { useApplication } from "@/features/applications/context/applicationContext";
import { useConnection } from "@/features/connections/context/connectionContext";
import { itemLength } from "@/features/shared/lib/utils";
import styles from "@/styles/OverviewDashboard.module.scss";
import { EMAIL_LABELS } from "@/lib/emailLabels";

function countActive(items) {
	return items.filter((item) => item.archived !== true).length;
}

const NAV_ITEMS = [
	{
		href: "/connections",
		label: "Connections",
		description: "People to reach out to and follow up with",
		icon: Users,
		key: "connections",
	},
	{
		href: "/applications",
		label: "Applications",
		description: "Roles you've applied to and their status",
		icon: Briefcase,
		key: "applications",
	},
];

export default function OverviewDashboard() {
	const { applications, isLoading: applicationsLoading } = useApplication();
	const { connections, isLoading: connectionsLoading } = useConnection();

	const isLoading = applicationsLoading || connectionsLoading;
	const hasData = applications.length > 0 || connections.length > 0;

	const counts = {
		connections: countActive(connections),
		applications: countActive(applications),
	};

	const totalEmailsSent = connections.reduce(
		(sum, connection) => sum + (connection.emailCount ?? 0),
		0,
	);
	const notContacted = connections.filter(
		(connection) => connection.archived !== true && !connection.emailSent,
	).length;
	const interviewing = itemLength("Interviewing", applications).length;

	const needsAttention = [
		...connections
			.filter((connection) => connection.archived !== true)
			.map((connection) => ({
				id: `connection-${connection.id}`,
				label: connection.name,
				action: `Send ${EMAIL_LABELS[connection.emails.length]} Email`,
				meta: connection.companyName || "No employer",
				href: "/connections",
			})),
		...applications
			.filter(
				(application) =>
					application.archived !== true && application.status === "Applied",
			)
			.slice(0, 2)
			.map((application) => ({
				id: `application-${application.id}`,
				label: application.position,
				action: "Follow up",
				meta: application.companyName || "Unknown employer",
				href: "/applications",
			})),
	];

	const statStrip = [
		{ label: "Emails sent", value: totalEmailsSent },
		{ label: "Not contacted", value: notContacted },
		{ label: "Interviews", value: interviewing },
	];

	if (isLoading && !hasData) {
		return (
			<div className={styles.page}>
				<div className={styles.loading}>
					<LoadingIndicator />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<div className={styles.shell}>
				<header className={styles.hero}>
					<p className={styles.kicker}>Job search command center</p>
					<h1 className={styles.title}>Dashboard</h1>
					<p className={styles.subtitle}>
						Pick up where you left off — outreach and applications in one place.
					</p>

					<Link
						href="https://www.linkedin.com/jobs/search/?currentJobId=4460477929&f_E=2&f_TPR=r86400&f_WT=2&keywords=data%20analyst&origin=JOB_SEARCH_PAGE_JOB_FILTER"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.linkedinCta}>
						<Search size={18} strokeWidth={2.25} aria-hidden />
						Search Data Analyst Jobs on LinkedIn
						<ExternalLink size={16} strokeWidth={2} aria-hidden />
					</Link>
				</header>

				<div className={styles.layout}>
					<div className={styles.primary}>
						<div className={styles.navGrid}>
							{NAV_ITEMS.map(
								({ href, label, description, icon: Icon, key }) => (
									<Link key={key} href={href} className={styles.navCard}>
										<span className={styles.navIcon} aria-hidden>
											<Icon size={22} strokeWidth={1.75} />
										</span>
										<div className={styles.navBody}>
											<div className={styles.navTop}>
												<span className={styles.navLabel}>{label}</span>
												<span className={styles.navCount}>{counts[key]}</span>
											</div>
											<p className={styles.navDescription}>{description}</p>
										</div>
										<ArrowRight
											className={styles.navArrow}
											size={18}
											strokeWidth={2}
											aria-hidden
										/>
									</Link>
								),
							)}
						</div>

						<div className={styles.statStrip}>
							{statStrip.map(({ label, value }) => (
								<div key={label} className={styles.statItem}>
									<span className={styles.statValue}>{value}</span>
									<span className={styles.statLabel}>{label}</span>
								</div>
							))}
							<Link href="/connections" className={styles.statLink}>
								<Mail size={15} aria-hidden />
								Open connections
							</Link>
						</div>
					</div>

					<aside className={styles.aside}>
						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>Today&apos;s focus</h2>
							{needsAttention.length > 0 ? (
								<ul className={styles.focusList}>
									{needsAttention.map((item) => (
										<li key={item.id}>
											<Link href={item.href} className={styles.focusItem}>
												<div className={styles.focusMain}>
													<span className={styles.focusAction}>
														{item.action}
													</span>
													<span className={styles.focusLabel}>
														{item.label}
													</span>
												</div>
												<span className={styles.focusMeta}>{item.meta}</span>
											</Link>
										</li>
									))}
								</ul>
							) : (
								<p className={styles.emptyState}>
									You&apos;re caught up. Add a connection or application to get
									moving.
								</p>
							)}
						</section>

						<Link href="/playbook" className={styles.playbookCard}>
							<span className={styles.playbookIcon} aria-hidden>
								<BookOpen size={22} strokeWidth={1.75} />
							</span>
							<div>
								<h2 className={styles.playbookTitle}>Follow-up playbook</h2>
								<p className={styles.playbookText}>
									Cadence, email templates, and research-backed tips.
								</p>
							</div>
							<ArrowRight
								size={18}
								className={styles.playbookArrow}
								aria-hidden
							/>
						</Link>
					</aside>
				</div>
			</div>
		</div>
	);
}
