import { Router } from "express";

import {
  createCustomerController,
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController
} from "./customers.controller";

const router = Router();

router.post("/", createCustomerController);
router.get("/", getCustomersController);
router.get("/:id", getCustomerByIdController);
router.put("/:id", updateCustomerController);

export default router;