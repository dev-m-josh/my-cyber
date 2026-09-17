import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  dialect: "postgresql",

  dbCredentials: {
    host: "127.0.0.1",
    port: 5432,
    user: "dev-josh",
    password: process.env.DB_PASSWORD!,
    database: "my_cyber",
    ssl: false,
  },
});