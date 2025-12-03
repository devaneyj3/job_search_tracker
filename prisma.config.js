import { defineConfig, env } from "prisma/config";
import "dotenv/config";

const databaseUrl = env("DATABASE_URL");
const directUrl = env("DIRECT_URL");

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
