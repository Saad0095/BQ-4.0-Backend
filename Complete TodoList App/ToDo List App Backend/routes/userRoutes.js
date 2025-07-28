import { Router } from "express";
import { signUp } from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import { userSchema } from "../validators/userValidator.js";

const router = Router();

router.post("/signup", validate(userSchema),  signUp);
// router.post("/login", loginUp);

const userRoutes = router;
export default userRoutes;
