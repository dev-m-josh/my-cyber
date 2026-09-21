import { Router } from "express";

import { 
    createUserController,
    getUsersController,
    getUserByIdController,
    updateUserController
} from "./users.controller";

const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);


export default router;