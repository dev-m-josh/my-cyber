import { Router } from "express";

import { 
    createProductController,
    getProductsController,
    getProductByIdController
} from "./products.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);

export default router;