import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", {
    length: 100,
  }).notNull(),

  lastName: varchar("last_name", {
    length: 100,
  }),

  phone: varchar("phone", {
    length: 30,
  }).unique(),

  email: varchar("email", {
    length: 255,
  }).unique(),

  emailVerified: boolean("email_verified")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});