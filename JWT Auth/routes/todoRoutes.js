import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  markTodoDone,
  getTodos,
} from "../controllers/todoController.js";
import validate from "../middleware/validate.js";
import { todoSchema } from "../validators/todoValidator.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticateUser, getTodos);
router.post("/", authenticateUser, validate(todoSchema), createTodo);
router.put("/:id", authenticateUser, markTodoDone);
router.delete("/:id", authenticateUser, deleteTodo);

const todoRoutes = router;
export default router;
