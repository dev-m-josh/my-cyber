import { Router } from "express";
import { getCustomersController } from "./customers.controller";

const router = Router();

router.get("/", getCustomersController);

export default router;
