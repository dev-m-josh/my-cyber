
import { relations } from "drizzle-orm";

import { customers } from "./customers";
import { sales } from "./sales";
import { saleItems } from "./sale_items";
import { products } from "./products";
import { services } from "./services";

// Customers → Sales
export const customersRelations = relations(customers, ({ many }) => ({
  sales: many(sales),
}));

// Sales → Customer + Sale Items
export const salesRelations = relations(sales, ({ one, many }) => ({
  customer: one(customers, {
    fields: [sales.customerId],
    references: [customers.id],
  }),

  saleItems: many(saleItems),
}));

// Sale Items → Sale + Product + Service
export const saleItemsRelations = relations(saleItems, ({ one }) => ({
  sale: one(sales, {
    fields: [saleItems.saleId],
    references: [sales.id],
  }),

  product: one(products, {
    fields: [saleItems.productId],
    references: [products.id],
  }),

  service: one(services, {
    fields: [saleItems.serviceId],
    references: [services.id],
  }),
}));

// Products → Sale Items
export const productsRelations = relations(products, ({ many }) => ({
  saleItems: many(saleItems),
}));

// Services → Sale Items
export const servicesRelations = relations(services, ({ many }) => ({
  saleItems: many(saleItems),
}));
