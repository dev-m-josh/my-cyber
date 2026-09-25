import { Router } from "express";

import { 
    createSaleController
} from "./sales.controller";

const router = Router();

router.post("/", createSaleController);

export default router;