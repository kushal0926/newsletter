import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
  quiet: true,
});

// checking if the environment variable is empty..
function requiredENV(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`missing required environment varialble: ${key}`);
  return value;
}

export const NODE_ENV = process.env.NODE_ENV || "development";

export const PORT = requiredENV("PORT");

export const DATABASE_URL = requiredENV("DATABASE_URL");
