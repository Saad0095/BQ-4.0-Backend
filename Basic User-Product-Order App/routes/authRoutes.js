import { Router } from "express";
import { register, login, getAllUsers } from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import { userSchema } from "../validators/userSchema.js";
import {authenticate,authorize} from "../middlewares/authMiddleware.js"

const router = Router();
router.post("/register", validate(userSchema), register);
router.post("/login", login);
router.get("/users", authenticate, authorize("admin"), getAllUsers);

export default router;
