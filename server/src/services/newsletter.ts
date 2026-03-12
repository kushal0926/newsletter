import crypto from "crypto";
import { and, eq } from "drizzle-orm";
import { subscriberTable } from "../db/schema";
import { db } from "../db";

export const upsertSubscriber = async (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");

  await db
    .insert(subscriberTable)
    .values({
      email,
      token,
      confirmed: false,
      active: false,
    })
    .onConflictDoUpdate({
      target: subscriberTable.email,
      set: {
        token,
        confirmed: false,
        active: false,
      },
    });

  return { email, token };
};

export const confirmSubscriber = async (email: string, token: string) => {
  const [confirmed] = await db
    .update(subscriberTable)
    .set({
      confirmed: true,
      active: true,
      token: null,
    })
    .where(and(eq(subscriberTable.email, email), eq(subscriberTable.token, token)))
    .returning({ email: subscriberTable.email });

  return Boolean(confirmed);
};
