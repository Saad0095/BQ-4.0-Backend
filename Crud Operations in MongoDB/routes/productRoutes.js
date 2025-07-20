import { Router } from "express";
import { createProduct, getAllProducts, getProduct } from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);

export default router;
