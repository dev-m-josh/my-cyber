import { Router } from "express";

import { 
    createUserController,
    getUsersController,
    getUserByIdController,
    updateUserController,
    updateUserStatusController  
} from "./users.controller";

const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.patch("/:id/status", updateUserStatusController);


export default router;