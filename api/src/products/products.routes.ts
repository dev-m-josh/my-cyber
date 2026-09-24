import { Router } from "express";

import { 
    createProductController,
    getProductsController,
    getProductByIdController,
    updateProductController,
    updateProductStatusController
} from "./products.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", updateProductController);
router.patch("/:id/status", updateProductStatusController);

export default router;