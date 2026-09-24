import { Router } from "express";

import { createServiceController } from "./services.controller";

const router = Router();

router.post("/", createServiceController);

export default router;