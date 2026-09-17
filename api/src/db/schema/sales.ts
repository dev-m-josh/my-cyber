import {
  pgTable,
  uuid,
  numeric,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const sales = pgTable("sales", {
  id: uuid("id").defaultRandom().primaryKey(),

  customerId: uuid("customer_id"),

  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),

  totalAmount: numeric("total_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  paymentMethod: varchar("payment_method", {
    length: 30,
  }).notNull(),

  status: varchar("status", {
    length: 30,
  }).default("completed").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});