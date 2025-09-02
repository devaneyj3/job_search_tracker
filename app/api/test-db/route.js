import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
	try {
		// Test database connection
		const prisma = new PrismaClient();

		// Try to connect
		await prisma.$connect();

		// Test a simple query
		const result = await prisma.$queryRaw`SELECT 1 as test`;

		await prisma.$disconnect();

		return NextResponse.json({
			success: true,
			message: "Database connection successful",
			test: result,
			env: {
				hasDatabaseUrl: !!process.env.DATABASE_URL,
				databaseUrlLength: process.env.DATABASE_URL
					? process.env.DATABASE_URL.length
					: 0,
				databaseUrlPreview: process.env.DATABASE_URL
					? process.env.DATABASE_URL.substring(0, 50) + "..."
					: "Not set",
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error.message,
				env: {
					hasDatabaseUrl: !!process.env.DATABASE_URL,
					databaseUrlLength: process.env.DATABASE_URL
						? process.env.DATABASE_URL.length
						: 0,
					databaseUrlPreview: process.env.DATABASE_URL
						? process.env.DATABASE_URL.substring(0, 50) + "..."
						: "Not set",
				},
			},
			{ status: 500 }
		);
	}
}
