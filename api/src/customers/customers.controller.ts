import { Request, Response } from "express";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer
} from "./customers.service";

import { 
  CreateCustomerRequest,
  UpdateCustomerRequest 
} from "../utils/types";

// Create customer
export const createCustomerController = async (
  req: Request,
  res: Response,
) => {
  try {
    const customer: CreateCustomerRequest = req.body;

    if (!customer.firstName) {
      return res.status(400).json({
        message: "First name is required",
      });
    }

    const newCustomer = await createCustomer(customer);

    return res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create customer",
    });
  }
};

// Get all customers
export const getCustomersController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const customers = await getCustomers();

    return res.status(200).json({
      customers,
    });
  } catch (error) {
    console.error("Failed to get customers:", error);

    return res.status(500).json({
      message: "Failed to get customers",
    });
  }
};

// Get customer by ID
export const getCustomerByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const customer = await getCustomerById(id);

    return res.status(200).json({
      customer,
    });
  } catch (error) {
    console.error("Failed to get customer:", error);

    return res.status(500).json({
      message: "Failed to get customer",
    });
  }
};

export const updateCustomerController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      phone,
      email,
    }: UpdateCustomerRequest = req.body;

    const customer = await updateCustomer(id, {
      firstName,
      lastName,
      phone,
      email,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to update customer:", error);

      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update customer",
    });
  }
};