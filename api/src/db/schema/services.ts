import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  description: text("description"),

  imageUrl: varchar("image_url", { length: 500 }),

  price: numeric("price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});