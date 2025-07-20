import { Router } from "express";
import { postOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/:id", postOrder);

export default router;
