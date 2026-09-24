import { Router } from "express";

import { 
    createProductController,
    getProductsController,
    getProductByIdController,
    updateProductController
} from "./products.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", updateProductController);

export default router;