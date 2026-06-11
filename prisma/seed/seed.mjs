import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL or DIRECT_URL must be set");
}

const sqlFiles = readdirSync(__dirname)
	.filter((file) => file.endsWith(".sql"))
	.sort();

const client = new pg.Client({ connectionString });

try {
	await client.connect();

	for (const file of sqlFiles) {
		const sql = readFileSync(join(__dirname, file), "utf8");
		console.log(`Running ${file}...`);
		await client.query(sql);
	}

	console.log("Seed completed.");
} finally {
	await client.end();
}
