import { db } from "../db";
import { products } from "../db/schema";
import { eq } from "drizzle-orm";

import {
  CreateProductRequest,
  Product,
  UpdateProductRequest
} from "../utils/types";

export const createProduct = async (
  product: CreateProductRequest,
): Promise<Product> => {
  const [newProduct] = await db
    .insert(products)
    .values({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      sellingPrice: product.sellingPrice,
      costPrice: product.costPrice,
      stockQuantity: product.stockQuantity ?? 0,
    })
    .returning();

  return newProduct;
};

export const getProducts = async (): Promise<Product[]> => {
  return await db
    .select()
    .from(products)
    .where(eq(products.isActive, true));
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return product;
};
