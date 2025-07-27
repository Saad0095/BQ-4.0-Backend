import express from "express";
const app = express();

import "./db/index.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import validate from "./middleware/validate.js";
import { userSchema } from "./validators/userValidator.js";
import { todoSchema } from "./validators/todoValidator.js";

app.use(express.json());

app.use("/api/:userId/todos", validate(todoSchema), todoRoutes);
app.use("/api/user", validate(userSchema), userRoutes);

app.listen(3000, () => {
  console.log("Server running at localhost:3000");
});
