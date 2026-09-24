import { Request, Response } from "express";

import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateProductStatus
} from "./products.service";
import { 
    CreateProductRequest,
    UpdateProductRequest,
    UpdateProductStatusRequest
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

export const getProductByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.error("Failed to get product:", error);

    return res.status(500).json({
      message: "Failed to get product",
    });
  }
};

export const updateProductController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      imageUrl,
      sellingPrice,
      costPrice,
      stockQuantity,
    }: UpdateProductRequest = req.body;

    const product = await updateProduct(id, {
      name,
      description,
      imageUrl,
      sellingPrice,
      costPrice,
      stockQuantity,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Failed to update product:", error);

    return res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const updateProductStatusController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const { isActive }: UpdateProductStatusRequest = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "isActive must be a boolean",
      });
    }

    const product = await updateProductStatus(id, isActive);

    return res.status(200).json({
      message: isActive
        ? "Product activated successfully"
        : "Product deactivated successfully",
      product,
    });
  } catch (error) {
    console.error("Failed to update product status:", error);

    return res.status(500).json({
      message: "Failed to update product status",
    });
  }
};