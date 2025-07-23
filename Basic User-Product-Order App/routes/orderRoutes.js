import { Router } from "express";
import { checkOrderStatus, createOrder, getAllOrders, getOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id/status", checkOrderStatus)
router.get("/:id", getOrder);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus)

export default router;
