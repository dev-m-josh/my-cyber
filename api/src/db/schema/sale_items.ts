import {
  pgTable,
  uuid,
  numeric,
  integer,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { sales } from "./sales";
import { products } from "./products";
import { services } from "./services";

export const saleItems = pgTable(
  "sale_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    saleId: uuid("sale_id")
      .notNull()
      .references(() => sales.id),

    productId: uuid("product_id")
      .references(() => products.id),

    serviceId: uuid("service_id")
      .references(() => services.id),

    quantity: integer("quantity")
      .notNull(),

    unitPrice: numeric("unit_price", {
      precision: 10,
      scale: 2,
    }).notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "quantity_positive",
      sql`${table.quantity} > 0`,
    ),

    check(
      "product_or_service",
      sql`(
        (${table.productId} IS NOT NULL AND ${table.serviceId} IS NULL)
        OR
        (${table.productId} IS NULL AND ${table.serviceId} IS NOT NULL)
      )`,
    ),
  ],
);