import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { userSchema } from "../schemas/user.schema.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get("/", userController.getUsers);
router.get("/sem-age", userController.getUsersSemAge);
router.post("/", validate(userSchema), userController.createUser);

export default router;