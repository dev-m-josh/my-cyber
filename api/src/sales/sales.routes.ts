import { Router } from "express";

import { 
    createSaleController,
    getSaleByIdController,
    getSalesController,
    completeSaleController
} from "./sales.controller";

const router = Router();

router.post("/", createSaleController);
router.get("/:id", getSaleByIdController);
router.get("/", getSalesController);
router.patch("/:id/complete", completeSaleController);

export default router;