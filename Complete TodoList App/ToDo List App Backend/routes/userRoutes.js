import { Router } from "express";
import { signUp } from "../controllers/userController.js";

const router = Router();

router.post("/signup", signUp);
// router.post("/login", loginUp);

const userRoutes = router;
export default userRoutes;
