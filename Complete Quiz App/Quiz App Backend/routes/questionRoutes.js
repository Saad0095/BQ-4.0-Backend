import { getAllQuestions } from "../controllers/questionController.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllQuestions);

export default router;
