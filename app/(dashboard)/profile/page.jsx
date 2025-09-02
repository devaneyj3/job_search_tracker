import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { 
	User, 
	Mail, 
	Shield, 
	CheckCircle, 
	AlertTriangle,
	Settings,
	Activity,
	Briefcase
} from "lucide-react";

export default async function ProfilePage() {
	const session = await auth()

	if (!session) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Not Authenticated</h1>
					<p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
					<Link href="/sign-in" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
						Sign In
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
			{/* Header */}
			<div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
								<User className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">Profile</h1>
								<p className="text-gray-600">Manage your account and preferences</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Profile Card */}
					<div className="lg:col-span-1">
						<div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
							<div className="text-center pb-4">
								<div className="relative mx-auto mb-4">
									{session.user?.image ? (
										<Image
											src={session.user.image}
											width={120}
											height={120}
											alt={session.user?.name || "Profile image"}
											className="rounded-full border-4 border-white shadow-lg"
										/>
									) : (
										<div className="w-30 h-30 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
											<User className="w-16 h-16 text-white" />
										</div>
									)}
									<div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
										<CheckCircle className="w-4 h-4 text-white" />
									</div>
								</div>
								<h2 className="text-xl font-bold text-gray-900">
									{session.user?.name || "User"}
								</h2>
								<p className="text-gray-600">
									{session.user?.email}
								</p>
								<div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
									<Shield className="w-3 h-3" />
									Verified Account
								</div>
							</div>
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div className="text-center p-3 bg-blue-50 rounded-lg">
										<div className="text-2xl font-bold text-blue-600">0</div>
										<div className="text-gray-600">Applications</div>
									</div>
									<div className="text-center p-3 bg-green-50 rounded-lg">
										<div className="text-2xl font-bold text-green-600">0</div>
										<div className="text-gray-600">Interviews</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="lg:col-span-2 space-y-6">
						{/* Account Information */}
						<div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
									<User className="w-5 h-5" />
									Account Information
								</h3>
								<p className="text-gray-600">Your personal details and account settings</p>
							</div>
							<div className="space-y-4">
								<div className="grid md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Full Name</label>
										<div className="p-3 bg-gray-50 rounded-lg border">
											{session.user?.name || "Not provided"}
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Email Address</label>
										<div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
											<Mail className="w-4 h-4 text-gray-400" />
											{session.user?.email || "Not provided"}
										</div>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">User ID</label>
									<div className="p-3 bg-gray-50 rounded-lg border font-mono text-sm">
										{session.user?.id || "Not available"}
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
									<Settings className="w-5 h-5" />
									Quick Actions
								</h3>
								<p className="text-gray-600">Common tasks and shortcuts</p>
							</div>
							<div className="grid md:grid-cols-2 gap-4">
								<Link href="/all-jobs" className="block p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
									<div className="flex flex-col items-center gap-2 text-center">
										<Briefcase className="w-6 h-6 text-blue-600" />
										<span className="font-medium">View Applications</span>
										<span className="text-sm text-gray-500">Manage your job applications</span>
									</div>
								</Link>
								<Link href="/dashboard" className="block p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
									<div className="flex flex-col items-center gap-2 text-center">
										<Activity className="w-6 h-6 text-green-600" />
										<span className="font-medium">Dashboard</span>
										<span className="text-sm text-gray-500">View your progress overview</span>
									</div>
								</Link>
							</div>
						</div>

						{/* System Status */}
						<div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
									<Shield className="w-5 h-5" />
									System Status
								</h3>
								<p className="text-gray-600">Database and security status</p>
							</div>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
									<div className="flex items-center gap-3">
										<CheckCircle className="w-5 h-5 text-green-600" />
										<div>
											<div className="font-medium text-green-800">Authentication</div>
											<div className="text-sm text-green-600">Successfully authenticated</div>
										</div>
									</div>
									<span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
										Active
									</span>
								</div>
								
								<div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
									<div className="flex items-center gap-3">
										<Shield className="w-5 h-5 text-blue-600" />
										<div>
											<div className="font-medium text-blue-800">Session Status</div>
											<div className="text-sm text-blue-600">Your session is secure</div>
										</div>
									</div>
									<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
										Secure
									</span>
								</div>

								<div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
									<div className="flex items-center gap-3">
										<AlertTriangle className="w-5 h-5 text-yellow-600" />
										<div>
											<div className="font-medium text-yellow-800">Profile Completion</div>
											<div className="text-sm text-yellow-600">Complete your profile for better experience</div>
										</div>
									</div>
									<span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
										Incomplete
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
