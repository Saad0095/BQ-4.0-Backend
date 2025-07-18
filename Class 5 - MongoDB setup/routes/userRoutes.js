import { Router } from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
