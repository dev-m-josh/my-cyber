import { db } from "../db";
import { products } from "../db/schema";

import {
  CreateProductRequest,
  Product,
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