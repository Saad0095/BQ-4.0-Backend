import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  productId: String,
  quantity: Number,
  name: String,
  email: { type: String, required: true },
  address: String,
  createdAt: { type: Date, default: Date.now() },
});

const Order = model("Order", orderSchema);
export default Order;
