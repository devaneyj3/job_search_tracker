// src/components/ResumePDF/ResumePDF.tsx
import React from "react";
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Link,
} from "@react-pdf/renderer";

// Palette & typography
const BLUE = "#22649D";

const styles = StyleSheet.create({
	page: {
		paddingTop: 38,
		paddingHorizontal: 50,
		paddingBottom: 56,
		fontSize: 11,
		fontFamily: "Times-Roman",
		lineHeight: 1.1,
	},
	header: {
		textAlign: "left",
		marginBottom: 10,
	},
	name: {
		fontSize: 25,
		fontFamily: "Times-Bold",
		marginBottom: 20,
	},
	role: {
		fontFamily: "Times-Bold",
		fontSize: 16,
		marginTop: 2,
	},
	contact: {
		fontSize: 11,
		marginTop: 6,
	},
	section: {
		marginTop: 5,
		marginBottom: 5,
	},
	sectionTitle: {
		borderBottom: "1px solid black",
		paddingBottom: 5,
		textTransform: "uppercase",
		fontSize: 11,
		fontFamily: "Times-Bold",
		color: BLUE,
		marginBottom: 5,
	},
	paragraph: {
		marginBottom: 4,
	},
	list: {
		marginTop: 2,
	},
	listItem: {
		marginLeft: 12,
		flexDirection: "row",
		marginBottom: 3,
	},
	bullet: {
		width: 12,
		textAlign: "center",
		fontSize: 11,
	},
	skill: {
		fontFamily: "Times-Roman",
		fontStyle: "normal",
	},
	listText: {
		fontSize: 11,
	},
	subheadingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	subheadingLeft: {
		fontFamily: "Times-Bold",
	},

	description: {
		fontFamily: "Times-Roman",
		fontStyle: "italic",
	},
	subheadingRight: {
		fontStyle: "italic",
		fontSize: 11,
	},
	small: {
		fontSize: 11,
	},
});

const Bullet = ({ children }) => (
	<View style={styles.listItem}>
		<Text style={styles.bullet}>•</Text>
		<Text style={styles.listText}>{children}</Text>
	</View>
);

const ResumePDF = () => {
	return (
		<Document>
			<Page size="LETTER" style={styles.page}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.name}>Jordan Devaney</Text>
					<Text style={styles.role}>Software Engineer</Text>
					<Text style={styles.contact}>
						Whitmore Lake, MI | 810.772-0086 |{" "}
						<Link src="mailto:jordandevaney28@gmail.com">
							jordandevaney28@gmail.com
						</Link>
						<Link src="https://github.com/devaneyj3">GitHub</Link> |{" "}
						<Link src="https://www.linkedin.com/in/jordandevaney/">
							LinkedIn
						</Link>
					</Text>
				</View>

				{/* Summary */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Summary</Text>
					<Text style={styles.paragraph}>
						Software engineer with over 1 year of experience delivering
						e-commerce and automation solutions. Built and launched Shopify
						integrations and React-based UIs, helping businesses increase
						efficiency and revenue.
					</Text>
				</View>

				{/* Technical Skills */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Technical Skills</Text>
					<Text style={styles.paragraph}>
						<Text style={styles.subheadingLeft}>Front End: </Text>
						React.js, Next.js, Redux, Hooks, Context API, Jest, Cypress, Yup,
						Axios, JavaScript, ES6, HTML, CSS, Ant Design
					</Text>
					<Text style={styles.paragraph}>
						<Text style={styles.subheadingLeft}>Back End: </Text>
						Node.js, Express, SQL, PostgreSQL, Docker, Python, Git CLI, GitHub,
						VS Code, Vercel, Heroku, Netlify, AWS, REST API, S3, DynamoDB,
						Shopify API, Prisma
					</Text>
					<Text style={styles.paragraph}>
						<Text style={styles.subheadingLeft}>Additional: </Text>
						Agile Project Management, Scrum, Algorithms, Architecture,
						Debugging, and deployment
					</Text>
				</View>

				{/* Professional Experience */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Professional Experience</Text>
					<View style={{ marginBottom: 6 }}>
						<View style={styles.subheadingRow}>
							<Text style={styles.subheadingLeft}>
								AG USA,{" "}
								<Text style={styles.description}>Remote Web Developer</Text>
							</Text>
							<Text style={styles.subheadingRight}>May 2024 – Present</Text>
						</View>
						<View style={styles.list}>
							<Bullet>
								Automated regulatory reporting using Python; increased
								productivity by 80%
							</Bullet>
							<Bullet>
								Migrated legacy e-commerce platform to Shopify; generated $5,900
								in first-month revenue
							</Bullet>
							<Bullet>
								Led end-to-end product development using React, Context API, and
								Trello for task management
							</Bullet>
						</View>
					</View>
				</View>

				{/* Projects */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Projects</Text>

					<View style={{ marginBottom: 6 }}>
						<View style={styles.subheadingRow}>
							<Text style={styles.subheadingLeft}>
								AG-USA,{" "}
								<Text style={styles.description}>Full Stack Developer, </Text>
								<Text style={styles.skill}>React</Text>
							</Text>
							<Text style={styles.small}>
								<Link src="https://github.com/devaneyj3/ag-usa">GitHub</Link> |
								<Link src="https://agusa.life/">Website</Link>
							</Text>
						</View>
						<View style={styles.list}>
							<Bullet>
								Developed a front-end e-commerce site to replace the existing
								one, integrating with Ecommerce Templates for the backend and
								enhancing performance and UX across devices
							</Bullet>
							<Bullet>Enhanced Google Speed score by 30 points</Bullet>
							<Bullet>
								Delivered end-to-end: requirements, user stories in Trello,
								architecture, deployment
							</Bullet>
						</View>
					</View>

					<View>
						<View style={styles.subheadingRow}>
							<Text style={styles.subheadingLeft}>
								Invoice App,{" "}
								<Text style={styles.description}>Full Stack, </Text>
								<Text style={styles.skill}>
									React/NextJS/NextAuth/Supabase/Prisma
								</Text>
							</Text>
							<Text style={styles.small}>
								<Link src="https://github.com/devaneyj3/create_invoices">
									GitHub
								</Link>
								|
								<Link src="https://create-invoices-alpha.vercel.app/dashboard">
									Website
								</Link>
							</Text>
						</View>
						<View style={styles.list}>
							<Bullet>
								Develop an invoice application to keep track of personal
								invoices
							</Bullet>
							<Bullet>
								Automate downloading and previewing invoices with pdf-lib
							</Bullet>
							<Bullet>Auto-increments invoice numbers</Bullet>
							<Bullet>Saves time by 50%</Bullet>
						</View>
					</View>
				</View>

				{/* Education */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Education</Text>
					<View style={{ marginBottom: 4 }}>
						<View style={styles.subheadingRow}>
							<Text style={styles.subheadingLeft}>
								Western Governors University,{" "}
								<Text style={styles.description}>
									Bachelor of Science in Software Engineering
								</Text>
							</Text>
							<Text className="small">Sep 2022 – Jul 2023</Text>
						</View>
						<Bullet>Worked part-time as a janitor to fund my education</Bullet>
					</View>
					<View style={{ marginBottom: 4 }}>
						<View style={styles.subheadingRow}>
							<Text style={styles.subheadingLeft}>
								BloomTech,{" "}
								<Text style={styles.description}>
									Full Stack Web Development Program
								</Text>
							</Text>
							<Text className="small">Sep 2019 – Jan 2021</Text>
						</View>
					</View>
					<View style={styles.subheadingRow}>
						<Text style={styles.subheadingLeft}>
							Spring Arbor University,{" "}
							<Text style={styles.description}>
								Bachelor of Arts in Children’s Ministry
							</Text>
						</Text>
						<Text className="small">Jan 2011 – May 2013</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default ResumePDF;
