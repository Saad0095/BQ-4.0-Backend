import { Router } from "express";
import {
  checkOrderStatus,
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { orderSchema, orderUpdateSchema } from "../validators/orderValidator.js";
import validate from "../middlewares/validate.js"

const router = Router();

router.get("/", getAllOrders);
router.get("/:id/status", checkOrderStatus);
router.get("/:id", getOrder);
router.post("/", validate(orderSchema), createOrder);
router.patch("/:id/status", validate(orderUpdateSchema),updateOrderStatus);

export default router;
