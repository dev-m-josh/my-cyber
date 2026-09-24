import { Request, Response } from "express";

import { 
    createProduct,
    getProducts
} from "./products.service";
import { 
    CreateProductRequest
} from "../utils/types";

export const createProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const product: CreateProductRequest = req.body;

    const newProduct = await createProduct(product);

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Failed to create product:", error);

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create product",
    });
  }
};

export const getProductsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const products = await getProducts();

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Failed to get products:", error);

    return res.status(500).json({
      message: "Failed to get products",
    });
  }
};