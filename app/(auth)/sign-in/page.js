import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const metadata = {
	title: "Sign In",
};
export default async function SignInPage({ searchParams }) {
	const { callbackUrl } = await searchParams;
	return (
		<div className="w-full max-w-md mx-auto">
			<Card>
				<CardHeader className="space-y-4">
					<Link href="/" className="flex-center"></Link>
					<CardTitle className="text-center">Sign In</CardTitle>
					<CardDescription className="text-center">
						Sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form
						action={async () => {
							"use server";
							try {
								await signIn("google", {
									redirectTo: callbackUrl ?? "/Profile",
								});
							} catch (error) {
								if (error instanceof AuthError) {
									return redirect(`/error?error=${error.type}`);
								}
								throw error;
							}
						}}>
						<Button variant="default" className="w-full cursor-pointer">
							<span>Sign in with Google</span>
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
