import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  markTodoDone,
  getTodos,
} from "../controllers/todoController.js";
import validate from "../middleware/validate.js";
import { todoSchema } from "../validators/todoValidator.js";

const router = Router();

router.get("/:userId", getTodos);
router.post("/:userId", validate(todoSchema), createTodo);
router.put("/:userId/:id", markTodoDone);
router.delete("/:userId/:id", deleteTodo);

const todoRoutes = router;
export default router;
