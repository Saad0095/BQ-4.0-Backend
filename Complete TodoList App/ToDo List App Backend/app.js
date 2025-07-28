import express from "express";
const app = express();
import cors from "cors";

import "./db/index.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server running at localhost:3000");
});
