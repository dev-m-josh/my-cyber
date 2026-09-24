import { Router } from "express";

import { 
    createServiceController,
    getServicesController
 } from "./services.controller";

const router = Router();

router.post("/", createServiceController);
router.get("/", getServicesController);

export default router;