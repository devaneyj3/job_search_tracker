import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const session = await auth();
		const email = session?.user?.email;

		if (!email) {
			return NextResponse.json(
				{
					error: "No session found",
					message: "You must be logged in to test RLS",
				},
				{ status: 401 }
			);
		}

		// Test 1: query WITHOUT setting any RLS context (expect block/empty by RLS)
		let withoutContext;
		try {
			withoutContext = await prisma.user.findMany();
		} catch (e) {
			withoutContext = { error: e.message };
		}

		// Test 2 + 3: do everything INSIDE ONE TRANSACTION with the GUC set
		const { withContext, currentUser } = await prisma.$transaction(
			async (tx) => {
				// Important: use set_config with "is_local = true" so it’s scoped to this transaction
				await tx.$executeRaw`select set_config('app.user_email', ${email}, true)`;

				// Now RLS policies that depend on current_setting('app.user_email', true) will match
				const withContext = await tx.user.findMany();

				const currentUser = await tx.user.findUnique({
					where: { email }, // works because your policy allows only your own row
				});

				return { withContext, currentUser };
			}
		);

		return NextResponse.json({
			session: { email: email, name: session.user.name },
			testResults: {
				withoutRLSContext: {
					description: "prisma.user.findMany() without app.user_email",
					result: withoutContext,
					expected: "Should fail or be empty due to RLS",
				},
				withRLSContext: {
					description: "prisma.user.findMany() inside tx after set_config",
					result: withContext,
					expected: "Should return only the current user row",
				},
				currentUserQuery: {
					description:
						"prisma.user.findUnique({ where: { email } }) inside same tx",
					result: currentUser,
					expected: "Should return current user data",
				},
			},
			rlsPolicy: {
				description: 'email = current_setting("app.user_email", true)',
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Server error", message: error.message },
			{ status: 500 }
		);
	}
}
