import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "@/styles/FollowUpDashboard.module.scss";
import Cadence from "@/features/dashboard/Cadence";
import WhatToSend from "@/features/dashboard/WhatToSend";
import Tips from "@/features/dashboard/Tips";
import KeyStatsTable from "@/features/dashboard/KeyStatsTable";
import PrevalenceTable from "@/features/dashboard/PrevalenceTable";
import Extras from "@/features/dashboard/Extras";
import {
	playbookStats,
	prevalenceStats,
	playbookExtras,
} from "@/features/dashboard/followUpPlaybookData";

const HIGHLIGHT_STATS = playbookStats.slice(0, 3);

export default function FollowUpDashboard() {
	return (
		<div className={styles.page}>
			<div className={styles.shell}>
				<header className={styles.hero}>
					<p className={styles.kicker}>Outreach reference</p>
					<h1 className={styles.title}>Follow-up playbook</h1>
					<p className={styles.subtitle}>
						Research-backed cadence and messaging for applications and
						connection outreach — keep it thoughtful, not spammy.
					</p>
					<Link href="/dashboard" className={styles.backLink}>
						<ArrowLeft size={15} aria-hidden />
						Back to dashboard
					</Link>
				</header>

				<div className={styles.highlightStrip}>
					{HIGHLIGHT_STATS.map((stat) => (
						<div key={stat.label} className={styles.highlightCard}>
							<span className={styles.highlightValue}>{stat.value}</span>
							<span className={styles.highlightLabel}>{stat.label}</span>
						</div>
					))}
				</div>

				<div className={styles.layout}>
					<div className={styles.primary}>
						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>Recommended cadence</h2>
							<div className={styles.panelContent}>
								<Cadence showTitle={false} />
							</div>
						</section>

						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>What to send</h2>
							<div className={styles.panelContent}>
								<WhatToSend showTitle={false} />
							</div>
						</section>

						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>Tips that move the needle</h2>
							<div className={styles.panelContent}>
								<Tips showTitle={false} />
							</div>
						</section>
					</div>

					<aside className={styles.aside}>
						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>Key research stats</h2>
							<KeyStatsTable rows={playbookStats} embedded />
						</section>

						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>Follow-up prevalence</h2>
							<PrevalenceTable
								rows={prevalenceStats}
								hideHeader
								embedded
							/>
						</section>

						<section className={styles.panel}>
							<h2 className={styles.panelTitle}>Extra reading</h2>
							<div className={styles.panelContent}>
								<Extras items={playbookExtras} showTitle={false} />
							</div>
						</section>
					</aside>
				</div>

				<footer className={styles.footer}>
					Data last reviewed Sep 2025. Always check each posting for specific
					instructions — some forbid direct emails.
				</footer>
			</div>
		</div>
	);
}
