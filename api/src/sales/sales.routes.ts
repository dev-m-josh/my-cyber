import { Router } from "express";

import { 
    createSaleController,
    getSaleByIdController
} from "./sales.controller";

const router = Router();

router.post("/", createSaleController);
router.get("/:id", getSaleByIdController);

export default router;