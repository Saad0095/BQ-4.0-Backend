import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController.js";
import { productSchema } from "../validators/productValidator.js";
import validate from "../middlewares/validate.js";
import multer from "multer"

const router = Router();
const upload = multer({dest: "public/uploads/"})

router.get("/", getAllProducts);
router.post("/", validate(productSchema), createProduct);
router.get("/:id", getProduct);

export default router;
