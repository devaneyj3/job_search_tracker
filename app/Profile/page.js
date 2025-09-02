"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
	const { data: session } = useSession();
	const [testResults, setTestResults] = useState(null);
	const [loading, setLoading] = useState(false);

	console.log(session);

	const testRLS = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/test-rls");
			const data = await response.json();
			setTestResults(data);
		} catch (error) {
			setTestResults({ error: error.message });
		}
		setLoading(false);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			{session && (
				<Image
					src={session?.user?.image || null}
					width={400}
					height={400}
					alt={session?.user?.name}></Image>
			)}
			<h1 className="text-2xl font-bold mb-6">Profile Page</h1>

			<div className="mb-6 p-4 bg-gray-100 rounded">
				<h2 className="text-lg font-semibold mb-2">Session Data:</h2>
				<p>Name: {session?.user?.name || "Not loaded"}</p>
				<p>Email: {session?.user?.email || "Not loaded"}</p>
				<p>ID: {session?.user?.id || "Not loaded"}</p>
			</div>

			<div className="mb-6 p-4 bg-blue-100 rounded">
				<h2 className="text-lg font-semibold mb-2">RLS Policy Test:</h2>
				<p className="mb-2">
					Test if prisma.user.findMany() only returns current user due to RLS
					policy
				</p>
				<button
					onClick={testRLS}
					disabled={loading}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
					{loading ? "Testing..." : "Test RLS Policy"}
				</button>

				{testResults && (
					<div className="mt-4 p-3 bg-white rounded border">
						<h3 className="font-semibold mb-2">Test Results:</h3>

						{testResults.error ? (
							<div className="text-red-600 p-2 bg-red-50 rounded">
								<strong>Error:</strong> {testResults.error}
							</div>
						) : (
							<div>
								<div
									className={`p-3 rounded mb-3 ${
										testResults.testResult?.success
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}>
									<strong>Result:</strong>{" "}
									{testResults.testResult?.success
										? "✅ SUCCESS - findMany() returned exactly 1 user"
										: "❌ FAILED - findMany() did not return exactly 1 user"}
								</div>

								<div className="mb-2">
									<strong>Count:</strong> {testResults.testResult?.count}{" "}
									user(s)
								</div>

								<div className="mb-2">
									<strong>Expected:</strong> {testResults.testResult?.expected}
								</div>

								<div className="mb-2">
									<strong>RLS Policy:</strong>{" "}
									{testResults.rlsPolicy?.description}
								</div>

								{testResults.debug && (
									<div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
										<h4 className="font-medium text-yellow-800 mb-2">
											Debug Info:
										</h4>
										<div className="text-sm space-y-1">
											<div>
												<strong>Before Setting:</strong>{" "}
												{testResults.debug.beforeSetting || "NULL"}
											</div>
											<div>
												<strong>Set Config Result:</strong>{" "}
												{testResults.debug.setConfigResult || "NULL"}
											</div>
											<div>
												<strong>After Setting:</strong>{" "}
												{testResults.debug.afterSetting || "NULL"}
											</div>
											<div>
												<strong>After Query:</strong>{" "}
												{testResults.debug.afterQuery || "NULL"}
											</div>
											<div>
												<strong>Expected Email:</strong>{" "}
												{testResults.debug.expectedEmail}
											</div>
											<div>
												<strong>RLS Enabled:</strong>{" "}
												{testResults.debug.rlsEnabled ? "Yes" : "No"}
											</div>
											<div>
												<strong>Connection Type:</strong>{" "}
												{testResults.debug.connectionType}
											</div>
											<div>
												<strong>Database User:</strong>{" "}
												{testResults.debug.databaseInfo?.current_user}
											</div>
											<div>
												<strong>Database Name:</strong>{" "}
												{testResults.debug.databaseInfo?.current_database}
											</div>
											<div>
												<strong>Test Set Config:</strong>{" "}
												{testResults.debug.testSetConfig || "NULL"}
											</div>
										</div>
									</div>
								)}

								<details className="mt-3">
									<summary className="cursor-pointer font-medium">
										View Raw Data
									</summary>
									<pre className="text-sm bg-gray-50 p-2 rounded overflow-auto mt-2">
										{JSON.stringify(testResults, null, 2)}
									</pre>
								</details>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
