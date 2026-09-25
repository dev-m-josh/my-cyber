import { Request, Response } from "express";

import { createSale } from "./sales.service";

export const createSaleController = async (
  req: Request,
  res: Response,
) => {
  try {
    // The request body contains the sale information
    const sale = await createSale(req.body);

    // Sale was created successfully.
    return res.status(201).json(sale);
  } catch (error) {
    //return the error message.
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create sale",
    });
  }
};