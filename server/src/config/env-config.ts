import { config } from "dotenv"

config({
    path: `.env.${process.env.NODE_ENV || "development"}.local`,
})

export const PORT: string = process.env.PORT || "8080";
export const DATABASE_URL: string = process.env.DATABASE_URL || "";