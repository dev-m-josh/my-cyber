import { Router } from "express";

import { 
    createProductController,
    getProductsController
} from "./products.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);

export default router;