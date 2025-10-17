import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, userController.getUsers);
router.get("/sem-age", authenticate, userController.getUsersSemAge);
router.get("/:id", authenticate, userController.getUserById);

export default router;