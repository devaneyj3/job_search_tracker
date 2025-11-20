import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: env("DATABASE_URL"),
		directUrl: env("DIRECT_URL"), // Use direct connection for migrations (optional, falls back to url if not set)
	},
});
