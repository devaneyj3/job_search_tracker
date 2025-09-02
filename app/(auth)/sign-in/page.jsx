import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Briefcase, ArrowLeft, Shield, Users, Zap } from "lucide-react";

export const metadata = {
	title: "Sign In - Job Tracker",
};

export default async function SignInPage({ searchParams }) {
	const { callbackUrl } = await searchParams;
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
			</div>

			{/* Navigation */}
			<nav className="relative z-10 p-6">
				<Link 
					href="/" 
					className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Home
				</Link>
			</nav>

			{/* Main content */}
			<div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
				<div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
					{/* Left side - Hero content */}
					<div className="text-center lg:text-left">
						<div className="mb-8">
							<div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
								<Shield className="w-4 h-4" />
								Secure Authentication
							</div>
							<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
								Welcome Back to
								<span className="block bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
									Job Tracker
								</span>
							</h1>
							<p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
								Sign in to continue managing your job applications, tracking interviews, and advancing your career journey.
							</p>
						</div>

						{/* Features */}
						<div className="space-y-4 mb-8">
							<div className="flex items-center gap-3 text-gray-700">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<Users className="w-4 h-4 text-green-600" />
								</div>
								<span>Secure Google authentication</span>
							</div>
							<div className="flex items-center gap-3 text-gray-700">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<Briefcase className="w-4 h-4 text-blue-600" />
								</div>
								<span>Access your job applications</span>
							</div>
							<div className="flex items-center gap-3 text-gray-700">
								<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
									<Zap className="w-4 h-4 text-orange-600" />
								</div>
								<span>Track your progress instantly</span>
							</div>
						</div>
					</div>

					{/* Right side - Sign in form */}
					<div className="flex justify-center">
						<div className="w-full max-w-md">
							<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
								<div className="text-center mb-8">
									<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<Briefcase className="w-8 h-8 text-white" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
									<p className="text-gray-600">Continue with your Google account</p>
								</div>

								<form
									action={async () => {
										"use server";
										try {
											await signIn("google", {
												redirectTo: callbackUrl ?? "/profile",
											});
										} catch (error) {
											if (error instanceof AuthError) {
												return redirect(`/error?error=${error.type}`);
											}
											throw error;
										}
									}}
									className="space-y-6"
								>
									<Button 
										type="submit" 
										className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
									>
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
											<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
											<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
											<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
											<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
										</svg>
										Sign in with Google
									</Button>
								</form>

								<div className="mt-8 pt-6 border-t border-gray-200">
									<p className="text-center text-sm text-gray-600">
										By signing in, you agree to our{" "}
										<Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
											Privacy Policy
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
