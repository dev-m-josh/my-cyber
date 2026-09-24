import { Request, Response } from "express";

import { 
    createService,
    getServices,
    updateServiceStatus,
    getServiceById
 } from "./services.service";
import { 
    CreateServiceRequest,
    UpdateServiceStatusRequest
 } from "../utils/types";

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

export const getServicesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const services = await getServices();

    return res.status(200).json({
      services,
    });
  } catch (error) {
    console.error("Failed to get services:", error);

    return res.status(500).json({
      message: "Failed to get services",
    });
  }
};

export const updateServiceStatusController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { isActive }: UpdateServiceStatusRequest = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "isActive must be a boolean",
      });
    }

    const service = await updateServiceStatus(id, isActive);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: isActive
        ? "Service activated successfully"
        : "Service deactivated successfully",
      service,
    });
  } catch (error) {
    console.error("Failed to update service status:", error);

    return res.status(500).json({
      message: "Failed to update service status",
    });
  }
};

export const getServiceByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const service = await getServiceById(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      service,
    });
  } catch (error) {
    console.error("Failed to get service:", error);

    return res.status(500).json({
      message: "Failed to get service",
    });
  }
};