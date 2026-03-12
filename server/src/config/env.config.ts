import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
  quiet: true,
});

// checking if the environment variable is empty..
function requiredENV(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`missing required environment variable: ${key}`);
  return value;
}

export const NODE_ENV = process.env.NODE_ENV || "development";

const rawPort = requiredENV("PORT");
const parsedPort = Number(rawPort);
if (Number.isNaN(parsedPort)) {
  throw new Error(`PORT must be a number: ${rawPort}`);
}
export const PORT = parsedPort;

export const APP_URL =
  process.env.APP_URL || process.env.VITE_APP_API_URL || "http://localhost:5001";

export const DATABASE_URL = requiredENV("DATABASE_URL");

export const GCP_PROJECT_ID = requiredENV("GCP_PROJECT_ID");

export const RESEND_API_KEY = requiredENV("RESEND_API_KEY");

export const RESEND_SENDER = requiredENV("RESEND_SENDER");
