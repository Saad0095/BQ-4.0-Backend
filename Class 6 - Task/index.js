import express from "express";
import "./db/index.js";

import Product from "./models/product.js";
import Order from "./models/order.js";

const app = express();
app.use(express.static("public"))
app.use(express.json());

// Prodcuts Get and Post

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Order
app.post("/order", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
