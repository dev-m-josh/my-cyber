import { Router } from "express";

import { 
    createServiceController,
    getServicesController,
    updateServiceStatusController
 } from "./services.controller";

const router = Router();

router.post("/", createServiceController);
router.get("/", getServicesController);
router.patch("/:id/status", updateServiceStatusController);

export default router;