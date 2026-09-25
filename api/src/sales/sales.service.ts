import { eq } from "drizzle-orm";

import { db } from "../db";
import { products, services, sales, saleItems } from "../db/schema";
import { CreateSaleRequest } from "../utils/types";

export const createSale = async (data: CreateSaleRequest) => {
  // A sale must contain at least one product or service.
  if (data.items.length === 0) {
    throw new Error("A sale must have at least one item");
  }

  // Everything inside this transaction succeeds together or fails together.
  return await db.transaction(async (tx) => {
    const saleItemsData = [];

    //calculate the total from the actual database prices.
    let totalAmount = 0;

    // Process every product/service being sold.
    for (const item of data.items) {

      // A sale item must be either a product OR a service.
      if (
        (item.productId && item.serviceId) ||
        (!item.productId && !item.serviceId)
      ) {
        throw new Error(
          "Each sale item must have either a product or a service",
        );
      }

      // Quantity must always be greater than zero.
      if (item.quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      // PRODUCT SALE
      if (item.productId) {

        // Get the product from the database.
        const [product] = await tx
          .select()
          .from(products)
          .where(eq(products.id, item.productId))
          .limit(1);

        // The product ID might not exist.
        if (!product) {
          throw new Error("Product not found");
        }

        // Inactive products cannot be sold.
        if (!product.isActive) {
          throw new Error("Product is inactive");
        }

        // Make sure there is enough stock.
        if (product.stockQuantity < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`);
        }

        // Product sellingPrice comes from our database.
        const unitPrice = Number(product.sellingPrice);

        // Add this item's value to the sale total.
        totalAmount += unitPrice * item.quantity;

        // Prepare this item for the sale_items table.
        saleItemsData.push({
          productId: product.id,
          serviceId: null,
          quantity: item.quantity,

          // Store the price at the time of the sale
          unitPrice: product.sellingPrice,
        });

        // Reduce the product stock.
        await tx
          .update(products)
          .set({
            stockQuantity: product.stockQuantity - item.quantity,
            updatedAt: new Date(),
          })
          .where(eq(products.id, product.id));
      }

      // SERVICE SALE
      if (item.serviceId) {

        // Get the service from the database.
        const [service] = await tx
          .select()
          .from(services)
          .where(eq(services.id, item.serviceId))
          .limit(1);

        // The service ID might not exist.
        if (!service) {
          throw new Error("Service not found");
        }

        // Inactive services cannot be sold.
        if (!service.isActive) {
          throw new Error("Service is inactive");
        }

        // Get the current service price from the database.
        const unitPrice = Number(service.price);

        // Add this service's value to the sale total.
        totalAmount += unitPrice * item.quantity;

        // Prepare this service for the sale_items table.
        saleItemsData.push({
          productId: null,
          serviceId: service.id,
          quantity: item.quantity,

          // Save the service price at the time of sale.
          unitPrice: service.price,
        });
      }
    }

    // CREATE SALE
    //main record in the sales table.
    const [sale] = await tx
      .insert(sales)
      .values({
        customerId: data.customerId,
        createdBy: data.createdBy,

        // Convert the calculated total to a decimal string
        totalAmount: totalAmount.toFixed(2),

        paymentMethod: data.paymentMethod,
      })
      .returning();

    // CREATE SALE ITEMS
    // Every item gets the ID of the sale we just created.
    const items = await tx
      .insert(saleItems)
      .values(
        saleItemsData.map((item) => ({
          saleId: sale.id,
          productId: item.productId,
          serviceId: item.serviceId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      )
      .returning();

    // Return both the main sale and its individual items.
    return {
      sale,
      items,
    };
  });
};
