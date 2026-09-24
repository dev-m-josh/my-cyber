import { Router } from "express";

import { createProductController } from "./products.controller";

const router = Router();

router.post("/", createProductController);

export default router;