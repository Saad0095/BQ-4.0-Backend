import express from "express";
const app = express();

import "./db/index.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());

app.use("/api/:userId/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server running at localhost:3000");
});
