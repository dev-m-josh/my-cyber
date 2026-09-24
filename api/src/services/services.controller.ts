import { Request, Response } from "express";

import { createService } from "./services.service";
import { CreateServiceRequest } from "../utils/types";

export const createServiceController = async (
  req: Request,
  res: Response,
) => {
  try {
    const service: CreateServiceRequest = req.body;

    if (!service.name) {
      return res.status(400).json({
        message: "Service name is required",
      });
    }

    if (!service.price) {
      return res.status(400).json({
        message: "Service price is required",
      });
    }

    const newService = await createService(service);

    return res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to create service:", error);

      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create service",
    });
  }
};