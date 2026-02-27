import crypto from "crypto";
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

  return {
    success: true,
    message: "subscriber upserted successfully.",
    token,
  };
};
