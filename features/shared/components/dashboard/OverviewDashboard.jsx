"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
import { useCompany } from "@/features/companies/context/companyContext";
import { useApplication } from "@/features/applications/context/applicationContext";
import { useConnection } from "@/features/connections/context/connectionContext";
import { itemLength } from "@/features/shared/lib/utils";
import {
	applicationStatus,
	companyStatus,
	connectionStatus,
} from "@/Constants";
import styles from "@/styles/OverviewDashboard.module.scss";

function countActive(items) {
	return items.filter((item) => item.archived !== true).length;
}

function SectionMetrics({ title, href, statuses, items }) {
	const metrics = statuses
		.filter((status) => status !== "Archived")
		.map((status) => ({
			label: status,
			value: itemLength(status, items).length,
		}));

	return (
		<section className={styles.section}>
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>{title}</h2>
				<Link href={href} className={styles.sectionLink}>
					View all
				</Link>
			</div>
			<div className={styles.metricGrid}>
				{metrics.map(({ label, value }) => (
					<div key={label} className={styles.metricPill}>
						<div className={styles.metricPillValue}>{value}</div>
						<div className={styles.metricPillLabel}>{label}</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default function OverviewDashboard() {
	const { companies, isLoading: companiesLoading } = useCompany();
	const { applications, isLoading: applicationsLoading } = useApplication();
	const { connections, isLoading: connectionsLoading } = useConnection();

	const isLoading =
		companiesLoading || applicationsLoading || connectionsLoading;
	const hasData =
		companies.length > 0 ||
		applications.length > 0 ||
		connections.length > 0;

	const activeCompanies = countActive(companies);
	const activeApplications = countActive(applications);
	const activeConnections = countActive(connections);

	const totalEmailsSent = connections.reduce(
		(sum, connection) => sum + (connection.emailCount ?? 0),
		0,
	);
	const notContacted = connections.filter(
		(connection) => connection.archived !== true && !connection.emailSent,
	).length;
	const responded = connections.filter((connection) => connection.responded).length;
	const interviewing = itemLength("Interviewing", applications).length;

	const needsAttention = [
		...connections
			.filter(
				(connection) =>
					connection.archived !== true &&
					(connection.status === "Prospecting" || !connection.emailSent),
			)
			.slice(0, 3)
			.map((connection) => ({
				id: `connection-${connection.id}`,
				label: `Email ${connection.name}`,
				meta:
					typeof connection.company === "object"
						? connection.company?.name
						: connection.company || "No company",
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
				label: `Follow up on ${application.position}`,
				meta: application.company?.name || "Unknown company",
				href: "/applications",
			})),
		...companies
			.filter(
				(company) => company.archived !== true && company.status === "Researching",
			)
			.slice(0, 2)
			.map((company) => ({
				id: `company-${company.id}`,
				label: `Research ${company.name}`,
				meta: company.industry || "Company",
				href: "/companies",
			})),
	].slice(0, 6);

	if (isLoading && !hasData) {
		return (
			<div className={styles.loading}>
				<LoadingIndicator />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>Overview</h1>
				<p className={styles.subtitle}>
					Your job search at a glance — jump to companies, connections, or
					applications.
				</p>
			</header>

			<div className={styles.quickNav}>
				<Link href="/companies" className={styles.navCard}>
					<span className={styles.navCardValue}>{activeCompanies}</span>
					<span className={styles.navCardLabel}>Companies</span>
					<span className={styles.navCardHint}>
						Track targets <ArrowRight size={14} aria-hidden />
					</span>
				</Link>
				<Link href="/connections" className={styles.navCard}>
					<span className={styles.navCardValue}>{activeConnections}</span>
					<span className={styles.navCardLabel}>Connections</span>
					<span className={styles.navCardHint}>
						Manage outreach <ArrowRight size={14} aria-hidden />
					</span>
				</Link>
				<Link href="/applications" className={styles.navCard}>
					<span className={styles.navCardValue}>{activeApplications}</span>
					<span className={styles.navCardLabel}>Applications</span>
					<span className={styles.navCardHint}>
						View applications <ArrowRight size={14} aria-hidden />
					</span>
				</Link>
			</div>

			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>Outreach</h2>
					<Link href="/connections" className={styles.sectionLink}>
						Open connections
					</Link>
				</div>
				<div className={styles.outreachGrid}>
					<div className={styles.outreachCard}>
						<div className={styles.outreachValue}>{totalEmailsSent}</div>
						<div className={styles.outreachLabel}>Total emails sent</div>
					</div>
					<div className={styles.outreachCard}>
						<div className={styles.outreachValue}>{notContacted}</div>
						<div className={styles.outreachLabel}>Not contacted yet</div>
					</div>
					<div className={styles.outreachCard}>
						<div className={styles.outreachValue}>{responded}</div>
						<div className={styles.outreachLabel}>Responded</div>
					</div>
					<div className={styles.outreachCard}>
						<div className={styles.outreachValue}>{interviewing}</div>
						<div className={styles.outreachLabel}>Interviews (applications)</div>
					</div>
				</div>
			</section>

			<SectionMetrics
				title="Company pipeline"
				href="/companies"
				statuses={companyStatus}
				items={companies}
			/>
			<SectionMetrics
				title="Connection pipeline"
				href="/connections"
				statuses={connectionStatus}
				items={connections}
			/>
			<SectionMetrics
				title="Application pipeline"
				href="/applications"
				statuses={applicationStatus}
				items={applications}
			/>

			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>Needs attention</h2>
				</div>
				{needsAttention.length > 0 ? (
					<ul className={styles.attentionList}>
						{needsAttention.map((item) => (
							<li key={item.id}>
								<Link href={item.href} className={styles.attentionItem}>
									<span>{item.label}</span>
									<span className={styles.attentionMeta}>{item.meta}</span>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className={styles.emptyHint}>
						Nothing flagged right now. Add companies, connections, or applications
						to get started.
					</p>
				)}
			</section>
		</div>
	);
}
