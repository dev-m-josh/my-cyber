import { Request, Response } from "express";

import { 
    createSale,
    getSaleById,
    getSales,
    completeSale
 } from "./sales.service";

export const createSaleController = async (
  req: Request,
  res: Response,
) => {
  try {
    const sale = await createSale(req.body);

    return res.status(201).json(sale);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create sale",
    });
  }
};

export const getSaleByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const sale = await getSaleById(id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to get sale",
    });
  }
};

export const getSalesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const sales = await getSales();

    return res.status(200).json({
      sales,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to get sales",
    });
  }
};

export const completeSaleController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const sale = await completeSale(id);

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to complete sale",
    });
  }
};