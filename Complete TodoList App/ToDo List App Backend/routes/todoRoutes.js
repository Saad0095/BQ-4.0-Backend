import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  markTodoDone,
  getTodos,
} from "../controllers/todoController.js";
import validate from "../middleware/validate.js";
import { todoSchema } from "../validators/todoValidator.js";

const router = Router({ mergeParams: true });

router.get("/", getTodos);
router.post("/", validate(todoSchema), createTodo);
router.put("/:id", markTodoDone);
router.delete("/:id", deleteTodo);

const todoRoutes = router;
export default router;
