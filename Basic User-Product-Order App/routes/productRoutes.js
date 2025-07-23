import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController.js";
import { productSchema } from "../validators/productValidator.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", validate(productSchema), createProduct);
router.get("/:id", getProduct);

export default router;
