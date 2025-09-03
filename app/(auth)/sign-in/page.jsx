import SignInCard from "@/components/SignInCard/SignInCard";
import styles from "./sign-in.module.scss";
import Image from "next/image";
import { Rotating } from "@/components/Animations/RotatingText/RotatingText";

export default async function SignInPage({ searchParams }) {
	const { callbackUrl } = await searchParams;
	return (
		<>
			<p className={styles.tagline}>Your job hunt, organized and stress free</p>
			<div className={styles.container}>
				<div className={styles.info}>
					<Image
						src="/images/sign-in.png"
						width={500}
						height={500}
						alt="Sign In Logo"
					/>
					<div className={styles.heading}>
						<Rotating text={["Looking", "for", "a", "job"]} />
					</div>
				</div>
				<div className={styles.sign_in_card}>
					<h3>Welcome</h3>
					<SignInCard callbackUrl={callbackUrl} />
				</div>
			</div>
		</>
	);
}
