import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todoController.js";
const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);

const todoRoutes = router;
export default router;
