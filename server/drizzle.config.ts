import { defineConfig } from "drizzle-kit";
import env from 'dotenv';
env.config()

export default defineConfig({
  schema: "./src/db/schema",
  out: "./migrations",      
  dialect: 'postgresql', 
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});