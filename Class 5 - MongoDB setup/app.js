// Helpful Resource: https://www.geeksforgeeks.org/mongodb/how-to-define-schema-and-model-in-mongoose/

import express from "express";
import "./db/index.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
app.use(express.json());

app.use("/api", userRoutes)

app.listen(3000, () => {
  console.log("Server started at localhost:3000");
});
