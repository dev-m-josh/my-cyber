import { Request, Response } from "express";
import { getCustomers } from "./customers.service";

export const getCustomersController = async (
  req: Request,
  res: Response
) => {
  const customers = await getCustomers();

  return res.status(200).json({
    customers,
  });
};