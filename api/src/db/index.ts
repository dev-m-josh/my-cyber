import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

import * as schema from "./schema";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "dev-josh",
  password: process.env.DB_PASSWORD,
  database: "my_cyber",
  ssl: false,
});

export const db = drizzle(pool, {
  schema,
});