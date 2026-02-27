import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const subscriberTable = pgTable("subscribers", {
    id: integer()
        .primaryKey()
        .generatedAlwaysAsIdentity(),

    email: varchar({ length: 255 })
        .notNull()
        .unique(),

    token: varchar("token", { length: 64 }),

    confirmed: boolean("confirmed")
        .notNull()
        .default(false),

    active: boolean("active")
        .notNull()
        .default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
         .$onUpdate(() => new Date())
        .notNull()
});
