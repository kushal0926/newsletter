import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "./config/env.config";

if (!DATABASE_URL) {
  throw new Error("databaase url is required");
}

const sql = neon(DATABASE_URL);
export const db = drizzle({ client: sql });
