import { Router } from "express";

import { 
    createServiceController,
    getServicesController,
    updateServiceStatusController,
    getServiceByIdController
 } from "./services.controller";

const router = Router();

router.post("/", createServiceController);
router.get("/", getServicesController);
router.patch("/:id/status", updateServiceStatusController);
router.get("/:id", getServiceByIdController);

export default router;