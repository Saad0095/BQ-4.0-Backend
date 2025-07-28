import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todoController.js";
import validate from "../middleware/validate.js";
import { todoSchema } from "../validators/todoValidator.js";

const router = Router({ mergeParams: true });

router.get("/", getTodos);
router.post("/", validate(todoSchema), createTodo);
router.delete("/:id", deleteTodo);

const todoRoutes = router;
export default router;
