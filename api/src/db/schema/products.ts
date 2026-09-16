import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  description: text("description"),

  imageUrl: varchar("image_url", {
    length: 500,
  }),

  sellingPrice: numeric("selling_price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  costPrice: numeric("cost_price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  stockQuantity: integer("stock_quantity")
    .default(0)
    .notNull(),

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