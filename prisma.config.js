import { defineConfig, env } from "prisma/config";
import "dotenv/config";

// Debug logging
const databaseUrl = env("DATABASE_URL");
const directUrl = env("DIRECT_URL");

console.log("[Prisma Config] DATABASE_URL:", databaseUrl ? "SET" : "NOT SET");
console.log("[Prisma Config] DIRECT_URL:", directUrl ? "SET" : "NOT SET");
if (directUrl) {
	console.log("[Prisma Config] Using DIRECT_URL for migrations");
} else if (databaseUrl) {
	console.log("[Prisma Config] Using DATABASE_URL (pooler may cause issues)");
}

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		// For db push, use DIRECT_URL if available, otherwise DATABASE_URL
		// DIRECT_URL should be the non-pooler connection (port 5432)
		url: directUrl || databaseUrl,
		directUrl: directUrl, // Explicitly set directUrl for migrations
	},
});
