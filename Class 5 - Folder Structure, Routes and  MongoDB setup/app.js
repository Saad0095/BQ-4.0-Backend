// Helpful Resource: https://www.geeksforgeeks.org/mongodb/how-to-define-schema-and-model-in-mongoose/
import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import "./db/index.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/index", (_req, res) => {
res.sendFile("templates/index.html", { root: __dirname });
});

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Server started at localhost:3000");
});
