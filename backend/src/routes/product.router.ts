import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizedRole } from "../middlewares/role.middleware.js";
import * as productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.getProducts);
router.post("/", authenticate, authorizedRole(["admin"]), productController.createProduct);

export default router;