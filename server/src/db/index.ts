import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = drizzle({
  client: new Pool({
    connectionString: process.env.DATABASE_URL,
  })
});

export default db;