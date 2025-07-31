import express from "express";
const app = express();
import "dotenv/config.js";

import "./db/index.js";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
