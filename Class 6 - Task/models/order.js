import { Schema, model } from "mongoose";

const orderSchema = new Schema([
  {
    title: String,
    quantity: Number,
  },
]);

const Order = model("Order", orderSchema);

export default Order;
